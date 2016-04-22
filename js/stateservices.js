/* For each state we need
    1. position -- tabs. 'item' 
    2. url -- / 'item'
    3. template -- templates/ 'item'.html
    4. view name -- 'item'-tab
    5. controller -- action handler
    
    Example $stateProvider.state('position', {
                                    url : 'url',
                                    views : {
                                        templateUrl : 'template',
                                        controller : 'controller'
                                    }
                })
*/

angular.module("State.Services", [] )

    .factory('createstates' , [ '$rootScope','$state' , function ($rootScope, $state) {
        
        //create a state
        var createState = function (oneMenu) {
console.log("creating state " + oneMenu); 

            var stateConfig = {};
            stateConfig.url = '/' + oneMenu;
            stateConfig.cache = false;
            stateConfig.views = {};

/*        
                stateConfig.views['baseView'] = {};
                stateConfig.views['baseView'].templateUrl = 'templates/pageView.html';
*/
   
            stateConfig.views['sideMenu'] = {};
            stateConfig.views['sideMenu'].templateUrl = 'templates/' + oneMenu + '.html';
            var position = 'abstractmenu.' + oneMenu;
//console.log("config " + JSON.stringify(stateConfig));         
            // save the name of the current state
            app.currentMenuStates.push(oneMenu);  
            app.stateProvider.state(position, stateConfig);
            
            $rootScope.$broadcast("stateCreated", {
                "state"         : oneMenu,
                "parentstate"   : "viral"
            });
        }
        
        //create menu states
        var createMenu = function () {
            // get stateinfo array from rootscope or scope
            var menus = app.menus ;
            var menuflag = true;
            angular.forEach(menus , function(oneMenu) {
                var tempstatevar = app.currentMenuStates
                        for(var i=0; i < tempstatevar.length; i++ ) {
//console.log("menu name " + tempstatevar[i] + " == " + oneMenu );
                            if ( tempstatevar[i].toString() == oneMenu.toString() ) {
                                menuflag = false;
                            }
                        }
                if ( menuflag ) createState(oneMenu);
            })
            
            app.isMenuLoaded = true ;
            
        }
        return {
            createState : createState,
            createMenu : createMenu
        }  
    }])