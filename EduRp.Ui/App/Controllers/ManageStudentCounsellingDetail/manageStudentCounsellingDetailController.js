(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('manageStudentCounsellingDetailController', manageStudentCounsellingDetailController);

    manageStudentCounsellingDetailController.$inject = ['$scope', '$q', 'manageStudentCounsellingDetailService', 'errorHandler', 'commonService','programStudyService'];

    function manageStudentCounsellingDetailController($scope, $q, manageStudentCounsellingDetailService, errorHandler, commonService, programStudyService) {
        $scope.title = 'manageStudentCounsellingDetailController';

        activate();

        function activate() { }

        $scope.managestdcounsellingData = [];
        $scope.filteredData = [];
        $scope.batchList = [];
        $scope.programStudyData = [];
        $scope.courseData = [];

        $scope.selectedBatch = null;
        $scope.selectedPS = null;
        $scope.selectedCourse = null;

        $scope.mainContentSubPart = false;
        $scope.currentPage = 1
            , $scope.numPerPage = 10
            , $scope.maxSize = 5;
        $scope.orderByField = 'StudentId';
        $scope.reverseSort = false;
        $scope.adjustStdCouncellingList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredData = angular.copy($scope.managestdcounsellingData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustStdCouncellingList();
        });

        $scope.showPerPageDataOptions = [10, 25, 50, 100];

        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };
        (function startup() {

            $q.all([
                manageStudentCounsellingDetailService.selectBatch()
            ]).then(function (data) {
                console.log(data);
                if (data !== null) {
                    $scope.batchList = data[0].results;
                }
            }, function (reason) {
                errorHandler.logServiceError('manageStudentCounsellingDetailController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('manageStudentCounsellingDetailController', update);
            });

           
        })();


        $scope.fetchProgramStudyByBatchId= function (batchData) {
            var selBatch = angular.copy(batchData);
            if (selBatch) {
                $q.all([
                    manageStudentCounsellingDetailService.getLinkedProgrmStudiesOfBatch(selBatch)
                ]).then(function (data) {
                    // $scope.mainContentSubPart = true;
                    if (data !== null) {
                        $scope.programStudyData = data[0].results;

                    }
                }, function (reason) {
                    errorHandler.logServiceError('programStudyController', reason);
                });
            } else {
                alert("Please select a course");
            }
        };

        $scope.fetchCourseByProgramStudyId = function (psData) {
            var selPS = angular.copy(psData);
            if (selPS) {
                $q.all([
                    programStudyService.getLinkedCoursesOfProgramStudy(selPS)
                ]).then(function (data) {
                    // $scope.mainContentSubPart = true;
                    if (data !== null) {
                        $scope.courseData = data[0].results;

                    }
                }, function (reason) {
                    errorHandler.logServiceError('programStudyController', reason);
                });
            } else {
                alert("Please select a course");
            }
        };

        $scope.fetchStudentDataByCriteria = function () {
            var selBatch = angular.copy($scope.selectedBatch);
            var selPS = angular.copy($scope.selectedPS);
            var selCourse = angular.copy($scope.selectedCourse);

            var mergedObject = angular.extend(selBatch, selPS, selCourse);

            console.log(mergedObject);
            if (mergedObject) {
                $q.all([
                    manageStudentCounsellingDetailService.getStdCounsellingDetail(mergedObject)
                ]).then(function (data) {

                    if (data !== null) {
                        $scope.managestdcounsellingdata = data[0].results;
                        $scope.mainContentSubPart = true;
                    }
                }, function (reason) {
                    errorhandler.logserviceerror('managestudentcounsellingdetailcontroller', reason);
                }, function (update) {
                    errorhandler.logservicenotify('managestudentcounsellingdetailcontroller', update);
                });
            }
        };

    }
})();
