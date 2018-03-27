(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('studentleaveService', studentleaveService);

    studentleaveService.$inject = ['$q', '$http', 'commonService'];

    function studentleaveService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getstudentleaveList = function () {
            return execute('getstudentleaveList', 'get', null);

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

            getstudentleaveList: _getstudentleaveList
            //addFee: _addFee,
            //updateFee: _updateFee,
            //deleteFee: _deleteFee

        };

    }
})();