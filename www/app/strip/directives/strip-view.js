function StripView() {
  return {
    scope: {
      strip: '='
    },
    restrict: 'E',
    templateUrl: 'app/strip/views/_strip-view.html',
  }
}

angular.module('starter.directives')
  .directive('stripView', StripView);
