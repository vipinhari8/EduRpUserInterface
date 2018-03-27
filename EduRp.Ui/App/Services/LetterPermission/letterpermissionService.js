(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('letterpermissionService', letterpermissionService);

    letterpermissionService.$inject = ['$q', '$http', 'commonService'];

    function letterpermissionService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getletterpermissionList = function () {
            return execute('getletterpermissionList', 'get', null);

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

            getletterpermissionList: _getletterpermissionList
            //addFee: _addFee,
            //updateFee: _updateFee,
            //deleteFee: _deleteFee

        };

    }
})();