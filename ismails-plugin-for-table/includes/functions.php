<?php



function child_font() 
{ ?>
<link href="https://fonts.googleapis.com/css?family=Martel+Sans" rel="stylesheet">

    <?php
}
add_action( 'wp_head', 'child_font' );



function wptf_check_sortOrder($got_value = false, $this_value = 'nothing'){
    return $got_value == $this_value ? 'selected' : ''; 
}


function wptf_default_columns_array(){
    $column_array = WPT_Product_Table::$columns_array;
    
    $disable_column_keyword = WPT_Product_Table::$colums_disable_array;
    foreach($disable_column_keyword as $value){
        unset($column_array[$value]);
    }
    return $column_array;//array_keys( $column_keyword );
}


function wptf_default_columns_keys_array(){
    return array_keys( wptf_default_columns_array() );
}


function wptf_default_columns_values_array(){
    return array_values( wptf_default_columns_array() );
}


function wptf_taxonomy_column_generator( $item_key ){
    $key = 'tax_';
    $len = strlen( $key );
    $check_key = substr( $item_key, 0, $len );
    if( $check_key == $key ){
        return $item_key;
    }
}


function wptf_customfileds_column_generator( $item_key ){
    $key = 'cf_';
    $len = strlen( $key );
    $check_key = substr( $item_key, 0, $len );
    if( $check_key == $key ){
        return $item_key;
    }
}


function wptf_limit_words($string = '', $word_limit = 10){
    $words = explode(" ",$string);
    
    $output = implode(" ",array_splice($words,0,$word_limit));
    if( count($words) > $word_limit ){
       $output .= $output . '...'; 
    }
    return $output;
}


function wptf_explode_string_to_array($string,$default_array = false) {
    $final_array = false;
    if ($string && is_string($string)) {
        $string = rtrim($string, ', ');
        $final_array = explode(',', $string);
    } else {
        if(is_array( $default_array ) ){
        $final_array = $default_array;
        }
    }
    return $final_array;
}


function wptf_generate_each_row_data($wptf_table_column_keywords = false, $wptf_each_row = false) {
    $final_row_data = false;
    if (is_array($wptf_table_column_keywords) && count($wptf_table_column_keywords) > 0) {
        foreach ($wptf_table_column_keywords as $each_keyword) {
            $final_row_data .= ( isset($wptf_each_row[$each_keyword]) ? $wptf_each_row[$each_keyword] : false );
        }
    }
    return $final_row_data;
}


function wptf_define_permitted_td_array( $wptf_table_column_keywords = false ){
    
    $wptf_permitted_td = false;
    if( $wptf_table_column_keywords && is_array( $wptf_table_column_keywords ) && count($wptf_table_column_keywords) > 0 ){
        foreach($wptf_table_column_keywords as $each_keyword){
            $wptf_permitted_td[$each_keyword] = true;
        }
    }
    return $wptf_permitted_td;
}


function wptf_array_to_option_atrribute( $current_single_attribute = false ){
    $html = '<option value>None</option>';
    if( is_array( $current_single_attribute ) && count( $current_single_attribute ) ){
        foreach( $current_single_attribute as $wptf_pr_attributes ){
        $html .= "<option value='{$wptf_pr_attributes}'>" . ucwords($wptf_pr_attributes) . "</option>";
        }
    }
    return $html;
}


function wptf_variations_attribute_to_select( $attributes , $product_id = false, $default_attributes = false, $temp_number = false){
    $html = false;
    
    //var_dump($attributes);
    //var_dump($default_attributes);
    
    $html .= "<div class='wptf_varition_section' data-product_id='{$product_id}'  data-temp_number='{$temp_number}'>";
    //var_dump($total_attributes);
    foreach( $attributes as $attribute_key_name=>$options ){

        $label = wc_attribute_label( $attribute_key_name );
        $attribute_name = wc_variation_attribute_name( $attribute_key_name );
        $only_attribute = str_replace( 'attribute_', '', $attribute_name);
        
        $default_value = !isset( $default_attributes[$only_attribute] ) ? false : $default_attributes[$only_attribute]; //Set in 3.9.0
        
        $html .= "<select data-product_id='{$product_id}' data-attribute_name='{$attribute_name}' placeholder='{$label}'>";
        $html .= "<option value='0'>" . $label . "</option>";
        foreach( $options as $option ){
            $html .= "<option value='" . esc_attr( $option ) . "' " . ( $default_value == $option ? 'selected' : '' ) . ">" . ucwords($option) . "</option>";
        }
        $html .= "</select>";
        
    }
    $html .= "<div class='wptf_message wptf_message_{$product_id}'></div>";
    $html .= '</div>';

    return $html;
}


function wptf_is_array_class($target_array = false, $return_class = ''){
    if( is_array( $target_array ) && count( $target_array ) > 0 ){
        return $return_class;
    }
}


function wptf_get_value_with_woocommerce_unit( $target_unit, $value ){
    $get_unit = get_option( 'woocommerce_' . $target_unit . '_unit' );
    return ( is_numeric( $value ) && $value > 0 ? $value . ' ' . $get_unit : false );
}


function wptf_adding_body_class( $cass ) {

    global $post,$shortCodeText;

    if( isset($post->post_content) && has_shortcode( $post->post_content, $shortCodeText ) ) {
        $cass[] = 'wptf_pro_table_body';
        $cass[] = 'wptf_pro_table';
        $cass[] = 'woocommerce';
    }
    return $cass;
}
add_filter( 'body_class', 'wptf_adding_body_class' );