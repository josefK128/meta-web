"use strict";
angular.module('app').directive("i3dForm", ["$templateCache", function($templateCache) {
  "use strict";
  return {
    restrict: 'EA',
    scope: 'true',
    replace: 'false',
    templateUrl: function(elem, attrs) {
      return attrs.i3dTemplate;
    },
    templateNamespace: 'svg',
    link: function(scope, elem, attrs) {
      elem.on("$destroy", function() {});
    }
  };
}]);

//# sourceMappingURL=../../components/i3d/i3d-form-directive.js.map