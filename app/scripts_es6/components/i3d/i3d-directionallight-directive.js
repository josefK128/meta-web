// * i3d-directionallight-directive.js
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
// * NOTE: $destroy occurs when the angular jQuery wrapper is destroyed.
//   Thus the wrapper is removed from the DOM but not the 'raw' DOM element
//   nor, more importantly, the webgl node in the underlying webgl scenegraph


angular.module('app').directive("i3dDirectionallight", 
  function(Camera3d, Transform3d, Log, colourToHex){
  "use strict";


  // return DDO
  return {
    restrict: 'E',
    scope: 'true',
    replace: 'false',
    templateNamespace: 'svg',
    link: function(scope, elem, attrs){



      // vars
      var id = attrs.id,
          p = scope.p || {},
          pid = p.pid,
          dirX = parseFloat(attrs.directionx || '0.0'),
          dirY = parseFloat(attrs.directiony || '-1.0'),
          dirZ = parseFloat(attrs.directionz || '0.0'),
          color = attrs.color || '#ffffff',
          transform = JSON.parse(attrs.transform || '{}'),
          light;


      // clear and set $scope.p.pid = id for subsequent children<br>
      // $scope.p is a different object for each level 
      scope.p = {};
      scope.p.pid = id;

      // convert color name to hex for use in three.js material
      if(!/^(#|0x)/.test(color)){
        color = colourToHex(color);
      }

      // light and direction
      light = new THREE.DirectionalLight(color);
      light.target.position.set(dirX, dirY, dirZ);


      // add the Object3D to the scene and store in Camera3d actors by id
      Camera3d.addActorToScene(id, light, pid);

      // transform light - relative to parent in THREE.js scene !!!
      Transform3d.apply(transform, light);



      // cleanup
      elem.on("$destroy", function() {
        //Camera3d.removeActorFromScene(id);
        //scope = null;
      });
    }//link-f
  };//return DDO
});

