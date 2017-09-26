let pubPopup = null;

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
            .state('strip.pub', {
                url: '/pub',
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
            .state('stories', {
                url: '/stories/:domain',
                templateUrl: 'app/story/views/stories.html',
                controller: 'StoryListCtrl'
            })
            .state('story_strips', {
                url: '/story/:domain/:storyId',
                templateUrl: 'app/story/views/story-strips.html',
                controller: 'StoryCtrl'
            })
            .state('story_strips_slide', {
                url: '/story/:domain/:storyId/:stripId',
                templateUrl: 'app/story/views/story-slide.html',
                controller: 'StorySlideCtrl'
            });
        $urlRouterProvider.otherwise('/home');
    });
