(function () {
    'use strict';

    angular
        .module('EduRpApp')
        .controller('createBatchController', createBatchController);

    createBatchController.$inject = ['$scope', '$q', 'createBatchService', 'errorHandler', '$modal', '$translate', 'commonService'];

    function createBatchController($scope, $q, createBatchService, errorHandler, $modal, $translate, commonService) {

        $scope.programStudyData = [];
        $scope.filteredProgramStudyData = [];
        $scope.programStudyCurrentPage = 1;
        $scope.programStudyNumPerPage = 10;
        $scope.programStudyMaxSize = 5;
        $scope.assignedProgramStudyCodeByField = 'ProgramStudyCode';
        $scope.assignedProgramStudyReverseSort = false;
        $scope.nonAssignedProgramStudyOrderByField = 'ProgramStudyCode';
        $scope.nonAssignedProgramStudyReverseSort = false;
        $scope.selectedBatch = null;
        $scope.mainContent = false;
        $scope.mainContentSubPart = false;
        $scope.linkedProgramStudySelectedArr = [];
        $scope.unlinkedProgramStudySelectedArr = [];
        $scope.adjustProgramStudyList = function () {
            var begin = (($scope.programStudyCurrentPage - 1) * $scope.programStudyNumPerPage)
                , end = begin + $scope.programStudyNumPerPage;

            $scope.filteredProgramStudyData = angular.copy($scope.programStudyData.slice(begin, end));
        };
        $scope.$watch('programStudyCurrentPage + programStudyNumPerPage', function () {
            $scope.adjustProgramStudyList();
        });
        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
        };

        $scope.feesData = [];
        $scope.filteredFeesData = [];
        $scope.feesCurrentPage = 1;
        $scope.feesNumPerPage = 10;
        $scope.feesMaxSize = 5;
        $scope.assignedFeesOrderByField = 'feesName';
        $scope.assignedFeesReverseSort = false;
        $scope.nonAssignedFeesOrderByField = 'feesName';
        $scope.nonAssignedFeesReverseSort = false;
        $scope.linkedFeesSelectedArr = [];
        $scope.unlinkedFeesSelectedArr = [];

        $scope.adjustFeesList = function () {
            var begin = (($scope.feesCurrentPage - 1) * $scope.feesNumPerPage)
                , end = begin + $scope.feesNumPerPage;

            $scope.filteredFeesData = angular.copy($scope.feesData.slice(begin, end));
        };
        $scope.$watch('feesCurrentPage + feesNumPerPage', function () {
            $scope.adjustFeesList();
        });

        $scope.showPerPageDataOptions = [10, 25, 50, 100];

        $scope.addBatchFormObj = { status: "Active" };

        
        $scope.modalType = '';
        $scope.filterPanel = false;

        $scope.unlinkedProgramStudyOfBatchList = null;
        $scope.unlinkedFeesOfBatchList = null;

        $scope.toggleFilterPanel = function () {
            $scope.filterPanel = !$scope.filterPanel;
        };

        $scope.addBatchContainer = function () {
            $scope.Modals.open('App/Templates/CreateBatch/addBatch.html');
        };
        $scope.assignProgramStudyContainer = function () {
            $q.all([createBatchService.getUnlinkedProgramStudyOfBatch($scope.selectedBatch)]).then(function (data) {
                $scope.unlinkedProgramStudyOfBatchList = data[0].results;
            }, function () {

            });

            $scope.Modals.open('App/Templates/CreateBatch/assignProgramStudy.html');
        };
        $scope.assignFeesContainer = function () {
            $q.all([createBatchService.getUnlinkedFeesOfBatch($scope.selectedBatch)]).then(function (data) {
                $scope.unlinkedFeesOfBatchList = data[0].results;
            }, function () {

            });
            $scope.Modals.open('App/Templates/CreateBatch/assignFees.html');
        };

        $scope.isLinkedProgramStudyAllSelected = function () {
            if ($scope.linkedProgramStudyAllSelected) {
                var tt = $scope.filteredProgramStudyData;
                for (var i = 0; i < tt.length; i++) {
                    var eachRow = tt[i];
                    eachRow.BatchId = $scope.selectedBatch.BatchId;
                    eachRow = angular.extend({}, commonService.fetchMainCookieData(), eachRow);
                    $scope.linkedProgramStudySelectedArr.push(eachRow);
                    $scope.filteredProgramStudyData[i].Selected = 'true';
                }
            } else {
                angular.forEach($scope.filteredProgramStudyData, function (item) {
                    $scope.linkedProgramStudySelectedArr = [];
                    item.Selected = 'false';
                });
            }
        };
        $scope.isUnlinkedProgramStudyAllSelected = function () {
            if ($scope.unlinkedProgramStudyAllSelected) {
                var tt = $scope.unlinkedProgramStudyOfBatchList;
                for (var i = 0; i < tt.length; i++) {
                    var eachRow = tt[i];
                    eachRow.BatchId = $scope.selectedBatch.BatchId;
                    eachRow = angular.extend({}, commonService.fetchMainCookieData(), eachRow);
                    $scope.unlinkedProgramStudySelectedArr.push(eachRow);
                    $scope.unlinkedProgramStudyOfBatchList[i].Selected = 'true';
                }
            } else {
                angular.forEach($scope.unlinkedProgramStudyOfBatchList, function (item) {
                    $scope.unlinkedProgramStudySelectedArr = [];
                    item.Selected = 'false';
                });
            }
        };
        $scope.isUnlinkedFeesAllSelected = function () {
            if ($scope.unlinkedFeesAllSelected) {
                var tt = $scope.unlinkedFeesOfBatchList;
                for (var i = 0; i < tt.length; i++) {
                    var eachRow = tt[i];
                    eachRow.BatchId = $scope.selectedBatch.BatchId;
                    eachRow = angular.extend({}, commonService.fetchMainCookieData(), eachRow);
                    $scope.unlinkedFeesSelectedArr.push(eachRow);
                    $scope.unlinkedFeesOfBatchList[i].Selected = 'true';
                }
            } else {
                angular.forEach($scope.unlinkedFeesOfBatchList, function (item) {
                    $scope.unlinkedFeesSelectedArr = [];
                    item.Selected = 'false';
                });
            }
        };
        $scope.isLinkedFeesAllSelected = function () {
            if ($scope.linkedFeesAllSelected) {
                var tt = $scope.filteredFeesData;
                for (var i = 0; i < tt.length; i++) {
                    var eachRow = tt[i];
                    eachRow.BatchId = $scope.selectedBatch.BatchId;
                    eachRow = angular.extend({}, commonService.fetchMainCookieData(), eachRow);
                    $scope.linkedFeesSelectedArr.push(eachRow);
                    $scope.filteredFeesData[i].Selected = 'true';
                }
            } else {
                angular.forEach($scope.filteredFeesData, function (item) {
                    $scope.linkedFeesSelectedArr = [];
                    item.Selected = 'false';
                });
            }
        };
        $scope.isThisLinkedProgramStudySelected = function (that) {
            if ($scope.linkedProgramStudyAllSelected) {
                if (that.Selected === 'true') {
                    var eachRow = that;
                    eachRow.BatchId = $scope.selectedBatch.BatchId;
                    eachRow = angular.extend({}, commonService.fetchMainCookieData(), eachRow);
                    $scope.linkedProgramStudySelectedArr.push(eachRow);

                } else {
                    $scope.linkedProgramStudySelectedArr = commonService.removeItemFromArray($scope.linkedProgramStudySelectedArr, that);
                    if ($scope.linkedProgramStudySelectedArr.length === 0) {
                        $scope.linkedProgramStudyAllSelected = false;
                    }

                }
            } else {
                if (that.Selected) {
                    var eachRow = that;
                    eachRow.BatchId = $scope.selectedBatch.BatchId;
                    eachRow = angular.extend({}, commonService.fetchMainCookieData(), eachRow);
                    $scope.linkedProgramStudySelectedArr.push(eachRow);
                    if ($scope.filteredProgramStudyData.length === $scope.linkedProgramStudySelectedArr.length) {
                        $scope.linkedProgramStudyAllSelected = true;
                    }
                } else {
                    $scope.linkedProgramStudySelectedArr = commonService.removeItemFromArray($scope.linkedProgramStudySelectedArr, that);
                    if ($scope.linkedProgramStudySelectedArr.length === 0) {
                        $scope.linkedProgramStudyAllSelected = false;
                    }
                }

            }
        };
        $scope.isThisUnlinkedProgramStudySelected = function (that) {
            if ($scope.unlinkedProgramStudyAllSelected) {
                if (that.Selected === 'true') {
                    var eachRow = that;
                    eachRow.BatchId = $scope.selectedBatch.BatchId;
                    eachRow = angular.extend({}, commonService.fetchMainCookieData(), eachRow);
                    $scope.unlinkedProgramStudySelectedArr.push(eachRow);
                } else {
                    $scope.unlinkedProgramStudySelectedArr = commonService.removeItemFromArray($scope.unlinkedProgramStudySelectedArr, that);
                    if ($scope.unlinkedProgramStudySelectedArr.length === 0) {
                        $scope.unlinkedProgramStudyAllSelected = false;
                    }

                }
            } else {
                if (that.Selected) {
                    var eachRow = that;
                    eachRow.BatchId = $scope.selectedBatch.BatchId;
                    eachRow = angular.extend({}, commonService.fetchMainCookieData(), eachRow);
                    $scope.unlinkedProgramStudySelectedArr.push(eachRow);
                    if ($scope.unlinkedProgramStudyOfBatchList.length === $scope.unlinkedProgramStudySelectedArr.length) {
                        $scope.unlinkedProgramStudyAllSelected = true;
                    }
                } else {
                    $scope.unlinkedProgramStudySelectedArr = commonService.removeItemFromArray($scope.unlinkedProgramStudySelectedArr, that);
                    if ($scope.unlinkedProgramStudySelectedArr.length === 0) {
                        $scope.unlinkedProgramStudyAllSelected = false;
                    }
                }

            }
        };
        $scope.isThisUnlinkedFeeSelected = function (that) {
            if ($scope.unlinkedFeesAllSelected) {
                if (that.Selected === 'true') {
                    var eachRow = that;
                    eachRow.BatchId = $scope.selectedBatch.BatchId;
                    eachRow = angular.extend({}, commonService.fetchMainCookieData(), eachRow);
                    $scope.unlinkedFeesSelectedArr.push(eachRow);
                } else {
                    $scope.unlinkedFeesSelectedArr = commonService.removeItemFromArray($scope.unlinkedFeesSelectedArr, that.FeeId);
                    if ($scope.unlinkedFeesSelectedArr.length === 0) {
                        $scope.unlinkedFeesAllSelected = false;
                    }

                }
            } else {
                if (that.Selected) {
                    var eachRow = that;
                    eachRow.BatchId = $scope.selectedBatch.BatchId;
                    eachRow = angular.extend({}, commonService.fetchMainCookieData(), eachRow);
                    $scope.unlinkedFeesSelectedArr.push(eachRow);
                    if ($scope.unlinkedFeesOfBatchList.length === $scope.unlinkedFeesSelectedArr.length) {
                        $scope.unlinkedFeesAllSelected = true;
                    }
                } else {
                    $scope.unlinkedFeesSelectedArr = commonService.removeItemFromArray($scope.unlinkedFeesSelectedArr, that);
                    if ($scope.unlinkedFeesSelectedArr.length === 0) {
                        $scope.unlinkedFeesAllSelected = false;
                    }
                }

            }
        };
        $scope.isThisLinkedFeeSelected = function (that) {
            if ($scope.linkedFeesAllSelected) {
                if (that.Selected === 'true') {
                    var eachRow = that;
                    eachRow.BatchId = $scope.selectedBatch.BatchId;
                    eachRow = angular.extend({}, commonService.fetchMainCookieData(), eachRow);
                    $scope.linkedFeesSelectedArr.push(eachRow);

                } else {
                    $scope.linkedFeesSelectedArr = commonService.removeItemFromArray($scope.linkedFeesSelectedArr, that);
                    if ($scope.linkedFeesSelectedArr.length === 0) {
                        $scope.linkedFeesAllSelected = false;
                    }

                }
            } else {
                if (that.Selected) {
                    var eachRow = that;
                    eachRow.BatchId = $scope.selectedBatch.BatchId;
                    eachRow = angular.extend({}, commonService.fetchMainCookieData(), eachRow);
                    $scope.linkedFeesSelectedArr.push(eachRow);
                    if ($scope.filteredFeesData.length === $scope.linkedFeesSelectedArr.length) {
                        $scope.linkedFeesAllSelected = true;
                    }
                } else {
                    $scope.linkedFeesSelectedArr = commonService.removeItemFromArray($scope.linkedFeesSelectedArr, that);
                    if ($scope.linkedFeesSelectedArr.length === 0) {
                        $scope.linkedFeesAllSelected = false;
                    }
                }

            }
        };


        $scope.addBatch = function (form) {
            if (form.$valid) {
                $q.when(createBatchService.addBatch($scope.addBatchFormObj)).then(function (success) {
                    $scope.Modals.close();
                    $scope.pageLoad();
                }, function (error) {
                    alert('Please try again');
                });
            }
        };

        $scope.removeSelectedProgramStudy = function () {
            if ($scope.linkedProgramStudySelectedArr.length > 0) {
                $q.when(createBatchService.removeSelectedProgramStudyFromBatch($scope.linkedProgramStudySelectedArr)).then(function (success) {
                   
                    var tempCD = [];
                    var tempProgramStudyIds = [];
                    angular.forEach($scope.linkedProgramStudySelectedArr, function (tcd, key) {
                        tempProgramStudyIds.push(tcd.ProgramStudyId);
                    });
                    angular.forEach($scope.programStudyData, function (tcd, key) {
                        if (tempProgramStudyIds.indexOf(tcd.ProgramStudyId) === -1) {
                            tempCD.push(tcd);
                        }
                    });
                    $scope.programStudyData = tempCD;
                    $scope.adjustProgramStudyList();
                    $scope.linkedProgramStudySelectedArr = [];
                    $scope.linkedProgramStudyAllSelected = false;
                }, function (error) {
                    alert("Please try again.");
                });
            } else {
                alert("Please select program study before removing it.");
            }

        };
        $scope.removeSelectedFees = function () {
            if ($scope.linkedFeesSelectedArr.length > 0) {
                $q.when(createBatchService.removeSelectedFeesFromBatch($scope.linkedFeesSelectedArr)).then(function (success) {
                    
                    var tempCD = [];
                    var tempFeeIds = [];
                    angular.forEach($scope.linkedFeesSelectedArr, function (tcd, key) {
                        tempFeeIds.push(tcd.FeeId);
                    });
                    angular.forEach($scope.feesData, function (tcd, key) {
                        if (tempFeeIds.indexOf(tcd.FeeId) === -1) {
                            tempCD.push(tcd);
                        }
                    });
                    $scope.feesData = tempCD;
                    $scope.adjustFeesList();
                    $scope.linkedFeesSelectedArr = [];
                    $scope.linkedFeesAllSelected = false;
                }, function (error) {
                    alert("Please try again.");
                });
            } else {
                alert("Please select fees before removing it.");
            }

        };
        $scope.assignUnlinkedProgramStudy = function () {
            if ($scope.unlinkedProgramStudySelectedArr.length > 0) {
                
                $q.when(createBatchService.assignUnlinkedProgramStudyToBatch($scope.unlinkedProgramStudySelectedArr)).then(function (success) {
                    $scope.Modals.close();
                    angular.forEach($scope.unlinkedProgramStudySelectedArr, function (r, k) {
                        $scope.programStudyData.push(r);
                    });
                    $scope.adjustProgramStudyList();
                    $scope.unlinkedProgramStudySelectedArr = [];
                    $scope.unlinkedProgramStudyAllSelected = false;
                }, function (error) {
                    alert("Please try again.");
                });
            } else {
                alert("Please select program study before assigning it.");
            }

        };

        $scope.assignUnlinkedFees = function () {
            if ($scope.unlinkedFeesSelectedArr.length > 0) {
                $q.when(createBatchService.assignUnlinkedFeesToBatch($scope.unlinkedFeesSelectedArr)).then(function (success) {
                    $scope.Modals.close();
                    angular.forEach($scope.unlinkedFeesSelectedArr, function (r, k) {
                        $scope.feesData.push(r);
                    });
                   
                    $scope.adjustFeesList();
                    $scope.unlinkedFeesSelectedArr = [];
                    $scope.unlinkedProgramStudyAllSelected = false;
                }, function (error) {
                    alert("Please try again.");
                });
            } else {
                alert("Please select fees before assigning it.");
            }

        };
        $scope.addProgramStudyContainer = function (data) {
            $scope.modalType = 'add';
            $scope.modProgramStudyObj = data;
            $scope.Modals.open();
        };
        $scope.fetchRelatedDataOfBatch = function () {
            var selBatch = angular.copy($scope.selectedBatch);
            if (selBatch) {
                $q.all([
                    createBatchService.getLinkedProgramStudyOfBatch(selBatch),
                    createBatchService.getLinkedFeesOfBatch(selBatch)
                ]).then(function (data) {
                    $scope.mainContentSubPart = true;
                    if (data != null) {
                        $scope.programStudyData = data[0].results;
                        $scope.adjustProgramStudyList();

                        $scope.feesData = data[1].results;
                        $scope.adjustFeesList();
                    }
                }, function (reason) {
                    errorHandler.logServiceError('createBatchController', reason);
                });
            } else {
                alert("Please select a batch");
            }
        };


        $scope.pageLoad = function () {
            $q.all([
                createBatchService.getBatchList()
            ]).then(function (data) {
                $scope.mainContent = true;
                if (data != null) {
                    $scope.batchData = data[0].results;
                    if (data[0].results.length < 5 && data[0].results.length > 0) {
                        $scope.filteredBatchData = data[0].results;
                    } else if (data[0].results.length >= 5) {
                        $scope.filteredBatchData = data[0].results;
                    }

                }
            }, function (reason) {
                console.log("reason" + reason);
                errorHandler.logServiceError('createBatchController', reason);
            }, function (update) {
                console.log("update" + update);
                errorHandler.logServiceNotify('createBatchController', update);
            });
        };

        function removeContact(contactId) {
            for (var i = 0; i < $scope.contacts.length; i++) {
                if ($scope.contacts[i].id == contactId) {
                    $scope.contacts.splice(i, 1);
                    break;
                }
            }
        };

        $scope.contacts = [];

        $scope.Commands = {
            saveContact: function (contact) {
                ContactService.addContact(contact).then(
                    function (result) {
                        $scope.contacts.push(result.data);
                    },
                    function (response) {
                        console.log(response);
                    });
            },
            updateContact: function (contact) {
                ContactService.updateContact(contact).then(
                    function (result) {

                    },
                    function (response) {
                        console.log(response);
                    });
            }
        };

        $scope.Queries = {
            getContacts: function () {
                ContactService.getContacts();
            },
            getContactById: function (contactId) {
                ContactService.getContactById(contactId);
            }
        };

        $scope.Modals = {
            open: function (url) {
                $scope.modalInstance = $modal.open({
                    animation: true,
                    templateUrl: url,
                    size: 'lg',
                    scope: $scope,
                    backdrop: 'static'
                });

                $scope.modalInstance.result.then(
                    function (contact) {
                        if (contact.id != null) {
                            $scope.Commands.updateContact(contact);
                        }
                        else {
                            $scope.Commands.saveContact(contact);
                        }
                    },
                    function (event) {

                    });
            },
            close: function () {
                $scope.modalInstance.dismiss();
            }
        };

        $scope.pageLoad();


    };
})();