(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('manageTaskService', manageTaskService);

    manageTaskService.$inject = ['$q', '$http', 'commonService'];

    function manageTaskService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var getTaskList = function () {
            return execute('getTaskList', 'get', null);
        };


        var getTaskListItem = function (tid) {
            return execute('getTaskStaffList', 'get',tid);
        };

        var getNotLinkedTaskList = function () {
            return execute('getNotLinkedTaskList', 'get', null);
        };

        var removeEmployeefromList = function (selectedEmployee) {
            return execute('removeEmployeefromList', 'delete', selectedEmployee);
        };

        var addEmployeeInTaskList = function (addEmployeeList) {
            return execute('addEmployeeInList', 'post', addEmployeeList);
        };

        return {
            getTaskList: getTaskList,
            getTaskListItem: getTaskListItem,
            getNotLinkedTaskList: getNotLinkedTaskList,
            removeEmployeefromList: removeEmployeefromList,
            addEmployeeInTaskList: addEmployeeInTaskList
        };

    }

})();
