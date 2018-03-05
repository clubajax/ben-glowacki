/*global window document CreatorDomain aObj newspaperDomain jQuery pageTracker */
// global variable for marketplace impression tracking
var listTracking = [];
function targetedMarketplaceListImpression(t)
{
	var trackingID;
	if(jQuery('#slider_combo').length){
		trackingID = jQuery('div#slider_combo ul li:eq(' + t + ')').attr('id');
	}
	else{
		trackingID = jQuery('div#non_slider_combo ul li:eq(' + t + ')').attr('id');
	}
	if ( jQuery.inArray(trackingID, listTracking) == -1 )
	{
		listTracking.push(trackingID);
		pageTracker._trackEvent('Targeted Marketplace List', 'Impression', trackingID );
	}
}
function marketplaceListV2_callback(JSONData) {
	var head = document.getElementsByTagName("head")[0];
	if ( JSONData.marketplaceList.length > 0 )
	{
        var MD = JSONData.marketplaceList;
        var MDLen = MD.length;

		var slider_height;
		
		if(MDLen == 1)
		{
			slider_height = "200px";
		}
		else if(MDLen == 2)
		{
			slider_height = "400px";
		}
		else
		{
			slider_height = "600px";
		}

        // load javascript and process
		var jQTools = document.createElement("script");
            jQTools.setAttribute("charset", "UTF-8");
            jQTools.setAttribute("src", "../../../../../../../widgets.fccinteractive.com/marketplaceV2/mktlist/js/jquery.tools.min.js");
            jQTools.setAttribute("type", "text/javascript");
			head.appendChild(jQTools);
		
        var ezSlider = document.createElement("script");
            ezSlider.setAttribute("charset", "UTF-8");
            ezSlider.setAttribute("src", "../../../../../../../widgets.fccinteractive.com/marketplaceV2/mktlist/js/mktlist.easySlider1.7.min.js");
            ezSlider.setAttribute("type", "text/javascript");
            head.appendChild(ezSlider);
					
		var listTrigger = document.createElement("script");
			listTrigger.setAttribute("charset", "UTF-8");
			listTrigger.setAttribute("src", "../../../../../../../widgets.fccinteractive.com/marketplaceV2/mktlist/js/mktlist.triggerSlider.min.js");
			listTrigger.setAttribute("type", "text/javascript");
			head.appendChild(listTrigger);
		// set domain
		var domain;
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
			domain = "";
		}
		// marketplace offer header
		var addbusiness = jQuery('<a/>').attr({
				href: domain + '/event/addbusiness/',
				title: 'add business'
			})
			.css({
				display: 'block',
				width: '296px',
				height: '44px',
				background: 'url(http://widgets.fccinteractive.com/marketplaceV2/mktlist/images/addbusiness.png) no-repeat 0 0'
			})
			.hover(
				function() {
					jQuery(this).css('background-position', '0 -44px');
				},
				function() {
					jQuery(this).css('background-position', '0 0');
				}
			);
		jQuery('#mktList_widget').append(addbusiness);
		jQuery("#mktList_widget").append('<div style="background: url(http://widgets.fccinteractive.com/marketplaceV2/mktlist/images/header_thin.png) bottom no-repeat;height:16px;"></div>');
		// create slider div
        var mktList_content,mktList_slider;
		if(MDLen > 3)
		{
			mktList_content = jQuery("<div/>").css({
				border: '1px solid #b1b1b1',
				padding:'30px 5px 0'
			});
			mktList_slider = jQuery("<div></div>").attr("id","slider_combo").css({overflow:'hidden',width:'284px',height:slider_height});
		}
		else
		{
			mktList_content = jQuery("<div/>").css({
				border: '1px solid #b1b1b1',
				padding:'30px 5px 0'
			});
			mktList_slider = jQuery("<div></div>").attr("id","non_slider_combo").css({overflow:'hidden',width:'284px',height:slider_height});
		}
			// create slider unordered list
			var slideUL = jQuery("<ul/>").css({margin:'0',padding:'0'});
				
				/* --------------------------------------------------------------
				 * create a list that randomly will sort the deals
				 * ------------------------------------------------------------*/
				var randomObj,campaignSlug,offerID,offerSlogan,videoURL,locationID,locationName,logoExists,trackingGUID,slideLI;
				var randomList = [];
				var randomCount = 0, limitAmt;
				if(MDLen > 10){
					limitAmt = 10;
				}
				else{
					limitAmt = MDLen;
				}
                while ( randomList.length < MDLen ) 
                {
                     randomObj = Math.floor( Math.random() * MDLen ); 
					 if ( jQuery.inArray(randomObj, randomList) == -1 )
                     { 
                         randomList[randomCount] = randomObj;
                         randomCount++ ;
                         campaignSlug	= MD[randomObj].campaignSlug;
						 offerID		= MD[randomObj].offerID;
						 offerSlogan	= MD[randomObj].offerSlogan;
						 videoURL		= MD[randomObj].videoURL;
						 locationID		= MD[randomObj].locationID;
						 locationName	= MD[randomObj].locationName;
						 logoExists		= MD[randomObj].logoExists;
						 trackingGUID	= MD[randomObj].trackingGUID;
						 
						var trackingcount = 3;
						if(randomList.length < 3){
							trackingcount = randomList.length;
						}
							
						if( randomCount <= trackingcount ){
							listTracking.push(trackingGUID);
							jQuery(function() {
								pageTracker._trackEvent('Targeted Marketplace List', 'Impression', '' + trackingGUID + '');
							});
						}
						
						slideLI = jQuery("<li></li>").attr("id",trackingGUID).css({
							'list-style':'none',
							'float':'left',
							height:'200px',
							width:'284px'
						});
						// rows
						var mktList_row = jQuery('<div></div>').css({
								padding:'10px 0',
								margin:'0',
								height:'175px',
								'text-align':'left',
								'border-bottom':'#D6D6D6 1px solid'
							});
						// buttons
						var row_buttons = jQuery('<div></div>').css({'float':'right',padding:'5px'});
						if ( videoURL != null)
						{
							var overlay = jQuery('<div></div>').attr('id', 'overlay' + locationID).css({
								'background-image':	'url(http://widgets.fccinteractive.com/marketplaceV2/mktlist/images/marketplaceOfferOverlay.png)',
								'background-repeat': 'no-repeat',
								padding: '40px',
								width: '640px',
								'height':'504px',
								display: 'none'
							})
							.html('<a class="player" href="' + videoURL + '"> </a>');
							jQuery('.player').css({
								display:'block',
								height:'505px'
							});
							jQuery("body").append(overlay);
							jQuery(row_buttons).append(
								jQuery('<a onClick="pageTracker._trackEvent(\'Targeted Marketplace List\', \'Video Click\', \''+ videoURL +'\');" rel="#overlay' + locationID +'" href="javascript:void(0);" style="display:block;"><img src="http://widgets.fccinteractive.com/marketplaceV2/mktlist/images/video.png" style="border:none;"/></a>')
							);
						}
						jQuery(row_buttons).append(
								jQuery('<a onClick="pageTracker._trackEvent(\'Targeted Marketplace List\', \'Print Click\', \''+ trackingGUID +'\');" href="'+ domain +'/event/coupon/slug/'+ campaignSlug +'/offerid/'+ offerID +'/" title="Print Offer" style="display:block;"><img src="http://widgets.fccinteractive.com/marketplaceV2/mktlist/images/print.png" style="border:none;"/></a>')
                        );
						jQuery(row_buttons).append(
								jQuery('<a onClick="pageTracker._trackEvent(\'Targeted Marketplace List\', \'Share Click\', \''+ trackingGUID +'\');" href="'+ domain +'/event/sendSmsOffer/slug/'+ campaignSlug +'/offerid/'+ offerID +'/" title="Send Offer to Mobile Phone" style="display:block;"><img src="http://widgets.fccinteractive.com/marketplaceV2/mktlist/images/mobile.png" style="border:none;"/></a>')
                        );
						jQuery(mktList_row).append(row_buttons);
						//offer and logo
						var row_tagline = jQuery('<div></div>').css('padding','5px');
						
						if ( MD[randomObj].logoExists == 1 )
						{
							jQuery(row_tagline).append(
									jQuery('<a onclick="pageTracker._trackEvent(\'Targeted Marketplace List\', \'Offer Click\', \''+ trackingGUID +'\');" href="'+ domain +'/marketplace/'+ campaignSlug +'/" style="display:block;"><img src="http://media.fccinteractive.com/marketplace/' + locationID + '/100/100/" style="border:none;"/></a><div>' + locationName + '</div>')
							);
						}
						else
						{
							jQuery(row_tagline).append(
									jQuery('<a onclick="pageTracker._trackEvent(\'Targeted Marketplace List\', \'Offer Click\', \''+ trackingGUID +'\');" href="'+ domain +'/marketplace/'+ campaignSlug +'/" style="display:block;">' + locationName + '</a>')
							);

						}
						var offerLink = jQuery('<a/>').attr({
							href: domain + '/marketplace/'+ campaignSlug +'/',
						}).css({
							display: 'block',
							padding: '15px 0',
							'text-decoration': 'none',
							'font-weight': 'bold',
							color: '#000'
						}).hover(
							function() {
								jQuery(this).css('text-decoration','underline');
							},
							function() {
								jQuery(this).css('text-decoration','none');
							}
						).click(function(){
							pageTracker._trackEvent('Targeted Marketplace List', 'Offer Click', trackingGUID);
						}).html(offerSlogan);
                        jQuery(row_tagline).append(offerLink);
						jQuery(mktList_row).append(row_tagline);
							
						jQuery(slideLI).append(mktList_row);	
							
					 }
					jQuery(slideUL).append(slideLI);
				}				
					  
			jQuery(mktList_slider).append(slideUL);
			
		jQuery(mktList_content).append(mktList_slider);
		
		jQuery("#mktList_widget").append(mktList_content);
		
		var mktList_footer = jQuery('<div/>').css({
				margin: '0',
				background: 'url(http://widgets.fccinteractive.com/marketplaceV2/mktlist/images/bottomLink.png) bottom no-repeat',
				width: '296px',
				height: '31px',
				'text-align': 'center',
				'font-size': '10px'
			}).html('<div style="padding-top:1em"><a href="' + domain + '/event/marketplace_offers" style="color:#5d5c5a;text-decoration:none;">view all offers</a> | <a href="' + domain + '/event/account:homepage/tab/Marketplace%20Deals/" style="color:#5d5c5a;text-decoration:none;">sign up for email offers</a></div>');
		jQuery("#mktList_widget").append(mktList_footer).css({
			'font-family': 'arial, helvetica, sans-serif',
			margin: '0',
			padding: '0',
			'font-size': '13px',
			width: '296px',
			'background-color': '#fff',
			'text-align': 'left'
		});
    }
	
	var flowplayerListScript = document.createElement("script");
	flowplayerListScript.setAttribute("charset", "UTF-8");
	flowplayerListScript.setAttribute("src", "../../../../../../../widgets.fccinteractive.com/marketplaceV2/mktlist/js/flowplayer-3.1.4.min.js");
	flowplayerListScript.setAttribute("type", "text/javascript");
	head.appendChild(flowplayerListScript);
	var videoListOverlay = document.createElement("script");
	videoListOverlay.setAttribute("charset", "UTF-8");
	videoListOverlay.setAttribute("src", "../../../../../../../widgets.fccinteractive.com/marketplaceV2/mktlist/js/mktlist.videoOverlay.min.js");
	videoListOverlay.setAttribute("type", "text/javascript");
	head.appendChild(videoListOverlay);
}
