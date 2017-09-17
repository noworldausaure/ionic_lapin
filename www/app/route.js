angular.module('starter')
    .config(function ($stateProvider, $urlRouterProvider) {
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
                controller: 'StripCtrl'
            })
            .state('stories', {
                url: '/stories/:domain',
                templateUrl: 'app/story/views/stories.html',
                controller: 'StoryListCtrl'
            });
        $urlRouterProvider.otherwise('/home');
    });
