(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('subjectListController', subjectListController);

    subjectListController.$inject = ['$scope', '$q', 'subjectListService', 'errorHandler', '$modal', 'commonService'];

    function subjectListController($scope, $q, subjectListService, errorHandler, $modal, commonService) {
        $scope.subjectData = [];
        $scope.filteredSubjectData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 10
            , $scope.maxSize = 5;
        $scope.orderByField = 'SubjectName';
        $scope.reverseSort = false;
        $scope.adjustSubjectList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredSubjectData = angular.copy($scope.subjectData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustSubjectList();
        });

        $scope.showPerPageDataOptions = [10, 25, 50, 100];

        $scope.modSubjectObj = {};
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };

//Get PageLoad
        (function startup() {

            $q.all([
                subjectListService.getSubjectList()
            ]).then(function (data) {
                if (data !== null) {
                    $scope.subjectData = data[0].results;
                    $scope.adjustSubjectList();
                }
            }, function (reason) {
                errorHandler.logServiceError('subjectListController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('subjectListController', update);
            });
        })();


        $scope.addSubjectContainer = function () {
            $scope.modalType = 'add';
            $scope.Modals.openSubjectContainer();
        };
//Add
        $scope.addSubjectDetails = function (form) {
            if (form.$valid) {
                $q.when([subjectListService.addSubject($scope.modSubjectObj)]).then(function (data) {
                    $scope.filteredSubjectData.push($scope.modSubjectObj);
                    $scope.Modals.closeSubjectContainer();
                }, function (error) {
                    alert("please try later");
                });

            }

        };

//update
        $scope.editSubjectContainer = function (data) {
            $scope.modalType = 'update';
            $scope.modSubjectObj = data;
            $scope.Modals.openSubjectContainer();
        };

        $scope.updateSubjectDetails = function (form, sid) {
           
            if (form.$valid) {
                var postData = {
                    "SubjectCode": $scope.modSubjectObj.SubjectCode,
                    "SubjectName": $scope.modSubjectObj.SubjectName
                };
                subjectListService.updateSubject($scope.modSubjectObj).then(function (data) {
                    angular.forEach($scope.filteredSubjectData, function (v, k) {
                        if (v.SubjectId === sid) {
                            $scope.filteredSubjectData[k]['SubjectCode'] = $scope.modSubjectObj.SubjectCode;
                            $scope.filteredSubjectData[k]['SubjectName'] = $scope.modSubjectObj.SubjectName;
                        }
                    });
                    $scope.Modals.closeSubjectContainer();
                }, function (error) {
                    alert("Please try again");
                });

            }
        };
//delete 

        $scope.deleteSubjectContainer = function (sd) {
            if (confirm('Are you sure you want to delete this subject?')) {
                subjectListService.deleteSubject(sd).then(function (data) {
                    $scope.filteredSubjectData = commonService.removeItemFromArray($scope.filteredSubjectData, sd);
                }, function (error) {
                    alert("Please try again");
                });
            }


        };   


        $scope.Modals = {
            openSubjectContainer: function () {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/App/Templates/Subject/managePopup.html',
                    size: 'lg',
                    scope: $scope,
                    backdrop: 'static'
                });

                $scope.modalInstance.result.then(
                    function (subject) {
                        
                    },
                    function (event) {

                    });
            },
            closeSubjectContainer: function () {
                $scope.modalInstance.dismiss();
            }
        };

    };
})
();