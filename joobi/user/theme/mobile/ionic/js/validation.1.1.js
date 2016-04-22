/*
Javascript validation based on quirksmode.com
example: http://www.quirksmode.org/dom/error.html
*/

var W3CDOM = (document.getElementsByTagName && document.createElement);//to know if the browser is W3CDOM compatible

var jradios = new Array();//store all the radio buttons we may have since their validation is different than the other types

//for tabs validations
var joobiErrorTabs=new Array();//store all the tabs that have been declared as containing errors
var joobiErrorFields=new Array();//store all the required fields within tabs for each tabs
var joobiTabs=false;//tells us if we have tabs on that page



/**
function to manage the validation of an html form
@formName:string the form on which the validation is proceeded
*/
function validateForm(formName) {
    //here i need to find all tabs 

//console.log( jCore );
	//elements contained in the form we are validating
	var formElements = document.forms[formName].elements;
	
	 $('input').blur();
	 $('textarea').blur();

	//Start public var(window) defined here
		formHasError = false;
		fullErrorString = '';//used if the browser is not W3CDOM compatible
		firstError = null;	//variable which store the first html object on which there is a validation error
		//some flag variables to manage the radio buttons validation
		currEmtype = null;
		prevEm = false;
		radios = new Array();
	//End public var(window)

	//for each elements of that form we validate
	for (var i=0;i<formElements.length;i++) {
		//in html if a form element is disabled then a hidden element with the same name will be generated .
		//in order to avoid conflict we just don't validate the hidden type
		if(formElements[i].type!='hidden')	validateField(formElements[i],formName);

	}//endfor
	if(prevEm && prevEm.type == 'radio' && jradios[formName][prevEm.name]===false){
		//we spot the field as required on the user side
		writeError(prevEm, jCore.msg['req'],radios[prevEm.name]);
		//we reset this flags now
		prevEm=null;
	}//endif
	

	//the browser is not W3C DOM compatible so we return the error as an alert
	if (!W3CDOM)	alert(fullErrorString);
	//we have an error so we focus the mouse on the first field showing it
//	if (firstError)	firstError.focus();
	//we just return false if we have a form error
//here i need to make red tab if i have an error in validation
        var tabs = jQuery('form[name="'+formName+'"] .tab-pane');
        var lisForTab = jQuery('form[name="'+formName+'"] .nav-tabs li');
        if ( tabs.length && lisForTab.length ) {
            //throught to each li navigate link and set usual font
            jQuery.each(tabs, function (index, tab) {
                //this is tab
                ifHasError = jQuery(tab).find('.jberror');
                if (ifHasError.length) {  // i have error  => red

                    jQuery(lisForTab[index]).find('h3').css('color','red');
                } else {   // donot have error -> usual color
                    jQuery(lisForTab[index]).find('h3').css('color','');
                }
            });
        }

        
        
	if(formHasError) {
            return false;
        }	
	return true;
}//endfct


