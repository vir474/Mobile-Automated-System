var app = angular.module('MainModule',['ionic', 'Starter.Services', 'State.Services', 'starter.directives', 'starter.controllers', 'Extra.Services', 'Joobi.Services'])
        	.config( function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        		
        		app.stateProvider = $stateProvider;
                //define application constants
//                       app.apikey = 'MOB6VX5HW2D791N';
                        app.apikey = 'MOB769LXX2DCCB1N';
//                        app.apikey = 'MOB6VU2HN2DCCB1N';
//                		app.apikey = 'APIJOOBIDEMOMOBILE';
//                        app.apikey = 'API6XPVQU1M1FHK1N';
//                        app.apikey = 'API-MOB-BUNDLE-TEST';
                        app.serverFile = 'm1.php';
//                      app.serverURL = 'http://joobis.com/w/d/mobileDemo';
//                        app.serverURL = 'http://mobile.demo.joobi.co';
//                        app.serverURL = 'http://joomla.demo.joobi.co/w/joomla/marketplace';
        /** Define the URL of the website */                    
//                      app.serverURL = 'http://manoshops.com';
//                      app.serverURL = 'http://192.168.1.130/j30';
                      app.serverURL = 'http://joobis.com/w/d/mobileconnectjanuary';
//                      app.serverURL = 'http://localhost/j30';
//                      app.serverURL = 'http://10.11.1.40/j30';

        /** Define what space / app to use */            
                        app.space = 'phonevendors';
//                        app.space = 'mobilecatalog';
//                        app.space = 'storemanager';
                
                        /** define if the app call the admin interface or the site area */
                        app.isAdmin = false;
              
                        app.logUser = '';
                        app.logPwd = '';
                        app.isMenuLoaded = false;
                        app.ajaxtimeout = 40000;
                        app.hiddenMsgid = [];
                        app.subheader = false;
                        app.positionleft = 0;
                        app.positiontop = 0;
                        app.devicelanguage = null;
                        app.isValidKey = true;
                        app.homereloadcounter = 0;
                        app.isLoadingFirstTime = true; // use false when the url is hardcoded ( customer app )
                        app.postAParameters = {};
                        app.useGeoLocation = false; // Set as per requirement of geolocation, requires geolocation plugin
                        app.currentMenuStates = []; // stores the current menu names to avoid conflict
                        
        		$stateProvider
                .state('abstractmenu', {
                    url: "/abstractmenu",
                    abstract : true,
                    templateUrl : "templates/abstractmenu.html"
                })
                .state('abstractmenu.page', {
                    url: "/page",
                    cache: false,
                    views: {
                        'baseView' : {
                            templateUrl: "templates/pageView.html"
                        }
                    }
                })
                .state('abstractmenu.displayerror', {
                    url: "/displayerror/:errorcode/:msg/:errormsg",
                    views: {
                        'baseView' : {
                            templateUrl: "templates/displayerror.html",
                            controller: function ( $rootScope, $scope, $stateParams ) {
                                //disable menus !
                                $rootScope.showMenu = false;
                                //error info
                                $scope.errorcode = $stateParams.errorcode;
                                $scope.msg = $stateParams.msg;
                                $scope.errormsg = $stateParams.errormsg;
                            }
                        }
                    }
            })
        
            .state('abstractmenu.displayactionerror', {
                    url: "/displayactionerror/:errorcode/:msg",
                    views: {
                        'baseView' : {
                            templateUrl: "templates/displayactionerror.html",
                            controller: function ( $rootScope, $scope, $stateParams ) {
                                //disable menus !
                                $rootScope.showMenu = false;
                                //error info
                                $scope.errorcode = $stateParams.errorcode;
                                $scope.msg = $stateParams.msg;
                            }
                        }
                    }
            })
        
            .state('abstractmenu.displaytimeout', {
                url : "/displaytimeout",
                views: {
                    'baseView' : {
                        templateUrl: "templates/displaytimeout.html",
                        controller: "timeoutCtrl"
                    }
                }
            })
        
            .state('abstractmenu.displayurlpage', {
                url : "/displayurlpage",
                views: {
                    'baseView' : {
                        templateUrl: "templates/displayurlpage.html",
                        controller: "urlCtrl"
                        }
                    }
            })
        
            .state('abstractmenu.displayurlresetsupport', {
                url : "/displayurlresetsupport",
                views : {
                    'baseView' : {
                        templateUrl: "templates/displayurlresetsupport.html"
                    }
                }
            })
        
            .state('abstractmenu.displayurlresetsite', {
                url : "/displayurlresetsite",
                views : {
                    'baseView' : {
                        templateUrl: "templates/displayurlresetsite.html"
                    }
                }
            })
        
            .state('abstractmenu.displayapiretrieveerror', {
                url : "/displayapiretrieveerror/:apierror",
                views : {
                    'baseView' : {
                        templateUrl: "templates/displayapiretrieveerror.html",
                        controller: function ( $rootScope, $scope, $stateParams ) {
                                //disable menus !
                                $rootScope.showMenu = false;
                                //error info
                                $scope.apierror = $stateParams.apierror;
                            }
                    }
                }
            })
            
            .state('abstractmenu.displayredirectconfirmation', {
                url : "/displayredirectconfirmation/:redirecturl",
                views : {
                    'baseView' : {
                        templateUrl: "templates/displayredirectconfirmation.html",
                        controller: function ( $rootScope, $scope, $stateParams ) {
                                //disable menus !
                                //$rootScope.showMenu = false;
                                // redirect url scope
                                $rootScope.redirecturl = $stateParams.redirecturl;
                                $rootScope.goToRedirectUrl = function() {
//console.log($rootScope.redirecturl);
                                    window.open($rootScope.redirecturl,"_system");
                                    $rootScope.goToClear();
                                }
                            }
                    }
                }
            })
            $urlRouterProvider.otherwise('/abstractmenu/page');
        	})

        	.run(['Preferences','$templateCache','URL','GetDeviceInformation','RemoteLoader','GetEssentials','$ionicPopup','$rootScope','Notifications','$ionicPlatform', function(Preferences,$templateCache,URL,GetDeviceInformation,RemoteLoader,GetEssentials,$ionicPopup,$rootScope,Notifications,$ionicPlatform) {
//alert("run function"); 
                
        		ionic.Platform.ready(function() {
//alert("deice ionic ready");                    
        			document.addEventListener('deviceready', function () {
//alert("deice ready");                        
                        //catch error if any during state change.
                        $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
        //console.log("stateChangeError:");
        //console.log(error);
                        });

                        $rootScope.$on("$stateNotFound", function(event, unfoundState, fromState) {
        //console.log("stateNotFound:");
        //console.log(unfoundState);
        //console.log(fromState);
                        });

                         $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams ) {
        //console.log("stateChangeSuccess:");
        //console.log(event);
                        });
                        
                        app.currentMenuStates.push("temp");

                        if ( typeof app.apikey === 'undefined' ) app.apikey = '';
//alert("plugin");        				
                        if ( window.plugin ) {
                            
                            // for IOS we use style default for the statusbar
                            if (window.StatusBar) {
                                // org.apache.cordova.statusbar required
                                StatusBar.styleDefault();
                            }
                            
                            //process last url
                            // if app is loading first time go to last loaded page if possible
                            if ( app.isLoadingFirstTime && window.plugin ) {
                                Preferences.fetchPreference( 'lasturl' ).then (function ( value ) {
        //alert("app loading first time " + value);
                                    // parse query string
                                    if ( value != 'error' ) {
                                        var a = value.split("?");
                                        var p;
                                        if(a.length==1) p = a[0].split('&');
                                        else p = a[1].split('&');
                                        
                                        for( i=0; i<p.length; i++ ) {
                                            var explodeA = p[i].split('=');
                                            var temp = explodeA[0];
        //alert(temp + " == " + explodeA[1]);
                                            app.postAParameters[temp] = explodeA[1];
        //console.log("params " + temp + " = " + explodeA[1]);    
                                        }//endfor       
                                    }
                                });
                                //app.isLoadingFirstTime = false;
                            }//endif
//alert("1");                            
                            if ( window.device.platform == "iOS" ) {
                                Keyboard.hideFormAccessoryBar(true);
                            //    registerPermission();
                                cordova.plugins.notification.local.on('trigger', function (notification) {
                                     var notiftrigger = $ionicPopup.show({
                                        template: JSON.parse(notification.data).subtitle,
                                        title: JSON.parse(notification.data).title,
                                        subTitle: '',
                                        buttons: [
                                          { text: 'Cancel' },
                                          {
                                            text: '<b>Go There</b>',
                                            type: 'button-positive',
                                            onTap: function(e) {
                                                e.preventDefault();
                                                cancelnotif(notification.id);
                                                app.postAParameters = {};
                                                $rootScope.goTo(JSON.parse(notification.data).link);
                                                notiftrigger.close();
                                              }
                                            }
                                        ]
                                      });
                                      notiftrigger.then(function(res) {
console.log('Tapped Notif Trigger', res);
                                      });
                            });

                            cordova.plugins.notification.local.on('click', function (notification) {
                            /*    var localnotify = $ionicPopup.alert({
                                    title: notification.title,
                                    template: JSON.parse(notification.data).content
                                });
                                localnotify.then(function( result ) {
                                    if( typeof JSON.parse(notification.data).link === "undefined" || JSON.parse(notification.data).link.trim() == '' ) {}
                                    else {
                                    //    alert("notified " + JSON.parse(notification.data).link);
                                        $rootScope.goTo(JSON.parse(notification.data).link);
                                    }
                                });
                                */
                                if( typeof JSON.parse(notification.data).link === "undefined" || JSON.parse(notification.data).link.trim() == '' ) {}
                                if( typeof JSON.parse(json).link !== "undefined" || JSON.parse(json).link.trim() != '' ) {
                                    app.postAParameters = {};
//    alert("notified " + JSON.parse(json).link);
                                    $rootScope.goTo(JSON.parse(notification.data).link);
                                }
                            });
                                 var myVar = setInterval(function(){
//alert("interval");
                         	    scheduleFromServer();
                        //        Notifications.getMessages();
                         	}, 120000);
                        }
                        else if ( window.device.platform == "Android" ) {
                            
                            // we take focus off the field when the keyboard is closed so that it doesnt conflict and open the keypad again
                            if (window.cordova && window.cordova.plugins.Keyboard) {
                                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                                 window.addEventListener('native.keyboardhide', function (e) {
                                    $('input').blur();
                                   $('textarea').blur();
                                });
                            }
                            
                            // register android back button with ionic paltfrom service
                              $ionicPlatform.registerBackButtonAction( function () { 
                                    // Show the popup to ask user to quit or not       
                                        var backnotify = $ionicPopup.show({
                                            template: '',
                                            title: 'Are you sure you want to exit ?',
                                      //      subTitle: 'Joobi',
                                      //      scope: $scope,
                                            buttons: [
                                              {
                                                text: 'Yes, Exit',
                                                type: 'button-assertive',
                                                onTap: function(e) {
                                                    // exit app, suspend
                                                    navigator.app.exitApp();
                                                }
                                              },
                                              {
                                                  text: 'Cancel',
                                                  type: 'button-balanced',
                                                  onTap: function(e) {
                                                    //  Do Nothing
                                                  }
                                              }
                                            ]
                                          });
                                          backnotify.then(function(res) {
//console.log('Back Button Popup ! ', res);
                                        });
                                }, 101 ); // 101 prority to skip only back view not menu, popup or any other elements   
                        
                            window.plugin.notification.local.ontrigger = function (id, state, json) {
    //alert("triggered " + JSON.parse(json).content);                            
                                /*            var localnotify = $ionicPopup.alert({
                                                title: JSON.parse(json).title,
                                                template: JSON.parse(json).content
                                            });
                                            localnotify.then(function( result ) {
                                                if( typeof JSON.parse(json).link === "undefined" || JSON.parse(json).link.trim() == '' ) {}
                                                else { 
                                                //    alert("notified " + JSON.parse(json).link);
                                                }
                                            });
                                */
                            };
                            window.plugin.notification.local.onclick = function (id, state, json) {
    //alert("clicked " + id);                            
                                  /*          var localnotify = $ionicPopup.alert({
                                                title: JSON.parse(json).title,
                                                template: JSON.parse(json).content
                                            });
                                            localnotify.then(function( result ) {
                                                if( typeof JSON.parse(json).link === "undefined" || JSON.parse(json).link.trim() == '' ) {}
                                                else {
                                                //    alert("notified " + JSON.parse(json).link);
                                                    $rootScope.goTo(JSON.parse(json).link);
                                                }
                                            });
                                    */
                                if( typeof JSON.parse(json).link === "undefined" || JSON.parse(json).link.trim() == '' ) {}
                                if( typeof JSON.parse(json).link !== "undefined" || JSON.parse(json).link.trim() != '' ) {
                                    app.postAParameters = {};
//    alert("notified " + JSON.parse(json).link);
                                    $rootScope.goTo(JSON.parse(json).link);
                                }
                            };
                            
                             var myVar = setInterval(function(){
//alert("interval");
                            // 	    scheduleFromServer();
                                    Notifications.getMessages();
                                }, 120000);
                            }
//alert("2");                        
                         // Run the app in background
                            cordova.plugins.backgroundMode.enable();
                        }
                        if ( typeof app.serverURL === 'undefined' ) {
                            app.isCustomer = false;
                        }
                        else {
                            app.isCustomer = true;
                        }
//alert("outside plugin");                       
                        app.isurl = true;
                        if ( window.plugin ) {
                            app.isurl = app.isCustomer; // use true when url is hardcoded ( custormer app )
//alert("Befor URL check");
//alert("3");                            
                            // check if we have url if not ask user (Joobi Services)
                            if ( !app.isCustomer ) {
                                URL.checkURL(); // comment this when url is hardcoded ( custormer app )
                            }
                        }
//alert("4");
                        if ( navigator.connection.type == Connection.NONE ) app.isOnline = false;
                        else app.isOnline = true;
                        //Listening to connection change
                        document.addEventListener("offline", function(){
                        	app.isOnline = false;
                        }, false);
                        document.addEventListener("online", function(){
                        	app.isOnline = true;
                        }, false);
                        //listening to Device Orientation Change
                        //window.addEventListener('orientationchange', onOrientationChange);
                        GetDeviceInformation.getDeviceInformation();
                        GetDeviceInformation.getLanguage().then ( function ( a ) {});
                        
                        if ( app.isurl ) {
//alert("isurl");                            
                            GetEssentials.getEssentialParameters().then ( function ( a ) {
                               RemoteLoader.getRemoteData();
                            });
                        }                 
                    }, false);
        		})
        	}])