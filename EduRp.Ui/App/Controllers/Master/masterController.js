(function () {
    'use strict';

    angular
        .module('app')
        .controller('masterController', masterController);

    masterController.$inject = ['$location'];

    function masterController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'masterController';

        activate();

        function activate() { }
    }
})();
