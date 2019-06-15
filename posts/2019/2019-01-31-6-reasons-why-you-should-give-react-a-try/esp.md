# 6 razones para probar a React

Actualmente React es una de las librerías open source más populares. En este artículo, voy a tratar de explicar por qué deberías usar React en tu nueva aplicación, especialmente si es una aplicación web, mobile o de escritorio.

**_Si quieres leer la versión en inglés de este artículo, haz click_** [**_aqui_**](https://medium.com/@nanovazquez/6-razones-para-darle-una-prueba-a-react-8f114b77ac70)**_._**

---

### #1 React es fácil de aprender

React es una librería muy simple y liviana que tiene una rápida curva de aprendizaje _(se aprende mucho en poco tiempo)_. Esto es debido a su simplicidad, dado que sólo se ocupa de la capa de Vista de una aplicación. Un desarrollador JavaScript que quiera utilizar React sólo tiene que aprender los conceptos básicos, y uno puede hacerlo al leer cualquiera de los excelentes tutoriales que hay. En un día, puedes tener una simple aplicación web funcionando.

Estas son las principales razones por las cuales tantos programadores y companías confían en el ecosistema de React para desarrollar la siguiente generación de aplicaciones. Algunos ejemplos de estas compañiás son Facebook, Dropbox, Netflix, Airbnb, Paypal, etc., pero uno mismo puede corroborar su popularidad simplemente googleando “React”. Noten cómo el interés ha amuentado a través de los años (_línea azul_):

![](https://cdn-images-1.medium.com/max/1600/1*eGZtf8lLXhwK062fYUExIw.png)Comparación en Google Trends entre las librerías front-end más populares

Aunque la misma comunidad de desarrolladores de React genera muchísimos tutoriales excepcionales en diferentes formatos (blogs, videos, podcasts), les recomiendo que empiecen con el tutorial [**Getting Started**](https://reactjs.org/docs/getting-started.html) de la documentación oficial de Facebook. En éste, puedes encontrar tanto un _curso práctico_ para quienes prefieren aprender codeando. O puedes _aprender los conceptos paso a paso_, en caso de que prefieras un enfoque más teórico, un tema a la vez.

### #2 Separa tu aplicación en componentes reutilizables

React promueve el uso de una estructura de componentes para crear interfaces de usuario avanzadas.

> **Qué son los componentes?** Los componentes son como _piezas de Lego_, que encapsulan algo de lógica específica, pero que se complementan con otros componentes para construir la idea general.

![](https://cdn-images-1.medium.com/max/1600/1*8M0R3-3FhzOgPny730sb8Q.png)Las aplicaciones de React se implementan usando componentes

**Cómo?** Uno comienza con pequeños componentes (textbox, button, checkbox) que se muestran en _páginas_, las cuales también son componentes. Pero luego uno tiene que crear algo “superior” a esas páginas que se encargue de manejarlas y de proveer funcionalidad común, como _navegación_ o _manejo de estado_. Uno puede también utilizar este _concepto_ para crear estas piezas modulares, y así sucesivamente hasta llegar al componente madre, la _aplicación._

Por ejemplo, noten cómo la aplicación de la imagen siguiente puede separarse en diferentes componentes (TopBar, Sidebar, Applications Page), quienes a su vez están compuestos de otros componentes más pequeños.

![](https://cdn-images-1.medium.com/max/1600/1*dCy4SBwJQ9QFhhun7B0clQ.gif)Una aplicación de React básica y sus componentes

La mayor ventaja de construir componentes es que puedes reutilizarlos en cualquier proyecto sin importar la plataforma (web, mobile o desktop), simplificando el proceso de desarrollo y habilitando a que crezcas y puedas mantener múltiples repositorioes de código con un _look and feel_ consistente, entre otras ventajas que vamos a tratar luego.

### #3 Permite que puedas enfocarte en tu código

React provee una poderosa abstracción para la manipulación de HTML. Esta abstracción permite que uno se enfoque en escribir componentes para resolver la lógica de negocio de nuestra aplicación. Y de que nos olvidemos de, por ejemplo, cómo inyectar elementos al DOM (Document Object Model) usando nuestro código, dado que React va a realizar este trabajo por nosotros, y mucho mejor que nosotros.

![](https://cdn-images-1.medium.com/max/1600/1*VH2MHqO0tHYmdX2Tbi9d3g.png)Un típico árbol de componentes de React. Notar que cuando los componentes verdes son actualizados, los azules no cambian

En resúmen, para comenzar con React uno sólo tiene aprender el ciclo de vida de los componentes y cómo pasar información entre ellos. Pero no te preocupes, todo esto se explica en _todos_ los tutoriales de React.

### #4 Desarrollo rápido gracias a grandes herramientas para desarrolladores

Tener excelentes herramientas de desarrollo a tu disposición aumentará tu productividad en muchos niveles. Vas a completar tus tareas rápidamente y tus aplicaciones serán entregadas más rápido, todo el mundo gana con esto. Por suerte, React tiene un set de herramientas sofisticado. Mencionaremos dos de ellas, pero por supuesto que hay otras disponibles para ayudarte.

#### **React Developer tools**

Esta extensión del browser es útil para inspeccionar el árbol de componentes, y cómo la información es transmitida a traves de éste via _props._

![](https://cdn-images-1.medium.com/max/1600/1*GM0asbVUF1gS4K5zlbhaDA.png)React Developer tools

#### **Redux Developer tools**

Quienes usan Redux para almacenar los datos de su aplicación definitivamente tienen que probar esta extensión. En ella, uno puede visualizar el árbol de estado además de las acciones que fueron ejecutadas en tu aplicación, incluyendo el estado _anterior_ y _posterior_ a ellas. Además, uno puede ejecutar acciones desde la herramienta y hasta _volver atrás en el tiempo_.

![](https://cdn-images-1.medium.com/max/1600/1*91S40lTp9cLDi9Hbtyuynw.png)Redux Developer tools

### #5 Reusa tu código en otras plataforma

Siguiendo la premisa de _JavaScript en todos lados_, uno puede reusar los componentes desarrollados en React en diferentes plataformas. Hay varios proyectos que te permites tomar ventaja de tu conocimiento en React (y tus componentes) en aplicaciones mobile y desktop. [**React Native**](https://facebook.github.io/react-native/)es uno de ellos, sugiero que le eches una mirada. Posiblemente te sea útil en un futuro cercano.

![](https://cdn-images-1.medium.com/max/1600/1*nac3kYIkOXRhAVjaNUSxmg.png)Reusa tus componentes de React en otras plataformas

### #6 Testea tu aplicación de manera sencilla

React es tán sencillo que testear las piezas de tu aplicación es trivial: como cada componente es, en esencia, una función que recibe parámetros, uno puede testear su comportamiento con unas pocas líneas de código. [**Jest**](https://jestjs.io/en/) es uno de los frameworks más populares para testear aplicaciones.

![](https://cdn-images-1.medium.com/max/1600/1*uzGMpGDjoKSDNiS1MGVnOA.png)Puedes testear tus componentes de React usando Jest

Además, puedes ir un paso más y tomar [**snapshots**](https://jestjs.io/docs/en/snapshot-testing)de tus componentes, para así asegurarte que tu UI no cambien de manera inesperada cuando un commit es pusheado en tu repositorio

### **Conclusión**

En concreto, React es una herramienta poderosa que seguramente simplifique tu trabajo. Este artículo resumió algunas funcionalidades que pueden explicar la popularidad de React, y estoy seguro que vas a disfrutar de estos beneficios si eliges React en tu próximo proyecto. _Pero esa decisión depende de vos._

Si lo haces, encontrarás a mi y a otros colegas que te ayudarán en el camino. Si necesitas ayuda o simplemente quieres hablar de desarrollo web, puedes contactarme en [Twitter](https://twitter.com/nanovazquez87) o [MeetupJS Slack](https://meetupjs.slack.com/).

🎉🎉🎉
