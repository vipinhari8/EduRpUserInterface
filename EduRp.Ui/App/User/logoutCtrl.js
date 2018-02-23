(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('logoutCtrl', logoutCtrl);

    logoutCtrl.$inject = ['$scope'];

    function logoutCtrl($scope) {
        $scope.title = 'logoutCtrl';

        activate();

        function activate() { }
    }
})();
