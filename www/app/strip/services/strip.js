function Strip($http, Api) {

    return {
        returnNthStrips: function (domain, number, offset) {

            offset = typeof offset !== 'undefined' ? offset : 0;

            return $http.get(`${Api.baseUrl}strips/${domain}/${number}/${offset}`);
        },
        returnStripImage: function (domain, id) {

            return $http.get(`${Api.baseUrl}strips/image/${domain}/${id}`);
        }
    };
}

angular.module('starter.services')
    .factory("Strip", Strip);
