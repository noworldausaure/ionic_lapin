angular.module('starter')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/home/views/home.html',
        controller: 'HomeCtrl'
      })
      .state('strips', {
        url: '/strips/:domain',
        templateUrl: 'app/domain/views/domain.html',
        controller: 'DomainCtrl'
      })
      .state('strip', {
        url: '/strips/:domain/:id',
        templateUrl: 'app/strip/views/strip.html',
        controller: 'StripCtrl',
        cache: false
      })
    $urlRouterProvider.otherwise('/home');
  });
