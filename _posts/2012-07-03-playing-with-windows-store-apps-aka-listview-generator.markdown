---
layout: post
title: Playing with Windows Store apps apps (aka ListView layout generator)
categories: [windows store apps, metro]
tags : [windows store apps, metro, windows8, winjs]
---
{% include JB/setup %}

The past months I've been working on creating new, exciting Windows Store apps, using the Windows Library for Javascript, [WinJS](http://msdn.microsoft.com/en-US/library/windows/apps/br211377). Fortunately, since most of my work is web-related, not to mention all the node.js projects I've been involved in (thanks [@woloski](http://twitter.com/woloski)!) the adaptation wasn't so hard.

But leaving the code aside, one of the most *exciting* challenges about Windows 8 apps is the **UI/UX** (after all, we're creating touch-interactive applications). Furthermore, they have its own way of organizing and displaying the content. So you should be very meticulous on topics like what and how (much) to show (there are some useful guidelines about this on msdn, like [this one](http://msdn.microsoft.com/en-us/library/windows/apps/hh465424.aspx)). 

The guys up there seem to be aware of this, and they developed some controls that do most of the job for us. In particular, I'm going to focus on the [WinJS.UI.ListView](http://msdn.microsoft.com/en-us/library/windows/apps/br211837.aspx) object. 
First of all, you need to know that it's designed to work with *square* containers, named *tiles*. You can find a set of [predefined templates](http://msdn.microsoft.com/en-us/library/windows/apps/hh465463.aspx) that fit some of the basic scenarios. But if you want something different, like multi-size tiles for example, you need to perform some adjustments in the ListView if you want to render all of them properly.

## ListView layout generator

(find the source code [here](https://github.com/nanovazquez/listview-layout-generator))

I've created a Windows Store app that can help you for designing ListView layouts (specifically [GridLayouts](http://msdn.microsoft.com/en-us/library/windows/apps/br211751.aspx)). It still needs a lot of work, but the basic functionality is there. Currently, it supports the following ListView modifications:

 * You can enable **multi-sized** items in the layout
 * You can modify the **max-rows** property
 * You can set **custom width** and **height** for a particular group of items
 * <span style="color: green; font-weight: bold; font-style:italic">New!</span> You can add several item styles at once (separated by a comma)
 * <span style="color: green; font-weight: bold; font-style:italic">New!</span> Using item no. and group.no, you can style a single item in the list
 * <span style="color: green; font-weight: bold; font-style:italic">New!</span> Use asterisk/star to add styles for **all** the items or groups
 
I'm going to be updating the app based on the feedback I received these days. Some new things I'm going to implement and you'll see soon are: an export button (so you can easily get the css code), <strike>a way to identify a particular item in the list</strike>, <strike>add several styles at once</strike>, etc.

## Basic usage

Once the app is launched you'll see a page with several items, separated in three different groups. Each item contains a specific **css class**, so you can style it if you want using CSS. To avoid refreshing the app every time you update the styles, you edit the ListView by clicking the **Edit ListView** command in the appBar (right-click on the app to display it). A flyout will pop-up, where you can update the ListView settings and add styles for the items. Some key points here:

* If you want to display a multi-size layout, activate the **cell spanning** switch and modify the **cellWidth** and **cellHeight** values. 
* If you want to add item styles, type the item number in the first input and the desired width and height, then press the **add** icon (e.g. `Item 0 | 322 | 100`)
* When you're ready, press the **Update layout** button to see the changes in the ListView.

![some example of what you may get](https://github.com/nanovazquez/ListView-layout-generator/raw/master/sample.png)

For now, you can play with the values and learn what they are for. In the few next days, I'll write a new post explaining them in detail. Stay tuned!