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

// configuração dos vendors

bootbox.setDefaults({
    /**
     * @optional String
     * @default: en
     * which locale settings to use to translate the three
     * standard button labels: OK, CONFIRM, CANCEL
     */
    locale: "br",

    /**
     * @optional Boolean
     * @default: true
     * whether the dialog should be shown immediately
     */
    show: true,

    /**
     * @optional Boolean
     * @default: true
     * whether the dialog should be have a backdrop or not
     */
    backdrop: true,

    /**
     * @optional Boolean
     * @default: true
     * show a close button
     */
    closeButton: true,

    /**
     * @optional Boolean
     * @default: true
     * animate the dialog in and out (not supported in < IE 10)
     */
    animate: false,

    /**
     * @optional String
     * @default: null
     * an additional class to apply to the dialog wrapper
     */
    className: "my-modal"

});