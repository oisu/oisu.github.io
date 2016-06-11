(function () {

    angular
        .module('nicos')
        .controller('NicoController', ['nicoService', '$scope', '$http', '$q', '$log', '$sce',
            NicoController
        ]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function NicoController(nicoService, $scope, $http, $q, $log, $sce) {
        var self = this;
        $scope.items = [];

        var nicoUrl = nicoService.getUrlAvoidingCORS(
            'http://api.search.nicovideo.jp/api/v2/video/contents/search',
            {
                q: 'sf5',
                targets: 'title',
                fields: 'contentId,title,description,tags,categoryTags,viewCounter,mylistCounter,commentCounter,startTime,thumbnailUrl',
                _sort: '-startTime',
                _offset: 0,
                _limit: 12,
                _context: 'sf5checker'
            }
        );
        $http.get(nicoUrl).success(function (data) {
            for (var i = 0; i < data.data.length; i++) {
                var item = data.data[i];
                var momentDate = moment(new Date(item.startTime));
                item.fromNow = momentDate.fromNow();
                item.description = $sce.trustAsHtml(item.description);
                item.thumbnailUrl += '.L';
                data.data[i] = item
            }
            $scope.items = $scope.items.concat(data.data);
        });
        
        $scope.trustSrcNicoNicoThumb = function (src) {
            return $sce.trustAsResourceUrl('http://ext.niconico.jp/thumb_watch/' + src + '?w=490&h=307');
        };

    }
})();
