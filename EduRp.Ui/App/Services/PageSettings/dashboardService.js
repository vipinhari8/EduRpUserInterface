(function () {
    "use strict";
    angular
        .module("common.services")
        .factory("dashboardService", ["$http", "appSettings", "userProfile",
            dashboardService])

    function dashboardService($http, appSettings, userProfile) {
        this.get = function () {
            var authHeaders = userProfile.getAuthHeaders();
            var response = $http({
                url: appSettings.serverPath + "/api/account/getuser",
                method: "GET",
                headers: authHeaders
            });
            return response;
        };

        return {
            get: this.get
        }
    }
})();