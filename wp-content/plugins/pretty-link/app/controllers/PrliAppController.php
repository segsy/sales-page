<?php if(!defined('ABSPATH')) { die('You are not allowed to call this page directly.'); }

class PrliAppController extends PrliBaseController {
  public $screens;

  public function __construct() {
    $this->screens = array(
      'add-edit' => 'pretty-link',
      'list'     => 'edit-pretty-link',
      'category' => 'edit-pretty-link-category',
      'tag'      => 'edit-pretty-link-tag',
      'clicks'   => 'pretty-links_page_pretty-link-clicks',
      'reports'  => 'pretty-links_page_plp-reports',
      'tools'    => 'pretty-links_page_pretty-link-tools',
      'options'  => 'pretty-links_page_pretty-link-options',
      'imp-exp'  => 'pretty-links_page_plp-import-export',
      'activate' => 'pretty-links_page_pretty-link-updates'
    );
  }

  public function load_hooks() {
    global $prli_options;

    add_action('init', array($this, 'parse_standalone_request'), 15); // Later so that the category taxonomy exists for the custom bookmarklet
    add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
    add_action('admin_menu', array($this, 'menu'), 3); //Hooking in earlier - there's a plugin out there somewhere breaking this action for later plugins

    add_action('custom_menu_order', array($this,'admin_menu_order'));
    add_action('menu_order', array($this,'admin_menu_order'));
    add_action('menu_order', array($this,'admin_submenu_order'));

    //Where the magic happens when not in wp-admin nor !GET request
    if($_SERVER["REQUEST_METHOD"] == 'GET' && !is_admin()) {
      add_action('init', array($this, 'redirect'), 1); // Redirect
    }

    // Hook into the 'wp_dashboard_setup' action to register our other functions
    add_action('wp_dashboard_setup', array($this, 'add_dashboard_widgets'));

    add_action('after_plugin_row', array($this, 'pro_action_needed'));
    add_action('admin_notices', array($this, 'pro_get_started_headline'));

    // DB upgrades/installs will happen here, as a non-blocking process hopefully
    add_action('init', array($this, 'install'));

    add_filter( 'plugin_action_links_' . PRLI_PLUGIN_SLUG, array($this,'add_plugin_action_links') );

    add_action('in_admin_header', array($this,'pl_admin_header'), 0);

    // Admin footer text.
    add_filter( 'admin_footer_text', array( $this, 'admin_footer' ), 1, 2 );
  }

  public function pl_admin_header() {
    global $current_screen;

    if($this->on_pretty_link_page()) {
      ?>
      <div id="pl-admin-header"><img class="pl-logo" src="<?php echo PRLI_IMAGES_URL . '/pretty-links-logo-color-white.svg'; ?>" /></div>
      <?php
    }
  }

  private function on_pretty_link_page() {
    global $current_screen;
    return (isset($current_screen->id) && strpos($current_screen->id,'pretty-link') !== false);
  }

