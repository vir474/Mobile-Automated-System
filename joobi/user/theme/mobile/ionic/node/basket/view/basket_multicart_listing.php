<?php defined('JOOBI_SECURE') or die('J....');

$basketsA = $this->getContent( 'basketsA' );
$vendorHeader = $this->getContent( 'vendorHeader' );
$totalPriceTitle = $this->getContent( 'totalPriceTitle' );

// create delete button
//$deltext = WText::translate( 'Delete' );
//$ACTION = $deltext;
//$itemId = WPage::getSpecificItemId( 'basket' );
//$image = WView::getLegend( 'delete', $deltext );
//$extra = 'onclick="return confirm(\'' . WText::translate( "Are you sure you want to delete the cart?" ) . '\')"';

$HTMLA = array();
if ( !empty($basketsA) ) {
//debug( 78888111, $basketsA );

	foreach( $basketsA as $id => $oneVendor ) {

//		$linkO = new WLink( $image );
//		$linkO->extra = $extra;
//		$link = WPage::routeURL( 'controller=basket&task=removemulticart&basketid=' .$oneVendor->basketid, '', false, false, $itemId );
//		$deleteHTML =  $linkO->make( $link );

		$count = count( $oneVendor->productsA ) - 1;
		$allCartHTML = '';
		$mainBody = '';
	  	foreach( $oneVendor->productsA as $key => $oneProduct ) {
	  		$allCartHTML .= $oneProduct->image;
	  		$allCartHTML .= '<div class="itemName">' . $oneProduct->linkedName . '</div>';
	  		$allCartHTML .= '<div class="itemQty">' . $oneProduct->quantity . '</div>';
	  		$allCartHTML .= '<div class="itemPrice">' . $oneProduct->price . '</div>';
	  		if ( $key < $count ) $allCartHTML .= '<hr>';
	  	}//enforeach


		$mainBody = '<div class="container-fluid"><div class="row"><div class="col-sm-8 basketItem">';
		$mainBody .= $allCartHTML;
		$mainBody .= '</div>';
		$mainBody .= '<div class="col-sm-4"><div class="lead TotalPrice"><strong>' . $totalPriceTitle . ': ' . $oneVendor->totalPrice . '</strong></div></div></div></div>';

		$panel = new stdClass;
		$panel->id = 'multicart_basket_' . $id;
		$panel->header = '<strong>' . $vendorHeader . ' <span class="lead">' . $oneVendor->name . '</span></strong>';
		$panel->headerRightA[] = $oneVendor->deleteButton;
		$panel->headerRightA[] = $oneVendor->checkOutButton;
		$panel->body = $mainBody;
		$HTMLA[] = WPage::renderBluePrint( 'panel', $panel );

	}//endforeach

}//endif

echo implode( ' ', $HTMLA );