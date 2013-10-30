'use strict';

angular.module('siges', [
        'firebase',
        'siges.factories',
        'siges.filters',
        'siges.services',
        'siges.directives',
        'siges.controllers'
    ]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/', {templateUrl: 'partials/inicio.html'}).
            when('/usuarios/criar', {templateUrl: 'partials/usuario-detalhes.html', controller: 'UsuariosCriarCtrl'}).
            when('/primeiro-acesso', {templateUrl: 'partials/primeiro-acesso.html', controller: 'PrimeiroAcessoCtrl'}).
            when('/usuarios/editar/:id', {templateUrl: 'partials/usuario-detalhes.html', controller: 'UsuariosEditarCtrl'}).
            when('/usuarios', {templateUrl: 'partials/usuarios-listar.html', controller: 'UsuariosListarCtrl'}).
            when('/entrar', {templateUrl: 'partials/entrar.html', controller: 'EntrarCtrl'}).
            when('/404', {templateUrl: 'partials/404.html'}).
            otherwise({redirectTo: '/404'});
    }]);