  public function menu() {
    global $prli_options, $plp_options, $plp_update;

    $this->admin_separator();

    $role = PrliUtils::get_minimum_role();

    $pl_link_cpt = PrliLink::$cpt;

    if(!$plp_update->is_installed()) {
      add_submenu_page(
        "edit.php?post_type={$pl_link_cpt}",
        esc_html__('Link Categories [Pro Only]', 'pretty-link'),
        esc_html__('Categories [Pro]', 'pretty-link'),
        $role,
        "https://prettylinks.com/pl/main-menu/upgrade?categories",
        false
      );
      add_submenu_page(
        "edit.php?post_type={$pl_link_cpt}",
        esc_html__('Link Tags [Pro Only]', 'pretty-link'),
        esc_html__('Tags [Pro]', 'pretty-link'),
        $role,
        "https://prettylinks.com/pl/main-menu/upgrade?tags",
        false
      );
      add_submenu_page(
        "edit.php?post_type={$pl_link_cpt}",
        esc_html__('Link Reports [Pro Only]', 'pretty-link'),
        esc_html__('Reports [Pro]', 'pretty-link'),
        $role,
        "https://prettylinks.com/pl/main-menu/upgrade?reports",
        false
      );
      add_submenu_page(
        "edit.php?post_type={$pl_link_cpt}",
        esc_html__('Import / Export [Pro Only]', 'pretty-link'),
        esc_html__('Import / Export [Pro]', 'pretty-link'),
        $role,
        "https://prettylinks.com/pl/main-menu/upgrade?import-export",
        false
      );
    }

    if( isset($prli_options->extended_tracking) and $prli_options->extended_tracking != 'count' ) {
      $clicks_ctrl = new PrliClicksController();
      add_submenu_page( "edit.php?post_type={$pl_link_cpt}", esc_html__('Pretty Links | Clicks', 'pretty-link'), esc_html__('Clicks', 'pretty-link'), $role, 'pretty-link-clicks', array( $clicks_ctrl, 'route' ) );
    }

    $routes_ctrl = new PrliToolsController();
    add_submenu_page( "edit.php?post_type={$pl_link_cpt}", esc_html__('Pretty Links | Tools', 'pretty-link'), esc_html__('Tools', 'pretty-link'), $role, 'pretty-link-tools', array($routes_ctrl,'route') );

    $options_ctrl = new PrliOptionsController();
    add_submenu_page( "edit.php?post_type={$pl_link_cpt}", esc_html__('Pretty Links | Options', 'pretty-link'), esc_html__('Options', 'pretty-link'), $role, 'pretty-link-options', array( $options_ctrl, 'route' ));

    if(!defined('PRETTYLINK_LICENSE_KEY') && class_exists('PrliUpdateController')) {
      if($plp_update->is_installed_and_activated()) {
        add_submenu_page( "edit.php?post_type={$pl_link_cpt}", esc_html__('Activate', 'pretty-link'), esc_html__('Activate', 'pretty-link'), $role, 'pretty-link-updates', array($plp_update, 'route'));
      }
      else if($plp_update->is_installed()) {
        add_submenu_page( "edit.php?post_type={$pl_link_cpt}", esc_html__('Activate', 'pretty-link'), '<span class="prli-menu-red"><b>'.esc_html__('Activate', 'pretty-link').'</b></span>', $role, 'pretty-link-updates', array($plp_update, 'route'));
      }
      else {
        add_submenu_page( "edit.php?post_type={$pl_link_cpt}", esc_html__('Upgrade', 'pretty-link'), '<span class="prli-menu-red"><b>'.esc_html__('Upgrade', 'pretty-link').'</b></span>', $role, 'pretty-link-updates', array($plp_update, 'route'));
      }
    }

    $onboarding_ctrl = new PrliOnboardingController();
    add_submenu_page('options.php', __('Welcome', 'pretty-link'), null, $role, 'pretty-link-welcome', array($onboarding_ctrl, 'welcome_route'));
    add_submenu_page('options.php', __("What's New", 'pretty-link'), null, $role, 'pretty-link-update', array($onboarding_ctrl, 'update_route'));
  }

  /**
   * Add a separator to the WordPress admin menus
   */
  public function admin_separator()
  {
    global $menu;

    // Prevent duplicate separators when no core menu items exist
    if(!PrliUtils::is_authorized()) { return; }

    $menu[] = array('', 'read', 'separator-pretty-link', '', 'wp-menu-separator pretty-link');
  }

