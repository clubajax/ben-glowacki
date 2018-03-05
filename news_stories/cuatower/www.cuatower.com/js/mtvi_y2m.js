/*Build Date: Tue Feb 26, 2008 17:46:52*/var com = {
	mtvi : {
		util : {},
		logger : {},
		config : {},
		ads : {},
		reporting : {}
	}
};
String.prototype.trim = function() {
	return this.replace(/^\\s+|\\s+$/g, '');
};
String.prototype.chop = function(n) {
	if (isNaN(n)) {
		n = this.length - 1;
	}
	return this.substring(0, n);
};
String.prototype.ucFirst = function() {
	return this.charAt(0).toUpperCase() + this.substr(1, this.length);
};
document.getElementsByClassName = function(str) {
	var nodes = [];
	var name = new RegExp('\\b' + str + '\\b');
	var elems = this.getElementsByTagName('*');
	for ( var i = 0; i < elems.length; i++) {
		if (name.test(elems[i].className)) {
			nodes.push(elems[i])
		}
		;
	}
	return nodes;
};
Math.getRnd = function(a_numA, a_numB) {
	if (!com.mtvi.util.isDefined(a_numA) || isNaN(a_numA)
			|| parseInt(a_numA) < 0) {
		a_numA = 1;
	}
	if (!com.mtvi.util.isDefined(a_numB) || isNaN(a_numB)
			|| parseInt(a_numB) < 0) {
		a_numB = 0;
	}
	if (a_numA < a_numB) {
		var tempNum = a_numA;
		a_numA = a_numB;
		a_numB = tempNum;
	}
	return (parseInt(Math.random() * (a_numA - a_numB + 1) + a_numB));
};
bindLinkEvent = function(d, l, t) {
	var linkName = com.mtvi.util.crawlNodes(l);
	linkName = linkName ? linkName : l.href;
	return function() {
		d.sendLinkEvent(l, l.href, t);
	};
};
com.mtvi.util = {
	isDefined : function(v) {
		if (typeof v === 'undefined' || v === null || v === ''
				|| v === 'undefined') {
			return false;
		} else {
			return true;
		}
	},
	stringToObject : function(s, d) {
		try {
			var o = {};
			var d = d ? d : ",";
			var s = s.split(d);
			for ( var i = 0; i < s.length; i++) {
				var p = s[i].split('=');
				o[p[0]] = p[1];
			}
			return o;
		} catch (e) {
		}
	},
	objectToString : function(o) {
		try {
			var a = [];
			for ( var i in o) {
				if (typeof o[i] == 'string') {
					a.push(i + '=' + o[i]);
				}
			}
			return a.join(',');
		} catch (e) {
		}
	},
	queryStringToHash : function(str) {
		try {
			var qs = [];
			var a = str.indexOf("?") > -1 ? str.split("?")[1].split("&") : str
					.split("&");
			for ( var x = 0; x < a.length; x++) {
				var b = a[x].split("=");
				qs[b[0]] = b[1];
			}
			return qs;
		} catch (e) {
		}
	},
	addOnloadEvent : function(func) {
		try {
			if (window.attachEvent) {
				window.attachEvent("onload", func);
			}
			if (window.addEventListener) {
				window.addEventListener("load", func, false);
			}
			return this;
		} catch (e) {
		}
	},
	setProperties : function(o) {
		try {
			for ( var i in o.properties) {
				if (typeof o[i] != "object") {
					var name = i.ucFirst();
					eval("o.get" + name
							+ "=function(){return this.properties['" + i
							+ "'];}");
					eval("o.set" + name + "=function(v){this.properties['" + i
							+ "']=com.mtvi.util.isDefined(v)?v:'';}");
				}
			}
		} catch (e) {
			try {
				com.mtvi.logger.JsError(e);
			} catch (e) {
			}
		}
	},
	readCookie : function(name) {
		try {
			var name = name + "=";
			var ca = document.cookie.split(';');
			for ( var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1, c.length)
				}
				;
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length)
				}
				;
			}
			return null;
		} catch (e) {
		}
	},
	setCookie : function(name, value) {
		try {
			document.cookie = name + "=" + value + "; path=/";
		} catch (e) {
		}
	},
	debug : function(msg) {
		try {
			var c = document.getElementById("debug");
			if (!c) {
				c = document.createElement("div");
				c.setAttribute("id", "debug");
				document.getElementsByTagName("body")[0].appendChild(c);
			}
			c.innerHTML = c.innerHTML + msg + "<br>";
		} catch (e) {
		}
	},
	trace : function(msg) {
		try {
			if (com_mtvi_debug) {
				document.write(msg + "<br>");
			}
		} catch (e) {
		}
		try {
			if (this.debugOn) {
				document.write(msg + "<br>");
			}
		} catch (e) {
		}
	},
	setDebugOn : function() {
		this.debugOn = true;
	},
	crawlNodes : function(node) {
		var linkName = null;
		for ( var c = 0; c < node.childNodes.length; c++) {
			var childnode = node.childNodes[c];
			switch (childnode.nodeType) {
			case 3:
				return childnode.nodeValue;
				break;
			case 1:
				if (childnode.title) {
					linkName = childnode.title;
				} else if (childnode.alt) {
					linkName = childnode.alt;
				}
				break;
			}
			;
		}
		return linkName;
	}
};
com.mtvi.logger = {
	url :"http://viarnd.112.2o7.net/b/ss/viarnd/1/EMAIL?",
	send : function(src) {
		if (MTVi.util.isDefined(msg)) {
			var img = new Image();
			img.src = src;
		}
	},
	JsError : function(e) {
		try {
			var map = {
				message :'c21',
				name :'c22',
				stack :'c23'
			};
			var msg = this.url + "pageName=JS_ER-" + window.location;
			if (!MTVi.util.isDefined(e.stack)) {
				e.stack = window.location.href;
			}
			for ( var i in map) {
				if (MTVi.util.isDefined(e[i])) {
					msg += "&" + map[i] + "=" + e[i];
				}
			}
			this.send(msg);
		} catch (e) {
			try {
				this.send(this.url + "pageName=JS_ER-"
						+ "com.mtvi.logger error:" + e.message);
			} catch (e) {
			}
		}
	}
};
com.mtvi.metadata = {
	getSections : function() {
		var retVal = "";
		try {
			retVal = self.location.pathname;
			if (com.mtvi.util.isDefined(retVal) && typeof (retVal) === "string") {
				if (retVal.lastIndexOf("/") == (retVal.length - 1)) {
					retVal += "index";
				}
				if (retVal.indexOf("/") == 0) {
					retVal = retVal.substring(1);
				}
				if (retVal.indexOf(".") != -1) {
					retVal = retVal.substring(0, retVal.indexOf("."));
				}
			}
		} catch (e) {
			try {
				com.mtvi.logger.JsError(e);
				return false;
			} catch (e) {
				return false;
			}
		}
		return retVal;
	}
};
var s = null;
com.mtvi.reporting.Widget = {};
com.mtvi.reporting.Widget.init = function() {
	this.extCode = s = s_gi(com.mtvi.reporting.Account.name);
	this.extCode.getNewRepeat = new Function(
			""
					+ "var s=this,e=new Date(),cval,ct=e.getTime(),y=e.getYear();e.setTime"
					+ "(ct+30*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w("
					+ "'s_nr',ct,e);return 'New';}if(cval.length!=0&&ct-cval<30*60*1000){s"
					+ ".c_w('s_nr',ct,e);return 'New';}if(cval<1123916400001){e.setTime(cv"
					+ "al+30*24*60*60*1000);s.c_w('s_nr',ct,e);return 'Repeat';}else retur"
					+ "n 'Repeat';");
};
com.mtvi.reporting.Widget.setAttribute = function(k, v) {
	try {
		if (com.mtvi.util.isDefined(k)) {
			this.extCode[k] = com.mtvi.util.isDefined(v) ? v : '';
		}
	} catch (e) {
	}
};
com.mtvi.reporting.Widget.getAttribute = function(k) {
	try {
		if (com.mtvi.util.isDefined(k)) {
			return this.extCode[k];
		} else {
			return;
		}
	} catch (e) {
	}
};
com.mtvi.reporting.Widget.setAccount = function(v) {
	try {
		this.setAttribute("un", v);
	} catch (e) {
	}
};
com.mtvi.reporting.Widget.getAccount = function(v) {
	try {
		this.getAttribute("un");
	} catch (e) {
	}
};
com.mtvi.reporting.Widget.appendCall = function(s) {
	try {
		document
				.write('<div style="display:none;" id="s_code_alt">' + s + '</div>');
	} catch (e) {
	}
};
try {
	document
			.write('<div style="position:absolute; visibility:hidden; width:1px; height:1px; border:0px; top:-100px; left:-100px" id="urchin"></div>');
} catch (e) {
};
var s_objectID;
function s_c2fe(f) {
	var x = '', s = 0, e, a, b, c;
	while (1) {
		e = f.indexOf('"', s);
		b = f.indexOf('\\', s);
		c = f.indexOf("\n", s);
		if (e < 0 || (b >= 0 && b < e))
			e = b;
		if (e < 0 || (c >= 0 && c < e))
			e = c;
		if (e >= 0) {
			x += (e > s ? f.substring(s, e) : '')
					+ (e == c ? '\\n' : '\\' + f.substring(e, e + 1));
			s = e + 1
		} else
			return x + f.substring(s)
	}
	return f
}
function s_c2fa(f) {
	var s = f.indexOf('(') + 1, e = f.indexOf(')'), a = '', c;
	while (s >= 0 && s < e) {
		c = f.substring(s, s + 1);
		if (c == ',')
			a += '","';
		else if (("\n\r\t ").indexOf(c) < 0)
			a += c;
		s++
	}
	return a ? '"' + a + '"' : a
}
function s_c2f(cc) {
	cc = '' + cc;
	var fc = 'var f=new Function(', s = cc.indexOf(';', cc.indexOf('{')), e = cc
			.lastIndexOf('}'), o, a, d, q, c, f, h, x;
	fc += s_c2fa(cc) + ',"var s=new Object;';
	c = cc.substring(s + 1, e);
	s = c.indexOf('function');
	while (s >= 0) {
		d = 1;
		q = '';
		x = 0;
		f = c.substring(s);
		a = s_c2fa(f);
		e = o = c.indexOf('{', s);
		e++;
		while (d > 0) {
			h = c.substring(e, e + 1);
			if (q) {
				if (h == q && !x)
					q = '';
				if (h == '\\')
					x = x ? 0 : 1;
				else
					x = 0
			} else {
				if (h == '"' || h == "'")
					q = h;
				if (h == '{')
					d++;
				if (h == '}')
					d--
			}
			if (d > 0)
				e++
		}
		c = c.substring(0, s) + 'new Function(' + (a ? a + ',' : '') + '"'
				+ s_c2fe(c.substring(o + 1, e)) + '")' + c.substring(e + 1);
		s = c.indexOf('function')
	}
	fc += s_c2fe(c) + ';return s");';
	eval(fc);
	return f;
}
function s_gi(un, pg, ss) {
	var c = "function s_c(un,pg,s"
			+ "s){var s=this;s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s."
			+ "wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.w"
			+ "d.s_c_in++;s.m=function(m){return (''+m).indexOf('{')<0};s.fl=funct"
			+ "ion(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){if(!o)r"
			+ "eturn o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.i"
			+ "ndexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for"
			+ "(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1"
			+ "))<0)return 0;return 1};s.rep=function(x,o,n){var i=x.indexOf(o),l="
			+ "n.length>0?n.length:1;while(x&&i>=0){x=x.substring(0,i)+n+x.substri"
			+ "ng(i+o.length);i=x.indexOf(o,i+l)}return x};s.ape=function(x){var s"
			+ "=this,i;x=x?s.rep(escape(''+x),'+','%2B'):x;if(x&&s.charSet&&s.em=="
			+ "1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>="
			+ "0){i++;if(('89ABCDEFabcdef').indexOf(x.substring(i,i+1))>=0)return "
			+ "x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}return x}"
			+ ";s.epa=function(x){var s=this;return x?unescape(s.rep(''+x,'+',' ')"
			+ "):x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.ind"
			+ "exOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s.m(f)?s[f](t,a):f(t,"
			+ "a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.leng"
			+ "th?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0"
			+ ")a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);retu"
			+ "rn (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf"
			+ "',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s"
			+ "=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.c_d='';s.c_gdf=f"
			+ "unction(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=func"
			+ "tion(){var s=this,d=s.wd.location.hostname,n=s.cookieDomainPeriods,"
			+ "p;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');wh"
			+ "ile(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','"
			+ "c_gdf',0)?d.substring(p):''}return s.c_d};s.c_r=function(k){var s=t"
			+ "his;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:"
			+ "c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.leng"
			+ "th:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s"
			+ ".c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if("
			+ "e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=n"
			+ "ew Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cooki"
			+ "e=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expir"
			+ "es='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k"
			+ ")==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in"
			+ ",n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n"
			+ "<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l"
			+ "[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x."
			+ "o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r;"
			+ "if(s.isie&&a.apv>=5)eval('try{r=s.m(f)?s[f](a):f(a)}catch(e){r=s.m("
			+ "t)?s[t](e):t(e)}');else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s.m("
			+ "b)?s[b](a):b(a);else{s.eh(s.wd,'onerror',0,o);r=s.m(f)?s[f](a):f(a)"
			+ ";s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;"
			+ "return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'];s."
			+ "eh(window,\"onerror\",1);s.etfs=1;var c=s.t();if(c)s.d.write(c);s.e"
			+ "tfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=fun"
			+ "ction(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.locatio"
			+ "n!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return"
			+ " s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.et"
			+ "fs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.t"
			+ "fs};s.ca=function(){var s=this,imn='s_i_'+s.fun;if(s.d.images&&s.ap"
			+ "v>=3&&!s.isopera&&(s.ns6<0||s.apv>=6.1)){s.ios=1;if(!s.d.images[imn"
			+ "]&&(!s.isns||(s.apv<4||s.apv>=5))){s.d.write('<div style=\"display:none;\" id=\"s_code\"><im'+'g name=\"'+imn+"
			+ "'\" height=1 width=1 border=0 alt=\"\"></div>');if(!s.d.images[imn])s.ios"
			+ "=0}}};s.mr=function(sess,q,ta){var s=this,ns=s.visitorNamespace,unc"
			+ "=s.rep(s.fun,'_','-'),imn='s_i_'+s.fun,im,b,e,rs='http'+(s.ssl?'s':"
			+ "'')+'://'+(ns?ns:(s.ssl?'102':unc))+'.112.2O7.net/b/ss/'+s.un+'/1/H"
			+ ".1-pdv-2/'+sess+'?[AQB]&ndh=1'+(q?q:'')+(s.q?s.q:'')+'&[AQE]';if(s."
			+ "isie&&!s.ismac){if(s.apv>5.5)rs=s.fl(rs,4095);else rs=s.fl(rs,2047)"
			+ "}if(s.ios){im=s.wd[imn]?s.wd[imn]:s.d.images[imn];if(!im)im=s.wd[im"
			+ "n]=new Image;im.src=rs;if(rs.indexOf('&pe=')>=0&&(!ta||ta=='_self'|"
			+ "|ta=='_top'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(e.getT"
			+ "ime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c="
			+ "\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){v"
			+ "ar s=this;return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0"
			+ ",2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=f"
			+ "unction(v){var s=this;s.pt(v,',','glf',0)};s.gv=function(v){var s=t"
			+ "his;return s['vpm_'+v]?s['vpv_'+v]:s[v]};s.havf=function(t,a){var s"
			+ "=this,b=t.substring(0,4),x=t.substring(4),n=parseInt(x),k='g_'+t,m="
			+ "'vpm_'+t,q=t,v=s.linkTrackVars,e=s.linkTrackEvents;s[k]=s.gv(t);if("
			+ "s.lnk||s.eo){v=v?v+','+s.vl_l:'';if(v&&!s.pt(v,',','isf',t))s[k]=''"
			+ ";if(t=='events'&&e)s[k]=s.fs(s[k],e)}s[m]=0;if(t=='pageURL')q='g';e"
			+ "lse if(t=='referrer')q='r';else if(t=='charSet'){q='ce';if(s[k]&&s."
			+ "em==2)s[k]='UTF-8'}else if(t=='visitorNamespace')q='ns';else if(t=="
			+ "'cookieDomainPeriods')q='cdp';else if(t=='cookieLifetime')q='cl';el"
			+ "se if(t=='visitVariableProvider')q='vvp';else if(t=='currencyCode')"
			+ "q='cc';else if(t=='channel')q='ch';else if(t=='campaign')q='v0';els"
			+ "e if(s.num(x)) {if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else"
			+ " if(b=='hier'){q='h'+n;s[k]=s.fl(s[k],255)}}if(s[k]&&t!='linkName'&"
			+ "&t!='linkType')s.qav+='&'+q+'='+s.ape(s[k]);return ''};s.hav=functi"
			+ "on(){var s=this;s.qav='';s.pt(s.vl_t,',','havf',0);return s.qav};s."
			+ "lnf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var"
			+ " te=t.indexOf('=');if(t&&te>0&&h.indexOf(t.substring(te+1))>=0)retu"
			+ "rn t.substring(0,te);return ''};s.ln=function(h){var s=this,n=s.lin"
			+ "kNames;if(n)return s.pt(n,',','lnf',h);return ''};s.ltdf=function(t"
			+ ",h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf("
			+ "'?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.leng"
			+ "th+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLower"
			+ "Case():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;ret"
			+ "urn 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef="
			+ "s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.lo"
			+ "cation.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.p"
			+ "t(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&(lef||lif)&"
			+ "&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))re"
			+ "turn 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],"
			+ "b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return"
			+ " this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._"
			+ "in+'];if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e"
			+ ".srcElement:e.target;s.t();s.eo=0');s.ot=function(o){var a=o.type,b"
			+ "=o.tagName;return (a&&a.toUpperCase?a:b&&b.toUpperCase?b:o.href?'A'"
			+ ":'').toUpperCase()};s.oid=function(o){var s=this,t=s.ot(o),p=o.prot"
			+ "ocol,c=o.onclick,n='',x=0;if(!o.s_oid){if(o.href&&(t=='A'||t=='AREA"
			+ "')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=o.href;else"
			+ " if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t"
			+ "\",''),' ','');x=2}else if(o.value&&(t=='INPUT'||t=='SUBMIT')){n=o."
			+ "value;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,10"
			+ "0);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t."
			+ "indexOf('='),u=e>=0?','+t.substring(0,e)+',':'';return u&&u.indexOf"
			+ "(','+un+',')>=0?s.epa(t.substring(e+1)):''};s.rq=function(un){var s"
			+ "=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'"
			+ "&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s="
			+ "this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';"
			+ "if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function"
			+ "(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this"
			+ ",k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq["
			+ "q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.sq"
			+ "u)s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&"
			+ "s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}retu"
			+ "rn s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r="
			+ "true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d"
			+ ".links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";"
			+ "if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf"
			+ "(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function("
			+ "){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b"
			+ ".attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEv"
			+ "entListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd"
			+ ",'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSamplin"
			+ "g,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),"
			+ "e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=1"
			+ "00;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}retur"
			+ "n 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;retur"
			+ "n 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if("
			+ "i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','d"
			+ "yasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynami"
			+ "cAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,"
			+ "i;s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLo"
			+ "werCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dy"
			+ "asf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substri"
			+ "ng(0,i)};s.t=function(){var s=this,trk=1,tm=new Date,sed=Math&&Math"
			+ ".random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess="
			+ "'s'+Math.floor(tm.getTime()/10800000)%10+sed,yr=tm.getYear(),vt=tm."
			+ "getDate()+'/'+tm.getMonth()+'/'+(yr<1900?yr+1900:yr)+' '+tm.getHour"
			+ "s()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm."
			+ "getTimezoneOffset(),tfs=s.gtfs(),ta='',q='',qs='';s.uns();if(!s.q){"
			+ "var tl=tfs.location,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w"
			+ "('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(s.apv>=4)x=screen."
			+ "width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){j='1.1';"
			+ "v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){j='1.2';c=screen.pixelDept"
			+ "h;bw=s.wd.innerWidth;bh=s.wd.innerHeight;if(s.apv>=4.06)j='1.3'}}s."
			+ "pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y'"
			+ ":'N';j='1.2';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElemen"
			+ "t.offsetWidth;bh=s.d.documentElement.offsetHeight;j='1.3';if(!s.ism"
			+ "ac&&s.b){s.b.addBehavior('#default#homePage');hp=s.b.isHomePage(tl)"
			+ "?\"Y\":\"N\";s.b.addBehavior('#default#clientCaps');ct=s.b.connecti"
			+ "onType}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.p"
			+ "l[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.q=(x?'&s='+s.ap"
			+ "e(x):'')+(c?'&c='+s.ape(c):'')+(j?'&j='+j:'')+(v?'&v='+v:'')+(k?'&k"
			+ "='+k:'')+(bw?'&bw='+bw:'')+(bh?'&bh='+bh:'')+(ct?'&ct='+s.ape(ct):'"
			+ "')+(hp?'&hp='+hp:'')+(p?'&p='+s.ape(p):'')}if(s.usePlugins)s.doPlug"
			+ "ins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s."
			+ "pageURL=s.fl(l?l:'',255);if(!s.referrer)s.referrer=s.fl(r?r:'',255)"
			+ ";if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return '';var p=s.gv('"
			+ "pageName'),w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o="
			+ "=s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o."
			+ "parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s_oidt}oc=o.onc"
			+ "lick?''+o.onclick:'';if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_"
			+ "oc(\")<0)||oc.indexOf(\".tl(\")>=0)return ''}ta=o.target;h=o.href?o"
			+ ".href:'';i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substri"
			+ "ng(0,i);l=s.linkName?s.linkName:s.ln(h);t=s.linkType?s.linkType.toL"
			+ "owerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||t=='e'?s.ape"
			+ "(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk"
			+ "=0;if(s.trackInlineStats){if(!p){p=s.gv('pageURL');w=0}t=s.ot(o);i="
			+ "o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&"
			+ "&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape"
			+ "(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}if"
			+ "(!trk&&!qs)return '';var code='';if(trk&&s.vs(sed))code=s.mr(sess,("
			+ "vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq(s.un)),ta);s.sq(trk?''"
			+ ":qs);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID='';return cod"
			+ "e};s.tl=function(o,t,n){var s=this;s.lnk=s.co(o);s.linkType=t;s.lin"
			+ "kName=n;s.t()};s.ssl=(s.wd.location.protocol.toLowerCase().indexOf("
			+ "'https')>=0);s.d=document;s.b=s.d.body;s.n=navigator;s.u=s.n.userAg"
			+ "ent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVe"
			+ "rsion,ie=v.indexOf('MSIE '),i;if(v.indexOf('Opera')>=0||s.u.indexOf"
			+ "('Opera')>=0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer'"
			+ ");s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.in"
			+ "dexOf('Mac')>=0);if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s."
			+ "apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.subs"
			+ "tring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(String.fromChar"
			+ "Code){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C"
			+ "4%80'?2:(i=='%U0100'?1:0))}s.un=un;s.uns();s.vl_l='charSet,visitorN"
			+ "amespace,cookieDomainPeriods,cookieLifetime,visitVariableProvider,p"
			+ "ageName,pageURL,referrer,currencyCode,purchaseID';s.vl_t=s.vl_l+',c"
			+ "hannel,server,pageType,campaign,state,zip,events,products,linkName,"
			+ "linkType';for(var n=1;n<51;n++)s.vl_t+=',prop'+n+',eVar'+n+',hier'+"
			+ "n;s.vl_g=s.vl_t+',trackDownloadLinks,trackExternalLinks,trackInline"
			+ "Stats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilter"
			+ "s,linkInternalFilters,linkNames';if(pg)s.gl(s.vl_g);if(!ss){s.wds()"
			+ ";s.ca()}}", l = window.s_c_il, n = navigator, u = n.userAgent, v = n.appVersion, e = v
			.indexOf('MSIE '), m = u.indexOf('Netscape6/'), a, i, s;
	if (l)
		for (i = 0; i < l.length; i++) {
			s = l[i];
			s.uns();
			if (s.un == un)
				return s;
			else if (s.pt(s.un, ',', 'isf', un)) {
				s = s.co(s);
				s.un = un;
				s.uns();
				return s
			}
		}
	if (e > 0) {
		a = parseInt(i = v.substring(e + 5));
		if (a > 3)
			a = parseFloat(i)
	} else if (m > 0)
		a = parseFloat(u.substring(m + 10));
	else
		a = parseFloat(v);
	if (a >= 5 && v.indexOf('Opera') < 0 && u.indexOf('Opera') < 0) {
		eval(c);
		return new s_c(un, pg, ss)
	} else
		s = s_c2f(c);
	return s(un, pg, ss)
}
com.mtvi.reporting.Dispatcher = function() {
	try {
		this.version = "2.0";
		this.sendResults = null;
		this.widget = com.mtvi.reporting.Widget;
		this.widget.init();
		this.setAccountVars(com.mtvi.reporting.Account);
	} catch (e) {
	}
};
com.mtvi.reporting.Dispatcher.prototype = {
	send : function() {
		try {
			if (com.mtvi.util.isDefined(this.widget.extCode.un)) {
				var hcode = this.widget.extCode.t();
				return true;
			}
		} catch (e) {
			try {
				com.mtvi.logger.JsError(e);
				return false;
			} catch (e) {
				return false;
			}
		}
	},
	getNewRepeat : function() {
		try {
			return this.widget.extCode.getNewRepeat();
		} catch (e) {
		}
	},
	setNewRepeat : function() {
		try {
			this.widget.setAttribute("prop41", this.widget.extCode
					.getNewRepeat());
		} catch (e) {
		}
	},
	setAccountVars : function(o) {
		try {
			this.widget.setAccount(o.name);
			this.widget.setAttribute("dynamicAccountSelection", o.dynamic);
			this.widget.setAttribute("dynamicAccountList", o.list);
			this.widget.setAttribute("linkInternalFilters", o.filters);
			for ( var i in o) {
				this.widget.setAttribute(i, o[i]);
			}
			;
		} catch (e) {
		}
	},
	setValues : function(o) {
		try {
			for ( var i in o) {
				this.widget.setAttribute(i, o[i]);
			}
		} catch (e) {
		}
	},
	config : function() {
		try {
			this.setAccountVars(com.mtvi.reporting.Account);
		} catch (e) {
		}
		try {
			this.setValues(com.mtvi.reporting.Map());
		} catch (e) {
		}
		try {
			this.setValues(com.mtvi.reporting.Defaultvalues());
		} catch (e) {
		}
	},
	sendCall : function() {
		try {
			try {
				this.setValues(com.mtvi.reporting.Map());
			} catch (e) {
			}
			try {
				this.setNewRepeat();
			} catch (e) {
			}
			try {
				this.setValues(com.mtvi.config.SectionSetup);
			} catch (e) {
			}
			try {
				com.mtvi.reporting.GoogleAnalytics.makeCall("urchin",
						this.widget.getAttribute("pageName"));
			} catch (e) {
			}
			return this.send();
		} catch (e) {
			try {
				com.mtvi.logger.JsError(e);
				return false;
			} catch (e) {
				return false;
			}
		}
	},
	setDefaultData : function() {
		try {
			var ch = (typeof this.getAttribute("channel") != "undefined") ? this
					.getAttribute("channel")
					: false;
			var pn = location.pathname.substring(1) + location.search;
			if (pn.charAt(pn.length - 1) == "/")
				pn = pn.substring(0, pn.length - 1);
			if (ch && pn.substring(0, ch.length) != ch)
				pn = ch + "/" + pn;
			this.widget.setAttribute("pageName", pn);
			this.widget.setAttribute("hier1", pn);
		} catch (e) {
			try {
				com.mtvi.logger.JsError(e);
			} catch (e) {
			}
		}
	},
	sendThirdPartyCall : function() {
		try {
			this.setAccountVars(com.mtvi.config.Get);
			this.setThirdPartyData();
			try {
				this.setValues(com.mtvi.reporting.Map());
			} catch (e) {
			}
			this.send();
		} catch (e) {
			try {
				com.mtvi.logger.JsError(e);
			} catch (e) {
			}
		}
	},
	sendLinkEvent : function(data) {
		try {
			this.config();
			this.setAttribute('linkType', data.linkType ? data.linkType : "o");
			this.setAttribute('linkName', data.linkName);
			this.setAttribute('lnk', data.lnk ? this.widget.extCode
					.co(data.lnk) : true);
			this.send();
		} catch (e) {
			try {
				com.mtvi.logger.JsError(e);
			} catch (e) {
			}
		}
	},
	getBaseUrl : function() {
		try {
			this.config();
			var vendorUrl = ".112.2o7.net/b/ss/";
			return ("http" + (this.widget.extCode.ssl ? 's' : '') + "://"
					+ this.widget.extCode.un + vendorUrl
					+ this.widget.extCode.un + "/1/");
		} catch (e) {
			try {
				com.mtvi.logger.JsError(e);
			} catch (e) {
			}
		}
	},
	sendFailedSearch : function(v) {
		try {
			if (com.mtvi.util.isDefined(v)) {
				var aImg = document.createElement('img');
				aImg.src = this.getBaseUrl()
						+ "EMAIL?pageName=FAILED+SEARCH&v4=" + v;
				aImg.id = "failedSearchCall";
				document.getElementsByTagName('body')[0].appendChild(aImg);
			}
		} catch (e) {
			try {
				com.mtvi.logger.JsError(e);
			} catch (e) {
			}
		}
	},
	replacePathSection : function(path, newValue, replaceAt) {
		try {
			var pathParts = (path.charAt(0) != "/") ? path.split("/") : path
					.substring(1).split("/");
			if (isNaN(replaceAt) || replaceAt >= pathParts.length) {
				return false;
			}
			pathParts[replaceAt] = newValue;
			var newPath = pathParts.join("/");
			return newPath;
		} catch (e) {
			try {
				com.mtvi.logger.JsError(e);
				return false;
			} catch (e) {
				return false;
			}
		}
	},
	deletePathSection : function(path, removeAt) {
		try {
			var pathParts = (path.charAt(0) != "/") ? path.split("/") : path
					.substring(1).split("/");
			if (isNaN(removeAt) || removeAt >= pathParts.length) {
				return false;
			}
			pathParts.splice(removeAt, 1);
			var newPath = pathParts.join("/");
			return newPath;
		} catch (e) {
			try {
				com.mtvi.logger.JsError(e);
				return false;
			} catch (e) {
				return false;
			}
		}
	},
	getPathSection : function(path, getAt) {
		try {
			var pathParts = (path.charAt(0) != "/") ? path.split("/") : path
					.substring(1).split("/");
			if (isNaN(getAt) || getAt >= pathParts.length) {
				return false;
			}
			;
			return pathParts[getAt];
		} catch (e) {
			try {
				com.mtvi.logger.JsError(e);
				return false;
			} catch (e) {
				return false;
			}
		}
	},
	clearProps : function(path, removeAt) {
		try {
			for ( var p = 1; p <= 50; p++) {
				this.widget.setAttribute("prop" + p, "");
			}
		} catch (e) {
			try {
				com.mtvi.logger.JsError(e);
				return false;
			} catch (e) {
				return false;
			}
		}
	},
	registerLinks : function() {
		var links = document.getElementsByTagName("a");
		var domain = location.hostname;
		for ( var l = 0; l < links.length; l++) {
			var thisLink = links[l];
			if (typeof thisLink.onclick != "function") {
				var linkType = (thisLink.href.indexOf(domain) != -1
						|| thisLink.href.charAt(0) == "/" || thisLink.href
						.charAt(0) == "#") ? "o" : "e";
				thisLink.onclick = bindLinkEvent(this, thisLink, linkType);
			}
			;
		}
		;
		try {
		} catch (e) {
			try {
				com.mtvi.logger.JsError(e);
				return false;
			} catch (e) {
				return false;
			}
		}
	},
	setAttribute : function(k, v) {
		this.widget.setAttribute(k, v);
	},
	getAttribute : function(k) {
		return this.widget.getAttribute(k);
	}
};
com.mtvi.ads.AdManager = new function() {
	var isDefined = com.mtvi.util.isDefined;
	var server;
	var ssl = false;
	var dartSite;
	var defaultContentType;
	var defaultSections = com.mtvi.metadata.getSections();
	var keyValues;
	var positionThreshold;
	var ord = Math.getRnd(100000000000000000, 999999999999999999);
	var ads = {};
	var tileCounter = 0;
	this.getTile = function() {
		try {
			return ++tileCounter;
		} catch (e) {
		}
	};
	this.setServer = function(a_server) {
		try {
			server = a_server;
		} catch (e) {
		}
	};
	this.setSsl = function() {
		try {
			ssl = true;
		} catch (e) {
		}
	};
	this.setDartSite = function(a_dartSite) {
		try {
			dartSite = a_dartSite;
		} catch (e) {
		}
	};
	this.setDefaultContentType = function(a_defaultContentType) {
		try {
			defaultContentType = a_defaultContentType;
		} catch (e) {
		}
	};
	this.setDefaultSections = function(a_defaultSections) {
		try {
			defaultSections = a_defaultSections;
		} catch (e) {
		}
	};
	this.setKeyValues = function(a_keyValues) {
		try {
			keyValues = a_keyValues;
		} catch (e) {
		}
	};
	this.setPositionThreshold = function(a_positionThreshold) {
		try {
			positionThreshold = a_positionThreshold;
		} catch (e) {
		}
	};
	this.placeAd = function(a_adParametersObj) {
		try {
			var adTile = this.getTile();
			var adId = 'adObj_' + adTile;
			ads[adId] = new com.mtvi.ads.DoubleClickAd;
			ads[adId].setId(adId);
			if (isDefined(server))
				ads[adId].setServer(server);
			if (ssl === true)
				ads[adId].setSsl();
			if (isDefined(dartSite))
				ads[adId].setDartSite(dartSite);
			if (isDefined(defaultContentType))
				ads[adId].setContentType(defaultContentType);
			if (isDefined(defaultSections))
				ads[adId].setSections(defaultSections);
			if (isDefined(keyValues))
				ads[adId].setKeyValues(keyValues);
			ads[adId].setTile(adTile);
			if (isDefined(positionThreshold))
				ads[adId].setPositionThreshold(positionThreshold);
			if (isDefined(ord))
				ads[adId].setOrd(ord);
			if (typeof (a_adParametersObj) === 'object') {
				if (isDefined(a_adParametersObj.server))
					ads[adId].setServer(a_adParametersObj.server);
				if (isDefined(a_adParametersObj.ssl)
						&& a_adParametersObj.ssl === true)
					ads[adId].setSsl();
				if (isDefined(a_adParametersObj.dartSite))
					ads[adId].setDartSite(a_adParametersObj.dartSite);
				if (isDefined(a_adParametersObj.contentType))
					ads[adId].setContentType(a_adParametersObj.contentType);
				if (isDefined(a_adParametersObj.mediaType))
					ads[adId].setMediaType(a_adParametersObj.mediaType);
				if (isDefined(a_adParametersObj.sections))
					ads[adId].setSections(a_adParametersObj.sections);
				if (isDefined(a_adParametersObj.keyValues))
					ads[adId].setKeyValues(a_adParametersObj.keyValues);
				if (isDefined(a_adParametersObj.size))
					ads[adId].setSize(a_adParametersObj.size);
			}
			if (com.mtvi.util.queryStringToHash(top.location.search).mockupMode !== 'true') {
				ads[adId].placeAd();
			} else {
				ads[adId].showAdUrl();
			}
		} catch (e) {
		}
	};
};
com.mtvi.reporting.Controller = new function() {
	var isDefined = com.mtvi.util.isDefined;
	var trace = com.mtvi.util.trace;
	var config;
	var dispatcher;
	var adManager;
	var sections;
	var getSections = function() {
		try {
			return com_mtvi_sections;
		} catch (e) {
			return com.mtvi.metadata.getSections();
		}
	};
	var setSections = function(str) {
		try {
			sections = str;
		} catch (e) {
		}
	};
	var setAdManagerUrl = function() {
		try {
			trace("[setAdManagerUrl] sections: " + sections);
			adManager.setDefaultSections(sections);
		} catch (e) {
		}
	};
	var mapVars = function(data) {
		try {
			var mappedData = {};
			if (isDefined(com.mtvi.reporting.VarMap)) {
				map = com.mtvi.reporting.VarMap;
				for ( var i in map) {
					if (isDefined(data[map[i]])
							&& typeof (data[map[i]]) == "string") {
						mappedData[i] = data[map[i]];
						trace("[mapVars] " + i + "=>" + mappedData[i]);
					}
				}
			} else {
				return data;
			}
			if (isDefined(data.pageName)) {
				mappedData.pageName = data.pageName;
			}
			return mappedData;
		} catch (e) {
			return data;
		}
	};
	var makeReportingCall = function(config, data) {
		try {
			trace("[makeReportingCall] account: " + config.name);
			data = mapVars(data);
			if (isDefined(data.pageName)) {
				dispatcher.setAttribute("pageName", data.pageName);
				trace("[makeReportingCall] setting pageName: " + data.pageName);
				setSections(data.pageName);
				delete data.pageName;
			} else {
				trace("[makeReportingCall] pageName from sections: " + sections);
				dispatcher.setAttribute("pageName", sections);
			}
			dispatcher.setAccountVars(config);
			dispatcher.setValues(data);
			dispatcher.setNewRepeat();
			trace("[makeReportingCall] sections: " + sections);
			if (dispatcher.send()) {
				trace("[makeReportingCall] made reporting call");
				setAdManagerUrl();
				return true;
			} else {
				trace("[makeReportingCall] Error: Dispatcher returns false");
				return false;
			}
		} catch (e) {
		}
	};
	var makeLinkEventCall = function(config, data) {
		dispatcher.setAccountVars(config);
		if (isDefined(data.linkName)) {
			dispatcher.setAttribute('linkType', data.linkType ? data.linkType
					: "o");
			dispatcher.setAttribute('linkName', data.linkName);
			dispatcher.setAttribute('lnk', data.lnk ? dispatcher.widget.extCode
					.co(data.lnk) : true);
			dispatcher.send();
		}
	};
	var getReportingPageName = function() {
		try {
			var str = dispatcher.getAttribute('pageName');
			return str.length > 0 ? str : false;
		} catch (e) {
		}
	};
	this.initialize = function() {
		try {
			trace("[initialize] Controller starts up");
			dispatcher = new com.mtvi.reporting.Dispatcher();
			adManager = com.mtvi.ads.AdManager;
			sections = getSections();
			trace("[initialize] getSections returns: " + sections);
			setAdManagerUrl();
			try {
				if (com.mtvi.reporting.Account.registerLinks === true) {
					trace("[initialize] enabling registerLinks");
					com.mtvi.util.addOnloadEvent( function() {
						try {
							com.mtvi.reporting.Controller.registerLinks();
						} catch (e) {
						}
					});
				}
			} catch (e) {
			}
		} catch (e) {
		}
	};
	this.setConfig = function(objConfig) {
		try {
			config = objConfig;
		} catch (e) {
		}
	};
	this.sendCall = function(data) {
		try {
			if (isDefined(config)) {
				makeReportingCall(config, data);
			} else {
				makeReportingCall(com.mtvi.reporting.Account, data);
			}
		} catch (e) {
		}
	};
	this.sendLinkEvent = function(data) {
		try {
			if (isDefined(config)) {
				makeLinkEventCall(config, data);
			} else {
				makeLinkEventCall(com.mtvi.reporting.Account, data);
			}
		} catch (e) {
		}
	};
	this.registerLinks = function() {
		try {
			dispatcher.registerLinks();
		} catch (e) {
		}
	};
	this.clearReportingValues = function() {
		var clear = [ 'pageName', 'channel', 'hier1', 'hier2', 'hier3',
				'hier4', 'hier5' ];
		try {
			for ( var i = 1; i <= clear.length; i++) {
				dispatcher.setAttribute(clear[i], '');
			}
			dispatcher.clearProps();
		} catch (e) {
		}
	};
};
com.mtvi.ads.DoubleClickAd = function(params) {
	try {
		this.id;
		this.server = "ad.doubleclick.net";
		this.ssl = false;
		this.dartSite;
		this.contentType = "adj";
		this.mediaType = "standard";
		this.sections;
		this.keyValues = "";
		this.size;
		this.tile;
		this.positionThreshold;
		this.ord;
		this.additionalKeyValues = [];
		this.position;
		this.partner;
		this.exclusions = [];
		try {
			for ( var i in params) {
				if (com.mtvi.util.isDefined(params[i])
						&& typeof (params[i]) == 'string') {
					this[i] = params[i];
				}
			}
		} catch (e) {
		}
	} catch (e) {
	}
};
com.mtvi.ads.DoubleClickAd.prototype = {
	setId : function(str) {
		this.id = str;
	},
	setServer : function(str) {
		this.server = str;
	},
	setSsl : function() {
		this.ssl = true;
	},
	setDartSite : function(str) {
		this.dartSite = str;
	},
	setContentType : function(str) {
		this.contentType = str;
	},
	setMediaType : function(str) {
		this.mediaType = str;
	},
	setPosition : function(str) {
		this.position = str;
	},
	setSections : function(str) {
		try {
			this.sections = str.replace(/^\/+|\/+$/g, '');
			if (this.sections.indexOf('.') > -1) {
				this.sections = this.sections.split('.')[0];
			}
		} catch (e) {
		}
	},
	setKeyValues : function(str) {
		try {
			this.keyValues = str.replace(/^;+|;+$/g, '');
			if (this.keyValues.indexOf("mtype=") > -1) {
				this.setMediaType(this.getKeyValue("mtype="));
			}
			if (this.keyValues.indexOf("pos=") > -1) {
				this.setPosition(this.getKeyValue("pos="));
			} else if (this.keyValues.indexOf("threshold=") > -1) {
				this.setPostionThreshold(this.getKeyValue("threshold="));
			}
		} catch (e) {
		}
	},
	setSize : function(str) {
		this.size = str;
	},
	setTile : function(num) {
		this.tile = num;
	},
	setPositionThreshold : function(num) {
		try {
			if (isNaN(parseInt(num))) {
				this.positionThreshold = null;
			} else {
				this.positionThreshold = parseInt(num);
			}
		} catch (e) {
		}
	},
	setOrd : function(num) {
		this.ord = num;
	},
	setPartner : function(str) {
		this.partner = str;
	},
	addExclusionCategory : function(str) {
		try {
			str = str.replace(/^;+|;+$/g, '');
			this.exclusions.push('!category=' + str);
		} catch (e) {
		}
	},
	addKeyValues : function(str) {
		try {
			if (com.mtvi.util.isDefined(str) && str.indexOf('=') > -1) {
				this.additionalKeyValues.push(str);
			}
		} catch (e) {
		}
	},
	appendKeyValue : function(str1, str2) {
		if (!com.mtvi.util.isDefined(str1))
			str1 = "";
		if (!com.mtvi.util.isDefined(str2))
			str2 = "";
		str1 = str1.replace(/^;+|;+$/g, '');
		str2 = str2.replace(/^;+|;+$/g, '');
		if (str1.indexOf('=') > -1)
			str2 += ";" + str1;
		str2 = str2.replace(/^;+|;+$/g, '');
		return str2;
	},
	getProtocol : function() {
		try {
			return this.ssl ? 'https://' : 'http://';
		} catch (e) {
		}
	},
	getPosition : function() {
		try {
			var placement = "unk";
			if (com.mtvi.util.isDefined(this.position)) {
				if (this.position.indexOf("atf") > -1) {
					placement = "atf";
				} else if (this.position.indexOf("btf") > -1) {
					placement = "btf";
				}
			} else {
				if (com.mtvi.util.isDefined(this.positionThreshold)) {
					placement = (this.tile <= this.positionThreshold) ? "atf"
							: "btf";
				}
			}
			return placement;
		} catch (e) {
			return placement;
		}
	},
	getKeyValue : function(key) {
		try {
			var value;
			if (this.keyValues.indexOf(key) > -1) {
				var temp = this.keyValues.split(key);
				if (temp.length > 0) {
					if (temp[1].indexOf(";") > -1) {
						value = temp[1].substring(0, temp[1].indexOf(";"));
					} else {
						value = temp[1];
					}
				}
			}
			return value;
		} catch (e) {
		}
	},
	getSections : function() {
		return this.sections;
	},
	getContentTypeAbbreviation : function() {
		try {
			var abbr = "";
			if (this.contentType == "pfadx")
				abbr = "p";
			if (this.contentType == "adj")
				abbr = "j";
			if (this.contentType == "adi")
				abbr = "i";
			if (this.contentType == "adx")
				abbr = "x";
			if (this.contentType == "ad")
				abbr = "a";
			return abbr;
		} catch (e) {
		}
	},
	getExclusions : function() {
		return this.exclusions.join(';');
	},
	formatZone : function() {
		try {
			var posTypeTag = this.getPosition() + '_'
					+ this.getContentTypeAbbreviation() + '_'
					+ this.mediaType.substr(0, 1);
			var zoneValues = posTypeTag + "/";
			var secValues = this.getSections();
			if (com.mtvi.util.isDefined(this.keyValues)) {
				if (this.keyValues.indexOf("partner=") > -1) {
					var partner = this.getKeyValue("partner=");
					if (com.mtvi.util.isDefined(partner)) {
						zoneValues += partner + "/";
						this.addExclusionCategory(partner);
						this.addExclusionCategory("partner");
					} else {
						this.addKeyValue("partner=null");
					}
				}
				if (this.keyValues.indexOf("vertical=") > -1) {
					var vertical = this.getKeyValue("vertical=");
					if (com.mtvi.util.isDefined(vertical)) {
						secValues = "vert/" + vertical + "/" + secValues;
						this.setSections(secValues);
					}
				}
				if (this.keyValues.indexOf("synd=") > -1) {
					var synd = this.getKeyValue("synd=");
					if (com.mtvi.util.isDefined(synd))
						this.addExclusionCategory(synd);
				}
			}
			return zoneValues + secValues;
		} catch (e) {
		}
	},
	formatSectionValues : function() {
		try {
			var parts = this.sections.split('/');
			var count = 0;
			var sections = [];
			for (x = 0; x < parts.length; x++) {
				if (com.mtvi.util.isDefined(parts[x])) {
					sections.push('sec' + count + '=' + parts[x]);
					count++;
				}
			}
			return sections.join(';');
		} catch (e) {
		}
	},
	formatKeyValues : function() {
		try {
			var extraKeyVals = this.getAdditionalKeyValues();
			if (com.mtvi.util.isDefined(extraKeyVals)) {
				this.keyValues += ";" + extraKeyVals;
			}
			if (this.keyValues.indexOf("pos=") == -1) {
				this.keyValues += ";pos=" + this.getPosition();
			}
			if (this.keyValues.indexOf("tag=") == -1) {
				this.keyValues += ";tag=" + this.contentType;
			}
			if (this.keyValues.indexOf("mtype=") == -1) {
				this.keyValues += ";mtype=" + this.mediaType;
			}
			if (com.mtvi.util.isDefined(this.size)) {
				this.keyValues += ";sz=" + this.size;
			}
			if (this.tile >= 0) {
				this.keyValues += ";tile=" + this.tile;
			}
			if (this.exclusions.length > 0) {
				this.keyValues += ";" + this.getExclusions();
			}
			return this.keyValues.replace(/^;+|;+$/g, '');
		} catch (e) {
		}
	},
	formatUValues : function(str) {
		try {
			var uvals = str;
			uvals = uvals.replace(/;/g, '|');
			uvals = uvals.replace(/=/g, '-');
			return uvals;
		} catch (e) {
		}
	},
	getAdditionalKeyValues : function() {
		try {
			return this.additionalKeyValues.join(';');
		} catch (e) {
		}
	},
	getValues : function() {
		try {
			var zone = this.formatZone();
			var keyVals = this.formatKeyValues();
			var secVals = this.formatSectionValues();
			return {
				id :this.id,
				protocol :this.getProtocol(),
				server :this.server,
				dartSite :this.dartSite,
				contentType :this.contentType,
				mediaType :this.mediaType,
				zone :zone,
				sections :secVals,
				keyValues :keyVals,
				uValues :"u=" + this.formatUValues(keyVals),
				ord :this.ord
			};
		} catch (e) {
		}
	},
	formatUrl : function(values) {
		try {
			var target = [ values.protocol + values.server, values.contentType,
					values.dartSite, values.zone ];
			var url = target.join("/");
			var vals = [ url, values.sections ];
			if (com.mtvi.util.isDefined(values.keyValues)) {
				vals.push(values.keyValues);
			}
			if (com.mtvi.util.isDefined(values.uValues)) {
				vals.push(values.uValues);
			}
			if (values.ord > 0) {
				vals.push('ord=' + values.ord + "?");
			}
			return vals.join(";");
		} catch (e) {
		}
	},
	getUrl : function() {
		try {
			return this.formatUrl(this.getValues());
		} catch (e) {
		}
	},
	getJson : function() {
		try {
			var values = this.getValues();
			values.url = this.formatUrl(values);
			return values;
		} catch (e) {
		}
	},
	getXml : function() {
		try {
			var xml = [];
			var values = this.getValues();
			values.url = this.formatUrl(values);
			for ( var i in values) {
				if (typeof (values[i] == 'string')) {
					xml.push('<' + i + '>' + '</' + values[i] + '>');
				}
			}
			return '<doubleClickAd>' + xml.join('') + '</doubleClickAd>';
		} catch (e) {
		}
	},
	placeAd : function() {
		try {
			document.write('<scr' + 'ipt type="text/javascript" src="'
					+ this.getUrl() + '"><\/scr' + 'ipt>');
		} catch (e) {
		}
	},
	showAdUrl : function() {
		try {
			document.write(this.getUrl());
		} catch (e) {
		}
	}
};
com.mtvi.reporting.GoogleAnalytics = {
	makeCall : function(id, uri) {
		try {
			var _div = document.getElementById(id);
			var _wl = window.location;
			var _uri = uri.substring(0, 1) != "/" ? "/" + uri : uri;
			var _refer = document.referrer;
			var _ga = "//media.mtvnservices.com/metrics/ga.html?uri=";
			_refer = "&ref=" + escape(_refer);
			if (_div) {
				var newChild = document.createElement("iframe");
				newChild.src = _wl.protocol + _ga + _wl.hostname + _uri
						+ _refer;
				newChild.style.width = 1 + 'px';
				newChild.style.height = 1 + 'px';
				newChild.style.visibility = 'hidden';
				newChild.style.left = -50 + 'px';
				newChild.style.top = -50 + 'px';
				newChild.style.position = 'absolute';
				_div.appendChild(newChild);
			}
		} catch (e) {
			com.mtvi.logger.JsError(e);
		}
	}
};

/* Do not change above this line */

//comScore Patch
var __cs_c1 = 2;
var __cs_c2 = "6036034";
var __cs_c3 = "";
var __cs_c4 = location.host+location.pathname;
var __cs_c5 = "20000";
var __cs_c6 = "";
var __cs_c15 = "";
var __cs_params = ["c1=", __cs_c1, "&c2=", __cs_c2, "&c3=", __cs_c3, "&c4=", __cs_c4, "&c5=", __cs_c5, "&c6=",
__cs_c6, "&c15=", __cs_c15].join('');
document.write(unescape("%3Cscript src='" + (document.location.protocol == "https:" ? "https://sb" : "http://b") +
".scorecardresearch.com/beacon.js?" + __cs_params +"' %3E%3C/script%3E"));
