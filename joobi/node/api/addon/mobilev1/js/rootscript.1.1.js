//angular.module('rootscript', ['ionic', 'starter.services', 'State.Services' ]);

var jnedfd=new Array();
var jnedinst=new Array();
var jareaids=new Array();
var jphpareaids=new Array();

/**
the jAppW class which is the center of our library
it contains important variables that are used in other methods
and the method to load on domready
*/
function jAppW(){
//console.log("rootscript object init");
	//all the buttons from the application
	this.buttons = new Array();
	//this is for the validation of autocheck
	this.autocheckVar = false;

/**
	* we increment an array of code to execute once the dom is fully loaded
	*/
	this.onDOMready = function(codePassed) {
//console.log("onDOMready function");
		jCore.DOMcodeToFire.push(codePassed);
		//if it is the first time we come there we can go to the browserDOMready
		if(jCore.DOMfctset===false)	this.browserDOMready();
	}//endfct


/**
	function to help us detect which browser we are on and use a specific method to load the code on domready
	*/
	this.browserDOMready = function(){
//console.log("browserDOMready");
		//we have been to that function so we flag it
		jCore.DOMfctset=true;

		//to know if the DOM is loaded on internet explorer
		//this is conditional compilation on internet explorer
		//we flag our entrance into that crazy conditional compilation thing
//		jCore.flagIE=false;
		//if we didn't flagIE that means we need for the winning browser
//		if(!jCore.flagIE){
//console.log("browserDOMready flagIE");
			//to know when the DOM is loaded on mozilla and opera 9
			if (document.addEventListener) {
//console.log("DOMcontentload");
			//	window.onload = jCore.DOMready;
			//	document.getElementById("main_body").setAttribute("onload", "jCore.DOMready;");
			//	document.addEventListener("DOMContentLoaded", jCore.DOMready, null);
			
				setTimeout(function(){
					jCore.DOMready();
				}, 100);
				
			}else{
				//identify safari
				if (/WebKit/i.test(navigator.userAgent)) {
					var _timer = setInterval(function() {
						if (/loaded|complete/.test(document.readyState)) {
							clearInterval(_timer);
//console.log("DOMcontentloaded safari");
							jCore.DOMready();
						}//endif
					}, 10);
				}else{
					//if it is another browser we load it in the window on load
	   				window.onload = jCore.DOMready;
				}//endif
			}//endif
//		}//endif
		
	}//endfct


/**
	run method
	the axis of all javascript action happening on our application
	@param string namekey : uniquely identify the button
	@param string extra : the string identifying an element in a listing, or passing the value of a checkbox in its content
						those are all the extra parameters we want to pass into the form
	@param 	htmlEntity	an extra parameters used for multiupload OR disable of button for auto-save
	*/
	this.run = function( namekey, extra, htmlEntity, RemoteLoader ) {
//console.log("rootscript run function ");
//alert( 'in run 1' );

		var btn=this.buttons[namekey];	


		//set the formobject for this turn
		this.form=eval('document.'+btn['formName']);
//console.log(" validation button " + btn['validation']);
		//validate a form
		if ( btn['validation'] && !this.validate(btn['formName']) )  {
//			document.getElementById('validatemsg').innerHTML = '';
			return false;
		}//endif
		
		//manage pagination navigation
		if ( btn['pagi'] ) {
			this.navPagi( btn['limitstart'], extra );
		}//endif

		// gfp('wf_users_users_login');
		// Get form Elements 
		var fn=btn["formName"];
		var f=document.forms[fn];
		var l=f.elements.length;
		fn = "#" + fn;
		app.formdata = new FormData( $( fn )[0] );
		
//console.log( app.formdata );		
		
		var i=0;

//console.log("appdata " + JSON.stringify(app.formdata));	
//	var temp="trucs[x][password]";
//alert( g_postA[temp] + "password");
		if(btn['task']) {
		//	g_postA['task'] = btn['task'];
			app.formdata.append('task', btn['task']);
		}//endif
		
		if(btn['controller']) {
		//	g_postA['controller'] = btn['controller'];
			app.formdata.append('controller', btn['controller']);
		}//endif

		
//alert( 'in run 2' );
//alert( btn['lstg'] );		
		//for a listing task (type toggle) we go there for now
//		if ( btn['lstg'] ) this.processTask( btn, extra, app.formdata );
		//chris : I write the code here because I dont know how to pass an object by referecne in js
		if ( btn['lstg'] ) {
			if ( typeof extra != 'undefined' && extra['zval'] ) btn['zval'] = extra['zval'];
			var a = [ 'zact', 'zsid', 'zmap', 'zval', 'zsc', 'myId' ];
			var l = a.length;
			for (var i = 0; i < l; i++) {
				if ( btn[ a[i] ] ) {
//alert( 'in process task 4' );
//alert( a[i] + ' = ' + btn[ a[i] ] );
					app.formdata.append( a[i], btn[ a[i] ] );

//					var input = jQuery("<input>")
//		            .attr("type", "hidden")
//		            .attr("name", a[i]).val( btn[ a[i] ] );
//					jQuery('#' + btn['formName'] ).append( jQuery(input) );
				}//endif
			}//endfor
			
			//we need to pu the eid in the form as well
			if ( extra['myId'] ) app.formdata.append( 'eid', extra['myId'] );
		}//endif
				
//console.log( app.formdata );		
		
		
		
		//ionic remote loader factory injecting explicitly !imp
		var temp = angular.element($("#main_body")).scope();
		temp.goTo(null);
		
		
		
		//nothing processed after that
		return false;
		
		
		
		
		//for wizard
		//if(btn['wizard']) return this.wizard(btn);
		
		//for autocheck
		//if(btn['autocheck']) return this.autocheck(btn, extra);

		//for simple task which dont imply form submission we go there when we submit checkbox in listing
//		if(btn['nosubmit']) return this.checkbox(btn,extra);
//
//
//		//require element selected
//		if(btn['select'] && !this.checkSelection(btn,namekey)) return false;
//
//		//require confirmation to proceed
//		if ( btn['confirm'] && !this.askConfirmation(namekey) ) return false;
//
//		//load data from nicedit instance to textarea
//		//this.loadNeditData();
//
//		//load data from phpedit instance to textarea
//		//if(btn['phpedit']) this.loadPHPeditData();
//	
//		//validate a form
//		if ( btn['validation'] && !this.validate(btn['formName']) ) return false;
//
//		//proceed with multiupload
////		if(btn['mlup'] && jmupload_instance[0].fileList.length>0)	return this.processMup( namekey, htmlEntity );
//
//		//manage pagination navigation
//		if ( btn['pagi'] ) {
//			this.navPagi( btn['limitstart'], extra );
//		}//endif
//
//		//reset limitstart when changing filters
//		if(btn['cfil']) this.changeFilter(btn['limitstart']);

		//right before submitting the form we disable the button ( probably for auto-save )
//		if ( btn['disable'] && htmlEntity ) this.disable( btn, htmlEntity, 'loading' );
		/*if ( btn['disable'] && htmlEntity ) {
//console.log("currentbutton 3" + btn);
			window.WApps.helpers.changeButtons( htmlEntity );
		}
		 */

		
		//console.log("rootscript run before sendform ()" + btn);
		//call ajaxToggle function if you have ajax on your toggle
//		if( btn['ajaxToggle'] ) this.ajaxToggle( btn, namekey, extra );
//		else this.sendForm( btn );
//		this.sendForm( btn, namekey, extra );
//console.log("rootscript run after sendform ()");
		//important do not remove that return false
		//this is most needed when we dont want to be redirected to the href specified in a link
		//we specify a full link in order not to be overriden through a <base> tag
		
		return false;
		
	}//endfct

	
/** This function will process data before autosave
	*/
	this.beforeAutosave = function( namekey, extra, htmlEntity ) {

		var btn=this.buttons[namekey];

		if ( typeof btn == 'undefined' ) return true;
		
		//set the formobject for this turn
		this.form=eval('document.'+btn['formName']);

		//load data from nicedit instance to textarea
		this.loadNeditData();

		//load data from phpedit instance to textarea
//		if(btn['phpedit']) this.loadPHPeditData();

		//proceed with multiupload
//		if ( btn['mlup'] && jmupload_instance[0].fileList.length>0 ) return this.processMup( namekey, htmlEntity );

		return true;

	}//endfct



/**
	 * function to check the value of element if already exist
	**/
	this.autocheck = function( button, extra ) {
		
		extra['value'] =  $(extra['namekey']).value;
		if(extra['value']=='' || extra['value']== 0) return true;
		notexist = extra['notexist'];
		//we get the form to be posted
		var form = eval('document.'+button['formName']);
		//we set the task if a task input exist
		var task = eval(form.task);
		if(task){
			form.task.value=button['task'];
		}//endif

		//create extra parameter (convert object extra to string)
		var extraStr='';
		for(var i in extra)
		{index=i;
   		extraStr += '&'+i+'='+extra[i];
   		}
			//this is to know that we are displaying pure text in the controller(php)
		var url=button['ajxUrl'];

		jQuery.ajax({
			url : url,
			data: jQuery(form).serialize()+extraStr+'&controller=output',
			method: 'POST',
			success : function(msg){
				if(notexist == 1) {
					if(msg == 0) msg=1;
					else msg=0;
				}
				if( msg == 1 ) joobi.autocheckVar = true;	
				else joobi.autocheckVar = false;	
			 }
		});

		//we execute the http request
//		ajax.send();

	}//endfct




/**
	function to manage the main tasks used on a list toggle, order,sorting
	@param array btn : containe all the button parameters
	@param mixed extra : contain extra parameters for the button
	*/
	this.processTask = function( btn, extra ) {
//alert( 'in process task 1' );		
		if ( typeof btn == 'undefined' ) return;
//alert( btn['ajx'] );
		if ( btn['ajx'] ) {
			//we pass the model ID and map to the form so we can use them to trigger the toggle
			if ( btn['zsid'] ) extra['zsid'] = btn['zsid'];
			if ( btn['zmap'] ) extra['zmap'] = btn['zmap'];
			if ( btn['zsc'] ) extra['zsc'] = btn['zsc'];
//				if ( btn['zact'] ) extra['zact'] = btn['zact'];
		} else {
//alert( 'in process task 3' );			
			if ( typeof extra != 'undefined' && extra['zval'] ) btn['zval'] = extra['zval'];
			var a = [ 'zact', 'zsid', 'zmap', 'zval', 'zsc', 'myId' ];
			var l = a.length;
			for (var i = 0; i < l; i++) {
				if ( btn[ a[i] ] ) {
//alert( 'in process task 4' );
//alert( a[i] + ' = ' + btn[ a[i] ] );

					var input = jQuery("<input>")
		            .attr("type", "hidden")
		            .attr("name", a[i]).val( btn[ a[i] ] );
					jQuery('#' + btn['formName'] ).append( jQuery(input) );
				}//endif
			}//endfor
			
			//this is to send the information about ordering
			//we pass zact whcih define the action regarding ordeting
						
		}//endif

		switch( btn['task'] ) {
			case 'order':
				if ( btn['total'] ) {
					for ( var j = 0; j <= btn['total']; j++ ) {
						box = eval( 'this.form.em' + j );
						
						if ( box ) {
							box.checked = true;
						}//endif
					}//endfor
				}else{
					this.checkLine(extra);
				}//endif
				break;
			default:
				if ( extra['em'] ) {
//						btn['taskvar'] += extra['value'];
					this.tickBox( extra['em'] );
				}//endif
		}//endswitch

		//to sort listings by columns
		if ( btn['sorting'] ) {
			this.form.sorting.value = extra;
			task = btn['params'];
		}//endif

//alert( 'in process task 9' );		
	}//endfct


/**
	 * 
	 * @param idName
	 * @param text
	 * @returns {String}
	 */
	this.numChecked = function( idName ) {
		if ( jCore.termVal == jCore.termCtn ) return 'true';
		else{
			alert( jCore.termMsg );
			return '';
		}//endif
	}//endfct


/**
	function to tick checkbox if they exist
	@comments:needs to be replaced with the checkline function
	*/
	this.tickBox=function(id){
		box = eval( 'this.form.'+id );
	    //if the element exists
	    if (box) {
	        box.checked = true;
	        this.form.boxchecked.value = 1;
	    }else{
	   		return false;
	   	}
	}//endfct



/**
	function to route to the right simple task
	@param array button : identify the button on whch we do the check
	*/
	this.checkbox = function( button, extra ) {

		switch( button['task'] ) {
			/*
			this function check or uncheck all the boxes of a listing when the header checkbox is ticked
			and set the value of boxchecked which corresponds to the number of checkbox which are checked
			@formname: string the form on which we are working
			*/
			case 'toggleAllBox':

				//added to make the toogle checkbox children same as the parent
				box = $(button['checkid']);
				var i=button['limitstart'];
				//as long as there is an existing checkbox we just check it
				var currentElement = eval( 'this.form.em'+i);
				while (currentElement){
					em = jQuery( '#em'+i );
					em.prop( 'checked', box.prop( 'checked') );
					//this.checkLine('em'+i);
					i++;
					//go to the next check box
					currentElement = eval( 'this.form.em'+i);
				}//endwhile

				//if it is checked then we update the value number
				if (extra) this.form.boxchecked.value = i;
				else this.form.boxchecked.value = 0;
				break;
			case 'checkLine':
				this.checkLine(extra);
				break;

		}//endswitch
		return true;
	}//endfct


/**
	function to flip on or off the display of an element
	@param string htmlId : the id of the html element
	*/
	this.flip=function(htmlId,msg) {
		htmlEntity=$(htmlId);
		if(msg) msgEntity=$('msg'+htmlId);
		if(htmlEntity.style.display=='none') {
			htmlEntity.style.display='block';
			if(msg) msgEntity.style.display='none';
		}else{
			htmlEntity.style.display='none';
			if(msg) msgEntity.style.display='block';
		}//endif
	}//endfct


/*
	function to flip on or off the display of child elements of an element
	@param string htmlId : the id of the html element
	*/
	this.flipChild=function(htmlId) {
		htmlEntity=$(htmlId);
		var i=0;
		for(i=0;i<htmlEntity.childNodes.length;i++){
			if(htmlEntity.childNodes[i].style.display=='none') htmlEntity.childNodes[i].style.display='block';
			else	htmlEntity.childNodes[i].style.display='none';
		}//endfo
	}//endfct

/**
	function to select a line in a listing by just clicking on the table row
	*/
	 this.checkLine = function(boxid){
		boxRadio = eval( 'this.form.'+boxid);
		parentObj=boxRadio;

		runaway=false
		while(!runaway){
			//get the next parent dom NODE for the next round
			//we put if(parentObj) for all the listing where we dont have any checkbox or radiobutton
			if(parentObj) parentObj=parentObj.parentNode;

			//if we reach the body tag that means there is no tab there, let's return false
			if(parentObj && parentObj.nodeName=='BODY')	return false;
			if(parentObj && parentObj.nodeName=='TR')	runaway=true;
			//if parentObj is not set, we return false
			if(!parentObj) return false;
		}//endwhile

		//get the winner id and get the object so that we can play with it
		parentid=parentObj.getAttribute('id');
		box = document.getElementById(boxid);
		row = document.getElementById(parentid);

		//cases when we click on the check box straight away
		//the check box get checked before we run the function
	   if (row.className ) {
           row.className  = jQuery.trim(row.className ); 
       }//endif
		   
		if(row.className.indexOf("rowSelected") == -1){
			if (box.checked == true){
				box.checked = false;
			}
		}
		//cases when we click on the check box straight away
		//the check box get unchecked before we run the function
		if(row.className.indexOf("rowSelected") != -1){
			if(box.checked == false){
				box.checked = true;
			}
		}

		if (box.checked == true){
			box.checked = false;
		 	this.form.boxchecked.value--;
		 	row.className = row.className.substring(0, 4);
		}else{
			if(box.type == 'radio'){
				if(this.form.boxchecked.value==1)	this.form.boxchecked.value--;
				var tr = document.getElementsByTagName("tr");
				for(var i=0;i<tr.length;i++) {
					cssclass=tr[i].className;
					if(cssclass.indexOf("rowSelected") != -1){
						cssclass = cssclass.substring(0, 4);
						tr[i].className = cssclass;
					}
				}

			}

			box.checked = true;
	 		this.form.boxchecked.value++;
	 		row.className += ' rowSelected';

		}//end if

		return true;
		
	}//endfct

/**
	function to reset the pagination when we change the filter
	@tasksel: string the task on which we want to go
	@formname: string the form on which we are working
	*/
	this.changeFilter=function(limitname) {

		limitstart = eval( 'this.form.'+limitname);
		if(limitstart)	limitstart.value='';

	}//endfct


	this.navPagi=function(limitname,extra){
//console.log("pagi element " + this.form.name );
		limitstart = eval( 'this.form.'+limitname);
		limitstart.value=extra;
	}
	
/**
	function to close a popup
	*/
	this.popClose=function(){
		return window.parent.SqueezeBox.close();
	}

/**
	function to create a validation object and validate eventually the form or just a field
	@param string formName : identify the form on whch we do the check
	*/
	this.validate=function(formname) {
		//if the file is not loaded because we have nothing to validate then we return true
		if ( !(typeof validateForm == 'function') ) return true;
		var status = validateForm(formname);
		return status;
	}//endfct


/**
	function to check that an element is selected in a listing
	@param string formName : identify the form on whch we do the check
	*/
	this.checkSelection=function(btn, namekey) {
		var form = eval('document.' + btn['formName']);

		if(form.boxchecked.value==0){
			alert( jCore.msg['selec_'+namekey] );
			return false;
		}//endif

		return true;

	}//endfct

	
/**
	function to ask confirmation to the user for the current action
	*/
	this.askConfirmation=function(namekey) {
		if ( confirm(jCore.msg['conf_'+namekey]) ) return true;
		else return false;
	}//endfct


 /**
	function to pass the data of the nedit to the textarea before saving
	*/
	this.loadNeditData=function() {

		//go through all the nicedit values
		//if there is nicedit
		for (i = 0;i < jnedinst.length;i++){
			
			//this need to stay with $ NOT jQuery, I dont know why but it has to be other it will nto save
			textbox = jQuery( '#' + jareaids[i] );
			
			//update the values
			//the first line is just so taht we dont save a simple <br> becaue nice edit add it automatically
			if(jnedinst[i].innerHTML=='<br>') textbox.val('');
			else textbox.val(jnedinst[i].innerHTML);
			
		}//endfor

		return false;
		
	}//endfct


 /**
	function to pass the data of the phpedit to the textarea before saving
	*/
	this.loadPHPeditData=function() {
		//go through all the nicedit values

		//if there is nicedit
		for (i = 0;i < jphpareaids.length;i++){
			textbox = jQuery('#' + jphpareaids[i]);
			//update the values
//			textbox.value=editAreaLoader.getValue(jphpareaids[i]);
			textbox.val( editAreaLoader.getValue(jphpareaids[i]) );
		}//endfor

		return false;
	}//endfct

	
/**
	function to process a multiple uploads of files
	@param string namekey : identify the button on whch we do the check
	@param object htmlEntity : the Htmlentity to return to the run function for button disabling
	*/
//	this.processMup=function(namekey,htmlEntity) {
//
//		//check for multiple uploads to queue
//		for(var i=0;i < jmupload_instance.length ;i++) {
//			//if this is the last image we upload we set the mlup to false to flag it as finish and execute the getask as follow
//			if(i==eval(jmupload_instance.length-1)){
//			 	var uploadObject=eval(jmupload_instance[i]);
//
//			 	//we create the call back function which will be called on upload completed
//			 	uploadObject.options.onAllComplete = function(){
//				 	joobi.buttons[namekey]['mlup']=false;
//				 	return joobi.run(namekey,htmlEntity);
//			 	}//endfct
//
//			}//endif
//
//			//if there is something to upload
//			if(uploadObject.fileList.length>0){
//				uploadObject.upload();
//				return false;
//			}//endif
//		}//endfor
//		return false;
//	}//endfct

/**
	function to submit the form based on different processes
	@param string namekey : identify the button on whch we do the check
	*/
	this.sendForm = function( button, namekey, extra ) {

		//we get the form to be posted
		var form = eval( 'document.' + button['formName'] );

		//we set the task if a task input exist
		var task = eval(form.task);

		if(task){
			form.task.value=button['task'];
		}//endif
		
		//to set the controller and do a redirect straight away
		if(button['controller']){
			//we set the controller if a controller input exist
			var contro = eval(form.controller);
			
			if(contro){
				contro.value=button['controller'];
			}//endif
			
		}//endif
		
		//if we do an ajax query we just send it to the write place
		if ( button['ajx']==1 ) {

			//the URL specified in the call of the function
			//it is only the controller and infomration after 
			jCore.ajxprms['url'] = button['ajxUrl'];

			//this is to know that we are displaying pure text in the controller(php)
			var url = jCore.ajxprms['url'];
			//we dont need the entire joomla page only minimum			
			
			jCore.ajxprms['on']=button['ajx'];
			jCore.ajxprms['extfct']=button['ajxComplete'];
			
			var extraData='';	//extra data into the query string used for the tooggle
			var evals=0;	//define if we need to eval the result or not
			
			if( button['ajaxToggle'] ) {
				jCore.ajxprms['div']=extra['divId'];
				//create extra parameter (convert object extra to string)
				var extraStr='';
				for( var i in extra ) {
					index = i;
					extraStr += '&'+i+'='+extra[i];
				}//endfor
			
				//we add parameters to the URL and ajax is specific to the toggle
				extraData = '&ajax=1&namekey='+namekey+extraStr;
				evals=1;
			} else {
				jCore.ajxprms['div']='div'+button['formName'];
			}//endif
			
			
			//we make sure that there is an external function which exists
			//if the external function exist then we execute it onComplete of the posted data
			var func = eval('window.'+jCore.ajxprms['extfct']);

//TODO here we need to save the information from the form to the localStorage
/*
 *   <script>
		function onSubmit()  {
			name = $("#name").val();
			//alert(name);
			window.localStorage.setItem("name", name);
			window.location.href  = "second.html";
		}		
  </script>
 */
			
			if ( func ) {
			
				jQuery.ajax({
						url : url,
						data: jQuery(form).serialize(),
						method: 'POST',
						async : false,
						success : function(msg){ func(msg,url,form); }
				});

			} else {

				jQuery.ajax({
						url : url,
						data: jQuery(form).serialize() + extraData,
						async : false,
						method: 'POST',
						success : function( msg ) { jwriteResponse( msg, '', '', 0, evals ); }
				});
			}//endif

			//we execute the http request
//			ajax.send();
		
			//this.wait(400);
			
		} else {	//else we just post the form and refresh the current page
			//we try to post the form
			try {
//				$(form).onsubmit();
				jQuery(form).submit();
			} catch(e) {
				//if we have errors what do we do with them?
			}//endif

			//we submit the form now
			status = form.submit();
		}//endif
		
		if (button['refresh']) {
//			opener.location.reload();
//			setTimeout( parent.location.reload(), 15000 );
			parent.location.reload(); 
			
		} else {
			if(button['popclose']){				
				this.popClose();
			}//endif
		}//endif
				
		return true;
		
	}//endfct
	
	
	

/**
 * Function to wait after submitting
 */	
	this.wait = function(msecs) {
		
		var start = new Date().getTime();
		var cur = start
		while(cur - start < msecs) {
			cur = new Date().getTime();
		}//endwhile
		
	}//endfct
	
	

/**
	 * function to load and remove wizard
	**/
	this.wizard = function(button){
	}//endfct
	

/**
	 * function to perform credit card validations
	 * @param string namekey
	 * @param string cardnameid
	 * @param string cardnumid
	 * @param string expdateid
	**/
	this.creditcard = function ( namekey, cardnameid, cardnumid, expdateid ){
		var btn = this.buttons[namekey];
		var formName = btn['formName'];

		if( !this.validate(formName) ) return false;

		if(!checkCreditCard(cardnameid, cardnumid)) return false;
//			if(!checkCreditDate(expdateid) ) return false;

		this.sendForm(btn);

		return false;
		
	}//endfct
	
	
}//endclass


