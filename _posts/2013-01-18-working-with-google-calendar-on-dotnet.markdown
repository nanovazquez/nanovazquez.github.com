---
layout: post
title: Working with Google Calendar v3 on ASP.NET MVC 4
categories: [google api]
tags : [Google API, Google Calendar API v3, ASP.NET MVC 4]
---

{% include JB/setup %}

A couple of weeks ago I've been given the task of developing a Calendar in a [CRM](http://en.wikipedia.org/wiki/Customer_relationship_management), that also synchronizes with the user's [Google Calendar](https://www.google.com/calendar). Knowing that the v3 version of the API sends messages using JSON and the authorization is managed via the [OAuth2](https://developers.google.com/google-apps/calendar/auth) protocol, initially I thought that the implementation would only require reading a document of the .NET API and a few spikes. Silly of me to think that way. Unfortunatel, there's no documentation of the .NET v3 Library, a sample for the Google Calendar Service, or even a walkthrough for the Google authorization flow. All you have are the .NET bits and the [API reference](https://developers.google.com/google-apps/calendar/v3/reference/). You know what that means: heavy use of [fiddler](http://www.fiddler2.com/fiddler2/) and the infamous "trial & error" process.

Anyway, now that I learnt how to work with them I can share something that might be useful. I developed a simple [ASP.NET MVC 4](http://www.asp.net/mvc/mvc4) app that lists, creates, modifies and deletes your Google calendar events using the [Google Calendar API v3](https://developers.google.com/google-apps/calendar/). The good thing about this app is that it covers the full flow: it asks for an authorization code to create a token, stores a refresh token to get a new one if the current has expired and interacts with the Google Calendar API. All of this in an ASP.NET MVC 4 environment. 

You can grab the sample from here: [https://github.com/nanovazquez/google-calendar-sample]. Remember that you need to setup your *ClientId*, *ClientSecret* and *ReturnUrl* in the **Web.config** file (you can generate/find this information in the [Google API Console](https://code.google.com/apis/console) page).

One thing to notice is that the sample doesn't reference the [Google Client Library for .NET] assemblies, but an abstraction of them. Take a look at the classes inside the **GoogleApiUtils** project, specifically the **GoogleAuthenticator** and the **GoogleCalendarServiceProxy**. These two custom classes are an abstraction of two Google's Library components: the IAuthenticator, necessary component to perform authenticater requests, and the CalendarService. These two classes work together the same way the Google's Library components work (actually, they wrap them). 

Also, take a look at the **GoogleAuthorizationHelper** class. It contains methods to get the URL to obtain the **authorization code**, as well as the code to create an **OAuth2Authenticator**. Lastly, it includes a method to refresh a (short-lived) **access token** using a **refresh token**. You'll notice that the sample app stores the authenticator in Session, while the refresh token is being saved in a more persistent storage (a local DB).

![](https://raw.github.com/nanovazquez/nanovazquez.github.com/master/_posts/working-with-google-calendar-on-dotnet/google-calendar-sample.png "GoogleCalendar sample")

Hope this is useful for your development. Happy coding!

> **Note:** Remember that you can grab the sample from here: [https://github.com/nanovazquez/google-calendar-sample]

## More information

* [Registering your app in the Google API Console](http://code.google.com/p/google-api-dotnet-client/wiki/OAuth2)
* [The OAuth 2.0 Authorization Framework](http://tools.ietf.org/html/rfc6749)
* [Google APIs Client Library for .NET reference](http://docs.google-api-dotnet-client.googlecode.com/hg/docs/Index.html)
* [Google Calendar API v3 Reference](https://developers.google.com/google-apps/calendar/v3/reference/)