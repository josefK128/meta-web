// script.js
var whenConfig = ['$urlRouterProvider', function($urlRouterProvider) {
  
    $urlRouterProvider
      .otherwise('/');
}];

var stateConfig = ['$stateProvider', function($stateProvider) {
  
  $stateProvider
    .state('main', {
        url: '/',
        views: {
          '@' : {
            templateUrl: 'tpl.layout.html',
            controller: 'MainCtrl',
            controllerAs: 'main',
          },
          'right@main' : { templateUrl: 'tpl.right.html',}, 
          'map@main' : {
            templateUrl: 'tpl.map.html',
            controller: 'MapCtrl',
          },
          'list@main' : {
            templateUrl: 'tpl.list.html',
            controller: 'ListCtrl',
          },
        },
      })
    .state('main.criteria', {
        url: '^/criteria/:criteria/:value',
        views: {
          // 'map' : {
          //  templateUrl: 'tpl.map.html',
          //  controller: 'MapCtrl',
          //},
          'list' : {
            templateUrl: 'tpl.list.html',
            controller: 'ListCtrl',
            controllerAs: 'list',
          },
        },
      })
}];

var app = angular.module('MyApp', [
  'ui.router'
])
.config(whenConfig) 
.config(stateConfig)
;

app.controller('MainCtrl', function($scope, Factory, $stateParams)
{
  $scope.Model = {};
  $scope.restos = Factory.model.data;
  $scope.val = $stateParams.value || "all";
  this.hello = function() { return "hello from main"; }
})
.controller('ListCtrl', function($scope, Factory, $stateParams)
{
  $scope.Model.list = []
  Factory.updateModel();
  Factory.model.data
    .forEach(function(i) {$scope.Model.list.push(i + " - " + $stateParams.value || "root")})
  $scope.Model.selected = $scope.Model.list[0];
  $scope.Model.select = function(index){
    $scope.Model.selected = $scope.Model.list[index];  
  }
  this.hello = function() { return "hello from list"; }
})
.factory('Factory', function() {
  Factory = {};
  Factory.model={};
  Factory.model.data = ['Resto1','Resto2','Resto3'];
  
  Factory.updateModel = function() {
    randOrd = function (){ return (Math.round(Math.random())-0.5); };
    Factory.model.data
      .sort( randOrd )
    
  }
  return Factory;
})

app.run(
  ['$rootScope', '$state', '$stateParams',
    function($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }
  ])
