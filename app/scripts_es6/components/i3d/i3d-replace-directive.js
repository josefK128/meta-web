// * i3d-replace-directive.js
// * replace ngInclude nodes (which create scope) in i3d tree directives
//   to prevent reclamation of ngInclude-scope which destroys the DOM node
//
// * @dependencies: none<br>
//   @param none<br>
//   @ngInject
//
// * NOTE: ngInject is used by ngAnnotate to generate a 
//   minification-safe injection annotation such as:
//   ```function($scope) => ['$scope', function($scope){}]```


angular.module('app').directive("i3dReplace", function(){
  "use strict";


  // return DDO
  return {
    require: 'ngInclude',
    restrict: 'A',
    link: function(scope, elem, attrs){
      if(elem.children()){
        elem.replaceWith(elem.children());
      }else{
      }
    }//link-f
  };//return DDO
});

