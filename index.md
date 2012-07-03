---
layout: page
tagline: "asp.net, Windows Azure, node.js, Metro style apps, HTML5/CSS3 and so on .."
---
{% include JB/setup %}

{% for post in site.posts %}
<div class="entry-content">
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
					{{ post.content | strip_html | truncatewords: 100 }}
				</div>
				<footer class="article-footer">
					<a class="read-more" href="{{ BASE_PATH }}{{ post.url }}">Read more..</a>
				</footer>
			</div>
		</div>
	</article>
</div>
{% endfor %}