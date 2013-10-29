'use strict';

angular.module('siges.controllers', []).
    controller('EntrarCtrl', ['$scope', 'Autenticacao', '$rootScope', '$location', '$timeout', function ($scope, Autenticacao, $rootScope, $location, $timeout) {
        $scope.login = function () {
            jQuery('.modal').modal();
            Autenticacao.auth.login('password', {
                email: $scope.usuario.email,
                password: $scope.usuario.senha,
                rememberMe: $scope.usuario.lembrar
            });
        };
        $scope.logout = function () {
            Autenticacao.auth.logout();
            $scope.usuario = null;
        };
        $rootScope.$on("loggedin", function(event, user) {
            $scope.usuario = user;
            $timeout(function() {
                $location.path('/');
            });
            jQuery('.modal').modal('hide');
        })
        $rootScope.$on("loggedout", function(event) {
            $scope.usuario = null;
        })
    }]);