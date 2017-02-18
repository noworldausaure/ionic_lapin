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
 $scope.data.strips = [];
 $scope.data.currentPage = 1;

 function addIndex(array){
 for(i=0; i < array.length; i++){
   array[i]['index'] = i;
 }
 return array;
}

if(idStories == 0){
  $scope.DataStrips = Home.returnAllStrips($http,domain)
}else{
 $scope.DataStrips = Home.returnStripsByStories($http,domain,idStories)
}
 $scope.DataStrips.then(function(strips){
   console.log(strips.data);
   $scope.data.strips = addIndex(strips.data);
  //  var indexIncr = index + 1;
  //  $scope.data.strips.push(strips.data[indexIncr]);
  //  var indexDecr = index - 1 ;
  //  $scope.data.strips.unshift(strips.data[indexDecr]);

   console.log($scope.data.strips)
 })

 var setupSlider = function() {
   //some options to pass to our slider
   $scope.data.options = {
     initialSlide: 1,
     direction: 'horizontal', //or vertical
     speed: 300 //0.3s transition
   };
}
  $scope.data.sliderDelegate = null;
    var count = 0;
    //watch our sliderDelegate reference, and use it when it becomes available
    $scope.$watch('data.sliderDelegate', function(newVal, oldVal) {
      if (newVal != null) {
        $scope.data.sliderDelegate.on('slideChangeEnd', function() {
          $scope.data.currentPage = $scope.data.sliderDelegate.activeIndex;
            // popup();
            console.log($scope.data.sliderDelegate.activeIndex)
            $scope.DataStrips.then(function(strips){
          })

          //use $scope.$apply() to refresh any content external to the slider
          $scope.$apply();
        });
      }
    });

  setupSlider();

  function popup() {
     $scope.data = {}

     // Custom popup
     var myPopup = $ionicPopup.show({
        template: '<input type = "text" ng-model = "data.model">',
        title: 'Title',
        subTitle: 'Subtitle',
        scope: $scope,

        buttons: [
           { text: 'Cancel' }, {
              text: '<b>Save</b>',
              type: 'button-positive',
                 onTap: function(e) {

                    if (!$scope.data.model) {
                       //don't allow the user to close unless he enters model...
                          e.preventDefault();
                    } else {
                       return $scope.data.model;
                    }
                 }
           }
        ]
     });
   }
    //  popup();
});
