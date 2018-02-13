(function () {
    "use strict";

    angular
        .module("common.services",
        ["ngResource"])
        .constant("appSettings",
        {
            serverPath: "http://edurpwebapi20180213021849.azurewebsites.net"
        });
}());

//edurpwebapi20180213021849.azurewebsites.net