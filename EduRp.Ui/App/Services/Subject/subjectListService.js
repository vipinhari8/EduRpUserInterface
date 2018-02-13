(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('subjectListService', subjectListService);

    subjectListService.$inject = ['$q', '$http', 'commonService'];

    function subjectListService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getSubjectList = function () {
            return execute('getSubjectList', 'get', null);

        };
        var _addSubject = function (postData) {
            return execute('addSubject', 'post', postData);

        };
        var _updateSubject = function (postData) {
            return execute('updateSubject', 'put', postData);

        };

        var _deleteSubject = function (postData) {
            return execute('deleteSubject', 'delete', postData);

        };

        return {

            getSubjectList : _getSubjectList,
            addSubject : _addSubject,
            updateSubject : _updateSubject,
            deleteSubject : _deleteSubject

        };

    }
})();