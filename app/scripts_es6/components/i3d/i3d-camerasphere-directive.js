// * i3d-camerasphere-directive.js
// * creates three.js component registered with Camera3d and added to scene
//   pass in params as attrs
//
// * @dependencies: Camera3d, Transform3d<br>
//   @param {services/camera3d-service.js} Camera3d<br>
//   @param {services/transform3d-service.js} Transform3d<br>
//   @param {services/log-service.js} Log<br>
//   @param {utils/colourToHex.js} colourToHex<br>
//   @ngInject
//
// * NOTE: ngInject is used by ngAnnotate to generate a 
//   minification-safe injection annotation such as:
//   ```function($scope) => ['$scope', function($scope){}]```
//
// * NOTE: csphere has no parent in scenegraph (other than 'root') so
//   local csphere.matrix === csphere.matrixWorld (world) and
//   csphere.matrixUpdate = true so csphere.matrix (=csphere.matrixWorld)
//   is updated for every transform of csphere.
// * NOTE: $destroy occurs when the angular jQuery wrapper is destroyed.
//   Thus the wrapper is removed from the DOM but not the 'raw' DOM element
//   nor, more importantly, the webgl node in the underlying webgl scenegraph


angular.module('app').directive("i3dCamerasphere", function(Camera3d,
  Transform3d, Log, colourToHex){
  "use strict";


  // return DDO
  return {
    restrict: 'E',
    scope: 'true',
    replace: 'false',
    templateNamespace: 'svg',
    link: function(scope, elem, attrs){



      // diagnostics
      //for(let p of Object.keys(attrs)){
      //}

      // vars
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


      // clear and set $scope.p.pid = id for subsequent children<br>
      // $scope.p is a different object for each level 
      scope.p = {};
      scope.p.pid = id;


      // evaluations/defaults
      form = JSON.parse(attrs.form || '{}');
      radius = form.r || 50.0;
      visible = form.visible;
      color = form.color || 'green';
      wireframe = form.wireframe || false;
      transparent = form.transparent || true;
      opacity = form.opacity || 1.0;
      transform = JSON.parse(attrs.transform || '{}');


      // convert color name to hex for use in three.js material
      if(!/^(#|0x)/.test(color)){
        color = colourToHex(color);
      }


      // attrs.i3d:~ are all strings!<br>
      // strings do NOT work as boolean values in Material - convert to b!
      visible = (/true/i).test(visible);
      transparent = (/true/i).test(transparent);
      wireframe = (/true/i).test(wireframe);

      // create sphere geometry
      // [1] SphereGeometry(radius, widthSegments, heightSegments, 
      //   phiStart, phiLength, thetaStart, thetaLength)
      //   defaults: wS=8 (min=3), hS=9 (min=2), phiS=0, phiL=2PI, tS=0, tL=PI)
      sphereGeometry = new THREE.SphereGeometry(radius);

      // [2] MeshBasicMaterial
      sphereMaterial = new THREE.MeshBasicMaterial({
        visible: visible, 
        transparent: transparent,
        opacity: opacity,
        wireframe: wireframe, 
        color: color});


      // mesh
      csphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      csphere.material.side = THREE.DoubleSide;  // default=FrontSide
      
      // position the camera-sphere - can alter bt non-trivial transform
      csphere.position.x = 0.0;
      csphere.position.y = 0.0;
      csphere.position.z = 0.0;

      // attach Camera3d.camera as child of csphere and set its
      // position on the surface of csphere in the positive-z direction
      // from the center of csphere.position (i.e at radius distance
      // in the positive-z direction). Thus:<br>
      // Camera3d.camera.position.x = csphere.position.x<br>
      // Camera3d.camera.position.y = csphere.position.y<br>
      // Camera3d.camera.position.z = csphere.position.z + radius<br>
      // Finally: Camera3d.camera.lookAt(csphere.position) - center of csphere
      Camera3d.attachAsSurfaceChild(csphere, radius);
  
      // add the Object3d to the scene and store in Camera3d actors by id
      Camera3d.addActorToScene(id, csphere, pid);
  
      // transform cube - relative to parent in THREE.js scene !!!
      Transform3d.apply(transform, csphere);


      // cleanup
      elem.on("$destroy", function() {
        //Camera3d.removeActorFromScene(id);
        //scope = null;
      });
    }//link-f
  };//return DDO
});

