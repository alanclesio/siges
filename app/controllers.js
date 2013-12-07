'use strict';

angular.module('siges.controllers', []).
    // controles responsáveis por manter usuários
    controller('UsuariosCriarCtrl', [
        '$scope',
        '$location',
        '$timeout',
        'Usuarios',
        'Turmas',
        'Disciplinas',
        'Instituicoes',
        'md5',
        function ($scope, $location, $timeout, Usuarios, Turmas, Disciplinas, Instituicoes, md5) {
            $scope.turmas = Turmas;
            $scope.disciplinas = Disciplinas;
            $scope.instituicoes = Instituicoes;
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
                    bootbox.alert('Atenção, o email <strong>' + $scope.usuario.email + '</strong> não pôde ser cadastrado pois já há um cadastro em uso!', function () {
                        $timeout(function () {
                            $location.path('/usuarios/criar');
                            $scope.usuario = null;
                        });
                    });
                }
            };
        }]).
    controller('UsuariosEditarCtrl', [
        '$scope',
        '$location',
        '$routeParams',
        'angularFire',
        'ProjetoFireBaseUrl',
        'Turmas',
        'Disciplinas',
        'Instituicoes',
        function ($scope, $location, $routeParams, angularFire, ProjetoFireBaseUrl, Turmas, Disciplinas, Instituicoes) {
            $scope.turmas = Turmas;
            $scope.disciplinas = Disciplinas;
            $scope.instituicoes = Instituicoes;
            angularFire(ProjetoFireBaseUrl.child('usuarios').child($routeParams.id), $scope, 'remote', {}).
                then(function () {
                    $scope.usuario = angular.copy($scope.remote);
                    $scope.usuario.$id = $routeParams.id;
                    $scope.alterado = function () {
                        return angular.equals($scope.remote, $scope.usuario);
                    }
                    $scope.apagar = function () {
                        $scope.remote = null;
                        $location.path('/usuarios');
                    };
                    $scope.salvar = function () {
                        $scope.remote = angular.copy($scope.usuario);
                        $location.path('/usuarios');
                    };
                })
        }]).
    controller('UsuariosListarCtrl', [
        '$scope',
        'Usuarios',
        'Turmas',
        'Disciplinas',
        function ($scope, Usuarios, Turmas, Disciplinas) {
            $scope.usuarios = Usuarios;
            $scope.turmas = Turmas;
            $scope.disciplinas = Disciplinas;
            $scope.paginaAtual = 0;
            $scope.paginaTamanho = 10;
            $scope.paginaTotal = function () {
                return Math.ceil($scope.usuarios.length / $scope.paginaTamanho);
            }
        }]).
    // controles responsáveis pelas notas
    controller('NotasListarCtrl', [
        '$scope',
        'Instituicoes',
        'Disciplinas',
        'Turmas',
        'Avaliacoes',
        function ($scope, Instituicoes, Disciplinas, Turmas, Avaliacoes) {
            $scope.instituicoes = Instituicoes;
            $scope.disciplinas = Disciplinas;
            $scope.turmas = Turmas;
            $scope.avaliacoes = Avaliacoes;
        }]).
    controller('NotasCriarCtrl', [
        '$scope',
        '$routeParams',
        'Instituicoes',
        'Disciplinas',
        'Turmas',
        'Avaliacoes',
        'ProjetoFireBaseUrl',
        'angularFire',
        function ($scope, $routeParams, Instituicoes, Disciplinas, Turmas, Avaliacoes, ProjetoFireBaseUrl, angularFire) {
            $scope.instituicoes = Instituicoes;
            $scope.disciplinas = Disciplinas;
            $scope.turmas = Turmas;
            $scope.avaliacoes = Avaliacoes;
            $scope.routeId = $routeParams.id;
            angularFire(ProjetoFireBaseUrl.child('usuarios'), $scope, 'usuarios', []).
                then(function(){
                    $scope.setNotas = function(usuario){
                        angular.forEach($scope.usuarios, function(item){
                            item.avaliacoes = item.avaliacoes || new Object();
                            item.avaliacoes[$scope.routeId] = item.avaliacoes[$scope.routeId] || new Object();
                        });
                        if (usuario) usuario.avaliacoes[$scope.routeId].avaliacaoId = $scope.routeId;
                    }
                    $scope.setNotas();
                    $scope.usuarioAusente = function (usuario){
                        $scope.setNotas(usuario);
                        usuario.avaliacoes[$scope.routeId].ausente = !usuario.avaliacoes[$scope.routeId].ausente;
                        if(usuario.avaliacoes[$scope.routeId].ausente){
                            usuario.avaliacoes[$scope.routeId].nota = 0;
                        }
                    };
                });
        }]).
    // controles responsáveis pelas notas
    controller('FrequenciasListarCtrl', [
        '$scope',
        'Instituicoes',
        'Disciplinas',
        'Turmas',
        'Avaliacoes',
        function ($scope, Instituicoes, Disciplinas, Turmas, Avaliacoes) {
            $scope.instituicoes = Instituicoes;
            $scope.disciplinas = Disciplinas;
            $scope.turmas = Turmas;
            $scope.avaliacoes = Avaliacoes;
        }]).
    controller('FrequenciasCriarCtrl', [
        '$scope',
        '$routeParams',
        'Instituicoes',
        'Disciplinas',
        'Turmas',
        'Avaliacoes',
        'ProjetoFireBaseUrl',
        'angularFire',
        function ($scope, $routeParams, Instituicoes, Disciplinas, Turmas, Avaliacoes, ProjetoFireBaseUrl, angularFire) {
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            /* event source that pulls from google.com */
            $scope.eventSource = {
                url: "https://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
                className: 'gcal-event',           // an option!
                currentTimezone: 'America/Chicago' // an option!
            };
            /* event source that contains custom events on the scope */
            $scope.events = [
                {title: 'All Day Event',start: new Date(y, m, 1)},
                {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
                {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
                {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
                {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
                {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
            ];
            /* event source that calls a function on every view switch */
            $scope.eventsF = function (start, end, callback) {
                var s = new Date(start).getTime() / 1000;
                var e = new Date(end).getTime() / 1000;
                var m = new Date(start).getMonth();
                var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
                callback(events);
            };
            /* alert on eventClick */
            $scope.alertEventOnClick = function( date, allDay, jsEvent, view ){
                $scope.$apply(function(){
                    $scope.alertMessage = ('Day Clicked ' + date);
                });
            };
            /* alert on Drop */
            $scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
                $scope.$apply(function(){
                    $scope.alertMessage = ('Event Droped to make dayDelta ' + dayDelta);
                });
            };
            /* alert on Resize */
            $scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ){
                $scope.$apply(function(){
                    $scope.alertMessage = ('Event Resized to make dayDelta ' + minuteDelta);
                });
            };
            /* add and removes an event source of choice */
            $scope.addRemoveEventSource = function(sources,source) {
                var canAdd = 0;
                angular.forEach(sources,function(value, key){
                    if(sources[key] === source){
                        sources.splice(key,1);
                        canAdd = 1;
                    }
                });
                if(canAdd === 0){
                    sources.push(source);
                }
            };
            /* add custom event*/
            $scope.addEvent = function() {
                $scope.events.push({
                    title: 'Open Sesame',
                    start: new Date(y, m, 28),
                    end: new Date(y, m, 29),
                    className: ['openSesame']
                });
            };
            /* remove event */
            $scope.remove = function(index) {
                $scope.events.splice(index,1);
            };
            /* Change View */
            $scope.changeView = function(view,calendar) {
                calendar.fullCalendar('changeView',view);
            };
            /* config object */
            $scope.uiConfig = {
                calendar:{
                    height: 450,
                    editable: true,
                    header:{
                        left: 'title',
                        center: '',
                        right: 'today prev,next'
                    },
                    dayClick: $scope.alertEventOnClick,
                    eventDrop: $scope.alertOnDrop,
                    eventResize: $scope.alertOnResize
                }
            };
            /* event sources array*/
            $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
        }]).
    // controles responsáveis pelas avaliações
    controller('AvaliacoesCriarCtrl', [
        '$scope',
        '$timeout',
        '$location',
        'Instituicoes',
        'Disciplinas',
        'Turmas',
        'Avaliacoes',
        function ($scope, $timeout, $location, Instituicoes, Disciplinas, Turmas, Avaliacoes) {
            $scope.instituicoes = Instituicoes;
            $scope.disciplinas = Disciplinas;
            $scope.turmas = Turmas;
            $scope.salvar = function () {
                Avaliacoes.add($scope.avaliacao, function () {
                    bootbox.alert('A avaliação <strong>' + $scope.avaliacao.nome + '</strong> foi salva com sucesso!', function () {
                        $timeout(function () {
                            $location.path('/avaliacoes');
                        });
                    });
                });
            }
        }]).
    controller('AvaliacoesEditarCtrl', [
        '$scope',
        '$location',
        '$routeParams',
        'angularFire',
        'ProjetoFireBaseUrl',
        'Instituicoes',
        'Disciplinas',
        'Turmas',
        'Avaliacoes',
        function ($scope, $location, $routeParams, angularFire, ProjetoFireBaseUrl, Instituicoes, Disciplinas, Turmas, Avaliacoes) {
            $scope.instituicoes = Instituicoes;
            $scope.disciplinas = Disciplinas;
            $scope.turmas = Turmas;
            angularFire(ProjetoFireBaseUrl.child('avaliacoes').child($routeParams.id), $scope, 'remote', {}).
                then(function () {
                    $scope.avaliacao = angular.copy($scope.remote);
                    $scope.avaliacao.$id = $routeParams.id;
                    $scope.alterado = function () {
                        return angular.equals($scope.remote, $scope.avaliacao);
                    }
                    $scope.apagar = function () {
                        $scope.remote = null;
                        $location.path('/avaliacoes');
                    };
                    $scope.salvar = function () {
                        $scope.remote = angular.copy($scope.avaliacao);
                        $location.path('/avaliacoes');
                    };
                })
        }]).
    controller('AvaliacoesListarCtrl', [
        '$scope',
        'Disciplinas',
        'Turmas',
        'Avaliacoes',
        function ($scope, Disciplinas, Turmas, Avaliacoes) {
            $scope.disciplinas = Disciplinas;
            $scope.turmas = Turmas;
            $scope.avaliacoes = Avaliacoes;
        }]).
    // controles responsáveis por manter disciplinas
    controller('DisciplinasCriarCtrl', ['$scope', '$location', '$timeout', 'Disciplinas', 'Instituicoes', function ($scope, $location, $timeout, Disciplinas, Instituicoes) {
        $scope.instituicoes = Instituicoes;
        $scope.salvar = function () {
            Disciplinas.add($scope.disciplina, function () {
                bootbox.alert('A disciplina <strong>' + $scope.disciplina.nome + '</strong> foi salva com sucesso!', function () {
                    $timeout(function () {
                        $location.path('/disciplinas');
                    });
                });
            });
        }
    }]).
    controller('DisciplinasEditarCtrl', ['$scope', '$location', '$routeParams', 'angularFire', 'ProjetoFireBaseUrl', 'Instituicoes', function ($scope, $location, $routeParams, angularFire, ProjetoFireBaseUrl, Instituicoes) {
        $scope.instituicoes = Instituicoes;
        angularFire(ProjetoFireBaseUrl.child('disciplinas').child($routeParams.id), $scope, 'remote', {}).
            then(function () {
                $scope.disciplina = angular.copy($scope.remote);
                $scope.disciplina.$id = $routeParams.id;
                $scope.alterado = function () {
                    return angular.equals($scope.remote, $scope.disciplina);
                }
                $scope.apagar = function () {
                    $scope.remote = null;
                    $location.path('/disciplinas');
                };
                $scope.salvar = function () {
                    $scope.remote = angular.copy($scope.disciplina);
                    $location.path('/disciplinas');
                };
            })
    }]).
    controller('DisciplinasListarCtrl', ['$scope', 'Disciplinas', function ($scope, Disciplinas) {
        $scope.disciplinas = Disciplinas;
        $scope.paginaAtual = 0;
        $scope.paginaTamanho = 10;
        $scope.paginaTotal = function () {
            return Math.ceil($scope.disciplinas.length / $scope.paginaTamanho);
        }
    }]).
    // controles responsáveis por manter disciplinas
    controller('AvisosCriarCtrl', ['$scope', '$location', '$timeout', 'Avisos', 'Turmas', 'Disciplinas', 'Instituicoes', function ($scope, $location, $timeout, Avisos, Turmas, Disciplinas, Instituicoes) {
        $scope.turmas = Turmas;
        $scope.disciplinas = Disciplinas;
        $scope.instituicoes = Instituicoes
        $scope.salvar = function () {
            $scope.aviso.dataHora = new Date().getTime();
            Avisos.add($scope.aviso, function () {
                bootbox.alert('O aviso <strong>' + $scope.aviso.titulo + '</strong> foi salvo com sucesso!', function () {
                    $timeout(function () {
                        $location.path('/avisos');
                    });
                });
            });
        }
    }]).
    controller('AvisosEditarCtrl', ['$scope', '$location', '$routeParams', 'angularFire', 'ProjetoFireBaseUrl', 'Turmas', 'Disciplinas', 'Instituicoes', function ($scope, $location, $routeParams, angularFire, ProjetoFireBaseUrl, Turmas, Disciplinas, Instituicoes) {
        $scope.turmas = Turmas;
        $scope.disciplinas = Disciplinas;
        $scope.instituicoes = Instituicoes
        angularFire(ProjetoFireBaseUrl.child('avisos').child($routeParams.id), $scope, 'remote', {}).
            then(function () {
                $scope.aviso = angular.copy($scope.remote);
                $scope.aviso.$id = $routeParams.id;
                $scope.alterado = function () {
                    return angular.equals($scope.remote, $scope.aviso);
                }
                $scope.apagar = function () {
                    $scope.remote = null;
                    $location.path('/avisos');
                };
                $scope.salvar = function () {
                    $scope.aviso.dataHora = new Date().getTime();
                    $scope.remote = angular.copy($scope.aviso);
                    $location.path('/avisos');
                };
            })
    }]).
    controller('AvisosListarCtrl', ['$scope', 'Avisos', function ($scope, Avisos) {
        $scope.avisos = Avisos;
        $scope.paginaAtual = 0;
        $scope.paginaTamanho = 10;
        $scope.paginaTotal = function () {
            return Math.ceil($scope.avisos.length / $scope.paginaTamanho);
        }
    }]).
    // controles responsáveis por manter turmas
    controller('TurmasCriarCtrl', ['$scope', '$location', '$timeout', 'Turmas', 'Disciplinas', function ($scope, $location, $timeout, Turmas, Disciplinas) {
        $scope.disciplinas = Disciplinas;
        $scope.salvar = function () {
            Turmas.add($scope.turma, function () {
                bootbox.alert('A turma <strong>' + $scope.turma.nome + '</strong> foi salva com sucesso!', function () {
                    $timeout(function () {
                        $location.path('/turmas');
                    });
                });
            });
        }
    }]).
    controller('TurmasEditarCtrl', ['$scope', '$location', '$routeParams', 'angularFire', 'ProjetoFireBaseUrl', 'Disciplinas', function ($scope, $location, $routeParams, angularFire, ProjetoFireBaseUrl, Disciplinas) {
        $scope.disciplinas = Disciplinas;
        angularFire(ProjetoFireBaseUrl.child('turmas').child($routeParams.id), $scope, 'remote', {}).
            then(function () {
                $scope.turma = angular.copy($scope.remote);
                $scope.turma.$id = $routeParams.id;
                $scope.alterado = function () {
                    return angular.equals($scope.remote, $scope.turma);
                }
                $scope.apagar = function () {
                    $scope.remote = null;
                    $location.path('/turmas');
                };
                $scope.salvar = function () {
                    $scope.remote = angular.copy($scope.turma);
                    $location.path('/turmas');
                };
            })
    }]).
    controller('TurmasListarCtrl', ['$scope', 'Disciplinas', 'Turmas', function ($scope, Disciplinas, Turmas) {
        $scope.turmas = Turmas;
        $scope.disciplinas = Disciplinas;
        $scope.paginaAtual = 0;
        $scope.paginaTamanho = 10;
        $scope.paginaTotal = function () {
            return Math.ceil($scope.turmas.length / $scope.paginaTamanho);
        }
    }]).
    // controles responsáveis por manter instituições
    controller('InstituicoesCriarCtrl', ['$scope', '$location', '$timeout', 'Instituicoes', function ($scope, $location, $timeout, Instituicoes) {
        $scope.salvar = function () {
            Instituicoes.add($scope.instituicao, function () {
                bootbox.alert('A instituição <strong>' + $scope.instituicao.nome + '</strong> foi salva com sucesso!', function () {
                    $timeout(function () {
                        $location.path('/instituicoes');
                    });
                });
            });
        }
    }]).
    controller('InstituicoesEditarCtrl', ['$scope', '$filter', '$location', '$routeParams', 'angularFire', 'ProjetoFireBaseUrl', 'Disciplinas', function ($scope, $filter, $location, $routeParams, angularFire, ProjetoFireBaseUrl, Disciplinas) {
        angularFire(ProjetoFireBaseUrl.child('instituicoes').child($routeParams.id), $scope, 'remote', {}).
            then(function () {
                $scope.disciplinas = Disciplinas;
                $scope.instituicao = angular.copy($scope.remote);
                $scope.instituicao.$id = $routeParams.id;
                $scope.alterado = function () {
                    return angular.equals($scope.remote, $scope.instituicao);
                }
                $scope.apagar = function () {
                    var temFillhos = $filter('hasChild')($scope.disciplinas, $scope.instituicao.$id, 'instituicaoId');
                    if (temFillhos) {
                        bootbox.alert('Não é possível excluir a instituiçao ' + $scope.instituicao.nome + ', por que há registros dependentes!');
                    } else {
                        $scope.remote = null;
                        $location.path('/instituicoes');
                    }
                };
                $scope.salvar = function () {
                    $scope.remote = angular.copy($scope.instituicao);
                    $location.path('/instituicoes');
                };
            })
    }]).
    controller('InstituicoesListarCtrl', ['$scope', 'Instituicoes', function ($scope, Instituicoes) {
        $scope.instituicoes = Instituicoes;
        $scope.paginaAtual = 0;
        $scope.paginaTamanho = 10;
        $scope.paginaTotal = function () {
            return Math.ceil($scope.instituicoes.length / $scope.paginaTamanho);
        }
    }]).
    // controle primeiro acesso do usuário
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
                                        $location.path('/login');
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
    // controle do perfil de usuário
    controller('PerfilCtrl', ['$scope', '$location', '$routeParams', 'angularFire', 'ProjetoFireBaseUrl', function ($scope, $location, $routeParams, angularFire, ProjetoFireBaseUrl) {
        if (localStorage.sigesUserAuth == "true") {
            angularFire(ProjetoFireBaseUrl.child('usuarios').child($routeParams.id), $scope, 'remote', {}).
                then(function () {
                    $scope.usuarioLogado = angular.copy($scope.remote);
                    $scope.alterado = function () {
                        return angular.equals($scope.remote, $scope.usuarioLogado);
                    };
                    $scope.salvar = function () {
                        $scope.remote = angular.copy($scope.usuarioLogado);
                        $location.path('/perfil/' + $routeParams.id);
                    };
                })
        } else {
            $location.path('/login');
        }
    }]).
    // controle responsável por mostrar os avisos
    controller('MeusAvisosCtrl', ['$scope', '$rootScope', 'Avisos', function ($scope, $rootScope, Avisos) {
        $scope.avisos = Avisos;
        $scope.paginaAtual = 0;
        $scope.paginaTamanho = 3;
        $scope.Math = window.Math;
    }]).
    // controle responsável por mostrar as notas
    controller('MinhasNotasCtrl', ['$scope', 'Avaliacoes', 'Usuarios', 'Disciplinas', function ($scope, Avaliacoes, Usuarios, Disciplinas) {
        $scope.avaliacoes = Avaliacoes;
        $scope.disciplinas = Disciplinas;
        $scope.usuarios = Usuarios;
    }]).
    // controle responsável por manter o calendário
    controller('CalendarioCtrl', ['$scope', function ($scope) {
        $scope.calendario = { hoje: new Date().getTime() };
    }]).
    // controle responsável pela autenticação de usuários
    controller('LoginCtrl', [
        '$scope',
        'Usuarios',
        'Autenticacao',
        'angularFire',
        '$rootScope',
        '$location',
        '$timeout', function ($scope, Usuarios, Autenticacao, angularFire, $rootScope, $location, $timeout) {
            if ($rootScope.usuarioLogado) {
                if ($location.$$path == '/login') {
                    $location.path('/meus-avisos');
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
                $rootScope.usuarioLogado = null;
            };
            $rootScope.$on("loggedin", function (event, user) {
                var url = new Firebase('https://siges.firebaseio.com/usuarios');
                angularFire(url, $scope, 'users', {}).then(function () {
                    angular.forEach($scope.users, function (usuario, id) {
                        if (user.md5_hash == usuario.md5_hash) {
                            $rootScope.usuarioLogado = usuario;
                            $rootScope.usuarioLogado.$id = id;
                        }
                    });
                });
                if ($location.$$path == '/login') {
                    $location.path('/meus-avisos');
                }
                jQuery('.modal').modal('hide');
            });
            $rootScope.$on("loggedout", function (event) {
                $rootScope.usuarioLogado = null;
                $scope.remote = null;
            });
        }]);