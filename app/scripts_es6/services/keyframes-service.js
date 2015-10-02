// * keyframes-service.js
// * access base-defs stylesheet of css named animation keyframes
//
// * @dependencies: config<br>
//   @param {created in index.html initialization script} config<br>
//   @ngInject
//
// * NOTE: ngInject is used by ngAnnotate to generate a 
//   minification-safe injection annotation such as:
//   ```function($scope) => ['$scope', function($scope){}]```


angular.module('app').factory('Keyframes', function(){
  "use strict";
  console.log("\nKeyframes service defined");

  var keyframes;
  var kfs = config.keyframes;


  class Keyframes {
    constructor(){}

    keyframe(name){
      return kfs[name] || {};
    }
  }


  // return factory object<br>
  // (redundant) maintenance of Singleton
  if(!keyframes){
    keyframes = new Keyframes();  // create Keyframes singleton instance once
  }
  return keyframes;         // return Keyframes singleton instance
});
