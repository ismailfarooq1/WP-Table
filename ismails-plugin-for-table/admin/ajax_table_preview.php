<?php

function wptf_live_table_setting(){
    if( isset( $_POST['action'] ) == 'wptf_table_preview' ){
        $atts = $_POST['info'];
       
        echo wptf_shortcode_generator( $atts );
    }else{
        echo '<p style="color: #d00;">Critical Error</p>';
    }
    die();
}

