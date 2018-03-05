// Omniture controller javascript 01/25/2010
// In File Script
// Reporting Account Configa
var filterUrl = omniPaperUrl.substring(omniPaperUrl.indexOf("www.")+4, omniPaperUrl.length);
var filterVar="javascript:,"+filterUrl;

com.mtvi.reporting.Account={
name:"viay2m",
filters: filterVar,
trackExternalLinks: true,
trackInlineStats:true
};


// Initiate Dispatcher

var dispatcher=new com.mtvi.reporting.Dispatcher();

// Set Vars

var chValueOrigin = omniSectionName;
var sectionNameOrigin = omniSectionName; 
var paperNameOrigin = omniPaperName; 
var paperURL = omniPaperUrl; 
var paperID = omniPaperID; 
var storyName = ""; 
var secRef = "home"; 
var cpCode = "CP5"; 
var pageValue = ""; 
var h2 = ""; 
var urlPath = omniURLPath; 
var storyID = ""; 
var pageAction = "";
var pipe = omniPIPE;

// Clean up Article info
 
var completeURL = document.location.toString(); 
var storyNameOrigin = completeURL.substring(completeURL.lastIndexOf("/")+1, completeURL.lastIndexOf("-")); 
var storyName = storyNameOrigin.replace(/%252C/, ","); 
var storyID = completeURL.substring(completeURL.lastIndexOf("-")+1, completeURL.length); 

// Clean up paperName. PaperID and sectionName

function LTrimStr(s) {
    return(s.replace(/^\s*/,""));
}
function RTrimStr(s) {
    return(s.replace(/\s*$/,""));
}
function TrimStr(s) {
    return(RTrimStr(LTrimStr(s)));
}
 
var paperName = paperNameOrigin.replace(/_/gi, " "); 
var paperNameComp = paperName.toLowerCase(); 
var sectionName = sectionNameOrigin.toLowerCase(); 
var chValue = chValueOrigin.toLowerCase();
paperID.replace(/^\s*/,"");
paperID.replace(/\s*/,"");

// Verify URL 

paperURL = paperURL.substring(paperURL.indexOf("http://")+7, paperURL.length); 


if(completeURL.indexOf("mobile.") > -1 || completeURL.indexOf("/mobile") > -1) 
{ 
pageValue = "paper" + paperID + "/mobile/home"; 
chValue = "mobile"; 
h2 = "paper" + paperID + "/mobile/home"; 
pageAction = "frontpage"; 
storyID = ""; 
storyName = ""; 
} 
else if(completeURL.indexOf("guide.") > -1) 
{ 
pageValue = "paper" + paperID + "/guide/home"; 
chValue = "guide"; 
h2 = "paper" + paperID + "/guide/home"; 
pageAction = "frontpage"; 
storyID = ""; 
storyName = ""; 
} 

else if(urlPath == "" || urlPath == "/") 
{ 
pageValue = "paper" + paperID + "/home"; 
chValue = "home"; 
h2 = "paper" + paperID + "/home"; 
pageAction = "frontpage"; 
storyID = ""; 
storyName = ""; 
} 
else if(completeURL.indexOf("/2.") > -1 && (sectionName != paperNameComp) && completeURL.indexOf("1.") == -1) 
{ 
chValue = sectionName; 
pageValue = "paper" + paperID + "/" + sectionName + "/main"; 
h2 = "paper" + paperID + "/" + sectionName + "/main"; 
storyID = ""; 
storyName = ""; 
} 
else if(completeURL.indexOf("-") > -1 && completeURL.indexOf("1.") > -1 && (sectionName == paperNameComp)) 
{ 
chValue = "news"; 
pageValue = "paper" + paperID + "/news/article"; 
h2 = "paper" + paperID + "/news/article"; 
} 
else if(completeURL.indexOf("-") > -1 && completeURL.indexOf("1.") > -1 && (sectionName != paperNameComp)) 
{ 
pageValue = "paper" + paperID + "/" + chValue + "/article"; 
h2 = "paper" + paperID + "/" + chValue + "/article"; 
} 
else 
{ 
pageValue = "paper" + paperID + "/" + urlPath.substring(1,urlPath.length) + "/main"; 
h2 = "paper" + paperID + "/" + urlPath.substring(1, urlPath.length) + "/main"; 
urlPath = urlPath.substring(1, urlPath.length); 
if(urlPath.indexOf("/") > -1) 
chValue = urlPath.substring(0, urlPath.indexOf("/")); 
else 
chValue = urlPath.substring(0, urlPath.length); 
storyID = ""; 
storyName = ""; 
} 

// Prep dispatcher call 

dispatcher.setAttribute('pageName',pageValue); 
dispatcher.setAttribute('channel',chValue); 
dispatcher.setAttribute('hier2', h2); 
dispatcher.setAttribute('prop1',pageAction); 
dispatcher.setAttribute('prop2',sectionName); 
dispatcher.setAttribute('prop7',paperName); 
dispatcher.setAttribute('prop8',paperURL); 
dispatcher.setAttribute('prop9',storyID); 
dispatcher.setAttribute('prop10',paperID); 
dispatcher.setAttribute('prop11',secRef); 
dispatcher.setAttribute('prop14',cpCode);
dispatcher.setAttribute('server',pipe);
dispatcher.setAttribute('prop18',storyName); 

dispatcher.sendCall(); 
