<?php
/**
 * @link              http://webbycrown.com/
 * @since             1.0.0
 *
 * @wordpress-plugin
 * Plugin Name:       WebbyCrown Gutenberg - Based on create-guten-block
 * Plugin URI:        http://webbycrown.com/
 * Description:       Basically this plugin is for doing cool things with gutenberg.
 * Version:           1.0.0
 * Author:            WebbyCrown Solutions WordPress Team
 * Author URI:        http://webbycrown.com/
 * Text Domain:       webbycrown-gutenberg
 * Domain Path:       /languages
 *
 */


// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
