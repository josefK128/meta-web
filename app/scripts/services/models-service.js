"use strict";
angular.module('app').factory("Models", ["config", function(config) {
  "use strict";
  var models;
  var Models = (function() {
    function Models() {
      this.models = config.models;
    }
    return ($traceurRuntime.createClass)(Models, {
      get: function(type, template, model) {
        if (this.models[type] && template) {
          if (this.models[type][template]) {
            if (this.models[type][template][model]) {
              return this.models[type][template][model];
            } else {
              return this.models[type][template];
            }
          } else {
            return {};
          }
        }
        return {};
      },
      put: function(type, template, model, o) {
        if (this.models[type]) {
          if (template) {
            if (model) {
              this.models[type][template][model] = o || {};
            } else {
              this.models[type][template] = o || {};
            }
          } else {
            throw "template-name MUST be provided!";
          }
        } else {
          throw ("this.models[" + type + "] does NOT exist!");
        }
      }
    }, {});
  }());
  if (!models) {
    models = new Models();
  }
  return models;
}]);

//# sourceMappingURL=../services/models-service.js.map