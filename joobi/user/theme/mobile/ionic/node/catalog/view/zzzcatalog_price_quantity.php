<?php defined('JOOBI_SECURE') or die('J....'); ?>
<div id="catalogCart">
	<div id="cartContainer">
		<?php if ( $itemPrice = $this->getContent( $this->getValue( 'pricetoshow' ) ) ): ?>
		<div id="catalogPrice">
			<div id="productCurrency"> <?php echo $itemPrice; ?> </div>

			<div id="productQuantityValue"> <?php echo $this->getRowContent('itemquantity' ); ?> </div>
			  =  
			<div id="productTotalValue">  <?php echo $itemPrice; ?> </div>

			<div id="catalogCartbutton">
				<?php echo $this->getRowContent('addtocart'); ?>
			</div>
		</div>
		<?php endif; ?>
	</div>
</div>