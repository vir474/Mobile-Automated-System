function stopVignetteAnimate(id){
   // jQuery("#"+id).stop(300);
	
}//endfct
function youtubeAuto(id, is_stop)
{
    //iis it youtube?
    	var dataID = jQuery("#"+id).find("object");
	if(dataID.length) 
	{
		var str = dataID.attr('data');
		if(str != "" && str != undefined)
		{
		    var pos_youtube = str.indexOf('youtube');
		    if(pos_youtube != -1)
		    {
			//stop or play???
			var pos = str.indexOf('?autoplay=1');
			if(is_stop)
			{
			      var new_str =  str.substr(0,str.length-11);	
				dataID.attr("data",new_str);
			}
			else
			{
			    if(pos == -1) {
				dataID.attr("data",dataID.attr("data")+"?autoplay=1");

			    }
			}							
			
			return true;
		    }
		    else
		    {
			//it is no youtube video
			return false;
		    }

		}
		 return false;

	}
	return true;
    
 
}
function attrDataAutoplay(id, is_stop)
{
    var dataID = jQuery("#"+id).find("object");
    if(dataID.length) 
    {
	    var str = dataID.attr('data');
	    if(str != "" && str != undefined)
	    {
		//stop or play???
		var pos = str.indexOf('?autostart=true');
		if(is_stop)
		{
			var new_str =  str.substr(0,str.length-15);	
			dataID.attr("data",new_str);
		}
		else
		{
		    if(pos == -1) {
			dataID.attr("data",dataID.attr("data")+"?autostart=true");

		    }
		}
		return true;	
	     }

    }
    return false;
    
}


function stopVignetteAnimateMedia( id, mediaID, playerType ){
  
	
//    
}//endfct
var previousVideo;
var previousVideoMediaID;
var previousVideoType;
function displayVignette(id){


	//hide video if it is showing 
	if(previousVideo !=undefined )
	{
	    if(jQuery("#"+previousVideo).is(":visible") )
	    {
		   hideVignette( previousVideo, previousVideoMediaID, previousVideoType );
	    }
	 
	}
	previousVideo  = id;
	//end hide video if it is showing
	var divId =  jQuery("#"+id);
	//check isset video or not    
//	if(divId.find('div[class*=sitePreview]').length) {
		
	    divId.slideDown( 300, function(){

		    var width = jQuery("#"+id).width();
		    var height = jQuery("#"+id).height();	
		    //div for stop video and close video block
		    jQuery("#o_1_"+id).css({width:width,display:'block'});
		    jQuery("#o_2_"+id).css({width:width,display:'block', top:height});
		    jQuery("#o_3_"+id).css({ height:height,display:'block'});
		    jQuery("#o_4_"+id).css({ height:height,display:'block',left:width});
		    //read mediaID and playerType
		    var mediaIdAndType = jQuery("#o_info_"+id).attr('name');
		
		    if(mediaIdAndType != '/')
		    {
			var mediaIdAndTypeArr = mediaIdAndType.split(/\//);
		
			if(mediaIdAndTypeArr[0] !=undefined && mediaIdAndTypeArr[0] != "")
			{
				//youtube
				if(youtubeAuto(id,false))
				{
				    return false;
				}
				if(attrDataAutoplay(id, false))
				{
				   // return false;
				}
				
			    
				var mediaID = mediaIdAndTypeArr[0];
				var playerType = mediaIdAndTypeArr[1];
			
				previousVideoMediaID = mediaID;
				previousVideoType = playerType;
				if( playerType == 'jwplayer' ) {
				    jwplayer(mediaID).play();	// with jwplayer
				} 
				else 
				{
				 
				     var param_object = jQuery("#"+id).find("object param[name=src]");
				     var param_object2 = jQuery("#"+id).find("object param[name=movie]");
				     param_object = param_object.length? param_object : param_object2.length? param_object2: "";
		
				    if(param_object.length) 
				    {
					    var str = (param_object).val();		
					    var pos = str.indexOf('?autostart=true');	
					    if(pos == -1) {
						    (param_object).val(param_object.val()+"?autostart=true");
					    }			
				    }		
				    var param_embed = jQuery("#"+id).find("object embed");
				
				    if(param_embed.length) 
				    {
					    var str = param_embed.attr('src');
					    var pos = str.indexOf('?autostart=true');			
					    if(pos == -1) {
						    param_embed.attr("src",param_embed.attr("src")+"?autostart=true");

					    }			
				    }
				    
				}//endif

			}
			

		    }
	    });
	 
//	}//endif
	
}//endfct

function hideVignette( id, mediaID, playerType ){

	jQuery("#"+id).slideUp( 300, function() {
            if(mediaID !=undefined && mediaID != "")
            {
                if( playerType == 'jwplayer' ) {
			jwplayer(mediaID).stop();	// with jwplayer
		} else {
			//jQuery("#"+mediaID).find("param[name=autoplay]").attr('value','false');
			//document.mediaID.stop();	//with quick time
	
			if(jQuery("#"+id).css("display") == "none")
			{
			    	//for youtube
				if(youtubeAuto(id,true))
				{
				    return false;
				}
				if(attrDataAutoplay(id, true))
				{
				    //return false;
				}
			
				
				var param_object = jQuery("object[id="+mediaID+"] param[name=src]");
				var param_object2 = jQuery("object[id="+mediaID+"] param[name=movie]");
				param_object = param_object.length? param_object : param_object2.length? param_object2: "";
			
				if(param_object.length) 
				{
					var str = param_object.val();				
					var pos = str.indexOf('?autostart=true');	
					if(pos != -1) {
						var new_str =  str.substr(0,str.length-15);			
						(param_object).val(new_str);
					}			
				}		
				var param_embed = jQuery("object[id="+mediaID+"] embed");	
			
				if(param_embed.length) 
				{
					var str = param_embed.attr("src");			
					var pos = str.indexOf('?autostart=true');					
					if(pos != -1) {
						var new_str =  str.substr(0,str.length-15);					
						param_embed.attr("src",new_str);
			
					}			
				}
							
			
			}
		
//			var for_append = jQuery("#"+id).find('object').parent();
//			console.log(for_append);
//
//			var clone = for_append.clone();
//			var parent_append = for_append.parent();
//			for_append.remove();			
//			jQuery(parent_append).append(clone);
//			
	

		}//endif
            }
	

	
	});

}//endfct

