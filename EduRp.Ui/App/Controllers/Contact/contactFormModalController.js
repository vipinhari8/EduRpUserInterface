(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('ContactFormModalController', ContactFormModalController);

    ContactFormModalController.$inject = ['$scope', '$modalInstance'];

    function ContactFormModalController($scope, $modalInstance) {

        $scope.ok = function () {
            $modalInstance.close($scope.contact);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
})();