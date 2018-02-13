(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('commonService', commonService);

    commonService.$inject = ['$resource', '$q', '$http', '$cookieStore', '$interpolate', '$window'];

    function commonService($resource, $q, $http, $cookieStore, $interpolate, $window) {

        
        var _getFilteredOptions = function (data) {
            var deferred = $q.defer();
            deferred.resolve(result);
            deferred.reject(response);
            return deferred.promise;
        };

        var _removeItemFromArray = function (arr, _name) {
            var index = arr.indexOf(_name);
            arr.splice(index, 1);
            return arr;
        };
        var _fetchMainCookieData = function () {
            var UniversityId = sessionStorage.UniversityId;
            var UserId = sessionStorage.userid;
            var TokenId = sessionStorage.accessToken;

            return { UniversityId: UniversityId, UserId: UserId, TokenId: TokenId };
        };
        var _processAllParamsVal = function (url, method, data) {
            if (['getLinkedCoursesOfProgramStudy',
                'getLinkedFeesOfProgramStudy',
                'getUnlinkedCoursesOfProgramStudy',
                'getUnlinkedFeesOfProgramStudy'].indexOf(url) !== -1) {
                var cd = this.fetchMainCookieData();
                cd.PsId = data.ProgramStudyId;
                return cd;
            }
            else if (['getLinkedProgramStudyOfBatch',
                    'getLinkedFeesOfBatch',
                    'getUnlinkedProgramStudyOfBatch',
                    'getUnlinkedFeesOfBatch'].indexOf(url) !== -1) {
                var cd = this.fetchMainCookieData();
                cd.bId = data.BatchId;
                return cd;
            }  else if (['getCourseSubject', 'getNotLinkedCourseList'].indexOf(url) !== -1) {
                var cd = this.fetchMainCookieData();
                cd.cId = data.CourseId;
                return cd;
            } else if (['getCourseSubjectList'].indexOf(url) !== -1) {
                var cd = this.fetchMainCookieData();
                cd.cId = data.CourseId;
                return cd;
            } else if (['getStdCounsellingDetail'].indexOf(url) !== -1) {
                var cd = this.fetchMainCookieData();
                cd.bId = data.BatchId;
                cd.PsId = data.ProgramStudyId;
                cd.cId = data.CourseId;
                return cd;
            }
            else {
                return this.fetchMainCookieData();
            }
        };

        var _executeAPICall = function (url, method, data) {
            var deferred = $q.defer();
            var manDatoryCookies = this.processAllParamsVal(url, method, data);
            var apiURL = (method === 'get') ? $interpolate(urlService[url])(manDatoryCookies) : urlService[url];
            var finalData = null;
            var parentThis = this.fetchMainCookieData();
            if (method !== 'get') {
                if (angular.isArray(data) && data.length > 1) {
                    angular.forEach(data, function (v, k) {
                        data[k] = angular.extend(v, parentThis);
                    });
                    finalData = data;
                } else if (angular.isArray(data) && data.length === 1) {
                    angular.forEach(data, function (v, k) {
                        finalData = [angular.extend(v, parentThis)];
                    });
                } else {
                    finalData = angular.extend(data, parentThis);
                }
                
            } 
            console.log(finalData);
           $http({
                url: apiURL,
                method: method,
                data: finalData,
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
        };

        var _getMappedObjFromArray = function (arr, key, value) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][key] === value) {
                    return arr[i];
                }
            }
        };

        return {
            //setProfile: setProfile,
            getFilteredOptions: _getFilteredOptions,
            removeItemFromArray: _removeItemFromArray,
            fetchMainCookieData: _fetchMainCookieData,
            executeAPICall: _executeAPICall,
            processAllParamsVal: _processAllParamsVal,
            getMappedObjFromArray: _getMappedObjFromArray
        };

    }

})();