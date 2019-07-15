/* 
 * For any important
 * As jQuery already included to Admin Section of WordPress, So jQuery is not added again
 * Already Checked, jQuery working here properly
 * 
 * onclick="document.getElementById('wptf_form_submition_status').value = '0';
 document.getElementById('wptf_configuration_form').submit();"
 * 
 *  onclick="document.getElementById('wptf_form_submition_status').value = '1';
 document.getElementById('wptf_configuration_form').submit();"
 * @since 1.0.0
 * @update 1.0.3
 */


(function($) {
    $(document).ready(function() {
        //For select, used select2 addons of jquery
        $('.wptf_wrap select,select#wptf_product_ids').select2();
        
        //code for Sortable
        $( "#wptf_column_sortable" ).sortable({handle:'.handle'});
        $( "#wptf_column_sortable" ).disableSelection();

    });
})(jQuery);