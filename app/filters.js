'use strict';

angular.module('siges.filters', []).
    filter('quebralinha', function () {
        return function (text) {
            return (text).replace(/(\r\n|\n\r|\r|\n)/g, '<br />');
        }
    })
    .filter('truncate', function () {
        return function (text, length, end) {
            if (isNaN(length)) {
                length = 10;
            }
            if (end === undefined) {
                end = "...";
            }
            if (text.length <= length || text.length - end.length <= length) {
                return text;
            }
            else {
                return String(text).substring(0, length - end.length) + end;
            }

        };
    });