//directive for adding variable poster url for HTML video tag
App.directive("videoPoster",function(){
	return{
		restrict: "A",
		link: function postLink(scope,iElement,iAttrs){
			iAttrs.$observe("videoPosterUrl",function(value){
				iElement.attr("poster",value);
			});
						
		}
	}
});
//enable click to zoom on html elements. Used for images at the moment
App.directive("fullsizable",function(){
	return{
		restrict: "A",
		link: function postLink(scope,iElement,iAttrs){
			$(iElement).bind("click",function(){
				var largSrc = iAttrs.fullsizableLarge;
				var mediumSrc = $(iElement).attr("src");
				$(iElement).attr("src",largSrc);
				$(iElement).fullScreen(true);
				$(iElement).bind("click",function(){
					$(iElement).attr("src",mediumSrc);
					$(iElement).fullScreen(false);
				});
			});
			
		}
			
		
	}
});
//HTML5 directive for media player
App.directive('fullscreenvideo',function(){
	return {
		restrict: 'A',
		link: function(scope,iElement,iAttrs){
			$(iElement).load(function(){
				iElement.webkitRequestFullScreen();
			});
		}
	};
});

App.directive('backhistory',function($window){
	return {
		restrict: "A",
		link: function(scope,iElement,iAttrs){
			iElement.on("click",function(){
				$window.history.back();
			})
		}
	}
});

App.directive('closecollapsemenu',function(){
	return {
		restrict: "A",
		link: function(scope,iElement,iAttrs){
			iElement.on("click",function(){
				$(".nav-collapse").collapse('hide');
			});
		}
	}
})





