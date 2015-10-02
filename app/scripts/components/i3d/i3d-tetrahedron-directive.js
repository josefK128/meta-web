"use strict";
angular.module('app').directive("i3dTetrahedron", ["Camera3d", "Transform3d", "Log", "colourToHex", function(Camera3d, Transform3d, Log, colourToHex) {
  "use strict";
  return {
    restrict: 'E',
    scope: 'true',
    replace: 'false',
    templateNamespace: 'svg',
    compile: function(elem, attrs) {
      var form,
          radius,
          detail,
          textureurl,
          color,
          opacity,
          transparent,
          wireframe,
          tetrahedronGeometry,
          shaderMaterial,
          tetrahedronMaterial,
          basic_material = (function() {
            tetrahedronMaterial = new THREE.MeshBasicMaterial({
              color: color,
              transparent: transparent,
              opacity: opacity,
              wireframe: wireframe
            });
            tetrahedronMaterial.depthTest = false;
            tetrahedronMaterial.blending = THREE.CustomBlending;
            tetrahedronMaterial.blendSrc = THREE.SrcAlphaFactor;
            tetrahedronMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
            tetrahedronMaterial.blendEquation = THREE.AddEquation;
          }),
          texture_material = (function(texture) {
            texture.magFilter = THREE.LinearFilter;
            texture.minFilter = THREE.LinearMipMapLinearFilter;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            shaderMaterial = new THREE.ShaderMaterial({
              uniforms: {
                color: {
                  type: 'f',
                  value: 1.0
                },
                map: {
                  type: 't',
                  value: texture
                }
              },
              vertexShader: document.getElementById("vsh.glsl").text,
              fragmentShader: document.getElementById("fsh.glsl").text,
              transparent: true
            });
            shaderMaterial.blendSrc = THREE.SrcAlphaFactor;
            shaderMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
            shaderMaterial.blendEquation = THREE.AddEquation;
            tetrahedronMaterial = shaderMaterial;
          }),
          realize = (function(id, pid, transform) {
            var node = new THREE.Mesh(tetrahedronGeometry, tetrahedronMaterial);
            node.material.side = THREE.DoubleSide;
            Camera3d.addActorToScene(id, node, pid);
            Transform3d.apply(transform, node);
          }),
          prelink = (function(scope, elem, attrs) {
            var id = attrs.id,
                p = scope.p || {},
                pid = p.pid,
                texture,
                transform;
            scope.p = {};
            scope.p.pid = id;
            form = JSON.parse(attrs.form) || {};
            radius = form.r || 1.0;
            detail = form.detail || 0.0;
            color = form.color || 'green';
            wireframe = form.wireframe || false;
            textureurl = form.textureurl;
            transparent = form.transparent || true;
            opacity = form.opacity || 1.0;
            transform = JSON.parse(attrs.transform || '{}');
            if (!/^(#|0x)/.test(color)) {
              color = colourToHex(color);
            }
            tetrahedronGeometry = new THREE.TetrahedronGeometry(radius, detail);
            if (textureurl) {
              if (/(_png|_jpg|_gif|_bmp)/.test(textureurl)) {
                if (textureurl) {
                  texture_material(window[textureurl]);
                } else {
                  basic_material();
                }
                realize(id, pid, transform);
              } else {
                texture = THREE.ImageUtils.loadTexture(textureurl, THREE.UVMapping, function() {
                  texture_material(texture);
                  realize(id, pid, transform);
                }, null, function() {
                  basic_material();
                  realize(id, pid, transform);
                });
              }
            } else {
              basic_material();
              realize(id, pid, transform);
            }
            elem.on("$destroy", function() {});
          }),
          postlink = (function(scope, elem, attrs) {});
      return {
        pre: prelink,
        post: postlink
      };
    }
  };
}]);

//# sourceMappingURL=../../components/i3d/i3d-tetrahedron-directive.js.map