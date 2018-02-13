(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('studentAdmissionFormService', studentAdmissionFormService);

    studentAdmissionFormService.$inject = ['$q', '$http', 'commonService'];

        function studentAdmissionFormService($q, $http, commonService) {
            var execute = function (url, method, data) {
                return commonService.executeAPICall(url, method, data);
            };

            var _getDynamicFormData = function () {
                return execute('getDynamicFormData','get', null);
            };

            var _getAdmissionNumber = function () {
                return execute('getDynamicFormData', 'get', null);
            };

            var _addStudentAdmissionForm = function (postData) {
                debugger;
                return execute('addStudentAdmissionForm', 'post', postData);

            };
            var _getCourseSubjectList = function (cid) {
                return execute('getCourseSubjectList', 'get', cid);
            };

            //function getData() { }

            return {

                getDynamicFormData: _getDynamicFormData,
                getAdmissionNumber: _getAdmissionNumber,
                addStudentAdmissionForm: _addStudentAdmissionForm,
                getCourseSubjectList: _getCourseSubjectList

            };
        }
})();



