---
layout: post
title: Investigando lo nuevo de JavaScript - ES6
lang: esp
categories: [javascript, es6]
tags : [javascript, es6, babel]
---

{% include JB/setup %}

Como muchos desarrolladores, estamos en el proceso de migrar nuestros productos a las nuevas tecnologías, como ES6/Babel, Angular2, React and Webpack.

En este proceso donde uno trata de encontrar las mejores herramientas para utilizar en nuestro trabajo diario (y no solamente adoptar algo por ser novedoso), un miembro de nuestro equipo nos compartió el siguiente tweet de [@ericdfields](twitter.com/ericdfields) sobre "Javascript Moderno":

![WTF tweet](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/digging-into-the-modern-javascript-es6/tweet.png)

Luego de las risas y los chistes obligados, este tweet me hizo darme cuenta de que es una buena idea empezar a escribir algunos posts sobre las nuevas tecnologías que se vienen (cada vez con más fuerza), como una manera de allanar el camino para quienes no tienen ni idea sobre la sintaxis de arriba (como yo hace unas semanas). En las lineas siguientes de este post, voy a explicar algunos de las mejoras de la siguiente/actual/próxima generación de JavaScript. Me voy a enfocar específicamente en la sintaxis de ES6 del tweet de arriba, dejando el código de React para un nuevo post. Dicho esto, empecemos

## Introducción de ES6/Babel

