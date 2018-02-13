(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('notificationTypeController', notificationTypeController);

    notificationTypeController.$inject = ['$scope', '$q', 'notificationTypeService', 'errorHandler', '$modal'];

    function notificationTypeController($scope, $q, notificationTypeService, errorHandler, $modal) {
        $scope.notificationTypeData = [];
        $scope.filterednotificationTypeData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'NotificationName';
        $scope.reverseSort = false;
        $scope.adjustNotificationTypeList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filterednotificationTypeData = angular.copy($scope.notificationTypeData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustNotificationTypeList();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];

        $scope.modnotificationTypeObj = {};
        $scope.pp = '90';
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };




        $scope.editNotificationTypeContainer = function (data) {
            $scope.modalType = 'update';
            $scope.modnotificationTypeObj = data;
            $scope.Modals.openNotificationTypeContainer();
        };

        $scope.addNotificationTypeContainer = function (data) {
            $scope.modalType = 'add';
            $scope.modnotificationTypeObj = data;
            $scope.Modals.openNotificationTypeContainer();
        };




        $scope.updateNotificationTypeDetails = function () {
            console.log($scope.modnotificationTypeObj);
            var postData = {
                "batchUpdateData":
                [{
           
                    "NotificationId": $scope.modnotificationTypeObj,
                    "NotificationCode": $scope.modnotificationTypeObj,
                    "NotificationName": $scope.modnotificationTypeObj,
                    "SKS": $scope.modnotificationTypeObj

                }]
            };

        };
        $scope.addNotificationTypeDetailsSuccess = function (data) {
            $('#subject-modal-popup').modal({
                show: 'false'
            });
        };

        $scope.addNotificationTypeDetailsError = function (data) {
            $('#subject-modal-popup').modal({
                show: 'false'
            });
        };
        $scope.addNotificationTypeDetails = function (form) {
            if (form.$valid) {

                var postData = {
                    "batchInsertData":
                    [{
                        "NotificationCode": $scope.modnotificationTypeObj,
                        "NotificationName": $scope.modnotificationTypeObj,
                        //"SKS": $scope.modnotificationTypeObj
                    }]
                };

                $scope.filterednotificationTypeData.push(postData.batchInsertData[0]);
                $scope.Modals.closeNotificationTypeContainer();
            }

        };


        (function startup() {

            $q.all([
                notificationTypeService.getnotificationTypeList()
            ]).then(function (data) {
                if (data != null) {
                    console.log(data[0].results);
                    $scope.notificationTypeData = data[0].results;
                    $scope.adjustNotificationTypeList();
                }
            }, function (reason) {
                errorHandler.logServiceError('notificationTypeController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('notificationTypeController', update);
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
            openNotificationTypeContainer: function () {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/App/Templates/Notifiaction Type/AddEditModalPopup.html',
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
            openNotificationTypeContainer: function () {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/App/Templates/Notifiaction Type/AddEditModalPopup.html',
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
            closeNotificationTypeContainer: function () {
                $scope.modalInstance.dismiss();
            },
            closeNotificationTypeContainer: function () {
                $scope.modalInstance.dismiss();
            }
        };

    };
})
();