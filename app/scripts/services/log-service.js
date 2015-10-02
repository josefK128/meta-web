"use strict";
angular.module('app').factory('Log', ["config", function(config) {
  "use strict";
  var log,
      mediator;
  var Log = (function() {
    function Log() {}
    return ($traceurRuntime.createClass)(Log, {
      log: function(action) {
        if (config.log) {
          mediator.emit('log', action);
        }
      },
      set_mediator: function(o) {
        mediator = o;
      }
    }, {});
  }());
  if (!log) {
    log = new Log();
  }
  return log;
}]);

//# sourceMappingURL=../services/log-service.js.map