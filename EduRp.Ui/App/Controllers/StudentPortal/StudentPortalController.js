﻿(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('StudentPortalController', StudentPortalController);

    StudentPortalController.$inject = ['$scope', '$q', 'errorHandler', 'StudentPortalService', 'commonService', '$location', '$rootScope', 'sharedpropertiesService','studentAdmissionFormService'];

    function StudentPortalController($scope, $q, errorHandler, StudentPortalService, commonService, $location, $rootScope, sharedpropertiesService, studentAdmissionFormService) {
        $scope.title = 'StudentPortalController';

        $scope.stdPortalData = [];
        $scope.filteredData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 10
            , $scope.maxSize = 5;
        $scope.orderByField = 'FormNo';
        $scope.reverseSort = false;
        $scope.sharedproperties = null;

        var vm = this;

        $scope.adjustStdPortalData = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredData = angular.copy($scope.stdPortalData.slice(begin, end));
        };

        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustStdPortalData();
        });

        $scope.showPerPageDataOptions = [10, 25, 50, 100];

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

        $scope.addNewAdmissionForm = function (data) {
            $scope.sharedproperties = sharedpropertiesService.getadmissionnum(data);
            $location.path('/StudentAdmissionForm/');
        };
        $scope.newAdmissionForm = function () { 
            studentAdmissionFormService.getAdmissionNumber().then(admissionnumListSuccess, admissionnumListError)
        }

        function admissionnumListSuccess(response) {
            $scope.sharedproperties = sharedpropertiesService.getadmissionnum(response.results[0]);
            $location.path('/StudentAdmissionForm/');
        };

        function admissionnumListError(response) {
            console.log("GetAdmissionNum error in studentPortalController");
            $log.info("GetAdmissionNum error in studentPortalController");
        }

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
