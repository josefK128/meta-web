"use strict";
angular.module('app').factory('Keyframes', function() {
  "use strict";
  console.log("\nKeyframes service defined");
  var keyframes;
  var kfs = config.keyframes;
  var Keyframes = (function() {
    function Keyframes() {}
    return ($traceurRuntime.createClass)(Keyframes, {keyframe: function(name) {
        return kfs[name] || {};
      }}, {});
  }());
  if (!keyframes) {
    keyframes = new Keyframes();
  }
  return keyframes;
});

//# sourceMappingURL=../services/keyframes-service.js.map