// * app.js
// * central module for angular components<br>
// * configures providers and runs initial set-up
// * manages metastate system for url-specified compiled template:model view
//   component updates animation and cinematography
// * NOTE: url = scene/i3d(webgl)/i2d(svg)/base(html)/ui/shot
//
// * @dependency 'ui-router' - state-based routing<br>
//   @dependency 'ui-grid' - ui and table interface to data (future apps)<br>
//   @dependency param services, config <br>
//   @param {ui.router.state.$stateProvider} $stateProvider<br>
//   @param {ui.router.router.$urlRouterProvider} $urlRouterProvider<br>
//   @param {ng.$locationProvider} $locationProvider<br>
//   @param {ui.router.state.$state} $state<br>
//   @param {ng.$rootScope} $templateCache <br>
//   @param {ng.$rootScope} $compile <br>
//   @param {ng.$rootScope} $timeout<br>
//   @param {ng.$rootScope} $rootScope<br>
//   @param {services/models-service} Models<br>
//   @param {services/camera3d-service} Camera3d<br>
//   @param {services/mediator-service} Mediator<br>
//   @param {services/log-service} Log<br>
//   @param {services/mockserver-service} Mockserver<br>
//   @param {app/services/mixin-service} Mixin<br>
//   @param {app/services/transform3d-service} Transform3d<br>
//   @param {index.html} Angular object value 'config'<br>
//   @ngInject
//
// * NOTE: Mixin and Transform3d are injected only for possible unit testing
//
// * NOTE: @ngInject is used by ngAnnotate to generate a 
//   minification-safe injection annotation such as:
//   ```function($scope) => ['$scope', function($scope){}]```
//
// * NOTE: app.js also implements a MutationObserver system of DOM watch for changes 
//   in selected properties and children. However at present it is not used<br>
//   Preferred is a direct interaction with i3d-components within the canvas 
//   'singularity' since it is faster and simpler than a two-level event-watch 
//   system<br>
//   However i3d-components are initially created declaratively via angular directives 
//   using svg-templates compiled into the DOM using associated JSON models.<br>
//   These i3d actors are then later animated and modified by direct access since the
//   webgl objects are accessible by DOM id from an object hierarchy managed by
//   Camera3d


