---
layout: post
title: Windows Store apps - Creating different ListView layouts
categories: [windows store apps]
tags : [windows store apps, WinJS]
---
{% include JB/setup %}

In this post, we are going to walk through some of the most commons scenarios when creating a ListView for your application. We start with the basic layout, a simple list with items of the same size. Then, we modify the ListView to support a layout with proportional-sized items, and we pinpoint some guidelines to render the items properly. Lastly, we analyze a radical scenario where the items have unique styles, and they do not share a (size) relation between each other.

To create all the scenarios, I'm going to use the [ListViewGenerator](https://github.com/nanovazquez/listview-layout-generator) app I introduced in my prior [post](http://nanovazquez.github.com/dev/2012/07/03/playing-with-windows-store-apps-aka-listview-generator/). I suggest that, after you read this, play with it (suggestions/feedback are always welcome ☺). 

Now that you know these things, let's get our hands dirty.

## Level 0: The basics

The layout of the default ListView (e.g. the one presented in the grid VS templates) expects that all items have the same size. Under the hood, it calculates the total **width** and **height** of the first item, and then arranges the rest using these values. Furthermore, it figures out how many items fit per column using these values (we'll analyze the code that perform these calculations later, when we discuss about the **maxRows** property). 

If you leave the ListView as is, be sure that your items have the same size. Otherwise something like this could happen:

![](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/windows-store-apps-creating-different-listview-layouts/default-settings-issue.png)

Now let's discuss how you can create a ListView with items of different sizes.

## Level 1: Proportional items

The next step is to work with items of different sizes, but proportional. This is the most common scenario, you can find it the **windows start screen**, the **Store** app, the **VS templates**, and so on. 

To activate this layout, you need to enable the **cell spanning** property in your ListView, and then set the **cellWidth** and **cellHeight** values. You can perform this by updating the **layout** property of the ListView (you usually want to do this when initializing your page)

{% highlight javascript %}
// This function updates the ListView with new layouts
initializeLayout: function (listView, viewState) {
    /// <param name="listView" value="WinJS.UI.ListView.prototype" />

    // the layout is not snapped
    var listView = element.querySelector('.groupeditemslist').winControl;
    var gridLayoutOptions = {
        groupHeaderPosition: 'top',
        groupInfo: { enableCellSpanning: true, cellWidth: 250, cellHeight: 150 }
    };
    listView.layout = new ui.GridLayout(gridLayoutOptions);
},
{% endhighlight %}

Some things to mention here:

* The [groupHeaderPosition](http://msdn.microsoft.com/en-us/library/windows/apps/br211743.aspx) property sets the position of the group headers. Currently, the GridLayout supports two values: **top** and **left** (being top the default value)
* The groupInfo property takes care of the multi-size settings 
* Set **enableCellSpanning** to activate multi-size, otherwise the ListView won't use the cellWidth and cellHeight values to position the items. For these values, the best approach is to use the size of the **smallest item in your list**. And then adjust the items using equivalent values (the double, two times the size, etc)

For example, take a look at this layout:

![](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/windows-store-apps-creating-different-listview-layouts/proportional-sized-items.png)

It was created using the **groupInfo** values described above and the following item styles:

![](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/windows-store-apps-creating-different-listview-layouts/proportional-item-styles.png)

> **Note:** Notice that we're adding an extra **10px** in the big items. This is because we need to include the margin between the items in the final value. For instance, if we want to create an item three times bigger than the smallest, we should add to the desired size the equivalent of two margins. 

Until now, we didn't discuss about different screen resolutions, or different screen orientations (landscape or portrait). One of the features of the Windows Store apps is the ability to adapt to different views and orientations (i.e. [a flexible layout](http://msdn.microsoft.com/en-us/library/windows/apps/hh465386.aspx)) and we must take this into account when designing our ListView. You usually start designing your application in a default size resolution, like 1366x768, but you should (must) be prepared to **all** possible scenarios. If you're interested in this, keep reading.

## Level 2: Handling different resolutions

The ListView is flexible enough to do most of the job for us, like arranging the items per column, calculating the available size. But what happens with your layout on bigger resolutions? (which means more items per column). You might want to maintain the same layout, no matter the free space you have. Luckily, there's a property that comes to the rescue: [maxRows](http://msdn.microsoft.com/en-us/library/windows/apps/br211750.aspx).

Use **maxRows** to set the max number of items per column in your layout. Add this property to the **gridLayoutOptions** object we defined in the previous code and set it to **2**. This will ensure that no more than 2 items will be stacked per column:

{% highlight javascript %}
var gridLayoutOptions = {
    groupHeaderPosition: 'top',
    groupInfo: { enableCellSpanning: true, cellWidth: 250, cellHeight: 150 },
    maxRows: 2
};
listView.layout = new ui.GridLayout(gridLayoutOptions);
{% endhighlight %}

So what's going on behind the scenes? When the ListView calculates the items to display per column (performing its own *computations* or using the values you provide in the **groupInfo** property), it uses **maxRows** to limit the max number of items.

![](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/windows-store-apps-creating-different-listview-layouts/max-rows-usage.png)

Of course it's always nice to use all the space we have available to display our items. I personally try not to use it unless I'm forced to, like if I'm working with non-squared items or newspaper layouts.

## Level 3: Mash-up

Here we mix everything. For instance, let's suppose we have a **magazine** application that displays different sets of data (news, articles, recent activities and photos) in your hub/groupedItems/landing page. Moreover, each item in the category has its own styles, non-related with the styles of other categories. We want to focus in those cases where you need to take full control over the layout. 

For this kind of scenarios, one thing that worked for me is **set the cellWidth and cellHeight to 1**. This will cause that the items will be managed individually, leaving to the item styles the responsibility of arranging the content. 

Below you can find an example of this (I updated the data a little bit):

![](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/windows-store-apps-creating-different-listview-layouts/random-layout.png)

One challenge in this kind of scenario is how to set the **maxRows** property, since this property affects all categories. There's no generic answer here, it really depends on the scenario. It's up to you to choose what is ok and what isn't. 

Check out how the sample looks above in a 27'' screen (2560x1440)

![](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/windows-store-apps-creating-different-listview-layouts/random-layout-big-screen.png)

Since some people asked me about the source, I added this **magazine layout** as an example in the [ListViewGenerator](https://github.com/nanovazquez/listview-layout-generator)). Just activate the appBar and click on the "Go to sample page" command.

![](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/windows-store-apps-creating-different-listview-layouts/magazine-layout-command.png)

## Conclusion

To sum up what we've learnt in this article:

* By default, the ListView expects that all items have the same size (will use the values of the first item to calculate the rest)
* To enable a multi-size ListView, you need to provide the **groupInfo** property. Specifically, set **enableCellSpanning** to true and supply a value for **cellWidth** and **cellHeight**
* Use the **maxRows** property to set the max number of items per column in your layout. In particular, if you want to maintain your layout throughout the different screen resolutions
* For maximum customization, you can set **cellWidth** and **cellHeight** to 1. This will let you (and your css styles) be in total control of the layout