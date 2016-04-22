<?php defined('JOOBI_SECURE') or die('J....'); ?>
<div id="checkOutPage">
	<div id="processTail" class="clearfix">
		<?php echo $this->getValue( 'processtail' ); ?>
	</div>

	<div id="checkOutList">
		<?php echo $this->getContent( 'checkoutlist' ); ?>
	</div>

	<div id="couponTotalBox" class="row clearfix">
		<div class="col-md-8 couponBoxUpdate">
			<?php if ( $wallet = $this->getValue( 'wallet' ) ) : ?>
				<div class="basketWallet">
					<strong> <?php echo $wallet; ?> </strong>
				</div>
			<?php endif; ?>

			<?php if ( $this->getValue( 'showcoupon' ) ) :
				$couponButton = $this->getContent( $this->getValue( 'couponbutton' ) );
				$updateCartButton = $this->getContent( 'updatecartbutton' );
			?>
				<div class="couponTitle">
					<label for="couponAction"> <?php echo $this->getTitle( $this->getValue( 'coupontext' ) ); ?> </label>
				</div>
				<div class="input-group couponArea">
					<?php echo $this->getContent( 'coupon' ); ?>
					<?php if ( $couponButton ) : ?>
					<div class="input-group-btn">
					<?php echo $couponButton ?>
 					</div>
 					<?php endif; ?>
 					<?php if ( $updateCartButton ) : ?>
 					<div class="input-group-btn">
					<?php echo $updateCartButton; ?>
					</div>
					<?php endif; ?>
				</div>

				<?php if ( $couponDetails = $this->getContent( 'coupondetails' ) ) : ?>
					<div>
						<?php echo $couponDetails; ?>
					</div>
				<?php endif; ?>
			<?php endif; ?>
		</div>

		<div class="col-md-4 checkOutTotal">
			<div class="checkOutCont">
				<?php if ( $this->getValue( 'showSubTotal' ) ) : ?>
					<div class="totalSeparate">
						<div class="leftAlign"> <?php echo $this->getTitle( 'subtotal' ); ?> </div>
						<div class="centerColon"> : </div>
						<div class="rightAlign"> <?php echo $this->getValue( 'subtotal' ); ?> </div>
					</div>
				<?php endif; ?>

				<?php if ( $itemDiscount = $this->getValue( 'itemdiscount' ) ) : ?>
					<div class="totalSeparate">
						<div class="leftAlign"> <?php echo $this->getTitle( 'itemdiscount' ); ?> </div>
						<div class="centerColon"> : </div>
						<div class="rightAlign"> <?php echo $itemDiscount; ?> </div>
					</div>
				<?php endif; ?>

				<?php if ( $couponDiscount = $this->getValue( 'couponDiscount' ) ) : ?>
					<div class="totalSeparate">
						<div class="leftAlign"> <?php echo $this->getTitle( 'coupondiscount' ); ?> </div>
						<div class="centerColon"> : </div>
						<div class="rightAlign"> <?php echo $couponDiscount; ?> </div>
					</div>
				<?php endif; ?>

				<?php if ( $shippingRate = $this->getValue( 'shippingRate' ) ) : ?>
					<div class="totalSeparate">
						<div class="leftAlign"> <?php echo $this->getTitle( 'shippingrate' ); ?> </div>
						<div class="centerColon"> : </div>
						<div class="rightAlign"> <?php echo $shippingRate; ?> </div>
					</div>
				<?php endif; ?>

				<?php if ( $this->getValue( 'showSubTotal' ) ) : ?>
					<div class="totalSeparate">
						<div class="leftAlign"> </div>
						<div class="centerColon"> </div>
						<div class="rightAlign underlineSpace"> </div>
					</div>
				<?php endif; ?>

				<?php if ( $shippingTax = $this->getValue( 'shippingTax' ) ) : ?>
					<div class="totalSeparate">
						<div class="leftAlign"> <?php echo $this->getTitle( 'shippingtax' ); ?> </div>
						<div class="centerColon"> : </div>
						<div class="rightAlign"> <?php echo  $this->getValue( 'taxPlus' ) . ' ' .$shippingTax; ?> </div>
					</div>
				<?php endif; ?>

				<?php if ( $paymentFeeTotal = $this->getValue( 'paymentFeeTotal' ) ) : ?>
					<div class="totalSeparate">
						<div class="leftAlign"> <?php echo $this->getValue( 'paymentFeeText' ); ?> </div>
						<div class="centerColon"> : </div>
						<div class="rightAlign"> <?php echo $paymentFeeTotal; ?> </div>
					</div>
					<div class="totalSeparate">
						<div class="leftAlign"> </div>
						<div class="centerColon"> </div>
						<div class="rightAlign underlineSpace"> </div>
					</div>
				<?php endif; ?>

				<?php if ( $totalTax = $this->getValue( 'taxTotal' ) ) : ?>
					<div class="totalSeparate">
						<div class="leftAlign"> <?php echo $this->getValue( 'taxText' ); ?> </div>
						<div class="centerColon"> : </div>
						<div class="rightAlign"> <?php echo  $this->getValue( 'taxPlus' ) . ' ' .$totalTax; ?> </div>
					</div>
					<div class="totalSeparate">
						<div class="leftAlign"> </div>
						<div class="centerColon"> </div>
						<div class="rightAlign underlineSpace"> </div>
					</div>
				<?php endif; ?>

				<div class="totalSeparate">
					<div class="leftAlign boldText"> <?php echo $this->getTitle( $this->getValue( 'totalTitle' ) ); ?> </div>
					<div class="centerColon"> : </div>
					<div class="rightAlign boldText"> <?php echo $this->getValue( 'total' ); ?> </div>
				</div>

				<?php if ( $this->getValue( 'bookingIsUsed' ) ) : ?>
					<div class="totalSeparate">
						<div class="leftAlign"> <?php echo $this->getTitle( 'bookingfee' ); ?> </div>
						<div class="centerColon"> : </div>
						<div class="rightAlign"> <?php echo $this->getValue( 'bookingfee' ); ?> </div>
					</div>

					<div class="totalSeparate">
						<div class="leftAlign"> </div>
						<div class="centerColon"> </div>
						<div class="rightAlign underlineSpace"> </div>
					</div>

					<div class="totalSeparate">
						<div class="leftAlign boldText"> <?php echo $this->getTitle( 'totaltopay' ); ?> </div>
						<div class="centerColon"> : </div>
						<div class="rightAlign boldText"> <?php echo $this->getValue( 'totalpricetopay' ); ?> </div>
					</div>
				<?php endif; ?>

			</div>

			<?php
			$currencyDropdown = $this->getContent( 'storecurrencies' );
			if ( !empty($currencyDropdown) && '<div class="col-sm-10"></div>' != $currencyDropdown ) :
			?>
				<div>
					<strong> <?php echo $this->getTitle( 'storecurrencies' ); ?> </strong>
					<br/>
					<?php echo $currencyDropdown; ?>
				</div>
			<?php endif; ?>

			<?php if ( $this->getValue( 'showemailfield' ) ) : ?>
				<div id="checkOutEmail">
					<strong> <?php echo $this->getTitle( 'emailaddress' ); ?> </strong><small><span class="requieredText">( <?php echo $this->getContent( 'emailRequired' ); ?> )</span></small>
					<br/>
					<?php echo $this->getContent( 'emailaddress' ); ?>
				</div>
			<?php endif; ?>
		</div>
	</div>
</div>
<div class="clr"></div>