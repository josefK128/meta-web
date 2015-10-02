"use strict";
angular.module('app').directive("i3dCamerasphere", ["Camera3d", "Transform3d", "Log", "colourToHex", function(Camera3d, Transform3d, Log, colourToHex) {
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
          form,
          radius,
          visible,
          color,
          wireframe,
          transparent,
          opacity,
          transform,
          sphereGeometry,
          sphereMaterial,
          csphere;
      scope.p = {};
      scope.p.pid = id;
      form = JSON.parse(attrs.form || '{}');
      radius = form.r || 50.0;
      visible = form.visible;
      color = form.color || 'green';
      wireframe = form.wireframe || false;
      transparent = form.transparent || true;
      opacity = form.opacity || 1.0;
      transform = JSON.parse(attrs.transform || '{}');
      if (!/^(#|0x)/.test(color)) {
        color = colourToHex(color);
      }
      visible = (/true/i).test(visible);
      transparent = (/true/i).test(transparent);
      wireframe = (/true/i).test(wireframe);
      sphereGeometry = new THREE.SphereGeometry(radius);
      sphereMaterial = new THREE.MeshBasicMaterial({
        visible: visible,
        transparent: transparent,
        opacity: opacity,
        wireframe: wireframe,
        color: color
      });
      csphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      csphere.material.side = THREE.DoubleSide;
      csphere.position.x = 0.0;
      csphere.position.y = 0.0;
      csphere.position.z = 0.0;
      Camera3d.attachAsSurfaceChild(csphere, radius);
      Camera3d.addActorToScene(id, csphere, pid);
      Transform3d.apply(transform, csphere);
      elem.on("$destroy", function() {});
    }
  };
}]);

//# sourceMappingURL=../../components/i3d/i3d-camerasphere-directive.js.map