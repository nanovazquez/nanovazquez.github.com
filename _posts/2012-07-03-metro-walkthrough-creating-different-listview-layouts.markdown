---
layout: post
category : dev
title: Metro Walkthrough. Creating different ListView layouts
tags : [metroapps, windows8, winjs]
---
{% include JB/setup %}

In this post, we are going to walk through some of the most commons scenarios when creating a ListView for your application. We start with the basic layout, a simple list with the items of the same size. Then, we modify the ListView to support a layout with proportional-sized items, and we pinpoint some guidelines to render the items properly. Last, we analyze a radical scenario where the items have unique styles, and they not share a (size) relation between each other.

To test all the scenarios, I'm going to use the [ListViewGenerator](https://github.com/nanovazquez/listview-layout-generator) application I introduced in my prior [post](http://nanovazquez.github.com/dev/2012/07/03/playing-with-metro-style-apps-aka-listview-generator/). I suggest that after you read this post, play with the app and try to reproduce the layouts presented below (suggestions/feedback about the code is always welcome :))

I separated each layout in 4 different levels, using the standard (and widely known) [duke nukem difficulty settings](http://dukenukem.wikia.com/wiki/Difficulty). Now that you know this, let's get our hands dirty.

## Level 0: The basics (piece of cake)

The layout of the default ListView (e.g. the one of the VS templates) expects that all items have the same size. Under the hood, it calculates the total **width** and **height** of the first item, and arranges the rest using these values. Furthermore, it figures out how many items fit per column using these values (we'll analyze that code later when we discuss about the **maxRows** property). You can easily test this by setting a width and height value for the first item only, and check what happens.

![](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/metro-walkthrough-creating-different-listview-layouts/default-settings-issue.png)

If you're working with items of the same size you don't need to perform any modification on the ListView's settings. Just style your items with the values you want and let the control do its job.

## Level 1: Proportional items (let's rock)

The next step is to work with items of different sizes, but proportional. This is one of the most common scenario, and the one used in the **windows start screen**, the **Store** app, the **VS templates** and )almost) all of the apps I've seen. 

To use this layout, you just need to enable **cell spanning** in your ListView, and set the **cellWidth** and **cellHeight** values. You can do this by updating the **layout** property of the ListView (you usually want to do this when initializing the layout of your page)

{% highlight javascript %}
...
// This function updates the ListView with new layouts
initializeLayout: function (listView, viewState) {
    /// <param name="listView" value="WinJS.UI.ListView.prototype" />

    // let's assume the layout is not snapped
    var listView = element.querySelector('.groupeditemslist').winControl;
    var gridLayoutOptions = {
        groupHeaderPosition: 'top',
        groupInfo: { enableCellSpanning: true, cellWidth: 250, cellHeight: 150 }
    };
    listView.layout = new ui.GridLayout(gridLayoutOptions);
},
...
{% endhighlight %}

Some things to mention here:
* The [groupHeaderPosition](http://msdn.microsoft.com/en-us/library/windows/apps/br211743.aspx) property sets the position of the group headers. Currently, the GridLayout supports two values: *top* and *left* (being top the default).
* The groupInfo property takes care of the multi-size settings. Set **enableCellSpanning** to activate multi-size, otherwise the ListView won't use the cellWidth and cellHeight values to position the items. For these values, the best approach is to use the size of the **smallest item in your list**. And then adjust the items using equivalent values (the double, two times the size, etc). 


For instance, take a look at this layout:

![](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/metro-walkthrough-creating-different-listview-layouts/proportional-sized-items.png)

It was creating using the **groupInfo** values described above and the following item styles:

![](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/metro-walkthrough-creating-different-listview-layouts/proportional-item-styles.png)

> Note: Notice that we're adding an extra 10px in the big items. This is because we need to include the margin between them in the final value. In case we include an item three times bigger than the smallest, we should add to the size the value of two margins. 

Until now, we didn't discuss about different screen resolutions, or even different screen orientations (landscape or portrait). One of the features of the metro style application is the ability to adapt to different views and orientations (i.e. [a flexible layout](http://msdn.microsoft.com/en-us/library/windows/apps/hh465386.aspx), and we must take this into account when designing our ListView. You start designing your application in a default size resolution, like 1366x768, but you must be prepared to **all** possible scenarios. The ListView is flexible enough to do most of the job for us, arranging the items with the size it has available, so we have that covered. The most common issue comes with bigger resolutions: more height means more items per column. This can destroy the design of our app. Luckily, there's a property that comes to the rescue: [maxRows](http://msdn.microsoft.com/en-us/library/windows/apps/br211750.aspx).

## Level 2: Handling different resolutions (come get some)

Use **maxRows** to set the max number of items per column in your layout. Add this property to the **gridLayoutOptions** object we defined in the previous code and set it to **2**. This will ensure that our layout will be the same no matter the resolution we are facing.

{% highlight javascript %}
var gridLayoutOptions = {
    groupHeaderPosition: 'top',
    groupInfo: { enableCellSpanning: true, cellWidth: 250, cellHeight: 150 },
    maxRows: 2
};
listView.layout = new ui.GridLayout(gridLayoutOptions);
{% endhighlight %}

So what's going on behind the scenes? When the ListView calculates the items to display per column (performimg its own *computations* or using the values you provide in the **groupInfo** property) it uses this value to limit the items.

![](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/metro-walkthrough-creating-different-listview-layouts/max-rows-usage.png)

Of course it's always nice to use all the space we have avaiable to display our items. I personally try not to use it unless I'm forced to, like if I'm working with non-squared items or newspaper-like layouts.

## Level 3: Mash-up (damn i'm good)

Here we mix everything. For instance, let's create a **magazine** application which contains different sets of data (news, articles, recent activities and photos) and you want to display all of them in your hub/groupedItems/landing page. Moreover, each item in the category has its own styles, non-related with the styles of other categories. 

In this scenario, one thing that worked for me is **set the cellWidth and cellHeight to 1**, and leave the styles take control of how to display the content. Below you can find an example for this.

![](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/metro-walkthrough-creating-different-listview-layouts/random-layout-1.png)

![](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/metro-walkthrough-creating-different-listview-layouts/random-layout-2.png)

A challenge in this kind of scenario is how to set the **maxRows** property, since this property affects all categories. There's no generic anwer here, it really depends on the scenario. Check out how it looks the sample above in a 27'' screen (2560x1440). It's up to you to choose if this is OK or not. 

![](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/metro-walkthrough-creating-different-listview-layouts/random-layout-big-screen.png)