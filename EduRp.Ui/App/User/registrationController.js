(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('registrationController', registrationController);

    registrationController.$inject = ['$scope'];

    function registrationController($scope) {
        $scope.title = 'registrationController';

        activate();

        function activate() { }
    }
})();
