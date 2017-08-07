angular.module('UserManagerApp.Aservices', [])
    .factory('dataService', function ($http) {

        var dataServiceAPI = {};

        dataServiceAPI.getUsers = function (offset, limit) {
            return $http({
                method: 'GET',
                url: 'https://livedemo.xsolla.com/fe/test-task/baev/users?offset=' + offset + '&limit=' + limit
            });

        }

        dataServiceAPI.getUser = function (id) {
            return $http({
                method: 'GET',
                url: 'https://livedemo.xsolla.com/fe/test-task/baev/users/' + id
            });
        }

        dataServiceAPI.getOperations = function (id, start, end) {
            return $http({
                method: 'GET',
                url: 'https://livedemo.xsolla.com/fe/test-task/baev/users/' + id + '/transactions?datetime_from=' + start + '&datetime_to=' + end
            });
        }

        dataServiceAPI.changeBalance = function (id, amount, comment) {
            return $http({
                method: 'POST',
                data: {
                    amount: amount,
                    comment: comment
                },
                url: 'https://livedemo.xsolla.com/fe/test-task/baev/users/'+id+'/recharge'
            });
        }

        dataServiceAPI.updateUser = function (user) {
            return $http({
                method: 'PUT',
                data: {
                    user_name: user.user_name,
                    user_custom: user.user_custom,
                    email: user.email,
                    enabled: user.enabled
                },
                url: 'https://livedemo.xsolla.com/fe/test-task/baev/users/' + user.user_id
            });
        }

        dataServiceAPI.createUser = function (user) {
            return $http({
                method: 'POST',
                data: {
                    user_id: user.user_id,
                    user_name: user.user_name,
                    user_custom: user.user_custom,
                    email: user.email
                },
                url: 'https://livedemo.xsolla.com/fe/test-task/baev/users'
            });
        }

        return dataServiceAPI;
    });