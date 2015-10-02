"use strict";
angular.module('app').service('Camera3d', ["$rootScope", "$timeout", "Log", "config", "TweenMax", "TimelineMax", "Quad", function($rootScope, $timeout, Log, config, TweenMax, TimelineMax, Quad) {
  "use strict";
  var camera3d,
      mediator,
      narrative,
      record_shots = config.record_shots,
      log = Log.log;
  var canvas;
  var gl;
  var camera;
  var csphere;
  var renderer;
  var clearColor;
  var alpha;
  var aspect;
  var fov = 90.0;
  var radius = 50.0;
  var zoom = 1.0;
  var roll = 0.0;
  var pan = 0.0;
  var tilt = 0.0;
  var yaw = 0.0;
  var pitch = 0.0;
  var scene;
  var prev_scene;
  var billboardsFace = false;
  var billboardsTarget = new THREE.Vector3();
  var billboards = {};
  var actors = {};
  var stats = null;
  var x_axis = new THREE.Vector3(1.0, 0.0, 0.0);
  var y_axis = new THREE.Vector3(0.0, 1.0, 0.0);
  var csphere_matrix = new THREE.Matrix4();
  var matrix = new THREE.Matrix4();
  var matrixa = new THREE.Matrix4();
  var matrixb = new THREE.Matrix4();
  var matrixc = new THREE.Matrix4();
  var matrixz = new THREE.Matrix4();
  var rotation_matrix;
  var report_matrix = false;
  var report_camera_world = function(report_matrix) {
    var cam_wp = new THREE.Vector3(),
        key_wp = new THREE.Vector3(),
        fill_wp = new THREE.Vector3(),
        cam_up,
        i;
    cam_wp.setFromMatrixPosition(camera.matrixWorld);
    cam_up = csphere.localToWorld(camera.up);
  };
  var report_camera = function(report_matrix) {
    var i;
    console.log("camera.fov is: " + camera.fov);
    console.log("camera.position is: ");
    console.log("x = " + camera.position.x);
    console.log("y = " + camera.position.y);
    console.log("z = " + camera.position.z);
    console.log("camera.rotation is: ");
    console.log("x = " + camera.rotation.x);
    console.log("y = " + camera.rotation.y);
    console.log("z = " + camera.rotation.z);
    console.log("camera.rotation._order is: " + camera.rotation._order);
    console.log("camera.up is: ");
    console.log("x = " + camera.up.x);
    console.log("y = " + camera.up.y);
    console.log("z = " + camera.up.z);
    if (report_matrix) {
      console.log("camera.matrix (in column-order): ");
      for (i = 0; i < camera.matrix.elements.length; i++) {
        console.log("camera.matrix.e[" + i + "] = " + camera.matrix.elements[i]);
      }
    }
  };
  var examine_matrix = function(m) {
    for (var i = 0; i < 16; i++) {
      console.log("m[" + i + "] = " + m[i]);
    }
    var t = new THREE.Vector3();
    var q = new THREE.Quaternion();
    var s = new THREE.Vector3();
    m.decompose(t, q, s);
  };
  var onWindowResize = function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
  };
  var render = function() {
    if (billboardsFace) {
      billboardsTarget.addVectors(csphere.position, camera.position);
      billboardsTarget.z *= zoom;
      Object.keys(billboards).forEach(function(id) {
        billboards[id].lookAt(billboardsTarget);
      });
    }
    if (stats) {
      stats.update();
    }
    renderer.render(scene, camera);
  };
  var Camera3d = (function() {
    function Camera3d() {
      this.scope = undefined;
      this.fov = fov;
      this.tl = {};
      this.tlp = {};
      this.shot = {};
      this.action = {};
      $(window).load(function() {
        stats = (function() {
          var stats = new Stats();
          stats.setMode(0);
          $("#stats").html(stats.domElement);
          return stats;
        })();
      });
      window.addEventListener("keyup", function(e) {
        var a;
        switch (e.keyCode) {
          case 77:
            a = {d: 3};
            if (e.shiftKey) {
              camera3d.home(a);
              log({
                t: 'camera3d',
                f: 'home',
                a: a
              });
              if (record_shots) {
                mediator.record({
                  t: 'camera3d',
                  f: 'home',
                  a: a
                });
              }
            } else {
              camera3d.center(a);
              log({
                t: 'camera3d',
                f: 'center',
                a: a
              });
              if (record_shots) {
                mediator.record({
                  t: 'camera3d',
                  f: 'center',
                  a: a
                });
              }
            }
            break;
          case 76:
            if (e.altKey) {
              if (e.shiftKey) {
                camera3d.billboardsFree();
                log({
                  t: 'camera3d',
                  f: 'billboardsFree'
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'billboardsFree'
                  });
                }
              } else {
                camera3d.billboardsFaceCamera();
                log({
                  t: 'camera3d',
                  f: 'billboardsFaceCamera'
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'billboardsFaceCamera'
                  });
                }
              }
            } else {
              if (e.shiftKey) {
                camera.lookAt([0.0, 0.0, 0.0]);
                log({
                  t: 'camera3d',
                  f: 'lookAt',
                  a: [0.0, 0.0, 0.0]
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'lookAt',
                    a: [0.0, 0.0, 0.0]
                  });
                }
              } else {
                camera3d.lookAt();
                log({
                  t: 'camera3d',
                  f: 'lookAt'
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'lookAt'
                  });
                }
              }
            }
            break;
          case 65:
            if (e.altKey) {
              if (e.shiftKey) {
                a = {
                  s: 0.5,
                  d: 3
                };
                camera3d.zoomflyTo(a);
                log({
                  t: 'camera3d',
                  f: 'zoomflyTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'zoomflyTo',
                    a: a
                  });
                }
              } else {
                a = {
                  s: 0.9,
                  d: 3
                };
                camera3d.zoomflyBy(a);
                log({
                  t: 'camera3d',
                  f: 'zoomflyBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'zoomflyBy',
                    a: a
                  });
                }
              }
            } else {
              if (e.shiftKey) {
                a = {s: 0.5};
                camera3d.zoomcutTo(a);
                log({
                  t: 'camera3d',
                  f: 'zoomcutTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'zoomcutTo',
                    a: a
                  });
                }
              } else {
                a = {s: 0.9};
                camera3d.zoomcutBy(a);
                log({
                  t: 'camera3d',
                  f: 'zoomcutBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'zoomcutBy',
                    a: a
                  });
                }
              }
            }
            break;
          case 83:
            if (e.altKey) {
              if (e.shiftKey) {
                a = {
                  s: 2.0,
                  d: 3
                };
                camera3d.zoomflyTo(a);
                log({
                  t: 'camera3d',
                  f: 'zoomflyTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'zoomflyTo',
                    a: a
                  });
                }
              } else {
                a = {
                  s: 1.1111,
                  d: 3
                };
                camera3d.zoomflyBy(a);
                log({
                  t: 'camera3d',
                  f: 'zoomflyBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'zoomflyBy',
                    a: a
                  });
                }
              }
            } else {
              if (e.shiftKey) {
                a = {s: 2.0};
                camera3d.zoomcutTo(a);
                log({
                  t: 'camera3d',
                  f: 'zoomcutTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'zoomcutTo',
                    a: a
                  });
                }
              } else {
                a = {s: 1.1111};
                camera3d.zoomcutBy(a);
                log({
                  t: 'camera3d',
                  f: 'zoomcutBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'zoomcutBy',
                    a: a
                  });
                }
              }
            }
            break;
          case 66:
            if (e.altKey) {
              if (e.shiftKey) {
                a = {
                  r: -1.57,
                  d: 3
                };
                log({
                  t: 'camera3d',
                  f: 'rollflyTo',
                  a: a
                });
                camera3d.rollflyTo(a);
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'rollflyTo',
                    a: a
                  });
                }
              } else {
                a = {
                  r: -0.3927,
                  d: 3
                };
                camera3d.rollflyBy(a);
                log({
                  t: 'camera3d',
                  f: 'rollflyBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'rollflyBy',
                    a: a
                  });
                }
              }
            } else {
              if (e.shiftKey) {
                a = {r: -1.57};
                camera3d.rollcutTo(a);
                log({
                  t: 'camera3d',
                  f: 'rollcutTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'rollcutTo',
                    a: a
                  });
                }
              } else {
                a = {r: -0.3927};
                camera3d.rollcutBy(a);
                log({
                  t: 'camera3d',
                  f: 'rollcutBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'rollcutBy',
                    a: a
                  });
                }
              }
            }
            break;
          case 78:
            if (e.altKey) {
              if (e.shiftKey) {
                a = {
                  r: 1.57,
                  d: 3
                };
                camera3d.rollflyTo(a);
                log({
                  t: 'camera3d',
                  f: 'rollflyTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'rollflyTo',
                    a: a
                  });
                }
              } else {
                camera3d.rollflyBy(a);
                log({
                  t: 'camera3d',
                  f: 'rollflyBy',
                  a: a
                });
                a = {
                  r: 0.3927,
                  d: 3
                };
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'rollflyBy',
                    a: a
                  });
                }
              }
            } else {
              if (e.shiftKey) {
                a = {r: 1.57};
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'rollcutTo',
                    a: a
                  });
                }
                camera3d.rollcutTo(a);
              } else {
                a = {r: 0.3927};
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'rollcutBy',
                    a: a
                  });
                }
                camera3d.rollcutBy(a);
              }
            }
            break;
          case 37:
            if (e.shiftKey) {
              a = {
                r: 0.7854,
                d: 3
              };
              camera3d.panflyTo(a);
              log({
                t: 'camera3d',
                f: 'panflyTo',
                a: a
              });
              if (record_shots) {
                mediator.record({
                  t: 'camera3d',
                  f: 'panflyTo',
                  a: a
                });
              }
            } else {
              a = {
                r: 0.19635,
                d: 3
              };
              camera3d.panflyBy(a);
              log({
                t: 'camera3d',
                f: 'panflyBy',
                a: a
              });
              if (record_shots) {
                mediator.record({
                  t: 'camera3d',
                  f: 'panflyBy',
                  a: a
                });
              }
            }
            break;
          case 39:
            if (e.shiftKey) {
              a = {
                r: -0.7854,
                d: 3
              };
              camera3d.panflyTo(a);
              log({
                t: 'camera3d',
                f: 'panflyTo',
                a: a
              });
              if (record_shots) {
                mediator.record({
                  t: 'camera3d',
                  f: 'panflyTo',
                  a: a
                });
              }
            } else {
              a = {
                r: -0.19635,
                d: 3
              };
              camera3d.panflyBy(a);
              log({
                t: 'camera3d',
                f: 'panflyBy',
                a: a
              });
              if (record_shots) {
                mediator.record({
                  t: 'camera3d',
                  f: 'panflyBy',
                  a: a
                });
              }
            }
            break;
          case 38:
            if (e.shiftKey) {
              a = {
                r: 0.7854,
                d: 3
              };
              camera3d.tiltflyTo(a);
              log({
                t: 'camera3d',
                f: 'tiltflyTo',
                a: a
              });
              if (record_shots) {
                mediator.record({
                  t: 'camera3d',
                  f: 'tiltflyTo',
                  a: a
                });
              }
            } else {
              a = {
                r: 0.19635,
                d: 3
              };
              camera3d.tiltflyBy(a);
              log({
                t: 'camera3d',
                f: 'tiltflyBy',
                a: a
              });
              if (record_shots) {
                mediator.record({
                  t: 'camera3d',
                  f: 'tiltflyBy',
                  a: a
                });
              }
            }
            break;
          case 40:
            if (e.shiftKey) {
              a = {
                r: -0.7854,
                d: 3
              };
              camera3d.tiltflyTo(a);
              log({
                t: 'camera3d',
                f: 'tiltflyTo',
                a: a
              });
              if (record_shots) {
                mediator.record({
                  t: 'camera3d',
                  f: 'tiltflyTo',
                  a: a
                });
              }
            } else {
              a = {
                r: -0.19635,
                d: 3
              };
              camera3d.tiltflyBy(a);
              log({
                t: 'camera3d',
                f: 'tiltflyBy',
                a: a
              });
              if (record_shots) {
                mediator.record({
                  t: 'camera3d',
                  f: 'tiltflyBy',
                  a: a
                });
              }
            }
            break;
          case 71:
            if (e.altKey) {
              if (e.shiftKey) {
                a = {
                  r: -1.57,
                  d: 3
                };
                camera3d.yawflyTo(a);
                log({
                  t: 'camera3d',
                  f: 'yawflyTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'yawflyTo',
                    a: a
                  });
                }
              } else {
                a = {
                  r: -0.3927,
                  d: 3
                };
                camera3d.yawflyBy(a);
                log({
                  t: 'camera3d',
                  f: 'yawflyBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'yawflyBy',
                    a: a
                  });
                }
              }
            } else {
              if (e.shiftKey) {
                a = {r: -1.57};
                camera3d.yawcutTo(a);
                log({
                  t: 'camera3d',
                  f: 'yawcutTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'yawcutTo',
                    a: a
                  });
                }
              } else {
                a = {r: -0.3927};
                camera3d.yawcutBy(a);
                log({
                  t: 'camera3d',
                  f: 'yawcutBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'yawcutBy',
                    a: a
                  });
                }
              }
            }
            break;
          case 72:
            if (e.altKey) {
              if (e.shiftKey) {
                a = {
                  r: 1.57,
                  d: 3
                };
                camera3d.yawflyTo(a);
                log({
                  t: 'camera3d',
                  f: 'yawflyTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'yawflyTo',
                    a: a
                  });
                }
              } else {
                a = {
                  r: 0.3927,
                  d: 3
                };
                camera3d.yawflyBy(a);
                log({
                  t: 'camera3d',
                  f: 'yawflyBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'yawflyBy',
                    a: a
                  });
                }
              }
            } else {
              if (e.shiftKey) {
                a = {r: 1.57};
                camera3d.yawcutTo(a);
                log({
                  t: 'camera3d',
                  f: 'yawcutTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'yawcutTo',
                    a: a
                  });
                }
              } else {
                a = {r: 0.3927};
                camera3d.yawcutBy(a);
                log({
                  t: 'camera3d',
                  f: 'yawcutBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'yawcutBy',
                    a: a
                  });
                }
              }
            }
            break;
          case 74:
            if (e.altKey) {
              if (e.shiftKey) {
                a = {
                  r: -1.57,
                  d: 3
                };
                camera3d.pitchflyTo(a);
                log({
                  t: 'camera3d',
                  f: 'pitchflyTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'pitchflyTo',
                    a: a
                  });
                }
              } else {
                a = {
                  r: -0.3927,
                  d: 3
                };
                camera3d.pitchflyBy(a);
                log({
                  t: 'camera3d',
                  f: 'pitchflyBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'pitchflyBy',
                    a: a
                  });
                }
              }
            } else {
              if (e.shiftKey) {
                a = {r: -1.57};
                camera3d.pitchcutTo(a);
                log({
                  t: 'camera3d',
                  f: 'pitchcutTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'pitchcutTo',
                    a: a
                  });
                }
              } else {
                a = {r: -0.3927};
                camera3d.pitchcutBy(a);
                log({
                  t: 'camera3d',
                  f: 'pitchcutBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'pitchcutBy',
                    a: a
                  });
                }
              }
            }
            break;
          case 75:
            if (e.altKey) {
              if (e.shiftKey) {
                a = {
                  r: 1.57,
                  d: 3
                };
                camera3d.pitchflyTo(a);
                log({
                  t: 'camera3d',
                  f: 'pitchflyTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'pitchflyTo',
                    a: a
                  });
                }
              } else {
                a = {
                  r: 0.3927,
                  d: 3
                };
                camera3d.pitchflyBy(a);
                log({
                  t: 'camera3d',
                  f: 'pitchflyBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'pitchflyBy',
                    a: a
                  });
                }
              }
            } else {
              if (e.shiftKey) {
                a = {r: 1.57};
                camera3d.pitchcutTo(a);
                log({
                  t: 'camera3d',
                  f: 'pitchcutTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'pitchcutTo',
                    a: a
                  });
                }
              } else {
                a = {r: 0.3927};
                camera3d.pitchcutBy(a);
                log({
                  t: 'camera3d',
                  f: 'pitchcutBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'pitchcutBy',
                    a: a
                  });
                }
              }
            }
            break;
          case 49:
            if (e.altKey) {
              if (e.shiftKey) {
                a = {
                  x: 20,
                  d: 3
                };
                camera3d.dollyflyTo(a);
                log({
                  t: 'camera3d',
                  f: 'dollyflyTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollyflyTo',
                    a: a
                  });
                }
              } else {
                a = {
                  x: 10,
                  d: 3
                };
                camera3d.dollyflyBy(a);
                log({
                  t: 'camera3d',
                  f: 'dollyflyBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollyflyBy',
                    a: a
                  });
                }
              }
            } else {
              if (e.shiftKey) {
                a = {x: 20};
                camera3d.dollycutTo(a);
                log({
                  t: 'camera3d',
                  f: 'dollycutTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollycutTo',
                    a: a
                  });
                }
              } else {
                a = {x: 10};
                camera3d.dollycutBy(a);
                log({
                  t: 'camera3d',
                  f: 'dollycutBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollycutBy',
                    a: a
                  });
                }
              }
            }
            break;
          case 50:
            if (e.altKey) {
              if (e.shiftKey) {
                a = {
                  x: -20,
                  d: 3
                };
                camera3d.dollyflyTo(a);
                log({
                  t: 'camera3d',
                  f: 'dollyflyTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollyflyTo',
                    a: a
                  });
                }
              } else {
                a = {
                  x: -10,
                  d: 3
                };
                camera3d.dollyflyBy(a);
                log({
                  t: 'camera3d',
                  f: 'dollyflyBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollyflyBy',
                    a: a
                  });
                }
              }
            } else {
              if (e.shiftKey) {
                a = {x: -20};
                camera3d.dollycutTo(a);
                log({
                  t: 'camera3d',
                  f: 'dollycutTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollycutTo',
                    a: a
                  });
                }
              } else {
                a = {x: -10};
                camera3d.dollycutBy(a);
                log({
                  t: 'camera3d',
                  f: 'dollycutBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollycutBy',
                    a: a
                  });
                }
              }
            }
            break;
          case 54:
            if (e.altKey) {
              if (e.shiftKey) {
                a = {
                  y: 20,
                  d: 3
                };
                camera3d.dollyflyTo(a);
                log({
                  t: 'camera3d',
                  f: 'dollyflyTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollyflyTo',
                    a: a
                  });
                }
              } else {
                a = {
                  y: 10,
                  d: 3
                };
                camera3d.dollyflyBy(a);
                log({
                  t: 'camera3d',
                  f: 'dollyflyBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollyflyBy',
                    a: a
                  });
                }
              }
            } else {
              if (e.shiftKey) {
                a = {y: 20};
                camera3d.dollycutTo(a);
                log({
                  t: 'camera3d',
                  f: 'dollycutTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollycutTo',
                    a: a
                  });
                }
              } else {
                a = {y: 10};
                camera3d.dollycutBy(a);
                log({
                  t: 'camera3d',
                  f: 'dollycutBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollycutBy',
                    a: a
                  });
                }
              }
            }
            break;
          case 55:
            if (e.altKey) {
              if (e.shiftKey) {
                a = {
                  y: -20,
                  d: 3
                };
                camera3d.dollyflyTo(a);
                log({
                  t: 'camera3d',
                  f: 'dollyflyTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollyflyTo',
                    a: a
                  });
                }
              } else {
                a = {
                  y: -10,
                  d: 3
                };
                camera3d.dollyflyBy(a);
                log({
                  t: 'camera3d',
                  f: 'dollyflyBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollyflyBy',
                    a: a
                  });
                }
              }
            } else {
              if (e.shiftKey) {
                a = {y: -20};
                camera3d.dollycutTo(a);
                log({
                  t: 'camera3d',
                  f: 'dollycutTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollycutTo',
                    a: a
                  });
                }
              } else {
                a = {y: -10};
                camera3d.dollycutBy(a);
                log({
                  t: 'camera3d',
                  f: 'dollycutBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollycutBy',
                    a: a
                  });
                }
              }
            }
            break;
          case 79:
            if (e.altKey) {
              if (e.shiftKey) {
                a = {
                  z: 20,
                  d: 3
                };
                camera3d.dollyflyTo(a);
                log({
                  t: 'camera3d',
                  f: 'dollyflyTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollyflyTo',
                    a: a
                  });
                }
              } else {
                a = {
                  z: 10,
                  d: 3
                };
                camera3d.dollyflyBy(a);
                log({
                  t: 'camera3d',
                  f: 'dollyflyBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollyflyBy',
                    a: a
                  });
                }
              }
            } else {
              if (e.shiftKey) {
                a = {z: 20};
                camera3d.dollycutTo(a);
                log({
                  t: 'camera3d',
                  f: 'dollycutTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollycutTo',
                    a: a
                  });
                }
              } else {
                a = {z: 10};
                camera3d.dollycutBy(a);
                log({
                  t: 'camera3d',
                  f: 'dollycutBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollycutBy',
                    a: a
                  });
                }
              }
            }
            break;
          case 80:
            if (e.altKey) {
              if (e.shiftKey) {
                a = {
                  z: -20,
                  d: 3
                };
                camera3d.dollyflyTo(a);
                log({
                  t: 'camera3d',
                  f: 'dollyflyTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollyflyTo',
                    a: a
                  });
                }
              } else {
                a = {
                  z: -10,
                  d: 3
                };
                camera3d.dollyflyBy(a);
                log({
                  t: 'camera3d',
                  f: 'dollyflyBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollyflyBy',
                    a: a
                  });
                }
              }
            } else {
              if (e.shiftKey) {
                a = {z: -20};
                camera3d.dollycutTo(a);
                log({
                  t: 'camera3d',
                  f: 'dollycutTo',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollycutTo',
                    a: a
                  });
                }
              } else {
                a = {z: -10};
                camera3d.dollycutBy(a);
                log({
                  t: 'camera3d',
                  f: 'dollycutBy',
                  a: a
                });
                if (record_shots) {
                  mediator.record({
                    t: 'camera3d',
                    f: 'dollycutBy',
                    a: a
                  });
                }
              }
            }
            break;
          case 48:
            if (e.altKey) {
              a = {
                d: 20,
                n: 6,
                z: true
              };
            } else {
              a = {
                d: 20,
                n: 6,
                z: false
              };
            }
            camera3d.bezier(a);
            log({
              t: 'camera3d',
              f: 'bezier',
              a: a
            });
            if (record_shots) {
              mediator.record({
                t: 'camera3d',
                f: 'bezier',
                a: a
              });
            }
            break;
          default:
        }
      });
    }
    return ($traceurRuntime.createClass)(Camera3d, {
      place: function(canvasId, template_view, _scope, _scene, _clearColor, _alpha, _fov) {
        var index = 0,
            sphereGeometry,
            sphereMaterial;
        canvas = document.getElementById(canvasId);
        gl = getWebGLContext(canvas);
        this.scope = _scope;
        scene = _scene || new THREE.Scene();
        clearColor = _clearColor || 'transparent';
        alpha = _alpha || 0.0;
        sphereGeometry = new THREE.SphereGeometry(50, 20, 20);
        sphereMaterial = new THREE.MeshBasicMaterial({
          color: 0x7777ff,
          wireframe: true
        });
        csphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        csphere.position.x = 0;
        csphere.position.y = 0;
        csphere.position.z = 0;
        fov = _fov || 90.0;
        camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.x = 0.0;
        camera.position.y = 0.0;
        camera.position.z = 50.0;
        scene.add(csphere);
        this.addActorToScene('camera', camera);
        csphere.add(camera);
        this.addActorToScene('csphere', csphere);
        scene.add(csphere);
        renderer = new THREE.WebGLRenderer({
          canvas: canvas,
          antialias: true,
          alpha: true
        });
        renderer.setClearColor(clearColor, alpha);
        renderer.setSize(window.innerWidth, window.innerHeight);
        window.addEventListener('resize', onWindowResize, false);
        setTimeout(function() {
          render();
        }, 1000);
        TweenMax.ticker.addEventListener('tick', render);
      },
      set_narrative: function(o) {
        narrative = o;
      },
      set_mediator: function(o) {
        mediator = o;
      },
      examine_matrix: function(m) {
        examine_matrix(m);
      },
      animate: function() {
        requestAnimationFrame(Camera3d.animate);
        render();
        if (stats) {
          stats.update();
        }
      },
      toggle_csphere: function(a) {
        if (csphere) {
          csphere.material.visible = a.val;
          $timeout((function() {
            $rootScope.$apply((function() {
              narrative.control_state['csph'] = a.val;
            }));
          }));
          narrative.shot(("shot-fixed:{\"delta-t\":\"camera3d\", \"f\":\"toggle_csphere\", \"a\":" + a.val + "}"));
        }
      },
      toggle_light: function(a) {
        if (actors[a.name]) {
          actors[a.name].visible = a.val;
          $timeout((function() {
            $rootScope.$apply((function() {
              narrative.control_state[a.name] = a.val;
            }));
          }));
          narrative.shot(("shot-fixed:{\"delta-t\":\"camera3d\", \"f\":\"toggle_light\", \"a\":{\"name\":\"" + a.name + "\",\"val\":" + a.val + "}}"));
        }
      },
      light: function(id) {
        return camera3d.actor(id);
      },
      csphere: function() {
        return csphere;
      },
      center: function(a) {
        a.d = a.d || 0.0;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {
                'i3d:camera:rotation': [{
                  dur: a.d,
                  p: {
                    'x': 0.0,
                    'y': 0.0,
                    'z': 0.0,
                    immediateRender: false
                  }
                }],
                'i3d:csphere:position': [{
                  dur: a.d,
                  p: {
                    'x': 0.0,
                    'y': 0.0,
                    'z': 0.0,
                    immediateRender: false
                  }
                }],
                'i3d:csphere:rotation': [{
                  dur: a.d,
                  p: {
                    'x': 0.0,
                    'y': 0.0,
                    'z': 0.0,
                    immediateRender: false
                  }
                }],
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
        camera.position.x = 0.0;
        camera.position.y = 0.0;
        camera.up.x = 0.0;
        camera.up.y = 1.0;
        camera.up.z = 0.0;
        if (camera.fov !== fov) {
          camera.fov = fov;
          camera.updateProjectionMatrix();
        }
        roll = 0.0;
        pan = 0.0;
        tilt = 0.0;
        yaw = 0.0;
        pitch = 0.0;
      },
      home: function(a) {
        a.d = a.d || 0.0;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {
                'i3d:camera:rotation': [{
                  dur: a.d,
                  p: {
                    'x': 0.0,
                    'y': 0.0,
                    'z': 0.0,
                    immediateRender: false
                  }
                }],
                'i3d:csphere:position': [{
                  dur: a.d,
                  p: {
                    'x': 0.0,
                    'y': 0.0,
                    'z': 0.0,
                    immediateRender: false
                  }
                }],
                'i3d:csphere:scale': [{
                  dur: a.d,
                  p: {
                    'x': 1.0,
                    'y': 1.0,
                    'z': 1.0,
                    immediateRender: false
                  }
                }],
                'i3d:csphere:rotation': [{
                  dur: a.d,
                  p: {
                    'x': 0.0,
                    'y': 0.0,
                    'z': 0.0,
                    immediateRender: false
                  }
                }],
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
        camera.position.x = 0.0;
        camera.position.y = 0.0;
        camera.up.x = 0.0;
        camera.up.y = 1.0;
        camera.up.z = 0.0;
        if (camera.fov !== fov) {
          camera.fov = fov;
          camera.updateProjectionMatrix();
        }
        if (csphere.radius !== radius) {
          csphere.radius = radius;
        }
        zoom = 1.0;
        roll = 0.0;
        pan = 0.0;
        tilt = 0.0;
        yaw = 0.0;
        pitch = 0.0;
      },
      zoomcutTo: function(a) {
        zoom = a.s;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:csphere:scale': [{
                  dur: 0,
                  p: {
                    x: zoom,
                    y: zoom,
                    z: zoom,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      zoomcutBy: function(a) {
        zoom *= a.s;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:csphere:scale': [{
                  dur: 0,
                  p: {
                    x: zoom,
                    y: zoom,
                    z: zoom,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      zoomflyTo: function(a) {
        zoom = a.s;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:csphere:scale': [{
                  dur: a.d,
                  p: {
                    x: zoom,
                    y: zoom,
                    z: zoom,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      zoomflyBy: function(a) {
        zoom *= a.s;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:csphere:scale': [{
                  dur: a.d,
                  p: {
                    x: zoom,
                    y: zoom,
                    z: zoom,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      rollcutTo: function(a) {
        roll = a.r;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:camera:rotation': [{
                  dur: 0,
                  p: {
                    z: roll,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      rollcutBy: function(a) {
        roll += a.r;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:camera:rotation': [{
                  dur: 0,
                  p: {
                    z: roll,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      rollflyTo: function(a) {
        roll = a.r;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:camera:rotation': [{
                  dur: a.d,
                  p: {
                    z: roll,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      rollflyBy: function(a) {
        roll += a.r;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:camera:rotation': [{
                  dur: a.d,
                  p: {
                    z: roll,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      panflyTo: function(a) {
        pan = a.r;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:camera:rotation': [{
                  dur: a.d,
                  p: {
                    y: pan,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      panflyBy: function(a) {
        pan += a.r;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:camera:rotation': [{
                  dur: a.d,
                  p: {
                    y: pan,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      tiltflyTo: function(a) {
        tilt = a.r;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:camera:rotation': [{
                  dur: a.d,
                  p: {
                    x: tilt,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      tiltflyBy: function(a) {
        tilt += a.r;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:camera:rotation': [{
                  dur: a.d,
                  p: {
                    x: tilt,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      yawcutTo: function(a) {
        yaw = a.r;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:csphere:rotation': [{
                  dur: 0,
                  p: {
                    y: yaw,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      yawcutBy: function(a) {
        yaw += a.r;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:csphere:rotation': [{
                  dur: 0,
                  p: {
                    y: yaw,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      yawflyTo: function(a) {
        yaw = a.r;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:csphere:rotation': [{
                  dur: a.d,
                  p: {
                    y: yaw,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      yawflyBy: function(a) {
        yaw += a.r;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:csphere:rotation': [{
                  dur: a.d,
                  p: {
                    y: yaw,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      pitchcutTo: function(a) {
        pitch = a.r;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:csphere:rotation': [{
                  dur: 0,
                  p: {
                    x: pitch,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      pitchcutBy: function(a) {
        pitch += a.r;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:csphere:rotation': [{
                  dur: 0,
                  p: {
                    x: pitch,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      pitchflyTo: function(a) {
        pitch = a.r;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:csphere:rotation': [{
                  dur: a.d,
                  p: {
                    x: pitch,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      pitchflyBy: function(a) {
        pitch += a.r;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:csphere:rotation': [{
                  dur: a.d,
                  p: {
                    x: pitch,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      dollyflyTo: function(a) {
        a.d = a.d || 3.0;
        a.x = a.x || csphere.position.x;
        a.y = a.y || csphere.position.y;
        a.z = a.z || csphere.position.z;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:csphere:position': [{
                  dur: a.d,
                  p: {
                    x: a.x,
                    y: a.y,
                    z: a.z,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      dollyflyBy: function(a) {
        a.d = a.d || 3.0;
        a.x = a.x || 0.0;
        a.y = a.y || 0.0;
        a.z = a.z || 0.0;
        a.x = csphere.position.x + a.x;
        a.y = csphere.position.y + a.y;
        a.z = csphere.position.z + a.z;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:csphere:position': [{
                  dur: a.d,
                  p: {
                    x: a.x,
                    y: a.y,
                    z: a.z,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      dollycutTo: function(a) {
        a.x = a.x || csphere.position.x;
        a.y = a.y || csphere.position.y;
        a.z = a.z || csphere.position.z;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:csphere:position': [{
                  dur: 0,
                  p: {
                    x: a.x,
                    y: a.y,
                    z: a.z,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      dollycutBy: function(a) {
        a.d = 0.0;
        a.x = a.x || 0.0;
        a.y = a.y || 0.0;
        a.z = a.z || 0.0;
        a.x = csphere.position.x + a.x;
        a.y = csphere.position.y + a.y;
        a.z = csphere.position.z + a.z;
        this.shot = {delta: {timeline: {
              p: {
                paused: true,
                repeat: 0
              },
              actors: {'i3d:csphere:position': [{
                  dur: 0,
                  p: {
                    x: a.x,
                    y: a.y,
                    z: a.z,
                    immediateRender: false
                  }
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      bezier: function() {
        var a = arguments[0] !== (void 0) ? arguments[0] : {
          d: 20,
          n: 6,
          z: true
        };
        var i,
            x = [],
            y = [],
            z = [],
            v = [],
            bezier;
        if (a.z) {
          z[0] = 0.0;
        }
        x[0] = 0.0;
        y[0] = 0.0;
        if (Math.random() > 0.5) {
          x[1] = 30.0 * Math.random();
          y[1] = 30.0 * Math.random();
          x[2] = -30.0 * Math.random();
          y[2] = 30.0 * Math.random();
          x[3] = -30.0 * Math.random();
          y[3] = -30.0 * Math.random();
          x[4] = 30.0 * Math.random();
          y[4] = -30.0 * Math.random();
          if (a.z) {
            z[1] = -10 * Math.random();
            z[2] = z[1] - 30 * Math.random();
            z[3] = z[2] + 30 * Math.random();
            z[4] = -10 * Math.random();
          }
        } else {
          x[1] = -30.0 * Math.random();
          y[1] = -30.0 * Math.random();
          x[2] = -30.0 * Math.random();
          y[2] = 30.0 * Math.random();
          x[3] = 30.0 * Math.random();
          y[3] = 30.0 * Math.random();
          x[4] = 30.0 * Math.random();
          y[4] = -30.0 * Math.random();
          if (a.z) {
            z[1] = -10 * Math.random();
            z[2] = z[1] - 30 * Math.random();
            z[3] = z[2] + 30 * Math.random();
            z[4] = -10 * Math.random();
          }
        }
        x[5] = 0.0;
        y[5] = 0.0;
        if (a.z) {
          z[5] = 0.0;
        }
        for (i = 0; i < a.n; i++) {
          if (a.z) {
            v.push({
              x: x[i],
              y: y[i],
              z: z[i]
            });
          } else {
            v.push({
              x: x[i],
              y: y[i]
            });
          }
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
              actors: {'i3d:csphere:position': [{
                  dur: a.d,
                  p: bezier
                }]}
            }}};
        this.shot = 'shot-anim:' + JSON.stringify(this.shot);
        narrative.shot(this.shot);
      },
      translateAxisDistance: function(axis, d) {
        axis.normalize();
        csphere.translateOnAxis(axis, d);
        var ax = x_axis.dot(axis);
        var ay = y_axis.dot(axis);
      },
      rotate: function(params) {
        var pitch = params.pitch || 0.0;
        var yaw = params.yaw || 0.0;
        var roll = params.roll || 0.0;
        matrixa.makeRotationFromEuler(new THREE.Euler(pitch, yaw, roll));
        csphere.applyMatrix(matrixa);
      },
      rotateAxisAngle: function(x, y, z, angle) {
        var axis = new THREE.Vector3(x, y, z);
        axis.normalize();
        csphere.rotateOnAxis(axis, angle);
      },
      relRotateScale: function(params) {
        var pitch = params.pitch || 0.0;
        var yaw = params.yaw || 0.0;
        var roll = params.roll || 0.0;
        var scale = params.zoom || 1.0;
        matrixa.makeRotationFromEuler(new THREE.Euler(pitch, yaw, roll));
        matrixa.multiplyScalar(scale);
        csphere.applyMatrix(matrixa);
      },
      transform: function(params) {
        Object.keys(params).forEach(function(p) {});
        var x = params.tx || 0.0;
        var y = params.ty || 0.0;
        var z = params.tz || 0.0;
        var pitch = params.pitch || 0.0;
        var yaw = params.yaw || 0.0;
        var roll = params.roll || 0.0;
        var scale = params.zoom || 1.0;
        examine_matrix(csphere.matrix);
        matrixb.makeTranslation(zoom * x, zoom * y, zoom * z);
        examine_matrix(matrixb);
        csphere.applyMatrix(matrixb);
        examine_matrix(csphere.matrix);
        matrixa.makeRotationFromEuler(new THREE.Euler(pitch, yaw, roll));
        matrixa.multiplyScalar(scale);
        csphere.applyMatrix(matrixa);
      },
      lookAt: function(id, y, z) {
        if (check.number(id) && check.number(y) && check.number(z)) {
          var a = [id, y, z];
          if (config.unit_test) {
            return a;
          } else {
            camera.lookAt(new THREE.Vector3(id, y, z));
            narrative.shot("shot-fixed:{\"delta-t\":\"camera3d\", \"f\":\"lookAt\", \"a\":a}}");
          }
          return ;
        }
        if (Array.isArray(id)) {
          if (config.unit_test) {
            return id;
          } else {
            if (id.length === 3) {
              var a$__1 = [id.x, id.y, id.z];
              camera.lookAt(new THREE.Vector3(id.x, id.y, id.z));
              narrative.shot("shot-fixed:{\"delta-t\":\"camera3d\", \"f\":\"lookAt\", \"a\":a}}");
            } else {
              console.log(("!Camera3d.lookAt:arg.length = " + id.length));
            }
          }
          return ;
        }
        if (!id) {
          if (config.unit_test) {
            var v = csphere.position;
            var a$__2 = [v.x, v.y, v.z];
            return a$__2;
          } else {
            if (csphere) {
              var v$__3 = csphere.position;
              camera.lookAt(v$__3);
              narrative.shot("shot-fixed:{\"delta-t\":\"camera3d\", \"f\":\"lookAt\", \"a\":{}}");
            } else {
              console.log("!Camera3d.lookAt:csphere is undefined");
            }
          }
          return ;
        }
        if (actors[id]) {
          var v$__4 = actors[id].position;
          if (config.unit_test) {
            var a$__5;
            if (v$__4) {
              a$__5 = [v$__4.x, v$__4.y, v$__4.z];
            }
            return a$__5;
          } else {
            if (v$__4) {
              camera.lookAt(v$__4);
              narrative.shot("shot-fixed:{\"delta-t\":\"camera3d\", \"f\":\"lookAt\", \"a\":id}");
            } else {
              console.log(("!Camera3d.lookAt:actors[" + id + "].position is undefined"));
            }
          }
          return ;
        } else {
          console.log(("!Camera3d.lookAt:actors[" + id + "] does not exist"));
        }
        return ;
      },
      billboardsFaceCamera: function() {
        billboardsFace = true;
        narrative.shot("shot-fixed:{\"delta-t\":\"camera3d\", \"f\":\"billboardsFaceCamera\"}");
      },
      billboardsFree: function() {
        billboardsFace = false;
        narrative.shot("shot-fixed:{\"delta-t\":\"camera3d\", \"f\":\"billboardsFree\"}");
      },
      attachAsSurfaceChild: function(camerasphere, _radius) {
        camera.position.x = camerasphere.position.x;
        camera.position.y = camerasphere.position.y;
        camera.position.z = camerasphere.position.z;
        camera.position.z += _radius;
        radius = _radius;
        camerasphere.add(camera);
        camera.name = 'camera';
        csphere = camerasphere;
        csphere.radius = _radius;
      },
      addActorToScene: function(id, o3d, pid) {
        var duplicate = false;
        scene.traverse((function(o) {
          if (o.name === id) {
            duplicate = true;
          }
        }));
        if (duplicate) {
          return false;
        }
        if (o3d !== scene) {
          o3d.name = id;
          if (pid && actors[pid]) {
            actors[pid].add(o3d);
          } else {
            scene.add(o3d);
          }
          actors[id] = o3d;
          o3d.updateMatrix();
        } else {}
        return true;
      },
      removeActorFromScene: function(id) {
        var node = actors[id],
            p;
        if (node) {
          if (node.parent) {
            p = node.parent;
            p.remove(node);
          } else {
            prev_scene.remove(node);
          }
          delete actors[id];
        }
      },
      actor: function(id) {
        return actors[id] || null;
      },
      reportActors: function() {
        return Object.keys(actors);
      },
      addBillboardToScene: function(id, o3d, pid) {
        if (this.addActorToScene(id, o3d, pid)) {
          billboards[id] = o3d;
        }
      },
      removeBillboardFromScene: function(id) {
        if (billboards[id]) {
          delete billboards[id];
        }
        this.removeActorFromScene(id);
      },
      billboard: function(id) {
        return billboards[id] || null;
      },
      reportBillboards: function() {
        return Object.keys(billboards);
      },
      changeTemplateScene: function(template, _scene) {
        prev_scene = scene;
        scene = _scene || (new THREE.Scene());
        scene.name = template;
        renderer.setClearColor(clearColor, alpha);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
      },
      gl: function() {
        return gl;
      }
    }, {});
  }());
  if (!camera3d) {
    camera3d = new Camera3d();
  }
  return camera3d;
}]);

//# sourceMappingURL=../services/camera3d-service.js.map