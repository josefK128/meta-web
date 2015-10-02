"use strict";
angular.module('app').factory('Mediator', ["$rootScope", "$location", "Queue", "Camera3d", "Camera2d", "Models", "Mixin", "Transform3d", "Log", "config", function($rootScope, $location, Queue, Camera3d, Camera2d, Models, Mixin, Transform3d, Log, config) {
  'use strict';
  var mediator,
      log = Log.log,
      components = {},
      action,
      pr;
  var Mediator = (function() {
    function Mediator() {
      var $__0 = this;
      this.$rootScope = $rootScope;
      this.location = $location;
      this.mediator = this;
      this.queue = Queue;
      this.camera3d = Camera3d;
      this.camera2d = Camera2d;
      this.console = console;
      this.narrative = undefined;
      this.mixin = Mixin;
      this.transform3d = Transform3d;
      this.config = config;
      this.targets = ['mediator', 'narrative', 'camera3d', 'camera2d'];
      this.test_targets = ['mixin', 'transform3d'];
      this.record_stream = config.record_stream;
      console.assert(this.mediator, "this.mediator undefined!");
      console.assert(this.camera3d, "this.camera3d undefined!");
      console.assert(this.camera2d, "this.camera2d undefined!");
      console.assert(this.queue, "this.queue undefined!");
      console.assert(this.mixin, "this.mixin undefined!");
      console.assert(this.transform3d, "this.transform3d undefined!");
      Log.set_mediator(this);
      Camera3d.set_mediator(this);
      Camera2d.set_mediator(this);
      setInterval((function() {
        if (mediator.queue.ready) {
          $__0.next();
        } else {}
      }), 5000);
    }
    return ($traceurRuntime.createClass)(Mediator, {
      test: function(a) {
        if (Array.isArray(a)) {} else {}
      },
      connect: function() {
        var $__0 = this;
        var s_h = config.server_host,
            c_p = config.channels_port;
        this.socket = io.connect("http://" + s_h + ":" + c_p);
        this.socket.on('actions', (function(action) {
          $__0.queue.push(action);
        }));
      },
      emit: function(channel, msg) {
        if (config.channels_out.indexOf(channel) !== -1) {
          this.socket.emit(channel, msg);
        } else {
          return false;
        }
      },
      queue_ready_next: function() {
        mediator.queue.ready = true;
        mediator.next();
      },
      next: function() {
        action = mediator.queue.peek();
        if (action) {
          action = mediator.queue.pop();
          this.exec(action);
          if (this.record_stream) {
            this.socket.emit('actions', action);
          }
        }
      },
      component: function(id, cvm) {
        if (cvm === undefined) {
          return components[id];
        }
        if (id === 'narrative') {
          this.narrative = cvm;
        }
        if (components[id] === undefined) {
          components[id] = cvm;
          cvm.predecessor = null;
          cvm.enfants = [];
          this.mixin.include(cvm, {
            parent: function(p) {
              if (p) {
                cvm.predecessor = p;
              } else {
                return cvm.predecessor;
              }
            },
            children: function(child) {
              if (child) {
                cvm.enfants.push(child);
              } else {
                return cvm.enfants;
              }
            },
            broadcast: function(a) {
              var f = new (Function.prototype.bind.apply(Function, $traceurRuntime.spread([null], a)))();
              var g = function(node) {
                f(node);
                var $__5 = true;
                var $__6 = false;
                var $__7 = undefined;
                try {
                  for (var $__3 = void 0,
                      $__2 = (node.enfants)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__5 = ($__3 = $__2.next()).done); $__5 = true) {
                    var e = $__3.value;
                    {
                      g(e);
                    }
                  }
                } catch ($__8) {
                  $__6 = true;
                  $__7 = $__8;
                } finally {
                  try {
                    if (!$__5 && $__2.return != null) {
                      $__2.return();
                    }
                  } finally {
                    if ($__6) {
                      throw $__7;
                    }
                  }
                }
              };
            },
            emit: function(a) {
              var f = new (Function.prototype.bind.apply(Function, $traceurRuntime.spread([null], a)))();
              var g = function(node) {
                f(node);
                if (node.parent) {
                  g(node.predecessor);
                }
              };
            }
          });
        }
      },
      record: function(action) {
        this.socket.emit('actions', action);
      },
      exec: function(_action) {
        var tuple,
            actor,
            target,
            f,
            execute = (function(action) {
              if (action.id) {
                tuple = action.id.split(':');
                if (tuple.length === 1) {
                  actor = Camera3d.actor(action.id);
                } else {
                  if ((tuple[0] === 'i3d') || (tuple[0].length === 0)) {
                    actor = Camera3d.actor(tuple[1]);
                  } else {
                    if (tuple[1]) {
                      actor = document.getElementById(tuple[1]);
                    }
                  }
                }
                if (actor) {
                  if (config.unit_test) {
                    return actor;
                  } else {
                    target = actor;
                    f = actor[action.f];
                  }
                } else {
                  throw new Error(("Canera3d.actor(" + action.id + ") is not defined!"));
                }
              } else {
                console.assert(mediator[action.t], "mediator[action.t] UNDEFINED!");
                console.assert(mediator[action.t][action.f], "mediator[action.t][action.f] UNDEFINED!");
                if (mediator[action.t]) {
                  if (mediator[action.t][action.f]) {
                    target = mediator[action.t];
                    f = target[action.f];
                  } else {
                    throw new Error((action.t + "." + action.f + " is not defined!"));
                  }
                } else {
                  throw new Error(("action target mediator." + action.t + " not defined!"));
                }
              }
              if (f) {
                if (Array.isArray(action.a)) {
                  switch (action.a.length) {
                    case 1:
                      if (config.unit_test) {
                        return {a0: action.a[0]};
                      } else {
                        target[action.f](action.a[0]);
                      }
                      break;
                    case 2:
                      if (config.unit_test) {
                        return {
                          b0: action.a[0],
                          b1: action.a[1]
                        };
                      } else {
                        target[action.f](action.a[0], action.a[1]);
                      }
                      break;
                    case 3:
                      if (config.unit_test) {
                        return {
                          c0: action.a[0],
                          c1: action.a[1],
                          c2: action.a[2]
                        };
                      } else {
                        target[action.f](action.a[0], action.a[1], action.a[2]);
                      }
                      break;
                    case 4:
                      if (config.unit_test) {
                        return {
                          d0: action.a[0],
                          d1: action.a[1],
                          d2: action.a[2],
                          d3: action.a[3]
                        };
                      } else {
                        target[action.f](action.a[0], action.a[1], action.a[2], action.a[3]);
                      }
                      break;
                    default:
                      if (config.unit_test) {
                        return action.a;
                      } else {
                        target[action.f](action.a);
                      }
                      throw new Error("CAUTION: >4 args in array treated as one array!");
                  }
                } else {
                  if (config.unit_test) {
                    return action.a;
                  } else {
                    target[action.f](action.a);
                  }
                }
              } else {
                if (action.id) {
                  throw new Error(("actor(" + action.id + ")." + action.f + ") is not defined!"));
                } else {
                  throw new Error((action.t + "." + action.f + " is not defined!"));
                }
              }
            });
        if (Array.isArray(_action)) {
          var $__5 = true;
          var $__6 = false;
          var $__7 = undefined;
          try {
            for (var $__3 = void 0,
                $__2 = (_action)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__5 = ($__3 = $__2.next()).done); $__5 = true) {
              var a = $__3.value;
              {
                if (config.unit_test) {
                  return execute(a);
                } else {
                  execute(a);
                }
              }
            }
          } catch ($__8) {
            $__6 = true;
            $__7 = $__8;
          } finally {
            try {
              if (!$__5 && $__2.return != null) {
                $__2.return();
              }
            } finally {
              if ($__6) {
                throw $__7;
              }
            }
          }
        } else {
          if (!check.object(_action)) {
            console.log("!Mediator.emit(action - is NOT object)");
            Log.log({
              t: '!Mediator',
              f: 'emit',
              a: 'action - is NOT object'
            });
            return ;
          }
          if (config.unit_test) {
            return execute(_action);
          } else {
            if (_action.f && (_action.f !== 'queue_ready_next')) {
              Log.log(_action);
            }
            execute(_action);
          }
        }
      }
    }, {});
  }());
  if (!mediator) {
    mediator = new Mediator();
  }
  return mediator;
}]);

//# sourceMappingURL=../services/mediator-service.js.map