(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('courseListService', courseListService);

    courseListService.$inject = ['$q', '$http', 'commonService'];

    function courseListService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };
        var _getCourseList = function () {
            return execute('getCourseList', 'get', null);
        };
        var _addCourse = function (postData) {
            return execute('addCourse', 'post', postData);
        };
        var _updateCourse = function (postData) {
            return execute('updateCourse', 'put', postData);
        };
        var _deleteCourse = function (postData) {
            return execute('deleteCourse', 'delete', postData);
        };
        return {
            getCourseList: _getCourseList,
            addCourse: _addCourse,
            updateCourse: _updateCourse,
            deleteCourse: _deleteCourse
           
        };

    }

})();