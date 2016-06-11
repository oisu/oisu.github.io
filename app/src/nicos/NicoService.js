(function(){
  'use strict';

  angular.module('nicos')
         .service('nicoService', ['$http', '$httpParamSerializer', '$log', NicoService]);

  /**
   * Videos DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function NicoService($http, $httpParamSerializer, $log){
    // Promise-based API
    return {
      getUrlAvoidingCORS : function(url, params){
        var qs = $httpParamSerializer(params);
        return 'https://jsonp.afeld.me/?url=' + encodeURIComponent(url + '?' + qs);
      }
    };
  }

})();
