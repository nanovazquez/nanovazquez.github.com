# How to choose between Angular and React for your next application

![](https://cdn-images-1.medium.com/max/1600/1*0twlyPRIq5xrGT45RAaEYQ.png)

In this post, we’ll try to dig into these two libraries and learn their similarities and differences, helping you to decide which one to choose in your next project. We’ll try to use our best judgment as, for better or for worse, this decision will stick with you for a little while. Trust me; we’ve all been there.

These are some questions we focus on addressing today:

- What are these libraries trying to solve? How are they different?
- How can I start developing with them? Is it going to be an easy start?
- How will my code look if I use Angular or React?

> **_Si quieres leer la versión en Español de este artículo, haz click_** [**_aquí_**](https://medium.com/@nanovazquez/c%C3%B3mo-elegir-entre-angular-y-react-para-tu-pr%C3%B3xima-aplicaci%C3%B3n-217f99f624b8)**_._**

---

### Architectural concepts

**Angular** is developed and maintained by Google, and presents itself as the [One framework](https://angular.io/) to create your web or mobile application, boasting its incredible performance, its tooling and its popularity among developers.

**React** is developed and maintained by Facebook, and presents itself as [a JavaScript library for building user interfaces](https://reactjs.org/). It claims to have a _painless_ declarative approach and a component-based architecture that you can reuse across different technology stacks.

Both libraries are used internally in these companies so you can safely expect that these big players will continue to bet on these technologies and keep them around for a while.

![](https://cdn-images-1.medium.com/max/1600/1*AVDkPkfpHxgSk9WiiAikvA.png)Both Angular and React promote a component-based architecture

Now, what about the differences?

- **Angular** is a UI framework, while **React** is a UI library. In practice, this means that Angular comes with a lot of built-in features and is more opinionated on how you should implement your app. Although **React** gives you more freedom in the libraries you will use in your app (for routing, state management, fetching, unit testing, etc.), there is well-established a set of mainstream libraries you will probably end up using.
- Both **Angular** and **React** propose to encapsulate the business logic into components. And then integrate these small components into bigger ones to make complex UIs.

> In reality, there are no big differences in the architectural model they propose for your app and you can even end up with a similar development experience, depending on the rest of the libraries you use to complement Angular or React.

One last thing to mention is that _both libraries are under the MIT License_, a relevant topic that matters if you plan to use them in your company.

### **Coding styles**

As we are going to write a lot of code using one of these libraries, it’s important to know how it would look like. Let’s see how to write a simple _HelloMessage_ component using these libraries:

<iframe width="700" height="250" src="/media/404c7efb8b3573e6934202eab20fe0a9?postId=48878905107a" data-media-id="404c7efb8b3573e6934202eab20fe0a9" allowfullscreen="" frameborder="0"></iframe>Angular “HelloMessage” component<iframe width="700" height="250" src="/media/493b38faa20c97f1acd0fb8f4da731e4?postId=48878905107a" data-media-id="493b38faa20c97f1acd0fb8f4da731e4" data-thumbnail="https://i.embed.ly/1/image?url=https%3A%2F%2Favatars1.githubusercontent.com%2Fu%2F1306634%3Fs%3D400%26v%3D4&amp;key=a19fcc184b9711e1b4764040d3dc5c07" allowfullscreen="" frameborder="0"></iframe>React “_HelloMessage_” component

As you’ve seen, the styles for building components are different. Angular uses the [@Component decorator](https://angular.io/api/core/Component) to create components and a combination of regular HTML and custom directives for [templating](https://angular.io/guide/template-syntax). On the other hand, React uses the [Component class](https://reactjs.org/docs/components-and-props.html) and an HTML-like syntax named [JSX](https://reactjs.org/docs/introducing-jsx.html) to build components, both living together in the same JS file.

![](https://cdn-images-1.medium.com/max/1600/1*sDROcFBImu-8-V-E54bTRw.png)Each component holds specific business logic

Choosing one approach over the other is up to you, but sometimes you have a requirement that tips the scale: if you have, let’s say, designers in your team that feel more comfortable with delivering HTML files, Angular might be the best choice for you. _Of course, you will also have to tell a developer to learn all the specific syntax to leverage Angular in these files._

### Learning curve & tooling

Since **Angular** is a framework, it comes with a lot of features that you might not know about, and this can be a little bit overwhelming. **React** only requires a little bit of knowledge about JavaScript and JSX, which may look easier for newcomers. Nevertheless, as you build your application, you will have to understand complex topics such as routing, state management, async calls, etc.

Fortunately, both libraries have great documentation that can help you to get up to speed. There are also tons of tooling around built to simplify the creation of your first app. Check the [Angular CLI](https://cli.angular.io/) and [Create React app](https://github.com/facebook/create-react-app), both are great tools that I’m sure you’ll love.

![](https://cdn-images-1.medium.com/max/1600/1*reHLz0Jw2pxiVfegh5eujA.png)Create React app

> _For more information, see the_ [_Angular docs_](https://angular.io/docs) _and/or the_ [_React docs_](https://reactjs.org/docs/getting-started.html)_._

### **App’s Lifecycle**

This topic contains the most significant differences between these two libraries:

**Angular** uses two-way data binding to connect the UI elements of the DOM with the model that store the data. And It keeps them in sync it thanks to a change detection algorithm that automatically picks up the changes and updates the model if required. _We’d need an entire series of posts to explain the details of it_, for now you only need to know that Angular intercepts all async events in the browser that can potentially change your model (an _AJAX_ call, an _onChange_ event) and you don’t have to implement any logic to update the model, as you can see in the code below:

<iframe width="700" height="250" src="/media/a5587f007a37b8db8a7c119d2578d5ed?postId=48878905107a" data-media-id="a5587f007a37b8db8a7c119d2578d5ed" data-thumbnail="https://i.embed.ly/1/image?url=https%3A%2F%2Favatars1.githubusercontent.com%2Fu%2F1306634%3Fs%3D400%26v%3D4&amp;key=a19fcc184b9711e1b4764040d3dc5c07" allowfullscreen="" frameborder="0"></iframe>

**React** uses an explicit mechanism to update the state of the components (i.e. you need to call a function for this), but it hides the complexity of performing the updates to the DOM efficiently by using a [Virtual DOM](https://reactjs.org/docs/faq-internals.html#what-is-the-virtual-dom), a copy of the real DOM in memory. Data changes flow into one direction (from the component to the DOM) and hence it uses a one-way data binding.

<iframe width="700" height="250" src="/media/5e3aa4af088c53253a54e04f8c387cca?postId=48878905107a" data-media-id="5e3aa4af088c53253a54e04f8c387cca" data-thumbnail="https://i.embed.ly/1/image?url=https%3A%2F%2Favatars1.githubusercontent.com%2Fu%2F1306634%3Fs%3D400%26v%3D4&amp;key=a19fcc184b9711e1b4764040d3dc5c07" allowfullscreen="" frameborder="0"></iframe>

Although they use different techniques, in most of the cases you won’t notice any difference in terms of _performance_ (bear in mind that these libraries are battle-tested in thousands of applications). They do have different styles to write components, but it’s up to you to decide which style you prefer the most.

### **Typing system**

**Angular** comes with [TypeScript](https://www.typescriptlang.org/), a typed superset of JavaScript and proposes the use of OOP classes [to develop components](https://angular.io/guide/architecture-components). **React** doesn’t suggest the use of any typing system, although it has a really helpful section that [explains how to add Flow or TypeScript to a React project](https://reactjs.org/docs/static-type-checking.html). It is also unopinionated about how you should [write your components](https://reactjs.org/docs/components-and-props.html#function-and-class-components), and you could either use functions or classes indistinctively.

![](https://cdn-images-1.medium.com/max/1600/1*8M0R3-3FhzOgPny730sb8Q.png)Angular and React support typing systems (like TypeScript) to build large-scale applications

### Conclusion

Both Angular and React are great options for your next application. As we have seen in this post, choosing one or the other is most related to personal preferences rather than any potential advantage in terms of performance, features, ecosystem or size of the development community.

It’s only up to you to decide which style you like the most. When you do so, I’d like to know the reasons (if any) that you used to make the decision. You can contact me via [Twitter](https://twitter.com/nanovazquez87) or [MeetupJS Slack](https://meetupjs.slack.com/). Hope to hear from you soon!

🎉🎉🎉
