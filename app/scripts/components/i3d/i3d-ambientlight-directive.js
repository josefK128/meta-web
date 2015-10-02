"use strict";
angular.module('app').directive("i3dAmbientlight", ["Camera3d", "Transform3d", "Log", "colourToHex", function(Camera3d, Transform3d, Log, colourToHex) {
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
          color = attrs.color || '#ffffff',
          light;
      scope.p = {};
      scope.p.pid = id;
      if (!/^(#|0x)/.test(color)) {
        color = colourToHex(color);
      }
      light = new THREE.AmbientLight(color);
      Camera3d.addActorToScene(id, light, pid);
      elem.on("$destroy", function() {});
    }
  };
}]);

//# sourceMappingURL=../../components/i3d/i3d-ambientlight-directive.js.map