---
layout: post
title: Jugando con azureQuery - El driver en javascript para Windows Azure
lang: es
categories: [azure, javascript]
tags : [windows azure, javascript, ASP.NET MVC]
---

{% include JB/setup %}

A few months ago, [David Pallman](http://davidpallmann.blogspot.com.ar/2012/07/introducing-azurequery-javascript.html) introduces us a way to access to Windows Azure via client-side, javascript code, named **azureQuery**. By combining the powerful [ASP.NET Web API](http://www.asp.net/web-api) with a fluent, jQuery-like chaining API, you can easily grab data from your azure storage account with a single line of code like, for instance, `aq.storage.container('orders').blobs()` that retrieves all blobs within the *orders* container.

In this post, I'm going to walk-through the steps to set-up [azureQuery](http://azurequery.codeplex.com/) in your project and how you can use this API to query your azure storage account at client-side.

Since the current version, v0.1, only works with blob storage, I'm going to focus this post initially on accessing blobs. As soon as a new version is released (I think the next one will focus on Table storage), I'll update this post to demonstrate its usage.

> **Note:** if you want to go directly to the code, you can grab [this](https://github.com/nanovazquez/azure-query-sample) sample from my github account, that demonstrates how you can query blobs within a container. Don't forget to start the Azure emulator in your local machine before running it.

## Set-up AzureQuery in your solution

These are the steps you need to perform to include azureQuery in your project:

<ol>
    <li>
        Download the code from the azureQuery's codeplex page ([http://azurequery.codeplex.com/]). 
    </li>
    <li>
        Unzip it, and grab these three files located in the root: <strong>azureQueryLib.dll</strong>, <strong>azureQueryLib.pdb</strong> and <strong>azureQuery.js</strong>. Paste them in a new folder inside your solution.
    </li>
    <li>
        Add a reference to <strong>azureQueryLib.dll</strong> in your solution.
    </li>
    <li>
        Create a new controller to manage the azureQuery's requests to blob storage. For this, the controller must inherit from <strong>AzureQueryBlobController</strong>, like the sample code below:

{% highlight csharp %}
using System.Web.Mvc;
using azureQuery;

namespace MvcApplication.Controllers
{
    public class BlobController : AzureQueryBlobController { }
}
{% endhighlight %}
    </li>
    <li>
        If you're working with an ASP.NET MVC project, register a new route for the <strong>BlobApi</strong> in the <strong>Application_Start()</strong> method:

{% highlight csharp %}
protected void Application_Start()
{
    AreaRegistration.RegisterAllAreas();

    RouteTable.Routes.MapHttpRoute(
        name: "BlobApi",
        routeTemplate: "api/{controller}/{action}/{id}",
        defaults: new { id = RouteParameter.Optional }
    );

    WebApiConfig.Register(GlobalConfiguration.Configuration);
    FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
    RouteConfig.RegisterRoutes(RouteTable.Routes);
}
{% endhighlight %}
    </li>
    <li>
        Finally, set up your azure storage account credentials in the <strong>web.config</strong> file, as described below:

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <connectionStrings>
    <!-- development connection string -->
    <add name="default" connectionString="UseDevelopmentStorage=true" />
    <!-- production connection string -->
    <!--<add name="default" connectionString="DefaultEndpointsProtocol=http;AccountName=[storage-account-name];AccountKey=[storage-account-key]"/>-->
  </connectionStrings>
  ...
</configuration>
{% endhighlight%}
    </li>
</ol>

> **Note:** the connection string name must be *default*, because the azureQuery lib currently searches for a connection string with that name (v0.1).

And that's it! Now you only need to reference the **azureQuery.js** file in the View you want to use **azureQuery** to display your blobs stored in your account.

## Query the blobs at client side

I created a more detailed sample (source [here](https://github.com/nanovazquez/azure-query-sample)) that uses **azureQuery** to retrieve the blobs stored in your account and displays them using treeView, all at client-side. For this example, I'm going to use the [jsTree](http://www.jstree.com/) jQuery plugin, but basically all client-side treeView solutions works the same.

This is the client-side code that performs what I described above:

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

I created the **TreeHelper** class to store & manage the tree data, creating the nodes the way **jsTree** wants them. Notice how easy is to iterate through all the containers in your account, and the blobs inside each one of them. Last, just for sample purposes, I decided to retrieve all the information at once instead of using an on-demand strategy. 

Below is a screenshot of the code in action:

![](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/playing-with-azure-query/blob-storage-jstree.png)

> **Note:** this post will be updated with new info as soon as a new version of azureQuery is released. Stay tuned!

## More information

* [azureQuery download site](http://azurequery.codeplex.com/)
* [David Pallmann's post about azureQuery](http://davidpallmann.blogspot.com.ar/2012/07/introducing-azurequery-javascript.html)
* [Cloud Cover Show episode about azureQuery](http://channel9.msdn.com/Shows/Web+Camps+TV/David-Pallmann-Demonstrates-azureQuery)