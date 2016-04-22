/* JS function in clicking the yes|no link for the votation of comment
 *@param link - url of the controller
 */
function voteJS(link, id, path){
	joobi.loadjQuery(path);
	var $j = jQuery.noConflict();

	$j(function(){
		$j("#cmt-loading_"+id).show();
		$j.ajax({
			type: 'POST',
			url: link,
			success: function(data){
					$j("div #cmt_vote_"+id).html(data);
					alert('You have successfully voted!');
					$j("#cmt-loading_"+id).hide();
					joobi.removejQuery();
			}//endsuccess
		});
	});

}//endfct

function deleteComment(tkid,urlink,path){
			joobi.loadjQuery(path);
			var answer = confirm('Are you sure you want to delete?');
		 	if (answer) {
		 		var myparent = window.parent.document;
			 	var $j = jQuery.noConflict();
			 	$j('#cmtbutton-del'+tkid).hide(function() {
	 		   		$j('#postloading'+tkid).show();
	  			});
					$j(function(){
						$j.ajax({
					    		url: urlink,
					    		success: function(data){
					    			num = $j( ".commentNb", myparent ).html() ;				
									num=parseInt(num)-1;
									$j( ".commentNb" , myparent).html(num);
									var trid = $j('#j'+tkid).closest('tr').attr("id");
				  					$j("tr#"+trid).empty();
				  					num = $j( "#num" ).html() ;
									num=parseInt(num)-1;
									$j( "#num" ).html(num);
									if(num==0) $j('#nocomment').show();
				  					joobi.removejQuery();
					    		}//endsuccess
						});//endajax
					});

			}//endif


		}//endfct



function saveComment(namekey,urlink, id, sid, viewNamekey, imgurl, path){
	joobi.loadjQuery(path);
	
	saver = setInterval( function() {
		
		var curButton = joobi.buttons[namekey];
		var formName = curButton['formName'];
		var formElements = document.forms[formName].elements;
		var elem = new Array();
		var dataS;
		var serialedData;
		var extra = null;
		var contentId = "wz"+sid+"_"+viewNamekey;
		var $j = jQuery.noConflict();
		var myparent = window.parent.document;
		
		//validate the star rating
		if( $j("#jrate_rats")){
			if( $j("#jrate_rats").val() == ""){
				 $j("#jratingstarqer").show();
				return false;
			}else{
				 $j("#jratingstarqer").hide();
				extra = $j("#jrate_rats").val();
			}//endif
		}else{
			//element does not exists
		}//endif

		//validate form elements
		if(!joobi.validate(formName)) return false;
		

		//get all the value from the elements which are not hidden
		//disable at the same time
		for (var i=0;i<formElements.length;i++) {
			if( ( (formElements[i].type!="hidden" || formElements[i].name == "trucs["+sid+"][commenttype]" || formElements[i].name == "trucs["+sid+"][etid]" ) || formElements[i].name == "trucs[s][cloud]" ) ) {
				elem[i] = formElements[i];
			}//endif
		}//endfor
		//Put all the elements in an array of objects to be passed in the URL
		serialedData =  $j(elem).serializeArray();
		dataS =  $j.param(serialedData);
		$j(function(){
			for (var i=0;i<formElements.length;i++) {				
				
				if(formElements[i].id){
					if(formElements[i].type!="hidden" ){
						document.getElementById(formElements[i].id).disabled = true;
					}//endif
				}//endif
			}//endfor

		$j('#cmtbutton-add').hide(function() {
 		   	$j('#postloading').show();
  		});

			var tkid = $j("#j"+sid+"tkid").val();
			$j.ajax({
		     		type: 'POST',
		     		url: urlink+'&sid='+sid+'&trucs='+dataS+'&extra='+extra+'&tkid='+tkid,
		     		success: function(data){		     		
		  			if(tkid==0){
						$j("table.style > tbody", myparent).prepend('<tr id="jrow_cmt_1"><td>'+ data + '</td></tr>');
						$j("table.style > tbody:first" ,myparent).fadeIn("slow");
						myparent.getElementById( "jrow_cmt_1" ).focus();
						num = $j( ".commentNb", myparent ).html() ;				
						num=parseInt(num)+1;
						$j( ".commentNb" , myparent).html(num);
						$j('#nocomment', myparent).hide();
						var trid= "jrow_cmt_1";
					}else{
						var trid = $j('#j'+tkid, myparent).closest('tr').attr("id");
			  			$j("tr#"+trid, myparent).empty();
			  			$j("tr#"+trid, myparent).prepend('<td>'+ data + '</td>');
						$j("table.style > tbody", myparent).prepend($j("tr#"+trid, myparent));
						$j("table.style > tbody:first" ,myparent).fadeIn("slow");
					}
					joobi.popClose();
					$j("tr#"+trid, myparent).removeClass();
					$j("tr#"+trid, myparent).attr("bgcolor", "#fafaa8");

					joobi.removejQuery();

		     		}//endsuccess
				});//endajax
			});//endj
		
		clearInterval( saver );
	}, 500);
	
	return false;
	}//endfct

