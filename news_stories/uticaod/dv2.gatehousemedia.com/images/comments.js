var commentsNum = 0;
var commentsIndex = 0;
var form_id = 0;
var comments;
var divNum = 0;
var iface = 'comments';
var registered = false;
var abuseArray = new Array();
var globalUser = '';

var sitelogin = {

	set_cookie_redirect : function(){
		var mylocation = window.location;
		var expires = new Date();
		expires.setDate(expires.getDate() + 7); // 7 = days to expire
		document.cookie = 'ugcredirect'+"="+mylocation+";expires="+expires.toGMTString()+"; path=/"
		window.location = 'http://' + static_url + '/users/registration';
	}

}



function formatT(txt) {
    txt = txt.toString();
    txt = txt.replace(/</g,"&lt;");
    txt = txt.replace(/>/g,"&gt;");
    txt = txt.replace(/"/g,'\'');
    txt = txt.replace(/\n/g,"<br />");
    return txt;
}

function ProcessComments(abuse_email, abuse_title, abuse_url, story_urn, filters, i)

 {

    if (comments.comments[i])
    {
        if (comments.comments[i].state != 'UNMODERATED') {
            comments.comments[i].text = FilterProfanity(comments.comments[i].text, filters);
            comments.comments[i].author_name = FilterProfanity(comments.comments[i].author_name, filters);
            comments.comments[i].text = unescape(comments.comments[i].text);



 			realuser = formatT(comments.comments[i].author_name)
            
            try{

			    var tos_start = new Date('2011-03-21T00:00:00Z')
			    var thestorydate = new Date(storydate)
			    
	            var valid = tos_start >= thestorydate;
	            
	            
	            if(valid == true){
		            var ststart = 'false';
		            var stend = 'false';
		            
					for (var ii=0; ii < realuser.length; ii++) {
					   ch = realuser.charAt(ii)
					   if(ch=='('){
					       ststart = ii;
					   }
					   if(ch==')'){
					       stend = ii;
					   }
					}
					
					if(ststart != 'false' && stend != 'false'){
					    realuser = realuser.substring(ststart+1, stend);
					}else{
					    realuser = formatT(comments.comments[i].author_name)
					}
				}
			
            }catch(err){
         
            }



 
            contents =  '<div class="commentContainer">';
            contents += '  <div class="name">'+ realuser + '</div>';
            contents += '  <div class="time">' + formatT(humane_date(comments.comments[i].time)) + '</div>';
            contents += '  <div id="abuse_reg_' + formatT(form_id) + '">';
            contents += '    <a class="report_abuse" href="javascript:displayAbuse(true,' + formatT(form_id) + ')" title="Report Abuse">Report Abuse</a>';
            contents += '  </div>';
            contents += '  <div id="abuse_un_' + formatT(form_id) + '">';
            contents += '    <a class="report_abuse" href="javascript:displayAbuse(false,' + formatT(form_id) + ')" title="Report Abuse">Report Abuse</a>';
            contents += '  </div>';
            contents += '  <div class="report_abuse_error" id="abuseError_' + formatT(form_id) + '"> You must be logged in to report abuse.</div>';
            contents += '  <div class="comment">';
            contents += '    <div class="commentAbuseForm" id="abuseForm_' + formatT(form_id) + '">';
            contents += '      <form action="http://dv1.gatehousemedia.com/submit/abuse_dd.php" method="post" style="display:block;" name="reportabuse' + formatT(form_id) + '" id="reportabuse' + formatT(form_id) + '">';
            contents += '        <input type="hidden" name="email_address" value="' + formatT(abuse_email) + '" />';
            contents += '        <input type="hidden" name="story_url" value="' + formatT(abuse_url) + '" />';
            contents += '        <input type="hidden" name="story_comments_url" value="http://commenting.ghm.zope.net/comments/' + formatT(story_urn) + '" />';
            contents += '        <input type="hidden" name="story_title" value="' + formatT(abuse_title) + '" />';
            contents += '        <input type="hidden" name="comment_text" value="' + formatT(comments.comments[i].text) + '" />';
            contents += '        <input type="hidden" name="comment_author" value="' + formatT(comments.comments[i].author_name) + '" />';
            
            contents += '        <input type="hidden" name="user_email" id="reporters_un_' + formatT(form_id) + '" value="' + formatT(comments.comments[i].author_name) + '" />';
             
            contents += '        <div class="commentDisclaimer"  id="AbuseEmailError_' + formatT(form_id) + '" style="font: 11px Arial,Sans-Serif; margin-bottom: 10px; width:255px; display: none;"></div><div class="AbuseEmail"><input type="text" name="user_email_entered" id="user_email_' + formatT(form_id) + '" class="AbuseEmailInput" onfocus="SwapStyle(\'user_email_' + formatT(form_id) + '\',\'AbuseEmailInputFocused\')" onblur="if (this.value == \'\') {SwapStyle(\'user_email_' + formatT(form_id) + '\',\'AbuseEmailInput\')} else {SwapStyle(\'user_email_' + formatT(form_id) + '\',\'AbuseInput\')}" /></div>';
            
            contents += '        <textarea id="comment_user_' + formatT(form_id) + '" name="comment_user" class="AbuseCommentEmpty" cols="50" rows="10" style="margin: 0;" onfocus="SwapStyle(\'comment_user_' + formatT(form_id) + '\',\'AbuseCommentFocused\')" onblur="if (this.value == \'\') {SwapStyle(\'comment_user_' + formatT(form_id) + '\',\'AbuseCommentEmpty\')} else {SwapStyle(\'comment_user_' + formatT(form_id) + '\',\'AbuseComment\')}"  ></textarea>';
            contents += '        <div><input id="submitit" type="button" name="submitit" class="AbuseSubmit" onclick="submitAbuse(' + formatT(form_id) + ')" value="Report Abuse" /></div><hr/>';
            contents += '     </form>';
            contents += '    </div>';
            contents += '    <div class="comment">' + formatT(comments.comments[i].text) + '</div>';
            contents += '  </div>';
            contents += '</div>'; 
        
        document.getElementById('comments_dump').innerHTML += contents;
        
        toggleAbuseLoad(formatT(form_id),registered)
        
        }    
        form_id++;
        i++;
        setTimeout('ProcessComments("' + abuse_email + '","' + abuse_title + '","' + abuse_url + '","' + story_urn + '","' + filters + '",' + i + ')', 40);
    }
    else
    {
            document.getElementById('comments_dump').style.display = 'block';
            document.getElementById('comments_loading').style.display = 'none';
    }
    
     
}

function validateEmail(id,str){
	var emailRegEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	
	if(str.match(emailRegEx)){
	    document.getElementById('AbuseEmailError_' + id).innerHTML = '';
		return true;
	}else{
	    document.getElementById('AbuseEmailError_' + id).style.display = "block";
	    document.getElementById('AbuseEmailError_' + id).innerHTML = "<div>Please enter a valid e-mail address.</div>";
		return false;
	}
}

function submitAbuse(id){
   var user_email = validateEmail(id,document.getElementById('user_email_'+id).value);
   var comment_user = document.getElementById('comment_user_'+id).value;
   if(!comment_user){
	   	document.getElementById('AbuseEmailError_' + id).style.display = "block";
	    document.getElementById('AbuseEmailError_' + id).innerHTML += "<div>Please enter a comment.</div>";
   }
   if(toggle_abuse == 'false'){
	document.getElementById('reporters_un_'+ id).value= 'Username:' + document.getElementById('current_user').innerHTML + ' Email:' +  document.getElementById('user_email_'+ id).value;
   }else{
	document.getElementById('reporters_un_'+ id).value= 'Username:' + ' Email:' +  document.getElementById('user_email_'+ id).value;
   }
   if (user_email == true && comment_user){
         
	   document.getElementById('reportabuse'+id).submit();
   } 
}

function displayAbuse(toggle,id){
    if(toggle_abuse == 'true'){toggle=true}
	if(toggle==false){
	    for(i=0;abuseArray.length-1 >= i;i++){
		    if(document.getElementById("abuseError_"+i)){
				document.getElementById("abuseError_"+i).style.display = "none";  
			} 
	    }
		document.getElementById("abuseError_"+id).style.display = "block";
	}else{
	    for(i=0;abuseArray.length-1 >= i;i++){
		    if(document.getElementById("abuseForm_"+i)){
			    document.getElementById("abuseForm_"+i).style.display = "none";
			}
	    }
	    document.getElementById("abuseForm_"+id).style.display = "block";
	}
}

function toggleAbuseLoad(id,reg){
    
    abuseArray[formatT(form_id)] = registered;
	if(reg==true){
		document.getElementById('abuse_reg_'+id).style.display="block"
		document.getElementById('abuse_un_'+id).style.display="none"
	}else{
		document.getElementById('abuse_reg_'+id).style.display="none"
		document.getElementById('abuse_un_'+id).style.display="block"
	}
	
}


function toggleAbuse(reg){
	for(i=1;abuseArray.length >= i; i++){
	  toggleAbuseLoad(abuseArray[i],reg);
	}
}


function Logout(anon, site_id) {

    for(i=0;abuseArray.length-1 >= i;i++){
	    if(document.getElementById('abuse_reg_'+i)){
			document.getElementById('abuse_reg_'+i).style.display="none"
			document.getElementById('abuse_un_'+i).style.display="block"
			document.getElementById('abuseForm_'+i).style.display="none"
		}
    } 
    
   hideugc();

    if (iface == 'comments') {
        $.post('/!/commenting/users/logout',{});
        $('#loginRegisterMessage').html('<span class="success">Logged out successfully.</span>');
        AuthForm(anon, site_id);
    }
    else {
        if (logged_in == true) {
            $('#ugcg-content').html('<div class="loading container"><img src="http://global.static.ghm.zope.net/resources/ghns_2/images/loading-child.gif" alt="Logging out..." title="Logging out..." />Logging out...</div>');
            $.post('/!/commenting/users/logout', function() {logged_in = false; UGCPage('home');});

        }
    }
    AuthForm(false,site_id) 
    $('#user_info').html('<a style="color:#FFF" href="javascript:sitelogin.set_cookie_redirect()" >Log In</a>  | <a style="color:#FFF" href="javascript:sitelogin.set_cookie_redirect()">Sign Up</a>')
    return false;
}



function LoginSuccess(user, anon, site_id, com_page) {
    
 
    for(i=0;abuseArray.length-1 >= i;i++){
	    if(document.getElementById('abuse_reg_'+i)){
			document.getElementById('abuse_reg_'+i).style.display="block"
			document.getElementById('abuse_un_'+i).style.display="none"
			document.getElementById('abuseError_'+i).style.display="none"
		}
    } 
    
    
    if (iface == 'profile') {
        logged_in = true;
        userObj = user;
        UGCPage('home');
    }
    else {
       // toggleAbuse(true);
        $('#loginRegisterContainer').html('');
        $('#loginRegisterMessage').html('<span class="success">Logged in successfully as ' + formatT(user['username']) + '.</span>');
        AddCommentForm(user, anon, site_id, com_page);
    }
    return false;
}

function LoginError() {
    $('#submit_login').attr('disabled',false);
    $('#submit_login').attr('value','Login');
    $('#loginRegisterMessage').html('<span class="error">Login unsuccessful. Please check your username and password and try again.</span>');
    return false;
}

function SubmitResetSuccess(email) {
    $('#loginRegisterMessage').html('<span class="success">We\'ve sent an email to ' + formatT(email) + ' containing a URL you\'ll need to visit to reset your password. You should receive the e-mail within the next few minutes. <a href="#" onclick="$(\'#loginRegisterMessage\').html(\'\'); return false;">OK</a></span>');
    return false;
}

function SubmitResetError(email, site_id) {
    $('#loginRegisterMessage').html('<span class="error">We can\'t seem to find an account associated with the email ' + formatT(email) + '. <a href="#" onclick="ResetPasswordForm(\'' + formatT(site_id) + '\'); return false;">Try again</a> or <a href="#" onclick="$(\'#loginRegisterMessage\').html(\'\'); return false;">cancel</a></span>');
    return false;
}

function SubmitResetPassword(site_id) {
    if ($('#reset_email').attr('value') != '') {
        $('#submit_reset_password').attr('disabled',true);
        $('#submit_reset_password').attr('value','Please wait...');
        var reset_email = $('#reset_email').attr('value');
        $.ajax({
            type: 'POST',
            url: '/!/commenting/users/reset_password',
            data: {
                'site_id': site_id,
                'email': reset_email
            },
            success: function() {SubmitResetSuccess(reset_email)},
            error: function() {SubmitResetError(reset_email, site_id)}
        });
        return false;
    }
}

function ResetPasswordForm(site_id) {
    var resetPasswordForm = '';
    resetPasswordForm += '<div id="reset-password" class="clearfix">';
    resetPasswordForm += '    <form id="resetPasswordForm" method="post">';
    resetPasswordForm += '        <label for="reset_email">Email address:</label>';
    resetPasswordForm += '        <input type="text" id="reset_email" />';
    resetPasswordForm += '        <input type="submit" id="submit_reset_password" value="Reset password" onclick="SubmitResetPassword(\'' + formatT(site_id) + '\'); return false;" />';
    resetPasswordForm += '        <a href="#" onclick="$(\'#loginRegisterMessage\').html(\'\'); return false;">Cancel</a>';
    resetPasswordForm += '    </form>';
    resetPasswordForm += '</div>';
    $('#loginRegisterMessage').html(resetPasswordForm);
    return false;
}

function SubmitLogin(anon, site_id, com_page) {
    $('#submit_login').attr('disabled',true);
    $('#submit_login').attr('value','Please wait...');
    if ($('#login_username').attr('value') != '' &&
            $('#login_password').attr('value') != '') {

        var data = {
            'login.login': $('#login_username').attr('value'),
            'login.password': $('#login_password').attr('value'),
            'login.domain': 'UGC'
        };
        
        $.ajax({
            type: 'POST',
            url: $('#commentsLogin').attr('action'),
            dataType: 'json',
            data: data,
            success: function(resp) {LoginSuccess(resp, anon, site_id, com_page)},
            error: function() {LoginError()}
        });
        return false;
    }
    else {
        $('#loginRegisterMessage').html('<span class="error">Please enter both your username and password.</span>');
        $('#submit_login').attr('disabled',false);
        $('#submit_login').attr('value','Login');
        return false;
    }
}

function RegistrationError() {
    $('#loginRegisterMessage').html('<span class="error">That email address is already associated with an account.</span>');
    $('#submit_registration').attr('disabled',false);
    $('#submit_registration').attr('value','Register');
    return false;
}

function RegistrationSuccess(reg_email) {
    $('#loginRegisterContainer').html('');
    $('#loginRegisterMessage').html('<span class="success">Thanks for registering. We\'ve sent an email to ' + formatT(reg_email) + ' containing a URL you\'ll need to visit to verify your account. You should receive the e-mail within the next few minutes.</span>');
    return false;
}

function SubmitRegistration() {
    $('#submit_registration').attr('disabled',true);
    $('#submit_registration').attr('value','Please wait...');
    if ($('#reg_tos_flag').attr('checked') &&
            $('#reg_age_flag').attr('checked') &&
            $('#reg_email').attr('value') != '' &&
            $('#reg_first_name').attr('value') != '' &&
            $('#reg_last_name').attr('value') != '') {
        var reg_email = $('#reg_email').attr('value');
        var reg_first_name = $('#reg_first_name').attr('value');
        var reg_last_name = $('#reg_last_name').attr('value');
        var reg_site_id = $('#reg_site_id').attr('value');
        var data = {
            'email': reg_email,
            'first_name': reg_first_name,
            'last_name': reg_last_name,
            'site_id': reg_site_id,
            'tos_flag': '1',
            'age_flag': '1'
        };

        $.ajax({
            type: 'POST',
            url: '/!/commenting/users/register',
            data: data,
            success: function() {RegistrationSuccess(reg_email)},
            error: function() {RegistrationError()}
        });
        return false;
    }
    else {
        $('#submit_registration').attr('disabled',false);
        $('#submit_registration').attr('value','Register');
        $('#loginRegisterMessage').html('<span class="error">You\'ll need to complete all of the registration fields in order to continue.</span>');
        return false;
    }
}

function AddCommentForm(user, anon, site_id, com_page) {
    
    var content = '';
    content += '<div class="addCommentContainer">';
	content += '	<a name="addComment"></a>';
	content += '	<form id="addCommentForm" method="post" tal:attributes="action string:/!/commenting/comments/${comID}/add">';
	content += '		<div class="addCommentBlock">';
	content += '			<div class="commentTitle">Leave a Comment:</div>';
	content += '			<div class="poolRulesDisclaimer">';
	content += '				Before diving in to post a comment, be sure to read and follow the <a href="#pool-rules" title="pool rules">pool rules</a>.';
	content += '			</div>';
	content += '            <div class="loggedInAs">Logged in as: <span id="current_user">' + formatT(user) + '</span> <a href="#" onclick="Logout(' + anon + ', \'' + formatT(site_id) + '\'); return false;">Logout</a></div>';
	content += '			<textarea id="comment" name="comment" class="commentEmpty" cols="50" rows="10" style="margin: 0;" onfocus="SwapStyle(\'comment\',\'commentFocused\')" onblur="if (this.value == \'\') {SwapStyle(\'comment\',\'commentEmpty\')} else {SwapStyle(\'comment\',\'comment\')}"></textarea>';
	content += '			<div class="poolRules">';
	content += '				<a name="pool-rules"></a>';
	content += '				<div class="poolRulesTitle">Pool Rules</div>';
	content += '				<ol>';
	content += '					<li>Keep it clean.</li>';
	content += '					<li>Stay on topic.</li>';
	content += '					<li>Be honest and accurate.</li>';
	content += '					<li>No personal attacks. Don\'t bash anyone based on their race, creed, heritage, or orientation.</li>';
	content += '					<li>Don\'t say anything here you wouldn\'t say in front of your mother at the dinner table.</li>';
	content += '					<li>Use the \'Report Abuse\' button when you spot a rule violation. (Don\'t report comments just because you disagree.)</li>';
	content += '				</ol>';
	content += '			</div>';
	content += '			<div class="termsDisclaimer">';
	content += '				Participation in online discussion is subject to our <a href="http://www.gatehousemedia.com/terms_of_use" title="Terms of Use">Terms of Use</a>. By commenting, you agree to be bound by these terms.';
	content += '			</div>';
	content += '			<input id="submit" type="button" name="submit" class="submit" onClick="AddComment(\'' + formatT(user) + '\', \'' + formatT(site_id) + '\', \'' + formatT(com_page) + '\')" value="Add Comment" />';
	content += '		</div>';
	content += '	</form>';
	content += '</div>';
	$('#comments_ui').html(content);
	return false;
}

function AuthForm(anon, site_id) {
    
    var login_url = '/!/commenting/users/login';
    if (anon == true) {
        AddCommentForm('anonymous', anon, site_id);
    }
    else {
        
        var content = '';
    	content = '<div id="loginRegisterContainer" class="clearfix">';
    	content += '<div class="commentTitle"><a style="text-decoration:underline" href="javascript:sitelogin.set_cookie_redirect()">Login</a> or <a style="text-decoration:underline" href="javascript:sitelogin.set_cookie_redirect()">register</a> to post a user comment.</div>';
    	content += '</div>';
    	if (iface == 'comments') {
    	        $('#comments_ui').html(content);
    	}
    	else {
    	        return content;
        }
    }
	return false;
}

function VerifyRegistrationForm(data, verify_id) {
    $('#verification_message').html('');
    var content = '';
    content += '<div class="verifyRegistration">';
    content += '    <form id="verifyRegistrationForm" method="post">';
    content += '        <fieldset id="account_settings">';
    content += '            <div class="formHolder clearfix">';
    content += '                <label for="vfy_username">Username <span class="required">*</span>:</label>';
    content += '                <input type="text" id="vfy_username" />';
    content += '            </div>';
    content += '            <div class="formHolder clearfix">';
    content += '                <label for="vfy_password">Password <span class="required">*</span>:</label>';
    content += '                <input type="password" id="vfy_password" />';
    content += '            </div>';
    content += '            <div class="formHolder clearfix">';
    content += '                <label for="vfy_confirm_password">Confirm Password <span class="required">*</span>:</label>';
    content += '                <input type="password" id="vfy_confirm_password" />';
    content += '            </div>';
    content += '            <div class="formHolder clearfix">';
    content += '                <label for="vfy_first_name">First Name <span class="required">*</span>:</label>';
    content += '                <input type="text" id="vfy_first_name" value="' + formatT(data['first_name']) + '" />';
    content += '            </div>';
    content += '            <div class="formHolder clearfix">';
    content += '                <label for="vfy_last_name">Last Name <span class="required">*</span>:</label>';
    content += '                <input type="text" id="vfy_last_name" value="' + formatT(data['last_name']) + '" />';
    content += '            </div>';
    content += '            <div class="formHolder clearfix">';
    content += '                <label for="vfy_email">Email <span class="required">*</span>:</label>';
    content += '                <input type="text" disabled="disabled" id="vfy_email" value="' + formatT(data['email']) + '" />';
    content += '            </div>';
    content += '        </fieldset>';
    content += '        </fieldset>';
    content += '        <div class="submit">';
    content += '            <input type="hidden" value="' + formatT(verify_id) + '" id="verify_id" />';
    content += '            <input type="submit" id="verification_submit" value="Submit" onclick="SubmitVerification(); return false;" />';
    content += '        </div>';
    content += '    </form>';
    content += '</div>';
    
    $('#verification_ui').html(content);
    return false;
}

function VerificationSuccess() {
    $('#verification_message').html('<span class="success">Thank you for verifying your registration. Login using your new username and password anytime to add your comments to a story.</span>');
    $('#verification_ui').html('');
    return false;
}

function VerificationError(resp) {
    $('#verification_message').html('<span class="error">' + formatT(resp) + '</span>');
    $('#verification_submit').attr('disabled',false);
    $('#verification_submit').attr('value','Submit');
    return false;
}

function SubmitVerification() {
    if ($('#verify_id').attr('value') != '' &&
            $('#vfy_username').attr('value') != '' &&
            $('#vfy_password').attr('value') != '' &&
            $('#vfy_confirm_password').attr('value') != '' &&
            $('#vfy_first_name').attr('value') != '' &&
            $('#vfy_last_name').attr('value') != '' &&
            $('#vfy_email').attr('value') != '') {
        if ($('#vfy_username').attr('value').match(/[^A-Za-z0-9-_ ]+/) == null && $('#vfy_password').attr('value').match(/[^A-Za-z0-9-_ ]+/) == null) {
            $('#verification_submit').attr('disabled',true);
            $('#verification_submit').attr('value','Please wait...');
            var data = {
                'id':                 $('#verify_id').attr('value'),
                'username':     $('#vfy_username').attr('value'),
                'password':     $('#vfy_password').attr('value'),
                'confirm':        $('#vfy_confirm_password').attr('value'),
                'first_name': $('#vfy_first_name').attr('value'),
                'last_name':    $('#vfy_last_name').attr('value'),
                'email':            $('#vfy_email').attr('value')
            };
            $.ajax({
                type: 'POST',
                url: '/!/commenting/users/verify',
                data: data,
                success: function() {VerificationSuccess()},
                error: function(resp) {VerificationError(resp.responseText)}
            });
            return false;
        }
        else {
            $('#verification_message').html('<span class="error">You have invalid characters in either your username or password.</span>');
            return false;
        }
    }
    else {
        $('#verification_message').html('<span class="error">You\'ll need to complete all of the required verification fields in order to continue.</span>');
        return false;
    }
}

function VerifyError() {
    $('#verification_message').html('<span class="error">Sorry, but that\'s an invalid verification URL. Please go back to the e-mail message about registration and make sure that you pick up the equal sign (=) at the end of the url. If the url still does not work, contact your local site manager.</div>');
    return false;
}

function VerificationUI(verify_id) {
    $('#verification_message').html('<span class="loading">Loading verification interface...</span>');
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/!/commenting/users/get_data',
        data: {'id': verify_id},
        success: function(data) {VerifyRegistrationForm(data, verify_id)},
        error: function() {VerifyError()}
    });
    return false;
}

