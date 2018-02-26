(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('manageSubjectService', manageSubjectService);

    manageSubjectService.$inject = ['$q', '$http', 'commonService'];

    function manageSubjectService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var getSubjectList = function () {
            return execute('getSubjectList', 'get', null);
        };


        var getSubjectListItem = function (cid) {
            return execute('getSubjectChapter', 'get', sid);
        };

        var getNotLinkedSubjectList = function (data) {
            return execute('getNotLinkedSubjectList', 'get', data);
        };

        var removeChapterFromList = function (selectedSubject) {
            return execute('removeChapterFromList', 'delete', selectedChapter);
        };

        var addChapterInSubjectList = function (addSubjectList) {
            return execute('addChapterInSubjectList', 'post', addChapterList);
        };
        var _getSubjectChapterList = function (cid) {
            return execute('getCourseSubjectList', 'get', cid);
        };

        return {
            getCourseList: getCourseList,
            getCourseListItem: getCourseListItem,
            getNotLinkedCourseList: getNotLinkedCourseList,
            removeSubjectFromList: removeSubjectFromList,
            addSubjectInCorseList: addSubjectInCorseList,
            getCourseSubjectList: _getCourseSubjectList
        };

    }

})();