
var App = angular.module("RchMobile",["RchMobile.Search","ui.bootstrap","filters"]);

//configure route for the entire application
App.config(["$routeProvider",function($routeProvider){
        $routeProvider.when("/",{
            templateUrl: "views/home.html",
            controller: "HomeController"
        })
        .when("/search",{
            templateUrl: "views/searchform.html",
            conroller: "SearchController"
        })
       .when("/search_results",{
            templateUrl:"views/search_results.html",
            controller:"SearchController"
        })
       .when("/viewobject/:coid",{
        templateUrl: "views/view_object.html",
        controller: "ViewObjectController"
       })
       .when("/media_player/:amoid",{
            templateUrl: "views/play_media.html",
            controller: "ViewMediaController"
       })
       .when("/browse",{
          templateUrl: "views/browse.html",
          controller: "BrowseController"
       })
       .otherwise({redirectTo:"/"});

}]);

App.config(["$httpProvider",function($httpProvider){
  
       $httpProvider.defaults.useXDomain = true;
       delete $httpProvider.defaults.headers.common["X-Requested-With"];
       //configur spinner for all http ajax requests
       $httpProvider.responseInterceptors.push('ajaxHttpInterceptor');

       var spinnerFunction = function(data, headersGetter){
        $("#modal").show();
        return data;
       };

       $httpProvider.defaults.transformRequest.push(spinnerFunction);
}]);

App.factory("ajaxHttpInterceptor",function($q,$window){
  return function(promise){
      return promise.then(function(response){
        //do something on success
        $("#modal").hide();
        return response;
      },
      function(response){
        $("#modal").hide();
        return $q.reject(response);
      });
  }
});



