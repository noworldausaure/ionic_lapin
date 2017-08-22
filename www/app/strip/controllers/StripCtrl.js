function StripCtrl($scope,$ionicPopup,$location, $rootScope, $http,
  $stateParams, $ionicSlideBoxDelegate, Strip, Pub) {

    var idStories = $rootScope.idStories;
    var domain = $stateParams.domain;
    var id = $stateParams.id;
    var count = 0;
    var pubDomain = false;
    $scope.domain = domain;

    // Event listeners on slide modifications
    var slideModifListeners = [];
    function SlideModificationEvent (callback) {

      this.onModification = function () {
        callback();
      };
    };

    // SET UP SLIDER
    $scope.sliderOptions = {
      zoom: true,
      pagination: false,
      direction: 'horizontal'
    };

    $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
      $scope.slider = data.slider;
      console.log("slider initialized");
    });

    let firstStripReached = false;
    let lastStripReached = false;
    $scope.$on("$ionicSlides.slideChangeEnd", function(event, data) {
      console.log(`slide changed, index=${data.slider.activeIndex}, indexOfLast=${data.slider.slides.length - 1}, end=${data.slider.isEnd}`);
      let index = data.slider.activeIndex;
      let slider = $scope.slider;

      // If we reach the start of the slider, we'll load data
      if(slider.isBeginning) {

        if(firstStripReached)
          return;

        let currentStripId = $scope.strips[index].id;
        let count = Math.min(Math.max(currentStripId - 1, 0), 5);
        let offset = Math.max(0, currentStripId - 5);

        console.log(`Load ${count} strips from offset ${offset}`);

        Strip.returnNthStrips(
          $http,domain, count, offset)
        .then(function(strips) {

          // If strips coming from api are already in the loaded strips
          // that's mean we reached the first strip
          let newStrip = strips.data[0];
          for(let strip of $scope.strips) {
            if (strip.id == newStrip.id) {
              firstStripReached = true;
              console.log("firstStrip reached");
              return;
            }
          }

          // Listen for slide modification to be effective
          slideModifListeners.push(new SlideModificationEvent(function () {
            slider.slideTo(strips.data.length, 0);
          }));

          strips.data.forEach(function(strip) {
            $scope.strips.unshift(strip);
            stripImageLoader(strip);
          });
        });
      }
      // if we reached the end of the slider, we'll load data
      else if(slider.isEnd) {

        if(lastStripReached)
          return;

        Strip.returnNthStrips($http,domain,5,$scope.strips[index].id)
        .then(function(strips) {
          if(strips.data.length == 0){
            lastStripReached = true;
            console.log("last strip reached");
            return;
          }

          console.log(strips.data);
          $scope.strips = $scope.strips.concat(strips.data);
          $scope.strips.forEach(function(strip) {
            stripImageLoader(strip);
          });
        });
      }
    });

    // Watch slides array for initial slides loading and set initial slide active index when loaded
    let slidesWatcher = $scope.$watch("slider.slides", function () {
      let slider = $scope.slider;
      let slideCount;

      // Slide to initial slide when slides are loaded in the slider
      if(slider != undefined && (slideCount = slider.slides.length) > 0) {

        //Get the index of the queried strip
        let initialIndex;
        for(let i = 0; i < slideCount; i++) {
          let strip = $scope.strips[i];
          if(strip.id == id) {
            initialIndex = i;
            break;
          }
        }
        console.log("Slide to init slide");
        slider.slideTo(initialIndex, 0);

        // Unwatch
        slidesWatcher();
      }
    });

    // Event listener for slide modifications
    $scope.$watch("slider.slides", function () {
      slideModifListeners.forEach(function (listener) {
        listener.onModification();
      });
    });

    // STRIPS SECTION
    // Populate initial strips
    Strip.returnNthStrips($http,domain,5,id-3)
      .then(function(strips) {
        $scope.strips = strips.data;
        $scope.strips.forEach(function(strip) {
          stripImageLoader(strip);
        });
      });

    var stripImageLoader = function(strip) {
      strip.loading = true;
      Strip.returnStripImage($http,domain,strip.id)
      .then(function(stripImage) {
        strip.loading = false;
        strip.file = stripImage.data[0].file;
      });
    };

    // ADVERTISING SECTION
    // Domainpub = Pub.returnPubByDomain($http,domain);
    // Lapinpub = Pub.returnLapinPub($http);
    //
    // showConfirm = function(data) {
    //   var confirmPopup = $ionicPopup.confirm({
    //     title: '<p class=font lapin-color>'+data.name+'</p>',
    //     template:'<img class=imgPopUp ng-src=data:image/jpeg;base64,'+data.file+'>',
    //     cancelText:'Retour',
    //    okText:'Plus d\'info',
    //   });
    //
    //   confirmPopup.then(function(res) {
    //     if(res) {
    //       window.open(data.link,'_system')
    //     }
    //   });
    // };
}

angular.module('starter.controllers')
.controller('StripCtrl', StripCtrl);
