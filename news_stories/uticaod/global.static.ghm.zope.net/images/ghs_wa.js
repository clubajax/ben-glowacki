// init google_analytics
document.write(unescape('%3Cscript type="text/javascript"%3E')+
'var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");'+
'document.write(unescape("%3Cscript src=\'" + gaJsHost + "google-analytics.com/ga.js\' type=\'text/javascript\'%3E%3C/script%3E"));'+
unescape('%3C/script%3E'));



// main object
function generic_web_analytics (args) {

	// --- vendor specific functions --- //

	// debug google analytics
	this._ga_debug = function() {
		if(typeof(_gat) != 'undefined'){
			alert('Google Analytics [OKAY]');
		}
		else {
			alert('Google Analytics [FAIL]');
		}
	}
	
	// process google analytics
	this._ga_execute = function(){
		if (this.debug) {
		  this._ga_debug()
		}
		else {
			if (this.ga_site_account){
				try {
					this._ga_siteTracker = _gat._getTracker(this.ga_site_account);
					if (this.ga_cookie_domain){
					   this._ga_siteTracker._setDomainName(this.ga_cookie_domain);
					}
					else {
					   this._ga_siteTracker._setDomainName("none");
					}
					//this._ga_siteTracker._setAllowLinker(true);
					//this._ga_siteTracker._setAllowHash(false);
					this._ga_siteTracker._trackPageview();
					
					// Track article pageview event
					if (this.article_headline && this.section_name && this.zope_site_id) this._ga_siteTracker._trackEvent(this.zope_site_id, this.section_name, this.article_headline, 1);
					
					// Set linker functions if linked_domains is set
					/*
					if (this.linked_domains) {
                        elements = this._get_links_by_domains(this.linked_domains);
                        for (var i=0; i<elements.length; i++){
                            this._ga_set_linker(elements[i]);
                        }
					}
					*/
				} catch(err) {}
			}
			try {
				this._ga_globalTracker = _gat._getTracker("UA-6842750-1");
				this._ga_globalTracker._trackPageview();
				
				// Track article pageview event
				if (this.article_headline && this.section_name && this.zope_site_id) this._ga_globalTracker._trackEvent(this.zope_site_id, this.section_name, this.article_headline, 1);
			} catch(err) {}
		}

	}
	
	// Sets the linker function for the supplied anchor element
	this._ga_set_linker = function(element) {
	   if(!element.hasAttribute("onclick") && element.hasAttribute("href")){
	       var onclick_value = "_WA._ga_siteTracker._link('"+element.getAttribute("href")+"');return false;";
	       element.setAttribute("onclick", onclick_value);
	   }
	}




	// --- generic functions --- //
	
	// returns true if the provided domain matches the provided expression
	this._domain_matches_expression = function(domain, expression){
	   domain_array = domain.split(".").reverse();
	   expression_array = expression.split(".").reverse();
	   for(var i=0; i<=expression_array.length; i++){
	       if(expression_array[i] == "*"){
	           return true;
	       }
	       if(expression_array[i] != domain_array[i]){
	           return false;
	       }
	       if(i == expression_array.length){
	           return true;
	       }
	   }
	   return false;
	}
	
	// executes tracking code
	this._execute = function() {
		this._ga_execute() // google analytics
	}
	
	// get the value for a query string variable
	this._get_q = function (v) {
		var q = window.location.search.substring(1);
		var vars = q.split("&");
		for (var i=0;i<vars.length;i++) {
			var p = vars[i].split("=");
			if (p[0] == v) return p[1];
			}
		return "";
	}
	
	// get the domain for the current page
	this._get_domain = function() {
		return document.domain.match( /[^\.]+\.[^\.]+$/ );
	}
	
	// get the domain from a url or return an empty string
	this._get_domain_from_url = function(destination) {
        var re = /^http(?:s)?:\/\/([^\/]+)/;
        var match = re.exec(destination);
        if (match){
            return match[1];
        }
        else {
            return "";
        }
	}
	
	// returns true if a link destination contains one of the specified
	// domains
    this._link_contains_domain = function(destination, domains){
        domain = this._get_domain_from_url(destination);
        if(domain){
            expressions = domains.split(",");
            for(var i=0; i<expressions.length; i++){
                if(this._domain_matches_expression(domain, expressions[i])){
                    return true;
                }
            }
        }
        else {
            return false;
        }
    }
    
	// write to the document
	this._write = function(code) {
		document.write(code);
	}
	
    // Returns a list of links which point to a linked domain. If the domain
    // is equal to the document.domain, the link is skipped.
    this._get_links_by_domains = function(linked_domains) {
        var all_links = document.getElementsByTagName("a");
        var matched_links = [];
        for (var i=0;i<all_links.length;i++){
            var a = all_links[i];
            var href = a.getAttribute("href");
            if(this._link_contains_domain(href, linked_domains) && this._get_domain_from_url(href) != document.domain){
                matched_links.push(a);
            }
        }
        return matched_links;
    }




    // --- backwards compatibility functions --- //

	/*
	 * Populates enter analytics IDs based on the generic ID and the
	 * corresponding account in the _account_ids array.
    */
    this._populate_empty_ids = function() {
        if (this._account_ids[this.account]){
            var account_ids = this._account_ids[this.account].split("|");
            if (!this.hbx_site_account) {
                this.hbx_site_account = account_ids[0]
            }
            if (!this.omniture_site_account) {
                this.omniture_site_account = account_ids[1]
            }
            if (!this.ga_site_account) {
                this.ga_site_account = account_ids[2]                
            }
        }
    }
    
	/*
	 * Returns a genric account ID if one of the provided account IDs
	 * matches a known ID in the _account_ids array.
    */
	this._identify_genric_id = function() {
        for (var generic_id in this._account_ids){
            var account_ids = this._account_ids[generic_id].split("|");
            if (account_ids[0] != "" && account_ids[0] == this.hbx_site_account){
                return generic_id;
            }
            if (account_ids[1] != "" && account_ids[1] == this.omniture_site_account){
                return generic_id;
            }
            if (account_ids[2] != "" && account_ids[2] == this.ga_site_account){
                return generic_id;
            }
        }
        return "";
	}
	
	this._account_ids = new Array();
	this._account_ids = {
'advocatepress':'DM56101025RD79EN3|gatehouseadvocatepress|UA-6820091-11',
'aledotimesrecord':'DM561010KEFE79EN3|gatehousealedotimesrecord|UA-6820091-2',
'ardmoreite':'DM580107DDEM79EN3|gatehouseardmoreite|UA-6822628-1',
'augustagazette':'DM561010CLRA79EN3|gatehouseaugustagazette|UA-6821792-1',
'auroraadvertiser':'DM571026KDFR79EN3|gatehouseauroraadvertiser|UA-6822330-1',
'bastropenterprise':'DM561011N0DR79EN3|gatehousebastropenterprise|UA-6821901-1',
'bentoneveningnews':'DM561010M5SF79EN3|gatehousebentoneveningnews|UA-6820091-3',
'bignickel':'DM561011LHBR79EN3|gatehousebignickel|UA-6822330-20',
'boonvilledailynews':'DM561011OLDD79EN3|gatehouseboonvilledailynews|UA-6822330-2',
'cantondailyledger':'DM561010MKBN79EN3|gatehousecantondailyledger|UA-6820091-5',
'cantonrep':'DM570427AHNE79EN3|gatehousecantonrep|UA-6822595-1',
'carmitimes':'DM561010BHEN79EN3|gatehousecarmitimes|UA-6820091-6',
'carthagepress':'DM561011AMDB79EN3|gatehousecarthagepress|UA-6822330-5',
'charlescitypress':'DM5610100NEV79EN3|gatehousecharlescitypress|UA-6821753-1',
'cheboygannews':'DM561030DEDM79EN3|gatehousecheboygannews|UA-6822131-2',
'chillicothenews':'DM561011PIWA79EN3|gatehousechillicothenews|UA-6822330-6',
'chronicleexpress':'DM571220ENDE79EN3|gatehousechronicleexpress|UA-6822521-5',
'cityguidespringfield':'DM57042732CE79EN3|gatehousecityguidespringfield|UA-6820091-43',
'communitypub':'TEMPCOMMUNI79EN3|gatehousecommunitypub|UA-6820480-3',
'crescotimes':'DM561010OOAS79EN3|gatehousecrescotimes|UA-6821753-2',
'crookstontimes':'DM56101193AC79EN3|gatehousecrookstontimes|UA-6822205-1',
'dailyamericannews':'DM56101092CD79EN3|gatehousedailyamericannews|UA-6820091-40',
'dailynewstranscript':'DM56092786WA79EN3|gatehousedailynewstranscript|UA-6821975-3',
'dailynewstribune':'DM560927P8CD79EN3|gatehousedailynewstribune|UA-6821975-7',
'dailyregister':'DM56101085DC79EN3|gatehousedailyregister|UA-6820091-17',
'derbyreporter':'DM561010E4AA79EN3|gatehousederbyreporter|UA-6821792-2',
'deridderdailynews':'DM561011DKDZ79EN3|gatehousederidderdailynews|UA-6821901-2',
'devilslakejournal':'DM5610115HAV79EN3|gatehousedevilslakejournal|UA-9875893-1',
'dodgeglobe':'DM5801077OWA79EN3|gatehousedodgeglobe|UA-6821792-3',
'doverpost':'TEMPDOVERPO79EN3|gatehousedoverpost|UA-6820480-1',
'driveillinois':'DM570606K7RS79EN3|gatehousedriveillinois|UA-6820091-44',
'duquoin':'DM561010BIVD79EN3|gatehouseduquoin|UA-6820091-9',
'eldoradotimes':'DM561010E8CE79EN3|gatehouseeldoradotimes|UA-6821792-4',
'enterprisenews':'DM560927ANEC79EN3|gatehouseenterprisenews|UA-6821975-1',
'eveningtribune':'DM5610112JAD79EN3|gatehouseeveningtribune|UA-6822521-3',
'examiner':'DM580107K8SB79EN3|gatehouseexaminer|UA-6822330-8',
'ftleavenworthlamp':'DM5610110ABC79EN3|gatehouseftleavenworthlamp|UA-6821792-15',
'galatiamoneystretcher':'DM5610106AVC79EN3|gatehousegalatiamoneystretcher|UA-6820091-45',
'galesburg':'DM570427N3NZ79EN3|gatehousegalesburg|UA-6820091-14',
'gatehousemedia':'DM5610158HRN79EN3|gatehousegatehousemedia|',
'geneseorepublic':'DM561010GGCS79EN3|gatehousegeneseorepublic|UA-6820091-16',
'girardpress':'DM5801070LVR79EN3|gatehousegirardpress|UA-6821792-5',
'granitefallsnews':'DM561011A3CS79EN3|gatehousegranitefallsnews|UA-6822205-3',
'gridleyherald':'DM5610127PBF79EN3|gatehousegridleyherald|UA-6819992-1',
'hannibal':'DM580107BNRE79EN3|gatehousehannibal|UA-6822330-7',
'helenaarkansas':'DM561010BJVB79EN3|gatehousehelenaarkansas|UA-6819920-3',
'heraldnews':'DM5610300MDA79EN3|gatehouseheraldnews|UA-6821975-2',
'herkimertelegram':'DM56101117SB79EN3|gatehouseherkimertelegram|UA-6822521-2',
'hillsdale':'DM5801073DRD79EN3|gatehousehillsdale|UA-6822131-4',
'hollandsentinel':'DM580107E9AA79EN3|gatehousehollandsentinel|UA-6822131-5',
'hopestar':'DM561010MHEV79EN3|gatehousehopestar|UA-6819920-4',
'indeonline':'DM5704271CSE79EN3|gatehouseindeonline|UA-6822595-3',
'jacksonnewspapers':'DM561010K0NS79EN3|gatehousejacksonnewspapers|UA-6819920-2',
'journalstandard':'DM561010B3CW79EN3|gatehousejournalstandard|UA-6820091-12',
'kansascitykansan':'DM561010F1AF79EN3|gatehousekansascitykansan|UA-6821792-7',
'kiowacountysignal':'DM561010MANE79EN3|gatehousekiowacountysignal|UA-6821792-6',
'kirksvilledailyexpress':'DM56101178AZ79EN3|gatehousekirksvilledailyexpress|UA-6822330-9',
'lajuntatribunedemocrat':'DM561030FBZW79EN3|gatehouselajuntatribunedemocrat|UA-6820407-2',
'lakesunleader':'DM561011I0FR79EN3|gatehouselakesunleader|UA-6822330-4',
'lakenewsonline':'DM561011I0FR79EN3|gatehouselakesunleader|UA-6822330-4',
'lansingthisweek':'DM56101150AV79EN3|gatehouselansingthisweek|UA-6821792-8',
'leaderjournal':'DM561011GKED79EN3|gatehouseleaderjournal|UA-6822330-18',
'leavenworthchronicle':'DM561011F3WR79EN3|gatehouseleavenworthchronicle|UA-6821792-16',
'leavenworthtimes':'DM561010G4EF79EN3|gatehouseleavenworthtimes|UA-6821792-9',
'leesvilledailyleader':'DM56101113AZ79EN3|gatehouseleesvilledailyleader|UA-6821901-5',
'lenconnect':'DM561011DMAA79EN3|gatehouselenconnect|UA-6822131-1',
'lincolncourier':'DM570427C7RE79EN3|gatehouselincolncourier|UA-6820091-20',
'linncountyleader':'DM561011H7ZA79EN3|gatehouselinncountyleader|UA-6822330-3',
'littlefallstimes':'DM561011CKEV79EN3|gatehouselittlefallstimes|UA-6822521-4',
'macombjournal':'DM561010D0FD79EN3|gatehousemacombjournal|UA-6820091-21',
'maconch':'DM561011AHNW79EN3|gatehousemaconch|UA-6822330-12',
'mariondaily':'DM561010INBZ79EN3|gatehousemariondaily|UA-6820091-22',
'maryvilledailyforum':'DM561011PDBZ79EN3|gatehousemaryvilledailyforum|UA-6822330-13',
'mcphersonsentinel':'DM561010JMMD79EN3|gatehousemcphersonsentinel|UA-6821792-12',
'metrowestdailynews':'DM560927CMRF79EN3|gatehousemetrowestdailynews|UA-6821975-8',
'mexicoledger':'DM561011JACE79EN3|gatehousemexicoledger|UA-6822330-14',
'middletowntranscript':'TEMPMIDDLET79EN3|gatehousemiddletowntranscript|UA-6820480-4',
'milfordbeacon':'TEMPMILFORD79EN3|gatehousemilfordbeacon|UA-6820480-5',
'milforddailynews':'DM5609270NVN79EN3|gatehousemilforddailynews|UA-6821975-15',
'moberlymonitor':'DM561011LBZC79EN3|gatehousemoberlymonitor|UA-6822330-15',
'morningsun':'DM5801070OZD79EN3|gatehousemorningsun|UA-6821792-11',
'mpnnow':'DM5610120CWE79EN3|gatehousempnnow|UA-6822521-6',
'msnscache':'DM561030LCEZ79EN3|gatehousemsnscache|UA-6819992-5',
'mtshastanews':'DM561012JGZD79EN3|gatehousemtshastanews|UA-6819992-2',
'mysuburbanlife':'DM570324CEMS79EN3|gatehousemysuburbanlife|UA-6820091-1',
'ncnewspress':'DM561030PECV79EN3|gatehousencnewspress|UA-6822468-3',
'neagle':'DM561011KOVN79EN3|gatehouseneagle|UA-6822672-1',
'neoshodailynews':'DM561011HIDS79EN3|gatehouseneoshodailynews|UA-6822330-16',
'newportindependent':'DM561010ONAN79EN3|gatehousenewportindependent|UA-6819920-5',
'newsstar':'DM580107JHDS79EN3|gatehousenewsstar|UA-6822628-3',
'newstribune':'DM561011N4WB79EN3|gatehousenewstribune|UA-6822694-1',
'norwichbulletin':'DM570514K5AN79EN3|gatehousenorwichbulletin|UA-6820466-1',
'oakridger':'DM580108DJES79EN3|gatehouseoakridger|UA-6822685-1',
'olneydailymail':'DM56101098WF79EN3|gatehouseolneydailymail|UA-6820091-26',
'patriotledger':'DM56092714RF79EN3|gatehousepatriotledger|UA-6821975-9',
'pekintimes':'DM561010EHSE79EN3|gatehousepekintimes|UA-6820091-28',
'pjstar':'DM57042785MD79EN3|gatehousepjstar|UA-6820091-30',
'plymouthguide':'DM56103037BS79EN3|gatehouseplymouthguide|UA-6821975-4',
'pontiacdailyleader':'DM561010IJAA79EN3|gatehousepontiacdailyleader|UA-6820091-31',
'postsouth':'DM5610113KVC79EN3|gatehousepostsouth|UA-6821901-6',
'pratttribune':'DM5610107JNM79EN3|gatehousepratttribune|UA-6821792-14',
'redwoodfallsgazette':'DM56101138DF79EN3|gatehouseredwoodfallsgazette|UA-6822205-2',
'repbuzz':'DM57042733DV79EN3|gatehouserepbuzz|UA-6822595-7',
'reviewatlas':'DM561010M1WV79EN3|gatehousereviewatlas|UA-6820091-23',
'ridgecrestca':'DM561011EFZD79EN3|gatehouseridgecrestca|UA-6819992-3',
'rrstar':'DM5705148PBF79EN3|gatehouserrstar|UA-6820091-37',
'scsuntimes':'TEMPSCSUNTI79EN3|gatehousescsuntimes|UA-6820480-6',
'sentinelstandard':'DM5610118MDE79EN3|gatehousesentinelstandard|UA-6822131-6',
'siftingsherald':'DM561010MBBM79EN3|gatehousesiftingsherald|UA-6819920-1',
'siskiyoudaily':'DM561012DICW79EN3|gatehousesiskiyoudaily|UA-6819992-4',
'sitraders':'DM561010FFAN79EN3|gatehousesitraders|UA-6820091-46',
'sjr':'DM570427MCRN79EN3|gatehousesjr|UA-6820091-38',
'sleepyeyenews':'DM561011PBEV79EN3|gatehousesleepyeyenews|UA-6822205-5',
'sooeveningnews':'DM5610114JRA79EN3|gatehousesooeveningnews|UA-6822131-7',
'southofboston':'DM560927FBME79EN3|gatehousesouthofboston|UA-6821975-12',
'springfieldshopper':'DM5610105GSB79EN3|gatehousespringfieldshopper|UA-6820091-47',
'starcourier':'DM561010PGCR79EN3|gatehousestarcourier|UA-6820091-19',
'stjamesnews':'DM561011B0ES79EN3|gatehousestjamesnews|UA-6822205-6',
'sturgisjournal':'DM56101148ZA79EN3|gatehousesturgisjournal|UA-6822131-8',
'stuttgartdailyleader':'DM561010N1FC79EN3|gatehousestuttgartdailyleader|UA-6819920-6',
'sulphurdailynews':'DM56101158EB79EN3|gatehousesulphurdailynews|UA-6821901-7',
'sussexcountian':'TEMPSUSSEXC79EN3|gatehousesussexcountian|UA-6820480-2',
'taftmidwaydriller':'DM5610120EAF79EN3|gatehousetaftmidwaydriller|UA-6819992-7',
'tauntongazette':'DM561011I8ZW79EN3|gatehousetauntongazette|UA-6821975-6',
'telluridenews':'DM561012MHSB79EN3|gatehousetelluridenews|UA-6820407-7',
'thedailyreporter':'DM561011EHZR79EN3|gatehousethedailyreporter|UA-6822131-3',
'thekansan':'DM580107KJCN79EN3|gatehousethekansan|UA-6821792-10',
'theleader':'DM56101106EF79EN3|gatehousetheleader|UA-6822521-1',
'therecordherald':'DM561011K3AZ79EN3|gatehousetherecordherald|UA-6822672-3',
'therolladailynews':'DM561011IEDC79EN3|gatehousetherolladailynews|UA-6822330-17',
'thesuburbanite':'DM5704270PFV79EN3|gatehousethesuburbanite|UA-6822595-2',
'timesreporter':'DM5704279NSR79EN3|gatehousetimesreporter|UA-6822595-4',
'totallylocal':'DM56101259BW79EN3|gatehousetotallylocal|UA-6842750-2',
'uticaod':'DM570514E0BN79EN3|gatehouseuticaod|UA-6822521-7',
'wayneindependent':'DM561011CGAE79EN3|gatehousewayneindependent|UA-6822672-2',
'waynesvilledailyguide':'DM561011LODE79EN3|gatehousewaynesvilledailyguide|UA-6822330-19',
'weeklycitizen':'DM561011B8ZZ79EN3|gatehouseweeklycitizen|UA-6821901-4',
'wellingtondailynews':'DM56101145EC79EN3|gatehousewellingtondailynews|UA-6821792-13',
'wellsvilledaily':'DM561011LCCD79EN3|gatehousewellsvilledaily|UA-6822521-8',
'westsidestar':'DM561011E0ZZ79EN3|gatehousewestsidestar|UA-6822330-11',
'wickedlocal':'DM560927IABD79EN3|gatehousewickedlocal|UA-6821975-5',
'wickedlocalbusinesses':'DM5703135HMF79EN3|gatehousewickedlocalbusinesses|UA-6821975-13',
'wickedlocaljobs':'DM560927MKBR79EN3|gatehousewickedlocaljobs|UA-6821975-14',
'wickedlocalparents':'DM570312PJSD79EN3|gatehousewickedlocalparents|',
'wickedlocalwheels':'DM570214IPMB79EN3|gatehousewickedlocalwheels|',
'yorknewstimes':'DM5801075OBB79EN3|gatehouseyorknewstimes|'}
    



    // --- init --- //
	
	if (typeof(args) == "undefined"){
		var args = {};
	}
	
	// variables
	this.hierarchy = args['hierarchy'] == undefined ? '' : args['hierarchy'];
	this.account = args['account'] == undefined ? '' : args['account'];
	if (!this.account){
    	this.account = args['site_account'] == undefined ? '' : args['site_account'];
	}
	this.page_title = args['page_title'] == undefined ? '' : args['page_title'];
	this.search_type = args['search_type'] == undefined ? '' : args['search_type'];
	this.search_querry_var = args['search_querry_var'] == undefined ? '' : args['search_querry_var'];
	this.host = args['host'] == undefined ? '' : args['host'];
	this.state = args['state'] == undefined ? '' : args['state'];
	this.section_name = args['section_name'] == undefined ? '' : args['section_name'];
	this.article_headline = args['article_headline'] == undefined ? '' : args['article_headline'];
	this.page_type = args['page_type'] == undefined ? '' : args['page_type'];
	this.pub_type = args['pub_type'] == undefined ? '' : args['pub_type'];
	this.zope_site_id = args['zope_site_id'] == undefined ? '' : args['zope_site_id'];
	this.ga_cookie_domain = args['ga_cookie_domain'] == undefined ? '' : args['ga_cookie_domain'];
	this.linked_domains = args['linked_domains'] == undefined ? '' : args['linked_domains'];
	this.global_linked_domains = "*.legacy.com,*.totallylocal.com";
	this.debug = 0;
	if(window.location.search.indexOf("debug_analytics") >= 0)this.debug = 1;
	
	
	// changes "domain.com" to "domain"
	if(this.account.indexOf(".") >= 0){
		this.account = this.account.split(".")[this.account.split(".").length-2];
	}
	
	// hbx
	this.hbx_global_account = 'DM560815MCAN79EN3';
	this.hbx_region_account = args['hbx_region_account'] == undefined ? '' : args['hbx_region_account'];
	this.hbx_site_account = args['hbx_site_account'] == undefined ? '' : args['hbx_site_account'];
    // This is a hack that handles the case where someone passes in the
    // HBX account ID in as "site_account" instead of "hbx_site_account"
	if(!this.hbx_site_account && args['site_account']){
	    this.hbx_site_account = args['site_account'];
	}
	
	// omniture
	this.omniture_global_account = 'gatehouseglobal';
	this.omniture_site_account = args['omniture_site_account'] == undefined ? '' : args['omniture_site_account'];
	// google analytics
	this.ga_site_account = args['ga_site_account'] == undefined ? '' : args['ga_site_account'];
	
	if (this.account == "") {
	   this.account = this._identify_genric_id();
	}
    
    this._populate_empty_ids();
    
}