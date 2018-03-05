tncms_ad_text = function(ad) {
// console.log(ad);
            
    sTarget = ad.target ? ad.target : '_blank';
        
    if(ad.clickuri) {
        document.write('<div id="text-ad-wrapper"><span class="text-ad-title"><a rel="nofollow" href="' + ad.clickuri +'" target="' + sTarget + '">' + ad.title +'</a></span><br/><span class="text-ad-description">' + ad.text + '</span><span id="text-ad">Advertisement</span><div class="clear"></div></div>');
        }
    else {
        document.write('<div id="text-ad-wrapper"><span class="text-ad-title">' + ad.title + '</span><br/><span class="text-ad-description">' + ad.text + '</span><span id="text-ad">Advertisement</span><div class="clear"></div></div>');
    }
};