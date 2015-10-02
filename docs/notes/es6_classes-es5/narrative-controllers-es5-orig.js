// narrative-controller.js
"use strict";
angular.module('app').controller('NarrativeController', ["$scope", function($scope) {
  'use strict';
  var NarrativeController = function NarrativeController(vm) {
    vm.states = ["opening", "scene1"];
  };
  ($traceurRuntime.createClass)(NarrativeController, {}, {});
  return new NarrativeController($scope);
}]);

//# sourceMappingURL=../controllers/narrative-controller.js.map



// narrative-controller-BROMLEY.js
"use strict";
var NarrativeController = function NarrativeController($scope) {
  $scope.states = ["opening", "scene1"];
  this.$inject = ['$scope'];
};
($traceurRuntime.createClass)(NarrativeController, {}, {});
angular.module('app').controller('NarrativeController', NarrativeController);

//# sourceMappingURL=../controllers/narrative-controller-BROMLEY.js.map
