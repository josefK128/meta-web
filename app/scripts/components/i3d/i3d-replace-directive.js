"use strict";
angular.module('app').directive("i3dReplace", function() {
  "use strict";
  return {
    require: 'ngInclude',
    restrict: 'A',
    link: function(scope, elem, attrs) {
      if (elem.children()) {
        elem.replaceWith(elem.children());
      } else {}
    }
  };
});

//# sourceMappingURL=../../components/i3d/i3d-replace-directive.js.map