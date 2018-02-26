(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('batchMasterController', batchMasterController);

    batchMasterController.$inject = ['$scope', 'batchMasterService', '$log', '$modal', 'commonService','$q'];

    function batchMasterController($scope, batchMasterService, $log, $modal, commonService, $q) {

        $scope.title = 'batchMasterController';
        $scope.batchListItem = [];
        $scope.filteredbatchData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'BatchName';
        $scope.reverseSort = false;
        $scope.adjustBatchList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredbatchData = angular.copy($scope.batchListItem.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustBatchList();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];

        $scope.modBatchObj = {};
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };

        activate();

        function activate() {
            batchMasterService.getbatchMasterList().then(batchListSuccess, batchListError);
        }

        function batchListSuccess(response) {
            $scope.batchListItem = response.results;
            $scope.adjustBatchList();
            console.log(response);
            console.log($scope.batchListItem);
        }

        function batchListError(response) {
            $log.info("Batch list item error in batchMasterController");
        }

        //Add
        $scope.addBatchContainer = function () {
            $scope.modalType = 'add';
            $scope.Modals.openBatchContainer();
        };

        $scope.addBatchDetails = function (form) {
            if (form.$valid) {
                $q.when([batchMasterService.addbatchMaster($scope.modBatchObj)]).then(function (data) {
                    $scope.filteredbatchData.push($scope.modBatchObj);
                    $scope.Modals.closeBatchContainer();
                }, function (error) {
                    alert("please try later");
                });

            }

        };

        //update
        $scope.editBatchContainer = function (data) {
            $scope.modalType = 'update';
            $scope.modBatchObj = data;
            $scope.Modals.openBatchContainer();
        };

        $scope.updateBatchDetails = function (form, bid) {

            if (form.$valid) {
                var postData = {
                    "BatchName": $scope.modBatchObj.BatchName,
                    "ResultType": $scope.modBatchObj.ResultType,
                    "AcademicTerm": $scope.modBatchObj.AcademicTerm
                };
                batchMasterService.updatebatchMaster($scope.modBatchObj).then(function (data) {
                    angular.forEach($scope.filteredbatchData, function (v, k) {
                        if (v.BatchId === bid) {
                            $scope.filteredbatchData[k]['BatchName'] = $scope.modBatchObj.BatchName;
                            $scope.filteredbatchData[k]['ResultType'] = $scope.modBatchObj.ResultType;
                            $scope.filteredbatchData[k]['AcademicTerm'] = $scope.modBatchObj.AcademicTerm;
                        }
                    });
                    $scope.modBatchObj = {};
                    $scope.Modals.closeBatchContainer();
                }, function (error) {
                    alert("Please try again");
                });

            }
        };

        //delete 

        $scope.deleteBatch = function (bid) {
            if (confirm('Are you sure you want to delete this fee?')) {
                batchMasterService.deletebatchMaster(bid).then(function (data) {
                    $scope.filteredbatchData = commonService.removeItemFromArray($scope.filteredbatchData, bid);
                }, function (error) {
                    alert("Please try again");
                });
            }
        };

        $scope.Modals = {
            openBatchContainer: function () {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/App/Templates/BatchMaster/addEditModalPopup.html',
                    size: 'lg',
                    scope: $scope,
                    backdrop: 'static'
                });
            },
            closeBatchContainer: function () {
                $scope.modalInstance.dismiss();
            }
        };
    }
})();
