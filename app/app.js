'use strict';

angular.module('siges', [
        'ui.mask',
        'ui.calendar',
        'md5',
        'firebase',
        'ngRoute',
        'ngSanitize',
        'siges.factories',
        'siges.filters',
        'siges.services',
        'siges.directives',
        'siges.controllers'
    ]).
    config(['$routeProvider', function ($routeProvider) {
        window.routes = {
            "/": {templateUrl: 'partials/home.html', requireLogin: false},
            "/avisos/criar": {templateUrl: 'partials/avisos-detalhes.html', controller: 'AvisosCriarCtrl', requireLogin: true},
            "/avisos/editar/:id": {templateUrl: 'partials/avisos-detalhes.html', controller: 'AvisosEditarCtrl', requireLogin: true},
            "/avisos": {templateUrl: 'partials/avisos-listar.html', controller: 'AvisosListarCtrl', requireLogin: true},
            "/avaliacoes/criar": {templateUrl: 'partials/avaliacoes-detalhes.html', controller: 'AvaliacoesCriarCtrl', requireLogin: true},
            "/avaliacoes/editar/:id": {templateUrl: 'partials/avaliacoes-detalhes.html', controller: 'AvaliacoesEditarCtrl', requireLogin: true},
            "/avaliacoes": {templateUrl: 'partials/avaliacoes-listar.html', controller: 'AvaliacoesListarCtrl', requireLogin: true},
            "/frequencias": {templateUrl: 'partials/frequencias-listar.html', controller: 'FrequenciasListarCtrl', requireLogin: true},
            "/frequencias/criar/:id": {templateUrl: 'partials/frequencias-detalhes.html', controller: 'FrequenciasCriarCtrl', requireLogin: true},
            "/notas": {templateUrl: 'partials/notas-listar.html', controller: 'NotasListarCtrl', requireLogin: true},
            "/notas/criar/:id": {templateUrl: 'partials/notas-criar.html', controller: 'NotasCriarCtrl', requireLogin: true},
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
            "/minhas-notas": {templateUrl: 'partials/minhas-notas.html', controller: 'MinhasNotasCtrl', requireLogin: true},
            "/minhas-frequencias": {templateUrl: 'partials/minhas-frequencias.html', controller: 'MinhasFrequenciasCtrl', requireLogin: true},
            "/meus-avisos": {templateUrl: 'partials/meus-avisos.html', controller: 'MeusAvisosCtrl', requireLogin: true},
            "/calendario": {templateUrl: 'partials/calendario.html', controller: 'CalendarioCtrl', requireLogin: true},
            "/login": {templateUrl: 'partials/login.html', controller: 'LoginCtrl', requireLogin: false},
            "/404": {templateUrl: 'partials/404.html', requireLogin: false}
        }
        for (var path in window.routes) {
            $routeProvider.when(path, window.routes[path]);
        }
        $routeProvider.otherwise({redirectTo: '/404'});
    }]).
    run(function ($rootScope, $location) {
        $rootScope.$on("$locationChangeStart", function (event, next, current) {
            for (var i in window.routes) {
                if (next.indexOf(i) != -1) {
                    if (window.routes[i].requireLogin) {
                        if (localStorage.sigesUserAuth == "false") {
                            $location.path('/login');
                            if (!$rootScope.$$phase) {
                                $rootScope.$apply();
                            }
                        }
                    }
                }
            }
        });

    });
