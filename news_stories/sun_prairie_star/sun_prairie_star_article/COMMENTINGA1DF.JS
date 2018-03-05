jQuery(function(){
ninja=false;if(typeof(ninjaLog)!="undefined"){ninja=true;}
var recentlyPosted = false;
var sUsername = jQuery.cookie('tncms-screenname');
var sAuthToken = jQuery.cookie('tncms-authtoken');
var useSessionStorage = false;
if(typeof(sessionStorage)!="undefined"){useSessionStorage=true;}
if(useSessionStorage){
    if(!sessionStorage["previewMessages-"+assetUuid]){sessionStorage["previewMessages-"+assetUuid]="";}
}

handleSmileys(jQuery(".commentText p"));

if(jQuery(".tncms-restricted-notice")){
jQuery("#user-comment-area").show();
jQuery(".commentText").each(function(){
    if(jQuery(this).is(":visible")){
        if(jQuery(this).height() > 304){

            jQuery(this).css({"height":"304px","overflow":"hidden"});
            var remainingLines = parseInt((this.scrollHeight-304)/20);
            var remainingLinesText = "";
            if(remainingLines > 1){ 
                remainingLinesText = "about <span class=\"line-count\">"+ remainingLines + "</span> <span class=\"moreOrLess\">more</span> lines";
            } else { remainingLinesText = "<span class=\"line-count\">1</span> <span class=\"moreOrLess\">more</span> line"; }
            jQuery(this).parent().append("\
                <a href=\"#\" class=\"readMore\" onClick=\"expandPost(this); return false;\">\
                    read <span class=\"moreOrLess\">more</span> ("+remainingLinesText+")\
                </a>\
            ");
        }
    }
});
}

commentSubmittedMessage = "Your comment has been submitted and will post momentarily.";
multipleCommentSubmittedMessage = "Your comments have been submitted and will post momentarily.";
if(CommentingMode=="approval"){
    commentSubmittedMessage = "Your comment has been submitted for approval.";
    multipleCommentSubmittedMessage = "Your comments have been submitted for approval.";
}

if(CommentingMode!="approval"){
  if(sUsername){
    if(jQuery.cookie("commentsPosted-"+assetUuid)){
      var commentCountCookie = Number(jQuery.cookie("commentsPosted-"+assetUuid));
      var commentCountPage = Number(jQuery("ul.comment-list li").find("h4."+sUsername.replace(" ","_")).length);

      if(commentCountCookie>commentCountPage){
        var commentCountMessage = commentSubmittedMessage;
        var previewLimit = 1;
        if((commentCountCookie-commentCountPage)>1){ 
          commentCountMessage = multipleCommentSubmittedMessage;
          previewLimit = commentCountCookie-commentCountPage;
        }

        jQuery('#post-comment').prepend("\
<p id=\"postSuccess\">\
  <label>\
      <span>Note: </span> "+commentCountMessage+"\
    </label>\
</p>");

        if(useSessionStorage){
      if(ninja){ninjaLog.Update({text:"fetching preview messages from session storage"});}
          if(jQuery("#blox-comments").find(".comment").find(".comment-list").length < 1){  
            jQuery("#blox-comments").find(".comment").append("<ul class=\"comment-list\"></ul>");
          }
          var previewMessagesArray = sessionStorage["previewMessages-"+assetUuid].split("|&&|");
          for(i=0;i<previewLimit;i++){
            if(CommentOrder != "asc"){
              if(typeof(previewMessagesArray[i])!="undefined"){
              jQuery('#blox-comments').find(".comment-list").prepend(previewMessagesArray[i]);
              }
            }else{
              if(typeof(previewMessagesArray[i])!="undefined"){
            jQuery('#blox-comments').find(".comment-list").append(previewMessagesArray[i]);}
              }
          }
        }
      }else{ if(ninja){ninjaLog.Update({text:"fetching preview messages from session storage"});}
        if(useSessionStorage){sessionStorage["previewMessages-"+assetUuid]="";}
      }
    }
  }
}

var avatarImageElement = "";
if(AvatarMode!="minimal"){
    var sAvatar = jQuery.cookie('tncms-avatarurl');
    if(sAvatar==null){sAvatar = "http://www.hngnews.com/sun_prairie_star/community/features/components/core_commenting/resources/images/no_avatar.png";}
    avatarImageElement = "<img alt=\"\" src=\""+sAvatar+"\"/>";
}

var EmoticonControls="";
if(EmoticonMode!="disabled"){
EmoticonControls="\
<div id=\"emoticon-control\">\
    <a title=\"[smile]\" class=\"blox-emoticon-insert smile\" href=\"JavaScript:void(0);\">\
        <span class=\"blox_emoticons sprite-smile\"></span></a>\
    <a title=\"[wink]\" class=\"blox-emoticon-insert wink\" href=\"JavaScript:void(0);\">\
        <span class=\"blox_emoticons sprite-wink\"></span></a>\
    <a title=\"[sad]\" class=\"blox-emoticon-insert sad\" href=\"JavaScript:void(0);\">\
        <span class=\"blox_emoticons sprite-sad\"></span></a>\
    <a title=\"[beam]\" class=\"blox-emoticon-insert beam\" href=\"JavaScript:void(0);\">\
        <span class=\"blox_emoticons sprite-beam\"></span></a>\
    <a class=\"more-icons\" href=\"JavaScript:void(0);\">\
        <span class=\"button\">More...</span></a>\
    <div id=\"more-icons-area\" style=\"display:none;\">\
        <div class=\"icon-row top\">\
            <a title=\"[smile]\" class=\"blox-emoticon-insert smile\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-smile\"></span></a>\
            <a title=\"[wink]\" class=\"blox-emoticon-insert wink\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-wink\"></span></a>\
            <a title=\"[sad]\" class=\"blox-emoticon-insert sad\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-sad\"></span></a>\
            <a title=\"[beam]\" class=\"blox-emoticon-insert beam\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-beam\"></span></a>\
            <a class=\"button less-icons\" href=\"Javascript:void(0);\">Less...</a>\
        </div>\
        <div class=\"icon-row\">\
            <a title=\"[innocent]\" class=\"blox-emoticon-insert innocent\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-innocent\"></span></a>\
            <a title=\"[rolleyes]\" class=\"blox-emoticon-insert rolleyes\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-rolleyes\"></span></a>\
            <a title=\"[sleeping]\" class=\"blox-emoticon-insert sleeping\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-sleeping\"></span></a>\
            <a title=\"[whistling]\" class=\"blox-emoticon-insert whistling\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-whistling\"></span></a>\
            <a title=\"[huh]\" class=\"blox-emoticon-insert huh\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-huh\"></span></a>\
            <a title=\"[tongue]\" class=\"blox-emoticon-insert tongue\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-tongue\"></span></a>\
            <a title=\"[unsure]\" class=\"blox-emoticon-insert unsure\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-unsure\"></span></a>\
            <a title=\"[angry]\" class=\"blox-emoticon-insert angry\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-angry\"></span></a>\
            <a title=\"[blink]\" class=\"blox-emoticon-insert blink\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-blink\"></span></a>\
            <a title=\"[cool]\" class=\"blox-emoticon-insert cool\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-cool\"></span></a>\
        </div>\
        <div class=\"icon-row\">\
                <a title=\"[crying]\" class=\"blox-emoticon-insert crying\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-crying\"></span></a>\
            <a title=\"[lol]\" class=\"blox-emoticon-insert lol\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-lol\"></span></a>\
            <a title=\"[ohmy]\" class=\"blox-emoticon-insert ohmy\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-ohmy\"></span></a>\
            <a title=\"[scared]\" class=\"blox-emoticon-insert scared\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-scared\"></span></a>\
            <a title=\"[yawn]\" class=\"blox-emoticon-insert yawn\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-yawn\"></span></a>\
            <a title=\"[sneaky]\" class=\"blox-emoticon-insert sneaky\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-sneaky\"></span></a>\
            <a title=\"[thumbdown]\" class=\"blox-emoticon-insert thumbdown\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-thumbdown\"></span></a>\
            <a title=\"[thumbup]\" class=\"blox-emoticon-insert thumbup\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-thumbup\"></span></a>\
            <a title=\"[tongue_smile]\" class=\"blox-emoticon-insert tongue_smile\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-tongue_smile\"></span></a>\
            <a title=\"[love]\" class=\"blox-emoticon-insert love\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-love\"></span></a>\
        </div>\
        <div class=\"icon-row oversize\">\
            <a title=\"[censored]\" class=\"blox-emoticon-insert censored\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-censored\"></span></a>\
            <a title=\"[happybirthday]\" class=\"blox-emoticon-insert happybirthday\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-happybirthday\"></span></a>\
            <a title=\"[offtopic]\" class=\"blox-emoticon-insert offtopic\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-offtopic\"></span></a>\
            <a title=\"[spam]\" class=\"blox-emoticon-insert spam\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-spam\"></span></a>\
            <a title=\"[ban]\" class=\"blox-emoticon-insert ban\" href=\"JavaScript:void(0);\">\
                <span class=\"blox_emoticons sprite-ban\"></span></a>\
        </div>\
    </div>\
</div>\
";}


var CommentingAllowed = true;
if((CommentRestrictPostingToSubscribers) && jQuery.cookie('tncms-services')==null){ // Subscription check for allowing comments to be posted
CommentingAllowed = false;
}

if(CommentingAllowed){// Subscription check for allowing comments to be posted
if(jQuery("#post-comment").length>0){
    if((sUsername!=null)&&(sAuthToken!=null)){
if(jQuery("#newPost").find("#comment").length<1){
        jQuery("#newPost").prepend("\
"+EmoticonControls+"\
<h4><em class=\"author\"><strong><a href=\"/users/profile/"+sUsername.replace(/\+/g," ")+"\">"+sUsername.replace(/\+/g,"&nbsp;")+"</a></em></strong></h4>\
<div class=\"user\">\
    "+avatarImageElement+"\
</div>\
<div class=\"frame\">\
<div class=\"container\">\
    <input type=\"hidden\" name=\"action\" value=\"comments:post\" />\
    <textarea id=\"comment\" name=\"comment\" rows=\"20\" cols=\"20\">Begin typing here...</textarea>\
    <span class=\"bg\">&nbsp;</span>\
</div>\
</div>\
<div class=\"buttons\">\
<input type=\"submit\" value=\"Post Comment\" class=\"btn-review\" />\
</div>\
        ");
    }
} }
}else{// pull in subscription required notice
    jQuery("#post-comment").html(CommentRestrictPostingToSubscribersMessage);

}// / Subscription check for allowing comments to be posted

siteUrl = "http://www.hngnews.com/";
if(preview){ siteUrl = document.URL.split("http://www.hngnews.com/site/")[0]+"/site/"; }

if(sUsername!=null){fixedUserName = sUsername.replace(/\+/g,"&nbsp;");}
if("#comment-log-in-area"){
    if ((sAuthToken != null) && (sUsername != null)){
        if(typeof(commentingWelcomeMessage)!="undefined"){
            jQuery("#comment-log-in-area").find("h2").html(commentingWelcomeMessage.loggedIn.replace("[USER_NAME]",fixedUserName));
        }else{jQuery("#comment-log-in-area").find("h2").html("Welcome back, <span class='username'>"+sUsername.replace(/\+/g,"&nbsp;")+"</span>!<br/> Join the discussion.");}
        jQuery("#comment-log-in-area").hide();
    } else if ((sAuthToken == null) && (sUsername != null)){
        if(typeof(commentingWelcomeMessage)!="undefined"){
            jQuery("#comment-log-in-area").find("h2").html(commentingWelcomeMessage.recognized.replace("[USER_NAME]",fixedUserName));
        }else{jQuery("#comment-log-in-area").find("h2").html("Welcome back, "+sUsername.replace(/\+/g,"&nbsp;")+"!<br/> Log in to join the discussion.");}
        
        if(preview){
            jQuery("#comment-log-in-area").find(".login").find("p.button").html("\
                <a rel=\"nofollow\" href=\""+siteUrl.split("?")[0].replace("users/login","")+"users/login/?referer_url="+document.URL.replace("https:///","").replace("http://","")+"\">Log In</a>\
            ");
        }
        
        if(typeof(commentingWelcomeMessage)!="undefined"){
            jQuery(jQuery("#comment-log-in-area").find(".login").find("p")[1]).html("\
                <p>"+commentingWelcomeMessage.recognizedLogin.replace("[USER_NAME]",fixedUserName)+"</p>\
            ");
        }else{
            jQuery("#comment-log-in-area").find(".login").html("\
                <p class=\"button\"><a href=\""+siteUrl+"users/login/?referer_url="+document.URL.replace("https:///","").replace("http://","")+"\">Log In</a></p>\
                <p>Our system requires that you log in to verify your identity even if you didn\'t log out the last time you visited.</p>\
            ");
        }
        if(typeof(commentingWelcomeMessage)!="undefined"){
            jQuery("#comment-log-in-area").find(".register").html("<p class=\"button\"><a class=\"logout-link\" href=\"javascript:tncms_logout();\">Not you?</a></p><p>"+commentingWelcomeMessage.recognizedRegister.replace("[USER_NAME]",fixedUserName)+"</p>");
        }else{
            jQuery("#comment-log-in-area").find(".register").html("\
                <p class=\"button\"><a class=\"logout-link\" href=\"javascript:tncms_logout();\">Not you?</a></p> \
                <p>If you're not <em>"+sUsername.replace(/\+/g,"&nbsp;")+"</em>, you can either\
                    <a class=\"logout-link\" href=\"javascript:tncms_logout();\">log out</a>\
                    and log back in with the appropriate credentials, or you can \
                    <a href=\""+secureUserUrl+"signup/\">register a new user</a>.\
                </p>\
            ");
        }
    } else {
        jQuery("#comment-log-in-area ul").show();}
}


if(jQuery("#comment").val() != "Begin typing here..."){ jQuery("#comment").css({"color":"black"}); }
jQuery("#comment").bind("focus",function(){ checkCommentTextarea() });
jQuery("#comment").bind("click",function(){ checkCommentTextarea() });


//comment length limiter

if(sAuthToken!=null){
underWordLimit = true;
if(CommentWordLimit>0){
function wordCounter(field, countfield, maxlimit) {
    var wordLimiter = new Object();
    wordLimiter.reason = "";
    
    var wordcounter=0;
    var wordcountercheck = false;
    var wordLengthCounter = 0;
    var wordLengthCheck = true;
    var thisWord = "";
    
    for (x=0;x<field.value.length;x++) {
        // Counts the spaces and hyphens while ignoring double spaces, usually one in between each word.
        if (field.value.charAt(x) == " " || field.value.charAt(x) == "_" && field.value.charAt(x-1) != " "){
            thisWord="";
            wordcounter++;wordLengthCounter=0;
        }else{wordLengthCounter++;thisWord+=field.value.charAt(x);}
        if (wordcounter > 250) {field.value = field.value.substring(0, x);} else {countfield.value = maxlimit - wordcounter;}
        
        if(thisWord.match(/^http\:\/\/|^www\.|\.com$|\.org$|.net$/)){  

        // Prevents posting of long blocks of text without spaces to get around limit.
        }else if(wordLengthCounter>50){wordLengthCheck=false;}
    }

    if(wordcounter <= maxlimit){ wordcountercheck = true; }
    if(!wordLengthCheck){ wordcountercheck = false; wordLimiter.reason=" - word too long" }
    wordLimiter.check = wordcountercheck;
    
return wordLimiter; }

function linkAutomation(field){
    var commentText=field.value;
    var thisWord="";
    var thisPost="";

    for (x=0;x<field.value.length;x++){
       if((field.value.charAt(x)!=" "&&field.value.charAt(x)!="_")){
            thisWord+=field.value.charAt(x);
            
            if(field.value.charAt(x+1)==" "||field.value.charAt(x+1) == "_" || field.value.charAt(x+1) == ""){
                if(thisWord.match(/^http\:\/\/|^www\.|\.com$|\.org$|.net$/)){
                    thisWord="<a href=\""+thisWord+"\" rel=\"nofollow\">"+thisWord+"</a>";
                }

                thisPost = thisPost+=thisWord;
                thisWord="";
            }
        }else{thisPost+=field.value.charAt(x);}
    }

    field.value = thisPost;
}

function handleWordCount(mode){
    if(jQuery("#comment").val()!=""){
        wordLimiter = wordCounter(jQuery("#comment")[0],jQuery("#post-comment .word.count .counter")[0],CommentWordLimit);
        underWordLimit = wordLimiter.check;
        var count = Math.abs(Number(jQuery("#post-comment .word.count .counter").val()));
        jQuery("#post-comment .word.count .number").text(count);
        if(count == 1){ jQuery("#post-comment .word.count .plural").hide(); } else { jQuery("#post-comment .word.count .plural").show(); }

        jQuery("#post-comment .word.count .reason").text(wordLimiter.reason);
        if(underWordLimit){
            jQuery("#post-comment .word.count").removeClass("over"); 
            jQuery("#postFail").hide(2); 
            
            if(typeof(mode)!="undefined"){
                if(mode=="submit"){
                    linkAutomation(jQuery("#comment")[0]);
                }
            }
        }else{
            if(wordLimiter.reason==""){
                jQuery("#post-comment .word.count").addClass("over");
            }
        }
    }else{
        jQuery("#post-comment .word.count .counter").text(String(CommentWordLimit));
    }
return underWordLimit; }

jQuery("#post-comment #newPost").append("<span class=\"word count\"><input type=\"hidden\" class=\"counter\" value=\""+CommentWordLimit+"\" disabled/><span class=\"number\">"+CommentWordLimit+"</span> word<span class=\"plural\">s</span> <span class=\"below\">remaining</span> <span class=\"over\">over limit</span><span class=\"error reason\"></span></span>");

jQuery("#comment").bind('keydown',function(){ handleWordCount(); });
jQuery("#comment").bind('keyup',function(){ handleWordCount(); });
}
}

if(sAuthToken==null){
    if(preview){
jQuery("form.reportAbuse").replaceWith("<span class=\"not commentReported\"><a rel=\"nofollow\" href=\""+siteUrl.split("?")[0].replace("users/login","")+"users/login/?referer_url="+document.URL.replace("https:///","").replace("http://","")+"&mode=comments\">Log In</a> to report.</span>");  
    }else{
jQuery("form.reportAbuse").replaceWith("<span class=\"not commentReported\"><a rel=\"nofollow\" href=\""+jQuery("#comment-log-in-area").find(".login p.button a").attr("href")+"\">Log In</a> to report.</span>");  
    }

}else{
 jQuery("form.reportAbuse").each(function(){
  jQuery(this).bind("submit",function(){
    e = this; 
      jQuery(this).ajaxSubmit({
      dataType: 'json',
        success: function(result,error){
        if(result.success==true){
            jQuery(e).replaceWith("<span class=\"commentReported\">You reported this comment.</span>");
        }else{
            jQuery(e).replaceWith("<span class=\"commentReported\">There was a problem with reporting this comment.</span>");
        }
    },
    error: function(result, text, error){ }
      });

  return false; });
 });
}

if(sAuthToken!=null){
jQuery('#post-comment').bind("submit",function() {
jQuery("#comment").val(jQuery("#comment").val().replace("&","&amp;"));

var underWordLimit = true;
if(CommentWordLimit>0){ underWordLimit = handleWordCount('submit'); }

//comment length check will need to be inserted here
if((!recentlyPosted) && underWordLimit && (jQuery("#comment").val() != "Begin typing here...")){recentlyPosted=true;
 jQuery('#post-comment').ajaxSubmit({
    dataType: 'json',
    success: function(oData) {
        //oData == "success";
        if (oData.error) {
            var errorMessage = oData.error;
            if(oData.error=="You must be logged in to post comments!"){
                errorMessage="Your Session has expired, <a href=\"/users/login/?referer_url="+document.URL.replace("https:///","").replace("http://","").replace(document.domain,"")+"\">Log in Again</a>";
            }
            if(!jQuery("#postFail").size()){
                jQuery('#post-comment').prepend("\
                    <p id=\"postFail\" style=\"display:none\">\
                        <label class='error'>\
                        <span>Error: </span>\
                            " + errorMessage + "\
                        </label>\
                    </p>");
                    jQuery("#postFail").show("fast");
                if(oData.error == "You are missing a comment to post!"){
                    jQuery("#comment").bind("blur",function(){
                        if(jQuery("#comment").val() != ""){
                            jQuery("#postFail").hide("3",function(){ 
                                jQuery("#postFail").replaceWith(""); 
                                jQuery("#comment").unbind("blur"); 
                            }); 
                        }
                    });
                }
            }

            jQuery("#newPost").find(".btn-review").css({"opacity":".3","cursor":"default"}).animate(
            {opacity: 1.0}, 
            10000, 
            function(){ 
                recentlyPosted = false;
                jQuery("#newPost").find(".btn-review").css({"opacity":"1","cursor":"pointer"});    
            });
        } else {
            jQuery("#postFail").remove();
            if(!jQuery('#postSuccess').size()){
                jQuery('#post-comment').prepend("\
                <p id=\"postSuccess\" style=\"display:none\">\
                    <label>\
                        <span>Note: </span> "+commentSubmittedMessage+"\
                    </label>\
                </p>");
                jQuery("#postSuccess").show("fast");

                if(CommentingMode!="approval"){
                    // this will get the number of posts by the currrent user
                    var userCommentCount = Number(jQuery("ul.comment-list li").find("h4."+sUsername.replace(" ","_")).length)+1;
                    jQuery.cookie("commentsPosted-"+assetUuid,userCommentCount);
                }    
            }else{
                jQuery("#postSuccess").find("label").html("<span>Note: </span> "+multipleCommentSubmittedMessage);

                if(CommentingMode!="approval"){
                    // This should refresh the comment tracking cookie, adding another increment to it.
                    var userCommentCount = Number(jQuery.cookie("commentsPosted-"+assetUuid))+1;
                    jQuery.cookie("commentsPosted-"+assetUuid,userCommentCount);
                }
            }

            var parent = "";
            if(jQuery("#newPost").attr("parent")!=""){ parent = "parent=\""+jQuery("#newPost").attr("parent")+"\""; }

            //build a comment from the data
            var newPost = "<li class=\"post by "+sUsername+" "+jQuery("#newPost").attr("class")+" preview\" "+parent+">\
    <h4 class=\""+jQuery("#newPost").find("h4").text().replace(" ","_")+"\">" + jQuery("#newPost").find("h4").text() + "</h4>\
    <div class=\"user\">"+jQuery("#newPost").find(".user").html()+"</div>\
    <div class=\"frame\">\
    <div class=\"container\">\
        <div class=\"commentText\"><p>" + jQuery("#blox-comments").find("#newPost").find("textarea").val().replace(/\n\n/g,"</p><p>").replace(/\n/g,"<br/>").replace("|&&|","") + "</p></div>\
        <ul class=\"commentInfo\"><li class=\"preview-note\"><em class=\"author\">message preview</em></li></ul>\
        <span class=\"bg\"> </span>\
    </div>\
    </div>\
</li>";

            if(CommentingMode!="approval"){
                if(useSessionStorage){
                    if(sessionStorage["previewMessages-"+assetUuid]!=""){
sessionStorage["previewMessages-"+assetUuid]=newPost+"|&&|"+sessionStorage["previewMessages-"+assetUuid];
                    }else{ sessionStorage["previewMessages-"+assetUuid]=newPost; }
                }
            }

            if(jQuery("#blox-comments").find(".comment").find(".comment-list").length < 1){  
                jQuery("#blox-comments").find(".comment").append("<ul class=\"comment-list\"></ul>");
            }

            if(CommentOrder != "asc"){
jQuery("#blox-comments").find(".comment-list").prepend(newPost);
}else{jQuery("#blox-comments").find(".comment-list").append(newPost);}

            handleSmileys(jQuery(jQuery(".post.preview .commentText").find("p")));
            jQuery("#previewPost").show("fast",function(){ jQuery("#previewPost").attr("id",""); });
            jQuery("#commentCount").html(Number(jQuery("#commentCount").html())+1);
            jQuery("#blox-comments").find("#newPost").find("textarea").css({"color":"#D4D4D4"}).val("Begin typing here...");
            jQuery("#blox-comments").trigger("previewCommentCreated");

            jQuery("#newPost").find(".btn-review").css({"opacity":".3","cursor":"default"}).animate(
                {opacity: 1.0}, 
                10000, 
                function(){ 
                    recentlyPosted = false;
                    jQuery("#newPost").find(".btn-review").css({"opacity":"1","cursor":"pointer"});    
            });
        }
    }
  });
} else {

    if(!underWordLimit){
        if(jQuery("#postFail").length<1){
            jQuery('#post-comment').prepend("\
<p id=\"postFail\" style=\"display:none\">\
    <label class='error'>\
        <span>Error: </span>\
        Your message exceeds the length restriction for a comment\
    </label>\
</p>");
    }

    jQuery("#postFail").show(2);
    }

}

  return false;
});
}


jQuery("#emoticon-control .blox-emoticon-insert").bind("click",function(){
    insertIcon(jQuery(this).attr("title"));
    $("#more-icons-area").fadeOut(1);
return false; });

jQuery("#emoticon-control .more-icons,#emoticon-control .less-icons").click(function(){
    $("#more-icons-area").toggle(2);
return false; });

});

