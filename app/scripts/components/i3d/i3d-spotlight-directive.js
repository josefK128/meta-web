"use strict";
angular.module('app').directive("i3dSpotlight", ["Camera3d", "Transform3d", "Log", "colourToHex", function(Camera3d, Transform3d, Log, colourToHex) {
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
          angle = parseFloat(attrs.angle || '1.047197551'),
          exponential = parseFloat(attrs.exponential || '10.0'),
          targetx = parseFloat(attrs.targetx || '0.0'),
          targety = parseFloat(attrs.targety || '0.0'),
          targetz = parseFloat(attrs.targetz || '0.0'),
          castShadow = (/true/i).test(attrs.castShadow || 'false'),
          shadowCameraNear = parseFloat(attrs.shadowCameraNear || '50.0'),
          shadowCameraFar = parseFloat(attrs.shadowCameraFar || '5000.0'),
          shadowCameraFOV = parseFloat(attrs.shadowCameraFOV || '50.0'),
          shadowBias = parseFloat(attrs.shadowBias || '0.0'),
          shadowDarkness = parseFloat(attrs.shadowDarkness || '0.5'),
          shadowMapWidth = parseFloat(attrs.shadowMapWidth || '512'),
          shadowMapHeight = parseFloat(attrs.shadowMapHeight || '512'),
          transform = JSON.parse(attrs.transform || '{}'),
          light;
      scope.p = {};
      scope.p.pid = id;
      if (!/^(#|0x)/.test(color)) {
        color = colourToHex(color);
      }
      light = new THREE.SpotLight(color);
      light.intensity = intensity;
      light.distance = distance;
      light.angle = angle;
      light.exponential = exponential;
      light.castShadow = castShadow;
      light.shadowCameraNear = shadowCameraNear;
      light.shadowCameraFar = shadowCameraFar;
      light.shadowCameraFOV = shadowCameraFOV;
      light.shadowBias = shadowBias;
      light.shadowDarkness = shadowDarkness;
      light.shadowMapWidth = shadowMapWidth;
      light.shadowMapHeight = shadowMapHeight;
      Camera3d.addActorToScene(id, light, pid);
      Transform3d.apply(transform, light);
      light.target.position.set(targetx, targety, targetz);
      elem.on("$destroy", function() {});
    }
  };
}]);

//# sourceMappingURL=../../components/i3d/i3d-spotlight-directive.js.map