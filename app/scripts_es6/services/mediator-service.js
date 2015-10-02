// mediator-service.js 
// central communications registration and look-up service for all 
// component-directives controllers
// Also manages websocket (socketio) communications with server
//
// @dependencies: params services, config
// @param {angular.$rootScope} $rootScope 
// @param {angular.$location} $location   
// @param {'./scripts/services/queue-service'} Queue
// @param {'./scripts/services/camera3d-service'} Camera3d
// @param {'./scripts/services/camera2d-service'} Camera2d
// @param {'./scripts/services/models-service'} Models
// @param {'./scripts/services/mixin-service'} Mixin
// @param {'./scripts/services/log-service'} Log
// @param {index.html} Angular object value 'config'
// @ngInject
//
// NOTE: ngInject is used by ngAnnotate to generate a 
// minification-safe injection annotation such as:
// function($scope) => ['$scope', function($scope){}]
//
// NOTE: Mediator expects action-objects of form:
// var action = {t: 'target',  ('narrative','camera3d','camera2d',...)
//               <OR>
//               id: Camera3d.actor(id) or doc.getElById(id)
//               <AND>
//               f: 'function'
//               a: '{}/[]/value'  // args
// Then action is executed as follows:
// Mediator[t][f](a);
// <OR>
// Camera3d['actor'](id)[f](a);
//
// NOTE: A further dynamic methodology is implemented but not presently used.
// example: broadcast
// var action = {id: Actor3d/Actor2d.actor(id) (Actor2d uses doc.getElById)
//                 <OR>
//               t: target => 'narrative'/'camera3d'/'camera2d'/'location', 
//               f: function 'shot', ...
//                  or {}
// Then action is executed as follows:
// Mediator['camera3d'].actors('hamlet')[f](a);
// The function 'f' created in broadcast (var f = new Function(...a);) is:
//   var f = function(node){
//           };
//
//  * NOTE: Mediator is used to fetch all component instances by name and 
//    so enables arbitrary inter-directive communications - not presently used
//  * NOTE: Also implemented but not presently used is a broadcast and message
//    system for trees of objects such as a 3D object hierarchy, especially
//    created by the metaforms methodology.


