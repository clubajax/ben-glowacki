var html = new Array;
var jsonator = new Array;
var totalFeedURLs = 0;
var a = 0;
var aa = 0;
var ee = 0;
var f = 0;
var h = 0;




//////////////////////////////////////////////////////////////////Window methods
$(document).ready(function(){
	 var links = document.getElementsByTagName('a');
	 for (var i=0;i<links.length;i++) {
		  if (links[i].className == 'new-window') {
				links[i].onclick = function() {
					 window.open(this.href);
					 return false;
				};
		  }
	 }
});


 //PROCESS PIPES FOR FRONT PAGE CONTENT WIDGETS 8/09 mcode
 //Global for count
 var count;
 //Global for target
 var target;
 var callback;
 function getFeed(feed,cnt,trgt) {
   target = trgt;
   count = cnt;
	var newScript = document.createElement('script');
		newScript.type = 'text/javascript';
		newScript.src = 'http://pipes.yahoo.com/pipes/pipe.run?_id=3428f40e1a615e7d562c080e2eb8cfda&_render=json&_callback='+trgt+'&feed='+feed;
	    document.getElementsByTagName("head")[0].appendChild(newScript);
	    callback = trgt;
	    window[trgt] = piper;

      }
     

 function getFeedPipes(feed,cnt,trgt) {
   target = trgt;
   count = cnt;
	var newScript = document.createElement('script');
		newScript.type = 'text/javascript';
		newScript.src = feed + '&_render=json&_callback='+trgt;
	    document.getElementsByTagName("head")[0].appendChild(newScript);
	    
	    window[trgt] = piper;

      }
      
/* for use with yql json output */    
  
  function piperyql(feed) {
    var div = callback;
	var tmp='';
	for (var i=0; i<count; i++) {
	   tmp+='<div class="tease_timestamp">'+getDate(feed.query.results.feed.entry[i].updated, feed.query.results.feed.entry[i].published)+'</div>';
	   
	   if(i==0){
	     tmp+='<h2 class="first_headline m5b"><a href="'+feed.query.results.feed.entry[i].link.href+'">'+feed.query.results.feed.entry[i].title+'</a></h2>';
	   }else{
	     tmp+='<h2 class="tease_headline"><a href="'+feed.query.results.feed.entry[i].link.href+'">'+feed.query.results.feed.entry[i].title+'</a></h2>';
	   }
	   
	}

	document.getElementById(div).innerHTML=tmp;
 }


/* for use with pipes json output */
 function piper(feed) {
    var div = feed.value.callback;
	var tmp='';
	for (var i=0; i<count; i++) {
	   tmp+='<div class="tease_timestamp">'+getDate(feed.value.items[i].pubDate, feed.value.items[i].published)+'</div>';
	   
	   if(i==0){
	     tmp+='<h2 class="first_headline m5b"><a href="'+feed.value.items[i].link+'">'+feed.value.items[i].title+'</a></h2>';
	   }else{
	     tmp+='<h2 class="tease_headline"><a href="'+feed.value.items[i].link+'">'+feed.value.items[i].title+'</a></h2>';
	   }
	   
	}

	document.getElementById(div).innerHTML=tmp;
 }
 

  
 
 //Format date
 function getDate(pubdate,pubd){
        
		var itemDate = (pubdate == undefined)? pubd:pubdate;
		
		function leadingZero(nr){
			if (nr < 10) nr = "0" + nr;
			return nr;
		}				
		
		itemPubDate = new Date(itemDate);
		now = new Date()

		var one_day=1000*60*60*24
		one_min = one_day/60000
		
		sec_between = Math.ceil((now.getTime()-itemPubDate.getTime())/(one_min));
		mins = (sec_between/60)
        hours = (mins/60);
        
        if(mins<60){
           thetime = 'Posted ' + Math.ceil(mins) + ' minute(s) ago';}
        else if(hours<24){
           thetime = 'Posted ' + Math.ceil(hours) + ' hour(s) ago';}
        else{
          
			t_date = itemPubDate.getDate();	
			t_mon_name = new Array ('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');		
			t_mon = t_mon_name[itemPubDate.getMonth()];
			t_year = itemPubDate.getFullYear();
			t_hour = itemPubDate.getHours();
			t_min = leadingZero(itemPubDate.getMinutes());
			ampm = " AM";
			if (t_hour == 0){ t_hour = 12;}
			if (t_hour > 11){ ampm = " PM";}
			if (t_hour > 12){ t_hour -= 12;}
			
			thetime = 'Posted ' + t_mon + ' ' + t_date + ', ' + t_year + ' @ ' + t_hour + ':' + t_min + ampm;
			
        }
        
		return thetime;
}

