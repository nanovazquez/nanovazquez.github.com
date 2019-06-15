---
layout: post
title: Digging into the modern JavaScript - ES6
lang: eng
categories: [javascript, es6]
tags: [javascript, es6, babel]
---

{% include JB/setup %}

As many JS developers nowadays, we are in the process of migrating our existent products to the new technologies, like ES6/Babel, Angular2, React and Webpack.

In this amazing journey of trying to find the best tools for our daily jobs (and not new sexy things that just reinvent the wheel), a member of the dev team shared with us a tweet of [@ericdfields](twitter.com/ericdfields) about Modern JavaScript:

![WTF tweet](./images/tweet.png)

After the WFT moment, I realized that it is a good moment to start writing some posts in a way to ease the path to this "new modern world" for the ones with no clue of that syntax (like me a few weeks ago). In this post, I'm going to explain some of the features of the next/current/upcoming JavaScript generation. I'm going to focus specifically in the ES6 syntax of the tweet above, leaving the React stuff for a next post. That said, let's get started:

## ES6/Babel introduction

ECMAScript 2015, ECMAScript Harmony, or simply ES6, is the sixth edition of the ECMAScript specification. While his predecesor (ES5) is [widely adopted](http://kangax.github.io/compat-table/es5/) by browser and other JS engines, the implementation of the ES6 spec is still in progress. Instead of waiting, we devs can use tools like [Babel](http://babeljs.io/) to traduce our hand-made ES6 (and even ES7!) code into its equivalente in ES5. This _transpiler_ help us to adopt the latest tools in our code without worrying about if they are supported by browsers or servers: as long as they supports ES5 (and most of them do) our code will work. There are a lot of transpilers out there, you can find a more complete list [here](https://github.com/jashkenas/coffeescript/wiki/List-of-languages-that-compile-to-JS).

Now that we know about what Babel is and what it does, let's dig into some of the features of ES6 used in the code snippet.

## ES6 Features

### Classes

ES6 introduces language support for classes, via the `class` and `constructor` keywords. While in ES5 you had to use something like this:

{% highlight js %}

var Car = (function () {
function Car(model) {
this.model = model;
this.currentSpeed = 0;
}i

Car.prototype.printCurrentSpeed = function printCurrentSpeed() {
console.log(this.model + ' is going ' + this.currentSpeed + ' km/h');
};

return Car;
})();

{% endhighlight %}

In ES6, you can simply write the lines below to produce the same result:

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

You also have other improvements like class inheritance (via the `extends` keyword), static members (via the `static` keyword) and getters/setters (via the `get` and `set` keywords). You get the point.

## Arrow Functions

A simple way to create closures with the addition of _auto_ context handling (i.e. you don't have to worry about saving the `this`). Currently it's often to see something like this in the code (notice that we are adding a new member to the Car class):

{% highlight js %}

...
Car.prototype.accelerate = function accelerate() {
var self = this;
setInterval(function () {
self.currentSpeed++;
}, 1000);
};

{% endhighlight %}

Now with ES6 you can implement the same using this code:

{% highlight js %}

...
accelerate(){
setInterval(() => {
this.currentSpeed++;
}, 1000);
}

{% endhighlight %}

And even this, which makes our code more readable:

{% highlight js %}

...
accelerate(){
setInterval(() => this.currentSpeed++, 1000);
}

{% endhighlight %}

### Modules

This is a huge improvement for client-side apps: the ability to organize our code as independent modules and explicitly decide what to expose between them (just like Node!). And provided natively in the browsers, meaning that we don't have to use custom libraries for this, like [RequireJS](http://requirejs.org/) as we do today.

There are several combinations to import/export things (variables, functions, objects, etc), let's analyze the basic ones first:

{% highlight js %}

// module1.js
export function add(a, b){ return a + b; };
export default (a, b) => a \* b;
export var customValue = 2;
export var otherValue = 3;

// main.js
import add from './module1.js';
import multiply from './module1.js';
import {customValue, otherValue} from './module1.js';
import {customValue: a, otherValue: b} from './module1.js';

multiply(customValue, otherValue); // 2 \* 3 = 6
add(a, b); // 2 + 3 = 5

{% endhighlight %}

In detail:

- `import add from './module1.js'` will import the **add** function declared in the `module.1js` file to the 'main.js' file (notice than file and module are now equivalents).
- `import multiply from './module1.js'` will import the function declared as _default export_ of the 'module1.js' file to the variable **multiply** of the 'main.js' file. Note that there can be only one default export per module, but many named exports (like the one above), which makes sense.
- `import {customValue, otherValue} from './module1.js'` will import the **customValue** and **otherValue** variables to the 'main.js' file. This syntax is named _Destructuring Assignment_ and is another feature provided by ES6, we'll get to that in the next section.
- `import {customValue: a, otherValue: b} from './module1.js'` wil import `customValue` and `otherValue` to the 'main.js' file, but this time by assigning their values to the variables named **a** and **b**, respectively.

One last thing. Alternatively, you can use a wildcard to import the whole module namespace into another file/module, using a single line. For instance, `import * as module1 from './module1.js'` will give you access to the whole module via `module1` (e.g. `module1.customValue`).

> **Note:** Babel translates the `import` lines to something similar to the example below:
> {% highlight js %}
> var \$ = require('lib/jquery');
> {% endhighlight %}

> This is because browsers currently do not support `import`/`export` functionality. Hence, Babel fallsback to [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) module syntax because it's natively supported in node applications. But to make your client-side code understand this, you should use an external module loader library than supports [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) module syntax, like [Webpack](https://webpack.github.io/) or [JSPM](http://jspm.io/).

### Destructuring assignment

ES6 introduces a new syntax to easily extract data from arrays or objects that is similar to the syntax used for constructing arrays of objects. For instance:

{% highlight js %}

// ES6
var item = { id: 1, name: 'bike', qty: 10 };
var { id, name, qty } = item;

{% endhighlight %}

{% highlight js %}

// ES5 equivalent
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

{% endhighlight %}

{% highlight js %}

// ES5 equivalent
var items = [1, 2, 3];
var a = items[0];
var c = items[2];

{% endhighlight %}

You can do a lot of other things, like "deep matching" (extract values from nested properties), swapping variables in one line (`[a, b] = [b, a]`), separate the values of an array returned by a function into several variables (in just one line), etc.

### Spread Operator

This operator (...iterableObj) allows an expression to be expanded in places where multiple arguments/elements are expected, removing the need of (for instance) concatenating arrays, splitting strings or pushing items to an array before doing a primary task.

Let's see some examples:

{% highlight js %}

var elements = ['a', 1, false];
var other = [1, 2, ...params] // [1, 2, 'a', 1, false]
doSomething(1, 2, ...params); // doSomething.apply(null, [1, 2, 'a', 1, false])

var hello = 'Hello!';
var chars = [...hello] // ['H', 'e', 'l', 'l', 'o', '!']

var items = [1, 2, 3];
var otherItems = [4, 5, 6];
items.push(...otherItems); // [1, 2, 3, 4, 5, 6]

{% endhighlight %}

Weird, but much simpler, right?

### Variable declaration

ES6 adds two new keywords for declaring variables: `let` and `const`, which could, in time, replace the `var` keyword. The difference is scoping: while `var` is scoped to the nearest function block (or global), `let` is scoped to the nearest enclosing block (for instance, a `for` loop or an `if` statement), improving the encapsulation of our code. Notice that `let` can be used the same way we use `var`, just by moving it to the nearest function block (probably just one level up).

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

Finally, `const` is used for any variable where the reference should never be changed, and mantains the same scoping rules as `let. Of course there are differences depending on the value: if we use`const` in a primitive we are not allowing a change of the value, while if we use it in an array we are just allowing a change in the reference, but we can add or remove elements inside the array.

### Wait wait ..what about the '@'?

Remember this line in the tweet `@connect(state ==> ({ .... })`? Well, the '@' syntax is used for **ES7 Decorators** and it's used to add behavior to a given object, independently of other instances of the same class. You could think that it's too soon to use ES7, but since Babel supports it, some libraries like [Redux](http://redux.js.org/) are already using it. You cand find a very good explanation of decorators [here](https://github.com/wycats/javascript-decorators).

<br>

And I think that's pretty much it for now. Hope you enjoyed reading, happy coding!
