angular.module("starter.directives", ['ionic'])

 .directive('watchMenu', function($rootScope, $state, $timeout, $ionicSideMenuDelegate, $ionicScrollDelegate, $ionicLoading ) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      // Run in the next scope digest
      $timeout(function() {
        // Watch for changes to the openRatio which is a value between 0 and 1 that says how "open" the side menu is
       
        $scope.$watch(function() { 
          return $ionicSideMenuDelegate.getOpenRatio();
        }, 
          function(ratio) {
            $scope.data=ratio;
            if( ratio == 1) {
//console.log("menu open");
                app.positionleft = $ionicScrollDelegate.getScrollPosition().left;
                app.positiontop = $ionicScrollDelegate.getScrollPosition().top;
                
               $timeout( function () {
                    $state.go("abstractmenu.menu_0", null, { location: true });
               },30);
//console.log("after menu 0");                
            } else if ( ratio == 0 ) {
//console.log("menu close");                
    //            $ionicLoading.show({
    //                    template : 'Stay Along !<br><i class="icon ion-loading-c" style="font-size: 3em;"></i>',
    //                    animation : 'fade-in'
    //            });
                if (typeof navigator.app !== 'undefined' && window.plugin ) {
                    navigator.app.clearHistory();
                }
            
                $state.go("abstractmenu.page", null, { location : false });     
                
                $timeout( function () {
                    if ( app.hiddenMsgid !== undefined ) {
                        app.hiddenMsgid.forEach(function( element, key) {
                            var tempElement = "#"+element;
console.log("closing " + tempElement);
                        //    $("#"+element).css("background-color","black");
                            $(tempElement).css("display", "none");
                        //    $(tempElement).css("display","none");
                        //    $("#"+element).addClass("viral");
                        //    $("#"+element).hide();
console.log("closed " + element);
                        });
                    }
                        
                    $ionicScrollDelegate.$getByHandle('pagescroll').scrollTo(app.positionleft, app.positiontop, false);
                },500); 
               /* 
                $timeout( function () {
                    if( app.subheader ) {
                        $("#maincontent").removeClass("has-header");
                        $("#maincontent").addClass("has-subheader");
                    }
                },30);
                */
        //        $ionicLoading.hide();
                
            }

          });
      });
    }
  };
})

/*
.directive('peeyLevelIonSlides', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            scope.$watch (
                function () {
                    var activeSlideElement = angular.element(element[0].getElementsByClassName(attrs.slideChildClass+"-active"));
                    //constantly remove max height from current element to allow it to expand if required
                    activeSlideElement.css("max-height","none");
//console.log("max height none");
                    //if activeSlideElement[0] is undefined, it means that it probably hasn't loaded yet
                    return angular.isDefined(activeSlideElement[0])? activeSlideElement[0].offsetHeight : 20 ;
                },
                function (newHeight, oldHeight) {
                    var sildeElements = angular.element(element[0].getElementsByClassName(attrs.slideChildClass));
                    sildeElements.css("max-height",newHeight+"px");
                }
            );
        }
    }
})
*/