function randOrd(){
  return (Math.round(Math.random())-0.5); 
} 

//TOP ADS FUNCTION FOR WICKEDLOCAL 8/09 mcode 
function top_ads_wl(ads_id, div){
 
	ad_len = travAdvListData.advertisers.length;
	var ads_array = new Array()
	if (ads_id == ''){
	for(i=0;ad_len>i;i++){
	   ads_array[i] = '<div style="margin:0px 0px 4px 0px"><a href="http://shopping.wickedlocal.com/ROP/ads.aspx?advid='+ travAdvListData.advertisers[i].advertiser.id +'">' + travAdvListData.advertisers[i].advertiser.name + '</a></div>';
	}
	 ads_array.sort( randOrd );
	 for(i=0;65>i;i++){
	   cont = ads_array[i]
	   document.getElementById(div).innerHTML += cont;
	 }
	 
    }else{
     var cont = '';
	 for(i=0;ad_len>i;i++){
	   cont += '<div style="margin:0px 0px 4px 0px"><a href="http://' + ads_id + '.shopping.wickedlocal.com/ROP/ads.aspx?advid='+ travAdvListData.advertisers[i].advertiser.id +'">' + travAdvListData.advertisers[i].advertiser.name + '</a></div>';
	 }
	 document.getElementById(div).innerHTML = cont;
    }
} 


function SwapAd(adID) {
	adTarget = document.getElementById(adID);
	adTargetTitle = document.getElementById(adID + '_title');
	if (adTarget.style.display == 'none') {
		adTarget.style.display = 'block';
		document.getElementById(adID +'_state').innerHTML = '[-] ';
	}
	else {
		adTarget.style.display = 'none';
		document.getElementById(adID +'_state').innerHTML = '[+] ';
	}

}

//TOP ADS FUNCTION FOR THE OTHERS
function returnTopads(qty){
    
    //var setQty = (qty < node.length) ? qty:node.length
    
	var ads_result = node.length;
	var ads_display = '';
	if (ads_result >0){
		node.sort( randOrd );
		var ads_display = ads_result;
		for (var i=0; i<ads_display; i++){
			ad_num = node[i].ad_num.replace(/\-[0-9]+/, '');
			title = node[i].ad_title;
			text = node[i].ad_text;
			lenDesc = 85;
			noDesc = 10;
		
			if (text.length <= noDesc){text = '';}
			
			feed_topAds = '<div class="ghs_ad">';
			feed_topAds += '<div class="ad_title"><a href="#" id="ad_'+ad_num+'_title" onclick="SwapAd(\'ad_'+ad_num+'\'); this.blur(); return false;" ><span class="accent" id="ad_'+ad_num+'_state">[+] </span>' +title+ '</a></div>';
			feed_topAds += '<div class="ad_copy" id="ad_'+ad_num+'" style="display:none">'+text+'</div>';			
			feed_topAds += '</div>';
			document.write(feed_topAds);
		}
	}else{
		document.write('<div class="p5"><h3 style=text-align:center>There are no ads to display<'+'/h3><'+'/div>');
	}
}


function showhideAds(show){
 
	for(i=0; i<ad_id_array.length; i++){
		document.getElementById(ad_id_array[i]).style.display="none"
	}
	document.getElementById(show).style.display="block"  
}



//POLLS FEED 
var results;

function SubmitPoll(id,width,showtotal) {
    var option = $("#poll input:checked").attr('value');
    $.get($('#poll-url').attr('value') + '/vote?option=' + option, {});
    ToggleResults(true,id,width,showtotal);
    return false;
}

