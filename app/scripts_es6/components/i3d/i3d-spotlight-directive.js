// * i3d-spotlight-directive.js
// * creates three.js component registered with Camera3d and added to scene<br>
//   pass in params as attrs
//
// * @dependencies: Camera3d, Transform3d
//   @param {services/camera3d-service.js} Camera3d
//   @param {services/transform3d-service.js} Transform3d
//   @param {services/log-service.js} Log
//   @param {utils/colourToHex.js} colourToHex
//   @ngInject
//
// * NOTE: ngInject is used by ngAnnotate to generate a 
//   minification-safe injection annotation such as:
//   ```function($scope) => ['$scope', function($scope){}]```
// * NOTE: $destroy occurs when the angular jQuery wrapper is destroyed.
//   Thus the wrapper is removed from the DOM but not the 'raw' DOM element
//   nor, more importantly, the webgl node in the underlying webgl scenegraph


angular.module('app').directive("i3dSpotlight", 
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
          color = attrs.color || '#ffffff',
          intensity = parseFloat(attrs.intensity || '1.0'),
          distance = parseFloat(attrs.distance || '0.0'),
          angle = parseFloat(attrs.angle || '1.047197551'), // PI/3
          exponential = parseFloat(attrs.exponential || '10.0'), 
          targetx = parseFloat(attrs.targetx || '0.0'),
          targety = parseFloat(attrs.targety || '0.0'),
          targetz = parseFloat(attrs.targetz || '0.0'),
          castShadow = (/true/i).test(attrs.castShadow || 'false'), // s->bool
          shadowCameraNear = parseFloat(attrs.shadowCameraNear || '50.0'), 
          shadowCameraFar = parseFloat(attrs.shadowCameraFar || '5000.0'), 
          shadowCameraFOV = parseFloat(attrs.shadowCameraFOV || '50.0'), 
          shadowBias = parseFloat(attrs.shadowBias || '0.0'), 
          shadowDarkness = parseFloat(attrs.shadowDarkness || '0.5'), 
          shadowMapWidth = parseFloat(attrs.shadowMapWidth || '512'), 
          shadowMapHeight = parseFloat(attrs.shadowMapHeight || '512'), 
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

      // light, direction, angle, shadow
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



      // add the Object3D to the scene and store in Camera3d actors by id
      Camera3d.addActorToScene(id, light, pid);

      // transform light - relative to parent in THREE.js scene !!!
      Transform3d.apply(transform, light);

      // target
      light.target.position.set(targetx,targety,targetz);
      //light.lookAt(Camera3d.actor['scene'].position); // just in case



      // cleanup
      elem.on("$destroy", function() {
        //Camera3d.removeActorFromScene(id);
        //scope = null;
      });
    }//link-f
  };//return DDO
});

