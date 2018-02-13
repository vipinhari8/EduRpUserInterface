(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('BulkUploadService', BulkUploadService);

    BulkUploadService.$inject = ['$q', '$http'];

    function BulkUploadService($q, $http) {

        var execute = function (url, method, data) {
            var deferred = $q.defer();

            $http({

                url: urlService[url],
                method: method,
                data: data,
                headers: {
                    "Content-Type": "application/json"
                },
                dataType: 'json'
            }

            ).then(function (data) {
                deferred.resolve(data.data);
            }, function (error) { deferred.reject(error); }


                );
            return deferred.promise;

        }

        var _getBulkModule = function () {
            return execute('getBulkModule', 'get', null);


        };


        return {
            getBulkModule: _getBulkModule

        };

    }

})();