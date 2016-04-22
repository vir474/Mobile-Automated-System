var itemAccordeoncurrent_slide = "1";
var duration = 900;
var easing = 'easeInOutCubic';
var itemAccordeoncurrent_enable = "enabled";

function itemAccordeondisable() {
	itemAccordeoncurrent_enable = "disabled";
}
function itemAccordeonenable() {
	itemAccordeoncurrent_enable = "enabled";
}

function itemAccordeonrotate_slides() {

	if (itemAccordeoncycle == "yes") {
	if (itemAccordeoncurrent_enable == "enabled") {
		
		num = itemAccordeoncurrent_slide;		
		
		if(num != itemAccordeonmodule_counter){			
			next = parseInt(num) + 1;			
			if (document.getElementById("itemAccordeon"+next)) { 
				eval('itemAccordeonopen('+next+')');
			}else itemAccordeonopen(1);			
		}else itemAccordeonopen(1);
		
	}	
		
	window.setTimeout('itemAccordeonrotate_slides()',itemAccordeontransition);
	
	}
}


	function itemAccordeonopen(num) {
		itemAccordeoncurrent_slide = num;			
		itemwidth=$('itemAccordeonWrapperWidth').clientWidth;
		for (i=1;i<=itemAccordeonmodule_counter;i++){	
			
			if(i <= num){
				if(i==1)size="0";
				else{ 				
					multiplier = parseInt(i) - 1;
					size = multiplier * 55;		
				}		
				jQuery("#itemAccordeon"+i).animate({"left": size+"px"},
			            {queue:false, duration:duration, easing:easing});					
			}else{
				slide = i - 1;
				jQuery("#itemAccordeon"+i).animate({"left": itemwidth - ((itemAccordeonmodule_counter - slide) * 55) + "px"},
				 {queue:false, duration:duration, easing:easing});	
			 
			 }
									
			if(i == num){
				jQuery("#itemAccordeon"+num).css({"background-image": "url(" + itemAccordeonurl + "slide.png)"});
				jQuery("#accordeonLinkWrap"+num).css({"color": "#050505"});
			}else{
				jQuery("#itemAccordeon"+i).css({"background-image": "url(" + itemAccordeonurl + "inactive.png)"});
				jQuery("#accordeonLinkWrap"+i).css({"color": "#050505"});				
			}
							
			
		}//endfor
		
	}//endfct