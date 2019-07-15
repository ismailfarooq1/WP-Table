<?php
/**
 * Plugin Name: Blaketrix Woo Table
 * Author: Blaketrix
 * Description: Custom plugin built for woocommerce table.
 * Version: 1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
  die( '-1' );
}


define( 'WPTF_PLUGIN_BASE_FOLDER', plugin_basename( dirname( __FILE__ ) ) );
define( 'WPTF_PLUGIN_BASE_FILE', plugin_basename( __FILE__ ) );
define( "WPTF_BASE_URL", WP_PLUGIN_URL . '/'. plugin_basename( dirname( __FILE__ ) ) . '/' );
define( "wptf_dir_base", dirname( __FILE__ ) . '/' );
define( "WPTF_BASE_DIR", str_replace( '\\', '/', wptf_dir_base ) );



$shortCodeText = 'Display_Blaketrix_Table';

include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
$WOO_Table = WPT_Product_Table::getInstance();

/**
 * @since 1.7
 */
WPT_Product_Table::$columns_array =  array(
    'serial_number' => 'SL',
    'thumbnails'    => 'Image',
    'product_title' => 'Name',
    'description'   => 'Info',
    'category'      => 'Category',
   
    'rating'        => 'Rating',
    'price'         => 'Price',
    'quantity'      => 'Quantity',
    
    'action'        => 'Action',
    'check'         => 'Check',
);

WPT_Product_Table::$colums_disable_array = array(
    'rating',
    'description',
    'quantity',
    'tags'
);

/**
 * @since 1.7
 */


WPT_Product_Table::$style_form_options = array(
    'default'       =>  'Default Style',
    'blacky'       =>  'Beautifull Blacky',
    'smart'       =>  'Smart Thin',
    'none'             =>  'Select None',
    'green'         =>  'Green Style',
    'blue'         =>  'Blue Style',
    //'business'      =>  'Classical Business' //Deleted at 3.4 and replace with default template
);
/**
 * Set ShortCode text as Static Properties
 * 
 * @since 1.0.0 -5
 */
WPT_Product_Table::$shortCode = $shortCodeText;

/**
 * Set Default Value For Every where, 
 * 
 * @since 1.9
 */
WPT_Product_Table::$default = array(
    'custom_message_on_single_page'=>  true, //Set true to get form in Single Product page for Custom Message
    'plugin_name'           =>  WPT_Product_Table::getName(),
    'plugin_version'        =>  WPT_Product_Table::getVersion(),
    'sort_mini_filter'      =>  'ASC',
    'sort_searchbox_filter' =>  'ASC',
    'custom_add_to_cart'    =>  'add_cart_left_icon',
    'thumbs_image_size'     =>  60,
    'thumbs_lightbox'       => '1',
    'popup_notice'          => '1',
    'disable_product_link'  =>  '0',
    'disable_cat_tag_link'  =>  '0',
    'product_link_target'   =>  '_blank',
    'load_more_text'        =>  'Load more', //__( 'Load more', 'wptf_pro'),
    'quick_view_btn_text'   =>  __( 'Quick View', 'wptf_pro' ), //__( 'Load more', 'wptf_pro'),
    'loading_more_text'     =>  'Loading..', //__( 'Load more', 'wptf_pro'),
    'search_button_text'    =>  'Search', //__( 'Load more', 'wptf_pro'),
    'search_keyword_text'   =>  'Search Keyword', //__( 'Load more', 'wptf_pro'),
    'disable_loading_more'  =>  'normal',
    'instant_search_filter' =>  '0',
    'filter_text'           =>  'Filter:',
    'filter_reset_button'   =>  'Reset',
    'instant_search_text' =>  'Instant Search..',
    'yith_product_type' =>  'free',
    'yith_browse_list' =>  'Browse the list',
    'yith_add_to_quote_text' =>  'Add to Quote',
    'yith_add_to_quote_adding' =>  'Adding..',
    'yith_add_to_quote_added' =>  'Quoted',
    //'default_quantity' =>  '1', Removed from 3.8
    'item'          =>  __( 'Item', 'wptf_pro' ), //It will use at custom.js file for Chinging
    'items'          =>  __( 'Items', 'wptf_pro' ), //It will use at custom.js file for Chinging
    'add2cart_all_added_text'=>  __( 'Added', 'wptf_pro' ), //It will use at custom.js file for Chinging
    'right_combination_message' => __( 'Not available', 'wptf_pro' ),
    'right_combination_message_alt' => __( 'Product variations is not set Properly. May be: price is not inputted. may be: Out of Stock.', 'wptf_pro' ),
    'no_more_query_message' => __( 'There is no more products based on current Query.', 'wptf_pro' ),
    'select_all_items_message' => __( 'Please select all items.', 'wptf_pro' ),
    'out_of_stock_message' => __( 'Out of Stock', 'wptf_pro' ),
    'adding_in_progress'    =>  __( 'Adding in Progress', 'wptf_pro' ),
    'no_right_combination'    =>  __( 'No Right Combination', 'wptf_pro' ),
    'sorry_out_of_stock'    =>  __( 'Sorry! Out of Stock!', 'wptf_pro' ),
    'type_your_message'    =>  __( 'Type your Message.', 'wptf_pro' ),
    'sorry_plz_right_combination' =>    __( 'Sorry, Please choose right combination.', 'wptf_pro' ),
    
    'all_selected_direct_checkout' => 'no',
    'product_direct_checkout' => 'no',
    
    //Added Search Box Features @Since 3.3
    'search_box_title' => __( 'Search Box (<small>All Fields Optional</small>)', 'wptf_pro' ),
    'search_box_searchkeyword' => __( 'Search Keyword', 'wptf_pro' ),
    'search_box_orderby' => __( 'Order By', 'wptf_pro' ),
    'search_box_order' => __( 'Order', 'wptf_pro' ),
    //For Default Table's Content
    'table_in_stock'        =>  __( 'In Stock', 'wptf_pro' ),//'In Stock',
    'table_out_of_stock'    =>  __( 'Out of Stock', 'wptf_pro' ),//'Out of Stock',
    'table_on_back_order'    =>  __( 'On Back Order', 'wptf_pro' ),//'On Back Order',
    
    
);


