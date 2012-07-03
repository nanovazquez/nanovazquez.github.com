---
layout: post
category : dev
title: Playing with Metro style apps (aka ListView layout generator)
tags : [metroapps, windows8, winjs]
---
{% include JB/setup %}

The past few months I've been working on metro style applications, using the Windows Library for Javascript, [WinJS](http://msdn.microsoft.com/en-US/library/windows/apps/br211377). Fortunately, since most of my work is web-related, not to all the node.js projects I've been involved in (thanks [@woloski](http://twitter.com/woloski)!) - the adaptation wasn't so hard.

But, leaving the code aside, one of the *most exciting challenges* about Windows 8 apps is the **UI/UX** (after all, we're creating touch-interactive applications). Furthermore, they have its own way of organizing and displaying the content. So you should be very meticulous on topics like what and how (much) to show (there are some useful guidelines about this on msdn, like [this one](http://msdn.microsoft.com/en-us/library/windows/apps/hh465424.aspx)). 

The guys up there seem to be aware of this and they developed some controls that can help us. In particular, I'm going to focus on the [WinJS.UI.ListView](http://msdn.microsoft.com/en-us/library/windows/apps/br211837.aspx) object. 
First of all, you need to know that it's designed to work with *square* containers, named *Tiles*. You can find a set of [predefined templates](http://msdn.microsoft.com/en-us/library/windows/apps/hh465463.aspx) that fit some of the basic scenarios. But if you want something different, like multi-size tiles for example, you need to perform some adjustments in the ListView so it can render all of them properly.

## ListView generator

I've created a W8 metro app that can help you when you're designing ListView layouts (specifically [GridLayouts](http://msdn.microsoft.com/en-us/library/windows/apps/br211751.aspx)). It still needs a lot of work, but the basic functionality is there. Currently, it supports the following:

* You can enable **multi-sized** items in the layout
* You can modify the **max-rows** property
* You can set **custom width and height** for a particular group of items

I'm going to be updating the itp based on the feedback I received these days, and you can also help me out. I created a repo @ [https://github.com/nanovazquez/ListView-layout-generator](https://github.com/nanovazquez/listview-layout-generator). Feel free to clone it, fork it and modify the content (whatever you want).

<br />
Some new things I'll implement and you'll see soon are: an export button (so you can easily get the css code), a way to identify a particular item in the list, add several styles at one time, etc.

## Basic usage

Once the app is launched you'll see a page with several items, separated in three different groups. Each item contains a specific **css class**, so you can style it if you want using CSS. To avoid refreshing the app every time you update the styles, you edit the ListView by clicking the **Edit ListView** command in the appBar (right-click on the app to display it). A flyout will pop-up, where you can update the ListView settings and add styles for the items. Some key points here:

* If you want to display a multi-size layout, activate the **cell spanning** switch and modify the **cellWidth** and **cellHeight** values. 
* If you want to add item styles, type the item number in the first input and the desired width and height, then press the **add** icon (e.g. *Item 0* | *322* | *100*)
* When you're ready, press the **Update layout** button to see the changes.

![some example of what you may get](https://github.com/nanovazquez/ListView-layout-generator/raw/master/sample.png)

For now, you can play with the values and learn what they are for. In the next days, I'll write a new post explaining them in detail. Stay tuned!

