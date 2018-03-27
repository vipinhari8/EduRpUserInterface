﻿(function () {
     'use strict';

    angular
        .module('EduRpApp')
        .directive('ngFiles', ['$parse', function ($parse) {

            function fn_link(scope, element, attrs) {
                var onChange = $parse(attrs.ngFiles);
                element.on('change', function (event) {
                    onChange(scope, { $files: event.target.files });
                });
            };

            return {
                link: fn_link
            }
        }])
        .controller('studentAdmissionFormController', studentAdmissionFormController);

    studentAdmissionFormController.$inject = ['$scope', '$q', '$log', '$routeParams', 'errorHandler', 'studentAdmissionFormService', 'commonService', '$translate', 'programStudyService', 'managecourseService', 'userProfile', '$timeout', 'sharedpropertiesService', 'batchMasterService', 'manageStudentCounsellingDetailService', '$http'];

    function studentAdmissionFormController($scope, $q, $log, $routeParams, errorHandler, studentAdmissionFormService, commonService, $translate, programStudyService, managecourseService, userProfile, $timeout, sharedpropertiesService, batchMasterService, manageStudentCounsellingDetailService, $http) {
        var formdata = new FormData();

        $scope.getTheFiles = function ($files) {
            angular.forEach($files, function (value, key) {
                formdata.append(key, value);
            });
        };

        // NOW UPLOAD THE FILES.
        $scope.uploadFiles = function () {
            var PrefixUrl = 'http://edurpwebapi20180213021849.azurewebsites.net';
            //var PrefixUrl = 'https://edurpstorage.file.core.windows.net/primeone/admission';
            var request = {
                method: 'POST',
                url: PrefixUrl + '/Image/upload',
                data: formdata,
                headers: {
                    'Content-Type': undefined
                }
            };

            // SEND THE FILES.
            $http(request)
                .success(function (d) {
                    alert(d);
                })
                .error(function () {
                });
        }

        /* jshint validthis:true */
        var vm = this;
        vm.title = 'studentAdmissionFormController';
        $scope.oneAtATime = true;
        $scope.admissionFormData = [];
        $scope.batchListItem = [];
        $scope.courseData = [];
        $scope.subjectData = [];
        $scope.AdmNumArray = [];
        $scope.sharedproperties = [];
        $scope.ApplicationFormId= null;

        $scope.selectedProgramStudy = null;
        $scope.selectedBatch = null;
        $scope.selectedCourse = null;
        $scope.programStudyData = [];
        $scope.courseListDetails = undefined;
        $scope.fldRequired = false;
        $scope.admissionNumberRouteParam = $routeParams.admissionNumber;
        $scope.admissionNumber = $routeParams.admissionNumber;
        $scope.mandatoryData = userProfile.getProfile();
        $scope.showThis = 'pageLoad';

        $scope.fetchProgramStudyByBatchId = fetchProgramStudyByBatchId;
        $scope.fetchCourseByProgramStudyId = fetchCourseByProgramStudyId;

        $scope.modAdmissionObj = {};

        //$scope.$watch('admissionFormData', function (admfd) {
        //    angular.forEach(admfd, function (eov, eok) {
        //        if (eov.open) {
        //            if (eov.AppFormGroupLabel === 'grpprogramselect') {
        //                $q.all([
        //                    programStudyService.getProgramStudyList()
        //                ]).then(function (data) {
        //                    $scope.mainContent = true;
        //                    if (data != null) {
        //                        $scope.programStudyData = data[0].results;
        //                    }
        //                }, function (reason) {
        //                    console.log("reason" + reason);
        //                    errorHandler.logServiceError('programStudyController', reason);
        //                }, function (update) {
        //                    console.log("update" + update);
        //                    errorHandler.logServiceNotify('programStudyController', update);
        //                });
        //            }
        //            if (eov.AppFormGroupLabel === 'grpfee') {
        //                $q.all([
        //                    studentAdmissionFormService.getApplicationFormFeeDetail({ admissionnumber: $scope.admissionNumber })
        //                ]).then(function (data) {
        //                    $scope.mainContent = true;
        //                    if (data != null) {
        //                        $scope.feesData = data[0].results;
        //                    }
        //                }, function (reason) {
        //                    console.log("reason" + reason);
        //                    errorHandler.logServiceError('programStudyController', reason);
        //                }, function (update) {
        //                    console.log("update" + update);
        //                    errorHandler.logServiceNotify('programStudyController', update);
        //                });
        //            }
        //            if (eov.AppFormGroupLabel === 'grpprevedudetails') {
        //                $q.all([
        //                    studentAdmissionFormService.getApplicationFormHeader({ admissionnumber: $scope.admissionNumber })
        //                ]).then(function (data) {
        //                    $scope.mainContent = true;
        //                    if (data != null) {
        //                        $scope.paymentsData = data[0].results;
        //                    }
        //                }, function (reason) {
        //                    console.log("reason" + reason);
        //                    errorHandler.logServiceError('programStudyController', reason);
        //                }, function (update) {
        //                    console.log("update" + update);
        //                    errorHandler.logServiceNotify('programStudyController', update);
        //                });
        //            }
        //        }

        //    });

        //}, true);
        
        //$scope.$on('topic', function (event, arg) {
        //    $scope.receiver = 'got your ' + arg;
        //});

        $scope.closeAdmissionFormDetails = function (form) {
            //  $scope.modAdmissionObj = null;
        };

        $scope.saveAdmissionFormDetails = function (form) {
            $scope.fldRequired = false;
            var postData = [];

            $scope.showThis = 'pageLoad';
            angular.forEach($scope.orginalStudentAdmissionFormData, function (v, k) {
                if (v.FieldName === 'fldRegisterationId') {
                    if ($scope.admissionNumber) {
                        v.Value = $scope.admissionNumber;
                    }
                     $scope.ApplicationFormId = v.ApplicationFormId;
                    //postData.push(v);
                }
                angular.forEach($scope.modAdmissionObj, function (sv, sk) {
                    var appformId = $scope.ApplicationFormId;
                    if (sk === v.FieldName) {
                        v.ApplicationFormId = appformId;
                        v.Value = $scope.modAdmissionObj[sk];
                        v.TokenId = $scope.mandatoryData.accessToken;
                        v.UniversityId = $scope.mandatoryData.UniversityId;
                        v.UserId = $scope.mandatoryData.userid;
                        v.Status = "0";
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
            $scope.fldRequired = false;
            var postData = [];

            $scope.showThis = 'pageLoad';
            angular.forEach($scope.orginalStudentAdmissionFormData, function (v, k) {
                if (v.FieldName === 'fldRegisterationId') {
                    if ($scope.admissionNumber) {
                        v.Value = $scope.admissionNumber;
                    }
                    $scope.ApplicationFormId = v.ApplicationFormId;
                    //postData.push(v);
                }
                angular.forEach($scope.modAdmissionObj, function (sv, sk) {
                    var appformId = $scope.ApplicationFormId;
                    if (sk === v.FieldName) {
                        v.ApplicationFormId = appformId;
                        v.Value = $scope.modAdmissionObj[sk];
                        v.TokenId = $scope.mandatoryData.accessToken;
                        v.UniversityId = $scope.mandatoryData.UniversityId;
                        v.UserId = $scope.mandatoryData.userid;
                        v.Status = "1";
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

        $scope.getAdmissionNum = function () {
            $q.all([studentAdmissionFormService.getAdmissionNumber()]).then(function (data) {
                if (data !== null){
                    $scope.AdmNumArray = data[0].results;
                    console.log($scope.AdmNumArray);
                    $scope.getFormLabels();
                }
            }, function (error) {

            });
        };

        $scope.getFormLabels = function () {
            $q.all([
                studentAdmissionFormService.getDynamicFormData($scope.AdmNumArray)
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
                            $scope.admissionFormData.push({ AppFormGroupId: std.AppFormGroupId, AppFormGroupLabel: std.AppFormGroupLabel, AppFormGroupName: std.AppFormGroupName, "fields": [{ AppFormFieldId: std.AppFormFieldId, FieldName: std.FieldName, Value: std.Value }] })
                        }

                    });
                    $scope.showThis = 'mainContent';
                }
            }, function (reason) {
                errorHandler.logServiceError('studentAdmissionFormController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('studentAdmissionFormController', update);
            });
        };
       
        //function activate() { }
        (function startup() {

            $scope.AdmNumArray = sharedpropertiesService.getadmissionfrmstdprtl();

            if ($scope.AdmNumArray.AdmissionNumber.length == 0) {
                $scope.getAdmissionNum();
            }
            $scope.getFormLabels();
            batchMasterService.getbatchMasterList().then(batchListSuccess, batchListError);

        })();

        //accordion 3 functionality


        function batchListSuccess(response) {
            $scope.batchListItem = response.results;
        }

        function batchListError(response) {
            $log.info("Batch list item error in batchMasterController");
        }

        function fetchProgramStudyByBatchId(batchData) {
            debugger
            var selBatch = angular.copy(batchData);
            if (selBatch) {
                $q.all([
                    manageStudentCounsellingDetailService.getLinkedProgrmStudiesOfBatch(selBatch)
                ]).then(function (data) {
                    // $scope.mainContentSubPart = true;
                    if (data !== null) {
                        $scope.programStudyData = data[0].results;
                        $scope.modAdmissionObj.fldbatchid = data[0].results[0].BatchId;
                        $scope.modAdmissionObj.fldprogramstudyid = data[0].results[0].ProgramStudyId;
                    }
                }, function (reason) {
                    errorHandler.logServiceError('programStudyController', reason);
                });
            } else {
                alert("Please select a batch");
            }
        }

        function fetchCourseByProgramStudyId(psData) {
            var selPS = angular.copy(psData);
            if (selPS) {
                $q.all([
                    programStudyService.getLinkedCoursesOfProgramStudy(selPS)
                ]).then(function (data) {
                    // $scope.mainContentSubPart = true;
                    if (data !== null) {
                        $scope.courseData = data[0].results;
                        $scope.modAdmissionObj.fldcourseid = data[0].results[0].CourseId;
                    }
                }, function (reason) {
                    errorHandler.logServiceError('programStudyController', reason);
                });
            } else {
                alert("Please select a program");
            }
        }

        $scope.resetForm = function () {
            $scope.student = angular.copy($scope.OrginalAdmissionObj);
        };
    };
//-----------------------------------------------------------------------------------------
   

})();