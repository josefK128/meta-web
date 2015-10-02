// * camera3d-service.js
// * interactive controls for 3d perspective camera with pan-tilt-roll viewing 
//   and which is mounted at a surface point of a dollying rotating and zooming
//   'camerasphere' which carries attached lights (default key, fill, back)<br> 
//   Also provides registration and lookup of all 3d actors by name,
//   and insertion of actors into webgl scenegraph hierarchies by parent id
//
// * @dependencies: narrative, mediator, params services, GSAP modules, config<br>
//   @param {angular.$rootScope} $rootScope <br>
//   @param {angular.$timeout} $timeout   <br>
//   @param {app/services/log-service} Log<br>
//   @param {created in index.html initialization script} config<br>
//   @param {GSAP} TweenMax<br>
//   @param {GSAP} TimelineMax<br>
//   @param {GSAP} Quad<br>
//   @ngInject<br>
//
// * NOTE: ngInject is used by ngAnnotate to generate a 
//   minification-safe injection annotation such as:
//   ```function($scope) => ['$scope', function($scope){}]```
// 
// * NOTE: camera can 'lookAt' arbitrary points and arbitrary actors by id
// * NOTE: keeps a separate 'billboard' subset of actors able to be oriented 
// * continually to face the camera
// * NOTE: place() injects canvasId and stateDescriptor and possible non-default
//   values for (optional) procedurally created scene, clearColor and alpha


