(function () {
    'use strict';

    angular.module('EduRpApp')
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: '/App/Templates/Contact/Index.html',
                requiresLogin: true,
                controller: 'ContactController'
            })
                .when('/Account/Login', {
                    templateUrl: '/App/Templates/Account/Login.html',
                    controller: 'LoginController'
                })
                .when('/Account/Register', {
                    templateUrl: '/App/Templates/Account/Register.html',
                    controller: 'RegisterController'
                })
                .when('/Admin/CourseList/', {
                    templateUrl: '/App/Templates/Course/course_grade.html',
                    requiresLogin: true,
                    controller: 'courseListController'
                })
                .when('/Admin/Subject', {
                    templateUrl: '/App/Templates/Subject/subject.html',
                    requiresLogin: true,
                    controller: 'subjectListController'
                })
                .when('/ManageProgramStudy', {
                    templateUrl: '/App/Templates/ProgramStudy/home.html',
                    requiresLogin: true,
                    controller: 'programStudyController'
                })
                .when('/Admin/CreateBatch', {
                    templateUrl: '/App/Templates/CreateBatch/home.html',
                    requiresLogin: true,
                    controller: 'createBatchController'
                })
                .when('/Admin/AcademicBatch', {
                    templateUrl: '/App/Templates/AcademicBatch/academicbatch.html',
                    requiresLogin: true,
                    controller: 'academicBatchController'
                })
                .when('/Admin/Task', {
                    templateUrl: '/App/Templates/Task/tasks.html',
                    requiresLogin: true,
                    controller: 'taskListController'
                })
                .when('/Admin/ClassRoom', {
                    templateUrl: '/App/Templates/Classroom/classroom.html',
                    controller: 'classRoomListController'
                })
                .when('/Admin/Employees', {
                    templateUrl: '/App/Templates/Employees/employees.html',
                    controller: 'employeesListController'
                })
                .when('/Admin/ExaminationType', {
                    templateUrl: '/App/Templates/Examinationtype/examinationtype.html',
                    controller: 'examinationTypeController'
                })
                .when('/Admin/Fees', {
                    templateUrl: '/App/Templates/Fees/fees.html',
                    controller: 'feesListController'
                })
                .when('/Admin/NotificationType', {
                    templateUrl: '/App/Templates/NotificationType/notificationtype.html',
                    controller: 'notificationTypeController'
                })
                .when('/Admin/Chapters', {
                    templateUrl: '/App/Templates/Chapters/chapters.html',
                    controller: 'chaptersListController'

                })
                .when('/Admin/BulkUpload', {
                    templateUrl: '/App/Templates/BulkUpload/Bulkupload.html',
                    controller: 'bulkUploadCntrl'
                })
                .when('/ManageCourses', {
                    templateUrl: '/App/Templates/ManageCourses/ManageCourses.html',
                    controller: 'managecourcesController'
                })
                .when('/ManageTask', {
                    templateUrl: '/App/Templates/ManageTask/manageTask.html',
                    controller: 'manageTaskController'
                })
				.when('/ScheduleExamination', {
                    templateUrl: '/App/Templates/ScheduleExamination/scheduleExamination.html',
                    controller: 'scheduleExaminationController'
                })
                .when('/StudentAdmissionForm', {
                    templateUrl: '/App/Templates/StudentAdmissionForm/StudentAdmissionForm.html',
                    controller: 'studentAdmissionFormController'
                })
                .when('/ManageStudentCounsellingDetail', {
                    templateUrl: '/App/Templates/ManageStudentCounsellingDetail/ManageStudentCounsellingDetail.html',
                    controller: 'manageStudentCounsellingDetailController'
                })
                .when('/StudentDashboard', {
                    templateUrl: '/App/Templates/StudentPortal/StudentPortal.html',
                    controller: 'StudentPortalController'
                })
                .when('/ReviewAndApprove', {
                    templateUrl: '/App/Templates/ReviewAndApprove/reviewandapprove.html',
                    controller: 'reviewandapproveController'
                })
                .otherwise({
                    templateUrl: '/App/Templates/Shared/_404.html'
                })
        }])
        .run(checkAuthentication);

    checkAuthentication.$inject = ['$rootScope', '$location', 'tokenHandler'];

    function checkAuthentication($rootScope, $location, tokenHandler) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            var requiresLogin = next.requiresLogin || false;
            if (requiresLogin) {

                var loggedIn = tokenHandler.hasLoginToken();

                if (!loggedIn) {
                    // $location.path('/Account/Login');
                }
            }
        });
    }
})();