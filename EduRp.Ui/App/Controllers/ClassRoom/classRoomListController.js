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
            , $scope.numPerPage = 10
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

        $scope.showPerPageDataOptions = [10, 25, 50, 100];

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




        $scope.updateClassRoomDetails = function () {
            console.log($scope.modclassRoomObj);
            var postData = {
                "batchUpdateData":
                [{
               
                    

                }]
            };
            classRoomListService.updateClassRoom(postData).then(function (data) {
                angular.forEach($scope.filteredclassRoomData, function (v, k) {
                    if (v.ClassRoomId === cid) {
                        $scope.filteredclassRoomData[k]['BuildingCode'] = $scope.modclassRoomObj.BuildingCode;
                        $scope.filteredclassRoomData[k]['BuildingName'] = $scope.modclassRoomObj.BuildingName;
                        $scope.filteredclassRoomData[k]['RoomCode'] = $scope.modclassRoomObj.RoomCode;
                        $scope.filteredclassRoomData[k]['RoomName'] = $scope.modclassRoomObj.RoomName;
                        $scope.filteredclassRoomData[k]['CapacityOfRoom'] = $scope.modclassRoomObj.CapacityOfRoom;
                        $scope.filteredclassRoomData[k]['Facility'] = $scope.modclassRoomObj.Facility;
                        $scope.filteredclassRoomData[k]['Location'] = $scope.modclassRoomObj.Location;

                    }
                });
                $scope.Modals.closeClassRoomContainer();
            }, function (error) {
                alert("Please try again");
            });

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
                        "RoomCode": $scope.modclassRoomObj,
                        "RoomName": $scope.modclassRoomObj,
                        "CapacityOfRoom": $scope.modclassRoomObj,
                        "Facility": $scope.modclassRoomObj,
                        "Location": $scope.modclassRoomObj
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
                    templateUrl: '/App/Templates/ClassRoom/addEditModalPopup.html',
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