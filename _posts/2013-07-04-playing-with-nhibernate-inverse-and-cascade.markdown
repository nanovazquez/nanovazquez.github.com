---
layout: post
title: Playing with NHibernate - Inverse and Cascade mapping attributes
categories: [nhibernate]
tags : [nhibernate mappings, ASP.NET]
---
{% include JB/setup %}

Although I'm a big fan of [Entity Framework](http://www.asp.net/entity-framework), I have to admit that [NHibernate](http://nhforge.org/) provides a really flexible way of handling class inheritance and parent-child relationship. That said, I've noticed that these two important concepts are not very well explained in the [documentation](http://nhforge.org/doc/nh/en/), which leads to a several discussions and debates in the community about the proper way of mapping your tables (and sometimes to explanations that state the opposite). 

Consider the explanation of the **inverse** mapping (taken from the [NHibernate](http://nhforge.org/doc/nh/en/) docs):

> **Inverse**: (optional - defaults to false) mark this collection as the "inverse" end of a bidirectional association.

If you think this explanation is incomplete, that makes two of us. There are some examples of the concept in the docs, but I couldn't find one that fully explains what this concept means and how you can use it together with the **cascade** (another mapping attribute). In the next few lines, I'm going to (try to) do this.

## Scenario - One-to-many relationship 

Let's define a simple scenario in which you have Products and Categories. And one Category can have many Products (i.e. a one-to-many relationship). 
In this case, the Database diagram and the model classes should look similar to this:

<img alt="Database diagram" src="https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/playing-with-nhibernate-inverse-and-cascade/database-diagram.png" style="margin-bottom:0px" />

![Model classes](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/playing-with-nhibernate-inverse-and-cascade/model-classes.png)

## Basic mapping (default values)

Next, we are going to create mappings for these classes. Let's start with the default mapping values, just to see how NHibernate behaves as is:

![Basic mapping](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/playing-with-nhibernate-inverse-and-cascade/basic-mapping.png)

We are going to run a simple test case that creates a Category with 3 Products and saves everything in the DB. For this, we are setting the **Product.Category** property of each product before saving the data. Notice that we need to do everything ourselves: we have to associate the Category on each Product and we also have to save each entity in the session separately (and in a specific order, as we will be see later):

> **Note:** you can find the solution with all the test cases [here](https://github.com/nanovazquez/nhibernate-inverse-cascade-samples).

![Basic mapping - Using Product.Category](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/playing-with-nhibernate-inverse-and-cascade/basic-mapping-using-product-category.png)

As you can see in the image above, NHibernate generates the expected SQL statements (3 INSERTS). But there is an important caveat on this approach: you need to make sure that you're saving the entities **in the right order**. If you save the Products in the session before saving the Category, when committing the transaction NHibernate will behave as follows:

* First, it will execute an INSERT statement for each Product, setting NULL in the *CategoryId* (which will only work if this column is nullable).
* Then, it will execute an INSERT statement to save the Category.
* Finally, it will execute an UPDATE statement for each Product to set the newly generated *CategoryId*.

Usually you should try to avoid doing things on your own, like saving the entities in the session in the right order or associating each Product with its Category individually (that's why we use an ORM in the first place, right?). To make things easier, NHibernate can handle this. In the next few lines we'll to remove some of our repetitive code by taking advantage of the **Inverse** and **Cascade** mapping attributes. 

## Setting Inverse to 'false' (default)

Let's analyze the way we are associating the Products with the Category. I know that some folks will prefer to add the 3 Products inside the **Category.Products** collection instead of setting the Category on each individual Product. What if I tell you that with the current mapping you can use both approaches? This is because we set the **Inverse** attribute in the **Category.Products** mapping to **false** (default value). So what Inverse does? It tells NHibernate that the Parent is responsible (or not) of saving the **association** to its childs. The `inverse=false` mapping means that when you save the Category you will also save the association of each Product that is inside the **Category.Products** collection. In constrast, setting this value to *true* basically means that *"the Parent does not have the responsibility of saving the association"*. 

Check the following code. Notice that instead of setting the **Product.Category** property we are now adding the Product to the **Category.Products** collection (and it works!):

![Basic mapping - Using Category.Products](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/playing-with-nhibernate-inverse-and-cascade/basic-mapping-using-category-product.png)

Although we've reduced the code a little bit, there are two problems with this approach (if we use the current mapping):

1. To save the association, NHibernate will use an INSERT/UPDATE strategy for each Product (same as before), which won't work if we have a null constraint on the **Product.CategoryId** column.
1. **Inverse** can be used only to save entity association info, not data. Hence, we still need to save each item individually. If we save only the Category (the Parent), NHibernate will throw the following **TransientObjectException**:

![Basic mapping - Saving the Category only will throw an exception](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/playing-with-nhibernate-inverse-and-cascade/basic-mapping-saving-category-only.png)

A way to improve this approach is by setting the **Cascade** mapping attribute to a value different than 'none' (default). And that's what we are going to do in the next section.

## Setting Cascade mapping attribute

 mapping means that when you save the Category you will also save the association of each Product that is inside the **Category.Products** collection. In constrast, setting this value to *true* basically means that *"the Parent does not have the responsibility of saving the association"*. 
The **Cascade** mapping attribute helps NHibernate to decide which operations should be cascaded from the Parent object to the Child object. Collections mapped with a value different than 'none' will perform extra tasks in addition to saving the entity. For instance, you can set the collection with `cascade=save-update`, which means that when the object is saved/updated, NHibernate will check the associations and save/update any object that require it (for a complete explanation of all **cascade** values go [here](http://ayende.com/blog/1890/nhibernate-cascades-the-different-between-all-all-delete-orphans-and-save-update))

Let's update the mappings of the Category class by setting the **cascade** value to **all**:

![Cascade mapping - Setting cascade mapping attribute](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/playing-with-nhibernate-inverse-and-cascade/cascade-mapping-setting-cascade-mapping-attribute.png)

Now, we can safely remove the code that saves the products individually. By only saving the Category in the session will be enough since now we've instructed NHibernate to save the products "in cascade".

![Cascade mapping - Setting cascade mapping attribute](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/playing-with-nhibernate-inverse-and-cascade/cascade-mapping-saving-category-only.png)

Again, NHibernate will use the INSERT/UPDATE technique, which means that this approach won't work if the **Product.CategoryId** column is not-nullable. 

## Setting Inverse to 'true'

If you are facing the 'not-nullable' scenario, consider changing the **Inverse** property to **true**. Which means that the Category is no longer responsible to manage of the relationship. Then, update your code to associate the Products and the Categories using the **Products.Category** property (because the Product class is now the only *owner* of the association). Finally, you only need to save the Category in session (as before).

![Cascade-Inverse mapping - Setting cascade and inverse mapping attributes](https://github.com/nanovazquez/nanovazquez.github.com/raw/master/_posts/playing-with-nhibernate-inverse-and-cascade/cascade-inverse-mapping-saving-category-only.png)

## Summary

To sum up what we've explained:

* The **Inverse** attribute tells NHibernate if the collection is responsible to manage the relationship. `inverse=false` means that it should update the relationship, while `inverse=true` means that 'it does not have to do anything'.
* The **Cascade** attribute helps NHibernate to decide which operations should be cascaded from the parent object to the child object. For instance, `cascade=save-update` tells NHibernate that when the Parent is saved/updated, it also needs to needs to insert the Parent's childs.
* Depending on the scenario you should decide which value to use on these two properties. For instance:
	* **(one-to-many scenario)** If your foreign-key allows nullable values, you can use a collection with `inverse=false` and a cascade value different than 'none'. When you save the Parent, NHibernate will take care of saving both childs and association. 
	* **(one-to-many scenario)** If you have a not-nullable constraint in the DB, you can use a collection with `inverse=true` and a cascade value different than 'none'. In this case, you'll only need to associate the child with its parent in code before saving the parent.

