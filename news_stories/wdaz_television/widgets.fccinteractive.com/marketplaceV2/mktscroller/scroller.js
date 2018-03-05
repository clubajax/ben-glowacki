/*global window document alert aObj JSONscriptRequest $ */
function countChildElements(parent)
{
    return $(parent).children().size();
}

// global variable for marketplace impression tracking
var tracking = [];

function recentMarketplaceImpression(t)
{
	var offerID = $('#slider li:eq(' + t + ')').attr('id');
	if ( jQuery.inArray(offerID, tracking) == -1 )
	{
		tracking.push(offerID);
		pageTracker._trackEvent('Recent Marketplace', 'Impression', '' + offerID + '');
	}
}

function marketplaceScrollerV2_callback(JSONData) {
	if ( JSONData.marketplaceScroller.length > 0 )
	{
        var MD = JSONData.marketplaceScroller;
        var MDLen = MD.length;

        // load javascript and process
        var head = document.getElementsByTagName("head")[0];
		
		var jQTools = document.createElement("script");
            jQTools.setAttribute("charset", "UTF-8");
            jQTools.setAttribute("src", "../../../../../../../widgets.fccinteractive.com/marketplaceV2/mktscroller/js/jquery.tools.min.js");
            jQTools.setAttribute("type", "text/javascript");
			head.appendChild(jQTools);
		
        var ezSlider = document.createElement("script");
            ezSlider.setAttribute("charset", "UTF-8");
            ezSlider.setAttribute("src", "../../../../../../../widgets.fccinteractive.com/marketplaceV2/mktscroller/js/mktscroller.easySlider1.7.js");
            ezSlider.setAttribute("type", "text/javascript");
            head.appendChild(ezSlider);
			
		var trigger = document.createElement("script");
            trigger.setAttribute("charset", "UTF-8");
            trigger.setAttribute("src", "../../../../../../../widgets.fccinteractive.com/marketplaceV2/mktscroller/js/mktscroller.triggerSlider.js");
            trigger.setAttribute("type", "text/javascript");
            head.appendChild(trigger);
			
        // insert stylesheet into the head
        $('head').append('<link rel="stylesheet" href="http://widgets.fccinteractive.com/marketplaceV2/mktscroller/scroller.css" type="text/css" media="screen" />');
		
		// set domain
		if ( typeof(newspaperDomain) != 'undefined' ) 
        {
			CreatorDomain = newspaperDomain;
        }
		if ( CreatorDomain != '' )
        {
			domain = "http://www." + CreatorDomain;
		}
		else
        {
			domain ="";
		}

		// marketplace offer header
		var curDate = new Date();
		var monthname=["January","February","March","April","May","June","July","August","September","October","November","December"];

		var offerMM = monthname[curDate.getMonth()];
		var offerDD = curDate.getDate();
		var offerYY = curDate.getFullYear();
		
		var mktScroller_header = $('<div></div>').attr("id","header");
		var header_text = $('<div></div>').addClass("headertext").text('New offers for ' + offerMM + ' ' + offerDD + ', ' + offerYY);
		$(mktScroller_header).append(header_text);
		$("#mktScroller_widget").append(mktScroller_header);
		
		var mktScroller_content = $("<div></div>").attr("id","offers");
		var mktScroller_slider = $("<div></div>").attr("id","slider");
		
			// create slider unordered list
			var slideUL = $("<ul></ul>");
				
			/*---------------------------------------------------------------
             * create a list that randomly will sort the deals
             *-------------------------------------------------------------*/
				
			var randomObj,campaignSlug,offerID,offerSlogan,startDate,videoURL,locationID,locationName,logoExists,trackingGUID;
			var randomList = [];
			var randomCount = 0;
				
			if(MDLen > 10){
				limitAmt = 10;
			}
			else{
				limitAmt = MDLen;
			}
			var slideLI;			
            while ( randomList.length < MDLen ) 
            {
                randomObj = Math.floor( Math.random() * MDLen ); 
				if ( jQuery.inArray(randomObj, randomList) == -1 )
                {
					randomList[randomCount] = randomObj;
                    randomCount++;
					campaignSlug 	= MD[randomObj].campaignSlug;
					offerID 		= MD[randomObj].offerID;
					offerSlogan 	= MD[randomObj].offerSlogan;
                    startDate 		= MD[randomObj].startDate;
					videoURL 		= MD[randomObj].videoURL;
                    locationID 		= MD[randomObj].locationID;
					locationName	= MD[randomObj].locationName;
					logoExists		= MD[randomObj].logoExists;
					trackingGUID	= MD[randomObj].trackingGUID;

					if( MD.length == 1 ){
						tracking.push(trackingGUID);
						pageTracker._trackEvent('Recent Marketplace', 'Impression', '' + trackingGUID + '');
					}

					slideLI = $("<li></li>").attr("id", trackingGUID);
						var mktScroller_row = $('<div></div>').addClass("row");
						
						// buttons
						var row_buttons = $('<div></div>').addClass("buttons");
						
						if ( videoURL != null)
						{
							var overlay = jQuery('<div></div>').attr('id', 'overlay' + locationID).css({
								'background-image':	'url(http://widgets.fccinteractive.com/marketplace/mktlist/images/marketplaceOfferOverlay.png)',
								'background-repeat': 'no-repeat',
								padding: '40px',
								width: '640px',
								display: 'none'
							})
							.html('<a class="player" href="' + videoURL + '">&nbsp;</a>');
							jQuery('.player').css({
								display:'block',
								height:'505px'
							});
							jQuery("body").append(overlay);
							jQuery(row_buttons).append(
								jQuery('<a onClick="pageTracker._trackEvent(\'Recent Marketplace\', \'Video Click\', \''+ videoURL +'\');" rel="#overlay' + locationID +'" href="javascript:void(0);" style="display:block;"><img src="http://widgets.fccinteractive.com/marketplace/mktscroller/images/video.png" style="border:none; padding: 2px;"/></a>')
							);
						}
													
						$(row_buttons).append(
							$('<div class="button"><a onClick="pageTracker._trackEvent(\'Recent Marketplace\', \'Print Click\', \''+ trackingGUID +'\');" href="'+ domain +'/event/coupon/slug/'+ campaignSlug +'/offerid/'+ offerID +'/" title="Print Offer"><img src=\"http://widgets.fccinteractive.com/marketplace/mktscroller/images/print.png\" border=\"0\" /></a></div>')
						);
						$(row_buttons).append(
							$('<div class="button"><a onClick="pageTracker._trackEvent(\'Recent Marketplace\', \'Share Click\', \''+ trackingGUID +'\');" href="'+ domain +'/event/sendSmsOffer/slug/'+ campaignSlug +'/offerid/'+ offerID +'/" title="Send Offer to Mobile Phone"><img src=\"http://widgets.fccinteractive.com/marketplace/mktscroller/images/mobile.png\" border=\"0\" /></a></div>')
						);
							
						$(mktScroller_row).append(row_buttons);
	
	
						//offer and logo
						var row_tagline = $('<div></div>').addClass("tagline");
	
						if ( MD[randomObj].logoExists == 1 )
						{
							$(row_tagline).append(
								$('<div class="logo"><a onclick="pageTracker._trackEvent(\'Recent Marketplace\', \'Offer Click\', \''+ trackingGUID +'\');" href="'+ domain +'/marketplace/'+ campaignSlug +'/"><img src="http://media.fccinteractive.com/marketplace/' + locationID + '/100/100/" /></a><br /><span>' + locationName + '</span></div>')
							);
						}
						else
						{
							$(row_tagline).append(
								$('<div class="logo"><a onclick="pageTracker._trackEvent(\'Recent Marketplace\', \'Offer Click\', \''+ trackingGUID +'\');" href="'+ domain +'/marketplace/'+ campaignSlug +'/">' + locationName + '</a></div>')
							);
						}
							
						$(row_tagline).append(
							$('<div class="offer"><a onclick="pageTracker._trackEvent(\'Recent Marketplace\', \'Offer Click\', \''+ trackingGUID +'\');" href="'+ domain +'/marketplace/'+ campaignSlug +'/">' + offerSlogan + '</a></div>')
						);
						
						$(mktScroller_row).append(row_tagline);
							
					$(slideLI).append(mktScroller_row);	
				}
				
				$(slideUL).append(slideLI);
			}				
					  
			$(mktScroller_slider).append(slideUL);
			
		$(mktScroller_content).append(mktScroller_slider);
		
		$("#mktScroller_widget").append(mktScroller_content);
		
		var mktScroller_footer = $('<div></div>').attr("id","scrollerFooter").html("<span><a href=\""+ domain +"/event/account:homepage/tab/Marketplace%20Deals/\">sign up for email offers</a></span>");
		$("#mktScroller_widget").append(mktScroller_footer);

		var mktScroller_footerbuttons = $('<div></div>').attr("id","footer_buttons");
		
		var footerbuttons_viewoffers = $('<div></div>').attr("id","viewoffersHolder").html("<a id=\"viewoffers\" href=\""+ domain +"/event/marketplace_offers/\"><span>view all offers</span></a>");
		var footerbuttons_addbusiness = $('<div></div>').attr("id","addbusinessHolder").html("<a id=\"addbusiness\" href=\""+ domain +"/event/addbusiness\"><span>add your business</span></a>");
	
		$(mktScroller_footerbuttons).append(footerbuttons_viewoffers);
		$(mktScroller_footerbuttons).append(footerbuttons_addbusiness);
		$("#mktScroller_widget").append(mktScroller_footerbuttons);
		
		
		var flowplayerScript = document.createElement("script");
            flowplayerScript.setAttribute("charset", "UTF-8");
            flowplayerScript.setAttribute("src", "../../../../../../../widgets.fccinteractive.com/marketplaceV2/mktscroller/js/flowplayer-3.1.4.min.js");
            flowplayerScript.setAttribute("type", "text/javascript");
            head.appendChild(flowplayerScript);
			
		var overlayScript = document.createElement("script");
            overlayScript.setAttribute("charset", "UTF-8");
            overlayScript.setAttribute("src", "../../../../../../../widgets.fccinteractive.com/marketplaceV2/mktscroller/js/mktscroller.videoOverlay.js");
            overlayScript.setAttribute("type", "text/javascript");
            head.appendChild(overlayScript);
    }
}

