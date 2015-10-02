"use strict";
angular.module('app').directive("i3dMetaform", ["Mediator", "Camera3d", function(Mediator, Camera3d) {
  "use strict";
  var Metaform = (function() {
    function Metaform() {
      this.id = "";
    }
    return ($traceurRuntime.createClass)(Metaform, {}, {});
  }());
  return {
    restrict: 'E',
    scope: 'false',
    replace: 'false',
    templateNamespace: 'svg',
    controller: Metaform,
    controllerAs: 'metaform',
    bindToController: true,
    link: function(scope, elem, attrs, metaform) {
      metaform.id = attrs.id;
      metaform.pid = attrs.pid;
      scope.p = {};
      scope.p.pid = metaform.pid;
      Mediator.component(metaform.id, metaform);
    }
  };
}]);

//# sourceMappingURL=../../components/i3d/i3d-metaform-directive.js.map