<?php

/**
 * Executing selected item for options
 * 
 * @since 2.4 
 */
function wptf_selected( $keyword, $gotten_value ){
    $current_config_value = get_option('wptf_configure_options');
    echo ( isset( $current_config_value[$keyword] ) && $current_config_value[$keyword] == $gotten_value ? 'selected' : false );
}

/**
 * For Configuration Page
 * 
 * @since 2.4
 */
function wptf_configuration_page(){
    
    if( isset( $_POST['data'] ) && isset( $_POST['reset_button'] ) ){
        //Reset 
        $value = WPT_Product_Table::$default;
        //var_dump($value);
        update_option( 'wptf_configure_options', $value );
       
    }else if( isset( $_POST['data'] ) && isset( $_POST['configure_submit'] ) ){
        //configure_submit
        $value = ( is_array( $_POST['data'] ) ? $_POST['data'] : false );
        
         //Update Maintenace for Free Version, So that always keep default value
        //since 1.4 (04-12-18)
        $default = get_option('wptf_configure_options');
        $value['thumbs_image_size'] = $default['thumbs_image_size'];
        $value['all_selected_direct_checkout'] = $default['all_selected_direct_checkout'];
        $value['all_selected_direct_checkout'] = $default['all_selected_direct_checkout'];
        $value['instant_search_filter'] = $default['instant_search_filter'];
        $value['instant_search_text'] = $default['instant_search_text'];
        $value['disable_cat_tag_link'] = $default['disable_cat_tag_link'];
        $value['disable_product_link'] = $default['disable_product_link'];
        $value['load_more_text'] = $default['load_more_text'];
        $value['search_keyword_text'] = $default['search_keyword_text'];
        $value['quick_view_btn_text'] = $default['quick_view_btn_text'];
        $value['search_button_text'] = $default['search_button_text'];
        $value['item'] = $default['item'];
        $value['items'] = $default['items'];
        $value['search_box_title'] = $default['search_box_title'];
        $value['search_box_searchkeyword'] = $default['search_box_searchkeyword'];
        $value['search_box_orderby'] = $default['search_box_orderby'];
        $value['search_box_order'] = $default['search_box_order'];
        $value['table_in_stock'] = $default['table_in_stock'];
        $value['default_quantity'] = $default['default_quantity'];
        $value['mcart_cart'] = $default['mcart_cart'];
        $value['mcart_view_cart'] = $default['mcart_view_cart'];
        $value['mcart_checkout'] = $default['mcart_checkout'];
        $value['mcart_price'] = $default['mcart_price'];
        $value['mcart_subtotla'] = $default['mcart_subtotla'];
        $value['mcart_view_title'] = $default['mcart_view_title'];
        $value['mcart_empty_now'] = $default['mcart_empty_now'];
        $value['right_combination_message'] = $default['right_combination_message'];
        $value['right_combination_message_alt'] = $default['right_combination_message_alt'];
        $value['select_all_items_message'] = $default['select_all_items_message'];
        $value['no_more_query_message'] = $default['no_more_query_message'];
        $value['adding_in_progress'] = $default['adding_in_progress'];
        $value['no_right_combination'] = $default['no_right_combination'];
        $value['type_your_message'] = $default['type_your_message'];
        $value['loading_more_text'] = $default['loading_more_text'];
        $value['yith_browse_list'] = $default['yith_browse_list'];
        $value['yith_add_to_quote_text'] = $default['yith_add_to_quote_text'];
        $value['yith_add_to_quote_adding'] = $default['yith_add_to_quote_adding'];
        $value['yith_add_to_quote_added'] = $default['yith_add_to_quote_added'];
        
        
        $value['table_out_of_stock'] = $default['table_out_of_stock'];
        $value['out_of_stock_message'] = $default['out_of_stock_message'];
        $value['sorry_out_of_stock'] = $default['sorry_out_of_stock'];
        $value['popup_notice'] = $default['popup_notice'];
        
        update_option( 'wptf_configure_options', $value);
    }
    $current_config_value = get_option('wptf_configure_options');

    //var_dump($current_config_value);
    ?>
    <div class="wrap wptf_wrap wptf_configure_page">
        <h2 class="plugin_name"><?php echo WPT_Product_Table::getName(); ?> <span class="plugin_version">v <?php echo WPT_Product_Table::getVersion(); ?></span> <a href="<?php echo admin_url('admin.php?page=wpt-shop'); ?>" style="font-size: 15px;">Go to <b>Shortcode Generator Page</b></a></h2>
        <hr>
        <h1>Table Configuration</h1>
        <div id="wptf_configuration_form" class="wptf_leftside">
            <div style="padding-top: 15px;padding-bottom: 15px;" class="fieldwrap wptf_result_footer">
                <form action="" method="POST">
                    <input name="data[plugin_version]" type="hidden" value="<?php echo WPT_Product_Table::getVersion(); ?>" style="">
                    <input name="data[plugin_name]" type="hidden" value="<?php echo WPT_Product_Table::getName(); ?>" style="">
                    <span class="configure_section_title">Basic Settings</span>
                    <table class="wptf_config_form">
                        <tbody>
                            <tr>
                                <div class="wptf_column">
                                    <th><label class="wptf_label" for="wptf_table_custom_add_to_cart">Add to Cart Icon</label></th>
                                    <td>
                                        <select name="data[custom_add_to_cart]" id="wptf_table_custom_add_to_cart" class="wptf_fullwidth" >
                                            <option value="add_cart_no_icon" <?php wptf_selected('custom_add_to_cart', 'add_cart_no_icon');?>>No Icon</option>
                                            <option value="add_cart_only_icon" <?php wptf_selected('custom_add_to_cart', 'add_cart_only_icon');?>>Only Icon</option>
                                            <option value="add_cart_left_icon" <?php wptf_selected('custom_add_to_cart', 'add_cart_left_icon');?>>Left Icon and Text</option>
                                            <option value="add_cart_right_icon" <?php wptf_selected('custom_add_to_cart', 'add_cart_right_icon');?>>Text and Right Icon</option>
                                        </select>

                                    </td>
                                 </div>
                            </tr>
                            <tr>
                                <div class="wptf_column">
                                    <th><label class="wptf_label" for="wptf_table_sort_mini_filter">Mini Filter Sorting</label></th>
                                    <td>
                                        <select name="data[sort_mini_filter]" id="wptf_table_sort_mini_filter" class="wptf_fullwidth" >
                                            <option value="0" <?php wptf_selected('sort_mini_filter', '0');?>>None</option>
                                            <option value="ASC" <?php wptf_selected('sort_mini_filter', 'ASC');?>>Ascending</option>
                                            <option value="DESC" <?php wptf_selected('sort_mini_filter', 'DESC');?>>Descending</option>
                                        </select>

                                    </td>
                                 </div>
                            </tr>
                                          
                           
                            
                            <tr> 
                                <!-- New at Version: 3.1 -->
                                <div class="wptf_column">
                                    <th><label class="wptf_label" for="wptf_table_thumbs_lightbox">Thumbs Image LightBox</label></th>
                                    <td>
                                       <select name="data[thumbs_lightbox]" id="wptf_table_thumbs_lightbox" class="wptf_fullwidth" >
                                            <option value="1" <?php wptf_selected('thumbs_lightbox', '1');?>>Enable</option>
                                            <option value="0" <?php wptf_selected('thumbs_lightbox', '0');?>>Disable</option>
                                        </select>
                                    </td>
                                 </div>
                            </tr>
                            

                            <tr> 
                                <div class="wptf_column">
                                    <th>  <label class="wptf_label" for="wptf_table_product_link_target">Product Link Open Type</label>
                                    <td>
                                        <select name="data[product_link_target]" id="wptf_table_disable_product_link" class="wptf_fullwidth" >
                                            <option value="_blank" <?php wptf_selected('product_link_target', '_blank');?>>New Tab</option>
                                            <option value="_self" <?php wptf_selected('product_link_target', '_self');?>>Self Tab</option>
                                        </select>
                                    </td>
                                 </div>
                            </tr>
                          

                           

                            <tr> 
                                <div class="wptf_column">
                                    <th> <label class="wptf_label" for="wptf_table_disable_loading_more">Disable <b>[Load More]</b> Button</label></th>
                                    <td>
                                        <select name="data[disable_loading_more]" id="wptf_table_disable_loading_more" class="wptf_fullwidth" >
                                            <option value="load_more_hidden" <?php wptf_selected('disable_loading_more', 'load_more_hidden');?>>Yes</option>
                                            <option value="normal" <?php wptf_selected('disable_loading_more', 'normal');?>>No</option>
                                        </select>
                                    </td>
                                 </div>
                            </tr>
                            
                           

                            <!-- Removed from 3.8 Version
                            <tr> 
                                <div class="wptf_column">
                                    <th><label for="wptf_table_default_quantity" class="wptf_label">Default Quantity| Eg: 1</label></th>
                                    <td>
                                      <input name="data[default_quantity]" class="wptf_data_filed_atts" value="<?php 
                                        // echo $current_config_value['default_quantity']; //Removed from 3.8
                                      ?>" id="wptf_table_default_quantity" type="number" placeholder="Default Quantity Input here. eg: 1" min="0" max="" pattern="[0-9]*" inputmode="numeric">
                                    </td>
                                 </div>
                            </tr>
                            -->
                        </tbody>
                    </table>                    
                  

                    
                    
                    
                    <!-- Here was Table of MiniCart's default content. We have keep backup to backup_configuration.php -->
                    
                   
                    <button type="submit" name="configure_submit" class="button-primary primary button btn-info">Submit</button>
                    <button type="submit" name="reset_button" class="button">Reset</button>
                    
                </form>
            </div>
            
            
            
        </div>
    </div>  
<script>


    (function($) {
        $(document).ready(function() {
            jQuery('.only_for_premium th label.wptf_label').append(' <small style="color:#d00;font-weight:bold"> Premium</small>');
            jQuery('.wptf_disable_column label.wptf_label').append(' <small style="color:#d00;font-weight:bold"> Premium</small>');


        });
    })(jQuery);

</script>
    <style>
        .tab-content{display: none;}
        .tab-content.tab-content-active{display: block;}
        .wptf_leftside,.wptf_rightside{float: left;}
        .wptf_leftside{
            width: 75%;overflow:hidden;
        }
        .break_space_large{display: block;visibility: hidden;height: 25px;background: transparent;}
        .break_space,.break_space_medium{display: block;visibility: hidden;height: 15px;background: transparent;}
        .break_space_small{display: block;visibility: hidden;height: 5px;background: transparent;}
        .wptf_rightside{width: 25%;}
        @media only screen and (max-width: 800px){
            .wptf_leftside{width: 100%;}
            .wptf_rightside{display: none !important;}
        }
        /*****For Column Moveable Item*******/
        ul#wptf_column_sortable li>span.handle{
            background-image: url('<?php echo WPTF_BASE_URL . 'images/move.png'; ?>');
        }

    </style>
    <?php
}
