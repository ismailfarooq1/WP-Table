<?php
add_shortcode('Product_Table','wptf_if_no_woocommerce');

function wptf_if_no_woocommerce(){
    echo '<a WooCommerce not Active/Installed</a>';
}