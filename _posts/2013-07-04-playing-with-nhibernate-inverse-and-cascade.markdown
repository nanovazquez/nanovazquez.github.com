---
layout: post
title: Playing with NHibernate - Inverse and Cascade mapping attributes
categories: [nhibernate]
tags : [nhibernate, c#]
---
{% include JB/setup %}

Although I'm a big fan of [Entity Framework](http://www.asp.net/entity-framework), I have to admit that [NHibernate](http://nhforge.org/) provides a really flexible way of handling class inheritance and parent-child relationship. That said, I've noticed that these two important concepts are not very well explained in the [documentation](http://nhforge.org/doc/nh/en/), which leads to a several discussions and debates in the community about the proper way of mapping your tables (and sometimes to explanations that state the opposite). 

Consider the explanation of the *inverse* mapping (taken from the map collection):

> **Inverse**: (optional - defaults to false) mark this collection as the "inverse" end of a bidirectional association.

If you think this explanation is incomplete, that makes two of us. Of you couse if you navigate through the docs you will see more detailed explanations of the concept, but there isn't a complete example nor one that analyzes how you set this attribute and the **cascade** (another mapping attribute). In the next few lines, I'm going to (try to) explain this in a simple way.

## Scenario - One to many relationship 

Let's analyze an scenario in which you have Products and Categories, in a way that one Category can have many Products (one-to-many relationship). 

In this case, the Database diagram and the model classes should look similar to this:

![Database diagram](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/playing-with-nhibernate-inverse-and-cascade/database-diagram.png)

<br />

![Model classes](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/playing-with-nhibernate-inverse-and-cascade/model-classes.png)

## Basic mapping (default values)

Next, we are going to create mappings for these classes. Let's start with a basic mapping, just to see how NHibernate behaves by default (notice that the Products bag in the Category mapping does not have the inverse attribute set):

![Basic mapping](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/playing-with-nhibernate-inverse-and-cascade/basic-mapping.png)

We are going to run a simple test case that creates a Category with 3 Products and saves everything in the DB. For this, we are setting the **Product.Category** property of each product before saving the data. Notice that we need to do everything ourselves: we have to associate the Category on each Product and we also have to save each entity in the session separately (and in a specific order):

![Basic mapping - Using Product.Category](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/playing-with-nhibernate-inverse-and-cascade/basic-mapping-using-product-category.png)

Using this approach, NHibernate will generate the expected SQL statements (3 INSERTS), as you can see in the image above. There is an important caveat on this approach: you need to make sure that you're saving the entities <u>in the right order</u>. If you save the Products in the session before saving the Category, when commiting the transaction NHibernate will behave as follows:

* First, it will execute an INSERT statement for each Product, using NULL in the CategoryId (notice that this only works if the column is nullable).
* Then, it will execute an INSERT statement to save the Category.
* And finally, it will execute an UPDATE statement for each Product to set the newly generated CategoryId.

Usually you should tend to avoid doing things on your own, like associating each Product with the Category or saving the entities in the session in the right order (that's why we use an ORM in the first place, right? :)). Fortunately, NHibernate can handle this, so let's try to remove some of our repetitive code by taking advantage of the **Inverse** and **Cascade** mapping attributes. 

## Setting Inverse to 'false' (default)

Let's analyze the way we are associating the Products with the Category. I know that some folks will prefer to set the **Category.Products** collection with the 3 Products, instead of setting the Category on each individual Product. What if I tell you that with the current mapping you can use both approaches? This is because we are using the default value of the **Inverse** attribute in the Category.Products mapping, which is *false*. This attribute tells NHibernate if the Parent is responsible of saving the **association** to its childs. The "inverse=false" mapping means that when you save the Category, you will also save the association of each Product inside the Category.Products collection with the Category (in NHibernate words, the Category.Product collection "is not the inverse end of the bidirectional association", so it has to do something). In this case it makes sense to use the default value, but in other scenarios is useful to have a way to define who's responsible of manage the association (who's the "owner"). 

![Basic mapping - Using Category.Products](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/playing-with-nhibernate-inverse-and-cascade/basic-mapping-using-category-product.png)

Although we've reduced the code a little bit, there are two problems with this approach (if we use the current mapping):

1. To save the association when saving the Category, NHibernate will use an INSERT/UPDATE approach for the Products (same as before), which won't work if we have a null constraint on the Product.CategoryId column.
1. Inverse can be used only to save entity association information, not data. Hence, we still need to save each item individually. If we save the category only, NHibernate will throw the following **TransientObjectException**, simply because we are using the default **cascade** mapping value, which is **none**:

![Basic mapping - Saving the Category only will throw an exception](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/playing-with-nhibernate-inverse-and-cascade/basic-mapping-saving-category-only.png)

A way to improve this approach is by setting the **cascade** mapping attribute to other value than 'none', something that we are going to do in the next section.

## Setting Cascade mapping attribute

The **Cascade** mapping attribute helps NHibernate to decide which operations should be cascaded from the parent object to the associated object. Collections mapped with a value different to 'none' will perform extra tasks in addition to saving the entity. For instance, you can set the collection with "cascade=save-update", which means that when the object is saved/updated, NHibernate will check the associations and save/update any object that require it (for a complete explanation of all **cascade** values go here [here](http://ayende.com/blog/1890/nhibernate-cascades-the-different-between-all-all-delete-orphans-and-save-update))

Let's update the mappings of the Category class by setting the **cascade** value to **all*:

![Cascade mapping - Setting cascade mapping attribute](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/playing-with-nhibernate-inverse-and-cascade/cascade-mapping-setting-cascade-mapping-attribute.png)

Now, we can safely remove the code that saves the products. By only saving the Category in the session will be enough, since now we've instructed NHibernate to save the products in cascade.

![Cascade mapping - Setting cascade mapping attribute](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/playing-with-nhibernate-inverse-and-cascade/cascade-mapping-saving-category-only.png)

Again, NHibernate will use the INSERT/UPDATE techique, which means that it won't work if the Product.CategoryId column is not-nullable.

## Setting Inverse to 'true'

If you are facing this scenario, consider changing the **Inverse** property to *true*, which means that the Category is no longer responsible to take care of the relationship. Then, update the Products.Category property (because the Product class is now the only owner of the association) and then save your Category as before.

![Cascade-Inverse mapping - Setting cascade and inverse mapping attributes](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/playing-with-nhibernate-inverse-and-cascade/cascade-inverse-mapping-saving-category-only.png)

## Summary

To sum up what we've explained:

* The **Inverse** attribute tells NHibernate if the collection is responsible to manage the relationship. "inverse=false" means that it should manage the relationship.
* The **Cascade** attribute helps NHibernate to decide which operations should be cascaded from the parent object to the associated object. For instance, it tells NHibernate that it needs to insert the child after inserting the parent.
* Which value you use for these two properties depends on your scenario. For instance: 
	* **(one-to-many)** If your foreign-key allows nullable values, you can use a collection with "inverse=false" and a cascade value different to 'none'. When you save the Parent, NHibernate will take care of saving both childs and association. 
	* **(one-to-many)** If you have a not-nullable constraint in the DB, you can use a collection with "inverse=true" and a cascade value different to 'none'. In this case, you'll need to set up the association in the child before saving the parent.

