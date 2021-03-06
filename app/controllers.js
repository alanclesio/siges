'use strict';

angular.module('siges.controllers', []).
    // controle responsável por manter usuários
    controller('UsuariosCriarCtrl', [
        '$scope',
        '$location',
        '$timeout',
        'Usuarios',
        'md5',
        function ($scope, $location, $timeout, Usuarios, md5) {
            $scope.salvar = function () {
                var usuarioCadastrado;
                angular.forEach(Usuarios, function (usuario, key) {
                    if ($scope.usuario.email == usuario.email) {
                        usuarioCadastrado = true;
                    }
                });
                if (!usuarioCadastrado) {
                    $scope.usuario.md5_hash = md5.createHash($scope.usuario.email.toLowerCase());
                    Usuarios.add($scope.usuario, function () {
                        bootbox.alert('O usuário <strong>' + $scope.usuario.nome + '</strong> foi cadastrado com sucesso!', function () {
                            $timeout(function () {
                                $location.path('/usuarios/criar');
                                $scope.usuario = null;
                            });
                        });
                    });
                } else {
                    bootbox.alert('Atenção, o usuário <strong>' + $scope.usuario.nome + '</strong> não pôde ser cadastrado pois já há um cadastro com este e-mail!', function () {
                        $timeout(function () {
                            $location.path('/usuarios/criar');
                            $scope.usuario = null;
                        });
                    });
                }
            };
        }]).
    controller('UsuariosEditarCtrl').
    controller('UsuariosListarCtrl').
    controller('PrimeiroAcessoCtrl', [
        '$scope',
        '$timeout',
        '$location',
        'Autenticacao',
        'Usuarios',
        function ($scope, $timeout, $location, Autenticacao, Usuarios) {
            $scope.entrar = function () {
                var preCadastro = 0;
                angular.forEach(Usuarios, function (usuario, key) {
                    if ($scope.usuario.email == usuario.email) {
                        preCadastro = 1;
                        jQuery('.modal').modal();
                        Autenticacao.auth.createUser($scope.usuario.email, $scope.usuario.password, function (error, user) {
                            if (!error) {
                                jQuery('.modal').modal('hide');
                                $scope.usuario.nome = usuario.nome;
                                bootbox.alert('Parabéns <strong>' + $scope.usuario.nome + '</strong>, agora efetue seu login!', function () {
                                    $timeout(function () {
                                        $location.path('/entrar');
                                    });
                                });
                            } else {
                                jQuery('.modal').modal('hide');
                                switch (error.code) {
                                    case 'AUTHENTICATION_DISABLED':
                                        bootbox.alert('<strong>Atenção</strong>, Autenticação desabilitada.');
                                        break;
                                    case 'EMAIL_TAKEN':
                                        bootbox.alert('<strong>Atenção</strong>, este e-mail já está em uso.', function () {
                                            $timeout(function () {
                                                jQuery('[name=email]').val('').focus();
                                            });
                                        });
                                        break;
                                    case 'INVALID_EMAIL':
                                        bootbox.alert('<strong>Atenção</strong>, este e-mail está incorreto.');
                                        break;
                                    case 'INVALID_FIREBASE':
                                        bootbox.alert('<strong>Atenção</strong>, banco inválido.');
                                        break;
                                    case 'INVALID_ORIGIN':
                                        bootbox.alert('<strong>Atenção</strong>, não é possível se logar através deste endereço.');
                                        break;
                                    case 'INVALID_PASSWORD':
                                        bootbox.alert('<strong>Atenção</strong>, a senha digitada é inválida.');
                                        break;
                                    case 'INVALID_USER':
                                        bootbox.alert('<strong>Atenção</strong>, usuário não existe.');
                                        break;
                                    case 'UNKNOWN_ERROR':
                                        bootbox.alert('<strong>Atenção</strong>, erro desconhecido, entre em contato com contato@tecla.me');
                                        break;
                                    case 'USER_DENIED':
                                        bootbox.alert('<strong>Atenção</strong>, você não tem permissão para acessar esta área.');
                                        break;
                                    default:
                                }
                            }
                        });
                        return;
                    }
                });
                if (!preCadastro) {
                    bootbox.alert('Ainda não foi realizado o seu pré-cadastro, entre em contato com o administrador. Você será redirecionado para a página inicial!', function () {
                        $timeout(function () {
                            $location.path('/');
                        });
                    });
                }
            }
        }]).
    controller('PerfilCtrl', ['$scope', function ($scope) {
    }]).
    // controle responsável pela autenticação de usuários
    controller('EntrarCtrl', [
        '$scope',
        'Usuarios',
        'Autenticacao',
        '$rootScope',
        '$location',
        '$timeout', function ($scope, Usuarios, Autenticacao, $rootScope, $location, $timeout) {
            if ($scope.usuarioLogado) {
                if ($location.$$path == '/entrar') {
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
            $rootScope.$on("loggedin", function (event, user) {
                var stop;
                stop = $timeout(function () {
                    if (Usuarios) { // verificar o logon de usuários usando cookie
                        if (!$scope.usuarioLogado) {
                            angular.forEach(Usuarios, function (usuario, key) {
                                if (user.md5_hash == usuario.md5_hash) {
                                    $scope.usuarioLogado = usuario;
                                }
                            });
                            if ($location.$$path == '/entrar') {
                                $location.path('/');
                            }
                        }
                    } else {
                        $timeout.cancel(stop);
                    }
                    jQuery('.modal').modal('hide');
                }, 1000);
            });
            $rootScope.$on("loggedout", function (event) {
                $scope.usuarioLogado = null;
            });
        }]);