---
layout: page
title: nanovazquez's blog
tagline: Supporting tagline
---
{% include JB/setup %}

{% for post in site.posts %}

<div class="entry-content">
	<article class="unit-article layout-page">
		<div class="unit-inner unit-article-inner">
			<div class="content">
				<header>
					<h1 class="h2 entry-title">{{ post.title }}</h1>
				</header>
				<div class="entry-content">
					{{ post.description }}
				</div>
				<footer>
					<span>{{ post.date | date_to_string }}</span>
					<a href="{{ BASE_PATH }}{{ post.url }}">Read more..</a>
				</footer>
			</div>
		</div>
	</article>
</div>
{% endfor %}