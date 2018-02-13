(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('taskListService', taskListService);

    taskListService.$inject = ['$q', '$http', 'commonService'];

    function taskListService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getTaskList = function () {
            return execute('getTaskList', 'get', null);

        };
        var _addTask = function (postData) {
            return execute('addTask', 'post', postData);

        };
        var _updateTask = function (postData) {
            return execute('updateTask', 'put', postData);

        };

        var _deleteTask = function (postData) {
            return execute('deleteTask', 'delete', postData);

        };

        return {

            getTaskList: _getTaskList,
            addTask: _addTask,
            updateTask: _updateTask,
            deleteTask: _deleteTask

        };

    }
})();