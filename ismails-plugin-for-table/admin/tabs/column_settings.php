<?php
$colums_disable_array = WPT_Product_Table::$colums_disable_array;
$columns_array = WPT_Product_Table::$columns_array;
?>
<ul id="wptf_column_sortable">
    <?php
    foreach( $columns_array as $keyword => $title ){
        $enabled_class = 'enabled';
        $checked_attribute = ' checked="checked"';
        if( in_array( $keyword, $colums_disable_array ) ){
            $enabled_class = $checked_attribute = '';
        }
        $readOnly = ( $keyword == 'check' ? 'readonly' : false);
    ?>
    <li class="wptf_sortable_peritem <?php echo $enabled_class; ?> column_keyword_<?php echo $keyword; ?>">
        <span title="Move Handle" class="handle"></span>
        hello
        <div class="wptf_shortable_data">
            <input  data-column_title="<?php echo $title; ?>" data-keyword="<?php echo $keyword; ?>" class="colum_data_input <?php echo $keyword; ?>" type="text" value="<?php echo $title; ?>" <?php echo $readOnly; ?>>
        </div>
        <span title="Move Handle" class="handle checkbox_handle">
            <input title="Active Inactive Column" class="checkbox_handle_input <?php echo $enabled_class; ?>" type="checkbox" data-column_keyword="<?php echo $keyword; ?>" <?php echo $checked_attribute; ?>>
        </span>
    </li>
    <?php

    }
    ?>

</ul>

<?php
$wptf_style_file_selection_options = WPT_Product_Table::$style_form_options;
?>

<?php
   
    $args = array(
        'hide_empty' => false, //False from 3.4 
        'orderby' => 'count',
        'order' => 'DESC',
    );

    $wptf_product_cat_object = get_terms('product_cat', $args);
?>


<div class="wptf_column">
    <label class="wptf_label" for="wptf_product_slugs">Category Includes <small>(Click to choose Categories)</small></label>
    <select data-name="product_cat_ids" id="wptf_product_ids" class="wptf_fullwidth wptf_data_filed_atts" multiple>
        <?php
        foreach ($wptf_product_cat_object as $category) {
            echo "<option value='{$category->term_id}' " . ( is_array($wptf_product_ids) && in_array($category->term_id, $wptf_product_ids) ? 'selected' : false ) . ">{$category->name} - {$category->slug} ({$category->count})</option>";
        }
        ?>
    </select>
</div>






<?php
    $wptf_product_ids_tag = false;
  
    $args = array(
        'hide_empty' => true,
        'orderby' => 'count',
        'order' => 'DESC',
    );

    $wptf_product_tag_object = get_terms('product_tag', $args);
    //var_dump($wptf_product_tag_object);
?>


<div class="wptf_column">
    <label class="wptf_label" for="product_tag_ids">Tag Includes <small>(Click to choose Tags)</small></label>
    <select data-name="product_tag_ids" id="product_tag_ids" class="wptf_fullwidth wptf_data_filed_atts" multiple>
        <?php
        foreach ($wptf_product_tag_object as $tags) {
            echo "<option value='{$tags->term_id}' " . ( is_array($wptf_product_ids_tag) && in_array($tags->term_id, $wptf_product_ids_tag) ? 'selected' : false ) . ">{$tags->name} - {$tags->slug} ({$tags->count})</option>";
        }
        ?>
    </select>
</div>




<div class="wptf_column ">
    <label class="wptf_label" for='wptf_table_minicart_position'>Mini Cart Position</label>
    <select data-name='minicart_position' id="wptf_table_minicart_position" class="wptf_fullwidth" >
        <option value="" selected="selected">Bottom (Default)</option>
        <option value="bottom">Bottom</option>
        <option value="none">None</option>
    </select>
</div>




<div class="wptf_column">
    <label class="wptf_label" for='wptf_table_temp_number'>Temporary Number for Table</label>
    <input class="wptf_data_filed_atts" data-name="temp_number" type="text" placeholder="123" id='wptf_table_temp_number' value="<?php echo random_int(10, 300); ?>">
    <p>This is not very important, But should different number for different shortcode of your table. Mainly to identify each table.</p>
</div>



<div class="wptf_column">
    <label class="wptf_label" for="wptf_table_shorting">Sorting/Order</label>
    <select data-name='sort' id="wptf_table_shorting" class="wptf_fullwidth wptf_data_filed_atts" >
        
        <option value="">Increasing (Default)</option>
        <option value="DESC">Decreasing</option>
        <option value="random">Random</option>
    </select>
</div>


