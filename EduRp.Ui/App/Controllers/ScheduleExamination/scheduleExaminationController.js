(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('scheduleExaminationController', scheduleExaminationCntrl);

    scheduleExaminationCntrl.$inject = ['$scope', '$q', '$modal', '$filter', 'scheduleExaminationService', 'commonService', '$compile', 'uiCalendarConfig', 'manageStudentCounsellingDetailService', 'programStudyService', 'managecourseService','examinationTypeService'];

    function scheduleExaminationCntrl($scope, $q, $modal, $filter, scheduleExaminationService, commonService, $compile, uiCalendarConfig, manageStudentCounsellingDetailService, programStudyService, managecourseService, examinationTypeService) {
        $scope.eventSources = [];
        $scope.scheduleDetails = undefined;
        $scope.scheduleExaminationForm = false;
        $scope.examinationName = null;
        $scope.events = [];
//-----------------------------------------------------------------array which holds the drop down values -------------------------------------------------------
        $scope.programStudyData = [];
        $scope.courseData = [];
        $scope.batchList = [];
        $scope.examTypeData = [];
        $scope.subjectData = [];
//----------------------------------------------------------------variable used for databinding ------------------------------------------------------------------
        $scope.selectedBatch = null;
        $scope.selectedPS = null;
        $scope.selectedCourse = null;
        $scope.selectExamType = null;
        $scope.selectSubject = null;


        $scope.init = init;
        $scope.showExaminationDropdown = showExaminationDropdown;
        $scope.endDateBeforeRender = endDateBeforeRender;
        $scope.endDateOnSetTime = endDateOnSetTime;
        $scope.startDateBeforeRender = startDateBeforeRender;
        $scope.startDateOnSetTime = startDateOnSetTime;
        $scope.cancelScheduling = cancelScheduling;
        $scope.scheduleExamination = scheduleExamination; 

        $scope.manageStudentCounsellingDetailService = manageStudentCounsellingDetailService;
        $scope.fetchProgramStudyByBatchId = fetchProgramStudyByBatchId;
        $scope.fetchCourseByProgramStudyId = fetchCourseByProgramStudyId;
        $scope.fetchSubjectByCourseId = fetchSubjectByCourseId;

        init();
        function init() {

            scheduleExaminationService.getScheduleDetails().then(detailSuccess, detailError);
//------------------------------------------------------------------------------------------------------examination type drop down func  --------------------
            examinationTypeService.getExaminationTypeList().then(examtypedetailSuccess, examtypedetailError);
//------------------------------------------------------------------------------------------------------batch drop down func  -------------------------------
            manageStudentCounsellingDetailService.selectBatch().then(function (data) {
                console.log(data);
                if (data !== null) {
                    $scope.batchList = data.results;
                }
                else {
                    alert("Please select a Batch");
                }
            }, function (reason) {
                errorHandler.logServiceError('manageStudentCounsellingDetailController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('manageStudentCounsellingDetailController', update);
            });
            

        }

        /**
         * Below four methods are for date and time picker.
         * All the 4 methods are dependent for date and time picker
         */
        function startDateOnSetTime () {
            $scope.$broadcast('start-date-changed');
        }

        function endDateOnSetTime () {
            $scope.$broadcast('end-date-changed');
        }

        function startDateBeforeRender ($dates) {
            if ($scope.dateRangeEnd) {
                var activeDate = moment($scope.dateRangeEnd);

                $dates.filter(function (date) {
                    return date.localDateValue() >= activeDate.valueOf()
                }).forEach(function (date) {
                    date.selectable = false;
                })
            }
        }

        function endDateBeforeRender ($view, $dates) {
            if ($scope.dateRangeStart) {
                var activeDate = moment($scope.dateRangeStart).subtract(1, $view).add(1, 'minute');

                $dates.filter(function (date) {
                    return date.localDateValue() <= activeDate.valueOf()
                }).forEach(function (date) {
                    date.selectable = false;
                })
            }
        }

        /**
         * On click of Schedule exam button
         * Show datetime picker dropdown
         */
        function showExaminationDropdown(){
            $scope.scheduleExaminationForm = true;
        }

        /**
         * on click of cancel button,
         * close the dropdown and reset the time
         */
        function cancelScheduling(){
            $scope.scheduleExaminationForm = false;
            $scope.dateRangeStart = null;
            $scope.dateRangeEnd = null;
        }

        /**
         * on click of schedule button in dropdown,
         * get the exam name , start date, End date and populate in the calender
         */
        function scheduleExamination(){
            $scope.events.push({
                title: $scope.examinationName,
                start: new Date($scope.dateRangeStart),
                end: new Date($scope.dateRangeEnd),
                stick: true
            });

        }

        /**
         * Get the all the schedule date on page load,
         * and populate in the calender
         * @param response
         */

        function detailSuccess(response){
            $scope.scheduleDetails = response.ExamSchedule;

            angular.forEach($scope.scheduleDetails, function(i , j){
                $scope.events.push({
                    title: i.subject,
                    start: new Date(i.startDate),
                    end: new Date(i.endDate),
                    stick: true
                });
            });
        }
 //--------------------------------------------------------------------------exam type success failure response starts here --------------------------------------------       
        function examtypedetailSuccess(response) {
            $scope.examTypeData = response.results;
        }

        function examtypedetailError(response) {
            console.log(" ExamType Data Not Found");
        }
//---------------------------------------------------------------------------exam type success failure response ends here-----------------------------------------------
        /**
         * If get method fail, show error
         */
        function detailError(){
            console.log("Schedule Details Not found");
        }

        /**
         * Below config is for the calender.
         * @type {{calendar: {height: number, editable: boolean, header: {left: string, center: string, right: string}, eventClick: alertOnEventClick|*, eventDrop: alertOnDrop|*, eventResize: alertOnResize|*}}}
         */
        $scope.eventSources = [$scope.events];
        $scope.uiConfig = {
            calendar: {
                height: 650,
                editable: true,
                header: {
                    left: 'month basicWeek basicDay agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize
            }
        };




        // var date = new Date();
        // var d = date.getDate();
        // var m = date.getMonth();
        // var y = date.getFullYear();


        //$scope.changeTo = 'Hungarian';
        /* event source that pulls from google.com */
        // $scope.eventSource = {
        //     url: "",
        //     className: 'gcal-event',           // an option!
        //     currentTimezone: 'India' // an option!
        // };
        /* event source that calls a function on every view switch */
        // $scope.eventsF = function (start, end, timezone, callback) {
        //     var s = new Date(start).getTime() / 1000;
        //     var e = new Date(end).getTime() / 1000;
        //     var m = new Date(start).getMonth();
        //     var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
        //     callback(events);
        // };



        // $scope.calEventsExt = {
        //     color: '#f00',
        //     textColor: 'yellow',
        //     // events: [
        //     //     {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
        //     //     {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
        //     //     {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        //     // ]
        // };
        /* alert on eventClick */
        // $scope.alertOnEventClick = function( date, jsEvent, view){
        //     $scope.alertMessage = (date.title + ' was clicked ');
        //     console.log($scope.alertMessage);
        // };
        /* alert on Drop */
        // $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
        //     $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
        // };
        // /* alert on Resize */
        // $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
        //     $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
        // };
        /* add and removes an event source of choice */
        // $scope.addRemoveEventSource = function(sources,source) {
        //     var canAdd = 0;
        //     angular.forEach(sources,function(value, key){
        //         if(sources[key] === source){
        //             sources.splice(key,1);
        //             canAdd = 1;
        //         }
        //     });
        //     if(canAdd === 0){
        //         sources.push(source);
        //     }
        // };
        /* add custom event*/
        // $scope.addEvent = function() {
        //     $scope.events.push({
        //         title: 'Open Sesame',
        //         start: new Date(y, m, 28),
        //         end: new Date(y, m, 29),
        //         className: ['openSesame']
        //     });
        // };
        /* remove event */
        // $scope.remove = function(index) {
        //     $scope.events.splice(index,1);
        // };
        // /* Change View */
        // $scope.changeView = function(view,calendar) {
        //     uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
        // };
        /* Change View */
        // $scope.renderCalender = function(calendar) {
        //     if(uiCalendarConfig.calendars[calendar]){
        //         uiCalendarConfig.calendars[calendar].fullCalendar('render');
        //     }
        // };
        // /* Render Tooltip */
        // $scope.eventRender = function( event, element, view ) {
        //     element.attr({'tooltip': event.title,
        //         'tooltip-append-to-body': true});
        //     $compile(element)($scope);
        // };
        //
        // $scope.changeLang = function() {
        //     if($scope.changeTo === 'Hungarian'){
        //         $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
        //         $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
        //         $scope.changeTo= 'English';
        //     } else {
        //         $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        //         $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        //         $scope.changeTo = 'Hungarian';
        //     }
        // };
        /* event sources array*/

        //$scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];

//<--------------------------------------------------------------------------------other filter drop downs start here ---------------------------------------------------->
        function fetchProgramStudyByBatchId(batchData) {
            var selBatch = angular.copy(batchData);
            if (selBatch) {
                $q.all([
                    manageStudentCounsellingDetailService.getLinkedProgrmStudiesOfBatch(selBatch)
                ]).then(function (data) {
                    // $scope.mainContentSubPart = true;
                    if (data !== null) {
                        $scope.programStudyData = data[0].results;

                    }
                }, function (reason) {
                    errorHandler.logServiceError('programStudyController', reason);
                });
            } else {
                alert("Please select a course");
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

                    }
                }, function (reason) {
                    errorHandler.logServiceError('programStudyController', reason);
                });
            } else {
                alert("Please select a course");
            }
        }

        //function fetchSubjectByCourseId(selectedCourse) {
        //    var selCourse = angular.copy(selectedCourse);
        //    if (selectedCourse) {
        //        $q.all([
        //            managecourseService.getCourseListItem(selectedCourse)
        //        ]).then(function (data) {
        //            if (data !== null) {
        //                $scope.subjectData = data[0].results;
        //            }
        //        },
        //            function (reason) {
        //                errorHandler.logServiceError('', reason)
        //            });
        //    }
        //    else {
        //        alert("please select a subject");
        //    }

        //}
//<------------------------------------------------------------------------filter drop downs ends here ----------------------------------------------------->

        $scope.Modals = {
            openSubjectContainer: function () {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/App/Templates/ScheduleExamination/scheduleExaminationForm.html',
                    size: 'lg',
                    scope: $scope,
                    backdrop: 'static'
                });
            },
            closeModalContainer: function () {
                $scope.modalInstance.dismiss();
            }
        };

    }
    
})();