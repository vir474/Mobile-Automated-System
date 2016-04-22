<?php defined('JOOBI_SECURE') or die('J....'); ?>
<?php
$elements = $this->getContent( 'elements' );
$elementParams = $this->getContent( 'elementParams' );
$header = $this->getContent( 'header' );
// can also use imagePath for the full picture
if (!empty($elements)) : ?>
<table class="table table-striped catalogCat badgeTable<?php echo $this->getContent('classSuffix'); ?>">
<?php if ( !empty($header) && !empty($elementParams->showHeader) ) : ?>
<tr>
	<?php if ( empty($elementParams->showNoImage) ) : ?>
	<th><?php echo $header->photo; ?></th>
	<?php endif; ?>
	<th><?php echo $header->name; ?></th>
</tr>
<?php endif; ?>
<?php foreach( $elements as $i => $element ) :
?>
<tr>
	<?php if ( empty($elementParams->showNoImage) && !empty($element->thumbnailPath) ) : ?>
	<td style="text-align: center;">
		<?php
		if (!empty($element->imageWidth)) $imageWidth = $element->imageWidth;
		if (!empty($element->imageHeight)) $imageHeight = $element->imageHeight;
		if ( !empty( $imageWidth) && !empty($imageHeight) ) $imageSize = ' width="'.$imageWidth.'" height="'.$imageHeight.'"';
		else $imageSize = '';
		$originWidth = $element->originWidth;if ( empty($originWidth) ) $originWidth = 150;
		$originHeight = $element->originHeight;if ( empty($originHeight) ) $originHeight = 200;
		$imagePath = $element->thumbnailPath;

		if ( $element->imageLinked ) {
			echo '<a href="'.$element->pageLink.'"><img title="'.$element->name.'" border="0" src="'. $imagePath . '"'.$imageSize.' /></a>';
		} else {
			echo WPage::createPopUpLink( $element->imagePath, '<img title="'.$element->name.'" border="0" src="'. $imagePath . '"'.$imageSize.' />', ($element->originWidth*1.15), ($element->originHeight*1.15) );
		}//endif
		?>
	</td>
	<?php endif; ?>
	<td>
	<?php
		if ( empty($elementParams->showNoName) ) echo $element->linkName;
		if ( !empty($element->nbItems) )  echo ' ('.$element->nbItems.')';
		if( !empty($element->description) ) echo '<br>' . $element->description;
	?>
	</td>
</tr>
<?php endforeach; ?>
</table>
<?php endif; ?>