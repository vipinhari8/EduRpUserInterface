(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('employeesListService', employeesListService);

    employeesListService.$inject = ['$q', '$http', 'commonService'];

    function employeesListService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getEmployeesList = function () {
            return execute('getEmployeesList', 'get', null);

        };
        var _addEmployee = function (postData) {
            return execute('addEmployee', 'post', postData);

        };
        var _updateEmployee = function (postData) {
            return execute('updateEmployee', 'put', postData);

        };

        var _deleteEmployee = function (postData) {
            return execute('deleteEmployee', 'delete', postData);

        };

        return {

            getEmployeesList: _getEmployeesList,
            addEmployee: _addEmployee,
            updateEmployee: _updateEmployee,
            deleteEmployee: _deleteEmployee

        };

    }
})();