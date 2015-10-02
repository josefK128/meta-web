"use strict";
angular.module("app", ['ui.router', 'ui.grid']).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {
  'use strict';
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
    rewriteLinks: false
  });
  $urlRouterProvider.otherwise('/');
  var metastate = {
    url: '^/{scene}/{i3d}/{i2d}/{base}/{ui}/{shot}',
    onEnter: (function() {
      var delta_params = metastate.stateObj.delta_params,
          scope,
          name,
          tuple,
          template,
          model,
          template_view,
          shot,
          Camera3d,
          narrative,
          node;
      narrative = metastate.narrative || metastate.Mediator.component('narrative');
      scope = scope || narrative.scope();
      Camera3d = Camera3d || metastate.Camera3d;
      var $__10 = true;
      var $__11 = false;
      var $__12 = undefined;
      try {
        for (var $__8 = void 0,
            $__7 = (Object.keys(delta_params))[$traceurRuntime.toProperty(Symbol.iterator)](); !($__10 = ($__8 = $__7.next()).done); $__10 = true) {
          var p = $__8.value;
          {
            if (delta_params[p].length > 0) {
              name = delta_params[p];
              tuple = name.split(":");
              template = tuple[0] || "";
              model = tuple[1] || "";
              switch (p) {
                case 'scene':
                  break;
                case 'i3d':
                  template_view = metastate.cache.get((template + ".svg"));
                  scope.i3d = metastate.Models.get('i3d', template, model) || {};
                  Camera3d.changeTemplateScene(template);
                  $("#i3d").html(template_view);
                  metastate.compile($("#i3d").contents())(scope);
                  break;
                case 'i2d':
                  template_view = metastate.cache.get((template + ".svg"));
                  scope.i2d = metastate.Models.get('i2d', template, model) || {};
                  $("#i2d").html(template_view);
                  metastate.compile($("#i2d").contents())(scope);
                  break;
                case 'base':
                  template_view = metastate.cache.get((template + ".html"));
                  scope.base = metastate.Models.get('base', template, model) || {};
                  scope.shot = scope.shot || {};
                  $("#base").html(template_view);
                  metastate.compile($("#base").contents())(scope);
                  break;
                case 'ui':
                  template_view = metastate.cache.get((template + ".html"));
                  scope.ui = metastate.Models.get('ui', template, model) || {};
                  scope.shot = scope.shot || {};
                  $("#ui").html(template_view);
                  metastate.compile($("#ui").contents())(scope);
                  break;
                case 'shot':
                  template_view = metastate.cache.get((template + ".svg"));
                  if (!/^scope/.test(model)) {
                    scope.shot = metastate.Models.get('shot', template, model) || {};
                  } else {
                    scope.shot = scope.shot || {};
                  }
                  var delta = scope.shot.delta || {};
                  var branches = delta.branches || {};
                  var $__3 = true;
                  var $__4 = false;
                  var $__5 = undefined;
                  try {
                    for (var $__1 = void 0,
                        $__0 = (Object.keys(branches))[$traceurRuntime.toProperty(Symbol.iterator)](); !($__3 = ($__1 = $__0.next()).done); $__3 = true) {
                      var p$__21 = $__1.value;
                      {
                        node = $(("#" + p$__21));
                        node.append(template_view);
                        metastate.compile(node.contents())(scope);
                      }
                    }
                  } catch ($__6) {
                    $__4 = true;
                    $__5 = $__6;
                  } finally {
                    try {
                      if (!$__3 && $__0.return != null) {
                        $__0.return();
                      }
                    } finally {
                      if ($__4) {
                        throw $__5;
                      }
                    }
                  }
                  break;
                default:
              }
            }
          }
        }
      } catch ($__13) {
        $__11 = true;
        $__12 = $__13;
      } finally {
        try {
          if (!$__10 && $__7.return != null) {
            $__7.return();
          }
        } finally {
          if ($__11) {
            throw $__12;
          }
        }
      }
    })
  };
  $stateProvider.state('delta', metastate);
}]).run(["$state", "$templateCache", "$location", "$compile", "$timeout", "$rootScope", "Models", "Camera3d", "Mediator", "Log", "Mockserver", "Mixin", "Transform3d", "config", function($state, $templateCache, $location, $compile, $timeout, $rootScope, Models, Camera3d, Mediator, Log, Mockserver, Mixin, Transform3d, config) {
  'use strict';
  var observer;
  var metastate = $state.get('delta');
  metastate.cache = $templateCache;
  metastate.location = $location;
  metastate.compile = $compile;
  metastate.timeout = $timeout;
  metastate.Models = Models;
  metastate.Camera3d = Camera3d;
  metastate.Mediator = Mediator;
  metastate.Log = Log;
  metastate.config = config;
  observer = new MutationSummary({
    queries: [{attribute: 'transform'}, {attribute: 'form'}],
    rootNode: document.getElementById('i3d'),
    callback: (function(summaries) {
      var dtransform = summaries[0],
          dform = summaries[1],
          actor,
          delta = [],
          m = new THREE.Matrix4(),
          mr,
          mt,
          ms,
          k;
      var $__10 = true;
      var $__11 = false;
      var $__12 = undefined;
      try {
        for (var $__8 = void 0,
            $__7 = (dtransform.valueChanged)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__10 = ($__8 = $__7.next()).done); $__10 = true) {
          var node = $__8.value;
          {
            var transform = JSON.parse(node.getAttribute('transform'));
            var transformp = JSON.parse(dtransform.getOldAttribute(node, 'transform'));
            actor = Camera3d.actor(node.id);
            var $__3 = true;
            var $__4 = false;
            var $__5 = undefined;
            try {
              for (var $__1 = void 0,
                  $__0 = (Object.keys(transform))[$traceurRuntime.toProperty(Symbol.iterator)](); !($__3 = ($__1 = $__0.next()).done); $__3 = true) {
                var p = $__1.value;
                {
                  if (!angular.equals(transform[p], transformp[p])) {
                    delta.push({
                      property: p,
                      previous: transformp[p],
                      current: transform[p]
                    });
                  }
                }
              }
            } catch ($__6) {
              $__4 = true;
              $__5 = $__6;
            } finally {
              try {
                if (!$__3 && $__0.return != null) {
                  $__0.return();
                }
              } finally {
                if ($__4) {
                  throw $__5;
                }
              }
            }
            for (k = 0; k < delta.length; k++) {
              var p$__22 = delta[k]['property'];
              if (p$__22 === 't') {
                var ta = delta[k]['current'];
                for (var i = 0; i < ta.length; i++) {}
                mt = (new THREE.Matrix4()).makeTranslation(ta[0], ta[1], ta[2]);
              }
              if (p$__22 === 'q') {
                var qa = delta[k]['current'];
                for (var i$__23 = 0; i$__23 < qa.length; i$__23++) {}
                var q = new THREE.Quaternion(qa[0], qa[1], qa[2], qa[3]);
                mr = (new THREE.Matrix4()).makeRotationFromQuaternion(q);
              }
              if (p$__22 === 'e') {
                var ea = delta[k]['current'];
                for (var i$__24 = 0; i$__24 < ea.length; i$__24++) {}
                var euler = new THREE.Euler(ea[0], ea[1], ea[2]);
                var q$__25 = (new THREE.Quaternion()).setFromEuler(euler);
                mr = (new THREE.Matrix4()).makeRotationFromEuler(euler);
              }
              if (p$__22 === 's') {
                var sa = delta[k]['current'];
                for (var i$__26 = 0; i$__26 < sa.length; i$__26++) {}
                ms = (new THREE.Matrix4()).makeScale(sa[0], sa[1], sa[2]);
              }
            }
            m = mt || m;
            if (mr) {
              m = m.multiply(mr);
            }
            if (ms) {
              m = m.multiply(ms);
            }
            actor.applyMatrix(m);
          }
        }
      } catch ($__13) {
        $__11 = true;
        $__12 = $__13;
      } finally {
        try {
          if (!$__10 && $__7.return != null) {
            $__7.return();
          }
        } finally {
          if ($__11) {
            throw $__12;
          }
        }
      }
      var $__17 = true;
      var $__18 = false;
      var $__19 = undefined;
      try {
        for (var $__15 = void 0,
            $__14 = (dform.valueChanged)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__17 = ($__15 = $__14.next()).done); $__17 = true) {
          var node$__27 = $__15.value;
          {}
        }
      } catch ($__20) {
        $__18 = true;
        $__19 = $__20;
      } finally {
        try {
          if (!$__17 && $__14.return != null) {
            $__14.return();
          }
        } finally {
          if ($__18) {
            throw $__19;
          }
        }
      }
    })
  });
  if (config.server_connect) {
    Mediator.connect();
  }
  window.addEventListener("keyup", function(e) {
    switch (e.keyCode) {
      case 51:
        if (e.altKey) {
          if (config.unit_test) {
            console.log("starting unit tests...");
            config.unit_spec(Mediator, Mixin, Transform3d, Camera3d, config).then((function() {
              if (config.mockserver_connect) {
                console.log("starting Mockserver...");
                Mockserver.start();
                config.mockserver_connect = false;
              }
            })).catch((function(e) {
              console.log(("unit tests failed: " + e));
              console.log("skipping e2e test...");
            }));
          } else {
            if (config.mockserver_connect) {
              console.log("starting Mockserver...");
              Mockserver.start();
              config.mockserver_connect = false;
            }
          }
        }
        break;
      default:
    }
  });
}]);