  /*
   * Move our custom separator above our admin menu
   *
   * @param array $menu_order Menu Order
   * @return array Modified menu order
   */
  public function admin_menu_order($menu_order) {
    if(!$menu_order) {
      return true;
    }

    if(!is_array($menu_order)) {
      return $menu_order;
    }

    // Initialize our custom order array
    $new_menu_order = array();

    // Menu values
    $second_sep   = 'separator2';
    $pl_link_cpt = PrliLink::$cpt;
    $custom_menus = array('separator-pretty-link', "edit.php?post_type={$pl_link_cpt}");

    // Loop through menu order and do some rearranging
    foreach($menu_order as $item) {
      // Position Pretty Links menu above appearance
      if($second_sep == $item) {
        // Add our custom menus
        foreach($custom_menus as $custom_menu) {
          if(array_search($custom_menu, $menu_order)) {
            $new_menu_order[] = $custom_menu;
          }
        }
        // Add the appearance separator
        $new_menu_order[] = $second_sep;
      // Skip our menu items down below
      }
      elseif(!in_array($item, $custom_menus)) {
        $new_menu_order[] = $item;
      }
    }

    // Return our custom order
    return $new_menu_order;
  }

  //Organize the CPT's in our submenu
  public function admin_submenu_order($menu_order) {
    global $submenu;

    static $run = false;

    //no sense in running this everytime the hook gets called
    if($run) { return $menu_order; }

    $pl_link_cpt = PrliLink::$cpt;
    $slug = "edit.php?post_type={$pl_link_cpt}";

    //just return if there's no pretty-link menu available for the current screen
    if(!isset($submenu[$slug])) { return $menu_order; }

    $run = true;
    $new_order = array();

    $categories_ctax = class_exists('PlpLinkCategoriesController') ? PlpLinkCategoriesController::$ctax : 'pretty-link-category';
    $tags_ctax = class_exists('PlpLinkTagsController') ? PlpLinkTagsController::$ctax : 'pretty-link-tag';

    $include_array = array(
      $slug,
      "post-new.php?post_type={$pl_link_cpt}",
      "edit-tags.php?taxonomy={$categories_ctax}&amp;post_type={$pl_link_cpt}",
      'https://prettylinks.com/pl/main-menu/upgrade?categories',
      "edit-tags.php?taxonomy={$tags_ctax}&amp;post_type={$pl_link_cpt}",
      'https://prettylinks.com/pl/main-menu/upgrade?tags',
      'pretty-link-clicks',
      'plp-reports',
      'https://prettylinks.com/pl/main-menu/upgrade?reports',
      'pretty-link-tools',
      'pretty-link-options',
      'plp-import-export',
      'https://prettylinks.com/pl/main-menu/upgrade?import-export',
      'pretty-link-updates'
    );

    $i = (count($include_array) - 1);

    foreach($submenu[$slug] as $sub) {
      $include_order = array_search($sub[2], $include_array);

      if(false !== $include_order) {
        $new_order[$include_order] = $sub;
      }
      else {
        $new_order[$i++] = $sub;
      }
    }

    ksort($new_order);

    $submenu[$slug] = $new_order;

    return $menu_order;
  }

  public function add_plugin_action_links($links) {
    global $plp_update;

    $pllinks = array();

    if($plp_update->is_installed_and_activated()) {
      $pllinks[] = '<a href="https://prettylinks.com/pl/plugin-actions/activated/docs" target="_blank">'.esc_html__('Docs', 'pretty-link').'</a>';
      $pllinks[] = '<a href="'. esc_url( get_admin_url(null, 'admin.php?page=pretty-link-updates') ) .'">'.esc_html__('Activate', 'pretty-link').'</a>';
    }
    else if($plp_update->is_installed()) {
      //$pllinks[] = '<a href="'. esc_url( get_admin_url(null, 'admin.php?page=pretty-link-updates') ) .'" class="prli-menu-green">'.esc_html__('Activate Pro License', 'pretty-link').'</a>';
      //$pllinks[] = '<a href="https://prettylinks.com/pl/plugin-actions/installed/buy" target="_blank" class="prli-menu-red">'.esc_html__('Buy', 'pretty-link').'</a>';
      $pllinks[] = '<a href="https://prettylinks.com/pl/plugin-actions/installed/docs" target="_blank">'.esc_html__('Docs', 'pretty-link').'</a>';
    }
    else {
      $pllinks[] = '<a href="https://prettylinks.com/pl/plugin-actions/lite/upgrade" class="prli-menu-red" target="_blank">'.esc_html__('Upgrade to Pro', 'pretty-link').'</a>';
      $pllinks[] = '<a href="'. esc_url( get_admin_url(null, 'admin.php?page=pretty-link-updates') ) .'" class="prli-menu-green">'.esc_html__('Activate Pro License', 'pretty-link').'</a>';
      $pllinks[] = '<a href="https://prettylinks.com/pl/plugin-actions/lite/docs" target="_blank">'.esc_html__('Docs', 'pretty-link').'</a>';
    }

    return array_merge($pllinks, $links);
  }

