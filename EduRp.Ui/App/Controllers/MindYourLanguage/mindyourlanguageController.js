(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('mindyourlanguageController', mindyourlanguageController);

    mindyourlanguageController.$inject = ['$scope', '$q', 'mindyourlanguageService', 'errorHandler', '$modal', 'commonService'];

    function mindyourlanguageController($scope, $q, mindyourlanguageService, errorHandler, $modal, commonService) {
        $scope.mindyourlanguageData = [];
        $scope.filteredmindyourlanguageData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'Date';
        $scope.reverseSort = false;
        $scope.adjustmindyourlanguageList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredmindyourlanguageData = angular.copy($scope.mindyourlanguageData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustmindyourlanguageList();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];

        $scope.modmindyourlanguageObj = {};
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };

        //Get PageLoad
        (function startup() {

            $q.all([
                mindyourlanguageService.getmindyourlanguageList()
            ]).then(function (data) {
                if (data !== null) {
                    $scope.mindyourlanguageData = data[0].results;
                    $scope.adjustmindyourlanguageList();
                }
            }, function (reason) {
                errorHandler.logServiceError('mindyourlanguageController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('mindyourlanguageController', update);
            });
        })();


    };
})
    ();