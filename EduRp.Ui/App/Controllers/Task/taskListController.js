(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('taskListController', taskListController);

    taskListController.$inject = ['$scope', '$q', 'taskListService', 'errorHandler', '$modal'];

    function taskListController($scope, $q, taskListService, errorHandler, $modal) {
        $scope.taskData = [];
        $scope.filteredtaskData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'TaskName';
        $scope.reverseSort = false;
        $scope.adjusttaskList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredtaskData = angular.copy($scope.taskData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjusttaskList();
        });

        $scope.showPerPageDataOptions = [5, 25, 50, 100];

        $scope.modtaskObj = {};
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };



        $scope.editTaskContainer = function (data) {
            $scope.modalType = 'update';
            $scope.modtaskObj = data;
            $scope.Modals.openTaskContainer();
        };

        $scope.addTaskContainer = function () {
            $scope.modalType = 'add';
            $scope.modtaskObj = null;
            $scope.Modals.openTaskContainer();
        };


        $scope.deleteTaskContainer = function (data) {
            if (confirm("Are you sure to delete it?")) {
                $q.when(taskListService.deleteTask(data)).then(function (success) {
                    var tempData = [];
                    angular.forEach($scope.taskData, function (v, k) {
                        if (v.TaskId !== data.TaskId) {
                            tempData.push(v);
                        }
                    });
                    $scope.taskData = tempData;
                    $scope.adjusttaskList();
                }, function (error) {
                    alert("Please try again.");
                });
            }
            

        };

        $scope.updateTaskDetails = function (form, tid) {
            if (form.$valid) {
                var postData = {
                    "TaskId": $scope.modtaskObj.TaskId,
                    "TaskName": $scope.modtaskObj.TaskName,
                    "TaskDescription": $scope.modtaskObj.TaskDescription,
                    "TaskDuration": $scope.modtaskObj.TaskDuration

                };
                taskListService.updateTask(postData).then(function (data) {
                    $scope.pageLoad();
                    $scope.Modals.closeTaskContainer();
                }, function (error) {
                    alert("Please try again");
                });
            
            }

        };
        $scope.addTaskDetailsSuccess = function (data) {
            $('#task-modal-popup').modal({
                show: 'false'
            });
        };

        $scope.addTaskDetailsError = function (data) {
            $('#task-modal-popup').modal({
                show: 'false'
            });
        };
        $scope.addTaskDetails = function (form) {
            if (form.$valid) {
                var postData = {
                    "TaskName": $scope.modtaskObj.TaskName,
                    "TaskDescription": $scope.modtaskObj.TaskDescription,
                    "TaskDuration": $scope.modtaskObj.TaskDuration
                };
                taskListService.addTask(postData).then(function (data) {
                    $scope.pageLoad();
                    $scope.Modals.closeTaskContainer();
                }, function (error) {
                    alert("Please try again");
                });
                
                
            }

        };


        $scope.pageLoad = function() {

            $q.all([
                taskListService.getTaskList()
            ]).then(function (data) {
                if (data != null) {
                    console.log(data[0].results);
                    $scope.taskData = data[0].results;
                    $scope.adjusttaskList();
                }
            }, function (reason) {
                errorHandler.logServiceError('taskListController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('taskListController', update);
            });


        };

        function removesubject(subjectId) {
            for (var i = 0; i < $scope.subjects.length; i++) {
                if ($scope.subjects[i].id == subjectId) {
                    $scope.subjects.splice(i, 1);
                    break;
                }
            }
        };

        $scope.Modals = {
            openTaskContainer: function () {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/App/Templates/Task/addEditModalPopup.html',
                    size: 'lg',
                    scope: $scope,
                    backdrop: 'static'
                });

                $scope.modalInstance.result.then(
                    function (task) {
                        if (task.SubjectId != null) {
                            $scope.Commands.updatesubject(task);
                        }
                        else {
                            $scope.Commands.savesubject(task);
                        }
                    },
                    function (event) {

                    });
            },
            closeTaskContainer: function () {
                $scope.modalInstance.dismiss();
            }
        };
        $scope.pageLoad();

    };
})
    ();