'use strict';

angular.module('siges.factories', []).
    factory('ProjetoFireBaseUrl', function () {
        return new Firebase('https://siges.firebaseio.com/');
    }).
    factory('Avisos', function (angularFireCollection, ProjetoFireBaseUrl) {
        return angularFireCollection(ProjetoFireBaseUrl.child('avisos'));
    }).
    factory('Usuarios', function (angularFireCollection, ProjetoFireBaseUrl) {
        return angularFireCollection(ProjetoFireBaseUrl.child('usuarios'));
    }).
    factory('Disciplinas', function (angularFireCollection, ProjetoFireBaseUrl) {
        return angularFireCollection(ProjetoFireBaseUrl.child('disciplinas'));
    }).
    factory('Turmas', function (angularFireCollection, ProjetoFireBaseUrl) {
        return angularFireCollection(ProjetoFireBaseUrl.child('turmas'));
    }).
    factory('Instituicoes', function (angularFireCollection, ProjetoFireBaseUrl) {
        return angularFireCollection(ProjetoFireBaseUrl.child('instituicoes'));
    });