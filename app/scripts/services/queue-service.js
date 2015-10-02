"use strict";
angular.module('app').factory('Queue', function() {
  "use strict";
  var queue;
  var Queue = (function() {
    function Queue() {
      this.fifo = [];
      this.ready = true;
    }
    return ($traceurRuntime.createClass)(Queue, {
      push: function(s) {
        this.fifo.push(s);
      },
      pop: function() {
        return (this.fifo.length > 0 ? this.fifo.shift() : undefined);
      },
      peek: function() {
        return (this.fifo.length > 0 ? this.fifo[0] : undefined);
      }
    }, {});
  }());
  if (!queue) {
    queue = new Queue();
  }
  return queue;
});

//# sourceMappingURL=../services/queue-service.js.map