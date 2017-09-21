function StripCtrl($rootScope, $scope, $stateParams, Strip, Pub) {

    let domainName = $stateParams.domain;
    let stripId = $stateParams.stripId;
    let count = 0;
    let lastStripId;
    let pubDomain = false;

    $rootScope.domain = domainName;

    // Event listeners on slide modifications
    let slideModifListeners = [];

    function SlideModificationEvent(callback) {

        this.onModification = function () {
            callback();
        };
    }

    // SET UP SLIDER
    $scope.sliderOptions = {
        zoom: true,
        pagination: false,
        direction: 'horizontal'
    };

    $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {

        $scope.slider = data.slider;
    });

    let firstStripReached = false;
    let lastStripReached = false;

    $scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {

        // console.log(`slide changed, index=${data.slider.activeIndex}, indexOfLast=${data.slider.slides.length - 1}, end=${data.slider.isEnd}`);
        let index = data.slider.activeIndex;
        let slider = $scope.slider;
        let currentStripId = $scope.strips[index].id;

        // If we reach the start of the slider, we load data
        if (slider.isBeginning) {

            if (firstStripReached)
                return;

            let count = 5;
            let offset = Math.max(0, currentStripId - 5);

            console.log(`Load ${count} strips from offset ${offset}`);

            Strip.returnNthStrips(domainName, count, offset)
                .then(function (response) {

                    // If strips coming from api are already in the loaded strips
                    // that's mean we reached the first strip
                    let newStrip = response.data[0];
                    for (let strip of $scope.strips) {

                        if (strip.id === newStrip.id) {

                            firstStripReached = true;
                            console.log("firstStrip reached");
                            return;
                        }
                    }

                    let loadedCount = 0; // Store  how many strips are retained
                    response.data.forEach(function (strip) {

                        // Check if we already have the strip loaded
                        let contains = false;

                        for (let i = 0; i < $scope.strips.length; i++) {

                            if ($scope.strips[i].id === strip.id) {
                                contains = true;
                                console.log(`Strip ${strip.id} already loaded`);

                                break;
                            }
                        }

                        if (!contains) {

                            loadedCount++;

                            $scope.strips.unshift(strip);
                            stripImageLoader(strip);
                        }
                    });

                    // Listen for slide modification to be effective
                    slideModifListeners.push(new SlideModificationEvent(function () {
                        slider.slideTo(loadedCount, 0);
                    }));
                });
        }
        // if we reached the end of the slider, we load data
        else if (slider.isEnd) {

            if (lastStripReached)
                return;

            console.log(lastStripId);
            Strip.returnNthStrips(domainName, 5, lastStripId + 1)
                .then(function (response) {

                    if (response.data.length === 0) {

                        lastStripReached = true;
                        console.log("last strip reached");
                        return;
                    }

                    $scope.strips = $scope.strips.concat(response.data);

                    lastStripId = parseInt(response.data[response.data.length - 1].id);

                    response.data.forEach(function (strip) {

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
        if (slider !== undefined && (slideCount = slider.slides.length) > 0) {

            //Get the index of the queried strip
            let initialIndex;
            for (let i = 0; i < slideCount; i++) {

                let strip = $scope.strips[i];

                if (strip.id === stripId) {

                    initialIndex = i;
                    break;
                }
            }
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
    Strip.returnNthStrips(domainName, 5, stripId - 3)
        .then(function (response) {

            lastStripId = parseInt(response.data[response.data.length - 1].id);

            $scope.strips = response.data;
            $scope.strips.forEach(function (strip) {

                stripImageLoader(strip);
            });
        });

    let stripImageLoader = function (strip) {

        strip.loading = true;

        Strip.returnStripImage(domainName, strip.id)
            .then(function (stripImage) {

                strip.loading = false;
                strip.file = stripImage.data[0].file;
            });
    };
}

angular.module('starter.controllers')
  .controller('StripCtrl', StripCtrl);