//# sourceMappingURL=app.js.map
"use strict";
angular.module('app').directive('mwNarrative', ["$rootScope", "$state", "$location", "$templateCache", "$timeout", "$compile", "Mediator", "Models", "Camera3d", "Camera2d", "Log", "TweenMax", "TimelineMax", "Quad", "config", function($rootScope, $state, $location, $templateCache, $timeout, $compile, Mediator, Models, Camera3d, Camera2d, Log, TweenMax, TimelineMax, Quad, config) {
  'use strict';
  var delta = (function(abs_params, abs_paramsp) {
    var delta_params = {};
    var $__5 = true;
    var $__6 = false;
    var $__7 = undefined;
    try {
      for (var $__3 = void 0,
          $__2 = (Object.keys(abs_params))[$traceurRuntime.toProperty(Symbol.iterator)](); !($__5 = ($__3 = $__2.next()).done); $__5 = true) {
        var p = $__3.value;
        {
          if (abs_paramsp[p] !== abs_params[p]) {
            delta_params[p] = abs_params[p];
          } else {
            delta_params[p] = "";
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
    return delta_params;
  });
  var urls_index = 0,
      urls_failed = 0,
      shot_index = 0,
      shot_failed = 0;
  var Narrative = (function() {
    function Narrative() {
      var $__0 = this;
      this.scenes = Object.keys(config.scenes);
      this.controls = Object.keys(config.controls);
      this.scene = config.opening_scene;
      this.control_state = config.controls;
      var terms = ['scene', 'i3d', 'i2d', 'base', 'ui', 'shot'];
      this.terms = terms;
      this.backfwd = false;
      this.frame = 0;
      this.sequence = {};
      this.prev_url = '^';
      this.back = false;
      this.stateObjp = {};
      this.stateObjp['abs_url'] = '^';
      this.stateObjp['delta_url'] = '^';
      this.stateObj = {};
      this.stateObj['scene'] = this.scene;
      this.stateObj['control_state'] = this.control_state;
      this.stateObj['delta_url'] = config.initial_url;
      this.stateObj['abs_url'] = config.initial_url;
      this.stateObj['delta_params'] = config.scenes[this.scene];
      this.stateObj['abs_params'] = config.scenes[this.scene];
      this.sequence[config.initial_url] = this.frame;
      this.sequence[this.prev_url] = this.frame - 1;
      this.sequence[this.frame] = this.stateObj;
      this.sequence[this.frame - 1] = this.stateObjp;
      this.metastate = $state.get('delta');
      this.metastate.stateObj = this.stateObj;
      this.metastate.stateObjp = this.stateObjp;
      history.replaceState(this.stateObj, this.scene);
      if (this.stateObj.abs_params['ui'].match(/ui-msgbg/)) {
        this.test();
      }
      window.addEventListener('popstate', (function(e) {}));
      $rootScope.$on('$locationChangeSuccess', (function(e) {
        var url = $location.url(),
            popped_url,
            abs_paramsp,
            abs_params,
            delta_params = {},
            delta_url = '',
            d_url = '',
            abs_url = '',
            a_url = '',
            d_passed = true,
            a_passed = true;
        if (!/^\/$/.test(url)) {
          Log.log(("" + $__0.stateObj['abs_url']));
          Log.log(("" + url));
          if (config.e2e_test) {
            d_url = config.e2e_spec[urls_index].delta_url;
            delta_url = url;
            if (!check.primitive(delta_url)) {
              delta_url = delta_url.valueOf();
            }
            a_url = config.e2e_spec[urls_index].abs_url;
            abs_url = $__0.stateObj.abs_url;
            if (!check.primitive(abs_url)) {
              abs_url = abs_url.valueOf();
            }
            if (delta_url !== d_url) {
              d_passed = false;
              console.log(("e2e_spec[" + urls_index + "] delta_url test failed: result:" + delta_url + " !== expected:" + d_url));
              Log.log(("e2e_spec[" + urls_index + "] delta_url test failed: result:" + delta_url + " !== expected:" + d_url));
            }
            if (abs_url !== a_url) {
              a_passed = false;
              console.log(("e2e_spec[" + urls_index + "] abs_url test failed: result:" + abs_url + " !== expected" + a_url));
              Log.log(("e2e_spec[" + urls_index + "] abs_url test failed: result:" + abs_url + " !== expected:" + a_url));
            }
            if (!d_passed || !a_passed) {
              urls_failed++;
            }
            urls_index++;
            if (urls_index === config.e2e_spec.length) {
              console.log(("*** e2e action->state-change-urls comparison test: \n                                   " + config.e2e_spec.length + " tests  \n                                   " + urls_failed + " failures ***"));
              Log.log(("*** e2e urls test: " + config.e2e_spec.length + " tests  " + urls_failed + " failures ***"));
            }
          }
        }
        if ($__0.backfwd) {
          $__0.stateObjp = $__0.sequence[$__0.frame];
          if ($__0.sequence[url] < $__0.sequence[$__0.prev_url]) {
            $__0.back = true;
            $__0.frame -= 1;
          } else {
            $__0.back = false;
            $__0.frame += 1;
          }
          $__0.stateObj = $__0.sequence[$__0.frame];
          $__0.metastate.stateObj = $__0.stateObj;
          $__0.metastate.stateObjp = $__0.stateObjp;
          abs_paramsp = $__0.metastate.stateObjp.abs_params;
          abs_params = $__0.metastate.stateObj.abs_params;
          delta_params = delta(abs_params, abs_paramsp);
          var $__5 = true;
          var $__6 = false;
          var $__7 = undefined;
          try {
            for (var $__3 = void 0,
                $__2 = (terms)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__5 = ($__3 = $__2.next()).done); $__5 = true) {
              var p = $__3.value;
              {
                delta_url += ("/" + delta_params[p]);
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
          $__0.metastate.stateObj.delta_params = delta_params;
          $__0.metastate.stateObj.delta_url = delta_url;
          $__0.stateObj = $__0.metastate.stateObj;
          $timeout((function() {
            $rootScope.$apply((function() {
              $__0.scene = $__0.stateObj.scene;
              $__0.scope().ui.scene = $__0.scene;
            }));
          }));
        } else {
          $__0.back = false;
        }
        if (!/^\/$/.test(url)) {
          if (/^(\/.*){6}$/.test(url)) {} else {
            console.log(("!Narrative.onLocChSucc(url = " + url + " is NOT well-formed"));
            Log.log({
              t: '!Narrative',
              f: 'onLocChSucc',
              a: ("url " + url + " is NOT well-formed")
            });
          }
        }
        if ($__0.stateObj.abs_params['ui'].match(/ui-msgbg/)) {
          $__0.test();
        }
      }));
      $rootScope.$on('$stateChangeSuccess', (function(e) {
        var shot,
            _shot,
            expected_shot,
            _scope,
            delta,
            branches,
            node,
            tl,
            timeline = (function(_delta) {
              var _timeline = _delta.timeline || {},
                  tlp = _timeline.p || {},
                  actors = _timeline.actors || {},
                  actions = _timeline.actions || [],
                  ntuple,
                  type,
                  id,
                  p,
                  target,
                  tweens,
                  i;
              tlp.paused = tlp.paused || true;
              tlp.tweens = tlp.tweens || [];
              var $__26 = true;
              var $__27 = false;
              var $__28 = undefined;
              try {
                for (var $__24 = void 0,
                    $__23 = (Object.keys(actors))[$traceurRuntime.toProperty(Symbol.iterator)](); !($__26 = ($__24 = $__23.next()).done); $__26 = true) {
                  var a = $__24.value;
                  {
                    ntuple = a.split(':');
                    type = ntuple[0];
                    id = ntuple[1];
                    if (!type) {
                      continue;
                    }
                    if (!id) {
                      continue;
                    }
                    ntuple = ntuple.slice(2);
                    i = 0;
                    var $__5 = true;
                    var $__6 = false;
                    var $__7 = undefined;
                    try {
                      for (var $__3 = void 0,
                          $__2 = (ntuple)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__5 = ($__3 = $__2.next()).done); $__5 = true) {
                        var q = $__3.value;
                        {
                          i++;
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
                    if (type === 'i3d') {
                      target = Camera3d.actor(id);
                    } else {
                      target = document.getElementById(id);
                    }
                    if (!target) {
                      continue;
                    }
                    if (ntuple.length > 0) {
                      var $__12 = true;
                      var $__13 = false;
                      var $__14 = undefined;
                      try {
                        for (var $__10 = void 0,
                            $__9 = (ntuple)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__12 = ($__10 = $__9.next()).done); $__12 = true) {
                          var q$__30 = $__10.value;
                          {
                            if (q$__30) {
                              target = target[q$__30];
                            }
                          }
                        }
                      } catch ($__15) {
                        $__13 = true;
                        $__14 = $__15;
                      } finally {
                        try {
                          if (!$__12 && $__9.return != null) {
                            $__9.return();
                          }
                        } finally {
                          if ($__13) {
                            throw $__14;
                          }
                        }
                      }
                    }
                    if (!target) {
                      continue;
                    }
                    tweens = actors[a];
                    var $__19 = true;
                    var $__20 = false;
                    var $__21 = undefined;
                    try {
                      for (var $__17 = void 0,
                          $__16 = (tweens)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__19 = ($__17 = $__16.next()).done); $__19 = true) {
                        var tween = $__17.value;
                        {
                          if (tween.dur === undefined) {
                            tween.dur = 10;
                          }
                          tween.p.delay = tween.p.delay || 0;
                          tween.p.ease = tween.p.ease || Quad.easeInOut;
                          if (tween.actions) {
                            if (tween.actions.start) {
                              tween.p.onStart = Mediator.exec;
                              tween.p.onStartParams = tween.actions.start;
                            }
                            if (tween.actions.update) {
                              tween.p.onUpdate = Mediator.exec;
                              tween.p.onUpdateParams = tween.actions.update;
                            }
                            if (tween.actions.complete) {
                              tween.p.onComplete = Mediator.exec;
                              tween.p.onCompleteParams = tween.actions.complete;
                            }
                            if (tween.actions.start) {
                              tween.p.onReverseComplete = Mediator.exec;
                              tween.p.onReverseCompleteParams = tween.actions.reverse_complete;
                            }
                          }
                          tlp.tweens.push(TweenMax.to(target, tween.dur, tween.p));
                        }
                      }
                    } catch ($__22) {
                      $__20 = true;
                      $__21 = $__22;
                    } finally {
                      try {
                        if (!$__19 && $__16.return != null) {
                          $__16.return();
                        }
                      } finally {
                        if ($__20) {
                          throw $__21;
                        }
                      }
                    }
                  }
                }
              } catch ($__29) {
                $__27 = true;
                $__28 = $__29;
              } finally {
                try {
                  if (!$__26 && $__23.return != null) {
                    $__23.return();
                  }
                } finally {
                  if ($__27) {
                    throw $__28;
                  }
                }
              }
              if (actions) {
                if (actions.start) {
                  tlp.onStart = Mediator.exec;
                  tlp.onStartParams = actions.start;
                }
                if (actions.update) {
                  tlp.onUpdate = Mediator.exec;
                  tlp.onUpdateParams = actions.update;
                }
                if (actions.complete) {
                  tlp.onComplete = Mediator.exec;
                  tlp.onCompleteParams = actions.complete;
                }
                if (actions.reverseComplete) {
                  tlp.onReverseComplete = Mediator.exec;
                  tlp.onReverseCompleteParams = actions.reverseComplete;
                }
              }
              tlp.onComplete = Mediator.exec;
              tlp.onReverseComplete = Mediator.exec;
              tlp.onCompleteParams = actions.complete || [];
              tlp.onCompleteParams.push({
                t: 'mediator',
                f: 'queue_ready_next'
              });
              tlp.onReverseCompleteParams = actions.reverseComplete || [];
              tlp.onReverseCompleteParams.push({
                t: 'mediator',
                f: 'queue_ready_next'
              });
              return new TimelineMax(tlp);
            });
        $__0.prev_url = $location.url();
        $__0.backfwd = true;
        if (config.e2e_test) {
          shot = JSON.stringify($__0.scope().shot || {});
          if (!check.primitive(shot)) {
            console.log(("!JSON.stringify(shot) not primitive - index " + shot_index));
            Log.log(("!JSON.stringify(shot) not primitive - index " + shot_index));
            shot = shot.valueOf();
          }
          expected_shot = JSON.stringify(config.e2e_spec[shot_index].shot);
          if (!check.primitive(expected_shot)) {
            console.log(("!JSON.stringify(expected_shot) not primitive - index " + shot_index));
            Log.log(("!JSON.stringify(expected_shot) not primitive - index " + shot_index));
            expected_shot = expected_shot.valueOf();
          }
          if (shot !== expected_shot) {
            shot_failed++;
            console.log(("e2e_spec[" + shot_index + "] shot test failed: result:" + shot + " !== expected:" + expected_shot));
            Log.log(("e2e_spec[" + shot_index + "] shot test failed: result:" + shot + " !== expected:" + expected_shot));
          }
          shot_index++;
          if (shot_index === config.e2e_spec.length) {
            console.log(("*** e2e shot->scope.shot models comparison test: \n                             " + config.e2e_spec.length + " tests  \n                             " + shot_failed + " failures ***"));
            Log.log(("*** e2e shot test: " + config.e2e_spec.length + " tests " + shot_failed + " failures ***"));
          }
        }
        _scope = $__0.scope() || {};
        _shot = _scope.shot || {};
        Log.log(_shot);
        delta = _shot.delta || {};
        tl = timeline(delta);
        if ($__0.back === true) {
          tl.seek(tl.duration());
          tl.reverse();
        } else {
          tl.play();
        }
      }));
    }
    return ($traceurRuntime.createClass)(Narrative, {
      onload: function(msg) {
        if (msg.match(/templates.html/)) {}
      },
      change_control: function(control) {
        var $__0 = this;
        switch (control) {
          case 'HOME':
            Camera3d.home({d: 3});
            $timeout((function() {
              $timeout((function() {
                $rootScope.$apply((function() {
                  $__0.control_state['HOME'] = false;
                }));
              }), 3000);
            }));
            Log.log({
              "t": "camera3d",
              "f": "home",
              "a": {"d": 3}
            });
            break;
          case 'CNTR':
            Camera3d.center({d: 3});
            $timeout((function() {
              $timeout((function() {
                $rootScope.$apply((function() {
                  $__0.control_state['CNTR'] = false;
                }));
              }), 3000);
            }));
            Log.log({
              "t": "camera3d",
              "f": "center",
              "a": {"d": 3}
            });
            break;
          case 'csph':
            if (Camera3d.csphere()) {
              var b = this.control_state['csph'];
              Camera3d.toggle_csphere({
                name: 'csph',
                val: b
              });
              Log.log({
                "t": "camera3d",
                "f": "toggle_csphere",
                "a": b
              });
            } else {
              $timeout((function() {
                $rootScope.$apply((function() {
                  $__0.control_state['csph'] = !$__0.control_state['csph'];
                }));
              }));
            }
            break;
          case 'key':
          case 'fill':
          case 'back':
            if (Camera3d.light(control)) {
              var b$__31 = this.control_state[control];
              Camera3d.toggle_light({
                name: control,
                val: b$__31
              });
              Log.log({
                "t": "camera3d",
                "f": "toggle_light",
                "a": b$__31
              });
            } else {
              $timeout((function() {
                $rootScope.$apply((function() {
                  $__0.control_state[control] = !$__0.control_state[control];
                }));
              }));
            }
            break;
          default:
            console.log(("!unknown control name = " + control));
        }
      },
      shot: function(shot) {
        var abs_url_components,
            abs_url = '/',
            i = 0;
        if (!check.unemptyString(shot)) {
          console.log(("!Narrative.shot(shot = " + shot + ") Not unempty string)"));
          return ;
        }
        if (!/:/.test(shot)) {
          console.log(("!Narrative.shot(shot = " + shot + ") NOT well-formed)"));
          return ;
        }
        Mediator.queue.ready = false;
        abs_url_components = this.stateObj.abs_url.split('/');
        abs_url_components.pop();
        if (abs_url_components[0] === '') {
          abs_url_components.shift();
        }
        var $__5 = true;
        var $__6 = false;
        var $__7 = undefined;
        try {
          for (var $__3 = void 0,
              $__2 = (abs_url_components)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__5 = ($__3 = $__2.next()).done); $__5 = true) {
            var c = $__3.value;
            {
              abs_url += (c + "/");
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
        abs_url += shot;
        this.change_shot(abs_url);
      },
      change_scene_by_ui: function(scene) {
        Log.log({
          "t": "narrative",
          "f": "change_scene",
          "a": scene
        });
        this.change_scene(scene);
      },
      change_scene: function(scene) {
        var $__0 = this;
        var abs_values = [],
            abs_params = {},
            abs_url,
            i = 0;
        if (!check.unemptyString(scene)) {
          console.log(("!Narrative.change_scene(scene = " + scene + " - Not unempty string)"));
          return ;
        }
        if (!check.oneOf(Object.keys(config.scenes), scene)) {
          console.log(("!Narrative.change_scene(scene = " + scene + " - Not in config.scenes)"));
          return ;
        }
        if (scene !== this.scene) {
          $timeout((function() {
            $rootScope.$apply((function() {
              $__0.scene = scene;
            }));
          }));
          this.scene = scene;
        }
        if (this.scene !== this.stateObj.scene) {
          abs_params = config.scenes[this.scene];
          var $__5 = true;
          var $__6 = false;
          var $__7 = undefined;
          try {
            for (var $__3 = void 0,
                $__2 = (this.terms)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__5 = ($__3 = $__2.next()).done); $__5 = true) {
              var p = $__3.value;
              {
                abs_values[i++] = abs_params[p];
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
          abs_url = '/';
          abs_url += abs_values.join('/');
          this.change_shot(abs_url);
        }
      },
      change_shot: function(url) {
        var tuple = url.split('shot'),
            shot = [],
            template,
            model;
        if (!check.unemptyString(url)) {
          console.log(("!Narrative.change_shot(url = " + url + " - Not unempty string)"));
          return ;
        }
        tuple[1] = 'shot' + tuple[1];
        shot = tuple[1].split(/:(.*)/) || "";
        template = shot[0] || "";
        model = tuple[1].split(/:(.*)?/)[1] || "";
        if (!/^{/.test(model)) {
          this.change_state(url);
        } else {
          model = JSON.parse(model);
          this.scope().shot = model;
          url = tuple[0] + template + ':scope' + this.frame;
          this.change_state(url);
        }
      },
      change_state: function(url) {
        var $__0 = this;
        var params = {},
            values = [],
            abs_params = {},
            abs_values = [],
            delta_values = [],
            i = 0;
        if (!check.unemptyString(url)) {
          console.log(("!Narrative.change_state(url = " + url + " - Not unempty string)"));
          return ;
        }
        if (/\/$/.test(url)) {
          url = url + 'shot-fixed:';
        }
        if (/\{}$/.test(url)) {
          url = url.replace(/\{}$/, "shot-fixed:");
        }
        if (/\{/.test(url)) {
          console.log(("!Narrative.change_state(url = " + url + " - contains JSON - returning)"));
          return ;
        }
        this.stateObj = {};
        this.stateObj.abs_params = {};
        this.stateObj.delta_params = {};
        this.frame += 1;
        this.stateObj.frame = this.frame;
        values = url.slice(1).split('/');
        var $__5 = true;
        var $__6 = false;
        var $__7 = undefined;
        try {
          for (var $__3 = void 0,
              $__2 = (this.terms)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__5 = ($__3 = $__2.next()).done); $__5 = true) {
            var p = $__3.value;
            {
              params[p] = values[i];
              i += 1;
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
        abs_params = this.metastate.stateObj.abs_params;
        i = 0;
        var $__12 = true;
        var $__13 = false;
        var $__14 = undefined;
        try {
          for (var $__10 = void 0,
              $__9 = (this.terms)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__12 = ($__10 = $__9.next()).done); $__12 = true) {
            var p$__32 = $__10.value;
            {
              this.stateObj.delta_params[p$__32] = "";
              abs_values[i] = "";
              if (params[p$__32].length > 1) {
                this.stateObj.abs_params[p$__32] = params[p$__32];
                abs_values[i] = params[p$__32];
              } else {
                this.stateObj.abs_params[p$__32] = abs_params[p$__32];
                abs_values[i] = abs_params[p$__32];
              }
              i += 1;
            }
          }
        } catch ($__15) {
          $__13 = true;
          $__14 = $__15;
        } finally {
          try {
            if (!$__12 && $__9.return != null) {
              $__9.return();
            }
          } finally {
            if ($__13) {
              throw $__14;
            }
          }
        }
        i = 0;
        this.stateObj.delta_params = {};
        var $__19 = true;
        var $__20 = false;
        var $__21 = undefined;
        try {
          for (var $__17 = void 0,
              $__16 = (this.terms)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__19 = ($__17 = $__16.next()).done); $__19 = true) {
            var p$__33 = $__17.value;
            {
              this.stateObj.delta_params[p$__33] = "";
              delta_values[i] = "";
              i += 1;
            }
          }
        } catch ($__22) {
          $__20 = true;
          $__21 = $__22;
        } finally {
          try {
            if (!$__19 && $__16.return != null) {
              $__16.return();
            }
          } finally {
            if ($__20) {
              throw $__21;
            }
          }
        }
        i = 0;
        var $__26 = true;
        var $__27 = false;
        var $__28 = undefined;
        try {
          for (var $__24 = void 0,
              $__23 = (this.terms)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__26 = ($__24 = $__23.next()).done); $__26 = true) {
            var p$__34 = $__24.value;
            {
              if (params[p$__34].length > 0) {
                if (params[p$__34] !== abs_params[p$__34]) {
                  this.stateObj.delta_params[p$__34] = params[p$__34];
                  delta_values[i] = params[p$__34];
                }
              }
              i += 1;
            }
          }
        } catch ($__29) {
          $__27 = true;
          $__28 = $__29;
        } finally {
          try {
            if (!$__26 && $__23.return != null) {
              $__23.return();
            }
          } finally {
            if ($__27) {
              throw $__28;
            }
          }
        }
        this.stateObj.scene = this.stateObj.abs_params['scene'].split(":")[0];
        this.stateObj.abs_url = '/';
        this.stateObj.delta_url = '/';
        this.stateObj.abs_url += abs_values.join('/');
        this.stateObj.delta_url += delta_values.join('/');
        this.stateObj.control_state = this.control_state;
        $timeout((function() {
          $rootScope.$apply((function() {
            $__0.scene = $__0.stateObj.scene;
            $__0.scope().ui.scene = $__0.scene;
          }));
        }));
        this.metastate.stateObjp = this.metastate.stateObj;
        this.metastate.stateObj = this.stateObj;
        this.backfwd = false;
        this.sequence[this.stateObj.delta_url] = this.frame;
        this.sequence[this.frame] = this.stateObj;
        $location.url(this.stateObj.delta_url);
        history.replaceState(this.stateObj, this.scene);
      },
      test: function() {
        var scope = (this.scope ? this.scope() : this);
        scope.ui = {};
        scope.ui.bgcolor = 'black';
        scope.ui.scene = this.scene;
        $timeout(function() {
          $rootScope.$apply(function() {
            scope.ui.bgcolor = 'red';
          });
        }, 1000);
        $timeout(function() {
          $rootScope.$apply(function() {
            scope.ui.bgcolor = 'blue';
          });
        }, 3000);
      }
    }, {});
  }());
  return {
    restrict: 'EA',
    scope: true,
    controller: Narrative,
    controllerAs: 'narrative',
    bindToController: true,
    link: function(scope, el, attrs, narrative) {
      var _scope = scope;
      narrative.scope = (function() {
        return _scope;
      });
      Mediator.component("narrative", narrative);
      Camera2d.place(scope);
      Camera2d.set_narrative(narrative);
      Camera2d.set_mediator(Mediator);
      Camera3d.place(config.canvas3d, config.scenes[config.opening_scene]['i3d'], _scope, config.Scene);
      Camera3d.set_narrative(narrative);
      Camera3d.set_mediator(Mediator);
    }
  };
}]);

//# sourceMappingURL=../components/mw-narrative-directive.js.map
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
"use strict";
angular.module('app').factory('Mixin', function() {
  "use strict";
  var oa = ["object Array"],
      toString = Object.prototype.toString,
      mixin;
  var Mixin = (function() {
    function Mixin() {}
    return ($traceurRuntime.createClass)(Mixin, {
      extend: function(base, module) {
        base = base || {};
        module = module || {};
        for (var p in module) {
          if (module.hasOwnProperty(p)) {
            if (typeof p === 'object') {
              base[p] = (toString.call(p) === oa) ? [] : {};
              this.extend(base[p], p);
            } else {
              base[p] = module[p];
            }
          }
        }
      },
      include: function(base, module) {
        base = base || {};
        base.prototype = base.prototype || {};
        module = module || {};
        for (var p in module) {
          if (module.hasOwnProperty(p)) {
            if (typeof p === 'object') {
              base.prototype[p] = (toString.call(p) === oa) ? [] : {};
              this.include(base.prototype[p], p);
            } else {
              base.prototype[p] = module[p];
            }
          }
        }
      },
      extend_all: function(base, module) {
        base = base || {};
        module = module || {};
        for (var p in module) {
          if (typeof p === 'object') {
            base[p] = (toString.call(p) === oa) ? [] : {};
            this.extend(base[p], p);
          } else {
            base[p] = module[p];
          }
        }
      },
      include_all: function(base, module) {
        base = base || {};
        base.prototype = base.prototype || {};
        module = module || {};
        for (var p in module) {
          if (typeof p === 'object') {
            base.prototype[p] = (toString.call(p) === oa) ? [] : {};
            this.include(base.prototype[p], p);
          } else {
            base.prototype[p] = module[p];
          }
        }
      },
      verify: function(o, p) {
        return (o[p] ? true : false);
      }
    }, {});
  }());
  if (!mixin) {
    mixin = new Mixin();
  }
  return mixin;
});

//# sourceMappingURL=../services/mixin-service.js.map
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
"use strict";
angular.module('app').factory("Models", ["config", function(config) {
  "use strict";
  var models;
  var Models = (function() {
    function Models() {
      this.models = config.models;
    }
    return ($traceurRuntime.createClass)(Models, {
      get: function(type, template, model) {
        if (this.models[type] && template) {
          if (this.models[type][template]) {
            if (this.models[type][template][model]) {
              return this.models[type][template][model];
            } else {
              return this.models[type][template];
            }
          } else {
            return {};
          }
        }
        return {};
      },
      put: function(type, template, model, o) {
        if (this.models[type]) {
          if (template) {
            if (model) {
              this.models[type][template][model] = o || {};
            } else {
              this.models[type][template] = o || {};
            }
          } else {
            throw "template-name MUST be provided!";
          }
        } else {
          throw ("this.models[" + type + "] does NOT exist!");
        }
      }
    }, {});
  }());
  if (!models) {
    models = new Models();
  }
  return models;
}]);

//# sourceMappingURL=../services/models-service.js.map
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
"use strict";
angular.module('app').factory('Transform3d', ["Log", function(Log) {
  "use strict";
  var transform3d;
  var Transform3d = (function() {
    function Transform3d() {}
    return ($traceurRuntime.createClass)(Transform3d, {
      apply: function(transform, actor) {
        var m = new THREE.Matrix4(),
            mr = undefined,
            mt = undefined,
            ms = undefined;
        if (!check.object(transform)) {
          console.log("!Transform3d.apply(transform - is NOT object)");
          Log.log({
            t: '!Transform3d',
            f: 'apply',
            a: 'transform - is NOT object'
          });
          return m;
        }
        if (transform['q']) {
          var qa = transform.q;
          var q = new THREE.Quaternion(qa[0], qa[1], qa[2], qa[3]);
          mr = (new THREE.Matrix4()).makeRotationFromQuaternion(q);
        }
        if (transform['e']) {
          var ea = transform.e;
          var euler = new THREE.Euler(ea[0], ea[1], ea[2]);
          mr = (new THREE.Matrix4()).makeRotationFromEuler(euler);
        }
        if (transform['t']) {
          var ta = transform.t;
          mt = (new THREE.Matrix4()).makeTranslation(ta[0], ta[1], ta[2]);
        }
        if (transform['s']) {
          var sa = transform.s;
          ms = (new THREE.Matrix4()).makeScale(sa[0], sa[1], sa[2]);
        }
        m = mt || m;
        if (mr) {
          m = m.multiply(mr);
        }
        if (ms) {
          m = m.multiply(ms);
        }
        if (actor) {
          actor.applyMatrix(m);
        }
        return m;
      },
      verify: function(m, mm) {
        var a = m.elements,
            aa = mm.elements,
            flag = true,
            d = [],
            sa = [],
            i;
        for (i = 0; i < a.length; i++) {
          d[i] = Math.abs(a[i] - aa[i]);
          sa.push("a[" + i + "]=" + a[i] + " aa[" + i + "]=" + aa[i] + " d[i]=" + d[i]);
          if (Math.abs(d[i]) > 0.01) {
            flag = false;
            for (i = 0; i < sa.length; i++) {
              console.log("error: " + sa[i]);
            }
            break;
          }
        }
        return flag;
      }
    }, {});
  }());
  if (!transform3d) {
    transform3d = new Transform3d();
  }
  return transform3d;
}]);

//# sourceMappingURL=../services/transform3d-service.js.map
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
"use strict";
angular.module('app').directive("i2dForm", ["$templateCache", function($templateCache) {
  "use strict";
  return {
    restrict: 'EA',
    scope: 'true',
    replace: 'false',
    templateUrl: function(elem, attrs) {
      return attrs.i2dTemplate;
    },
    templateNamespace: 'svg',
    link: function(scope, elem, attrs) {}
  };
}]);

//# sourceMappingURL=../../components/i2d/i2d-form-directive.js.map
"use strict";
angular.module('app').directive("i3dAmbientlight", ["Camera3d", "Transform3d", "Log", "colourToHex", function(Camera3d, Transform3d, Log, colourToHex) {
  "use strict";
  return {
    restrict: 'E',
    scope: 'true',
    replace: 'false',
    templateNamespace: 'svg',
    link: function(scope, elem, attrs) {
      var id = attrs.id,
          p = scope.p || {},
          pid = p.pid,
          color = attrs.color || '#ffffff',
          light;
      scope.p = {};
      scope.p.pid = id;
      if (!/^(#|0x)/.test(color)) {
        color = colourToHex(color);
      }
      light = new THREE.AmbientLight(color);
      Camera3d.addActorToScene(id, light, pid);
      elem.on("$destroy", function() {});
    }
  };
}]);

//# sourceMappingURL=../../components/i3d/i3d-ambientlight-directive.js.map
"use strict";
angular.module('app').directive("i3dAxes", ["Camera3d", "Transform3d", "Log", function(Camera3d, Transform3d, Log) {
  "use strict";
  return {
    restrict: 'E',
    scope: 'true',
    replace: 'false',
    templateNamespace: 'svg',
    link: function(scope, elem, attrs) {
      var id = attrs.id,
          p = scope.p || {},
          pid = p.pid,
          length = attrs.length || 3000.0,
          transform = JSON.parse(attrs.transform || '{}'),
          axes;
      scope.p = {};
      scope.p.pid = id;
      axes = new THREE.AxisHelper(parseFloat(length));
      Camera3d.addActorToScene(id, axes, pid);
      Transform3d.apply(transform, axes);
      elem.on("$destroy", function() {});
    }
  };
}]);

//# sourceMappingURL=../../components/i3d/i3d-axes-directive.js.map
"use strict";
angular.module('app').directive("i3dBillboard", ["Camera3d", "Transform3d", "Log", "colourToHex", function(Camera3d, Transform3d, Log, colourToHex) {
  "use strict";
  return {
    restrict: 'E',
    scope: 'true',
    replace: 'false',
    templateNamespace: 'svg',
    compile: function(elem, attrs) {
      var form,
          w,
          h,
          use_aspect,
          aspect,
          textureurl,
          color,
          opacity,
          transparent,
          wireframe,
          billboardGeometry,
          shaderMaterial,
          billboardMaterial,
          basic_material = (function() {
            billboardMaterial = new THREE.MeshBasicMaterial({
              color: color,
              transparent: transparent,
              opacity: opacity,
              wireframe: wireframe
            });
            billboardMaterial.depthTest = false;
            billboardMaterial.blending = THREE.CustomBlending;
            billboardMaterial.blendSrc = THREE.SrcAlphaFactor;
            billboardMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
            billboardMaterial.blendEquation = THREE.AddEquation;
          }),
          texture_material = (function(texture) {
            texture.magFilter = THREE.LinearFilter;
            texture.minFilter = THREE.LinearMipMapLinearFilter;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            shaderMaterial = new THREE.ShaderMaterial({
              uniforms: {
                color: {
                  type: 'f',
                  value: 1.0
                },
                map: {
                  type: 't',
                  value: texture
                }
              },
              vertexShader: document.getElementById("vsh.glsl").text,
              fragmentShader: document.getElementById("fsh.glsl").text,
              transparent: true
            });
            shaderMaterial.blendSrc = THREE.SrcAlphaFactor;
            shaderMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
            shaderMaterial.blendEquation = THREE.AddEquation;
            billboardMaterial = shaderMaterial;
          }),
          realize = (function(id, pid, transform) {
            var node = new THREE.Mesh(billboardGeometry, billboardMaterial);
            node.material.side = THREE.FrontSide;
            Camera3d.addBillboardToScene(id, node, pid);
            Transform3d.apply(transform, node);
          }),
          prelink = (function(scope, elem, attrs) {
            var id = attrs.id,
                p = scope.p || {},
                pid = p.pid,
                texture,
                transform = JSON.parse(attrs.transform || '{}');
            scope.p = {};
            scope.p.pid = id;
            form = JSON.parse(attrs.form) || {};
            w = form.w || 50.0;
            h = form.h || 50.0;
            use_aspect = (/true/i).test(form.aspect);
            aspect = window.innerWidth / window.innerHeight;
            color = form.color || 'green';
            wireframe = form.wireframe || false;
            textureurl = form.textureurl;
            transparent = form.transparent || true;
            opacity = form.opacity || 1.0;
            if (!/^(#|0x)/.test(color)) {
              color = colourToHex(color);
            }
            billboardGeometry = new THREE.BoxGeometry(w, h, 0.0);
            if (textureurl) {
              if (/(_png|_jpg|_gif|_bmp)/.test(textureurl)) {
                if (textureurl) {
                  texture_material(window[textureurl]);
                } else {
                  basic_material();
                }
                realize(id, pid, transform);
              } else {
                texture = THREE.ImageUtils.loadTexture(textureurl, THREE.UVMapping, function() {
                  texture_material(texture);
                  realize(id, pid, transform);
                }, null, function() {
                  basic_material();
                  realize(id, pid, transform);
                });
              }
            } else {
              basic_material();
              realize(id, pid, transform);
            }
            elem.on("$destroy", function() {});
          }),
          postlink = (function(scope, elem, attrs) {});
      return {
        pre: prelink,
        post: postlink
      };
    }
  };
}]);

//# sourceMappingURL=../../components/i3d/i3d-billboard-directive.js.map
"use strict";
angular.module('app').directive("i3dCamerasphere", ["Camera3d", "Transform3d", "Log", "colourToHex", function(Camera3d, Transform3d, Log, colourToHex) {
  "use strict";
  return {
    restrict: 'E',
    scope: 'true',
    replace: 'false',
    templateNamespace: 'svg',
    link: function(scope, elem, attrs) {
      var id = attrs.id,
          p = scope.p || {},
          pid = p.pid,
          form,
          radius,
          visible,
          color,
          wireframe,
          transparent,
          opacity,
          transform,
          sphereGeometry,
          sphereMaterial,
          csphere;
      scope.p = {};
      scope.p.pid = id;
      form = JSON.parse(attrs.form || '{}');
      radius = form.r || 50.0;
      visible = form.visible;
      color = form.color || 'green';
      wireframe = form.wireframe || false;
      transparent = form.transparent || true;
      opacity = form.opacity || 1.0;
      transform = JSON.parse(attrs.transform || '{}');
      if (!/^(#|0x)/.test(color)) {
        color = colourToHex(color);
      }
      visible = (/true/i).test(visible);
      transparent = (/true/i).test(transparent);
      wireframe = (/true/i).test(wireframe);
      sphereGeometry = new THREE.SphereGeometry(radius);
      sphereMaterial = new THREE.MeshBasicMaterial({
        visible: visible,
        transparent: transparent,
        opacity: opacity,
        wireframe: wireframe,
        color: color
      });
      csphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      csphere.material.side = THREE.DoubleSide;
      csphere.position.x = 0.0;
      csphere.position.y = 0.0;
      csphere.position.z = 0.0;
      Camera3d.attachAsSurfaceChild(csphere, radius);
      Camera3d.addActorToScene(id, csphere, pid);
      Transform3d.apply(transform, csphere);
      elem.on("$destroy", function() {});
    }
  };
}]);

//# sourceMappingURL=../../components/i3d/i3d-camerasphere-directive.js.map
"use strict";
angular.module('app').directive("i3dCube", ["Camera3d", "Transform3d", "Log", "colourToHex", function(Camera3d, Transform3d, Log, colourToHex) {
  "use strict";
  return {
    restrict: 'E',
    scope: true,
    replace: false,
    templateNamespace: 'svg',
    compile: function(elem, attrs) {
      var form,
          w,
          h,
          d,
          textureurl,
          color,
          opacity,
          transparent,
          wireframe,
          cubeGeometry,
          shaderMaterial,
          cubeMaterial,
          basic_material = (function() {
            cubeMaterial = new THREE.MeshBasicMaterial({
              color: color,
              transparent: transparent,
              opacity: opacity,
              wireframe: wireframe
            });
            cubeMaterial.depthTest = false;
            cubeMaterial.blending = THREE.CustomBlending;
            cubeMaterial.blendSrc = THREE.SrcAlphaFactor;
            cubeMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
            cubeMaterial.blendEquation = THREE.AddEquation;
          }),
          texture_material = (function(texture) {
            texture.magFilter = THREE.LinearFilter;
            texture.minFilter = THREE.LinearMipMapLinearFilter;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            shaderMaterial = new THREE.ShaderMaterial({
              uniforms: {
                color: {
                  type: 'f',
                  value: 1.0
                },
                map: {
                  type: 't',
                  value: texture
                }
              },
              vertexShader: document.getElementById("vsh.glsl").text,
              fragmentShader: document.getElementById("fsh.glsl").text,
              transparent: true
            });
            shaderMaterial.blendSrc = THREE.SrcAlphaFactor;
            shaderMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
            shaderMaterial.blendEquation = THREE.AddEquation;
            cubeMaterial = shaderMaterial;
          }),
          realize = (function(id, pid, transform) {
            var node = new THREE.Mesh(cubeGeometry, cubeMaterial);
            node.material.side = THREE.DoubleSide;
            Camera3d.addActorToScene(id, node, pid);
            Transform3d.apply(transform, node);
          }),
          prelink = (function(scope, elem, attrs) {
            var id = attrs.id,
                p = scope.p || {},
                pid = p.pid,
                texture,
                transform;
            scope.p = {};
            scope.p.pid = id;
            form = JSON.parse(attrs.form) || {};
            w = form.w || 5.0;
            h = form.h || 5.0;
            d = form.d || 5.0;
            color = form.color || 'green';
            wireframe = form.wireframe || false;
            textureurl = form.textureurl;
            transparent = form.transparent || true;
            opacity = form.opacity || 1.0;
            transform = JSON.parse(attrs.transform || '{}');
            if (!/^(#|0x)/.test(color)) {
              color = colourToHex(color);
            }
            cubeGeometry = new THREE.BoxGeometry(w, h, d);
            if (textureurl) {
              if (/(_png|_jpg|_gif|_bmp)/.test(textureurl)) {
                if (textureurl) {
                  texture_material(window[textureurl]);
                } else {
                  basic_material();
                }
                realize(id, pid, transform);
              } else {
                texture = THREE.ImageUtils.loadTexture(textureurl, THREE.UVMapping, function() {
                  texture_material(texture);
                  realize(id, pid, transform);
                }, null, function() {
                  basic_material();
                  realize(id, pid, transform);
                });
              }
            } else {
              basic_material();
              realize(id, pid, transform);
            }
            elem.on("$destroy", function() {});
          }),
          postlink = (function(scope, elem, attrs) {});
      return {
        pre: prelink,
        post: postlink
      };
    }
  };
}]);

//# sourceMappingURL=../../components/i3d/i3d-cube-directive.js.map
"use strict";
angular.module('app').directive("i3dDirectionallight", ["Camera3d", "Transform3d", "Log", "colourToHex", function(Camera3d, Transform3d, Log, colourToHex) {
  "use strict";
  return {
    restrict: 'E',
    scope: 'true',
    replace: 'false',
    templateNamespace: 'svg',
    link: function(scope, elem, attrs) {
      var id = attrs.id,
          p = scope.p || {},
          pid = p.pid,
          dirX = parseFloat(attrs.directionx || '0.0'),
          dirY = parseFloat(attrs.directiony || '-1.0'),
          dirZ = parseFloat(attrs.directionz || '0.0'),
          color = attrs.color || '#ffffff',
          transform = JSON.parse(attrs.transform || '{}'),
          light;
      scope.p = {};
      scope.p.pid = id;
      if (!/^(#|0x)/.test(color)) {
        color = colourToHex(color);
      }
      light = new THREE.DirectionalLight(color);
      light.target.position.set(dirX, dirY, dirZ);
      Camera3d.addActorToScene(id, light, pid);
      Transform3d.apply(transform, light);
      elem.on("$destroy", function() {});
    }
  };
}]);

//# sourceMappingURL=../../components/i3d/i3d-directionallight-directive.js.map
"use strict";
angular.module('app').directive("i3dForm", ["$templateCache", function($templateCache) {
  "use strict";
  return {
    restrict: 'EA',
    scope: 'true',
    replace: 'false',
    templateUrl: function(elem, attrs) {
      return attrs.i3dTemplate;
    },
    templateNamespace: 'svg',
    link: function(scope, elem, attrs) {
      elem.on("$destroy", function() {});
    }
  };
}]);

//# sourceMappingURL=../../components/i3d/i3d-form-directive.js.map
"use strict";
angular.module('app').directive("i3dGround", ["Camera3d", "Transform3d", "Log", "colourToHex", function(Camera3d, Transform3d, Log, colourToHex) {
  "use strict";
  return {
    restrict: 'E',
    scope: 'true',
    replace: 'false',
    templateNamespace: 'svg',
    compile: function(elem, attrs) {
      var form,
          w,
          h,
          textureurl,
          color,
          transparent,
          wireframe,
          opacity,
          planeGeometry,
          shaderMaterial,
          planeMaterial,
          basic_material = (function() {
            planeMaterial = new THREE.MeshBasicMaterial({
              color: color,
              transparent: transparent,
              opacity: opacity
            });
            planeMaterial.depthTest = false;
            planeMaterial.blending = THREE.CustomBlending;
            planeMaterial.blendSrc = THREE.SrcAlphaFactor;
            planeMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
            planeMaterial.blendEquation = THREE.AddEquation;
          }),
          texture_material = (function(texture) {
            texture.magFilter = THREE.LinearFilter;
            texture.minFilter = THREE.LinearMipMapLinearFilter;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            shaderMaterial = new THREE.ShaderMaterial({
              uniforms: {
                color: {
                  type: 'f',
                  value: 1.0
                },
                map: {
                  type: 't',
                  value: texture
                }
              },
              vertexShader: document.getElementById("vsh.glsl").text,
              fragmentShader: document.getElementById("fsh.glsl").text,
              transparent: true
            });
            shaderMaterial.blendSrc = THREE.SrcAlphaFactor;
            shaderMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
            shaderMaterial.blendEquation = THREE.AddEquation;
            planeMaterial = shaderMaterial;
          }),
          realize = (function(id, pid, transform) {
            var node = new THREE.Mesh(planeGeometry, planeMaterial);
            node.material.side = THREE.DoubleSide;
            node.rotation.x = -0.5 * Math.PI;
            Camera3d.addActorToScene(id, node, pid);
            Transform3d.apply(transform, node);
          }),
          prelink = (function(scope, elem, attrs) {
            var id = attrs.id,
                p = scope.p || {},
                pid = p.pid,
                transform,
                texture;
            scope.p = {};
            scope.p.pid = id;
            form = JSON.parse(attrs.form || '{}');
            w = form.w || 20.0;
            h = form.h || 20.0;
            color = form.color || 'green';
            wireframe = form.wireframe || false;
            textureurl = form.textureurl;
            transparent = form.transparent || true;
            opacity = form.opacity || 1.0;
            transform = JSON.parse(attrs.transform || '{}');
            if (!/^(#|0x)/.test(color)) {
              color = colourToHex(color);
            }
            planeGeometry = new THREE.PlaneBufferGeometry(w, h, 1, 1);
            if (textureurl) {
              if (/(_png|_jpg|_gif|_bmp)/.test(textureurl)) {
                if (textureurl) {
                  texture_material(window[textureurl]);
                } else {
                  basic_material();
                }
                realize(id, pid, transform);
              } else {
                texture = THREE.ImageUtils.loadTexture(textureurl, THREE.UVMapping, function() {
                  texture_material(texture);
                  realize(id, pid, transform);
                }, null, function() {
                  basic_material();
                  realize(id, pid, transform);
                });
              }
            } else {
              basic_material();
              realize(id, pid, transform);
            }
            elem.on("$destroy", function() {});
          }),
          postlink = (function(scope, elem, attrs) {});
      return {
        pre: prelink,
        post: postlink
      };
    }
  };
}]);

//# sourceMappingURL=../../components/i3d/i3d-ground-directive.js.map
"use strict";
angular.module('app').directive("i3dJsonmodel", ["Camera3d", "Transform3d", "Log", "colourToHex", function(Camera3d, Transform3d, Log, colourToHex) {
  "use strict";
  return {
    restrict: 'E',
    scope: 'true',
    replace: 'false',
    templateNamespace: 'svg',
    compile: function(elem, attrs) {
      var form,
          textureurl,
          color,
          opacity,
          transparent,
          wireframe,
          emissive_color,
          phong,
          specular_color,
          shininess,
          jsonmodel_url,
          jsonmodelGeometry,
          shaderMaterial,
          jsonmodelMaterial,
          basic_material = (function() {
            if (phong) {
              jsonmodelMaterial = new THREE.MeshPhongMaterial({
                color: color,
                wireframe: wireframe,
                emissive: emissive_color,
                specular: specular_color,
                shininess: shininess,
                shading: true,
                fog: true
              });
            } else {
              jsonmodelMaterial = new THREE.MeshBasicMaterial({
                color: color,
                wireframe: wireframe
              });
            }
            jsonmodelMaterial.transparent = transparent;
            jsonmodelMaterial.opacity = opacity;
          }),
          texture_material = (function(texture) {
            texture.magFilter = THREE.LinearFilter;
            texture.minFilter = THREE.LinearMipMapLinearFilter;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            shaderMaterial = new THREE.ShaderMaterial({
              uniforms: {
                color: {
                  type: 'f',
                  value: 1.0
                },
                map: {
                  type: 't',
                  value: texture
                }
              },
              vertexShader: document.getElementById("vsh.glsl").text,
              fragmentShader: document.getElementById("fsh.glsl").text,
              transparent: true
            });
            shaderMaterial.blendSrc = THREE.SrcAlphaFactor;
            shaderMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
            shaderMaterial.blendEquation = THREE.AddEquation;
            jsonmodelMaterial = shaderMaterial;
          }),
          realize = (function(id, pid, transform, jsonmodel_url) {
            var loader = new THREE.JSONLoader(),
                material,
                node;
            loader.load(jsonmodel_url, function(geometry, materials) {
              node = new THREE.Mesh(geometry, jsonmodelMaterial);
              Camera3d.addActorToScene(id, node, pid);
              Transform3d.apply(transform, node);
            });
          }),
          prelink = (function(scope, elem, attrs) {
            var id = attrs.id,
                p = scope.p || {},
                pid = p.pid,
                texture,
                transform;
            scope.p = {};
            scope.p.pid = id;
            form = JSON.parse(attrs.form) || {};
            jsonmodel_url = form.jsonmodel_url;
            color = form.color || 'green';
            wireframe = form.wireframe || false;
            textureurl = form.textureurl;
            transparent = form.transparent || true;
            opacity = form.opacity || 1.0;
            phong = form.phong || false;
            specular_color = form.specular_color || color;
            shininess = form.shininess || 30.0;
            emissive_color = form.emissive_color || 0x000000;
            transform = JSON.parse(attrs.transform || '{}');
            if (!/^(#|0x)/.test(color)) {
              color = colourToHex(color);
            }
            if (textureurl) {
              if (/(_png|_jpg|_gif|_bmp)/.test(textureurl)) {
                if (textureurl) {
                  texture_material(window[textureurl]);
                } else {
                  basic_material();
                }
                realize(id, pid, transform, jsonmodel_url);
              } else {
                texture = THREE.ImageUtils.loadTexture(textureurl, THREE.UVMapping, function() {
                  texture_material(texture);
                  realize(id, pid, transform, jsonmodel_url);
                }, null, function() {
                  basic_material();
                  realize(id, pid, transform, jsonmodel_url);
                });
              }
            } else {
              basic_material();
              realize(id, pid, transform, jsonmodel_url);
            }
            elem.on("$destroy", function() {});
          }),
          postlink = (function(scope, elem, attrs) {});
      return {
        pre: prelink,
        post: postlink
      };
    }
  };
}]);

//# sourceMappingURL=../../components/i3d/i3d-jsonmodel-directive.js.map
"use strict";
angular.module('app').directive("i3dMetaform", ["Mediator", "Camera3d", function(Mediator, Camera3d) {
  "use strict";
  var Metaform = (function() {
    function Metaform() {
      this.id = "";
    }
    return ($traceurRuntime.createClass)(Metaform, {}, {});
  }());
  return {
    restrict: 'E',
    scope: 'false',
    replace: 'false',
    templateNamespace: 'svg',
    controller: Metaform,
    controllerAs: 'metaform',
    bindToController: true,
    link: function(scope, elem, attrs, metaform) {
      metaform.id = attrs.id;
      metaform.pid = attrs.pid;
      scope.p = {};
      scope.p.pid = metaform.pid;
      Mediator.component(metaform.id, metaform);
    }
  };
}]);

//# sourceMappingURL=../../components/i3d/i3d-metaform-directive.js.map
"use strict";
angular.module('app').directive("i3dPointlight", ["Camera3d", "Transform3d", "Log", "colourToHex", function(Camera3d, Transform3d, Log, colourToHex) {
  "use strict";
  return {
    restrict: 'E',
    scope: 'true',
    replace: 'false',
    templateNamespace: 'svg',
    link: function(scope, elem, attrs) {
      var id = attrs.id,
          p = scope.p || {},
          pid = p.pid,
          color = attrs.color || '#ffffff',
          intensity = parseFloat(attrs.intensity || '1.0'),
          distance = parseFloat(attrs.distance || '0.0'),
          transform = JSON.parse(attrs.transform || '{}'),
          light;
      scope.p = {};
      scope.p.pid = id;
      if (!/^(#|0x)/.test(color)) {
        color = colourToHex(color);
      }
      light = new THREE.PointLight(color);
      light.intensity = intensity;
      light.distance = distance;
      Camera3d.addActorToScene(id, light, pid);
      Transform3d.apply(transform, light);
      elem.on("$destroy", function() {});
    }
  };
}]);

//# sourceMappingURL=../../components/i3d/i3d-pointlight-directive.js.map
"use strict";
angular.module('app').directive("i3dReplace", function() {
  "use strict";
  return {
    require: 'ngInclude',
    restrict: 'A',
    link: function(scope, elem, attrs) {
      if (elem.children()) {
        elem.replaceWith(elem.children());
      } else {}
    }
  };
});

//# sourceMappingURL=../../components/i3d/i3d-replace-directive.js.map
"use strict";
angular.module('app').directive("i3dSphere", ["Camera3d", "Transform3d", "Log", "colourToHex", function(Camera3d, Transform3d, Log, colourToHex) {
  "use strict";
  return {
    restrict: 'E',
    scope: 'true',
    replace: 'false',
    templateNamespace: 'svg',
    compile: function(elem, attrs) {
      var form,
          radius,
          wsegments,
          hsegments,
          textureurl,
          color,
          opacity,
          transparent,
          wireframe,
          emissive_color,
          phong,
          specular_color,
          shininess,
          sphereGeometry,
          shaderMaterial,
          sphereMaterial,
          basic_material = (function() {
            if (phong) {
              sphereMaterial = new THREE.MeshPhongMaterial({
                color: color,
                wireframe: wireframe,
                emissive: emissive_color,
                specular: specular_color,
                shininess: shininess,
                shading: true,
                fog: true
              });
            } else {
              sphereMaterial = new THREE.MeshBasicMaterial({
                color: color,
                wireframe: wireframe
              });
            }
            sphereMaterial.transparent = transparent;
            sphereMaterial.opacity = opacity;
          }),
          texture_material = (function(texture) {
            texture.magFilter = THREE.LinearFilter;
            texture.minFilter = THREE.LinearMipMapLinearFilter;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            shaderMaterial = new THREE.ShaderMaterial({
              uniforms: {
                color: {
                  type: 'f',
                  value: 1.0
                },
                map: {
                  type: 't',
                  value: texture
                }
              },
              vertexShader: document.getElementById("vsh.glsl").text,
              fragmentShader: document.getElementById("fsh.glsl").text,
              transparent: true
            });
            shaderMaterial.blendSrc = THREE.SrcAlphaFactor;
            shaderMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
            shaderMaterial.blendEquation = THREE.AddEquation;
            sphereMaterial = shaderMaterial;
          }),
          realize = (function(id, pid, transform) {
            var node = new THREE.Mesh(sphereGeometry, sphereMaterial);
            node.material.side = THREE.DoubleSide;
            Camera3d.addActorToScene(id, node, pid);
            Transform3d.apply(transform, node);
          }),
          prelink = (function(scope, elem, attrs) {
            var id = attrs.id,
                p = scope.p || {},
                pid = p.pid,
                texture,
                transform;
            scope.p = {};
            scope.p.pid = id;
            form = JSON.parse(attrs.form) || {};
            radius = form.r || 5.0;
            wsegments = form.wsegments || 8.0;
            hsegments = form.hsegments || 9.0;
            color = form.color || 'green';
            wireframe = form.wireframe || false;
            textureurl = form.textureurl;
            transparent = form.transparent || true;
            opacity = form.opacity || 1.0;
            phong = form.phong || false;
            specular_color = form.specular_color || color;
            shininess = form.shininess || 30.0;
            emissive_color = form.emissive_color || 0x000000;
            transform = JSON.parse(attrs.transform || '{}');
            if (!/^(#|0x)/.test(color)) {
              color = colourToHex(color);
            }
            sphereGeometry = new THREE.SphereGeometry(radius, wsegments, hsegments);
            if (textureurl) {
              if (/(_png|_jpg|_gif|_bmp)/.test(textureurl)) {
                if (textureurl) {
                  texture_material(window[textureurl]);
                } else {
                  basic_material();
                }
                realize(id, pid, transform);
              } else {
                texture = THREE.ImageUtils.loadTexture(textureurl, THREE.UVMapping, function() {
                  texture_material(texture);
                  realize(id, pid, transform);
                }, null, function() {
                  basic_material();
                  realize(id, pid, transform);
                });
              }
            } else {
              basic_material();
              realize(id, pid, transform);
            }
            elem.on("$destroy", function() {});
          }),
          postlink = (function(scope, elem, attrs) {});
      return {
        pre: prelink,
        post: postlink
      };
    }
  };
}]);

//# sourceMappingURL=../../components/i3d/i3d-sphere-directive.js.map
"use strict";
angular.module('app').directive("i3dSpotlight", ["Camera3d", "Transform3d", "Log", "colourToHex", function(Camera3d, Transform3d, Log, colourToHex) {
  "use strict";
  return {
    restrict: 'E',
    scope: 'true',
    replace: 'false',
    templateNamespace: 'svg',
    link: function(scope, elem, attrs) {
      var id = attrs.id,
          p = scope.p || {},
          pid = p.pid,
          color = attrs.color || '#ffffff',
          intensity = parseFloat(attrs.intensity || '1.0'),
          distance = parseFloat(attrs.distance || '0.0'),
          angle = parseFloat(attrs.angle || '1.047197551'),
          exponential = parseFloat(attrs.exponential || '10.0'),
          targetx = parseFloat(attrs.targetx || '0.0'),
          targety = parseFloat(attrs.targety || '0.0'),
          targetz = parseFloat(attrs.targetz || '0.0'),
          castShadow = (/true/i).test(attrs.castShadow || 'false'),
          shadowCameraNear = parseFloat(attrs.shadowCameraNear || '50.0'),
          shadowCameraFar = parseFloat(attrs.shadowCameraFar || '5000.0'),
          shadowCameraFOV = parseFloat(attrs.shadowCameraFOV || '50.0'),
          shadowBias = parseFloat(attrs.shadowBias || '0.0'),
          shadowDarkness = parseFloat(attrs.shadowDarkness || '0.5'),
          shadowMapWidth = parseFloat(attrs.shadowMapWidth || '512'),
          shadowMapHeight = parseFloat(attrs.shadowMapHeight || '512'),
          transform = JSON.parse(attrs.transform || '{}'),
          light;
      scope.p = {};
      scope.p.pid = id;
      if (!/^(#|0x)/.test(color)) {
        color = colourToHex(color);
      }
      light = new THREE.SpotLight(color);
      light.intensity = intensity;
      light.distance = distance;
      light.angle = angle;
      light.exponential = exponential;
      light.castShadow = castShadow;
      light.shadowCameraNear = shadowCameraNear;
      light.shadowCameraFar = shadowCameraFar;
      light.shadowCameraFOV = shadowCameraFOV;
      light.shadowBias = shadowBias;
      light.shadowDarkness = shadowDarkness;
      light.shadowMapWidth = shadowMapWidth;
      light.shadowMapHeight = shadowMapHeight;
      Camera3d.addActorToScene(id, light, pid);
      Transform3d.apply(transform, light);
      light.target.position.set(targetx, targety, targetz);
      elem.on("$destroy", function() {});
    }
  };
}]);

//# sourceMappingURL=../../components/i3d/i3d-spotlight-directive.js.map
"use strict";
angular.module('app').directive("i3dTetrahedron", ["Camera3d", "Transform3d", "Log", "colourToHex", function(Camera3d, Transform3d, Log, colourToHex) {
  "use strict";
  return {
    restrict: 'E',
    scope: 'true',
    replace: 'false',
    templateNamespace: 'svg',
    compile: function(elem, attrs) {
      var form,
          radius,
          detail,
          textureurl,
          color,
          opacity,
          transparent,
          wireframe,
          tetrahedronGeometry,
          shaderMaterial,
          tetrahedronMaterial,
          basic_material = (function() {
            tetrahedronMaterial = new THREE.MeshBasicMaterial({
              color: color,
              transparent: transparent,
              opacity: opacity,
              wireframe: wireframe
            });
            tetrahedronMaterial.depthTest = false;
            tetrahedronMaterial.blending = THREE.CustomBlending;
            tetrahedronMaterial.blendSrc = THREE.SrcAlphaFactor;
            tetrahedronMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
            tetrahedronMaterial.blendEquation = THREE.AddEquation;
          }),
          texture_material = (function(texture) {
            texture.magFilter = THREE.LinearFilter;
            texture.minFilter = THREE.LinearMipMapLinearFilter;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            shaderMaterial = new THREE.ShaderMaterial({
              uniforms: {
                color: {
                  type: 'f',
                  value: 1.0
                },
                map: {
                  type: 't',
                  value: texture
                }
              },
              vertexShader: document.getElementById("vsh.glsl").text,
              fragmentShader: document.getElementById("fsh.glsl").text,
              transparent: true
            });
            shaderMaterial.blendSrc = THREE.SrcAlphaFactor;
            shaderMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
            shaderMaterial.blendEquation = THREE.AddEquation;
            tetrahedronMaterial = shaderMaterial;
          }),
          realize = (function(id, pid, transform) {
            var node = new THREE.Mesh(tetrahedronGeometry, tetrahedronMaterial);
            node.material.side = THREE.DoubleSide;
            Camera3d.addActorToScene(id, node, pid);
            Transform3d.apply(transform, node);
          }),
          prelink = (function(scope, elem, attrs) {
            var id = attrs.id,
                p = scope.p || {},
                pid = p.pid,
                texture,
                transform;
            scope.p = {};
            scope.p.pid = id;
            form = JSON.parse(attrs.form) || {};
            radius = form.r || 1.0;
            detail = form.detail || 0.0;
            color = form.color || 'green';
            wireframe = form.wireframe || false;
            textureurl = form.textureurl;
            transparent = form.transparent || true;
            opacity = form.opacity || 1.0;
            transform = JSON.parse(attrs.transform || '{}');
            if (!/^(#|0x)/.test(color)) {
              color = colourToHex(color);
            }
            tetrahedronGeometry = new THREE.TetrahedronGeometry(radius, detail);
            if (textureurl) {
              if (/(_png|_jpg|_gif|_bmp)/.test(textureurl)) {
                if (textureurl) {
                  texture_material(window[textureurl]);
                } else {
                  basic_material();
                }
                realize(id, pid, transform);
              } else {
                texture = THREE.ImageUtils.loadTexture(textureurl, THREE.UVMapping, function() {
                  texture_material(texture);
                  realize(id, pid, transform);
                }, null, function() {
                  basic_material();
                  realize(id, pid, transform);
                });
              }
            } else {
              basic_material();
              realize(id, pid, transform);
            }
            elem.on("$destroy", function() {});
          }),
          postlink = (function(scope, elem, attrs) {});
      return {
        pre: prelink,
        post: postlink
      };
    }
  };
}]);

//# sourceMappingURL=../../components/i3d/i3d-tetrahedron-directive.js.map
"use strict";
angular.module('app').directive('uiMsgbg', ["$templateCache", "$rootScope", "$timeout", "Mediator", function($templateCache, $rootScope, $timeout, Mediator) {
  'use strict';
  var Msgbg = (function() {
    function Msgbg() {}
    return ($traceurRuntime.createClass)(Msgbg, {msg_changed: function() {}}, {});
  }());
  return {
    restrict: 'E',
    replace: true,
    templateNamespace: 'html',
    template: "<div ng-style='{background: msgbg.bgcolor}'" + "style='transform:translateX(-26%) scaleX(.5)' >" + "<input type='text' ng-model='msgbg.msg' ng-change='msgbg.msg_changed()'>" + "m.bgc:{{msgbg.bgcolor}} " + "ui.bgc:{{$parent.ui.bgcolor}}</div>",
    scope: {},
    controller: Msgbg,
    controllerAs: 'msgbg',
    bindToController: {
      bgcolor: '=',
      msg: '='
    },
    link: function(scope, el, attrs, msgbg) {
      msgbg.id = attrs['id'];
      $timeout(function() {
        scope.$apply(function() {
          msgbg.bgcolor = 'green';
        });
      }, 2000);
      $timeout(function() {
        scope.$apply(function() {
          msgbg.bgcolor = 'yellow';
        });
      }, 4000);
    }
  };
}]);

//# sourceMappingURL=../../components/ui/ui-msgbg-directive.js.map
"use strict";
var no_anim = {
  faces: {
    front: "url('./images/css3d/1.png'), linear-gradient(rgba(255,0,0,0.3), rgba(0,0,255,0.3)",
    back: "url('./images/css3d/1.png'), linear-gradient(rgba(255,0,0,0.3), rgba(0,0,255,0.3)",
    left: "url('./images/css3d/1.png'), linear-gradient(rgba(255,0,0,0.3), rgba(0,0,255,0.3)",
    right: "url('./images/css3d/1.png'), linear-gradient(rgba(255,0,0,0.3), rgba(0,0,255,0.3)",
    sky: "url('./images/css3d/1.png'), radial-gradient(rgba(0,0,255,0.3), rgba(255,0,0,0.3)",
    ground: "url('./images/css3d/1.png'), radial-gradient(rgba(255,0,0,0.3), rgba(0,0,255,0.3)"
  },
  cube: {},
  animation: {
    dur: '0s',
    repeat: '0'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube/no_anim.js.map
"use strict";
var test_bg = {
  faces: {
    front: "url('./images/css3d/moon_tr.png'), radial-gradient(rgba(255,0,0,0.2), rgba(20,0,200,0.0) 80%)",
    back: "url('./images/css3d/moon_tr.png')",
    left: "url('./images/css3d/moon_tr.png'),radial-gradient(rgba(20,0,200,0.2), rgba(255,0,0,0.0) 80%)",
    right: "url('./images/css3d/moon_tr.png'),radial-gradient(rgba(20,0,200,0.2), rgba(255,0,0,0.0) 80%)",
    sky: "url('./images/css3d/moon_tr.png')",
    ground: "url('./images/css3d/moon_tr.png')"
  },
  cube: {
    perspective: '100px',
    bg: "linear-gradient(0deg, rgba(255,0,0,0.3), rgba(20,0,200,0.3) 80%), url('./images/css3d/moon_tr.png'), url('./images/css3d/redlight_corner.png')"
  },
  animation: {
    dur: '120s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube/test_bg.js.map
"use strict";
var test_cube = {
  faces: {
    front: "url('./images/css3d/1.png'), linear-gradient(rgba(255,0,0,0.3), rgba(0,0,255,0.3)",
    back: "url('./images/css3d/1.png'), linear-gradient(rgba(255,0,0,0.3), rgba(0,0,255,0.3)",
    left: "url('./images/css3d/1.png'), linear-gradient(rgba(255,0,0,0.3), rgba(0,0,255,0.3)",
    right: "url('./images/css3d/1.png'), linear-gradient(rgba(255,0,0,0.3), rgba(0,0,255,0.3)",
    sky: "url('./images/css3d/1.png'), radial-gradient(rgba(0,0,255,0.3), rgba(255,0,0,0.3)",
    ground: "url('./images/css3d/1.png'), radial-gradient(rgba(255,0,0,0.3), rgba(0,0,255,0.3)"
  },
  cube: {},
  animation: {
    dur: '120s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube/test_cube.js.map
"use strict";
var face_test = {
  faces: {
    front: 'repeating-linear-gradient(0deg, rgba(255,0,0,0.4), rgba(30,30,50,0.5) 10%, rgba(50,0,255,0.5) 12%, rgba(30,30,50,0.5) 20%)',
    back: 'repeating-linear-gradient(0deg, rgba(255,0,0,0.4), rgba(30,30,50,0.5) 10%, rgba(50,0,255,0.5) 12%, rgba(30,30,50,0.5) 20%)',
    left: 'repeating-linear-gradient(0deg, rgba(255,0,0,0.4), rgba(30,30,50,0.5) 10%, rgba(50,0,255,0.5) 12%, rgba(30,30,50,0.5) 20%)',
    right: 'repeating-linear-gradient(0deg, rgba(255,0,0,0.4), rgba(30,30,50,0.5) 10%, rgba(50,0,255,0.5) 12%, rgba(30,30,50,0.5) 20%)',
    sky: 'repeating-linear-gradient(0deg, rgba(255,0,0,0.4), rgba(30,30,50,0.5) 10%, rgba(50,0,255,0.5) 12%, rgba(30,30,50,0.5) 20%)',
    ground: 'repeating-linear-gradient(0deg, rgba(255,0,0,0.4), rgba(30,30,50,0.5) 10%, rgba(50,0,255,0.5) 12%, rgba(30,30,50,0.5) 20%)'
  },
  cube: {
    perspective: '900px',
    perspective_origin: '200px 200px'
  },
  animation: {
    dur: '90s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube-descent/face_test.js.map
"use strict";
var gladioluses = {
  faces: {
    front: "url('./images/css3d/2.png')",
    back: "url('./images/css3d/1.png')",
    left: "url('./images/css3d/3.png')",
    right: "url('./images/css3d/1.png')",
    sky: "url('./images/css3d/3.png')",
    ground: "url('./images/css3d/2.png')"
  },
  cube: {
    perspective: '300px',
    perspective_origin: '200px 200px'
  },
  animation: {
    dur: '90s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube-descent/gladioluses.js.map
"use strict";
var gladioluses_warp = {
  faces: {
    front: "url('./images/css3d/2.png')",
    back: "url('./images/css3d/1.png')",
    left: "url('./images/css3d/3.png')",
    right: "url('./images/css3d/1.png')",
    sky: "url('./images/css3d/3.png')",
    ground: "url('./images/css3d/2.png')"
  },
  cube: {
    perspective: '900px',
    perspective_origin: '200px 200px'
  },
  animation: {
    dur: '90s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube-descent/gladioluses_warp.js.map
"use strict";
var snow = {
  faces: {
    front: "url('./images/css3d/skybox/snow/snow_posZ.jpg')",
    back: "url('./images/css3d/skybox/snow/snow_negZ.jpg')",
    left: "url('./images/css3d/skybox/snow/snow_negX.jpg')",
    right: "url('./images/css3d/skybox/snow/snow_posX.jpg')",
    sky: "url('./images/css3d/skybox/snow/snow_posY.jpg')",
    ground: "url('./images/css3d/skybox/snow/snow_negY.jpg')"
  },
  animation: {
    dur: '90s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube-i/snow.js.map
"use strict";
var vasarely_nearpsp = {
  faces: {
    front: "url('./images/css3d/vasarely.png')",
    back: "url('./images/css3d/vasarely.png')",
    left: "url('./images/css3d/vasarely.png')",
    right: "url('./images/css3d/vasarely.png')",
    sky: "url('./images/css3d/vasarely.png')",
    ground: "url('./images/css3d/vasarely.png')"
  },
  cube: {
    perspective: '50px',
    bg: "url('./images/css3d/vasarely.png')"
  },
  animation: {
    dur: '120s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube-i/vasarely_nearpsp.js.map
"use strict";
var action_skate = {
  faces: {
    front: "url('./images/css3d/action_skate.png')",
    back: "url('./images/css3d/action_skate.png')",
    left: "url('./images/css3d/action_skate.png')",
    right: "url('./images/css3d/action_skate.png')",
    sky: "url('./images/css3d/action_skate.png')",
    ground: "url('./images/css3d/action_skate.png')"
  },
  animation: {
    dur: '30s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube-rotate/action_skate.js.map
"use strict";
var action_ski = {
  faces: {
    front: "url('./images/css3d/action_ski.png')",
    back: "url('./images/css3d/action_ski.png')",
    left: "url('./images/css3d/action_ski.png')",
    right: "url('./images/css3d/action_ski.png')",
    sky: "url('./images/css3d/action_ski.png')",
    ground: "url('./images/css3d/action_ski.png')"
  },
  animation: {
    dur: '30s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube-rotate/action_ski.js.map
"use strict";
var blocks = {
  faces: {
    front: "url('./images/css3d/blocks.png')",
    back: "url('./images/css3d/blocks.png')",
    left: "url('./images/css3d/blocks.png')",
    right: "url('./images/css3d/blocks.png')",
    sky: "url('./images/css3d/blocks.png')",
    ground: "url('./images/css3d/blocks.png')"
  },
  cube: {
    perspective: '20px',
    perspective_origin: '250px 100px'
  },
  animation: {
    dur: '30s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube-rotate/blocks.js.map
"use strict";
var blocks_center = {
  faces: {
    front: "url('./images/css3d/blocks.png')",
    back: "url('./images/css3d/blocks.png')",
    left: "url('./images/css3d/blocks.png')",
    right: "url('./images/css3d/blocks.png')",
    sky: "url('./images/css3d/blocks.png')",
    ground: "url('./images/css3d/blocks.png')"
  },
  cube: {
    perspective: '20px',
    perspective_origin: '200px 100px'
  },
  animation: {
    dur: '30s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube-rotate/blocks_center.js.map
"use strict";
var blocks_stream = {
  faces: {
    front: "url('./images/css3d/blocks.png')",
    back: "url('./images/css3d/blocks.png')",
    left: "url('./images/css3d/blocks.png')",
    right: "url('./images/css3d/blocks.png')",
    sky: "url('./images/css3d/blocks.png')",
    ground: "url('./images/css3d/blocks.png')"
  },
  cube: {
    perspective: '20px',
    perspective_origin: '16px 100px'
  },
  animation: {
    dur: '30s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube-rotate/blocks_stream.js.map
"use strict";
var dome = {
  faces: {
    front: "url('./images/css3d/dome.jpg')",
    back: "url('./images/css3d/dome.jpg')",
    left: "url('./images/css3d/dome.jpg')",
    right: "url('./images/css3d/dome.jpg')",
    sky: "url('./images/css3d/dome.jpg')",
    ground: "url('./images/css3d/dome.jpg')"
  },
  animation: {
    dur: '120s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube-rotate/dome.js.map
"use strict";
var mf = {
  faces: {
    front: "url('./images/css3d/mf.png')",
    back: "url('./images/css3d/mf.png')",
    left: "url('./images/css3d/mf.png')",
    right: "url('./images/css3d/mf.png')",
    sky: "url('./images/css3d/mf.png')",
    ground: "url('./images/css3d/mf.png')"
  },
  animation: {
    dur: '180s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube-rotate/mf.js.map
"use strict";
var red_moon = {
  cube: {bg: "'rgba(200,0,0,0.3)"},
  faces: {
    front: "url('./images/css3d/moon_tr.png'), url('./images/css3d/redlight.png')",
    back: "url('./images/css3d/moon_tr.png'), url('./images/css3d/redlight.png')",
    left: "url('./images/css3d/moon_tr.png'), url('./images/css3d/redlight.png')",
    right: "url('./images/css3d/moon_tr.png'), url('./images/css3d/redlight.png')",
    sky: "url('./images/css3d/moon_tr.png'), url('./images/css3d/redlight.png')",
    ground: "url('./images/css3d/moon_tr.png'), url('./images/css3d/redlight.png')"
  },
  animation: {
    dur: '180s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube-rotate/red_moon.js.map
"use strict";
var red_moon_bg = {
  cube: {bg: "url('./images/css3d/moon_tr.png'), url('./images/css3d/redlight_corner.png' )"},
  faces: {
    front: "url('./images/css3d/moon_tr.png')",
    back: "url('./images/css3d/moon_tr.png')",
    left: "url('./images/css3d/moon_tr.png')",
    right: "url('./images/css3d/moon_tr.png')",
    sky: "url('./images/css3d/moon_tr.png')",
    ground: "url('./images/css3d/moon_tr.png')"
  },
  animation: {
    dur: '180s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube-rotate/red_moon_bg.js.map
"use strict";
var test_bg = {
  faces: {
    front: "url('./images/css3d/moon_tr.png'), radial-gradient(rgba(255,0,0,0.2), rgba(20,0,200,0.0) 80%)",
    back: "url('./images/css3d/moon_tr.png')",
    left: "url('./images/css3d/moon_tr.png'),radial-gradient(rgba(20,0,200,0.2), rgba(255,0,0,0.0) 80%)",
    right: "url('./images/css3d/moon_tr.png'),radial-gradient(rgba(20,0,200,0.2), rgba(255,0,0,0.0) 80%)",
    sky: "url('./images/css3d/moon_tr.png')",
    ground: "url('./images/css3d/moon_tr.png')"
  },
  cube: {
    perspective: '100px',
    perspective_origin: '200px 200px',
    bg: "linear-gradient(0deg, rgba(255,0,0,0.3), rgba(20,0,200,0.3) 80%), url('./images/css3d/moon_tr.png'), url('./images/css3d/redlight_corner.png')"
  },
  animation: {
    dur: '120s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube-rotate/test_bg.js.map
"use strict";
var vasarely = {
  faces: {
    front: "url('./images/css3d/vasarely.png')",
    back: "url('./images/css3d/vasarely.png')",
    left: "url('./images/css3d/vasarely.png')",
    right: "url('./images/css3d/vasarely.png')",
    sky: "url('./images/css3d/vasarely.png')",
    ground: "url('./images/css3d/vasarely.png')"
  },
  cube: {},
  animation: {
    dur: '120s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube-rotate/vasarely.js.map
"use strict";
var mf_warp_img = {
  faces: {
    front: "url('./images/css3d/mf.png')",
    back: "url('./images/css3d/mf.png')",
    left: "url('./images/css3d/mf.png')",
    right: "url('./images/css3d/mf.png')",
    sky: "url('./images/css3d/mf.png')",
    ground: "url('./images/css3d/mf.png')"
  },
  cube: {bg: "url('./images/css3d/mf.png')"},
  animation: {
    dur: '90s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube-rotatewarp/mf_warp_img.js.map
"use strict";
var mf_warp_lgrad = {
  faces: {
    front: "url('./images/css3d/mf.png')",
    back: "url('./images/css3d/mf.png')",
    left: "url('./images/css3d/mf.png')",
    right: "url('./images/css3d/mf.png')",
    sky: "url('./images/css3d/mf.png')",
    ground: "url('./images/css3d/mf.png')"
  },
  cube: {bg: 'linear-gradient(0deg, red, black 10%, violet 20%, black 80%)'},
  animation: {
    dur: '90s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube-rotatewarp/mf_warp_lgrad.js.map
"use strict";
var mf_warp_rgrad = {
  faces: {
    front: "url('./images/css3d/mf.png')",
    back: "url('./images/css3d/mf.png')",
    left: "url('./images/css3d/mf.png')",
    right: "url('./images/css3d/mf.png')",
    sky: "url('./images/css3d/mf.png')",
    ground: "url('./images/css3d/mf.png')"
  },
  cube: {bg: 'radial-gradient(circle, red 20%, black 80%)'},
  animation: {
    dur: '90s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube-rotatewarp/mf_warp_rgrad.js.map
"use strict";
var mf_warp_rp_lgrad = {
  faces: {
    front: "url('./images/css3d/mf.png')",
    back: "url('./images/css3d/mf.png')",
    left: "url('./images/css3d/mf.png')",
    right: "url('./images/css3d/mf.png')",
    sky: "url('./images/css3d/mf.png')",
    ground: "url('./images/css3d/mf.png')"
  },
  cube: {bg: 'repeating-linear-gradient(30deg, red, black 20%)'},
  animation: {
    dur: '90s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube-rotatewarp/mf_warp_rp_lgrad.js.map
"use strict";
var mf_warp_rp_rgrad = {
  faces: {
    front: "url('./images/css3d/mf.png')",
    back: "url('./images/css3d/mf.png')",
    left: "url('./images/css3d/mf.png')",
    right: "url('./images/css3d/mf.png')",
    sky: "url('./images/css3d/mf.png')",
    ground: "url('./images/css3d/mf.png')"
  },
  cube: {bg: 'repeating-radial-gradient(closest-corner, black, grey 5%, black 20%)'},
  animation: {
    dur: '90s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube-rotatewarp/mf_warp_rp_rgrad.js.map
"use strict";
var stratos = {
  faces: {
    front: "url('./images/css3d/skybox/sky/sky_posZ.jpg')",
    back: "url('./images/css3d/skybox/sky/sky_negZ.jpg')",
    left: "url('./images/css3d/skybox/sky/sky_negX.jpg')",
    right: "url('./images/css3d/skybox/sky/sky_posX.jpg')",
    sky: "url('./images/css3d/skybox/sky/sky_posY.jpg')",
    ground: "url('./images/css3d/skybox/sky/sky_negY.jpg')"
  },
  cube: {
    perspective: '129px',
    perspective_origin: '30px 40px'
  },
  animation: {
    dur: '60s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../models/base/base-skycube-stratos/stratos.js.map
"use strict";
var phongballchair_kfb = {actors: {
    camerasphere: {csphere: {
        form: {
          r: 50.0,
          visible: true,
          wireframe: true,
          transparent: true,
          opacity: 1.0,
          color: "green"
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {
          key: {
            form: {
              type: "'pointlight.i3d'",
              color: 'orange',
              intensity: 2.5,
              distance: 100.0
            },
            transform: {t: [50.0, 20.0, 0.0]}
          },
          fill: {
            form: {
              type: "'pointlight.i3d'",
              color: 'blue',
              intensity: 1.0,
              distance: 100.0
            },
            transform: {t: [-50.0, -10.0, 0.0]}
          },
          back: {
            form: {
              type: "'pointlight.i3d'",
              color: 'grey',
              intensity: 2.5,
              distance: 100.0
            },
            transform: {t: [-40.0, -10.0, -50.0]}
          }
        }
      }},
    axes: {axes0: {form: {length: 3000.0}}},
    jsonmodels: {ball_chair: {
        form: {
          type: "'jsonmodel.i3d'",
          jsonmodel_url: '../models2/ball_chair/ball_chair.js',
          color: 'white',
          phong: true,
          specular_color: 'orange',
          shininess: 5.0
        },
        transform: {
          t: [0.0, -25.0, -10.0],
          e: [0.0, 0.185, 0.0],
          s: [10.0, 10.0, 10.0]
        },
        children: {}
      }}
  }};

//# sourceMappingURL=../../../models/i3d/i3d-jsonmodels/phongballchair_kfb.js.map
"use strict";
var phonghead_kfb = {actors: {
    camerasphere: {csphere: {
        form: {
          r: 50.0,
          visible: true,
          wireframe: true,
          transparent: true,
          opacity: 1.0,
          color: "green"
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {
          key: {
            form: {
              type: "'pointlight.i3d'",
              color: 'orange',
              intensity: 2.5,
              distance: 100.0
            },
            transform: {t: [50.0, 20.0, 0.0]}
          },
          fill: {
            form: {
              type: "'pointlight.i3d'",
              color: 'blue',
              intensity: 0.8,
              distance: 100.0
            },
            transform: {t: [-50.0, -10.0, 0.0]}
          },
          back: {
            form: {
              type: "'pointlight.i3d'",
              color: 'grey',
              intensity: 2.5,
              distance: 100.0
            },
            transform: {t: [-40.0, -10.0, -50.0]}
          }
        }
      }},
    axes: {axes0: {form: {length: 3000.0}}},
    jsonmodels: {head_scan: {
        form: {
          type: "'jsonmodel.i3d'",
          jsonmodel_url: './webgl/models/head_scan/head_scan.js',
          color: 'white',
          phong: true,
          specular_color: 'orange',
          shininess: 3.0
        },
        transform: {
          t: [0.0, 0.0, -10.0],
          e: [0.0, 0.185, 0.0],
          s: [10.0, 10.0, 10.0]
        },
        children: {}
      }}
  }};

//# sourceMappingURL=../../../models/i3d/i3d-jsonmodels/phonghead_kfb.js.map
"use strict";
var phongstatue_kfb = {actors: {
    camerasphere: {csphere: {
        form: {
          r: 50.0,
          visible: true,
          wireframe: true,
          transparent: true,
          opacity: 1.0,
          color: "green"
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {
          key: {
            form: {
              type: "'pointlight.i3d'",
              color: 'orange',
              intensity: 2.5,
              distance: 100.0
            },
            transform: {t: [50.0, 20.0, 0.0]}
          },
          fill: {
            form: {
              type: "'pointlight.i3d'",
              color: 'blue',
              intensity: 1.0,
              distance: 100.0
            },
            transform: {t: [-50.0, -10.0, 0.0]}
          },
          back: {
            form: {
              type: "'pointlight.i3d'",
              color: 'grey',
              intensity: 2.5,
              distance: 100.0
            },
            transform: {t: [-40.0, -10.0, -50.0]}
          }
        }
      }},
    axes: {axes0: {form: {length: 3000.0}}},
    jsonmodels: {statue: {
        form: {
          type: "'jsonmodel.i3d'",
          jsonmodel_url: '../models2/statue/lucy.js',
          color: 'white',
          phong: true,
          specular_color: 'orange',
          shininess: 5.0
        },
        transform: {
          t: [0.0, 0.0, 0.0],
          e: [0.0, 0.185, 0.0],
          s: [0.05, 0.05, 0.05]
        },
        children: {}
      }}
  }};

//# sourceMappingURL=../../../models/i3d/i3d-jsonmodels/phongstatue_kfb.js.map
"use strict";
var billboards81 = {actors: {
    camerasphere: {csphere: {
        form: {
          r: 50.0,
          visible: true,
          wireframe: true,
          transparent: true,
          opacity: 1.0,
          color: "red"
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {}
      }},
    billboards: {
      bb_singular: {
        form: {
          textureurl: "./images/snow_posZ.jpg",
          w: 50,
          h: 50,
          aspect: true
        },
        transform: {t: [20, 20, -10]}
      },
      bb_singular2: {
        form: {
          textureurl: "sky_jpg",
          w: 50,
          h: 50,
          aspect: true
        },
        transform: {t: [25, 25, 0]}
      },
      bb0: {
        form: {
          textureurl: "Escher_png",
          w: 50,
          h: 50,
          aspect: true
        },
        transform: {t: [0, 0, 0]}
      },
      bb1: {
        form: {
          textureurl: "Escher_png",
          w: 50,
          h: 50,
          aspect: true
        },
        transform: {t: [0, -100, 0]}
      },
      bb2: {
        form: {
          textureurl: "glad_png",
          w: 50,
          h: 50,
          aspect: true
        },
        transform: {t: [0, 100, 0]}
      },
      bb3: {
        form: {
          textureurl: "p2_jpg",
          w: 50,
          h: 50,
          aspect: true
        },
        transform: {t: [-100, 0, 0]}
      },
      bb4: {
        form: {
          textureurl: "sky_jpg",
          w: 50,
          h: 50,
          aspect: true
        },
        transform: {t: [100, 0, 0]}
      },
      bb5: {
        form: {
          textureurl: "Escher_png",
          w: 50,
          h: 50,
          aspect: true
        },
        transform: {t: [-100, 100, 0]}
      },
      bb6: {
        form: {
          textureurl: "glad_png",
          w: 50,
          h: 50,
          aspect: true
        },
        transform: {t: [100, 100, 0]}
      },
      bb7: {
        form: {
          textureurl: "p2_jpg",
          w: 50,
          h: 50,
          aspect: true
        },
        transform: {t: [-100, -100, 0]}
      },
      bb8: {
        form: {
          textureurl: "sky_jpg",
          w: 50,
          h: 50,
          aspect: true
        },
        transform: {t: [100, -100, 0]}
      },
      bb9: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [300, 300, 0]}
      },
      bb10: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [300, 200, 0]}
      },
      bb11: {
        form: {
          textureurl: "glad_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [300, 400, 0]}
      },
      bb12: {
        form: {
          textureurl: "p2_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [200, 300, 0]}
      },
      bb13: {
        form: {
          textureurl: "sky_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [400, 300, 0]}
      },
      bb14: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [200, 400, 0]}
      },
      bb15: {
        form: {
          textureurl: "glad_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [400, 400, 0]}
      },
      bb16: {
        form: {
          textureurl: "p2_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [200, 200, 0]}
      },
      bb17: {
        form: {
          textureurl: "sky_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [400, 200, 0]}
      },
      bb18: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [300, 0, 0]}
      },
      bb19: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [300, -100, 0]}
      },
      bb20: {
        form: {
          textureurl: "glad_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [300, 100, 0]}
      },
      bb21: {
        form: {
          textureurl: "p2_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [200, 0, 0]}
      },
      bb22: {
        form: {
          textureurl: "sky_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [400, 0, 0]}
      },
      bb23: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [200, 100, 0]}
      },
      bb24: {
        form: {
          textureurl: "glad_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [400, 100, 0]}
      },
      bb25: {
        form: {
          textureurl: "p2_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [200, -100, 0]}
      },
      bb26: {
        form: {
          textureurl: "sky_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [400, -100, 0]}
      },
      bb27: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [300, -300, 0]}
      },
      bb28: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [300, -400, 0]}
      },
      bb29: {
        form: {
          textureurl: "glad_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [300, -200, 0]}
      },
      bb30: {
        form: {
          textureurl: "p2_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [200, -300, 0]}
      },
      bb31: {
        form: {
          textureurl: "sky_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [400, -300, 0]}
      },
      bb32: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [200, -200, 0]}
      },
      bb33: {
        form: {
          textureurl: "glad_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [400, -200, 0]}
      },
      bb34: {
        form: {
          textureurl: "p2_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [200, -400, 0]}
      },
      bb35: {
        form: {
          textureurl: "sky_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [400, -400, 0]}
      },
      bb36: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [0, 300, 0]}
      },
      bb37: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [0, 200, 0]}
      },
      bb38: {
        form: {
          textureurl: "glad_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [0, 400, 0]}
      },
      bb39: {
        form: {
          textureurl: "p2_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-100, 300, 0]}
      },
      bb40: {
        form: {
          textureurl: "sky_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [100, 300, 0]}
      },
      bb41: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-100, 400, 0]}
      },
      bb42: {
        form: {
          textureurl: "glad_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [100, 400, 0]}
      },
      bb43: {
        form: {
          textureurl: "p2_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-100, 200, 0]}
      },
      bb44: {
        form: {
          textureurl: "sky_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [100, 200, 0]}
      },
      bb45: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [0, -300, 0]}
      },
      bb46: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [0, -400, 0]}
      },
      bb47: {
        form: {
          textureurl: "glad_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [0, -200, 0]}
      },
      bb48: {
        form: {
          textureurl: "p2_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-100, -300, 0]}
      },
      bb49: {
        form: {
          textureurl: "sky_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [100, -300, 0]}
      },
      bb50: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-100, -200, 0]}
      },
      bb51: {
        form: {
          textureurl: "glad_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [100, -200, 0]}
      },
      bb52: {
        form: {
          textureurl: "p2_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-100, -400, 0]}
      },
      bb53: {
        form: {
          textureurl: "sky_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [100, -400, 0]}
      },
      bb54: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-300, -0, 0]}
      },
      bb55: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-300, -100, 0]}
      },
      bb56: {
        form: {
          textureurl: "glad_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-300, 100, 0]}
      },
      bb57: {
        form: {
          textureurl: "p2_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-400, 0, 0]}
      },
      bb58: {
        form: {
          textureurl: "sky_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-200, 0, 0]}
      },
      bb59: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-400, 100, 0]}
      },
      bb60: {
        form: {
          textureurl: "glad_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-200, 100, 0]}
      },
      bb61: {
        form: {
          textureurl: "p2_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-400, -100, 0]}
      },
      bb62: {
        form: {
          textureurl: "sky_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-200, -100, 0]}
      },
      bb63: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-300, 300, 0]}
      },
      bb64: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-300, 200, 0]}
      },
      bb65: {
        form: {
          textureurl: "glad_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-300, 400, 0]}
      },
      bb66: {
        form: {
          textureurl: "p2_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-400, 300, 0]}
      },
      bb67: {
        form: {
          textureurl: "sky_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-200, 300, 0]}
      },
      bb68: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-400, 400, 0]}
      },
      bb69: {
        form: {
          textureurl: "glad_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-200, 400, 0]}
      },
      bb70: {
        form: {
          textureurl: "p2_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-400, 200, 0]}
      },
      bb71: {
        form: {
          textureurl: "sky_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-200, 200, 0]}
      },
      bb72: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-300, -300, 0]}
      },
      bb73: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-300, -400, 0]}
      },
      bb74: {
        form: {
          textureurl: "glad_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-300, -200, 0]}
      },
      bb75: {
        form: {
          textureurl: "p2_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-400, -300, 0]}
      },
      bb76: {
        form: {
          textureurl: "sky_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-200, -300, 0]}
      },
      bb77: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-400, -200, 0]}
      },
      bb78: {
        form: {
          textureurl: "glad_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-200, -200, 0]}
      },
      bb79: {
        form: {
          textureurl: "p2_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-400, -400, 0]}
      },
      bb80: {
        form: {
          textureurl: "sky_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-200, -400, 0]}
      }
    }
  }};

//# sourceMappingURL=../../../models/i3d/i3d-scene/billboards81.js.map
"use strict";
var mf0 = {actors: {
    camerasphere: {csphere: {
        form: {
          r: 50.0,
          visible: true,
          wireframe: true,
          transparent: true,
          opacity: 1.0,
          color: "red"
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {}
      }},
    metaforms: {
      tree1: {
        form: {
          type: "'sphere.i3d'",
          textureurl: "glad_png",
          r: 4.0,
          wsegments: 20.0,
          hsegments: 20.0,
          color: "white"
        },
        transform: {t: [10, 10, 0]},
        children: {
          sphere0: {
            form: {
              type: "'sphere.i3d'",
              textureurl: "glad_png",
              r: 4.0,
              wsegments: 20.0,
              hsegments: 20.0,
              color: "white"
            },
            transform: {t: [10, 10, 0]}
          },
          sphere1: {
            form: {
              type: "'sphere.i3d'",
              r: 4.0,
              wsegments: 20.0,
              hsegments: 20.0,
              opacity: 0.5,
              color: "red",
              transparent: true
            },
            transform: {t: [10, -10, 0]}
          },
          sphere2: {
            form: {
              type: "'sphere.i3d'",
              r: 16.0,
              wsegments: 20.0,
              hsegments: 20.0,
              opacity: 0.5,
              color: "red",
              transparent: true
            },
            transform: {t: [-10, 10, 0]}
          }
        }
      },
      tree0: {
        form: {
          type: "'cube.i3d'",
          textureurl: "sky_jpg",
          w: 20.0,
          h: 20.0,
          d: 20.0,
          opacity: 1.0,
          color: "blue"
        },
        transform: {t: [-30, 0, 0]},
        children: {bb_0: {
            form: {
              type: "'billboard.i3d'",
              textureurl: "sky_jpg",
              w: 10,
              h: 10,
              aspect: true
            },
            children: {
              bb_0_0: {
                form: {
                  type: "'billboard.i3d'",
                  textureurl: "glad_png",
                  w: 10,
                  h: 10,
                  aspect: true
                },
                transform: {t: [20, 10, 0]}
              },
              bb_0_1: {
                form: {
                  type: "'billboard.i3d'",
                  textureurl: "glad_png",
                  w: 10,
                  h: 10,
                  aspect: true
                },
                transform: {t: [10, -10, 0]}
              },
              bb_0_2: {
                form: {
                  type: "'billboard.i3d'",
                  textureurl: "glad_png",
                  w: 10,
                  h: 10,
                  aspect: true
                },
                transform: {t: [10, 20, 0]}
              }
            }
          }}
      }
    }
  }};

//# sourceMappingURL=../../../models/i3d/i3d-scene/mf0.js.map
"use strict";
var mf1 = {actors: {
    camerasphere: {csphere: {
        form: {
          r: 50.0,
          visible: true,
          wireframe: true,
          transparent: true,
          opacity: 1.0,
          color: "red"
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {}
      }},
    metaforms: {tree0: {
        form: {
          type: "'cube.i3d'",
          visible: true,
          wireframe: true,
          transparent: false,
          opacity: 1.0,
          color: "red"
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {
          alpha: {
            form: {
              type: "'cube.i3d'",
              visible: true,
              wireframe: true,
              transparent: false,
              opacity: 0.6,
              color: "green"
            },
            transform: {t: [20.0, 0.0, 0.0]},
            children: {}
          },
          beta: {
            form: {
              type: "'cube.i3d'",
              visible: true,
              wireframe: true,
              transparent: false,
              opacity: 1.0,
              color: "blue"
            },
            transform: {t: [0.0, 20.0, 0.0]},
            children: {
              delta1: {
                form: {
                  type: "'cube.i3d'",
                  visible: true,
                  wireframe: true,
                  transparent: false,
                  opacity: 1.0,
                  color: "yellow"
                },
                transform: {t: [20.0, 20.0, 0.0]},
                children: {}
              },
              delta2: {
                form: {
                  type: "'cube.i3d'",
                  visible: true,
                  wireframe: true,
                  transparent: false,
                  opacity: 1.0,
                  color: "violet"
                },
                transform: {t: [-20.0, -20.0, 0.0]},
                children: {}
              }
            }
          },
          gamma: {
            form: "'cube.i3d'",
            visible: true,
            wireframe: true,
            transparent: false,
            opacity: 1.0,
            color: "orange",
            transform: {t: [-20.0, 0.0, 0.0]},
            children: {}
          }
        }
      }}
  }};

//# sourceMappingURL=../../../models/i3d/i3d-scene/mf1.js.map
"use strict";
var mf2 = {actors: {
    camerasphere: {csphere: {
        form: {
          r: 50.0,
          visible: true,
          wireframe: true,
          transparent: true,
          opacity: 1.0,
          color: "red"
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {}
      }},
    metaforms: {tree0: {
        form: {
          type: "'cube.i3d'",
          textureurl: "sky_jpg",
          w: 20.0,
          h: 20.0,
          d: 20.0,
          opacity: 1.0,
          color: "blue",
          visible: true
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {
          alpha: {
            form: {
              type: "'cube.i3d'",
              width: 10,
              height: 30,
              depth: 10,
              visible: true,
              transparent: false,
              opacity: 0.6,
              color: "green"
            },
            transform: {t: [0.0, 20.0, 0.0]},
            children: {}
          },
          beta: {
            form: {
              type: "'cube.i3d'",
              width: 10,
              height: 10,
              depth: 10,
              visible: true,
              wireframe: true,
              opacity: 1.0,
              color: "blue"
            },
            transform: {t: [-20.0, -20.0, 0.0]},
            children: {gamma: {
                form: {
                  "type": "'cube.i3d'",
                  width: 10,
                  height: 30,
                  depth: 10,
                  visible: true,
                  wireframe: true,
                  opacity: 1.0,
                  color: "red"
                },
                transform: {t: [20.0, 0.0, 0.0]},
                children: {}
              }}
          }
        }
      }}
  }};

//# sourceMappingURL=../../../models/i3d/i3d-scene/mf2.js.map
"use strict";
var scene0 = {actors: {
    camerasphere: {csphere: {
        form: {
          r: 50.0,
          visible: true,
          wireframe: true,
          transparent: true,
          opacity: 1.0,
          color: "red"
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {}
      }},
    metaforms: {tree0: {
        form: {
          type: "'cube.i3d'",
          textureurl: "./images/sky.jpg",
          w: 20.0,
          h: 20.0,
          d: 20.0,
          opacity: 1.0,
          color: "blue",
          visible: true
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {
          alpha: {
            form: {
              type: "'cube.i3d'",
              width: 10,
              height: 30,
              depth: 10,
              visible: true,
              transparent: false,
              opacity: 0.6,
              color: "green"
            },
            transform: {t: [0.0, 20.0, 0.0]},
            children: {}
          },
          beta: {
            form: {
              type: "'cube.i3d'",
              width: 10,
              height: 10,
              depth: 10,
              visible: true,
              wireframe: true,
              opacity: 1.0,
              color: "blue"
            },
            transform: {t: [-20.0, -20.0, 0.0]},
            children: {gamma: {
                form: {
                  "type": "'cube.i3d'",
                  width: 10,
                  height: 30,
                  depth: 10,
                  visible: true,
                  wireframe: true,
                  opacity: 1.0,
                  color: "red"
                },
                transform: {t: [20.0, 0.0, 0.0]},
                children: {}
              }}
          }
        }
      }},
    axes: {axes0: {form: {length: 3000.0}}},
    alights: {
      alight0: {form: {color: "0x000022"}},
      alight1: {form: {color: "0xff0000"}}
    },
    dlights: {
      dlight0: {form: {
          color: "0xffffff",
          directionx: 1,
          directiony: 1,
          directionz: 1
        }},
      dlight1: {form: {
          color: "0x002288",
          directionx: -1,
          directiony: -1,
          directionz: -1
        }},
      dlight2: {form: {
          color: "0x00ff00",
          directionx: 1,
          directiony: -1,
          directionz: -1
        }}
    },
    cubes: {cube0: {
        form: {
          type: "'cube.i3d'",
          x: 0.0,
          y: 0.0,
          z: 0.0,
          textureurl: "./images/sky.jpg",
          w: 20.0,
          h: 20.0,
          d: 20.0
        },
        transform: {
          t: [0.0, 25.0, 0.0],
          e: [0.0, 0.785, 0.0],
          s: [1.0, 2.0, 1.0]
        },
        children: {}
      }},
    spheres: {
      sphere0: {
        form: {
          textureurl: "glad_png",
          r: 4.0,
          wsegments: 20.0,
          hsegments: 20.0,
          color: "white"
        },
        transform: {t: [10, 10, 0]}
      },
      sphere1: {
        form: {
          r: 4.0,
          wsegments: 20.0,
          hsegments: 20.0,
          opacity: 0.5,
          color: "red",
          transparent: true
        },
        transform: {t: [10, -10, 0]}
      },
      sphere2: {
        form: {
          r: 16.0,
          wsegments: 20.0,
          hsegments: 20.0,
          opacity: 0.5,
          color: "red",
          transparent: true
        },
        transform: {t: [-10, 10, 0]}
      }
    },
    billboards: {bb_singular: {
        form: {
          textureurl: "./images/snow_posZ.jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [20, 20, -10]}
      }}
  }};

//# sourceMappingURL=../../../models/i3d/i3d-scene/scene0.js.map
"use strict";
var scene1 = {actors: {
    camerasphere: {csphere: {
        form: {
          r: 50.0,
          visible: true,
          wireframe: true,
          transparent: true,
          opacity: 1.0,
          color: "red"
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {}
      }},
    billboards: {
      bb_singular: {
        form: {
          textureurl: "./images/snow_posZ.jpg",
          w: 50,
          h: 50,
          aspect: true
        },
        transform: {t: [20, 20, -10]}
      },
      bb_singular2: {
        form: {
          textureurl: "sky_jpg",
          w: 50,
          h: 50,
          aspect: true
        },
        transform: {t: [25, 25, 0]}
      },
      bb0: {
        form: {
          textureurl: "Escher_png",
          w: 50,
          h: 50,
          aspect: true
        },
        transform: {t: [0, 0, 0]}
      },
      bb1: {
        form: {
          textureurl: "Escher_png",
          w: 50,
          h: 50,
          aspect: true
        },
        transform: {t: [0, -100, 0]}
      },
      bb2: {
        form: {
          textureurl: "glad_png",
          w: 50,
          h: 50,
          aspect: true
        },
        transform: {t: [0, 100, 0]}
      },
      bb3: {
        form: {
          textureurl: "p2_jpg",
          w: 50,
          h: 50,
          aspect: true
        },
        transform: {t: [-100, 0, 0]}
      },
      bb4: {
        form: {
          textureurl: "sky_jpg",
          w: 50,
          h: 50,
          aspect: true
        },
        transform: {t: [100, 0, 0]}
      },
      bb5: {
        form: {
          textureurl: "Escher_png",
          w: 50,
          h: 50,
          aspect: true
        },
        transform: {t: [-100, 100, 0]}
      },
      bb6: {
        form: {
          textureurl: "glad_png",
          w: 50,
          h: 50,
          aspect: true
        },
        transform: {t: [100, 100, 0]}
      },
      bb7: {
        form: {
          textureurl: "p2_jpg",
          w: 50,
          h: 50,
          aspect: true
        },
        transform: {t: [-100, -100, 0]}
      },
      bb8: {
        form: {
          textureurl: "sky_jpg",
          w: 50,
          h: 50,
          aspect: true
        },
        transform: {t: [100, -100, 0]}
      },
      bb18: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [300, 0, 0]}
      },
      bb19: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [300, -100, 0]}
      },
      bb20: {
        form: {
          textureurl: "glad_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [300, 100, 0]}
      },
      bb21: {
        form: {
          textureurl: "p2_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [200, 0, 0]}
      },
      bb22: {
        form: {
          textureurl: "sky_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [400, 0, 0]}
      },
      bb23: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [200, 100, 0]}
      },
      bb24: {
        form: {
          textureurl: "glad_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [400, 100, 0]}
      },
      bb25: {
        form: {
          textureurl: "p2_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [200, -100, 0]}
      },
      bb26: {
        form: {
          textureurl: "sky_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [400, -100, 0]}
      },
      bb54: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-300, -0, 0]}
      },
      bb55: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-300, -100, 0]}
      },
      bb56: {
        form: {
          textureurl: "glad_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-300, 100, 0]}
      },
      bb57: {
        form: {
          textureurl: "p2_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-400, 0, 0]}
      },
      bb58: {
        form: {
          textureurl: "sky_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-200, 0, 0]}
      },
      bb59: {
        form: {
          textureurl: "Escher_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-400, 100, 0]}
      },
      bb60: {
        form: {
          textureurl: "glad_png",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-200, 100, 0]}
      },
      bb61: {
        form: {
          textureurl: "p2_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-400, -100, 0]}
      },
      bb62: {
        form: {
          textureurl: "sky_jpg",
          width: 50,
          height: 50,
          aspect: true
        },
        transform: {t: [-200, -100, 0]}
      }
    }
  }};

//# sourceMappingURL=../../../models/i3d/i3d-scene/scene1.js.map
"use strict";
var phong_head_sphere_kfb = {actors: {
    camerasphere: {csphere: {
        form: {
          r: 50.0,
          visible: true,
          wireframe: true,
          transparent: true,
          opacity: 1.0,
          color: "green"
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {
          key: {
            form: {
              type: "'pointlight.i3d'",
              color: 'orange',
              intensity: 2.5,
              distance: 100.0
            },
            transform: {t: [50.0, 20.0, 0.0]}
          },
          fill: {
            form: {
              type: "'pointlight.i3d'",
              color: 'blue',
              intensity: 1.0,
              distance: 100.0
            },
            transform: {t: [-50.0, -10.0, 0.0]}
          },
          back: {
            form: {
              type: "'pointlight.i3d'",
              color: 'grey',
              intensity: 2.5,
              distance: 100.0
            },
            transform: {t: [-40.0, -10.0, -50.0]}
          }
        }
      }},
    axes: {axes0: {form: {length: 3000.0}}},
    jsonmodels: {head_scan: {
        form: {
          type: "'jsonmodel.i3d'",
          jsonmodel_url: './webgl/models/head_scan/head_scan.js',
          color: 'white',
          phong: true,
          specular_color: 'orange',
          shininess: 3.0
        },
        transform: {
          t: [0.0, -12.0, 0.0],
          e: [0.0, 0.185, 0.0],
          s: [8.0, 8.0, 8.0]
        },
        children: {}
      }},
    spheres: {sphere_phong: {
        form: {
          type: "'sphere.i3d'",
          color: 'white',
          phong: true,
          specular_color: 'orange',
          shininess: 5.0,
          r: 10.0,
          wsegments: 60.0,
          hsegments: 60.0
        },
        transform: {t: [0.0, 30.0, 0.0]},
        children: {}
      }}
  }};

//# sourceMappingURL=../../../models/i3d/i3d-simple/phong_head_sphere_kfb.js.map
"use strict";
var simple_blue = {actors: {
    camerasphere: {csphere: {
        form: {
          r: 50.0,
          visible: true,
          wireframe: true,
          transparent: true,
          opacity: 1.0,
          color: "blue"
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {}
      }},
    axes: {
      axesorigin: {form: {length: 3000.0}},
      axes1: {
        form: {length: 3000.0},
        transform: {
          t: [10.0, 20.0, 0.0],
          e: [0.0, 0.3, 0.0]
        }
      }
    },
    dlights: {
      dlight0: {
        form: {
          color: "blue",
          directionx: 1,
          directiony: 1,
          directionz: 1
        },
        transform: {t: [10.0, 40.0, 0.0]}
      },
      dlight1: {form: {
          color: "red",
          directionx: -1,
          directiony: -1,
          directionz: -1
        }},
      dlight2: {form: {
          color: "#00ff00",
          directionx: 1,
          directiony: -1,
          directionz: -1
        }}
    },
    cubes: {cube0: {
        form: {
          type: "'cube.i3d'",
          textureurl: "./images/glad.png",
          w: 20.0,
          h: 20.0,
          d: 20.0
        },
        transform: {
          t: [0.0, 25.0, 0.0],
          e: [0.0, 0.785, 0.0],
          s: [1.0, 2.0, 1.0]
        },
        children: {}
      }}
  }};

//# sourceMappingURL=../../../models/i3d/i3d-simple/simple_blue.js.map
"use strict";
var simple_green = {actors: {
    camerasphere: {csphere: {
        form: {
          r: 50.0,
          visible: true,
          wireframe: true,
          transparent: true,
          opacity: 1.0,
          color: "green"
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {}
      }},
    axes: {axes0: {form: {length: 3000.0}}},
    cubes: {cube0: {
        form: {
          type: "'cube.i3d'",
          textureurl: "./images/sky.jpg",
          w: 10.0,
          h: 10.0,
          d: 10.0
        },
        transform: {
          t: [0.0, 25.0, 0.0],
          e: [0.0, 0.785, 0.0],
          s: [0.5, 1.0, 0.5]
        },
        children: {}
      }}
  }};

//# sourceMappingURL=../../../models/i3d/i3d-simple/simple_green.js.map
"use strict";
var simple_green_empty = {actors: {
    camerasphere: {csphere: {
        form: {
          r: 50.0,
          visible: true,
          wireframe: true,
          transparent: true,
          opacity: 1.0,
          color: "green"
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {}
      }},
    axes: {axes0: {form: {length: 3000.0}}}
  }};

//# sourceMappingURL=../../../models/i3d/i3d-simple/simple_green_empty.js.map
"use strict";
var simple_phong = {actors: {
    camerasphere: {csphere: {
        form: {
          r: 50.0,
          visible: true,
          wireframe: true,
          transparent: true,
          opacity: 1.0,
          color: "green"
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {
          key: {
            form: {
              type: "'spotlight.i3d'",
              color: 'orange',
              intensity: 2.5,
              distance: 30.0
            },
            transform: {t: [20.0, 20.0, 20.0]}
          },
          fill: {
            form: {
              type: "'spotlight.i3d'",
              color: 'blue',
              intensity: 0.8,
              distance: 30.0
            },
            transform: {t: [-20.0, -10.0, 20.0]}
          },
          back: {
            form: {
              type: "'pointlight.i3d'",
              color: 'grey',
              intensity: 2.0,
              distance: 50.0
            },
            transform: {t: [-40.0, 0.0, -20.0]}
          }
        }
      }},
    axes: {axes0: {form: {length: 3000.0}}},
    spheres: {sphere_phong: {
        form: {
          type: "'sphere.i3d'",
          color: 'white',
          phong: true,
          specular_color: 'white',
          shininess: 2.0,
          r: 10.0,
          wsegments: 60.0,
          hsegments: 60.0
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {}
      }}
  }};

//# sourceMappingURL=../../../models/i3d/i3d-simple/simple_phong.js.map
"use strict";
var simple_phong1 = {actors: {
    camerasphere: {csphere: {
        form: {
          r: 50.0,
          visible: true,
          wireframe: true,
          transparent: true,
          opacity: 1.0,
          color: "green"
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {
          key: {
            form: {
              type: "'pointlight.i3d'",
              color: 'orange',
              intensity: 1.0,
              distance: 100.0
            },
            transform: {t: [50.0, 0.0, 0.0]}
          },
          fill: {
            form: {
              type: "'pointlight.i3d'",
              color: 'blue',
              intensity: 1.0,
              distance: 100.0
            },
            transform: {t: [-50.0, 0.0, 0.0]}
          }
        }
      }},
    axes: {axes0: {form: {length: 3000.0}}},
    spheres: {sphere_phong: {
        form: {
          type: "'sphere.i3d'",
          color: 'white',
          phong: true,
          specular_color: 'orange',
          shininess: 5.0,
          r: 10.0,
          wsegments: 60.0,
          hsegments: 60.0
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {}
      }}
  }};

//# sourceMappingURL=../../../models/i3d/i3d-simple/simple_phong1.js.map
"use strict";
var simple_phong_kfb = {actors: {
    camerasphere: {csphere: {
        form: {
          r: 50.0,
          visible: true,
          wireframe: true,
          transparent: true,
          opacity: 1.0,
          color: "green"
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {
          key: {
            form: {
              type: "'pointlight.i3d'",
              color: 'orange',
              intensity: 2.5,
              distance: 100.0
            },
            transform: {t: [50.0, 20.0, 0.0]}
          },
          fill: {
            form: {
              type: "'pointlight.i3d'",
              color: 'blue',
              intensity: 1.0,
              distance: 100.0
            },
            transform: {t: [-50.0, -10.0, 0.0]}
          },
          back: {
            form: {
              type: "'pointlight.i3d'",
              color: 'grey',
              intensity: 2.5,
              distance: 100.0
            },
            transform: {t: [-40.0, -10.0, -50.0]}
          }
        }
      }},
    axes: {axes0: {form: {length: 3000.0}}},
    spheres: {sphere_phong: {
        form: {
          type: "'sphere.i3d'",
          color: 'white',
          phong: true,
          specular_color: 'orange',
          shininess: 5.0,
          r: 10.0,
          wsegments: 60.0,
          hsegments: 60.0
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {}
      }}
  }};

//# sourceMappingURL=../../../models/i3d/i3d-simple/simple_phong_kfb.js.map
"use strict";
var simple_red = {actors: {
    camerasphere: {csphere: {
        form: {
          r: 50.0,
          visible: true,
          wireframe: true,
          transparent: true,
          opacity: 1.0,
          color: "red"
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {}
      }},
    cubes: {cube0: {
        form: {
          type: "'cube.i3d'",
          textureurl: "sky_jpg",
          w: 20.0,
          h: 20.0,
          d: 20.0
        },
        transform: {
          t: [0.0, 15.0, 0.0],
          e: [0.0, 0.785, 0.0],
          s: [1.0, 1.0, 1.0]
        },
        children: {
          cube0_0: {
            form: {
              type: "'cube.i3d'",
              textureurl: "glad_png",
              w: 10.0,
              h: 10.0,
              d: 10.0
            },
            transform: {
              t: [20.0, 25.0, 0.0],
              s: [2.0, 2.0, 1.0]
            },
            children: {}
          },
          cube0_1: {
            form: {
              type: "'cube.i3d'",
              color: 'green',
              wireframe: true,
              w: 10.0,
              h: 10.0,
              d: 10.0
            },
            transform: {
              t: [-20.0, 25.0, 0.0],
              e: [0.0, 0.785, 0.0]
            },
            children: {}
          }
        }
      }}
  }};

//# sourceMappingURL=../../../models/i3d/i3d-simple/simple_red.js.map
"use strict";
var s0 = {delta: {
    branches: {},
    timeline: {
      p: {
        repeat: -1,
        yoyo: true
      },
      actors: {
        'base:cube': [{
          dur: 60,
          p: {
            rotationY: '360',
            delay: 0
          }
        }, {
          dur: 30,
          p: {
            rotationZ: '-360',
            delay: 30
          }
        }],
        'i2d:zoom_plane': [{
          dur: 30,
          p: {
            scale: 0.5,
            svgOrigin: '0% 0%'
          }
        }, {
          dur: 30,
          p: {
            rotation: 90,
            svgOrigin: '0% 0%',
            delay: 30
          }
        }],
        'i2d:c': [{
          dur: 30,
          p: {bezier: {
              autoRotate: true,
              curviness: 2,
              values: [{
                x: 0,
                y: 0
              }, {
                x: 10,
                y: -10
              }, {
                x: 10,
                y: 0
              }, {
                x: 10,
                y: 10
              }, {
                x: 0,
                y: 10
              }, {
                x: 0,
                y: 0
              }]
            }}
        }]
      }
    }
  }};

//# sourceMappingURL=../../../models/shot/shot-anim/s0.js.map
"use strict";
var a0 = {delta: {
    timeline: [{
      id: 'cube0_1',
      dur: 10,
      p: {scale: [1, 1, 1]},
      delay: 2
    }],
    branches: {cube0: {children: {
          cube0_2: {
            form: {
              type: "'cube.i3d'",
              x: 0.0,
              y: 0.0,
              z: 0.0,
              textureurl: "./images/sky.jpg",
              w: 20.0,
              h: 20.0,
              d: 20.0,
              color: "blue",
              transparent: true,
              opacity: 1.0
            },
            transform: {
              t: [-20, -10, 0],
              s: [0.25, 1, 0.25]
            },
            children: {}
          },
          cube0_3: {
            form: {
              type: "'cube.i3d'",
              x: 0.0,
              y: -20.0,
              z: 0.0,
              textureurl: "sky_jpg",
              w: 20.0,
              h: 40.0,
              d: 20.0,
              color: "blue",
              transparent: true,
              opacity: 1.0
            },
            transform: {
              t: [20, 0, 0],
              s: [0.5, 1, 0.5]
            },
            children: {}
          }
        }}}
  }};

//# sourceMappingURL=../../../models/shot/shot-graft/a0.js.map
"use strict";
var a0json = JSON.stringify({delta: {
    timeline: {},
    branches: {cube0: {children: {
          cube0_2: {
            form: {
              type: "'cube.i3d'",
              x: 0.0,
              y: 0.0,
              z: 0.0,
              textureurl: "./images/sky.jpg",
              w: 20.0,
              h: 20.0,
              d: 20.0,
              color: "blue",
              transparent: true,
              opacity: 1.0
            },
            transform: {
              t: [-20, -10, 0],
              s: [0.25, 1, 0.25]
            },
            children: {}
          },
          cube0_3: {
            form: {
              type: "'cube.i3d'",
              x: 0.0,
              y: -20.0,
              z: 0.0,
              textureurl: "sky_jpg",
              w: 20.0,
              h: 40.0,
              d: 20.0,
              color: "blue",
              transparent: true,
              opacity: 1.0
            },
            transform: {
              t: [20, 0, 0],
              s: [0.5, 1, 0.5]
            },
            children: {}
          }
        }}}
  }});

//# sourceMappingURL=../../../models/shot/shot-graft/a0json.js.map
"use strict";
var a1json = JSON.stringify({delta: {
    timeline: {},
    branches: {cube0_2: {children: {
          s0_2_0: {
            form: {
              type: "'sphere.i3d'",
              r: 5.0,
              color: "blue",
              transparent: true,
              opacity: 0.8
            },
            transform: {
              e: [0, -0.785, 0],
              t: [-15, -10, 10],
              s: [1, 1, 1]
            },
            children: {}
          },
          s0_2_1: {
            form: {
              type: "'sphere.i3d'",
              r: 5.0,
              color: "blue",
              transparent: true,
              opacity: 0.8
            },
            transform: {
              e: [0, 0.785, 0],
              t: [15, 10, 10],
              s: [1, 1, 1]
            },
            children: {}
          }
        }}}
  }});

//# sourceMappingURL=../../../models/shot/shot-graft/a1json.js.map
"use strict";
var cube0json = JSON.stringify({delta: {
    timeline: {},
    branches: {'i3d': {children: {'cube0': {
            form: {
              type: "'cube.i3d'",
              x: 0.0,
              y: 0.0,
              z: 0.0,
              textureurl: "./images/sky.jpg",
              w: 10.0,
              h: 10.0,
              d: 10.0,
              color: "blue",
              transparent: true,
              opacity: 1.0
            },
            transform: {
              t: [-10, -10, 0],
              s: [1.0, 1.0, 1.0]
            },
            children: {}
          }}}}
  }});

//# sourceMappingURL=../../../models/shot/shot-graft/cube0json.js.map
"use strict";
var growa0json = JSON.stringify({delta: {
    timeline: {
      p: {repeat: 0},
      actors: {'i3d:cube0:scale': [{
          dur: 10,
          p: {
            x: 0.5,
            y: 0.5,
            z: 0.5
          }
        }]}
    },
    branches: {cube0: {children: {
          cube0_2: {
            form: {
              type: "'cube.i3d'",
              x: 0.0,
              y: 0.0,
              z: 0.0,
              textureurl: "./images/sky.jpg",
              w: 5.0,
              h: 10.0,
              d: 10.0,
              color: "blue",
              transparent: true,
              opacity: 1.0
            },
            transform: {
              t: [-20, -10, 0],
              s: [0.01, 0.01, 0.01]
            },
            children: {}
          },
          cube0_3: {
            form: {
              type: "'cube.i3d'",
              x: 0.0,
              y: -20.0,
              z: 0.0,
              textureurl: "sky_jpg",
              w: 5.0,
              h: 10.0,
              d: 10.0,
              color: "blue",
              transparent: true,
              opacity: 1.0
            },
            transform: {
              t: [20, 0, 0],
              s: [0.01, 0.01, 0.01]
            },
            children: {}
          }
        }}}
  }});

//# sourceMappingURL=../../../models/shot/shot-graft/growa0json.js.map
"use strict";
var growa1json = JSON.stringify({delta: {
    timeline: {
      p: {repeat: 0},
      actors: {
        'i3d:cube0_2:scale': [{
          dur: 10,
          p: {
            x: 1.0,
            y: 1.0,
            z: 1.0
          }
        }],
        'i3d:cube0_3:scale': [{
          dur: 10,
          p: {
            x: 1.0,
            y: 1.0,
            z: 1.0
          }
        }]
      }
    },
    branches: {cube0_2: {children: {
          s0_2_0: {
            form: {
              type: "'sphere.i3d'",
              r: 5.0,
              color: "blue",
              transparent: true,
              opacity: 0.8
            },
            transform: {
              e: [0, -0.785, 0],
              t: [-10, -10, 0],
              s: [0.01, 0.01, 0.01]
            },
            children: {}
          },
          s0_2_1: {
            form: {
              type: "'sphere.i3d'",
              r: 5.0,
              color: "blue",
              transparent: true,
              opacity: 0.8
            },
            transform: {
              e: [0, 0.785, 0],
              t: [10, 10, 0],
              s: [0.01, 0.01, 0.01]
            },
            children: {}
          }
        }}}
  }});

//# sourceMappingURL=../../../models/shot/shot-graft/growa1json.js.map
"use strict";
var growa2json = JSON.stringify({delta: {
    timeline: {
      p: {repeat: 0},
      actors: {
        'i3d:s0_2_0:scale': [{
          dur: 10,
          p: {
            x: 1.0,
            y: 1.0,
            z: 1.0
          }
        }],
        'i3d:s0_2_1:scale': [{
          dur: 10,
          p: {
            x: 1.0,
            y: 1.0,
            z: 1.0
          }
        }]
      }
    },
    branches: {}
  }});

//# sourceMappingURL=../../../models/shot/shot-graft/growa2json.js.map
"use strict";
var defsuse0 = {actors: {defsuse: {
      du0: {
        form: {
          id: "#red-square",
          x: -10,
          y: -10,
          style: "stroke:blue ; stroke-width:1%"
        },
        transform: "scale(0.5)"
      },
      du1: {
        form: {
          id: "#green-square",
          x: -20,
          y: -20
        },
        transform: "scale(1.0)"
      }
    }}};

//# sourceMappingURL=../../../models/i2d/i2d-scene/defsuse0.js.map
"use strict";
var disks0 = {actors: {disks: {
      d0: {
        transform: 'translate(20,20)',
        form: {
          r: '10',
          fill: 'green',
          'fill_opacity': '0.5',
          stroke: 'orange',
          'stroke_opacity': '0.5',
          'stroke_width': '2',
          'stroke_dasharray': '1,1'
        }
      },
      d1: {
        transform: 'translate(25,25)',
        form: {
          r: '5',
          fill: 'violet',
          'fill_opacity': '0.5',
          stroke: 'yellow',
          'stroke_opacity': '0.5',
          'stroke_width': '1',
          'stroke_dasharray': '1,1'
        }
      }
    }}};

//# sourceMappingURL=../../../models/i2d/i2d-scene/disks0.js.map
"use strict";
var mf2d0 = {actors: {metaforms: {tree0: {
        form: {id: "#green-square"},
        transform: 'scale(0.5)',
        children: {
          'd0': {
            form: {id: "#red-disk"},
            transform: 'translate(10,15)',
            children: {"a": {
                form: {id: "#green-disk"},
                transform: 'translate(-20,-30)',
                children: {"a1": {
                    form: {id: "#blue-disk"},
                    transform: 'translate(-10,-10)',
                    children: {}
                  }}
              }}
          },
          'd1': {
            form: {id: "#blue-disk"},
            transform: 'translate(15,25)',
            children: {}
          },
          'd2': {
            form: {id: "#green-disk"},
            transform: 'translate(20,35)',
            children: {}
          },
          'd3': {
            form: {id: "#blue-disk"},
            transform: 'translate(0,0)',
            children: {}
          }
        }
      }}}};

//# sourceMappingURL=../../../models/i2d/i2d-scene/mf2d0.js.map
"use strict";
var scene2d0 = {actors: {
    defsuse: {
      du0: {
        form: {
          id: "#red-square",
          x: -10,
          y: -10,
          style: "stroke:blue ; stroke-width:1%"
        },
        transform: "scale(0.5)"
      },
      du1: {
        form: {
          id: "#green-square",
          x: -20,
          y: -20
        },
        transform: "scale(1.0)"
      }
    },
    disks: {
      d0: {
        transform: 'translate(20,20)',
        form: {
          r: '10',
          fill: 'green',
          'fill_opacity': '0.5',
          stroke: 'orange',
          'stroke_opacity': '0.5',
          'stroke_width': '2',
          'stroke_dasharray': '1,1'
        }
      },
      d1: {
        transform: 'translate(25,25)',
        form: {
          r: '5',
          fill: 'violet',
          'fill_opacity': '0.5',
          stroke: 'yellow',
          'stroke_opacity': '0.5',
          'stroke_width': '1',
          'stroke_dasharray': '1,1'
        }
      }
    },
    metaforms: {tree0: {
        form: {id: "#green-square"},
        transform: 'scale(0.5)',
        children: {
          '0': {
            form: {id: "#red-disk"},
            transform: 'translate(10,15)',
            children: {"a": {
                form: {id: "#green-disk"},
                transform: 'translate(-20,-30)',
                children: {"a1": {
                    form: {id: "#blue-disk"},
                    transform: 'translate(-10,-10)',
                    children: {}
                  }}
              }}
          },
          '1': {
            form: {id: "#blue-disk"},
            transform: 'translate(15,25)',
            children: {}
          },
          '2': {
            form: {id: "#green-disk"},
            transform: 'translate(20,35)',
            children: {}
          },
          '3': {
            id: "#blue-disk",
            transform: 'translate(0,0)',
            children: {}
          }
        }
      }}
  }};

//# sourceMappingURL=../../../models/i2d/i2d-scene/scene2d0.js.map
"use strict";
var moon = {
  faces: {
    front: "url('./images/css3d/skybox/moon/grimnight_posZ.png')",
    back: "url('./images/css3d/skybox/moon/grimnight_negZ.png')",
    left: "url('./images/css3d/skybox/moon/grimnight_negX.png')",
    right: "url('./images/css3d/skybox/moon/grimnight_posX.png')",
    sky: "url('./images/css3d/skybox/moon/grimnight_posY.png')",
    ground: "url('./images/css3d/skybox/moon/grimnight_negY.png')"
  },
  animation: {
    dur: '300s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../../models/base/base-skycube-rotate/skybox/moon.js.map
"use strict";
var sky = {
  faces: {
    front: "url('./images/css3d/skybox/sky/sky_posZ.jpg')",
    back: "url('./images/css3d/skybox/sky/sky_negZ.jpg')",
    left: "url('./images/css3d/skybox/sky/sky_negX.jpg')",
    right: "url('./images/css3d/skybox/sky/sky_posX.jpg')",
    sky: "url('./images/css3d/skybox/sky/sky_posY.jpg')",
    ground: "url('./images/css3d/skybox/sky/sky_negY.jpg')"
  },
  animation: {
    dur: '300s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../../models/base/base-skycube-rotate/skybox/sky.js.map
"use strict";
var snow = {
  faces: {
    front: "url('./images/css3d/skybox/snow/snow_posZ.jpg')",
    back: "url('./images/css3d/skybox/snow/snow_negZ.jpg')",
    left: "url('./images/css3d/skybox/snow/snow_negX.jpg')",
    right: "url('./images/css3d/skybox/snow/snow_posX.jpg')",
    sky: "url('./images/css3d/skybox/snow/snow_posY.jpg')",
    ground: "url('./images/css3d/skybox/snow/snow_negY.jpg')"
  },
  animation: {
    dur: '120s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../../models/base/base-skycube-rotate/skybox/snow.js.map
"use strict";
var space = {
  faces: {
    front: "url('./images/css3d/skybox/space/space_posZ.jpg')",
    back: "url('./images/css3d/skybox/space/space_negZ.jpg')",
    left: "url('./images/css3d/skybox/space/space_negX.jpg')",
    right: "url('./images/css3d/skybox/space/space_posX.jpg')",
    sky: "url('./images/css3d/skybox/space/space_posY.jpg')",
    ground: "url('./images/css3d/skybox/space/space_negY.jpg')"
  },
  animation: {
    dur: '300s',
    repeat: 'infinite'
  }
};

//# sourceMappingURL=../../../../models/base/base-skycube-rotate/skybox/space.js.map