(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('managecourcesController', managecourcesCtrl);

    managecourcesCtrl.$inject = ['$scope', '$q', '$log', 'managecourseService', 'commonService', '$modal','errorHandler'];

    function managecourcesCtrl($scope, $q, $log, managecourseService, commonService, $modal, errorHandler) {

        $scope.courseListItem = [];
        $scope.courseListDetails = undefined;
        $scope.showCourseDetailList = false;
        $scope.selectedCourse = undefined;
        //$scope.selectAllCourseList = false;
        $scope.assignSubjectModal = false;
        $scope.notLinkedSubjects = undefined;
        //$scope.selectCourse = undefined;

        $scope.init = init;
        $scope.getSelectedCourseDetails = getSelectedCourseDetails;
        $scope.assignSubject = assignSubject;
        $scope.removeSelectedSubject = removeSelectedSubject;
        $scope.addSubjectIntoList = addSubjectIntoList;
        $scope.selectAllCourses = selectAllCourses;
        $scope.toggleCourseDetails = toggleCourseDetails;
        $scope.toggleNotlinkedSubject = toggleNotlinkedSubject;
        $scope.selectAllNotlinkedListItems = selectAllNotlinkedListItems;

        init();

        function init(){
            managecourseService.getCourseList().then(courseListSuccess, courseListError);
        }

        function courseListSuccess(response) {
            $scope.courseListItem = response.results;
            console.log(response);
            console.log($scope.courseListItem);
        }

        function courseListError(response) {
            $log.info("Course list item error");
        }


        /**
         * Get all the subject details,
         * on selected couse from dropdrown
         */
        function getSelectedCourseDetails(){
            managecourseService.getCourseListItem($scope.selectedCourse).then(selectedCourseDetailSuccess, selectedCourseDetailError);
        }
        //GridFunctionality
        function selectedCourseDetailSuccess(response){
            $scope.courseListDetails = response.results;
            $scope.showCourseDetailList = true;
        }

        function selectedCourseDetailError(response) {
            $log.info("Course details error");
        }

        /**
         * On Click of Assign Subject button,
         * get all the unlinked Subject and oprn the popup modal
         */
        function assignSubject(){
            managecourseService.getNotLinkedCourseList($scope.selectedCourse).then(notLinkedCourseSuccess, notLinkedCourseError);
            $scope.selectedCourse.CourseId;
        }

        function notLinkedCourseSuccess(response){
            $scope.notLinkedSubjects = response.results;
            $scope.Modals.openSubjectContainer();
        }

        function notLinkedCourseError(response){
            $log.info("Not linked error");
        }

        /**
         * Below Method is for removing the seleced
         * subject from the list
         */

        function removeSelectedSubject(){
            var selectedSubject = [];
            var cookieData = commonService.fetchMainCookieData();
            /**
             * Get all the selected subject and push the selected item to the array,
             * if array is blank, alert for select,
             * else proceed the journey
             */
            $scope.courseListDetails.forEach(function(subject){
                if(subject.selected){
                    var subjectID = angular.copy(subject.SubjectId);
                    var courseID = angular.copy(subject.CourseId);
                    var subdata = {
                        "subjectId" : subjectID,
                        "courseId" : courseID
                    };
                    subdata = angular.extend({},cookieData, subdata);
                    selectedSubject.push(subdata);
                }
            });
            if(selectedSubject.length === 0){
                alert("Please Select an subject");
            }else{
                managecourseService.removeSubjectFromList(selectedSubject).then(removeSubjectSuccess, removeSubjectError);
            }
        }

        function removeSubjectSuccess(response){
            managecourseService.getCourseListItem($scope.selectedCourse).then(selectedCourseDetailSuccess, selectedCourseDetailError);
        }

        function removeSubjectError(response){
            console.log("Error");
        }

        /**
         * Toggle all checkboxes,
         * in Manage course Table
         */
        function selectAllCourses(){
            var boolean = true;
            if ($scope.selectAllCourseList) {
                boolean = false;
            }
            angular.forEach($scope.courseListDetails, function(v, k) {
                v.selected = boolean;
                $scope.selectAllCourseList = boolean;
            });
        }

        function toggleCourseDetails(){
            $scope.selectAllCourseList = true;
            angular.forEach($scope.courseListDetails, function(v, k) {
                if(!v.selected){
                    $scope.selectAllCourseList = false;
                }
            });
        }

        /**
         * Toggle all the checkboxes in,
         * Assign Subject modal popup
         */

        function selectAllNotlinkedListItems(){
            var flag = true;
            if ($scope.selectAllNotlinkedList) {
                flag = false;
            }
            angular.forEach($scope.notLinkedSubjects, function(a, b) {
                a.selected = flag;
                $scope.selectAllNotlinkedList = flag;
            });
        }

        function toggleNotlinkedSubject(){
            $scope.selectAllNotlinkedList = true;
            angular.forEach($scope.notLinkedSubjects, function(a, b) {
                if(!a.selected){
                    $scope.selectAllNotlinkedList = false;
                }
            });
        }

        /**
         * Below method will execute, when click
         * on Assign Subject button from popup
         */
        function addSubjectIntoList(){
            var addSubjectList = [];
            var cookieData = commonService.fetchMainCookieData();
            /**
             * Get all the selected subject and push the selected item to the array,
             * if array is blank, alert for select,
             * else proceed the journey
             */
            angular.forEach($scope.notLinkedSubjects, function(subject){
                if (subject.selected) {
                    var courseID = angular.copy($scope.selectedCourse.CourseId);
                    var subjectID = angular.copy(subject.SubjectId);
                    var subjectCode = angular.copy(subject.SubjectCode);
                    var subjectName = angular.copy(subject.SubjectName)
                    var subdata = {
                        "courseId": courseID,
                        "subjectId" : subjectID,
                        "SubjectCode" : subjectCode,
                        "SubjectName" : subjectName
                    };
                    subdata = angular.extend({},cookieData, subdata);
                    addSubjectList.push(subdata);
                }
            });
            console.log(addSubjectList);

            if (addSubjectList.length !== 0) {
                managecourseService.addSubjectInCorseList(addSubjectList).then(linkSubjectSuccess, linkSubjectError);
            } else {
                alert("Please Select an subject");
            }

            function linkSubjectSuccess(response) {
                managecourseService.getCourseListItem($scope.selectedCourse).then(selectedCourseDetailSuccess, selectedCourseDetailError);
                $scope.Modals.closeModalContainer();
            }

            function linkSubjectError(response) {
                console.log("Error");
            }
            //if (addSubjectList.length !==0) {
            //    $q.when([managecourseService.addSubjectInCorseList(addSubjectList)]).then(function (data) {
            //            $scope.courseListDetails.push(addSubjectList);
            //            $scope.Modals.closeModalContainer();
            //    },function (error) {
            //            alert("please select a subject");
            //    });
            //}
            
        }

        /**
         * Add below peice of code for modal opening.
         * @type {{openSubjectContainer: openSubjectContainer, closeModalContainer: closeModalContainer}}
         */
        $scope.Modals = {
            openSubjectContainer: function () {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/App/Templates/ManageCourses/manageSubjectPopup.html',
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
            closeModalContainer: function () {
                $scope.modalInstance.dismiss();
            }
        };

    }
})
();