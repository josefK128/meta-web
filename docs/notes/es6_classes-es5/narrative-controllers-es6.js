/**
 * NarrativeController.
 * dynamic meta-controller for state management
 *
 * @param {angular.$rootScope.$scope} $scope
 * @ngInject
 */

//angular.module('app').controller('NarrativeController', function($scope, $state, $location, $templateCache, StateDescriptors, Mediator, Log, Camera2D, Camera3D) {
angular.module('app').controller('NarrativeController', function($scope) {
  'use strict';

  /**
   * class declarations are not hoisted so place at top in case of
   * possible extends expression, for exp.
   */
  class NarrativeController {
    constructor(vm){
      vm.narrative = {
        states: ["opening", "scene1"],
        state:  {name: "opening"},
        change_state(){ 
          console.log("state changed to: " + vm.narrative.state.name);
        }
      }; 
    }
  }
  return new NarrativeController($scope);
});




/**
 * NarrativeController (BROMLEY)
 * dynamic controller for dimensional svg data-visualization
 *
 * @param {angular.$rootScope.$scope} $scope
 * @ngInject
 */

class NarrativeController {
  /*@ngInject*/
  constructor($scope){
    this.$inject = ['$scope'];
    $scope.narrative = {
      states: ["opening", "scene1"],
      state:  {name: "opening"},
      change_state(){ 
        console.log("state changed to: " + $scope.narrative.state.name);
      }
    }; 
  }
}

angular.module('app').controller('NarrativeController', NarrativeController);
