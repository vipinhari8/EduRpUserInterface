
﻿var localhost = false;
var apiPrefix = 'http://edurpwebapi20180213021849.azurewebsites.net';
var urlService =
    {
        getCourseList: localhost ? '/sampleData/Course/list.json' : apiPrefix + '/api/CourseMasters/Get?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',
        addCourse: localhost ? '/sampleData/Course/add.json' : apiPrefix + '/api/CourseMasters/Save/',
        updateCourse: localhost ? '/sampleData/Course/edit.json' : apiPrefix + '/api/CourseMasters/Save/',
        deleteCourse: localhost ? '/sampleData/Course/delete.json' : apiPrefix + '/api/CourseMasters/Save',


        getFeesList: localhost ? '/sampleData/feesList.json' : apiPrefix + '/api/Fees/Get?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',
        addFee: localhost ? ' ' : apiPrefix + '/api/Fees/Save/',
        updateFee: localhost ? ' ' : apiPrefix + '/api/Fees/Save/',
        deleteFee: localhost ? ' ' : apiPrefix + '/api/Fees/Delete/',

        getSubjectList: localhost ? '/sampleData/subjectList.json' : apiPrefix + '/api/SubjectMasters/Get?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',
        addSubject: localhost ? '/sampleData/subjectList.json' : apiPrefix + '/api/Subjectmasters/Save/',
        updateSubject: localhost ? '/sampleData/subjectList.json' : apiPrefix + '/api/SubjectMasters/Save/',
        deleteSubject: localhost ? '/sampledata/subjectlist.json' : apiPrefix + '/api/SubjectMasters/Delete/',

        getClassRoomList: localhost ? '/sampleData/classRoomList.json' : apiPrefix + '/api/ClassRoomMasters/Get?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',
        addClassRoom: localhost ? ' ' : apiPrefix + '/api/ClassRoomMasters/Save/',
        updateClassRoom: localhost ? ' ' : apiPrefix + '/api/ClassRoomMasters/Save/',
        deletesubject: localhost ? ' ' : apiPrefix + '/api/ClassRoomMasters/Delete/',

        getEmployeesList: localhost ? '/sampleData/getEmployeesList.json' : apiPrefix + '/api/Employees/Get?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',
        addEmployee: localhost ? '/sampleData/getEmployeesList.json' : apiPrefix + '/api/Employees/Save',
        updateEmployee: localhost ? '/sampleData/getEmployeesList.json' : apiPrefix + '/api/Employees/Save',
        deleteEmployee: localhost ? '/sampleData/getEmployeesList.json' : apiPrefix + '/api/Employees/Delete',

        getChaptersList: localhost ? '/sampleData/chapterList.json' : apiPrefix + '/api/ChapterMasters/Get?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',
        
		addChapter: localhost ? ' ' : apiPrefix + '/api/ChapterMasters/Save/',
        updateChapter: localhost ? ' ' : apiPrefix + '/api/ChapterMasters/Save/',
        deleteChapter: localhost ? ' ' : apiPrefix + '/api/ChapterMasters/Delete/',

        getExaminationTypeList: localhost ? '/sampleData/examinationtypeList.json' : apiPrefix + '/api/ExaminationTypes/Get?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',
        addExaminationType: localhost ? ' ' : apiPrefix + '/api/ExaminationTypes/Save/',
        updateExaminationType: localhost ? ' ' : apiPrefix + '/api/ExaminationTypes/Save/',
        deleteExaminationType: localhost ? ' ' : apiPrefix + '/api/ExaminationTypes/Delete/',

        getTaskList: localhost ? '/sampleData/tasksList.json' : apiPrefix + '/api/Tasks/Get?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',
        addTask: localhost ? ' ' : apiPrefix + '/api/Tasks/Save/',
        updateTask: localhost ? ' ' : apiPrefix + '/api/Tasks/Save/',
        deleteTask: localhost ? ' ' : apiPrefix + '/api/Tasks/Delete/',

        getBatch: localhost ? ' ' : apiPrefix + '/api/BatchMasters/Get',
        //addBatch: localhost ? ' ' : apiPrefix + '/api/BatchMasters/Post/',
        //updateBatch: localhost ? ' ' : apiPrefix + '/api/BatchMasters/Put/',
        //deleteTask: localhost ? ' ' : apiPrefix + '/api/Tasks/Delete/',

        
        getProgramStudyList: localhost ? '/sampleData/programStudy/programStudyList.json' : apiPrefix +'/api/ProgramStudies/Get?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',
        addProgramStudy: localhost ? '/sampleData/programStudy/addProgramStudy.json' : apiPrefix + '/api/ProgramStudies/Save/',
        getLinkedCoursesOfProgramStudy: localhost ? '/sampleData/programStudy/courseList.json' : apiPrefix + '/api/CourseMasters/GetProgramStudyCourseList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&psid={{PsId}}',
        getLinkedFeesOfProgramStudy: localhost ? '/sampleData/programStudy/feesList.json' : apiPrefix + '/api/Fees/GetProgramStudyFeesList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&psid={{PsId}}',
        getUnlinkedCoursesOfProgramStudy: localhost ? '/sampleData/programStudy/getUnlinkedCoursesOfProgramStudy.json' : apiPrefix + '/api/ProgramStudyCourseAssociations/GetProgramStudyCourseNotLinkedList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&psid={{PsId}}',
        getUnlinkedFeesOfProgramStudy: localhost ? '/sampleData/programStudy/getUnlinkedFeesOfProgramStudy.json' : apiPrefix + '/api/ProgramStudyFeesAssociations/GetProgramStudyFeesNotLinkedList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&psid={{PsId}}',
        removeSelectedCoursesFromProgramStudy: localhost ? '/sampleData/programStudy/removeSelectedCourses.json' : apiPrefix + '/api/ProgramStudyCourseAssociations/UnLink/',
        removeSelectedFeesFromProgramStudy: localhost ? '/sampleData/programStudy/removeSelectedFees.json' : apiPrefix + '/api/ProgramStudyFeesAssociations/UnLink/',
        assignUnlinkedCoursesToProgramStudy: localhost ? '/sampleData/programStudy/assignUnlinkedCourses.json' : apiPrefix + '/api/ProgramStudyCourseAssociations/link',
        assignUnlinkedFeesToProgramStudy: localhost ? '/sampleData/programStudy/assignUnlinkedFees.json' : apiPrefix + '/api/ProgramStudyFeesAssociations/Link/',

        getBatchList: localhost ? '/sampleData/createBatch/batchList.json' : apiPrefix + '/api/BatchMasters/Get?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',
        addBatch: localhost ? '/sampleData/createBatch/addBatch.json' : apiPrefix + '/api/BatchMasters/Save/',
        getLinkedProgramStudyOfBatch: localhost ? '/sampleData/createBatch/ProgramStudyList.json' : apiPrefix + '/api/ProgramStudies/GetBatchProgramStudyList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&batchid={{bId}}',
        getLinkedFeesOfBatch: localhost ? '/sampleData/createBatch/feesList.json' : apiPrefix + '/api/Fees/GetBatchFeesList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&batchid={{bId}}',
        getUnlinkedProgramStudyOfBatch: localhost ? '/sampleData/createBatch/getUnlinkedProgramStudyOfBatch.json' : apiPrefix + '/api/BatchProgramStudyAssociations/GetBatchProgramStudyNotLinkedList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&batchid={{bId}}',
        getUnlinkedFeesOfBatch: localhost ? '/sampleData/createBatch/getUnlinkedFeesOfBatch.json' : apiPrefix + '/api/BatchFeeAssociations/GetBatchFeeNotLinkedList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&batchid={{bId}}',
        removeSelectedProgramStudyFromBatch: localhost ? '/sampleData/createBatch/removeSelectedProgramStudy.json' : apiPrefix + '/api/BatchProgramStudyAssociations/UnLink/',
        removeSelectedFeesFromBatch: localhost ? '/sampleData/createBatch/removeSelectedFees.json' : apiPrefix + '/api/BatchFeeAssociations/UnLink/',
        assignUnlinkedProgramStudyToBatch: localhost ? '/sampleData/createBatch/assignUnlinkedProgramStudy.json' : apiPrefix + '/api/BatchProgramStudyAssociations/Link/',
        assignUnlinkedFeesToBatch: localhost ? '/sampleData/createBatch/assignUnlinkedFees.json' : apiPrefix + '/api/BatchFeeAssociations/Link/',

        getCourseSubject: localhost ? '' : apiPrefix + '/api/SubjectMasters/GetCourseSubjectList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&CourseId={{cId}}',
        getNotLinkedCourseList : localhost ? '' : apiPrefix + '/api/CourseSubjectAssociations/GetCourseSubjectNotLinkedList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&CourseId={{cId}}',
        removeSubjectfromList : localhost ? '' : apiPrefix + '/api/CourseSubjectAssociations/UnLink/',
        addSubjectInList : localhost ? '' : apiPrefix + '/api/CourseSubjectAssociations/Link/',


        getBulkModule: localhost ? '/sampleData/bulkUpload.json' : apiPrefix + '/api/BulkLoadMaster/Get/1',

        //scheduledExam

        getScheduleDetails: localhost ? '/sampleData/ScheduleExam/scheduledExam.json' : '/sampleData/ScheduleExam/scheduledExam.json',

        //StudentDashBoard

        getAdmissionList: localhost ? '/sampleData/StudentPortal/studentPortal.json' : '/sampleData/StudentPortal/studentPortal.json',

        //StudentAdmissionForm

        getDynamicFormData: localhost ? '/sampleData/StudentPortal/stdapplicationformdetail.json' : '/sampleData/StudentPortal/stdapplicationformdetail.json',

        addStudentAdmissionForm: localhost ? '' : apiPrefix + '',

        getDynamicFormData: localhost ? '/sampleData/StudentPortal/stdapplicationformdetail.json' : '/sampleData/StudentPortal/stdapplicationformdetail.json',

        //StudentCounselingPage & ReviewandApproveDetail

        getStdCounsellingDetail: localhost ? '/sampleData/StudentPortal/studentPortal.json' : apiPrefix + '/api/StudentDashBoard/GetApplicationFormList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&batchid={{bId}}&psid={{PsId}}&CourseId={{cId}}',

        getBatch: localhost ? ' ' : apiPrefix + '/api/BatchMasters/Get?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',

        getLinkedProgrmStudiesOfBatch: localhost ? ' ' : apiPrefix + '/api/ProgramStudies/GetBatchProgramStudyList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&batchid={{bId}}',
         
        getreviewandapproveDetail: localhost ? '/sampleData/ReviewAndApproveDetail/reviewandapprovedetail.json' : apiPrefix + '/api/StudentDashBoard/GetApplicationFormList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&batchid={{bId}}&psid={{PsId}}&CourseId={{cId}}',

		

    };