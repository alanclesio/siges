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
        window.routes = {
            "/": {templateUrl: 'partials/home.html', requireLogin: false},
            "/turmas/criar": {templateUrl: 'partials/turmas-detalhes.html', controller: 'TurmasCriarCtrl', requireLogin: true},
            "/turmas/editar/:id": {templateUrl: 'partials/turmas-detalhes.html', controller: 'TurmasEditarCtrl', requireLogin: true},
            "/turmas": {templateUrl: 'partials/turmas-listar.html', controller: 'TurmasListarCtrl', requireLogin: true},
            "/disciplinas/criar": {templateUrl: 'partials/disciplinas-detalhes.html', controller: 'DisciplinasCriarCtrl', requireLogin: true},
            "/disciplinas/editar/:id": {templateUrl: 'partials/disciplinas-detalhes.html', controller: 'DisciplinasEditarCtrl', requireLogin: true},
            "/disciplinas": {templateUrl: 'partials/disciplinas-listar.html', controller: 'DisciplinasListarCtrl', requireLogin: true},
            "/instituicoes/criar": {templateUrl: 'partials/instituicoes-detalhes.html', controller: 'InstituicoesCriarCtrl', requireLogin: true},
            "/instituicoes/editar/:id": {templateUrl: 'partials/instituicoes-detalhes.html', controller: 'InstituicoesEditarCtrl', requireLogin: true},
            "/instituicoes": {templateUrl: 'partials/instituicoes-listar.html', controller: 'InstituicoesListarCtrl', requireLogin: true},
            "/usuarios/criar": {templateUrl: 'partials/usuarios-detalhes.html', controller: 'UsuariosCriarCtrl', requireLogin: true},
            "/usuarios/editar/:id": {templateUrl: 'partials/usuarios-detalhes.html', controller: 'UsuariosEditarCtrl', requireLogin: true},
            "/usuarios": {templateUrl: 'partials/usuarios-listar.html', controller: 'UsuariosListarCtrl', requireLogin: true},
            "/primeiro-acesso": {templateUrl: 'partials/primeiro-acesso.html', controller: 'PrimeiroAcessoCtrl', requireLogin: false},
            "/perfil/:id": {templateUrl: 'partials/perfil.html', controller: 'PerfilCtrl', requireLogin: true},
            "/login": {templateUrl: 'partials/login.html', controller: 'LoginCtrl', requireLogin: false},
            "/404": {templateUrl: 'partials/404.html', requireLogin: false}
        }
        for (var path in window.routes) {
            $routeProvider.when(path, window.routes[path]);
        }
        $routeProvider.otherwise({redirectTo: '/404'});
    }]).run(function ($rootScope, $location) {
        $rootScope.$on("$locationChangeStart", function (event, next, current) {
            for (var i in window.routes) {
                if (next.indexOf(i) != -1) {
                    if (window.routes[i].requireLogin) {
                        if (localStorage.sigesUserAuth == "false"){
                            $location.path('/login');
                            if(!$rootScope.$$phase) {
                                $rootScope.$apply();
                            }
                        }
                    }
                }
            }
        });

    });