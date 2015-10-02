"use strict";
angular.module('app').directive("i3dSphere", ["Camera3d", "Transform3d", "Log", "colourToHex", function(Camera3d, Transform3d, Log, colourToHex) {
  "use strict";
  return {
    restrict: 'E',
    scope: 'true',
    replace: 'false',
    templateNamespace: 'svg',
    compile: function(elem, attrs) {
      var form,
          radius,
          wsegments,
          hsegments,
          textureurl,
          color,
          opacity,
          transparent,
          wireframe,
          emissive_color,
          phong,
          specular_color,
          shininess,
          sphereGeometry,
          shaderMaterial,
          sphereMaterial,
          basic_material = (function() {
            if (phong) {
              sphereMaterial = new THREE.MeshPhongMaterial({
                color: color,
                wireframe: wireframe,
                emissive: emissive_color,
                specular: specular_color,
                shininess: shininess,
                shading: true,
                fog: true
              });
            } else {
              sphereMaterial = new THREE.MeshBasicMaterial({
                color: color,
                wireframe: wireframe
              });
            }
            sphereMaterial.transparent = transparent;
            sphereMaterial.opacity = opacity;
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
            sphereMaterial = shaderMaterial;
          }),
          realize = (function(id, pid, transform) {
            var node = new THREE.Mesh(sphereGeometry, sphereMaterial);
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
            radius = form.r || 5.0;
            wsegments = form.wsegments || 8.0;
            hsegments = form.hsegments || 9.0;
            color = form.color || 'green';
            wireframe = form.wireframe || false;
            textureurl = form.textureurl;
            transparent = form.transparent || true;
            opacity = form.opacity || 1.0;
            phong = form.phong || false;
            specular_color = form.specular_color || color;
            shininess = form.shininess || 30.0;
            emissive_color = form.emissive_color || 0x000000;
            transform = JSON.parse(attrs.transform || '{}');
            if (!/^(#|0x)/.test(color)) {
              color = colourToHex(color);
            }
            sphereGeometry = new THREE.SphereGeometry(radius, wsegments, hsegments);
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

//# sourceMappingURL=../../components/i3d/i3d-sphere-directive.js.map