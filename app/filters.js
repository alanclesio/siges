'use strict';

angular.module('siges.filters', []).
    filter('quebralinha',function () {
        return function (text) {
            return (text).replace(/(\r\n|\n\r|\r|\n)/g, '<br />');
        }
    }).
    filter('truncate',function () {
        return function (text, length, end) {
            if (isNaN(length)) {
                length = 10;
            }
            if (end === undefined) {
                end = "...";
            }
            if (text === undefined) {
                text = "";
            }
            if (text.length <= length || text.length - end.length <= length) {
                return text;
            }
            else {
                return String(text).substring(0, length - end.length) + end;
            }

        };
    }).
    filter('iniciaEm',function () {
        return function (entrada, inicio) {
            inicio = +inicio; // parse int
            return entrada.slice(inicio);
        }
    }).
    filter('hasChild', function () {
        return function (objeto, id, atributo) {
            for (var i = 0; i < objeto.length; i++) {
                if (objeto[i][atributo] == id) {
                    return true;
                }
            }
            return false;
        }
    }).
    filter('presenca', function () {
        return function (entrada) {
            return entrada ? 'Presente' : 'Ausente';
        }
    });