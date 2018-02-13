(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('chaptersListService', chaptersListService);

    chaptersListService.$inject = ['$q', '$http', 'commonService'];

    function chaptersListService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getChaptersList = function () {
            return execute('getChaptersList', 'get', null);

        };
        var _addChapter = function (postData) {
            return execute('addChapter', 'post', postData);

        };
        var _updateChapter = function (postData) {
            return execute('updateChapter', 'put', postData);

        };

        var _deleteChapter = function (postData) {
            return execute('deleteChapter', 'delete', postData);

        };

        return {

            getChaptersList: _getChaptersList,
            addChapter: _addChapter,
            updateChapter: _updateChapter,
            deleteChapter: _deleteChapter

        };

    }
})();