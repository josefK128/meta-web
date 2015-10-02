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
        if (/shot-fixed:\{}$/.test(url)) {
          url = url.replace(/\{}$/, "");
        } else {
          if (/\{}$/.test(url)) {
            url = url.replace(/\{}$/, "shot-fixed:");
          }
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