function ResetSuccess() {
    $('#reset_ui').html('');
    $('#reset_message').html('<span class="success">You\'ve successfully changed your password.</span>');
    return false;
}

function ResetError(resp) {
    $('#reset_submit').attr('disabled',false);
    $('#reset_submit').attr('value','Submit');
    $('#reset_message').html('<span class="error">' + formatT(resp.responseText) + '</span>');
    return false;
}

function SubmitReset(reset_id) {
    if ($('#reset_password').attr('value') != '' &&
            $('#reset_confirm_password').attr('value') != '') {
        $('#reset_submit').attr('disabled',true);
        $('#reset_submit').attr('value','Please wait...');
        var data = {
            'id': reset_id,
            'password': $('#reset_password').attr('value'),
            'confirm': $('#reset_confirm_password').attr('value')
        };
        $.ajax({
            type: 'POST',
            url: '/!/commenting/users/change_password',
            data: data,
            success: function() {ResetSuccess()},
            error: function(resp) {ResetError(resp)}
        });
        return false;
    }
    else {
        $('#reset_message').html('<span class="error">Please fill out both the \'password\' and \'confirm password\' fields.</span>');
        return false;
    }
}

function ResetUI(reset_id) {
    var content = '';
    content += '<div class="resetEmail">';
    content += '    <form id="resetEmailForm" method="post">';
    content += '        <fieldset id="account_settings">';
    content += '            <div class="formHolder clearfix">';
    content += '                <label for="reset_password">Password <span class="required">*</span>:</label>';
    content += '                <input type="password" id="reset_password" />';
    content += '            </div>';
    content += '            <div class="formHolder clearfix">';
    content += '                <label for="reset_confirm_password">Confirm Password <span class="required">*</span>:</label>';
    content += '                <input type="password" id="reset_confirm_password" />';
    content += '            </div>';
    content += '        </fieldset>';
    content += '        <div class="submit">';
    content += '            <input type="submit" id="reset_submit" value="Submit" onclick="SubmitReset(\'' + formatT(reset_id) + '\'); return false;" />';
    content += '        </div>';
    content += '    </form>';
    content += '</div>';
    $('#reset_ui').html(content);
    return false;
}

