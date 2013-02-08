---
layout: post
title: Working with Google Calendar v3 on ASP.NET MVC 4
categories: [google api]
tags : [Google API, Google Calendar API v3, ASP.NET MVC 4]
---

{% include JB/setup %}

A couple of weeks ago I've been given the task of developing a Calendar in a [CRM](http://en.wikipedia.org/wiki/Customer_relationship_management), that also synchronizes with the user's [Google Calendar](https://www.google.com/calendar). To fully understand the flow, I developed a simple sample that covers the full experience in C#, using the [Google API Client Library for .NET](http://docs.google-api-dotnet-client.googlecode.com/hg/docs/Index.html). It consists of an [ASP.NET MVC 4](http://www.asp.net/mvc/mvc4) app that demonstrates how to perform CRUD operations in your Calendar, but also addresses other tasks of the flow, like asking for an **authorization code** to create an **access token**, or using a **refresh token** to get a new access token, in case the old token expires. All of this in an ASP.NET MVC 4 environment. 

You can grab the sample from here: [https://github.com/nanovazquez/google-calendar-sample](https://github.com/nanovazquez/google-calendar-sample)

Just remember that you need to setup your *ClientId*, *ClientSecret* and *ReturnUrl* in the **Web.config** file (you can generate/find this information in the [Google API Console](https://code.google.com/apis/console) page).

![](https://raw.github.com/nanovazquez/nanovazquez.github.com/master/_posts/working-with-google-calendar-on-dotnet/web-config-file.png "Web.config file")

Some things to notice about this sample:

* It doesn't reference the [Google API Client Library for .NET](http://docs.google-api-dotnet-client.googlecode.com/hg/docs/Index.html) assemblies, but an abstraction of them. Take a look at the files inside the **GoogleApiUtils** project, specifically the **GoogleAuthenticator.cs** and the **GoogleCalendarServiceProxy.cs**. These two custom classes are an abstraction of two Google's Library components: the *OAuth2Authenticator* and the *CalendarService*, and they work together the same way the Google's Library components work (actually, they wrap them). 
* It uses the **GoogleAuthorizationHelper** class to get the URL to obtain the **authorization code**, as well as to refresh a (short-lived) **access token** using a **refresh token**. You'll notice that the sample app stores the authenticator (that holds an access token) in Session, while the refresh token is being saved in a more persistent storage (a local DB).

![](https://raw.github.com/nanovazquez/nanovazquez.github.com/master/_posts/working-with-google-calendar-on-dotnet/google-calendar-sample.png "GoogleCalendar sample")

Happy coding!


> **Note:** Remember that you can grab the sample from [here](https://github.com/nanovazquez/google-calendar-sample).
