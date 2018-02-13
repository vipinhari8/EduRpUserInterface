(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('programStudyController', programStudyController);

    programStudyController.$inject = ['$scope', '$q', 'programStudyService', 'errorHandler', '$modal', '$translate','commonService'];

    function programStudyController($scope, $q, programStudyService, errorHandler, $modal, $translate, commonService) {

        $scope.courseData = [];
        $scope.filteredCourseData = [];
        $scope.courseCurrentPage = 1;
        $scope.courseNumPerPage = 5;
        $scope.courseMaxSize = 5;
        $scope.assignedCoursesOrderByField = 'CourseName';
        $scope.assignedCoursesReverseSort = false;
        $scope.nonAssignedCoursesOrderByField = 'CourseName';
        $scope.nonAssignedCoursesReverseSort = false;
        $scope.selectedProgramStudy = null;
        $scope.mainContent = false;
        $scope.mainContentSubPart = false;
        $scope.linkedCoursesSelectedArr = [];
        $scope.unlinkedCoursesSelectedArr = [];
        $scope.adjustCourseList = function () {
            var begin = (($scope.courseCurrentPage - 1) * $scope.courseNumPerPage)
                , end = begin + $scope.courseNumPerPage;

            $scope.filteredCourseData = angular.copy($scope.courseData.slice(begin, end));
        };
        $scope.$watch('courseCurrentPage + courseNumPerPage', function () {
            $scope.adjustCourseList();
        });
        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
        };

        $scope.feesData = [];
        $scope.filteredFeesData = [];
        $scope.feesCurrentPage = 1;
        $scope.feesNumPerPage = 5;
        $scope.feesMaxSize = 5;
        $scope.assignedFeesOrderByField = 'FeeLabel';
        $scope.assignedFeesReverseSort = false;
        $scope.nonAssignedFeesOrderByField = 'FeeLabel';
        $scope.nonAssignedFeesReverseSort = false;
        $scope.linkedFeesSelectedArr = [];
        $scope.unlinkedFeesSelectedArr = [];

        $scope.adjustFeesList = function () {
            var begin = (($scope.feesCurrentPage - 1) * $scope.feesNumPerPage)
                , end = begin + $scope.feesNumPerPage;

            $scope.filteredFeesData = angular.copy($scope.feesData.slice(begin, end));
        };
        $scope.$watch('feesCurrentPage + feesNumPerPage', function () {
            $scope.adjustFeesList();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];

        $scope.addPSFormObj = { status: "Active" };

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
            $q.all([programStudyService.getUnlinkedCoursesOfProgramStudy($scope.selectedProgramStudy)]).then(function (data) {
                $scope.unlinkedCoursesOfPSList = data[0].results;
            }, function () {

            });

            $scope.Modals.open('App/Templates/ProgramStudy/assignCourses.html');
        };
        $scope.assignFeesContainer = function () {
            $q.all([programStudyService.getUnlinkedFeesOfProgramStudy($scope.selectedProgramStudy)]).then(function (data) {
                $scope.unlinkedFeesOfPSList = data[0].results;
            }, function () {

            });
            $scope.Modals.open('App/Templates/ProgramStudy/assignFees.html');
        };

        $scope.isLinkedCoursesAllSelected = function () {
            if ($scope.linkedCoursesAllSelected) {
                var tt = $scope.filteredCourseData;
                for (var i = 0; i < tt.length; i++) {
                    var eachRow = tt[i];
                    eachRow.ProgramStudyId = $scope.selectedProgramStudy.ProgramStudyId;
                    eachRow = angular.extend({},commonService.fetchMainCookieData(), eachRow);
                    $scope.linkedCoursesSelectedArr.push(eachRow);
                    $scope.filteredCourseData[i].Selected = 'true';
                }
            } else {
                angular.forEach($scope.filteredCourseData, function (item) {
                    $scope.linkedCoursesSelectedArr = [];
                    item.Selected = 'false';
                });
            }
        };
        $scope.isUnlinkedCoursesAllSelected = function () {
            if ($scope.unlinkedCoursesAllSelected) {
                var tt = $scope.unlinkedCoursesOfPSList;
                for (var i = 0; i < tt.length; i++) {
                    var eachRow = tt[i];
                    eachRow.ProgramStudyId = $scope.selectedProgramStudy.ProgramStudyId;
                    eachRow = angular.extend({},commonService.fetchMainCookieData(), eachRow);
                    $scope.unlinkedCoursesSelectedArr.push(eachRow);
                    $scope.unlinkedCoursesOfPSList[i].Selected = 'true';
                }
            } else {
                angular.forEach($scope.unlinkedCoursesOfPSList, function (item) {
                    $scope.unlinkedCoursesSelectedArr = [];
                    item.Selected = 'false';
                });
            }
        };
        $scope.isUnlinkedFeesAllSelected = function () {
            if ($scope.unlinkedFeesAllSelected) {
                var tt = $scope.unlinkedFeesOfPSList;
                for (var i = 0; i < tt.length; i++) {
                    var eachRow = tt[i];
                    eachRow.ProgramStudyId = $scope.selectedProgramStudy.ProgramStudyId;
                    eachRow = angular.extend({},commonService.fetchMainCookieData(), eachRow);
                    $scope.unlinkedFeesSelectedArr.push(eachRow);
                    $scope.unlinkedFeesOfPSList[i].Selected = 'true';
                }
            } else {
                angular.forEach($scope.unlinkedFeesOfPSList, function (item) {
                    $scope.unlinkedFeesSelectedArr = [];
                    item.Selected = 'false';
                });
            }
        };
        $scope.isLinkedFeesAllSelected = function () {
            if ($scope.linkedFeesAllSelected) {
                var tt = $scope.filteredFeesData;
                for (var i = 0; i < tt.length; i++) {
                    var eachRow = tt[i];
                    eachRow.ProgramStudyId = $scope.selectedProgramStudy.ProgramStudyId;
                    eachRow = angular.extend({},commonService.fetchMainCookieData(), eachRow);
                    $scope.linkedFeesSelectedArr.push(eachRow);
                    $scope.filteredFeesData[i].Selected = 'true';
                }
            } else {
                angular.forEach($scope.filteredFeesData, function (item) {
                    $scope.linkedFeesSelectedArr = [];
                    item.Selected = 'false';
                });
            }
        };
        $scope.isThisLinkedCourseSelected = function (that) {
            if ($scope.linkedCoursesAllSelected) {
                if (that.Selected === 'true') {
                    var eachRow = that;
                    eachRow.ProgramStudyId = $scope.selectedProgramStudy.ProgramStudyId;
                    eachRow = angular.extend({},commonService.fetchMainCookieData(), eachRow);
                    $scope.linkedCoursesSelectedArr.push(eachRow);
                   
                } else {
                    $scope.linkedCoursesSelectedArr = commonService.removeItemFromArray($scope.linkedCoursesSelectedArr, that);
                    if ($scope.linkedCoursesSelectedArr.length === 0) {
                        $scope.linkedCoursesAllSelected = false;
                    }
                    
                }
            } else {
                if (that.Selected) {
                    var eachRow = that;
                    eachRow.ProgramStudyId = $scope.selectedProgramStudy.ProgramStudyId;
                    eachRow = angular.extend({},commonService.fetchMainCookieData(), eachRow);
                    $scope.linkedCoursesSelectedArr.push(eachRow);
                    if ($scope.filteredCourseData.length === $scope.linkedCoursesSelectedArr.length) {
                        $scope.linkedCoursesAllSelected = true;
                    }
                } else {
                    $scope.linkedCoursesSelectedArr = commonService.removeItemFromArray($scope.linkedCoursesSelectedArr, that);
                    if ($scope.linkedCoursesSelectedArr.length === 0) {
                        $scope.linkedCoursesAllSelected = false;
                    }
                }
                
            }
        };
        $scope.isThisUnlinkedCourseSelected = function (that) {
            if ($scope.unlinkedCoursesAllSelected) {
                if (that.Selected === 'true') {
                    var eachRow = that;
                    eachRow.ProgramStudyId = $scope.selectedProgramStudy.ProgramStudyId;
                    eachRow = angular.extend({},commonService.fetchMainCookieData(), eachRow);
                    $scope.unlinkedCoursesSelectedArr.push(eachRow);
                } else {
                    $scope.unlinkedCoursesSelectedArr = commonService.removeItemFromArray($scope.unlinkedCoursesSelectedArr, that);
                    if ($scope.unlinkedCoursesSelectedArr.length === 0) {
                        $scope.unlinkedCoursesAllSelected = false;
                    }

                }
            } else {
                if (that.Selected) {
                    var eachRow = that;
                    eachRow.ProgramStudyId = $scope.selectedProgramStudy.ProgramStudyId;
                    eachRow = angular.extend({},commonService.fetchMainCookieData(), eachRow);
                    $scope.unlinkedCoursesSelectedArr.push(eachRow);
                    if ($scope.unlinkedCoursesOfPSList.length === $scope.unlinkedCoursesSelectedArr.length) {
                        $scope.unlinkedCoursesAllSelected = true;
                    }
                } else {
                    $scope.unlinkedCoursesSelectedArr = commonService.removeItemFromArray($scope.unlinkedCoursesSelectedArr, that);
                    if ($scope.unlinkedCoursesSelectedArr.length === 0) {
                        $scope.unlinkedCoursesAllSelected = false;
                    }
                }

            }
        };
        $scope.isThisUnlinkedFeeSelected = function (that) {
            if ($scope.unlinkedFeesAllSelected) {
                if (that.Selected === 'true') {
                    var eachRow = that;
                    eachRow.ProgramStudyId = $scope.selectedProgramStudy.ProgramStudyId;
                    eachRow = angular.extend({},commonService.fetchMainCookieData(), eachRow);
                    $scope.unlinkedFeesSelectedArr.push(eachRow);
                } else {
                    $scope.unlinkedFeesSelectedArr = commonService.removeItemFromArray($scope.unlinkedFeesSelectedArr, that.FeeId);
                    if ($scope.unlinkedFeesSelectedArr.length === 0) {
                        $scope.unlinkedFeesAllSelected = false;
                    }

                }
            } else {
                if (that.Selected) {
                    var eachRow = that;
                    eachRow.ProgramStudyId = $scope.selectedProgramStudy.ProgramStudyId;
                    eachRow = angular.extend({},commonService.fetchMainCookieData(), eachRow);
                    $scope.unlinkedFeesSelectedArr.push(eachRow);
                    if ($scope.unlinkedFeesOfPSList.length === $scope.unlinkedFeesSelectedArr.length) {
                        $scope.unlinkedFeesAllSelected = true;
                    }
                } else {
                    $scope.unlinkedFeesSelectedArr = commonService.removeItemFromArray($scope.unlinkedFeesSelectedArr, that);
                    if ($scope.unlinkedFeesSelectedArr.length === 0) {
                        $scope.unlinkedFeesAllSelected = false;
                    }
                }

            }
        };
        $scope.isThisLinkedFeeSelected = function (that) {
            if ($scope.linkedFeesAllSelected) {
                if (that.Selected === 'true') {
                    var eachRow = that;
                    eachRow.ProgramStudyId = $scope.selectedProgramStudy.ProgramStudyId;
                    eachRow = angular.extend({},commonService.fetchMainCookieData(), eachRow);
                    $scope.linkedFeesSelectedArr.push(eachRow);

                } else {
                    $scope.linkedFeesSelectedArr = commonService.removeItemFromArray($scope.linkedFeesSelectedArr, that);
                    if ($scope.linkedFeesSelectedArr.length === 0) {
                        $scope.linkedFeesAllSelected = false;
                    }

                }
            } else {
                if (that.Selected) {
                    var eachRow = that;
                    eachRow.ProgramStudyId = $scope.selectedProgramStudy.ProgramStudyId;
                    eachRow = angular.extend({},commonService.fetchMainCookieData(), eachRow);
                    $scope.linkedFeesSelectedArr.push(eachRow);
                    if ($scope.filteredFeesData.length === $scope.linkedFeesSelectedArr.length) {
                        $scope.linkedFeesAllSelected = true;
                    }
                } else {
                    $scope.linkedFeesSelectedArr = commonService.removeItemFromArray($scope.linkedFeesSelectedArr, that);
                    if ($scope.linkedFeesSelectedArr.length === 0) {
                        $scope.linkedFeesAllSelected = false;
                    }
                }

            }
        };

        $scope.addProgramStudy = function (form) {
            if (form.$valid) {
                $q.when(programStudyService.addProgramStudy($scope.addPSFormObj)).then(function (success) {
                    $scope.Modals.close();
                    $scope.pageLoad();
                }, function (error) {
                    alert("Please try again");
                });
            }
        };
        

        $scope.removeSelectedCourses = function () {
            if ($scope.linkedCoursesSelectedArr.length > 0) {
                $q.when(programStudyService.removeSelectedCoursesFromProgramStudy($scope.linkedCoursesSelectedArr)).then(function (success) {
                   
                    var tempCD = [];
                    var tempCourseIds = [];
                    angular.forEach($scope.linkedCoursesSelectedArr, function (tcd, key) {
                        tempCourseIds.push(tcd.CourseId);
                    });
                    angular.forEach($scope.courseData, function (tcd, key) {
                        if (tempCourseIds.indexOf(tcd.CourseId) === -1) {
                            tempCD.push(tcd);
                        } 
                    });
                    $scope.courseData = tempCD;
                    $scope.adjustCourseList();
                    $scope.linkedCoursesSelectedArr = [];
                    $scope.linkedCoursesAllSelected = false;
                }, function (error) {
                    alert("Please try again.");
                });
            } else {
                alert("Please select courses before removing it.");
            }
           
        };
        $scope.removeSelectedFees = function () {
            if ($scope.linkedFeesSelectedArr.length > 0) {
                $q.when(programStudyService.removeSelectedFeesFromProgramStudy($scope.linkedFeesSelectedArr)).then(function (success) {
                    
                    var tempCD = [];
                    var tempFeeIds = [];
                    angular.forEach($scope.linkedFeesSelectedArr, function (tcd, key) {
                        tempFeeIds.push(tcd.FeeId);
                    });
                    angular.forEach($scope.feesData, function (tcd, key) {
                        if (tempFeeIds.indexOf(tcd.FeeId) === -1) {
                            tempCD.push(tcd);
                        }
                    });
                    
                    $scope.feesData = tempCD;
                    $scope.adjustFeesList();
                    $scope.linkedFeesSelectedArr = [];
                    $scope.linkedFeesAllSelected = false;
                }, function (error) {
                    alert("Please try again.");
                });
            } else {
                alert("Please select fees before removing it.");
            }

        };

        $scope.assignUnlinkedCourses = function () {
            if ($scope.unlinkedCoursesSelectedArr.length > 0) {
                $q.when(programStudyService.assignUnlinkedCoursesToProgramStudy($scope.unlinkedCoursesSelectedArr)).then(function (success) {
                    $scope.Modals.close();
                    angular.forEach($scope.unlinkedCoursesSelectedArr, function (r, k) {
                        $scope.courseData.push(r);
                    });
                    
                    $scope.adjustCourseList();
                    $scope.unlinkedCoursesSelectedArr = [];
                    $scope.unlinkedCoursesAllSelected = false;
                    $scope.fetchRelatedDataOfPS();
                }, function (error) {
                    alert("Please try again.");
                });
            } else {
                alert("Please select courses before assigning it.");
            }

        };

        $scope.assignUnlinkedFees = function () {
            if ($scope.unlinkedFeesSelectedArr.length > 0) {
                $q.when(programStudyService.assignUnlinkedFeesToProgramStudy($scope.unlinkedFeesSelectedArr)).then(function (success) {
                    $scope.Modals.close();
                    angular.forEach($scope.unlinkedFeesSelectedArr, function (r, k) {
                        $scope.feesData.push(r);
                    });
                    $scope.adjustFeesList();
                    $scope.unlinkedFeesSelectedArr = [];
                    $scope.unlinkedCoursesAllSelected = false;
                    $scope.fetchRelatedDataOfPS();
                }, function (error) {
                    alert("Please try again.");
                });
            } else {
                alert("Please select fees before assigning it.");
            }

        };
        $scope.addCourseContainer = function (data) {
            $scope.modalType = 'add';
            $scope.modCourseObj = data;
            $scope.Modals.open();
        };

        $scope.fetchRelatedDataOfPS = function () {
            var selPS = angular.copy($scope.selectedProgramStudy);
            if (selPS) {
                $q.all([
                    programStudyService.getLinkedCoursesOfProgramStudy(selPS),
                    programStudyService.getLinkedFeesOfProgramStudy(selPS)
                ]).then(function (data) {
                    $scope.mainContentSubPart = true;
                    if (data != null) {
                        $scope.courseData = data[0].results;
                        $scope.adjustCourseList();

                        $scope.feesData = data[1].results;
                        $scope.adjustFeesList();
                    }
                }, function (reason) {
                    errorHandler.logServiceError('programStudyController', reason);
                });
            } else {
                alert("Please select a program study");
            }
        };
        

        $scope.pageLoad = function() {

            $q.all([
                programStudyService.getProgramStudyList()
            ]).then(function (data) {
                $scope.mainContent = true;
                if (data != null) {
                    $scope.programStudyData = data[0].results;
                    if (data[0].results.length < 5 && data[0].results.length > 0) {
                        $scope.filteredProgramStudyData = data[0].results;
                    } else if (data[0].results.length >= 5) {
                        //$scope.filteredProgramStudyData = angular.copy(data[0].results.slice(0, 5));
                        $scope.filteredProgramStudyData = data[0].results;
                    }

                }
            }, function (reason) {
                console.log("reason" + reason);
                errorHandler.logServiceError('programStudyController', reason);
            }, function (update) {
                console.log("update" + update);
                errorHandler.logServiceNotify('programStudyController', update);
            });
        };

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

        $scope.pageLoad();


    };
})
    ();