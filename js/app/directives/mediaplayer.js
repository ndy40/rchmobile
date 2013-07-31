App.directive('mediaelementplayer',function(){
	return {
		restrict: 'A',
		link: function(scope,iElement,iAttrs){
			$(iElement).mediaelementplayer(scope.$eval(iAttrs.mediaelementplayer));
		}
	};
});





