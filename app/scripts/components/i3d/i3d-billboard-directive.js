"use strict";
angular.module('app').directive("i3dBillboard", ["Camera3d", "Transform3d", "Log", "colourToHex", function(Camera3d, Transform3d, Log, colourToHex) {
  "use strict";
  return {
    restrict: 'E',
    scope: 'true',
    replace: 'false',
    templateNamespace: 'svg',
    compile: function(elem, attrs) {
      var form,
          w,
          h,
          use_aspect,
          aspect,
          textureurl,
          color,
          opacity,
          transparent,
          wireframe,
          billboardGeometry,
          shaderMaterial,
          billboardMaterial,
          basic_material = (function() {
            billboardMaterial = new THREE.MeshBasicMaterial({
              color: color,
              transparent: transparent,
              opacity: opacity,
              wireframe: wireframe
            });
            billboardMaterial.depthTest = false;
            billboardMaterial.blending = THREE.CustomBlending;
            billboardMaterial.blendSrc = THREE.SrcAlphaFactor;
            billboardMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
            billboardMaterial.blendEquation = THREE.AddEquation;
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
            billboardMaterial = shaderMaterial;
          }),
          realize = (function(id, pid, transform) {
            var node = new THREE.Mesh(billboardGeometry, billboardMaterial);
            node.material.side = THREE.FrontSide;
            Camera3d.addBillboardToScene(id, node, pid);
            Transform3d.apply(transform, node);
          }),
          prelink = (function(scope, elem, attrs) {
            var id = attrs.id,
                p = scope.p || {},
                pid = p.pid,
                texture,
                transform = JSON.parse(attrs.transform || '{}');
            scope.p = {};
            scope.p.pid = id;
            form = JSON.parse(attrs.form) || {};
            w = form.w || 50.0;
            h = form.h || 50.0;
            use_aspect = (/true/i).test(form.aspect);
            aspect = window.innerWidth / window.innerHeight;
            color = form.color || 'green';
            wireframe = form.wireframe || false;
            textureurl = form.textureurl;
            transparent = form.transparent || true;
            opacity = form.opacity || 1.0;
            if (!/^(#|0x)/.test(color)) {
              color = colourToHex(color);
            }
            billboardGeometry = new THREE.BoxGeometry(w, h, 0.0);
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

//# sourceMappingURL=../../components/i3d/i3d-billboard-directive.js.map