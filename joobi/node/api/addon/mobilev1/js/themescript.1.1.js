
window.WApps = {
	helpers:{}	// this is just a namespace
};

/**
 * scirpt the change the loading button
 */
window.WApps.helpers.changeButtons = function ( button, htmlEntity, classChange ) {
	
    var btn = jQuery(htmlEntity);
    //get button text
    var text = btn.data('loading-text');
    //get icon classes and add one class
    var iconClass = btn.find('i').attr('class') + ' fa-spin';
    //disable button
    btn.button('loading');
    //replace button html 
    btn.html('<i class="'+iconClass+'"></i>'+text);
    return false;
    
}//endfct


/**
 * scirpt the change the loading button
 */
window.WApps.helpers.autoSave = function ( $formname, $time, $url, $namekey ) {

    //this si save button
    var btn = jQuery('button.btn.btn-info');
    
    var timer = setInterval(function(){
        //add task value
        var taskInput = jQuery('form#'+$formname).find("input[name=task]");
        if ( taskInput ) {
            taskInput.val("saveauto");
        }
        jQuery('form#'+$formname).autosave({
			interval:  $time,
			url: $url,
			setup: 	function(e,o) {
			},
			record: function(e,o) {

			},
			before: function(e,o) {
				joobi.beforeAutosave($namekey, this);
				return true;
			},
			validate: function(e,o) {
				var status =joobi.validate($formname);
                if (status) {
                    //here i need to replace button to loading                                          
                    window.WApps.helpers.changeButtons('',btn);
                }
                return status;
			},
			save: function(e,o) {
                //reset button
                 btn.button('reset');
			}

            });
            
            clearInterval(timer);
        }, '1000');               

}//endfct


/**
 *  make active tab
 * @returns 
 */
window.WApps.helpers.makeTabActive = function( id ) {
  jQuery(document).ready( function() { 
                //find tabs
        var formNav = jQuery('#'+id);
        //get all tabs
        var allTabs = formNav.find('li');
        //remove active class from all tabs
        allTabs.removeClass('active');
        //get active tab from cookie
        //get index of active tab
        var activeTabIndex = window.WApps.helpers.getCookie(id);  
        //add class active to that tab
        jQuery(allTabs[activeTabIndex]).find('a').click();     
    })
}


/**
 * set active index tab to the session
 * @returns {undefined}
 */
window.WApps.helpers.setToCookieActiveTab = function( id ) {

    jQuery(document).ready( function() { 
        if (jQuery('#'+id).length == 0) {return false;}
        var timer = setInterval(function(){
            var formNav = jQuery('#'+id);
            //find all tabs
            var activeTab = formNav.find('li.active').index();
            //set to cookie index of tab
            window.WApps.helpers.setCookie(activeTab, id);   

        }, '1000');          

    })

}

//set to cookie index of active tab
window.WApps.helpers.setCookie = function (indexActive,id) {    
    var name = "activetab"+id;
    sessionStorage[name] = indexActive;    
} 

//get storaged acive index of tab
window.WApps.helpers.getCookie = function (id) {
    var name = "activetab"+id;
    return sessionStorage[name] || 0;
} 