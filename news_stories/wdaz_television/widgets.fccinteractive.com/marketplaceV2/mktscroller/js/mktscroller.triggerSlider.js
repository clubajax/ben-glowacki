$(document).ready(function(){	
	$("#slider").easySlider({
		auto: false, 
		continuous: true,
		vertical: false,
		speed: 800,
		prevText: '<img src="http://widgets.fccinteractive.com/marketplace/mktscroller/images/btn_prev.png" title="previous" />',
		nextText: '<img src="http://widgets.fccinteractive.com/marketplace/mktscroller/images/btn_next.png" title="next" />',
		controlsBefore: '<div id="mktScroller_navigation">',
		controlsAfter:  '</div>',
		auto: true,
		pause: 5000
	});
});	