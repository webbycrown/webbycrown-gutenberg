<?php

add_action( 'plugin_loaded', 'vk_register_latest_post_block' );

function vk_register_latest_post_block() {
	register_block_type(
		'cgb/latest-posts-block',
		[
			'render_callback' => 'vk_render_latest_posts',
		]
	);
}

function vk_render_latest_posts() {

	$latest_posts = wp_get_recent_posts(
		[
			'numberposts' => 3,
			'post_status' => 'publish',
		]
	);

	if ( empty( $latest_posts ) ) {
		echo '<p>No posts</p>';
	}

	$posts_output = '<div class="latest-posts-block">';

	foreach ( $latest_posts as $latest_post ) {

		$post_id = $latest_post['ID'];

		$posts_output .= sprintf(
			'<div class="post-title"><h2><a href="%s">%s</a></h2></div>',
			get_permalink( $post_id ),
			get_the_title( $post_id )
		);
	}

	$posts_output .= '</div>';

	return $posts_output;
}
