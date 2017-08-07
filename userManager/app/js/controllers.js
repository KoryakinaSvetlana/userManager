angular.module('UserManagerApp.controllers', []).
    /*Users controller*/
    controller('usersController', function ($scope, pagerService, dataService) {
        var self = this;
        $scope.users = [];
        $scope.pager = {};
        this.userCount = 0;
        this.pageSize = 10;
        $scope.offset = 0;
        $scope.errorMessage = "";

        $scope.setPage = function (page) {
            if (page < 1 || page > $scope.pager.totalPages) {
                return;
            }

            $scope.offset = (page - 1) * self.pageSize;

            dataService.getUsers($scope.offset, self.pageSize).success(function (response) {
                //Digging into the response to get the relevant data
                if (response.http_status_code == 422) {
                    $('.server-error').show();
                    $scope.errorMessage = response.message;
                } else {
                    $('.server-error').hide();
                    $scope.errorMessage = "";
                    $scope.users = response.data;
                    self.userCount = response.recordsTotal;
                }

                // get pager object from service
                $scope.pager = pagerService.getPager(self.userCount, page, self.pageSize);
            });
        }

        $scope.setPage(1);
    }).
    controller('detailsController', function ($scope, $routeParams, dataService, dateTimeService) {
        $scope.id = $routeParams.id;
        $scope.user = {};
        $scope.errorMessage = "";
        $scope.operations = [];
        var today = new Date();
        var oneWeekBefore = new Date(today);
        oneWeekBefore.setDate(today.getDate() - 7);
        $scope.start = dateTimeService.format(oneWeekBefore, 'yyyy-mm-dd');
        $scope.end = dateTimeService.format(today, 'yyyy-mm-dd');

        dataService.getUser($scope.id).success(function (response) {
            //Digging into the response to get the relevant data
            if (response.http_status_code == 404) {
                $('.server-error').show();
                $scope.errorMessage += response.message;
            } else {
                $('.server-error').hide();
                $scope.errorMessage = "";
                $scope.user = response;
            }

        });

        dateTimeService.dateToIsoString(dateTimeService.stringToDate($scope.start))

        dataService.getOperations($scope.id,
            dateTimeService.dateToIsoString(dateTimeService.stringToDate($scope.start)),
            dateTimeService.dateToIsoString(dateTimeService.stringToDate($scope.end)))
            .success(function (response) {
                //Digging into the response to get the relevant data            
                if (response.http_status_code == 422) {
                    $('.server-error').show();
                    $scope.errorMessage += response.message;
                } else {
                    $('.server-error').hide();
                    $scope.errorMessage = "";
                    $scope.operations = response;
                }
            });

        $scope.changeBalance = function () {
            dataService.changeBalance($scope.id, $scope.user.balance, "change from user interface").success(function (response) {
                $scope.user.balance = response.amount;
            })
        }

        $scope.refreshOperations = function () {
            dataService.getOperations($scope.id,
                dateTimeService.dateToIsoString(dateTimeService.stringToDate($scope.start)),
                dateTimeService.dateToIsoString(dateTimeService.stringToDate($scope.end)))
                    .success(function (response) {
                        //Digging into the response to get the relevant data            
                        if (response.http_status_code == 422) {
                            $('.server-error').show();
                            $scope.errorMessage += response.message;
                        } else {
                            $('.server-error').hide();
                            $scope.errorMessage = null;
                            $scope.operations = response;
                        }
                    });
        }
    }).

    controller('editController', function ($scope, $routeParams, dataService) {
        $scope.id = $routeParams.id;
        $scope.user = {};

        dataService.getUser($scope.id).success(function (response) {
            //Digging into the response to get the relevant data
            if (response.http_status_code == 404) {
                $('.server-error').show();
                $scope.errorMessage += response.message;
            } else {
                $('.server-error').hide();
                $scope.errorMessage = "";
                $scope.user = response;
            }

        });

        $scope.SaveUser = function () {
            dataService.updateUser($scope.user).success(function (response) {
                if (response.http_status_code == 422) {
                    $('.server-error').show();
                    $scope.errorMessage += response.message;
                } else {
                    $('.server-error').hide();
                    $scope.errorMessage = "";
                    alert('Пользователь успешно сохранен');
                    window.location = './';
                }
            })
        }

    }).

    controller('createController', function ($scope, dataService) {
        $scope.user = {};
        $scope.SaveUser = function () {
            dataService.createUser($scope.user).success(function (response) {
                if (response.http_status_code == 422) {
                    $('.server-error').show();
                    $scope.errorMessage += response.message;
                } else {
                    $('.server-error').hide();
                    $scope.errorMessage = "";
                    alert('Пользователь успешно сохранен');
                    window.location = './';
                }
            })

        }
    });
