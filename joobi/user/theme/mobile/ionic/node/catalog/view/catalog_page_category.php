<?php defined('JOOBI_SECURE') or die('J....'); ?>
<?php
	$pageParams = WGlobals::get( 'categoryPageParams', '', 'global' );
?>
<main>
<div id="catalogCategoryPage<?php echo $pageParams->ctycss; ?>">
	<section>
	<div id="siteHeader" class="clearfix">

		<?php if ( $pageParams->categoryShowName && $name = $this->getContent('name') ) : ?>
		<div class="page-header">
		<h2 class="title"><cite><?php echo $name; ?></cite>
		<?php if ( $pageParams->categoryShowRSS && $rss = $this->getContent('rss') ) : ?>
		<div id="rssFeed" class="pull-right"><small><?php echo $rss; ?></small></div>
		<?php endif; ?>
		</h2>
		</div>
		<?php endif; ?>


		<div id="siteHeading" class="row">
			<?php
			$colWith = 12;
			if ( $pageParams->categoryShowImage && $image = $this->getContent( 'image' ) ) :
				$colWith = 8;
				$pushRight = (  WPage::isRTL() ? ' col-md-push-' . $colWith : '' );
			?>
			<div id="siteImage" class="col-md-4<?php echo $pushRight; ?>">
				<div id="ImageBox">
				<?php echo $image; ?>
				</div>
			</div>
			<?php endif; ?>

			<?php
				$categoryCount = $this->getValue( 'subcategoryCount' );
				$productCount = $this->getValue( 'numpid' );
				$showShare = $pageParams->showFavorite || $pageParams->showWatch || $pageParams->showViews || $pageParams->showLikeDislike || $pageParams->showShareWall || $pageParams->showPrint;
				if ( $pageParams->categoryShowDesc || ($pageParams->categoryCountCat && $categoryCount>0 ) || ($pageParams->categoryCountItems && $productCount>0) || $showShare ) :
			?>

			<div id="siteContent" class="col-md-<?php echo $colWith; ?>">

				<?php
					$editButton = $this->getValue('newButton');
					if ( !empty($editButton) ) :
				?>
				<div id="editable">
					<?php
					$buttonO = WPage::newBluePrint( 'button' );
					$buttonO->type = 'infoLink';
					$buttonO->text = $editButton;
					$buttonO->icon = 'fa-plus';
					$buttonO->color = 'danger';
					$buttonO->link = $this->getValue('newButtonLink');
					$buttonO->popUpIs = true;
					$buttonO->popUpWidth = '80%';
					$buttonO->popUpHeight = '90%';
					echo WPage::renderBluePrint( 'button', $buttonO );
				?>
				</div>
				<?php endif; ?>

				<?php if ( $pageParams->categoryCountCat && $categoryCount>0 ) : ?>
				<div id="subCatTitle">
					<?php echo $this->getValue( 'subCategoryTitle' ) .' <span class="badge">'. $categoryCount .'</span>'; ?>
				</div>
				<?php endif; ?>

				<?php if ( $pageParams->categoryCountItems && $productCount>0 ) : ?>
				<div id="subProdTitle">
					<?php echo $this->getValue( 'subProductTitle' ) .' <span class="badge">'. $productCount .'</span>'; ?>
				</div>
				<?php endif; ?>

				<?php if ( $pageParams->categoryShowDesc && $description = $this->getContent('description') ) :?>
				<div id="siteDesc">
				<?php echo $description; ?>
				</div>
				<?php endif; ?>

				<?php if ( $showShare ) : ?>
				<div id="siteShareButton" class="clearfix">
					<?php if ( WPage::renderBluePrint( 'socialicons', 'container' ) ) echo '<div class="btn-group">' ?>
					<?php if ( $pageParams->showViews ) : ?>
					<?php echo $this->getValue( 'linkViews' ); ?>
					<?php endif; ?>
					<?php if ( $pageParams->showLikeDislike ) : ?>
					<?php echo $this->getValue( 'linkLikeDislike' ); ?>
					<?php endif; ?>
					<?php if ( $pageParams->showFavorite ) : ?>
					<?php echo $this->getValue( 'linkFavorite' ); ?>
					<?php endif; ?>
					<?php if ( $pageParams->showWatch ) : ?>
					<?php echo $this->getValue( 'linkWatch' ); ?>
					<?php endif; ?>
					<?php
					$shareWallButton = $this->getValue( 'linkShareWall' );
					if ( $pageParams->showShareWall && !empty($shareWallButton) ) : ?>
					<?php echo $shareWallButton; ?>
					<?php endif; ?>
					<?php if ( $pageParams->showPrint ) : ?>
					<?php echo $this->getValue( 'linkPrint' ); ?>
					<?php endif; ?>
					<?php if ( WPage::renderBluePrint( 'socialicons', 'container' ) ) echo '</div>' ?>
				</div>
				<?php endif; ?>

				<?php
				$showShareOnline = $pageParams->showLike || $pageParams->showTweet || $pageParams->showBuzz;
				if ( $showShareOnline ) : ?>
					<div id="siteShareOnline" class="clearfix">
						<?php if ( WPage::renderBluePrint( 'socialicons', 'container' ) ) echo '<div class="btn-group">' ?>
						<?php if ( $pageParams->showLike ) : ?>
						<?php echo $this->getValue( 'linkFacebook' ); ?>
						<?php endif; ?>
						<?php if ( $pageParams->showTweet ) : ?>
						<?php echo $this->getValue( 'linkTwitter' ); ?>
						<?php endif; ?>
						<?php if ( $pageParams->showBuzz && $googlePlus1 = $this->getValue('linkGoogle') ) : ?>
						<?php echo $googlePlus1; ?>
						<?php endif; ?>
						<?php if ( WPage::renderBluePrint( 'socialicons', 'container' ) ) echo '</div>' ?>
					</div>
				<?php endif; ?>
				<?php echo $this->getValue( 'extraSocialHTML' ); ?>

			</div>
			<?php endif; ?>

		</div>

	</div>
	</section>

	<?php if ( $carrousel = $this->getValue('carrousel') ) : ?>
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


	<?php if ( $categories = $this->getValue('categories') ) :
	$showCategoryTitle = WGlobals::get( 'ctytitle', null, 'global' );
	$data = WPage::newBluePrint( 'widgetbox' );
	$data->content = $categories;
	if ( $showCategoryTitle ) $data->title = $this->getValue( 'categoryTitle' );
	$cateogriesPagi = $this->getValue( 'categoriesPagination' );
	if ( !empty($cateogriesPagi) ) {
		$data->headerCenterA[] = $cateogriesPagi;
		$data->bottomCenterA[] = $cateogriesPagi;
	}
	?>
	<div class="siteSubCategories clearfix">
	<section>
		<?php echo WPage::renderBluePrint( 'widgetbox', $data ); ?>
	</section>
	</div>
	<?php endif; ?>


	<?php if ( $items = $this->getValue('items') ) :
	$showItemsTitle = WGlobals::get( 'itmtitle', null, 'global' );
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


	<?php if ( WExtension::exist( 'vendors.node' ) && $vendors = $this->getValue('vendors') ) :
	$showVendorTitle = WGlobals::get( 'categoryVendorsTitle', false, 'global' );
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

</div>
</main>