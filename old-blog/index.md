---
layout: page
tagline: "asp.net, windows azure, node.js, metro style apps, HTML5/CSS3 and so on .."
---
{% include JB/setup %}

{% assign postLimit = 0 %}
{% for post in site.posts %}
{% assign postLimit = postLimit | plus: 1 %}
{% if postLimit == 11 %}{% break %}
{% else %}
<div class="entry-content lang-{{ post.lang }}" style="display: none">
	<article class="unit-article layout-page">
		<div class="unit-article-inner">
			<div class="content">
				<header class="show">
					<h1 class="h2 entry-title">
						<div class="title">
							<a href="{{ BASE_PATH }}{{ post.url }}" rel="{{ post.title }}">{{ post.title }}</a>
						</div>
					</h1>
					<div class="date">
						Posted on {{ post.date | date_to_string }}
					</div>
				</header>
				<div class="entry-content">
					{{ post.content | strip_html | truncatewords: 120 }}
				</div>
				<footer class="article-footer">
					<a class="read-more" href="{{ BASE_PATH }}{{ post.url }}">Read more..</a>
				</footer>
			</div>
		</div>
	</article>
</div>
{% endif %}
{% endfor %}