angular.module("app", ['ui.router', 'ui.grid'])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider){
    'use strict'; 


    // $locationProvider<br>
    // enable use of html5Mode urls and browser history api
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false,
      rewriteLinks: false
    });


    // $urlRouterProvider<br>
    // application state-change via url
    $urlRouterProvider.otherwise('/');


    // $stateProvider<br>
    // association of templates and models with the six components of application
    // state:<br>
    // * scene
    // * i3d
    // * i2d
    // * base(html/css)
    // * ui(html)
    // * shot(cinematography, animation and generative dynamics)<br>
    //
    // * NOTE: url has form: {scene}/{i3d}/{i2d}/{base}/{ui}/{shot} where each
    //   component is a template-model pair<br><br>
    //
    // * NOTE: initial unnamed state has the following implicit properties:
    // ```.state('', {
    //   url: '^',
    //   template: 'index.html',
    //   abstract: true
    // })```
    //
    // * NOTE: templateUrl takes one preset param stateParams - not injected
    //
    // * NOTE: ```metastate.onEnter``` will only be called during the first and all
    //   subsequent url changes, and not during the initial rendering of index.html<br>
    //   thus a reference to narrative component-controller will be available from 
    //   Mediator for each state-change - critical because all models are placed
    //   on the parent narrative scope.<br>
    var metastate = {
      url: '^/{scene}/{i3d}/{i2d}/{base}/{ui}/{shot}',
      onEnter: () => {
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
            node;    // named node(s) in shot model

        // fetch reference to narrative component controller-scope
        narrative = metastate.narrative || 
          metastate.Mediator.component('narrative');

        // narrative has method to return reference to its scope<br>
        // this scope is used when compiling all dynamic templates since
        // it contains all models
        scope = scope || narrative.scope();
 
        // Camera3d
        Camera3d = Camera3d || metastate.Camera3d;

   
        // delta templates/models
        for(let p of Object.keys(delta_params)){
          if(delta_params[p].length > 0){
            name = delta_params[p];
            tuple = name.split(":");
            template = tuple[0] || "";
            model = tuple[1] || "";

            switch(p){
              case 'scene':
                // at present scene is used only to display scene-name at the
                // start of the url<br>
                // The scene-model is reserved for possible future uses
                // such as audio and/or dialogue
                break;

              case 'i3d':

                // fetch the template_view from the cache
                template_view = metastate.cache.get(`${template}.svg`);

                // make model available on narrative component scope 
                scope.i3d = metastate.Models.get('i3d', template, model) || {};
                //for(let p of Object.keys(scope.i3d)){
                //}

                // change i3d template_view and webgl scene
                // * NOTE: optionally can pass in procedurally created scene
                Camera3d.changeTemplateScene(template);

                // replace content of '#i3d' template-view container with the
                // template_view fetched from the cache
                $("#i3d").html(template_view);

                // compile the template_view and all contained directives
                // using the model (which is attached at scope.i3d)
                metastate.compile($("#i3d").contents())(scope);
                break;

              case 'i2d':

                // fetch the template_view from the cache
                template_view = metastate.cache.get(`${template}.svg`);

                // make model available on narrative component scope 
                scope.i2d = metastate.Models.get('i2d', template, model) || {};
                //for(let p of Object.keys(scope.i2d)){
                //}

                // replace content of '#i2d' template_view container with the
                // template_view fetched from the cache
                $("#i2d").html(template_view);
                
                // compile the template_view and all contained directives
                // using the model (which is attached at scope.i2d)
                metastate.compile($("#i2d").contents())(scope);
                break;

              case 'base':

                // fetch the template_view from the cache
                template_view = metastate.cache.get(`${template}.html`);

                // make model available on narrative component scope 
                scope.base = metastate.Models.get('base',template,model) || {};

                // shot
                scope.shot = scope.shot || {};

                // replace content of '#base' template_view container with the 
                // template_view fetched from the cache
                $("#base").html(template_view);

                // compile the template_view and all contained directives
                // using the model (which is attached at scope.base)
                metastate.compile($("#base").contents())(scope);
                break;

              case 'ui':

                // fetch the template_view from the cache
                template_view = metastate.cache.get(`${template}.html`);

                // make model available on narrative component scope 
                scope.ui = metastate.Models.get('ui', template, model) || {};
                // shot
                scope.shot = scope.shot || {};

                // replace content of '#ui' template_view container with the
                // template_view fetched from the cache
                $("#ui").html(template_view);

                // compile the template_view and all contained directives
                // using the model (which is attached at scope.ui)
                metastate.compile($("#ui").contents())(scope);
                break;

              case 'shot':

                // fetch the template_view from the cache
                template_view = metastate.cache.get(`${template}.svg`);

                // check the shot-model name:<br>
                // If it is 'scope' then narrative has already written the model
                // to scope.shot<br> 
                // If not then fetch the model from Models and place it on
                // scope.shot - if no model then set scope.shot = {}<br>
                if(!/^scope/.test(model)){
                  scope.shot = metastate.Models.get('shot', template, model) || {};
                }else{
                  scope.shot = scope.shot || {};
                }


                // process each grafted branch at indicated existing parent
                // scope.shot = shot.template.model = {branch0,...} (object)
                let delta = scope.shot.delta || {};
                //console.dir(scope.shot.delta);

                let branches = delta.branches || {};
                //console.dir(delta.branches);

                // iterate through parents upon which to graft each branch
                for(let p of Object.keys(branches)){
                  node = $(`#${p}`);  // i3d-svg-DOM element

                  // add the template_view to the i3d-svgDOM for angular
                  // compilation by action of directives in the template<br>
                  node.append(template_view);

                  metastate.compile(node.contents())(scope);
                }//branches

                // * NOTE: graft-parent transforms and timeline animation
                //   is executed in narrative $stateChangeSuccess event-handler 
                //   to allow selection of t-direction (fwd/back)<br>
                //   back => timeline.reverse(),else fwd by timeline.play()
                break;

              default:
            }
          }//changed state components
        }//state components
      }//onEnter()
    };//metastate

    $stateProvider
    .state('delta', metastate);  
  }) //config


  // * narrative-component directive is linked and only after app.run, 
  //   so all services and values needed by ``metastate.onEnter```` must be 
  //   placed on // metastate to be accessed.<br> 
  //   Narrative (and hence its scope) can be obtained from Mediator.<br>
  // * Recall that all component controllers register a named reference with 
  //   Mediator  
  // * Recall also that narrative has a method scope() which returns its scope
  .run(function($state, $templateCache, $location, $compile, $timeout, 
    $rootScope, Models, Camera3d, Mediator, Log, Mockserver, Mixin, Transform3d, 
    config) {
    'use strict';

    var observer;

  
    // make $templateCache $location $rootScope $compile $timout $rootScope, 
    // Models Mixin Camera3d and Mediator accessible to single state 
    // 'delta' stateConfig object metastate
    var metastate =$state.get('delta');
    metastate.cache = $templateCache;
    metastate.location = $location;
    metastate.compile = $compile;
    metastate.timeout = $timeout;
    metastate.Models = Models;
    metastate.Camera3d = Camera3d;
    metastate.Mediator = Mediator;
    metastate.Log = Log;
    metastate.config = config;


    // set up Mutation Observer on media DOM (i2d/i3d branches of 'zoom_plane')
    // which takes an options object arg containing DOM change handler and
    // one or more queries specifying elements and attributes to observer
    // and the rootNode DOM 'branch' to watch - zoom_plane is media-DOM root 
    observer = new MutationSummary({
      queries: [{attribute: 'transform'}, {attribute: 'form'}], 
      //{attribute: 'children'}]; - not used
      rootNode: document.getElementById('i3d'),
      callback : (summaries) => {
        var dtransform = summaries[0],
            dform = summaries[1],
            actor,
            delta = [],
            m = new THREE.Matrix4(),
            mr,
            mt,
            ms,
            k;


        // delta-transform
        for(let node of dtransform.valueChanged){

          // current value of node.transform - transform
          let transform = JSON.parse(node.getAttribute('transform'));

          // previous value of node.form - formp
          let transformp = JSON.parse(dtransform.getOldAttribute(node, 
            'transform'));

          // actor
          actor = Camera3d.actor(node.id);

          // execute transform changes on webgl actor
          for(let p of Object.keys(transform)){
            if(!angular.equals(transform[p], transformp[p])){
              delta.push({property: p,
                          previous: transformp[p],
                          current: transform[p]});
            }
          }

          // transform matrix component matrices
          for(k=0; k<delta.length; k++){
            let p = delta[k]['property'];
            if(p === 't'){
              let ta = delta[k]['current'];
              for(let i=0; i<ta.length; i++){
              }
              mt = (new THREE.Matrix4()).makeTranslation(ta[0],ta[1],ta[2]);
            }
            if(p === 'q'){
              let qa = delta[k]['current'];
              for(let i=0; i<qa.length; i++){
              }
              let q = new THREE.Quaternion(qa[0],qa[1],qa[2],qa[3]);
              mr = (new THREE.Matrix4()).makeRotationFromQuaternion(q);
            }
            if(p === 'e'){
              let ea = delta[k]['current'];
              for(let i=0; i<ea.length; i++){
              }
              let euler = new THREE.Euler(ea[0],ea[1],ea[2]);//default pyr (xyz)
              let q = (new THREE.Quaternion()).setFromEuler(euler);
              mr = (new THREE.Matrix4()).makeRotationFromEuler(euler);
            }
            if(p === 's'){
              let sa = delta[k]['current'];
              for(let i=0; i<sa.length; i++){
              }
              ms = (new THREE.Matrix4()).makeScale(sa[0],sa[1],sa[2]);
            }
          }//delta[k]
    
          // transform matrix - first scale, then rotate, then translate
          m = mt || m;
          if(mr){
            m = m.multiply(mr);
          }
          if(ms){
            m = m.multiply(ms);
          }

          // transform actor in webgl scene
          actor.applyMatrix(m);
        }//dtransform.valueChanged()


        // delta-form
        for(let node of dform.valueChanged){

          // current value of node.transform - transform
          //let form = node.getAttribute('form');

          // previous value of node.form - formp
          //let formp = dform.getOldAttribute(node, 'form');

          // @TODO
          // use component controllers to modify webgl actor form properties
          // NOTE: this may mean remaking a Material!
        }//dform.valueChanged
      }//callback
    });//MutationSummary

    

    // * connect to server (if required).
    // * Server logs e2e cell data (action; abs_url; delta_url; shot)
    //   and possibly records the action stream (config.record_stream) 
    //   and also possibly records the interactive-keyboard camera shots 
    //   (config.record_shots)
    // * If server is started with non-empty argv[2] ($node index <any char>)
    //   then the server is expected to broadcast a performance action-sequence
    if(config.server_connect){
      Mediator.connect();
    }


    // * unit_test and/or e2e_test.
    // * Listen for alt-3 - possibly start unit test followed by possible 
    //   Mockserver start if unit tests all pass, or possible e2e_test by itself.
    // * Mockserver broadcasts (rehearsal) performance actions and/or e2e test. 
    window.addEventListener("keyup", function(e){
      switch(e.keyCode){

        // start score-timeline action sequence broadcast<br>
        // alt 3 => start
        case 51: 
          if(e.altKey){
            if(config.unit_test){
              console.log("starting unit tests...");
              config.unit_spec(Mediator, Mixin, Transform3d, Camera3d, config).then(() => {
                if(config.mockserver_connect){
                  console.log("starting Mockserver...");
                  Mockserver.start();
                  config.mockserver_connect = false;
                }
              }).catch((e) => {
                console.log(`unit tests failed: ${e}`);
                console.log("skipping e2e test...");
              });
            }else{
              if(config.mockserver_connect){
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

  });// run