function expandPost(element){
    var moreOrLess = jQuery(element).find(".moreOrLess");
    var commentText = jQuery(element).parent().find(".commentText");

    if(moreOrLess.first().text()=="more"){ 
        commentText.css({"height":"auto"});
        moreOrLess.text("less");
        if(typeof(ninjaLog)!="undefined"){ninjaLog.Update({text:"Expanding Comment"});}
    } else { 
        commentText.css({"height":"304px","overflow":"hidden"});
        moreOrLess.text("more");
    }
}

function checkCommentTextarea(){
    if(jQuery("#comment").val() == "Begin typing here..."){
        jQuery("#comment").val("").css({"color":"black"});
    }
}

function insertIcon(emoticon){
    var textareaComment=jQuery("textarea#comment");
    if(textareaComment.val()=="Begin typing here..."){textareaComment.val("").css({"color":"#000000"});}
    textareaComment.val(textareaComment.val()+emoticon);
}

/*
 * ScrollToElement 1.0
 * Copyright (c) 2009 Lauri Huovila, Neovica Oy
 *  lauri.huovila@neovica.fi
 *  http://www.neovica.fi
 *  
 * Dual licensed under the MIT and GPL licenses.
 */

(function($) {
    $.scrollToElement = function( $element, speed ) {

        speed = speed || 750;

        $("html, body").animate({
            scrollTop: $element.offset().top,
            scrollLeft: $element.offset().left   
        }, speed );
        return $element;
    };

    $.fn.scrollTo = function( speed ) {
        speed = speed || "normal";
        return $.scrollToElement( this, speed );
    };

})(jQuery);