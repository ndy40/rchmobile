App.controller("HomeController",["$scope","searchSvc",function($scope,searchSvc){

	$scope.init = function(){
		searchSvc.get_banners().then(function(data,status){
			$scope.banners = data.data;
		});
	}
    
}]);
