//directive for adding variable poster url for HTML video tag
App.directive("videoPoster", function() {
	return {
		restrict : "A",
		link : function postLink(scope, iElement, iAttrs) {
			videojs.options.flash.swf = "js/lib/video-js.swf";
			iAttrs.$observe("videoPosterUrl", function(value) {
				iElement.attr("poster", value);
			});

		}
	}
});
// enable click to zoom on html elements. Used for images at the moment
App
		.directive(
				"fullsizable",
				function() {
					return {
						restrict : "A",
						link : function postLink(scope, iElement, iAttrs) {
							$(iElement)
									.bind(
											"click",
											function() {
													var image_wipe= $("#objGallery a").photoSwipe({
													enableMouseWHeel:false,
													enableKeyboard:false,
													});
												}
						);

					}
					}
				});
// HTML5 directive for media player
App.directive('fullscreenvideo', function() {
	return {
		restrict : 'A',
		link : function(scope, iElement, iAttrs) {
			$(iElement).load(function() {
				iElement.webkitRequestFullScreen();
			});
		}
	};
});

App.directive('closecollapsemenu', function() {
	return {
		restrict : "A",
		link : function(scope, iElement, iAttrs) {
			iElement.on("click", function() {
				$(".nav-collapse").collapse('hide');
			});
		}
	};
});

App.directive("preventDefault", function() {
	return {
		restrict : "A",
		link : function(scope, iElement, iAttrs) {
			$(iElement).click(function(event) {
				event.preventDefault();
			});
		}
	};
});
App.directive("affix", function() {
	return {
		restrict : "A",
		link : function(scope, iElement, iAttrs) {
			$(iElement).affix({
				offset : {
					top : 100
				}
			});
		}
	};
});
