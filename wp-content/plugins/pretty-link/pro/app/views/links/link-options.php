<tr valign="top">
  <th scope="row">
    <label for="<?php echo esc_attr($plp_options->base_slug_prefix_str); ?>"><?php esc_html_e('Base Slug Prefix', 'pretty-link'); ?></label>
    <?php PrliAppHelper::info_tooltip('prli-base-slug-prefix',
                                      esc_html__('Base Slug Prefix', 'pretty-link'),
                                      sprintf(
                                        // translators: %1$s: open b tag, %2$s close b tag
                                        esc_html__('Use this to prefix all newly generated pretty links with a directory of your choice. For example set to %1$sout%2$s to make your pretty links look like http://site.com/%1$sout%2$s/xyz. Changing this option will NOT affect existing pretty links. If you do not wish to use a directory prefix, leave this text field blank. Whatever you type here will be sanitized and modified to ensure it is URL-safe. So %1$sHello World%2$s might get changed to something like %1$shello-world%2$s instead. Lowercase letters, numbers, dashes, and underscores are allowed.', 'pretty-link'),
                                        '<b>',
                                        '</b>'
                                      ));
    ?>
  </th>
  <td>
    <input type="text" name="<?php echo esc_attr($plp_options->base_slug_prefix_str); ?>" class="regular-text" value="<?php echo esc_attr(stripslashes($plp_options->base_slug_prefix)); ?>" />
  </td>
</tr>

<tr valign="top">
  <th scope="row">
    <label for="<?php echo esc_attr($plp_options->num_slug_chars_str); ?>"><?php esc_html_e('Slug Character Count', 'pretty-link'); ?></label>
    <?php PrliAppHelper::info_tooltip('prli-num-slug-chars',
                                      esc_html__('Slug Character Count', 'pretty-link'),
                                      esc_html__("The number of characters to use when auto-generating a random slug for pretty links. The default is 4. You cannot use less than 2.", 'pretty-link'));
    ?>
  </th>
  <td>
    <input type="number" min="2" name="<?php echo esc_attr($plp_options->num_slug_chars_str); ?>" value="<?php echo esc_attr(stripslashes($plp_options->num_slug_chars)); ?>" />
  </td>
</tr>

<tr valign="top">
  <th scope="row">
    <label for="<?php echo esc_attr($plp_options->google_tracking_str); ?>"><?php esc_html_e('Enable Google Analytics', 'pretty-link') ?></label>
    <?php PrliAppHelper::info_tooltip('prli-options-use-ga', esc_html__('Enable Google Analytics', 'pretty-link'),
                                      esc_html__("Requires Google Analyticator, Google Analytics by MonsterInsights (formerly Yoast), or the Google Analytics Plugin to be installed and configured on your site.", 'pretty-link'));
    ?>
  </th>
  <td>
    <input type="checkbox" name="<?php echo esc_attr($plp_options->google_tracking_str); ?>" id="<?php echo esc_attr($plp_options->google_tracking_str); ?>" <?php checked($plp_options->google_tracking); ?>/>
  </td>
</tr>

<tr valign="top">
  <th scope="row">
    <label for="<?php echo esc_attr($plp_options->generate_qr_codes_str); ?>">
      <?php
        printf(
          // translators: %1s: open link tag, %2$s: close link tag
          esc_html__('Enable %1sQR Codes%2$s', 'pretty-link'),
          '<a href="http://en.wikipedia.org/wiki/QR_code">',
          '</a>'
        );
      ?>
    </label>
    <?php PrliAppHelper::info_tooltip('prli-options-generate-qr-codes',
                                      esc_html__('Generate QR Codes', 'pretty-link'),
                                      esc_html__("This will enable a link in your pretty link admin that will allow you to automatically download a QR Code for each individual Pretty Link.", 'pretty-link'));
    ?>
  </th>
  <td>
    <input type="checkbox" name="<?php echo esc_attr($plp_options->generate_qr_codes_str); ?>" id="<?php echo esc_attr($plp_options->generate_qr_codes_str); ?>" <?php checked($plp_options->generate_qr_codes); ?>/>
  </td>
</tr>

<tr valign="top">
  <th scope="row">
    <label for="<?php echo esc_attr($plp_options->global_head_scripts_str); ?>"><?php esc_html_e('Global Head Scripts', 'pretty-link'); ?></label>
    <?php PrliAppHelper::info_tooltip('prli-options-global-head-scripts',
                                      esc_html__('Global Head Scripts', 'pretty-link'),
                                      sprintf(
                                        // translators: %1$s: br tag, %2$s: open b tag, %3$s close b tag
                                        esc_html__('Useful for adding Google Analytics tracking, Facebook retargeting pixels, or any other kind of tracking script to the HTML head.%1$s%1$sWhat you enter in this box will be applied to all supported pretty links.%1$s%1$s%2$sNOTE:%3$s This does NOT work with 301, 302 and 307 type redirects.', 'pretty-link'),
                                        '<br>',
                                        '<b>',
                                        '</b>'
                                      ));
    ?>
  </th>
  <td>
    <textarea name="<?php echo esc_attr($plp_options->global_head_scripts_str); ?>" id="<?php echo esc_attr($plp_options->global_head_scripts_str); ?>" class="large-text"><?php echo esc_textarea(stripslashes($plp_options->global_head_scripts)); ?></textarea>
  </td>
</tr>

