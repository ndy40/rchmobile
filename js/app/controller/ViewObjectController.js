App.controller("ViewObjectController",["$scope","$routeParams","searchSvc",function($scope,$routeParams,searchSvc){
	
	$scope.fetch_object = function(){
			var object_id = $routeParams.coid;
			searchSvc.fetch_object(object_id).then($scope.displayObject);
	}

	$scope.displayObject = function(data,status){
		if(data.data.status === "success"){
			$scope.object_info = data.data.data;
			if($scope.object_info.Media.length  === 0){
				$scope.hide_carousel = true;
			}
		}
	}

	$scope.init = function(){
		$scope.active_tab = "object";
		$scope.fetch_object();
	}

	$scope.$watch("active_tab",function(newValue,oldvalue){
		switch(newValue){
			case "relatedobjects":
				//fetch related object and load to view..with pagination
				var coid = $scope.object_info.COId;
				if($scope.object_info.related_objects === undefined){
					searchSvc.fetch_related_objects(coid).then($scope.loadRelatedObjects);
				}
			break;
			case "media":
				//fetch media if available
				var coid = $scope.object_info.COId;
				if($scope.object_info.associated_media === undefined){
					searchSvc.fetch_associated_media(coid).then($scope.loadAssocMedia);
				}
			break;


		}
	});

	$scope.loadRelatedObjects = function(data,status){
		$scope.object_info.related_objects = data.data.data;
	}

	$scope.loadAssocMedia = function(data,status){
		$scope.object_info.associated_media = data.data.data;
	}
	
	
}]);