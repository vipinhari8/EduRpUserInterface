(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('sharedpropertiesService', sharedpropertiesService);

    sharedpropertiesService.$inject = ['$http'];

    function sharedpropertiesService($http) {

        var admissionnumber = [];

        var _getadmissionnum = function (data) {
            return admissionnumber = data;
        };
        var _getadmissionfrmstdprtl = function() {
            return admissionnumber;
        };

        return {
            getadmissionnum: _getadmissionnum,
            getadmissionfrmstdprtl: _getadmissionfrmstdprtl
        };
    }
})();