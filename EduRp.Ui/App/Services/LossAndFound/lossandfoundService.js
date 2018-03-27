(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('lossandfoundService', lossandfoundService);

    lossandfoundService.$inject = ['$q', '$http', 'commonService'];

    function lossandfoundService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getlossandfoundList = function () {
            return execute('getlossandfoundList', 'get', null);

        };
        //var _addFee = function (postData) {
        //    return execute('addFee', 'post', postData);

        //};
        //var _updateFee = function (postData) {
        //    return execute('updateFee', 'put', postData);

        //};

        //var _deleteFee = function (postData) {
        //    return execute('deleteFee', 'delete', postData);

        //};

        return {

            getlossandfoundList: _getlossandfoundList
            //addFee: _addFee,
            //updateFee: _updateFee,
            //deleteFee: _deleteFee

        };

    }
})();