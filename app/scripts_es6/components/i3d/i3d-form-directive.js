// * i3d-form-directive.js
// * simple means to associate an i3d-svg template with an i3d-form
// * pass in templateUrl as directive attribute
//
// * @dependencies: $templatecache
//   @param {angular.$templateCache} $templateCache
//   @ngInject
//
// * NOTE: ngInject is used by ngAnnotate to generate a 
//   minification-safe injection annotation such as:
//   ```function($scope) => ['$scope', function($scope){}]```
//
// * NOTE: directives only use is to specify a template for insertion
//   This minimizes declarative syntax


angular.module('app').directive("i3dForm", function($templateCache){
  "use strict";


  // return DDO
  return {
    restrict: 'EA',
    scope: 'true',
    replace: 'false', // default and deprecated in >=1.3
    templateUrl: function(elem, attrs){
      return attrs.i3dTemplate;
    },
    templateNamespace: 'svg',
    link: function(scope, elem, attrs){



      // vars<br>
      // NOTE - maybe use later to give starting location for node offsets<br>
      //var x = attrs.x || 0.0;<br>
      //var y = attrs.y || 0.0;<br>
      //var z = attrs.z || 0.0;


      // cleanup
      elem.on("$destroy", function() {
        //scope = null;
      });
    }//link-f
  };//return DDO
});

