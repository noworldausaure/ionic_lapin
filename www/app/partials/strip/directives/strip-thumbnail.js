function StripThumbnail() {
  return {
    scope: {
      strip: '='
    },
    restrict: 'E',
    templateUrl: 'app/partials/strip/views/strip-thumbnail.html'
  }
}

angular.module('starter.directives')
  .directive('stripThumbnail', StripThumbnail);
