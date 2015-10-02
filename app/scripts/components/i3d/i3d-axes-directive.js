"use strict";
angular.module('app').directive("i3dAxes", ["Camera3d", "Transform3d", "Log", function(Camera3d, Transform3d, Log) {
  "use strict";
  return {
    restrict: 'E',
    scope: 'true',
    replace: 'false',
    templateNamespace: 'svg',
    link: function(scope, elem, attrs) {
      var id = attrs.id,
          p = scope.p || {},
          pid = p.pid,
          length = attrs.length || 3000.0,
          transform = JSON.parse(attrs.transform || '{}'),
          axes;
      scope.p = {};
      scope.p.pid = id;
      axes = new THREE.AxisHelper(parseFloat(length));
      Camera3d.addActorToScene(id, axes, pid);
      Transform3d.apply(transform, axes);
      elem.on("$destroy", function() {});
    }
  };
}]);

//# sourceMappingURL=../../components/i3d/i3d-axes-directive.js.map