(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('studentcharacterService', studentcharacterService);

    studentcharacterService.$inject = ['$q', '$http', 'commonService'];

    function studentcharacterService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getstudentcharacterList = function () {
            return execute('getstudentcharacterList', 'get', null);

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

            getstudentcharacterList: _getstudentcharacterList
            //addFee: _addFee,
            //updateFee: _updateFee,
            //deleteFee: _deleteFee

        };

    }
})();