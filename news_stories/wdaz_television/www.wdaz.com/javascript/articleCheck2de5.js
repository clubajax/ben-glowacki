function checkArticleCookies(newspaper_id,newspaper_url){
        var iframe = document.createElement("iframe");
        iframe.setAttribute("src", "httpp://tracking.fccinteractive.com/user_tracking/index.php?newspaper_id="+newspaper_id+"&newspaper_url="+newspaper_url+"&desturl="+window.location.href);
        iframe.style.display = 'none';
        document.getElementById('articleCheck').appendChild(iframe);
}
function checkArticleLogIn(){
        var iframe = document.createElement("iframe");
        iframe.setAttribute("src", "httpp://tracking.fccinteractive.com/user_tracking/login.php");
        iframe.style.display = 'none';
        document.getElementById('articleCheckLogin').appendChild(iframe);
}
function checkArticleLogOut(){
        var iframe = document.createElement("iframe");
        iframe.setAttribute("src", "httpp://tracking.fccinteractive.com/user_tracking/logout.php");
        iframe.style.display = 'none';		
        document.getElementById('articleCheckLogout').appendChild(iframe);
}

