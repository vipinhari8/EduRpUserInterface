(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('manageStudentCounsellingDetailService', manageStudentCounsellingDetailService);

    manageStudentCounsellingDetailService.$inject = ['$q', '$http', 'commonService'];

    function manageStudentCounsellingDetailService($q, $http, commonService) {

        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getStdCounsellingDetail = function (mergedObject) {
            return execute('getStdCounsellingDetail', 'get', mergedObject);

        };

        var _selectBatch = function () {
            return execute('getBatch', 'get', null);

        };
        var _getLinkedProgrmStudiesOfBatch = function (selBatch) {
            return execute('getLinkedProgramStudyOfBatch', 'get', selBatch)
        }

        return {
            getStdCounsellingDetail: _getStdCounsellingDetail,
            selectBatch: _selectBatch,
            getLinkedProgrmStudiesOfBatch: _getLinkedProgrmStudiesOfBatch
        };

    }
})();