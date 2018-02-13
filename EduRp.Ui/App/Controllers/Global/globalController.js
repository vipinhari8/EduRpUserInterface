(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('GlobalController', GlobalController);

    GlobalController.$inject = ['$scope', '$location', 'AuthService', '$cookieStore'];

    function GlobalController($scope, $location, AuthService, $cookieStore) {
        $cookieStore.put('UniversityId', '1');
        $cookieStore.put('UserId', '5');
        $cookieStore.put('TokenId', 'DBE22C72-AB6F-4ADA-8C1D-8320B5391644');
        $scope.$on('$viewContentLoaded', onLoaded);
        $scope.$on('viewContentLoadComplete', onLoadComplete);

        function onLoaded() {
            $scope.$broadcast('viewContentLoadComplete');
        }

        function onLoadComplete() {

        }

        //$scope.goToPage = function (page) {
        //    $location.path(page);
        //};

        $scope.Global = {
            logOut : function () {
                AuthService.logOut();
                $scope.Global.isAuthenticated = false;
                $location.path('/Account/Login');
            },
            isAuthenticated: AuthService.isAuthenticated()
        }
    };
})();
