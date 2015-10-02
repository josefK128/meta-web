// * mw-narrative-directive
// * dynamic meta-controller for state management by url and url-components
//   which are descriptors used to compile independent template:model views
//   for each of six url components:
// * url = ```scene/i3d/i2d/base/ui/shot```<br>
//   where scene is a hierarchical name and carries media meta-information, 
//   i3d is webgl, i2d is svg, base and ui are html, and shot is scene dynamics 
//   such as cinematography animation and scene additions and modifications<br> 
//   Each component is a template:model pair (although a model is not strictly
//   required)
// * narrative also manages the browser history and the UI controls
//   all in a synchronized and dynamic manner
//
// * @dependencies: $state, $location, param services and config<br>
//   @param {angular.$rootScope} $rootScope<br>
//   @param {ui.router.state.$state} $state<br>
//   @param {angular.$location} $location<br>
//   @param {angular.$templateCache} $templateCache<br>
//   @param {angular.$timeout} $timeout<br>
//   @param {angular.$compile} $compile<br>
//   @param {services/mediator-service} Mediator<br>
//   @param {services/models-service} Models<br>
//   @param {services/camera3d-service} Camera3d<br>
//   @param {services/camera2d-service} Camera2d<br>
//   @param {services/log-service} Log<br>
//   @param {GSAP} TweenMax<br>
//   @param {GSAP} TimelineMax<br>
//   @param {GSAP} Quad<br>
//   @param {created in index.html initialization script} config<br>
//   @ngInject
//
// * NOTE: ngInject is used by ngAnnotate to generate a 
//   minification-safe injection annotation such as:
//   ```function($scope) => ['$scope', function($scope){}]```
//
// * narrative provides a subset of functional entry points to a 'pipeline' of
//   url generation and modifications. Action messages can execute these
//   functions to modify application state by change to one or more of the url
//   components.<br>
//   These pipeline entry points are:
//     * shot(shot-template-name:JSON-model) or shot(shot-template-name:model-name)
//     * change_scene(scene-name)
//     * change_state(absolute-url) or change_state(delta-url)
//     * NOTE: $location.url(url) is the final change of url and state and
//       changes the address in the browser address bar (which is also the
//       current state of history). It is used internally ONLY
// * NOTE: narrative detects two bound events:
//     * $locationChangeSuccess - updates a stateObj and state sequence 
//     * $stateChangeSuccess - executes associated timeline animations and
//       dynamics
// * NOTE: narrative initializes Camera2d and Camera3d and passes to them (and others) 
//   references to narrative, narrative scope for access to models, 
//   and Mediator for access to components and websocket communications


