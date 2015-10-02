// * camera2d-service.js
// * interactive controls of 2d translation and scale-rotation planes
//
// * @dependencies: params services, config, GSAP modules<br>
//   @param {index.html} Angular object value 'config'<br>
//   @param {'./scripts/services/log-service'} Log<br>
//   @param {GSAP} TweenMax<br>
//   @param {GSAP} TimelineMax<br>
//   @ngInject<br>
//
// * NOTE: ngInject is used by ngAnnotate to generate a 
//   minification-safe injection annotation such as:
//   ```function($scope) => ['$scope', function($scope){}]```


angular.module('app').service('Camera2d', function(config, Log, 
  TweenMax, TimelineMax){
  "use strict";


  var camera2d,

      // closure vars so 'this.f' calls inside Med/Nar are correct<br>
      // if this.med/nar were instance vars of camera3d 'this' would be Camera2d
      mediator,  
      narrative, 

      // same motivation in key handlers (this = window)<br>
      // this.record_shots would be undefined in key handlers
      record_shots = config.record_shots,
      log = Log.log;


  class Camera2d {  

    constructor(){
      // use narrative scope to get current shot = narrative.scope().shot<brr>
      // scope is passed in with Camera2d.place
      this.scope = undefined;
      this.tl = {};
      this.tlp = {};
      this.shot = {};
      this.action = {};
     
      // dolly - plane
      this.plane = undefined;
      this.x = 0.0;      // plane (webgl y-coord!)
      this.y = 0.0;

      // zoom and roll - zoom_plane child of plane
      this.zoom_plane = undefined;
      this.angle = 0.0;  // zoom_plane - angle degrees
      this.scale = 1.0;


      // key controls<br>
      // * not-alt  => 'cut' - no anim
      // *    alt  => 'fly' - anim
      // * not-shft => rel transform 'by'
      // *    shft => abs transform 'to'
      // * NOTE: logging of action is for building e2e_test cell when 
      //   generating e2e_spec
      window.addEventListener("keyup", function(e){
        var a;
        switch(e.keyCode){

          // CENTER/HOME - normalize camera and csphere<br>
          // r - home,center - 2d only!
          case 82: 
            a = {d:3};
            if(e.shiftKey){ // sh => home
              camera2d.home(a);  
              log({t:'camera2d', f:'home', a:a});
              if(record_shots){
                mediator.record({t:'camera2d', f:'home', a:a});
              }
            }else{          // no-sh => center - no change to zoom
              camera2d.center(a);
              log({t:'camera2d', f:'center', a:a});
              if(record_shots){
                mediator.record({t:'camera2d', f:'center', a:a});
              }
            }
            break;

          // ZOOM<br>
          // z - zoom in          
          case 90: 
            if(e.altKey){     // alt => fly
              if(e.shiftKey){ // sh => abs transform ('to')
                a = {s:2.0, d:3};
                camera2d.zoomflyTo(a);  
                log({t:'camera2d', f:'zoomflyTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'zoomflyTo', a:a});
                }
              }else{          // no-sh => rel transform ('by')
                a = {s:1.1111, d:3};
                camera2d.zoomflyBy(a);
                log({t:'camera2d', f:'zoomflyBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'zoomflyBy', a:a});
                }
              }
            }else{            // no-alt => cut
              if(e.shiftKey){ // shift  => 'to'
                a = {s:2.0};
                camera2d.zoomcutTo(a);
                log({t:'camera2d', f:'zoomcutTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'zoomcutTo', a:a});
                }
              }else{         
                a = {s:1.1111};
                camera2d.zoomcutBy(a); // 1.0/0.9 = 1.1111
                log({t:'camera2d', f:'zoomcutBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'zoomcutBy', a:a});
                }
              }
            }
            break;

          // x - zoom out          
          case 88:
            if(e.altKey){     // alt => fly
              if(e.shiftKey){ // sh => abs transform ('to')
                a = {s:0.5, d:3};
                camera2d.zoomflyTo(a);  
                log({t:'camera2d', f:'zoomflyTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'zoomflyTo', a:a});
                }
              }else{          // no-sh => rel transform ('by')
                a = {s:0.9, d:3};
                camera2d.zoomflyBy(a);
                log({t:'camera2d', f:'zoomflyBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'zoomflyBy', a:a});
                }
              }
            }else{            // no-alt => cut
              if(e.shiftKey){ // shift  => 'to'
                a = {s:0.5};
                camera2d.zoomcutTo(a);
                log({t:'camera2d', f:'zoomcutTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'zoomcutTo', a:a});
                }
              }else{         
                a = {s:0.9};
                camera2d.zoomcutBy(a); 
                log({t:'camera2d', f:'zoomcutBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'zoomcutBy', a:a});
                }
              }
            }
            break;
 

          // ROLL<br>
          // c - roll neg => ccw          
          case 67: 
            if(e.altKey){     // alt => fly
              if(e.shiftKey){ // sh => abs transform ('to')
                a = {r:-90, d:3};
                camera2d.rollflyTo(a);  
                log({t:'camera2d', f:'rollflyTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'rollflyTo', a:a});
                }
              }else{          // no-sh => rel transform ('by')
                a = {r:-22.5, d:3};
                camera2d.rollflyBy(a);
                log({t:'camera2d', f:'rollflyBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'rollflyBy', a:a});
                }
              }
            }else{            // no-alt => cut
              if(e.shiftKey){ // shift  => 'to'
                a = {r:-90};
                camera2d.rollcutTo(a);
                log({t:'camera2d', f:'rollcutTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'rollcutTo', a:a});
                }
              }else{         
                a = {r:-22.5};
                camera2d.rollcutBy(a); 
                log({t:'camera2d', f:'rollcutBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'rollcutBy', a:a});
                }
              }
            }
            break;

          // v - roll pos => cw          
          case 86: 
            if(e.altKey){     // alt => fly
              if(e.shiftKey){ // sh => abs transform ('to')
                a = {r:90, d:3};
                camera2d.rollflyTo(a);  
                log({t:'camera2d', f:'rollflyTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'rollflyTo', a:a});
                }
              }else{          // no-sh => rel transform ('by')
                a = {r:22.5, d:3};
                camera2d.rollflyBy(a);
                log({t:'camera2d', f:'rollflyBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'rollflyBy', a:a});
                }
              }
            }else{            // no-alt => cut
              if(e.shiftKey){ // shift  => 'to'
                a = {r:90};
                camera2d.rollcutTo(a);
                log({t:'camera2d', f:'rollcutTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'rollcutTo', a:a});
                }
              }else{         
                a = {r:22.5};
                camera2d.rollcutBy(a); 
                log({t:'camera2d', f:'rollcutBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'rollcutBy', a:a});
                }
              }
            }
            break;


          // DOLLY<br>
          // q - dollyX+          
          case 81: 
            if(e.altKey){     // alt => fly
              if(e.shiftKey){ // sh => abs transform ('to')
                a = {x:20, d:3};
                camera2d.dollyflyTo(a);  
                log({t:'camera2d', f:'dollyflyTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'dollyflyTo', a:a});
                }
              }else{          // no-sh => rel transform ('by')
                a = {x:10, d:3};
                camera2d.dollyflyBy(a);
                log({t:'camera2d', f:'dollyflyBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'dollyflyBy', a:a});
                }
              }
            }else{            // no-alt => cut
              if(e.shiftKey){ // shift  => 'to'
                a = {x:20};
                camera2d.dollycutTo(a);
                log({t:'camera2d', f:'dollycutTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'dollycutTo', a:a});
                }
              }else{         
                a = {x:10};
                camera2d.dollycutBy(a); 
                log({t:'camera2d', f:'dollycutBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'dollycutBy', a:a});
                }
              }
            }
            break;

          // w - dollyX-          
          case 87: 
            if(e.altKey){     // alt => fly
              if(e.shiftKey){ // sh => abs transform ('to')
                a = {x:-20, d:3};
                camera2d.dollyflyTo(a);  
                log({t:'camera2d', f:'dollyflyTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'dollyflyTo', a:a});
                }
              }else{          // no-sh => rel transform ('by')
                a = {x:-10, d:3};
                camera2d.dollyflyBy(a);
                log({t:'camera2d', f:'dollyflyBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'dollyflyBy', a:a});
                }
              }
            }else{            // no-alt => cut
              if(e.shiftKey){ // shift  => 'to'
                a = {x:-20};
                camera2d.dollycutTo(a);
                log({t:'camera2d', f:'dollyCutTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'dollycutTo', a:a});
                }
              }else{         
                a = {x:-10};
                camera2d.dollycutBy(a); 
                log({t:'camera2d', f:'dollyCutBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'dollycutBy', a:a});
                }
              }
            }
            break;

          // y - dollyY+          
          case 89: 
            if(e.altKey){     // alt => fly
              if(e.shiftKey){ // sh => abs transform ('to')
                a = {y:20, d:3};
                camera2d.dollyflyTo(a);  
                log({t:'camera2d', f:'dollyflyTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'dollyflyTo', a:a});
                }
              }else{          // no-sh => rel transform ('by')
                a = {y:10, d:3};
                camera2d.dollyflyBy(a);
                log({t:'camera2d', f:'dollyflyBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'dollyflyBy', a:a});
                }
              }
            }else{            // no-alt => cut
              if(e.shiftKey){ // shift  => 'to'
                a = {y:20};
                camera2d.dollycutTo(a);
                log({t:'camera2d', f:'dollycutTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'dollycutTo', a:a});
                }
              }else{         
                a = {y:10};
                camera2d.dollycutBy(a); 
                log({t:'camera2d', f:'dollycutBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'dollycutBy', a:a});
                }
              }
            }
            break;

          // u - dollyY-          
          case 85: 
            if(e.altKey){     // alt => fly
              if(e.shiftKey){ // sh => abs transform ('to')
                a = {y:-20, d:3};
                camera2d.dollyflyTo(a);  
                log({t:'camera2d', f:'dollyflyTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'dollyflyTo', a:a});
                }
              }else{          // no-sh => rel transform ('by')
                a = {y:-10, d:3};
                camera2d.dollyflyBy(a);
                log({t:'camera2d', f:'dollyflyBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'dollyflyBy', a:a});
                }
              }
            }else{            // no-alt => cut
              if(e.shiftKey){ // shift  => 'to'
                a = {y:-20};
                camera2d.dollycutTo(a);
                log({t:'camera2d', f:'dollycutTo', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'dollycutTo', a:a});
                }
              }else{         
                a = {y:-10};
                camera2d.dollycutBy(a); 
                log({t:'camera2d', f:'dollycutBy', a:a});
                if(record_shots){
                  mediator.record({t:'camera2d', f:'dollycutBy', a:a});
                }
              }
            }
            break;


          // 9 - 'random' bezier 'through' curve  
          // * NOTE: bezier() will always fail e2e-spec test because at each run
          //   the vertices and control points are chosen by Math.random() so
          //   one run will never match another.
          case 57: 
            // uses default dur=10 npoints=5 
            camera2d.bezier(); 
            log({t:'camera2d', f:'bezier', a:{d:10}});
            if(record_shots){
              mediator.record({t:'camera2d', f:'bezier', a:{d:10}});
            }
            break;

          default:
        }
      });
    }//ctor


    // tmp!! test action execution<br>
    // server sends array of three args which expand to test(a,b,c)
    test(a,b,c){
    }

    place(scope) {
      this.scope = scope; // Narrative scope
      this.plane = document.getElementById("plane");
      this.zoom_plane = document.getElementById("zoom_plane");
      console.assert(this.scope, 'error setting scope!');
      console.assert(this.plane, 'error setting plane!');
      console.assert(this.zoom_plane, 'error setting zoom_plane!');
    }

    set_narrative(o){
      narrative = o;
    }

    set_mediator(o){
      mediator = o;
    }

    actor(id){
      return document.getElementById(id);
    }


    center(a) {  
      a.d = a.d || 0.0;

      // shot
      this.shot = {delta: {
        timeline: {p: {paused:true, repeat:0},
                 actors:{
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
    }


    home(a) {  
      a.d = a.d || 0.0;

      //shot
      this.shot = {delta: {
        timeline: {p: {paused:true, repeat:0},
                 actors:{
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
    }


    // ZOOM<br>
    // cut - no animation
    zoomcutTo(a) {  
      if(a.s !== undefined){this.scale = a.s;}

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0, tweens:[]},
                               actors:{
                                'i2d:zoom_plane':[{dur:0, p:{'scale':this.scale,
                                  svgOrigin:'0% 0%', immediateRender:false}}]
                               }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }
    zoomcutBy(a) {   
      if(a.s !== undefined){this.scale *= a.s;}

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0, tweens:[]},
                               actors:{
                                'i2d:zoom_plane':[{dur:0, p:{'scale':this.scale,
                                  svgOrigin:'0% 0%', immediateRender:false}}]
                               }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }

    // fly - animate
    zoomflyTo(a) {   
      if(a.s !== undefined){this.scale = a.s;}

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0, tweens:[]},
                               actors:{
                                'i2d:zoom_plane':[{dur:a.d, p:{'scale':this.scale,
                                  svgOrigin:'0% 0%', immediateRender:false}}]
                               }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }
    zoomflyBy(a) {   
      if(a.s !== undefined){this.scale *= a.s;}

      // shot
      this.shot = {delta: {
                    timeline: {p: {paused:true, repeat:0, tweens:[]},
                               actors:{
                                'i2d:zoom_plane':[{dur:a.d, p:{'scale':this.scale,
                                  svgOrigin:'0% 0%', immediateRender:false}}]
                               }
                              }//tl
                          }//delta
                  };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }


    // ROLL<br>
    // cut - no animation
    rollcutTo(a) {  
      if(a.r !== undefined){this.angle = a.r;}

      // shot
      this.shot = {delta: {
        timeline: {p: {paused:true, repeat:0, tweens:[]},
                   actors:{
                     'i2d:zoom_plane':[{dur:0, p:{'rotation':this.angle,
                        svgOrigin:'0% 0%', immediateRender:false}}]
                   }
                  }//tl
                  }//delta
      };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }
    rollcutBy(a) {  
      if(a.r !== undefined){this.angle += a.r;}

      // shot
      this.shot = {delta: {
        timeline: {p: {paused:true, repeat:0, tweens:[]},
                   actors:{
                     'i2d:zoom_plane':[{dur:0, p:{'rotation':this.angle,
                        svgOrigin:'0% 0%', immediateRender:false}}]
                   }
                  }//tl
                  }//delta
      };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }

    // fly - animate
    rollflyTo(a) {  
      if(a.r !== undefined){this.angle = a.r;}

      // shot
      this.shot = {delta: {
        timeline: {p: {paused:true, repeat:0, tweens:[]},
                   actors:{
                     'i2d:zoom_plane':[{dur:a.d, p:{'rotation':this.angle,
                        svgOrigin:'0% 0%', immediateRender:false}}]
                   }
                  }//tl
                  }//delta
      };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }
    rollflyBy(a) {  
      if(a.r !== undefined){this.angle += a.r;}

      // shot
      this.shot = {delta: {
        timeline: {p: {paused:true, repeat:0, tweens:[]},
                   actors:{
                     'i2d:zoom_plane':[{dur:a.d, p:{'rotation':this.angle,
                        svgOrigin:'0% 0%', immediateRender:false}}]
                   }
                  }//tl
                  }//delta
      };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }



    // DOLLY<br>
    // cut - no animation
    dollycutTo(a) { 
      if(a.x !== undefined){this.x = a.x;}
      if(a.y !== undefined){this.y = a.y;}

      // shot<br>
      // y-coords are webgl - svg translateY must be negated!
      this.shot = {delta: {
        timeline: {p: {paused:true, repeat:0, tweens:[]},
                   actors:{
                     'i2d:plane':[{dur:0, 
                                   p:{'x': this.x, 'y': -this.y,
                                     immediateRender:false}}]
                   }
                  }//tl
                  }//delta
      };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }
    dollycutBy(a) { 
      if(a.x !== undefined){this.x += a.x;}
      if(a.y !== undefined){this.y += a.y;}

      // shot<br>
      // y-coords are webgl - svg translateY must be negated!
      this.shot = {delta: {
        timeline: {p: {paused:true, repeat:0, tweens:[]},
                   actors:{
                     'i2d:plane':[{dur:0, 
                                   p:{'x': this.x, 'y': -this.y,
                                     immediateRender:false}}]
                   }
                  }//tl
                  }//delta
      };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }

    // fly - animate
    dollyflyTo(a) { 
      if(a.x !== undefined){this.x = a.x;}
      if(a.y !== undefined){this.y = a.y;}

      // shot<br>
      // y-coords are webgl - svg translateY must be negated!
      this.shot = {delta: {
        timeline: {p: {paused:true, repeat:0, tweens:[]},
                   actors:{
                     'i2d:plane':[{dur:a.d, 
                                   p:{'x': this.x, 'y': -this.y,
                                     immediateRender:false}}]
                   }
                  }//tl
                  }//delta
      };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }
    dollyflyBy(a) { 
      if(a.x !== undefined){this.x += a.x;}
      if(a.y !== undefined){this.y += a.y;}

      // shot<br>
      // y-coords are webgl - svg translateY must be negated!
      this.shot = {delta: {
        timeline: {p: {paused:true, repeat:0, tweens:[]},
                   actors:{
                     'i2d:plane':[{dur:a.d, 
                                   p:{'x': this.x, 'y': -this.y,
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
    bezier(a={d:10, n:6}){
      var i,
          x = [],
          y = [],
          v = [],
          bezier;

      // bezier 'through' curve points - y coords are made neg!
      x[0] = 0.0;
      y[0] = 0.0;
      if(Math.random() > 0.5){
        x[1] = 30.0*Math.random();   // ++
        y[1] = -30.0*Math.random();
        x[2] = -30.0*Math.random();  // -+
        y[2] = -30.0*Math.random();
        x[3] = -30.0*Math.random();  // --
        y[3] = 30.0*Math.random();
        x[4] = 30.0*Math.random();  // +-
        y[4] = 30.0*Math.random();
      }else{
        x[1] = -30.0*Math.random();   // --
        y[1] = 30.0*Math.random();
        x[2] = -30.0*Math.random();  // -+
        y[2] = -30.0*Math.random();
        x[3] = 30.0*Math.random();  // ++
        y[3] = -30.0*Math.random();
        x[4] = 30.0*Math.random();  // +-
        y[4] = 30.0*Math.random();
      }
      x[5] = 0.0;
      y[5] = 0.0;

      // create values array
      for(i=0; i<a.n; i++){
        v.push({x:x[i], y:y[i]});
      }
      bezier = {bezier:{autoRotate:true, 
                        curviness:2, 
                        values:v,
                        immediateRender:false}};

      // shot<br>
      // y-coords are webgl - svg translateY must be negated!
      this.shot = {delta: {
        timeline: {p: {paused:true, repeat:0, tweens:[]},
                   actors:{
                     'i2d:c':[{dur:a.d, p:bezier}]
                   }
                  }//tl
                  }//delta
      };//shot
      this.shot = 'shot-anim:' + JSON.stringify(this.shot);
      narrative.shot(this.shot);
    }
  }//Camera2D


  // return factory object<btr>
  // (redundant) maintenance of Singleton
  if(!camera2d){
    camera2d = new Camera2d();  // create Camera2d singleton instance
  }
  return camera2d;           // return Camera2d singleton instance
});
