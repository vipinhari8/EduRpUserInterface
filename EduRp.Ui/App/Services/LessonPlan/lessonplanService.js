(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('lessonplanService', lessonplanService);

    lessonplanService.$inject = ['$q', '$http', 'commonService'];

    function lessonplanService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getlessonplanList = function () {
            return execute('getlessonplanList', 'get', null);

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

            getlessonplanList: _getlessonplanList
            //addFee: _addFee,
            //updateFee: _updateFee,
            //deleteFee: _deleteFee

        };

    }
})();