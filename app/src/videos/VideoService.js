(function(){
  'use strict';

  angular.module('videos')
         .service('videoService', ['$http', '$httpParamSerializer', '$log', VideoService]);

  /**
   * Videos DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function VideoService($http, $httpParamSerializer, $log){
    // Promise-based API
    return;
  }

})();
