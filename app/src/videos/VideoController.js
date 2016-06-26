(function () {

    angular
        .module('videos')
        .controller('VideoController', ['videoService', '$scope', '$http', '$mdMedia', '$q', '$log', '$sce', '$cookies',
            VideoController
        ]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function VideoController(videoService, $scope, $http, $mdMedia, $q, $log, $sce, $cookies) {
        var self = this;
        var char = $cookies.get('char');
        var isDesktop = self.isDesktop = $mdMedia('gt-sm');

        $scope.chars = ('All Ryu ChunLi Nash Vega Cammy Birdie Ken ' +
        'Necalli Balrog Mika Rashid Karin Zangief Laura Dhalsim ' +
        'Fang Alex Guile Ibuki').split(' ').map(function (name) { return { name: name }; });

        self.selectedChar = char ? char : $scope.chars[0].name;

        $scope.trustSrcYouTube = function (src) {
            return $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + src);
        };
        $scope.loadMoreYouTube = function () {
            $scope.youtube = $scope.data.youtube;
        };
        $scope.loadMoreNiconico = function () {
            $scope.niconico = $scope.data.niconico;
        };
        $scope.setChar = function (char) {
            $cookies.put('char', char);
            self.selectedChar = char;
            $scope.loadVideo();
        };
        $scope.loadVideo = function () {
          var limit = isDesktop ? 20 : 5;
          var char = $cookies.get('char');
          var params = {};
          if (char) {
              params.char = char.toLowerCase();
          }
          $http.get('https://2dmio2i4g4.execute-api.ap-northeast-1.amazonaws.com/test/sfv-video', {params})
              .success(function (data) {
                  if (!data || data.length === 0) {
                      return;
                  }
                  $scope.data = data;
                  $scope.youtube = data.youtube.slice(0, limit);
                  $scope.niconico = data.niconico.slice(0, limit);

          }).error(function () {
              $log.info('Search error');
          }).finally(function () {
          });
        };
        $scope.loadVideo();
    }
})();
