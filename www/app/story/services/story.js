angular.module("starter.services")
    .factory("Story", function ($http, CacheFactory, Api) {

        if (!CacheFactory.get('storyCache')) {

            CacheFactory('storyCache', {
                maxAge: 60 * 60 * 1000,
                deleteOnExpire: 'aggressive',
                storageMode: 'localStorage'
            });

        }

        return {
            returnStory: function (domain, storyId) {

                return $http.get(`${Api.baseUrl}stories/${domain}/${storyId}`)
            },
            returnStories: function (domain, number, offset) {

                offset = typeof offset !== 'undefined' ? offset : 0;

                return $http.get(`${Api.baseUrl}stories/${domain}/${number}/${offset}`, {
                    cache: CacheFactory.get('storyCache')
                })
            },
            returnStripsByStory: function (domain, storyId, number, offset) {

                offset = typeof offset !== 'undefined' ? offset : 0;

                console.log(`Load ${number} strips with offset ${offset}`);

                return $http.get(`${Api.baseUrl}strips/stories/${domain}/${storyId}/${number}/${offset}`, {
                    cache: CacheFactory.get('storyCache')
                }).then(function (response) {
                    console.log(response.data);
                    return response;
                });
            }
        }
    });
