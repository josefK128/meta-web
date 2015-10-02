"use strict";
angular.module('app').service('Camera2d', ["config", "Log", "TweenMax", "TimelineMax", function(config, Log, TweenMax, TimelineMax) {
  "use strict";
  var camera2d,
      mediator,
      narrative,
      record_shots = config.record_shots,
      log = Log.log;
  var Camera2d = (function() {
    function Camera2d() {
      this.scope = undefined;
      this.tl = {};
      this.tlp = {};
      this.shot = {};
      this.action = {};
      this.plane = undefined;
      this.x = 0.0;
      this.y = 0.0;
      this.zoom_plane = undefined;
      this.angle = 0.0;
      this.scale = 1.0;
      window.addEventListener("keyup", function(e) {
        var a;
        switch (e.keyCode) {
          case 82:
            a = {d: 3};
            if (e.shiftKey) {
              camera2d.home(a);
              log({
                t: 'camera2d',
                f: 'home',
                a: a
              });
              if (record_shots) {
                mediator.record({
                  t: 'camera2d',
                  f: 'home',
                  a: a
                });
              }
            } else {
              camera2d.center(a);
              log({
                t: 'camera2d',
                f: 'center',
                a: a
              });
              if (record_shots) {
                mediator.record({
                  t: 'camera2d',
                  f: 'center',
                  a: a
                });
              }
            }
            break;
          case 90:
            if (e.altKey) {
              if (e.shiftKey) {
                a = {
                  s: 2.0,
                  d: 3
                };
                camera2d.zoomflyTo(a);
                log({
                  t: 'camera2d',
                  f: 'zoomflyTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'zoomflyTo',
                    a: a
                  });
                }
              } else {
                a = {
                  s: 1.1111,
                  d: 3
                };
                camera2d.zoomflyBy(a);
                log({
                  t: 'camera2d',
                  f: 'zoomflyBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'zoomflyBy',
                    a: a
                  });
                }
              }
            } else {
              if (e.shiftKey) {
                a = {s: 2.0};
                camera2d.zoomcutTo(a);
                log({
                  t: 'camera2d',
                  f: 'zoomcutTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'zoomcutTo',
                    a: a
                  });
                }
              } else {
                a = {s: 1.1111};
                camera2d.zoomcutBy(a);
                log({
                  t: 'camera2d',
                  f: 'zoomcutBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'zoomcutBy',
                    a: a
                  });
                }
              }
            }
            break;
          case 88:
            if (e.altKey) {
              if (e.shiftKey) {
                a = {
                  s: 0.5,
                  d: 3
                };
                camera2d.zoomflyTo(a);
                log({
                  t: 'camera2d',
                  f: 'zoomflyTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'zoomflyTo',
                    a: a
                  });
                }
              } else {
                a = {
                  s: 0.9,
                  d: 3
                };
                camera2d.zoomflyBy(a);
                log({
                  t: 'camera2d',
                  f: 'zoomflyBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'zoomflyBy',
                    a: a
                  });
                }
              }
            } else {
              if (e.shiftKey) {
                a = {s: 0.5};
                camera2d.zoomcutTo(a);
                log({
                  t: 'camera2d',
                  f: 'zoomcutTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'zoomcutTo',
                    a: a
                  });
                }
              } else {
                a = {s: 0.9};
                camera2d.zoomcutBy(a);
                log({
                  t: 'camera2d',
                  f: 'zoomcutBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'zoomcutBy',
                    a: a
                  });
                }
              }
            }
            break;
          case 67:
            if (e.altKey) {
              if (e.shiftKey) {
                a = {
                  r: -90,
                  d: 3
                };
                camera2d.rollflyTo(a);
                log({
                  t: 'camera2d',
                  f: 'rollflyTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'rollflyTo',
                    a: a
                  });
                }
              } else {
                a = {
                  r: -22.5,
                  d: 3
                };
                camera2d.rollflyBy(a);
                log({
                  t: 'camera2d',
                  f: 'rollflyBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'rollflyBy',
                    a: a
                  });
                }
              }
            } else {
              if (e.shiftKey) {
                a = {r: -90};
                camera2d.rollcutTo(a);
                log({
                  t: 'camera2d',
                  f: 'rollcutTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'rollcutTo',
                    a: a
                  });
                }
              } else {
                a = {r: -22.5};
                camera2d.rollcutBy(a);
                log({
                  t: 'camera2d',
                  f: 'rollcutBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'rollcutBy',
                    a: a
                  });
                }
              }
            }
            break;
          case 86:
            if (e.altKey) {
              if (e.shiftKey) {
                a = {
                  r: 90,
                  d: 3
                };
                camera2d.rollflyTo(a);
                log({
                  t: 'camera2d',
                  f: 'rollflyTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'rollflyTo',
                    a: a
                  });
                }
              } else {
                a = {
                  r: 22.5,
                  d: 3
                };
                camera2d.rollflyBy(a);
                log({
                  t: 'camera2d',
                  f: 'rollflyBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'rollflyBy',
                    a: a
                  });
                }
              }
            } else {
              if (e.shiftKey) {
                a = {r: 90};
                camera2d.rollcutTo(a);
                log({
                  t: 'camera2d',
                  f: 'rollcutTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'rollcutTo',
                    a: a
                  });
                }
              } else {
                a = {r: 22.5};
                camera2d.rollcutBy(a);
                log({
                  t: 'camera2d',
                  f: 'rollcutBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'rollcutBy',
                    a: a
                  });
                }
              }
            }
            break;
          case 81:
            if (e.altKey) {
              if (e.shiftKey) {
                a = {
                  x: 20,
                  d: 3
                };
                camera2d.dollyflyTo(a);
                log({
                  t: 'camera2d',
                  f: 'dollyflyTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'dollyflyTo',
                    a: a
                  });
                }
              } else {
                a = {
                  x: 10,
                  d: 3
                };
                camera2d.dollyflyBy(a);
                log({
                  t: 'camera2d',
                  f: 'dollyflyBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'dollyflyBy',
                    a: a
                  });
                }
              }
            } else {
              if (e.shiftKey) {
                a = {x: 20};
                camera2d.dollycutTo(a);
                log({
                  t: 'camera2d',
                  f: 'dollycutTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'dollycutTo',
                    a: a
                  });
                }
              } else {
                a = {x: 10};
                camera2d.dollycutBy(a);
                log({
                  t: 'camera2d',
                  f: 'dollycutBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'dollycutBy',
                    a: a
                  });
                }
              }
            }
            break;
          case 87:
            if (e.altKey) {
              if (e.shiftKey) {
                a = {
                  x: -20,
                  d: 3
                };
                camera2d.dollyflyTo(a);
                log({
                  t: 'camera2d',
                  f: 'dollyflyTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'dollyflyTo',
                    a: a
                  });
                }
              } else {
                a = {
                  x: -10,
                  d: 3
                };
                camera2d.dollyflyBy(a);
                log({
                  t: 'camera2d',
                  f: 'dollyflyBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'dollyflyBy',
                    a: a
                  });
                }
              }
            } else {
              if (e.shiftKey) {
                a = {x: -20};
                camera2d.dollycutTo(a);
                log({
                  t: 'camera2d',
                  f: 'dollyCutTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'dollycutTo',
                    a: a
                  });
                }
              } else {
                a = {x: -10};
                camera2d.dollycutBy(a);
                log({
                  t: 'camera2d',
                  f: 'dollyCutBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'dollycutBy',
                    a: a
                  });
                }
              }
            }
            break;
          case 89:
            if (e.altKey) {
              if (e.shiftKey) {
                a = {
                  y: 20,
                  d: 3
                };
                camera2d.dollyflyTo(a);
                log({
                  t: 'camera2d',
                  f: 'dollyflyTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'dollyflyTo',
                    a: a
                  });
                }
              } else {
                a = {
                  y: 10,
                  d: 3
                };
                camera2d.dollyflyBy(a);
                log({
                  t: 'camera2d',
                  f: 'dollyflyBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'dollyflyBy',
                    a: a
                  });
                }
              }
            } else {
              if (e.shiftKey) {
                a = {y: 20};
                camera2d.dollycutTo(a);
                log({
                  t: 'camera2d',
                  f: 'dollycutTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'dollycutTo',
                    a: a
                  });
                }
              } else {
                a = {y: 10};
                camera2d.dollycutBy(a);
                log({
                  t: 'camera2d',
                  f: 'dollycutBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'dollycutBy',
                    a: a
                  });
                }
              }
            }
            break;
          case 85:
            if (e.altKey) {
              if (e.shiftKey) {
                a = {
                  y: -20,
                  d: 3
                };
                camera2d.dollyflyTo(a);
                log({
                  t: 'camera2d',
                  f: 'dollyflyTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'dollyflyTo',
                    a: a
                  });
                }
              } else {
                a = {
                  y: -10,
                  d: 3
                };
                camera2d.dollyflyBy(a);
                log({
                  t: 'camera2d',
                  f: 'dollyflyBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'dollyflyBy',
                    a: a
                  });
                }
              }
            } else {
              if (e.shiftKey) {
                a = {y: -20};
                camera2d.dollycutTo(a);
                log({
                  t: 'camera2d',
                  f: 'dollycutTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'dollycutTo',
                    a: a
                  });
                }
              } else {
                a = {y: -10};
                camera2d.dollycutBy(a);
                log({
                  t: 'camera2d',
                  f: 'dollycutBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera2d',
                    f: 'dollycutBy',
                    a: a
                  });
                }
              }
            }
            break;
          case 57:
            camera2d.bezier();
            log({
              t: 'camera2d',
              f: 'bezier',
              a: {d: 10}
            });
            if (record_shots) {
              mediator.record({
                t: 'camera2d',
                f: 'bezier',
                a: {d: 10}
              });
            }
            break;
          default:
        }
      });
    }
    return ($traceurRuntime.createClass)(Camera2d, {
      test: function(a, b, c) {},
      place: function(scope) {
        this.scope = scope;
        this.plane = document.getElementById("plane");
        this.zoom_plane = document.getElementById("zoom_plane");
        console.assert(this.scope, 'error setting scope!');
        console.assert(this.plane, 'error setting plane!');
        console.assert(this.zoom_plane, 'error setting zoom_plane!');
      },
      set_narrative: function(o) {
        narrative = o;
      },
      set_mediator: function(o) {
        mediator = o;
      },
      actor: function(id) {
        return document.getElementById(id);
      },
      center: function(a) {
        a.d = a.d || 0.0;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {
                'i2d:plane': [{
                  dur: a.d,
                  p: {
                    'x': 0.0,
                    'y': 0.0,
                    immediateRender: false
                  }
                }],
                'i2d:zoom_plane': [{
                  dur: a.d,
                  p: {
                    'rotation': 0.0,
                    svgOrigin: '0% 0%',
                    immediateRender: false
                  }
                }]
              }
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      home: function(a) {
        a.d = a.d || 0.0;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {
                'i2d:plane': [{
                  dur: a.d,
                  p: {
                    'x': 0.0,
                    'y': 0.0,
                    immediateRender: false
                  }
                }],
                'i2d:zoom_plane': [{
                  dur: a.d,
                  p: {
                    rotation: 0.0,
                    scale: 1.0,
                    svgOrigin: '0% 0%',
                    immediateRender: false
                  }
                }]
              }
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      zoomcutTo: function(a) {
        if (a.s !== undefined) {
          this.scale = a.s;
        }
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0,
                tweens: []
              },
              actors: {'i2d:zoom_plane': [{
                  dur: 0,
                  p: {
                    'scale': this.scale,
                    svgOrigin: '0% 0%',
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      zoomcutBy: function(a) {
        if (a.s !== undefined) {
          this.scale *= a.s;
        }
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0,
                tweens: []
              },
              actors: {'i2d:zoom_plane': [{
                  dur: 0,
                  p: {
                    'scale': this.scale,
                    svgOrigin: '0% 0%',
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      zoomflyTo: function(a) {
        if (a.s !== undefined) {
          this.scale = a.s;
        }
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0,
                tweens: []
              },
              actors: {'i2d:zoom_plane': [{
                  dur: a.d,
                  p: {
                    'scale': this.scale,
                    svgOrigin: '0% 0%',
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      zoomflyBy: function(a) {
        if (a.s !== undefined) {
          this.scale *= a.s;
        }
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0,
                tweens: []
              },
              actors: {'i2d:zoom_plane': [{
                  dur: a.d,
                  p: {
                    'scale': this.scale,
                    svgOrigin: '0% 0%',
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      rollcutTo: function(a) {
        if (a.r !== undefined) {
          this.angle = a.r;
        }
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0,
                tweens: []
              },
              actors: {'i2d:zoom_plane': [{
                  dur: 0,
                  p: {
                    'rotation': this.angle,
                    svgOrigin: '0% 0%',
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      rollcutBy: function(a) {
        if (a.r !== undefined) {
          this.angle += a.r;
        }
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0,
                tweens: []
              },
              actors: {'i2d:zoom_plane': [{
                  dur: 0,
                  p: {
                    'rotation': this.angle,
                    svgOrigin: '0% 0%',
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      rollflyTo: function(a) {
        if (a.r !== undefined) {
          this.angle = a.r;
        }
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0,
                tweens: []
              },
              actors: {'i2d:zoom_plane': [{
                  dur: a.d,
                  p: {
                    'rotation': this.angle,
                    svgOrigin: '0% 0%',
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      rollflyBy: function(a) {
        if (a.r !== undefined) {
          this.angle += a.r;
        }
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0,
                tweens: []
              },
              actors: {'i2d:zoom_plane': [{
                  dur: a.d,
                  p: {
                    'rotation': this.angle,
                    svgOrigin: '0% 0%',
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      dollycutTo: function(a) {
        if (a.x !== undefined) {
          this.x = a.x;
        }
        if (a.y !== undefined) {
          this.y = a.y;
        }
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0,
                tweens: []
              },
              actors: {'i2d:plane': [{
                  dur: 0,
                  p: {
                    'x': this.x,
                    'y': -this.y,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      dollycutBy: function(a) {
        if (a.x !== undefined) {
          this.x += a.x;
        }
        if (a.y !== undefined) {
          this.y += a.y;
        }
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0,
                tweens: []
              },
              actors: {'i2d:plane': [{
                  dur: 0,
                  p: {
                    'x': this.x,
                    'y': -this.y,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      dollyflyTo: function(a) {
        if (a.x !== undefined) {
          this.x = a.x;
        }
        if (a.y !== undefined) {
          this.y = a.y;
        }
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0,
                tweens: []
              },
              actors: {'i2d:plane': [{
                  dur: a.d,
                  p: {
                    'x': this.x,
                    'y': -this.y,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      dollyflyBy: function(a) {
        if (a.x !== undefined) {
          this.x += a.x;
        }
        if (a.y !== undefined) {
          this.y += a.y;
        }
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0,
                tweens: []
              },
              actors: {'i2d:plane': [{
                  dur: a.d,
                  p: {
                    'x': this.x,
                    'y': -this.y,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      bezier: function() {
        var a = arguments[0] !== (void 0) ? arguments[0] : {
          d: 10,
          n: 6
        };
        var i,
            x = [],
            y = [],
            v = [],
            bezier;
        x[0] = 0.0;
        y[0] = 0.0;
        if (Math.random() > 0.5) {
          x[1] = 30.0 * Math.random();
          y[1] = -30.0 * Math.random();
          x[2] = -30.0 * Math.random();
          y[2] = -30.0 * Math.random();
          x[3] = -30.0 * Math.random();
          y[3] = 30.0 * Math.random();
          x[4] = 30.0 * Math.random();
          y[4] = 30.0 * Math.random();
        } else {
          x[1] = -30.0 * Math.random();
          y[1] = 30.0 * Math.random();
          x[2] = -30.0 * Math.random();
          y[2] = -30.0 * Math.random();
          x[3] = 30.0 * Math.random();
          y[3] = -30.0 * Math.random();
          x[4] = 30.0 * Math.random();
          y[4] = 30.0 * Math.random();
        }
        x[5] = 0.0;
        y[5] = 0.0;
        for (i = 0; i < a.n; i++) {
          v.push({
            x: x[i],
            y: y[i]
          });
        }
        bezier = {bezier: {
            autoRotate: true,
            curviness: 2,
            values: v,
            immediateRender: false
          }};
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0,
                tweens: []
              },
              actors: {'i2d:c': [{
                  dur: a.d,
                  p: bezier
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      }
    }, {});
  }());
  if (!camera2d) {
    camera2d = new Camera2d();
  }
  return camera2d;
}]);

//# sourceMappingURL=../services/camera2d-service.js.map