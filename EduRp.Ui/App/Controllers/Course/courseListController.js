(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('courseListController', courseListController);

    courseListController.$inject = ['$scope', '$q', 'courseListService', 'errorHandler', '$modal', 'commonService'];

    function courseListController($scope, $q, courseListService, errorHandler, $modal, commonService) {
        $scope.courseData = [];
        $scope.filteredCourseData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'CourseName';
        $scope.reverseSort = false;
        $scope.adjustCourseList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredCourseData = angular.copy($scope.courseData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustCourseList();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];
        
        $scope.modCourseObj = {};
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };
       
        $scope.editCourseContainer = function (data) {
            $scope.modalType = 'update';
            $scope.modCourseObj = data;
            $scope.Modals.openCourseContainer();
        };

        $scope.addCourseContainer = function (data) {
            $scope.modalType = 'add';
            $scope.modCourseObj = data;
            $scope.Modals.openCourseContainer();
        };

       

        $scope.updateCourseDetails = function (form , cid) {
            if (form.$valid) {
                var postData = {
                    "CourseCode": $scope.modCourseObj.CourseCode,
                    "CourseName": $scope.modCourseObj.CourseName
                };
                courseListService.updateCourse(postData).then(function (data) {
                    angular.forEach($scope.filteredCourseData, function (v, k) {
                        if (v.CourseId === cid) {
                            $scope.filteredCourseData[k]['CourseCode'] = $scope.modCourseObj.CourseCode;
                            $scope.filteredCourseData[k]['CourseName'] = $scope.modCourseObj.CourseName;
                        }
                    });
                    $scope.Modals.closeCourseContainer();
                }, function (error) {
                    alert("Please try again");
                });

            }

        };
        
        $scope.addCourseDetails = function (form) {
            if (form.$valid) {
                var postData = {
                    "CourseCode": $scope.modCourseObj.CourseCode,
                    "CourseName": $scope.modCourseObj.CourseName
                };
                courseListService.addCourse(postData).then(function (data) {
                    $scope.filteredCourseData.push(postData.batchInsertData[0]);
                    $scope.Modals.closeCourseContainer();
                }, function (error) {
                    alert("Please try again");
                });
                
            }

        };

        $scope.deleteCourseContainer = function (cd) {
            if (confirm('Are you sure you want to delete this course?')) {
                courseListService.deleteCourse(cd).then(function (data) {
                    $scope.filteredCourseData = commonService.removeItemFromArray($scope.filteredCourseData, cd);
                }, function (error) {
                    alert("Please try again");
                });
            }
            

        };
        

        (function startup() {

            $q.all([
                courseListService.getCourseList()
            ]).then(function (data) {
                if (data != null) {
                    $scope.courseData = data[0].results;
                    $scope.adjustCourseList();
                }
            }, function (reason) {
                errorHandler.logServiceError('courseListController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('courseListController', update);
            });
        })();

        

        $scope.Modals = {
            openCourseContainer: function () {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/App/Templates/Course/AddEditModalPopup.html',
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
            closeCourseContainer: function () {
                $scope.modalInstance.dismiss();
            }
        };




    };
})
    ();