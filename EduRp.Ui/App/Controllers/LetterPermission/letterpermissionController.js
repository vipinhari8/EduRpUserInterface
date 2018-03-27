(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('letterpermissionController', letterpermissionController);

    letterpermissionController.$inject = ['$scope', '$q', 'letterpermissionService', 'errorHandler', '$modal', 'commonService'];

    function letterpermissionController($scope, $q, letterpermissionService, errorHandler, $modal, commonService) {
        $scope.letterpermissionData = [];
        $scope.filteredletterpermissionData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'Name';
        $scope.reverseSort = false;
        $scope.adjustletterpermissionList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredletterpermissionData = angular.copy($scope.letterpermissionData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustletterpermissionList();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];

        $scope.modletterpermissionObj = {};
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };

        //Get PageLoad
        (function startup() {

            $q.all([
                letterpermissionService.getletterpermissionList()
            ]).then(function (data) {
                if (data !== null) {
                    $scope.letterpermissionData = data[0].results;
                    $scope.adjustletterpermissionList();
                }
            }, function (reason) {
                errorHandler.logServiceError('letterpermissionController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('letterpermissionController', update);
            });
        })();

        $scope.addletterpermissionContainer = function () {
            $scope.modalType = 'add';
            $scope.Modals.openletterpermissionContainer();
        };
        //Add
        $scope.addletterpermissionDetails = function (form) {
            if (form.$valid) {
                $q.when([letterpermissionService.addletterpermission($scope.modletterpermissionObj)]).then(function (data) {
                    $scope.filteredletterpermissionData.push($scope.modletterpermissionObj);
                    $scope.Modals.closeletterpermissionContainer();
                }, function (error) {
                    alert("please try later");
                });

            }

        };
        //update
        $scope.editletterpermissionContainer = function (data) {
            $scope.modalType = 'update';
            $scope.modletterpermissionObj = data;
            $scope.Modals.openletterpermissionContainer();
        };

        $scope.updateletterpermissionDetails = function (form, fid) {

            if (form.$valid) {
                var postData = {
                    "Name": $scope.modletterpermissionObj.Name,
                    "Class": $scope.modletterpermissionObj.Class,
                    "TimeOut": $scope.modletterpermissionObj.TimeOut,
                    "TimeIn": $scope.modletterpermissionObj.TimeIn
                };
                letterpermissionService.updateletterpermission($scope.modLossandFoundObj).then(function (data) {
                    angular.forEach($scope.filteredletterpermissionData, function (v, k) {
                        if (v.StudentId === sid) {
                            $scope.filteredletterpermissionData[k]['Name'] = $scope.modletterpermissionObj.Name;
                            $scope.filteredletterpermissionData[k]['Class'] = $scope.modletterpermissionObj.Class;
                            $scope.filteredletterpermissionData[k]['TimeOut'] = $scope.modletterpermissionObj.TimeOut;
                            $scope.filteredletterpermissionData[k]['TimeIn'] = $scope.modletterpermissionObj.TimeIn;
                        }
                    });
                    $scope.Modals.closeletterpermissionContainer();
                }, function (error) {
                    alert("Please try again");
                });

            }
        };
        //delete 

        $scope.deleteletterpermissionContainer = function (sd) {
            if (confirm('Are you sure you want to delete this letterpermission?')) {
                letterpermissionService.deleteletterpermission(sd).then(function (data) {
                    $scope.filteredletterpermissionData = commonService.removeItemFromArray($scope.filteredletterpermissionData, sd);
                }, function (error) {
                    alert("Please try again");
                });
            }


        };
        $scope.Modals = {
            openletterpermissionContainer: function () {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/App/Templates/LetterPermission/addletter.html',
                    size: 'lg',
                    scope: $scope,
                    backdrop: 'static'
                });

                $scope.modalInstance.result.then(
                    function (letterpermission) {

                    },
                    function (event) {

                    });
            },
            closeletterpermissionContainer: function () {
                $scope.modalInstance.dismiss();
            }
        };


    };
})
    ();