---
layout: post
title: Digging into the modern JavaScript - ES6
lang: eng
categories: [javascript, es6]
tags : [javascript, es6, babel]
---

{% include JB/setup %}

As many JS developers nowadays, we are in the process of adopting new technologies to our existent products, like ES6/Babel, Angular2, React and Webpack.

In this amazing journey of trying to find the best tools for our daily jobs (and not new sexy things that just reinvent the wheel), the other day a member of the dev team shared with us a tweet of [@ericdfields](twitter.com/ericdfields) about Modern Javascript:

![WTF tweet](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/digging-into-the-modern-javascript-es6/tweet.png)

After the WFT moment, I realized that it is a good moment to start writing some posts in a way to ease the path to this "new modern world" for the ones with no clue of that syntax (like me a few weeks ago). In this post, I'm going to explain some of the features of the next/current/upcoming Javascript generation, using the code of this tweet as introduction, leaving the React stuff for a next post. That said, let's get started:

## ES6/Babel introduction

ECMAScript 2015, ECMAScript Harmony, or simply ES6, is the sixth edition of the ECMAScript specification. While his predecesor (ES5) is [widely adopted](http://kangax.github.io/compat-table/es5/) by browser and other JS engines, the implementation of the ES6 spec is still in progress. Instead of waiting, we can use tools like [Babel](http://babeljs.io/) that traduce our hand-made ES6 (and even ES7!) code into ES5 compliant code. This *transpiler* help us to adopt the latest tools in our code without worrying about if it's supported by browsers or servers: as long as they supports ES5 (and most of them do) our code will work. There are a lot of transpilers out there, you can find a more complete list [here](https://github.com/jashkenas/coffeescript/wiki/List-of-languages-that-compile-to-JS).

Now that we know about what Babel is and what it does, let's dig into some of the features of ES6 used in the code snippet.

## ES6 Features

### Classes

ES6 introduces language support for classes, via the `class` and `constructor` keywords. While in ES5 you had to use something like this:

{% highlight js %}

var Car = (function () {
  function Car(model) {
    this.model = model;
    this.currentSpeed = 0;
  }

  Car.prototype.printCurrentSpeed = function printCurrentSpeed() {
    console.log(this.model + ' is going ' + this.currentSpeed + ' km/h');
  };

  return Car;
})();

{% endhighlight %}

In ES6, you can simply do:

{% highlight js %}

class Car {
  constructor(model) {
    this.model = model;
    this.currentSpeed = 0;
  }

  printCurrentSpeed(){
    console.log(this.model + ' is going ' + this.currentSpeed + ' km/h');
  }
}

{% endhighlight %}

And produce the same result. You also have other features like class inheritance (via the `extends` keyword), static members (via the `static` keyword) and getters/setters (via the `get` and `set` keywords). You get the point.

## Arrow Functions

A simple way to create closures with the addition of *auto* context handling (i.e. you don't have to worry about saving the `this`). In ES5, it's often to see something like this:


{% highlight js %}

...
Car.prototype.accelerate = function accelerate() {
  var self = this;
  setInterval(function () {
    this.currentSpeed++;
  }, 1000);
};

{% endhighlight %}

Now in ES6 you can implement the same using this code (notice that we are adding a new member to the Car class).

{% highlight js %}

...
accelerate(){
  setInterval(() => {
    this.currentSpeed++;
  }, 1000);
}

{% endhighlight %}

And even this:

{% highlight js %}

...
accelerate(){
  setInterval(() => this.currentSpeed++, 1000);
}

{% endhighlight %}

Which makes our code more readable.

### Modules

This is a huge improvement for client-side apps: the ability to organize code as independent modules and decide what to expose between them (just like Node!). This will be provided natively in the browsers, meaning that we don't have to use custom libraries, like [RequireJS](http://requirejs.org/) as we do today. 

There are several combinations to import/export, let's analyze the basic ones:

{% highlight js %}

// module1.js
export function add(a, b){ return a + b; };
export default (a, b) => a * b; 
export var customValue = 2;
export var otherValue = 3;

// main.js
import add from './module1.js';
import multiply from './module1.js';
import {customValue, otherValue} from './module1.js';
import {customValue: a, otherValue: b} from './module1.js';

multiply(customValue, otherValue); // 2 * 3 = 6
add(a, b); // 2 + 3 = 5

{% endhighlight %}

Now, let's analyze each one of them:

* First, `import add from './module1.js'` will import the **add** function declared in `module.1js` to the 'main.js' file.
* Similarly, `import multiply from './module1.js'` will import the *default export* of the 'module1.js' file to the variable **multiply** of the 'main.js' file. Note that there can be only one default export per module, but n named exports, which makes sense.
* Then `import {customValue, otherValue} from './module1.js'` will import the **customValue** and **otherValue** variables to the 'main.js' file. This syntax is named *Destructuring Assignment* and is another feature provided by ES6, we'll get to that in the next section.
* Finally, `import {customValue: a, otherValue: b} from './module1.js'` (again the 'main.js' file) wil import `customValue` and `otherValue` to the 'main.js' file, but this time by assigning their values to the local **a** and **b** variables.

One more thing. Alternatively, you can use `import * from './module1.js'` to import the whole module namespace object into another file, and access them via their names.

> **Note:** Babel translates the `import` lines above to something similar to this:
> {% highlight js %}
  var $ = require('lib/jquery');
  {% endhighlight %}
    
>   This is because browsers currently do not support `import`/`export` syntax and thus Babel fallsback is `CommonJS` module syntax, which is natively supported in node  applications. To make your client-side code to understand this, you should use an external module loader library than supports [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) module syntax, like [Webpack](https://webpack.github.io/) or [JSPM](http://jspm.io/).

### Destructuring assignment

ES6 introduces a new syntax to easily extract data from arrays or objects that is similar to the syntax used for constructing arrays of objects. For instance:

{% highlight js %}

// ES6
var item = { id: 1, name: 'bike', qty: 10 };
var { id, name, qty } = item;

// ES5 (translated)
var item = { id: 1, name: 'bike', qty: 10 };
var id = item.id;
var name = item.name;
var qty = item.qty;

{% endhighlight %}

In case of arrays:

{% highlight js %}

// ES6
var items = [ 1, 2, 3 ];
var [ a, , c] = items;

// ES5 (translated)
var items = [1, 2, 3];
var a = items[0];
var c = items[2];

{% endhighlight %}

You can do a lot of other things, like deep matching, swapping variables, multiple-value returns (returning an array and set its elements to n variables in just one line), etc.

### Spread Operator

The spread operator (...iterableObj) allows an expression to be expanded in places where multiple arguments/elements are expected. This operator simplifies the need of concatenating arrays, splitting strings or pushing items to an array.

Let's see some examples:

{% highlight js %}

var elements = ['a', 1, false];
var other = [1, 2, ...params] // [1, 2, 'a', 1, false]
doSomething(1, 2, ...params); // doSomething.apply(null, [1, 2, 'a', 1, false])

var sayHello = 'Hello!';
var chars = [...sayHello] // ['H', 'e', 'l', 'l', 'o', '!']

var items = [1, 2, 3];
var otherItems = [4, 5, 6];
items.push(...otherItems); // [1, 2, 3, 4, 5, 6]

{% endhighlight %}

Weird, but much simpler, right?

### Variable declaration

ES6 adds two new keywords for declaring variables: `let` and `const`, which could, in time, replace the `var` keyword. The difference is scoping: while `var` is scoped to the nearest function block, `let` is scoped to the nearest enclosing block (for instance, a `for` loop or an `if` statement), improving the encapsulation of our code. 

{% highlight js %}

function doSomething() {
  var a = 1;
  if (a === 1) {
    let b = 2;
    console.log(b); // Outputs 2
  }
  console.log(a); // Outputs 1
  console.log(b); // Throws ReferenceError
}
 
doSomething();
console.log(b); // Throws ReferenceError

{% endhighlight %}

Finally, `const` is used for any variable where the reference should never be changed, and mantains the same scoping rules as let. Of course there are differences depending on the value: if we use `const` in a primitive we are not allowing a change of the value, while if we use it in an array we are just allowing a change in the reference, but we can add or remove elements inside the array.

### Wait wait ..what about the '@'?

Remember this line? `@connect(state ==> ({ .... })`. Well, the '@' syntax is used for **ES7 Decorators** and it's used to add behavior to a given object, independently of other instances of the same class. You could think that it's too soon to use ES7, but since Babel supports it, some libraries like [Redux](http://redux.js.org/) are already using it. You cand find a very good explanation of decorators [here](https://github.com/wycats/javascript-decorators).

And I think that's pretty much it for now. Hope you enjoyed reading, happy coding!
