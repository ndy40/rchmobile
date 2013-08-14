var searchService = angular
		.module("RchMobile.Search", [ "LocalStorageModule" ]);

searchService.service("searchSvc", [
		"$http",
		"localStorageService",
		function($http, localStorageService) {
			var search = {};
			var baseurl = "http://www.sierraleoneheritage.org/";
			var api_key = localStorageService.get("RchMobile.key");
			// perform configuration here. API_KEY and server URL
			if (api_key === null) {
				var baseUrl = this.baseurl + "register";
				$http.get(baseUrl).then(
						function(data, status) {
							// if successful response then act on new key
							if (data.data.status == true) {
								// store key to HTML5 local storage or use
								// Cookie if no HTML5 support
								localStorageService.set("RchMobile.key",
										data.data.key);
								api_key = data.data.key;

							}
						});
			}

			$http.defaults.headers.common["x-api-key"] = api_key;

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
				$http.get("data/search_parameters.json").success(
						function(data, status, headers, config) {
							for (i = 0; i < data.parameters.length; i++) {
								var name = data.parameters[i].group;
								var key = data.parameters[i].key;
								var items = [];
								var itemValues = data.parameters[i].params;
								for (j = 0; j < itemValues.length; j++) {
									items.push({
										"name" : itemValues[j].name,
										"value" : itemValues[j].value,
										"checked" : true
									});
								}
								params.push({
									"group" : name,
									"key" : key,
									items : items
								});
							}
						});
				return params;
			};
			//       
			search.search_item = function() {
				result = [];
				var url = baseurl + "api/search_service/search_item/";
				url += "offset/" + this.offset + "/size/" + this.pageSize
						+ "/format/json";
				var search_params = {
					"keywords" : this.keywords,
					"data" : this.parameters
				};

				return $http.post(url, search_params);
			};

			search.fetch_object = function(coid) {
				var url = baseurl + "api/search_service/fetch_item/coid/" + coid
						+ "/format/json";
				return $http.get(url);
			}

			search.fetch_related_objects = function(coid) {
				var url = baseurl
						+ "api/search_service/fetch_related_objects/coid/" + coid
						+ "/offset/" + this.offset + "/size/" + this.pageSize
						+ "/format/json";
				return $http.get(url, {
					cache : true
				});
			}

			search.fetch_associated_media = function(coid) {
				var url = baseurl
						+ "api/search_service/fetch_associated_media/coid/" + coid
						+ "/format/json";
				return $http.get(url);
			}

			search.fetch_media_object = function(amoid) {
				var url = baseurl + "api/search_service/fetch_media_object/amoid/"
						+ amoid + "/format/json";
				return $http.get(url);
			}

			search.get_collection_by_museum = function(museum_name) {
				var url = baseurl
						+ "api/search_service/get_collection_by_museum/museum/"
						+ museum_name + "/offset/" + this.offset + "/size/"
						+ this.pageSize + "/format/json";
				return $http.get(url, {
					cache : true
				});
			}

			search.get_museum_list = function() {
				var url = baseurl
						+ "api/search_service/get_museum_list/format/json";
				return $http.get(url, {
					cache : true
				});
			}

			search.get_banners = function() {
				var url =  baseurl+ "banner.json";
				return $http.get(url, {
					cache : true
				});
			}

			search.get_random_objects = function(size) {
				var url = baseurl + "api/search_service/get_random_objects/size/"
						+ size + "/format/json";
				return $http.get(url, {
					cache : true
				});
			}

			search.get_random_videos = function(size, type) {
				var url = baseurl + "api/search_service/get_random_videos/size/"
						+ size + "/mediatype/" + type + "/format/json";
				return $http.get(url, {
					cache : true
				});
			}

			return search;
		} ]);
