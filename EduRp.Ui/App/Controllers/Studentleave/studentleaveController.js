(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('studentleaveController', studentleaveController);

    studentleaveController.$inject = ['$scope', '$q', 'studentleaveService', 'errorHandler', '$modal', 'commonService'];

    function studentleaveController($scope, $q, studentleaveService, errorHandler, $modal, commonService) {
        $scope.studentleaveData = [];
        $scope.filteredstudentleaveData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'Date';
        $scope.reverseSort = false;
        $scope.adjustleaveList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredstudentleaveData = angular.copy($scope.studentleaveData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustleaveList();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];

        $scope.modQuizObj = {};
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };

        //Get PageLoad
        (function startup() {

            $q.all([
                studentleaveService.getstudentleaveList()
            ]).then(function (data) {
                if (data !== null) {
                    $scope.studentleaveData = data[0].results;
                    $scope.adjustleaveList();
                }
            }, function (reason) {
                errorHandler.logServiceError('studentleaveController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('studentleaveController', update);
            });
        })();


    };
})
    ();