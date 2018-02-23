(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('prgmStudyMasterController', prgmStudyMasterController);

    prgmStudyMasterController.$inject = ['$scope', '$q', 'PrgmStudyMasterService', '$modal', '$log','commonService'];

    function prgmStudyMasterController($scope, $q, PrgmStudyMasterService, $modal, $log, commonService) {
        $scope.title = 'prgmStudyMasterController';
        $scope.prgmStudyListItem = [];
        $scope.filteredPrgmStudyData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'BatchName';
        $scope.reverseSort = false;
        $scope.adjustprgmStudyList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredPrgmStudyData = angular.copy($scope.prgmStudyListItem.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustprgmStudyList();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];

        $scope.modPrgmStudyObj = {};
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };


        activate();

        function activate() {
            PrgmStudyMasterService.getPrgmStudyMasterList().then(prgmStudyListSuccess, prgmStudyListError);
        }
        function prgmStudyListSuccess(response) {
            $scope.prgmStudyListItem = response.results;
            $scope.adjustprgmStudyList();
            console.log(response);
            console.log($scope.prgmStudyListItem);
        }

        function prgmStudyListError(response) {
            $log.info("prgmstudy list item error in prgmStudyMasterController");
        }

        //Add
        $scope.addPrgmStudyContainer = function () {
            $scope.modalType = 'add';
            $scope.Modals.openPrgmStudyContainer();
        };

        $scope.addPrgmStudyDetails = function (form) {
            if (form.$valid) {
                $q.when([PrgmStudyMasterService.addPrgmStudyMaster($scope.modPrgmStudyObj)]).then(function (data) {
                    $scope.filteredPrgmStudyData.push($scope.modPrgmStudyObj);
                    $scope.Modals.closePrgmStudyContainer();
                }, function (error) {
                    alert("please try later");
                });

            }

        };

        //update
        $scope.editPrgmStudyContainer = function (data) {
            $scope.modalType = 'update';
            $scope.modPrgmStudyObj = data;
            $scope.Modals.openPrgmStudyContainer();
        };

        $scope.updatePrgmStudyDetails = function (form, psid) {

            if (form.$valid) {
                var postData = {
                    "BatchName": $scope.modPrgmStudyObj.BatchName,
                    "ResultType": $scope.modPrgmStudyObj.ResultType,
                    "AcademicTerm": $scope.modPrgmStudyObj.AcademicTerm
                };
                PrgmStudyMasterService.updatePrgmStudyMaster($scope.modPrgmStudyObj).then(function (data) {
                    angular.forEach($scope.filteredPrgmStudyData, function (v, k) {
                        if (v.BatchId === psid) {
                            $scope.filteredPrgmStudyData[k]['BatchName'] = $scope.modPrgmStudyObj.BatchName;
                            $scope.filteredPrgmStudyData[k]['ResultType'] = $scope.modPrgmStudyObj.ResultType;
                            $scope.filteredPrgmStudyData[k]['AcademicTerm'] = $scope.modPrgmStudyObj.AcademicTerm;
                        }
                    });
                    $scope.modPrgmStudyObj = {};
                    $scope.Modals.closePrgmStudyContainer();
                }, function (error) {
                    alert("Please try again");
                });

            }
        };

        //delete 

        $scope.deletePrgmStudy = function (psid) {
            if (confirm('Are you sure you want to delete this program?')) {
                PrgmStudyMasterService.deletePrgmStudyMaster(psid).then(function (data) {
                    $scope.filteredPrgmStudyData = commonService.removeItemFromArray($scope.filteredPrgmStudyData, psid);
                }, function (error) {
                    alert("Please try again");
                });
            }
        };
        //model

        $scope.Modals = {
            openPrgmStudyContainer: function () {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/App/Templates/ProgramStudyMaster/addEditModalPopup.html',
                    size: 'lg',
                    scope: $scope,
                    backdrop: 'static'
                });
            },
            closePrgmStudyContainer: function () {
                $scope.modalInstance.dismiss();
            }
        };
    }
})();
