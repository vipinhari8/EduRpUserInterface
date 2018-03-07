﻿(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('studentAdmissionFormController', studentAdmissionFormController);

    studentAdmissionFormController.$inject = ['$scope', '$q', '$log', '$routeParams', 'errorHandler', 'studentAdmissionFormService', 'commonService', '$translate', 'programStudyService', 'managecourseService', 'userProfile', '$timeout'];

    function studentAdmissionFormController($scope, $q, $log, $routeParams, errorHandler, studentAdmissionFormService, commonService, $translate, programStudyService, managecourseService, userProfile, $timeout) {

        /* jshint validthis:true */
        var vm = this;
        vm.title = 'studentAdmissionFormController';
        $scope.oneAtATime = true;
        $scope.admissionFormData = [];
        $scope.courseData = [];
        $scope.subjectData = [];

        $scope.selectedProgramStudy = null;
        $scope.selectedCourse = null;
        $scope.selectedSubject = null;
        $scope.programStudyData = [];
        $scope.courseListDetails = undefined;
        $scope.fldRequired = false;
        $scope.admissionNumberRouteParam = $routeParams.admissionNumber;
        $scope.admissionNumber = $routeParams.admissionNumber;
        $scope.mandatoryData = userProfile.getProfile();
        $scope.showThis = 'pageLoad';

        $scope.modAdmissionObj = {};

        $scope.$watch('admissionFormData', function (admfd) {
            angular.forEach(admfd, function (eov, eok) {
                if (eov.open) {
                    if (eov.AppFormGroupLabel === 'grpprogramselect') {
                        $q.all([
                            programStudyService.getProgramStudyList()
                        ]).then(function (data) {
                            $scope.mainContent = true;
                            if (data != null) {
                                $scope.programStudyData = data[0].results;
                            }
                        }, function (reason) {
                            console.log("reason" + reason);
                            errorHandler.logServiceError('programStudyController', reason);
                        }, function (update) {
                            console.log("update" + update);
                            errorHandler.logServiceNotify('programStudyController', update);
                        });
                    }
                    if (eov.AppFormGroupLabel === 'grpfee') {
                        $q.all([
                            studentAdmissionFormService.getApplicationFormFeeDetail({ admissionnumber: $scope.admissionNumber })
                        ]).then(function (data) {
                            $scope.mainContent = true;
                            if (data != null) {
                                $scope.feesData = data[0].results;
                            }
                        }, function (reason) {
                            console.log("reason" + reason);
                            errorHandler.logServiceError('programStudyController', reason);
                        }, function (update) {
                            console.log("update" + update);
                            errorHandler.logServiceNotify('programStudyController', update);
                        });
                    }
                    if (eov.AppFormGroupLabel === 'grpprevedudetails') {
                        $q.all([
                            studentAdmissionFormService.getApplicationFormHeader({ admissionnumber: $scope.admissionNumber })
                        ]).then(function (data) {
                            $scope.mainContent = true;
                            if (data != null) {
                                $scope.paymentsData = data[0].results;
                            }
                        }, function (reason) {
                            console.log("reason" + reason);
                            errorHandler.logServiceError('programStudyController', reason);
                        }, function (update) {
                            console.log("update" + update);
                            errorHandler.logServiceNotify('programStudyController', update);
                        });
                    }
                }

            });

        }, true);



        $scope.$on('topic', function (event, arg) {
            $scope.receiver = 'got your ' + arg;
        });

        $scope.closeAdmissionFormDetails = function (form) {
            //  $scope.modAdmissionObj = null;
        };

        $scope.saveAdmissionFormDetails = function () {
            $scope.fldRequired = false;
            var postData = [];

            $scope.showThis = 'pageLoad';
            angular.forEach($scope.orginalStudentAdmissionFormData, function (v, k) {
                if (v.FieldName === 'fldRegisterationId') {
                    if ($scope.admissionNumber) {
                        v.Value = $scope.admissionNumber;
                    }
                    postData.push(v);
                }
                angular.forEach($scope.modAdmissionObj, function (sv, sk) {
                    if (sk === v.FieldName) {
                        v.Value = $scope.modAdmissionObj[sk];
                        v.TokenId = $scope.mandatoryData.accessToken;
                        v.UniversityId = $scope.mandatoryData.UniversityId;
                        v.UserId = $scope.mandatoryData.userid;
                        postData.push(v);
                    }

                });

            });
            $q.when([studentAdmissionFormService.saveStudentAdmissionForm(postData)]).then(function (data) {
                $scope.showThis = 'mainContent';
            }, function (error) {
                $scope.showThis = 'mainContent';
            });

        };
        $scope.submitAdmissionFormDetails = function (form) {
            $scope.fldRequired = true;
            $scope.showThis = 'pageLoad';
            $timeout(function () {
                if (form.$valid) {
                    var postData = [];

                    angular.forEach($scope.orginalStudentAdmissionFormData, function (v, k) {

                        if (v.FieldName === 'fldRegisterationId') {
                            if ($scope.admissionNumber) {
                                v.Value = $scope.admissionNumber;
                            }
                            postData.push(v);
                        }
                        angular.forEach($scope.modAdmissionObj, function (sv, sk) {
                            if (sk === v.FieldName) {
                                v.Value = $scope.modAdmissionObj[sk];
                                v.TokenId = $scope.mandatoryData.accessToken;
                                v.UniversityId = $scope.mandatoryData.UniversityId;
                                v.UserId = $scope.mandatoryData.userid;
                                postData.push(v);
                            }

                        });

                    });
                    $q.when([studentAdmissionFormService.addStudentAdmissionForm(postData)]).then(function (data) {
                        $scope.showThis = 'mainContent';
                    }, function (error) {
                        $scope.showThis = 'mainContent';
                    });
                } else {

                    $scope.showThis = 'mainContent';
                    alert("Please fill up the all fields data");
                }

            }, 1000);
        };

        $scope.getAdmissionNumber = function (form) {
            $q.when([studentAdmissionFormService.getAdmissionNumber()]).then(function (data) {
                $scope.admissionNumber = data.results[0].AdmissionNumber ? data.results[0].AdmissionNumber : null;
            }, function (error) {

            });

        };

        //function activate() { }
        (function startup() {
            if (!$scope.admissionNumberRouteParam) {
                $scope.fldRequired = false;
                $scope.getAdmissionNumber();
            }
            $q.all([
                studentAdmissionFormService.getDynamicFormData({ admissionnumber: $scope.admissionNumber })
            ]).then(function (data) {
                if (data !== null) {
                    $scope.admissionFormData = [];
                    $scope.orginalStudentAdmissionFormData = data[0].results;
                    angular.forEach(data[0].results, function (std, stk) {
                        var found = 0;
                        $scope.modAdmissionObj[std.FieldName] = std.Value;
                        angular.forEach($scope.admissionFormData, function (admv, admk) {
                            if (admv.AppFormGroupId === std.AppFormGroupId) {
                                found = 1;
                                $scope.admissionFormData[admk]['fields'].push({ AppFormFieldId: std.AppFormFieldId, FieldName: std.FieldName, Value: std.Value });
                            };
                        });
                        if (found === 0) {
                            $scope.admissionFormData.push({ AppFormGroupId: std.AppFormGroupId, AppFormGroupLabel: std.AppFormGroupLabel, "fields": [{ AppFormFieldId: std.AppFormFieldId, FieldName: std.FieldName, Value: std.Value }] })
                        }

                    });
                    $scope.showThis = 'mainContent';
                }
            }, function (reason) {
                errorHandler.logServiceError('studentAdmissionFormController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('studentAdmissionFormController', update);
            });

        })();

        //accordion 3 functionality

        $scope.fetchRelatedDataOfPS = function (psData) {
            var selPS = angular.copy(psData);
            if (selPS) {
                $q.all([
                    programStudyService.getLinkedCoursesOfProgramStudy(selPS)
                ]).then(function (data) {
                    // $scope.mainContentSubPart = true;
                    if (data != null) {
                        $scope.courseData = data[0].results;

                    }
                }, function (reason) {
                    errorHandler.logServiceError('programStudyController', reason);
                });
            } else {
                alert("Please select a course");
            }
        };

        $scope.fetchRelatedDataOfCourse = function (psData) {
            var selPS = angular.copy(psData);
            if (selPS) {
                $q.all([
                    managecourseService.getCourseSubjectList(selPS)
                ]).then(function (data) {
                    // $scope.mainContentSubPart = true;
                    if (data != null) {
                        $scope.subjectData = data[0].results;
                    }
                }, function (reason) {
                    errorHandler.logServiceError('manageCourseController', reason);
                });
            } else {
                alert("Please select a course");
            }
        };

        $scope.resetForm = function () {
            $scope.student = angular.copy($scope.OrginalAdmissionObj);
        };
    };

})();