angular.module('app').factory('Mediator', function($rootScope, $location,
  Queue, Camera3d, Camera2d, Models, Mixin, Transform3d, Log, config){
  'use strict';
  var mediator,
      log = Log.log,
      components = {},
      action,
      pr;


  class Mediator {
    constructor(){
      // first two vars are needed because injections are on stack - yes?
      this.$rootScope = $rootScope; 
      this.location = $location; 
      this.mediator = this; 
      this.queue = Queue;
      this.camera3d = Camera3d;
      this.camera2d = Camera2d;
      this.console = console;
      this.narrative = undefined;
      this.mixin = Mixin;              // unit test only
      this.transform3d = Transform3d; // unit test only
      this.config = config;
      this.targets=['mediator', 'narrative', 'camera3d', 'camera2d'];
      this.test_targets=['mixin', 'transform3d'];
      this.record_stream = config.record_stream; 
      
      // test target-refs
      console.assert(this.mediator, "this.mediator undefined!");
      console.assert(this.camera3d, "this.camera3d undefined!");
      console.assert(this.camera2d, "this.camera2d undefined!");
      console.assert(this.queue, "this.queue undefined!");
      console.assert(this.mixin, "this.mixin undefined!");
      console.assert(this.transform3d, "this.transform3d undefined!");


      // pass refs to cameras amd Log
      Log.set_mediator(this); 
      Camera3d.set_mediator(this);
      Camera2d.set_mediator(this);

      // start queue checks - LATER - much smaller interval
      setInterval(() => {
        if(mediator.queue.ready){
          this.next();
        }else{
        }
      }, 5000);
    }


    test(a){
      if(Array.isArray(a)){
      }else{
      }
    }


    // connect to index.js server = config.server_host 
    // on port config.channels_port (default is 8081)
    // NOTE: config is defined in index.html
    connect(){
      var s_h = config.server_host,
          c_p = config.channels_port;
      //Audio.speak("Mediator service trying to connect to server port 8081");
      this.socket = io.connect("http://" + s_h + ":" + c_p);
      this.socket.on('actions', (action) => {
        this.queue.push(action);
      });
    }

    // broadcast usable by external services
    emit(channel, msg){
      // guard
      if(config.channels_out.indexOf(channel) !== -1){
        this.socket.emit(channel, msg);
      }else{
        return false;
      }
    }


    // set queue.ready = true, and check queue for action
    queue_ready_next(){
      mediator.queue.ready = true;
      mediator.next();
    }
      
    // fetch next action from queue - removes action from queue
    // if queue is empty returns undefined
    next(){
      action = mediator.queue.peek();
      if(action){
        action = mediator.queue.pop();
        this.exec(action);
        if(this.record_stream){
          this.socket.emit('actions', action);
        }
      }
    }



    // register/fetch component controller-vm by id
    component(id, cvm){

      // fetch by name
      if(cvm === undefined){
        return components[id];
      }

      // set action target narrative
      if(id === 'narrative'){
        this.narrative = cvm;
      }

      // register cvm by directive id 
      if(components[id] === undefined){
        components[id] = cvm;
        cvm.predecessor = null;
        cvm.enfants = [];
        this.mixin.include(cvm, {
          // get/set predecessor and enfants/child
          parent(p){
            if(p){
              cvm.predecessor = p;
            }else{
              return cvm.predecessor;
            }
          },
          children(child){
            if(child){
              cvm.enfants.push(child);
            }else{
              return cvm.enfants;
            }
          },

          // send action to all descendants of cvm
          // NOTE: arg to broadcast is array of 0 or more string-args to the
          // function whose string-body is the final arg in array a
          // NOTE: es6 ...a => destructure the array
          broadcast(a){  
            // NOTE: eval!
            var f = new Function(...a);
            var g = function(node){
              f(node);
              for(let e of node.enfants){
                g(e);
              }
            };
          },
          // send action to all ancestors of cvm
          emit(a){
            // NOTE: eval!
            var f = new Function(...a);
            var g = function(node){
              f(node);
              if(node.parent){
                g(node.predecessor);
              }
            };
          }
        });
      }
    }
    

    // record to server - used to record interactive camera shots to stream
    record(action){
      this.socket.emit('actions', action);
    }


    // message-based function invocation
    // NOTE: if use 'id' instead of simple 't' then id
    // can use a tuple structure with the form - id: 'type:id'
    // exp: id: 'i2d:rect0'
    // if id is simple such as id: 'cube0' then i3d is assumed
    // and the target is Camera3d.actor(action.id)
    exec(_action) {
      var tuple,
          actor,   // Camera3d.actor(action.id) or doc.getElById(action.id)
          target,  // actor or mediator[action.t]
          f,       // target[action.f]
          execute = (action) => {

            // Camera3d.actor(id).f or Mediator.target.f
            if(action.id){             // @@@ id
              tuple = action.id.split(':');
              // i3d is default - get Camera3d.actor
              // otherwise use document.getElementById
              if(tuple.length === 1){
                actor = Camera3d.actor(action.id);
              }else{
                if((tuple[0] === 'i3d') || (tuple[0].length === 0)){
                  actor = Camera3d.actor(tuple[1]);
                }else{
                  if(tuple[1]){
                    actor = document.getElementById(tuple[1]);
                  }
                }
              }
              
              if(actor){
                // unit test
                if(config.unit_test){  // *** unit_test
                  return actor;
                }else{
                  target = actor;      // target object for function f
                  f = actor[action.f];
                }
              }else{
                throw new Error(`Canera3d.actor(${action.id}) is not defined!`);
              }
            }else{                     // @@@ target-name, not id       
              console.assert(mediator[action.t], "mediator[action.t] UNDEFINED!");
              console.assert(mediator[action.t][action.f], 
                "mediator[action.t][action.f] UNDEFINED!");
              if(mediator[action.t]){
                if(mediator[action.t][action.f]){
                  target = mediator[action.t];      // target
                  f = target[action.f];
                }else{
                  throw new Error(`${action.t}.${action.f} is not defined!`);
                }
              }else{
                throw new Error(`action target mediator.${action.t} not defined!`);
              }
            }


            if(f){ 
              if(Array.isArray(action.a)){
                // action.a is an array of args
                switch(action.a.length){
                  case 1:
                    //f(action.a[0]) => 'this' UNDEFINED in target
                    if(config.unit_test){
                      return {a0: action.a[0]};
                    }else{
                      target[action.f](action.a[0]);
                    }
                    break;
      
                  case 2:
                    //f(action.a[0], action.a[1]) => 'this' UNDEFINED in target
                    if(config.unit_test){
                      return {b0: action.a[0], b1:action.a[1]};
                    }else{
                      target[action.f](action.a[0], action.a[1]);
                    }
                    break;
      
                  case 3:
                    //f(action.a[0], [1], [2]) => 'this' UNDEFINED in target
                    if(config.unit_test){
                      return {c0: action.a[0], c1:action.a[1], c2:action.a[2]};
                    }else{
                      target[action.f](action.a[0], action.a[1], action.a[2]);
                    }
                    break;
      
                  case 4:
                    //f(action.a[0], [1], [2], [3]) => 'this' UNDEFINED in target
                    if(config.unit_test){
                      return {d0: action.a[0], d1:action.a[1], d2:action.a[2],
                        d3:action.a[3]};
                    }else{
                      target[action.f](action.a[0], action.a[1], action.a[2], action.a[3]);
                    }
                    break;
      
                  default:
                    //f(action.a) => 'this' UNDEFINED in target
                    if(config.unit_test){
                      return action.a
                    }else{
                      target[action.f](action.a);
                    }
                    throw new Error(`CAUTION: >4 args in array treated as one array!`);
                }   
              }else{
                // action.a is a single value
                if(config.unit_test){
                  return action.a
                }else{
                  target[action.f](action.a);  // => 'this' defined in camera2d.zoomflyTo
                }
              }
            }else{
              if(action.id){
                throw new Error(`actor(${action.id}).${action.f}) is not defined!`);
              }else{
                throw new Error(`${action.t}.${action.f} is not defined!`);
              }
            }
          };//execute();

      
       if(Array.isArray(_action)){
         for(let a of _action){              // _action is array
           if(config.unit_test){            // *** unit_test
             return execute(a);
           }else{
             execute(a);
           }
         }
       }else{
         // guard
         if(!check.object(_action)){
           console.log("!Mediator.emit(action - is NOT object)");
           Log.log({t:'!Mediator', f:'emit', a:'action - is NOT object'});
           return;
         }
         // {1} log action - for building e2e_spec array
         // NOTE: all shots exec {t:'Mediator', f:'queue_ready_next'}
         // when completed to allow a new action to start - not helpful
         // in constructing an e2e_spec
         if(config.unit_test){
           return execute(_action);
         }else{
           if(_action.f && (_action.f !== 'queue_ready_next')){ 
             Log.log(_action);
           }
           execute(_action);
         }
       }
    }//exec
  }//class Mediator



  // return factory object
  // (redundant) maintenance of Singleton
  // create Mediator singleton instance once
  // listen to 'actions' channel - push incoming actions to queue
  // set cycle to pop actions from queue and execute them (& possibly record)
  if(!mediator){
    mediator = new Mediator(); 
  }


  // return Mediator singleton instance
  return mediator;  
});

