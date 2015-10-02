// * log-service.js
// * writes a log message to a server on socket.io channel 'log' via Mediator 
// 
// * @dependencies: Mediator, config <br>
//   @param {index.html} Angular object value 'config' <br>
//   @ngInject
// 
// * NOTE: ngInject is used by ngAnnotate to generate a 
//   minification-safe injection annotation such as: 
//   ```function($scope) => ['$scope', function($scope){}]```
// 
// * NOTE: Log should preferably log objects - action format is a good choice: 
//   actions have the form:
//   ```{t:target-object, f:function, a:args}``` 
//   Logs can benefit from a linguistic analog: ```{t: noun, f:verb, a:*}``` 
//   In simplest vanilla form strings can be logged as ```{a: string}``` 
//   This simple practice enables future linguistic-semantic log-search, 
//   log-query and log-statistics tools 


angular.module('app').factory('Log', function(config){
  "use strict";

  var log,
      mediator;


  class Log {
    constructor(){}

    // action is string-msg or action-object
    log(action){
      if(config.log){
        mediator.emit('log', action);
      }
    }

    set_mediator(o){
      mediator = o;
    }
  }

  // return factory object <br>
  // (redundant) maintenance of Singleton
  if(!log){
    log = new Log();  // create Log singleton instance once
  }
  return log;         // return Log singleton instance
});
