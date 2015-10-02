// * i3d-axes-directive.js
// * creates three.js component registered with Camera3d and added to scene<br>
//   pass in params as attrs
//
// * @dependencies: Camera3d, Transform3d<br>
//   @param {services/camera3d-service.js} Camera3d<br>
//   @param {services/transform3d-service.js} Transform3d<br>
//   @param {services/log-service.js} Log<br>
//   @ngInject
//
// * NOTE: ngInject is used by ngAnnotate to generate a 
//   minification-safe injection annotation such as:
//   ```function($scope) => ['$scope', function($scope){}]```
// * NOTE: $destroy occurs when the angular jQuery wrapper is destroyed.
//   Thus the wrapper is removed from the DOM but not the 'raw' DOM element
//   nor, more importantly, the webgl node in the underlying webgl scenegraph


angular.module('app').directive("i3dAxes", function(Camera3d, Transform3d, Log){
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
          length = attrs.length || 3000.0,
          transform = JSON.parse(attrs.transform || '{}'),
          axes;


      // clear and set ```$scope.p.pid = id``` for children<br>
      scope.p = {};
      scope.p.pid = id;

      // create axes
      axes = new THREE.AxisHelper(parseFloat(length));

      // add the Object3d to the scene and store in Camera3d actors by id
      Camera3d.addActorToScene(id, axes, pid);

      // transform axes - relative to parent in THREE.js scene !!!
      Transform3d.apply(transform, axes);



      // cleanup
      elem.on("$destroy", function() {
        //Camera3d.removeActorFromScene(id);
        //scope = null;
      });
    }//link-f
  };//return DDO
});
