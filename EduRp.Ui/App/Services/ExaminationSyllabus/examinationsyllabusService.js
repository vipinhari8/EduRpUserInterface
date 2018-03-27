(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('examinationsyllabusService', examinationsyllabusService);

    examinationsyllabusService.$inject = ['$q', '$http', 'commonService'];

    function examinationsyllabusService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getexaminationsyllabusList = function () {
            return execute('getexaminationsyllabusList', 'get', null);

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

            getexaminationsyllabusList: _getexaminationsyllabusList
            //addFee: _addFee,
            //updateFee: _updateFee,
            //deleteFee: _deleteFee

        };

    }
})();