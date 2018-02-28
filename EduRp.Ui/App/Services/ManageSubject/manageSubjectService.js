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
            return execute('getSubjectChapter', 'get', cid);
        };

        var getNotLinkedSubjectList = function (data) {
            return execute('getNotLinkedSubjectList', 'get', data);
        };

        var _removeChapterFromList = function (data) {
            return execute('UnlinkChapter', 'delete', data);
        };

        var _addChapterInSubjectList = function (data) {
            debugger;
            return execute('LinkChapter', 'post', data);
        };
        var _getSubjectChapterList = function (cid) {
            return execute('getSubjectChapterList', 'get', cid);
        };

        return {
            getSubjectList: getSubjectList,
            getSubjectListItem: getSubjectListItem,
            getNotLinkedSubjectList: getNotLinkedSubjectList,
            removeChapterFromList: _removeChapterFromList,
            addChapterInSubjectList: _addChapterInSubjectList,
            getSubjectChapterList: _getSubjectChapterList
        };

    }

})();