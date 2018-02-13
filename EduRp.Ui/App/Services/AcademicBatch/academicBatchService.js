(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('academicBatchService', academicBatchService);

    academicBatchService.$inject = ['$q', '$http'];

    function academicBatchService($q, $http) {

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

        var _getAcademicBatchList = function () {
            return execute('getAcademicBatchList', 'get', null);
            

        };

       

        return {
            getAcademicBatchList: _getAcademicBatchList
           
        };

    }

})();