var AAMB1 = ""; 
var AAMB2 = ""; 
var AAMB3 = ""; 
 
function renderAd(divName, aambTag) 
{ 
   var invObj = 'INV' + divName; 
 
   try { 
      var code = eval(aambTag); 
   } catch(aamErr){ } 

   if (typeof(code) != 'undefined') { 
      if(navigator.userAgent.indexOf('MSIE') > -1) { 
         document.getElementById(divName).innerHTML +=  
            '<div id="TMP' + divName + '" style="display:none">' +  
            escape('<body><div id="adDiv">' + code + '</div>') +  
            '</div><iframe name="' + invObj + '" width="0" height="0" frameborder="0" ' + 
            'onload="javascript:try { document.getElementById(\'' + divName + '\').' + 
            'insertAdjacentElement(\'beforeEnd\', window.frames[\'' + invObj + '\'].' + 
            'document.getElementById(\'adDiv\')) } catch(aamErr) { }"></iframe>'; 
 
         window.frames[invObj].document.location =  
            'javascript:unescape(parent.document.getElementById(\'TMP' +  
            divName + '\').innerHTML)'; 
      } else document.writeln('<div id="' + invObj + '" style="display:none">' +  
         code + '<script type="text/javascript" defer="true">' + 
         'document.getElementById(\'' + divName + '\').innerHTML = ' + 
         'document.getElementById(\'' + invObj + '\').innerHTML;' + 
         'document.getElementById(\'' + invObj +  
         '\').innerHTML = \'\';</scr' + 'ipt></div>'); 
 
   } 
} 

function loadAds(site, area, adparams) {
    // Cache-busting and pageid value 
    var aamRnd = Math.round(Math.random() * 100000000); 
      
    // Adserver URL 
    var adserver = "http://cmn.adbureau.net/bserver"; 
    
    // Ad tag targeting values which will be appended to each ad request section in the bserver ad call 
    allAdTags = "/AAMALL/acc_random=" + aamRnd + "/pageid=" + aamRnd + "/area=" + area + "/site=" + site; 
     
    for (var a = 0; a < adparams.length; a++) {
        allAdTags += "/AAMB" + (a+1) + adparams[a];
    }
     
    document.write('<scr' + 'ipt src="' + adserver + allAdTags + 
        '?" type="text/JavaScript" language="JavaScript">'); 
    document.write('</scr' + 'ipt>'); 
}
