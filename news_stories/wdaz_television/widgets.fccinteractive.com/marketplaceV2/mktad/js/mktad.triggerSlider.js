$(document).ready(function()
{
	if ( MDLen > 1 )
	{
	    $('#slider').easySlider({		
					auto: true,
					pause: 5000,
					continuous: true
		});
	}
	else
	{
		$('#slider').easySlider();
	}
	$("a[rel*='#overlay']").click( function() {
		clearTimeout(timeout); 
	});
});
