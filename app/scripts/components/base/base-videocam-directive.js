"use strict";
angular.module('app').directive("baseVideocam", ["Mediator", "Log", function(Mediator, Log) {
  "use strict";
  var log = Log.log;
  var Videocam = (function() {
    function Videocam() {
      this.id = "videocam";
    }
    return ($traceurRuntime.createClass)(Videocam, {}, {});
  }());
  return {
    restrict: 'EA',
    scope: 'false',
    replace: 'false',
    templateNamespace: 'html',
    controller: Videocam,
    controllerAs: 'videocam',
    bindToController: true,
    link: (function(scope, elem, attrs, videocam) {
      videocam.id = attrs.id;
      Mediator.component(videocam.id, videocam);
      var video = document.getElementById("video"),
          videoObj = {"video": true},
          errBack = function(error) {};
      if (navigator.getUserMedia) {
        navigator.getUserMedia(videoObj, function(stream) {
          video.src = stream;
          video.play();
        }, errBack);
      } else if (navigator.webkitGetUserMedia) {
        navigator.webkitGetUserMedia(videoObj, function(stream) {
          video.src = window.URL.createObjectURL(stream);
          video.play();
        }, errBack);
      } else if (navigator.mozGetUserMedia) {
        navigator.mozGetUserMedia(videoObj, function(stream) {
          video.src = window.URL.createObjectURL(stream);
          video.play();
        }, errBack);
      }
    })
  };
}]);

//# sourceMappingURL=../../components/base/base-videocam-directive.js.map