function ToggleResults(success, id, width,showtotal) {
    var content = '';
    
    if (success == true) {
        var ExCookie = document.cookie.indexOf(id);
        if(ExCookie == -1){
			var daily=24*60*60*1000
			var expdate= new Date()
			expdate.setTime(expdate.getTime()+daily);
			document.cookie= id + "=1; path=/; expires=" + expdate.toGMTString();
        }
        
        content += '<div class="success" style="padding-bottom:8px;">Thank you for your vote.<'+'/div>';
    }
    content += '<ul class="results-container">';
    $.getJSON($('#poll-url').attr('value') + '/results', function(data){
        var totalVotes = 0;
        var pollArrary = new Array();
        var arrayLen = data.options;
        $.each(data.rows, function(i, row) {
            pollArrary['option_'+i] = row.option;
            pollArrary['count_'+i] = row.count;
        });
        for(i=0;i<arrayLen;i++){
	        totalVotes = (totalVotes + pollArrary['count_' + i]);
        }
        for(i=0;i<arrayLen;i++){
          var percentage = (pollArrary['count_' + i] / totalVotes)*100;
          if(isNaN(percentage)){percentage = 0}
          $('.results-container').append('<li style="padding-bottom:8px">' + pollArrary['option_'+i] + ' <strong> ' + Math.floor(percentage) + '% <'+'/strong> ' + '<div class="poll_precentage_wrap"><div class="poll_precentage_color" style="width:'+ (percentage/100)*width +'px;  "><'+'/div><'+'/div><'+'/li>');
        }
        if(showtotal == 't'){
            $('.results-container').append('<li><div id="polltotal" style="padding-bottom:5px; text-align:center;">Total votes: '+totalVotes+' </div></li> ');
        }
    });
    
    
   
   
    content += '<'+'/ul><hr/>';

   if (!id){
      content += '<div style="text-align:center;"><a href="#" onclick="ToggleResults(); return false;">Vote</a></div>';
   }
    
    $('.poll-results').html(content);
    $('.poll-answers').toggle();
    $('.poll-results').toggle();
    return false;
}


function display_poll(id,width,showtotal){
  var ExCookie = document.cookie.indexOf(id);
  if(ExCookie != -1){
      ToggleResults(true,id,width,showtotal,showtotal)
  }
}

function display_results(id,width,showtotal){
      ToggleResults(false,id,width,showtotal)
}

//most commented 
   function return_html(url,title,count){
      if(isNaN(count)){
         return( '<h2 class="tease_headline"><a href="' + url + '">' + title + '<'+'/a><'+'/h2>');
      }else{
         return( '<h2 class="tease_headline"><a href="' + url + '">' + title + ' ('+ count +')<'+'/a><'+'/h2>');
      }
   }
   
   function return_content(stories, title){
      return('' +
    ' <h3 class="media_header">' + title + '<'+'/h3>' +
    '  <div class="p5 tease_block">' +
    '           ' + stories +
    '  <'+'/div>');
   }
   
   function urldecode(str) {
    str = unescape(str);
    return str;
   }
   
   
//Weather
function ProcessFeed(feed,type,args)
	{
		if (type == 'weather')
		{
			var highTemp = forecast_json.day1hiTmpF;
			var lowTemp = forecast_json.day1loTmpF;		
			var currentTemp = weather_json.TemperatureF;
			var today_icon = weather_json.today_icon;
			if (currentTemp != 'undefined')
			{
				if (lowTemp != ''){lowTemp = '<div class="lowTemp">Low: '+lowTemp+'&deg;</div>'}
				if (highTemp != ''){highTemp = '<div class="highTemp">High: '+highTemp+'&deg;</div>'}
				document.getElementById('weather_data_target').innerHTML = '<div class="currentTemp"><a href="/weather">'+currentTemp+'&deg;</a><img src="http://global.static.ghm.zope.net/resources/weather/weathercom-mapped/small/'+today_icon+'.png"/></div>'+highTemp+lowTemp;
			}
		}
	}

//story image onclick event
var maincnt;
//story image onclick event
function loadmain(source,caption) {

    $("#mainimg").html(" ");
    for(i=1;i<=maincnt;i++){
        $("#caption_" + i).hide();
    }
    
    $("#caption_" + caption).show();
    
    $('#mainimg').addClass('loading');
    var img = new Image();
    $(img).load(function () {
        $(this).hide();
        $('#mainimg').removeClass('loading').append(this);
        $(this).fadeIn();
    }).error(function () {
        // notify the user that the image could not be loaded
    }).attr('src', source);
    
 }
 
//Animation script for promo-strip
var tpromo = {
   start:function(){
     if(initi){
       st = 1;
       this.pause();
	   $("#promo_container").animate({left: '-895px'}, 800);
	   $("#start").hide();
	   $("#end").show(); 
	   tor=setTimeout ( "tpromo.rtn()", rtn );
	 }
   },
   rtn:function(){
     if(initi){
       st = 2;
       this.pause();
	   $("#promo_container").animate({left: '5px'}, 800);
	   $("#end").hide();
	   $("#start").show();
	   to=setTimeout ( "tpromo.start()", rtn );
	 }
   },
   pause:function(){
     clearTimeout(to);
     clearTimeout(tor);
     },
   rtnst:function(){
     this.pause();
     if(st==1){tor=setTimeout("tpromo.rtn()", rtn );}else{to=setTimeout ("tpromo.start()", rtn );}
     }
} 

