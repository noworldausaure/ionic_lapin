function HomeCtrl($scope, $http, Domain) {
  $scope.loading = true;
  $scope.domain = Domain.returnDomain($http)
    .then(function(domain) {
      $scope.loading = false;
      $scope.dataDomain = domain.data;
    });
}

angular.module('starter.controllers')
  .controller('HomeCtrl', HomeCtrl);
