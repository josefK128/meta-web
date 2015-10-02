"use strict";
angular.module('app').directive('uiMsgbg', ["$templateCache", "$rootScope", "$timeout", "Mediator", function($templateCache, $rootScope, $timeout, Mediator) {
  'use strict';
  var Msgbg = (function() {
    function Msgbg() {}
    return ($traceurRuntime.createClass)(Msgbg, {msg_changed: function() {}}, {});
  }());
  return {
    restrict: 'E',
    replace: true,
    templateNamespace: 'html',
    template: "<div ng-style='{background: msgbg.bgcolor}'" + "style='transform:translateX(-26%) scaleX(.5)' >" + "<input type='text' ng-model='msgbg.msg' ng-change='msgbg.msg_changed()'>" + "m.bgc:{{msgbg.bgcolor}} " + "ui.bgc:{{$parent.ui.bgcolor}}</div>",
    scope: {},
    controller: Msgbg,
    controllerAs: 'msgbg',
    bindToController: {
      bgcolor: '=',
      msg: '='
    },
    link: function(scope, el, attrs, msgbg) {
      msgbg.id = attrs['id'];
      $timeout(function() {
        scope.$apply(function() {
          msgbg.bgcolor = 'green';
        });
      }, 2000);
      $timeout(function() {
        scope.$apply(function() {
          msgbg.bgcolor = 'yellow';
        });
      }, 4000);
    }
  };
}]);

//# sourceMappingURL=../../components/ui/ui-msgbg-directive.js.map