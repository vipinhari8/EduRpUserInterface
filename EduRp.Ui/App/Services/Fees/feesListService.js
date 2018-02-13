(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('feesListService', feesListService);

    feesListService.$inject = ['$q', '$http', 'commonService'];

    function feesListService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getFeesList = function () {
            return execute('getFeesList', 'get', null);

        };
        var _addFee = function (postData) {
            return execute('addFee', 'post', postData);

        };
        var _updateFee = function (postData) {
            return execute('updateFee', 'put', postData);

        };

        var _deleteFee = function (postData) {
            return execute('deleteFee', 'delete', postData);

        };

        return {

            getFeesList: _getFeesList,
            addFee: _addFee,
            updateFee: _updateFee,
            deleteFee: _deleteFee

        };

    }
})();