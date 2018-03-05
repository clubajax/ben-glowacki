
if(typeof TNCMS_Ad_tile!=='number')
{bAdManCurve=typeof aTNCMS_Day_Impressions!="undefined";if(bAdManCurve)
{if(typeof aTNCMS_Traffic_Estimate=="undefined")
{document.write('<script type="text/javascript" src="http://www.hngnews.com/content/tncms/ads/tncms-ad-curve.js"></script>');}}
TNCMS_Location=false;if(window.XMLHttpRequest)
{oReq=new XMLHttpRequest();}
else if(window.ActiveXObject)
{oReq=new ActiveXObject("MSXML2.XMLHTTP.3.0");}
if(oReq)
{oReq.onreadystatechange=function()
{if(oReq.readyState==4&&oReq.status==200)
{var oResponse=eval("("+oReq.responseText+")");if(oResponse['lat']!==''&&oResponse['long']!=='')
{TNCMS_Location={'lat':oResponse['lat'],'long':oResponse['long']};}}};try
{oReq.open("http://www.hngnews.com/sun_prairie_star/community/features/GET","http://www.hngnews.com/_services/v1/client_ip_info/",false);oReq.send();}
catch(e){}}
aTime=location.search.replace("?","").match(/(^|\&)admgr_debug_time=(\d\d)\/(\d\d)\/(\d\d\d\d)_(\d\d)-(\d\d)/);oCurrent=aTime?new Date(aTime[4],aTime[2]-1,aTime[3],aTime[5],aTime[6]):new Date();delete aTime;sBound=oCurrent.getHours()*4+Math.floor(oCurrent.getMinutes()/15);TNCMS_Ad_DayPart={day:oCurrent.getDay(),startBound:sBound,endBound:sBound+1};delete sBound;delete oCurrent;TNCMS_Ad_timestamp=new Date().getTime();TNCMS_Ad_tile=1;TNCMS_Used_Ad=[];TNCMS_Meta_Keywords=false;sURL=document.location.href;aMatch=sURL.match(/http:\/\/(.+townnews-staging.com)\/{1,1}/,"");TNCMS_Staging_Domain=aMatch?aMatch[1]:false;delete aMatch;docPath=sURL.replace(/\?.*/,'').replace(/#\w+/,'');sPath='';if(docPath.match(/^((http|ftp|https):\/)?\/?([^:\/\s]+)((\/[\w\-\.]+)*\/)([\w\-\.]+\.[^#?\s]+)(#[\w\-]+)?$/))
{sPath=RegExp.$4;}
else if(docPath.match(/^((http|ftp|https):\/)?\/?([^:\/\s]+)((\/[\w\-\.]+)*\/)?$/))
{sPath=RegExp.$4;}
TNCMS_Section=sPath=="/"?'frontpage':sPath.replace(/^\//g,'').replace(/\/$/g,'');delete sURL;delete docPath;delete sPath;TNCMS_AdMan_Scripts=false;}
if(typeof(tncms_ad_image)!='function')
{tncms_ad_image=function(ad)
{alt=ad.title?ad.title:'*';sHeight=ad.height?' height="'+ad.height+'"':'';sWidth=ad.width?' width="'+ad.width+'"':'';sOnClick='';if(ad.clickuri)
{sTarget=ad.target?ad.target:'_blank';sOnClick=' onclick="window.open(\''+ad.clickuri+'\',\''+sTarget+'\');" style="cursor: pointer;"';}
var sHTML='<img src="'+ad.asseturl+'" alt="'+alt+'" border="0"'+sHeight+sWidth+sOnClick+'/>';document.write(sHTML);};}
if(typeof(tncms_ad_html)!='function')
{tncms_ad_html=function(ad)
{document.write('<scr'+'ipt type="text/javascript" src="'+ad.asseturl+'"></scr'+'ipt>');};}
if(typeof(tncms_ad_flash)!='function')
{if(TNCMS_AdMan_Scripts===false)
{TNCMS_AdMan_Scripts=[];}
TNCMS_AdMan_Scripts[TNCMS_AdMan_Scripts.length]='http://www.hngnews.com/shared-content/art/tncms-ad-manager/swfobject/swfobject.js';tncms_ad_flash=function(ad)
{var sHTML="<div id='blox-ad-"+ad.adid+"'></div>\n";sTransparency=ad.transparent?'transparent':'opaque';sHTML+='<script language="javascript">';sHTML+="var oSWF = new SWFObject('"+ad.asseturl+"','blox-flash-ad-"+ad.adid+"',"+ad.width+","+ad.height+",'"+ad.version+"', '#000');\n";sHTML+="oSWF.addParam('wmode', '"+sTransparency+"');\n";if(ad.clickuri.length>0)
{for(var i=0;i<ad.clickuri.length;i++)
{sCount=i==0?'':i+1;sHTML+="oSWF.addVariable('clickTAG"+sCount+"', '"+ad.clickuri[i]+"');\n";}}
sHTML+="oSWF.write('blox-ad-"+ad.adid+"');\n";sHTML+="</script>\n";document.write(sHTML);};}
if(typeof(tncms_ad_video)!='function')
{if(TNCMS_AdMan_Scripts===false)
{TNCMS_AdMan_Scripts=[];}
TNCMS_AdMan_Scripts[TNCMS_AdMan_Scripts.length]='http://www.hngnews.com/shared-content/art/tncms-ad-manager/flowplayer/flashembed.min.js';tncms_ad_video=function(ad)
{var sHTML="<div id='blox-ad-"+ad.adid+"'></div>\n";if(typeof tncms_video_ad=='function')
{sHTML+="<script language='javascript'>\n";sHTML+="tncms_video_ad("+ad.adid+",'"+ad.asseturl+"',";sHTML+="'"+ad.clickuri+"', {width: "+ad.width+", height: "+ad.height+",";sHTML+=" rolltype: '"+ad.rolltype+"',";sHTML+=" autoplay: "+ad.autoplay+", ";sHTML+=" embed: "+ad.embed+", ";sHTML+=" volume: "+ad.volume+"});</script>\n";}
else
{if(ad.embed==0)
{sAutoPlay=ad.autoplay==1?'true':'false';sHTML+='<script language="javascript">\n';sHTML+='flashembed("blox-ad-'+ad.adid+'", {\n';sHTML+='src: "http://www.hngnews.com/shared-content/art/tncms-ad-manager/flowplayer/FlowPlayer.swf", ';sHTML+='width: '+ad.width+', height: '+ad.height+'},\n';sHTML+='{config: {\n';sHTML+='autoPlay: '+sAutoPlay+',';sHTML+='initialVolumePercentage: '+ad.volume+',';sHTML+='autoBuffering: false, loop: false, \nplayList: [';sHTML+='{url: "'+ad.asseturl+'", type: "flv", linkUrl: "'+ad.clickuri+'"}';sHTML+=']\n}}\n);';sHTML+='</script>';}
else
{sHTML+="<!-- "+ad.position+" was set to embed but the function tncms_video_ad was not defined. -->";}}
document.write(sHTML);};}
if(typeof(tncms_ad_dotconnect)!='function')
{tncms_ad_dotconnect=function(ad)
{var sAd=location.protocol+"//ad.doubleclick.net/N6443/adj/"+ad.dc_sitename+"/;";if(TNCMS_Ad_tile==1)
{sAd+="dcopt=ist;";}
sAd+="pos="+ad.position+";";if(ad.dc_campaign_id)
{sAd+="c="+ad.dc_campaign_id+";";if(ad.dc_allow_rem=="1")
{sAd+="r=1;";}}
else
{sAd+="r=1;";}
sAd+="tile="+TNCMS_Ad_tile+";sz="+ad.dc_size+";ord="+TNCMS_Ad_timestamp+";?";TNCMS_Ad_tile++;document.write('<script type="text/javascript" src="'+sAd+'"></script>');};}
TNCMS_Ad={init:function(oCfg)
{if(!oCfg.ads)
{this.oAds=[];return this;}
if(TNCMS_Meta_Keywords===false)
{var aTag=document.getElementsByTagName('meta');var oKeyword={};var aKeyword=[];for(var i=0;i<aTag.length;i++)
{if(aTag[i].name.toLowerCase()=='keywords')
{aTemp=aTag[i].content.split(',');for(var j=0;j<aTemp.length;j++)
{sTemp=aTemp[j].replace(/^\s+|\s+$/g,"");if(sTemp)
{oKeyword[' '+sTemp+' ']=1;}}}}
for(var s in oKeyword)
{aKeyword.push(s);}
TNCMS_Meta_Keywords=aKeyword.join(',').toLowerCase();}
this.oAds=oCfg.ads;this.sDomain=oCfg.domain;this.sPosition=oCfg.position;this.oPosSettings=oCfg.position_settings?oCfg.position_settings:{};this.bRelative=false;var oDate=new Date();if(bAdManCurve)
{iHour=oDate.getHours();this.nTrafficEstimate=typeof aTNCMS_Traffic_Estimate=="undefined"?0:aTNCMS_Traffic_Estimate[iHour];this.nTrafficRatio=typeof aTNCMS_Traffic_Ratio=="undefined"?0:aTNCMS_Traffic_Ratio[iHour];}
else
{this.nTodayTimestamp=Math.ceil(oDate.getTime()*.001);}
return this;},show:function(sSection,nWidth)
{this.sSection=sSection?sSection:TNCMS_Section;this.nWidth=nWidth?nWidth:false;if(TNCMS_AdMan_Scripts)
{for(i=0;i<TNCMS_AdMan_Scripts.length;i++)
{sScript=this.bRelative?TNCMS_AdMan_Scripts[i]:'http://'+this.sDomain+TNCMS_AdMan_Scripts[i];document.write('\n<script language="javascript" src="'+sScript+'"></script>\n');}
TNCMS_AdMan_Scripts=false;}
for(nAdId in this.oAds)
{if(TNCMS_Used_Ad[nAdId]==1)
{delete this.oAds[nAdId];continue;}
if(typeof(window['tncms_ad_'+this.oAds[nAdId].type])!='function')
{delete this.oAds[nAdId];continue;}
if(this.oAds[nAdId].type=='dotconnect'&&TNCMS_Ad_tile>16)
{delete this.oAds[nAdId];continue;}
if(this.oAds[nAdId].keywords&&this.oAds[nAdId].keywords.length>0)
{bKeep=0;for(var i=0;i<this.oAds[nAdId].keywords.length;i++)
{var oRegex=new RegExp(' '+this.oAds[nAdId].keywords[i].toLowerCase()+' ','');if(TNCMS_Meta_Keywords.match(oRegex))
{bKeep=1;break;}}
if(!bKeep)
{delete this.oAds[nAdId];continue;}}
var oToday=new Date();var oStartDate=new Date();var oEndDate=new Date();var aDateParts=this.oAds[nAdId].startdate.split('-');oStartDate.setFullYear(aDateParts[0],(aDateParts[1]-1),aDateParts[2]);aDateParts=this.oAds[nAdId].enddate.split('-');oEndDate.setFullYear(aDateParts[0],(aDateParts[1]-1),aDateParts[2]);if((oStartDate>oToday)||(oEndDate<oToday))
{delete this.oAds[nAdId];continue;}
if(this.nWidth&&this.oAds[nAdId].width&&this.oAds[nAdId].width>this.nWidth)
{delete this.oAds[nAdId];continue;}
if(bAdManCurve)
{if(typeof aTNCMS_Day_Impressions!="undefined"&&aTNCMS_Day_Impressions[nAdId]&&this.oAds[nAdId].dailyLimit&&this.oAds[nAdId].dailyLimit<=aTNCMS_Day_Impressions[nAdId])
{delete this.oAds[nAdId];continue;}
if(typeof aTNCMS_Total_Impressions!="undefined"&&aTNCMS_Total_Impressions[nAdId]&&this.oAds[nAdId].totalLimit&&this.oAds[nAdId].totalLimit<=aTNCMS_Total_Impressions[nAdId])
{delete this.oAds[nAdId];continue;}}
else
{if(typeof aTNCMS_Day_Limit!="undefined"&&(aTNCMS_Day_Limit[nAdId]||aTNCMS_Day_Limit[nAdId]==0)&&this.nTodayTimestamp>aTNCMS_Day_Limit[nAdId])
{delete this.oAds[nAdId];continue;}
if(typeof aTNCMS_Total_Limit!="undefined"&&(aTNCMS_Total_Limit[nAdId]||aTNCMS_Total_Limit[nAdId]==0)&&this.nTodayTimestamp>aTNCMS_Total_Limit[nAdId])
{delete this.oAds[nAdId];continue;}}
if(this.oAds[nAdId].daypart_enabled&&this.oAds[nAdId].daypart_enabled!='')
{if(!this.oAds[nAdId].daypart_schedule)
{delete this.oAds[nAdId];continue;}
var adSchedule=eval("("+this.oAds[nAdId].daypart_schedule+")");if(!adSchedule[TNCMS_Ad_DayPart.day])
{delete this.oAds[nAdId];continue;}
if(!adSchedule[TNCMS_Ad_DayPart.day].allday)
{if(!adSchedule[TNCMS_Ad_DayPart.day][TNCMS_Ad_DayPart.startBound]||!adSchedule[TNCMS_Ad_DayPart.day][TNCMS_Ad_DayPart.endBound])
{delete this.oAds[nAdId];continue;}}}
if(this.oAds[nAdId].frequency_limit)
{sValueName='tncms_ad_'+nAdId;sValue=this._readCookie(sValueName);if(sValue)
{aData=sValue.split('&');nAdCount=parseInt(aData[0],10);if(nAdCount>this.oAds[nAdId].frequency_limit)
{delete this.oAds[nAdId];continue;}}}
if(this.oAds[nAdId]['lat']&&this.oAds[nAdId]['long']&&this.oAds[nAdId].proximity&&TNCMS_Location)
{var sinDeltaLat=Math.sin(((TNCMS_Location['lat']*Math.PI/180)-this.oAds[nAdId]['lat'])/2);var sinDeltaLong=Math.sin(((TNCMS_Location['long']*Math.PI/180)-this.oAds[nAdId]['long'])/2);var a=Math.pow(sinDeltaLat,2)+Math.pow(sinDeltaLong,2)*Math.cos(this.oAds[nAdId]['lat'])*Math.cos(TNCMS_Location['lat']*Math.PI/180);if((7974*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)))>this.oAds[nAdId].proximity)
{delete this.oAds[nAdId];continue;}}}
oValidAds=this._getAdsBySection(this.sSection,this.oAds);this.oAds=[];oActiveAd=this._getAdUsingWeight(oValidAds);if(oActiveAd.asseturl==undefined&&oActiveAd.type=='dotconnect')
{oActiveAd.asseturl=location.protocol+'//'+this.sDomain+'/tncms/ads/[random_number]/'+this.sPosition+'/'+oActiveAd.uuid.substr(0,1)+'/'+oActiveAd.uuid.substr(1,2)+'/'+oActiveAd.uuid+'/'+'current.json';oActiveAd.file_modified='';}
if(!oActiveAd.asseturl)
{document.write("<!-- There are no ads available to this position at this time -->");return true;}
if(TNCMS_Staging_Domain)
{oActiveAd.asseturl=oActiveAd.asseturl.replace(this.sDomain,TNCMS_Staging_Domain);}
if(oActiveAd.type!='dotconnect')
{TNCMS_Used_Ad[oActiveAd.adid]=1;}
this._updateFreqCount(oActiveAd);tmpPath=Math.floor(Math.random()*100000000)+"/"+this.sSection;if(oActiveAd.clickuri)
{if(oActiveAd.type=='flash')
{var aUrls=oActiveAd.clickuri.split(",");for(var i=0;i<aUrls.length;i++)
{aUrls[i]=aUrls[i].replace(/^\s*/,"").replace(/\s*$/,"");aUrls[i]=aUrls[i].match(/^http(s)?:\/\//i)?aUrls[i]:'http://'+aUrls[i];aUrls[i]=oActiveAd.asseturl.replace("[random_number]",'c'+tmpPath)+"?r="+aUrls[i];}
oActiveAd.clickuri=aUrls;}
else
{clickuri=oActiveAd.clickuri.match(/^http(s)?:\/\//i)?oActiveAd.clickuri:'http://'+oActiveAd.clickuri;oActiveAd.clickuri=oActiveAd.asseturl.replace("[random_number]",'c'+tmpPath)+"?r="+clickuri;}}
oActiveAd.asseturl=oActiveAd.asseturl.replace("[random_number]",tmpPath)+"?_dc="+oActiveAd.file_modified;if(this.bRelative)
{oActiveAd.asseturl=oActiveAd.asseturl.replace(/http(s)?:\/\/.*?\//,"/");}
oActiveAd.section=this.sSection;oActiveAd.position=this.sPosition;switch(oActiveAd.type)
{case'html':var strippedUrl=oActiveAd.asseturl.replace(/\?_dc=[0-9]+/,'').replace(/\?dc=[0-9]+/,'').replace(/-revisions/,'');strippedUrl.match(/\/tncms\/ads\/\d+?\/.+?\/.\/..\/(...\/)?(.+?)\//);var sVarName=RegExp.$2;sVarName=sVarName.replace(/-/g,'');var sHTML="<scr"+"ipt language='javascript'>\n";sHTML+="var pos_"+sVarName+" = '"+this.sPosition+"';\n";sHTML+="var sec_"+sVarName+" = '"+this.sSection+"';\n";sHTML+="</scr"+"ipt>\n";document.write(sHTML);break;case'video':oActiveAd.rolltype=this.oPosSettings[this.sSection].video_rolltype;oActiveAd.autoplay=parseInt(this.oPosSettings[this.sSection].video_autoplay,10);oActiveAd.embed=parseInt(this.oPosSettings[this.sSection].video_embed,10);oActiveAd.volume=parseInt(this.oPosSettings[this.sSection].video_volume,10);break;case'dotconnect':case'expandable':case'flashexpandable':case'flashpagecurl':case'pagecurl':case'text':document.write('<scr'+'ipt type="text/javascript" src="'+oActiveAd.asseturl+'"></scr'+'ipt>');break;}
window['tncms_ad_'+oActiveAd.type](oActiveAd);return true;},setRelative:function()
{this.bRelative=true;},setWidth:function(nWidth)
{this.nWidth=nWidth;},_getAdsBySection:function(sSection,oAds)
{oValidAds=[];for(nAdId in oAds)
{var adSections=oAds[nAdId].sections;for(var i=0;i<adSections.length;i++)
{if(adSections[i]==sSection)
{oValidAds.push(oAds[nAdId]);}}}
if(oValidAds.length>0)
{this.sSection=sSection;return oValidAds;}
sMatch=sSection.match(/(\/[\w\-]+)$/g);if(sMatch)
{return this._getAdsBySection(sSection.replace(sMatch,''),oAds);}
return sSection=='ros'?oValidAds:this._getAdsBySection('ros',oAds);},_getAdUsingWeight:function(oAds)
{if(oAds.length==0)
{return{};}
var nIterator=0;var nLockedTotalPerc=0;var nLimitedPerc=0;var nUnlockedTotalPerc=0;var nUnlockedAds=0;var nNoAd=0;for(i=0;i<oAds.length;i++)
{oAds[i].weight=this._getAdWeightData(oAds[i]);if(oAds[i].weight.locked==1)
{nLockedTotalPerc+=parseFloat(oAds[i].weight.percent);oAds[i].minRange=nIterator;oAds[i].maxRange=nIterator+(10000*parseFloat(oAds[i].weight.percent));nIterator=oAds[i].maxRange;}
else if(oAds[i].weight.locked==2)
{nLimitedPerc+=parseFloat(oAds[i].weight.percent);}
else
{nUnlockedTotalPerc+=parseFloat(oAds[i].weight.percent);nUnlockedAds++;}}
if((nLimitedPerc+nUnlockedTotalPerc)>(100-nLockedTotalPerc))
{nMultiplier=(100-nLockedTotalPerc)/100;for(i=0;i<oAds.length;i++)
{if(oAds[i].weight.locked!=1)
{oAds[i].minRange=nIterator;oAds[i].maxRange=nIterator+(10000*parseFloat(oAds[i].weight.percent)*nMultiplier);nIterator=oAds[i].maxRange;}}}
else if((nLimitedPerc+nUnlockedTotalPerc)<=(100-nLockedTotalPerc))
{if(nUnlockedTotalPerc==0)
{nNoAd=100-nLockedTotalPerc-nLimitedPerc;for(i=0;i<oAds.length;i++)
{if(oAds[i].weight.locked!=1)
{oAds[i].minRange=nIterator;oAds[i].maxRange=nIterator+(10000*parseFloat(oAds[i].weight.percent));nIterator=oAds[i].maxRange;}}}
else
{nNewPercent=(100-nLockedTotalPerc-nLimitedPerc)/nUnlockedAds;for(i=0;i<oAds.length;i++)
{if(oAds[i].weight.locked!=1)
{nPercent=oAds[i].weight.locked<1?nNewPercent:oAds[i].weight.percent
oAds[i].minRange=nIterator;oAds[i].maxRange=nIterator+(10000*parseFloat(nPercent));nIterator=oAds[i].maxRange;}}}}
nIterator+=nNoAd;var randomWeight=Math.floor(Math.random()*nIterator);for(i=0;i<oAds.length;i++)
{if(oAds[i].minRange<=randomWeight&&oAds[i].maxRange>randomWeight)
{return oAds[i];}}
return{};},_getAdWeightData:function(oAd)
{for(var j=0;j<oAd.weights.length;j++)
{if(oAd.weights[j].section==this.sSection)
{if(oAd.dailyLimit&&typeof aTNCMS_Day_Impressions!='undefined'&&aTNCMS_Day_Impressions[oAd.adid]&&this.nTrafficRatio&&this.nTrafficEstimate)
{nWantedImpressions=(oAd.dailyLimit-aTNCMS_Day_Impressions[oAd.adid])*this.nTrafficRatio;if(nWantedImpressions>=this.nTrafficEstimate)
{return oAd.weights[j];}
nWeight=nWantedImpressions/this.nTrafficEstimate;return{'section':this.sSection,'percent':100*nWeight,'locked':2};}
return oAd.weights[j];}}
return 0;},_updateFreqCount:function(oAd)
{if(!oAd.frequency_limit)
{return false;}
sValueName='tncms_ad_'+oAd.adid;if(!this._readCookie(sValueName))
{if(oAd.frequency_number&&oAd.frequency_type)
{var oDate=new Date();switch(oAd.frequency_type)
{case'minutes':oDate.setTime(oDate.getTime()+(oAd.frequency_number*60*1000));break;case'hours':oDate.setTime(oDate.getTime()+(oAd.frequency_number*60*60*1000));break;case'days':oDate.setTime(oDate.getTime()+(oAd.frequency_number*24*60*60*1000));break;}
var cookieExp="; expires="+oDate.toGMTString();document.cookie=sValueName+"=1&"+escape(oDate.toGMTString())+cookieExp+"; path=/";}}
else
{sCookieValue=this._readCookie(sValueName);aData=sCookieValue.split('&');nAdCount=parseInt(aData[0],10)+1;document.cookie=sValueName+"="+nAdCount+"&"+aData[1]+"; expires="+unescape(aData[1]);}},_readCookie:function(name)
{var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++)
{var c=ca[i];while(c.charAt(0)==' ')
{c=c.substring(1,c.length);}
if(c.indexOf(nameEQ)==0)
{return c.substring(nameEQ.length,c.length);}}
return null;}};