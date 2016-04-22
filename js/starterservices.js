/**
*** The list of actions we may receive from the server ***
 * 	-> TOO_MANY_REDIRECT : we have too many redirect
 * 	-> UNKNOWN_ERROR : we dont know why we have an error it needs to be debugged
 * 	-> EXTENSION_NOT_FOUND : the request is wrong and the extension was not found
 *  -> APIKEYNOTVALID : the api out is not valid
 *  -> RESET_CREDENTIALS : reset teh credenditals of the user
**/

angular.module("Starter.Services", ['State.Services', 'Extra.Services'])

    .factory("GetDeviceInformation", [ '$q', function( $q ) {
        
        var getLanguage = function () {
            
            var deferred = $q.defer();
            
            if ( typeof navigator.globalization === 'undefined' )
            {
                deferred.resolve("");
            }
            else {
                //language of device
                navigator.globalization.getLocaleName(
                    function (locale) {
                        app.devicelanguage = locale.value;
                        deferred.resolve(locale.value);
                    },
                    function () {
//console.log("error getting language");
                        deferred.resolve("error");
                    }
                );
            }
            return deferred.promise;
        };
        
        var deviceInfo = {};
        var getDeviceInformation = function () {
     
                var gps_flag = false;
                
                //Get GPS location
                var onSuccess = function (position) {
//console.log("got GPS Location");
                    gps_flag = false;
                    GetDeviceInformation.getLanguage().then ( function ( a ) {
                       RemoteLoader.getRemoteData();
                    });
                    deviceInfo.latitude = position.coords.latitude;
                    deviceInfo.longitude = position.coords.longitude;
//console.log("Latitude -- " + position.coords.latitude + "Longitude -- " + position.coords.longitude );
                }
    
                var onError = function (error) {
//console.log('GPS error ' + 'code: '    + error.code + 'message: ' + error.message );
                    gps_flag = true;
                }
                if ( app.useGeoLocation ) navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 50000});
                else gps_flag = false;
                
                //Get Basic Device Info
                deviceInfo.devicename = window.device.name;
                deviceInfo.devicecordova = window.device.cordova;
                deviceInfo.deviceplatform = window.device.platform;
                deviceInfo.deviceuuid = window.device.uuid;
                deviceInfo.deviceversion = window.device.version;
                deviceInfo.deviceheight = screen.height;
                deviceInfo.devicewidth = screen.width;
                deviceInfo.devicepixeldensityratio = window.devicePixelRatio;
                
                if ( deviceInfo.devicewidth > 599 ) {
                    deviceInfo.isPhone = false;
                    deviceInfo.isTablet = true;
                }
                else {
                    deviceInfo.isPhone = true;
                    deviceInfo.isTablet = false;
                }
  
//console.log("device type mobile = " + screen.width + " == " + screen.height );
                if ( gps_flag ) {
                    //Get Ipaddress and if GPS not found, get location from IPAddress
                    $.ajax({
                     url: "http://ipinfo.io", //free service to get ip and location !imp
                     type: "GET",
                     async: false,
                     dataType: "JSONP",
                     success:function(response){
                        var split = response.loc.split(',');
                        if(!gps_flag){
                              deviceInfo.latitude = split[0];
                              deviceInfo.longitude = split[1];
                        }
                        deviceInfo.deviceipaddress = response.ip;
                        window.localStorage.setItem('local_deviceinfo',JSON.stringify(deviceInfo));
    //console.log("city "+ response.city + " country " + response.country + " lat-long " +deviceInfo.latitude + "-" + deviceInfo.longitude + " IP " + deviceInfo.deviceipaddress);

                    },
                    error: function( xhr, ajaxOptions, thrownError ) {
                        //TODO create a ERROR page				
    //console.log("IP from internet error : " + xhr.statusText + "(" + thrownError + ")");
                    }

                   }); //endajax
                }
            app.deviceInfo = deviceInfo;
        }
            
        return {  
            getDeviceInformation : getDeviceInformation,
            getLanguage : getLanguage
        }
    }])

    .factory("CheckConnection", [ '$ionicPopup', '$q', '$timeout', function ($ionicPopup, $q, $timeout) { 
            
        // Check Internet Connection
        var checkConnection = function ()
        {
            $ionicLoading.hide(); // if there is any backdrop ( goto funciton ) we stop it 
            var deferred = $q.defer();
            if(navigator.connection.type == Connection.NONE)
            {
                // Offline 
                var alertpopup = $ionicPopup.alert({
                                    title: 'No Connection',
                                    template: 'Check your Connection and Retry !'
                });

                alertpopup.then(function( result ) {
                        action = "none";
                        deferred.resolve(action);
                });
            }
            else {
                // Online
                action = "online";
                deferred.resolve(action);
            }
            return deferred.promise;
        };
        
        return {
            checkConnection : checkConnection
        };
    }])

    .factory("RemoteLoader", ['$state','$rootScope','createstates','$timeout','$templateCache','$ionicLoading','$ionicScrollDelegate','CheckConnection','Notifications','$ionicPopup','Preferences', function ( $state,$rootScope, createstates, $timeout, $templateCache, $ionicLoading, $ionicScrollDelegate, CheckConnection, Notifications, $ionicPopup, Preferences ) {
 
            var getRemoteData = function (){
//alert("remote data function");
        //window.open("http://joobi.co","_system");
                app.positionleft = 0;
                app.positiontop = 0;

                if( app.isOnline ) {
                    if ( app.isValidKey ) {
                    
                        if ( !app.isLoadingFirstTime ) {
                            // Show a Loading backdrop to notify user when the app is loading data from server
                            $ionicLoading.show({
                                template: 'Stay Along !<br><ion-spinner class="spinner-energized" icon="ripple"></ion-spinner>',
                        //	    content: 'Loading Data',
                                animation: 'fade-in',
                                showBackdrop: true,
                                maxWidth: 200,
                                showDelay: 500
                            });
                            /*
                            $ionicLoading.show({
                                template : 'Stay Along !<i class="icon ion-load-c" style="font-size: 3em;"></i>'
                        //        animation : 'fade-in'
                            });
                            */
                            
                        }

                    if( typeof app.formdata === 'undefined' )
                    {
//console.log("form variable " + app.formdata);
                        app.formdata = new FormData();
                    }
                        
                    app.formdata.append( 'apikey' , app.apikey );
                    app.formdata.append( 'space' , app.space );
                    if ( '' != app.logPwd && window.plugin ) app.formdata.append( 'logPwd' , app.logPwd );
                    if ( '' != app.logUser && window.plugin ) app.formdata.append( 'logUser' , app.logUser );
                    app.formdata.append( 'isAdmin' , app.isAdmin );
                    app.formdata.append( 'isMenuLoaded' , app.isMenuLoaded );
                    app.formdata.append( 'devicelanguage' , app.devicelanguage );
                    var encode_deviceInfo = JSON.parse(window.localStorage.getItem('local_deviceinfo'));
                    app.formdata.append('deviceInfo', JSON.stringify(app.deviceInfo));
                        
                    if ( app.isLoadingFirstTime && window.plugin ) {    
                        for ( key in app.postAParameters ) {
//alert("posta : " + key + " = " + app.postAParameters[key] );
                            app.formdata.append( key, app.postAParameters[key] );
                        }
                        app.isLoadingFirstTime = false;
                    }
            //      app.formdata.append('controller','basket');
                    //clear msg id object
                    app.hiddenMsgid = [];

                    //Main APIs
                    apiURL = app.serverURL + "/" + app.serverFile;
//alert("URL loading " + apiURL + " apikey " + app.apikey);
                    $.ajax({
                         url: apiURL,
                         type: "POST",
                         async: true, 
                         data: app.formdata,
                         processData: false,
                         cache: false,
                         contentType: false,
                         dataType: "JSON",
                         timeout: app.ajaxtimeout,
                         success:function( data ) {
/*
angular.forEach(data, function ( value, key ) {
console.log(key + " == " + value);
})
*/
                             // we check if there is an action error returned from the server
                             var noaction = true; // use this variable to skip the normal processing of the page and return a appropriate error
                             if( typeof data.action !== 'undefined' ) {
//alert("action " + data.action);
                                 if ( data.action == 'APIKEYNOTVALID' ) {
                                	 
                                     // API KEY error from the url site
                                     $state.go('abstractmenu.displayurlresetsite');
                                     noaction = false;
                                     
                                 } else if ( data.action == 'TOO_MANY_REDIRECT' ) {
                                     // if the server returns error redirect, we reset the app and load the home page or display error page.
                                     noaction = false;
                                     if ( app.homereloadcounter < 3 ) {
                                        $rootScope.goToClear();
                                     }
                                     else {
                                        $state.go('abstractmenu.displayactionerror', {errorcode : data.action, msg : data.html}, { location: false } );
                                     }
                                 }
                                 else if ( data.action == 'EXTENSION_NOT_FOUND' ) {
                                     noaction = false;
                                     $state.go('abstractmenu.displayactionerror', {errorcode : data.action, msg : data.html}, { location: false } );
                                 }
                                 else if ( data.action == 'RESET_CREDENTIALS' ) { // this action is only sent when user clicks log out .
                                    // noaction = false;
//alert("reset");
                                     if ( window.plugin ) {
                                         //reset the user credentials 
                                         Preferences.storePreference( 'logPwd', '', true );
                                         Preferences.storePreference( 'logUser', '', true );
                                         Preferences.storePreference( 'lasturl', '', true ); // Reset the last url
                                         
                                         Preferences.fetchPreference( "logPwd" ).then (function ( value ) {
//alert("reset log pwd " + value);                            
                                         });                        
                                        Preferences.fetchPreference( "logUser" ).then (function ( value ) {
//alert("reset log usr " + value);                            
                                        });          
                                     }
                                     // log out go to home page reset 
                                     //$rootScope.goToClear();
                                 }
                                 else if ( data.action == 'BROWSER_REDIRECT' ) {
                                    noaction = false;
//console.log(data.params);                                     
                                     if ( typeof data.params !== 'undefined' ) {
                                         var params = data.params;
                                         var redirecturl = '';
                                         var temp='';
console.log(params);                                 
                                        angular.forEach ( params, function ( value, key ) {
                                                temp += key + "=" + encodeURIComponent(value);
                                                temp += "&";
                                        })
console.log("redirect url " + temp);
                                        // check if we have a redirect url or not
                                        if ( typeof data.redirectURL !== 'undefined' ) {
                                            redirecturl += data.redirectURL + '?' + temp;
                                        }
console.log("redirect url " + redirecturl);
                                         
                                         // open the system browser and go to redirecturl
                                         $state.go('abstractmenu.displayredirectconfirmation', {redirecturl : redirecturl}, { location: false } );
                                     }//endif
//alert("redirecting");
                                     // After opening the systembrowser we reset the app to home page
                                     //$rootScope.goToClear();
                                 }//endif
                             }//endif
//alert(data.html);                     
                        
                             else if ( typeof data.html === 'undefined' || data.html == '' || data.html.trim() == '' ) {
                                 // when the html is empty or not present
                                 noaction = false;
                                 if ( typeof data.action === 'undefined' ||  data.action == ''  || data.action.trim() == '' ) {
                                     // when the html and action both are empty
                                    $state.go('abstractmenu.displayactionerror', {errorcode : "Action Empty", msg : "HTML Empty" }, { location: false } );
                                 }
                                 else {
                                     // when only html is empty 
                                     $state.go('abstractmenu.displayactionerror', {errorcode : data.action, msg : "HTML Empty" }, { location: false } );
                                 }
                             }
                             
                             // if there is no action error we proceed our normal page processing
                             if( noaction ) {
//alert("noaction var");                                 
                                 app.homereloadcounter = 0; // if the page loaded without a ajax error we reset the reload counter to prevent looping
                                 // if no error and there is a currenturl to store 
                                 if ( typeof data.currentURL !== 'undefined' && window.plugin ) {
//alert("Storing CUrrent URl " + data.currentURL);
                                     if ( data.currentURL != 'controller=mobile-notif')
                                     Preferences.storePreference( 'lasturl', data.currentURL, true );
                                 }//endif
//alert(data.logPwd + " : " + data.logUser);
                                 // if no error and there is a logPwd && logUser to store 
                                 if ( typeof data.logPwd !== 'undefined' && typeof data.logUser !== 'undefined' && window.plugin ) {
                                     Preferences.storePreference( 'logPwd', data.logPwd, true );
                                     Preferences.storePreference( 'logUser', data.logUser, true );
                                     
                                     Preferences.fetchPreference( "logPwd" ).then (function ( value ) {
//alert("stored log pwd " + value);                            
                                    });                        
                                    Preferences.fetchPreference( "logUser" ).then (function ( value ) {
//alert("stored log usr " + value);                            
                                    });   
                                 }//endif
                                      
                                 $templateCache.put('templates/pageView.html', data.html);
                                 //ADD Scripts into head$state.go('abstractmenu.displayerror', {errorcode : xhr.status, msg : ajaxOptions, errormsg : thrownError}, { location: false } );
                                 $("#headscripts").html(data.head);
//console.log("Show Menu " +  data.showMenu + " data.menu " + typeof data.menu);
                                 // set menu as to whether to show menu or not 
                                 $rootScope.showMenu = data.showMenu;

                                var menu = data.menu;
                                if(data.showMenu  && typeof data.menu !== 'undefined' ) {
//console.log("local menu null");
                                    //means theres no menu
                            //         if(!app.isMenuLoaded) {
//console.log("data.menu null");
                                        // fetch menu states and populate states
                                        app.menus = menu.names;
                                        createstates.createMenu();
                            //        }
                                }
                                 if( typeof data.menu !== 'undefined' ) {
//console.log("menu " + data.menu);
                                     angular.forEach(menu.names, function ( oneMenu ) {
//console.log("template menu " + JSON.stringify(menu[oneMenu]));   
                                            //cache menu scripts
                                            $templateCache.put('templates/' + oneMenu + '.html', menu[oneMenu]);
                                        })
                                 }

                                $timeout(function () {
                                        $state.go('abstractmenu.page',{},{ reload : true, location: false });
                                } , 50);

                                $timeout( function () {
                                        $ionicScrollDelegate.$getByHandle('pagescroll').scrollTo(app.positionleft, app.positiontop, false);
                                        app.subheader = $("#maincontent").hasClass("has-subheader");
                                }, 50);
                             }
                        },
                        //fail of the ajax request
                         error: function( xhr, ajaxOptions, thrownError ) {		
//console.log("error : " + xhr.statusText + "(" + thrownError + ")" + JSON.stringify(xhr));
                            
                             if( ajaxOptions == 'timeout' ) {
                                 $state.go('abstractmenu.displaytimeout',{},{ location: false });
                             }
                             else if( ajaxOptions == 'parsererror' ) {
                                 app.homereloadcounter++;
                                 if ( app.homereloadcounter < 3 ) {
                                    $rootScope.goToClear();
                                 }
                                 else {
                                     $state.go('abstractmenu.displayerror', {errorcode : xhr.status, msg : ajaxOptions, errormsg : thrownError}, { location: false } );
                                 }
                             }
                             else {
                                //display error page
                                $state.go('abstractmenu.displayerror', {errorcode : xhr.status, msg : ajaxOptions, errormsg : thrownError}, { location: false } );
                            }
                         },

                        complete: function(jqXHR , textStatus ) {

                            if(textStatus == "success")
                            {
 //console.log("success");      // when the page loads sometimes it has focus on a particular field, we dont need that in mobile 
                                // it may conflict with the form with slides
                                $('input').blur();
                                $('textarea').blur();
                                if (typeof navigator.app !== 'undefined' && window.plugin ) {
                                    navigator.app.clearHistory();
                                    
                                }
                               
                            }
                            
                            // hide the backdrop
                            $ionicLoading.hide();
                        }
                   }); //endajax
                }
                else {
                    // Not a valid key 
                    $state.go('abstractmenu.displayurlresetsupport');
                    // hide the backdrop
                    $ionicLoading.hide();
                    }
                }
                else {
                    
                    //The device is offline
                    CheckConnection.checkConnection().then( function ( a ) {
//console.log("connection " + a);
                    });
                }
            }
            
            return {
                getRemoteData : getRemoteData
            }
    }])