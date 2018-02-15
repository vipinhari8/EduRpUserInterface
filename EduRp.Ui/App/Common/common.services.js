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

//http://edurpwebapi20180213021849.azurewebsites.net
//http://localhost:50381 