(function(){
  'use strict';

  angular.module('feeds')
         .service('feedService', ['$http', FeedService]);

  /**
   * Feeds DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function FeedService($http){
    // Promise-based API
    return {
      parseFeed : function(url){
        return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
      }
    };
  }

})();
