<?php


function wptf_shortcode_generator_page() {
    //Checking WooCommerce plugin installed or not
    if (!is_plugin_active('woocommerce/woocommerce.php')) {
        echo '<br style="clear: both !important;"><h2 class="no_woocommerce_message">Sorry, WooCommerce is not Active. Please Check</h2>';
        echo <<<EOF
<p class="highlight">
    Install <a href="https://wordpress.org/plugins/woocommerce/">WooCommerce first.</a> 
</p>            
EOF;
        die();
    }

    
    ?>
    <div class="wrap wptf_wrap wptf_configure_page">
        <h2 class="plugin_name"><?php echo WPT_Product_Table::getName(); ?> <span class="plugin_version">v <?php echo WPT_Product_Table::getVersion(); ?></span> <a href="<?php echo admin_url('admin.php?page=wpt-shop-config'); ?>" style="font-size: 13px;">Go to <b>Mini-Configs Page</b></a></h2>
        <hr>
        <h1>Generate Shortcode here.</h1>
        <p> Select all option you want and press the button below to generate a shortcode. </p>
        <div id="wptf_configuration_form" class="wptf_leftside">
            

            <?php
            
            $tab_array = array(
                'column_settings' => "Column",
                'basics' => 'Basic Settings',
                'conditions' => 'Condition Statments',
                'mobile' => 'Mobile Compatibility ',
                'searchs_n_filter' => 'Search and Filtering',
                   // 'text_n_display' => 'Display Setting', 
                    //'shortcode' => 'ShortCode'
            );

            echo '<nav class="nav-tab-wrapper">';
            $active_nav = 'nav-tab-active';
            
            echo '</nav>';


            //Now start for Tab Content
            $active_tab_content = 'tab-content-active';
            foreach ($tab_array as $tab => $title) {
                echo '<div class="tab-content ' . $active_tab_content . '" id="' . $tab . '">';
                echo '<div class="fieldwrap">';
                $tab_file_of_admin = WPTF_BASE_DIR . 'admin/tabs/' . $tab . '.php';
                //var_dump($tab);
                if (is_file($tab_file_of_admin)) 
                {
                    include $tab_file_of_admin; 
                } 
                else 
                {
                    echo '<h2>' . $tab . '.php file is not found in tabs folder</h2>';
                }
                echo '</div>'; //End of .fieldwrap
                echo '</div>'; //End of Tab content div
                $active_tab_content = false; //Active tab content only for First
            }
            ?>



            <hr>




            <div class="fieldwrap wptf_result_footer">
                
                <div class="wptf_shotcode_gererator_buttor_wrapper">
                    <button title="Generate Shortcode" data-shortcode_type='minified' class="button_for_generate_shortcode wptf_g_s_button button-primary primary button btn-info">Generate Shortcode <small></small></button>
                   
                    
                    <br>
                </div>
                
                <div class="shortcode_output">
                    <textarea id="wptf_output_of_shortcode" placeholder="Your Generated shortcode will display here. Click the button."></textarea>
                </div>
                <hr>For more customization, <a href="<?php echo admin_url('admin.php?page=wpt-shop-config'); ?>" style="font-size: 13px;">Go to <b>Mini-Config's Page</b></a>
                <script>


                     jQuery(document).ready(function() {
                        
                        jQuery('#wptf_output_of_shortcode').toggle(function() {
                            jQuery(this).select();
                            }, function() {
                            jQuery(this).unselect();
                        });
                        
                        
                        jQuery("#wptf_table_sort_order_by").change(function(){
                            var current_val = jQuery(this).val();
                            console.log(current_val);
                            if(current_val === 'meta_value'){
                                jQuery("#wptf_meta_value_wrapper").fadeIn();
                                jQuery("#wptf_product_meta_value_sort").val('_sku');
                            }else{
                                jQuery("#wptf_meta_value_wrapper").fadeOut();
                                jQuery("#wptf_product_meta_value_sort").val('');
                            }
                        });
                        
                        
                        jQuery('.button_for_generate_shortcode.wptf_g_s_button').click(function(e) {
                            e.preventDefault();
                            var shortcode_type = jQuery(this).data('shortcode_type');
                            generateShortcode(shortcode_type);

                            function generateShortcode(shorcode_type = 'normal') {

                                //Column Tab start Start
                                var column_keyword, column_title;
                                column_keyword = [];
                                column_title = [];
                                jQuery('#wptf_column_sortable li.wptf_sortable_peritem.enabled .wptf_shortable_data input.colum_data_input').each(function(Index) {
                                    column_keyword[Index] = jQuery(this).data('keyword');
                                    column_title[Index] = jQuery(this).val();

                                });
                                if (column_keyword.length < 1) {
                                    alert('Please choose minimum 1 Item from [Column] tab.');
                                    return false;
                                }
                                column_keyword_values = column_keyword.join(',');
                                column_title_values = column_title.join(',');
                                //Column Tab End Here
                                
                                //Mobile issue tab start here
                                var mobile_hide = [];
                                jQuery('#wptf_keyword_hide_mobile li.hide_on_mobile_permits.enabled .wptf_mobile_hide_keyword b.mobile_issue_field').each(function(Index) {
                                    mobile_hide[Index] = jQuery(this).data('keyword');

                                });
                                mobile_hide_values = mobile_hide.join(',');
                                //Mobile issue tab end here

                                //Basics and Condition Tab start here
                                var data_name, data_value, data_array = [], minified_data_array = [], serial_minified = 0;
                                jQuery('.wptf_data_filed_atts').each(function(Index) {

                                    data_name = jQuery(this).data('name');
                                    data_value = jQuery(this).val();
                                    if (Array.isArray(data_value)) {
                                        data_value = data_value.join(',');
                                    }
                                    if (data_value === null) {
                                        data_value = '';
                                    }
                                    data_array[Index] = data_name + "='" + data_value + "'";//[data_name, data_value];
                                    if (data_value !== '') {
                                        minified_data_array[serial_minified] = data_name + "='" + data_value + "'";
                                        serial_minified++;
                                    }
                                    
                                });
                                //saiful_putting_value
                                var aditional_shortcode_part;
                                if (shorcode_type === 'minified') {
                                    aditional_shortcode_part = minified_data_array.join(' ');
                                } else {
                                    aditional_shortcode_part = data_array.join(' ');
                                }
                                //Basics and Condition Tab End Here



                                var finalShortCode = "[Display_Blaketrix_Table column_keyword='" + column_keyword_values + "' column_title='" + column_title_values + "' mobile_hide='" + mobile_hide_values + "' " + aditional_shortcode_part + "]"; 
                                jQuery('#wptf_output_of_shortcode').text(finalShortCode);
                            }
                        });

                        jQuery('#wptf_column_sortable li.wptf_sortable_peritem input.checkbox_handle_input').click(function() {
                            var keyword = jQuery(this).data('column_keyword');
                            var targetLiSelector = jQuery('#wptf_column_sortable li.wptf_sortable_peritem.column_keyword_' + keyword);
                            if (jQuery(this).prop('checked')) {
                                jQuery(this).addClass('enabled');
                                targetLiSelector.addClass('enabled');
                            } else {
                                jQuery(this).removeClass('enabled');
                                targetLiSelector.removeClass('enabled');
                            }
                        });
                        
                        
                        jQuery('#wptf_keyword_hide_mobile li.hide_on_mobile_permits input.checkbox_handle_input').click(function() {
                            var keyword = jQuery(this).data('column_keyword');
                            var targetLiSelector = jQuery('#wptf_keyword_hide_mobile li.hide_on_mobile_permits.column_keyword_' + keyword);
                            if (jQuery(this).prop('checked')) {
                                jQuery(this).addClass('enabled');
                                targetLiSelector.addClass('enabled');
                            } else {
                                jQuery(this).removeClass('enabled');
                                targetLiSelector.removeClass('enabled');
                            }
                        });
                        
                        
                      
                    });

                   
                    (function($) {
                        $(document).ready(function() {
                            jQuery('.wptf_disable_column label.wptf_label').append(' <small style="color:#d00;font-weight:bold"> Premium</small>');

                        });
                    })(jQuery);


                </script>                 

            </div>


        </div>
        
    </div>
    <style>
        .tab-content{display: none;}
        .tab-content.tab-content-active{display: block;}
        .wptf_leftside,.wptf_rightside{float: left;}
        .wptf_leftside{
            width: 75%;
        }
        .break_space_large{display: block;visibility: hidden;height: 25px;background: transparent;}
        .break_space,.break_space_medium{display: block;visibility: hidden;height: 15px;background: transparent;}
        .break_space_small{display: block;visibility: hidden;height: 5px;background: transparent;}
        .wptf_rightside{width: 0%;}
        @media only screen and (max-width: 800px){
            .wptf_leftside{width: 100%;}
            .wptf_rightside{display: none !important;}
        }
        /*****For Column Moveable Item*******/
        ul#wptf_column_sortable li>span.handle{
            background-image: url('<?php echo WPTF_BASE_URL . 'images/move.png'; ?>');
        }

    </style>
    <script>
        jQuery(document).ready(function() {

            var selectLinkTab = jQuery(".nav-tab-wrapper a.nav-tab");
            var selectTabContent = jQuery(".tab-content");
            var tabName = window.location.hash.substr(1);
            if (tabName) {
                removingActiveClass();
                jQuery('#' + tabName).addClass('tab-content-active');
                jQuery('.nav-tab-wrapper a.wptf_nav_for_' + tabName).addClass('nav-tab-active');
                //console.log(tabName);
            }

            selectLinkTab.click(function(e) {
                var targetTabContent = jQuery(this).data('tab');//getting data value from data-tab attribute
                window.location.hash = targetTabContent; //Set hash keywork in Address Bar 
                e.preventDefault(); //Than prevent for click action of hash keyword
                removingActiveClass();

                jQuery(this).addClass('nav-tab-active');
                jQuery('#' + targetTabContent).addClass('tab-content-active');
                console.log(targetTabContent);
                //window.location.hash = targetTabContent;
            });

            /**
             * Removing current active nav_tab and tab_content element
             * 
             * @returns {nothing}
             */
            function removingActiveClass() {
                selectLinkTab.removeClass('nav-tab-active');
                selectTabContent.removeClass('tab-content-active');
                return false;
            }

        });
    </script>

    <?php
}


