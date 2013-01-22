---
layout: post
title: Working with Google Calendar v3 on ASP.NET MVC 4
categories: [google api]
tags : [Google API, Google Calendar API v3, ASP.NET MVC 4]
---

{% include JB/setup %}

A couple of weeks ago I've been given the task of developing a Calendar in a [CRM](http://en.wikipedia.org/wiki/Customer_relationship_management), that also synchronizes with the user's [Google Calendar](https://www.google.com/calendar). For that, I developed a simple sample that covers the full experience in C#, using the [Google API Client Library for .NET](http://docs.google-api-dotnet-client.googlecode.com/hg/docs/Index.html). It consists of an [ASP.NET MVC 4](http://www.asp.net/mvc/mvc4) app that performs CRUD operations of Calendar Events, but also performs other tasks of the flow, like asking for an **authorization code** to create an **access token** or using a **refresh token** in case the old token expires. All of this in an ASP.NET MVC 4 environment. 

You can grab the sample from here: [https://github.com/nanovazquez/google-calendar-sample]. Remember that you need to setup your *ClientId*, *ClientSecret* and *ReturnUrl* in the **Web.config** file (you can generate/find this information in the [Google API Console](https://code.google.com/apis/console) page).

One thing to notice is that the sample doesn't reference the [Google API Client Library for .NET](http://docs.google-api-dotnet-client.googlecode.com/hg/docs/Index.html) assemblies, but an abstraction of them. Take a look at the classes inside the **GoogleApiUtils** project, specifically the **GoogleAuthenticator** and the **GoogleCalendarServiceProxy**. These two custom classes are an abstraction of two Google's Library components: the IAuthenticator, necessary component to perform authenticater requests, and the CalendarService. These two classes work together the same way the Google's Library components work (actually, they wrap them). 

Also, take a look at the **GoogleAuthorizationHelper** class. It contains methods to get the URL to obtain the **authorization code**, as well as the code to create an **OAuth2Authenticator**. Lastly, it includes a method to refresh a (short-lived) **access token** using a **refresh token**. You'll notice that the sample app stores the authenticator in Session, while the refresh token is being saved in a more persistent storage (a local DB).

![](https://raw.github.com/nanovazquez/nanovazquez.github.com/master/_posts/working-with-google-calendar-on-dotnet/google-calendar-sample.png "GoogleCalendar sample")

Hope this is useful for your development. 

> **Note:** Remember that you can grab the sample from [here](https://github.com/nanovazquez/google-calendar-sample).

### More information

* [Registering your app in the Google API Console](http://code.google.com/p/google-api-dotnet-client/wiki/OAuth2)
* [The OAuth 2.0 Authorization Framework](http://tools.ietf.org/html/rfc6749)
* [Google APIs Client Library for .NET reference](http://docs.google-api-dotnet-client.googlecode.com/hg/docs/Index.html)
* [Google Calendar API v3 Reference](https://developers.google.com/google-apps/calendar/v3/reference/)