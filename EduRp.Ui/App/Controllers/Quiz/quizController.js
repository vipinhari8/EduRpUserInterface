(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('quizController', quizController);

    quizController.$inject = ['$scope', '$q', 'quizService', 'errorHandler', '$modal', 'commonService'];

    function quizController($scope, $q, quizService, errorHandler, $modal, commonService) {
        $scope.QuizData = [];
        $scope.filteredQuizData = [];
        $scope.currentPage = 1
            , $scope.numPerPage = 5
            , $scope.maxSize = 5;
        $scope.orderByField = 'Date';
        $scope.reverseSort = false;
        $scope.adjustquizList = function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredQuizData = angular.copy($scope.QuizData.slice(begin, end));
        };
        $scope.$watch('currentPage + numPerPage', function () {
            $scope.adjustquizList();
        });

        $scope.showPerPageDataOptions = [5, 10, 25, 50, 100];

        $scope.modQuizObj = {};
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };

        //Get PageLoad
        (function startup() {

            $q.all([
                quizService.getquizList()
            ]).then(function (data) {
                if (data !== null) {
                    $scope.QuizData = data[0].results;
                    $scope.adjustquizList();
                }
            }, function (reason) {
                errorHandler.logServiceError('quizController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('quizController', update);
            });
        })();


    };
})
    ();