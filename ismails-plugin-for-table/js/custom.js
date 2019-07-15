/* 
 * Only for Fronend Section
 * @since 1.0.0
 */


(function($) {
    $(document).ready(function() {
        var ajax_url,ajax_url_additional = '/wp-admin/admin-ajax.php';

        if ( typeof woocommerce_params === 'undefined' ){
            var site_url = $('div.wptf_product_table_wrapper').data('site_url');
            ajax_url = site_url + ajax_url_additional;//'/wp-admin/admin-ajax.php';
            //woocommerce_params //wc_add_to_cart_params
        }else{
            ajax_url = woocommerce_params.ajax_url;
        }
        console.log(ajax_url);//Only for Developer
        if( ajax_url === 'undefined' + ajax_url_additional  ){
            console.log( 'WOO PRODUCT TABLE is not Available to this page \nOR:::SORRY!!!!: woocommerce_params is Undefine also ajax_url also undefined. So ajax will not work not. Contact with codersaiful@gmail.com' );
            return false;
        }
        
        /**
         * Getting object for config_json from #wptf_table table.
         * Can be any table. because all table will be same config json data
         * 
         * @returns {Objectt}
         */
        
        var config_json = $('#wptf_table').data('config_json');
        if ( typeof config_json === 'undefined' ){
            return false;
        }
        console.log(config_json);
        
        //Adding Noticeboard Div tag at the bottom of page
        $('body').append("<div class='wptf_notice_board'></div>");
        
        /**
         * To get/collect Notice after click on add to cart button 
         * or after click on add_to_cart_selected
         * 
         * @returns {undefined}
         */
        function WPTF_NoticeBoard(){
            var noticeBoard = $('div.wptf_notice_board');//$('#wptf_notice_table_id_' + temp_number);
            $.ajax({
                type: 'POST',
                url: ajax_url,
                data: {
                    action: 'wptf_print_notice'
                },
                success: function(response){
                    if(response !== ''){
                        noticeBoard.html(response);
                        var boardHeight = noticeBoard.height();
                        var boardWidth = noticeBoard.width();
                        var windowHeight = $(window).height();
                        var windowWidth = $(window).width();
                        var topCal = (windowHeight - (boardHeight + 20))/2;
                        var leftCal = (windowWidth - (boardWidth + 20))/2;
                        noticeBoard.css({
                            top: topCal + 'px',
                            left: leftCal + 'px',
                        });                        
                        noticeBoard.fadeIn('slow');
                    }
                    var myTimeOut = setTimeout(function(){
                        noticeBoard.fadeOut('medium');
                        clearTimeout(myTimeOut);
                    },2000);
                },
                error: function(){
                    console.log("Unable to load Notice");
                    return false;
                }
            });
            
        }
        
        $('body').on('click','div.wptf_notice_board',function(){
            $(this).fadeOut('fast');
        });
        
        /**
         * Loading our plugin's minicart
         * 
         * @since 3.7.11
         * @Added a new added function.
         * @returns {Boolean}
         */
        function WPTF_MiniCart(){
            var minicart_type = $('div.tables_cart_message_box').attr('data-type');
            if(typeof minicart_type === 'undefined'){
                return false;
            }
            
            $.ajax({
                type: 'POST',
                url: ajax_url,
                data: {
                    action: 'wptf_fragment_refresh'
                },
                success: function(response){
                    setFragmentsRefresh( response );
                    var cart_hash = response.cart_hash;
                    var fragments = response.fragments;
                    //console.log(response);
                    var html = '';
                    var supportedElement = ['div.widget_shopping_cart_content','a.cart-contents','a.footer-cart-contents'];
                    if ( fragments && cart_hash !== '' ) {
                        if(minicart_type === 'load'){
                            $.each( fragments, function( key, value ) {
                                //$( key ).replaceWith( value );
                                if($.inArray(key, supportedElement) != -1) {
                                    html += value;
                                }
                                
                            });
                            $('div.tables_cart_message_box').attr('data-type','refresh');//Set
                            $('div.tables_cart_message_box').html(html);
                        }else{
                            $.each( fragments, function( key, value ) {
                                if($.inArray(key, supportedElement) != -1) {
                                    $( key ).replaceWith( value );
                                }
                                
                            });
                        }
                        
                    }
                    //$( document.body ).trigger( 'added_to_cart', [ response.fragments, response.cart_hash, $('.added_to_cart') ] ); //$( document.body ).trigger( 'wc_cart_button_updated', [ $button ] );
                    
                },
                error: function(){
                    alert("Minicart was not loaded");
                    return false;
                }
            });
        }

        
        WPTF_MiniCart();

        /**
         * Are not using curenlty
         * Load Minicart Normally above at table, although we can set to bottom
         * 
         * @param String ajax_url
         * @param boolean true_false
         * @returns void
         * @deprecated from Version 3.7, This function is not using. Currently its depreccated.
         */
        function load_wptf_cart(ajax_url,true_false){
            $.ajax({
                type: 'POST',
                url: ajax_url,// + get_data,
                data: {
                    action:     'wptf_cart_auto_load',
                },
                success: function(data) {
                    if(data.search(config_json.mcart_empty_now) < 200){ //'Your cart is empty.'
                        $('.tables_cart_message_box').html(data);
                    }
                    if(true_false === 'yes'){
                        $('.tables_cart_message_box').html(data);
                    }

                },
                error: function() {
                },
            });
        }
        
       
        if(config_json.thumbs_lightbox === '1' || config_json.thumbs_lightbox === 1){
            $('body').on('click', '.wptf_product_table_wrapper .wptf_thumbnails img', function() {
            //$('.wptf_product_table_wrapper .wptf_thumbnails img').click(function() {
                var image_source, image_array_count, final_image_url, product_title;
                image_source = $(this).attr('srcset');
                image_source = image_source.split(' ');

                image_array_count = image_source.length - 2;
                final_image_url = image_source[image_array_count];
                product_title = $(this).closest('tr').data('title');
                //console.log(product_title);
                var html = '<div id="wptf_thumbs_popup" class="wptf_thumbs_popup"><div class="wptf_popup_image_wrapper"><span title="Close" id="wptf_popup_close">&times;</span><h2 class="wptf_wrapper_title">' + product_title + '</h2><div class="wptf_thums_inside">';
                html += '<img class="wptf_popup_image" src="' + final_image_url + '">';
                html += '</div></div></div>';
                if ($('body').append(html)) {
                    var PopUp = $('.wptf_thumbs_popup, #wptf_thumbs_popup');
                    PopUp.fadeIn('slow');
                    var Wrapper = $('div.wptf_popup_image_wrapper');
                    /*
                    var WrapperHeight = Wrapper.height();
                    var windowHeight = $(window).height();
                    var topCal = (windowHeight - WrapperHeight)/2;
                    */
                    Wrapper.fadeIn();
                }
            });
            
            

            $('body').on('click', '.wptf_popup_image_wrapper', function() {
                return false;
                
            });
            $('body').on('click', '#wptf_thumbs_popup span#wptf_popup_close, #wptf_thumbs_popup', function() {
                $('#wptf_thumbs_popup').fadeOut(function(){
                    $(this).remove();
                });
                
            });

        }
        
        $('body').on('click','a.button.wptf_woo_add_cart_button.outofstock_add_to_cart_button.disabled',function(e){
            e.preventDefault();
            alert(config_json.sorry_out_of_stock);
            //alert('Sorry! Out of Stock!');
            return false;
        });
        //Add to cart
        $('body').on('click', 'a.ajax_active.wptf_variation_product.single_add_to_cart_button.button.enabled, a.ajax_active.add_to_cart_button.wptf_woo_add_cart_button', function(e) {
            e.preventDefault();
            var thisButton = $(this);
            
            //Adding disable and Loading class
            thisButton.addClass('disabled');
            thisButton.addClass('loading');

            var product_id = $(this).data('product_id');
            
            var temp_number = $(this).closest('.wptf_variation_' + product_id).data('temp_number');
            
            //For Direct Checkout page and Quick Button Features
            var checkoutURL = $('#table_id_' + temp_number).data('checkout_url');

            var added_to_cart_text = $('#table_id_' + temp_number).data('added_to_cart');
            var adding_to_cart_text = $('#table_id_' + temp_number).data('adding_to_cart');
            //Changed at2.9
            //var quantity = $('#table_id_' + temp_number + ' table#wptf_table .wptf_row_product_id_' + product_id + ' .wptf_quantity .quantity input.input-text.qty.text').val();
            var quantity = $(this).attr('data-quantity');
            var custom_message = $('#table_id_' + temp_number + ' table#wptf_table .wptf_row_product_id_' + product_id + ' .wptf_Message input.message').val();
            var variation_id = $(this).attr('data-variation_id');
            var variation = $(this).attr('data-variation');
            //console.log(variation);
            if(variation){
                variation = JSON.parse(variation);
            }
            
            //console.log(variation);
            if(!quantity || quantity === '0'){
                
                thisButton.removeClass('disabled');
                thisButton.removeClass('loading');
                //thisButton.addClass('added');
                alert("Sorry! 0 Quantity");
                return false;
                quantity = 1;
            }
            thisButton.html(adding_to_cart_text);
            //console.log(variation);
            //console.log(variation_id);
            
            var get_data = $(this).attr('href') + '&quantity=' + quantity;//$(this).data('quantity');
            //console.log($('#table_id_' + temp_number + ' table#wptf_table .wptf_row_product_id_' + product_id + ' .wptf_quantity .quantity input').val());
            //console.log(get_data);
            $.ajax({
                type: 'POST',
                url: ajax_url,// + get_data,
                data: {
                    action:     'wptf_ajax_add_to_cart',
                    variation:  variation, //$(this).attr('data-variation'),
                    variation_id:   variation_id,
                    product_id: product_id,
                    quantity:   quantity,
                    custom_message: custom_message,
                },
                success: function(response) {

                    //setFragmentsRefresh( response ); //Deprecited
                    
                    //load_wptf_cart(ajax_url, 'yes'); //Deprecited
                    WPTF_MiniCart(); //New Function generated for setFragmentsRefresh() and load_wptf_cart();
                    $( document.body ).trigger( 'added_to_cart', [ response.fragments, response.cart_hash, thisButton ] ); //Trigger and sent added_to_cart event
                    thisButton.removeClass('disabled');
                    thisButton.removeClass('loading');
                    thisButton.addClass('added');
                    thisButton.html(added_to_cart_text);
                    if(config_json.popup_notice === '1'){
                        WPTF_NoticeBoard();//Gettince Notice
                    }
                    //Quick Button Active here and it will go Directly to checkout Page
                    if(config_json.product_direct_checkout === 'yes'){
                        window.location.href = checkoutURL;
                    }
                    
                    
                    //******************/
                },
                error: function() {
                    alert('Failed - Unable to add by ajax');
                },
            });

        });


        $('body').on('click', 'a.wptf_variation_product.single_add_to_cart_button.button.disabled,a.disabled.yith_add_to_quote_request.button', function(e) {
            e.preventDefault();
            alert(config_json.no_right_combination);
            //alert("Choose Variation First");
            return false;
            
        });
        //Alert of out of stock 

        $('body').on('click', 'a.wptf_woo_add_cart_button.button.disabled.loading,a.disabled.yith_add_to_quote_request.button.loading', function(e) {
            e.preventDefault();
            alert(config_json.adding_in_progress);
            //alert("Adding in Progress");
            return false;

        });
        
        
        //Product Variations change
        $('body').on('change','.wptf_varition_section',function() {
            
            var product_id = $(this).data('product_id');
            var temp_number = $(this).data('temp_number');
            var target_class = '.wptf_variation_' + product_id;
            
            //Added at Version2.6 for Quote Request Button
            var quoted_target = 'yith_request_temp_' + temp_number + '_id_' + product_id;
            //Please choose right combination.//Message
            var targetRightCombinationMsg = config_json.right_combination_message;//$('#table_id_' + temp_number).data('right_combination_message');
            var selectAllItemMessage = config_json.select_all_items_message;//$('#table_id_' + temp_number).data('select_all_items_message');
            var outOfStockMessage = config_json.out_of_stock_message;//$('#table_id_' + temp_number).data('out_of_stock_message');
            

            /**
             * Finally targetPriceSelectorTd has removed becuase we have creaed a new function
             * for targetting any TD of selected Table.
             * This function is targetTD(td_name)
             * @type @call;$
             */
            //var targetPriceSelectorTd = $('#table_id_' + temp_number + ' #price_value_id_' + product_id);

            var targetThumbs = $('#table_id_' + temp_number + ' #product_id_' + product_id + ' td.wptf_thumbnails img');
            var variations_data = $(this).closest(target_class).data('product_variations');
            var messageSelector = $(this).children('div.wptf_message');
            var addToCartSelector = $('#table_id_' + temp_number + ' #product_id_' + product_id + ' a.wptf_variation_product.single_add_to_cart_button');
            var addToQuoteSelector = $('.' + quoted_target);
            
            //Checkbox Selector
            var checkBoxSelector = $('.wptf_check_temp_' + temp_number + '_pr_' + product_id);

            /**
             * Targetting Indivisual TD Element from Targeted Table. Our Targeted Table will come by temp_number
             * As we have used temp_number and product_id in inside function, So this function obvisoulsy shoud
             * declear after to these variable.
             * 
             * @param {String} td_name Actually it will be column names keyword. Suppose, we want to rarget .wptf_price td, than we will use only price as perameter.
             * @returns {$}
             */
            function targetTD(td_name) {
                var targetElement = $('#table_id_' + temp_number + ' #product_id_' + product_id + ' td.wptf_' + td_name);
                return targetElement;
            }
            
            /**
             * Set Variations value to the targetted column's td
             * 
             * @param {type} target_td_name suppose: weight,description,serial_number,thumbnails etc
             * @param {type} gotten_value Suppose: variations description from targatted Object
             * @returns {undefined}
             */
            function setValueToTargetTD_IfAvailable(target_td_name, gotten_value){
                //var varitions_description = targetAttributeObject.variation_description;
                if (gotten_value !== "") {
                    targetTD(target_td_name).html(gotten_value);
                }
            }
            
            /**
             * set value for without condition
             * 
             * @param {type} target_td_name for any td
             * @param {type} gotten_value Any valy
             * @returns {undefined}
             */
            function setValueToTargetTD(target_td_name, gotten_value){
                targetTD(target_td_name).html(gotten_value);
            }
            /**
             * 
             * @param {type} target_td_name suppose: weight,description,serial_number,thumbnails etc
             * @param {type} datas_name getting data value from data-something attribute. example: <td data-product_description='This is sample'> s</td>
             * @returns {undefined}
             */
            function getValueFromOldTD(target_td_name, datas_name){
                //Getting back Old Product Description from data-product_description attribute, which is set 
                var product_descrition_old = targetTD(target_td_name).data(datas_name);
                targetTD(target_td_name).html(product_descrition_old);
            }

            var current = {};
            var additionalAddToCartUrl = '';
            //Defining No Ajax Action for when put href to variation product's add to cart button
            //var no_ajax_action = "";
            if(addToCartSelector.is('.no_ajax_action')){
                //no_ajax_action = "?";
                additionalAddToCartUrl = '?';
            }
            //console.log(addToCartSelector);
            var quote_data = '';
            $(this).children('select').each(function() {
                var attribute_name = $(this).data('attribute_name');
                var attribute_value = $(this).val();
                current[attribute_name] = attribute_value;
                additionalAddToCartUrl += '&' + attribute_name + '=' + attribute_value;
            });
            
            //If not found variations Data, if not set properly
            if($.isEmptyObject(variations_data)){
                targetRightCombinationMsg = config_json.right_combination_message_alt;//"Product variations is not set Properly. May be: price is not inputted. may be: Out of Stock.";
            }

            var targetVariationIndex = 'not_found';
            var selectAllItem = true;
            variations_data.forEach(function(attributesObject, objectNumber) {
                
                //console.log(attributesObject.attributes);
                //console.log(current);
                $.each(current,function(key,value){
                    if(value === "0"){
                        selectAllItem = false;
                    }
                });
                //console.log(selectAllItem);
                var total_right_combination=0, total_combinationable=0;
                if(selectAllItem){
                    $.each(attributesObject.attributes,function(key,value){
                        if(value === "" || value === current[key]){
                            total_right_combination++;
                        }
                        total_combinationable++;
                    });
                    if(total_right_combination === total_combinationable){
                        targetVariationIndex = parseInt(objectNumber);
                        
                    }
                    
                    
                    /*
                    console.log(total_right_combination);
                    console.log(total_combinationable);
                    console.log(attributesObject.attributes);
                    console.log(current);
                    */
                }else{
                    targetRightCombinationMsg = selectAllItemMessage; //"Please select all Items.";
                }
                //console.log(current);
                //if (JSON.stringify(current) === JSON.stringify(attributesObject.attributes)) {
                    //targetVariationIndex = parseInt(objectNumber);
                //}
                //targetVariationIndex = parseInt(objectNumber);
                //console.log("hh");
            });
            
            //console.log(variations_data);
            var wptMessageText = false;
            if (targetVariationIndex !== 'not_found') {
                var targetAttributeObject = variations_data[targetVariationIndex];
                //console.log(targetAttributeObject);
                additionalAddToCartUrl += '&variation_id=' + targetAttributeObject.variation_id;
                quote_data = additionalAddToCartUrl;
                //Link Adding
                additionalAddToCartUrl = addToCartSelector.data('add_to_cart_url') + additionalAddToCartUrl;
                addToCartSelector.attr('href', additionalAddToCartUrl);
                //Added at 2.6 
                //addToQuoteSelector.attr('href', additionalAddToCartUrl);
                
                //Class adding/Removing to add to cart button
                if (targetAttributeObject.is_in_stock) {
                    disbale_enable_class();
                } else {
                    targetRightCombinationMsg = outOfStockMessage; //"Out of Stock";
                    enable_disable_class();
                }

                //Set variation Array to addToCart Button
                //addToCartSelector targetAttributeObject.attributes
                addToCartSelector.attr('data-variation', JSON.stringify(current));//JSON.stringify(current) //current_object //targetAttributeObject.attributes //It was before 2.8 now we will use 'current' object whic will come based on current_selection of variations
                addToCartSelector.attr('data-variation_id', targetAttributeObject.variation_id);
                
                /**
                 * For add to Queto Button
                 * @since 2.6
                 * @date 20.7.2018
                 */
                addToQuoteSelector.attr('data-variation', JSON.stringify(current)); //targetAttributeObject.attributes //It was before 2.8 now we will use 'current' object whic will come based on current_selection of variations
                addToQuoteSelector.attr('data-variation_id', targetAttributeObject.variation_id);
                addToQuoteSelector.attr('data-quote_data', quote_data);
                
                
                //console.log(targetAttributeObject);
                //Set stock Message
                if (targetAttributeObject.availability_html === "") {
                    wptMessageText = '<p class="stock in-stock">In stock</p>';
                } else {
                    wptMessageText = targetAttributeObject.availability_html;
                    //console.log(targetAttributeObject.is_in_stock); //targetAttributeObject.is_purchasable
                }
                //Setup Price Live
                //wptMessageText += targetAttributeObject.price_html;
                //targetPriceSelectorTd.html(targetAttributeObject.price_html);
                //targetTD('price').html(targetAttributeObject.price_html);
                setValueToTargetTD_IfAvailable('price', targetAttributeObject.price_html);

                //Set Image Live for Thumbs
                targetThumbs.attr('src', targetAttributeObject.image.gallery_thumbnail_src);
                targetThumbs.attr('srcset', targetAttributeObject.image.srcset);

                //Set SKU live based on Variations
                setValueToTargetTD_IfAvailable('sku', targetAttributeObject.sku);
                //targetTD('sku').html(targetAttributeObject.sku);
                
                //Set Total Price display_price
                var targetQty = $('#table_id_' + temp_number + ' #product_id_' + product_id + ' td.wptf_quantity .quantity input.input-text.qty.text').val();
                if(!targetQty){
                    targetQty = 1;
                }
                var targetQtyCurrency = targetTD('total').data('currency');
                var targetPriceDecimalSeparator = targetTD('total').data('price_decimal_separator');
                var targetPriceThousandlSeparator = targetTD('total').data('thousand_separator');
                var targetNumbersPoint = targetTD('total').data('number_of_decimal');
                var totalPrice = parseFloat(targetQty) * parseFloat(targetAttributeObject.display_price);
                totalPrice = totalPrice.toFixed(targetNumbersPoint);
                var totalPriceHtml = '<strong>' + targetQtyCurrency + totalPrice.replace(".",targetPriceDecimalSeparator) + '</strong>';

                setValueToTargetTD_IfAvailable('total',totalPriceHtml);
                targetTD('total').attr('data-price', targetAttributeObject.display_price);
                targetTD('total').addClass('total_general');
                
                //Set Description live based on Varitions's Description
                
                setValueToTargetTD_IfAvailable('description', targetAttributeObject.variation_description);
                /*
                var varitions_description = targetAttributeObject.variation_description;
                if (varitions_description !== "") {
                    targetTD('description').html(targetAttributeObject.variation_description);
                }
                */
                
                
                //var oldBackupWeight = targetTD('wptf_weight').attr('data-weight_backup');
                
                //Set Live Weight //weight_html
                //targetTD('weight').html(targetAttributeObject.weight);
                /**
                 * Set weight based on Variations
                 */
                var finalWeightVal = targetAttributeObject.weight * targetQty;
                finalWeightVal = finalWeightVal.toFixed(2);
                if(finalWeightVal === 'NaN'){
                    finalWeightVal = '';
                }
               targetTD('weight').attr('data-weight',targetAttributeObject.weight);
               //console.log(targetTD('wptf_weight'));
                //Set Weight,Height,Lenght,Width
                setValueToTargetTD_IfAvailable('weight', finalWeightVal);
                setValueToTargetTD_IfAvailable('height', targetAttributeObject.dimensions.height);
                setValueToTargetTD_IfAvailable('length', targetAttributeObject.dimensions.length);
                setValueToTargetTD_IfAvailable('width', targetAttributeObject.dimensions.width);
                
                
                //SEt Width height Live
                //console.log(targetAttributeObject);


            } else {
                addToCartSelector.attr('data-variation', false);
                addToCartSelector.attr('data-variation_id', false);
                
                addToQuoteSelector.attr('data-variation', false);
                addToQuoteSelector.attr('data-variation_id', false);
                addToQuoteSelector.attr('data-quote_data', false);
                
                
                wptMessageText = '<p class="wptf_warning warning">' + targetRightCombinationMsg + '</p>'; //Please choose right combination. //Message will come from targatted tables data attribute //Mainly for WPML issues
                //messageSelector.html('<p class="wptf_warning warning"></p>');

                //Class adding/Removing to add to cart button
                enable_disable_class();

                //Reset Price Data from old Price, what was First time
                getValueFromOldTD('price', 'price_html');
                getValueFromOldTD('sku', 'sku');
                setValueToTargetTD('total', '');
                targetTD('total').attr('data-price', '');
                targetTD('total').removeClass('total_general');

                //Getting back Old Product Description from data-product_description attribute, which is set 
                getValueFromOldTD('description', 'product_description');
                //getValueFromOldTD(targatted_td_name,datas_name);
                /**
                var product_descrition_old = targetTD('description').data('product_description');
                targetTD('description').html(product_descrition_old);
                */
                
                var oldBackupWeight = targetTD('weight').attr('data-weight_backup');
                targetTD('weight').attr('data-weight',oldBackupWeight);
                var oldWeightVal = oldBackupWeight * targetQty;
                //Getting Back Old Weight,Lenght,Width,Height
                setValueToTargetTD_IfAvailable('weight', oldWeightVal);
                //getValueFromOldTD('weight', 'weight');
                getValueFromOldTD('length', 'length');
                getValueFromOldTD('width', 'width');
                getValueFromOldTD('height', 'height');
            }

            //Set HTML Message to define div/box
            messageSelector.html(wptMessageText);


            function enable_disable_class() {
                addToCartSelector.removeClass('enabled');
                addToCartSelector.addClass('disabled');
                
                /**
                 * For Add to Quote
                 */
                addToQuoteSelector.removeClass('enabled');
                addToQuoteSelector.addClass('disabled');
                
                

                checkBoxSelector.removeClass('enabled');
                checkBoxSelector.addClass('disabled');


            }
            function disbale_enable_class() {
                addToCartSelector.removeClass('disabled');
                addToCartSelector.addClass('enabled');
                
                /**
                 * For Add To Quote
                 */
                addToQuoteSelector.removeClass('disabled');
                addToQuoteSelector.addClass('enabled');
                

                checkBoxSelector.removeClass('disabled');
                checkBoxSelector.addClass('enabled');
            }

        });
        
        $('.wptf_varition_section').each(function(){
            var current_value = $(this).children('select').val();
            if(current_value !== '0'){
                $(this).trigger('change');
            }
        });

        /**
         * Working for Checkbox of our Table
         */
        $('body').on('click', 'input.wptf_tabel_checkbox.wptf_td_checkbox.disabled', function(e) {
            e.preventDefault();
            alert(config_json.sorry_plz_right_combination);
            //alert("Sorry, Please choose right combination.");
            return false;
        });


       


        $('a.button.add_to_cart_all_selected').click(function() {
            var temp_number = $(this).data('temp_number');
            var checkoutURL = $('#table_id_' + temp_number).data('checkout_url');
            //Add Looading and Disable class 
            var currentAllSelectedButtonSelector = $('#table_id_' + temp_number + ' a.button.add_to_cart_all_selected');
            currentAllSelectedButtonSelector.addClass('disabled');
            currentAllSelectedButtonSelector.addClass('loading');

            var add_cart_text = $('#table_id_' + temp_number).data('add_to_cart');

            //Getting Data from all selected checkbox
            var products_data = {};
            var itemAmount = 0;
            $('#table_id_' + temp_number + ' input.enabled.wptf_tabel_checkbox.wptf_td_checkbox:checked').each(function() {
                var product_id = $(this).data('product_id');
                var currentAddToCartSelector = $('#table_id_' + temp_number + ' #product_id_' + product_id + ' .wptf_action a.wptf_woo_add_cart_button');
                var currentCustomMessage = $('#table_id_' + temp_number + ' #product_id_' + product_id + ' .wptf_Message input.message').val();
                var currentVariaionId = currentAddToCartSelector.data('variation_id');
                var currentVariaion = currentAddToCartSelector.data('variation');
                var currentQantity = $('#table_id_' + temp_number + ' table#wptf_table .wptf_row_product_id_' + product_id + ' .wptf_quantity .quantity input.input-text.qty.text').val();
                products_data[product_id] = {
                    product_id: product_id, 
                    quantity: currentQantity, 
                    variation_id: currentVariaionId, 
                    variation: currentVariaion,
                    custom_message: currentCustomMessage,
                };

                //itemAmount += currentQantity;//To get Item Amount with Quantity
                itemAmount++;
                //console.log('#table_id_'+temp_number);
            });

            //Return false for if no data
            if (itemAmount < 1) {
                currentAllSelectedButtonSelector.removeClass('disabled');
                currentAllSelectedButtonSelector.removeClass('loading');
                alert('Please Choose items.');
                return false;
            }
            $.ajax({
                type: 'POST',
                url: ajax_url,
                data: {
                    action: 'wptf_ajax_mulitple_add_to_cart',
                    products: products_data,
                },
                success: function( response ) {
                    setFragmentsRefresh( response );
                    //load_wptf_cart(ajax_url, 'yes');
                    //console.log(response);
                    
                    WPTF_MiniCart();
                    $( document.body ).trigger( 'added_to_cart', [ response.fragments, response.cart_hash, $('added_to_cart') ] );
                    //config_json.add2cart_all_added_text
                    currentAllSelectedButtonSelector.html(add_cart_text + ' [ ' + itemAmount + ' ' + config_json.add2cart_all_added_text + ' ]');
                    if(config_json.popup_notice === '1'){
                        WPTF_NoticeBoard();//Loading Notice Board
                    } 
                    if(config_json.all_selected_direct_checkout === 'yes'){
                        window.location.href = checkoutURL;
                    }else{
                        currentAllSelectedButtonSelector.removeClass('disabled');
                        currentAllSelectedButtonSelector.removeClass('loading');
                    }
                     //$( document.body ).trigger( 'added_to_cart', [ response.fragments, response.cart_hash, $(this) ] );
                },
                error: function() {
                    alert('Failed');
                },
            });
        });
        
        /**
         * 
         * @param {type} response
         * @returns {undefined}
         */
        function setFragmentsRefresh( response ){
            if(response !== 'undefined'){
                    var fragments = response.fragments;
                    if ( fragments ) {
                        $.each( fragments, function( key, value ) {
                            $( key ).replaceWith( value );
                        });
                    }
                }
        }
        
        /**
         * This function will not use every theme, Need to work, if any theme's cart count not working based on Woocommerce default minicart
         * We have set a system, so you able to work to these theme.
         * Just you have to use select of cart count's element.
         * 
         * @deprecated Currently removed from function
         * @param {type} selectorClassOrID
         * @returns {undefined}
         */
        function setCartCount( selectorClassOrID ){

            //Action wptf_cart_info_details
            $.ajax({
                type: 'POST',
                url: ajax_url,// + get_data,
                data: {
                    action:     'wptf_cart_info_details',
                },
                success: function(data) {
                    $( selectorClassOrID ).html( data );

                },
                error: function() {
                },
            });
        }
        
        
        
        
        
        
        
        /**
         * Search Box Query and Scripting Here
         * @since 1.9
         * @date 9.6.2018 d.m.y
         */
        
        $( 'body' ).on('click','button.wptf_query_search_button,button.wptf_load_more', function(){
            
            var temp_number = $(this).data('temp_number');
            //Added at 2.7
            //var config_json = $('#table_id_' + temp_number + ' table#wptf_table').data('config_json');
            
            
            
            var loadingText = config_json.loading_more_text;// 'Loading...';
            
            var searchText = config_json.search_button_text;//'Search'; //config_json.loading_more_text
            var loadMoreText = config_json.load_more_text;//'Load More';
            //console.log(loadMoreText);
            var thisButton = $(this);
            var actionType = $(this).data('type');
            var load_type = $(this).data('load_type');
            
            thisButton.html(loadingText);

            
            var targetTable = $('#table_id_' + temp_number + ' table#wptf_table');
            var targetTableArgs = targetTable.data( 'data_json' );
            var targetTableBody = $('#table_id_' + temp_number + ' table#wptf_table tbody');
            var pageNumber = targetTable.attr( 'data-page_number' );
            if( actionType === 'query' ){
                pageNumber = 1;
            }
            
            
            
            var key,value;
            var directkey = {};
            $('#search_box_' + temp_number + ' .search_single_direct .query_box_direct_value').each(function(){
                
                key = $(this).data('key');
                value = $(this).val();
                directkey[key] = value;
            });
            var texonomies = {};
            value = false;
            $('#search_box_' + temp_number + ' p.search_select.query').each(function(){
                
                key = $(this).data('key');
                var value = [];var tempSerial = 0;
                $('#' + key + '_' + temp_number + ' input.texonomy_check_box').each(function(Index){
                    if($(this).is(':checked')){
                        value[tempSerial] = $(this).val();
                        tempSerial++;
                    }
                });
                
                
                texonomies[key] = 'value';
            });
            
            
            //Display Loading on before load
            targetTableBody.prepend("<div class='table_row_loader'>" + config_json.loading_more_text + "</div>"); //Laoding..
            $.ajax({
                type: 'POST',
                url: ajax_url,// + get_data,
                data: {
                    action:         'wptf_query_table_load_by_args',
                    temp_number:    temp_number,
                    directkey:      directkey,
                    categoryids: $("select#sd_id_s_product_cat").val(),
                    tagsids: $("select#sd_id_s_product_tag").val(),
                    targetTableArgs:targetTableArgs, 
                    texonomies:     texonomies,
                    pageNumber:     pageNumber,
                    load_type:     load_type,
                },
   
                success: function(data) {
                    
                    $('.table_row_loader').remove();
                    if( actionType === 'query' ){
                        $('#wptf_load_more_wrapper_' + temp_number).remove();
                        targetTableBody.html( data );
                        
                        
                        targetTable.after('<div id="wptf_load_more_wrapper_' + temp_number + '" class="wptf_load_more_wrapper"><button data-temp_number="' + temp_number + '" data-type="load_more" class="button wptf_load_more">' + loadMoreText + '</button></div>');
                        thisButton.html(searchText);
                    }
                    if( actionType === 'load_more' ){
                        if(data !== 'Product Not found'){
                            targetTableBody.append( data );
                            thisButton.html(loadMoreText);
                            
                            //Actually If you Already Filter, Than table will load with Filtered.
                            filterTableRow(temp_number);
                        }else{
                            $('#wptf_load_more_wrapper_' + temp_number).remove();
                            alert(config_json.no_more_query_message);//"There is no more products based on current Query."
                        }
                        
                    }
                    removeCatTagLings();//Removing Cat,tag link, if eanabled from configure page
                    //console.log(pageNumber);
                    pageNumber++; //Page Number Increasing 1 Plus
                    targetTable.attr('data-page_number',pageNumber);
                    //Initialize();
                },
                error: function() {
                    alert("Error On Ajax Query Load. Please check console.");
                    console.log('Error Here');
                },
            });
            
            emptyInstanceSearchBox(temp_number);//When query finished, Instant search box will empty
        });
        
        /**
         * Handleling Filter Features
         */
        $('body').on('change','select.filter_select',function(){
            var temp_number = $(this).data('temp_number');
            filterTableRow(temp_number);
            //emptyInstanceSearchBox(temp_numbers);
            
        });
        
        $('body').on('click','a.wptf_filter_reset',function(e){
            e.preventDefault();
            var temp_number = $(this).data('temp_number');
            $('#table_id_' + temp_number + ' select.filter_select').each(function(){
                $(this).children().first().attr('selected','selected');
            });
            filterTableRow(temp_number);
            //emptyInstanceSearchBox(temp_number);
        });
        
         $('body').on('click', 'input.wptf_check_universal,input.enabled.wptf_tabel_checkbox.wptf_td_checkbox', function() { //wptf_td_checkbox
            var temp_number = $(this).data('temp_number');
            var checkbox_type = $(this).data('type'); //universal_checkbox
            if (checkbox_type === 'universal_checkbox') {
                $('#table_id_' + temp_number + ' input.enabled.wptf_tabel_checkbox.wptf_td_checkbox:visible').prop('checked', this.checked); //.wptf_td_checkbox
                $('input#wptf_check_uncheck_column_' + temp_number).prop('checked', this.checked);
                $('input#wptf_check_uncheck_button_' + temp_number).prop('checked', this.checked);
            }
            var temp_number = $(this).data('temp_number');
            updateCheckBoxCount(temp_number);
        });
        
        function filterTableRow(temp_number){
            emptyInstanceSearchBox(temp_number);
            //Uncheck All for each Change of Filter
            uncheckAllCheck(temp_number);
            
            //Checking FilterBox
            var filterBoxYesNo = $('#table_id_' + temp_number + ' .wptf_filter_wrapper').html();

            /**
             * Uncheck All, If any change on filter button
             * @version 2.0
             */
            
            var ClassArray =[];
            var serial = 0;
            $('#table_id_' + temp_number + ' .wptf_filter_wrapper select.filter_select').each(function(){
                var currentClass = $(this).val();
                
                if(currentClass !==''){
                    //console.log(currentClass);
                    ClassArray[serial] = '.' + currentClass;
                    serial++;
                }
            });
            var finalClassSelctor = '.filter_row' + ClassArray.join(''); //Test will keep
            console.log(finalClassSelctor);
            var hideAbleClass = '#table_id_' + temp_number + ' table tr.wptf_row';//wptf_row #table_id_282
            
           
           if( filterBoxYesNo ){
                $(hideAbleClass + ' td.wptf_check input.enabled.wptf_tabel_checkbox').removeClass('wptf_td_checkbox');
                $(hideAbleClass).css('display','none');
                //$(hideAbleClass).addClass('hidden_row');
                $(hideAbleClass).removeClass('visible_row');

                $(finalClassSelctor).fadeIn();
                $(finalClassSelctor).addClass('visible_row');
                //$(finalClassSelctor).removeClass('hidden_row');
                $(finalClassSelctor + ' td.wptf_check input.enabled.wptf_tabel_checkbox').addClass('wptf_td_checkbox');
            }
            
            /**
             * Updating Check Founting Here
             */
            updateCheckBoxCount(temp_number);
        }
        
        function updateCheckBoxCount(temp_number){
            
            var add_cart_text = $('#table_id_' + temp_number).data('add_to_cart');
            var currentAllSelectedButtonSelector = $('#table_id_' + temp_number + ' a.button.add_to_cart_all_selected');
            var itemAmount = 0;
            $('#table_id_' + temp_number + ' input.enabled.wptf_tabel_checkbox:checked').each(function() { //wptf_td_checkbox
                itemAmount++;//To get Item Amount
            });
            var itemText = config_json.items;//'Items';
            if (itemAmount === 1 || itemAmount === 0) {
                itemText = config_json.item;//'Item';
            }
            currentAllSelectedButtonSelector.html( add_cart_text + ' [ ' + itemAmount + ' ' + itemText + ' ]');
        }
        function uncheckAllCheck(temp_number){
            $('#table_id_' + temp_number + ' input.wptf_check_universal:checkbox,#table_id_' + temp_number + ' table input:checkbox').attr('checked',false);
        }
        
        
        
        /**
         * For Instance Search
         * @since 2.5
         */
        //$('body').on('keyup', '.instance_search_inpu', function() {
        $('.instance_search_input').keyup(function(){
            var text,value_size,serial;
            var temp = $(this).data('temp_number');
            var value = $(this).val();
            value = value.trim();
            
            value = value.split(' ');
            value = value.filter(function(eachItem){
                return eachItem !== '';
            });
            value_size = value.length;

            
            var target_table = '#table_id_' + temp + ' #wptf_table';
                //console.log(value);
            //$(target_table).hide();
            $(target_table + ' tr.visible_row').each(function(){
                text = $(this).html();
                text = text.toLowerCase();
                serial = 0;
                value.forEach(function(eachItem){
                    //console.log(eachItem);
                    if(text.match(eachItem.toLowerCase(),'i')){
                        serial++;
                    }
                });
                //console.log(serial);
                //found_match = text.search(value,'i');
                
                //console.log(found_match);
                if(serial > 0 || value_size === 0){
                    $(this).fadeIn();
                }else{
                    $(this).fadeOut();
                }
                
            });
            
        });
        
        function emptyInstanceSearchBox(temp_number){
            $('#table_id_' + temp_number + ' .instance_search_input').val('');
        }
        
        /**
         * For Add to Quote Plugin
         * YITH add to Quote Request plugin
         * @since 2.6 
         * @date 20.7.2018
         */
        //ywraq_frontend
        $('body').on('click','a.yith_add_to_quote_request.enabled',function(e){
            e.preventDefault();
            if ( typeof ywraq_frontend === 'undefined' ){
                alert("Quote Request plugin is not installed.");
                return false;
            }
            var msg = $(this).data('msg');
            var response_msg = $(this).attr('data-response_msg');
            //console.log(response_msg);
            if(response_msg !== ''){
                alert(response_msg);
                $('.' + selector).html(msg.added);
                return false;
            }
            var selector = $(this).data('selector');
            //console.log(selector);
            $('.' + selector).html(msg.adding);
            var add_to_cart_info;
            var wp_nonce = $(this).data('wp_nonce');
            var product_id = $(this).data('product_id');
            //var variation_id = $(this).attr('data-variation_id'); //Already available in queto_data, so no need
            var quantity = $(this).attr('data-quantity');
            var quote_data = $(this).attr('data-quote_data');
            var yith_product_type = $(this).data('yith_product_type');
            var yith_browse_list = $(this).data('yith_browse_list');
            
            
            add_to_cart_info = 'action=yith_ywraq_action&ywraq_action=add_item';
            add_to_cart_info += quote_data;
            add_to_cart_info += '&quantity=' + quantity;
            add_to_cart_info += '&product_id=' + product_id;
            add_to_cart_info += '&wp_nonce=' + wp_nonce;
            //add_to_cart_info += '&variation_id=' + variation_id;
            add_to_cart_info += '&yith-add-to-cart=' + product_id;
            
            //console.log(add_to_cart_info);
            //attribute_pa_color=red&attribute_logo=No&quantity=1&yith-add-to-cart=10&product_id=10&variation_id=26
            //&action=yith_ywraq_action&ywraq_action=add_item&product_id=10&wp_nonce=4135eea443
            //
            //?add-to-cart=10&attribute_pa_color=red&attribute_logo=No&variation_id=26
            //?add-to-cart=10&attribute_pa_color=red&attribute_logo=No&variation_id=26
            var yith_ajax_url = ywraq_frontend.ajaxurl;
            if( yith_product_type === 'premium'){
                yith_ajax_url = ywraq_frontend.ajaxurl.toString().replace( '%%endpoint%%', 'yith_ywraq_action' )
            }
            
            $.ajax({
            type   : 'POST',
            url    : yith_ajax_url,//ywraq_frontend.ajaxurl,
            dataType: 'json',
            data   : add_to_cart_info,
            beforeSend: function(){
                //$(this).html('...');
                //$t.siblings( '.ajax-loading' ).css( 'visibility', 'visible' );
            },
            complete: function(){
                
                //$t.siblings( '.ajax-loading' ).css( 'visibility', 'hidden' );
            },

            success: function (response) {
                
                //console.log(response);
                if( response.result === 'true' || response.result === 'exists'){
                    $('.' + selector).html(msg.added);
                    if(response.result === 'exists'){
                        
                        $('.' + selector).attr('data-response_msg',response.message);
                        alert(response.message);
                    }
                    $('.' + selector + '+.yith_ywraq_add_item_browse_message').remove();
                    $('.' + selector + '+.yith_ywraq_add_item_response_message').remove();
                    $('.' + selector).after( '<div class="yith_ywraq_add_item_response_message">' + response.message + '</div>');
                    var browse_the_list = response.label_browse;
                    if( yith_product_type === 'premium'){
                        browse_the_list = yith_browse_list;
                    }
                    
                    $('.' + selector).after( '<div class="yith_ywraq_add_item_browse-list yith_ywraq_add_item_browse_message"><a href="'+response.rqa_url+'" target="_blank">' + browse_the_list + '</a></div>'); //response.label_browse
                   
                }else if( response.result === 'false' ){
                    $('.' + selector).html(msg.text);
                    $('.' + selector).after( '<div class="yith_ywraq_add_item_response">' + response.message + '</div>');
                }
                
                
            }
        });
        });
        
        /**
         * Colunm Sorting Option
         * 
         * @since 2.8
         * @date 26.7.2018
         */
        $('body').on('click','table.wptf_product_table thead tr th',function(){
            var inactivated_column = ['wptf_check','wptf_action','wptf_quantity'];
            //console.log(inactivated_column);
            //e.preventDefault();
            var class_for_sorted = 'this_column_sorted';
            var temp_number = $(this).parent().data('temp_number');//.data('temp_number');
            var target_class = '.' + $(this).attr('class').split(' ').join('.');
            var target_table_wrapper_id = '#table_id_' + temp_number;
            
            console.log(target_class);
            //for check box collumn //wptf_thumbnails
            if(target_class !== '.wptf_thumbnails' && target_class !== '.wptf_quick' && target_class !== '.wptf_Message' && target_class !== '.wptf_serial_number' && target_class !== '.wptf_quoterequest' && target_class !== '.wptf_check' && target_class !== '.wptf_quantity' && target_class !== '.wptf_action'){
            //if(!$.inArray(target_class,inactivated_column)){
                
                $(target_table_wrapper_id + ' .' +class_for_sorted).removeClass(class_for_sorted);
                //$(target_class).addClass(class_for_sorted);
                //Again Class Reform after remove class
                target_class = '.' + $(this).attr('class').split(' ').join('.');
                
                



                var sort_type = $(this).attr('data-sort_type');
                
                if(!sort_type || sort_type === 'ASC'){
                    sort_type = 'ASC';
                    $(this).attr('data-sort_type','DESC');
                }else{

                    $(this).attr('data-sort_type','ASC');
                }
                var contentArray = [];
                var contentHTMLArray = [];
                var currentColumnObject = $(target_table_wrapper_id + ' table tbody td' + target_class);
                currentColumnObject.each(function(index){
                    var text,html = '';
                    text = $(this).text();
                    var product_id = $(this).parent('tr').data('product_id');

                    //Refine text
                    text = text + '_' + product_id;
                    var rowInsideHTMLData = $(this).parent('tr').html();

                    //var thisRowObject = document.getElementById('product_id_13');
                    var thisRowObject = $('#table_id_'+ temp_number +' #product_id_' + product_id);
                    var thisRowAttributes = thisRowObject[0].attributes;
                    var thisRowAttributesHTML = '';
                    $.each(thisRowAttributes,function(i,item){
                        //thisRowAttributesHTML += item;
                        //console.log(item);

                        if(this.specified) {
                            thisRowAttributesHTML += this.name + '="' + this.value + '" ';
                            //console.log(this.name, this.value);
                        }

                    });
                    html += '<tr ' + thisRowAttributesHTML + '>';
                    html += rowInsideHTMLData;
                    html += '</tr>';
                    //console.log(html);
                    //console.log(thisRowAttributesHTML);
                    contentArray[index] = text;
                    contentHTMLArray[text] = html;
                });
                function sortingData(a, b){
                    
                    //Added at 3.4

                    if(target_class === '.wptf_price' || target_class === '.wptf_price.this_column_sorted') { //.wptf_price.this_column_sorted
                        a = ( a.match(/\d+\.\d+|\d+\b|\d+(?=\w)/g) || [] ).map(function (v) {return +v;});
                        a = a[0];

                        b = ( b.match(/\d+\.\d+|\d+\b|\d+(?=\w)/g) || [] ).map(function (v) {return +v;});
                        b = b[0];
                    }
                    //var aName = a;//.name.toLowerCase();
                    //var bName = b;//.name.toLowerCase(); 
                    var return_data;
                    if(sort_type === 'ASC'){
                        return_data = ((a < b) ? -1 : ((a > b) ? 1 : 0));
                    }else{
                        return_data = ((b < a) ? -1 : ((b > a) ? 1 : 0));
                    }
                    return return_data;
                  }
                  
                  
                  
                  
                  
                  //console.log(sortingData);
                  var sortedArray = contentArray.sort(sortingData);
                  console.log(sortedArray);
                  var finalHTMLData = '';
                  $.each(sortedArray,function(index,value){
                      finalHTMLData += contentHTMLArray[value];
                      ////console.log(value);
                  });
                ////console.log(finalHTMLData);

                //Removing inside all data of Table
                //$(target_table_wrapper_id + ' table>tbody>tr').remove();

                //Backed HTML Data
                $(target_table_wrapper_id + ' table>tbody').html(finalHTMLData);
                //console.log(contentHTMLArray);

                $(target_table_wrapper_id + ' ' +target_class).addClass(class_for_sorted);
            }

        });
        
        
        //* Removeing link for cat and tag texonomy
        removeCatTagLings();
        /**
         * Removing Linkg for Categories link and from Tag's link.
         * We will remove link by JavaScript I mean: jQuery
         * 
         * @since 3.1
         * @date: 13 sept, 2018
         */
        function removeCatTagLings(){
           if(config_json.disable_cat_tag_link === '1'){
                $('.wptf_category a,.wptf_tags a').contents().unwrap();
            } 
        }
        // Removing link feature End here  */
        
        /**
         * Centerize any HTML Element with original size. But Rememebr, Selected
         * Element should be max-widht100%. 
         * 
         * @param {type} elementObject Seleced Element's object. Such: elementObject = $('#selector_id,.selector_class');
         * @returns {void}
         */
        function centerElement(elementObject){
            elementObject.css({
                position: 'fixed'
            });
            var boardHeight = elementObject.height();
            var boardWidth = elementObject.width();
            var windowHeight = $(window).height();
            var windowWidth = $(window).width();
            var topCal = (windowHeight - (boardHeight + 20))/2;
            var leftCal = (windowWidth - (boardWidth + 20))/2;
            elementObject.css({
                top: topCal + 'px',
                left: leftCal + 'px',
            });                        
            elementObject.fadeIn('slow');
        }
        
    });
})(jQuery);
