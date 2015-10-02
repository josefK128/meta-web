// * models-service.js
// * returns stored model objects - presently loaded within the 'universe'
// of templates, models and assets accessible in the application namespace
//
// * @dependencies: config<br>
//   @param {index.html} Angular object value 'config'<br>
//   @ngInject
//
// * NOTE: ngInject is used by ngAnnotate to generate a 
//   minification-safe injection annotation such as:
//   ```function($scope) => ['$scope', function($scope){}]```
// * @TODO return model as Promise
// * @TODO: if model is not cached locally request it via Mediator ws-channel


angular.module('app').factory("Models", function(config){
  "use strict";

  var models;


  // ```this.models``` is a collection of named data descriptors for creating views<br>
  // Each model is associated with a template which can have many models<br>
  // The models 'universe' and associations with templates is composed in 
  // a named angular value object 'config' defined in index.html
  class Models {
    constructor() {
      this.models = config.models;
    }
 
    // fetch model by name<br>
    // Expect name = template:model where model is almost always defined <br>
    // If model is not defined return the single unnamed model for the template<br>
    // If model is defined return the specific named model (from >=2) for the template<br>
    // If no type or template or named model return {}
    get(type, template, model){
      if(this.models[type] && template){
        if(this.models[type][template]){
          if(this.models[type][template][model]){
            return this.models[type][template][model]; // one of many this.models for tpl
          }else{
            return this.models[type][template]; // single model for template 
          }
        }else{
          return {};
        }
      }
      return {};
    } 


    // cache template model for future fetch<br>
    // ```this.models[type][template][model] = o;```
    put(type, template, model, o){
      if(this.models[type]){
        if(template){
          if(model){
            // one of many this.models for tpl
            this.models[type][template][model] = o || {}; 
          }else{
            // single model for template 
            this.models[type][template] = o || {};
          }
        }else{
          throw "template-name MUST be provided!";
        }
      }else{
        throw `this.models[${type}] does NOT exist!`;
      }
    } // caches model for future local fetch
  }//Models


  // return factory object<br>
  // (redundant) maintenance of Singleton
  if(!models){
    models = new Models();  // create Models singleton instance
  }
  return models;            // return Models singleton instance
});


