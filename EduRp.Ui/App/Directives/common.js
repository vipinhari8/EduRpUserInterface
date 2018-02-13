(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .directive('pageLoading', function () {
            return {
                restrict: 'AE',
                templateUrl: 'App/Templates/Common/loading.html',
                link: function (scope, elemnet, attr) {}
            }

        }).directive('gg', function(){
              return {
                require: "ngModel",
                link: function postLink(scope,elem,attrs,ngModel) {
                  elem.on("change", function(e) {
                    var files = elem[0].files;
                    ngModel.$setViewValue(files);
                  })
                }
              }

        });
})();
