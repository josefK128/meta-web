// * base-videocam-directive.js
// * displays the webcam on the base background html plane (z-index 0)
// * NOTE: can be used for augmented reality applications and, if embellished,
//   for shared layered worlds and webrtc media communications
//
// * @dependencies: none<br>
//   @param {services/mediator-service} Mediator<br>
//   @param {services/log-service} Log<br>
//   @ngInject
//
// * NOTE: ngInject is used by ngAnnotate to generate a 
//   minification-safe injection annotation such as:
//   ```function($scope) => ['$scope', function($scope){}]```


angular.module('app').directive("baseVideocam", function(Mediator, Log){
  "use strict";

  var log = Log.log;


  class Videocam {
    constructor(){
      this.id="videocam";
    }//ctor
  }


  // return DDO
  return {
    restrict: 'EA',
    scope: 'false',
    replace: 'false',
    templateNamespace: 'html',
    controller: Videocam,
    controllerAs: 'videocam',
    bindToController: true,
    link: (scope, elem, attrs, videocam) => {


      // root id from model
      videocam.id = attrs.id;                       
     
      // register component controller
      Mediator.component(videocam.id, videocam);

      // connect videocam<br>
      // Grab elements, create settings, etc.
      var video = document.getElementById("video"),
          videoObj = { "video": true },
          errBack = function(error) {
          };

      // diagnostics
  
      // Put video listeners into place
      if(navigator.getUserMedia) { // Standard
        navigator.getUserMedia(videoObj, function(stream) {
          video.src = stream;
          video.play();
        }, errBack);
      } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
        navigator.webkitGetUserMedia(videoObj, function(stream){
          video.src = window.URL.createObjectURL(stream);
          video.play();
        }, errBack);
      }
      else if(navigator.mozGetUserMedia) { // Firefox-prefixed
        navigator.mozGetUserMedia(videoObj, function(stream){
          video.src = window.URL.createObjectURL(stream);
          video.play();
        }, errBack);
      }
    }//link-f
  };//return DDO
});

