---
layout: post
title: Playing with azureQuery - The Javascript driver for Windows Azure
categories: [metro]
tags : [metroapps, windows8, xaml/c#, animations]
---

{% include JB/setup %}

In this post, I'm going to walk-through the steps to include [azureQuery](http://azurequery.codeplex.com/) in your project and how you can use the fluent, jquery-like API at client-side.

Since this version of azureQuery only works with blob storage (v0.1), I'm going to focus this post on accessing blobs. As soon as a new version is released (I think the next one is Table storage), I'll update this post to demonstrate its usage.

> **Note:** You can grab the sample from my github account, [here](https://github.com/nanovazquez/azure-query-sample) is the link (don't forget to start the Azure emulator in your local machine before running it).

All that said, let's get our hands dirty (I love this part).

# Include AzureQuery in your solution

    ## A brief analysis of how azureQuery works

# Query the blobs at client side!

I'll use **azureQuery** to populate a treeView at client-side. For this example, I'm going to use the [jsTree](http://www.jstree.com/) jQuery plugin, but basically all client-side treeView solutions works the same.

I created a **TreeHelper** class to manage the tree data, creating the nodes they way **jsTree** wants them. For sample purposes, I'll populate the treeView at once (instead of using an on-demand strategy).

{% highlight javascript %}

$(function () {

    var treeHelper = new TreeHelper();

    var getData = function () {

        // retrieve all containers in the storage account
        aq.storage().containers().each(function (container) {

            // retrieve all blobs inside the container
            aq.storage().containers(container.name).blobs().each(function (blob) {
                treeHelper.addNode(blob.containerName + "/" + blob.name);
            });
        });

        return treeHelper.getTreeData();
    }

    $(".tree-view").jstree({
        "json_data": {
            "data": getData()
        },
        "plugins": ["themes", "json_data", "ui"]
    });
});

{% endhighlight %}

Notice how easy is to iterate through all the containers, and the blobs inside each one of them. That's all I need to interact with azure blob storage, and to retrive the data I need to populate the treeView. 

![](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/playing-with-azure-query/blob-storage-jstree.png)

> **Note:** this post will be updated with new info as soon as a new version of azureQuery is released. Stay tuned!


# More information

* azureQuery download site: http://azurequery.codeplex.com/
* David Pallmann's post about azureQuery: http://davidpallmann.blogspot.com.ar/2012/07/introducing-azurequery-javascript.html
* Cloud Cover Show episode about azureQuery: http://channel9.msdn.com/Shows/Web+Camps+TV/David-Pallmann-Demonstrates-azureQuery