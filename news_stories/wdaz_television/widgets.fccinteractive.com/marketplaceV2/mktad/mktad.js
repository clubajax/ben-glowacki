/*global window document alert aObj JSONscriptRequest $ */

// MAKING THESE GLOBAL SO WE CAN CALL THEM INSIDE OF TRIGGERSLIDER.JS
var MD, MDLen;
// global variable for marketplace impression tracking
var targetedMarketplaceTracking = [];

function targetedMarketplaceImpression(t)
{
	var marketID = jQuery('#slider li.sliderLI:eq(' + t + ')').attr('id');
	if(jQuery.inArray(marketID, targetedMarketplaceTracking) == -1)
	{
		targetedMarketplaceTracking.push(marketID);
		pageTracker._trackEvent('Targeted Marketplace', 'Impression', marketID);
	}
}        
        
function marketplaceDealv2_callback(JSONData) {
    /*---------------------------------------------------------------
     * this script is written to randomly display all of the 
     * marketplace deals (hide the vid tab if no video)
     * two arrays are marketplaceDeal & videoDeal
     * -------------------------------------------------------------*/
    
    if ( JSONData.marketplaceDeal.length > 0 )
    {
        MD = JSONData.marketplaceDeal;
        MDLen = MD.length;

        // load javascript and process
        var head = document.getElementsByTagName("head")[0];
		
		var jQTools = document.createElement("script");
			jQTools.setAttribute("charset", "UTF-8");
			jQTools.setAttribute("src", "../../../../../../../widgets.fccinteractive.com/marketplaceV2/mktad/js/jquery.tools.min.js");
			jQTools.setAttribute("type", "text/javascript");
			head.appendChild(jQTools);
			
        var ezSlider = document.createElement("script");
            ezSlider.setAttribute("charset", "UTF-8");
            ezSlider.setAttribute("src", "../../../../../../../widgets.fccinteractive.com/marketplaceV2/mktad/js/mktad.easySlider.min.js");
            ezSlider.setAttribute("type", "text/javascript");
			head.appendChild(ezSlider);
			
        var jqtabs = document.createElement("script");
            jqtabs.setAttribute("charset", "UTF-8");
            jqtabs.setAttribute("src", "../../../../../../../widgets.fccinteractive.com/marketplaceV2/mktad/js/jqtabs.js");
            jqtabs.setAttribute("type", "text/javascript");
            head.appendChild(jqtabs);
			
        var trigger = document.createElement("script");
            trigger.setAttribute("charset", "UTF-8");
            trigger.setAttribute("src", "../../../../../../../widgets.fccinteractive.com/marketplaceV2/mktad/js/mktad.triggerSlider.js");
            trigger.setAttribute("type", "text/javascript");
            head.appendChild(trigger);
		
        //jQuery('head').append('<link rel="stylesheet" href="http://widgets.fccinteractive.com/marketplaceV2/mktad/mktad.css" type="text/css" media="screen" />');

		// create slider div
		var slider = jQuery("<div/>").attr("id", "slider")
		.css({
			'margin-top':'6px',
			'overflow':'hidden' 
		});
		
		// create marketplacslide unordered list
		var slideOL = jQuery("<ol/>").css({
			'margin':'0',
			'padding':'0',
			'height':'240px',
			'list-style':'none'
		});

		/*---------------------------------------------------------------
		 * create a list that randomly will sort the deals
		 * -------------------------------------------------------------*/
		 
		var randomObj,campaignSlug,offerID,offerSlogan,videoURL,locationID,locationName,logoExists,trackingGUID,slideLI;
        var randomList = [];
        var randomCount = 0;
        
		while ( randomList.length < MDLen ) 
		{
			randomObj = Math.floor( Math.random() * MDLen ); // generates random number between 0 and MDLen
			// search randomList for randomObj
			if ( jQuery.inArray(randomObj, randomList) == -1 ) // if randomObj not found in randomList
			{
				randomList[randomCount] = randomObj; // add randomObj to randomList array
				randomCount++ ; // increment the count
				
				/*---------------------------------------------------------------
				 * now to build the widget with the marketplaceDeal and videoDeal
                 * data (the randomList will make sure we do not duplicate
                 * -------------------------------------------------------------*/
                        
				campaignSlug	= MD[randomObj].campaignSlug;
				offerID			= MD[randomObj].offerID;
				offerSlogan		= MD[randomObj].offerSlogan;
				videoURL		= MD[randomObj].videoURL;
				locationID		= MD[randomObj].locationID;
				locationName	= MD[randomObj].locationName;
				logoExists		= MD[randomObj].logoExists;
				trackingGUID	= MD[randomObj].trackingGUID;
				
				if( MD.length == 1 )
				{
					targetedMarketplaceTracking.push(trackingGUID);
					jQuery(document).ready(function() {
						pageTracker._trackEvent('Targeted Marketplace', 'Impression', trackingGUID);
					});
				}
				
				var slideLI = jQuery('<li/>').addClass('sliderLI').attr("id", trackingGUID)
				.css({
					 'width':'298px',
					 'height':'240px',
					 'overflow':'hidden',
					 'list-style':'none',
					 'margin':'0',
					 'padding':'0'
				});

				var navbar = jQuery('<div/>').css({ 'padding':'0 4px' });

				var navList = jQuery('<ul/>').addClass("tabs")
				.css({
					 'margin':'5px 0 0 0',
					 'padding':'0',
					 'list-style':'none',
					 'font-weight':'bold'
				});


				if ( videoURL != null)
				{
					var overlay = jQuery('<div/>').attr('id', 'overlay' + locationID).css({
						'background-image':	'url(http://widgets.fccinteractive.com/marketplaceV2/mktad/images/marketplaceOfferOverlay.png)',
						'background-repeat': 'no-repeat',
						padding: '40px',
						width: '640px',
						'height':'504px',
						display: 'none'
					})
					.html('<a class="player" href="' + videoURL + '">&nbsp;</a>');
					jQuery('.player').css({
						display:'block',
						height:'505px'
					});
					jQuery("body").append(overlay);
					
					var videoLI = jQuery('<li></li>')
					.css({
						float: 'left',
						margin:	'0',
						'margin-right': '1px',
						height:	'34px',
						padding: '6px 0 12px 1px'
					})
					.append(
						jQuery('<a onClick="pageTracker._trackEvent(\'Targeted Marketplace\', \'Video Click\', \''+ videoURL +'\');" rel="#overlay' + locationID +'" href="javascript:void(0);" style="margin:0;height:34px;color:#11480d;text-decoration:none;padding:6px 12px;border: 1px #c1ccad solid;border-bottom:6px #9ee01f solid;background-color:#d3e9a9;border-radius: 5px 5px 0 0;-moz-border-radius: 5px 5px 0 0;-webkit-border-top-left-radius: 5px;-webkit-border-top-right-radius: 5px;">Video</a>')
						.hover(
							function(){
								jQuery(this).css({
									'background-color': '#ffffff',
									color: '#5d5c5a'
								});
							},
							function(){
								jQuery(this).css({
									'background-color': '#d3e9a9',
									color: '#11480d'
								});
							}
						) 
					);
					navList.append(videoLI);
				}
				
				var sendLI = jQuery('<li></li>')
				.css({
					float: 'left',
					margin:	'0',
					'margin-right': '1px',
					height:	'34px',
					padding: '6px 0 12px 1px'
				})
				.append(
					jQuery('<a onClick="pageTracker._trackEvent(\'Targeted Marketplace\', \'Share Click\', \''+ trackingGUID +'\');" style="margin:0;height:34px;color:#11480d;text-decoration:none;padding:6px 12px;background-color:#d3e9a9;border: 1px #c1ccad solid;border-bottom:6px #9ee01f solid;border-radius: 5px 5px 0 0;-moz-border-radius: 5px 5px 0 0;-webkit-border-top-left-radius: 5px;-webkit-border-top-right-radius: 5px;">Send</a>')
						.attr( {title: "SMS Deals", href: "/event/sendSmsOffer/slug/" + campaignSlug + "/offerid/" + offerID + "/"})
						.hover(
							function(){
								jQuery(this).css({
									'background-color': '#ffffff',
									color: '#5d5c5a'
								});
							},
							function(){
								jQuery(this).css({
									'background-color': '#d3e9a9',
									color: '#11480d'
								});
							}
						)
				);
				navList.append(sendLI);
								
				var printLI = jQuery('<li></li>')
				.css({
					float: 'left',
					margin:	'0',
					'margin-right': '1px',
					height:	'34px',
					padding: '6px 0 12px 1px'
				})
				.append(
					jQuery('<a onClick="pageTracker._trackEvent(\'Targeted Marketplace\', \'Print Click\', \''+ trackingGUID +'\');" style="margin:0;height:34px;color:#11480d;text-decoration:none;padding:6px 12px;background-color:#d3e9a9;border: 1px #c1ccad solid;border-bottom:6px #9ee01f solid;border-radius: 5px 5px 0 0;-moz-border-radius: 5px 5px 0 0;-webkit-border-top-left-radius: 5px;-webkit-border-top-right-radius: 5px;">Print</a>')
						.attr( {title: "Print", href: "/event/coupon/slug/" + campaignSlug + "/offerid/" + offerID + "/"})
						.hover(
							function(){
								jQuery(this).css({
									'background-color': '#ffffff',
									color: '#5d5c5a'
								});
							},
							function(){
								jQuery(this).css({
									'background-color': '#d3e9a9',
									color: '#11480d'
								});
							}
						)
				);
				navList.append(printLI);
                                
				jQuery(navbar).append(navList);
				jQuery(slideLI).append(navbar);

				var offer = jQuery('<div/>')
				.attr("id", "offer" + offerID)
				.css({
					'clear':'both',
					'width':'230px',
					'height':'175px',
					'margin':'8px auto',
					'padding':'4px',
					'font-size':'13px',
					'background-color':'#fff',
					'overflow':'hidden'
				});
					
                var mktboxTB = jQuery('<table cellpadding="0" cellspacing="0"></table>')
				.css({
					'width':'230px',
					'margin':'0 auto',
					'border':'none',
					'color':'#000',
					'text-decoration':'none'
				});	
				
				if ( MD[randomObj].logoExists == 1 )
				{
					jQuery(mktboxTB).append(
						jQuery('<tr><td align="center" valign="middle" height="100"><a href="/marketplace/' + campaignSlug + '/" onclick="pageTracker._trackEvent(\'Targeted Marketplace\', \'Offer Click\', \''+ trackingGUID +'\');"><img src="http://media.fccinteractive.com/marketplace/' + locationID + '/100/100/" style="border:0;" alt="' + locationName + '" /></a><br /><span class="mkt_deal">' + locationName + '</span></td></tr>')
					 );
				}
				else
				{
					jQuery(mktboxTB).append(
						jQuery('<tr><td align="center" valign="middle" height="100"><div class="mkt_deal">' + locationName + '</div></td></tr>')
					);
				}
				
				jQuery(mktboxTB).append(
					jQuery('<tr><td align="center" valign="middle" class="mkt_deal"><a href="/marketplace/' + campaignSlug + '/" style="text-decoration: none; color: #000; font-weight: bold;" onclick="pageTracker._trackEvent(\'Targeted Marketplace\', \'Offer Click\', \''+ trackingGUID +'\');">' + offerSlogan + '</a></td></tr>')
				);
				
				jQuery(offer).append(mktboxTB);
				jQuery(slideLI).append(offer);

				jQuery(slideOL).append(slideLI);
		
			} // end of if ( jQuery.inArray() == -1 )
		} // end of while ( randomList.length < MDLen )
        
		jQuery(slider).append(slideOL);
			
		jQuery("#marketplaceDeal_widget").append(slider);
		
		var bottomLink = jQuery('<div/>').css({
			'margin':'0',
			'background':'url(http://widgets.fccinteractive.com/marketplaceV2/mktad/images/bottomLink.png) bottom no-repeat',
			'width':'300px',
			'height':'31px',
			'text-align':'center',
			'font-size':'10px'
		}).html('<div style="padding-top:1em"><a href="/event/marketplace_offers/" style="color:#5d5c5a;text-decoration:none;">view all offers</a> | <a href="/event/account:homepage/tab/Marketplace%20Deals/" style="color:#5d5c5a;text-decoration:none;">sign up for email offers</a> | <a href="/event/addbusiness/" style="color:#5d5c5a;text-decoration:none;">add your business</a></div>');
		jQuery("#marketplaceDeal_widget").append(bottomLink);
		
		jQuery("#marketplaceDeal_widget").css({
			 'display':'block',
			 'position':'relative',
			 'width':'300px',
			 'overflow':'hidden',
			 'background':'#fff url(http://widgets.fccinteractive.com/marketplaceV2/mktad/images/topHeader.png) top no-repeat',
			 'font-size':'12px',
			 'font-family':'Arial, Helvetica, sans-serif',
			 'line-height':'15px'
		});
		
		var flowplayer = document.createElement("script");
			flowplayer.setAttribute("charset", "UTF-8");
			flowplayer.setAttribute("src", "../../../../../../../widgets.fccinteractive.com/marketplaceV2/mktad/js/flowplayer-3.1.4.min.js");
			flowplayer.setAttribute("type", "text/javascript");
			head.appendChild(flowplayer);
				
		var overlayScript = document.createElement("script");
			overlayScript.setAttribute("charset", "UTF-8");
			overlayScript.setAttribute("src", "../../../../../../../widgets.fccinteractive.com/marketplaceV2/mktad/js/mktad.videoOverlay.min.js");
			overlayScript.setAttribute("type", "text/javascript");
			head.appendChild(overlayScript);
    }
}
