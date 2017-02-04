angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('HomeCtrl', function($scope,$http, Home) {
  var url = Home.url() + 'infoGeneral';
  $http.get(url).success(function(data){
    console.log(data);
    $scope.data = data;
  });

})

.controller('DomainCtrl', function($scope, $http, Home, $stateParams) {
  var domain = $stateParams.domain;
  $scope.domain = domain;

  //FUNCTION GET ALL STRIPS
  var allStrips = function(){
  var url = Home.url()+ 'strips/'+domain;
  $http.get(url).success(function(strips){
    $scope.stripData = strips;
  });
}
  allStrips();
  //GET INFO domain
  var url = Home.url()+ 'info/'+domain;
  $http.get(url).success(function(info){
    $scope.info = info[0];
  });

  //GET STORIES
  var url = Home.url()+ 'stories/'+domain;
  $http.get(url).success(function(stories){
    console.log(stories);
    $scope.stories = stories;
  });

  //SWITCH STRIP FUNCTION
  $scope.test = function(id){
    if(id == 0){
      allStrips();
    }
    var url = Home.url()+'/strips/stories/' + domain + '/' + id;
    $http.get(url).success(function(strips){
      console.log(strips);
      $scope.stripData = strips;
    });
  }
})

.controller('StripCtrl', function($scope, $http, Home, $stateParams) {
  var domain = $stateParams.domain;
  var id = $stateParams.id;
  var url = Home.url()+ 'strips/'+domain+'/'+id;
  $http.get(url).success(function(strip){
    console.log(strip);
    $scope.strip = strip[0];
  })
})
.controller('TabCtrl', function($scope,$stateParams) {
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
