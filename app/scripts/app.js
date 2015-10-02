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