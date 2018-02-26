(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('PrgmStudyMasterService', PrgmStudyMasterService);

    PrgmStudyMasterService.$inject = ['$q', '$http', 'commonService'];

    function PrgmStudyMasterService($q, $http, commonService) {

        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getPrgmStudyMasterList = function () {
            return execute('getPrgmStudyMasterList', 'get', null);

        };

        var _addPrgmStudyMaster = function (postData) {
            return execute('addPrgmStudyMaster', 'post', postData);

        };

        var _updatePrgmStudyMaster = function (postData) {
            return execute('updatePrgmStudyMaster', 'put', postData);

        };

        var _deletePrgmStudyMaster = function (postData) {
            return execute('deletePrgmStudyMaster', 'delete', postData);

        };

        return {
            getPrgmStudyMasterList: _getPrgmStudyMasterList,
            addPrgmStudyMaster: _addPrgmStudyMaster,
            updatePrgmStudyMaster: _updatePrgmStudyMaster,
            deletePrgmStudyMaster: _deletePrgmStudyMaster
        };


        var service = {
            getData: getData
        };

        return service;

        function getData() { }
    }
})();