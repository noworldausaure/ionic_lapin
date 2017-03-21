angular.module('starter.services', [])

.factory('Home', function($http) {
  var url =  'https://api.lapin.org/'
  return {
    returnDomain: function($http) {
      return $http.get(url + 'infoGeneral', {cache:true});
    },
    returnInfo: function($http,domain) {
      return $http.get(url + 'info/' + domain, {cache:true});
    },
    returnStories: function($http,domain) {
      return $http.get(url + 'stories/' + domain, {cache:true});
    },
    returnNthStrips: function($http,domain,number,offset) {
      offset = typeof offset !== 'undefined' ? offset : 0;
      return $http.get(url + 'strips/' + domain + '/' + number + "/" + offset, {cache:true});
    },
    returnAllStrips: function($http,domain) {
      return $http.get(url + 'strips/' + domain, {cache:true});
    },
    returnStripsByStories: function($http,domain,id) {
      return $http.get(url +'strips/stories/' + domain + '/' + id, {cache:true});
    },
    returnStripImage: function($http,domain,id) {
      return $http.get(url + 'strips/image/' + domain + "/" + id, {cache:true});
    },
    returnPubByDomain: function($http,domain) {
        return $http.get(url + 'pub/domain/' + domain, {cache:true});
    },
    returnLapinPub: function($http,domain) {
        return $http.get(url + 'pub/general', {cache:true});
    }
  }
});
