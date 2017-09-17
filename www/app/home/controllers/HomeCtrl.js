function HomeCtrl($scope, $http, Domain) {
  $scope.loading = true;

  Domain.returnDomain($http)
    .then(function(domains) {
      $scope.loading = false;
      $scope.domains = domains.data;
    });
}

angular.module('starter.controllers')
  .controller('HomeCtrl', HomeCtrl);