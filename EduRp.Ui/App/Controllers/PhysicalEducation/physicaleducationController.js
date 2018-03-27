(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('physicaleducationController', physicaleducationController);

    physicaleducationController.$inject = ['$scope', '$q', 'physicaleducationService', 'errorHandler', '$modal', 'commonService'];

    function physicaleducationController($scope, $q, physicaleducationService, errorHandler, $modal, commonService) {
        $scope.physicaleducationData = [];
        $scope.filteredphysicaleducationData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'Date';
        $scope.reverseSort = false;
        $scope.adjustphysicaleducationList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredphysicaleducationData = angular.copy($scope.physicaleducationData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustphysicaleducationList();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];

        $scope.modphysicaleducationObj = {};
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };

        //Get PageLoad
        (function startup() {

            $q.all([
                physicaleducationService.getphysicaleducationList()
            ]).then(function (data) {
                if (data !== null) {
                    $scope.physicaleducationData = data[0].results;
                    $scope.adjustphysicaleducationList();
                }
            }, function (reason) {
                errorHandler.logServiceError('physicaleducationController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('physicaleducationController', update);
            });
        })();


    };
})
    ();