function getInitialComments(abuse_email, abuse_title, abuse_url, story_urn, profanity_filter){
    $.getJSON (
	    com_page + '/as_json',
	    function(data) {GetCommentsSuccess(data, formatT(abuse_email), formatT(abuse_title), formatT(abuse_url), formatT(story_urn), formatT(profanity_filter));}
	);
}

function CommentsUI(com_page, abuse_email, abuse_title, abuse_url, story_urn, profanity_filter, anon, site_id) {

    $.ajax({
        type: 'GET',
        url: '/!/commenting/users/check_status',
        data: {},
        dataType: 'json',
        success: function(resp) {StatusSuccess(resp);  },
        error: function(resp) {loginRegister(resp, com_page, abuse_email, abuse_title, abuse_url, story_urn, profanity_filter, anon, site_id); hideugc();}
    });



	
	$('#comments_ui').html('<span class="loading">Loading commenting interface...</span>');
	

    return false;
}

function loginRegister(resp, com_page, abuse_email, abuse_title, abuse_url, story_urn, profanity_filter, anon, site_id){
  $("#ugc_disapproved").show()
  AuthForm(anon, site_id, com_page); 
  registered = false; 
  getInitialComments(formatT(abuse_email), formatT(abuse_title), formatT(abuse_url), formatT(story_urn), formatT(profanity_filter))
  $('#user_info').html('<a style="color:#FFF" href="javascript:sitelogin.set_cookie_redirect()" >Log In</a>  | <a style="color:#FFF" href="javascript:sitelogin.set_cookie_redirect()">Sign Up</a>')
}

