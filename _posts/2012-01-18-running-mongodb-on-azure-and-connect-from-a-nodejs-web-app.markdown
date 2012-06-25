---
layout: post
category : dev
title: Running Mongodb on Azure and connect from a node web app
tags : [azure, node, mongodb]
---

# Running Mongodb on Azure and connect from a node web app

This post explains how to use MongoDB Replica Sets from a node.js app, all hosted on Windows Azure. For this, we'll use the new [Windows Azure tools for MongoDB and Node.js](http://downloads.mongodb.org/azure/AzureMongoDeploymentCmdlets.msi), which contains some useful `PowerShell` CmdLets that will save valuable time.

We will also explain how the integration between mongo-node-azure works. 

## How it works

This is how mongo db works in Azure and node.js:

* MongoDb will run the native binaries on a worker role and will store the data in Windows Azure storage using [Windows Azure Drive](https://www.windowsazure.com/en-us/develop/net/fundamentals/cloud-storage/#drives) (basically a hard disk mounted on Azure Page blobs)
* The good thing about using Azure Storage is that the data is [georeplicated](http://blogs.msdn.com/b/windowsazurestorage/archive/2011/09/15/introducing-geo-replication-for-windows-azure-storage.aspx). It will also make backup easier because of the snapshot feature of blob storage (which is not a copy but a diff).
* It will use the local hard disk in the VM (local resources in the Azure jargon) to store the log files and a local cache.
* You can scale out to multiple Mongo Replica Sets by increasing the instance count of the Mongo Db role
* So how the application that will connect to the Mongo replica set will know the IP address of each replica set. The way it works is, there is a [startup task](http://msdn.microsoft.com/en-us/library/windowsazure/hh180155.aspx) that runs a small executable every time a new instance is started in your application. That executable will gather the IP address of each instance running the replica set using `RoleEnviroment.Roles["ReplicaSetRole"].Instances[i].InstanceEndpoints.IPEndpoint` and write it down to a json file in the root folder of the role. Then there will be a module in node.js that will be listen for changes in that file. This module will provide a method to obtain the replica set addresses to use with the mongo driver. On the other hand, if there was an increase or decrease in the instance count the executable will use the `RoleEnvironment.Changed` event and will rewrite the json file with the new info. They had to do all that because it is not possible to access the `RoleEnvironment` API from node yet.   
* And last but not least, it all works in the emulator

If you want to read more about this go to [Getting Started Guide - Node.js with Storage on MongoDB](https://www.windowsazure.com/en-us/develop/nodejs/tutorials/mongodb-database/) and the [documentation from 10gen](http://www.mongodb.org/display/DOCS/MongoDB+on+Azure).

##How to configure Mongo with Windows Azure

Open `Windows PowerShell for MongoDB Node.js`. First thing will be to download the MongoDB binaries as a separate package, in addition to installing the Windows Azure Tools for MongoDB and Node.js. This is needed because mongo tools MSI does not contain mongodb binaries (due to licensing differences). So this command has to be executed once to download MongoDB binaries to the folder "C:\Program Files (x86)\MongoDB\Windows Azure\Nodejs\Scaffolding\MongoDB\WorkerRole\MongoDBBinaries".
 
When you execute `Add-AzureMongoWorkerRole` command it will copy mongodb binaries from above folder to the worker role created.

    Get-AzureMongoDBBinaries

Now let's add the mongo worker role that will run the replica set.

    Add-AzureMongoWorkerRole ReplicaSetRole 3

This will create a worker role named **ReplicaSetRole** with 3 instances. You can use the amount you want but in production is recommended to use at least 3 for failover, 1 instance is the equivalent to a stand-alone server.

Next, we will link both the node app (in this case `sample-web`) and the mongo roles, using the following command:

    Join-AzureNodeRoleToMongoRole sample-web ReplicaSetRole

This is what the CmdLet will do:

* Add two [configuration settings](http://msdn.microsoft.com/en-us/library/windowsazure/ee758710.aspx#ConfigurationSettings) named RoleName & EndpointName.  
* Add a startup task that launches the AzureEndpointsAgent.exe that do all the work we described in the first section.
* Install the **azureEndpoints** module (that will read the json file and provide the replcia set info).

Now that we have both roles linked, let's add some code to connect to the replica set.

    // Create mongodb azure endpoint
    // TODO: Replace 'ReplicaSetRole' with your MongoDB role name (ReplicaSetRole is the default)
    var mongoEndpoints = new AzureEndpoint('ReplicaSetRole', 'MongodPort');

    // Watch the endpoint for topologyChange events
    mongoEndpoints.on('topologyChange', function() {
      if (self.db) {
        self.db.close();
        self.db = null;
      }
        
      var mongoDbServerConfig = mongoEndpoints.getMongoDBServerConfig();
      self.db = new mongoDb('test', mongoDbServerConfig, {native_parser:false});
      
      self.db.open(function(){}});
    });

    mongoEndpoints.on('error', function(error) {
      throw error;
    });

The mongoEndpoints will listen the running MongoDB Replica Set nodes and will be updated automatically if one of the nodes come on or off line (either because the instance count of the replica set role was increased/decreased or because the VM is being patched)

And that's it! You can publish this app to Windows Azure and wait for the instances to start.

You can browse the node example app from [here](https://github.com/nanovazquez/common/tree/master/movies-app) (run `npm install` after you extract the code to download the necessary modules).

![](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/running-mongodb-on-azure-and-connect-from-a-nodejs-web-app/movies-app.png)

NOTE: The MongoDB nodes take some time to initialize. If you test the application in the local emulator, using the `-launch` option it's probably that you get a **no primary server found** error. If this happens, wait a few seconds and try again.