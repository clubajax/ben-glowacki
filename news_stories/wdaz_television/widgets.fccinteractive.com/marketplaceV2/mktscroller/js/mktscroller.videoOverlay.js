$(function() {
	// setup overlay actions to buttons
	$("a[rel*='#overlay']").overlay({
		expose: {
			color: '#333',
			closeOnClick: false
		},
		closeOnClick: false,
		
		// setup exposing (optional operation);
		onLoad: function(content) {
			// find the player contained inside this overlay and load it
			this.getContent().find("a.player").flowplayer(0).load();
		},
		
		onClose: function(content) {
			$f().unload();
		}
	});		
	
	currentDomain = document.domain;
	currentDomain = currentDomain.replace( /.*?(?:\.|$)/, '' );
	
	var keys = { 
  		'fccinteractive.com' 		: '#@0d4ea16e1c47dc6ee1c', 
  		'jobshq.com' 				: '#@6f29105fca1dca10eb8',
		'homeshq.com'				: '#@b523fc66b1dc92dd651',
		'inforum.com'				: '#@50849440cb0a45a6497',
		'echopress.com'				: '#@40a91b7afc3414ea0b8',
		'bemidjipioneer.com'		: '#@d30929c2efb00763142',
		'mitchellrepublic.com'		: '#@43ab0b58c4266608964',
		'dl-online.com'				: '#@1798412945e295527f1',
		'thedickinsonpress.com' 	: '#@1e3b215153bf1cb0ced',
		'farmingtonindependent.com'	: '#@100780df27a944fd40d',
		'hastingsstargazette.com'	: '#@7e937915f4276532716',
		'hudsonstarobserver.com'	: '#@cfb5f284e179e002ef3',
		'morrissuntribune.com'		: '#@84739cd9bea3e776d4e',
		'newrichmond-news.com'		: '#@0c9b2d3ea238f00c90a',
		'parkrapidsenterprise.com'	: '#@0e6022b15f1b86a3148',
		'republican-eagle.com'		: '#@9fc2ed621aeeaac23a4',
		'perhameb.com'				: '#@0b7114a7330757ba853',
		'piercecountyherald.com'	: '#@1849f5cb46912fa3ed0',
		'riverfallsjournal.com'		: '#@ee6b1129409628b2fe2',
		'swcbulletin.com'			: '#@3f50c3777dbb0aa52a0',
		'wadenapj.com'				: '#@58e37293a5aa4e9a7a2',
		'wctrib.com'				: '#@fd10fb05ae9c48f884f',
		'woodburybulletin.com'		: '#@bac85fee53d06c7b997',
		'dglobe.com'				: '#@8a2c9e1d7728ee35309',
		'rosemounttownpages.com'	: '#@baff16645689a7c49ac',
		'westfargopioneer.com'		: '#@d389adc11514c8cf817',
		'wday.com'					: '#@cb1c2702b10ea3d5aaa',
		'wdaz.com'					: '#@b3772015e4bbfe4f071',
		'duluthnewstribune.com'		: '#@0d0603a69081bc325c7',
		'superiortelegram.com'		: '#@5dca1483344d269e31d',
		'pinejournal.com'			: '#@1ab2ac2ec1ea35b84c9',
		'twoharborsmn.com'			: '#@8e16ecc4de96726eb6e',
		'grandforksherald.com'		: '#@c745f9a91ffd8518714',
		'theosakisreview.com'		: '#@45ad5c26c9512ed588c',
		'blackduckamerican.com'		: '#@29e67746d8e23a65a64',
		'jamestownsun.com'			: '#@187662c24a5cdacad3d',
		'northlandoutdoors.com'		: '#@5867a79355be2018245',
		'agweek.com'				: '#@3c3d06e22073613d96e',
		'rivertowns.net'			: '#@48833279ef0814fe220'
	}; 
	
	


	flowplayer("a.player", "http://widgets.fccinteractive.com/marketplace/mktscroller/swf/flowplayer.commercial-3.1.4.swf", {
		plugins: {
			// default controls with the same background color as the page background
			controls:  {
				backgroundImage: 'url(http://widgets.fccinteractive.com/marketplace/mktscroller/images/background.jpg)',	
				backgroundRepeat: 'repeat',	
				height:24,
				play:true, 
       			volume:true, 
       			mute:true, 
       			time:true, 
       			stop:false, 
       			playlist:false, 
       			fullscreen:true, 
				scrubber:true,
				fontColor: '#ffffff',
       			timeColor: '#9AD42B', 
				timeBgColor: '#000000',
				progressColor: '#9AD42B',
				bufferColor: '#000000',
				buttonColor: '#9AD42B',
				buttonOverColor: '#999999'
			}
		},
		
		key: keys[currentDomain] || ''
	});	

	
});	
