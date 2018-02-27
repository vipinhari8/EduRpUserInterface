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

        var getNotLinkedCourseList = function (data) {
            return execute('getNotLinkedCourseList', 'get', data);
        };

        var removeSubjectFromList = function(selectedSubject){
            return execute('removeSubjectfromList', 'delete', selectedSubject);
        };

        var addSubjectInCorseList = function (addSubjectList) {
            debugger;
            return execute('addSubjectInList', 'post', addSubjectList);
        };
        var _getCourseSubjectList = function (cid) {
            return execute('getCourseSubjectList', 'get', cid);
        };

        return {
            getCourseList: getCourseList,
            getCourseListItem: getCourseListItem,
            getNotLinkedCourseList : getNotLinkedCourseList,
            removeSubjectFromList : removeSubjectFromList,
            addSubjectInCorseList: addSubjectInCorseList,
            getCourseSubjectList: _getCourseSubjectList
        };

    }

})();