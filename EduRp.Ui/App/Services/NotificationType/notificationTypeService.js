(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('notificationTypeService', notificationTypeService);

    notificationTypeService.$inject = ['$q', '$http'];

    function notificationTypeService($q, $http) {

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

        var _getnotificationTypeList = function () {
            return execute('getnotificationTypeList', 'get', null);


        };


        return {
            getnotificationTypeList: _getnotificationTypeList

        };

    }

})();