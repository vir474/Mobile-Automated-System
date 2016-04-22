!function($){
	var has_touch = 'ontouchstart' in window;

	if(!has_touch){
		$(document).ready(function($){
			// detect animation duration
			var mm_duration = 0;


			var mm_timeout = 500,
				mm_rtl = $('html').attr('dir') == 'rtl',
				sb_width = (function () { 
				var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
					child = parent.children(),
					width = child.innerWidth() - child.height(100).innerWidth();

				parent.remove();

				return width;
			})();

			//lt IE 10
			if(!$.support.transition){
				
				mm_timeout = 100;
			}


			// only work with dropdown and mega
			$('.nav').has('.dropdown-menu').children('li').hover(function(event) {
				var $this = $(this);

					clearTimeout ($this.data('hoverTimeout'));
					$this.data('hoverTimeout', 
						setTimeout(function(){$this.addClass ('open')}, 100));
			},
			function(event) {
				var $this = $(this);
					clearTimeout ($this.data('hoverTimeout'));
					$this.data('hoverTimeout', 
						setTimeout(function(){$this.removeClass ('open')}, 100));
			});
		});

	}
	
}(jQuery);