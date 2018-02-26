(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('manageSubjectController', manageSubjectController);

    manageSubjectController.$inject = ['$scope', '$q', '$log', 'manageSubjectService', 'commonService', '$modal'];

    function manageSubjectController($scope, $q, $log, manageSubjectService, commonService, $modal) {

        $scope.subjectListItem = [];
        $scope.subjectListDetails = undefined;
        $scope.showSubjectDetailList = false;
        $scope.selectedSubject = undefined;
        //$scope.selectAllCourseList = false;
        $scope.assignChapterModal = false;
        $scope.notLinkedChapters = undefined;
        //$scope.selectCourse = undefined;

        $scope.init = init;
        $scope.getSelectedSubjectDetails = getSelectedSubjectDetails;
        $scope.assignChapter = assignChapter;
        $scope.removeSelectedChapter = removeSelectedChapter;
        $scope.addChapterIntoList = addChapterIntoList;
        $scope.selectAllSubject = selectAllSubject;
        $scope.toggleSubjectDetails = toggleSubjectDetails;
        $scope.toggleNotlinkedChapter = toggleNotlinkedChapter;
        $scope.selectAllNotlinkedListItems = selectAllNotlinkedListItems;

        init();

        function init() {
            manageSubjectService.getSubjectList().then(subjectListSuccess, subjectListError);
        }

        function subjectListSuccess(response) {
            $scope.subjectListItem = response.results;
            console.log(response);
            console.log($scope.subjectListItem);
        }

        function subjectListError(response) {
            $log.info("subject list item error");
        }


        /**
         * Get all the subject details,
         * on selected couse from dropdrown
         */
        function getSelectedSubjectDetails() {
            manageSubjectService.getSubjectListItem($scope.selectedSubject).then(selectedSubjectDetailSuccess, selectedSubjectDetailError);
        }
        //GridFunctionality
        function selectedSubjectDetailSuccess(response) {
            $scope.subjectListDetails = response.results;
            $scope.showSubjectDetailList = true;
        }

        function selectedSubjectDetailError(response) {
            $log.info("Subject details error");
        }

        /**
         * On Click of Assign Subject button,
         * get all the unlinked Subject and oprn the popup modal
         */
        function assignChapter() {
            manageSubjectService.getNotLinkedSubjectList($scope.selectedSubject).then(notLinkedSubjectSuccess, notLinkedSubjectError);
            $scope.selectedSubject.SubjectId;
        }

        function notLinkedChapterSuccess(response) {
            $scope.notLinkedChapters = response.results;
            $scope.Modals.openChapterContainer();
        }

        function notLinkedSubjectError(response) {
            $log.info("Not linked error");
        }

        /**
         * Below Method is for removing the seleced
         * subject from the list
         */

        function removeSelectedChapter() {
            var selectedChapter = [];
            var cookieData = commonService.fetchMainCookieData();
            /**
             * Get all the selected subject and push the selected item to the array,
             * if array is blank, alert for select,
             * else proceed the journey
             */
            $scope.subjectListDetails.forEach(function (chapter) {
                if (chapter.selected) {
                    var chapterID = angular.copy(chapter.ChapterId);
                    var subjectID = angular.copy(chapter.SubjectId);
                    var chapdata = {
                        "chapterId": chapterID,
                        "subjectId": subjectID
                    };
                    chapdata = angular.extend({}, cookieData, chapdata);
                    selectedChapter.push(chapdata);
                }
            });
            if (selectedChapter.length === 0) {
                alert("Please Select an chapter");
            } else {
                manageSubjectService.removeChapterFromList(selectedChapter).then(removeChapterSuccess, removeChapterError);
            }
        }

        function removeChapterSuccess(response) {
            manageSubjectService.getSubjectListItem($scope.selectedSubject.SubjectId).then(selectedSubjectDetailSuccess, selectedSubjectDetailError);
        }

        function removeChapterError(response) {
            console.log("Error");
        }

        /**
         * Toggle all checkboxes,
         * in Manage course Table
         */
        function selectAllSubjects() {
            var boolean = true;
            if ($scope.selectAllSubjectList) {
                boolean = false;
            }
            angular.forEach($scope.subjectListDetails, function (v, k) {
                v.selected = boolean;
                $scope.selectAllSubjectList = boolean;
            });
        }

        function toggleSubjectDetails() {
            $scope.selectAllSubjectList = true;
            angular.forEach($scope.subjectListDetails, function (v, k) {
                if (!v.selected) {
                    $scope.selectAllSubjectList = false;
                }
            });
        }

        /**
         * Toggle all the checkboxes in,
         * Assign Subject modal popup
         */

        function selectAllNotlinkedListItems() {
            var flag = true;
            if ($scope.selectAllNotlinkedList) {
                flag = false;
            }
            angular.forEach($scope.notLinkedChapters, function (a, b) {
                a.selected = flag;
                $scope.selectAllNotlinkedList = flag;
            });
        }

        function toggleNotlinkedChapter() {
            $scope.selectAllNotlinkedList = true;
            angular.forEach($scope.notLinkedChapters, function (a, b) {
                if (!a.selected) {
                    $scope.selectAllNotlinkedList = false;
                }
            });
        }

        /**
         * Below method will execute, when click
         * on Assign Subject button from popup
         */
        function addChapterIntoList() {
            var addChapterList = [];
            var cookieData = commonService.fetchMainCookieData();
            /**
             * Get all the selected subject and push the selected item to the array,
             * if array is blank, alert for select,
             * else proceed the journey
             */
            angular.forEach($scope.notLinkedSubjects, function (chapter) {
                if (subject.selected) {
                    var chapterID = angular.copy(chapter.ChapterId);
                    var chapterNumber = angular.copy(chapter.chapterNumber);
                    var chapterTitle = angular.copy(chapter.chapterTitle);
                    var ModeOfTeaching = angular.copy(chapter.ModeOfTeaching);
                    var chapterDetails = angular.copy(chapter.chapterDetails)
                    var chapdata = {
                        "ChapterId": chapterID,
                        "chapterNumber": chapterNumber,
                        "chapterTitle": chapterTitle,
                        "ModeOfTeaching": ModeOfTeaching,
                        "chapterDetails": chapterDetails
                    };
                    chapdata = angular.extend({}, cookieData, chapdata);
                    addChapterList.push(chapdata);
                }
            });
            console.log(addChapterList);
            if (addChapterList.length === 0) {
                alert("Please Select a Chapter");
            } else {
                manageSubjectService.addChapterInSubjectList(addChapterList).then(addChapterInSubjectListSuccess, addChapterInSubjectListError);
            }
        }

        function addChapterInSubjectListSuccess() {
            console.log("Success");
            manageSubjectService.getSubjectListItem().then(selectedSubjectDetailSuccess, selectedSubjectDetailError);
            $scope.Modals.closeModalContainer();
        }

        function addChapterInSubjectListError() {
            console.log("Error");
        }

        /**
         * Add below peice of code for modal opening.
         * @type {{openChapterContainer: openChapterContainer, closeModalContainer: closeModalContainer}}
         */
        $scope.Modals = {
            openChapterContainer: function () {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/App/Templates/ManageSubject/assignChapters.html',
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