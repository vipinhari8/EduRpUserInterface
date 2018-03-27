(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('lossandfoundController', lossandfoundController);

    lossandfoundController.$inject = ['$scope', '$q', 'lossandfoundService', 'errorHandler', '$modal', 'commonService'];

    function lossandfoundController($scope, $q, lossandfoundService, errorHandler, $modal, commonService) {
        $scope.LossandFoundData = [];
        $scope.filteredlossandfoundData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'Name';
        $scope.reverseSort = false;
        $scope.adjustLossandFoundList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredlossandfoundData = angular.copy($scope.LossandFoundData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustLossandFoundList();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];

        $scope.modLossandFoundObj = {};
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };

        //Get PageLoad
        (function startup() {

            $q.all([
                lossandfoundService.getlossandfoundList()
            ]).then(function (data) {
                if (data !== null) {
                    $scope.LossandFoundData = data[0].results;
                    $scope.adjustLossandFoundList();
                }
            }, function (reason) {
                errorHandler.logServiceError('lossandfoundController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('lossandfoundController', update);
            });
        })();

        $scope.addlossandfoundContainer = function () {
            $scope.modalType = 'add';
            $scope.Modals.openlossandfoundContainer();
        };
        //Add
        $scope.addLossandFoundDetails = function (form) {
            if (form.$valid) {
                $q.when([lossandfoundService.addlossandfound($scope.modLossandFoundObj)]).then(function (data) {
                    $scope.filteredlossandfoundData.push($scope.modLossandFoundObj);
                    $scope.Modals.closelossandfoundContainer();
                }, function (error) {
                    alert("please try later");
                });

            }

        };
        //update
        $scope.editlossandfoundContainer = function (data) {
            $scope.modalType = 'update';
            $scope.modLossandFoundObj = data;
            $scope.Modals.openlossandfoundContainer();
        };

        $scope.updateLossandFoundDetails = function (form, fid) {

            if (form.$valid) {
                var postData = {
                    "Name": $scope.modLossandFoundObj.Name,
                    "Class": $scope.modLossandFoundObj.Class,
                    "Things": $scope.modLossandFoundObj.Things,
                    "Date": $scope.modLossandFoundObj.Date
                };
                lossandfoundService.updateLossandFound($scope.modLossandFoundObj).then(function (data) {
                    angular.forEach($scope.filteredlossandfoundData, function (v, k) {
                        if (v.StudentId === sid) {
                            $scope.filteredlossandfoundData[k]['Name'] = $scope.modLossandFoundObj.Name;
                            $scope.filteredlossandfoundData[k]['Class'] = $scope.modLossandFoundObj.Class;
                            $scope.filteredlossandfoundData[k]['Things'] = $scope.modLossandFoundObj.Things;
                            $scope.filteredlossandfoundData[k]['Date'] = $scope.modLossandFoundObj.Date;
                        }
                    });
                    $scope.Modals.closelossandfoundContainer();
                }, function (error) {
                    alert("Please try again");
                });

            }
        };
        //delete 

        $scope.deletelossandfoundContainer = function (sd) {
            if (confirm('Are you sure you want to delete this lossandfound?')) {
                lossandfoundService.deletelossandfound(sd).then(function (data) {
                    $scope.filteredlossandfoundData = commonService.removeItemFromArray($scope.filteredlossandfoundData, sd);
                }, function (error) {
                    alert("Please try again");
                });
            }


        };
        $scope.Modals = {
            openlossandfoundContainer: function () {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/App/Templates/LossAndFound/addlossfound.html',
                    size: 'lg',
                    scope: $scope,
                    backdrop: 'static'
                });

                $scope.modalInstance.result.then(
                    function (lossandfound) {

                    },
                    function (event) {

                    });
            },
            closelossandfoundContainer: function () {
                $scope.modalInstance.dismiss();
            }
        };


    };
})
    ();