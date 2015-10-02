"use strict";
angular.module('app').directive("i3dCube", ["Camera3d", "Transform3d", "Log", "colourToHex", function(Camera3d, Transform3d, Log, colourToHex) {
  "use strict";
  return {
    restrict: 'E',
    scope: true,
    replace: false,
    templateNamespace: 'svg',
    compile: function(elem, attrs) {
      var form,
          w,
          h,
          d,
          textureurl,
          color,
          opacity,
          transparent,
          wireframe,
          cubeGeometry,
          shaderMaterial,
          cubeMaterial,
          basic_material = (function() {
            cubeMaterial = new THREE.MeshBasicMaterial({
              color: color,
              transparent: transparent,
              opacity: opacity,
              wireframe: wireframe
            });
            cubeMaterial.depthTest = false;
            cubeMaterial.blending = THREE.CustomBlending;
            cubeMaterial.blendSrc = THREE.SrcAlphaFactor;
            cubeMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
            cubeMaterial.blendEquation = THREE.AddEquation;
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
            cubeMaterial = shaderMaterial;
          }),
          realize = (function(id, pid, transform) {
            var node = new THREE.Mesh(cubeGeometry, cubeMaterial);
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
            w = form.w || 5.0;
            h = form.h || 5.0;
            d = form.d || 5.0;
            color = form.color || 'green';
            wireframe = form.wireframe || false;
            textureurl = form.textureurl;
            transparent = form.transparent || true;
            opacity = form.opacity || 1.0;
            transform = JSON.parse(attrs.transform || '{}');
            if (!/^(#|0x)/.test(color)) {
              color = colourToHex(color);
            }
            cubeGeometry = new THREE.BoxGeometry(w, h, d);
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

//# sourceMappingURL=../../components/i3d/i3d-cube-directive.js.map