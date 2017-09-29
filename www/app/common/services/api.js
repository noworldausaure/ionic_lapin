angular.module('starter.services')
  .factory("Api", function($http) {
    return {
      baseUrl: 'https://api.lapin.org/'
    };
  });