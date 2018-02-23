(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('batchMasterService', batchMasterService);

    batchMasterService.$inject = ['$q', '$http', 'commonService'];

    function batchMasterService($q, $http, commonService) {

        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getbatchMasterList = function () {
            return execute('getbatchMasterList', 'get', null);

        };

        var _addbatchMaster = function (postData) {
            return execute('addbatchMaster', 'post', postData);

        };

        var _updatebatchMaster = function (postData) {
            return execute('updatebatchMaster', 'put', postData);

        };

        var _deletebatchMaster = function (postData) {
            return execute('deletebatchMaster', 'delete', postData);

        };

        return {
            getbatchMasterList: _getbatchMasterList,
            addbatchMaster: _addbatchMaster,
            updatebatchMaster: _updatebatchMaster,
            deletebatchMaster: _deletebatchMaster
        };

        var service = {
            getData: getData
        };

        return service;

        function getData() { }


    }
})();