// NarrativeController.js 
"use strict";
angular.module('app').controller('NarrativeController', ["$scope", function($scope) {
  'use strict';
  var NarrativeController = function NarrativeController(vm) {
    vm.narrative = {
      states: ["opening", "scene1"],
      state: {name: "opening"},
      change_state: function() {
        console.log("state changed to: " + vm.narrative.state.name);
      }
    };
  };
  ($traceurRuntime.createClass)(NarrativeController, {}, {});
  return new NarrativeController($scope);
}]);

//# sourceMappingURL=../controllers/narrative-controller.js.map




// NarrativeController.js (BROMLEY)
"use strict";
var NarrativeController = function NarrativeController($scope) {
  this.$inject = ['$scope'];
  $scope.narrative = {
    states: ["opening", "scene1"],
    state: {name: "opening"},
    change_state: function() {
      console.log("state changed to: " + $scope.narrative.state.name);
    }
  };
};
($traceurRuntime.createClass)(NarrativeController, {}, {});
angular.module('app').controller('NarrativeController', NarrativeController);

//# sourceMappingURL=../controllers/narrative-controller.js.map
