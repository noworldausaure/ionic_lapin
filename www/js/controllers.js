angular.module('starter.controllers', ['ksSwiper'])

.controller('HomeCtrl', function($scope,$http, Home) {

  $scope.domain = Home.returnDomain($http)

  $scope.domain.then(function(domain){
    $scope.dataDomain = domain.data;
  })
})

.controller('DomainCtrl', function($scope,$rootScope, $http, Home, $stateParams) {
  var domain = $stateParams.domain;
  $scope.domain = domain;
  $rootScope.idStories = 0;
  $rootScope.images = [];
  //FUNCTION GET ALL STRIPS
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

  $scope.DataStrips = Home.returnAllStrips($http,domain)
  $scope.DataStrips.then(function(strips){
    $scope.stripData = addIndex(strips.data);
    placeStrip(strips);
  })

  //SWITCH STRIP FUNCTION
  $scope.changeStrip = function(id){
    $rootScope.idStories = id;
    if($rootScope.idStories == 0){
      $rootScope.images = [];
      $scope.DataStrips = Home.returnAllStrips($http,domain).then(function(strips){
        $scope.stripData = addIndex(strips.data);
        placeStrip(strips);
      })
    } else{
      $rootScope.images = []
      $scope.DataStrips = Home.returnStripsByStories($http,domain,$rootScope.idStories).then(function(strips){
        $scope.stripData = addIndex(strips.data);
        placeStrip(strips);
      })
    }
  }


  var placeStrip = function(data){
    for(i = 0; i < data.data.length; i++){
      $rootScope.images.push(data.data[i]);
    }
}
  function addIndex(array){
    for(i=0; i < array.length; i++){
      array[i]['index'] = i;
    }
    return array;
  }





})


.controller('StripCtrl', function($scope,$ionicPopup, $rootScope, $http, Home, $stateParams, $ionicSlideBoxDelegate) {
  $scope.index = $stateParams.id;
  var idStories = $rootScope.idStories;
  var domain = $stateParams.domain;

  $scope.data = {}
  $scope.data.bgColors = []
  console.log($rootScope.images)
  Domainpub = Home.returnPubByDomain($http,domain);
  Lapinpub = Home.returnLapinPub($http)

  $scope.swiper = {};

      $scope.onReadySwiper = function (swiper) {

        swiper.on('slideChangeStart', function () {

          console.log('slideChangeStart');
        });
      };
})
