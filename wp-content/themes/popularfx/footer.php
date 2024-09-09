<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package PopularFX
 */
 
$footer_text = get_theme_mod('popularfx_footer_text');

?>

	<footer id="colophon" class="site-footer">
		<div class="site-info">
			<?php if(empty($footer_text)){ ?>
			<a href="<?php echo esc_url( __( 'https://wordpress.org/', 'popularfx' ) ); ?>">
				<?php
				/* translators: %s: CMS name, i.e. WordPress. */
				printf( esc_html__( 'Proudly powered by %s', 'popularfx' ), 'WordPress' );
				?>
			</a>
			<span class="sep"> | </span>
			<?php
			/* translators: 1: Theme name, 2: Theme author. */
			printf( popularfx_theme_credits() );
			?>
			<?php }else{
				echo wp_kses($footer_text, 'post');
			} ?>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->
<!--Start of Tawk.to Script-->
<script type="text/javascript">
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/6104d94f649e0a0a5ccec7f2/1fbtf1o39';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
    })();
</script>
<!--End of Tawk.to Script-->
<?php wp_footer(); ?>

</body>
</html>
