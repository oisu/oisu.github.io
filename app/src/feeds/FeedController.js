(function () {

    angular
        .module('feeds')
        .controller('FeedController', ['feedService', '$scope', '$http', '$mdMedia', '$q', '$log', '$sce',
            FeedController
        ]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function FeedController(feedService, $scope, $http, $mdMedia, $q, $log, $sce) {
        var self = this;

        $scope.feeds = [];
        $scope.isDesktop = self.isDesktop = $mdMedia('gt-sm');
        var limit = self.isDesktop ? 20 : 5;

        $http.get('https://ouxmhlflzd.execute-api.ap-northeast-1.amazonaws.com/prod/sfv-feed', {})
            .success(function (data) {
                data.forEach(function(elm, index){
                    data[index].summary = $sce.trustAsHtml(elm.summary);
                });
                $scope.data = data;
                $scope.feeds = data.slice(0, limit);

        }).error(function () {
            $log.info('Search error');
        }).finally(function () {
        });

        $scope.loadMoreFeeds = function () {
            $scope.feeds = $scope.data.feeds;
        };
    }
})();
