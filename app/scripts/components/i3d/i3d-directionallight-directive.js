"use strict";
angular.module('app').directive("i3dDirectionallight", ["Camera3d", "Transform3d", "Log", "colourToHex", function(Camera3d, Transform3d, Log, colourToHex) {
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
          dirX = parseFloat(attrs.directionx || '0.0'),
          dirY = parseFloat(attrs.directiony || '-1.0'),
          dirZ = parseFloat(attrs.directionz || '0.0'),
          color = attrs.color || '#ffffff',
          transform = JSON.parse(attrs.transform || '{}'),
          light;
      scope.p = {};
      scope.p.pid = id;
      if (!/^(#|0x)/.test(color)) {
        color = colourToHex(color);
      }
      light = new THREE.DirectionalLight(color);
      light.target.position.set(dirX, dirY, dirZ);
      Camera3d.addActorToScene(id, light, pid);
      Transform3d.apply(transform, light);
      elem.on("$destroy", function() {});
    }
  };
}]);

//# sourceMappingURL=../../components/i3d/i3d-directionallight-directive.js.map