App.controller("BrowseController",["$scope","searchSvc",function($scope,searchSvc){
	//initialisation function for controller
	$scope.init = function(){
		searchSvc.get_museum_list().then($scope.bindMuseumList);
		searchSvc.pageSize = 12;		
	};

	$scope.bindMuseumList = function(data,status){
		$scope.museum_names = data.data.data; //get the data attribute of the returned json		
	};


	$scope.$watch("selected_museum",function(newValue,oldValue){
		if(newValue !== undefined){
			searchSvc.offset = 0;
			searchSvc.get_collection_by_museum(newValue.Museum).then($scope.displayCollections);
		}
	});

	//display collections from the selected museum
	$scope.displayCollections = function(data,status){
		$scope.collections = data.data.data;
		$scope.num_of_pages = Math.floor($scope.collections.count/$scope.collections.size);                
		 if($scope.current_page === undefined)
                    $scope.current_page = 0;
		
	};

	$scope.$watch("current_page",function(newValue,oldValue){
		if(newValue !== undefined && newValue > -1){
			searchSvc.offset = $scope.current_page * searchSvc.pageSize;			
		}else{
			searchSvc.offset = 0;
		}
		if($scope.selected_museum.Museum !== undefined)
			searchSvc.get_collection_by_museum($scope.selected_museum.Museum).then($scope.displayCollections);
		
	});
	
	$scope.prevPage = function(){
        if($scope.current_page > 0)
            $scope.current_page--;
    }

    $scope.nextPage = function(){
        if($scope.current_page < $scope.num_of_pages)
            $scope.current_page++;
    }

    $scope.hidePager = function(){
        if($scope.current_page === undefined)
            return false;
        else
            return true;
    }
    
    $scope.collectionSelect = function(index){
        $scope.selected_museum = $scope.museum_names[index];
    }
    

}]);