  public function enqueue_admin_scripts($hook) {
    global $wp_version, $current_screen;

    wp_enqueue_style( 'prli-fontello-pretty-link',
                      PRLI_VENDOR_LIB_URL.'/fontello/css/pretty-link.css',
                      array(), PRLI_VERSION );

    if ($this->should_enqueue_block_editor_scripts()) {
      wp_enqueue_script(
        'pretty-link-richtext-format',
        PRLI_JS_URL . '/editor.js',
        ['wp-editor', 'wp-i18n', 'wp-element', 'wp-compose', 'wp-components'],
        PRLI_VERSION,
        true
      );

      wp_localize_script('pretty-link-richtext-format', 'plEditor', array(
        'homeUrl' => trailingslashit(get_home_url())
      ));
    }

    // If we're in 3.8 now then use a font for the admin image
    if( version_compare( $wp_version, '3.8', '>=' ) ) {
      wp_enqueue_style( 'prli-menu-styles', PRLI_CSS_URL.'/menu-styles.css',
                        array('prli-fontello-pretty-link'), PRLI_VERSION );
    }

    $is_pl_page           = $this->is_pretty_link_page();
    $is_link_page         = $this->is_pretty_link_link_page();
    $is_link_listing_page = $this->is_pretty_link_listing_page();
    $is_link_edit_page    = $this->is_pretty_link_edit_page();
    $is_link_new_page     = $this->is_pretty_link_new_page();

    if( $is_pl_page || $is_link_page ) {
      $prli_admin_shared_prereqs = array( 'wp-pointer' );

      if(!$is_link_listing_page) {
        wp_register_style('pl-ui-smoothness', PRLI_VENDOR_LIB_URL.'/jquery-ui/jquery-ui.min.css', array(), '1.11.4');
        wp_register_style('prli-simplegrid', PRLI_CSS_URL.'/simplegrid.css', array(), PRLI_VERSION);
        wp_register_style('prli-social', PRLI_CSS_URL.'/social_buttons.css', array(), PRLI_VERSION);

        $prli_admin_shared_prereqs = array_merge(
          $prli_admin_shared_prereqs,
          array(
            'pl-ui-smoothness',
            'prli-simplegrid',
            'prli-social',
          )
        );
      }

      wp_enqueue_style(
        'prli-admin-shared',
        PRLI_CSS_URL.'/admin_shared.css',
        $prli_admin_shared_prereqs,
        PRLI_VERSION
      );

      wp_register_script(
        'prli-tooltip',
        PRLI_JS_URL.'/tooltip.js',
        array('jquery', 'wp-pointer'),
        PRLI_VERSION
      );
      wp_localize_script(
        'prli-tooltip',
        'PrliTooltip',
        array(
          'show_about_notice' => $this->show_about_notice(),
          'about_notice' => $this->about_notice()
        )
      );
      wp_enqueue_script(
        'prli-admin-shared',
        PRLI_JS_URL.'/admin_shared.js',
        array(
          'jquery',
          'jquery-ui-datepicker',
          'jquery-ui-sortable',
          'prli-tooltip'
        ),
        PRLI_VERSION
      );

      if($is_link_edit_page || $is_link_new_page) {
        global $prli_link, $post, $prli_blogurl;

        $link_id = $prli_link->get_link_from_cpt($post->ID);

        $args = array(
          'args' => array(
            'id' => $link_id,
            'action' => 'validate_pretty_link',
            'security' => wp_create_nonce( 'validate_pretty_link' ),
            'update' => __('Update', 'pretty-link')
          ),
          'copy_text' => __('Copy to Clipboard', 'pretty-link'),
          'copied_text' => __('Copied!', 'pretty-link'),
          'copy_error_text' => __('Oops, Copy Failed!', 'pretty-link'),
          'blogurl' => $prli_blogurl,
          'permalink_pre_slug_uri' => PrliUtils::get_permalink_pre_slug_uri()
        );

        wp_enqueue_script( 'prli-link-form', PRLI_JS_URL . '/admin_link_form.js', array(), PRLI_VERSION);
        wp_localize_script( 'prli-link-form', 'PrliLinkValidation', $args );

        wp_dequeue_script('autosave'); // Disable auto-saving
      }
    }

    if($current_screen->post_type == PrliLink::$cpt) {
      wp_enqueue_style( 'prli-admin-links', PRLI_CSS_URL . '/prli-admin-links.css', array(), PRLI_VERSION );
      //wp_enqueue_script( 'jquery-clippy', PRLI_JS_URL . '/jquery.clippy.js', array('jquery'), PRLI_VERSION );
      wp_enqueue_script( 'clipboard-js', PRLI_JS_URL . '/clipboard.min.js', null, PRLI_VERSION );
      wp_enqueue_script( 'jquery-tooltipster', PRLI_JS_URL . '/tooltipster.bundle.min.js', array('jquery'), PRLI_VERSION );
      wp_enqueue_style( 'clipboardtip', PRLI_CSS_URL . '/tooltipster.bundle.min.css', null, PRLI_VERSION );
      wp_enqueue_style( 'clipboardtip-borderless', PRLI_CSS_URL . '/tooltipster-sideTip-borderless.min.css', array('clipboardtip'), PRLI_VERSION );

      wp_enqueue_script( 'prli-admin-links', PRLI_JS_URL . '/prli-admin-links.js', array('jquery','clipboard-js','jquery-tooltipster'), PRLI_VERSION );

      wp_enqueue_script( 'prli-admin-link-list', PRLI_JS_URL . '/admin_link_list.js', array('jquery','clipboard-js','jquery-tooltipster'), PRLI_VERSION );
      $links_js_obj = array(
        'reset_str' => __('Are you sure you want to reset your Pretty Link? This will delete all of the statistical data about this Pretty Link in your database.', 'pretty-link'),
        'reset_security' => wp_create_nonce('reset_pretty_link')
      );
      wp_localize_script( 'prli-admin-link-list', 'PrliLinkList', $links_js_obj );
    }

    if( preg_match('/_page_pretty-link-options$/', $hook) ) {
      wp_enqueue_style('pl-options', PRLI_CSS_URL.'/admin_options.css', null, PRLI_VERSION);
      wp_enqueue_script('pl-options', PRLI_JS_URL.'/admin_options.js', array('jquery'), PRLI_VERSION);
    }

    if( preg_match('/_page_pretty-link-tools$/', $hook) ||
        preg_match('/_page_pretty-link-options$/', $hook) ||
        $current_screen->post_type == PrliLink::$cpt ) {
      wp_enqueue_style('pl-settings-table', PRLI_CSS_URL.'/settings_table.css', null, PRLI_VERSION);
      wp_enqueue_script('pl-settings-table', PRLI_JS_URL.'/settings_table.js', array('jquery'), PRLI_VERSION);
    }

    if( preg_match('/_page_pretty-link-clicks$/', $hook) ) {
      wp_enqueue_script('google-visualization-api', 'https://www.gstatic.com/charts/loader.js', null, PRLI_VERSION);
      wp_enqueue_style('pl-reports', PRLI_CSS_URL.'/admin_reports.css', null, PRLI_VERSION);
      wp_enqueue_script('pl-reports', PRLI_JS_URL.'/admin_reports.js', array('jquery','google-visualization-api'), PRLI_VERSION);
      wp_localize_script('pl-reports', 'PrliReport', PrliReportsController::chart_data());
    }


    $page_vars = compact('is_pl_page', 'is_link_page', 'is_link_listing_page', 'is_link_edit_page', 'is_link_new_page');
    do_action('prli_load_admin_scripts', $hook, $page_vars);
  }