function StatusSuccess(resp){
	displayugc();
    if(display_name == 'username'){
        globalUser = resp['username']
    }

    $.ajax({
        type: 'GET',
        url: '/!/commenting/users/get_profile',
        data: {},
        dataType: 'json',
        success: function(resp){checkprofiledata(resp)},
        error: function() {hideugc()}
    });


    
}


var profilecheck = {
	checksitecreds : function(state){
	    pro_state_len = state.length
	    if(pro_state_len <= 2){
	        return 'update'
	    }else{
	        //compare site_ids
	        
	        pro_state = state.split('^')
	        
	        if(pro_state[1] != polg){
	           return 'incorrectsite'
	        }
	    }
	    
	},
	
	checkcreds : function(polg, resp){
	    var e = 0
	    
	   if(!resp.first_name){e++}
	   if(!resp.last_name){e++}
	   if(!resp.street){e++}
	   if(!resp.city){e++}
	   if(!resp.state){e++}
	   if(!resp.zip){e++}
	   if(!resp.phone){e++}
	    
	   if(polg=='3'){
	      if(!resp.birth_date){e++}
	      if(!resp.gender){e++}
	   }
	   
	   			   
	   if(e > 0){return true}
	}
}

function checkprofiledata(resp){
		
    if(display_name != 'username'){
        globalUser = resp['first_name'] + ' ' + resp['last_name'];
    }
    
    if(profilecheck.checksitecreds(resp.state)){
       if(profilecheck.checksitecreds(resp.state) == 'incorrectsite'){
		    logouterror()
       }else if(profilecheck.checksitecreds(resp.state) == 'update'){
          $('#user_info').html('Welcome,  ' + globalUser + ' | <a style="color:#FFF" href="#" onclick="Logout(false, \'' + formatT(site_id) + '\'); return false;">Log Out</a><br>(Please update your profile to post comments)')
          var content = '';
    	  content = '<div id="loginRegisterContainer" class="clearfix">';
    	  content += '<div class="commentTitle">Please <a style="text-decoration:underline" href="http://'+ static_url +'/users/account">update</a> your profile to post comments:</div>';
    	  content += '</div>';
    	  $('#comments_ui').html(content);
    	

       }else{
           //check if we have all requierd info
           if(this.checkcreds(polg, resp)){
		      logouterror()
           }else{
			  pro_state_len = resp.state.length
			  $('#user_info').html('Welcome,  ' + globalUser + ' | <a style="color:#FFF" href="#" onclick="Logout(false, \'' + formatT(site_id) + '\'); return false;">Log Out</a>')
           }
       }
    }else{
       //registered and ready to go
       displayugc();
       AddCommentForm(globalUser, 'false', site_id, com_page);
       $('#user_info').html('Welcome,  ' + globalUser + ' | <a style="color:#FFF" href="#" onclick="Logout(false, \'' + formatT(site_id) + '\'); return false;">Log Out</a>')
    }
    //AddCommentForm(globalUser, 'false', site_id, com_page); 
    


    registered = true;
    getInitialComments(formatT(abuse_email), formatT(abuse_title), formatT(abuse_url), formatT(story_urn), formatT(profanity_filter))	

   

}

