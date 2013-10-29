'use strict';

angular.module('siges', [
        'firebase',
        'siges.filters',
        'siges.services',
        'siges.directives',
        'siges.controllers'
    ]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/', {templateUrl: 'partials/inicio.html'}).
            when('/entrar', {templateUrl: 'partials/entrar.html', controller: 'EntrarCtrl'}).
            when('/404', {templateUrl: 'partials/404.html'}).
            otherwise({redirectTo: '/404'});
    }]);