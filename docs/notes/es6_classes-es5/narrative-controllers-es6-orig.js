/**
 * NarrativeController
 * dynamic controller for dimensional svg data-visualization
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
      //$scope.narrative.states = ["opening", "scene1"];
      vm.states = ["opening", "scene1"];
    }
  }
  return new NarrativeController($scope);

});



/**
 * NarrativeController-BROMLEY
 * dynamic controller for dimensional svg data-visualization
 *
 * @param {angular.$rootScope.$scope} $scope
 * @ngInject
 */

class NarrativeController {
  /*@ngInject*/
  constructor($scope){
    //$scope.narrative.states = ["opening", "scene1"];
    $scope.states = ["opening", "scene1"];
    this.$inject = ['$scope'];
  }
}

angular.module('app').controller('NarrativeController', NarrativeController);
