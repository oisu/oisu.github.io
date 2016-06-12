(function () {

    angular
        .module('feeds')
        .controller('FeedController', ['feedService', '$scope', '$http', '$mdMedia', '$q', '$log',
            FeedController
        ]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function FeedController(feedService, $scope, $http, $mdMedia, $q, $log) {
        var self = this;

        self.feeds = [];
        
        var SITES = {
            'http://chigesoku3.doorblog.jp/index.rdf' : {
                'name' : 'チゲ速',
                'image' : 'https://pbs.twimg.com/profile_images/572710837484142592/N7d6xXsu_normal.jpeg'
            },
            'http://jp.ign.com/street-fighter-5.xml' : {
                'name' : 'IGN',
                'image' : 'https://pbs.twimg.com/profile_images/737476279390199808/ftQe5bZL_400x400.jpg'
            },
            'http://shoryuken.com/feed/' : {
                'name' : 'Shoryuken',
                'image' : 'https://pbs.twimg.com/profile_images/2937778859/8323e69ec3de0ca8cd74a64d4013034b_400x400.png'
            }
        };

        var sortFunc =

        Object.keys(SITES).forEach(function (siteUrl) {
            var site = SITES[siteUrl];

            feedService.parseFeed(siteUrl).then(function (res) {
                var resFeeds = res.data.responseData.feed;
                var filteredResFeeds = [];

                for (var j = 0; j < resFeeds.entries.length; j++) {
                    var feed = resFeeds.entries[j];

                    // siteName
                    feed.site = site;
                    if (site.name == 'チゲ速') {
                        feed.contentSnippet = null;
                    }

                    if (site.name == 'Shoryuken') {
                        if (!feed.content.match(/(street\s?fighter|sf(5|V|Ⅴ))/i)) {
                            continue;
                        }
                    }

                    // image
                    if (feed.image) continue;
                    var images = feed.content.match(/<img(.|\s)*?>/gi);
                    if (images && images.length > 0) {
                        feed.image = images[0].match(/src=["|'](.*?)["|']/)[1];
                    }

                    // publishedDate
                    var momentDate = moment(new Date(feed.publishedDate));
                    feed.fromNow = momentDate.fromNow();
                    feed.unixtime = momentDate.unix();

                    filteredResFeeds.push(feed);
                }
                var limit = $mdMedia('gt-sm') ? 12 : 5;

                self.feeds = self.feeds.concat(filteredResFeeds).sort(function(a, b) {
                    return b.unixtime - a.unixtime;
                }).slice(0, limit);
            });
        });
    }
})();
