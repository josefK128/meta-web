"use strict";
var unit_spec = (function(Mediator, Mixin, Transform3d, Camera3d, config) {
  "use strict";
  var test_mediator = true,
      test_mixin = true,
      test_t3d = true,
      test_c3d = true,
      tests = 0,
      failed = 0,
      test = {
        c3d: function() {
          var tests = 0,
              failed = 0;
          console.log("Camera3d.lookAt:test case1");
          var r = Camera3d.lookAt(0, 0, 0);
          tests++;
          if (Array.isArray(r)) {
            tests++;
            var $__3 = true;
            var $__4 = false;
            var $__5 = undefined;
            try {
              for (var $__1 = void 0,
                  $__0 = (r)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__3 = ($__1 = $__0.next()).done); $__3 = true) {
                var e = $__1.value;
                {
                  if (e !== 0) {
                    console.log(("!C3d.lookAt:expected array of three zeros: r=" + r));
                    failed++;
                    break;
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
          } else {
            console.log(("!C3d.lookAt:expected array return from camera3d.lookAt(0,0,0): r=" + r));
            failed++;
          }
          console.log("Camera3d.lookAt:test case2");
          r = Camera3d.lookAt([1, 1, 1]);
          tests++;
          if (Array.isArray(r)) {
            tests++;
            var $__10 = true;
            var $__11 = false;
            var $__12 = undefined;
            try {
              for (var $__8 = void 0,
                  $__7 = (r)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__10 = ($__8 = $__7.next()).done); $__10 = true) {
                var e$__25 = $__8.value;
                {
                  if (e$__25 !== 1) {
                    console.log(("!C3d.lookAt:expected array of three ones: r=" + r));
                    failed++;
                    break;
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
          } else {
            console.log(("!C3d.lookAt:expected array return from camera3d.lookAt([1,1,1]): r=" + r));
            failed++;
          }
          console.log("Camera3d.lookAt:test case3");
          r = Camera3d.lookAt();
          tests++;
          if (Array.isArray(r)) {
            tests++;
            var $__17 = true;
            var $__18 = false;
            var $__19 = undefined;
            try {
              for (var $__15 = void 0,
                  $__14 = (r)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__17 = ($__15 = $__14.next()).done); $__17 = true) {
                var e$__26 = $__15.value;
                {
                  if (e$__26 !== 0) {
                    console.log(("!C3d.lookAt:expected array of three zeros: r=" + r));
                    failed++;
                    break;
                  }
                }
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
          } else {
            console.log(("!C3d.lookAtexpected array return from camera3d.lookAt(): r=" + r));
            failed++;
          }
          console.log("Camera3d.lookAt:test case4");
          r = Camera3d.lookAt('camera');
          tests++;
          if (Array.isArray(r)) {
            tests++;
            if (r[0] !== 0 || r[1] !== 0 || r[2] !== 50) {
              console.log(("!C3d.lookAt:expected array [0,0,50]: r=" + r));
              failed++;
            }
          } else {
            console.log(("!C3d.lookAt:expected array return from camera3d.lookAt(): r=" + r));
            failed++;
          }
          return {
            te: tests,
            f: failed
          };
        },
        mixin: function() {
          var tests = 0,
              failed = 0,
              o = {},
              F = function() {},
              instance = {},
              m0 = {ext: function() {
                  return "extension";
                }},
              proto = {
                p: "a",
                f: function() {
                  return 'foo';
                }
              },
              m1 = Object.create(proto);
          console.log("Mixin.extend:test case1");
          Mixin.extend(o, m0);
          tests++;
          if (o.ext() !== "extension") {
            console.log(("!Mixin.extend:expected o.ext()=\"extension\" \n              o.ext()=" + o.ext()));
            failed++;
          }
          console.log("Mixin.include:test case2");
          Mixin.include(F, m0);
          instance = new F();
          tests++;
          if (instance.ext() !== "extension") {
            console.log(("!Mixin.include:expected instance.ext()=\"extension\" \n              instance.ext()=" + instance.ext()));
            failed++;
          }
          console.log("Mixin.extend_all:test case3");
          o = {};
          Mixin.extend_all(o, m1);
          tests++;
          if (!Mixin.verify(o, 'p')) {
            console.log("!Mixin.extend_all:expected o to have property p");
            failed++;
          }
          tests++;
          if (!Mixin.verify(o, 'f')) {
            console.log("!Mixin.extend_all:expected o to have property f");
            failed++;
          }
          tests++;
          if (o.p !== 'a') {
            console.log(("!Mixin.extend_all:expected o.p='a' o.p=" + o.p));
            failed++;
          }
          tests++;
          if (o.f() !== 'foo') {
            console.log(("!Mixin.extend_all:expected o.f()='foo' o.f()=" + o.f()));
            failed++;
          }
          console.log("Mixin.include_all:test case4");
          Mixin.include_all(F, m1);
          instance = new F();
          tests++;
          if (!Mixin.verify(instance, 'p')) {
            console.log("!Mixin.include_all:expected instance to have property p");
            failed++;
          }
          tests++;
          if (!Mixin.verify(instance, 'f')) {
            console.log("!Mixin.include_all:expected instance to have property f");
            failed++;
          }
          tests++;
          if (instance.p !== 'a') {
            console.log(("!Mixin.include_all:expected instance.p='a' instancep=" + instance.p));
            failed++;
          }
          tests++;
          if (instance.f() !== 'foo') {
            console.log(("!Mixin.include_all:expected instance.f()='foo' instance.f()=" + instance.f()));
            failed++;
          }
          return {
            te: tests,
            f: failed
          };
        },
        mediator: function() {
          var tests = 0,
              failed = 0,
              r;
          tests++;
          if (check.assert(!Mediator.emit('foo', ""), "!Mediator.emit:expected send on non-existing channel 'foo' to return false")) {
            failed++;
          }
          tests++;
          console.log("Mediator.exec: id = csphere");
          r = Mediator.exec({
            id: 'csphere',
            f: "foo",
            a: 7
          });
          if (check.undefined(r) || check.emptyObject(r)) {
            console.log(("!Mediator.exec:expected full object - r=" + r));
            failed++;
          }
          tests++;
          console.log("Mediator.exec: id = :csphere");
          r = Mediator.exec({
            id: ':csphere',
            f: "foo",
            a: 7
          });
          if (check.undefined(r) || check.emptyObject(r)) {
            console.log(("!Mediator.exec:expected full object - r=" + r));
            failed++;
          }
          tests++;
          console.log("Mediator.exec: id = i3d:csphere");
          r = Mediator.exec({
            id: 'i3d:csphere',
            f: "foo",
            a: 7
          });
          if (check.undefined(r) || check.emptyObject(r)) {
            console.log(("!Mediator.exec:expected full object - r=" + r));
            failed++;
          }
          tests++;
          console.log("Mediator.exec: id = i2d:axes");
          r = Mediator.exec({
            id: 'i2d:axes',
            f: "foo",
            a: 7
          });
          if (check.undefined(r) || check.emptyObject(r)) {
            console.log(("!Mediator.exec:expected full object - r=" + r));
            failed++;
          }
          tests++;
          console.log("Mediator.exec: a = 'a' (single-value)");
          r = Mediator.exec({
            t: 'camera3d',
            f: "home",
            a: 'a'
          });
          if (check.undefined(r)) {
            console.log(("!Mediator.exec:expected single object - r=" + r));
            failed++;
          }
          tests++;
          console.log("Mediator.exec: a = ['a'] l=1");
          var a0 = Mediator.exec({
            t: 'camera3d',
            f: "home",
            a: ['a']
          }).a0;
          if (check.undefined(a0)) {
            console.log(("!Mediator.exec:expected defined element - a0=" + a0));
            failed++;
          }
          tests++;
          console.log("Mediator.exec: a = ['a', 'b'] l=2");
          var $__22 = Mediator.exec({
            t: 'camera3d',
            f: "home",
            a: ['a', 'b']
          }),
              b0 = $__22.b0,
              b1 = $__22.b1;
          if (check.undefined(b0) || check.undefined(b1)) {
            console.log("!Mediator.exec:expected defined b0, b1");
            failed++;
          }
          tests++;
          console.log("Mediator.exec: a = ['a', 'b', 'c'] l=3");
          var $__23 = Mediator.exec({
            t: 'camera3d',
            f: "home",
            a: ['a', 'b', 'c']
          }),
              c0 = $__23.c0,
              c1 = $__23.c1,
              c2 = $__23.c2;
          if (check.undefined(c0) || check.undefined(c1) || check.undefined(c2)) {
            console.log("Mediator.exec:expected defined c0, c1, c2");
            failed++;
          }
          tests++;
          console.log("Mediator.exec: a = ['a', 'b', 'c', 'd'] l=4");
          var $__24 = Mediator.exec({
            t: 'camera3d',
            f: "home",
            a: ['a', 'b', 'c', 'd']
          }),
              d0 = $__24.d0,
              d1 = $__24.d1,
              d2 = $__24.d2,
              d3 = $__24.d3;
          if (check.undefined(d0) || check.undefined(d1) || check.undefined(d2) || check.undefined(d3)) {
            console.log("Mediator.exec:expected defined d0, d1, d2, d3");
            failed++;
          }
          tests++;
          console.log("Mediator.exec: a = ['a', 'b', 'c', 'd', 'e'] l>4");
          r = Mediator.exec({
            t: 'camera3d',
            f: "home",
            a: ['a', 'b', 'c', 'd', 'e']
          });
          if (check.undefined(r) || !Array.isArray(r)) {
            console.log(("Mediator.exec:expected array length>4 - r=" + r));
            failed++;
          }
          return {
            te: tests,
            f: failed
          };
        },
        t3d: function() {
          var tests = 0,
              failed = 0,
              s = {s: [1, 1, 1]},
              r = {e: [0, 0, 0]},
              t = {t: [0, 0, 0]},
              m,
              mm,
              v;
          tests++;
          mm = (new THREE.Matrix4()).set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
          m = Transform3d.apply(s);
          if (Transform3d.verify(m, mm)) {
            console.log("s-id passes");
          } else {
            console.log("!s-d fails");
            failed++;
          }
          tests++;
          m = Transform3d.apply(r);
          if (Transform3d.verify(m, mm)) {
            console.log("r-id passes");
          } else {
            console.log("!r-id fails");
            failed++;
          }
          tests++;
          m = Transform3d.apply(t);
          if (Transform3d.verify(m, mm)) {
            console.log("t-id passes");
          } else {
            console.log("!t-id fails");
            failed++;
          }
          tests++;
          s = {s: [2, 1, 1]};
          mm = (new THREE.Matrix4()).set(2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
          m = Transform3d.apply(s);
          if (Transform3d.verify(m, mm)) {
            console.log("sx passes");
          } else {
            console.log("!sx fails");
            failed++;
          }
          tests++;
          s = {s: [1, 2, 1]};
          mm = (new THREE.Matrix4()).set(1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
          m = Transform3d.apply(s);
          if (Transform3d.verify(m, mm)) {
            console.log("sy passes");
          } else {
            console.log("!sy fails");
            failed++;
          }
          tests++;
          s = {s: [1, 1, 2]};
          mm = (new THREE.Matrix4()).set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1);
          m = Transform3d.apply(s);
          if (Transform3d.verify(m, mm)) {
            console.log("sz passes");
          } else {
            console.log("!sz fails");
            failed++;
          }
          tests++;
          r = {e: [0, 3.14159265, 0]};
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("yaw1 passes");
          } else {
            console.log("!yaw1 fails");
            failed++;
          }
          tests++;
          r = {e: [0, 1.5708, 0]};
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("yaw2 passes");
          } else {
            console.log("!yaw2 fails");
            failed++;
          }
          tests++;
          r = {e: [3.14159265, 0, 0]};
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("pitch1 passes");
          } else {
            console.log("!pitch1 fails");
            failed++;
          }
          tests++;
          r = {e: [1.5708, 0, 0]};
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("pitch2 passes");
          } else {
            console.log("!pitch2 fails");
            failed++;
          }
          tests++;
          r = {e: [0, 0, 3.14159265]};
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("roll1 passes");
          } else {
            console.log("!roll1 fails");
            failed++;
          }
          tests++;
          r = {e: [0, 0, 1.5708]};
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("roll2 passes");
          } else {
            console.log("!roll2 fails");
            failed++;
          }
          tests++;
          r = {q: [0, 1, 0, 0]};
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("yaw1-q passes");
          } else {
            console.log("!yaw1-q fails");
            failed++;
          }
          tests++;
          r = {q: [0, 0.707107, 0, 0.707107]};
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("yaw2-q passes");
          } else {
            console.log("!yaw2-q fails");
            failed++;
          }
          tests++;
          r = {q: [1, 0, 0, 0]};
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("pitch1-q passes");
          } else {
            console.log("!pitch1-q fails");
            failed++;
          }
          tests++;
          r = {q: [0.707107, 0, 0, 0.707107]};
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("pitch2-q passes");
          } else {
            console.log("!pitch2-q fails");
            failed++;
          }
          tests++;
          r = {q: [0, 0, 1, 0]};
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("roll1-q passes");
          } else {
            console.log("!roll1-q fails");
            failed++;
          }
          tests++;
          r = {q: [0, 0, 0.707107, 0.707107]};
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("roll2-q passes");
          } else {
            console.log("!roll2-q fails");
            failed++;
          }
          tests++;
          t = {t: [2, 0, 0]};
          m = Transform3d.apply(t);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(1, 0, 0, 2, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("tx passes");
          } else {
            console.log("!tx fails");
            failed++;
          }
          tests++;
          t = {t: [0, 2, 0]};
          m = Transform3d.apply(t);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(1, 0, 0, 0, 0, 1, 0, 2, 0, 0, 1, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("ty passes");
          } else {
            console.log("!ty fails");
            failed++;
          }
          tests++;
          t = {t: [0, 0, 2]};
          m = Transform3d.apply(t);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("tz passes");
          } else {
            console.log("!tz fails");
            failed++;
          }
          tests++;
          t = {
            t: [2, 0, 0],
            s: [1, 2, 1]
          };
          m = Transform3d.apply(t);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(1, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("tx passes");
          } else {
            console.log("!tx fails");
            failed++;
          }
          tests++;
          t = {
            t: [0, 2, 0],
            s: [1, 2, 1]
          };
          m = Transform3d.apply(t);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(1, 0, 0, 0, 0, 2, 0, 2, 0, 0, 1, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("ty-sy passes");
          } else {
            console.log("!ty-sy fails");
            failed++;
          }
          tests++;
          t = {
            t: [0, 0, 2],
            s: [1, 2, 1]
          };
          m = Transform3d.apply(t);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 2, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("tz-sy passes");
          } else {
            console.log("!tz-sy fails");
            failed++;
          }
          tests++;
          r = {
            t: [2, 0, 0],
            e: [0, 3.14159265, 0]
          };
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(-1, 0, 0, 2, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("yaw1-tx passes");
          } else {
            console.log("!yaw1-tx fails");
            failed++;
          }
          tests++;
          r = {
            t: [0, 2, 0],
            e: [0, 1.5708, 0]
          };
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(0, 0, 1, 0, 0, 1, 0, 2, -1, 0, 0, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("yaw2-ty passes");
          } else {
            console.log("!yaw2-ty fails");
            failed++;
          }
          tests++;
          r = {
            t: [0, 0, 2],
            e: [3.14159265, 0, 0]
          };
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 2, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("pitch1-tz passes");
          } else {
            console.log("!pitch1-tz fails");
            failed++;
          }
          tests++;
          r = {
            t: [2, 0, 0],
            e: [1.5708, 0, 0]
          };
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(1, 0, 0, 2, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("pitch2-tx passes");
          } else {
            console.log("!pitch2-tx fails");
            failed++;
          }
          tests++;
          r = {
            t: [0, 2, 0],
            e: [0, 0, 3.14159265]
          };
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(-1, 0, 0, 0, 0, -1, 0, 2, 0, 0, 1, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("roll1-ty passes");
          } else {
            console.log("!roll1-ty fails");
            failed++;
          }
          tests++;
          r = {
            t: [0, 0, 2],
            e: [0, 0, 1.5708]
          };
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("roll2-tz passes");
          } else {
            console.log("!roll2-tz fails");
            failed++;
          }
          tests++;
          r = {
            t: [2, 0, 0],
            q: [0, 1, 0, 0]
          };
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(-1, 0, 0, 2, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("yaw1-q-tx passes");
          } else {
            console.log("!yaw1-q-tx fails");
            failed++;
          }
          tests++;
          r = {
            t: [0, 2, 0],
            q: [0, 0.707107, 0, 0.707107]
          };
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(0, 0, 1, 0, 0, 1, 0, 2, -1, 0, 0, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("yaw2-q-ty passes");
          } else {
            console.log("!yaw2-q-ty fails");
            failed++;
          }
          tests++;
          r = {
            t: [0, 0, 2],
            q: [1, 0, 0, 0]
          };
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 2, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("pitch1-q-tz passes");
          } else {
            console.log("!pitch1-q-tz fails");
            failed++;
          }
          tests++;
          r = {
            t: [2, 0, 0],
            q: [0.707107, 0, 0, 0.707107]
          };
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(1, 0, 0, 2, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("pitch2-q-tx passes");
          } else {
            console.log("!pitch2-q-tx fails");
            failed++;
          }
          tests++;
          r = {
            t: [0, 2, 0],
            q: [0, 0, 1, 0]
          };
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(-1, 0, 0, 0, 0, -1, 0, 2, 0, 0, 1, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("roll1-q-ty passes");
          } else {
            console.log("!roll1-q-ty fails");
            failed++;
          }
          tests++;
          r = {
            t: [0, 0, 2],
            q: [0, 0, 0.707107, 0.707107]
          };
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("roll2-q-tz passes");
          } else {
            console.log("!roll2-q-tz fails");
            failed++;
          }
          tests++;
          r = {
            t: [2, 0, 0],
            e: [0, 3.14159265, 0],
            s: [1, 1, 2]
          };
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(-1, 0, 0, 2, 0, 1, 0, 0, 0, 0, -2, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("yaw1-tx-sz passes");
          } else {
            console.log("!yaw1-tx-sz fails");
            failed++;
          }
          tests++;
          r = {
            t: [0, 2, 0],
            e: [0, 1.5708, 0],
            s: [2, 1, 1]
          };
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(0, 0, 1, 0, 0, 1, 0, 2, -2, 0, 0, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("yaw2-ty-sx passes");
          } else {
            console.log("!yaw2-ty-sx fails");
            failed++;
          }
          tests++;
          r = {
            t: [0, 0, 2],
            e: [3.14159265, 0, 0],
            s: [1, 2, 1]
          };
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(1, 0, 0, 0, 0, -2, 0, 0, 0, 0, -1, 2, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("pitch1-tz-sy passes");
          } else {
            console.log("!pitch1-tz-sy fails");
            failed++;
          }
          tests++;
          r = {
            t: [2, 0, 0],
            e: [1.5708, 0, 0],
            s: [1, 1, 2]
          };
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(1, 0, 0, 2, 0, 0, -2, 0, 0, 1, 0, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("pitch2-tx-sz passes");
          } else {
            console.log("!pitch2-tx-sz fails");
            failed++;
          }
          tests++;
          r = {
            t: [0, 2, 0],
            e: [0, 0, 3.14159265],
            s: [2, 1, 1]
          };
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(-2, 0, 0, 0, 0, -1, 0, 2, 0, 0, 1, 0, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("roll1-ty-sx passes");
          } else {
            console.log("!roll1-ty-sx fails");
            failed++;
          }
          tests++;
          r = {
            t: [0, 0, 2],
            e: [0, 0, 1.5708],
            s: [1, 2, 1]
          };
          m = Transform3d.apply(r);
          v = m.elements;
          mm = (new THREE.Matrix4()).set(0, -2, 0, 0, 1, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 1);
          v = mm.elements;
          if (Transform3d.verify(m, mm)) {
            console.log("roll2-tz-sy passes");
          } else {
            console.log("!roll2-tz-sy fails");
            failed++;
          }
          return {
            te: tests,
            f: failed
          };
        }
      };
  if (test_c3d) {
    if (check.undefined(Camera3d)) {
      console.log('!unit_spec() Camera3d arg is not defined');
    } else {
      var $__21 = test.c3d(),
          te = $__21.te,
          f = $__21.f;
      tests += te;
      failed += f;
    }
  }
  if (test_mixin) {
    if (check.undefined(Mixin)) {
      console.log('!unit_spec() Mixin arg is not defined');
    } else {
      var $__22 = test.mixin(),
          te$__27 = $__22.te,
          f$__28 = $__22.f;
      tests += te$__27;
      failed += f$__28;
    }
  }
  if (test_mediator) {
    if (check.undefined(Mediator)) {
      console.log('!unit_spec() Mediator arg is not defined');
    } else {
      var $__23 = test.mediator(),
          te$__29 = $__23.te,
          f$__30 = $__23.f;
      tests += te$__29;
      failed += f$__30;
    }
  }
  if (test_t3d) {
    if (check.undefined(Transform3d)) {
      console.log('!unit_spec() Transform3d arg is not defined');
    } else {
      var $__24 = test.t3d(),
          te$__31 = $__24.te,
          f$__32 = $__24.f;
      tests += te$__31;
      failed += f$__32;
    }
  }
  console.log(("*** unit test summary: \n                       " + tests + " tests  \n                       " + failed + " failures ***"));
  config.unit_test = false;
  return new Promise((function(resolve, reject) {
    if (failed === 0) {
      resolve();
    } else {
      reject(new Error((failed + " failures")));
    }
  }));
});

//# sourceMappingURL=unit_spec.js.map