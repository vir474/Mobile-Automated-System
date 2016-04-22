//angular.module('rootscript', ['ionic', 'starter.services', 'State.Services' ]);

var jnedfd=new Array();
var jnedinst=new Array();
var jareaids=new Array();
var jphpareaids=new Array();

/**
the jApplication class which is the center of our library
it contains important variables that are used in other methods
and the method to load on domready
*/
function jApplication(){
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
		jCore.flagIE=false;
		//if we didn't flagIE that means we need for the winning browser
		if(!jCore.flagIE){
//console.log("browserDOMready flagIE");
			//to know when the DOM is loaded on mozilla and opera 9
			if (document.addEventListener) {
//console.log("DOMcontentload");
			//	window.onload = jCore.DOMready;
			//	document.getElementById("main_body").setAttribute("onload", "jCore.DOMready;");
			//	document.addEventListener("DOMContentLoaded", jCore.DOMready, null);
			
			setTimeout(function(){
				jCore.DOMready();
			}, 500);
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
		}//endif
		
	}//endfct


/**
	run method
	the axis of all javascript action happening on our application
	@param string namekey : uniquely identify the button
	@param string extra : the string identifying an element in a listing, or passing the value of a checkbox in its content
						those are all the extra parameters we want to pass into the form
	@param 	htmlEntity	an extra parameters used for multiupload OR disable of button for auto-save
	*/
	this.run= function( namekey, extra, htmlEntity, RemoteLoader ) {
//console.log("rootscript run function ");

		var curButton=this.buttons[namekey];	

//console.log("jcore " + jCore.msg );
//alert("username " + $("#x_username_0_928").val() );

		//set the formobject for this turn
		this.form=eval('document.'+curButton['formName']);
//console.log(" validation button " + curButton['validation']);
		//validate a form
		if ( curButton['validation'] && !this.validate(curButton['formName']) )  {
//			document.getElementById('validatemsg').innerHTML = '';
			return false;
		}
		
		//manage pagination navigation
		if ( curButton['pagi'] ) {
			this.navPagi( curButton['limitstart'], extra );
		}//endif

//	gfp('wf_users_users_login');
		// Get form Elements 
		var fn=curButton["formName"];
		var f=document.forms[fn];
		var l=f.elements.length;
		fn = "#" + fn;
		app.formdata = new FormData( $( fn )[0] );
		var i=0;

//console.log("appdata " + JSON.stringify(app.formdata));	
//	var temp="trucs[x][password]";
//alert( g_postA[temp] + "password");
		if(curButton['task']) {
		//	g_postA['task'] = curButton['task'];
			app.formdata.append('task', curButton['task']);
		}
		if(curButton['controller']) {
		//	g_postA['controller'] = curButton['controller'];
			app.formdata.append('controller', curButton['controller']);
		}
		
		//ionic remote loader factory injecting explicitly !imp
		var temp = angular.element($("#main_body")).scope();
		temp.goTo(null);
		
		return false;
		//for wizard
		//if(curButton['wizard']) return this.wizard(curButton);
		
		//for autocheck
		//if(curButton['autocheck']) return this.autocheck(curButton, extra);

		//for simple task which dont imply form submission we go there when we submit checkbox in listing
		if(curButton['nosubmit']) return this.checkbox(curButton,extra);

		//for a listing task (type toggle) we go there for now
		if(curButton['listing']) this.joobiTask(curButton,extra);

		//require element selected
		if(curButton['select'] && !this.checkSelection(curButton,namekey)) return false;

		//require confirmation to proceed
		if(curButton['confirm'] && !this.askConfirmation(namekey)) return false;

		//load data from nicedit instance to textarea
		//this.loadNeditData();

		//load data from phpedit instance to textarea
		//if(curButton['phpedit']) this.loadPHPeditData();
	
		//validate a form
		if ( curButton['validation'] && !this.validate(curButton['formName']) ) return false;

		//proceed with multiupload
//		if(curButton['mlup'] && jmupload_instance[0].fileList.length>0)	return this.processMup( namekey, htmlEntity );

		//manage pagination navigation
		if ( curButton['pagi'] ) {
			this.navPagi( curButton['limitstart'], extra );
		}//endif

		//reset limitstart when changing filters
		if(curButton['cfil']) this.changeFilter(curButton['limitstart']);

		//right before submitting the form we disable the button ( probably for auto-save )
//		if ( curButton['disable'] && htmlEntity ) this.disable( curButton, htmlEntity, 'loading' );
		/*if ( curButton['disable'] && htmlEntity ) {
//console.log("currentbutton 3" + curButton);
			window.WApps.helpers.changeButtons( curButton, htmlEntity, 'loading' );

		}
		 */
		//right before submitting the form we disable all the menus around
		if(curButton['disableAll']) this.disableAll();
//console.log("rootscript run before sendform ()" + curButton);
		//call ajaxToggle function if you have ajax on your toggle
//		if( curButton['ajaxToggle'] ) this.ajaxToggle( curButton, namekey, extra );
//		else this.sendForm( curButton );
//		this.sendForm( curButton, namekey, extra );
//console.log("rootscript run after sendform ()");
		//important do not remove that return false
		//this is most needed when we dont want to be redirected to the href specified in a link
		//we specify a full link in order not to be overriden through a <base> tag
		
		return false;
		
	}//endfct

	
/** This function will process data before autosave
	*/
	this.beforeAutosave = function( namekey, extra, htmlEntity ) {

		var curButton=this.buttons[namekey];

		//set the formobject for this turn
		this.form=eval('document.'+curButton['formName']);

		//load data from nicedit instance to textarea
		this.loadNeditData();

		//load data from phpedit instance to textarea
		if(curButton['phpedit']) this.loadPHPeditData();

		//proceed with multiupload
//		if ( curButton['mlup'] && jmupload_instance[0].fileList.length>0 ) return this.processMup( namekey, htmlEntity );

		return true;

	}//endfct

	
/**
	 * function to load and remove wizard
	**/
	this.wizard = function(button){

		myElement=jQuery('#viewWizard');
		var display = myElement.css('display');

		if(display=='none') {
			myElement.show();
		}
		else{
			myElement.hide();
		}
		
//		we get the form to be posted
		var form = eval('document.'+button['formName']);
//		we set the task if a task input exist
		var task = eval(form.task);
		if(task){
			form.task.value = button['task'];
		}//endif
		
		
		//this is to know that we are displaying pure text in the controller(php)
		var url=jCore.ajxprms['url'];
		jQuery.ajax({
			url : url,
			data: jQuery(form).serialize()+'&controller=output',
			method: 'POST',
			success : function(msg){ 
			}	,
			error: function () {		
			}
		})

	}//endfct
	
	

/**
	 * function to load and remove wizard
	**/
//	this.wizard = function(button){
//
//		myElement=$('viewWizard');
//		var display = myElement.getStyle('display');
//		
//		if(display=='none')myElement.setStyle('display', 'block');
//		else myElement.setStyle('display', 'none');
//
//		//we get the form to be posted
//		var form = eval('document.'+button['formName']);
//		//we set the task if a task input exist
//		var task = eval(form.task);
//		if(task){
//			form.task.value = button['task'];
//		}//endif
//		
//		jCore.ajxprms['url'] = button['ajxUrl'];
//		
//		//this is to know that we are displaying pure text in the controller(php)
//		var url=jCore.ajxprms['url'];
//
//		var ajax = new Request({
//						url : url,
//						data: $(form).toQueryString()+'&controller=output',
//						method: 'POST',
//						onComplete : function(msg){ }
//			});
//
//			//we execute the http request
//			ajax.send();
//
//	}//endfct

	
/**
	 * function to load jQuery
	 * @param path path of include
	**/
	this.loadjQuery = function(path){
		var jquerys = $("jquery");
		if(jquerys == null){			
			this.loadjs(path+"jquery-1.5.1.min.js", "jquery");
		}//endif
	}//endfct

/**
	 * function to load any Javascript
	 * @param path path of  js
	 * @param id id of js
	**/
	this.loadjs = function(path, id){
		if(path != ""){
			var script = document.createElement('script');
			script.setAttribute("type","text/javascript");
			script.setAttribute("src", path);
			if(id != "")script.setAttribute("id", id);
			document.getElementsByTagName("head")[0].appendChild(script);
		}//endif
	}//endfct

	
/**
	 * function to remove jQuery
	**/
	this.removejQuery = function(){		
		this.removejs("jquery");
	}//endfct


/**
	 * function to load any Javascript
	 * @param id id of js to be removed
	**/
	this.removejs = function(id){
		if(id != ""){
			script = $(id);
			script.parentNode.removeChild(script);
		}//endif
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

		var ajax = new Request({
			url : url,
			data: $(form).toQueryString()+extraStr+'&controller=output',
			method: 'POST',
			onComplete : function(msg){
				if(notexist == 1) {
					if(msg == 0) msg=1;
					else msg=0;
				}
				if( msg == 1 ) joobi.autocheckVar = true;	
				else joobi.autocheckVar = false;	
			 }
		});

		//we execute the http request
		ajax.send();

	}//endfct



/**
	 * function to perform credit card validations
	 * @param string namekey
	 * @param string cardnameid
	 * @param string cardnumid
	 * @param string expdateid
	**/
	this.creditcard = function ( namekey, cardnameid, cardnumid, expdateid ){
		var curButton = this.buttons[namekey];
		var formName = curButton['formName'];

		if( !this.validate(formName) ) return false;

		if(!checkCreditCard(cardnameid, cardnumid)) return false;
//		if(!checkCreditDate(expdateid) ) return false;

		this.sendForm(curButton);

		return false;
		
	}//endfct




/**
	function to manage the main tasks used on a list toggle, order,sorting
	@param array curButton : containe all the button parameters
	@param mixed extra : contain extra parameters for the button
	*/
	this.joobiTask = function( curButton, extra ) {
		
		switch(curButton['task']){
			case 'order':
				if(curButton['total']){
					for ( var j = 0; j <= curButton['total']; j++ ) {
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
					curButton['taskvar'] += extra['value'];
					this.tickBox(extra['em']);
				}//endif
		}//endswitch

		//to sort listings by columns
		if(curButton['sorting']){
			this.form.sorting.value = extra;
			task=curButton['params'];
		}//endif

		//check that the taskvar hidden input exist and set its value based on what we get from the argument taskvar
		var testvar = eval(this.form.taskvar);

		if(testvar){
			this.form.taskvar.value = curButton['taskvar'];
		}//endif

		if ( curButton['securedyid'] ) {
			this.form.joobieids.value = eval('this.form.joobieids'+curButton['securedyid']).value;
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




	/*
	function to disable all the clickable element in case we don't want to get out of that page until the process is finish
	
	*/
	this.disableAll=function(){
		//disable link menu horizontal
		menuHori=$("joobiMenu");
		if(menuHori){
			$("joobiMenu").parentNode.parentNode.setStyle('display', 'none');//.style.display='none';
		}//endif
		//disable toolbar button around that one
		//this.disableSib(button,htmlEntity,classChange);

		//disable cms menu
		switch(jCore.cms){
//			case 'joomla15' :
//			case 'joomla16' :
			default:
				cmsToolbar=$("header-box");
				break;
		}//endswitch
		
		if ( cmsToolbar ) {
			cmsToolbar.setStyle( 'display', 'none' ); //style.display='none';
		}//endif
	}//endfct

	
/**
	function to disable a button in the toolbar
	*/
//	this.disable = function( button, htmlEntity, classChange ) {
//
//		
//		//the action of the link is different so that it goes back to the right place
//		htmlEntity.onclick = function() {return false;}
//		htmlEntity.className='disabledB';
//		fChild=htmlEntity.firstChild;
//
//		changeMyClass=null;
//
//		//we look for the class to change depending on wether the button is centered or not
//		if(fChild){
//			switch(fChild.nodeName){
//				case 'SPAN':
//					xChild=fChild.firstChild;
//					x=xChild.firstChild;
//					while(!(x.className.indexOf("jpng-") != -1)){
//				       x=x.nextSibling;
//				    }
//					changeMyClass=x;
//					break;
//				case 'DIV':
//					changeMyClass=htmlEntity.firstChild;
//					break;
//				default:
//					return true;//skip the class change if we do not have a class name to set
//			}//endswitch
//
//			//skip the class name change if changeMyClass could not be found
//			if(changeMyClass){
//				changeMyClass.className=classChange;
//			}//endif
//		}//endif
//
//		return true;
//		
//	}//endfct



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
					em = $('em'+i);
					em.checked = box.checked;
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
	this.checkSelection=function(curButton, namekey) {
		var form = eval('document.' + curButton['formName']);

		if(form.boxchecked.value==0){
//alert(jCore.msg['selec_'+namekey]);
			return false;
		}//endif

		return true;

	}//endfct

/**
	function to ask confirmation to the user for the current action
	*/
	this.askConfirmation=function(namekey) {
		if(confirm(jCore.msg['conf_'+namekey]))	return true;
		else return false;
	}//endfct


 /**
	function to pass the data of the nedit to the textarea before saving
	*/
	this.loadNeditData=function() {
		//go through all the nicedit values

		//if there is nicedit
		for (i = 0;i < jnedinst.length;i++){
			textbox = $(jareaids[i]);
			//update the values
			if(jnedinst[i].innerHTML=='<br>') textbox.value='';
			else textbox.value=jnedinst[i].innerHTML;
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
			textbox=$(jphpareaids[i]);
			//update the values
			textbox.value=editAreaLoader.getValue(jphpareaids[i]);
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
//console.log("rootscript sendform() " + button['formName']);
		//we set the task if a task input exist
		var task = eval(form.task);
//console.log("task at send form " + button['task']);
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
		
//console.log("rootscript ajax check");

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
			
				var ajax = new Request({
						url : url,
						data: $(form).toQueryString(),
						method: 'POST',
						async : false,
						onComplete : function(msg){ func(msg,url,form); }
				});

			} else {

				var ajax = new Request({
						url : url,
						data: $(form).toQueryString() + extraData,
						async : false,
						method: 'POST',
						onComplete : function( msg ) { jwriteResponse( msg, '', '', 0, evals ); }
				});
			}//endif

			//we execute the http request
			ajax.send();
		
			//this.wait(400);
			
		} else {	//else we just post the form and refresh the current page
			//we try to post the form
			try {
//				$(form).onsubmit();
				$(form).submit();
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
	this.wait = function wait(msecs) {
		
		var start = new Date().getTime();
		var cur = start
		while(cur - start < msecs) {
			cur = new Date().getTime();
		}//endwhile
		
	}//endfct
	
}//endclass


//the object that we are gonna use to manage all kind of javascript
var joobi = new jApplication();


/**
the jCore object
it contains important variables that are used in other methods
*/
var jCore = {

	themecolor : 'red',
	site : '',
	confirm : [],
	nedit : false,
	ajxprms : [],
//	mlup : false,
	DOMfctset : false,//fct to tell that we already set the dom function
	DOMcodeToFire : [],//array of function containing js code to fire on DOM loaded
	msg : [],//array of translated messages
	req : [],//required field per form
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
	mydiv = $(div);
	//alert( mydiv );
    //alert( msg );

	//if the div exist then we try to write text in it
	if ( mydiv ) {
	//if the css classname is not specified then we update it
	//if(!mydiv.className)	mydiv.className = msg;

	//we append the message if required
	if ( append ) {
	$(div).innerHTML += msg;
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
	else $(div).innerHTML = msg;

	 }//endif append
	}//endif mydiv
	
}//endfct


/**
Function to delete an item from a cross table on the fly.
*/
function deletecross( url, form, eid, sid, id, map ) {

	var ajax = new Request({
			url : url,
			postBody:'sid='+sid+'&eid='+eid+'&'+map+'='+id+'&map='+map
		});
	ajax.send();

	div = 'jmpic_'+sid+'_'+eid+'_'+id;
	mydiv=$(div);
	var myFx = new Fx.Style(div, 'opacity').addEvent('onComplete', function(){ mydiv.style.display='none'}); //display a transition from transparent to opaque.
	myFx.start(1,0);

}//endfct
