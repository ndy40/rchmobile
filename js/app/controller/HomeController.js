App.controller("HomeController",["$scope","searchSvc",function($scope,searchSvc){

	$scope.init = function(){
		searchSvc.get_banners().then(function(data,status){
			$scope.banners = data.data;
		});

		searchSvc.get_random_objects(2).then(function(data,status){
			$scope.objects = data.data;
		});

		searchSvc.get_random_videos(2,"video").then(function(data,status){
			$scope.media = data.data.data;
		});
	}
    
}]);
