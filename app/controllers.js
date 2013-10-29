'use strict';

angular.module('siges.controllers', []).
    controller('EntrarCtrl', ['$scope', function ($scope) {
        $scope.usuario = {
            email: 'alanclesio@gmail.com',
            senha: '123456'
        };
        $scope.login = function () {
            console.log('Entrou')
        };
    }]);