function logouterror(){

           $.ajax({
		        type: 'GET',
		        url: '/!/commenting/users/logout',
		        data: {},
		        dataType: 'json',
		        success: function() {retractlogin()},
		        error: function() {retractlogin()}
		    });
}

function retractlogin(){
    $('#user_info').html('<a style="color:#FFF" href="javascript:sitelogin.set_cookie_redirect()" >Log In</a>  | <a style="color:#FFF" href="javascript:sitelogin.set_cookie_redirect()">Sign Up</a>');
	AuthForm(false, site_id)
}



function checkpermissions(resp, com_page, abuse_email, abuse_title, abuse_url, story_urn, profanity_filter, anon, site_id){

}

function GetCommentsSuccess(data, abuse_email, abuse_title, abuse_url, story_urn, filters)
 {
        document.getElementById('comments_loading_outside').style.display = 'none';
        comments = data;
        
        if(document.getElementById("tracker-beacon")){
        	$('#tracker-beacon').replaceWith('<img src="' + $('#tracker-beacon').attr('href').replace('__comment_count__', comments.count) + '" alt="" title="" />');
        }
        
        if (comments.commenting_status == true) {
                document.getElementById('comments').style.display = 'block';
        }

        if (comments.count > 0)
        {
                document.getElementById('commentsCount').innerHTML = 'Comments (' + formatT(comments.count) + ')';
                commentsNum = comments.count;
                document.getElementById('comments_dump').style.display = 'none';
                document.getElementById('comments_loading').style.display = 'block'; 
                ProcessComments(abuse_email, abuse_title, abuse_url, story_urn, filters, commentsIndex);
        }
        else
        {
                document.getElementById('commentsCount').innerHTML = 'Comments (' + formatT(comments.count) + ')';
                document.getElementById('comments_dump').innerHTML = '';
        }
}

