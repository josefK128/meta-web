// * ui-msgbg-directive.js 
// * dynamic UI template with associated controller-viewmodel  
//
// * @dependencies: $timeout and $rootScope - for $apply to update UI controls<br>
//   @param {angular.$timeout} $timeout<br>
//   @param {angular.$rootScope} $rootScope<br>
//   @param {angular.$templateCache} $templateCache<br>
//   @param {app/services/mediator-service} Mediator<br>
//   @ngInject
//
// * NOTE: ngInject is used by ngAnnotate to generate a 
//   minification-safe injection annotation such as:
//   ```function($scope) => ['$scope', function($scope){}]```


angular.module('app')
  .directive('uiMsgbg', function($templateCache, $rootScope, $timeout, 
    Mediator) {
  'use strict';


  class Msgbg {
    constructor(){}

    msg_changed(){
    }
  }


  // return directive definition object - DDO
  return {
    restrict: 'E',      // element
    replace: true,      // replace <ui-msgbg> with compiled template

    templateNamespace: 'html',
    template: "<div ng-style='{background: msgbg.bgcolor}'" +
    "style='transform:translateX(-26%) scaleX(.5)' >" +
    "<input type='text' ng-model='msgbg.msg' ng-change='msgbg.msg_changed()'>" +
     "m.bgc:{{msgbg.bgcolor}} " + "ui.bgc:{{$parent.ui.bgcolor}}</div>",
  
    // to use bindToC scope must be isolated ({}) or child (true)<br>
    // If isolated scope {} then reference narrative.bgcolor must be 
    // $parent.narrative.bgcolor (parent is root)<br>
    // $parent.narrative.bgcolor works for both {} and child scoping
    scope: {},        
    controller: Msgbg,      // instance of Class-ctor Msgbg
    controllerAs: 'msgbg',  // standard name for component controller instance

    // binds specified scope-references used by template properties<br>
    // use same name in template parent controller and child controller
    // * '=' => properties are 'double-bound' between controllers and template
    // * '@' => parent properties are written to the template' 
    //    but there is no sync between them
    bindToController: {
      bgcolor: '=',         
      msg: '='         
    },

    // link-f unused except for diagnostics
    link(scope, el, attrs, msgbg){

      // set id on controller
      // * NOTE: attributes of directive are merged with template attributes
      //   see 'bgcolor' - defined in both but has template value 
      msgbg.id = attrs['id'];

      // expt: set msgbg.id = msgbg.bgcolor = green 
      $timeout(function(){
        scope.$apply(function(){
          msgbg.bgcolor = 'green';
        });
      }, 2000);

      // expt: set msgbg.id = msgbg.bgcolor = yellow 
      $timeout(function(){
        scope.$apply(function(){
          msgbg.bgcolor = 'yellow';
        });
      }, 4000);

    }//link-f
  };//return DDO
});
