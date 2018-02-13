(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('classRoomListController', classRoomListController);

    classRoomListController.$inject = ['$scope', '$q', 'classRoomListService', 'errorHandler', '$modal'];

    function classRoomListController($scope, $q, classRoomListService, errorHandler, $modal) {
        $scope.classRoomData = [];
        $scope.filteredclassRoomData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'ClassName';
        $scope.reverseSort = false;
        $scope.adjustclassRoomList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredclassRoomData = angular.copy($scope.classRoomData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustclassRoomList();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];

        $scope.modclassRoomObj = {};
        $scope.pp = '90';
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };




        $scope.editClassRoomContainer = function (data) {
            $scope.modalType = 'update';
            $scope.modclassRoomObj = data;
            $scope.Modals.openClassRoomContainer();
        };

        $scope.addClassRoomContainer = function (data) {
            $scope.modalType = 'add';
            $scope.modclassRoomObj = data;
            $scope.Modals.openClassRoomContainer();
        };




        $scope.updatClassRoomDetails = function () {
            console.log($scope.modclassRoomObj);
            var postData = {
                "batchUpdateData":
                [{
               
                    

                }]
            };

        };
        $scope.addClassRoomDetailsSuccess = function (data) {
            $('#subject-modal-popup').modal({
                show: 'false'
            });
        };

        $scope.addClassRoomDetailsError = function (data) {
            $('#subject-modal-popup').modal({
                show: 'false'
            });
        };
        $scope.addClassRoomDetails = function (form) {
            if (form.$valid) {

                var postData = {
                    "batchInsertData":
                    [{
                        "BuildingCode": $scope.modclassRoomObj,
                        "BuildingName": $scope.modclassRoomObj,
                        "RoomName": $scope.modclassRoomObj,
                        "CapasityofRoom": $scope.modclassRoomObj,
                        "LocationperLevel": $scope.modclassRoomObj
                    }]
                };

                $scope.filteredclassRoomData.push(postData.batchInsertData[0]);
                $scope.Modals.closeClassRoomContainer();
            }

        };


        (function startup() {

            $q.all([
                classRoomListService.getClassRoomList()
            ]).then(function (data) {
                if (data != null) {
                    console.log(data[0].results);
                    $scope.classRoomData = data[0].results;
                    $scope.adjustclassRoomList();
                }
            }, function (reason) {
                errorHandler.logServiceError('classRoomListController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('classRoomListController', update);
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
            openClassRoomContainer: function () {
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
            openClassRoomContainer: function () {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/App/Templates/ClassRoom/managePopup.html',
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
            closeClassRoomContainer: function () {
                $scope.modalInstance.dismiss();
            }
        };

    };
})
();