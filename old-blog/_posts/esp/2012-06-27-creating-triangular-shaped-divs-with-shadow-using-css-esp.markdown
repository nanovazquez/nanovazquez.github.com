---
layout: post
title: Creando DIVs triangulares con sombra usando CSS 
lang: esp
categories: [UI]
tags : [UI, css]
---
{% include JB/setup %}

In this post, I'm going to explain how you can add a shadow to a triangular-shaped div using only HTML elements & pure CSS. Probably this technique can be used to add a shadow to any non-rectangular figure (*if you can make it, you can add the shadow*), but I'm going to use triangles because they seem to be the most popular polygons these days. And I'm going to use HTML & CSS, so this is **cross-browser** (there's a great variety of examples in [CSS-Tricks](http://css-tricks.com/examples/ShapesOfCss/) about polygonal, circular and even custom-made figures. Worths reading). 

Basically, what I'm looking for is this:

![](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/creating-triangular-shaped-divs-with-shadow-using-css/result.png "Notice the triangular shape and the shadow")

(check out the code in [fiddle](http://jsfiddle.net/cdfdL/113/))

You can use the code above if you want, feel free to modify it to suit your requirements. In the next lines, I'm going to explain the key aspects of the styles, and how you can adjust them to change the arrow & shadow orientation. If that's what you want to know, keep reading.

## The Basic Structure

The HTML consist on two main divs, one for the image and another for the title and the triangle (with *item-overlay* class). Notice that the overlay is divided in three more divs, I'm going to explain why I need to do this this later, but basically you have an square element that contains the data (*item-info*) and a triangle at the top to **simulate** a polygonal shape (the one with *polygon* class, not much creativity in the names). The last two elements are for the shadow, and because in this case the triangle oriented to the right, I named the classes *polygon-shadow-top-left* and *polygon-shadow-bottom-right*.

{% highlight html %}
<div class="item">
	<div class="item-image">
		<img src="http://t.wallpaperweb.org/wallpaper/space/1920x1200/38133_1920x1200.jpg" />
	</div>
	<div class="item-overlay">
		<div class="item-info">
			<div class="title">Shuttle mission</div>
		</div>
		<div class="polygon-right"></div>
		<div class="polygon-shadow-top-right"></div>
		<div class="polygon-shadow-bottom-right"></div>
	</div>
</div>
{% endhighlight %}

I'm are not going to cover all styles applied, but know that I used **z-index** to position the image below the triangle. And the divs inside the overlay are placed right next each other using **absolute positioning** (in a future, we could achieve the same result using [CSS3 grid layout](http://dev.w3.org/csswg/css3-grid-layout/))

Now let's take a look at the styles to create a polygonal shape.

## The polygonal shape

To make this shape I used two divs: a square element (as usual) that contais the data (if any) and a triangular element. These two elements placed together simulates a polygonal shape:  

{% highlight css %}
/* The square */
.item .item-overlay .item-info{
	width: 140px;
	height: 100%;
	float: left;
	background-color: #005482;
}

/* The triangle */
.item .item-overlay .polygon-right{
	width: 0;
	height: 0;
	float: left;
	border-top: solid 70px transparent;
	border-bottom: solid 130px transparent;
	border-left: solid 20px #005482;
	position: relative;
	z-index: 2;
}
{% endhighlight %}

Notice that the width and the height are set to 0 in the triangle. This is because the borders take care of the final width and height of the element. You can play with these values to change the triangle's tip, in this case closer to the top.

To change the triangle orientation, you need to update the border values. For instance:

{% highlight css %}
.polygon-left{
	border-top: solid 70px transparent;
	border-bottom: solid 130px transparent;
	border-left: solid 20px #005482;
}

.polygon-top{
	border-left: solid 70px transparent;
	border-right: solid 130px transparent;
	border-bottom: solid 20px #005482;		
}

.polygon-bottom{
	border-left: solid 70px transparent;
	border-right: solid 130px transparent;
	border-top: solid 20px #005482;	
}
{% endhighlight %}
	
Now that we've discussed the triangles, it's time for the shadow.


## The polygonal shadow

For this, I need to use two separated divs. I styled them using the same **border** technique as before, but in this case I set the **width**. The reason is simple: I need the exact same figure, with the same angle, but moved a little bit to the right (like using high-heels). The **z-index** is lower than the polygon, this is to position the shadow always below the polygon.

{% highlight css %}
.item .item-overlay .polygon-shadow-top-right{
	position: absolute;
	z-index: 1;
	top: 0;
	left: 140px;
	width: 10px;
	border-right: solid 20px transparent;
	border-bottom: solid 70px rgba(0, 0, 0, 0.5);
}

.item .item-overlay .polygon-shadow-bottom-right{
	position: absolute;
	z-index: 1;
	top: 70px;
	left: 140px;
	width: 10px;
	border-right: solid 20px transparent;
	border-top: solid 130px rgba(0, 0, 0, 0.5);
}
{% endhighlight %}
	
For other orientations, you need to change the border and width/height values.

{% highlight css %}
/* Left */
.polygon-shadow-top-left{
	width: 10px;
	border-left: solid 20px transparent;
	border-bottom: solid 130px rgba(0, 0, 0, 0.5);
}

.polygon-shadow-bottom-left{
	width: 10px;
	border-left: solid 20px transparent;
	border-top: solid 130px rgba(0, 0, 0, 0.5);
}

/* Top */
.polygon-shadow-left-top{
	height: 10px;
	border-top: solid 20px transparent;
	border-right: solid 70px rgba(0, 0, 0, 0.5);
}

.polygon-shadow-right-top{
	height: 10px;
	border-top: solid 20px transparent;
	border-left: solid 130px rgba(0, 0, 0, 0.5);		
}

/* Bottom */
.polygon-shadow-left-bottom{
	height: 10px;
	border-bottom: solid 20px transparent;
	border-right: solid 70px rgba(0, 0, 0, 0.5);	
}

.polygon-shadow-right-bottom{
	height: 10px;
	border-bottom: solid 20px transparent;
	border-left: solid 130px rgba(0, 0, 0, 0.5);	
}
{% endhighlight %}