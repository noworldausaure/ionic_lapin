angular.module('starter.controllers', [])

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
  })

  //SWITCH STRIP FUNCTION
  $scope.changeStrip = function(id){
    $rootScope.idStories = id;
    if($rootScope.idStories == 0){
      $scope.DataStrips = Home.returnAllStrips($http,domain)
    } else{
      $scope.DataStrips = Home.returnStripsByStories($http,domain,$rootScope.idStories)
    }
    $scope.DataStrips.then(function(strips){
      $scope.stripData = addIndex(strips.data);
    })
  }

  function addIndex(array){
    for(i=0; i < array.length; i++){
      array[i]['index'] = i;
    }
    return array;
  }




})

.controller('StripCtrl', function($scope,$ionicPopup, $rootScope, $http, Home, $stateParams, $ionicSlideBoxDelegate) {
  var index = $stateParams.id;
  var idStories = $rootScope.idStories;
  var domain = $stateParams.domain;

  $scope.data = {};
  $scope.data.bgColors = [];
  $scope.file = 0;
  $scope.title;
  $scope.link=0;

  Domainpub = Home.returnPubByDomain($http,domain);
  Lapinpub = Home.returnLapinPub($http)

  if(idStories == 0){
  $scope.DataStrips = Home.returnAllStrips($http,domain)
  } else {
  $scope.DataStrips = Home.returnStripsByStories($http,domain,idStories)
}

  $scope.DataStrips.then(function(strips){
    $scope.title = strips.data[index].title;
    $scope.file = strips.data[index].file;
    for (var i = 0; i < strips.data.length; i++) {
      $scope.data.bgColors.push("bgColor_" + i);
    }
  })

  var setupSlider = function() {
    //some options to pass to our slider
    $scope.data.sliderOptions = {
      initialSlide: 2,
      direction: 'horizontal', //or vertical
      speed: 300 //0.3s transition
    };

    //create delegate reference to link with slider
    $scope.data.sliderDelegate = null;
    var count = 0;
    var pubDomain = true;
    var randomPub = 0;
    var oldPrevious;

    //watch our sliderDelegate reference, and use it when it becomes available
    $scope.$watch('data.sliderDelegate', function(newVal, oldVal) {
      if (newVal != null) {
        $scope.data.sliderDelegate.on('slideChangeStart', function() {
          console.log('Previous Index : '+$scope.data.sliderDelegate.previousIndex)
          $scope.data.currentPage = $scope.data.sliderDelegate.activeIndex;
          console.log('Current page:' + $scope.data.currentPage)
          console.log(newVal)


          if(count == 2 && pubDomain){
            Domainpub.then(function(pub){
              if(pub.data.length != 1){
                 randomPub = Math.floor((Math.random() * pub.data.length) + 0)
              }
              else{
                 randomPub = 0;
              }
              console.log('random ' +randomPub)
              $scope.file = pub.data[randomPub].file;
              $scope.link = pub.data[randomPub].link;
              $scope.title = pub.data[randomPub].name;

              console.log('ok');
              pubDomain = false;
              count++;
            })
          }
          else if(count == 10){

            Lapinpub.then(function(pub){
              if(pub.data.length != 1){
                 randomPub = Math.floor((Math.random() * pub.data.length) + 1)
              }
              else{
                 randomPub = 0;
              }
              $scope.file = pub.data[randomPub].file;
              $scope.link = pub.data[randomPub].link;
              $scope.title = pub.data[randomPub].name;

            })
            count = 0;
          }
          else{
          $scope.DataStrips.then(function(strips){

            $scope.file = strips.data[$scope.data.currentPage].file;
            $scope.title = strips.data[$scope.data.currentPage].title;
            $scope.link = '#/strips/absurdo/' + $scope.data.currentPage;

            count++;
            console.log('compte ' + count)

          })
          oldPrevious = $scope.data.sliderDelegate.previousIndex
          console.log(oldPrevious);
        }
          //use $scope.$apply() to refresh any content external to the slider
          $scope.$apply();
        });
      }
    });
  };
  setupSlider();

});
