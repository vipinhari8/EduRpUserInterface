(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('examinationTypeService', examinationTypeService);

    examinationTypeService.$inject = ['$q', '$http', 'commonService'];

    function examinationTypeService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getExaminationTypeList = function () {
            return execute('getExaminationTypeList', 'get', null);

        };
        var _addExaminationType = function (postData) {
            return execute('addExaminationType', 'post', postData);

        };
        var _updateExaminationType = function (postData) {
            return execute('updateExaminationType', 'put', postData);

        };

        var _deleteExaminationType = function (postData) {
            return execute('deleteExaminationType', 'delete', postData);

        };

        return {

            getExaminationTypeList: _getExaminationTypeList,
            addExaminationType: _addExaminationType,
            updateExaminationType: _updateExaminationType,
            deleteExaminationType: _deleteExaminationType

        };

    }
})();