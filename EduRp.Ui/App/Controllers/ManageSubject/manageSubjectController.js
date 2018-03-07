(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('manageSubjectController', manageSubjectController);

    manageSubjectController.$inject = ['$scope', '$q', '$log', 'manageSubjectService', 'commonService', '$modal', 'errorHandler'];

    function manageSubjectController($scope, $q, $log, manageSubjectService, commonService, $modal, errorHandler) {

        $scope.subjectListItem = [];
        $scope.subjectListDetails = [];
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
        $scope.selectAllSubjects = selectAllSubjects;
        $scope.toggleSubjectDetails = toggleSubjectDetails;
        $scope.toggleNotlinkedChapter = toggleNotlinkedChapter;
        $scope.selectAllNotlinkedListItems = selectAllNotlinkedListItems;


        $scope.filteredSubjectData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'ChapterNumber';
        $scope.reverseSort = false;
        $scope.adjustSubjectList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredSubjectData = angular.copy($scope.subjectListDetails.slice(begin, end));
            console.log("Hi");
            console.log($scope.subjectListDetails);
            console.log($scope.filteredSubjectData);
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustSubjectList();
        });
        
        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];

        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };


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
         * Get all the chapter details,
         * on selected couse from dropdrown
         */
        function getSelectedSubjectDetails() {
            manageSubjectService.getSubjectListItem($scope.selectedSubject).then(selectedSubjectDetailSuccess, selectedSubjectDetailError);
        }
        //GridFunctionality
        function selectedSubjectDetailSuccess(response) {
            $scope.subjectListDetails = response.results;
            $scope.adjustSubjectList();
            $scope.showSubjectDetailList = true;
        }

        function selectedSubjectDetailError(response) {
            $log.info("subject details error");
        }

        /**
         * On Click of Assign Subject button,
         * get all the unlinked Subject and oprn the popup modal
         */
        function assignChapter() {
            manageSubjectService.getNotLinkedSubjectList($scope.selectedSubject).then(notLinkedSubjectSuccess, notLinkedSubjectError);
            $scope.selectedSubject.SubjectId;
        }

        function notLinkedSubjectSuccess(response) {
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
                    var ChapterID = angular.copy(chapter.ChapterId);
                    var SubjectID = angular.copy(chapter.SubjectId);
                    var chapdata = {
                        "ChapterId": ChapterID,
                        "SubjectId": SubjectID
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
            manageSubjectService.getSubjectListItem($scope.selectedSubject).then(selectedSubjectDetailSuccess, selectedSubjectDetailError);
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
            angular.forEach($scope.notLinkedChapters, function (chapter) {
                if (chapter.selected) {
                    var SubjectId = angular.copy($scope.selectedSubject.SubjectId);
                    var ChapterId = angular.copy(chapter.ChapterId);
                    var ChapterNumber = angular.copy(chapter.ChapterNumber);
                    var ChapterTitle = angular.copy(chapter.ChapterTitle);
                    var ModeOfTeaching = angular.copy(chapter.ModeOfTeaching);
                    var ChapterDetails = angular.copy(chapter.ChapterDetails);
                    var SKS = angular.copy(chapter.SKS);
                    var chapdata = {
                        "SubjectId": SubjectId,
                        "ChapterId": ChapterId,
                        "ChapterNumber": ChapterNumber,
                        "ChapterTitle": ChapterTitle,
                        "ModeOfTeaching": ModeOfTeaching,
                        "ChapterDetails": ChapterDetails,
                        "SKS":SKS
                    };
                    chapdata = angular.extend({}, cookieData, chapdata);
                    addChapterList.push(chapdata);
                }
            });
            console.log(addChapterList);

            if (addChapterList.length !== 0) {
                manageSubjectService.addChapterInSubjectList(addChapterList).then(linkChapterSuccess, linkChapterError);
            } else {
                alert("Please Select an chapter");
            }

            function linkChapterSuccess(response) {
                manageSubjectService.getSubjectListItem($scope.selectedSubject).then(selectedSubjectDetailSuccess, selectedSubjectDetailError);
                $scope.Modals.closeModalContainer();
            }

            function linkChapterError(response) {
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
                    function (chapter) {

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