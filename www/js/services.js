angular.module('starter.services', [])


.factory('Home', function($http){
  var url =  'http://localhost/API_Lapin/api/'
  return {
    url: function() {
      return 'http://localhost/API_Lapin/api/';
    },
    returnDomain($http) {
      return $http.get(url + 'infoGeneral');
    },
    returnAllStrips($http,domain){
      return $http.get(url + 'strips/'+domain);
    },
    returnStripsByStories($http,domain,id){
      return $http.get(url +'/strips/stories/' + domain + '/' + id);
    },
    returnPubByDomain($http,domain){
        return $http.get(url + '/pub/domain/'+domain )
    },
    returnLapinPub($http,domain){
        return $http.get(url + '/pub/general' )
    }
  }
});
