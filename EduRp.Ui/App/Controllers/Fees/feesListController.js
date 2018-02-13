(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('feesListController', feesListController);

    feesListController.$inject = ['$scope', '$q', 'feesListService', 'errorHandler', '$modal', 'commonService'];

    function feesListController($scope, $q, feesListService, errorHandler, $modal, commonService) {
        $scope.feesData = [];
        $scope.filteredFeesData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'FeesName';
        $scope.reverseSort = false;
        $scope.adjustFeesList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredFeesData = angular.copy($scope.feesData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustFeesList();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];

        $scope.modFeesObj = {};
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };

        //Get PageLoad
        (function startup() {

            $q.all([
                feesListService.getFeesList()
            ]).then(function (data) {
                if (data !== null) {
                    $scope.feesData = data[0].results;
                    $scope.adjustFeesList();
                }
            }, function (reason) {
                errorHandler.logServiceError('feesListController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('feesListController', update);
            });
        })();


        $scope.addFeesContainer = function () {
            $scope.modalType = 'add';
            $scope.Modals.openFeesContainer();
        };
        //Add
        $scope.addFeesDetails = function (form) {
            if (form.$valid) {
                $q.when([feesListService.addFee($scope.modFeesObj)]).then(function (data) {
                    $scope.filteredFeesData.push($scope.modFeesObj);
                    $scope.Modals.closeFeesContainer();
                }, function (error) {
                    alert("please try later");
                });

            }

        };

        //update
        $scope.editFeesContainer = function (data) {
            $scope.modalType = 'update';
            $scope.modFeesObj = data;
            $scope.Modals.openFeesContainer();
        };

        $scope.updateFeesDetails = function (form, fid) {

            if (form.$valid) {
                var postData = {
                    "FeeLabel": $scope.modFeesObj.FeeLabel,
                    "Amount": $scope.modFeesObj.Amount,
                    "FeeType": $scope.modFeesObj.FeeType,
                    "Description": $scope.modFeesObj.Description
                };
                feesListService.updateFee($scope.modFeesObj).then(function (data) {
                    angular.forEach($scope.filteredFeesData, function (v, k) {
                        if (v.SubjectId === sid) {
                            $scope.filteredFeesData[k]['FeeLabel'] = $scope.modFeesObj.FeeLabel;
                            $scope.filteredFeesData[k]['Amount'] = $scope.modFeesObj.Amount;
                            $scope.filteredFeesData[k]['FeeType'] = $scope.modFeesObj.FeeType;
                            $scope.filteredFeesData[k]['Description'] = $scope.modFeesObj.Description;
                        }
                    });
                    $scope.Modals.closeFeesContainer();
                }, function (error) {
                    alert("Please try again");
                });

            }
        };
        //delete 

        $scope.deleteFeesContainer = function (sd) {
            if (confirm('Are you sure you want to delete this fee?')) {
                feesListService.deleteFees(sd).then(function (data) {
                    $scope.filteredFeesData = commonService.removeItemFromArray($scope.filteredSubjectData, sd);
                }, function (error) {
                    alert("Please try again");
                });
            }


        };


        $scope.Modals = {
            openFeesContainer: function () {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/App/Templates/Fees/addEditModalPopup.html',
                    size: 'lg',
                    scope: $scope,
                    backdrop: 'static'
                });

                $scope.modalInstance.result.then(
                    function (subject) {

                    },
                    function (event) {

                    });
            },
            closeFeesContainer: function () {
                $scope.modalInstance.dismiss();
            }
        };

    };
})
    ();