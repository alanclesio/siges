'use strict';

angular.module('siges.services', []).
    value('version', '0.1').
    service('Autenticacao', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
        this.auth = new FirebaseSimpleLogin(new Firebase("https://siges.firebaseio.com"), function (error, user) {
            if (user) {
                $rootScope.$emit("loggedin", user);
            }
            else if (error) {
                jQuery('.modal').modal('hide');
                switch (error.code) {
                    case 'AUTHENTICATION_DISABLED':
                        bootbox.alert('<strong>Atenção</strong>, Autenticação desabilitada.');
                        break;
                    case 'EMAIL_TAKEN':
                        bootbox.alert('<strong>Atenção</strong>, este e-mail já está em uso.');
                        break;
                    case 'INVALID_EMAIL':
                        bootbox.alert('<strong>Atenção</strong>, este e-mail está incorreto.', function () {
                            $timeout(function () {
                                jQuery('[name=email]').val('').focus();
                            });
                        });
                        break;
                    case 'INVALID_FIREBASE':
                        bootbox.alert('<strong>Atenção</strong>, banco inválido.');
                        break;
                    case 'INVALID_ORIGIN':
                        bootbox.alert('<strong>Atenção</strong>, não é possível se logar através deste endereço.');
                        break;
                    case 'INVALID_PASSWORD':
                        bootbox.alert('<strong>Atenção</strong>, a senha digitada é inválida.', function () {
                            $timeout(function () {
                                jQuery('[name=password]').val('').focus();
                            });
                        });
                        break;
                    case 'INVALID_USER':
                        bootbox.alert('<strong>Atenção</strong>, usuário não existe.', function () {
                            $timeout(function () {
                                jQuery('[name=email]').val('').focus();
                            });
                        });
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
            else {
                $rootScope.$emit("loggedout");
            }
        });
    }]);