class WPT_Product_Table{
    
   
    public static $default = array();
    
  
    protected $paths = array();
    
    
    private static $constant = array();
    
    public static $shortCode;

    
    
    public static $columns_array = array();

    
    
    public static $colums_disable_array = array();

   
    public static $style_form_options = array();
    
    
   private static $_instance;
   
   
   protected static $mode = 1;
   
   
   public static function getInstance() {
           if ( ! ( self::$_instance instanceof self ) ) {
                   self::$_instance = new self();
           }

           return self::$_instance;
   }
   
   
   public function __construct() {

       $dir = dirname( __FILE__ ); //dirname( __FILE__ )
       
       
       $path_args = array(
           'PLUGIN_BASE_FOLDER' =>  plugin_basename( $dir ),
           'PLUGIN_BASE_FILE' =>  plugin_basename( __FILE__ ),
           'BASE_URL' =>  WP_PLUGIN_URL. '/'. plugin_basename( $dir ) . '/',
           'BASE_DIR' =>  str_replace( '\\', '/', $dir . '/' ),
       );
       
       $this->setPath($path_args);
       
       /**
        * Set Constant
        * 
        * @since 1.0.0
        */
       $this->setConstant($path_args);
       
       //Load File
       if( is_admin() ){
        require_once $this->path('BASE_DIR','admin/plugin_setting_link.php');
        require_once $this->path('BASE_DIR','admin/menu.php');
        require_once $this->path('BASE_DIR','admin/style_js_adding_admin.php');
        require_once $this->path('BASE_DIR','admin/forms_admin.php');
        require_once $this->path('BASE_DIR','admin/configuration_page.php');
       
        //require_once $this->path('BASE_DIR','admin/ajax_table_preview.php');
       }
       
       if ( is_plugin_active( 'woocommerce/woocommerce.php' ) ) {
           require_once $this->path('BASE_DIR','includes/style_js_adding.php');
           require_once $this->path('BASE_DIR','includes/functions.php');
           require_once $this->path('BASE_DIR','includes/ajax_add_to_cart.php'); 
           require_once $this->path('BASE_DIR','includes/shortcode.php');
       }else{
           require_once $this->path('BASE_DIR','includes/no_woocommerce.php');
       }
       
       
   }
   
   public function setPath( $path_array ) {
       $this->paths = $path_array;
   }
   
   private function setConstant( $contanst_array ) {
       self::$constant = $this->paths;
   }
  
   public function path( $name, $_complete_full_file_path = false ) {
       $path = $this->paths[$name] . $_complete_full_file_path;
       return $path;
   }
   
   
   public static function getPath( $constant_name = false ) {
       $path = self::$constant[$constant_name];
       return $path;
   }
  
   public static function install() {
       //check current value
       $current_value = get_option('wptf_configure_options');
       //$current_value['disable_cat_tag_link']
       $default_value = self::$default;
       $changed_value = false;
       //Set default value in Options
       if($current_value){
           foreach( $default_value as $key=>$value ){
              if( isset($current_value[$key]) && $key != 'plugin_version' ){
                 $changed_value[$key] = $current_value[$key];
              }else{
                  $changed_value[$key] = $value;
              }
           }
           update_option( 'wptf_configure_options', $changed_value );
       }else{
           update_option( 'wptf_configure_options', $default_value );
       }
       
   }
   
  
   
   public static function getPluginData(){
       return get_plugin_data( __FILE__ );
   }
   
  
   public static function getVersion() {
       $data = self::getPluginData();
       return $data['Version'];
   }
   
   
   public static function getName() {
       $data = self::getPluginData();
       return $data['Name'];
   }
   public static function getDefault( $indexKey = false ){
       $default = self::$default;
       if( $indexKey && isset( $default[$indexKey] ) ){
           return $default[$indexKey];
       }
       return $default;
   }

}


register_activation_hook(__FILE__, array( 'WPT_Product_Table','install' ) );
register_deactivation_hook( __FILE__, array( 'WPT_Product_Table','uninstall' ) );