//the object that we are gonna use to manage all kind of javascript
var joobi = new jAppW();


/**
the jCore object
it contains important variables that are used in other methods
*/
var jCore = {

//	themecolor : 'red',
//	site : '',
	confirm : [],
	nedit : false,
	ajxprms : [],
//	mlup : false,
	DOMfctset : false,//fct to tell that we already set the dom function
	DOMcodeToFire : [],//array of function containing js code to fire on DOM loaded
	msg : [],//array of translated messages
	req : [],//required field per form
	txtA : [],
	termCtn : '',
	termMsg : '',
	termVal : 0,
	
	//fire all the code which should be run on DOMready
	DOMready : function() {   
//console.log("domready " + jCore.DOMcodeToFire.length);
		//execute all the functions added onDOMready
		for ( i = 0; i < jCore.DOMcodeToFire.length; i++ ) {
//console.log("domready loop " + jCore.DOMcodeToFire[i] );
			jCore.DOMcodeToFire[i]();
		}
	}//endfct

};//endobject


/**
function which write a message into a div or any HTML container
@msg:can be anything including html
@div:the id of the div or container in which you want to write
@classes:if the class of the container needs to be specific
@append: append (true) or replace (false, default value)
@return: void
*/
function jwriteResponse( msg, div, classes, append, evals ) {
	
	//if the div,class parameter is not specified then we take the one from the ajax param
	if ( !div ) div=jCore.ajxprms['div'];
	if ( !classes ) classes=jCore.ajxprms['extfct'];

	var evaluateJS = evals;
	//we reach the div element
	mydiv = jQuery(div);
	//alert( mydiv );
    //alert( msg );

	//if the div exist then we try to write text in it
	if ( mydiv ) {
	//if the css classname is not specified then we update it
	//if(!mydiv.className)	mydiv.className = msg;

	//we append the message if required
	if ( append ) {
//	$(div).innerHTML += msg;
		jQuery(div).append(msg);
	} else {
	// amod code begins
	//eval was a bad choice
	//Its purpose is to evaluate a string as a Javascript expression.
	//It has been used a lot before, because a lot of people didn't know how to write the proper code for what they wanted to do.
	//http://stackoverflow.com/questions/10474306/whats-the-main-benefit-of-using-eval-in-javascript

	// but since we donot want to change the complete ajax workflow right now
	// what we do is decide whether we want to do an eval
	// that is based on whether the ajax message has a div with id as 'noeval'
	// depending we override the eval value
		
	// we do this check only if evaluateJS is set to yes
	// and if msg is not empty	

	if((evaluateJS) && (msg) && (msg.indexOf('noeval') === -1)) evaluateJS = 1;
	else evaluateJS = 0;
	// amod code ends
	
    if ( evaluateJS ) eval( msg );
//	else $(div).innerHTML = msg;
    else jQuery(div).html(msg);

	 }//endif append
	}//endif mydiv
	
}//endfct


/**
Function to delete an item from a cross table on the fly.
*/
//function deletecross( url, form, eid, sid, id, map ) {
//
//	jQuery.ajax({
//			url : url,
//			processData: false,
//			data: JSON.stringify('sid='+sid+'&eid='+eid+'&'+map+'='+id+'&map='+map)
////			postBody:'sid='+sid+'&eid='+eid+'&'+map+'='+id+'&map='+map
//		});
////	ajax.send();
//
//	div = 'jmpic_'+sid+'_'+eid+'_'+id;
//	mydiv=jQuery(div);
//	var myFx = new Fx.Style(div, 'opacity').addEvent('onComplete', function(){ mydiv.style.display='none'}); //display a transition from transparent to opaque.
//	myFx.start(1,0);
//
//}//endfct
