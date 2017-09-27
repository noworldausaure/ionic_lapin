function StripView() {
  return {
    scope: {
      strip: '='
    },
    restrict: 'E',
    templateUrl: 'app/partials/strip/views/strip-view.html',
  }
}

angular.module('starter.directives')
  .directive('stripView', StripView);
