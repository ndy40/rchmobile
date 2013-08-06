
//define home controller
App.controller("SearchController",["$scope","$location","searchSvc",function($scope,$location,searchSvc){
     //get search parameters to display              
        var filters = searchSvc.getParameters();
        $scope.hide_form = false;
        $scope.search = {"keywords":"","parameters":filters};


    //method to send and retrieve search results
    $scope.search_item = function(){
            searchSvc.offset =  $scope.current_page === undefined ? 0 : ($scope.current_page * searchSvc.pageSize) ;
            //set the keywords
            searchSvc.keywords = ($scope.search.keywords === undefined)? "":$scope.search.keywords ;
            //strip unchecked parameters before sending
            var searchCriteria = [];
            for(var i = 0; i < $scope.search.parameters.length; i++ ){
                var group = $scope.search.parameters[i].group;
                var items = [];
                var key = $scope.search.parameters[i].key;
                for(var j = 0; j < $scope.search.parameters[i].items.length; j++){
                    if($scope.search.parameters[i].items[j].checked){
                        items.push($scope.search.parameters[i].items[j]);
                    }
                }
                searchCriteria.push({"group":group,"items":items,"key":key});
            }
            searchSvc.parameters = searchCriteria;
            searchSvc.search_item().then($scope.buildResult);       
    };
    
    $scope.tickNone = function(i){
        var parameter = $scope.search.parameters[i];
        for(var j = 0; j < parameter.items.length; j++){
               $scope.search.parameters[i].items[j].checked = false;
               
        }
    };
    
    $scope.tickAll = function(i){
        var parameter = $scope.search.parameters[i];
        for(j = 0; j < parameter.items.length; j++){
               $scope.search.parameters[i].items[j].checked = true;
               
        }
    };    
    
    $scope.viewObject = function(index){
        $location.path("/viewobject/"+index);
    }
    
       
    
    $scope.buildResult = function(data,status){
         var tempResult = data.data.results;
        if(tempResult !== undefined){
                $scope.search_results = tempResult;
                $scope.num_of_pages = Math.floor($scope.search_results.count/$scope.search_results.size);                
                if(tempResult.data.length == 0){
                    $scope.no_items_found = true; 
                                                       
                }else{
                    $scope.hide_form = true;
                    $scope.no_items_found = false;
                    
                }
                
                if($scope.current_page === undefined)
                    $scope.current_page = 0;
                    
                
                 

        }else{
            $scope.hide_form = false;
        }
    };
    
       
    $scope.$watch("current_page",function(newValue,oldValue){         
        if(newValue !== undefined) {
            searchSvc.offset = newValue * searchSvc.pageSize;
            $scope.search_item();
        }
        
        
    });

    $scope.prevPage = function(){
        if($scope.current_page > 0)
            $scope.current_page -= 1;
    }

    $scope.nextPage = function(){
        if($scope.current_page < $scope.num_of_pages)
            $scope.current_page += 1;
    }

    $scope.hidePager = function(){
        if($scope.current_page === undefined)
            return false;
        else
            return true;
    }

       
        
}]);


