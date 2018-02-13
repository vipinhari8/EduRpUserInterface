(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('employeesListController', employeesListController);

    employeesListController.$inject = ['$scope', '$q', 'employeesListService', 'errorHandler', '$modal', 'commonService'];

    function employeesListController($scope, $q, employeesListService, errorHandler, $modal, commonService) {
        $scope.employeesData = [];
        $scope.filteredemployeesData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'EmployeeName';
        $scope.reverseSort = false;
        $scope.adjustemployeesList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredemployeesData = angular.copy($scope.employeesData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustemployeesList();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];

        $scope.modEmployeesObj = {};
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };

        //Get PageLoad
        (function startup() {

            $q.all([
                employeesListService.getEmployeesList()
            ]).then(function (data) {
                if (data !== null) {
                    $scope.employeesData = data[0].results;
                    $scope.adjustemployeesList();
                }
            }, function (reason) {
                errorHandler.logServiceError('employeesListController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('employeesListController', update);
            });
        })();


        $scope.addEmployeesContainer = function () {
            $scope.modalType = 'add';
            $scope.Modals.openEmployeesContainer();
        };
        //Add
        $scope.addEmployeesDetails = function (form) {
            if (form.$valid) {
                $q.when([employeesListService.addEmployee($scope.modEmployeesObj)]).then(function (data) {
                    $scope.filteredemployeesData.push($scope.modEmployeesObj);
                    $scope.Modals.closeEmployeesContainer();
                }, function (error) {
                    alert("please try later");
                });

            }

        };

        //update
        $scope.editEmployeesContainer = function (data) {
            $scope.modalType = 'update';
            $scope.modEmployeesObj = data;
            $scope.Modals.openEmployeesContainer();
        };

        $scope.updateEmployeesDetails = function (form, eid) {

            if (form.$valid) {
                var postData = {
                    "EmployeeNumber": $scope.modEmployeesObj.EmployeeNumber,
                    "FullName": $scope.modEmployeesObj.FullName,
                    "NIDN": $scope.modEmployeesObj.NIDN,
                    "NIP": $scope.modEmployeesObj.NIP,
                    "StatusId": $scope.modEmployeesObj.StatusId,
                    "DateofBirth": $scope.modEmployeesObj.DateofBirth,
                    "GenderId": $scope.modEmployeesObj.GenderId,
                    "BloodGroupId": $scope.modEmployeesObj.BloodGroupId,
                    "ReligionId": $scope.modEmployeesObj.ReligionId,
                    "MaritalStatusId": $scope.modEmployeesObj.MaritalStatusId,
                    "NationalityId": $scope.modEmployeesObj.NationalityId,
                    "PhoneNumber": $scope.modEmployeesObj.PhoneNumber,
                    "LandLineNumber": $scope.modEmployeesObj.LandLineNumber,
                    "DateofJoining": $scope.modEmployeesObj.DateofJoining,
                    "NoOfYearsOfService": $scope.modEmployeesObj.NoOfYearsOfService,
                    "IncludeInPayroll": $scope.modEmployeesObj.IncludeInPayroll,
                    "DepartmentId": $scope.modEmployeesObj.DepartmentId,
                    "IsActive": $scope.modEmployeesObj.IsActive,
                    "DocumentMasterId": $scope.modEmployeesObj.DocumentMasterId,
                    "Achievements": $scope.modEmployeesObj.Achievements,
                    "PANNumber": $scope.modEmployeesObj.PANNumber,
                    "PFNumber": $scope.modEmployeesObj.PFNumber,
                    "EmployeeLastDate": $scope.modEmployeesObj.EmployeeLastDate,
                    "IsEmploymentConfirmed": $scope.modEmployeesObj.IsEmploymentConfirmed,
                    "IsUnderProbation": $scope.modEmployeesObj.IsUnderProbation,
                    "ProbationEndDate": $scope.modEmployeesObj.ProbationEndDate,
                    "ReportingManagerId": $scope.modEmployeesObj.ReportingManagerId,
                    "ApplyTax": $scope.modEmployeesObj.ApplyTax,
                    "InvitationSent": $scope.modEmployeesObj.InvitationSent,
                    "EmailId": $scope.modEmployeesObj.EmailId
                };
                employeesListService.updateEmployee($scope.modEmployeesObj).then(function (data) {
                    angular.forEach($scope.filteredemployeesData, function (v, k) {
                        if (v.EmployeeId === eid) {
                            $scope.filteredemployeesData[k]['EmployeeNumber'] = $scope.modEmployeesObj.EmployeeNumber;
                            $scope.filteredemployeesData[k]['FullName'] = $scope.modEmployeesObj.FullName;
                            $scope.filteredemployeesData[k]['NIDN'] = $scope.modEmployeesObj.FeeType;
                            $scope.filteredemployeesData[k]['NIP'] = $scope.modEmployeesObj.NIP;
                            $scope.filteredemployeesData[k]['StatusId'] = $scope.modEmployeesObj.Description;
                            $scope.filteredemployeesData[k]['DateofBirth'] = $scope.modEmployeesObj.DateofBirth;
                            $scope.filteredemployeesData[k]['GenderId'] = $scope.modEmployeesObj.GenderId;
                            $scope.filteredemployeesData[k]['BloodGroupId'] = $scope.modEmployeesObj.BloodGroupId;
                            $scope.filteredemployeesData[k]['ReligionId'] = $scope.modEmployeesObj.ReligionId;
                            $scope.filteredemployeesData[k]['MaritalStatusId'] = $scope.modEmployeesObj.MaritalStatusId;
                            $scope.filteredemployeesData[k]['NationalityId'] = $scope.modEmployeesObj.NationalityId;
                            $scope.filteredemployeesData[k]['PhoneNumber'] = $scope.modEmployeesObj.PhoneNumber;
                            $scope.filteredemployeesData[k]['LandLineNumber'] = $scope.modEmployeesObj.LandLineNumber;
                            $scope.filteredemployeesData[k]['DateofJoining'] = $scope.modEmployeesObj.DateofJoining;
                            $scope.filteredemployeesData[k]['NoOfYearsOfService'] = $scope.modEmployeesObj.NoOfYearsOfService;
                            $scope.filteredemployeesData[k]['IncludeInPayroll'] = $scope.modEmployeesObj.IncludeInPayroll;
                            $scope.filteredemployeesData[k]['DepartmentId'] = $scope.modEmployeesObj.DepartmentId;
                            $scope.filteredemployeesData[k]['IsActive'] = $scope.modEmployeesObj.IsActive;
                            $scope.filteredemployeesData[k]['DocumentMasterId'] = $scope.modEmployeesObj.DocumentMasterId;
                            $scope.filteredemployeesData[k]['Achievements'] = $scope.modEmployeesObj.Achievements;
                            $scope.filteredemployeesData[k]['PANNumber'] = $scope.modEmployeesObj.PANNumber;
                            $scope.filteredemployeesData[k]['PFNumber'] = $scope.modEmployeesObj.PFNumber;
                            $scope.filteredemployeesData[k]['EmployeeLastDate'] = $scope.modEmployeesObj.EmployeeLastDate;
                            $scope.filteredemployeesData[k]['IsEmploymentConfirmed'] = $scope.modEmployeesObj.IsEmploymentConfirmed;
                            $scope.filteredemployeesData[k]['IsUnderProbation'] = $scope.modEmployeesObj.IsUnderProbation;
                            $scope.filteredemployeesData[k]['ProbationEndDate'] = $scope.modEmployeesObj.ProbationEndDate;
                            $scope.filteredemployeesData[k]['ReportingManagerId'] = $scope.modEmployeesObj.ReportingManagerId;
                            $scope.filteredemployeesData[k]['ApplyTax'] = $scope.modEmployeesObj.ApplyTax;
                            $scope.filteredemployeesData[k]['InvitationSent'] = $scope.modEmployeesObj.InvitationSent;
                            $scope.filteredemployeesData[k]['EmailId'] = $scope.modEmployeesObj.EmailId;



                        }
                    });
                    $scope.Modals.closeEmployeesContainer();
                }, function (error) {
                    alert("Please try again");
                });

            }
        };
        //delete 

        $scope.deleteEmployeesContainer = function (sd) {
            if (confirm('Are you sure you want to delete this employee?')) {
                employeesListService.deleteEmployee(ed).then(function (data) {
                    $scope.filteredemployeesData = commonService.removeItemFromArray($scope.filteredemployeesData, ed);
                }, function (error) {
                    alert("Please try again");
                });
            }


        };


        $scope.Modals = {
            openEmployeesContainer: function () {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/App/Templates/Employees/addEditModalPopup.html',
                    size: 'lg',
                    scope: $scope,
                    backdrop: 'static'
                });

                $scope.modalInstance.result.then(
                    function (subject) {

                    },
                    function (event) {

                    });
            },
            closeEmployeesContainer: function () {
                $scope.modalInstance.dismiss();
            }
        };

    };
})
    ();