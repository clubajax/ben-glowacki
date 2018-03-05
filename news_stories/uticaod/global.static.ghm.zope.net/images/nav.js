    var current;
    var upperTier;
	var current_sub;
	var current_mouse;
	var current_level;
	var current_sub;
	var navCount = 0;
	var t;
	
	function HideAll3Tier(current,upper){
		var Tier3ul = "nav3Tier_" + current + "_" + upper;
		//upperTier = upper;
	}
	
	function HideAllChildren(show){
	
     current_mouse = show;
     closeAll();
	 if(document.getElementById('navchildCont_' + show)){
	  document.getElementById('navchildCont_' + show).style.display = "block";
	 }
	  $('#navhref_' + show).addClass("current");
	  clearTimeout(t);
	}
	
	function ShowCurrent(){t=setTimeout("settimer()",1000);}
	
	function settimer(){ 
	 closeAll();
	  if(document.getElementById('navchildCont_' + current)){
	    document.getElementById('navchildCont_' + current).style.display = "block";
	    $('#navhref_' + current).addClass("current")
	  }else{ }
	  HideAllChildren(current);
	}
	
	function closeAll(){
	 for(i=0;i<=navCount;i++){
	  if (document.getElementById('navchildCont_' + i)){
	   document.getElementById('navchildCont_' + i).style.display = "none";
	  }
	  if (document.getElementById('navhref_' + i) && current != i){
	   $('#navhref_' + i).removeClass("current");
	  }
	 }
	}
	
	function ShowSub(loc){
		current_sub = loc;
		$('#navchildAnc_' + loc + '_' + current).addClass("current")
		if(document.getElementById('nav3Tier_' + current + '_' + loc)){
		 //show 3rd tier navigation 
		 document.getElementById('nav3Tier_' + current + '_' + loc).style.display = "block";
		 upperTier = loc;
		}
	}
	
	var URLBuild = "http://";
	
	function findLocationURL(browserURL){
		var URL = browserURL.split("/");
		
        for(i=2;i<=URL.length-1;i++){
	        URLBuild += URL[i] + '/';
	        var URLBuildmin = URLBuild.substring(0, URLBuild.length-1);
	        //alert(URLBuild)
	        for(u=2;u<=navCount;u++){
		        if (document.getElementById('navhref_' + u)){
			        if(document.getElementById('navhref_' + u).href == URLBuild || document.getElementById('navhref_' + u).href == URLBuildmin){
				        current = u;
			        }
		        }
		        for(s=0;s<=15;s++){
		            var anc = document.getElementById('navchildAnc_' + s + '_' + current);
			        if (anc){
				        if(anc.href == URLBuild || anc.href == URLBuildmin){
				           current_sub = s;
					       ShowSub(s);
					       break;
				        }
			        }
		        }
		        
		        for(s=0;s<=15;s++){
		          var anc = document.getElementById('nav3TierAnc_' + current + "_" + upperTier + "_" + s);
			        if (anc && upperTier){
				        if(anc.href == URLBuild || anc.href == URLBuildmin){
				          var second = document.getElementById('navchildAnc_' + current_sub + '_' + current).innerHTML;
				          document.getElementById('third_tier_title').innerHTML = "More in " + second +":";
					      $('#nav3TierAnc_' + current + "_" + upperTier + "_" + s).addClass("currentTier")
					      break;
				        }
			        }
		        }
	        }
		}
		
      HideAllChildren(current);
	}

	function subnav(){
	  var loc = location.href;
      findLocationURL(loc);
	}
