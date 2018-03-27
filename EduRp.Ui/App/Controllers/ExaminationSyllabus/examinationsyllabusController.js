(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('examinationsyllabusController', examinationsyllabusController);

    studentleaveController.$inject = ['$scope', '$q', 'examinationsyllabusService', 'errorHandler', '$modal', 'commonService'];

    function examinationsyllabusController($scope, $q, examinationsyllabusService, errorHandler, $modal, commonService) {
        $scope.examinationsyllabusData = [];
        $scope.filteredexaminationsyllabusData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'Date';
        $scope.reverseSort = false;
        $scope.adjustexaminationsyllabusList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredexaminationsyllabusData = angular.copy($scope.examinationsyllabusData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustexaminationsyllabusList();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];

        $scope.modexaminationsyllabusObj = {};
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };

        //Get PageLoad
        (function startup() {

            $q.all([
                examinationsyllabusService.getexaminationsyllabusList()
            ]).then(function (data) {
                if (data !== null) {
                    $scope.examinationsyllabusData = data[0].results;
                    $scope.adjustexaminationsyllabusList();
                }
            }, function (reason) {
                errorHandler.logServiceError('examinationsyllabusController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('examinationsyllabusController', update);
            });
        })();


    };
})
    ();