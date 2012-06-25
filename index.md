---
layout: page
tagline: Supporting tagline
---
{% include JB/setup %}

{% for post in site.posts %}
<div class="entry-content">
	<article class="unit-article layout-page">
		<div class="unit-article-inner">
			<div class="content">
				<header>
					<h1 class="h2 entry-title">
						<div class="title">{{ post.title }}</div>
						<span class="date">Posted on {{ post.date | date_to_string }}</span>
					</h1>
				</header>
				<div class="entry-content">
					{{ post.content | strip_html | truncatewords: 50 }}
				</div>
				<footer class="article-footer">
					<a class="read-more" href="{{ BASE_PATH }}{{ post.url }}">Read more..</a>
				</footer>
			</div>
		</div>
	</article>
</div>
{% endfor %}