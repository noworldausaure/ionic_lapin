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


.controller('StripCtrl', function($scope,$ionicPopup,$location, $rootScope, $http, Home, $stateParams, $ionicSlideBoxDelegate) {
  var idStories = $rootScope.idStories;
  var domain = $stateParams.domain;
  var count = 0;
  var pubDomain = false;
  $scope.changeClass = true
  $scope.index = $stateParams.id;
  $scope.data = {}
  $scope.data.bgColors = []
  $scope.noSwipping;

  Domainpub = Home.returnPubByDomain($http,domain)
  Lapinpub = Home.returnLapinPub($http)
  $scope.swiper = {};

   $scope.onReadySwiper = function (swiper) {
     console.log(swiper)
     swiper.on('slideChangeStart', function () {
       count++;
       console.log(swiper.activeIndex);
       console.log(count);
       if(count == 2 && !pubDomain){
         Domainpub.then(function(data){
           var u = Math.floor((Math.random() * data.data.length) + 0);
           showConfirm(data.data[u]);
           pubDomain = true;
         })
       }
       if(count == 10){
        Lapinpub.then(function(data){
          var u = Math.floor((Math.random() * data.data.length) + 0);
          showConfirm(data.data[u]);
        })
        count = 0;
       }
     });
   };

   showConfirm = function(data) {
   var confirmPopup = $ionicPopup.confirm({
     title: '<p class=font lapinColor>'+data.name+'</p>',
     template:'<img class=imgPopUp ng-src=data:image/jpeg;base64,'+data.file+'>',
     cancelText:'Retour',
    okText:'Plus d\'info',
   });

   confirmPopup.then(function(res) {
     if(res) {
        window.open(data.link,'_system')
     }
   });
 };

  //  var showPopup = function(data) {
  //    $scope.data = {}

     // Custom popup
    //  var myPopup = $ionicPopup.confirm({
    //     template:
    //     title: data.name,
    //     subTitle: 'Chez lapin',
    //     scope: $scope,
     //
    //     buttons: [
    //        { text: 'Retour' }, {
    //           text: '<b>Plus d\'info</b>',
    //           type: 'button-positive',
    //        }
    //     ]
    //  });
    //  myPopup.then(function(res) {
    //     console.log('Tapped!', res);
    //  });
  // });
// })
})
