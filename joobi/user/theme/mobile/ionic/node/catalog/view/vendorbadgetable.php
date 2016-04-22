<?php defined('JOOBI_SECURE') or die('J....'); ?>

<table id="vendorTag badgeTable<?php echo $this->getContent('classSuffix'); ?>">
	<tr>
		<td colspan="2">
			<h4 class="siteName"><?php if ( $name = $this->getContent('name') ) : echo $name.'<br>'; endif; ?></h4>
		</td>
	</tr>
	<tr>
		<?php if ( $imagePath = $this->getContent('imagePath') ) : ?>
		<td class="siteImage">
			<?php 
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
		</td>
		<?php endif; ?>
		<?php  if ( $nbreviews = $this->getContent('nbreviews') OR $nbreviews = $this->getContent('rating')) {?>
		<td valign="top" class="siteReview">
			<?php
			if ( $rating = $this->getContent('rating') ) : echo  $rating ; endif;
			if ( $nbreviews = $this->getContent('nbreviews') )
				if ( $reviews = $this->getContent('reviews') ) : echo '<div class="siteReview">' . $reviews . '</div>'; endif;
			?>
		</td>
		<?php } ?>
	</tr>
	<?php if ( $this->getContent('description')){  ?>
	<tr>
		<td colspan="2" class="siteDesc">
			<?php if ( $description = $this->getContent('description') ) : echo $description.'<br>'; endif; ?>
		</td>
	</tr>
	<?php  } ?>
</table>