angular.module('app').directive('mwNarrative', 
  function($rootScope, $state, $location, $templateCache, $timeout, $compile, 
    Mediator, Models, Camera3d, Camera2d, Log, TweenMax, TimelineMax, Quad, 
    config) {
  'use strict';


  // auxilliary utility function - calculate delta_params, the url components
  // which have changed from one absolute url to another
  var delta = (abs_params, abs_paramsp) => {
    var delta_params = {};

    for(let p of Object.keys(abs_params)){
      if(abs_paramsp[p] !== abs_params[p]){
        delta_params[p] = abs_params[p];
      }else{
        delta_params[p] = "";
      }
    }
    return delta_params;
  };

  // closure vars for e2e tests
  var urls_index = 0,
      urls_failed = 0,
      shot_index = 0,
      shot_failed = 0;






  // class declarations are not hoisted so place them at the top in case of
  // possible extends expression, for exp. (not used in this system)<br>
  // Placement inside the angular registration function prevents global name clash<br>
  // The ES6 class is provided as a partial bridge to a possible future
  // implementation in Angular 2.x or in some other components framework<br>
  // * NOTE: prototypes are the underlying more simple and elegant delegation
  //   method but classes work fairly well - in some cases services or other
  //   prototype instances must be declared as closure variables rather than
  //   instance variables of a component class instance. This is in order to
  //   force the use of the  proper execution context ('this') for correct
  //   operation of the service or object instance. This mismatch of execution
  //   context intention is the cause of errors which do not occur in either
  //   pure class systems or pure prototype systems - see notes at specific closure
  //   variable declarations. It is good to remember that 'class' is a useful
  //   syntax but not a true Class.
  // * NOTE: the class 'Narrative' provides the constructor for the component used
  //   for injection 
  // * NOTE: constructors are run from root-to-leaf and then link-fs are run leaf-to-root
  // * NOTE: bindToController double-bound ("=") attributes are
  //   initially set to the child scope controller ctor value since the
  //   child scope controller is run after the parent scope controller.
  //   However, if the double-bound attributes are (also) set in the link-fs,
  //   the parent link-f is run last so becomes the set attribute value
  class Narrative {
    constructor(){

      // ui 
      this.scenes = Object.keys(config.scenes);     
      this.controls = Object.keys(config.controls);
      // ui - stored in stateObj
      this.scene =  config.opening_scene;          
      this.control_state = config.controls;

      // this.terms = Object.keys(this.scene)
      const terms = ['scene', 'i3d', 'i2d', 'base', 'ui', 'shot']; 
      this.terms = terms; 

      // flag to regulate processing in the $locationChangeSuccess handler<br>
      // true => process back/fwd;<br> 
      // false => jump over back/fwd processing<br>
      // ```this.backfwd``` set to false in change_state() because that method is not
      // attained by back-fwd; ```this.backfwd``` is set to true at end of url-change
      // in the $stateChangeSuccess handler for the next url<br>
      // frame is an ordered index for stateObjs - it is used to determine if a
      // back-fwd url change is back or forward - by order comparison to the
      // previous frame index
      // * NOTE: fwd implies that the shot animation timeline is played forward
      // in time, and back implies that it is reversed in time
      this.backfwd = false;
      this.frame = 0;

      // prev_url saves the present url for various comparisons to (present) url<br> 
      // sequence is a hash with url keys and frame index values ordered 
      // by time of creation - used to detect back or forward button press
      this.sequence = {};
      this.prev_url = '^';             // delta
      this.back = false;

      // history stateObj - persistent
      // * NOTE: abs_params and delta_params each use the constant keys found in
      //   ```this.terms``` array: 'scene', 'i3d', 'i2d', 'base', 'ui' and 'shot'
      // * NOTE: abs_params  is the set of six component values found in the tail of the
      //   address bar url following the 'app/'<br>
      //   Similarly delta_params are the components of the relative url 'tail'
      //   which have changed from the previous state's url with "" representing
      //   the unchanged components.
      // * By tail is meant ```<adress bar url>.replace(/.*app\//, "");```
      // * NOTE: config.initial_url is an example of a relative url 'tail'
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

      // metastate - stateConfig of single 'delta' state
      this.metastate = $state.get('delta');

      // initial metastate.stateObj/stateObjp
      this.metastate.stateObj = this.stateObj;
      this.metastate.stateObjp = this.stateObjp;
      
      // initial store of stateObj uses ```config.initial_url``` as initial url
      // * NOTE: this.stateObj['abs_url'] = config.initial_url which is a full
      //   url-components expansion so provides an information 'bootstrap' about
      //   what is playing in the first state-scene<br>.       
      //   This permits component 'set changes' and dynamic camera shots to be 
      //   applied to the opening scene
      history.replaceState(this.stateObj, this.scene);

      // TEMP! - test bindToController for ui-msgbg
      if(this.stateObj.abs_params['ui'].match(/ui-msgbg/)){
        this.test();
      }

      // NOTE: e.state is this.stateObj for some state
      window.addEventListener('popstate', (e) => {
      });



      $rootScope.$on('$locationChangeSuccess', (e) => {
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


        // ignore first locationChangeSucess which is start-up with url = '/'
        // log all url-state changes - except initial.
        // (possibly) e2e-test all url changes - except initial.
        // absolute = stateObj['abs_url'] and delta = $location(url)
        // {2,3} log abs_url, delta_url - for building e2e_spec array
        if(!/^\/$/.test(url)){
          Log.log(`${this.stateObj['abs_url']}`);
          Log.log(`${url}`);

          // *** e2e urls test
          if(config.e2e_test){
            // delta_url
            d_url = config.e2e_spec[urls_index].delta_url;
            delta_url = url; // $location.url()
            if(!check.primitive(delta_url)){
              delta_url = delta_url.valueOf();  // make primitive if not already
            }
  
            // abs_url
            a_url = config.e2e_spec[urls_index].abs_url;
            abs_url = this.stateObj.abs_url;
            if(!check.primitive(abs_url)){
              abs_url = abs_url.valueOf();  // make primitive if not already
            }
  
            // primitive strings are equal (===) by value, not ref
            // delta_url
            if(delta_url !== d_url){
              d_passed = false;
              console.log(`e2e_spec[${urls_index}] delta_url test failed: result:${delta_url} !== expected:${d_url}`);
              Log.log(`e2e_spec[${urls_index}] delta_url test failed: result:${delta_url} !== expected:${d_url}`);
            }
  
            // abs_url
            if(abs_url !== a_url){
              a_passed = false;
              console.log(`e2e_spec[${urls_index}] abs_url test failed: result:${abs_url} !== expected${a_url}`);
              Log.log(`e2e_spec[${urls_index}] abs_url test failed: result:${abs_url} !== expected:${a_url}`);
            }
  
            // score
            if(!d_passed || !a_passed){
              urls_failed++;
            }
  
            // prepare for next state-change e2e urls test
            urls_index++;
  
            // report e2e result
            if(urls_index === config.e2e_spec.length){
              console.log(`*** e2e action->state-change-urls comparison test: 
                                   ${config.e2e_spec.length} tests  
                                   ${urls_failed} failures ***`); 
              Log.log(`*** e2e urls test: ${config.e2e_spec.length} tests  ${urls_failed} failures ***`); 
            }
          }
        }//avoid initial url change ('/')


        // if $locationChangeSuccess generated by back or fwd button
        if(this.backfwd){

          // this.stateObjp
          this.stateObjp = this.sequence[this.frame];

          if(this.sequence[url] < this.sequence[this.prev_url]){
            this.back = true;
            this.frame -= 1;
          }else{
            this.back = false;
            this.frame += 1;
          }

          // this.stateObj
          this.stateObj = this.sequence[this.frame];

          // set metastate
          this.metastate.stateObj = this.stateObj;
          this.metastate.stateObjp = this.stateObjp;
          
          // recalculate this.metastate.delta_params and 
          // this.metastate.delta_url to correspond to change from the 
          // 'next' state instead of change from the 'previous' state
          // as originally calculated
          abs_paramsp = this.metastate.stateObjp.abs_params;
          abs_params = this.metastate.stateObj.abs_params;
          delta_params = delta(abs_params, abs_paramsp);
          for(let p of terms){
            delta_url += `/${delta_params[p]}`;
          }
          this.metastate.stateObj.delta_params = delta_params;   
          this.metastate.stateObj.delta_url = delta_url;   
          
          // sync this.stateObj 
          this.stateObj = this.metastate.stateObj;
          
          // set scene for ui
          $timeout(() => {
            $rootScope.$apply(() => {
              this.scene = this.stateObj.scene;
              this.scope().ui.scene = this.scene;
            });
          });
        }else{
          this.back = false;
        }

        // if not initial url '/' - identify malformed url
        if(!/^\/$/.test(url)){
          if(/^(\/.*){6}$/.test(url)){
          }else{
            console.log(`!Narrative.onLocChSucc(url = ${url} is NOT well-formed`);
            Log.log({t:'!Narrative', f:'onLocChSucc', a:`url ${url} is NOT well-formed`});
          }
        }
        
        // TEMP! - test bindToController for ui-msgbg
        if(this.stateObj.abs_params['ui'].match(/ui-msgbg/)){
          this.test();
        }
      });



      $rootScope.$on('$stateChangeSuccess', (e) => {
        var shot,
            _shot,
            expected_shot,
            _scope,
            delta,
            branches,
            node,
            tl,
            timeline = (_delta) => {
              var _timeline = _delta.timeline || {},
                  tlp = _timeline.p || {},
                  actors = _timeline.actors || {},
                  actions = _timeline.actions || [],
                  ntuple,
                  type,
                  id,
                  p,
                  target,  // target obj for property to be tweened - animated
                  tweens,
                  i;


              // timeline ctor params - tlp
              tlp.paused = tlp.paused || true; // default
              tlp.tweens = tlp.tweens || [];
              

              // iterate through actors on which one or more tweens are defined
              for(let a of Object.keys(actors)){
                ntuple = a.split(':');
                type = ntuple[0];
                id = ntuple[1];
                if(!type){
                  continue;
                }
                if(!id){
                  continue;
                }
                ntuple = ntuple.slice(2); 
                i=0;
                for(let q of ntuple){
                  i++;
                }

                // set target of tween
                if(type === 'i3d'){
                  target = Camera3d.actor(id);
                }else{
                  target = document.getElementById(id);
                }
                if(!target){
                  continue;
                }
                if(ntuple.length > 0){
                  for(let q of ntuple){
                    if(q){
                      target = target[q];
                    }
                  }
                }
                if(!target){
                  continue;
                }

                // insert tween defaults if not specified<br>
                // add tweens to tlp.tweens array
                tweens = actors[a];
                for(let tween of tweens){
                  // dur - duration of the tween animation
                  if(tween.dur === undefined){
                    tween.dur = 10;
                  }
                  // p - properties of the target object which are to be tweened
                  tween.p.delay = tween.p.delay || 0;
                  tween.p.ease = tween.p.ease || Quad.easeInOut;
                  // actions
                  if(tween.actions){
                    if(tween.actions.start){
                      tween.p.onStart = Mediator.exec;
                      tween.p.onStartParams = tween.actions.start;
                    }
                    if(tween.actions.update){
                      tween.p.onUpdate = Mediator.exec;
                      tween.p.onUpdateParams = tween.actions.update;
                    }
                    if(tween.actions.complete){
                      tween.p.onComplete = Mediator.exec;
                      tween.p.onCompleteParams = tween.actions.complete;
                    }
                    if(tween.actions.start){
                      tween.p.onReverseComplete = Mediator.exec;
                      tween.p.onReverseCompleteParams = tween.actions.reverse_complete;
                    }
                  }
                  tlp.tweens.push(TweenMax.to(target, tween.dur, tween.p));
                }
              }//actors


              // add callback function(s) to tlp 
              if(actions){
                if(actions.start){
                  tlp.onStart = Mediator.exec;
                  tlp.onStartParams = actions.start;
                }
                if(actions.update){
                  tlp.onUpdate = Mediator.exec;
                  tlp.onUpdateParams = actions.update;
                }
                if(actions.complete){
                  tlp.onComplete = Mediator.exec;
                  tlp.onCompleteParams = actions.complete;
                }
                if(actions.reverseComplete){
                  tlp.onReverseComplete = Mediator.exec;
                  tlp.onReverseCompleteParams = actions.reverseComplete;
                }
              }
              // add Mediator.next() to onComplete
              // force Mediator.next - overwrite if needed
              tlp.onComplete = Mediator.exec;
              tlp.onReverseComplete = Mediator.exec;
              tlp.onCompleteParams = actions.complete || [];
              tlp.onCompleteParams.push({t: 'mediator', f:'queue_ready_next'});
              tlp.onReverseCompleteParams = actions.reverseComplete || [];
              tlp.onReverseCompleteParams.push({t: 'mediator', f:'queue_ready_next'});

              // return primed timeline
              return new TimelineMax(tlp);
            };//timeline() 
            

        // update urls
        this.prev_url = $location.url();

        // set to trigger back-fwd processing - turned off in change_state
        // if no back/fwd button press
        this.backfwd = true;


        // *** e2e shot-test
        // convert shot objects to JSON-strings and ensure they are primitives
        if(config.e2e_test){

          // prepare
          shot = JSON.stringify(this.scope().shot || {});
          if(!check.primitive(shot)){
            console.log(`!JSON.stringify(shot) not primitive - index ${shot_index}`);
            Log.log(`!JSON.stringify(shot) not primitive - index ${shot_index}`);
            shot = shot.valueOf();
          }
          expected_shot = JSON.stringify(config.e2e_spec[shot_index].shot);
          if(!check.primitive(expected_shot)){
            console.log(`!JSON.stringify(expected_shot) not primitive - index ${shot_index}`);
            Log.log(`!JSON.stringify(expected_shot) not primitive - index ${shot_index}`);
            expected_shot = expected_shot.valueOf();
          }
          // test
          if(shot !== expected_shot){
            shot_failed++;
            console.log(`e2e_spec[${shot_index}] shot test failed: result:${shot} !== expected:${expected_shot}`);
            Log.log(`e2e_spec[${shot_index}] shot test failed: result:${shot} !== expected:${expected_shot}`);
          }
          
          // prepare for next e2e shot test
          shot_index++;

          // report e2e result
          if(shot_index === config.e2e_spec.length){
            console.log(`*** e2e shot->scope.shot models comparison test: 
                             ${config.e2e_spec.length} tests  
                             ${shot_failed} failures ***`); 
            Log.log(`*** e2e shot test: ${config.e2e_spec.length} tests ${shot_failed} failures ***`); 
          }
        }


        // possible grafts and animations in shot model
        // if no chnage in shot this.scope().shot is undefined
        //prev: delta = this.scope().shot.delta || {};
        _scope = this.scope() || {};
        _shot = _scope.shot || {};
        

        // {4} log abs_url, delta_url - for building e2e_spec array
        Log.log(_shot);


        // timeline - acts on base, i3d and/or i2d actors
        delta = _shot.delta || {};
        tl = timeline(delta);

        // timeline - if back - run anim in reverse, else forward
        if(this.back === true){
          tl.seek(tl.duration());
          tl.reverse();
        }else{
          tl.play();
        }
      });
    }//ctor



    // narrative instance methods:<br>
    // diagnostic feedback monitoring of $templateCache
    onload(msg){
      if(msg.match(/templates.html/)){
      }
    }



    // manage control changes and UI in a synchronized manner
    change_control(control){ 

      // 'csph' is camaerasphere<br>
      // lights (attached to camerasphere) consist of 
      // defaults - 'key', 'fill' and 'back'
      switch(control){
        case 'HOME':
          Camera3d.home({d:3});
          $timeout(() => {
            $timeout(() => {
              $rootScope.$apply(() => {
                this.control_state['HOME'] = false;
              });
            }, 3000);
          });
          // log action
          Log.log({"t":"camera3d", "f":"home", "a":{"d":3}});
          break;

        case 'CNTR':
          Camera3d.center({d:3});
          $timeout(() => {
            $timeout(() => {
              $rootScope.$apply(() => {
                this.control_state['CNTR'] = false;
              });
            }, 3000);
          });
          // log action
          Log.log({"t":"camera3d", "f":"center", "a":{"d":3}});
          break;

        case 'csph':
          if(Camera3d.csphere()){
            let b = this.control_state['csph'];
            Camera3d.toggle_csphere({name:'csph', val:b});
            // log action
            Log.log({"t":"camera3d", "f":"toggle_csphere", "a":b}); 
          }else{
            // revert to prev state of control
            $timeout(() => {
              $rootScope.$apply(() => {
                this.control_state['csph'] = !this.control_state['csph'];
              });
            });
          }
          break;

        case 'key':
        case 'fill':
        case 'back':
          if(Camera3d.light(control)){
            let b = this.control_state[control];
            Camera3d.toggle_light({name:control, val:b});
            // log action
            Log.log({"t":"camera3d", "f":"toggle_light", "a":b}); 
          }else{
            // revert to prev state of control
            $timeout(() => {
              $rootScope.$apply(() => {
                this.control_state[control] = !this.control_state[control];
              });
            });
          }
          break;

        default: 
          console.log(`!unknown control name = ${control}`); 
      }
    }


    // shot<br>
    // shot = 'template-name':JSON-model or 'template-name':'model-name'<br>
    // shot is converted to an abs_url for eventual invocation of 
    // ```change_state(abs_url)```
    shot(shot){
      var abs_url_components, 
          abs_url='/',
          i=0;

      // guard - non-empty string
      if(!check.unemptyString(shot)){
        console.log(`!Narrative.shot(shot = ${shot}) Not unempty string)`);
        return;
      }
      // guard - has form template-name:JSON or template-name:model-name
      if(!/:/.test(shot)){
        console.log(`!Narrative.shot(shot = ${shot}) NOT well-formed)`);
        return;
      }

      Mediator.queue.ready = false;
      abs_url_components = this.stateObj.abs_url.split('/'); 
      abs_url_components.pop();
      if(abs_url_components[0] === ''){
        abs_url_components.shift();
      }

      for(let c of abs_url_components){
        abs_url += `${c}/`;
      }
      abs_url += shot;

      // if shot is json embed json model into scope and rename model to:
      // ```'scope'${frame}``` - exp: JSON model -> 'scope27'<br>
      // The JSON is parsed to a model object and written to 
      // ```narrative.scope().shot```<br>
      // The keyword 'scope' in the url shot component alerts the metastate 
      // processor in app.js that the shot model is already on the scope 
      // so need not be fetched from Models<br>
      this.change_shot(abs_url);
    }
      

    // change_scene_by_ui(scene){
    // allows logging of action before calling change_scene
    // NOTE: this cannot be done in change_scene since change_scene may have
    // been invoked by a non-UI action such as a studio score performance,
    // and consequently a change_scene action would have already been logged.
    change_scene_by_ui(scene){
      Log.log({"t":"narrative", "f":"change_scene", "a":scene});
      this.change_scene(scene);
    }

    // change scene<br>
    // builds absolute url from scene components given for the scene in
    // config.<br> 
    change_scene(scene){
      var abs_values = [],
          abs_params = {},
          abs_url,
          i = 0;

      // guard - non-empty string
      if(!check.unemptyString(scene)){
        console.log(`!Narrative.change_scene(scene = ${scene} - Not unempty string)`);
        return;
      }
      // guard - scene among config.scenes
      // technique using check-more-types.js
      if(!check.oneOf(Object.keys(config.scenes), scene)){
        console.log(`!Narrative.change_scene(scene = ${scene} - Not in config.scenes)`);
        return;
      }
      // technique using check-types.js
//      if(check.any(check.apply(Object.keys(config.scenes), (s) => {
//        s === scene.valueOf();
//      }))){
//        console.log(`!Narrative.change_scene(scene = ${scene} - Not in config.scenes)`);
//      return;
//      }


      // if scene is changed by action-msg rather than UI - sync UI via this.scene
      if(scene !== this.scene){
        $timeout(() => {
          $rootScope.$apply(() => {
            this.scene = scene; // change UI if change is by action-message
          });
        });
        this.scene = scene; // change narrative property now for further analysis

      }

      // if scene is not previous url scene get params state and urls
      if(this.scene !== this.stateObj.scene){

        // this.abs_params, abs_values
        abs_params = config.scenes[this.scene];
//        for(let p of this.terms){
//        }
        // abs_values
        for(let p of this.terms){
          abs_values[i++] = abs_params[p];
        }

        // urls
        abs_url = '/';
        abs_url += abs_values.join('/');

        // if shot is json embed json model into scope and rename model to:
        // ```'scope'${frame}``` - exp: JSON model -> 'scope27'<br>
        // The JSON is parsed to a model object and written to 
        // ```narrative.scope().shot```<br>
        // The keyword 'scope' in the url shot component alerts the metastate 
        // processor in app.js that the shot model is already on the scope 
        // so need not be fetched from Models<br>
        this.change_shot(abs_url);
      }
    }


    // change_shot<br>
    // * simplifies url and then calls ```change_state(simplified-url)```:
    //   * replace JSON-string shot-model in url by string 'scope'+frame-number
    //   * parse the JSON to an object 'model' and set ```scope.shot = model```
    //   * call change_state(url) with the simpler url.
    // * NOTE: the use of JSON-model shots permits dynamic shot cinematography 
    //   not requiring the model to pre-exist in the Models service cache
    change_shot(url){
      var tuple = url.split('shot'),
          shot = [],
          template,
          model;

      // guard - non-empty string
      if(!check.unemptyString(url)){
        console.log(`!Narrative.change_shot(url = ${url} - Not unempty string)`);
        return;
      }
 
      tuple[1] = 'shot' + tuple[1];
      shot = tuple[1].split(/:(.*)/) || "";
  
      template = shot[0] || "";
      model = tuple[1].split(/:(.*)?/)[1] || "";

  
      if(!/^{/.test(model)){
        this.change_state(url);
      }else{  
        // process url
        model = JSON.parse(model);
        this.scope().shot = model;
  
        // new url
        url = tuple[0] + template + ':scope' + this.frame;
        this.change_state(url);
      }
    }


    // change state via $urlRouterProvider and $location.url(this.delta_url)
    change_state(url){
      var params = {},
          values = [],
          abs_params = {},
          abs_values = [],
          delta_values = [],
          i = 0;

      // guard - non-empty string
      if(!check.unemptyString(url)){
        console.log(`!Narrative.change_state(url = ${url} - Not unempty string)`);
        return;
      }
      
      // guard - convert trailing '/' (undefined shot) to 'shot-fixed:'
      if(/\/$/.test(url)){
        url = url + 'shot-fixed:';
      }
      
      // guard - replace 'shot-fixed:{}' by non-JSON equivalent 'shot-fixed:'
      // guard - replace incorrect shot '{}' by 'shot-fixed:'
      if(/shot-fixed:\{}$/.test(url)){
        url = url.replace(/\{}$/, "");
      }else{
        if(/\{}$/.test(url)){
          url = url.replace(/\{}$/, "shot-fixed:");
        }
      }


      // guard - should NOT contain JSON - removed previously by change_shot()
      // or guards
      if(/\{/.test(url)){
        console.log(`!Narrative.change_state(url = ${url} - contains JSON - returning)`);
        return;
      }


      // init new this.stateObj
      this.stateObj = {};
      this.stateObj.abs_params = {};
      this.stateObj.delta_params = {};
      this.frame += 1;
      this.stateObj.frame = this.frame;


      // params from url components; copy of metastate.stateObj.abs_params
      values = url.slice(1).split('/');
      for(let p of this.terms){
        params[p] = values[i];
        i+=1;
      }

      // this.stateObj.abs_params
      abs_params = this.metastate.stateObj.abs_params;
      i = 0;
      for(let p of this.terms){
        this.stateObj.delta_params[p] = ""; // initial
        abs_values[i] = "";                 // initial
        if(params[p].length > 1){
          this.stateObj.abs_params[p] = params[p];
          abs_values[i] = params[p];
        }else{
          this.stateObj.abs_params[p] = abs_params[p];
          abs_values[i] = abs_params[p];
        }
        i += 1;
      }

      // this.stateObj.delta_params
      i = 0;
      this.stateObj.delta_params = {};
      for(let p of this.terms){
        this.stateObj.delta_params[p] = "";  // initial
        delta_values[i] = "";                // initial
        i += 1;
      }
      i = 0;
      for(let p of this.terms){
        if(params[p].length > 0){
          if(params[p] !== abs_params[p]){
            this.stateObj.delta_params[p] = params[p];
            delta_values[i] = params[p];
          }
        }  
        i+=1;
      }

      // this.stateObj.scene, this.stateObj.abs_url, this.stateObj.delta_url
      this.stateObj.scene = this.stateObj.abs_params['scene'].split(":")[0]; 
      this.stateObj.abs_url = '/';
      this.stateObj.delta_url = '/';
      this.stateObj.abs_url += abs_values.join('/');
      this.stateObj.delta_url += delta_values.join('/');
      this.stateObj.control_state = this.control_state;

      // set scene for ui
      $timeout(() => {
        $rootScope.$apply(() => {
          this.scene = this.stateObj.scene;
          this.scope().ui.scene = this.scene;
        });
      });

      // diagnostics

      // metastate
      this.metastate.stateObjp = this.metastate.stateObj;
      this.metastate.stateObj = this.stateObj;

      // change state via url<br>
      // skip back-fwd processing in $locationChangeSuccess handler
      this.backfwd = false;
      this.sequence[this.stateObj.delta_url] = this.frame;
      this.sequence[this.frame] = this.stateObj;
      //  ${this.sequence[this.stateObj.delta_url]}`);
      //  ${this.sequence[this.frame].abs_url}`);

      // trigger state change
      $location.url(this.stateObj.delta_url);

      // load current stateObj - no url update is needed
      history.replaceState(this.stateObj, this.scene); 
    }


    // TEMP!: expt-test of bindToController{ bgcolor: '=' }
    test(){
      // if ui-msgbg is used in index.html narrative link-f will not have
      // been called yet - so this.scope() and scope will be undefined<br>
      // these alternatives place ui and ui.bgcolor on narrative instead
      // and then set scope = narrative (this) iff this.scope() is undefined
      var scope = (this.scope ? this.scope() : this);
      scope.ui = {};
      scope.ui.bgcolor='black';      
      scope.ui.scene = this.scene;      
//      if(scope === this){
//      }else{
//      }

      $timeout(function(){
        $rootScope.$apply(function(){
          scope.ui.bgcolor = 'red';
        });
      }, 1000);

      $timeout(function(){
        $rootScope.$apply(function(){
          scope.ui.bgcolor = 'blue';
        });
      }, 3000);
    }//test
  }


  // return factory object DDO
  return {
    restrict: 'EA',   // attribute preferred for use in <body>
    // to use bindToController scope must be created so must be 
    // isolated ({}) or child (true)
    scope: true,    
    controller: Narrative,      // instance of class-ctor Narrative 
    controllerAs: 'narrative',  // standard name for component ctrl instance

    // binds specified scope-references used by template properties<br>
    // use same name in template parent controller and child controller<br>
    // '=' => properties are 'double-bound' between controllers and template<br>
    // '@' => parent properties are written to the template'<br> 
    //        but there is no sync between controllers p->ch or ch->p
    bindToController: true,

    // link-f unused except for diagnostics
    link(scope, el, attrs, narrative){

      var _scope = scope;

      // method to get scope reference - crucially important!
      // * NOTE: scope is needed by metastate processor in app.js
      //   to compile all dynamic templates
      narrative.scope = () => {
        return _scope;  // available via closure
      };

      Mediator.component("narrative", narrative);


      // initialize Cameras (once) and pass in narrative.scope (critical!)<br> 
      // Also set refs to narrative and mediator - crucial!
      Camera2d.place(scope);
      Camera2d.set_narrative(narrative);
      Camera2d.set_mediator(Mediator); // also set in Mediator


      // initialize Camera3d (once) - pass in scope<br>
      // * arg0 = id of canvas3d
      // * arg1 = name of template_view (and model)
      // * arg2 = narrative.scope (critical!)
      // * [arg3] = (optional) reference to procedurally pre-created Three.js 
      //   scene loaded by index.html script and output as var 'Scene' 
      Camera3d.place(config.canvas3d,
                     config.scenes[config.opening_scene]['i3d'],
                     _scope,
                     config.Scene);  // temp - opening 3D scene

      // Also set refs to narrative mediator - crucial!
      Camera3d.set_narrative(narrative);
      Camera3d.set_mediator(Mediator); // also set in Mediator
    }//link-f
  };//return DDO
});
