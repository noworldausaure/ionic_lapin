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
    templateUrl: 'app/home/views/home.html',
    controller:'HomeCtrl'
  })
  .state('strips', {
    url: '/strips/:domain',
    templateUrl: 'app/domain/views/domain.html',
    controller:'DomainCtrl'
  })
  .state('strip', {
    url: '/strips/:domain/:id',
    templateUrl: 'app/strip/views/strip.html',
    controller:'StripCtrl',
    cache: false
  })
  $urlRouterProvider.otherwise('/home');
})
.config(function ($ionicConfigProvider) {
  $ionicConfigProvider.backButton.previousTitleText(false)
  $ionicConfigProvider.backButton.text('');
})
.config(function($httpProvider) {
  /**
   ** Interceptor to queue HTTP requests.
   **/
  $httpProvider.interceptors.push(['$q', function ($q) {
    var _queue = [];

  /**
   ** Executes the top function on the queue (if any).
   **/
    function _executeTop() {
      if (_queue.length === 0) {
        return;
      }
      _queue[0]();
    }

    return {
  /**
   ** Blocks each request on the queue. If the first request, processes immediately.
   **/
      request: function (config) {
        if (config.url.substring(0, 4) == 'http') {
          var deferred = $q.defer();
          _queue.push(function () {
            deferred.resolve(config);
          });
          if (_queue.length === 1) {
            _executeTop();
          }
          return deferred.promise;
        } else {
          return config;
        }
      },
  /**
   ** After each response completes, unblocks the next request.
   **/
      response: function (response) {
        if (response.config.url.substring(0, 4) == 'http') {
          _queue.shift();
          _executeTop();
        }
        return response;
      },
  /**
   ** After each response errors, unblocks the next request.
   **/
      responseError: function (responseError) {
        if (responseError.config.url.substring(0, 4) == 'http') {
          _queue.shift();
          _executeTop();
        }
        return $q.reject(responseError);
      },
    };
  }]);
});
