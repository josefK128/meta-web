// * i2d-form-directive.js
// * simple means to associate an svg template with an i2d-form.<br>
//   Simply pass in a templateUrl as directive attribute 'form'
//
// * @dependencies: $templatecache<br>
//   @param {angular.$templateCache} $templateCache<br>
//   @ngInject
//
// * NOTE: ngInject is used by ngAnnotate to generate a 
//   minification-safe injection annotation such as:
//   ```function($scope) => ['$scope', function($scope){}]```


angular.module('app').directive("i2dForm", function($templateCache){
  "use strict";


  // return DDO
  return {
    restrict: 'EA',
    scope: 'true',
    replace: 'false', // default and deprecated in >=1.3
    templateUrl: function(elem, attrs){
      return attrs.i2dTemplate;
    },
    templateNamespace: 'svg',
    link: function(scope, elem, attrs){
    }//link-f
  };//return DDO
});

