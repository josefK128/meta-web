"use strict";
angular.module('app').directive("i2dForm", ["$templateCache", function($templateCache) {
  "use strict";
  return {
    restrict: 'EA',
    scope: 'true',
    replace: 'false',
    templateUrl: function(elem, attrs) {
      return attrs.i2dTemplate;
    },
    templateNamespace: 'svg',
    link: function(scope, elem, attrs) {}
  };
}]);

//# sourceMappingURL=../../components/i2d/i2d-form-directive.js.map