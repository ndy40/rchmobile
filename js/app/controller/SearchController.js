
//define home controller
App.controller("SearchController",function($scope,$location,searchSvc){
     //get search parameters to display      
        
    //method to send and retrieve search results
    $scope.search_item = function(){
            searchSvc.offset =  $scope.current_page * searchSvc.pageSize ;
            //set the keywords
            searchSvc.keywords = ($scope.keywords === undefined)? "":$scope.keywords ;
            //set the parameters for search
            searchSvc.parameters = $scope.parameters;
            searchSvc.search_item().then($scope.buildResult);       
    };
    
    $scope.tickNone = function(i){
        var parameter = $scope.parameters[i];
        for(j = 0; j < parameter.items.length; j++){
               $scope.parameters[i].items[j].checked = false;
               
        }
    };
    
    $scope.tickAll = function(i){
        var parameter = $scope.parameters[i];
        for(j = 0; j < parameter.items.length; j++){
               $scope.parameters[i].items[j].checked = true;
               
        }
    };    
    
    $scope.viewObject = function(index){
        $location.path("/viewobject/"+index);
    }
    
       
    
    $scope.buildResult = function(data,status){
         var tempResult = data.data.results;
        if(tempResult !== undefined){
                $scope.search_results = tempResult;
                $scope.num_of_pages = Math.floor($scope.search_results.count/searchSvc.pageSize);                
                $scope.hide_form = true;
                if($scope.current_page === undefined)
                    $scope.current_page = 0;
        }else{
            $scope.hide_form = false;
        }
    };
    
    $scope.init = function(){
        $scope.parameters = searchSvc.getParameters();
        $scope.hide_form = false;
        
    }
    
    $scope.$watch("current_page",function(newValue,oldValue){ 
        if(newValue !== undefined) {
            searchSvc.offset = newValue * searchSvc.pageSize;
            $scope.search_item();
        }
        
    }

    );

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


    
        
});


