(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('studentdiaryService', studentdiaryService);

    studentdiaryService.$inject = ['$q', '$http', 'commonService'];

    function studentdiaryService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getstudentdiaryList = function () {
            return execute('getstudentdiaryList', 'get', null);

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

            getstudentdiaryList: _getstudentdiaryList
            //addFee: _addFee,
            //updateFee: _updateFee,
            //deleteFee: _deleteFee

        };

    }
})();