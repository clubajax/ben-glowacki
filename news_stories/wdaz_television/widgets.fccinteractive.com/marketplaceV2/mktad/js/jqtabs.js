$(document).ready(function() {

    // When a link is clicked   
    $("a.tab").click(function () {

	// need to know if this is offer or video, so grab from 'title' attribute 
	var tab_ID = $(this).attr("title");
        var tab_off_ID;
		
	// title will either start with "offer" or "video", find out which
        if ( tab_ID.indexOf("offer") != -1 ) // offer found
	{
		tab_off_ID = tab_ID.replace( /offer/, "video" );
	}
	else // video found
	{
		tab_off_ID = tab_ID.replace( /video/, "offer" );			
	}
	
	// switch the adjacent tab off if it exists, we have to loop through all
        var tabLinks = $("a.tab");
        for ( var i = 0; i < tabLinks.length; i++ )
        {
            var tabLink = tabLinks[i];
            if ( $(tabLink).attr("title") == tab_off_ID )
            {
                $(tabLink).removeClass("active");
            }
        }
        
        // switch this tab on   
        $(this).addClass("active");

        // slide all elements with the class 'content' up (based on id)   
        $("#" + tab_off_ID).hide();

        // Now figure out what the 'title' attribute value is and find the element with that id.  Then slide that down.   
        var content_show = $(this).attr("title");
        $("#"+content_show).fadeIn("slow");

    });

    /*-----------------------------------------------------------------------
     This function is used for the easySlider Navigation to hide video
     contentent and show offer content
    ---------------------------------------------------------------------*/
    $("a.closeVideoTab").click(
        function (){
            // need to loop through all of the a.tab and make active the offer tabs 
            // and remove the active from video tab if it exists
            var tabLinks = $("a.tab");
            for ( var j = 0; j < tabLinks.length; j++ )
            {
                var tabLink = tabLinks[j];
                var tabLinkTitle = $(tabLink).attr("title");
                if ( tabLinkTitle.indexOf("video") != -1 ) // video tab found
                {
                    $("#" + tabLinkTitle).hide(); // hide the video content

                    var offerContent = tabLinkTitle.replace( /video/, "offer" );
                    $("#" + offerContent).fadeIn("fast"); // show the offer content
                }

            }
    });
});
