<?php defined('JOOBI_SECURE') or die('J....'); ?>
<div>
	<div class="searchInputBg">
	<?php echo $this->getContent( 'searchbox' ); ?>
	</div>
	<?php
		$searchType = $this->getContent( 'searchtype' );
		if ( !empty($searchType) ) :
	?>
	<div class="searchType">
		<?php echo $searchType; ?>
	</div>
	<?php endif; ?>
	<?php
		$searchCategory = $this->getContent( 'searchcategory' );
		if ( !empty($searchCategory) ) :
	?>
	<div class="searchCategory">
		<?php echo $searchCategory; ?>
	</div>
	<?php endif; ?>
	<?php
		$searchVendor = $this->getContent( 'searchvendor' );
		if ( !empty($searchVendor) ) :
	?>
	<div class="searchVendor">
		<?php echo $searchVendor; ?>
	</div>
	<?php endif; ?>
	<?php
		$searchLocation = $this->getContent( 'searchlocation' );
		if ( !empty($searchLocation) ) :
	?>
	<div class="searchLocation">
		<?php echo $searchLocation; ?>
	</div>
	<?php endif; ?>
	
	<?php
		$searchZip = $this->getContent( 'searchzip' );
		if ( !empty($searchZip) ) :
	?>
	<div class="searchZip">
		<?php echo $searchZip; ?>

	<?php endif; ?>
	
	<?php
		$searchZipCountry = $this->getContent( 'searchzipcountry' );
		if ( !empty($searchZipCountry) ) :
	?>

		<?php echo $searchZipCountry; ?>
	</div>
	<?php endif; ?>
	
	<div class="searchBttn">
	<?php echo $this->getContent( 'button' ); ?>
	</div>
</div>