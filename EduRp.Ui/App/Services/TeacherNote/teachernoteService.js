(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('teachernoteService', teachernoteService);

    teachernoteService.$inject = ['$q', '$http', 'commonService'];

    function teachernoteService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getteachernoteList = function () {
            return execute('getteachernoteList', 'get', null);

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

            getteachernoteList: _getteachernoteList
            //addFee: _addFee,
            //updateFee: _updateFee,
            //deleteFee: _deleteFee

        };

    }
})();