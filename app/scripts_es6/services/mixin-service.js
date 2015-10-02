// * mixin-service.js
// * adds collection of methods to a given object<br> 
// (extend => singleton methods)<br>
// (include => instance methods)
//
// * @dependencies: none <br>
//   @param none<br>
//   @ngInject
//
// * NOTE: ngInject is used by ngAnnotate to generate a 
//   minification-safe injection annotation such as:
//   ```function($scope) => ['$scope', function($scope){}]```


angular.module('app').factory('Mixin', function(){
  "use strict";
  //Audio.speak("Mixin service defined");

  var oa = ["object Array"],
      toString = Object.prototype.toString,
      mixin;
  

  class Mixin {
    constructor(){}

    // Mixin.extend(o,m) => methods of m are singleton methods of object o<br>
    // Mixin.extend(F,m) => methods of m are static methods of F<br>
    // extend is a closure 
    extend(base, module){  
      base = base || {};
      module = module || {};
      for(var p in module){
        if(module.hasOwnProperty(p)){
          if(typeof p === 'object'){
            base[p] = (toString.call(p) === oa) ? [] : {};
            this.extend(base[p], p);
          }else{
            base[p] = module[p];
          }
        }
      }
    }

    // Mixin.include(o,m) => methods of m are instance methods of 
    // every object with prototype o.prototype<br>
    // Object.include(F,m) => methods of m are instance methods of 
    // all instances created by the constructor F<br>
    // include is a closure 
    include(base, module){  
      base = base || {};
      base.prototype = base.prototype || {};
      module = module || {};
      for(var p in module){
        if(module.hasOwnProperty(p)){
          if(typeof p === 'object'){
            base.prototype[p] = (toString.call(p) === oa) ? [] : {};
            this.include(base.prototype[p], p);
          }else{
            base.prototype[p] = module[p];
          }
        }
      }
    }
  
    // extend_all is extend but for all ancestor properties 
    extend_all(base, module){  
      base = base || {};
      module = module || {};
      for(var p in module){
        if(typeof p === 'object'){
          base[p] = (toString.call(p) === oa) ? [] : {};
          this.extend(base[p], p);
        }else{
          base[p] = module[p];
        }
      }
    }

    // include_all is include but for all ancestor properties 
    include_all(base, module){  
      base = base || {};
      base.prototype = base.prototype || {};
      module = module || {};
      for(var p in module){
        if(typeof p === 'object'){
          base.prototype[p] = (toString.call(p) === oa) ? [] : {};
          this.include(base.prototype[p], p);
        }else{
          base.prototype[p] = module[p];
        }
      }
    }

    // for unit test verification - does o contain property p
    verify(o,p){
      return(o[p] ? true : false);
    }
  }

  // return factory object<br>
  // (redundant) maintenance of Singleton
  if(!mixin){
    mixin = new Mixin();  // create Mixin singleton instance
  }
  return mixin;           // return Mixin singleton instance
});


