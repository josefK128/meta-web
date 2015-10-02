// * i3d-metaform-directive.js
// * initiates the creation of a three.js component tree from JSON model<br>
//   individual nodes are managed by their specific directives<br>
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
// * NOTE: may be used maintain tree of metaform DOM nodes indexed abstractly
//   by level and child index<br>
//   exp: '0_1_0' is the zeroth child of the first child of root<br>
//   delimiter is underscore - level is 2 (root-0, next 1, leaf 2)
// * NOTE: in present form not used for anything essential, but could
//   be useful in future - exp. root for DOM tree manipulations


angular.module('app').directive("i3dMetaform", function(Mediator, Camera3d){
  "use strict";


  class Metaform {
    constructor(){
      this.id = "";
    }
  }


  // return DDO
  return {
    restrict: 'E',
    scope: 'false',
    replace: 'false',
    templateNamespace: 'svg',
    controller: Metaform,
    controllerAs: 'metaform',
    bindToController: true,
    link: function(scope, elem, attrs, metaform){



      // root id from model
      metaform.id = attrs.id;                       
      metaform.pid = attrs.pid;
      scope.p = {};
      scope.p.pid = metaform.pid;

      // register component controller
      Mediator.component(metaform.id, metaform); 

    }//link-f
  };//return DDO
});

