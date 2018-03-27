(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('physicaleducationService', physicaleducationService);

    physicaleducationService.$inject = ['$q', '$http', 'commonService'];

    function physicaleducationService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getphysicaleducationList = function () {
            return execute('getphysicaleducationList', 'get', null);

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

            getphysicaleducationList: _getphysicaleducationList
            //addFee: _addFee,
            //updateFee: _updateFee,
            //deleteFee: _deleteFee

        };

    }
})();