ECMAScript 2015, ECMAScript Harmony, o simplemente ES6, es la sexta edición de la especificación de ECMAScript. Mientras su predecesor (ES5) está [casi completamente adoptado](http://kangax.github.io/compat-table/es5/) por navegadores y otros engines de JS, la implementación de ES6 se encuentra actualmente en progreso. En vez de esperar a que este completa, los desarrolladores podemos usar herramientas como [Babel](http://babeljs.io/) para traducir nuestro código escrito en ES6 (y hasta en ES7!) a su equivalente código en ES5. Estos *transpilers* nos ayudan a adoptar las últimas herramientas en nuestro código sin preocuparnos sobre si están soportadas por navegadores o servidores: mientras estos soporten ES5 (y muchos de ellos lo hacen), nuestro código va a funcionar. Hay muchos transpilers en el ecosistema de JavaScript, pueden encontrar una lista bastante completa [aqui](https://github.com/jashkenas/coffeescript/wiki/List-of-languages-that-compile-to-JS).

Ahora que conocemos Babel y sabemos qué hace, podemos saltar a algunos de los features de ES6 usados en el tweet de arriba:

## Mejoras de ES6

### Clases

ES6 agrega soporte nativo para clases, via los keywords `class` y `constructor`. Mientras en ES5, uno tenía que escribir algo asi:

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

En ES6, uno simplemente tiene que hacer lo siguiente para obtener el mismo resultado:

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

También hay otras mejoras como herencia, (via el keyword `extends`), miembro estáticos (via el keyword `static`) y getters/setters (via los keywords `get` y `set` keywords). Bastante simple y obvio.

## Arrow Functions

En ES6 existe una mejor manera de crear closures, con la adición de que el contexto es manejado automáticamente (i.e. no tenes que preocuparte por guardar el `this`). Actualmente es muy común ver algo como esto en el código (notar que estamos implementando un nuevo miembro par la clase Car).


{% highlight js %}

...
Car.prototype.accelerate = function accelerate() {
  var self = this;
  setInterval(function () {
    this.currentSpeed++;
  }, 1000);
};

{% endhighlight %}

Ahora con ES6 uno puede hacer lo mismo usando el siguiente código:

{% highlight js %}

...
accelerate(){
  setInterval(() => {
    this.currentSpeed++;
  }, 1000);
}

{% endhighlight %}

Y aún esto, lo que mejora la legibilidad de nuestro código:

{% highlight js %}

...
accelerate(){
  setInterval(() => this.currentSpeed++, 1000);
}

{% endhighlight %}


### Modules

Esto es una *gran** mejora para las aplicaciones client-side: la abilidad para organizar nuestro código en módulos independientes y poder elegir que exponer entre ellos (como en Node!). Y soportado nativamente, lo que significa que no vamos a tener que agregar librerías externas para esto como hacemos actualmente, como [RequireJS](http://requirejs.org/).

Hay muchas combinaciones para importar/exportar cosas (variables, funciones, objetos, etc), analicemos primero las más básicas:

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

En detalle:

* `import add from './module1.js'` va a importar la función  **add** declarada en el archivo `module.1js` al archivo 'main.js' (archivo y módulo pasan a ser equivalentes).
* `import multiply from './module1.js'` va a importar la función declarada como *default export* en el archivo 'module1.js' en la variable **multiply** del archivo 'main.js'. Puede haber sólo un default export por módulo, pero varios exports con nombre (como el de arriba), lo cual tiene sentido.
* `import {customValue, otherValue} from './module1.js'` va a importar las variables **customValue** y **otherValue** al archivo 'main.js'. La sintaxis utilizada para ello se llama *Destructuring Assignment*, otra nueva herramienta que nos provee ES6. Veremos más sobre ella en la siguiente sección.
* `import {customValue: a, otherValue: b} from './module1.js'` (again the 'main.js' file) importará las variables `customValue` y `otherValue` en el archivo 'main.js', pero esta vez serán asignadas a variables de nombre **a** y **b** respectivamente.

Una cosa más. Alternativamente, uno puede usar un comodín para importar el módulo completo en otro archivo/módulo. Por ejemplo, si usamos `import * as module1 from './module1.js'` tendremos acceso a todo el namespace del módulo 1 (e.g. `module1.customValue`).

> **Note:** Babel traduce los `import` en algo similar a esto:
> {% highlight js %}
  var $ = require('lib/jquery');
  {% endhighlight %}
    
> Esto es porque los browsers actualmente no soportarn esta funcionalidad. Babel entonces traduce los `import`/`export` en sintaxis [CommonJS](http://wiki.commonjs.org/wiki/CommonJS), la cual es soportada nativamente en aplicaciones node (server-side). Pero para que una aplicación web entienda esta sintaxis, uno debe usar una librería externa para cargar módulos que soporte [CommonJS](http://wiki.commonjs.org/wiki/CommonJS), como [Webpack](https://webpack.github.io/) or [JSPM](http://jspm.io/).

### Destructuring assignment

ES6 introduce una nueva sintaxis para extraer información de arrays u objetos muy similar a la utilizada para construirlos. Por ejemplo, para objetos:

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

En el caso de arrays: 

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

Se pueden hacer muchas otras cosas, como "deep matching" (obtener valores de propiedades anidadas), swap de variables en una línea (`[a, b] = [b, a]`), separar los valores de un array retornado por una función en varias variables (todo en una sola línea), etc.

### Spread Operator

Este operador (...iterableObj) permite expandir una expresión para utilizarla en lugares donde se espera recibir varios argumentos/elementos, removiendo la necesidad de, por ejemplo, concatenar arrays, separar strings o agregar items a un array para realizar otra tarea.

Veamos un par de ejemplos:

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

Si, es raro. Pero simplifica bastante.

### Variable declaration

En ES6 se agregan dos nuevas formas para declarar variables, `let` and `const`, las cuales podrían en algún momento reemplazar completamente a `var`. La diferencia reside en el **scope**: mientras que `var` es visible dentro de toda la función donde fue definida (o es global), `let` sólo es visible en el bloque donde fue definida (por ejemplo, un `if` o un ciclo `for`), mejorando la encapsulación de nuestro código. Notar también que `let` puede usarse de la misma manera que actualmente usamos `var`, sólo es cuestión de subir la declaración a un bloque superior.

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

Finalmente, `cost` se utiliza para referenciar las variables que no deben cambiar nunca (son constantes), y mantiene las mismas reglas de scope que `let`.`Por supuesto, hay una diferencia si designamos a una primitiva o a un array como constante: para la primera no se va a permitir que se cambie su valor mientras que para el segundo caso sólo estamos definiendo como constante la referencia al array, pudiendo agregar o remover valores de éste.


### Y qué hay sobre el '@'?

Recuerdan esta línea del tweet `@connect(state ==> ({ .... })`? Bueno, el `@` se utiliza para definir un **ES7 Decorator**, los cuales se utilizan para agregarle comportamiento a un objeto determinado, independientemente de otras instancias del mismo tipo (o clase). Uno podría pensar que es muy pronto para hablar de ES7, pero dado que Babel soporta esta sintaxis, algunas librerías como [Redux](http://redux.js.org/) ya lo están utilizando. Pueden encontrar una muy buena explicación sobre decoradores [here](https://github.com/wycats/javascript-decorators).

<br>

Y eso es todo por ahora. Espero que hayan disfrutado la lectura. Happy coding!
