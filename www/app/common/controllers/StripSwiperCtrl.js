function StripSwiperCtrl(child, $scope, $state, domainName, initialStripId, Strip) {

    const SHOW_PUB_STRIP_COUNTER = 2;

    let lastStripId;
    let firstStripReached = false;
    let lastStripReached = false;

    let pubSlideCount = 0;

    // Event listeners on slide modifications
    let tempSlideModifListeners = [];

    // Setting up the swiper
    $scope.sliderOptions = {
        zoom: true,
        pagination: false,
        direction: 'horizontal'
    };

    $scope.strips = [];

    function SlideModificationEvent(callback) {

        this.onModification = function () {
            callback();
        };
    }

    $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
        $scope.slider = data.slider;
    });

    // Event listener for slide modifications
    $scope.$watch("slider.slides", function () {

        for (let i = 0; i < tempSlideModifListeners.length; i++) {

            let listener = tempSlideModifListeners.pop();
            listener.onModification();
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

                if (strip.id === initialStripId) {

                    initialIndex = i;
                    break;
                }
            }
            slider.slideTo(initialIndex, 0);

            // Unwatch
            slidesWatcher();
        }
    });

    $scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {

        pubSlideCount ++;
        if(pubSlideCount >= SHOW_PUB_STRIP_COUNTER) {

            pubSlideCount = 0;
            $state.go('strip.pub');
        }

        // console.log(`slide changed, index=${data.slider.activeIndex}, indexOfLast=${data.slider.slides.length - 1}, end=${data.slider.isEnd}`);
        let index = data.slider.activeIndex;
        let slider = $scope.slider;
        let currentStripId = $scope.strips[index].id;

        // If we reach the start of the slider, we load data
        if (slider.isBeginning) {

            if (firstStripReached)
                return;

            let count = 5;
            let offset = currentStripId - 5;

            console.log(`Load ${count} strips from offset ${offset}`);

            internalGetStrips(domainName, count, offset)
                .then(function (strips) {

                    // If strips coming from api are already in the loaded strips
                    // that's mean we reached the first strip
                    let newStrip = strips[0];
                    for (let strip of $scope.strips) {

                        if (strip.id === newStrip.id) {

                            firstStripReached = true;
                            console.log("firstStrip reached");
                            return;
                        }
                    }

                    let loadedCount = 0; // Store  how many strips are retained
                    strips.forEach(function (strip) {

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
                        }
                    });

                    // Listen for slide modification to be effective
                    tempSlideModifListeners.push(new SlideModificationEvent(function () {
                        slider.slideTo(loadedCount, 0);
                    }));
                });
        }
        // if we reached the end of the slider, we load data
        else if (slider.isEnd) {

            if (lastStripReached)
                return;

            internalGetStrips(domainName, 5, lastStripId + 1)
                .then(function (strips) {

                    if (strips.length === 0) {

                        lastStripReached = true;
                        console.log("last strip reached");
                        return;
                    }

                    $scope.strips = $scope.strips.concat(strips);

                    lastStripId = parseInt(strips[strips.length - 1].id);
                });
        }
    });

    let internalGetStrips = function (domainName, number, offset) {

        number = Math.max(number, 0);
        offset = Math.max(offset, 0);

        return child.getStrips(domainName, number, offset)
            .then(function (strips) {

                strips.forEach(function (strip) {

                    stripImageLoader(strip);
                });

                return strips;
            });
    };

    // noinspection JSUnusedLocalSymbols
    /**
     * Get the strips to add to the swiper.
     *
     * @param domainName domain in witch to get strips
     * @param number number of strips to get
     * @param offset correspond to a strip id
     * @returns {Promise.<Array<Object>>} a promise that will return the strips
     */
    child.getStrips = function (domainName, number, offset) {
        console.warn("This method must be implemented by the child controller");
    };

    let stripImageLoader = function (strip) {

        strip.loading = true;

        Strip.returnStripImage(domainName, strip.id)
            .then(function (response) {

                strip.loading = false;
                strip.file = response.data[0].file;
            });
    };

    child.init = function () {

        // Populate initial strips
        internalGetStrips(domainName, 5, initialStripId - 3)
            .then(function (strips) {

                $scope.strips = strips;

                if (strips && strips.length > 0)
                    lastStripId = parseInt(strips[strips.length - 1].id);
            });
    };
}

angular.module('starter.services')
    .controller('StripSwiperCtrl', StripSwiperCtrl);