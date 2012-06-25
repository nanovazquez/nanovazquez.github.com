---
layout: page
title: nanovazquez's blognn
tagline: Supporting tagline
---
{% include JB/setup %}

{% for post in site.posts %}
<span>{{ post.date | date_to_string }}</span> 
<a href="{{ BASE_PATH }}{{ post.url }}">Read more..</a>
{% endfor %}