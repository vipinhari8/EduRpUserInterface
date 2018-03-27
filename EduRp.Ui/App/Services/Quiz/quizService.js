(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('quizService', quizService);

    quizService.$inject = ['$q', '$http', 'commonService'];

    function quizService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getquizList = function () {
            return execute('getquizList', 'get', null);

        };
       

        return {

            getquizList: _getquizList
           
        };

    }
})();