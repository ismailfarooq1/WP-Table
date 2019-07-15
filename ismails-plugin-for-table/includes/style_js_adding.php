<?php

function wptf_style_js_adding(){
    wp_enqueue_style( 'wptf-universal', WPT_Product_Table::getPath('BASE_URL') . 'css/universal.css', __FILE__, 2 );
    wp_enqueue_style( 'wptf-template-table', WPT_Product_Table::getPath('BASE_URL') . 'css/template.css', __FILE__, WPT_Product_Table::getVersion() );
    
    
    wp_enqueue_script('jquery');
    
    wp_enqueue_script( 'wptf-custom-js', WPT_Product_Table::getPath('BASE_URL') . 'js/custom.js', __FILE__, WPT_Product_Table::getVersion(), true );
    
    wp_enqueue_style( 'select2', WPT_Product_Table::getPath('BASE_URL') . 'css/select2.min.css', __FILE__, '1.8.2' );
    
    wp_enqueue_script( 'select2', WPT_Product_Table::getPath('BASE_URL') . 'js/select2.min.js', __FILE__, '4.0.5', true );
}
add_action('wp_enqueue_scripts','wptf_style_js_adding',99);

