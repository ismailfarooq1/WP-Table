<?php
/**
 * Set Menu for WPT (Woo Product Table) Plugin
 * 
 * @since 1.0
 * 
 * @package Woo Product Table
 */
function wptf_admin_menu() {
    add_menu_page('Blaketrix Woo Table', 'Diplay BX Table', 'edit_theme_options', 'wpt-shop', 'wptf_shortcode_generator_page', 'dashicons-list-view',40);
    add_submenu_page('wpt-shop', 'Configuration Blaketrix Table', 'MINI configs', 'edit_theme_options', 'wpt-shop-config', 'wptf_configuration_page');
    ;
    
}
add_action('admin_menu', 'wptf_admin_menu');