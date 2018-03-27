(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('teachernoteController', teachernoteController);

    teachernoteController.$inject = ['$scope', '$q', 'teachernoteService', 'errorHandler', '$modal', 'commonService'];

    function teachernoteController($scope, $q, teachernoteService, errorHandler, $modal, commonService) {
        $scope.teachernoteData = [];
        $scope.filteredteachernoteData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'Date';
        $scope.reverseSort = false;
        $scope.adjustteachernoteList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredteachernoteData = angular.copy($scope.teachernoteData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustteachernoteList();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];

        $scope.modTeachernoteObj = {};
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };

        //Get PageLoad
        (function startup() {

            $q.all([
                teachernoteService.getteachernoteList()
            ]).then(function (data) {
                if (data !== null) {
                    $scope.teachernoteData = data[0].results;
                    $scope.adjustteachernoteList();
                }
            }, function (reason) {
                errorHandler.logServiceError('teachernoteController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('teachernoteController', update);
            });
        })();
        $scope.addTeachernoteContainer = function () {
            $scope.modalType = 'add';
            $scope.Modals.openTeachernoteContainer();
        };
        //Add
        $scope.addTeachernoteDetails = function (form) {
            if (form.$valid) {
                $q.when([lessonplanService.addTeachernote($scope.modTeachernoteObj)]).then(function (data) {
                    $scope.filteredteachernoteData.push($scope.modTeachernoteObj);
                    $scope.Modals.closeTeachernoteContainer();
                }, function (error) {
                    alert("please try later");
                });

            }

        };
        //update
        $scope.editTeachernoteContainer = function (data) {
            $scope.modalType = 'update';
            $scope.modTeachernoteObj = data;
            $scope.Modals.openTeachernoteContainer();
        };

        $scope.updateTeachernoteDetails = function (form, fid) {

            if (form.$valid) {
                var postData = {
                    "Subject": $scope.modTeachernoteObj.Subject,
                    "NotesTitle": $scope.modTeachernoteObj.NotesTitle,
                    "Date": $scope.modTeachernoteObj.Date

                };
                teachernoteService.updateTeachernote($scope.modTeachernoteObj).then(function (data) {
                    angular.forEach($scope.filteredteachernoteData, function (v, k) {
                        if (v.SubjectId === sid) {
                            $scope.filteredteachernoteData[k]['Subject'] = $scope.modTeachernoteObj.Subject;
                            $scope.filteredteachernoteData[k]['NotesTitle'] = $scope.modTeachernoteObj.NotesTitle;
                            $scope.filteredteachernoteData[k]['Date'] = $scope.modTeachernoteObj.Date

                        }
                    });
                    $scope.Modals.closeTeachernoteContainer();
                }, function (error) {
                    alert("Please try again");
                });

            }
        };
        //delete 

        $scope.deleteTeachernoteContainer = function (sd) {
            if (confirm('Are you sure you want to delete this teachernote?')) {
                teachernoteService.deleteteachernote(sd).then(function (data) {
                    $scope.filteredteachernoteData = commonService.removeItemFromArray($scope.filteredteachernoteData, sd);
                }, function (error) {
                    alert("Please try again");
                });
            }


        };
        $scope.Modals = {
            openTeachernoteContainer: function () {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/App/Templates/TeacherNote/addteachernote.html',
                    size: 'lg',
                    scope: $scope,
                    backdrop: 'static'
                });

                $scope.modalInstance.result.then(
                    function (teachernote) {

                    },
                    function (event) {

                    });
            },
            closeTeachernoteContainer: function () {
                $scope.modalInstance.dismiss();
            }
        };


    };
})
    ();