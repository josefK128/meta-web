"use strict";
angular.module('app').factory('Mixin', function() {
  "use strict";
  var oa = ["object Array"],
      toString = Object.prototype.toString,
      mixin;
  var Mixin = (function() {
    function Mixin() {}
    return ($traceurRuntime.createClass)(Mixin, {
      extend: function(base, module) {
        base = base || {};
        module = module || {};
        for (var p in module) {
          if (module.hasOwnProperty(p)) {
            if (typeof p === 'object') {
              base[p] = (toString.call(p) === oa) ? [] : {};
              this.extend(base[p], p);
            } else {
              base[p] = module[p];
            }
          }
        }
      },
      include: function(base, module) {
        base = base || {};
        base.prototype = base.prototype || {};
        module = module || {};
        for (var p in module) {
          if (module.hasOwnProperty(p)) {
            if (typeof p === 'object') {
              base.prototype[p] = (toString.call(p) === oa) ? [] : {};
              this.include(base.prototype[p], p);
            } else {
              base.prototype[p] = module[p];
            }
          }
        }
      },
      extend_all: function(base, module) {
        base = base || {};
        module = module || {};
        for (var p in module) {
          if (typeof p === 'object') {
            base[p] = (toString.call(p) === oa) ? [] : {};
            this.extend(base[p], p);
          } else {
            base[p] = module[p];
          }
        }
      },
      include_all: function(base, module) {
        base = base || {};
        base.prototype = base.prototype || {};
        module = module || {};
        for (var p in module) {
          if (typeof p === 'object') {
            base.prototype[p] = (toString.call(p) === oa) ? [] : {};
            this.include(base.prototype[p], p);
          } else {
            base.prototype[p] = module[p];
          }
        }
      },
      verify: function(o, p) {
        return (o[p] ? true : false);
      }
    }, {});
  }());
  if (!mixin) {
    mixin = new Mixin();
  }
  return mixin;
});

//# sourceMappingURL=../services/mixin-service.js.map