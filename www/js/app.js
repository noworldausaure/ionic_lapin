angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','starter.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home',{
    url: '/home',
    templateUrl: 'templates/home.html',
    controller:'HomeCtrl'
  })
  .state('strips', {
    url: '/strips/:domain',
    templateUrl: 'templates/domain.html',
    controller:'DomainCtrl'
  })
  .state('strip', {
    url: '/strips/:domain/:id',
    templateUrl: 'templates/strip.html',
    controller:'StripCtrl',
    cache: false
  })
  $urlRouterProvider.otherwise('/home');
});
