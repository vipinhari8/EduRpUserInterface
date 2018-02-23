(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('classRoomListController', classRoomListController);

    classRoomListController.$inject = ['$scope', '$q', 'classRoomListService', 'errorHandler', '$modal','commonService'];

    function classRoomListController($scope, $q, classRoomListService, errorHandler, $modal, commonService) {
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
//---------------------------------------------------------------------------page load ----------------------------------------------------------------------
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

//---------------------------------------------------------------------------add classroom----------------------------------------------------------------------
        $scope.addClassRoomContainer = function (data) {
            $scope.modalType = 'add';
            $scope.modclassRoomObj = data;
            $scope.Modals.openClassRoomContainer();
        };

        $scope.addClassRoomDetails = function (form) {
            if (form.$valid) {
                $q.when([classRoomListService.addClassRoom($scope.modclassRoomObj)]).then(function (data) {
                    $scope.filteredclassRoomData.push($scope.modclassRoomObj);
                    $scope.Modals.closeClassRoomContainer();
                }, function (error) {
                    alert("please try later");
                });
            }
        };
//---------------------------------------------------------------------------update classroom----------------------------------------------------------------------
        $scope.editClassRoomContainer = function (data) {
            $scope.modalType = 'update';
            $scope.modclassRoomObj = data;
            $scope.Modals.openClassRoomContainer();
        };

        $scope.updateClassRoomDetails = function (form,clssdata) {
            if (form.$valid) {
                var postData = {
                    "BuildingCode": $scope.modclassRoomObj.BuildingCode,
                    "BuildingName": $scope.modclassRoomObj.BuildingName,
                    "RoomCode": $scope.modclassRoomObj.RoomCode,
                    "RoomName": $scope.modclassRoomObj.RoomName,
                    "CapacityOfRoom": $scope.modclassRoomObj.CapacityOfRoom,
                    "Facility": $scope.modclassRoomObj.Facility,
                    "Location": $scope.modclassRoomObj.Location
                };
                classRoomListService.updateClassRoom(postData).then(function (data) {
                    angular.forEach($scope.filteredclassRoomData, function (v, k) {
                        if (v.ClassRoomId === clssdata) {
                            $scope.filteredclassRoomData[k]['BuildingCode'] = $scope.modclassRoomObj.BuildingCode;
                            $scope.filteredclassRoomData[k]['BuildingName'] = $scope.modclassRoomObj.BuildingName;
                            $scope.filteredclassRoomData[k]['RoomCode'] = $scope.modclassRoomObj.RoomCode;
                            $scope.filteredclassRoomData[k]['RoomName'] = $scope.modclassRoomObj.RoomName;
                            $scope.filteredclassRoomData[k]['CapacityOfRoom'] = $scope.modclassRoomObj.CapacityOfRoom;
                            $scope.filteredclassRoomData[k]['Facility'] = $scope.modclassRoomObj.Facility;
                            $scope.filteredclassRoomData[k]['Location'] = $scope.modclassRoomObj.Location;

                        }
                    });
                    $scope.modclassRoomObj = {};
                    $scope.Modals.closeClassRoomContainer();
                }, function (error) {
                    alert("Please try again");
                });
            }
        };
//---------------------------------------------------------------------------remove classroom----------------------------------------------------------------------
        $scope.deleteclassRoom = function (clssrm) {
            if (confirm('Are you sure you want to delete this ClassRoom?')) {
                classRoomListService.deleteClassRoom(clssrm).then(function (data) {
                    $scope.filteredclassRoomData = commonService.removeItemFromArray($scope.filteredclassRoomData, clssrm);
                }, function (error) {
                    alert("Please try again");
                });
            }
        };
//---------------------------------------------------------------------------model starts here----------------------------------------------------------------------
        $scope.Modals = {
            openClassRoomContainer: function () {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/App/Templates/ClassRoom/addEditModalPopup.html',
                    size: 'lg',
                    scope: $scope,
                    backdrop: 'static'
                });
            },
            closeClassRoomContainer: function () {
                $scope.modalInstance.dismiss();
            }
        };

    };
})
();