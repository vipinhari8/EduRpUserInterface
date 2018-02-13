(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('StudentPortalController', StudentPortalController);

    StudentPortalController.$inject = ['$scope', '$q', 'errorHandler', 'StudentPortalService', 'commonService', '$location','$rootScope']; 

    function StudentPortalController($scope, $q, errorHandler, StudentPortalService, commonService, $location, $rootScope) {
        $scope.title = 'StudentPortalController';

        $scope.stdPortalData = [];
        $scope.filteredData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'FormNo';
        $scope.reverseSort = false;

        $scope.adjustStdPortalData = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredData = angular.copy($scope.stdPortalData.slice(begin, end));
        };

        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustStdPortalData();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];

        $scope.modSubjectObj = {};
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };

        $scope.goToPage = function (page) {
            $location.path(page);
        };

        $rootScope.$broadcast('topic', 'message');

        (function startup() {

            $q.all([
                StudentPortalService.getAdmissionList()
            ]).then(function (data) {
                if (data !== null) {
                    $scope.stdPortalData = data[0].results;
                    $scope.adjustStdPortalData();
                }
            }, function (reason) {
                errorHandler.logServiceError('StudentPortalController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('StudentPortalController', update);
            });
        })();

    }
})();
