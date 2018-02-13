(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('studentAdmissionFormController', studentAdmissionFormController);

    studentAdmissionFormController.$inject = ['$scope', '$q', '$log', 'errorHandler', 'studentAdmissionFormService', 'commonService', '$translate', 'programStudyService','manageCourseService'];

    function studentAdmissionFormController($scope, $q, $log, errorHandler, studentAdmissionFormService, commonService, $translate, programStudyService, manageCourseService) {

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

        $scope.modAdmissionObj = {};

        $scope.$watch('admissionFormData[0].open', function (isOpen) {
            if (isOpen) {

                console.log('First group was opened');
            }
        });

        $scope.$watch('admissionFormData[1].open', function (isOpen) {
            if (isOpen) {
                
                console.log('Second group was opened');
            }
        });
        // accordion 3 open 
        $scope.$watch('admissionFormData[2].open', function (isOpen) {
         
            if (isOpen) {

                $q.all([
                    programStudyService.getProgramStudyList()
                ]).then(function (data) {
                    $scope.mainContent = true;
                    if (data != null) {
                        $scope.programStudyData = data[0].results;
                        console.log($scope.programStudyData);
                    }
                }, function (reason) {
                    console.log("reason" + reason);
                    errorHandler.logServiceError('programStudyController', reason);
                }, function (update) {
                    console.log("update" + update);
                    errorHandler.logServiceNotify('programStudyController', update);
                });

                console.log('Third group was opened');
            }
        });

        $scope.$watch('admissionFormData[3].open', function (isOpen) {
            if (isOpen) {
                console.log('Fourth group was opened'); 

            }
        });

        $scope.$watch('admissionFormData[4].open', function (isOpen) {
            if (isOpen) {

                console.log('Fourth group was opened');
            }
        });

        $scope.$on('topic', function (event, arg) {
            $scope.receiver = 'got your ' + arg;
            console.log($scope.receiver);
        });


        $scope.addAdmissionFormDetails = function (form) {
                $q.when([studentAdmissionFormService.addStudentAdmissionForm($scope.modAdmissionObj)]).then(function (data) {
                    
                }, function (error) {

                });

        };

        $scope.getAdmissionNumber = function (form) {
            $q.when([studentAdmissionFormService.getAdmissionNumber()]).then(function (data) {
               
            }, function (error) {

            });

        };

        //function activate() { }
        (function startup() {

            $q.all([
                studentAdmissionFormService.getDynamicFormData()
            ]).then(function (data) {
                if (data !== null) {
                    $scope.admissionFormData =[];
                    angular.forEach(data[0].results, function (std,stk) {
                        


                    });
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
                    studentAdmissionFormService.getCourseSubjectList(selPS)
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