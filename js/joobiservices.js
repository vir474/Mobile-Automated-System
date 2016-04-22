angular.module("Joobi.Services", [ "Starter.Services", "ionic", "Extra.Services" ] )

    .factory('URL',[ "APIKey", "Preferences", "$q", "$state", "$ionicLoading" , function ( APIKey, Preferences, $q, $state, $ionicLoading ) {
        
        var checkURL = function () {
//alert("check URL function");
             if ( window.plugin ) {
                 
                    // Show a Loading backdrop to notify user when the app is loading data from server
              //      $ionicLoading.show({
              //          template : 'Stay Along !<br><i class="icon ion-loading-c" style="font-size: 3em;"></i>'
              //      });
              
                 // check if there is a next interval to validate the license
                 Preferences.fetchPreference( "validateinterval" ).then (function ( value ) {
                     if ( value == "error" ) {
                        Preferences.storePreference( "apikey", "", true );
                     }
                 });
                    app.isurl = false;
                   
                    Preferences.fetchPreference( "appurl" ).then ( function ( value ) {
//alert("URL value " + value );
                        if ( value != "error" ) {
                       //     app.isurl = true;
//alert(" URL not error " + value + " isurl " + app.isurl);
                            app.serverURL = value;
                            $ionicLoading.hide();
                            APIKey.checkAPIKey();
                        }
                        else {
                            app.isurl = false;
                            $ionicLoading.hide();
                            $state.go('abstractmenu.displayurlpage');
                        }
                    });
                    $ionicLoading.hide();
                }
            }
        
        var validatejURL = function (tempURL) {
            var deferred = $q.defer();
            if( app.isOnline ) {
//alert("validating URL function " + tempURL);
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
                        template : 'Validating URL !<br><i class="icon ion-loading-c" style="font-size: 3em;"></i>'
                    });
                */
                    $.ajax({
                         url: tempURL + "/index.php?option=com_jmobile&controller=mobile-key&task=islive",
                         type: "POST",
                         async: true, 
                         dataType: "JSON",
                         timeout: app.ajaxtimeout,
                         success:function( data ) {
                             if ( typeof data.status !== 'undefined' && typeof data.message !== 'undefined' ) {
//alert("validating result from server " + data.message + " == " + data.status );
                                 if ( data.message == "ISREADY" && data.status == true ) {
                                     deferred.resolve(tempURL);
                                 }
                                 else {
//console.log("Server not ready : URL error");
                                    deferred.resolve("error");
                                 }
                             }
                             else {
//alert("no message and adta found");
//console.log("No proper response from server, retrieveing apikey");  
                                 deferred.resolve("error");
                             } 
                         },
                        error: function( xhr, ajaxOptions, thrownError ) {
//alert("Validating ajax error " + xhr.statusText + " == " + thrownError);
//console.log("Retrieving APIkey receiving error : " + xhr.statusText + "(" + thrownError + ")");
                            deferred.resolve("error");
                        }
                   }); //endajax
                    $ionicLoading.hide();
                }
                else deferred.resolve("noconnection");
            return deferred.promise;
        }
        return {
            checkURL : checkURL,
            validatejURL : validatejURL
        }
    }])

    .factory('APIKey',[ "Preferences", "RemoteLoader", "$ionicPopup", "$timeout", "$q", "$ionicLoading", "GetEssentials", "$state", function ( Preferences, RemoteLoader, $ionicPopup, $timeout, $q, $ionicLoading, GetEssentials, $state ) {
        
        var checkAPIKey = function () {
            
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
                        template : 'Stay Along !<br><i class="icon ion-loading-c" style="font-size: 3em;"></i>'
                    });
        */            
                Preferences.fetchPreference( "apikey" ).then ( function ( value ) {
//alert("check API key " + value);
                if ( value != "error" ) {
                    app.isurl = true;
                    app.isValidKey = true;
                    app.apikey = value;
                    checkValidationInterval();
                    // call remote loader
                    GetEssentials.getEssentialParameters().then ( function ( a ) {
                       RemoteLoader.getRemoteData();
                    });
                }
                else {
                    retrieveAPIKey().then ( function ( value ) {
                        switch ( value ) {
                                case "error" :
                                case "notfound" :
                                    break;
                                case "noconnection" :
                                    CheckConnection.checkConnection.then( function ( a ) {
//console.log("connection " + a );                                        
                                    });
                                    break;
                                default :
                                    app.isurl = true;
                                    app.apikey = value;
                                    // call remote loader
                                    GetEssentials.getEssentialParameters().then ( function ( a ) {
                                        RemoteLoader.getRemoteData();
                                    });
                                    break;
                        }
                    });
                }
            })
            $ionicLoading.hide();
        }
        var retrieveAPIKey = function () {
            var deferred = $q.defer();
             if( app.isOnline ) {
//alert("retrieveing apikey");
                    $ionicLoading.show({
                        template : 'Retrieving API Key !<br><i class="icon ion-loading-c" style="font-size: 3em;"></i>'
                    });
                    $.ajax({
                         url: app.serverURL + "/index.php?option=com_jmobile&controller=mobile-key&task=getapi&app=jVendor.mobile",
                         type: "POST",
                         async: true, 
                         dataType: "JSON",
                         timeout: app.ajaxtimeout,
                         success:function( data ) {
                             if ( typeof data.status !== 'undefined' && typeof data.message !== 'undefined' ) {
//alert("retrieved api key " + data.message + " == " + data.status );
                                 if ( data.message == "FOUND" && typeof data.apikey !== 'undefined' ) {
                                     validateKeyLicence(data.apikey);
                                     deferred.resolve(data.apikey);
                                 }
                                 else {
//console.log("No API Key returned from server");
                                     $state.go('abstractmenu.displayapiretrieveerror', {apierror : "The server returned NOT FOUND while retrieving AOI Key. Try to restart the application or contact support "}, { location: false } );
                                     deferred.resolve("notfound");
                                 }
                             }
                             else {
//alert("no message and adta found");
//console.log("No proper response from server, retrieveing apikey"); 
                                 $state.go('abstractmenu.displayapiretrieveerror', {apierror : "There was no proper response from the server while retrieving the API Key. Try to restart the application or contact support"}, { location: false } );
                                 deferred.resolve("error");
                             }
                         },
                        error: function( xhr, ajaxOptions, thrownError ) {	
//alert("Retriveing api ajax error " + xhr.statusText + " == " + thrownError);
//console.log("Retrieving APIkey receiving error : " + xhr.statusText + "(" + thrownError + ")");
                            $state.go('abstractmenu.displayapiretrieveerror', {apierror : "Error Retrieving API Key. Thrown Error : " + thrownError}, { location: false } );
                            deferred.resolve("error");
                        }
                   }); //endajax
                  $ionicLoading.hide();
                }
                else {
                    // no connection
                    deferred.resolve("noconnection");
                }
            return deferred.promise;
        }
        var validateKeyLicence = function ( tempapi ) {
//alert("validating key " + tempapi);
            if ( app.isOnline ) {
                $.ajax({
                         url: "http://register.joobi.co/index.php?option=com_japplication&controller=license&task=retrieve&apikey=" + tempapi,
                    //     url: app.serverURL + "/index.php?option=com_japplication&controller=license&task=retrieve&apikey=" + tempapi,
                         type: "POST",
                         async: true, 
                         dataType: "JSON",
                         timeout: app.ajaxtimeout,
                         success:function( data ) {
                             if ( typeof data.message !== 'undefined' ) {
                                 switch ( data.message ) {
                                         case "VALID" :
//alert("valid");
                                            Preferences.storePreference("apikey",tempapi,true);
                                            // Give it sometime to store the preference ( IOS )
                                            $timeout( function () {
                                                Preferences.fetchPreference( "apikey" ).then ( function ( value ) {
//alert("stored key " + value);
                                                    // if value is fetched correctly then go to URL
                                                    if ( value != 'error' ) {
                                                       //stored
                                                        app.isValidKey = true;
                                                        app.apikey = value;
                                                        setNextValidationInterval();
                                                    }
                                                    else {
                                                        // APIKey was not stored reload again
                                                    /*    var alertpopup = $ionicPopup.alert({
                                                                    title: 'Error',
                                                                    template: 'A Problem occured storing the APIKEY ! Restart '
                                                        });
                                                        alertpopup.then(function( result ) {});                         
                                                    */
                                                    }
                                                });
                                            }, 500);
                                            break;
                                         case "EXPIRED" :
//alert("Key Expired");
                                            app.isValidKey = false;
                                            break;
                                         case "NOT FOUND" :
                                         default :
//alert("notfound");
                                            app.isValidKey = false;
                                            break;
                                 }
                             } 
                         },
                        error: function( xhr, ajaxOptions, thrownError ) {
//alert("validating api ajax error " + xhr.statusText + " == " + thrownError);
//console.log("Validating Licence receiving error : " + xhr.statusText + "(" + thrownError + ")");
                        }
                   }); //endajax
            }
            
        }
        var setNextValidationInterval = function () {
//alert("Setting next date");
            var nextDate = Date.today().add(7).days();
//alert("next date " + nextDate);
            var interval_v = nextDate.toString("d-MMM-yyyy");
//alert("next interal " + interval_v);
            Preferences.storePreference("validateinterval", interval_v, true);
            // Give it sometime to store the preference ( IOS )
            $timeout( function () {
                Preferences.fetchPreference("validateinterval").then( function ( value ) {
                    // if value is fetched correctly then go to URL
                    if ( value != 'error' ) {
                       //stored
//alert("stored date " + value);                    
                    }
                    else {
                        // Interval was not stored reload again
//alert("date not stored ");                    
                    }
                });
            }, 500);
        }
        var checkValidationInterval = function () {
            Preferences.fetchPreference("validateinterval").then ( function (value ) {
//alert("checking validateinterval " + value);
                if ( value != "error" ) {
                //    var date = value.split("-");
                    var currentDate = Date.today().toString("d-MMM-yyyy");
                //    if ( currentDate.getDate() == date[0] && currentDate.getMonth() == date[1] && currentDate.getFullYear() == date[2] ) {
                    if( currentDate == value ) {
                        validateKeyLicence(app.apikey);
                    }
                    else {
//alert("Not Today");
                        return;
                    }
                }
                else {
                    //error
                }
            });
        }
        return {
            checkAPIKey : checkAPIKey,
            retrieveAPIKey : retrieveAPIKey,
            validateKeyLicence : validateKeyLicence,
            setNextValidationInterval : setNextValidationInterval,
            checkValidationInterval : checkValidationInterval
        }
    }])