# Cómo elegir entre Angular y React para tu próxima aplicación

![](https://cdn-images-1.medium.com/max/1600/1*0twlyPRIq5xrGT45RAaEYQ.png)

En este post, vamos a analizar estas dos librerías y tratar de aprender sus similitudes y diferencias, lo cual te ayudará a decidir cuál de las dos usar en tu nuevo proyecto. Intentaremos utilizar nuestro mejor juicio dado que, para bien o para mal, esta decisión va a vivir contigo por un tiempo. Todos hemos estado en esta misma situación.

Estas son algunas de las preguntas que intentaremos responder hoy:

- Cuál es el objetivo de estas librerías? En qué se diferencian?
- Cómo puedo empezar a desarrollar con ellas? Va a ser difícil al comienzo?
- Cómo va a verse mí código si uso Angular o React?

> **_If you want to read the English version of this article, click_** [**_here_**](https://medium.com/@nanovazquez/how-to-choose-between-angular-and-react-for-your-next-application-48878905107a)**_._**

---

### Arquitectura y conceptos

**Angular** es desarrollado por Google y se presenta como el [One framework](https://angular.io/) para crear tu aplicación web o mobile, presumiendo sobre su increíble performance, el tooling y la popularidad entre los desarrolladores.

**React** es desarrollado por Facebook y se presenta como una [librería de JavaScript para construir interfaces de usuario](https://reactjs.org/). Afirma tener un enfoque declarativo fácil de seguir y una arquitectura basada en componentes que puedes reutilizar a través de stacks tecnológicos diferentes.

Ambas librerías son utilizadas internamente en estas empresas, por loo que puedes estar seguro que estos grandes jugadores van a continuar apostando en estas tecnologías por un buen tiempo.

![](https://cdn-images-1.medium.com/max/1600/1*AVDkPkfpHxgSk9WiiAikvA.png)Tanto Angular como React promueven una arquitectura basada en componentes

Y qué podemos apreciar respecto a sus diferencias?

- **Angular** dice ser un UI framework, mientras que **React** es una UI library. En la práctica, esto significa que Angular viene con muchas funcionalidades y es más opinionado al respecto de cómo debes implementar tu aplicación. Pero aunque **React** da más libertad en las librerías que puedes utilizar en tu aplicación (para ruteo, manejo de estado, fetching, testeo unitario, etc.), hay un set de librerías mainstream bastante establecido que posiblemente terminarás utilizando.
- Tanto **Angular** como **React** proponen el encapsulamiento de la lógica de negocio en componentes. Y luego integrar pequeños componentes en otros más grandes, para así crear UIs más complejas.

> En la realidad, no hay grandes diferencias en el modelo arquitectural que proponen para tu aplicación y puedes hasta terminar con una experiencia de desarrollo similar, dependiendo de las otras librerías que utilices para complementar Angular y React.

Una cosa más para mencionar es que ambas utilizan la licencia de MIT, un tema importante para tener en cuenta si tienes planeado utilizar alguna de ellas en tu empresa.

### Estilos de código

Dado que vamos a escribir mucho código con estas herramientas, es importante que sus estilos nos gusten. Veamos cómo se escribe un simple componente _HelloMessage_ utilizando cada una de estas librerías:

<iframe width="700" height="250" src="/media/404c7efb8b3573e6934202eab20fe0a9?postId=217f99f624b8" data-media-id="404c7efb8b3573e6934202eab20fe0a9" allowfullscreen="" frameborder="0"></iframe>Angular “HelloMessage” component<iframe width="700" height="250" src="/media/493b38faa20c97f1acd0fb8f4da731e4?postId=217f99f624b8" data-media-id="493b38faa20c97f1acd0fb8f4da731e4" data-thumbnail="https://i.embed.ly/1/image?url=https%3A%2F%2Favatars1.githubusercontent.com%2Fu%2F1306634%3Fs%3D400%26v%3D4&amp;key=a19fcc184b9711e1b4764040d3dc5c07" allowfullscreen="" frameborder="0"></iframe>React “_HelloMessage_” component

Como hemos visto, los estilos para construir componentes son diferentes. Angular utiliza el [decorador @Component](https://angular.io/api/core/Component) para crear componentes y una combinación de HTML y directivas para [templating](https://angular.io/guide/template-syntax). En paralelo, React utiliza la [clase Componente](https://reactjs.org/docs/components-and-props.html) y una sintaxis tipo-HTML llamada [JSX](https://reactjs.org/docs/introducing-jsx.html) para crear componentes, ambos conviviendo en el mismo archivo JS.

![](https://cdn-images-1.medium.com/max/1600/1*sDROcFBImu-8-V-E54bTRw.png)Cada componente encapsula lógica de negocio específica

Elegir un enfoque sobre el otro es completamente subjetivo, pero algunas veces tienes un requerimiento que ayuda a inclinar la balanza. Por ejemplo, si en tu equipo tienes diseñadores que se sienten más a gusto entregando archivos HTML, Angular puede ser una mejor opción para ti. _Por supuesto, tendrás que decirle a los desarrolladores que aprendan la sintaxis especial de Angular para poder aplicarla en estos archivos._

### Curva de aprendizaje y tooling

Dado que **Angular** es un framework, al instalarlo uno encontrará muchas funcionalidades que desconoce, lo que puede ser muy abrumador. **React** sólo requiere un poco de conocimiento sobre JavaScript y JSX, lo cual puede parecer más fácil para los recién llegados. Sin embargo, a medida que uno va agregando complejidad en la aplicación, uno tiene que aprender temas complejos como ruteo, manejo de estados, llamadas asíncronas, etc.

Afortunadamente, ambas librerías tienen una gran documentación que puede ayudarte a ponerte al día Además existen muchísimas herramientas que te ayudarán en la creación de tu primera aplicación. Recomiendo que revises [Angular CLI](https://cli.angular.io/) y [Create React app](https://github.com/facebook/create-react-app), ambas herramientas son excelentes y estoy seguro que las amarás.

![](https://cdn-images-1.medium.com/max/1600/1*reHLz0Jw2pxiVfegh5eujA.png)Create React app

> Para más información, navega a la [documentación de Angular](https://angular.io/docs) o la [documentación de React](https://reactjs.org/docs/getting-started.html).

### **Ciclo de vida de la aplicación**

Este tema contiene las diferencias más significativas entre ambas herramientas:

Por un lado, **Angular** utliza un two-way data binding para conectar los elementos del DOM con el modelo que almacena los datos. Y los mantiene sincronizados gracias a un algoritmo de detección de cambios que automáticamente obtiene las modificaciones en los datos y las aplica en el modelo. Es necesario una serie de posts aparte para poder explicar los detalles de este algoritmo, por ahora sólo necesitamos saber que Angular intercepta todos los eventos asíncronos del browser que pueden potencialmente cambiar el modelo (una llamada AJAX, un evento _onChange_) y uno no tiene que ocuparse de implementar el control de cambios, como se observa en el siguiente código:

<iframe width="700" height="250" src="/media/a5587f007a37b8db8a7c119d2578d5ed?postId=217f99f624b8" data-media-id="a5587f007a37b8db8a7c119d2578d5ed" data-thumbnail="https://i.embed.ly/1/image?url=https%3A%2F%2Favatars1.githubusercontent.com%2Fu%2F1306634%3Fs%3D400%26v%3D4&amp;key=a19fcc184b9711e1b4764040d3dc5c07" allowfullscreen="" frameborder="0"></iframe>

En cambio, **React** utiliza un mecanismo explícito de para actualizar el estado de los componentes (esto quiere decir, que debes llamar a una función para esto), pero esconde la complejidad de realizar los cambios en el DOM de manera eficiente al utilizar un [Virtual DOM](https://reactjs.org/docs/faq-internals.html#what-is-the-virtual-dom), una copia del DOM en memoria. Los datos viajan siempre en una dirección (del componente al DOM), por lo que utiliza one-way data binding.

<iframe width="700" height="250" src="/media/5e3aa4af088c53253a54e04f8c387cca?postId=217f99f624b8" data-media-id="5e3aa4af088c53253a54e04f8c387cca" data-thumbnail="https://i.embed.ly/1/image?url=https%3A%2F%2Favatars1.githubusercontent.com%2Fu%2F1306634%3Fs%3D400%26v%3D4&amp;key=a19fcc184b9711e1b4764040d3dc5c07" allowfullscreen="" frameborder="0"></iframe>

Aunque cada uno utilice técnicas diferentes, en la mayoría de los casos no notarás ninguna diferencia en términos de performance ten en cuenta que estas librerías están fuertemente testeadas en miles de aplicaciones). Si existen diferencias al escribir componentes, pero queda en tu criterio personal decidir qué estilo prefieres.

### Tipado estático

**Angular** viene con [TypeScript](https://www.typescriptlang.org/), un superset tipado de JavaScript, y propone el uso de clases de OOP [para desarrollar componentes](https://angular.io/guide/architecture-components). **React** no sugiere el uso de un sistema de tipos, aunque tiene una sección muy útil en su documentación que explica [cómo agregar Flow o TypeScript en un proyecto](https://reactjs.org/docs/static-type-checking.html). Es también menos opinionado sobre cómo debes [escribir tus componentes](https://reactjs.org/docs/components-and-props.html#function-and-class-components), y puedes utilizar tanto funciones como clases para ello.

![](https://cdn-images-1.medium.com/max/1600/1*8M0R3-3FhzOgPny730sb8Q.png)Angular and React soportan lenguajes con tipado estático (como TypeScript) para construir aplicaciones de gran escala

### Conclusión

Tanto Angular como React son grandes opciones para tu próxima aplicación. Como hemos visto en este post, elegir una por sobre la otra está más relacionado con las preferencias personales que con una ventaja potencial en términos de performance, features, ecosistema o tamaño de la comunidad de desarrolladores.

Está en ti decidir qué estilo te gusta más. Cuando lo hagas, me interesa saber las razones (si es que las hay) que tenido en cuenta para tomar la decisión. Puedes contactarte conmigo via [Twitter](https://twitter.com/nanovazquez87) o [MeetupJS Slack](https://meetupjs.slack.com/). Nos vemos!

🎉🎉🎉
