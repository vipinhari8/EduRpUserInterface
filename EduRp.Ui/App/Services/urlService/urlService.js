﻿var localhost = false;                                                                                                                                                                       
var apiPrefix = 'http://edurpwebapi20180213021849.azurewebsites.net';
//http://localhost:50381 
//http://edurpwebapi20180213021849.azurewebsites.net
 
var urlService =
    {
//------------------------------------------------------------------------Program Study Master---------------------------------------------------------------------------------------------
        getPrgmStudyMasterList: localhost ? '' : apiPrefix + '/api/ProgramStudies/Get?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',
        addPrgmStudyMaster: localhost ? '' : apiPrefix + '/api/ProgramStudies/Save',
        updatePrgmStudyMaster: localhost ? '' : apiPrefix + '/api/ProgramStudies/Save',
        deletePrgmStudyMaster: localhost ? '' : apiPrefix + '/api/ProgramStudies/Delete',
//------------------------------------------------------------------------Batch Master---------------------------------------------------------------------------------------------
        getbatchMasterList: localhost ? '' : apiPrefix + '/api/BatchMasters/Get?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',
        addbatchMaster: localhost ? '' : apiPrefix + '/api/BatchMasters/Save',
        updatebatchMaster: localhost ? '' : apiPrefix + '/api/BatchMasters/Save',
        deletebatchMaster: localhost ? '' : apiPrefix + '/api/BatchMasters/Delete',
//-------------------------------------------------------------------------SubjectMaster--------------------------------------------------------------------------------------------
        getSubjectList: localhost ? '/sampleData/subjectList.json' : apiPrefix + '/api/SubjectMasters/Get?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',
        addSubject: localhost ? '/sampleData/subjectList.json' : apiPrefix + '/api/SubjectMasters/Save/',
        updateSubject: localhost ? '/sampleData/subjectList.json' : apiPrefix + '/api/SubjectMasters/Save/',
        deleteSubject: localhost ? '/sampledata/subjectlist.json' : apiPrefix + '/api/SubjectMasters/Delete/',
//-------------------------------------------------------------------------CourseMaster--------------------------------------------------------------------------------------------
        getCourseList: localhost ? '/sampleData/Course/list.json' : apiPrefix + '/api/CourseMasters/Get?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',
        addCourse: localhost ? '/sampleData/Course/add.json' : apiPrefix + '/api/CourseMasters/Save/',
        updateCourse: localhost ? '/sampleData/Course/edit.json' : apiPrefix + '/api/CourseMasters/Save/',
        deleteCourse: localhost ? '/sampleData/Course/delete.json' : apiPrefix + '/api/CourseMasters/Delete',
//-------------------------------------------------------------------------FeeMaster--------------------------------------------------------------------------------------------
        getFeesList: localhost ? '/sampleData/feesList.json' : apiPrefix + '/api/Fees/Get?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',
        addFee: localhost ? ' ' : apiPrefix + '/api/Fees/Save/',
        updateFee: localhost ? ' ' : apiPrefix + '/api/Fees/Save/',
        deleteFee: localhost ? ' ' : apiPrefix + '/api/Fees/Delete/',
//-------------------------------------------------------------------------ClassRoomMaster--------------------------------------------------------------------------------------------
        getClassRoomList: localhost ? '/sampleData/classRoomList.json' : apiPrefix + '/api/ClassRoomMasters/Get?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',
        addClassRoom: localhost ? ' ' : apiPrefix + '/api/ClassRoomMasters/Save/',
        updateClassRoom: localhost ? ' ' : apiPrefix + '/api/ClassRoomMasters/Save/',
        deleteClassRoom: localhost ? ' ' : apiPrefix + '/api/ClassRoomMasters/Delete/',
//-------------------------------------------------------------------------EmployeeMaster--------------------------------------------------------------------------------------------
        getEmployeesList: localhost ? '/sampleData/getEmployeesList.json' : apiPrefix + '/api/Employees/Get?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',
        addEmployee: localhost ? '/sampleData/getEmployeesList.json' : apiPrefix + '/api/Employees/Save',
        updateEmployee: localhost ? '/sampleData/getEmployeesList.json' : apiPrefix + '/api/Employees/Save',
        deleteEmployee: localhost ? '/sampleData/getEmployeesList.json' : apiPrefix + '/api/Employees/Delete',
//-------------------------------------------------------------------------ChapterMaster--------------------------------------------------------------------------------------------
        getChaptersList: localhost ? '/sampleData/chapterList.json' : apiPrefix + '/api/ChapterMasters/Get?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',
        addChapter: localhost ? ' ' : apiPrefix + '/api/ChapterMasters/Save/',
        updateChapter: localhost ? ' ' : apiPrefix + '/api/ChapterMasters/Save/',
        deleteChapter: localhost ? ' ' : apiPrefix + '/api/ChapterMasters/Delete/',
//-------------------------------------------------------------------------ExaminationTypesMaster-------------------------------------------------------------------------------------
        getExaminationTypeList: localhost ? '/sampleData/examinationtypeList.json' : apiPrefix + '/api/ExaminationTypes/Get?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',
        addExaminationType: localhost ? ' ' : apiPrefix + '/api/ExaminationTypes/Save/',
        updateExaminationType: localhost ? ' ' : apiPrefix + '/api/ExaminationTypes/Save/',
        deleteExaminationType: localhost ? ' ' : apiPrefix + '/api/ExaminationTypes/Delete/',
//-------------------------------------------------------------------------TaskMaster--------------------------------------------------------------------------------------------------
        getTaskList: localhost ? '/sampleData/tasksList.json' : apiPrefix + '/api/Tasks/Get?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',
        addTask: localhost ? ' ' : apiPrefix + '/api/Tasks/Save/',
        updateTask: localhost ? ' ' : apiPrefix + '/api/Tasks/Save/',
        deleteTask: localhost ? ' ' : apiPrefix + '/api/Tasks/Delete/',

//-------------------------------------------------------------------------------------scheduledExam-------------------------------------------------------------------------------------

        getScheduleDetails: localhost ? '/sampleData/ScheduleExam/scheduledExam.json' : '/sampleData/ScheduleExam/scheduledExam.json',

        //StudentAdmissionForm

        //getDynamicFormData: localhost ? '/sampleData/StudentPortal/stdapplicationformdetail.json' : '/sampleData/StudentPortal/stdapplicationformdetail.json',

        //StudentCounselingPage & ReviewandApproveDetail

        getStdCounsellingDetail: localhost ? '/sampleData/StudentPortal/studentPortal.json' : apiPrefix + '/api/StudentDashBoard/GetApplicationFormList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&batchid={{bId}}&psid={{PsId}}&CourseId={{cId}}',

        getBatch: localhost ? ' ' : apiPrefix + '/api/BatchMasters/Get?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',

        getLinkedProgrmStudiesOfBatch: localhost ? ' ' : apiPrefix + '/api/ProgramStudies/GetBatchProgramStudyList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&batchid={{bId}}',
         
        getreviewandapproveDetail: localhost ? '/sampleData/ReviewAndApproveDetail/reviewandapprovedetail.json' : apiPrefix + '/api/StudentDashBoard/GetApplicationFormList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&batchid={{bId}}&psid={{PsId}}&CourseId={{cId}}',



        getProgramStudyList: localhost ? '/sampleData/programStudy/programStudyList.json' : apiPrefix + '/api/ProgramStudies/Get?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',
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
        getNotLinkedCourseList: localhost ? '' : apiPrefix + '/api/CourseSubjectAssociations/GetCourseSubjectNotLinkedList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&CourseId={{cId}}',
        removeSubjectfromList: localhost ? '' : apiPrefix + '/api/CourseSubjectAssociations/UnLink/',
        addSubjectInList: localhost ? '' : apiPrefix + '/api/CourseSubjectAssociations/Link/',
        getCourseSubjectList: localhost ? '' : apiPrefix + '/api/SubjectMasters/GetCourseSubjectList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&CourseId={{cId}}',

        getBulkModule: localhost ? '/sampleData/bulkUpload.json' : apiPrefix + '/api/BulkLoadMaster/Get/1',

//-------------------------------------------------------------------------------------------- manage Subject--------------------------------------------------------------------------------------------------
        getSubjectChapter: localhost ? '' : apiPrefix + '/api/ChapterMasters/GetSubjectChapterList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&sbjid={{subjid}}',
        getNotLinkedSubjectList: localhost ? '' : apiPrefix + '/api/SubjectChapterAssociations/GetSubjectChapterNotLinkedList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&subjid={{subjid}}',
        UnlinkChapter: localhost ? '' : apiPrefix + '/api/SubjectChapterAssociations/UnLink/',
        LinkChapter: localhost ? '' : apiPrefix + '/api/SubjectChapterAssociations/Link/',
        getSubjectChapterList: localhost ? '' : apiPrefix + '/api/SubjectChapterAssociations/GetSubjectChapterList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&subjid={{subjid}}',
//-----------------------------------------------------------------------------------------------manageTask---------------------------------------------------------------------------------------------------
        getTaskEmployee: localhost ? '' : apiPrefix + '/api/Employees/GetTaskStaffList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&taskid={{taskid}}',
        getNotLinkedTaskList: localhost ? '' : apiPrefix + '/api/TaskStaffAssociations/GetTaskStaffNotLinkedList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&taskid={{taskid}}',
        removeEmployeeFromList: localhost ? '' : apiPrefix + '/api/TaskStaffAssociations/UnLink/',
        addEmployeeInTaskList: localhost ? '' : apiPrefix + '/api/TaskStaffAssociations/Link/',
        //getTaskEmployeeList: localhost ? '' : apiPrefix + '/api/TaskStaffAssociations/GetSubjectChapterList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&taskid={{taskid}}',

//-------------------------------------------------------------------------------------------------student admission form---------------------------------------------------------------------------------------
        getDynamicFormData: localhost ? '/sampleData/StudentPortal/stdapplicationformdetail.json' : apiPrefix + '/api/StudentAdmissionForms/GetApplicationFormDetail?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&admissionnumber={{AdmissionNumber}}',
        getApplicationFormFeeDetail: localhost ? '/sampleData/StudentPortal/stdapplicationformdetail.json' : apiPrefix + '/api/StudentAdmissionForms/GetApplicationFormFeeDetail?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&admissionnumber={{admissionnumber}}',
        getApplicationFormHeader: localhost ? '' : apiPrefix + '/api/StudentAdmissionForms/GetApplicationFormHeader?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&admissionnumber={{admissionnumber}}',
        getAdmissionList: localhost ? '/sampleData/StudentPortal/studentPortal.json' : apiPrefix + '/api/StudentDashBoard/GetApplicationFormList?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}&batchid=null&psid=null&courseid=null',
        //addStudentAdmissionForm: localhost ? '' : apiPrefix + '',
        getAdmissionNumber: localhost ? '' : apiPrefix + '/api/StudentDashBoard/GetAdmissionNumber?id={{UniversityId}}&userid={{UserId}}&tokenid={{TokenId}}',
        saveStudentAdmissionForm: localhost ? '' : apiPrefix + '/api/StudentAdmissionForms/UpdateApplicationForm',
        addStudentAdmissionForm: localhost ? '' : apiPrefix + '/api/StudentAdmissionForms/UpdateApplicationForm',


        // Student Character Supervision

        getstudentcharacterList: localhost ? '/sampleData/studentcharacterList.json' : '/sampleData/StudentCharacterSupervision/studentcharacterList.json',

        // Merit and Demerit
        getmeritanddemeritList: localhost ? '/sampleData/meritanddemeritList.json' : '/sampleData/MeritAndDemerit/meritanddemeritList.json',

        //Loss And Found
        getlossandfoundList: localhost ? '/sampleData/lossandfoundList.json' : '/sampleData/LossAndFound/lossandfoundList.json',

        // Letter Permission
        getletterpermissionList: localhost ? '/sampleData/letterpermissionList.json' : '/sampleData/LetterPermission/letterpermissionList.json',


        // Mind Your language
        getmindyourlanguageList: localhost ? '/sampleData/mindyourlanguageList.json' : '/sampleData/MindYourLanguage/mindyourlanguageList.json',

        // Quz
        getquizList: localhost ? '/sampleData/quizList.json' : '/sampleData/Quiz/quizList.json',


        // StudentLeave
        getstudentleaveList: localhost ? '/sampleData/studentleaveList.json' : '/sampleData/StudentLeave/studentleaveList.json',

        // Student Diary
        getstudentdiaryList: localhost ? '/sampleData/studentdiaryList.json' : '/sampleData/StudentDiary/studentdiaryList.json',

        //Lesson plan
        getlessonplanList: localhost ? '/sampleData/lessonplanList.json' : '/sampleData/Lessonplan/lessonplanList.json',

        // Teacher note
        getteachernoteList: localhost ? '/sampleData/teachernoteList.json' : '/sampleData/TeacherNote/teachernoteList.json',

        // Physical Education
        getphysicaleducationList: localhost ? '/sampleData/physicaleducationList.json' : '/sampleData/PhysicalEducation/physicaleducationList.json',

        // Examination Syllabus
        getexaminationsyllabusList: localhost ? '/sampleData/examinationsyllabusList.json' : '/sampleData/ExaminationSyllabus/examinationsyllabusList.json'

    };