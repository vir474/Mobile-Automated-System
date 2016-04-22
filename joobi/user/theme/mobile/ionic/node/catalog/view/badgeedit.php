<?php defined('JOOBI_SECURE') or die('J....'); ?>
<?php if ( !defined('PCATALOG_NODE_EDITITEMLOCATION') ) WPref::get('catalog.node');
$editArea = PCATALOG_NODE_EDITITEMLOCATION;
?>
<div class="<?php echo $this->getContent('containerClass'); ?> itemItem itemSimplified<?php echo $this->getContent('classSuffix'); ?>">

	<div class="containerPadding">
		<?php
		 if ( $imagePath = $this->getContent('imagePath') ) : ?>
		<div class="siteImage">
		<?php // or imagePath for full image
			$imageWidth = $this->getContent('imageWidth');
			$imageHeight = $this->getContent('imageHeight');
			if ( !empty( $imageWidth) && !empty($imageHeight) ) $imageSize = ' width="' . $imageWidth . '" height="' . $imageHeight . '"';
			else $imageSize = '';
			if ( $this->getContent('imageLinked') ) {
				echo '<a href="'.$this->getContent('pageLink').'"><img title="'.$this->getContent('name').'" border="0" src="'. $imagePath . '"'.$imageSize.' /></a>';
			} else {
				echo WPage::createPopUpLink( $this->getContent('imagePath'), '<img title="'.$this->getContent('name').'" border="0" src="'. $imagePath . '"'.$imageSize.' />', ($this->getContent('originWidth')*1.15), ($this->getContent('originHeight')*1.15) );
			}//endif

			?>
		</div>
		<?php endif; ?>
		<div class="siteRightInfo">
		<h4 class="siteName"><?php if ( $name = $this->getContent('linkName') ) : echo $name; endif; ?></h4>

		<div id="editable">
			<div class="btn-group">
			<?php
			$buttonO = WPage::newBluePrint( 'button' );
			$buttonO->type = 'infoLink';
			$buttonO->text = $this->getContent('editButton');
			$buttonO->icon = 'fa-edit';
			$buttonO->color = 'success';
			$buttonO->link = $this->getValue( 'editButtonLink' );
			$buttonO->popUpIs = true;
			$buttonO->popUpWidth = '90%';
			$buttonO->popUpHeight = '90%';
			echo WPage::renderBluePrint( 'button', $buttonO );

			$buttonO = WPage::newBluePrint( 'button' );
			$buttonO->type = 'infoLink';
			$buttonO->text = $this->getContent('deleteButton');
			$buttonO->icon = 'fa-trash-o';
			$buttonO->color = 'danger';
			$buttonO->link = $this->getValue( 'deleteButtonLink' );
			echo WPage::renderBluePrint( 'button', $buttonO );
			?>
			</div>
		</div>

		<?php
		if ( $rating = $this->getContent('rating') ) : echo '<div class="siteRating">' . $rating . '</div>'; endif;
		if ( $reviews = $this->getContent('nbReviews') ) : echo '<div class="siteReview">' . $reviews . '</div>'; endif;
		if ( $convertedPrice = $this->getContent('convertedPrice') ) : echo '<div class="sitePrice">' . $convertedPrice . '</div>'; endif;
		if ( $quantity = $this->getContent('quantity') ) : echo '<div class="siteQuantity">' . $quantity . '</div>';
		elseif ( $cart = $this->getContent('cart') ) : echo '<div class="siteCart">' . $cart . '</div>'; endif;

		if ( $vendor = $this->getContent('vendorName') ) :
			echo '<div class="siteVendor">'.$this->getContent('vendorBy').': <a href="'.$this->getContent('vendorLink').'">' . $vendor . '</a></div>';
		endif;
		if ( $question = $this->getContent('askQuestionLink') ) : echo '<div class="siteQuestion">'.$question . '</div>'; endif;
		?>
		</div>
		<div class="siteBottomInfo clearfix">
		<?php if ( $preview = $this->getContent('preview') ) : ?>
		<div class="sitePreview<?php echo $this->getContent('previewType'); ?>">
			<?php echo $preview; ?>
		</div>
		<?php endif; ?>
		<?php
		if ( $intro = $this->getContent('introduction') ) : echo '<div class="siteIntro">' . $intro . '</div>'; endif;
		if ( $readMore = $this->getContent('readMoreLink') ) : echo '<div class="siteReadMore">' . $readMore . '</div>'; endif;
		if ( $desc = $this->getContent('description') ) : echo '<div class="siteDesc">' . $desc . '</div>'; endif;
		?>
		</div>
		<hr class="soft">
	</div>

</div>
