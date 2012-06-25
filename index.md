---
layout: page
title: nanovazquez's blog
tagline: Supporting tagline
---
{% include JB/setup %}

{% for post in site.posts %}

<div class="entry-content">
	<article class="unit-article layout-page">
		<div class="unit-article-inner">
			<div class="content">
				<header>
					<h1 class="h2 entry-title">{{ post.title }}</h1>
					<span class="date">{{ post.date | date_to_string }}</span>
				</header>
				<div class="entry-content">
					{{ post.content | truncatewords: 50 }}
				</div>
				<footer class="article-footer">
					<a class="read-more" href="{{ BASE_PATH }}{{ post.url }}">Read more..</a>
				</footer>
			</div>
		</div>
	</article>
</div>
{% endfor %}