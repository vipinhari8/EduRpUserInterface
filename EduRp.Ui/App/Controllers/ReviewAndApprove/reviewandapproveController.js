(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('reviewandapproveController', reviewandapproveController);

    reviewandapproveController.$inject = ['$scope', '$q', 'reviewandapproveService', 'errorHandler', 'commonService', 'programStudyService'];

    function reviewandapproveController($scope, $q, reviewandapproveService, errorHandler, commonService, programStudyService) {
        $scope.title = 'reviewandapproveController';

        activate();

        function activate() { }

        $scope.reviewandapproveData = [];
        $scope.filteredData = [];
        $scope.batchList = [];
        $scope.programStudyData = [];
        $scope.courseData = [];

        $scope.selectedBatch = null;
        $scope.selectedPS = null;
        $scope.selectedCourse = null;

        $scope.mainContentSubPart = false;
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'StudentId';
        $scope.reverseSort = false;
        $scope.adjustreviewandapproveList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredData = angular.copy($scope.reviewandapproveData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustreviewandapproveList();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];
        //$scope.modreviewandapproveObj = {};
        //$scope.pp = '90';
        //$scope.modalType = '';
        $scope.filterPanel = false;

      

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };

        (function startup() {

            $q.all([
                reviewandapproveService.selectBatch()
            ]).then(function (data) {
                console.log(data);
                if (data !== null) {
                    $scope.batchList = data[0].results;
                }
            }, function (reason) {
                errorHandler.logServiceError('reviewandapproveController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('reviewandapproveController', update);
            });


        })();

        //$scope.addReviewandapproveContainer = function (data) {
        //    $scope.modalType = 'add';
        //    $scope.modreviewandapproveObj = data;
        //    $scope.Modals.openReviewandapproveContainer();
        //};


        $scope.fetchProgramStudyByBatchId = function (batchData) {
            var selBatch = angular.copy(batchData);
            if (selBatch) {
                $q.all([
                    reviewandapproveService.getLinkedProgrmStudiesOfBatch(selBatch)
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
        //$scope.Modals = {
        //    openReviewandapproveContainer: function () {
        //        $scope.modalInstance = $modal.open({
        //            animation: true,
        //            templateUrl: '/App/Templates/openReviewAndApprove/documents.html',
        //            size: 'lg',
        //            scope: $scope,
        //            backdrop: 'static'
        //        });
        //        closeReviewandapproveContainer: function () {
        //            $scope.modalInstance.dismiss();
        //        }

        $scope.fetchStudentDataByCriteria = function () {
            var selBatch = angular.copy($scope.selectedBatch);
            var selPS = angular.copy($scope.selectedPS);
            var selCourse = angular.copy($scope.selectedCourse);

            var mergedObject = angular.extend(selBatch, selPS, selCourse);

            console.log(mergedObject);
            if (mergedObject) {
                $q.all([
                    reviewandapproveService.getreviewandapproveDetail(mergedObject)
                ]).then(function (data) {

                    if (data !== null) {
                        $scope.reviewandapprovedata = data[0].results;
                        $scope.mainContentSubPart = true;
                    }
                }, function (reason) {
                    errorhandler.logserviceerror('reviewandapproveController', reason);
                }, function (update) {
                    errorhandler.logservicenotify('reviewandapproveController', update);
                });
            }
        };

    }
})();