function AddComment(user, site_id, com_page) {
    if ($('#comment').attr('value') != '') {
        $('#submit').attr('disabled',true);
        $('#submit').attr('value','Please wait...');
        //var author_name_string = escape(user);
        //var comment_string = escape($('#comment').attr('value'));
        var author_name_string = user;
        var scope_string = site_id;
        var comment_string = $('#comment').attr('value').replace(/[^\x0d\x0a\x20-\x7e\t]/g,'');
      
        $.ajax({
            type: 'POST',
            url: com_page + '/submit',
            data: {
                'author_name': author_name_string,
                'text': comment_string,
                'scope': scope_string
            },
            success: function() {
                AddCommentSuccess(author_name_string, comment_string);
            },
            error: function() {
                AddCommentError();
            }
        });
        return false;
    }
    else {
        return false;
    }
} 

function AddCommentError() {
    $('#submit').attr('disabled',false);
    $('#submit').attr('value','Add Comment');
    //$('#loginRegisterMessage').html('<span class="error">Sorry, but there was a problem while trying to add your comment. Please try again.</span>');
    logouterror()
    return false;
}

function AddCommentSuccess(author_name, comment) {
    $('#loginRegisterMessage').html('');
    $('#submit').attr('disabled',false);
    $('#submit').attr('value','Add Comment');
    //comment = unescape(comment);

    document.getElementById('comment').value = '';
    commentsNum = commentsNum + 1;
    document.getElementById('commentsCount').innerHTML = 'Comments (' + formatT(commentsNum) + ')';
    SwapStyle('comment', 'commentEmpty');
    var divID = 'commentDiv_' + divNum;
    document.getElementById('comments_dump').innerHTML += '<div class="commentContainer" id="' + formatT(divID) + '" style="display: none;"><div class="name">' + formatT(author_name) + '</div><div class="time"></div><div class="comment"><div class="comment">' + formatT(comment) + '</div><div class="commentDisclaimer">Please note: It may take up to 15 minutes for your comment to appear on this page.</div></div></div>';
    document.getElementById(divID).style.display = 'block';
    divNum++;
    return false;
}

