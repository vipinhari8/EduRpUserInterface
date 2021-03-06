﻿(function () {
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
                .when('/Admin/ProgramStudy', {
                    templateUrl: '/App/Templates/ProgramStudyMaster/prgmstudymaster.html',
                    controller: 'prgmStudyMasterController'
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
                .when('/Admin/BatchMaster', {
                    templateUrl: '/App/Templates/BatchMaster/batchMaster.html',
                    requiresLogin: true,
                    controller: 'batchMasterController'
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
                    templateUrl: '/App/Templates/ClassRoom/classroom.html',
                    requiresLogin: true,
                    controller: 'classRoomListController'
                })
                .when('/Admin/Employees', {
                    templateUrl: '/App/Templates/Employees/employees.html',
                    requiresLogin: true,
                    controller: 'employeesListController'
                })
                .when('/Admin/ExaminationType', {
                    templateUrl: '/App/Templates/Examinationtype/examinationtype.html',
                    requiresLogin: true,
                    controller: 'examinationTypeController'
                })
                .when('/Admin/Fees', {
                    templateUrl: '/App/Templates/Fees/fees.html',
                    requiresLogin: true,
                    controller: 'feesListController'
                })
                .when('/Admin/NotificationType', {
                    templateUrl: '/App/Templates/NotificationType/notificationtype.html',
                    requiresLogin: true,
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
                .when('/ManageSubject', {
                    templateUrl: '/App/Templates/ManageSubject/manageSubject.html',
                    controller: 'manageSubjectController'
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
                .when('/StudentProfile', {
                    templateUrl: '/App/Templates/StudentPortal/StudentPortal.html',
                    controller: 'StudentPortalController'
                })
                .when('/ReviewAndApprove', {
                    templateUrl: '/App/Templates/ReviewAndApprove/reviewandapprove.html',
                    controller: 'reviewandapproveController'
                })
                .when('/MeritAndDemerit', {
                    templateUrl: '/App/Templates/MeritAndDemerits/meritanddemerit.html',
                    controller: 'meritanddemeritController'
                })
                .when('/StudentCharacterSupervision', {
                    templateUrl: '/App/Templates/StudentCharacterSupervision/studentcharacter.html',
                    controller: 'studentcharacterController'
                })
                .when('/LossAndFound', {
                    templateUrl: '/App/Templates/LossAndFound/lossandfound.html',
                    controller: 'lossandfoundController'
                })
                .when('/LetterPermission', {
                    templateUrl: '/App/Templates/LetterPermission/letterpermission.html',
                    controller: 'letterpermissionController'
                })
                .when('/MindYourlanguage', {
                    templateUrl: '/App/Templates/MindYourlanguage/mindyourlanguage.html',
                    controller: 'mindyourlanguageController'
                })
                .when('/LessonPlan', {
                    templateUrl: '/App/Templates/LessonPlan/lessonplan.html',
                    controller: 'lessonplanController'
                })
                .when('/Quiz', {
                    templateUrl: '/App/Templates/Quiz/quiz.html',
                    controller: 'quizController'
                })
                .when('/StudentDiary', {
                    templateUrl: '/App/Templates/StudentDiary/studentdiary.html',
                    controller: 'studentdiaryController'
                })
                .when('/StudentLeaveApplication', {
                    templateUrl: '/App/Templates/StudentLeaveApplication/studentleaveapplication.html',
                    controller: 'studentleaveController'
                })
                .when('/TeacherNote', {
                    templateUrl: '/App/Templates/TeacherNote/teachernotes.html',
                    controller: 'teachernoteController'
                })
                .when('/PhysicalEducation', {
                    templateUrl: '/App/Templates/PhysicalEducation/physicaleducation.html',
                    controller: 'physicaleducationController'
                })
                .when('/ExaminationSyllabus', {
                    templateUrl: '/App/Templates/ExaminationSyllabus/examinationsyllabus.html',
                    controller: 'examinationsyllabusController'
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