angular.module('app').service('Camera3d', function($rootScope, $timeout, 
  Log, config, TweenMax, TimelineMax, Quad){
  "use strict";

  var camera3d,

      // closure vars so 'this.f' calls inside Med/Nar are correct<br>
      // if this.med/nar wer instance vars of camera3d 'this' would be Camera3d
      mediator,  
      narrative,

      // same motivation in key handlers (this = window)<br>
      // this.record_shots would be undefined in key handlers
      record_shots = config.record_shots,
      log = Log.log;


  // other closure vars for camera
  var canvas;
  var gl;
  // ref to THREE.PerspectiveCamera
  var camera;          
  // parent of camera - 'csphere' injected by attachAsSurfaceChild(csphere, r) 
  var csphere;         
  var renderer;        // THREE.WebGLRenderer
  var clearColor;
  var alpha;
  var aspect;          // w.innerW/w.innerH - for dollyXTo translation factor
  var fov = 90.0;      // default - can be set by Camera3d.place()
  var radius = 50.0;   // default camera z-distance set by radius of csphere 
  var zoom = 1.0;      // zoom - dynamic tracking
  var roll = 0.0;      // roll - dynamic tracking
  var pan = 0.0;       // pan - dynamic tracking
  // by default the camera looks at the csphere center - pan/tilt look away
  var tilt = 0.0;      // tilt - dynamic tracking
  var yaw = 0.0;       // examine-yaw (rotation of csphere around y-axis)
  var pitch = 0.0;     // examine-pitch (rotation of csphere around x-axis)
                  
  // scene, actors
  var scene;           // NOTE: on scene-change scene is overwritten with new
  var prev_scene;      // save a copy of the 'prev' scene for actor removal
  var billboardsFace = false;  // true => billboards lookAt camera (world pos)
  var billboardsTarget = new THREE.Vector3(); // world position of camera
  // actors and bbs are registered & added to scene by addActorToScene(id,o,pid)
  var billboards = {}; // hash of objects with keys directive id, i.e 'name'
  var actors = {};     // hash of objects with keys directive id
                     
  // fps meter
  var stats = null;

  // Vector3
  var x_axis = new THREE.Vector3(1.0, 0.0, 0.0);
  var y_axis = new THREE.Vector3(0.0, 1.0, 0.0);

  // 4x4 matrices in column-order(!)<br>
  // dynamic copy of csphere.matrix
  var csphere_matrix = new THREE.Matrix4();
  // tmp matrices used in diagnostics transforms and diagnostics
  var matrix = new THREE.Matrix4();
  var matrixa = new THREE.Matrix4();
  var matrixb = new THREE.Matrix4();
  var matrixc = new THREE.Matrix4();
  var matrixz = new THREE.Matrix4();
  var rotation_matrix; // string for CSS3d matrix3d transform of div id 'i2d'
  var report_matrix = false;




  // diagnostics utility functions - camera world information
  var report_camera_world = function(report_matrix){ 
      var cam_wp = new THREE.Vector3(),
          key_wp = new THREE.Vector3(),
          fill_wp = new THREE.Vector3(),
          cam_up,
          i;
 
      cam_wp.setFromMatrixPosition(camera.matrixWorld);
      cam_up = csphere.localToWorld(camera.up); // destroys local camera.up !
  };

  // camera information
  var report_camera = function(report_matrix){
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
      if(report_matrix){
        console.log("camera.matrix (in column-order): ");
        for(i=0; i<camera.matrix.elements.length; i++){
          console.log("camera.matrix.e[" + i + "] = " + 
            camera.matrix.elements[i]);
        }
      }
  };

  // examine information from o3d.matrix - local matrix unless world=true
  // in which case examines o3d.matrixWorld
  // * NOTE: if o3d has no object parent (i.e is at the root of the scenegraph)
  //   then o3d.matrix === o3d.matrixWorld<br>
  //   This is true for csphere (camerasphere) for example<br>
  // reports:<br>
  //   translation Vector3<br>
  //   rotation    Quaternion<br>
  //   scalar      Vector3
  var examine_matrix = function(m){
    for(var i=0; i<16; i++){
      console.log("m[" + i + "] = " + m[i]);
    }

    var t = new THREE.Vector3();
    var q = new THREE.Quaternion();
    var s = new THREE.Vector3();
    m.decompose(t,q,s);
  };


  // change camera.aspect on window resize and render w. new projection matrix<br>
  // first two lines commented out to allow viewport resize and aspect ratio
  // distortion to keep constant x and y projections
  var onWindowResize = function() {
    //camera.aspect = window.innerWidth / window.innerHeight;  
    //camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
  };


  // render scene using camera<br>
  // possibly orient billboards to face (lookAt) camera
  var render = function() {
    if(billboardsFace){
      billboardsTarget.addVectors(csphere.position, camera.position);
      billboardsTarget.z *= zoom;  // world camera.pos.z follows the radius
                                   // of csphere which corresponds to z*zoom
      Object.keys(billboards).forEach(function(id){
        billboards[id].lookAt(billboardsTarget);
      });
    }
    if(stats){
      stats.update();
    }
    renderer.render( scene, camera );
  };




  class Camera3d {  

    constructor(){
      // use narrative scope to get current shot = narrative.scope().shot<br>
      // scope is passed in with Camera3d.place
      this.scope = undefined;
      // fov = 90deg default - can be set by Camera3d.place()
      this.fov = fov;
      this.tl = {};
      this.tlp = {};
      this.shot = {};
      this.action = {};


      // start stats tracking - fps  
      $(window).load(function(){ 
        // fps
        stats = (function(){
          var stats = new Stats();
          stats.setMode(0); // 0: fps, 1: ms
          $("#stats").html( stats.domElement ); // replace current contents of div
          return stats;
        })(); 
      });

      // key controls:<br>
      // * not-alt  => 'cut' - no anim
      // *    alt  => 'fly' - anim
      // * not-shft => rel transform 'by'
      // *    shft => abs transform 'to'
      window.addEventListener("keyup", function(e){
        var a;
        switch(e.keyCode){

          // CENTER/HOME - normalize camera and csphere<br>
          // m - center
          case 77: 
            a = {d:3};
            if(e.shiftKey){ // sh => home
              camera3d.home(a);  
              log({t:'camera3d', f:'home', a:a});
              if(record_shots){
                mediator.record({t:'camera3d', f:'home', a:a});
              }
            }else{          // no-sh => center - no change to zoom
              camera3d.center(a);
              log({t:'camera3d', f:'center', a:a});
              if(record_shots){
                mediator.record({t:'camera3d', f:'center', a:a});
              }
            }
            break;

          // LOOKAT<br>
          // l
          case 76:
            if(e.altKey){     // alt => billboards
              if(e.shiftKey){ // free bbs
                camera3d.billboardsFree();    
                log({t:'camera3d', f:'billboardsFree'});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'billboardsFree'});
                }
              }else{          // alt-l bbs lookAt camera
                camera3d.billboardsFaceCamera();
                log({t:'camera3d', f:'billboardsFaceCamera'});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'billboardsFaceCamera'});
                }
              }
            }else{            // l => camera
              if(e.shiftKey){
                // lookAt origin in absolute coords
                camera.lookAt([0.0, 0.0, 0.0]);
                log({t:'camera3d', f:'lookAt', a:[0.0,0.0,0.0]}); 
                if(record_shots){
                  mediator.record({t:'camera3d', f:'lookAt', a:[0.0,0.0,0.0]}); 
                }
              }else{
                // lookAt center of Camerasphere
                camera3d.lookAt();    
                log({t:'camera3d', f:'lookAt'}); 
                if(record_shots){
                  mediator.record({t:'camera3d', f:'lookAt'}); 
                }
              }
            }
            break;


          // ZOOM<br>
          // a - zoom in          
          case 65: 
            if(e.altKey){     // alt => fly
              if(e.shiftKey){ // sh => abs transform ('to')
               a = {s:0.5, d:3};
                camera3d.zoomflyTo(a);  
                log({t:'camera3d', f:'zoomflyTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'zoomflyTo', a:a});
                }
              }else{          // no-sh => rel transform ('by')
                a = {s:0.9, d:3};
                camera3d.zoomflyBy(a);
                log({t:'camera3d', f:'zoomflyBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'zoomflyBy', a:a});
                }
              }
            }else{            // no-alt => cut
              if(e.shiftKey){ // shift  => 'to'
                a = {s:0.5};  // 90/120
                camera3d.zoomcutTo(a);
                log({t:'camera3d', f:'zoomcutTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'zoomcutTo', a:a});
                }
              }else{         
                a = {s:0.9};
                camera3d.zoomcutBy(a); // 1.0/0.9 = 1.1111
                log({t:'camera3d', f:'zoomcutBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'zoomcutBy', a:a});
                }
              }
            }
            break;

          // s - zoom out          
          case 83: 
            if(e.altKey){     // alt => fly
              if(e.shiftKey){ // sh => abs transform ('to')
                a = {s:2.0, d:3};
                camera3d.zoomflyTo(a);  
                log({t:'camera3d', f:'zoomflyTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'zoomflyTo', a:a});
                }
              }else{          // no-sh => rel transform ('by')
                a = {s:1.1111, d:3};
                camera3d.zoomflyBy(a);
                log({t:'camera3d', f:'zoomflyBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'zoomflyBy', a:a});
                }
              }
            }else{            // no-alt => cut
              if(e.shiftKey){ // shift  => 'to'
                a = {s:2.0};
                camera3d.zoomcutTo(a);
                log({t:'camera3d', f:'zoomcutTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'zoomcutTo', a:a});
                }
              }else{         
                a = {s:1.1111};
                camera3d.zoomcutBy(a); // 1.0/0.9 = 1.1111
                log({t:'camera3d', f:'zoomcutBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'zoomcutBy', a:a});
                }
              }
            }
            break;


          // ROLL<br>
          // b - roll neg => ccw         
          case 66: 
            if(e.altKey){     // alt => fly
              if(e.shiftKey){ // sh => abs transform ('to')
                a = {r:-1.57, d:3};  // PI/8
                log({t:'camera3d', f:'rollflyTo', a:a});
                camera3d.rollflyTo(a);  
                if(record_shots){
                  mediator.record({t:'camera3d', f:'rollflyTo', a:a});
                }
              }else{          // no-sh => rel transform ('by')
                a = {r:-0.3927, d:3}; // PI/4 
                camera3d.rollflyBy(a);
                log({t:'camera3d', f:'rollflyBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'rollflyBy', a:a});
                }
              }
            }else{            // no-alt => cut
              if(e.shiftKey){ // shift  => 'to'
                a = {r:-1.57};  
                camera3d.rollcutTo(a);
                log({t:'camera3d', f:'rollcutTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'rollcutTo', a:a});
                }
              }else{         
                a = {r:-0.3927};
                camera3d.rollcutBy(a); // 1.0/0.9 = 1.1111
                log({t:'camera3d', f:'rollcutBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'rollcutBy', a:a});
                }
              }
            }
            break;

          // n - roll pos => cw         
          case 78:
            if(e.altKey){     // alt => fly
              if(e.shiftKey){ // sh => abs transform ('to')
               a = {r:1.57, d:3};  // PI/8
                camera3d.rollflyTo(a);  
                log({t:'camera3d', f:'rollflyTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'rollflyTo', a:a});
                }
              }else{          // no-sh => rel transform ('by')
                camera3d.rollflyBy(a);
                log({t:'camera3d', f:'rollflyBy', a:a});
                a = {r:0.3927, d:3}; // PI/4 
                if(record_shots){
                  mediator.record({t:'camera3d', f:'rollflyBy', a:a});
                }
              }
            }else{            // no-alt => cut
              if(e.shiftKey){ // shift  => 'to'
                a = {r:1.57};  
                if(record_shots){
                  mediator.record({t:'camera3d', f:'rollcutTo', a:a});
                }
                camera3d.rollcutTo(a);
              }else{         
                a = {r:0.3927};
                if(record_shots){
                  mediator.record({t:'camera3d', f:'rollcutBy', a:a});
                }
                camera3d.rollcutBy(a); // 1.0/0.9 = 1.1111
              }
            }
            break;

          
          // PAN/TILT<br>
          // left arrow - pan (look) left          
          case 37: 
            if(e.shiftKey){ // sh => abs transform ('to')
              a = {r:0.7854, d:3};
              camera3d.panflyTo(a);  
              log({t:'camera3d', f:'panflyTo', a:a});
              if(record_shots){
                mediator.record({t:'camera3d', f:'panflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {r:0.19635, d:3};
              camera3d.panflyBy(a);
              log({t:'camera3d', f:'panflyBy', a:a});
              if(record_shots){
                mediator.record({t:'camera3d', f:'panflyBy', a:a});
              }
            }
            break;

          // right arrow - pan (look) right          
          case 39: 
            if(e.shiftKey){ // sh => abs transform ('to')
              a = {r:-0.7854, d:3};
              camera3d.panflyTo(a);  
              log({t:'camera3d', f:'panflyTo', a:a});
              if(record_shots){
                mediator.record({t:'camera3d', f:'panflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {r:-0.19635, d:3};
              camera3d.panflyBy(a);
              log({t:'camera3d', f:'panflyBy', a:a});
              if(record_shots){
                mediator.record({t:'camera3d', f:'panflyBy', a:a});
              }
            }
            break;

          // up arrow - tilt (look) up          
          case 38: 
            if(e.shiftKey){ // sh => abs transform ('to')
              a = {r:0.7854, d:3};
              camera3d.tiltflyTo(a);  
              log({t:'camera3d', f:'tiltflyTo', a:a});
              if(record_shots){
                mediator.record({t:'camera3d', f:'tiltflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {r:0.19635, d:3};
              camera3d.tiltflyBy(a);
              log({t:'camera3d', f:'tiltflyBy', a:a});
              if(record_shots){
                mediator.record({t:'camera3d', f:'tiltflyBy', a:a});
              }
            }
            break;

          // down arrow - tilt (look) down          
          case 40: 
            if(e.shiftKey){ // sh => abs transform ('to')
              a = {r:-0.7854, d:3};
              camera3d.tiltflyTo(a);  
              log({t:'camera3d', f:'tiltflyTo', a:a});
              if(record_shots){
                mediator.record({t:'camera3d', f:'tiltflyTo', a:a});
              }
            }else{          // no-sh => rel transform ('by')
              a = {r:-0.19635, d:3};
              camera3d.tiltflyBy(a);
              log({t:'camera3d', f:'tiltflyBy', a:a});
              if(record_shots){
                mediator.record({t:'camera3d', f:'tiltflyBy', a:a});
              }
            }
            break;



          // EXAMINE - longitudinal - 'yaw' - rotate csphere around y-axis<br>  
          // g => yaw neg => ccw         
          case 71:    
            if(e.altKey){     // alt => fly
              if(e.shiftKey){ // sh => abs transform ('to')
                a = {r:-1.57, d:3};  // PI/8
                camera3d.yawflyTo(a);  
                log({t:'camera3d', f:'yawflyTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'yawflyTo', a:a});
                }
              }else{          // no-sh => rel transform ('by')
                a = {r:-0.3927, d:3}; // PI/4 
                camera3d.yawflyBy(a);
                log({t:'camera3d', f:'yawflyBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'yawflyBy', a:a});
                }
              }
            }else{            // no-alt => cut
              if(e.shiftKey){ // shift  => 'to'
                a = {r:-1.57};  
                camera3d.yawcutTo(a);
                log({t:'camera3d', f:'yawcutTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'yawcutTo', a:a});
                }
              }else{         
                a = {r:-0.3927};
                camera3d.yawcutBy(a); // 1.0/0.9 = 1.1111
                log({t:'camera3d', f:'yawcutBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'yawcutBy', a:a});
                }
              }
            }
            break;

          // h - yaw pos => cw         
          case 72:  
            if(e.altKey){     // alt => fly
              if(e.shiftKey){ // sh => abs transform ('to')
                a = {r:1.57, d:3};  // PI/8
                camera3d.yawflyTo(a);  
                log({t:'camera3d', f:'yawflyTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'yawflyTo', a:a});
                }
              }else{          // no-sh => rel transform ('by')
                a = {r:0.3927, d:3}; // PI/4 
                camera3d.yawflyBy(a);
                log({t:'camera3d', f:'yawflyBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'yawflyBy', a:a});
                }
              }
            }else{            // no-alt => cut
              if(e.shiftKey){ // shift  => 'to'
                a = {r:1.57};  
                camera3d.yawcutTo(a);
                log({t:'camera3d', f:'yawcutTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'yawcutTo', a:a});
                }
              }else{         
                a = {r:0.3927};
                camera3d.yawcutBy(a); // 1.0/0.9 = 1.1111
                log({t:'camera3d', f:'yawcutBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'yawcutBy', a:a});
                }
              }
            }
            break;


          // EXAMINE - latitudinal - 'pitch' - rotate csphere around x-axis<br>
          // j => pitch neg => ccw         
          case 74:   
            if(e.altKey){     // alt => fly
              if(e.shiftKey){ // sh => abs transform ('to')
               a = {r:-1.57, d:3};  // PI/8
                camera3d.pitchflyTo(a);  
                log({t:'camera3d', f:'pitchflyTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'pitchflyTo', a:a});
                }
              }else{          // no-sh => rel transform ('by')
                a = {r:-0.3927, d:3}; // PI/4 
                camera3d.pitchflyBy(a);
                log({t:'camera3d', f:'pitchflyBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'pitchflyBy', a:a});
                }
              }
            }else{            // no-alt => cut
              if(e.shiftKey){ // shift  => 'to'
                a = {r:-1.57};  
                camera3d.pitchcutTo(a);
                log({t:'camera3d', f:'pitchcutTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'pitchcutTo', a:a});
                }
              }else{         
                a = {r:-0.3927};
                camera3d.pitchcutBy(a); // 1.0/0.9 = 1.1111
                log({t:'camera3d', f:'pitchcutBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'pitchcutBy', a:a});
                }
              }
            }
            break;

          // k - pitch pos => cw          
          case 75:  
            if(e.altKey){     // alt => fly
              if(e.shiftKey){ // sh => abs transform ('to')
                a = {r:1.57, d:3};  // PI/8
                camera3d.pitchflyTo(a);  
                log({t:'camera3d', f:'pitchflyTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'pitchflyTo', a:a});
                }
              }else{          // no-sh => rel transform ('by')
                a = {r:0.3927, d:3}; // PI/4 
                camera3d.pitchflyBy(a);
                log({t:'camera3d', f:'pitchflyBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'pitchflyBy', a:a});
                }
              }
            }else{            // no-alt => cut
              if(e.shiftKey){ // shift  => 'to'
                a = {r:1.57};  
                camera3d.pitchcutTo(a);
                log({t:'camera3d', f:'pitchcutTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'pitchcutTo', a:a});
                }
              }else{         
                a = {r:0.3927};
                camera3d.pitchcutBy(a); // 1.0/0.9 = 1.1111
                log({t:'camera3d', f:'pitchcutBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'pitchcutBy', a:a});
                }
              }
            }
            break;


          // DOLLY - translation along axes and more generally<br>
          // 1 => dollyx+        
          case 49:    
            if(e.altKey){     // alt => fly
              if(e.shiftKey){ // sh => abs transform ('to')
                a = {x:20, d:3};  
                camera3d.dollyflyTo(a);  
                log({t:'camera3d', f:'dollyflyTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollyflyTo', a:a});
                }
              }else{          // no-sh => rel transform ('by')
                a = {x:10, d:3};  
                camera3d.dollyflyBy(a);
                log({t:'camera3d', f:'dollyflyBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollyflyBy', a:a});
                }
              }
            }else{            // no-alt => cut
              if(e.shiftKey){ // shift  => 'to'
                a = {x:20};  
                camera3d.dollycutTo(a);
                log({t:'camera3d', f:'dollycutTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollycutTo', a:a});
                }
              }else{         
                a = {x:10};
                camera3d.dollycutBy(a); 
                log({t:'camera3d', f:'dollycutBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollycutBy', a:a});
                }
              }
            }
            break;

          // 2 - dollyx-        
          case 50:  
            if(e.altKey){     // alt => fly
              if(e.shiftKey){ // sh => abs transform ('to')
                a = {x:-20, d:3};  
                camera3d.dollyflyTo(a);  
                log({t:'camera3d', f:'dollyflyTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollyflyTo', a:a});
                }
              }else{          // no-sh => rel transform ('by')
                a = {x:-10, d:3};  
                camera3d.dollyflyBy(a);
                log({t:'camera3d', f:'dollyflyBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollyflyBy', a:a});
                }
              }
            }else{            // no-alt => cut
              if(e.shiftKey){ // shift  => 'to'
                a = {x:-20};  
                camera3d.dollycutTo(a);
                log({t:'camera3d', f:'dollycutTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollycutTo', a:a});
                }
              }else{         
                a = {x:-10};
                camera3d.dollycutBy(a); 
                log({t:'camera3d', f:'dollycutBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollycutBy', a:a});
                }
              }
            }
            break;

          // 6 => dollyy+        
          case 54:    
            if(e.altKey){     // alt => fly
              if(e.shiftKey){ // sh => abs transform ('to')
                a = {y:20, d:3};  
                camera3d.dollyflyTo(a);  
                log({t:'camera3d', f:'dollyflyTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollyflyTo', a:a});
                }
              }else{          // no-sh => rel transform ('by')
                a = {y:10, d:3};  
                camera3d.dollyflyBy(a);
                log({t:'camera3d', f:'dollyflyBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollyflyBy', a:a});
                }
              }
            }else{            // no-alt => cut
              if(e.shiftKey){ // shift  => 'to'
                a = {y:20};  
                camera3d.dollycutTo(a);
                log({t:'camera3d', f:'dollycutTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollycutTo', a:a});
                }
              }else{         
                a = {y:10};
                camera3d.dollycutBy(a); 
                log({t:'camera3d', f:'dollycutBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollycutBy', a:a});
                }
              }
            }
            break;

          // 7 - dollyy-        
          case 55:  
            if(e.altKey){     // alt => fly
              if(e.shiftKey){ // sh => abs transform ('to')
                a = {y:-20, d:3};  
                camera3d.dollyflyTo(a);  
                log({t:'camera3d', f:'dollyflyTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollyflyTo', a:a});
                }
              }else{          // no-sh => rel transform ('by')
                a = {y:-10, d:3};  
                camera3d.dollyflyBy(a);
                log({t:'camera3d', f:'dollyflyBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollyflyBy', a:a});
                }
              }
            }else{            // no-alt => cut
              if(e.shiftKey){ // shift  => 'to'
                a = {y:-20};  
                camera3d.dollycutTo(a);
                log({t:'camera3d', f:'dollycutTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollycutTo', a:a});
                }
              }else{         
                a = {y:-10};
                camera3d.dollycutBy(a); 
                log({t:'camera3d', f:'dollycutBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollycutBy', a:a});
                }
              }
            }
            break;

          // O => dollyz+        
          case 79:    
            if(e.altKey){     // alt => fly
              if(e.shiftKey){ // sh => abs transform ('to')
                a = {z:20, d:3};  
                camera3d.dollyflyTo(a);  
                log({t:'camera3d', f:'dollyflyTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollyflyTo', a:a});
                }
              }else{          // no-sh => rel transform ('by')
                a = {z:10, d:3};  
                camera3d.dollyflyBy(a);
                log({t:'camera3d', f:'dollyflyBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollyflyBy', a:a});
                }
              }
            }else{            // no-alt => cut
              if(e.shiftKey){ // shift  => 'to'
                a = {z:20};  
                camera3d.dollycutTo(a);
                log({t:'camera3d', f:'dollycutTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollycutTo', a:a});
                }
              }else{         
                a = {z:10};
                camera3d.dollycutBy(a); 
                log({t:'camera3d', f:'dollycutBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollycutBy', a:a});
                }
              }
            }
            break;

          // P - dollyz-        
          case 80:  
            if(e.altKey){     // alt => fly
              if(e.shiftKey){ // sh => abs transform ('to')
                a = {z:-20, d:3};  
                camera3d.dollyflyTo(a);  
                log({t:'camera3d', f:'dollyflyTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollyflyTo', a:a});
                }
              }else{          // no-sh => rel transform ('by')
                a = {z:-10, d:3};  
                camera3d.dollyflyBy(a);
                log({t:'camera3d', f:'dollyflyBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollyflyBy', a:a});
                }
              }
            }else{            // no-alt => cut
              if(e.shiftKey){ // shift  => 'to'
                a = {z:-20};  
                camera3d.dollycutTo(a);
                log({t:'camera3d', f:'dollycutTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollycutTo', a:a});
                }
              }else{         
                a = {z:-10};
                camera3d.dollycutBy(a); 
                log({t:'camera3d', f:'dollycutBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera3d', f:'dollycutBy', a:a});
                }
              }
            }
            break;

          // 0 - bezier 'through' curve          
          // * NOTE: bezier() will always fail e2e-spec test because at each run
          //   the vertices and control points are chosen by Math.random() so
          //   one run will never match another.
          case 48: 
            // uses default dur=10 npoints=6
            if(e.altKey){     // alt => z fly path also
              a = {d:20, n:6, z:true};
            }else{
              a = {d:20, n:6, z:false};
            }
            camera3d.bezier(a); 
            log({t:'camera3d', f:'bezier', a:a});
            if(record_shots){
              mediator.record({t:'camera3d', f:'bezier', a:a});
            }
            break;


          default:
        }
      });
    }//ctor


    // initialize scene - 'place' camera in scene
    place(canvasId, template_view, _scope, 
      _scene, _clearColor, _alpha, _fov) {
      var index = 0,
                  sphereGeometry,
                  sphereMaterial;


      // canvas via passed in canvasId, and passed in scene
      canvas = document.getElementById(canvasId);
      gl = getWebGLContext(canvas);  // libs/webGL/cuon-utils.js
      //gl = canvas.getContext("webgl", {premultipliedAlpha: false});
      //gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  
      // initialize reference to NarrativeController scope - for UI sync
      this.scope = _scope;
  
      // pass in procedural Scene or use declarative i3d-svg scene in index.html
      scene = _scene || new THREE.Scene();
  
      // clearColor - default white-transparent
      clearColor = _clearColor || 'transparent'; 
      alpha = _alpha || 0.0;
  

      // camerasphere
      sphereGeometry = new THREE.SphereGeometry(50,20,20);
      sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true});
      csphere = new THREE.Mesh(sphereGeometry,sphereMaterial);

      // position the sphere
      csphere.position.x=0;
      csphere.position.y=0;
      csphere.position.z=0;


      // camera
      fov = _fov || 90.0;
      camera = new THREE.PerspectiveCamera( fov, 
        window.innerWidth / window.innerHeight, 1, 1000 );
  
      // default camera.position - could be changed by camera_sphere<br>
      // camera.position = {x:csph.pos.x, y:csph.pos.y, z:csph.pos.z + 50}
      camera.position.x = 0.0;
      camera.position.y = 0.0;
      camera.position.z = 50.0;
  
      // add camera to scene<br>
      // register camera as actor - for pan tilt roll
      scene.add(csphere);
      this.addActorToScene('camera', camera);
      
      // add camera as child of csphere
      csphere.add(camera);
      this.addActorToScene('csphere', csphere);

      // add the sphere to the scene
      scene.add(csphere);

      // renderer
      renderer = new THREE.WebGLRenderer({canvas: canvas, 
        antialias: true, alpha: true});
  
      // setClearColor(color, alpha) - use passed params (if given)
      renderer.setClearColor(clearColor, alpha);
      renderer.setSize( window.innerWidth, window.innerHeight );
  
      // listen for and handle resize event
      window.addEventListener( 'resize', onWindowResize, false );
  
      // initial render
      setTimeout(function(){
        render();
      }, 1000);
      
      // begin camera control animation - in sync with GSAP animation
      //this.animate();
      TweenMax.ticker.addEventListener('tick', render);
    }


    // get narrative reference
    set_narrative(o){
      narrative = o;
    }

    set_mediator(o){
      mediator = o; // ref for mediator.record(actions)
    }

    // diagnostics
    examine_matrix(m) {
      examine_matrix(m);
    }

    // start rendering cycle
    animate() {
      requestAnimationFrame(Camera3d.animate);
      render();
      if(stats){
        stats.update();
      }
    }

    // * NOTE: lights are children of camerasphere - if csphere.visible
    //   is changed so do all the child lights ?! (it is inherited)
    //   Instead change csphere.material.visible which does not affect
    //   child lights. (property is not inherited)
    toggle_csphere(a){
      if(csphere){
        csphere.material.visible = a.val;
        $timeout(() => {
          $rootScope.$apply(() => {
            narrative.control_state['csph'] = a.val;
          });
        });
        // result of narrative.shot logs abs_url, delta_url and shot
        // The four values comprise an e2e_spec cell
        // The cell-shot is detected by utility 'e2e_specg' as a shot (matches
        // '{"delta') but there is no exact 'delta' to trigger shot-processing
        narrative.shot(`shot-fixed:{"delta-t":"camera3d", "f":"toggle_csphere", "a":${a.val}}`);
      }
    }
    toggle_light(a){
      if(actors[a.name]){
        actors[a.name].visible = a.val;
        $timeout(() => {
          $rootScope.$apply(() => {
            narrative.control_state[a.name] = a.val;
          });
        });
        // result of narrative.shot logs abs_url, delta_url and shot
        // The four values comprise an e2e_spec cell
        // The cell-shot is detected by utility 'e2e_specg' as a shot (matches
        // '{"delta') but there is no exact 'delta' to trigger shot-processing
        narrative.shot(`shot-fixed:{"delta-t":"camera3d", "f":"toggle_light", "a":{"name":"${a.name}","val":${a.val}}}`);
      }
    }

    light(id){
      return camera3d.actor(id);
    }

    csphere(){
      return csphere;
    }

    // normalize position orientation of csphere and camera - but not zoom
    center(a){
      a.d = a.d || 0.0;

      //shot
      this.shot = {delta: {
        timeline: {p: {paused:true, repeat:0},
                 actors:{
                   'i3d:camera:rotation':[{dur:a.d, 
                                   p:{'x':0.0, 'y':0.0, 'z':0.0,
                                       immediateRender:false}}],
                   'i3d:csphere:position':[{dur:a.d, 
                                   p:{'x':0.0, 'y':0.0, 'z':0.0,
                                       immediateRender:false}}],
                   'i3d:csphere:rotation':[{dur:a.d, 
                                   p:{'x':0.0, 'y':0.0, 'z':0.0,
                                       immediateRender:false}}],
                   'i2d:plane':[{dur:a.d, 
                                   p:{'x': 0.0, 'y': 0.0, immediateRender:false}}],
                   'i2d:zoom_plane':[{dur:a.d, p:{'rotation': 0.0,
                      svgOrigin:'0% 0%', immediateRender:false}}]
                 }
                }//tl
                }//delta
      };//shot

      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);

      // camera
      camera.position.x = 0.0;
      camera.position.y = 0.0;
      camera.up.x = 0.0;
      camera.up.y = 1.0;
      camera.up.z = 0.0;
      if(camera.fov !== fov){
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }

      // dynamic trackers
      roll = 0.0;
      pan = 0.0;
      tilt = 0.0;
      yaw = 0.0;
      pitch = 0.0;
    }


    // normalize position orientation of csphere and camera - AND zoom
    home(a){
      a.d = a.d || 0.0;

      //shot
      this.shot = {delta: {
        timeline: {p: {paused:true, repeat:0},
                 actors:{
                   'i3d:camera:rotation':[{dur:a.d, 
                                   p:{'x':0.0, 'y':0.0, 'z':0.0,
                                       immediateRender:false}}],
                   'i3d:csphere:position':[{dur:a.d, 
                                   p:{'x':0.0, 'y':0.0, 'z':0.0,
                                       immediateRender:false}}],
                   'i3d:csphere:scale':[{dur:a.d, 
                                   p:{'x':1.0, 'y':1.0, 'z':1.0,
                                       immediateRender:false}}],
                   'i3d:csphere:rotation':[{dur:a.d, 
                                   p:{'x':0.0, 'y':0.0, 'z':0.0,
                                       immediateRender:false}}],
                   'i2d:plane':[{dur:a.d, 
                                   p:{'x': 0.0, 'y': 0.0, immediateRender:false}}],
                   'i2d:zoom_plane': [{dur:a.d, p:{rotation: 0.0,
                   scale:1.0, svgOrigin:'0% 0%', immediateRender:false}}]
                 }
                }//tl
                }//delta
      };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);

      // camera
      camera.position.x = 0.0;
      camera.position.y = 0.0;
      camera.up.x = 0.0;
      camera.up.y = 1.0;
      camera.up.z = 0.0;
      if(camera.fov !== fov){
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }
      if(csphere.radius !== radius){          
        csphere.radius = radius;     // radius is default 50 
      }

      // dynamic trackers
      zoom = 1.0;
      roll = 0.0;
      pan = 0.0;
      tilt = 0.0;
      yaw = 0.0;
      pitch = 0.0;
    }


    // ZOOM<br>
    // modify csphere.scale 
    // * NOTE: dynamic camera.fov animation updates of three.js 
    // camera.updateProjectionMatrix() find an undefined projectionMatrix!<br>
    // For this reason zoom is not implemented by camera.fov<br>
    // cut - no animation
    zoomcutTo(a) {  
      zoom = a.s;

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:csphere:scale':[{dur:0, 
                                   p:{x:zoom, y:zoom, z:zoom, immediateRender:false}}]
                                }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }
    zoomcutBy(a) {   
      zoom *= a.s;

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:csphere:scale':[{dur:0, 
                                   p:{x:zoom, y:zoom, z:zoom, immediateRender:false}}]
                               }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }

    // fly - animate
    zoomflyTo(a) {  
      zoom = a.s;

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:csphere:scale':[{dur:a.d, 
                                   p:{x:zoom, y:zoom, z:zoom, immediateRender:false}}]
                                }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }
    zoomflyBy(a) {
      zoom *= a.s;

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:csphere:scale':[{dur:a.d, 
                                   p:{x:zoom, y:zoom, z:zoom, immediateRender:false}}]
                               }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }

    // ROLL<br>
    // modify camera.rotation.z<br> 
    // cut - no animation
    rollcutTo(a) {  
      roll = a.r;

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:camera:rotation':[{dur:0, 
                                   p:{z:roll, immediateRender:false}}]
                                }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }
    rollcutBy(a) {   
      roll += a.r;

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:camera:rotation':[{dur:0, 
                                   p:{z:roll, immediateRender:false}}]
                                }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }

    // fly - animate
    rollflyTo(a) {  
      roll = a.r;

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:camera:rotation':[{dur:a.d, 
                                   p:{z:roll, immediateRender:false}}]
                                }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }
    rollflyBy(a) {   
      roll += a.r;

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:camera:rotation':[{dur:a.d, 
                                   p:{z:roll, immediateRender:false}}]
                                }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }


    // PAN/TILT<br>
    // modify camera.rotation.y/camera.rotation.x 
    panflyTo(a) {   
      pan = a.r;

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:camera:rotation':[{dur:a.d, 
                                   p:{y:pan, immediateRender:false}}]
                                }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }
    panflyBy(a) {   
      pan += a.r;

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:camera:rotation':[{dur:a.d, 
                                   p:{y:pan, immediateRender:false}}]
                                }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }

    tiltflyTo(a) {   
      tilt = a.r;

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:camera:rotation':[{dur:a.d, 
                                   p:{x:tilt, immediateRender:false}}]
                                }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }
    tiltflyBy(a) {   
      tilt += a.r;

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:camera:rotation':[{dur:a.d, 
                                   p:{x:tilt, immediateRender:false}}]
                                }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }


    // EXAMINE-YAW<br>
    // longitudinal examination - rotate csphere around y-axis<br> 
    // modify csphere.rotation.y<br>
    // cut - no animation
    yawcutTo(a) {  
      yaw = a.r;

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:csphere:rotation':[{dur:0, 
                                   p:{y:yaw, immediateRender:false}}]
                                }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }
    yawcutBy(a) {   
      yaw += a.r;

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:csphere:rotation':[{dur:0, 
                                   p:{y:yaw, immediateRender:false}}]
                                }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }

    // fly - animate
    yawflyTo(a) {  
      yaw = a.r;

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:csphere:rotation':[{dur:a.d, 
                                   p:{y:yaw, immediateRender:false}}]
                                }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }
    yawflyBy(a) {   
      yaw += a.r;

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:csphere:rotation':[{dur:a.d, 
                                   p:{y:yaw, immediateRender:false}}]
                                }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }

    // EXAMINE-PITCH<br>
    // lattitudinal examination - rotate csphere around x-axis<br> 
    // modify csphere.rotation.x<br>
    // cut - no animation
    pitchcutTo(a) {  
      pitch = a.r;

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:csphere:rotation':[{dur:0, 
                                   p:{x:pitch, immediateRender:false}}]
                                }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }
    pitchcutBy(a) {   
      pitch += a.r;

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:csphere:rotation':[{dur:0, 
                                   p:{x:pitch, immediateRender:false}}]
                                }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }

    // fly - animate
    pitchflyTo(a) {  
      pitch = a.r;

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:csphere:rotation':[{dur:a.d, 
                                   p:{x:pitch, immediateRender:false}}]
                                }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }
    pitchflyBy(a) {   
      pitch += a.r;

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:csphere:rotation':[{dur:a.d, 
                                   p:{x:pitch, immediateRender:false}}]
                                }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }


    // DOLLY - camera translation<br>
    // fly - animate (default dur=3.0)
    dollyflyTo(a) {  
      a.d = a.d || 3.0;
      a.x = a.x || csphere.position.x;
      a.y = a.y || csphere.position.y;
      a.z = a.z || csphere.position.z;

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:csphere:position':[{dur:a.d, 
                                   p:{x:a.x, y:a.y, z:a.z, 
                                   immediateRender:false}}]
                                }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }
    dollyflyBy(a) {
      a.d = a.d || 3.0;
      a.x = a.x || 0.0;
      a.y = a.y || 0.0;
      a.z = a.z || 0.0;
      a.x = csphere.position.x + a.x; 
      a.y = csphere.position.y + a.y; 
      a.z = csphere.position.z + a.z; 

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:csphere:position':[{dur:a.d, 
                                   p:{x:a.x, y:a.y, z:a.z, 
                                   immediateRender:false}}]
                                }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }

    // cut - no animation (dur=0)
    dollycutTo(a) {  
      a.x = a.x || csphere.position.x;
      a.y = a.y || csphere.position.y;
      a.z = a.z || csphere.position.z;

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:csphere:position':[{dur:0, 
                                   p:{x:a.x, y:a.y, z:a.z, 
                                   immediateRender:false}}]
                                }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }
    dollycutBy(a) {
      a.d = 0.0;
      a.x = a.x || 0.0;
      a.y = a.y || 0.0;
      a.z = a.z || 0.0;
      a.x = csphere.position.x + a.x; 
      a.y = csphere.position.y + a.y; 
      a.z = csphere.position.z + a.z; 

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0},
                               actors:{
                                'i3d:csphere:position':[{dur:0, 
                                   p:{x:a.x, y:a.y, z:a.z, 
                                   immediateRender:false}}]
                                }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }








    // random 2d-bezier camera nav<br> 
    // use default 6 points and 'through' bezier curve type
    bezier(a={d:20, n:6, z:true}){
      var i,
          x = [],
          y = [],
          z = [],
          v = [],
          bezier;

      // bezier 'through' curve points - z:true => fly in z dimension also
      if(a.z){
        z[0] = 0.0;
      }
      x[0] = 0.0;
      y[0] = 0.0;
      if(Math.random() > 0.5){
        x[1] = 30.0*Math.random();   // ++
        y[1] = 30.0*Math.random();
        x[2] = -30.0*Math.random();  // -+
        y[2] = 30.0*Math.random();
        x[3] = -30.0*Math.random();  // --
        y[3] = -30.0*Math.random();
        x[4] = 30.0*Math.random();  // +-
        y[4] = -30.0*Math.random();
        if(a.z){
          z[1] = -10*Math.random();
          z[2] = z[1] - 30*Math.random();
          z[3] = z[2] + 30*Math.random();
          z[4] = -10*Math.random();
        }
      }else{
        x[1] = -30.0*Math.random();   // --
        y[1] = -30.0*Math.random();
        x[2] = -30.0*Math.random();  // -+
        y[2] = 30.0*Math.random();
        x[3] = 30.0*Math.random();  // ++
        y[3] = 30.0*Math.random();
        x[4] = 30.0*Math.random();  // +-
        y[4] = -30.0*Math.random();
        if(a.z){
          z[1] = -10*Math.random();
          z[2] = z[1] - 30*Math.random();
          z[3] = z[2] + 30*Math.random();
          z[4] = -10*Math.random();
        }
      }
      x[5] = 0.0;
      y[5] = 0.0;
      if(a.z){
        z[5] = 0.0;
      }

      // create values array
      for(i=0; i<a.n; i++){
        if(a.z){
          v.push({x:x[i], y:y[i], z:z[i]});
        }else{
          v.push({x:x[i], y:y[i]});
        }
      }
      bezier = {bezier:{autoRotate:true, 
                        curviness:2, 
                        values:v,
                        immediateRender:false}};

      // shot<br>
      // y-coords are webgl 
      this.shot = {delta: {
        timeline: {p: {paused:true, repeat:0, tweens:[]},
                   actors:{
                     'i3d:csphere:position':[{dur:a.d, p:bezier}]
                   }
                  }//tl
                  }//delta
      };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }










    // translation on arbitrary axis - transform is relative and cumulative<br>
    // axis is Vector3 - will be normalized if not already
    translateAxisDistance(axis, d){
      axis.normalize();
      csphere.translateOnAxis(axis, d);
      var ax = x_axis.dot(axis);
      var ay = y_axis.dot(axis);
    }

    // rotate the camerasphere csphere by ordered pitch, yaw, roll
    rotate(params){
      var pitch = params.pitch || 0.0;
      var yaw = params.yaw || 0.0;
      var roll = params.roll || 0.0;

      matrixa.makeRotationFromEuler(new THREE.Euler(pitch, yaw, roll));
      csphere.applyMatrix(matrixa);
    }

    // rotation around arbitraray axis - transform is relative and cumulative<br>
    // axis is Vector3 - will be normalized if not already
    rotateAxisAngle(x,y,z, angle){
      var axis = new THREE.Vector3(x,y,z);
      axis.normalize();
      csphere.rotateOnAxis(axis, angle);
    }

    // relative rotation/scale
    relRotateScale(params){
      //Object.keys(params).forEach(function(p){
      //});
      var pitch = params.pitch || 0.0;
      var yaw = params.yaw || 0.0;
      var roll = params.roll || 0.0;
      var scale = params.zoom || 1.0;

      // all vals


      // rotate-scale-translate (by x/y/z* scale)
      matrixa.makeRotationFromEuler(new THREE.Euler(pitch, yaw, roll));
      matrixa.multiplyScalar(scale);  // scale
      //examine_matrix(matrixa);
            
      // apply relative rotation-scale to csphere
      csphere.applyMatrix(matrixa);
      //examine_matrix(csphere.matrix);
    }


    // transform the camerasphere csphere by combination of translation,
    // rotation and zoom
    // * NOTE: params = { tx:x, ty:y, tz:z, pitch:p, yaw:y, roll:r, zoom:z}
    transform(params){
      Object.keys(params).forEach(function(p){
      });
      var x = params.tx || 0.0;
      var y = params.ty || 0.0;
      var z = params.tz || 0.0;
      var pitch = params.pitch || 0.0;
      var yaw = params.yaw || 0.0;
      var roll = params.roll || 0.0;
      var scale = params.zoom || 1.0;

      // all vals

      // examine initial csphere matrix
      examine_matrix(csphere.matrix);


      // absolute translation - matrixb
      matrixb.makeTranslation(zoom*x, zoom*y, zoom*z);
      examine_matrix(matrixb);
      
      // apply absolute translation to csphere
      csphere.applyMatrix(matrixb);
      examine_matrix(csphere.matrix);

      // rotate-scale-translate (by x/y/z* scale)
      matrixa.makeRotationFromEuler(new THREE.Euler(pitch, yaw, roll));
      matrixa.multiplyScalar(scale);  // scale
      //examine_matrix(matrixa);
            
      // apply relative rotation-scale to csphere
      csphere.applyMatrix(matrixa);
      //examine_matrix(csphere.matrix);
    }


    // pan/tilt camera to point at specific actor/billboard<br> 
    // no-arg default is to look at center of csphere - camerasphere
    // if array lookAt point with abs.coords given by array
    // if three numbers then form the Vector3 with those coords
    // * NOTE: if an array of three numbers a=[x,y,z] is passed in an action, 
    //   Mediator.exec({t:camera3d, f:lookAt, a:[x.y.z]}) will pull out the
    //   values and apply them to Camera3d.lookAt(x,y,z)
    lookAt(id, y, z){
      if(check.number(id) && check.number(y) && check.number(z)){
        let a = [id,y,z];
        if(config.unit_test){
          return a;
        }else{
          camera.lookAt(new THREE.Vector3(id, y, z));
          // result of narrative.shot logs abs_url, delta_url and shot
          // The four values comprise an e2e_spec cell
          // The cell-shot is detected by utility 'e2e_specg' as a shot (matches
          // '{"delta') but there is no exact 'delta' to trigger shot-processing
          narrative.shot(`shot-fixed:{"delta-t":"camera3d", "f":"lookAt", "a":a}}`);
        }
        return;
      }
      if(Array.isArray(id)){
        if(config.unit_test){
          return id;
        }else{
          if(id.length === 3){
            let a = [id.x, id.y, id.z];
            camera.lookAt(new THREE.Vector3(id.x, id.y, id.z));
            // see above
            narrative.shot(`shot-fixed:{"delta-t":"camera3d", "f":"lookAt", "a":a}}`);
          }else{
            console.log(`!Camera3d.lookAt:arg.length = ${id.length}`);
          }
        }
        return;
      }
      if(!id){
        if(config.unit_test){
          let v = csphere.position;
          let a = [v.x, v.y, v.z];
          return a;
        }else{
          if(csphere){
            let v = csphere.position;
            camera.lookAt(v);
            // see above
            narrative.shot(`shot-fixed:{"delta-t":"camera3d", "f":"lookAt", "a":{}}`);
          }else{
            console.log(`!Camera3d.lookAt:csphere is undefined`);
          }
        }
        return;
      }
      if(actors[id]){
        let v = actors[id].position;
        if(config.unit_test){
          let a;
          if(v){
            a = [v.x, v.y, v.z];
          }
          return a;
        }else{
          if(v){
            camera.lookAt(v);
            // see above
            narrative.shot(`shot-fixed:{"delta-t":"camera3d", "f":"lookAt", "a":id}`);
          }else{
            console.log(`!Camera3d.lookAt:actors[${id}].position is undefined`);
          }
        }
        return;
      }else{
        console.log(`!Camera3d.lookAt:actors[${id}] does not exist`);
      }
      return;
    }

    // camera world pos = csphere.pos + camera.pos is the billboards target
    billboardsFaceCamera(){
      billboardsFace = true;
      // result of narrative.shot logs abs_url, delta_url and shot
      // The four values comprise an e2e_spec cell
      // The cell-shot is detected by utility 'e2e_specg' as a shot (matches
      // '{"delta') but there is no exact 'delta' to trigger shot-processing
      narrative.shot(`shot-fixed:{"delta-t":"camera3d", "f":"billboardsFaceCamera"}`);
    }

    // decouple billboards from possible orientation to actor target
    billboardsFree(){
      billboardsFace = false;
      // result of narrative.shot logs abs_url, delta_url and shot
      // The four values comprise an e2e_spec cell
      // The cell-shot is detected by utility 'e2e_specg' as a shot (matches
      // '{"delta') but there is no exact 'delta' to trigger shot-processing
      narrative.shot(`shot-fixed:{"delta-t":"camera3d", "f":"billboardsFree"}`);
    }


    // * NOTE: camera_sphere sets camera.position at csphere position but
    //   camera.position.z = csphere.position.z + 50 looking to center of csphere
    // * NOTE: default camera.position = {x:0.0, y:0.0, z:50.0}
    attachAsSurfaceChild(camerasphere, _radius){
      camera.position.x = camerasphere.position.x;
      camera.position.y = camerasphere.position.y;
      camera.position.z = camerasphere.position.z;
      camera.position.z += _radius;

      // set radius - keep as const (used in zoom normalization)
      radius = _radius;

      camerasphere.add(camera);
      camera.name = 'camera';

      // keep a reference to camerasphere - parent of camera and lights
      csphere = camerasphere;

      // set dynamic csphere.radius
      csphere.radius = _radius;
    }


    // add a passed in actor Object3d to scene - register in actors by id<br>
    // the scene is an Object3d and is the root of the scenegraph tree
    addActorToScene(id, o3d, pid){
      var duplicate = false; 
      scene.traverse((o) => {
        if(o.name === id){
          duplicate = true;
        }
      });
      if(duplicate){
        return false ; // exception - duplication - don't add bb to bbs list
      }

      // add to actors list
      if(o3d !== scene){
        o3d.name = id;
        if(pid && actors[pid]){
          actors[pid].add(o3d); // add to parent
        }else{
          scene.add(o3d);       // add as root to scene
        }
        actors[id] = o3d;
        o3d.updateMatrix(); //needed?
      }else{
      }
      return true;
    }

    // remove actor Object3d from the scene
    removeActorFromScene(id){
      var node = actors[id],
          p;

      if(node){
        if(node.parent){
          p = node.parent;
          p.remove(node);
        }else{
          // prev_scene is the container of all webgl actors to be removed
          prev_scene.remove(node);
        }
        delete actors[id];
      }
    }    

    actor(id){
      return actors[id] || null;
    }
    reportActors(){
      return Object.keys(actors); // ids
    }

    // add a passed in actor/billboard Object3d to the scene
    addBillboardToScene(id, o3d, pid){
      // addActor returns true if no webgl duplicate found => can add to bb list
      if(this.addActorToScene(id, o3d, pid)){
        billboards[id] = o3d;
      }
    }
    // remove actor/billboard Object3d from the scene
    removeBillboardFromScene(id){
      if(billboards[id]){
        delete billboards[id];
      }
      this.removeActorFromScene(id);
    }

    billboard(id){
      return billboards[id] || null;
    }
    reportBillboards(){
      return Object.keys(billboards); // ids
    }


    // remove current scene
    changeTemplateScene(template, _scene){
      prev_scene = scene; // used to remove scene-actor children
      scene = _scene || (new THREE.Scene());
      scene.name = template;

      // setClearColor(color, alpha)
      renderer.setClearColor(clearColor, alpha);
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.render(scene, camera);
    }

    // get webgl rendering context
    gl(){
      return gl;
    }
  }//class Camera3d


  // return factory object<br>
  // (redundant) maintenance of Singleton
  if(!camera3d){
    camera3d = new Camera3d();  // create Camera3d singleton instance once
  }
  return camera3d;   // return ref to single instance
});
