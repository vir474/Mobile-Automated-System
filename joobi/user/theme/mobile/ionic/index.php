<?php
defined('JOOBI_SECURE') or die('J....');
?>

<?php
	$viewBodyClass = $this->getContent('viewBodyClass');
	if( $tabS = $this->getContent('tabs') ) :
	echo $tabS;
	endif;
?>
<div class="viewBody<?php  echo $viewBodyClass; ?> clearfix">

	<?php if($breadS = $this->getContent('breadcrumbs') ) : ?>
		<?php  echo $breadS; ?>
	<?php endif; ?>

	<?php if( $messageS = $this->message() ) : ?>
	<div id="message" class="clearfix">
	<?php  echo $messageS; ?>
	</div>
	<?php endif; ?>

	<?php if( $beforeHeader = $this->getContent('beforeHeader') ) echo $beforeHeader; ?>


	<?php if( $menuS = $this->getContent('headerMenu') ) :
	?>
	<div id="toolbarBox" class="clearfix">
		<?php echo $menuS; ?>
	</div>
	<?php endif; ?>

	<?php if( $infoS = $this->getContent('information') ) : echo $infoS; endif; ?>
	<?php if( $wizS = $this->getContent('wizard') ) : echo $wizS; endif; ?>
	<div id="helpArea" class="clearfix"></div>

	<?php
	if( $applicationS = $this->getContent('application') ) echo $applicationS; ?>
		<?php if( $bottomMenuS = $this->getContent('bottomMenu') ) : ?>
		<div class="clearfix viewBottom">
			<div class="bottomButtons">
				<?php echo $bottomMenuS; ?>
			</div>
		</div>
	<?php endif; ?>

	<?php if( $legendS = $this->getContent('legend') ) : ?>
	<div class="clearfix">
		<?php echo $legendS; ?>
	</div>
	<?php endif; ?>

	<?php if( $menuS = $this->getContent('footer') ) echo '<div class="clearfix">' . $menuS . '</div>'; ?>

	<?php if( $debugS = $this->getContent('debugTrace') ) : ?>
	<div class="panel-group clearfix" id="debugTrace">
		<div class="panel panel-danger">
			<div class="panel-heading">
				<h3 class="panel-title">
					<a data-toggle="collapse" data-parent="#debugTrace" href="#debugCollapseOne">Debug Traces</a>
				</h3>
			</div>
			<div id="debugCollapseOne" class="panel-collapse collapse in">
				<div class="panel-body">
				<?php echo $debugS; ?>
				</div>
			</div>
		</div>
	</div>
	<?php endif; ?>

</div>