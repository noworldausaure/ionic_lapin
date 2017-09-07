angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives', 'angular-cache'])
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
  .config(function($ionicConfigProvider) {
    $ionicConfigProvider.backButton.previousTitleText(false)
    $ionicConfigProvider.backButton.text('');
  });
