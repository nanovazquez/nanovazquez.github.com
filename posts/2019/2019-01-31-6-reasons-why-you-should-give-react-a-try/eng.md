# 6 reasons why you should give React a try

Today React is one of the most popular open source libraries to develop applications. In this article, I would like to explain why you should use React in your next application, especially if you are starting with web, mobile or even desktop development.

**_If you want to read the Spanish version of this article, click_** [**_here_**](https://medium.com/@nanovazquez/6-razones-para-darle-una-prueba-a-react-8f114b77ac70)**_._**

---

### #1 React is easy to start with

React is very a simple and lightweight library that has a fast learning curve. This is due to its simplicity, as it only deals with the view layer. A JavaScript developer using React only has to learn and understand the basic concepts, and you could do so by reading any of the multiple great tutorials you have out there. In a day, you can have a simple web application running.

These are the main reasons why a lot of developers and companies trust in the React ecosystem to build their next generation of applications. Some examples of them are Facebook, Dropbox, Netflix, Airbnb, Paypal, and so on, but you can check its popularity by yourself by simply googling “React”. Notice how the interest has grown over time _(blue line)_:

![](https://cdn-images-1.medium.com/max/1600/1*eGZtf8lLXhwK062fYUExIw.png)Google Trends comparison between the most popular front-end libraries

Even though React own community generates several exceptional tutorials in different formats (blogs, videos, podcasts), I recommend that you start with the [**Getting Started tutorial**](https://reactjs.org/docs/getting-started.html) of Facebook’s official documentation. In it, you can find a _practical tutorial_ for folks that prefer to learn by doing. Or you can _learn concepts step by step_ in case you want to want a more theoretical approach, one topic at a time.

### #2 It splits your app into reusable components

React encourages you to use of a component-based structure to create rich user-interfaces.

> **What are components?** Components are like Lego pieces, they hold some specific logic, but also fit together with others to build the bigger picture.

![](https://cdn-images-1.medium.com/max/1600/1*8M0R3-3FhzOgPny730sb8Q.png)React applications are implemented with components

**How?** You start with _tiny components_ (textbox, button, checkbox) that you display in _pages_, also components. But you also need to create something on top of your pages to manage them and provide common functionality, like _navigation_ or _state management_. You also use this concept to create these modular pieces, and continue to do so until you develop a root component, your _app_.

For instance, see how the application below can be split into different components (TopBar, Sidebar, Applications Page), which are also composed of other smaller components.

![](https://cdn-images-1.medium.com/max/1600/1*dCy4SBwJQ9QFhhun7B0clQ.gif)A basic React application and its components

Moreover, a major advantage of building components is that you can reuse them on any project on any platform (web, mobile or desktop), simplifying your development process and enable you to grow and maintain multiple codebases with a consistent _look and feel_, among other goodies that you will find out later.

### #3 It lets you focus on your code

React provides a powerful abstraction for HTML manipulation. This abstraction lets you focus only on writing components to solve the business logic of your app. And forget about, for instance, injecting elements to the DOM (Document Object Model) using our own JS, as React would do that job for you, and way better.

![](https://cdn-images-1.medium.com/max/1600/1*VH2MHqO0tHYmdX2Tbi9d3g.png)Typical React component tree. Note that when the green components are updated, the blue ones remain the same

In a nutshell, to start with React you only need to understand the component’s lifecycle and how to pass information between them. Worry not, this is explained in _all_ React tutorials out there.

### #4 Fast development thanks to great developer tools

Having awesome developer tools available at your disposal will speed up your productivity several times. You would get things done quickly and your apps will be delivered faster, everybody wins with this. Fortunately, React comes with a sophisticated developer toolset. We will mention only two, but there are others around for sure.

#### React Developer tools

This browser extension is useful for inspecting your component’s tree, and how the information flows down the tree via _props_.

![](https://cdn-images-1.medium.com/max/1600/1*GM0asbVUF1gS4K5zlbhaDA.png)React Developers tools

#### Redux Developer tools

If you are using Redux for storing the data of your app, you should definitely take a look at this browser extension. You can visualize the state tree as well as the actions that were executed in your app, including the _before/after_ state. You can also trigger actions from the tool for debugging purposes and even _go back in time_.

![](https://cdn-images-1.medium.com/max/1600/1*91S40lTp9cLDi9Hbtyuynw.png)Redux Developer tools

### #5 Reuse your code on other platforms

Following the _JavaScript everywher_e mantra, you can also reuse your React components in different platforms. There are several projects that help you to leverage your React knowledge _(and more importantly, your React components)\_ in mobile and desktop applications. [**React Native**](https://facebook.github.io/react-native/) is a project that focuses on mobile apps, I suggest you take a look at it. You might find it useful in the (near) future.

![](https://cdn-images-1.medium.com/max/1600/1*nac3kYIkOXRhAVjaNUSxmg.png)Reuse your React components in different platforms

### #6 Test your app with ease

React is so simple that testing the pieces of your app is straightforward: as each component is essentially a function that receives parameters, you can easily mock its dependencies and test its behavior with a few lines of code. [**Jest**](https://jestjs.io/en/) is one of the most popular and more comprehensive frameworks for testing React apps, I suggest you use it.

![](https://cdn-images-1.medium.com/max/1600/1*uzGMpGDjoKSDNiS1MGVnOA.png)Test your React components using Jest

Last, you can also go one step further and take [**snapshots**](https://jestjs.io/docs/en/snapshot-testing)of your components, to make sure your UI doesn’t change unexpectedly after a code commit is made.

### Conclusion

All in all, React is a powerful tool that will surely simplify your work. This article outlined some features that (might) explain React’s current popularity, and for sure you will enjoy these benefits by choosing React for your next project. _But it’s up to you to decide._

If you do so, you will find me and other fellow developers that will help you along the way. If you need help or want to talk about web development, feel free to contact me on [Twitter](https://twitter.com/nanovazquez87) or [MeetupJS Slack](https://meetupjs.slack.com/).

🎉🎉🎉
