var pubPopup = null;

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
      .state('strip.pub', {
        url: '/pub',
        templateUrl: 'app/strip/views/strip.html',
        controller: 'PubCtrl',
        onEnter: function (Popup) {
          pubPopup = Popup.showPub();
        },
        onExit: function () {
          console.log("Leave");
          console.log(pubPopup);
          pubPopup.close();
        }
      })
    $urlRouterProvider.otherwise('/home');
  });
