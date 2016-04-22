<?php defined('JOOBI_SECURE') or die('J....'); ?>
<div id="catalogHomeSearch">

	<?php
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

	<?php if ( $items = $this->getValue('items') ) :
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
</div>