  /**
   * Should we enqueue the block editor scripts?
   *
   * @return bool
   */
  private function should_enqueue_block_editor_scripts() {
    global $wp_version;

    if (version_compare($wp_version, '5.2', '>=')) {
      $screen = get_current_screen();

      if ($screen instanceof WP_Screen && method_exists($screen, 'is_block_editor')) {
        return $screen->is_block_editor();
      }
    }

    return false;
  }

  public function parse_standalone_request() {
    if( !empty($_REQUEST['plugin']) and $_REQUEST['plugin'] == 'pretty-link' and
        !empty($_REQUEST['controller']) and !empty($_REQUEST['action']) ) {
      $this->standalone_route($_REQUEST['controller'], $_REQUEST['action']);
      do_action('prli-standalone-route');
      exit;
    }
    else if( !empty($_GET['action']) and $_GET['action']=='prli_bookmarklet' ) {
      PrliToolsController::standalone_route();
      exit;
    }
  }

  public function standalone_route($controller, $action) {
    return; // Nothing here now that we've moved DB upgrade out of here
  }

  public static function install() {
    global $plp_update, $prli_utils;
    $prli_db = new PrliDb();

    if($prli_db->should_install()) {
      // For some reason, install gets called multiple times so we're basically
      // adding a mutex here (ala a transient) to ensure this only gets run once
      $is_installing = get_transient('prli_installing');
      if($is_installing) {
        return;
      }
      else {
        // 30 minutes
        set_transient('prli_installing', 1, 60*30);
      }

      @ignore_user_abort(true);
      @set_time_limit(0);
      $prli_db->prli_install();

      delete_transient('prli_installing');
    }
  }

