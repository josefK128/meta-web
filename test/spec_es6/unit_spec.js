// * unit_spec.js
// * tests intra-state functions - functions not causing state change
//   but used by other actions causing state change
//
// * @dependencies: components to be tested, config, three.js
//   @param {app/services/mediator-service} Mediator<br>
//   @param {app/services/mixin-service} Mixin<br>
//   @param {app/services/transform3d-service} Transform3d<br>
//   @param {app/services/camera3d-service} Camera3d<br>
//   @param {index.html} Angular object value 'config'<br>
//
// * NOTE: all args but components to be unit-tested


var unit_spec = (Mediator, Mixin, Transform3d, Camera3d, config) => {
  "use strict";

  // closure vars for tests
  var test_mediator = true,   // control span of testing
      test_mixin = true,
      test_t3d = true,
      test_c3d = true,
      tests = 0,
      failed = 0,

      test = {                // suite of unit tests

        // * Camera3d.lookAt
        // * NOTE: expect unit tests to be run on opening scene, or any scene
        //   such that the camerasphere is at (0,0,0)
        c3d() {
          var tests = 0,
              failed = 0;
         
          // test case1
          console.log("Camera3d.lookAt:test case1");
          let r = Camera3d.lookAt(0,0,0);
          tests++;
          if(Array.isArray(r)){
            tests++;
            for(let e of r){
              if(e!==0){
                console.log(`!C3d.lookAt:expected array of three zeros: r=${r}`);
                failed++;
                break;
              }
            }
          }else{
            console.log(`!C3d.lookAt:expected array return from camera3d.lookAt(0,0,0): r=${r}`);
            failed++;
          }
          
          // test case2
          console.log("Camera3d.lookAt:test case2");
          r = Camera3d.lookAt([1,1,1]);
          tests++;
          if(Array.isArray(r)){
            tests++;
            for(let e of r){
              if(e!==1){
                console.log(`!C3d.lookAt:expected array of three ones: r=${r}`);
                failed++;
                break;
              }
            }
          }else{
            console.log(`!C3d.lookAt:expected array return from camera3d.lookAt([1,1,1]): r=${r}`);
            failed++;
          }

          // test case3
          console.log("Camera3d.lookAt:test case3");
          r = Camera3d.lookAt();
          tests++;
          if(Array.isArray(r)){
            tests++;
            for(let e of r){
              if(e!==0){
                console.log(`!C3d.lookAt:expected array of three zeros: r=${r}`);
                failed++;
                break;
              }
            }
          }else{
            console.log(`!C3d.lookAtexpected array return from camera3d.lookAt(): r=${r}`);
            failed++;
          }

          // test case4
          console.log("Camera3d.lookAt:test case4");
          r = Camera3d.lookAt('camera');
          tests++;
          if(Array.isArray(r)){
            tests++;
            if(r[0]!==0 || r[1]!==0 || r[2]!==50){
              console.log(`!C3d.lookAt:expected array [0,0,50]: r=${r}`);
              failed++;
            }
          }else{
            console.log(`!C3d.lookAt:expected array return from camera3d.lookAt(): r=${r}`);
            failed++;
          }

          // report Camera3d results
          return {te:tests, f:failed};
        },//c3d()


        // * Mixin.extend; Mixin.include
        mixin() {
          var tests = 0,
              failed = 0,
              o = {},
              F = function(){},
              instance = {},
              m0 = {ext: function(){ return "extension";}},
              proto = {p: "a",
                   f: function(){return 'foo';}},
              m1 = Object.create(proto);

          // test case1
          console.log("Mixin.extend:test case1");
          Mixin.extend(o, m0);
          tests++;
          if(o.ext()!=="extension"){
            console.log(`!Mixin.extend:expected o.ext()="extension" 
              o.ext()=${o.ext()}`);
            failed++;
          }

          // test case2
          console.log("Mixin.include:test case2");
          Mixin.include(F, m0);
          instance = new F();
          tests++;
          if(instance.ext()!=="extension"){
            console.log(`!Mixin.include:expected instance.ext()="extension" 
              instance.ext()=${instance.ext()}`);
            failed++;
          }

          // test case3
          console.log("Mixin.extend_all:test case3");
          o = {};
          Mixin.extend_all(o, m1);
          tests++;
          if(!Mixin.verify(o,'p')){
            console.log(`!Mixin.extend_all:expected o to have property p`);
            failed++;
          }
          tests++;
          if(!Mixin.verify(o,'f')){
            console.log(`!Mixin.extend_all:expected o to have property f`);
            failed++;
          }
          tests++;
          if(o.p !== 'a'){
            console.log(`!Mixin.extend_all:expected o.p='a' o.p=${o.p}`);
            failed++;
          }
          tests++;
          if(o.f() !== 'foo'){
            console.log(`!Mixin.extend_all:expected o.f()='foo' o.f()=${o.f()}`);
            failed++;
          }

          // test case4
          console.log("Mixin.include_all:test case4");
          Mixin.include_all(F, m1);
          instance = new F();
          tests++;
          if(!Mixin.verify(instance,'p')){
            console.log(`!Mixin.include_all:expected instance to have property p`);
            failed++;
          }
          tests++;
          if(!Mixin.verify(instance,'f')){
            console.log(`!Mixin.include_all:expected instance to have property f`);
            failed++;
          }
          tests++;
          if(instance.p !== 'a'){
            console.log(`!Mixin.include_all:expected instance.p='a' instancep=${instance.p}`);
            failed++;
          }
          tests++;
          if(instance.f() !== 'foo'){
            console.log(`!Mixin.include_all:expected instance.f()='foo' instance.f()=${instance.f()}`);
            failed++;
          }

          // report Mixin results 
          return {te:tests, f:failed};
        },//mixin


        // * Mediator.emit; Mediator.exec - cases
        mediator() {
          var tests = 0,
              failed = 0,
              r;

          // test case1
          tests++;
          if(check.assert(!Mediator.emit('foo', ""),`!Mediator.emit:expected send on non-existing channel 'foo' to return false`)){
            failed++;
          }

          // test case2
          tests++;
          console.log("Mediator.exec: id = csphere"); 
          r = Mediator.exec({id:'csphere' , f:"foo", a:7});
          if(check.undefined(r) || check.emptyObject(r)){
            console.log(`!Mediator.exec:expected full object - r=${r}`);
            failed++;
          }
          tests++;
          console.log("Mediator.exec: id = :csphere"); 
          r = Mediator.exec({id:':csphere' , f:"foo", a:7});
          if(check.undefined(r) || check.emptyObject(r)){
            console.log(`!Mediator.exec:expected full object - r=${r}`);
            failed++;
          }
          tests++;
          console.log("Mediator.exec: id = i3d:csphere"); 
          r = Mediator.exec({id:'i3d:csphere' , f:"foo", a:7});
          if(check.undefined(r) || check.emptyObject(r)){
            console.log(`!Mediator.exec:expected full object - r=${r}`);
            failed++;
          }
          tests++;
          console.log("Mediator.exec: id = i2d:axes"); 
          r = Mediator.exec({id:'i2d:axes' , f:"foo", a:7});
          if(check.undefined(r) || check.emptyObject(r)){
            console.log(`!Mediator.exec:expected full object - r=${r}`);
            failed++;
          }

          // test case3
          tests++;
          console.log("Mediator.exec: a = 'a' (single-value)"); 
          r = Mediator.exec({t:'camera3d' , f:"home", a:'a'});
          if(check.undefined(r)){
            console.log(`!Mediator.exec:expected single object - r=${r}`);
            failed++;
          }

          tests++;
          console.log("Mediator.exec: a = ['a'] l=1"); 
          let {a0} = Mediator.exec({t:'camera3d' , f:"home", a:['a']});
          if(check.undefined(a0)){
            console.log(`!Mediator.exec:expected defined element - a0=${a0}`);
            failed++;
          }

          tests++;
          console.log("Mediator.exec: a = ['a', 'b'] l=2"); 
          let {b0,b1} = Mediator.exec({t:'camera3d' , f:"home", a:['a','b']});
          if(check.undefined(b0) || check.undefined(b1)){
            console.log(`!Mediator.exec:expected defined b0, b1`);
            failed++;
          }

          tests++;
          console.log("Mediator.exec: a = ['a', 'b', 'c'] l=3"); 
          let {c0,c1,c2} = Mediator.exec({t:'camera3d' , f:"home", a:['a','b','c']});
          if(check.undefined(c0) || check.undefined(c1) || check.undefined(c2)){
            console.log(`Mediator.exec:expected defined c0, c1, c2`);
            failed++;
          }

          tests++;
          console.log("Mediator.exec: a = ['a', 'b', 'c', 'd'] l=4"); 
          let {d0,d1,d2,d3} = Mediator.exec({t:'camera3d' , f:"home", a:['a','b','c','d']});
          if(check.undefined(d0) || check.undefined(d1) || check.undefined(d2) || check.undefined(d3)){
            console.log(`Mediator.exec:expected defined d0, d1, d2, d3`);
            failed++;
          }

          tests++;
          console.log("Mediator.exec: a = ['a', 'b', 'c', 'd', 'e'] l>4"); 
          r = Mediator.exec({t:'camera3d' , f:"home", a:['a','b','c','d','e']});
          if(check.undefined(r) || !Array.isArray(r)){
            console.log(`Mediator.exec:expected array length>4 - r=${r}`);
            failed++;
          }

          // report Mediator results 
          return {te:tests, f:failed};
        },//mediator


        // * Transform3d.apply - cases
        t3d() {
          var tests = 0,
              failed = 0,
              s = {s:[1,1,1]},
              r = {e:[0,0,0]},
              t = {t:[0,0,0]},
              m,
              mm,
              v;

          // transform3d tests:
          // * NOTE: mm = (new THREE.Matrix4()).set(e0,e1,...,e15) takes arguments in
          //   row-major order, i.e set(m11,m12,m13,m14,m21,...m44) (using math indices).
          //   However, when a matrix is decomposed into elements, for example,
          //   [a0,a1,a2,...,a15] = mm.elements, the a-array is in column-major order,
          //   i.e [m11,m21,m31,m41,m12,...m44] (using math indices)
          // * NOTE: 3x3 rotation matrices are from wikipedia:
          //   https://en.wikipedia.org/wiki/Rotation_matrix
      
      
          // tests 0 - identity
          tests++;
          mm = (new THREE.Matrix4()).set(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
          m = Transform3d.apply(s);   // s-id
          if(Transform3d.verify(m, mm)){
            console.log("s-id passes");
          }else{
            console.log("!s-d fails");
            failed++;
          }
          tests++;
          m = Transform3d.apply(r);   // r-id
          if(Transform3d.verify(m, mm)){
            console.log("r-id passes");
          }else{
            console.log("!r-id fails");
            failed++;
          }
          tests++;
          m = Transform3d.apply(t);   // t-id
          if(Transform3d.verify(m, mm)){
            console.log("t-id passes");
          }else{
            console.log("!t-id fails");
            failed++;
          }
      
      
          // tests 1 - scale
          tests++;
          s = {s:[2,1,1]};            // sx 
          mm = (new THREE.Matrix4()).set(2,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
          m = Transform3d.apply(s);
          if(Transform3d.verify(m, mm)){
            console.log("sx passes");
          }else{
            console.log("!sx fails");
            failed++;
          }
          tests++;
          s = {s:[1,2,1]};            // sy
          mm = (new THREE.Matrix4()).set(1,0,0,0, 0,2,0,0, 0,0,1,0, 0,0,0,1);
          m = Transform3d.apply(s);
          if(Transform3d.verify(m, mm)){
            console.log("sy passes");
          }else{
            console.log("!sy fails");
            failed++;
          }
          tests++;
          s = {s:[1,1,2]};            // sz
          mm = (new THREE.Matrix4()).set(1,0,0,0, 0,1,0,0, 0,0,2,0, 0,0,0,1);
          m = Transform3d.apply(s);
          if(Transform3d.verify(m, mm)){
            console.log("sz passes");
          }else{
            console.log("!sz fails");
            failed++;
          }
      
      
      
          // tests 2 - euler rotations
          tests++;
          r = {e:[0, 3.14159265, 0]};  // yaw1 PI
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("yaw1 m.v = " + v);
          mm = (new THREE.Matrix4()).set(-1,0,0,0, 0,1,0,0, 0,0,-1,0, 0,0,0,1);
          v = mm.elements;
          //console.log("yaw1 mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("yaw1 passes");
          }else{
            console.log("!yaw1 fails");
            failed++;
          }
          tests++;
          r = {e:[0, 1.5708, 0]};      // yaw2 PI/2
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("yaw2 m.v = " + v);
          mm = (new THREE.Matrix4()).set(0,0,1,0, 0,1,0,0, -1,0,0,0, 0,0,0,1);
          v = mm.elements;
          //console.log("yaw2 mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("yaw2 passes");
          }else{
            console.log("!yaw2 fails");
            failed++;
          }
          tests++;
          r = {e:[3.14159265,0, 0]};  // pitch1 PI
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("pitch1 m.v = " + v);
          mm = (new THREE.Matrix4()).set(1,0,0,0, 0,-1,0,0, 0,0,-1,0, 0,0,0,1);
          v = mm.elements;
          //console.log("pitch1 mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("pitch1 passes");
          }else{
            console.log("!pitch1 fails");
            failed++;
          }
          tests++;
          r = {e:[1.5708, 0, 0]};     // pitch2 PI/2
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("pitch2 m.v = " + v);
          mm = (new THREE.Matrix4()).set(1,0,0,0, 0,0,-1,0, 0,1,0,0, 0,0,0,1);
          v = mm.elements;
          //console.log("pitch2 mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("pitch2 passes");
          }else{
            console.log("!pitch2 fails");
            failed++;
          }
          tests++;
          r = {e:[0, 0, 3.14159265]}; // roll1 PI
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("roll1 m.el = " + v);
          mm = (new THREE.Matrix4()).set(-1,0,0,0, 0,-1,0,0, 0,0,1,0, 0,0,0,1);
          v = mm.elements;
          //console.log("roll1 mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("roll1 passes");
          }else{
            console.log("!roll1 fails");
            failed++;
          }
          tests++;
          r = {e:[0, 0, 1.5708]};     // roll2 PI/2
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("roll2 m.el = " + v);
          mm = (new THREE.Matrix4()).set(0,-1,0,0, 1,0,0,0, 0,0,1,0, 0,0,0,1);
          v = mm.elements;
          //console.log("roll2 mm.el = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("roll2 passes");
          }else{
            console.log("!roll2 fails");
            failed++;
          }
      
      
      
          // tests 3 - quaternion rotations
          tests++;
          r = {q:[0, 1, 0, 0]};  // yaw1-q PI
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("yaw1-q m.v = " + v);
          mm = (new THREE.Matrix4()).set(-1,0,0,0, 0,1,0,0, 0,0,-1,0, 0,0,0,1);
          v = mm.elements;
          //console.log("yaw1-q mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("yaw1-q passes");
          }else{
            console.log("!yaw1-q fails");
            failed++;
          }
          tests++;
          r = {q:[0, 0.707107, 0, 0.707107]};      // yaw2-q PI/2
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("yaw2-q m.v = " + v);
          mm = (new THREE.Matrix4()).set(0,0,1,0, 0,1,0,0, -1,0,0,0, 0,0,0,1);
          v = mm.elements;
          //console.log("yaw2-q mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("yaw2-q passes");
          }else{
            console.log("!yaw2-q fails");
            failed++;
          }
          tests++;
          r = {q:[1, 0, 0, 0]};  // pitch1-q PI
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("pitch1-q m.v = " + v);
          mm = (new THREE.Matrix4()).set(1,0,0,0, 0,-1,0,0, 0,0,-1,0, 0,0,0,1);
          v = mm.elements;
          //console.log("pitch1-q mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("pitch1-q passes");
          }else{
            console.log("!pitch1-q fails");
            failed++;
          }
          tests++;
          r = {q:[0.707107, 0, 0, 0.707107]};     // pitch2-q PI/2
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("pitch2-q m.v = " + v);
          mm = (new THREE.Matrix4()).set(1,0,0,0, 0,0,-1,0, 0,1,0,0, 0,0,0,1);
          v = mm.elements;
          //console.log("pitch2-q mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("pitch2-q passes");
          }else{
            console.log("!pitch2-q fails");
            failed++;
          }
          tests++;
          r = {q:[0, 0, 1, 0]};  // roll1-q PI
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("roll1-q m.el = " + v);
          mm = (new THREE.Matrix4()).set(-1,0,0,0, 0,-1,0,0, 0,0,1,0, 0,0,0,1);
          v = mm.elements;
          //console.log("roll1-q mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("roll1-q passes");
          }else{
            console.log("!roll1-q fails");
            failed++;
          }
          tests++;
          r = {q:[0, 0, 0.707107, 0.707107]};     // roll2-q PI/2
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("roll2-q m.el = " + v);
          mm = (new THREE.Matrix4()).set(0,-1,0,0, 1,0,0,0, 0,0,1,0, 0,0,0,1);
          v = mm.elements;
          //console.log("roll2-q mm.el = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("roll2-q passes");
          }else{
            console.log("!roll2-q fails");
            failed++;
          }
      
      
      
          // tests 4 - translation
          tests++;
          t = {t:[2,0,0]};            // tx
          // m
          m = Transform3d.apply(t);
          v = m.elements;
          //console.log("tx m.el = " + v);
          // mm
          mm = (new THREE.Matrix4()).set(1,0,0,2, 0,1,0,0, 0,0,1,0, 0,0,0,1); //row-m 
          v = mm.elements;
          //console.log("tx mm.el = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("tx passes");
          }else{
            console.log("!tx fails");
            failed++;
          }
          tests++;
          t = {t:[0,2,0]};
          m = Transform3d.apply(t);   // ty
          v = m.elements;
          //console.log("ty m.el = " + v);
          mm = (new THREE.Matrix4()).set(1,0,0,0, 0,1,0,2, 0,0,1,0, 0,0,0,1); //row-m 
          v = mm.elements;
          //console.log("ty m.el = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("ty passes");
          }else{
            console.log("!ty fails");
            failed++;
          }
          tests++;
          t = {t:[0,0,2]};            // tz
          m = Transform3d.apply(t);
          v = m.elements;
          //console.log("tz m.el = " + v);
          mm = (new THREE.Matrix4()).set(1,0,0,0, 0,1,0,0, 0,0,1,2, 0,0,0,1); //row-m 
          v = mm.elements;
          //console.log("tz m.el = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("tz passes");
          }else{
            console.log("!tz fails");
            failed++;
          }
      
      
          // tests 5 - scale and translation
          tests++;
          t = {t:[2,0,0], s:[1,2,1]};            // tx, sy
          // m
          m = Transform3d.apply(t);
          v = m.elements;
          //console.log("tx m.el = " + v);
          // mm
          mm = (new THREE.Matrix4()).set(1,0,0,2, 0,2,0,0, 0,0,1,0, 0,0,0,1); //row-m 
          v = mm.elements;
          //console.log("tx mm.el = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("tx passes");
          }else{
            console.log("!tx fails");
            failed++;
          }
          tests++;
          t = {t:[0,2,0], s:[1,2,1]};            // ty, sy
          m = Transform3d.apply(t);   // ty
          v = m.elements;
          //console.log("ty-sy m.el = " + v);
          mm = (new THREE.Matrix4()).set(1,0,0,0, 0,2,0,2, 0,0,1,0, 0,0,0,1); //row-m 
          v = mm.elements;
          //console.log("ty-sy m.el = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("ty-sy passes");
          }else{
            console.log("!ty-sy fails");
            failed++;
          }
          tests++;
          t = {t:[0,0,2], s:[1,2,1]};            // tz, sy
          m = Transform3d.apply(t);
          v = m.elements;
          //console.log("tz-sy m.el = " + v);
          mm = (new THREE.Matrix4()).set(1,0,0,0, 0,2,0,0, 0,0,1,2, 0,0,0,1); //row-m 
          v = mm.elements;
          //console.log("tz-sy m.el = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("tz-sy passes");
          }else{
            console.log("!tz-sy fails");
            failed++;
          }
      
      
      
          // test6 - rotation-e and translation
          tests++;
          r = {t:[2,0,0], e:[0, 3.14159265, 0]};  // tx yaw1 PI
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("yaw1-tx m.v = " + v);
          mm = (new THREE.Matrix4()).set(-1,0,0,2, 0,1,0,0, 0,0,-1,0, 0,0,0,1);
          v = mm.elements;
          //console.log("yaw1-tx mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("yaw1-tx passes");
          }else{
            console.log("!yaw1-tx fails");
            failed++;
          }
          tests++;
          r = {t:[0,2,0], e:[0, 1.5708, 0]};      // ty yaw2 PI/2
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("yaw2-ty m.v = " + v);
          mm = (new THREE.Matrix4()).set(0,0,1,0, 0,1,0,2, -1,0,0,0, 0,0,0,1);
          v = mm.elements;
          //console.log("yaw2-ty mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("yaw2-ty passes");
          }else{
            console.log("!yaw2-ty fails");
            failed++;
          }
          tests++;
          r = {t:[0,0,2], e:[3.14159265,0, 0]};  // tz pitch1 PI
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("pitch1-tz m.v = " + v);
          mm = (new THREE.Matrix4()).set(1,0,0,0, 0,-1,0,0, 0,0,-1,2, 0,0,0,1);
          v = mm.elements;
          //console.log("pitch1-tz mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("pitch1-tz passes");
          }else{
            console.log("!pitch1-tz fails");
            failed++;
          }
          tests++;
          r = {t:[2,0,0], e:[1.5708, 0, 0]};     // tx pitch2 PI/2
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("pitch2-tx m.v = " + v);
          mm = (new THREE.Matrix4()).set(1,0,0,2, 0,0,-1,0, 0,1,0,0, 0,0,0,1);
          v = mm.elements;
          //console.log("pitch2-tx mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("pitch2-tx passes");
          }else{
            console.log("!pitch2-tx fails");
            failed++;
          }
          tests++;
          r = {t:[0,2,0], e:[0, 0, 3.14159265]}; // ty roll1 PI
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("roll1-ty m.el = " + v);
          mm = (new THREE.Matrix4()).set(-1,0,0,0, 0,-1,0,2, 0,0,1,0, 0,0,0,1);
          v = mm.elements;
          //console.log("roll1-ty mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("roll1-ty passes");
          }else{
            console.log("!roll1-ty fails");
            failed++;
          }
          tests++;
          r = {t:[0,0,2], e:[0, 0, 1.5708]};     // tz roll2 PI/2
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("roll2-tz m.el = " + v);
          mm = (new THREE.Matrix4()).set(0,-1,0,0, 1,0,0,0, 0,0,1,2, 0,0,0,1);
          v = mm.elements;
          //console.log("roll2-tz mm.el = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("roll2-tz passes");
          }else{
            console.log("!roll2-tz fails");
            failed++;
          }
      
      
      
          // test7 - rotation-q and translation
          tests++;
          r = {t:[2,0,0], q:[0, 1, 0, 0]};  // tx yaw1-q PI
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("yaw1-q-tx m.v = " + v);
          mm = (new THREE.Matrix4()).set(-1,0,0,2, 0,1,0,0, 0,0,-1,0, 0,0,0,1);
          v = mm.elements;
          //console.log("yaw1-q-tx mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("yaw1-q-tx passes");
          }else{
            console.log("!yaw1-q-tx fails");
            failed++;
          }
          tests++;
          r = {t:[0,2,0], q:[0, 0.707107, 0, 0.707107]};      // ty yaw2-q PI/2
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("yaw2-q-ty m.v = " + v);
          mm = (new THREE.Matrix4()).set(0,0,1,0, 0,1,0,2, -1,0,0,0, 0,0,0,1);
          v = mm.elements;
          //console.log("yaw2-q-ty mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("yaw2-q-ty passes");
          }else{
            console.log("!yaw2-q-ty fails");
            failed++;
          }
          tests++;
          r = {t:[0,0,2], q:[1, 0, 0, 0]};  // tz pitch1-q PI
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("pitch1-q-tz m.v = " + v);
          mm = (new THREE.Matrix4()).set(1,0,0,0, 0,-1,0,0, 0,0,-1,2, 0,0,0,1);
          v = mm.elements;
          //console.log("pitch1-q-tz mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("pitch1-q-tz passes");
          }else{
            console.log("!pitch1-q-tz fails");
            failed++;
          }
          tests++;
          r = {t:[2,0,0], q:[0.707107, 0, 0, 0.707107]};     // tx pitch2-q PI/2
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("pitch2-q-tx m.v = " + v);
          mm = (new THREE.Matrix4()).set(1,0,0,2, 0,0,-1,0, 0,1,0,0, 0,0,0,1);
          v = mm.elements;
          //console.log("pitch2-q-tx mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("pitch2-q-tx passes");
          }else{
            console.log("!pitch2-q-tx fails");
            failed++;
          }
          tests++;
          r = {t:[0,2,0], q:[0, 0, 1, 0]};  // ty roll1-q PI
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("roll1-q-ty m.el = " + v);
          mm = (new THREE.Matrix4()).set(-1,0,0,0, 0,-1,0,2, 0,0,1,0, 0,0,0,1);
          v = mm.elements;
          //console.log("roll1-q-ty mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("roll1-q-ty passes");
          }else{
            console.log("!roll1-q-ty fails");
            failed++;
          }
          tests++;
          r = {t:[0,0,2], q:[0, 0, 0.707107, 0.707107]};     // tz roll2-q PI/2
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("roll2-q-tz m.el = " + v);
          mm = (new THREE.Matrix4()).set(0,-1,0,0, 1,0,0,0, 0,0,1,2, 0,0,0,1);
          v = mm.elements;
          //console.log("roll2-q-tz mm.el = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("roll2-q-tz passes");
          }else{
            console.log("!roll2-q-tz fails");
            failed++;
          }
      
      
      
          // test8 - rotation-e and translation and scale
          tests++;
          r = {t:[2,0,0], e:[0, 3.14159265, 0], s:[1,1,2]};  // sz tx yaw1 PI
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("yaw1-tx-sz m.v = " + v);
          mm = (new THREE.Matrix4()).set(-1,0,0,2, 0,1,0,0, 0,0,-2,0, 0,0,0,1);
          v = mm.elements;
          //console.log("yaw1-tx-sz mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("yaw1-tx-sz passes");
          }else{
            console.log("!yaw1-tx-sz fails");
            failed++;
          }
          tests++;
          r = {t:[0,2,0], e:[0, 1.5708, 0], s:[2,1,1]};      // sx ty yaw2 PI/2
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("yaw2-ty-sx m.v = " + v);
          mm = (new THREE.Matrix4()).set(0,0,1,0, 0,1,0,2, -2,0,0,0, 0,0,0,1);
          v = mm.elements;
          //console.log("yaw2-ty-sx mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("yaw2-ty-sx passes");
          }else{
            console.log("!yaw2-ty-sx fails");
            failed++;
          }
          tests++;
          r = {t:[0,0,2], e:[3.14159265,0, 0], s:[1,2,1]};  // sy tz pitch1 PI
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("pitch1-tz-sy m.v = " + v);
          mm = (new THREE.Matrix4()).set(1,0,0,0, 0,-2,0,0, 0,0,-1,2, 0,0,0,1);
          v = mm.elements;
          //console.log("pitch1-tz-sy mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("pitch1-tz-sy passes");
          }else{
            console.log("!pitch1-tz-sy fails");
            failed++;
          }
          tests++;
          r = {t:[2,0,0], e:[1.5708, 0, 0], s:[1,1,2]};     // sz tx pitch2 PI/2
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("pitch2-tx-sz m.v = " + v);
          mm = (new THREE.Matrix4()).set(1,0,0,2, 0,0,-2,0, 0,1,0,0, 0,0,0,1);
          v = mm.elements;
          //console.log("pitch2-tx-sz mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("pitch2-tx-sz passes");
          }else{
            console.log("!pitch2-tx-sz fails");
            failed++;
          }
          tests++;
          r = {t:[0,2,0], e:[0, 0, 3.14159265], s:[2,1,1]}; // sx ty roll1 PI
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("roll1-ty-sx m.el = " + v);
          mm = (new THREE.Matrix4()).set(-2,0,0,0, 0,-1,0,2, 0,0,1,0, 0,0,0,1);
          v = mm.elements;
          //console.log("roll1-ty-sx mm.v = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("roll1-ty-sx passes");
          }else{
            console.log("!roll1-ty-sx fails");
            failed++;
          }
          tests++;
          r = {t:[0,0,2], e:[0, 0, 1.5708], s:[1,2,1]};     // sy tz roll2 PI/2
          m = Transform3d.apply(r);
          v = m.elements;
          //console.log("roll2-tz-sy m.el = " + v);
          mm = (new THREE.Matrix4()).set(0,-2,0,0, 1,0,0,0, 0,0,1,2, 0,0,0,1);
          v = mm.elements;
          //console.log("roll2-tz-sy mm.el = " + v);
          if(Transform3d.verify(m, mm)){
            console.log("roll2-tz-sy passes");
          }else{
            console.log("!roll2-tz-sy fails");
            failed++;
          }



          // report Transform3d results 
          return {te:tests, f:failed};
        }//t3d()
      };//test



  // Camera3d.lookAt - cases
  if(test_c3d){
    if(check.undefined(Camera3d)){
      console.log('!unit_spec() Camera3d arg is not defined');
    }else{ // test 
      let {te, f} = test.c3d();
      tests += te;
      failed += f;
    }  
  }

  // Mixin.extend; Mixin.include; Mixin.extendAll; Mixin.includeAll;
  if(test_mixin){
    if(check.undefined(Mixin)){
      console.log('!unit_spec() Mixin arg is not defined');
    }else{ // test
      let {te, f} = test.mixin();
      tests += te;
      failed += f;
    }
  }
  // Mediator.emit, Mediator.exec - cases

  if(test_mediator){
    if(check.undefined(Mediator)){
      console.log('!unit_spec() Mediator arg is not defined');
    }else{ //test
      let {te, f} = test.mediator();
      tests += te;
      failed += f;
    }
  }

  // Transform3d.apply - cases
  if(test_t3d){
    if(check.undefined(Transform3d)){
      console.log('!unit_spec() Transform3d arg is not defined');
    }else{ // test
      let {te, f} = test.t3d();
      tests += te;
      failed += f;
    }
  }


  // report unit_test results
  console.log(`*** unit test summary: 
                       ${tests} tests  
                       ${failed} failures ***`); 

  // turn off config.unit_test
  config.unit_test = false;


  // return promise
  return new Promise((resolve, reject) => {
    if(failed === 0){
      resolve();
    }else{
      reject(new Error(`${failed} failures`));
    }
  });
};
