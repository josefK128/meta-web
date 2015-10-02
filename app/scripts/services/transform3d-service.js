"use strict";
angular.module('app').factory('Transform3d', ["Log", function(Log) {
  "use strict";
  var transform3d;
  var Transform3d = (function() {
    function Transform3d() {}
    return ($traceurRuntime.createClass)(Transform3d, {
      apply: function(transform, actor) {
        var m = new THREE.Matrix4(),
            mr = undefined,
            mt = undefined,
            ms = undefined;
        if (!check.object(transform)) {
          console.log("!Transform3d.apply(transform - is NOT object)");
          Log.log({
            t: '!Transform3d',
            f: 'apply',
            a: 'transform - is NOT object'
          });
          return m;
        }
        if (transform['q']) {
          var qa = transform.q;
          var q = new THREE.Quaternion(qa[0], qa[1], qa[2], qa[3]);
          mr = (new THREE.Matrix4()).makeRotationFromQuaternion(q);
        }
        if (transform['e']) {
          var ea = transform.e;
          var euler = new THREE.Euler(ea[0], ea[1], ea[2]);
          mr = (new THREE.Matrix4()).makeRotationFromEuler(euler);
        }
        if (transform['t']) {
          var ta = transform.t;
          mt = (new THREE.Matrix4()).makeTranslation(ta[0], ta[1], ta[2]);
        }
        if (transform['s']) {
          var sa = transform.s;
          ms = (new THREE.Matrix4()).makeScale(sa[0], sa[1], sa[2]);
        }
        m = mt || m;
        if (mr) {
          m = m.multiply(mr);
        }
        if (ms) {
          m = m.multiply(ms);
        }
        if (actor) {
          actor.applyMatrix(m);
        }
        return m;
      },
      verify: function(m, mm) {
        var a = m.elements,
            aa = mm.elements,
            flag = true,
            d = [],
            sa = [],
            i;
        for (i = 0; i < a.length; i++) {
          d[i] = Math.abs(a[i] - aa[i]);
          sa.push("a[" + i + "]=" + a[i] + " aa[" + i + "]=" + aa[i] + " d[i]=" + d[i]);
          if (Math.abs(d[i]) > 0.01) {
            flag = false;
            for (i = 0; i < sa.length; i++) {
              console.log("error: " + sa[i]);
            }
            break;
          }
        }
        return flag;
      }
    }, {});
  }());
  if (!transform3d) {
    transform3d = new Transform3d();
  }
  return transform3d;
}]);

//# sourceMappingURL=../services/transform3d-service.js.map