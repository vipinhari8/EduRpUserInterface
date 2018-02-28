(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('manageTaskController', manageTaskController);

    manageTaskController.$inject = ['$scope', '$q', '$log', 'manageTaskService', 'commonService', '$modal', 'errorHandler'];

    function manageTaskController($scope, $q, $log, manageTaskService, commonService, $modal, errorHandler) {

        $scope.taskListItem = [];
        $scope.taskListDetails = [];
        $scope.showTaskDetailList = false;
        $scope.selectedTask = undefined;
        //$scope.selectAllCourseList = false;
        $scope.assignEmployeeModal = false;
        $scope.notLinkedEmployees = undefined;
        //$scope.selectCourse = undefined;

        $scope.init = init;
        $scope.getSelectedTaskDetails = getSelectedTaskDetails;
        $scope.assignEmployee = assignEmployee;
        $scope.removeSelectedEmployee = removeSelectedEmployee;
        $scope.addEmployeeIntoList = addEmployeeIntoList;
        $scope.selectAllTasks = selectAllTasks;
        $scope.toggleTaskDetails = toggleTaskDetails;
        $scope.toggleNotlinkedEmployee = toggleNotlinkedEmployee;
        $scope.selectAllNotlinkedListItems = selectAllNotlinkedListItems;

        init();

        function init() {
            manageTaskService.getTaskList().then(taskListSuccess, taskListError);
        }

        function taskListSuccess(response) {
            $scope.taskListItem = response.results;
            console.log(response);
            console.log($scope.taskListItem);
        }

        function taskListError(response) {
            $log.info("Task list item error");
        }


        /**
         * Get all the subject details,
         * on selected couse from dropdrown
         */
        function getSelectedTaskDetails() {
            manageTaskService.getTaskListItem($scope.selectedTask).then(selectedTaskDetailSuccess, selectedTaskDetailError);
        }
        //GridFunctionality
        function selectedTaskDetailSuccess(response) {
            $scope.taskListDetails = response.results;
            $scope.showTaskDetailList = true;
        }

        function selectedTaskDetailError(response) {
            $log.info("Task details error");
        }

        /**
         * On Click of Assign Subject button,
         * get all the unlinked Subject and oprn the popup modal
         */
        function assignEmployee() {
            manageTaskService.getNotLinkedTaskList($scope.selectedTask).then(notLinkedTaskSuccess, notLinkedTaskError);
            $scope.selectedTask.TaskId;
        }

        function notLinkedTaskSuccess(response) {
            $scope.notLinkedEmployees = response.results;
            $scope.Modals.openEmployeeContainer();
        }

        function notLinkedTaskError(response) {
            $log.info("Not linked error");
        }

        /**
         * Below Method is for removing the seleced
         * subject from the list
         */

        function removeSelectedEmployee() {
            var selectedEmployee = [];
            var cookieData = commonService.fetchMainCookieData();
            /**
             * Get all the selected subject and push the selected item to the array,
             * if array is blank, alert for select,
             * else proceed the journey
             */
            $scope.taskListDetails.forEach(function (employee) {
                if (employee.selected) {
                    var employeeID = angular.copy(employee.EmployeeId);
                    var taskID = angular.copy(employee.TaskId);
                    var empdata = {
                        "EmployeeId": employeeID,
                        "TaskId": taskID
                    };
                    empdata = angular.extend({}, cookieData, empdata);
                    selectedEmployee.push(empdata);
                }
            });
            if (selectedEmployee.length === 0) {
                alert("Please Select an employee");
            } else {
                manageTaskService.removeEmployeeFromList(selectedEmployee).then(removeEmployeeSuccess, removeEmployeeError);
            }
        }

        function removeEmployeeSuccess(response) {
            manageTaskService.getTaskListItem($scope.selectedTask).then(selectedTaskDetailSuccess, selectedTaskDetailError);
        }

        function removeEmployeeError(response) {
            console.log("Error");
        }

        /**
         * Toggle all checkboxes,
         * in Manage course Table
         */
        function selectAllTasks() {
            var boolean = true;
            if ($scope.selectAllTaskList) {
                boolean = false;
            }
            angular.forEach($scope.taskListDetails, function (v, k) {
                v.selected = boolean;
                $scope.selectAllTaskList = boolean;
            });
        }

        function toggleTaskDetails() {
            $scope.selectAllTaskList = true;
            angular.forEach($scope.taskListDetails, function (v, k) {
                if (!v.selected) {
                    $scope.selectAllTaskList = false;
                }
            });
        }

        /**
         * Toggle all the checkboxes in,
         * Assign Subject modal popup
         */

        function selectAllNotlinkedListItems() {
            var flag = true;
            if ($scope.selectAllNotlinkedList) {
                flag = false;
            }
            angular.forEach($scope.notLinkedEmployees, function (a, b) {
                a.selected = flag;
                $scope.selectAllNotlinkedList = flag;
            });
        }

        function toggleNotlinkedEmployee() {
            $scope.selectAllNotlinkedList = true;
            angular.forEach($scope.notLinkedEmployees, function (a, b) {
                if (!a.selected) {
                    $scope.selectAllNotlinkedList = false;
                }
            });
        }

        /**
         * Below method will execute, when click
         * on Assign Subject button from popup
         */
        function addEmployeeIntoList() {
            var addEmployeeList = [];
            var cookieData = commonService.fetchMainCookieData();
            /**
             * Get all the selected subject and push the selected item to the array,
             * if array is blank, alert for select,
             * else proceed the journey
             */
            angular.forEach($scope.notLinkedEmployees, function (employee) {
                if (employee.selected) {
                    var taskID = angular.copy($scope.selectedTask.TaskId);
                    var employeeID = angular.copy(employee.EmployeeId);
                    //var subjectCode = angular.copy(subject.SubjectCode);
                    //var subjectName = angular.copy(subject.SubjectName)
                    var empdata = {
                        "TaskId": taskID,
                        "EmployeeId": employeeID
                       
                    };
                    empdata = angular.extend({}, cookieData, empdata);
                    addEmployeeList.push(empdata);
                }
            });
            console.log(addEmployeeList);

            if (addEmployeeList.length !== 0) {
                manageTaskService.addEmployeeInTaskList(addEmployeeList).then(linkEmployeeSuccess, linkEmployeeError);
            } else {
                alert("Please Select an employee");
            }

            function linkEmployeeSuccess(response) {
                manageTaskService.getTaskListItem($scope.selectedTask).then(selectedTaskDetailSuccess, selectedTaskDetailError);
                $scope.Modals.closeModalContainer();
            }

            function linkEmployeeError(response) {
                console.log("Error");
            }
            //if (addSubjectList.length !==0) {
            //    $q.when([managecourseService.addSubjectInCorseList(addSubjectList)]).then(function (data) {
            //            $scope.courseListDetails.push(addSubjectList);
            //            $scope.Modals.closeModalContainer();
            //    },function (error) {
            //            alert("please select a subject");
            //    });
            //}

        }

        /**
         * Add below peice of code for modal opening.
         * @type {{openEmployeeContainer: openEmployeeContainer, closeModalContainer: closeModalContainer}}
         */
        $scope.Modals = {
            openEmployeeContainer: function () {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/App/Templates/ManageTask/manageStaffPopup.html',
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
            closeModalContainer: function () {
                $scope.modalInstance.dismiss();
            }
        };

    }
})
    ();