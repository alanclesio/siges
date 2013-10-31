'use strict';

angular.module('siges.controllers', []).
    // controle responsável por manter usuários
    controller('UsuariosCriarCtrl',[
        '$scope',
        '$location',
        '$timeout',
        'Usuarios',
        function($scope, $location, $timeout, Usuarios){
        $scope.salvar = function() {
            Usuarios.add($scope.usuario, function() {
                bootbox.alert('O usuário <strong>' + $scope.usuario.nome + '</strong> foi cadastrado com sucesso!', function() {
                    $timeout(function() {
                        $location.path('/usuarios/criar');
                        $scope.usuario = null;
                    });
                });
            });
        }
    }]).
    controller('UsuariosEditarCtrl').
    controller('UsuariosListarCtrl').
    controller('PrimeiroAcessoCtrl', [
        '$scope',
        '$timeout',
        '$location',
        'Autenticacao',
        'Usuarios',
        function($scope, $timeout, $location, Autenticacao, Usuarios){
        $scope.usuario = {
            email:'zelda@gmail.com'
        }
        $scope.entrar = function() {
            var preCadastro = 0;
            angular.forEach(Usuarios, function(usuario, key){
                if($scope.usuario.email == usuario.email){
                    preCadastro = 1;
                    $scope.usuario.nome = usuario.nome;
                    jQuery('.modal').modal();
                    Autenticacao.auth.createUser($scope.usuario.email, $scope.usuario.password, function(error, user) {
                        if (!error) {
                            jQuery('.modal').modal('hide');
                            console.log('User Id: ' + user.id + ', Email: ' + user.email);
                            bootbox.alert('Parabéns <strong>' + $scope.usuario.nome + '</strong>, agora efetue seu login!', function() {
                                $timeout(function() {
                                    $location.path('/entrar');
                                });
                            });
                        } else {
                            jQuery('.modal').modal('hide');
                            switch (error.code) {
                                case 'AUTHENTICATION_DISABLED':
                                    bootbox.alert('<strong>Atenção</strong>, Autenticação desabilitada.')
                                    break;
                                case 'EMAIL_TAKEN':
                                    bootbox.alert('<strong>Atenção</strong>, este e-mail já está em uso.')
                                    break;
                                case 'INVALID_EMAIL':
                                    bootbox.alert('<strong>Atenção</strong>, este e-mail está incorreto.')
                                    break;
                                case 'INVALID_FIREBASE':
                                    bootbox.alert('<strong>Atenção</strong>, banco inválido.')
                                    break;
                                case 'INVALID_ORIGIN':
                                    bootbox.alert('<strong>Atenção</strong>, não é possível se logar através deste endereço.')
                                    break;
                                case 'INVALID_PASSWORD':
                                    bootbox.alert('<strong>Atenção</strong>, a senha digitada é inválida.')
                                    break;
                                case 'INVALID_USER':
                                    bootbox.alert('<strong>Atenção</strong>, usuário não existe.')
                                    break;
                                case 'UNKNOWN_ERROR':
                                    bootbox.alert('<strong>Atenção</strong>, erro desconhecido, entre em contato com contato@tecla.me')
                                    break;
                                case 'USER_DENIED':
                                    bootbox.alert('<strong>Atenção</strong>, você não tem permissão para acessar esta área.')
                                    break;
                                default:
                            }
                        }
                    });
                    return;
                }
            });
            if (!preCadastro){
                bootbox.alert('Ainda não foi realizado o seu pré-cadastro');
            }
        }
    }]).
    // controle responsável pela autenticação de usuários
    controller('EntrarCtrl', [
        '$scope',
        'Usuarios',
        'Autenticacao',
        '$rootScope',
        '$location',
        '$timeout', function ($scope, Usuarios, Autenticacao, $rootScope, $location, $timeout) {
        if($scope.usuarioLogado){
            if($location.$$path == '/entrar'){
                $location.path('/');
            }
        }
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
            $scope.usuarioLogado = null;
        };
        $rootScope.$on("loggedin", function(event, user) {
            $scope.usuarioLogado = user;
            console.info($location.$$path);
            $timeout(function(){
                if($location.$$path == '/entrar'){
                    $location.path('/');
                }
                jQuery('.modal').modal('hide');
            });
        });
        $rootScope.$on("loggedout", function(event) {
            $scope.usuarioLogado = null;
        });
    }]);