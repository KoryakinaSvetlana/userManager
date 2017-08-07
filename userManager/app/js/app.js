angular.module('UserManagerApp', [
    'UserManagerApp.Aservices',
    'UserManagerApp.Bservices',
    'UserManagerApp.Cservices',
    'UserManagerApp.controllers',
    'ngRoute',
    'UserManagerApp.directives'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when("/users/list",
            {
                templateUrl: "app/partials/list.html",
                controller: "usersController"
            }).
            when("/users/details/:id", {
                templateUrl: "app/partials/details.html",
                controller: "detailsController"
            }).
            when("/users/edit/:id", {
                templateUrl: "app/partials/edit.html",
                controller: "editController"
            }).
            when("/users/create", {
                templateUrl: "app/partials/create.html",
                controller: "createController"
            }).
            otherwise({
                redirectTo: '/users/list'
            });
    }]);