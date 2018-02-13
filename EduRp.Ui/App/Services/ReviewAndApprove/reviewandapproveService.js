(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('reviewandapproveService', reviewandapproveService);

    reviewandapproveService.$inject = ['$q', '$http', 'commonService'];

    function reviewandapproveService($q, $http, commonService) {

        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getreviewandapproveDetail = function (mergedObject) {
            return execute('getreviewandapproveDetail', 'get', mergedObject);

        };

        var _selectBatch = function () {
            return execute('getBatch', 'get', null);

        };
        var _getLinkedProgrmStudiesOfBatch = function (selBatch) {
            return execute('getLinkedProgramStudyOfBatch', 'get', selBatch)
        }

        return {
            getreviewandapproveDetail: _getreviewandapproveDetail,
            selectBatch: _selectBatch,
            getLinkedProgrmStudiesOfBatch: _getLinkedProgrmStudiesOfBatch
        };

    }
})();