  public function pro_settings_submenu() {
    global $wpdb, $prli_utils, $plp_update, $prli_db_version;

    if(isset($_GET['action']) && $_GET['action'] == 'force-pro-reinstall') {
      // Queue the update and auto upgrade
      $plp_update->manually_queue_update();
      $reinstall_url = wp_nonce_url('update.php?action=upgrade-plugin&plugin=pretty-link/pretty-link.php', 'upgrade-plugin_pretty-link/pretty-link.php');
      ?>

      <div class="updated notice notice-success">
        <p>
          <strong>
            <?php
              printf(
                // translators: %1$s: br tag, %2$s: open link tag, %3$s: close link tag
                esc_html__('You\'re almost done!%1$s%2$sFinish your Re-Install of Pretty Links Pro%3$s', 'pretty-link'),
                '<br>',
                '<a href="'.esc_url($reinstall_url).'">',
                '</a>'
              );
            ?>
          </strong>
        </p>
      </div>
      <?php
    }

    if(isset($_GET['action']) and $_GET['action'] == 'pro-uninstall') {
      $prli_utils->uninstall_pro();
      ?>
      <div class="updated notice notice-success is-dismissible"><p><strong><?php esc_html_e('Pretty Links Pro Successfully Uninstalled.' , 'pretty-link'); ?></strong></p></div>
      <?php
    }

    require_once(PRLI_VIEWS_PATH.'/options/pro-settings.php');
  }

  /********* ADD REDIRECTS FOR STANDARD MODE ***********/
  public function redirect() {
    global $prli_link;

    // Remove the trailing slash if there is one
    $request_uri = preg_replace('#/(\?.*)?$#', '$1', rawurldecode($_SERVER['REQUEST_URI']));

    if($link_info = $prli_link->is_pretty_link($request_uri,false)) {
      $params = (isset($link_info['pretty_link_params'])?$link_info['pretty_link_params']:'');
      $this->link_redirect_from_slug( $link_info['pretty_link_found']->slug, $params );
    }
  }

