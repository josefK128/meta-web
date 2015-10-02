"use strict";
angular.module('app').directive("i3dPointlight", ["Camera3d", "Transform3d", "Log", "colourToHex", function(Camera3d, Transform3d, Log, colourToHex) {
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
          intensity = parseFloat(attrs.intensity || '1.0'),
          distance = parseFloat(attrs.distance || '0.0'),
          transform = JSON.parse(attrs.transform || '{}'),
          light;
      scope.p = {};
      scope.p.pid = id;
      if (!/^(#|0x)/.test(color)) {
        color = colourToHex(color);
      }
      light = new THREE.PointLight(color);
      light.intensity = intensity;
      light.distance = distance;
      Camera3d.addActorToScene(id, light, pid);
      Transform3d.apply(transform, light);
      elem.on("$destroy", function() {});
    }
  };
}]);

//# sourceMappingURL=../../components/i3d/i3d-pointlight-directive.js.map