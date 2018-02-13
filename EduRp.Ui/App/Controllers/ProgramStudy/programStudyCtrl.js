(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('programStudyController', programStudyController);

    programStudyController.$inject = ['$scope', '$q', 'programStudyService', 'errorHandler', '$modal'];

    function programStudyController($scope, $q, programStudyService, errorHandler, $modal) {

        $scope.courseData = [];
        $scope.filteredCourseData = [];
        $scope.courseCurrentPage = 1, $scope.courseNumPerPage = 10, $scope.courseMaxSize = 5;
        $scope.courseOrderByField = 'CourseName';
        $scope.courseReverseSort = false;
        $scope.selectedProgramStudy = null;

        $scope.adjustCourseList = function () {
            var begin = (($scope.courseCurrentPage - 1) * $scope.courseNumPerPage)
                , end = begin + $scope.courseNumPerPage;

            $scope.filteredCourseData = angular.copy($scope.courseData.slice(begin, end));
        };
        $scope.$watch('courseCurrentPage + courseNumPerPage', function () {
            $scope.adjustCourseList();
        });


        $scope.feesData = [];
        $scope.filteredFeesData = [];
        $scope.feesCurrentPage = 1, $scope.feesNumPerPage = 10, $scope.feesMaxSize = 5;
        $scope.feesOrderByField = 'CourseName';
        $scope.feesReverseSort = false;

        $scope.adjustFeesList = function () {
            var begin = (($scope.feesCurrentPage - 1) * $scope.feesNumPerPage)
                , end = begin + $scope.feesNumPerPage;

            $scope.filteredFeesData = angular.copy($scope.feesData.slice(begin, end));
        };
        $scope.$watch('feesCurrentPage + feesNumPerPage', function () {
            $scope.adjustFeesList();
        });

        $scope.showPerPageDataOptions = [10, 25, 50, 100];

        $scope.addPSFormObj = {status: "Active"};

        $scope.modCourseObj = {};
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.unlinkedCoursesOfPSList = null;
        $scope.unlinkedFeesOfPSList = null;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };

        $scope.addProgramStudyContainer = function () {
            $scope.Modals.open('App/Templates/ProgramStudy/addProgramStudy.html');
        };
        $scope.assignCoursesContainer = function () {
            $q.all([programStudyService.getUnlinkedCoursesOfProgramStudy()]).then(function (data) {
                $scope.unlinkedCoursesOfPSList = data[0].results;
                console.log($scope.unlinkedCoursesOfPSList);
            }, function () {

                });

            $scope.Modals.open('App/Templates/ProgramStudy/assignCourses.html');
        };
        $scope.assignFeesContainer = function () {
            $q.all([programStudyService.getUnlinkedFeesOfProgramStudy()]).then(function (data) {
                $scope.unlinkedFeesOfPSList = data[0].results;
            }, function () {

            });
            $scope.Modals.open('App/Templates/ProgramStudy/assignFees.html');
        };

        $scope.addProgramStudy = function (form) {
            if (form.$valid) {
                $q.when(programStudyService.addProgramStudy($scope.addPSFormObj)).then(function (success) {
                    $scope.Modals.close();
                    $scope.programStudyData.push($scope.addPSFormObj);
                    $scope.filteredProgramStudyData.push($scope.addPSFormObj);
                }, function (error) {

                });
            }
        };
       
        $scope.getCourseDetailsSuccess = function (data) {
            console.log("course data => " + data);
            $scope.courseData = data.results;

            
            $scope.adjustCourseList();
        };
        $scope.getCourseDetailsError = function (data) {
            console.log(data);
        };
        

        $scope.editCourseContainer = function (data) {
            $scope.modalType = 'update';
            $scope.modCourseObj = data;
            $('#course-modal-popup').modal({
                show: 'true'
            });
        };

        $scope.addCourseContainer = function (data) {
            $scope.modalType = 'add';
            $scope.modCourseObj = data;
            $scope.Modals.open();
        };

        $scope.updateCourseDetailsSuccess = function (data) {
            $('#course-modal-popup').modal({
                show: 'false'
            });
        };

        $scope.updateCourseDetailsError = function (data) {
            $('#course-modal-popup').modal({
                show: 'false'
            });
        };


        $scope.updateCourseDetails = function () {
            console.log($scope.modCourseObj);
            var postData = {
                "batchUpdateData":
                [{
                    "DegreeId": $scope.modCourseObj,
                    "DegreeName": $scope.modCourseObj,
                    "UniversityId": $scope.modCourseObj,
                    "CourseId": $scope.modCourseObj,
                    "CourseCode": $scope.modCourseObj,
                    "CourseName": $scope.modCourseObj,
                    "IsActive": $scope.modCourseObj,
                    "TOTAL": $scope.modCourseObj
                }]
            };
           
        };
        $scope.addCourseDetailsSuccess = function (data) {
            $('#course-modal-popup').modal({
                show: 'false'
            });
        };

        $scope.addCourseDetailsError = function (data) {
            $('#course-modal-popup').modal({
                show: 'false'
            });
        };
        $scope.addCourseDetails = function () {
            var postData = {
                "batchInsertData":
                [{
                    "DegreeId": $scope.modCourseObj,
                    "DegreeName": $scope.modCourseObj,
                    "UniversityId": $scope.modCourseObj,
                    "CourseId": $scope.modCourseObj,
                    "CourseCode": $scope.modCourseObj,
                    "CourseName": $scope.modCourseObj,
                    "IsActive": $scope.modCourseObj,
                    "TOTAL": $scope.modCourseObj
                }]
            };
            
        };


         (function startup() {
			 
              $q.all([
                  programStudyService.getProgramStudyList(),
                  programStudyService.getCourseList(),
                  programStudyService.getFeesList()
              ]).then(function (data) {
                 
                if (data != null) {
                    $scope.programStudyData = data[0].results;
                    if (data[0].results.length < 5 && data[0].results.length > 0) {
                        $scope.filteredProgramStudyData = data[0].results;
                        $scope.selectedProgramStudy = data[0].results[0];
                    } else if (data[0].results.length > 5) {
                        $scope.selectedProgramStudy = data[0].results[0];
                        $scope.filteredProgramStudyData = angular.copy(data[0].results.slice(0, 5));
                        $scope.filteredProgramStudyData.push({
                            "id": null,
                            "degreeCode": "Other",
                            "degreeName": "Other",
                            "academic_term": null,
                            "sks": null,
                            "active": null
                        });
                    } 
                   

                    $scope.courseData = data[1].results;
                    $scope.adjustCourseList();

                    $scope.feesData = data[2].results;
                    $scope.adjustFeesList();
                }
                  }, function (reason) {
                      console.log("reason" + reason);
                      errorHandler.logServiceError('programStudyController', reason);
                  }, function (update) {
                      console.log("update" + update);
                      errorHandler.logServiceNotify('programStudyController', update);
            });
        })();

        function removeContact(contactId) {
            for (var i = 0; i < $scope.contacts.length; i++) {
                if ($scope.contacts[i].id == contactId) {
                    $scope.contacts.splice(i, 1);
                    break;
                }
            }
        };

        $scope.contacts = [];

        $scope.Commands = {
            saveContact: function (contact) {
                ContactService.addContact(contact).then(
                    function (result) {
                        $scope.contacts.push(result.data);
                    },
                    function (response) {
                        console.log(response);
                    });
            },
            updateContact: function (contact) {
                ContactService.updateContact(contact).then(
                    function (result) {

                    },
                    function (response) {
                        console.log(response);
                    });
            }
        };

        $scope.Queries = {
            getContacts: function () {
                ContactService.getContacts();
            },
            getContactById: function (contactId) {
                ContactService.getContactById(contactId);
            }
        };

        $scope.Modals = {
            open: function (url) {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: url,
                    size: 'lg',
                    scope: $scope,
                    backdrop: 'static'
                });

                $scope.modalInstance.result.then(
                    function (contact) {
                        if (contact.id != null) {
                            $scope.Commands.updateContact(contact);
                        }
                        else {
                            $scope.Commands.saveContact(contact);
                        }
                    },
                    function (event) {

                    });
            },
            close: function () {
                $scope.modalInstance.dismiss();
            }
        };


        

    };
})
();