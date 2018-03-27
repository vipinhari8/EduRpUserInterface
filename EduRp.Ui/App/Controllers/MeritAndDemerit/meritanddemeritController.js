(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('meritanddemeritController', meritanddemeritController);

    meritanddemeritController.$inject = ['$scope', '$q', 'meritanddemeritService', 'errorHandler', '$modal', 'commonService'];

    function meritanddemeritController($scope, $q, meritanddemeritService, errorHandler, $modal, commonService) {
        $scope.MeritandDemeritData = [];
        $scope.filteredmeritanddemeritData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'Date';
        $scope.reverseSort = false;
        $scope.adjustMeritandDemeritList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredmeritanddemeritData = angular.copy($scope.MeritandDemeritData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustMeritandDemeritList();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];

        $scope.modMeritandDemeritObj = {};
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };

        //Get PageLoad
        (function startup() {

            $q.all([
                meritanddemeritService.getmeritanddemeritList()
            ]).then(function (data) {
                if (data !== null) {
                    $scope.MeritandDemeritData = data[0].results;
                    $scope.adjustMeritandDemeritList();
                }
            }, function (reason) {
                errorHandler.logServiceError('meritanddemeritController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('meritanddemeritController', update);
            });
        })();


    };
})
();