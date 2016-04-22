<?php defined('JOOBI_SECURE') or die('J....');
$imagePath = $this->getContent('imagePath');
$colVal = ( !empty( $imagePath ) ? 'col-sm-6' : 'col-xs-12' );
$elementParams = $this->getContent( 'elementParams' );
$id = $this->getContent( 'htmlID' );
if ( !empty($id) ) $idHTML = 'id="' . $id . '" ';
else $idHTML = '';
?>
<div <?php echo $idHTML; ?>class="<?php echo $this->getContent('containerClass'); ?> catalogCat categoryBig<?php echo $this->getContent('classSuffix'); ?>">
<?php if ( $this->getContent( 'borderShow', false ) ): ?>
<div class="panel panel-<?php echo $this->getContent( 'borderColor', 'default' ); ?>">
  <div class="panel-body">
<?php endif; ?>
	<div class="row">
	<?php if ( $imagePath ) : ?>
	<div class="catsiteImage">
	<?php // or imagePath for full image
		$imageWidth = $this->getContent('imageWidth');
		$imageHeight = $this->getContent('imageHeight');
		if ( !empty( $imageWidth) && !empty($imageHeight) ) $imageSize = ' width="'.$imageWidth.'" height="'.$imageHeight.'"';
		else $imageSize = '';
		if ( $this->getContent('imageLinked') ) {
			echo '<a href="'.$this->getContent('pageLink').'"><img title="'.$this->getContent('name').'" border="0" src="'. $imagePath . '"'.$imageSize.' /></a>';
		} else {
			echo WPage::createPopUpLink( $this->getContent('imagePath'), '<img title="'.$this->getContent('name').'" border="0" src="'. $imagePath . '"'.$imageSize.' />', ($this->getContent('originWidth')*1.15), ($this->getContent('originHeight')*1.15) );
		}//endif
		?>
	</div>
	<?php endif; ?>
	<div class="catSiteRightInfo">
		<h4 class="siteName"><?php if ( $name = $this->getContent('linkName') ) : echo $name; endif; ?>
		<?php if ( $nbItems = $this->getContent('nbItems') )  echo ' <span class="badge">'.$nbItems.'</span>'; ?>
		</h4>
		<?php
		if ( $desc = $this->getContent('description') ) : echo '<div class="siteDesc">' . $desc . '</div>'; endif;
		?>
	</div>
	</div>
<?php if ( $this->getContent( 'borderShow', false ) ): ?>
	</div>
</div>
<?php endif; ?>
</div>
<?php
$htmlChild = $this->getContent( 'htmlChild' );
if ( !empty($htmlChild) ) :
$idHTMLSub = $idHTML = 'id="' . $id . '_sub" ';
?>
<div <?php echo $idHTMLSub; ?> class="popoverCat">
<?php echo $htmlChild; ?>
</div>
<?php endif; ?>