(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('managecourseService', managecourseService);

    managecourseService.$inject = ['$q', '$http', 'commonService'];

    function managecourseService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var getCourseList = function () {
            return execute('getCourseList', 'get', null);
        };


        var getCourseListItem = function (cid) {
            return execute('getCourseSubject', 'get', cid);
        };

        var getNotLinkedCourseList = function () {
            return execute('getNotLinkedCourseList', 'get', null);
        };

        var removeSubjectFromList = function(selectedSubject){
            return execute('removeSubjectfromList', 'delete', selectedSubject);
        };

        var addSubjectInCorseList = function(addSubjectList){
            return execute('addSubjectInList', 'post', addSubjectList);
        };

        return {
            getCourseList: getCourseList,
            getCourseListItem: getCourseListItem,
            getNotLinkedCourseList : getNotLinkedCourseList,
            removeSubjectFromList : removeSubjectFromList,
            addSubjectInCorseList : addSubjectInCorseList
        };

    }

})();