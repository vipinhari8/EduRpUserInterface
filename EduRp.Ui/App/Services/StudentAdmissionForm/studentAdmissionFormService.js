﻿(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .factory('studentAdmissionFormService', studentAdmissionFormService);

    studentAdmissionFormService.$inject = ['$q', '$http', 'commonService'];

        function studentAdmissionFormService($q, $http, commonService) {
            var execute = function (url, method, data) {
                return commonService.executeAPICall(url, method, data);
            };

            var _getDynamicFormData = function (data) {
                return execute('getDynamicFormData', 'get', data);
            };

            var _getAdmissionNumber = function () {
                return execute('getAdmissionNumber', 'get', null);
            };
            var _addStudentAdmissionForm = function (postData) {
                return execute('addStudentAdmissionForm', 'put', postData);
            };
            
            var _saveStudentAdmissionForm = function (postData) {
                return execute('saveStudentAdmissionForm', 'put', postData);
            };

            var _getApplicationFormFeeDetail = function (postData) {
                return execute('getApplicationFormFeeDetail', 'get', null);
            };

            var _getApplicationFormHeader = function (postData) {
                return execute('getApplicationFormHeader', 'get', null);
            };

            //function getData() { }

            return {
                getDynamicFormData: _getDynamicFormData,
                getAdmissionNumber: _getAdmissionNumber,
                getApplicationFormFeeDetail: _getApplicationFormFeeDetail,
                getApplicationFormHeader: _getApplicationFormHeader,
                saveStudentAdmissionForm: _saveStudentAdmissionForm,
                addStudentAdmissionForm: _addStudentAdmissionForm
            };
        }
})();



