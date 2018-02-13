(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('classRoomListService', classRoomListService);

    classRoomListService.$inject = ['$q', '$http', 'commonService'];

    function classRoomListService($q, $http, commonService) {
        var execute = function (url, method, data) {
            return commonService.executeAPICall(url, method, data);
        };

        var _getClassRoomList = function () {
            return execute('getClassRoomList', 'get', null);

        };
        var _addClassRoom = function (postData) {
            return execute('addClassRoom', 'post', postData);

        };
        var _updateClassRoom = function (postData) {
            return execute('updateClassRoom', 'put', postData);

        };

        var _deleteClassRoom = function (postData) {
            return execute('deleteClassRoom', 'delete', postData);

        };

        return {

            getClassRoomList: _getClassRoomList,
            addClassRoom: _addClassRoom,
            updateClassRoom: _updateClassRoom,
            deleteClassRoom: _deleteClassRoom

        };

    }
})();