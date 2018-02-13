(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('academicBatchController', academicBatchController);

    academicBatchController.$inject = ['$scope', '$q', 'academicBatchService', 'errorHandler', '$modal'];

    function academicBatchController($scope, $q, academicBatchService, errorHandler, $modal) {
        $scope.academicBatchData = [];
        $scope.filteredAcademicBatchData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 10
            , $scope.maxSize = 5;
        $scope.orderByField = 'SubjectName';
        $scope.reverseSort = false;
        $scope.adjustAcademicBatchList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredAcademicBatchData = angular.copy($scope.academicBatchData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustAcademicBatchList();
        });

        $scope.showPerPageDataOptions = [10, 25, 50, 100];

        $scope.modAcademicBatchObj = {};
        $scope.pp = '90';
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };




        $scope.editAcademicBatchContainer = function (data) {
            $scope.modalType = 'update';
            $scope.modAcademicBatchObj = data;
            $scope.Modals.openSubjectContainer();
        };

        $scope.addAcademicBatchContainer = function (data) {
            $scope.modalType = 'add';
            $scope.modAcademicBatchObj = data;
            $scope.Modals.openSubjectContainer();
        };




        $scope.updateSubjectDetails = function () {
            console.log($scope.modAcademicBatchObj);
            var postData = {
                "batchUpdateData":
                [{

                    "SubjectId": $scope.modAcademicBatchObj,
                    "SubjectCode": $scope.modAcademicBatchObj,
                    "SubjectName": $scope.modAcademicBatchObj,
                    "SKS": $scope.modAcademicBatchObj

                }]
            };

        };
        $scope.addAcademicBatchDetailsSuccess = function (data) {
            $('#subject-modal-popup').modal({
                show: 'false'
            });
        };

        $scope.addAcademicBatchDetailsError = function (data) {
            $('#subject-modal-popup').modal({
                show: 'false'
            });
        };
        $scope.addSubjectDetails = function (form) {
            if (form.$valid) {

                var postData = {
                    "batchInsertData":
                    [{
                        "SubjectCode": $scope.modAcademicBatchObj,
                        "SubjectName": $scope.modAcademicBatchObj,
                        "SKS": $scope.modAcademicBatchObj
                    }]
                };

                $scope.filteredAcademicBatchData.push(postData.batchInsertData[0]);
                $scope.Modals.closeSubjectContainer();
            }

        };


        (function startup() {

            $q.all([
                academicBatchService.getAcademicBatchList()
            ]).then(function (data) {
                if (data != null) {
                    console.log(data[0].results);
                    $scope.academicBatchData = data[0].results;
                    $scope.adjustAcademicBatchList();
                }
            }, function (reason) {
                errorHandler.logServiceError('academicBatchController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('academicBatchController', update);
            });
        })();

        function removeContact(contactId) {
            for (var i = 0; i < $scope.contacts.length; i++) {
                if ($scope.contacts[i].id == contactId) {
                    $scope.contacts.splice(i, 1);
                    break;
                }
            }
        };

        $scope.Modals = {
            openSubjectContainer: function () {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/App/Templates/Subject/AddEditModalPopup.html',
                    size: 'lg',
                    scope: $scope,
                    backdrop: 'static'
                });

                $scope.modalInstance.result.then(
                    function (contact) {
                        if (contact.id != null) {
                            $scope.Commands.updateContact(contact);
                        }
                        else {
                            $scope.Commands.saveContact(contact);
                        }
                    },
                    function (event) {

                    });
            },
            openSubjectContainer: function () {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/App/Templates/Subject/managePopup.html',
                    size: 'lg',
                    scope: $scope,
                    backdrop: 'static'
                });

                $scope.modalInstance.result.then(
                    function (contact) {
                        if (contact.id != null) {
                            $scope.Commands.updateContact(contact);
                        }
                        else {
                            $scope.Commands.saveContact(contact);
                        }
                    },
                    function (event) {

                    });
            },
            closeAcademicBatchContainer: function () {
                $scope.modalInstance.dismiss();
            },
            closeAcademicBatchContainer: function () {
                $scope.modalInstance.dismiss();
            }
        };

    };
})
    ();