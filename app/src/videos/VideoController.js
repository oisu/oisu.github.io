(function () {

    angular
        .module('videos')
        .controller('VideoController', ['videoService', '$scope', '$http', '$q', '$log', '$sce',
            VideoController
        ]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function VideoController(videoService, $scope, $http, $q, $log, $sce) {
        var self = this;
        $scope.items = [];

        $http.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                key: 'AIzaSyCsxgoAVqm8av6tXnRanVIlP8wIueVNUUQ',
                type: 'video',
                maxResults: '3',
                order: 'date',
                part: 'id,snippet',
                q: 'sf5'
            }
        }).success(function (data) {
            for (var i = 0; i < data.items.length; i++) {
                var momentDate = moment(new Date(data.items[i].snippet.publishedAt));
                data.items[i].isYouTube = true;
                data.items[i].fromNow = momentDate.fromNow();
            }
            $scope.items = $scope.items.concat(data.items);

        }).error(function () {
            $log.info('Search error');
        }).finally(function () {

        });

        $scope.trustSrcYouTube = function (src) {
            return $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + src);
        };
    }
})();
