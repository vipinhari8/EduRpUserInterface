(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('meritanddemeritService', meritanddemeritService);

    meritanddemeritService.$inject = ['$q', '$http', 'commonService'];

    function meritanddemeritService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getmeritanddemeritList = function () {
            return execute('getmeritanddemeritList', 'get', null);

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

            getmeritanddemeritList: _getmeritanddemeritList
            //addFee: _addFee,
            //updateFee: _updateFee,
            //deleteFee: _deleteFee

        };

    }
})();