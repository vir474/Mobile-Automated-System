angular.module('starter.controllers',['ionic', 'Starter.Services', 'State.Services', 'starter.directives', 'Extra.Services','Joobi.Services'])

 .controller('MainCtrl' , [ '$scope','$rootScope','$ionicSideMenuDelegate','RemoteLoader','$ionicScrollDelegate','$ionicNavBarDelegate','$timeout','$state','$ionicSlideBoxDelegate','$ionicPlatform','$ionicActionSheet','Preferences','$ionicLoading','GetEssentials','$q', function ($scope,$rootScope,$ionicSideMenuDelegate,RemoteLoader,$ionicScrollDelegate,$ionicNavBarDelegate,$timeout,$state,$ionicSlideBoxDelegate,$ionicPlatform, $ionicActionSheet, Preferences, $ionicLoading, GetEssentials,$q) { 
        $scope.currentIndex = $ionicSlideBoxDelegate.currentIndex;

        $rootScope.toggleMenu = function() {
                 $ionicSideMenuDelegate.toggleLeft();
        }
        
        $rootScope.onSlideChange = function ( $index ) {
console.log("slide changed " + $index);   
            $ionicSlideBoxDelegate.update();
console.log($("ion-slide[data-index='" + $index + "']").height());            
//            $ionicScrollDelegate.resize();
//            $("div[class='slider-slides']").height( $("ion-slide[data-index='" + $index + "']").height() );
//            $("div[class='slider']").css("max-height", "none" );
//            $("div[class='slider']").css("max-width", $("ion-slide[data-index='" + $index + "']").width() + 'px');
            $("div[class='slider']").css("max-height", $("ion-slide[data-index='" + $index + "']").height()+15 + 'px');
            $('input').blur();
            $('textarea').blur();
        }
        
        //a function to click events
         $rootScope.goTo = function (params) {
//console.log("in goTO function");             
/*        $ionicLoading.show({
            template: 'Stay Along !<br><ion-spinner class="spinner-energized" icon="ripple"></ion-spinner>',
    //	    content: 'Loading Data',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 500
        });
    */    
       /*      
             $ionicLoading.show({
                        template : 'Stay Along !<br><i class="icon ion-loading-c" style="font-size: 3em;"></i>',
        //                animation : 'fade-in'
            });
         */    
             if( params != null ) {
                app.formdata = new FormData();
                var a = params.split("?");
                var p;
                if(a.length==1) p = a[0].split("&");
                else p = a[1].split("&");

                for(i=0;i<p.length;i++) {
                    var explodeA = p[i].split("=");
                    var temp = explodeA[0];
                    app.formdata.append( temp, explodeA[1] );
//console.log("params " + temp + " = " + explodeA[1]);    
                }//endfor
            }
            //go to page
            GetEssentials.getEssentialParameters().then ( function ( a ) {
                       RemoteLoader.getRemoteData();
            });
        }
         
         $rootScope.goToClear = function() {
             
            $ionicLoading.show({
                template: 'Stay Along !<br><ion-spinner class="spinner-energized" icon="ripple"></ion-spinner>',
        //	    content: 'Loading Data',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 500
            });
             
         /*    $ionicLoading.show({
                        template : 'Stay Along !<br><i class="icon ion-loading-c" style="font-size: 3em;"></i>',
//                     animation : 'fade-in'
            });
        */
             // delete Formdata and load again
             app.formdata = new FormData();
             $timeout( function () {
                 GetEssentials.getEssentialParameters().then ( function ( a ) {
                       RemoteLoader.getRemoteData();
                });
             }, 200);
         }
         
         $rootScope.hideAlert = function( msgid ) {
             app.hiddenMsgid.push(msgid);
             $("#"+msgid).css("display","none");
         }
         
         $rootScope.showAction = function () {
             $ionicActionSheet.show({
                          titleText: 'Joobi',
                          buttons: [
                            {
                              text: 'Option 0'
                            },
                            {
                              text: 'Option 1'
                            },
                          ],
                          destructiveText: 'Destruct',
                          cancelText: 'Cancel',
                          cancel: function () {
//alert('CANCELLED');
                          },
                          buttonClicked: function (index) {
//alert('BUTTON CLICKED', index);
                            return true;
                          },
                          destructiveButtonClicked: function () {
//alert('DESTRUCT');
                            return true;
                          }
            });
         }
                              
        $rootScope.resetUrl = function () {
            Preferences.storePreference("appurl","",true);
            Preferences.storePreference("apikey","",true);
            $state.go('abstractmenu.displayurlpage');
        }
    }])

    .controller('timeoutCtrl', ['$rootScope','$timeout','$state','RemoteLoader', function ($rootScope, $timeout, $state, RemoteLoader ) {
        
        //disable menus !
        $rootScope.showMenu = false;
        
        //reload the page after 10 seconds
        $timeout( function () {
            RemoteLoader.getRemoteData();
        }, 10000)
    }])
    
    .controller('urlCtrl', ['$rootScope','$timeout','$state','RemoteLoader','Preferences','GetDeviceInformation','URL','APIKey','CheckConnection','$ionicLoading', function ( $rootScope, $timeout, $state, RemoteLoader, Preferences, GetDeviceInformation, URL, APIKey, CheckConnection, $ionicLoading ) {
        
        //disable menus !
        $rootScope.showMenu = false;
        
        $rootScope.submitUrl = function () {
            var temp = document.getElementById("appurltext").value;
            // Remove all spaces as it is a url
            temp = temp.replace(/\s/g,'');
        /*    if ( temp.search("http://") == -1 || temp.search("https://") == -1) {
                // http not added, we add it manually
                temp = "http://".concat(temp);
            }
        */
//alert("concated URL " + temp);
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
            // check if the url is valid
            URL.validatejURL(temp).then( function ( res ) {
//alert("validation url result " + res);
                if ( res == "noconnection" ) {
                    //The device is offline
                    CheckConnection.checkConnection().then( function ( a ) {
//console.log("connection " + a);
                    });
                }
                else if ( res != "error" ) {
                    Preferences.storePreference("appurl",temp, true);
                    // Give it sometime to store the preference ( IOS )
                    $timeout( function () {
                        Preferences.fetchPreference("appurl").then( function ( value ) {
//alert("appurl storing " + value);
                            // if value is fetched correctly then go to URL
                            if ( value != 'error' ) {
                                app.serverURL = value;
                                APIKey.checkAPIKey();
                            }
                            else {
                                app.serverURL = value;
                                // Url was not stored reload again
                            /*    var alertpopup = $ionicPopup.alert({
                                            title: 'Error',
                                            template: 'A Problem occured storing the URL ! <br> Please Restart and try again. '
                                });
                                alertpopup.then(function( result ) {});                         
                            */
                            }
                        });
                    }, 500);      
                }
                else {
                    // URL is not Valid
                    document.getElementById("appurltext").parentNode.classList.add('elementerr');
                    var tempErrField = '<div class="card" id="errUrl">';
                    tempErrField += '<div class="item item-divider" style="background-color:#ef4e3a"> Invalid URL </div>';
                    tempErrField += '<div class="item item-text-warp">You have entered an invalid URL, please enter a valid URL as follow ( http://www.mywebsite.com ) </div>';
                    tempErrField += '</div>'
                    $('#validateurl').html(tempErrField);
                }
            })
            $ionicLoading.hide();
        }
    }])