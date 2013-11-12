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
            when('/turmas/criar', {templateUrl: 'partials/turmas-detalhes.html', controller: 'TurmasCriarCtrl'}).
            when('/turmas/editar/:id', {templateUrl: 'partials/turmas-detalhes.html', controller: 'TurmasEditarCtrl'}).
            when('/turmas', {templateUrl: 'partials/turmas-listar.html', controller: 'TurmasListarCtrl'}).
            when('/disciplinas/criar', {templateUrl: 'partials/disciplinas-detalhes.html', controller: 'DisciplinasCriarCtrl'}).
            when('/disciplinas/editar/:id', {templateUrl: 'partials/disciplinas-detalhes.html', controller: 'DisciplinasEditarCtrl'}).
            when('/disciplinas', {templateUrl: 'partials/disciplinas-listar.html', controller: 'DisciplinasListarCtrl'}).
            when('/instituicoes/criar', {templateUrl: 'partials/instituicoes-detalhes.html', controller: 'InstituicoesCriarCtrl'}).
            when('/instituicoes/editar/:id', {templateUrl: 'partials/instituicoes-detalhes.html', controller: 'InstituicoesEditarCtrl'}).
            when('/instituicoes', {templateUrl: 'partials/instituicoes-listar.html', controller: 'InstituicoesListarCtrl'}).
            when('/usuarios/criar', {templateUrl: 'partials/usuarios-detalhes.html', controller: 'UsuariosCriarCtrl'}).
            when('/usuarios/editar/:id', {templateUrl: 'partials/usuarios-detalhes.html', controller: 'UsuariosEditarCtrl'}).
            when('/usuarios', {templateUrl: 'partials/usuarios-listar.html', controller: 'UsuariosListarCtrl'}).
            when('/primeiro-acesso', {templateUrl: 'partials/primeiro-acesso.html', controller: 'PrimeiroAcessoCtrl'}).
            when('/perfil/:id', {templateUrl: 'partials/perfil.html', controller: 'PerfilCtrl'}).
            when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'}).
            when('/404', {templateUrl: 'partials/404.html'}).
            otherwise({redirectTo: '/404'});
    }]);

// configuração dos vendors
bootbox.setDefaults({locale: "br", animate: false});