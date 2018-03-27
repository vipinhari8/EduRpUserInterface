(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('studentcharacterController', studentcharacterController);

    studentcharacterController.$inject = ['$scope', '$q', 'studentcharacterService', 'errorHandler', '$modal', 'commonService'];

    function studentcharacterController($scope, $q, studentcharacterService, errorHandler, $modal, commonService) {
        $scope.studentcharacterData = [];
        $scope.filteredstudentcharacterData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'Date';
        $scope.reverseSort = false;
        $scope.adjuststudentcharacterList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredstudentcharacterData = angular.copy($scope.studentcharacterData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjuststudentcharacterList();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];

        $scope.modststudentcharacterObj = {};
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };

        //Get PageLoad
        (function startup() {

            $q.all([
                studentcharacterService.getstudentcharacterList()
            ]).then(function (data) {
                if (data !== null) {
                    $scope.studentcharacterData = data[0].results;
                    $scope.adjuststudentcharacterList();
                }
            }, function (reason) {
                errorHandler.logServiceError('studentcharacterController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('studentcharacterController', update);
            });
        })();


    };
})
();