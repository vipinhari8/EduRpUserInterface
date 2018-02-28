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


        var getTaskListItem = function (data) {
            return execute('getTaskEmployee', 'get', data);
        };

        var getNotLinkedTaskList = function (data) {
            return execute('getNotLinkedTaskList', 'get', data);
        };

        var removeEmployeeFromList = function (data) {
            return execute('removeEmployeeFromList', 'delete', data);
        };

        var addEmployeeInTaskList = function (data) {
            debugger;
            return execute('addEmployeeInTaskList', 'post', data);
        };
        //var _getTaskEmployeeList = function (data) {
        //    return execute('getTaskEmployeeList', 'get', data);
        //};

        return {
            getTaskList: getTaskList,
            getTaskListItem: getTaskListItem,
            getNotLinkedTaskList: getNotLinkedTaskList,
            removeEmployeeFromList: removeEmployeeFromList,
            addEmployeeInTaskList: addEmployeeInTaskList
            //getTaskEmployeeList: _getTaskEmployeeList
        };

    }

})();