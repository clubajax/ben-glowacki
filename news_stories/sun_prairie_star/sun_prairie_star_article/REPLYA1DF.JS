jQuery(function(){
if(CommentReplies){

    var sUsername = jQuery.cookie('tncms-screenname');
    var sAuthToken = jQuery.cookie('tncms-authtoken');
    var addReplies = false;
    if((sUsername!=null)&&(sAuthToken!=null)){addReplies=true;}

    var posts = jQuery("#blox-comments .comment-list .post").toArray();
    if(jQuery("#blox-comments").find(".comment-list").hasClass("desc")){
        posts = posts.reverse();
    }
    
    jQuery(posts).each(function(){
        var depth = 0;

        if(jQuery(this).hasClass("reply")){
            if(jQuery(this).attr("depth")){
                var depth = jQuery(this).attr("depth");
            }
    
            var parent = $("#comment-"+jQuery(this).attr("parent"));
            handleReply(this,parent);
        }

        if((depth<CommentThreadDepth)){
           jQuery(this).find(".commentInfo").first().append("<li class=\"most important\"><a class=\"commentReply\" href=\"javascript:void(0)\">Reply</a></li>");
        }

    });
    
    
    
    if(addReplies){
        jQuery("#blox-comments .comment-list .commentReply").click(function(){
            makeReply(this);
        return false; });
    }else{
        jQuery("#blox-comments .comment-list .commentReply").click(function(){
            jQuery("#open-modal-login-panel").trigger('click');
        return false; });
    }

    jQuery("#blox-comments").live('previewCommentCreated',function(){
        jQuery("#blox-comments .post.reply.preview").each(function(){
            var parent = [];

            if(jQuery(this).attr("parent")!=""){ 
                parent = jQuery("#comment-"+jQuery(this).attr("parent")); 
                handleReply(this,parent);
            }
        });

        cancelReply();
    });

    jQuery("#newPost .buttons").append("<a class=\"reply-cancel\" href=\"javascript:void(0)\">Cancel</a>");
    jQuery("#newPost .buttons .reply-cancel").live('click',function(){ cancelReply(); });


} }); 

function cancelReply(){
    var postForm = jQuery("#post-comment").detach();
    postForm.find("input[name=parent_uuid]").remove();
    postForm.find("#comment").val("Begin typing here...");
    postForm.find("#comment textarea").css({"color":"d4d4d4"});
    postForm.find("#newPost").removeClass("reply");
    postForm.find("#newPost").attr("parent","");
    postForm.find("#newPost").attr("depth","");
    
    var commentList = jQuery("#blox-comments").find(".comment-list");
    if(commentList.hasClass("asc")){ commentList.append(postForm);
    }else{ commentList.prepend(postForm); }
return false;}

function handleReply(element,parent){
    var depth = Number(jQuery(element).attr("depth"));
    if(parent.length>0){
        var comment = jQuery(element).detach();
    
        if(jQuery(parent).find(".replies").length < 1){
            jQuery(parent).append("<ul class=\"replies\"></ul>");
        }
    
        jQuery(parent).find(".replies").first().append(comment);
    }else if(depth<2){
        var parentID = jQuery(element).attr("parent");
        jQuery(element).wrap("<li id=\"comment-"+parentID+"\" class=\"post removed by admin\"/>").wrap("<ul class=\"replies\"/>");
        jQuery("#comment-"+parentID).prepend("<div class=\"notification\"><h4>Comment Removed</h4></div>");
    }else{
        var thread = jQuery(element).attr("thread");
        var threadArray = thread.split("http://www.hngnews.com/");
        var i = 0;
            
        jQuery(threadArray).each(function(){
            if(i<depth){
                var id = this.split("|")[1];
                if(jQuery("#comment-"+id).length){
                    var detached = jQuery(element).detach();
                    if(!jQuery("#comment-"+id).find(".replies").length){ jQuery("#comment-"+id).append("<ul class=\"replies\"></ul>"); }
                    jQuery("#comment-"+id).find(".replies").append(detached);
                }else{
                    jQuery(element).wrap("<li id=\"comment-"+id+"\" class=\"post removed by admin\"/>").wrap("<ul class=\"replies\"/>");
                    if(!jQuery("#comment-"+id).find(".notification").length){jQuery("#comment-"+id).prepend("<div class=\"notification\"><h4>Comment Removed</h4></div>");}
                }
                
                i++;
            }
        });
    }
}

function makeReply(element){
    var parent = jQuery(element).parents("li.post").first();
    var postID = parent.attr("id").replace("comment-","");
    var postForm = jQuery("#post-comment").detach();

    if(jQuery(parent).find(".replies").length < 1){
        jQuery(parent).append("<ul class=\"replies\"></ul>");
    }
    
    parent.find(".replies").first().append(postForm);
    jQuery("#newPost").append("<input type=\"hidden\" name=\"parent_uuid\" value=\""+postID+"\"/>");
    jQuery("#newPost").addClass("reply");
    jQuery("#newPost").attr("parent",postID);   

    scrollToPost("#newPost");
}

function scrollToPost(id){
    jQuery.scrollToElement(jQuery(id),500);
}