angular.module("Extra.Services", [ ] )

.factory("Preferences", [ '$q', function( $q ) {
    
    var storePreference = function ( key, value, replace ) {
        
        if ( window.plugin ) {
//alert("Stroing function " + key + " == " + value + " == " + replace)   
            var prefs = plugins.appPreferences;
            function ok1 ( res ) { 
//alert("Stored " + res); 
            }
            function fail1 ( res ) { 
//alert("not stored " + res); 
            }
            
            if ( replace ) {
                prefs.store (ok1, fail1, key, value );
            }
            else {  
                    function ok ( res ) { 
                        // for IOS the value returns null if the prefernce is not set
                        if ( res == null ) {
                             // store key => value pair
                            prefs.store (ok1, fail, key, value );
                        }
                    }
                    function fail ( res ) {
                        // for android if the preference is not set, it retuen error 0
                        if ( res == 0 ) {
                             // store key => value pair
                            prefs.store (ok1, fail, key, value );
                        }
                    }
                    // fetch value by key (value will be delivered through "ok" callback)
                    prefs.fetch (ok, fail, key );
            }
        }
    }
    
    var fetchPreference = function ( key ) {
//alert("fetching " + key);        
        var deferred = $q.defer();
        
        if ( window.plugin ) {
            var prefs = plugins.appPreferences;
            function ok ( res ) {
//alert("got " + res);
//console.log("stored value " + res );
                if ( res == null || res == "") deferred.resolve("error");
                else deferred.resolve(res);
            }
            function fail ( res ) {
//alert("failed fetching " + res);
//console.log("error fetching value " + res );
                deferred.resolve("error");
            }
            
            // fetch value by key (value will be delivered through "ok" callback)
            prefs.fetch (ok, fail, key );
        }
        else deferred.resolve("");
        
        return deferred.promise;
    }
    return {
        storePreference : storePreference,
        fetchPreference : fetchPreference
    }
}])

.factory("Notifications", [ '$q','$ionicPopup', function ( $q,$ionicPopup ) {
      
    var getMessages = function () {
    //	var deferred = $q.defer(); 
                if( app.isOnline ) {
//alert("getting messages");       
                    var msgsenddata = new FormData();
                    msgsenddata.append("controller","mobile-notif");
                    msgsenddata.append("logUser",app.logUser);
                    msgsenddata.append("logPwd",app.logPwd);
                    msgsenddata.append("apikey",app.apikey);
                    apiURL = app.serverURL + "/" + app.serverFile;
                    $.ajax({
                         url: apiURL,
                         type: "POST",
                         async: true, 
                         data: msgsenddata,
                         processData: false,
                         cache: false,
                         contentType: false,
                         dataType: "JSON",
                         timeout: app.ajaxtimeout,
                         success:function( data ) {
 //alert("notificaiton " + data.notification.length);                          
                             //check if there are messages (notification) to show
                             if ( typeof data.notification !== 'undefined' && data.notification.length > 0 ) {
//console.log("notifications array length " + data.notification.length );
 //alert("notificaiton " + data.notification.length);
                                 app.notifications = data.notification;
                                 processNotifications();
                        //         deferred.resolve('OK');
                                 };
                             
                         },
                        error: function( xhr, ajaxOptions, thrownError ) {	
//console.log("Message receiving error : " + xhr.statusText + "(" + thrownError + ")");
                        //	deferred.resolve('noconnection');
                        }
                   }); //endajax
                }
                //else deferred.resolve('noconnection');
           //return deferred.promise;
       	}
    
        var processNotifications = function () {
            
        	//var deferred = $q.defer(); 
            // for each notification received we display it locally on device
            angular.forEach( app.notifications, function ( oneNotification ) {
            	
//alert("NOTIIFICATION content " + oneNotification.title );
                if ( typeof oneNotification.title === 'undefined' ) oneNotification.title = '';
                if ( typeof oneNotification.subtitle === 'undefined' ) oneNotification.subtitle = '';
                if ( typeof oneNotification.link !== 'undefined' ) {}
                else if ( typeof oneNotification.content !== 'undefined' ) {
                    oneNotification.link = '';
                }
                else {
                    oneNotification.link = '';
                    oneNotification.content = '';
                }
                window.plugin.notification.local.add({
                    id:         oneNotification.id,  // A unique id of the notifiction
                    message:    oneNotification.subtitle,  // The message that is displayed
                    title:      oneNotification.title,  // The title of the message
                //  repeat:     "yearly",  // Either 'secondly', 'minutely', 'hourly', 'daily', 'weekly', 'monthly' or 'yearly'
                //    badge:      1,  // Displays number badge to notification
                    json:       JSON.stringify({ title : oneNotification.title, content : oneNotification.content, link : oneNotification.link }),  // Data to be passed through the notification
                    autoCancel: true, // Setting this flag and the notification is automatically canceled when the user clicks it
                    ongoing:    false, // Prevent clearing of notification (Android only)
                //    date:       after_15_s
               //     sound: null
                });   
            } )
             
            //deferred.resolve("OK");
            //return deferred.promise;
        }
        return {
            processNotifications : processNotifications,
            getMessages : getMessages
        }
    }])

    .factory("GetEssentials", [ '$q','GetDeviceInformation', 'Preferences', function( $q, GetDeviceInformation, Preferences ) {
    
        var getEssentialParameters = function () {
            
        var deferred = $q.defer();
            
            if ( window.plugin ) {
                            //send the username and pwd
                            Preferences.fetchPreference( "logPwd" ).then (function ( value ) {
//alert("first log pwd " + value);                            
                                if ( value != 'error' ) {
                                    app.logPwd = value;
                                    Preferences.fetchPreference( "logUser" ).then (function ( value ) {
//alert("first log usr " + value);                            
                                        if ( value != 'error' ) {
                                            app.logUser = value;
                                            GetDeviceInformation.getLanguage().then ( function ( a ) {
                                                       deferred.resolve("OK");
                                            });
                                        }
                                        else {
                                            app.logPwd = '';
                                            app.logUser = '';
                                            GetDeviceInformation.getLanguage().then ( function ( a ) {
                                            //    deferred.resolve("OK");
                                                deferred.resolve("nocredentials");
                                            });
                                            //deferred.resolve("nocredentials");
                                        }
                                  });
                                }
                                else {
                                    app.logPwd = '';
                                    app.logUser = '';
                                    GetDeviceInformation.getLanguage().then ( function ( a ) {
                                    //    deferred.resolve("OK");
                                        deferred.resolve("nocredentials");
                                    });
                                    //deferred.resolve("nocredentials");
                                }
                            });                        
            }
            else {
                // for emulator purpose
                app.logPwd = '';
                app.logUser = '';
                GetDeviceInformation.getLanguage().then ( function ( a ) {
                       deferred.resolve("OK");
                });
            }
            
            return deferred.promise;
        }
        return {
            getEssentialParameters : getEssentialParameters
        }
    }]) 