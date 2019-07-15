<?php

add_filter('plugin_action_links_' . WPT_Product_Table::getPath('PLUGIN_BASE_FILE'), 'wptf_add_action_links');
//add_filter('plugin_action_links_woo-product-table-pro/woo-product-table-pro.php', 'wptf_add_action_links');

function wptf_add_action_links($links) {
    $wptf_links[] = '<a href="' . admin_url('admin.php?page=wpt-shop') . '" title="Generate Shortcode">Generate Shortcode</a>';
    $wptf_links[] = '<a href="' . admin_url('admin.php?page=wpt-shop-config') . '" title="Configure for default">Configure</a>';
    
    return array_merge($wptf_links, $links);
}
