
var searchService = angular.module("RchMobile.Search", []);

searchService.service("searchSvc", ["$http", function($http) {
        var search = {};
        //set default path to webservice API
        //var baseUrl = "http://rch.eu01.aws.af.cm/index.php/api/";
        var baseUrl = "http://localhost/sites/v12.8/index.php/api/";

        var searchResult;
        search.offset = 0;
        search.pageSize = 10;
        var parameters = {};
        
        search.keywords = "";
        
        search.parameters = {};

        search.getSearchResult = function() {
            return searchResult;
        }

        search.getParameters = function() {
            var params = [];
            $http.get("data/search_parameters.json",{cache:true})
                    .success(function(data, status, headers, config) {
                for (i = 0; i < data.parameters.length; i++) {
                    var name = data.parameters[i].group;
                    var key = data.parameters[i].key;
                    var items = [];
                    var itemValues = data.parameters[i].params;
                    for (j = 0; j < itemValues.length; j++) {
                        items.push({"name": itemValues[j].name, "value": itemValues[j].value, "checked": true});
                    }
                    params.push({"group": name, "key": key, items: items});
                }
            });
            return params;
        };
//       
        search.search_item = function() {
            result = [];
            categories = this.parameters;
            //filter unchecked attributes from searchcategories
            for (i = 0; i < categories.length; i++) {
                //get all items in the collection and remove unchecked attributes
                for (j = 0; j < categories[i].items.length; j++) {
                    if (!categories[i].items[j].checked) {
                        categories[i].items.splice(j, 1);
                    }
                }
            }
            var url = baseUrl+"search_service/search_item/";
            url += "offset/"+this.offset+ "/size/" + this.pageSize + "/format/json";
            var search_params = {"keywords": this.keywords, "data": categories};

            return  $http.post(url, search_params);
        };

        search.fetch_object = function(coid){            
            var url = baseUrl+"search_service/fetch_item/coid/"+coid+"/format/json";
            return $http.get(url);
        }

        search.fetch_related_objects = function(coid){
            var url = baseUrl + "search_service/fetch_related_objects/coid/"+coid+"/offset/"+this.offset
            +"/size/"+this.pageSize+"/format/json";
            return $http.get(url,{cache:true});
        }

        search.fetch_associated_media = function(coid){
            var url = baseUrl + "search_service/fetch_associated_media/coid/"+coid+"/format/json";
            return $http.get(url,{cache:true});
        }

        search.fetch_media_object = function(amoid){
            var url = baseUrl + "search_service/fetch_media_object/amoid/"+amoid+"/format/json";
            return $http.get(url,{cache:true});
        }

        search.get_collection_by_museum = function(museum_name){
            var url = baseUrl + "search_service/get_collection_by_museum/museum/"+museum_name+"/offset/"+this.offset+"/size/"+this.pageSize+"/format/json";
            return $http.get(url,{cache:true});
        }

        search.get_museum_list = function(){
            var url = baseUrl + "search_service/get_museum_list/format/json";
            return $http.get(url,{cache:true});
        }

        search.get_banners = function(){
            var url = "http://rch.eu01.aws.af.cm/"+ "banner.json";
            return $http.get(url,{cache:true});
        }

        search.get_random_objects = function(size){
            var url = baseUrl+"search_service/get_random_objects/size/"+size+"/format/json";
            return $http.get(url,{cache:true});
        }

        search.get_random_videos = function(size,type){
            var url = baseUrl+"search_service/get_random_videos/size/"+size+"/mediatype/"+ type+"/format/json";
            return $http.get(url,{cache:true});
        }

        return search;
    }]);

