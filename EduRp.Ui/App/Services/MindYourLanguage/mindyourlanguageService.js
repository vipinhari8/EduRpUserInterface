(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('mindyourlanguageService', mindyourlanguageService);

    mindyourlanguageService.$inject = ['$q', '$http', 'commonService'];

    function mindyourlanguageService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getmindyourlanguageList = function () {
            return execute('getmindyourlanguageList', 'get', null);

        };
        

        return {

            getmindyourlanguageList: _getmindyourlanguageList
            };

    }
})();