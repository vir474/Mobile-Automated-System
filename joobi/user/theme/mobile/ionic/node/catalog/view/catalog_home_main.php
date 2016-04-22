<?php defined('JOOBI_SECURE') or die('J....'); ?>
<div id="catalogHomePage">
	<?php
	//define if we should show the banner or not
	if ( !defined('PCATALOG_NODE_BANNER') ) WPref::get( 'catalog.node' );
	$showBanner = PCATALOG_NODE_BANNER_SHOW;
	$banner = PCATALOG_NODE_BANNER;
	$searchBox = PCATALOG_NODE_SEARCHBOX;
	$showItems = PCATALOG_NODE_ITMITEMS;
	$showItemsMap = PCATALOG_NODE_ITMAPITEMS;
	$showCategory = PCATALOG_NODE_CTYITEMS;
	$showVendors = PCATALOG_NODE_VDRITEMS;
	$showVendorsMap = PCATALOG_NODE_VDRMAPITEMS;

	if ( $showBanner && !empty($banner) ) :
		if ( substr( $banner, 0, 14 ) == 'catalog/images' ) {
			$bannerURL = JOOBI_URL_THEME . $banner;
		} else {
			$bannerURL = $banner;
		}//endif
	?>
	<div id="siteBanner" class="clearfix">
		<img alt="Banner" src="<?php echo $bannerURL; ?>">
	</div>
	<?php endif; ?>


	<?php if ( $carrousel = $this->getValue( 'carrousel' ) ) : ?>
	<div id="siteTop" class="hidden-xs clearfix">
		<section>
		<div id="siteCarrousel">
			<div id="siteCarrouselContent">
				<?php echo $carrousel; ?>
			</div>
		</div>
		</section>
	</div>
	<?php endif; ?>

	<?php if ( $searchBox ) :
		$search = $this->getContent( 'search' );
		$rss = $this->getValue( 'rss' );
		$data = WPage::newBluePrint( 'widgetbox' );
		$data->content = $search;
		if ( !empty($rss) ) $data->headerRightA[] = $rss;
	?>
	<div class="catalog-search clearfix">
	<section>
	<?php echo WPage::renderBluePrint( 'widgetbox', $data ); ?>
	</section>
	</div>
	<?php endif; ?>


	<?php if ( $showItems && $items = $this->getValue('items') ) :
	$showItemsTitle = PCATALOG_NODE_ITMTITLE;
	$data = WPage::newBluePrint( 'widgetbox' );
	$data->content = $items;
	if ( $showItemsTitle ) $data->title = $this->getValue( 'itemTitle' );
	$data->headerRightA[] = $this->getValue( 'itemsPicklist' );
	$itemsPagi = $this->getValue( 'itemsPagination' );
	if ( !empty($itemsPagi) ) {
		$data->headerCenterA[] = $itemsPagi;
		$data->bottomCenterA[] = $itemsPagi;
	}
	?>
	<div class="siteItems clearfix">
		<section>
		<?php echo WPage::renderBluePrint( 'widgetbox', $data ); ?>
		</section>
	</div>
	<?php endif; ?>


	<?php if ( $showItemsMap && $itemsMap = $this->getValue('itemsmap') ) :
	$showItemsMapTitle = PCATALOG_NODE_ITMAPTITLE;
	$data = WPage::newBluePrint( 'widgetbox' );
	$data->content = $itemsMap;
	if ( $showItemsMapTitle ) $data->title = $this->getValue( 'itemsMapTitle' );
	?>
	<div class="siteItemsMap hidden-xs clearfix">
		<section>
		<?php echo WPage::renderBluePrint( 'widgetbox', $data ); ?>
		</section>
	</div>
	<?php endif; ?>


	<?php if ( $showCategory && $categories = $this->getValue('categories') ) :
	$showCategoryTitle = PCATALOG_NODE_CTYTITLE;
	$data = WPage::newBluePrint( 'widgetbox' );
	$data->content = $categories;
	if ( $showCategoryTitle ) $data->title = $this->getValue( 'categoryTitle' );
	$cateogriesPagi = $this->getValue( 'categoriesPagination' );
	if ( !empty($cateogriesPagi) ) {
		$data->headerCenterA[] = $cateogriesPagi;
		$data->bottomCenterA[] = $cateogriesPagi;
	}
	?>
	<div class="siteCategories clearfix">
	<section>
		<?php echo WPage::renderBluePrint( 'widgetbox', $data ); ?>
	</section>
	</div>
	<?php endif; ?>


	<?php if ( $showVendors && WExtension::exist( 'vendors.node' ) && $vendors = $this->getValue('vendors') ) :
	$showVendorTitle = PCATALOG_NODE_VDRTITLE;
	$data = WPage::newBluePrint( 'widgetbox' );
	$data->content = $vendors;
	if ( $showVendorTitle ) $data->title = $this->getValue( 'vendorTitle' );
	$vendorsPagination = $this->getValue( 'vendorsPagination' );
	if ( !empty($vendorsPagination) ) {
		$data->headerCenterA[] = $vendorsPagination;
		$data->bottomCenterA[] = $vendorsPagination;
	}
	?>
	<div class="siteVendors clearfix">
	<section>
		<?php echo WPage::renderBluePrint( 'widgetbox', $data ); ?>
	</section>
	</div>
	<?php endif; ?>


	<?php if ( $showVendorsMap && $vendorsMap = $this->getValue('vendorsmap') ) :
	$showVendorsMapTitle = PCATALOG_NODE_VDRMAPTITLE;
	$data = WPage::newBluePrint( 'widgetbox' );
	$data->content = $vendorsMap;
	if ( $showVendorsMapTitle ) $data->title = $this->getValue( 'vendorsMapTitle' );
	?>
	<div class="siteVendorsMap hidden-xs clearfix">
	<section>
		<?php echo WPage::renderBluePrint( 'widgetbox', $data ); ?>
	</section>
	</div>
	<?php endif; ?>

</div>