function FilterProfanity(t, filters)
 {
        filters = filters.split(',');
        for (var i = 0; i < filters.length; i++)
        {
                var repl = "";

                for (var o = 0; o < filters[i].length; o++) {
                        repl += "*";
                }

                if (filters[i] == 'ass') {
                        var backRef = true;
                        var filtersRegEx = '([^A-Za-z]|^)ass([^A-Za-z]|$)';
                }
                else if (filters[i] == 'cock') {
                        var backRef = true;
                        var filtersRegEx = '([^A-Za-z]|^)cock([^A-Za-z]|$)';
                }
                else if (filters[i] == 'cum') {
                        var backRef = true;
                        var filtersRegEx = '([^A-Za-z]|^)cum([^A-Za-z]|$)';
                }
                else {
                        var backRef = false;
                        var filtersRegEx = filters[i];
                }

                var regex = new RegExp(filtersRegEx, 'gi');

                if (backRef == true) {
                        while (regex.test(t) == true) {
                                t = t.replace(regex, '$1' + repl + '$2');
                        }
                }
                else {
                        t = t.replace(regex, repl);
                }
        }

        return t;
}

function displayugc(){

		$('#my_submissions').show();
		$('#co_how_to').show();
		$('#co_login').hide();
		$('#ugc_approved').show();
		$('#ugc_disapproved').hide();
		getsubmissions();
}

