(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('scheduleExaminationService', scheduleExaminationService);

    scheduleExaminationService.$inject = ['$q', '$http', 'commonService'];

    function scheduleExaminationService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var getScheduleDetails = function(){
            return execute('getScheduleDetails', 'get', null);
        };


        return {
            getScheduleDetails: getScheduleDetails
        };

    }

})();