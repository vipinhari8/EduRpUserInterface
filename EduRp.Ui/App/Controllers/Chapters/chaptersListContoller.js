(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('chaptersListController', chaptersListController);

    chaptersListController.$inject = ['$scope', '$q', 'chaptersListService', 'errorHandler', '$modal', 'commonService'];

    function chaptersListController($scope, $q, chaptersListService, errorHandler, $modal, commonService) {
        $scope.chaptersData = [];
        $scope.filteredChaptersData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'ChapterTitle';
        $scope.reverseSort = false;
        $scope.adjustChaptersList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredChaptersData = angular.copy($scope.chaptersData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustChaptersList();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];

        $scope.modChaptersObj = {};
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };

        //Get PageLoad
        (function startup() {

            $q.all([
                chaptersListService.getChaptersList()
            ]).then(function (data) {
                if (data !== null) {
                    $scope.chaptersData = data[0].results;
                    $scope.adjustChaptersList();
                }
            }, function (reason) {
                errorHandler.logServiceError('chaptersListController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('chaptersListController', update);
            });
        })();


        $scope.addChaptersContainer = function () {
            $scope.modalType = 'add';
            $scope.Modals.openChaptersContainer();
        };
        //Add
        $scope.addChaptersDetails = function (form) {
            if (form.$valid) {
                $q.when([chaptersListService.addChapter($scope.modChaptersObj)]).then(function (data) {
                    $scope.filteredChaptersData.push($scope.modChaptersObj);
                    $scope.Modals.closeChaptersContainer();
                }, function (error) {
                    alert("please try later");
                });

            }

        };

        //update
        $scope.editChaptersContainer = function (data) {
            $scope.modalType = 'update';
            $scope.modChaptersObj = data;
            $scope.Modals.openChaptersContainer();
        };

        $scope.updateChaptersDetails = function (form, fid) {

            if (form.$valid) {
                var postData = {
                    "ChapterNumber": $scope.modChaptersObj.ChapterNumber,
                    "ChapterTitle": $scope.modChaptersObj.ChapterTitle,
                    "ModeOfTeaching": $scope.modChaptersObj.ModeOfTeaching,
                    "ChapterDetails": $scope.modChaptersObj.ChapterDetails,
                    "SKS": $scope.modChaptersObj.SKS
                };
                chaptersListService.updateChapter($scope.modChaptersObj).then(function (data) {
                    angular.forEach($scope.filteredChaptersData, function (v, k) {
                        if (v.SubjectId === sid) {
                            $scope.filteredChaptersData[k]['FeeLabel'] = $scope.modChaptersObj.FeeLabel;
                            $scope.filteredChaptersData[k]['Amount'] = $scope.modChaptersObj.Amount;
                            $scope.filteredChaptersData[k]['FeeType'] = $scope.modChaptersObj.FeeType;
                            $scope.filteredChaptersData[k]['Description'] = $scope.modChaptersObj.Description;
                        }
                    });
                    $scope.Modals.closeChaptersContainer();
                }, function (error) {
                    alert("Please try again");
                });

            }
        };
        //delete 

        $scope.deleteChaptersContainer = function (sd) {
            if (confirm('Are you sure you want to delete this Chapter?')) {
                chaptersListService.deleteChapter(cd).then(function (data) {
                    $scope.filteredChaptersData = commonService.removeItemFromArray($scope.filteredChaptersData, cd);
                }, function (error) {
                    alert("Please try again");
                });
            }


        };


        $scope.Modals = {
            openChaptersContainer: function () {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: '/App/Templates/Chapters/addEditModalPopup.html',
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
            closeChaptersContainer: function () {
                $scope.modalInstance.dismiss();
            }
        };

    };
})
    ();