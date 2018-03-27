(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('lessonplanController', lessonplanController);

    lessonplanController.$inject = ['$scope', '$q', 'lessonplanService', 'errorHandler', '$modal', 'commonService'];

    function lessonplanController($scope, $q, lessonplanService, errorHandler, $modal, commonService) {
        $scope.lessonplanData = [];
        $scope.filteredlessonplanData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'Date';
        $scope.reverseSort = false;
        $scope.adjustlessonplanList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredlessonplanData = angular.copy($scope.lessonplanData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustlessonplanList();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];

        $scope.modLessonplanObj = {};
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };

        //Get PageLoad
        (function startup() {

            $q.all([
                lessonplanService.getlessonplanList()
            ]).then(function (data) {
                if (data !== null) {
                    $scope.lessonplanData = data[0].results;
                    $scope.adjustlessonplanList();
                }
            }, function (reason) {
                errorHandler.logServiceError('lessonplanController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('lessonplanController', update);
            });
        })();
        $scope.addlessonplanContainer = function () {
            $scope.modalType = 'add';
            $scope.Modals.openlessonplanContainer();
        };
        //Add
        $scope.addLessonplanDetails = function (form) {
            if (form.$valid) {
                $q.when([lessonplanService.addlessonplan($scope.modLessonplanObj)]).then(function (data) {
                    $scope.filteredlessonplanData.push($scope.modLessonplanObj);
                    $scope.Modals.closelessonplanContainer();
                }, function (error) {
                    alert("please try later");
                });

            }

        };
        //update
        $scope.editlessonplanContainer = function (data) {
            $scope.modalType = 'update';
            $scope.modLessonplanObj = data;
            $scope.Modals.openlessonplanContainer();
        };

        $scope.updateLessonplanDetails = function (form, fid) {

            if (form.$valid) {
                var postData = {
                    "Subject": $scope.modLessonplanObj.Subject,
                    "Teacher": $scope.modLessonplanObj.Teacher,
                    "Grade": $scope.modLessonplanObj.Grade
                    
                };
                lessonplanService.updateLossandFound($scope.modLessonplanObj).then(function (data) {
                    angular.forEach($scope.filteredlessonplanData, function (v, k) {
                        if (v.SubjectId === sid) {
                            $scope.filteredlessonplanData[k]['Subject'] = $scope.modLessonplanObj.Subject;
                            $scope.filteredlessonplanData[k]['Teacher'] = $scope.modLessonplanObj.Teacher;
                            $scope.filteredlessonplanData[k]['Grade'] = $scope.modLessonplanObj.Grade
                            
                        }
                    });
                    $scope.Modals.closelessonplanContainer();
                }, function (error) {
                    alert("Please try again");
                });

            }
        };
        //delete 

        $scope.deletelessonplanContainer = function (sd) {
            if (confirm('Are you sure you want to delete this lessonplan?')) {
                lessonplanService.deletelessonplan(sd).then(function (data) {
                    $scope.filteredlessonplanData = commonService.removeItemFromArray($scope.filteredlessonplanData, sd);
                }, function (error) {
                    alert("Please try again");
                });
            }


        };
        $scope.Modals = {
            openlessonplanContainer: function () {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/App/Templates/LessonPlan/addlessonplan.html',
                    size: 'lg',
                    scope: $scope,
                    backdrop: 'static'
                });

                $scope.modalInstance.result.then(
                    function (lessonplan) {

                    },
                    function (event) {

                    });
            },
            closelessonplanContainer: function () {
                $scope.modalInstance.dismiss();
            }
        };


    };
})
    ();