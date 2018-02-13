(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('examinationTypeController', examinationTypeController);

    examinationTypeController.$inject = ['$scope', '$q', 'examinationTypeService', 'errorHandler', '$modal', 'commonService'];

    function examinationTypeController($scope, $q, examinationTypeService, errorHandler, $modal, commonService) {
        $scope.examinationTypeData = [];
        $scope.filteredExaminationTypeData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'ExamName';
        $scope.reverseSort = false;
        $scope.adjustExaminationList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredExaminationTypeData = angular.copy($scope.examinationTypeData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustExaminationList();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];

        $scope.modExaminationTypeObj = {};
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };

        //Get PageLoad
        (function startup() {

            $q.all([
                examinationTypeService.getExaminationTypeList()
            ]).then(function (data) {
                if (data !== null) {
                    $scope.examinationTypeData = data[0].results;
                    $scope.adjustExaminationList();
                }
            }, function (reason) {
                errorHandler.logServiceError('examinationTypeController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('examinationTypeController', update);
            });
        })();


        $scope.addExaminationTypeContainer = function () {
            $scope.modalType = 'add';
            $scope.Modals.openExaminationTypeContainer();
        };
        //Add
        $scope.addExaminationTypeDetails = function (form) {
            if (form.$valid) {
                $q.when([examinationTypeService.addExaminationType($scope.modExaminationTypeObj)]).then(function (data) {
                    $scope.filteredExaminationTypeData.push($scope.modExaminationTypeObj);
                    $scope.Modals.closeExaminationTypeContainer();
                }, function (error) {
                    alert("please try later");
                });

            }

        };

        //update
        $scope.editExaminationTypeContainer = function (data) {
            $scope.modalType = 'update';
            $scope.modExaminationTypeObj = data;
            $scope.Modals.openExaminationTypeContainer();
        };

        $scope.updateExaminationTypeDetails = function (form, eid) {

            if (form.$valid) {
                var postData = {
                    "ExamGroup": $scope.modExaminationTypeObj.ExamGroup,
                    "ExamName": $scope.modExaminationTypeObj.ExamName,
                    "MinMarks": $scope.modExaminationTypeObj.MinMarks,
                    "MaxMarks": $scope.modExaminationTypeObj.MaxMarks,
                     "FeeLabel": $scope.modExaminationTypeObj.FeeLabel,
                      "Amount": $scope.modExaminationTypeObj.Amount
                };
                feesListService.updateExaminationType($scope.modExaminationTypeObj).then(function (data) {
                    angular.forEach($scope.filteredExaminationTypeData, function (v, k) {
                        if (v.ExaminationTypeId === eid) {
                            $scope.filteredExaminationTypeData[k]['ExamGroup'] = $scope.modExaminationTypeObj.ExamGroup;
                            $scope.filteredExaminationTypeData[k]['ExamName'] = $scope.modExaminationTypeObj.ExamName;
                            $scope.filteredExaminationTypeData[k]['MinMarks'] = $scope.modExaminationTypeObj.MinMarks;
                            $scope.filteredExaminationTypeData[k]['MaxMarks'] = $scope.modExaminationTypeObj.MaxMarks;
                            $scope.filteredExaminationTypeData[k]['FeeLabel'] = $scope.modExaminationTypeObj.FeeLabel;
                            $scope.filteredExaminationTypeData[k]['Amount'] = $scope.modExaminationTypeObj.Amount;
                        }
                    });
                    $scope.Modals.closeExaminationTypeContainer();
                }, function (error) {
                    alert("Please try again");
                });

            }
        };
        //delete 

        $scope.deleteExaminationTypeContainer = function (ed) {
            if (confirm('Are you sure you want to delete this ExaminationType?')) {
                examinationTypeService.deleteExaminationType(ed).then(function (data) {
                    $scope.filteredExaminationTypeData = commonService.removeItemFromArray($scope.filteredExaminationTypeData, ed);
                }, function (error) {
                    alert("Please try again");
                });
            }


        };


        $scope.Modals = {
            openExaminationTypeContainer: function () {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/App/Templates/ExaminationType/managePopup.html',
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
            closeExaminationTypeContainer: function () {
                $scope.modalInstance.dismiss();
            }
        };

    };
})
    ();