<?php defined('JOOBI_SECURE') or die('J....');
$imagePath = $this->getContent('imagePath');
$colVal = ( !empty( $imagePath ) ? 'col-sm-6' : 'col-xs-12' );
$elementParams = $this->getContent( 'elementParams' );
?>
<div class="<?php echo $this->getContent('containerClass'); ?> catalogVendor vendorBig<?php echo $this->getContent('classSuffix'); ?>">
<?php if ( $this->getContent( 'borderShow', false ) ): ?>
<div class="panel panel-<?php echo $this->getContent( 'borderColor', 'default' ); ?>">
  <div class="panel-body">
<?php endif; ?>
	<div class="row">
	<?php if ( $imagePath ) : ?>
	<div class="<?php echo $colVal; ?> siteImage">
	<?php // or imagePath for full image
		$imageWidth = $this->getContent('imageWidth');
		$imageHeight = $this->getContent('imageHeight');
		if ( !empty( $imageWidth) && !empty($imageHeight) ) $imageSize = ' width="'.$imageWidth.'" height="'.$imageHeight.'"';
		else $imageSize = '';
		if ( $this->getContent('imageLinked') ) {
			echo '<a href="'.$this->getContent('vendorLink').'"><img title="'.$this->getContent('name').'" border="0" src="'. $imagePath . '"'.$imageSize.' /></a>';
		} else {
			echo WPage::createPopUpLink( $this->getContent('imagePath'), '<img title="'.$this->getContent('name').'" border="0" src="'. $imagePath . '"'.$imageSize.' />', ($this->getContent('originWidth')*1.15), ($this->getContent('originHeight')*1.15) );
		}//endif
		?>
	</div>
	<?php endif; ?>
	<div class="<?php echo $colVal; ?> siteRightInfo">
	<?php if ( empty($elementParams->showNoName) ) : ?><h4 class="siteName"><?php if ( $name = $this->getContent('nameLink') ) : echo $name; endif; ?></h4><?php endif; ?>
	<?php
	if ( $rating = $this->getContent('rating') ) : echo '<div class="siteRating">' . $rating . '</div>'; endif;
	if ( $reviews = $this->getContent('nbReviews') ) : echo '<div class="siteReview">' . $reviews . '</div>'; endif;
	if ( $this->getContent('share') ) :
		$linkFacebook = $this->getContent('linkFacebook');
		$linkTwitter = $this->getContent('linkTwitter');
		$googlePlus1 = $this->getContent('linkGoogle');
		$linkShare = $this->getContent('linkShare');
		if ( $linkFacebook || $linkTwitter || $googlePlus1 || $linkShare ) :
		echo '<div class="siteShare">';
			if ( WPage::renderBluePrint( 'socialicons', 'container' ) ) echo '<div class="btn-group">';
			if ( $linkFacebook ) : echo $linkFacebook; endif;
			if ( $linkTwitter ) : echo $linkTwitter; endif;
			if ( $googlePlus1 ) : echo $googlePlus1; endif;
			if ( $linkShare ) : echo $linkShare; endif;
			if ( WPage::renderBluePrint( 'socialicons', 'container' ) ) echo '</div>';
		echo '</div>';
		endif;
	endif;
	?>
	<?php
	if ( $nbreviews = $this->getContent('nbreviews') )
		if ( $reviews = $this->getContent('reviews') ) : echo '<div class="siteReview">' . $reviews . '</div>'; endif;

	if ( $desc = $this->getContent('description') ) : echo '<div class="siteDesc">' . $desc . '</div>'; endif;
	?>
	</div>
	</div>
<?php if ( $this->getContent( 'borderShow', false ) ): ?>
	</div>
</div>
<?php endif; ?>
</div>
