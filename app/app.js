'use strict';

angular.module('siges', [
        'ngCookies',
        'ui.mask',
        'md5',
        'firebase',
        'siges.factories',
        'siges.filters',
        'siges.services',
        'siges.directives',
        'siges.controllers'
    ]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {templateUrl: 'partials/home.html'}).
            when('/usuarios/criar', {templateUrl: 'partials/usuario-detalhes.html', controller: 'UsuariosCriarCtrl'}).
            when('/usuarios/editar/:id', {templateUrl: 'partials/usuario-detalhes.html', controller: 'UsuariosEditarCtrl'}).
            when('/usuarios', {templateUrl: 'partials/usuarios-listar.html', controller: 'UsuariosListarCtrl'}).
            when('/primeiro-acesso', {templateUrl: 'partials/primeiro-acesso.html', controller: 'PrimeiroAcessoCtrl'}).
            when('/perfil/:id', {templateUrl: 'partials/perfil.html', controller: 'PerfilCtrl'}).
            when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'}).
            when('/404', {templateUrl: 'partials/404.html'}).
            otherwise({redirectTo: '/404'});
    }]);

// configuração dos vendors
bootbox.setDefaults({locale: "br", animate: false});