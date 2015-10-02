// * queue-service.js
// * manages a fifo-queue of action-messages  
//
// * @dependencies: none<br>
//   @param none<br>
//   @ngInject
//
// * NOTE: ngInject is used by ngAnnotate to generate a 
//   minification-safe injection annotation such as:
//   ```function($scope) => ['$scope', function($scope){}]```


angular.module('app').factory('Queue', function(){
  "use strict";

  var queue;


  class Queue {
    constructor(){
      this.fifo = [];  
      this.ready = true;
    }


    push(s){
      this.fifo.push(s);
    }

    pop(){
      return (this.fifo.length > 0 ? this.fifo.shift() : undefined);
    }

    peek(){
      return (this.fifo.length > 0 ? this.fifo[0] : undefined);
    }
  }

  // return factory object<br>
  // (redundant) maintenance of Singleton
  if(!queue){
    queue = new Queue();  // create Queue singleton instance once
  }
  return queue;         // return Queue singleton instance
});