/**
function to switch the different validation cases, it will require a complete makeover
@formElement:object the current formElement being validated
@formName:string the form name to which this field belongs to
*/
function validateField( formElement, formName ) {
	
	//set the type of the current element
	currEmtype=formElement.type;
	//if the previous type was radio and now we changed type that means we reached the end of the radio buttons list
	//so now we check that the result is good or false for this group of radio
	if(prevEm && prevEm.type == 'radio' && currEmtype!=prevEm.type && jradios[formName][prevEm.name]===false){

		//we spot the field as required on the user side
		writeError(prevEm, jCore.msg['req'],radios[prevEm.name]);

		//we reset this flags now
		prevEm=null;
	}//endif

	//if current type undefined just skip
	if(currEmtype==undefined) return false;
	//if this form is not set in the array then we skip(that should not happen though)
	if(!jCore.req[formName]) return false;

	//we get the validation conditions of te current element we passed through the array jCore.req based on the name of the element
	var str = new String(jCore.req[formName][formElement.name]);
	var requiredTypes = str.match(/[a-zA-Z]+(?=(,|\())/g);//get the param type eg: 'type(argument1)'
	var requiredArgs = str.match(/\([a-zA-Z0-9_\)\(\\\<\>\"\'\;\&\+\-\$\^\*\%]*(?=(,|\s;\s))/g);//get the param type's arguments eg: 'type(argument1)(argument2)'
	
	
	//checking element value
	if (formElement.value){
		newValue = formElement.value.split(' ').join('');  // this is to check that the value is not all blank spaces
		if(!newValue) formElement.value = ''; // if the value is  blank space, we will set the form Element value as empty
	}//endif
	
	//if we are in for simple requirements of selecting or entering something we go there
	if (!formElement.value || (currEmtype=='checkbox' && !formElement.checked) || (currEmtype=='select-one' && formElement.value==0) || (currEmtype=='radio')){
		
		
		//if the field is in the list of the required ones then we display a message or not depending on the type
		if(jCore.req[formName][formElement.name])	{

			//if we validate radio buttons we need to skip until the last element sharing the same name
			if(currEmtype=='radio'){


				//make sure this array of objects of radio buttons exists
				if(!eval(radios[formElement.name]))	radios[formElement.name]= new Array();

				//we record each html object for each radio of a button list
				radios[formElement.name][formElement.value]=formElement;

				//make sure we have an array of radiobutton foreach form
				if(!eval(jradios[formName])) jradios[formName]=new Array();

				//check the value if it is true that means it is selected so we can go away from there
				if(eval(jradios[formName][formElement.name]) && jradios[formName][formElement.name] === true) return false;

				//this is the current value of the radio
				jradios[formName][formElement.name]=formElement.checked;

				//this are values we save for when we are finished with this list of radio buttons
				prevEm=formElement;

				return false;
			}//endif

			//we spot the field as required on the user side
			writeError(formElement, jCore.msg['req']);
		}//endif

	//if the requirement specified is about data type or something else, we check it here
	}else{
		//if the requirement on a field is equal to 0 that means it is not required so we pass else we validate
		if(jCore.req[formName][formElement.name] && jCore.req[formName][formElement.name]!=0) {
			//one field may have many required types so we go through each
			//one of them we will use k for requiredArgs as well since their synchronized

			for(var k=0;k<requiredTypes.length;k++){						
				strArgs = new String(requiredArgs[k]);
					
				jFlagError=false;

				//we validate the field based on a specified type
				validateType(formElement,requiredTypes[k]);

				//if we flagged an error we write the error message
				if(jFlagError)	writeError(formElement,jCore.msg[requiredTypes[k]]);
			}//end for k
		}//end if required
	}//endelse
}//endfct


/**
function to switch the different validation types cases
@formElement:object the current formElement being validated
@type:string the type of validation we want to make there
*/
function validateType(formElement, type){
	
	//some predefined types to validate
	var numericSep = "0123456789.,-+";
	var numeric = /[0-9]+/g;
	var alphabetic = /[a-z]+/gi;
	var alphanumeric = /[a-z0-9]+/gi;
	switch (type){
		case "num":
			//we test the value to be numeric including the separators sucha as ".,-+"
			if(!isLike(formElement.value, numericSep))	jFlagError = true;
			break;
		case "numeric":
			//we test the value to be trully numeric
			if(!isLike(formElement.value, numeric))	jFlagError = true;
			break;
		case "alpha":
			//we test the value to be alphabetic
			var jsmatches=formElement.value.match(alphabetic);
			if(!jsmatches)	jFlagError = true;
			break;
		case "alphanum":
			//we test the value to be alphanumeric
			var jsmatches=formElement.value.match(alphanumeric);
			if(!jsmatches)	jFlagError = true;
			break;
		case "ws":
			var jsmatches=formElement.value.match(/(\s)/);
			if(jsmatches)	jFlagError = true;
			break;
		case "email":
			//var pattern = /^[a-zA-Z]([.]?([a-zA-Z0-9_-]+)*)?@([a-zA-Z0-9\-_]+\.)+[a-zA-Z]{2,4}$/;
			//Correction because some good e-mail are not accepted
			//var pattern = /^[a-zA-Z](([.]?[a-zA-Z0-9_-]+)*)?@([a-zA-Z0-9\-_]+\.)+[a-zA-Z]{2,4}$/;
			//Correction beccause some good e-mail are not accepted
			//var pattern = /^[a-zA-Z0-9](([.]?[a-zA-Z0-9_-]+)*)?@([a-zA-Z0-9\-_]+\.)+[a-zA-Z]{2,4}$/;
			//Correction because some good e-mail are not accepted
			//Fixed again, I removed the underscore for the domain name, which is not possible.
			//var pattern = /^[a-zA-Z0-9](([.]?[a-zA-Z0-9_-]+)*)?@([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,7}$/;
			var pattern = /^[^@]*@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,7}$/;
			if(!verifyPattern(pattern,formElement.value))	jFlagError = true;
			break;
		case "minlgt":
			var Args = strArgs.match(/[a-zA-Z0-9]+/g);
			var minlgt= Args[0];
			if(formElement.value.length < minlgt)	jFlagError = true;
			break;
		case "inf":
			var Args = strArgs.match(/[a-zA-Z0-9]+/g);
			var minlgt= Args[0];
			if(!(formElement.value < minlgt))	jFlagError = true;
			break;
		case "sup":
			var Args = strArgs.match(/[a-zA-Z0-9]+/g);
			var minlgt= Args[0];			
			if(!(formElement.value > minlgt))	jFlagError = true;
			break;
		case "nozero":				
			if(formElement.value == 0)	jFlagError = true;
			break;				
		case "autocheck":	
			if(joobi.autocheckVar)	jFlagError = true;
			break;		
		case "maxlgt":
			var Args = strArgs.match(/[a-zA-Z0-9]+/g);
			var minlgt= Args[0];
			if(formElement.value.length > minlgt)	jFlagError = true;
			break;
		case "sameas":
			var Args = strArgs.match(/[a-zA-Z0-9_]+/g);
			var comparedElm=$(Args[0]);
			if(comparedElm.value!=formElement.value)	{
				jFlagError = true;
				writeError(comparedElm,jCore.msg[type]);
			}
			break;
		case "date":
			break;
		case "ccontain":
			var Args = strArgs.match(/[\W]*(?=(\)))/g);
			var ArgsFinal = new String(Args);
			ArgsFinal=ArgsFinal.substring(1,ArgsFinal.length);
			if(notContains(formElement.value, ArgsFinal))	jFlagError = true;
			break;
		case "cncontain":
			var Args = strArgs.match(/[\W]*(?=(\)))/g);
			var ArgsFinal = new String(Args);
			ArgsFinal=ArgsFinal.substring(1,ArgsFinal.length);

			var message = new String(jCore.msg[type]);
			var msg=message.replace(/\[ILLEGAL_CHAR\]/, ArgsFinal);

			if(!notContains(formElement.value, ArgsFinal))	writeError(formElement,msg);
			break;
		default : break;
	}//endswitch
}//endfct


/**
 * Verifies if the string obey the rules of the patern
@params:pattern a regex pattern eg:/[0-9]/gi
@params:text the text which is being tested
*/
function verifyPattern( pattern , text ) {
	var regex = new RegExp( pattern );
	return regex.test( text );
}//endfct



/** test if a field doesn't contains invalidChars.
@params:field the field which is being studied
@params:invalidChars a chain of characters to validate
*/
function notContains(field, invalidChars){
   var isMatching=true;
   var char2;
   for (i = 0; i < field.length && isMatching == true; i++) {
      char2 = field.charAt(i);
      if (invalidChars.indexOf(char2) != -1) isMatching = false;
      }
   return isMatching;
}


/** test if a field is of a certain type.
The type depends on validChars string sent.
@params:field the field which is being studied
*/
function isLike(field, validChars){
   var isMatching=true;
   var char2;
   for (i = 0; i < field.length && isMatching == true; i++) {
      char2 = field.charAt(i);
      if (validChars.indexOf(char2) == -1) isMatching = false;
      }
   return isMatching;
}


/** test if a field is NOT of a certain type.
The type depends on validChars string sent.
@params:field the field which is being studied
@params:validChars a chain of characters to validate
*/
function isNotLike(field, validChars){
   var isNotMatching=false;
   var char2;
   for (i = 0; i < field.length && isNotMatching == false; i++) {
      char2 = field.charAt(i);
      if (validChars.indexOf(char2) == -1) isNotMatching = true;
      }
   return isNotMatching;
}//endfct


/**
To write a message next to a conflictive field
@params:obj the html object which triggered the validation error(e.g.:inputbox, select)
@params:message the html object which triggered the validation error(e.g.:message)
@params:objects optional store all the html objects which may remove the message onchange(e.g.:radio)
*/
function writeError(obj,message,objects) {

	//if function WebFXTabPane exists then write into tab
//	if(joobiTabs){
//		writeErrorTab(obj);
//	}

	//we set this object as the first error so that we can focus on it afterwards
	if (!firstError){
		//we come here only once and that means we have a form error for the following
		formHasError=true;
		firstError = obj;
	}

	//if we already have an error on the object we dont addup some more messages
	if (obj.hasError) return;

	if (W3CDOM) {
		obj.className += ' jberror';
		obj.onchange = function(){
			removeError(this,joobiTabs);
		};

		//foreach concerned object we trigger the onchange function so that the error message will be removed onchange of the state
		if(objects){
			for(objectheu in objects){
				objects[objectheu].onchange = function(){
					removeError(obj,joobiTabs);
				};
			}//endfor
		}//endif

		//we write the error message now
		writeMess(obj,message);

	}else {
		fullErrorString += obj.name + ': ' + message + '\n';
		obj.hasError = true;
	}//endif


}//endfct


/**
When a field which is required is nested in a tab we highlight the title of the tab
@params:obj the html object which triggered the validation error(e.g.:inputbox, select)
*/
function writeErrorTab(obj){
	//get the first dom NODE parent of obj
	var parentObj=obj.parentNode;

	//as long as we do not go into a recognised parent tab we continue
	var runaway=false;
	while(!runaway){
		//get the next parent dom NODE for the next round
		parentObj=parentObj.parentNode;

		//if we reach the body tag that means there is no tab there, let's return false
		if(parentObj.nodeName=='BODY')	return false;

		//as long as the tag is not a div or the className of that div is not tab-page we just skip
		//TODO maybe we can remove this hardcoded thing at some point (tab-page)
		if(parentObj.nodeName!='DIV' || (parentObj.nodeName=='DIV' && parentObj.className!='tab-page')){
			continue;
		}else{
			//get the id of that tab
			parentid=parentObj.getAttribute('id');
			//get the name of the Tab
			TabdivHeadName=parentObj.getAttribute('name');

			//if this name is the name we have a match
			//TODO maybe we can remove this hardcoded thing at some point(tabjb)
			if(TabdivHeadName=='tabjb'){

				//we make sure this is an array
				if(!eval(joobiErrorFields[parentid]))	joobiErrorFields[parentid]= new Array();
				//we record the field which is inside that tab
				joobiErrorFields[parentid].push(obj.getAttribute('id'));

				//we make sure that it hasne't already been modified
				for( var i=0;i<joobiErrorTabs.length;i++ ) {
					//if it was already modified we just return
					if(joobiErrorTabs[i]==TabdivHeadName){
						return true;
					}else continue;
				}//endfor

				//get the span which corresponds to that tab
				//this is the one with the text and change its class
				TabspanHead=$('jtspan'+parentid);
				TabspanHead.className +=' jberror';

				//we add an entry into the colored tabs for that tab
				joobiErrorTabs.push(parentid);

				//we runaway from the loop
				runaway=true;
			}else{
				continue;
			}//endif
		}//endif
	}//endwhile

}//endfct

/**
To write a message next to a conflictive field
@params:obj the html object which triggered the validation error(e.g.:inputbox, select)
@params:message the html object which triggered the validation error(e.g.:message)
*/
function writeMess( obj, message ) {
		//we create a span node with a text node inside it
//		var sp = document.createElement('span');
//console.log("add err " + obj.name);		
//		sp.className = 'text jberror';
//		sp.appendChild(document.createTextNode(message));
		var mymessage = '';
		for ( onemsg in jCore.msg ) {
//console.log("one msg " + onemsg);
		/*	var frst = onemsg.indexOf("_");
			var nm = onemsg.substring( frst+1, onemsg.length);
			if ( nm == obj.id ) {
//console.log("one msg " + nm);
				nm = "req_" + nm; 
				message = jCore.msg[nm];
			}
		*/
			mymessage = jCore.msg["req_" + obj.id];
///console.log("obj id req_" + obj.id + " jcoremsg " + onemsg );
		}
		//and we append it to the object showing the error
//		obj.parentNode.appendChild(sp);
//		obj.parentNode.insertBefore( sp, obj.nextSibling );
		obj.parentNode.classList.add('elementerr');
		var tempErrField = '<div class="card" id="genmsg_'+ obj.id +'">';
		tempErrField += '<div class="item item-divider" style="background-color:#ef4e3a"> Incomplete Form </div>';
		tempErrField += '<div class="item item-text-warp">' + mymessage + '</div>';
		tempErrField += '</div>'
		$('#validatemsg').append(tempErrField);
		//we record the span object in this attribute to remove it easily later
		obj.hasError = true;
}//endfct


/**
To remove an error message
@params:obj the html object which triggered the validation error(e.g.:inputbox, select)
@params:joobiTabs to know if we have tabs in the layout
*/
function removeError(obj,joobiTabs){
	//if we have tabs we remove the color
//	if (joobiTabs) removeErrorTabs(obj);

	//change the classes and remove the error span
	obj.className = obj.className.substring(0,obj.className.lastIndexOf(' '));
//	obj.parentNode.removeChild(obj.hasError);
	$("#genmsg_"+obj.id).remove();
	obj.parentNode.classList.remove('elementerr');
	obj.hasError = null;
	obj.onchange = null;
}//endfct


/**
To remove an error message from a tab
@params:obj the html object which triggered the validation error(e.g.:inputbox, select)
*/
function removeErrorTabs(obj) {
	//we try to remove the tab
	//we loop in the array of error fields per tab
	for (tabs in joobiErrorFields) {
		var prev=false;
		for(i=0;i<joobiErrorFields[tabs].length;i++){
			//if it is flagged as true we just skip it
			if(joobiErrorFields[tabs][i]===true)	continue;

			//if we spot the field we try to deactivate then we just flag it as true
			if(joobiErrorFields[tabs][i]==obj.getAttribute('id')){
				joobiErrorFields[tabs][i]=true;
			}//endif

			//we set the previous if it is = true
			if((prev===false) || (prev===true))	prev=joobiErrorFields[tabs][i];
		}//endfor

		//now we can remove the tab error message
		if(prev===true)	{
			tabObj=$('jtspan'+tabs);
			//change the classes and remove the error span
			tabObj.className = tabObj.className.substring(0,tabObj.className.lastIndexOf(' '));
			tabObj.onchange = null;
		}//endif

	}//endfor
	
}//endfct