<div class="wptf_column">
    <label class="wptf_label" for="wptf_table_sort_order_by">Order By</label>
    <select data-name='sort_order_by' id="wptf_table_sort_order_by" class="wptf_fullwidth wptf_data_filed_atts" >
        <option value="menu_order">Menu Order</option> <!-- default menu_order -->
        
        
        <option value="date">Date</option>
        
        <option value="ID">ID</option>
        <option value="title">Product Title</option>
        <option value="name" selected="selected"> Name (Default)</option>
        <option value="type">Type</option>
        
        <option value="parent">Parent</option>
        <option value="relevance">Relevance</option> 
        <option value="none">None</option>
    </select>

</div>



<div style="display: none;" class="wptf_column" id="wptf_meta_value_wrapper">
    <label class="wptf_label" for="wptf_product_meta_value_sort">Meta Value for [Custom Meta Value] of <b>Custom Meta Value</b></label>
    <input value="" data-name='meta_value_sort' id="wptf_product_meta_value_sort" class="wptf_fullwidth wptf_data_filed_atts" type="text"  name="wptf_form_array[meta_value_sort]">
    <p style="color: #00aef0;"> Type your Right meta value here. EG: '_sku', there should now and space </p>
</div>



<div class="wptf_column">
    <label class="wptf_label" for="wptf_table_description_type">Description Length</label>
    <select data-name='description_type' id="wptf_table_description_type" class="wptf_fullwidth wptf_data_filed_atts" >
        <option value="">Short</option><!-- Default Value -->
        <option value="description">Long</option>
    </select>
    <p style="color: #0087be;"></p>
</div>




<div class="wptf_column">
    <label class="wptf_label" for="wptf_posts_per_page">Post Limit/Per Load Limit</label>
    <input data-name='posts_per_page' id="wptf_posts_per_page" class="wptf_fullwidth wptf_data_filed_atts" type="number"  name="" pattern="[0-9]*" placeholder="Eg: 5 (for display 5 products) value="20">
</div>



<div class="wptf_column">
    <label class="wptf_label" for="wptf_table_mobile_responsive">Mobile Responsive</label>
    <select data-name='mobile_responsive' id="wptf_table_mobile_responsive" class="wptf_fullwidth wptf_data_filed_atts" >
        <option value selected>Default (Yes Responsive)</option>
        <option value="no_responsive">No Responsive</option>
    </select>
    
</div>

<?php
$colums_disable_array = WPT_Product_Table::$colums_disable_array;
$colums_disable_array = array_map(function($value){
   $minus_from_disabledArray = array(
        //'thumbnails',
        //'description',
        'quick',
        'wishlist',
        'quoterequest',
        'Message',
        //'ssss',
    );
    /**
    if(!in_array($value, $minus_from_disabledArray)){
       return $value;
   }else{
       return false;
   }
     */
    return !in_array($value, $minus_from_disabledArray) ? $value : false;
}, $colums_disable_array);
$colums_disable_array = array_filter($colums_disable_array);
$colums_disable_array[] = 'thumbnails';
/**
unset($colums_disable_array['thumbnails']);
unset($colums_disable_array['description']);
unset($colums_disable_array['quick']);
unset($colums_disable_array['wishlist']);
unset($colums_disable_array['quoterequest']);
unset($colums_disable_array['Message']);

 */
$columns_array = WPT_Product_Table::$columns_array;
unset($columns_array['product_title']);
unset($columns_array['price']);

unset($columns_array['action']);
unset($columns_array['check']);

?>
<ul id="wptf_keyword_hide_mobile">
    <h1 style="color: #D01040;">Hide On Mobile</h1>
    <p style="padding: 0;margin: 0;">Pleach check you column to hide from Mobile. For all type Table(Responsive or Non-Responsive).</p>
    <hr>
        <?php
    foreach( $columns_array as $keyword => $title ){
        $enabled_class = 'enabled';
        $checked_attribute = ' checked="checked"';
        if( !in_array( $keyword, $colums_disable_array ) ){
            $enabled_class = $checked_attribute = '';
        }
    ?>
    <li class="hide_on_mobile_permits <?php echo $enabled_class; ?> column_keyword_<?php echo $keyword; ?>">
        
        <div class="wptf_mobile_hide_keyword">
            <b  data-column_title="<?php echo $title; ?>" data-keyword="<?php echo $keyword; ?>" class="mobile_issue_field <?php echo $keyword; ?>" type="text" ><?php echo $title; ?></b>
        </div>
        <span title="Move Handle" class="handle checkbox_handle">
            <input title="Active Inactive Column" class="checkbox_handle_input <?php echo $enabled_class; ?>" type="checkbox" data-column_keyword="<?php echo $keyword; ?>" <?php echo $checked_attribute; ?>>
        </span>
    </li>
    <?php

    }
    ?>

</ul>