  // For use with the redirect function
  public function link_redirect_from_slug($slug,$param_str) {
    global $prli_link, $prli_utils;

    $link = $prli_link->getOneFromSlug(rawurldecode($slug));

    if(isset($link->slug) and !empty($link->slug)) {
      $custom_get = $_GET;

      /* Don't do any custom param forwarding now
        if(isset($link->param_forwarding) and $link->param_forwarding == 'custom')
          $custom_get = $prli_utils->decode_custom_param_str($link->param_struct, $param_str);
      */

      $success = $prli_utils->track_link($link->slug, $custom_get);

      if($success) { exit; }
    }
  }

  /********* DASHBOARD WIDGET ***********/
  public function dashboard_widget_function() {
    global $prli_link, $prli_blogurl;

    wp_enqueue_script('prli-quick-create', PRLI_JS_URL . '/quick_create.js', array('jquery'), PRLI_VERSION, true);

    wp_localize_script('prli-quick-create', 'PrliQuickCreate', array(
      'nonce' => wp_create_nonce('prli_quick_create'),
      'ajaxUrl' => admin_url('admin-ajax.php'),
      'invalidServerResponse' => __('Invalid server response', 'pretty-link'),
      'ajaxError' => __('Ajax error', 'pretty-link')
    ));

    require_once(PRLI_VIEWS_PATH . '/widgets/widget.php');
  }

  // Create the function use in the action hook
  public function add_dashboard_widgets() {
    global $plp_options;
    $current_user = PrliUtils::get_currentuserinfo();

    $role = 'administrator';
    if(isset($plp_options->min_role)) {
      $role = $plp_options->min_role;
    }

    if(current_user_can($role)) {
      wp_add_dashboard_widget('prli_dashboard_widget', esc_html__('Pretty Link Quick Add', 'pretty-link'), array($this,'dashboard_widget_function'));

      // Globalize the metaboxes array, this holds all the widgets for wp-admin
      global $wp_meta_boxes;

      // Get the regular dashboard widgets array
      $normal_dashboard = $wp_meta_boxes['dashboard']['normal']['core'];

      // Backup and delete our new dashbaord widget from the end of the array
      $prli_widget_backup = array('prli_dashboard_widget' => $normal_dashboard['prli_dashboard_widget']);
      unset($normal_dashboard['prli_dashboard_widget']);

      // Merge the two arrays together so our widget is at the beginning
      $i = 0;
      foreach($normal_dashboard as $key => $value) {
        if($i == 1 or (count($normal_dashboard) <= 1 and $i == count($normal_dashboard) - 1)) {
          $sorted_dashboard['prli_dashboard_widget'] = $prli_widget_backup['prli_dashboard_widget'];
        }

        $sorted_dashboard[$key] = $normal_dashboard[$key];
        $i++;
      }

      // Save the sorted array back into the original metaboxes
      $wp_meta_boxes['dashboard']['normal']['core'] = $sorted_dashboard;
    }
  }

  public function pro_action_needed( $plugin ) {
    global $plp_update;

    if( $plugin == 'pretty-link/pretty-link.php' && $plp_update->is_activated() && !$plp_update->is_installed() ) {
      $plp_update->manually_queue_update();
      $inst_install_url = $plp_update->update_plugin_url();

      ?>
        <tr class="plugin-update-tr active" id="pretty-link-upgrade" data-slug="pretty-link" data-plugin="pretty-link/pretty-link.php">
          <td colspan="3" class="plugin-update colspanchange">
            <div class="update-message notice inline notice-error notice-alt">
              <p><?php printf(__('Your Pretty Links Pro installation isn\'t quite complete yet. %1$sAutomatically Upgrade to Enable Pretty Links Pro%2$s', 'pretty-link'), '<a href="'.$inst_install_url.'">', '</a>'); ?></p>
            </div>
          </td>
        </tr>
      <?php
    }
  }

