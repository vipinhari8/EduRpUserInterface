(function () {
    "use strict";
    angular
        .module("EduRpApp")
        .controller("DashBoardListCtrl",
        ["$scope", "dashboardService", "$location", "$rootScope",
            DashBoardListCtrl]);

    function DashBoardListCtrl($scope, dashboardService, $location, $rootScope) {

        var vm = this;
        vm.products = [];
        vm.Message = "";
        GetProducts();

        function GetProducts() {
            var groupResult = dashboardService.get();
            groupResult.then(function (resp) {
                vm.products = resp.data;
                vm.Message = "Call Completed Successfully";
            }, function (err) {
                vm.Message = "Error!!! " + err.status
            });
        };
    }
}());