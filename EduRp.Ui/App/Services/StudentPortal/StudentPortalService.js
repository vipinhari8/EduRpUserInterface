(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('StudentPortalService', StudentPortalService);

    StudentPortalService.$inject = ['$q', '$http', 'commonService'];

    function StudentPortalService($q, $http, commonService) {

        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getAdmissionList = function () {
            return execute('getAdmissionList', 'get', null);

        };

        return {
            getAdmissionList: _getAdmissionList,
        };
    }
})();