  public function pro_get_started_headline() {
    global $plp_update;

    // Don't display this error as we're upgrading the thing... cmon
    if(isset($_GET['action']) && $_GET['action'] == 'upgrade-plugin') {
      return;
    }

    if( $plp_update->is_activated() && !$plp_update->is_installed()) {
      $plp_update->manually_queue_update();
      $inst_install_url = wp_nonce_url('update.php?action=upgrade-plugin&plugin=' . PRLI_PLUGIN_SLUG, 'upgrade-plugin_' . PRLI_PLUGIN_SLUG);

      ?>
        <div class="error" style="padding-top: 5px; padding-bottom: 5px;"><?php printf(__('Your Pretty Links Pro installation isn\'t quite complete yet.<br/>%1$sAutomatically Upgrade to Enable Pretty Links Pro%2$s', 'pretty-link'), '<a href="'.$inst_install_url.'">','</a>'); ?></div>
      <?php
    }
  }

  public function show_about_notice() {
    $last_shown_notice = get_option('prli_about_notice_version');
    $version_str = preg_replace('/\./','-',PRLI_VERSION);
    return ( $last_shown_notice != PRLI_VERSION and
             file_exists( PRLI_VIEWS_PATH . "/about/{$version_str}.php" ) );
  }

  public function about_notice() {
    $version_str  = preg_replace('/\./','-',PRLI_VERSION);
    $version_file = PRLI_VIEWS_PATH . "/about/{$version_str}.php";

    if( file_exists( $version_file ) ) {
      ob_start();
      require_once($version_file);
      return ob_get_clean();
    }

    return '';
  }

  public static function close_about_notice() {
    update_option('prli_about_notice_version',PRLI_VERSION);
    wp_cache_delete('alloptions', 'options');
  }

  /**
   * When user is on a Pretty Links related admin page, display footer text
   * that graciously asks them to rate us.
   *
   * @since 1.4.0
   *
   * @param string $text
   *
   * @return string
   */
  public function admin_footer($text) {
    global $current_screen;

    if(!empty($current_screen->id) && $this->is_pretty_link_page()) {
      $url  = 'https://prettylinks.com/pl/footer/review';
      $text = sprintf(
        wp_kses(
          /* translators: $1$s - Pretty Links plugin name; $2$s - WP.org review link; $3$s - WP.org review link. */
          __('Enjoying %1$s? Please rate <a href="%2$s" target="_blank" rel="noopener noreferrer">&#9733;&#9733;&#9733;&#9733;&#9733;</a> on <a href="%3$s" target="_blank" rel="noopener">WordPress.org</a> to help us spread the word. Thanks from the Pretty Links team!', 'pretty-link'),
          array(
            'a' => array(
              'href'   => array(),
              'target' => array(),
              'rel'    => array(),
            ),
          )
        ),
        '<strong>Pretty Links</strong>',
        $url,
        $url
      );
    }

    return $text;
  }

  private function get_screen_id($hook=null) {
    if(is_null($hook)) {
      $screen = get_current_screen();
      $hook = $screen->id;
    }

    return $hook;
  }

  public function is_pretty_link_page() {
    $hook = $this->get_screen_id();
    return (strstr($hook, 'pretty-link') !== false);
  }

  public function is_pretty_link_link_page() {
    $hook = $this->get_screen_id();
    return in_array($hook, array($this->screens['add-edit'],$this->screens['list']));
  }

  public function is_pretty_link_listing_page() {
    $hook = $this->get_screen_id();
    return ($hook == $this->screens['list']);
  }

  public function is_pretty_link_edit_page() {
    $hook = $this->get_screen_id();
    return ($hook == $this->screens['add-edit']);
  }

  public function is_pretty_link_edit_tags() {
    $hook = $this->get_screen_id();
    return ($hook == $this->screens['tag']);
  }

  public function is_pretty_link_new_page() {
    $hook = $this->get_screen_id();
    return ($hook == $this->screens['add-edit']);
  }
}
