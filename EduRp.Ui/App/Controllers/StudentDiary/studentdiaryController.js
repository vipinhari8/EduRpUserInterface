(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('studentdiaryController', studentdiaryController);

    studentdiaryController.$inject = ['$scope', '$q', 'studentdiaryService', 'errorHandler', '$modal', 'commonService'];

    function studentdiaryController($scope, $q, studentdiaryService, errorHandler, $modal, commonService) {
        $scope.StudentDiaryData = [];
        $scope.filteredstudentdiaryData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'Date';
        $scope.reverseSort = false;
        $scope.adjuststudentdiaryList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredstudentdiaryData = angular.copy($scope.StudentDiaryData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjuststudentdiaryList();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];

        $scope.modStudentDiaryObj = {};
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };

        //Get PageLoad
        (function startup() {

            $q.all([
                studentdiaryService.getstudentdiaryList()
            ]).then(function (data) {
                if (data !== null) {
                    $scope.StudentDiaryData = data[0].results;
                    $scope.adjuststudentdiaryList();
                }
            }, function (reason) {
                errorHandler.logServiceError('studentdiaryController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('studentdiaryController', update);
            });
        })();


    };
})
    ();