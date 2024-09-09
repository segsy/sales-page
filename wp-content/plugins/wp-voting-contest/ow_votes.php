<?php
/*
Plugin Name: WP Voting Contest
Plugin URI: https://plugins.ohiowebtech.com/?download=wordpress-voting-photo-contest-plugin
Description: Quickly and seamlessly integrate an online contest with voting into your WordPress 5.0+ website. You can start many types of online contests such as photo, video, audio, essay/writing with very little effort.
Author: Ohio Web Technologies
Author URI: http://www.ohiowebtech.com
Version: 4.1
*/
if (!defined('ABSPATH')) {
	exit;
}
session_start();
global $wpdb;
define('WPVC_VOTE_VERSION', '4.1');
/*********** File path constants */
define('WPVC_VOTES_ABSPATH', dirname(__FILE__) . '/');
define('WPVC_VOTES_PATH', plugin_dir_url(__FILE__));
define('WPVC_VOTES_SL_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('WPVC_VOTES_SL_PLUGIN_URL', plugin_dir_url(__FILE__));
define('WPVC_VOTES_SL_PLUGIN_FILE', __FILE__);
define('WPVC_WP_VOTING_SL_STORE_API_URL', 'http://plugins.ohiowebtech.com');
define('WPVC_WP_VOTING_SL_PRODUCT_NAME', 'WordPress Voting Photo Contest Plugin');
define('WPVC_WP_VOTING_SL_PRODUCT_ID', 924);

require_once 'configuration/config.php';
register_activation_hook(__FILE__, 'wpvc_activation_init');
add_action(
	'after_setup_theme',
	function () {
		add_image_size('voting-image', 300, 0, true);
		add_image_size('voting800', 800, 0, true);
		add_image_size('voting1400', 1400, 0, true);
	}
);
register_deactivation_hook(__FILE__, 'wpvc_votes_deactivation_init');

add_action('init', 'wpvc_create_cookies');
/**
 *  Add Cookie in Admin end.
 */
function wpvc_create_cookies()
{
	if (!array_key_exists('wpvc_freevoting_authorize', $_COOKIE)) {
		$create_random_hash = 'wpvcvotingcontestadmin' . wp_rand();
		$hash               = wp_hash($create_random_hash);
		unset($_COOKIE['wpvc_freevoting_authorize']);
		setcookie('wpvc_freevoting_authorize', $hash, (time() + 86400), '/');
	}
}
