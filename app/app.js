'use strict';

angular.module('siges', [
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
            when('/', {templateUrl: 'partials/inicio.html'}).
            when('/usuarios/criar', {templateUrl: 'partials/usuario-detalhes.html', controller: 'UsuariosCriarCtrl'}).
            when('/usuarios/editar/:id', {templateUrl: 'partials/usuario-detalhes.html', controller: 'UsuariosEditarCtrl'}).
            when('/usuarios', {templateUrl: 'partials/usuarios-listar.html', controller: 'UsuariosListarCtrl'}).
            when('/primeiro-acesso', {templateUrl: 'partials/primeiro-acesso.html', controller: 'PrimeiroAcessoCtrl'}).
            when('/perfil', {templateUrl: 'partials/perfil.html', controller: 'PerfilCtrl'}).
            when('/entrar', {templateUrl: 'partials/entrar.html', controller: 'EntrarCtrl'}).
            when('/404', {templateUrl: 'partials/404.html'}).
            otherwise({redirectTo: '/404'});
    }]);

// configuração dos vendors
bootbox.setDefaults({locale: "br", animate: false});