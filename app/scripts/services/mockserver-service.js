"use strict";
angular.module('app').factory('Mockserver', ["Mediator", "Log", "config", "TimelineMax", "TweenMax", "Quad", function(Mediator, Log, config, TimelineMax, TweenMax, Quad) {
  "use strict";
  var mockserver,
      log = Log.log,
      target = {p: 0},
      timeline,
      tlp = {
        repeat: 0,
        paused: true,
        tweens: []
      },
      delay = $traceurRuntime.initGeneratorFunction(function $__15() {
        var curr;
        return $traceurRuntime.createGeneratorInstance(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                curr = -5;
                $ctx.state = 9;
                break;
              case 9:
                curr = curr + 10 + 5 * Math.random();
                $ctx.state = 6;
                break;
              case 6:
                $ctx.state = 2;
                return curr;
              case 2:
                $ctx.maybeThrow();
                $ctx.state = 9;
                break;
              default:
                return $ctx.end();
            }
        }, $__15, this);
      }),
      index = 0,
      actions_scene_shot = [{
        t: 'camera3d',
        f: 'panflyTo',
        a: {
          r: -0.7854,
          d: 3
        }
      }, {
        t: 'camera3d',
        f: 'lookAt'
      }, {
        t: 'camera3d',
        f: 'panflyTo',
        a: {
          r: -0.7854,
          d: 3
        }
      }, {
        t: 'camera3d',
        f: 'home',
        a: {d: 3}
      }, {
        t: 'camera3d',
        f: 'panflyTo',
        a: {
          r: 0.0,
          d: 3
        }
      }, {
        t: 'narrative',
        f: 'change_scene',
        a: 'a'
      }, {
        t: 'narrative',
        f: 'change_scene',
        a: 'a0'
      }, {
        t: 'narrative',
        f: 'change_scene',
        a: 'a1'
      }, {
        t: 'narrative',
        f: 'change_scene',
        a: 'a2'
      }, {
        t: 'camera3d',
        f: 'dollyflyTo',
        a: {
          x: 10,
          y: 10,
          z: -20,
          d: 4
        }
      }, {
        t: 'narrative',
        f: 'change_scene',
        a: 'payments'
      }, {
        t: 'camera3d',
        f: 'toggle_csphere',
        a: {val: false}
      }, {
        t: 'camera3d',
        f: 'toggle_csphere',
        a: {val: true}
      }, {
        t: 'camera3d',
        f: 'toggle_light',
        a: {
          name: 'key',
          val: false
        }
      }, {
        t: 'camera3d',
        f: 'toggle_light',
        a: {
          name: 'fill',
          val: false
        }
      }, {
        t: 'camera3d',
        f: 'toggle_light',
        a: {
          name: 'back',
          val: false
        }
      }, {
        t: 'camera3d',
        f: 'toggle_light',
        a: {
          name: 'key',
          val: true
        }
      }, {
        t: 'camera3d',
        f: 'toggle_light',
        a: {
          name: 'fill',
          val: true
        }
      }, {
        t: 'camera3d',
        f: 'toggle_light',
        a: {
          name: 'back',
          val: true
        }
      }, {
        t: 'narrative',
        f: 'change_scene',
        a: 'a'
      }, {
        t: 'narrative',
        f: 'shot',
        a: ("shot-graft:" + growa0json)
      }, {
        t: 'narrative',
        f: 'shot',
        a: ("shot-graft:" + growa1json)
      }, {
        t: 'narrative',
        f: 'shot',
        a: ("shot-graft:" + growa2json)
      }, {
        t: 'camera3d',
        f: 'panflyTo',
        a: {
          r: 0.7854,
          d: 4
        }
      }, {
        t: 'narrative',
        f: 'change_scene',
        a: 'footprint'
      }, {
        t: 'camera3d',
        f: 'panflyTo',
        a: {
          r: 0.7854,
          d: 4
        }
      }, {
        t: 'camera3d',
        f: 'tiltflyTo',
        a: {
          r: 0.7854,
          d: 4
        }
      }, {
        t: 'camera3d',
        f: 'billboardsFaceCamera'
      }, {
        t: 'camera3d',
        f: 'tiltflyBy',
        a: {
          r: -0.7854,
          d: 4
        }
      }, {
        t: 'camera3d',
        f: 'panflyBy',
        a: {
          r: -0.7854,
          d: 4
        }
      }, {
        t: 'narrative',
        f: 'change_scene',
        a: 'circle'
      }, {
        t: 'narrative',
        f: 'change_state',
        a: '/circle:/i3d-simple:simple_red/i2d-scene:mf2d0/base-skycube:test_cube/ui-msgbg:/shot-fixed:'
      }, {
        t: 'narrative',
        f: 'change_scene',
        a: 'stocks'
      }, {
        t: 'narrative',
        f: 'change_state',
        a: '///i2d-scene:mf2d0///shot-fixed:'
      }, {
        t: 'camera3d',
        f: 'panflyBy',
        a: {
          r: -0.7854,
          d: 4
        }
      }],
      actions2d = [{
        t: 'camera2d',
        f: 'zoomflyBy',
        a: {
          s: 0.9,
          d: 3
        }
      }, {
        t: 'camera2d',
        f: 'zoomflyTo',
        a: {
          s: 2.0,
          d: 3
        }
      }, {
        t: 'camera2d',
        f: 'zoomflyTo',
        a: {
          s: 0.5,
          d: 3
        }
      }, {
        t: 'camera2d',
        f: 'dollyflyTo',
        a: {
          x: 20,
          d: 3
        }
      }, {
        t: 'camera2d',
        f: 'center',
        a: {d: 3}
      }, {
        t: 'camera2d',
        f: 'home',
        a: {d: 3}
      }, {
        t: 'camera2d',
        f: 'rollflyTo',
        a: {
          r: -90,
          d: 3
        }
      }, {
        t: 'camera2d',
        f: 'rollflyBy',
        a: {
          r: 45,
          d: 3
        }
      }, {
        t: 'camera2d',
        f: 'rollflyBy',
        a: {
          r: 45,
          d: 3
        }
      }, {
        t: 'camera2d',
        f: 'dollyflyTo',
        a: {
          x: 20,
          d: 3
        }
      }, {
        t: 'camera2d',
        f: 'dollyflyTo',
        a: {
          y: 20,
          d: 3
        }
      }, {
        t: 'camera2d',
        f: 'dollyflyTo',
        a: {
          x: 0,
          d: 3
        }
      }, {
        t: 'camera2d',
        f: 'dollyflyTo',
        a: {
          y: -40,
          d: 3
        }
      }, {
        t: 'camera2d',
        f: 'dollyflyTo',
        a: {
          x: 20,
          d: 3
        }
      }, {
        t: 'camera2d',
        f: 'dollyflyTo',
        a: {
          x: 0,
          d: 3
        }
      }],
      actions3d = [{
        t: 'camera3d',
        f: 'tiltflyTo',
        a: {
          r: -0.7854,
          d: 3
        }
      }, {
        t: 'camera3d',
        f: 'panflyTo',
        a: {
          r: -0.7854,
          d: 3
        }
      }, {
        t: 'camera3d',
        f: 'lookAt'
      }, {
        t: 'camera3d',
        f: 'dollyflyTo',
        a: {
          x: 20,
          y: 0,
          z: 0,
          d: 3
        }
      }, {
        t: 'camera3d',
        f: 'zoomflyTo',
        a: {
          s: 0.5,
          d: 3
        }
      }, {
        t: 'camera3d',
        f: 'zoomflyTo',
        a: {
          s: 2.0,
          d: 3
        }
      }, {
        t: 'camera3d',
        f: 'dollyflyTo',
        a: {
          x: 20,
          y: 20,
          z: -20,
          d: 3
        }
      }, {
        t: 'camera3d',
        f: 'zoomflyTo',
        a: {
          s: 0.5,
          d: 3
        }
      }, {
        t: 'camera3d',
        f: 'center',
        a: {d: 3}
      }, {
        t: 'camera3d',
        f: 'home',
        a: {d: 3}
      }, {
        t: 'camera3d',
        f: 'panflyBy',
        a: {
          r: 0.7854,
          d: 3
        }
      }, {
        t: 'camera3d',
        f: 'tiltflyBy',
        a: {
          r: 0.7854,
          d: 3
        }
      }, {
        t: 'camera3d',
        f: 'lookAt'
      }, {
        t: 'camera3d',
        f: 'rollflyTo',
        a: {
          r: -1.57,
          d: 4
        }
      }, {
        t: 'camera3d',
        f: 'rollflyBy',
        a: {
          r: 0.3927,
          d: 4
        }
      }, {
        t: 'camera3d',
        f: 'rollflyBy',
        a: {
          r: 0.3927,
          d: 4
        }
      }, {
        t: 'camera3d',
        f: 'center',
        a: {d: 3}
      }, {
        t: 'camera3d',
        f: 'yawflyTo',
        a: {
          r: 1.57,
          d: 3
        }
      }, {
        t: 'camera3d',
        f: 'yawflyBy',
        a: {
          r: -0.7854,
          d: 3
        }
      }, {
        t: 'camera3d',
        f: 'yawflyBy',
        a: {
          r: -0.7854,
          d: 3
        }
      }, {
        t: 'camera3d',
        f: 'pitchflyTo',
        a: {
          r: -1.57,
          d: 3
        }
      }, {
        t: 'camera3d',
        f: 'pitchflyBy',
        a: {
          r: 0.7854,
          d: 3
        }
      }, {
        t: 'camera3d',
        f: 'pitchflyBy',
        a: {
          r: 0.7854,
          d: 3
        }
      }, {
        t: 'camera3d',
        f: 'dollyflyTo',
        a: {
          x: 20,
          y: -20,
          z: -30,
          d: 3
        }
      }, {
        t: 'camera3d',
        f: 'dollyflyTo',
        a: {
          x: 0,
          y: 0,
          z: 30,
          d: 6
        }
      }, {
        t: 'camera3d',
        f: 'tiltflyBy',
        a: {
          r: 0.7854,
          d: 3
        }
      }, {
        t: 'camera3d',
        f: 'zoomflyTo',
        a: {
          s: 2.0,
          d: 3
        }
      }, {
        t: 'camera3d',
        f: 'home',
        a: {d: 3}
      }, {
        t: 'narrative',
        f: 'change_scene',
        a: 'payments'
      }, {
        t: 'narrative',
        f: 'change_state',
        a: '///i2d-scene:mf2d0///shot-fixed:'
      }, {
        t: 'camera3d',
        f: 'panflyBy',
        a: {
          r: -0.7854,
          d: 4
        }
      }, {
        t: 'camera3d',
        f: 'tiltflyBy',
        a: {
          r: -0.7854,
          d: 4
        }
      }, {
        t: 'narrative',
        f: 'change_state',
        a: '////base-skycube:test_bg//'
      }, {
        t: 'camera3d',
        f: 'panflyTo',
        a: {
          r: 0.7854,
          d: 4
        }
      }, {
        t: 'narrative',
        f: 'change_state',
        a: '////base-skycube:no-anim//{}'
      }, {
        t: 'camera3d',
        f: 'zoomflyBy',
        a: {
          s: 0.3,
          d: 4
        }
      }, {
        t: 'camera3d',
        f: 'center',
        a: {d: 3}
      }, {
        t: 'camera3d',
        f: 'home',
        a: {d: 3}
      }, {
        t: 'narrative',
        f: 'change_state',
        a: '////videocam://shot-fixed:'
      }],
      actions = [];
  if (config.e2e_test) {
    var $__4 = true;
    var $__5 = false;
    var $__6 = undefined;
    try {
      for (var $__2 = void 0,
          $__1 = (config.e2e_spec)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__4 = ($__2 = $__1.next()).done); $__4 = true) {
        var s = $__2.value;
        {
          actions.push(s.action);
        }
      }
    } catch ($__7) {
      $__5 = true;
      $__6 = $__7;
    } finally {
      try {
        if (!$__4 && $__1.return != null) {
          $__1.return();
        }
      } finally {
        if ($__5) {
          throw $__6;
        }
      }
    }
  } else {
    actions = actions.concat(actions_scene_shot).concat(actions2d).concat(actions3d);
  }
  var Mockserver = (function() {
    function Mockserver() {}
    return ($traceurRuntime.createClass)(Mockserver, {
      start: function() {
        timeline.play();
      },
      queue: function(action) {
        Mediator.queue.push(action);
      }
    }, {});
  }());
  if (!mockserver) {
    mockserver = new Mockserver();
    var $__11 = true;
    var $__12 = false;
    var $__13 = undefined;
    try {
      for (var $__9 = void 0,
          $__8 = (delay())[$traceurRuntime.toProperty(Symbol.iterator)](); !($__11 = ($__9 = $__8.next()).done); $__11 = true) {
        var n = $__9.value;
        {
          if (index >= actions.length) {
            timeline = new TimelineMax(tlp);
            break;
          }
          tlp.tweens.push(TweenMax.to(target, 5, {
            p: 0,
            delay: n,
            immediateRender: false,
            onComplete: mockserver.queue,
            onCompleteParams: [actions[index]]
          }));
          index += 1;
        }
      }
    } catch ($__14) {
      $__12 = true;
      $__13 = $__14;
    } finally {
      try {
        if (!$__11 && $__8.return != null) {
          $__8.return();
        }
      } finally {
        if ($__12) {
          throw $__13;
        }
      }
    }
  }
  return mockserver;
}]);

//# sourceMappingURL=../services/mockserver-service.js.map