function hideugc(){
		$('#co_my_submissions').hide();
		$('#co_how_to').hide();
		$('#co_login').show();
		$('#ugc_approved').hide();
		$('#ugc_disapproved').show();
		
		$('#uploadbox').html('<div class="co_upload_container clearfix" style="font-family: arial, sans-serif; padding:15px; font-size:1.8em;">You have reached this page in error. Please <a style="color:#cc0000; text-decoration:underline;" href="javascript:sitelogin.set_cookie_redirect()" >Log In</a> before uploading images. </div>');
		
		$('#uploadbox_noHTML5').html('<div class="co_upload_container clearfix" style="font-family: arial, sans-serif; padding:15px; font-size:1.8em;">You have reached this page in error. Please <a style="color:#cc0000; text-decoration:underline;" href="javascript:sitelogin.set_cookie_redirect()" >Log In</a> before uploading images. </div>');

}



	
	/*<div class="clearfix co_user_content" >
		<div class="clearfix" style="text-align:center; " >
		
			
							    <div class="float_l couser" style="font-size:1.3em; padding-left:7px">From </div><div class="float_r couser" style="font-size:1.3em; padding-right:7px"><a href=" /">Close [X]</a></div>
		    					<img src="" />
		    					<div class="coanswer co_user_caption"></div>
			    	
				
				<tal:response repeat="response here/responses">
					<tal:block repeat="photo response/photos">
						<tal:def define="userNum python:repeat['response'].number();">
							<tal:def define="image python:photo.tag['maxwidth=125&maxheight=125']; photoNum python:repeat['photo'].number(); length python:repeat['photo'].length()" tal:condition="python: userNum == int(user)">
		    					<div class="co_user_thumb"><a tal:attributes="href string:${here/@@absolute_url}?user=${userNum}&img=${photoNum}"><tal:img tal:replace="structure image" tal:condition="image" /></a><div>
		    					<!-- <div class="coanswer co_user_caption"><tal:cont replace="photo/caption" /></div> -->
			    			</tal:def>
		    			</tal:def>
		    		</tal:block>
				</tal:response>
				
		</div> 		
	</div>*/
			


function getUrlVars()

{

var vars = [], hash;
var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&'); 

for(var i = 0; i < hashes.length; i++){
	hash = hashes[i].split('=');
	vars.push(hash[0]);
	vars[hash[0]] = hash[1];
}

return vars;

}



function getsubmissions(){
    var myhash = getUrlVars()
    if(myhash['ms']){
    $.ajax({
        type: 'GET',
        url: here_url + '/@@api/get_callout',
        data: {},
        dataType: 'json',
        success: function(resp) {return_submission_results(resp);  },
        error: function(resp) {hideugc();}
    });
    }
}





function return_submission_results(resp){
   var myhash = getUrlVars()
   var image = 0
   if(myhash['image']){
     image = myhash['image']
   }
  
	var content = '<div class="clearfix co_user_content" >';
		content += '<div class="clearfix" style="text-align:center; " >';
		content += '<div class="float_l couser" style="font-size:1.3em; padding-left:7px">My Submissions</div><div class="float_r couser" style="font-size:1.3em; padding-right:7px"><a href="'+here_url+'">Close [X]</a></div>';
		
		content += '<img src="'+ resp.user_photos[image].urls.original +'" width="700" />';
		content += '<div class="coanswer co_user_caption">'+ resp.user_photos[image].caption +'</div>';
		
	for(i=0;i<=resp.user_photos.length-1;i++){
	
		content += '<div class="co_user_thumb"><a href="'+here_url+'?ms=true&image='+i+'"><img src="'+ resp.user_photos[i].urls.thumbnail +'"  /></a></div>';
	    					   		
	}
	
	content += '</div>';
	content += '</div>';
	
	$('#ms_container').html(content);
	content =  '';

}