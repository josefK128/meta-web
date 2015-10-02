<!DOCTYPE html>
<html ng-app="test">
<head>
  <title>Loading all templates in one file...</title>
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.1/angular.js"></script>
  <script type="text/javascript" src="fakeTemplateCache.js"></script>
 
</head>
<body>
  <a href="#/one">one</a> | <a href="#/two">two</a>
<div ng-view></div>
</body>
</html>

//-----------------------------------------------------------------
var app = angular.module('test', []);
 
// HACK: we ask for $injector instead of $compile, to avoid circular dep
app.factory('$templateCache', function($cacheFactory, $http, $injector) {
  var cache = $cacheFactory('templates');
  var allTplPromise;
 
  return {
    get: function(url) {
      var fromCache = cache.get(url);
 
      // already have required template in the cache
      if (fromCache) {
        return fromCache;
      }
 
      // first template request ever - get the all tpl file
      if (!allTplPromise) {
        allTplPromise = $http.get('all-templates.html').then(function(response) {
          // compile the response, which will put stuff into the cache
          $injector.get('$compile')(response.data);
          return response;
        });
      }
 
      // return the all-tpl promise to all template requests
      return allTplPromise.then(function(response) {
        return {
          status: response.status,
          data: cache.get(url)
        };
      });
    },
 
    put: function(key, value) {
      cache.put(key, value);
    }
  };
});
 
app.config(function($routeProvider) {
  $routeProvider.when('/one', {templateUrl: 'one.html'});
  $routeProvider.when('/two', {templateUrl: 'two.html'});
});
