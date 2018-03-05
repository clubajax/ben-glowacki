function set_navsection(cat)
    {
    
    if (cat)
        {
        if ( (cat.toLowerCase() == 'ogd01') || (cat.toLowerCase() == 'ogd02') || (cat.toLowerCase() == 'ogd03') || (cat.toLowerCase() == 'ogd04') || (cat.toLowerCase() == 'dco01') || (cat.toLowerCase() == 'dco02') || (cat.toLowerCase() == 'dco03') || (cat.toLowerCase() == 'dco04') )
            {
            var navcat = cat;
            }
        else if ( (cat.toLowerCase() == 'adv01') || (cat.toLowerCase() == 'adv02') || (cat.toLowerCase() == 'adv03') )
            {
            if (sectioncat != '')
                {
                var navcat = sectioncat;
                }
            else if (wdsite != '')
                {
                var navcat = wdsite + "01";
                }
            else
                {
                var navcat = "dco01";
                }
            }
        else
            {
            if (cat == 'apps')
                {
                var navcat = 'registration';
                }
            else if (cat == 'wdt_help06')
                {
                var navcat = 'newsletters';
                }
            else if (cat == 'hssportsresults')
                {
                var navcat = 'sports';
                }
            else if (cat == 'classifieds')
                {
                var navcat = cat;
                }
            else if (cat.indexOf('help') !== -1)
                {
                var navcat = 'help';
                }
            else if (cat.indexOf('wdt_archive') !== -1)
                {
                var navcat = 'archive';
                }
            else if (cat.indexOf('photos') !== -1)
                {
                var navcat = 'multimedia';
                }
            else if ((cat.toLowerCase() == 'search') || (cat.toLowerCase() == 'progress') || (cat.toLowerCase() == 'alerts'))
                {
                var navcat = 'news';
                }
            else if (cat == 'dco')
                {
                var navcat = 'dco01';
                }
            else if (cat == 'ogd')
                {
                var navcat = 'ogd01';
                }
            else if (cat.indexOf('wdt_') !== -1)
                {
                var navcat = 'news';
                }
            else if (cat.indexOf('ogd_') !== -1)
                {
                var navcat = 'ogd01';
                }
            else if (cat.indexOf('dco_') !== -1)
                {
                var navcat = 'dco01';
                }
            else
                {
                var navcat = cat.replace(/[\d]+$/, "");
                
                if ( (navcat.toLowerCase() == 'blogs') || (navcat.toLowerCase() == 'col') )
                    {
                    var navcat = 'opinion';
                    }
                }
            }
        
        currentnav = navcat.toLowerCase();
        }
    else
        {
        currentnav = 'news';
        }
    }
function nav_arrays()
    {
    
    // -- main
    
    nav_main_labels = [];
    nav_main_links = [];
    nav_main_targets = [];
    nav_main_section = [];
    
    nav_main_labels.push('Local');
    nav_main_links.push('/section/news');
    nav_main_targets.push(0);
    nav_main_section.push('news');
    
    nav_main_labels.push('National');
    nav_main_links.push('/section/national');
    nav_main_targets.push(0);
    nav_main_section.push('national');
    
    nav_main_labels.push('Sports');
    nav_main_links.push('/section/sports');
    nav_main_targets.push(0);
    nav_main_section.push('sports');
    
    nav_main_labels.push('Obituaries');
    nav_main_links.push('/section/obit');
    nav_main_targets.push(0);
    nav_main_section.push('obit');
    
    nav_main_labels.push('Features');
    nav_main_links.push('/section/curr');
    nav_main_targets.push(0);
    nav_main_section.push('curr');
    
    nav_main_labels.push('Opinion');
    nav_main_links.push('/section/opinion');
    nav_main_targets.push(0);
    nav_main_section.push('opinion');
    
    nav_main_labels.push('Calendar');
    nav_main_links.push('/section/events');
    nav_main_targets.push(0);
    nav_main_section.push('events');
    
    nav_main_labels.push('Photos & Video');
    nav_main_links.push('/section/multimedia');
    nav_main_targets.push(0);
    nav_main_section.push('multimedia');
    
    nav_main_labels.push('Archives');
    nav_main_links.push('/section/wdt_archive');
    nav_main_targets.push(0);
    nav_main_section.push('archive');
    
    nav_main_labels.push('Contact & Help');
    nav_main_links.push('/section/wdt_help');
    nav_main_targets.push(0);
    nav_main_section.push('help');
    
    nav_main_labels.push('Newsletters');
    nav_main_links.push('/section/wdt_help06');
    nav_main_targets.push(0);
    nav_main_section.push('newsletters');
    
    nav_main_labels.push('Classifieds');
    nav_main_links.push('http://www.nnyads.com/');
    nav_main_targets.push(0);
    nav_main_section.push('classifieds');
    
    /*
    nav_main_labels.push('Marketplace');
    nav_main_links.push('http://yourlocalmarket.watertowndailytimes.com');
    nav_main_targets.push(1);
    nav_main_section.push('marketplace');
    
    nav_main_labels.push('e-Edition');
    nav_main_links.push('/epub');
    nav_main_targets.push(1);
    nav_main_section.push('epub');
    */
    
    nav_main_labels.push('Jobs');
    nav_main_links.push('http://jobs.thejobnetwork.com/nphomepage.aspx?AffiliateId=1506');
    nav_main_targets.push(1);
    nav_main_section.push('jobs');
    
    nav_main_labels.push('Auto');
    nav_main_links.push('http://www.nnyads.com/apps/pbcs.dll/cce?Module=1&amp;Category=classifieds&amp;Class=112&amp;range=1');
    nav_main_targets.push(0);
    nav_main_section.push('auto');
    
    nav_main_labels.push('Homes');
    nav_main_links.push('http://www.nnyads.com/apps/pbcs.dll/cce?Module=1&amp;Category=classifieds&amp;Class=102&amp;range=1');
    nav_main_targets.push(0);
    nav_main_section.push('homes');
    
    
    
    // -- news
    
    nav_news_labels = [];
    nav_news_links = [];
    nav_news_targets = [];
    
    nav_news_labels.push('Local News');
    nav_news_links.push('/section/news');
    nav_news_targets.push(0);
    
    nav_news_labels.push('Latest News');
    nav_news_links.push('/section/news09');
    nav_news_targets.push(0);
    
    nav_news_labels.push('Jefferson');
    nav_news_links.push('/section/news03');
    nav_news_targets.push(0);
    
    nav_news_labels.push('St. Lawrence');
    nav_news_links.push('/section/news05');
    nav_news_targets.push(0);
    
    nav_news_labels.push('Lewis');
    nav_news_links.push('/section/news04');
    nav_news_targets.push(0);
    
    nav_news_labels.push('Fort Drum');
    nav_news_links.push('/section/news1201');
    nav_news_targets.push(0);
    
    nav_news_labels.push('Albany');
    nav_news_links.push('/section/news01');
    nav_news_targets.push(0);
    
    nav_news_labels.push('Washington');
    nav_news_links.push('/section/news02');
    nav_news_targets.push(0);
    
    nav_news_labels.push('Features');
    nav_news_links.push('/section/curr');
    nav_news_targets.push(0);
    
    nav_news_labels.push('Blogs');
    nav_news_links.push('/section/blogs');
    nav_news_targets.push(0);
    
    nav_news_labels.push('Weather');
    nav_news_links.push('/section/wdt_weather');
    nav_news_targets.push(0);
    
    nav_news_labels.push('News Feeds');
    nav_news_links.push('/section/wdt_feeds');
    nav_news_targets.push(0);
    
    nav_news_labels.push('e-Edition');
    nav_news_links.push('/epub');
    nav_news_targets.push(1);
    
    nav_news_labels.push('Submit News Tip');
    nav_news_links.push('/section/wdt_help0101');
    nav_news_targets.push(0);
    
    
    
    // -- national
    
    nav_national_labels = [];
    nav_national_links = [];
    nav_national_targets = [];
    
    nav_national_labels.push('U.S.');
    nav_national_links.push('/section/national01');
    nav_national_targets.push(0);
    
    nav_national_labels.push('New York');
    nav_national_links.push('/section/national02');
    nav_national_targets.push(0);
    
    nav_national_labels.push('Washington');
    nav_national_links.push('/section/national03');
    nav_national_targets.push(0);
    
    nav_national_labels.push('World');
    nav_national_links.push('/section/national04');
    nav_national_targets.push(0);
    
    nav_national_labels.push('Sports');
    nav_national_links.push('/section/national05');
    nav_national_targets.push(0);
    
    nav_national_labels.push('Entertainment');
    nav_national_links.push('/section/national06');
    nav_national_targets.push(0);
    
    nav_national_labels.push('Financial');
    nav_national_links.push('/section/national07');
    nav_national_targets.push(0);
    
    /*
    nav_national_labels.push('Stock Market');
    nav_national_links.push('/section/market');
    nav_national_targets.push(0);
    
    nav_national_labels.push('AP Video News');
    nav_national_links.push('/section/apvideo');
    nav_national_targets.push(0);
    */
    
    
    // -- sports
    
    nav_sports_labels = [];
    nav_sports_links = [];
    nav_sports_targets = [];
    
    nav_sports_labels.push('Local Sports');
    nav_sports_links.push('/section/sports');
    nav_sports_targets.push(0);
    
    nav_sports_labels.push('Stats & Schedules');
    nav_sports_links.push('/section/hssportsresults');
    nav_sports_targets.push(0);
    
    nav_sports_labels.push('Blogs');
    nav_sports_links.push('/section/sports');
    nav_sports_targets.push(0);
    
    /*
    nav_sports_labels.push('NY Sports');
    nav_sports_links.push('/section/blogs');
    nav_sports_targets.push(0);
    
    nav_sports_labels.push('National & World Sports');
    nav_sports_links.push('/section/blogs');
    nav_sports_targets.push(0);
    */
    
    
    // -- obit
    
    nav_obit_labels = [];
    nav_obit_links = [];
    nav_obit_targets = [];
    
    nav_obit_labels.push('Obituaries & Death Notices');
    nav_obit_links.push('/section/obit');
    nav_obit_targets.push(0);
    
    nav_obit_labels.push('Submit Obituary');
    nav_obit_links.push('/section/obit');
    nav_obit_targets.push(0);
    
    nav_obit_labels.push('Funeral Home Directory');
    nav_obit_links.push('/section/obit');
    nav_obit_targets.push(0);
    
    
    // -- curr
    
    nav_curr_labels = [];
    nav_curr_links = [];
    nav_curr_targets = [];
    
    nav_curr_labels.push('Local Features');
    nav_curr_links.push('/section/curr');
    nav_curr_targets.push(0);
    
    nav_curr_labels.push('Feature Stories');
    nav_curr_links.push('/section/curr');
    nav_curr_targets.push(0);
    
    nav_curr_labels.push('Society Announcements');
    nav_curr_links.push('/section/curr');
    nav_curr_targets.push(0);
    
    nav_curr_labels.push('Columns');
    nav_curr_links.push('/section/curr');
    nav_curr_targets.push(0);
    
    nav_curr_labels.push('Community Notes');
    nav_curr_links.push('/section/curr');
    nav_curr_targets.push(0);
    
    nav_curr_labels.push('Lottery Numbers');
    nav_curr_links.push('/section/curr');
    nav_curr_targets.push(0);
    
    
    // -- opinion
    
    nav_opinion_labels = [];
    nav_opinion_links = [];
    nav_opinion_targets = [];
    
    nav_opinion_labels.push('Editorials');
    nav_opinion_links.push('/section/opinion');
    nav_opinion_targets.push(0);
    
    nav_opinion_labels.push('Letters to the Editor');
    nav_opinion_links.push('/section/opinion');
    nav_opinion_targets.push(0);
    
    nav_opinion_labels.push('Blogs');
    nav_opinion_links.push('/section/blogs');
    nav_opinion_targets.push(0);
    
    
    // -- classifieds
    
    nav_classifieds_labels = [];
    nav_classifieds_links = [];
    nav_classifieds_targets = [];
    
    nav_classifieds_labels.push('NNY Ads Home');
    nav_classifieds_links.push('http://www.nnyads.com/');
    nav_classifieds_targets.push(0);
    
    nav_classifieds_labels.push('NNY Jobs');
    nav_classifieds_links.push('http://jobs.nnyads.com/');
    nav_classifieds_targets.push(1);
    
    nav_classifieds_labels.push('NNY Real Estate');
    nav_classifieds_links.push('/section/classifieds01');
    nav_classifieds_targets.push(0);
    
    nav_classifieds_labels.push('Your Local Marketplace');
    nav_classifieds_links.push('http://yourlocalmarket.watertowndailytimes.com/');
    nav_classifieds_targets.push(1);
    
    
    // -- marketplace
    
    nav_marketplace_labels = [];
    nav_marketplace_links = [];
    nav_marketplace_targets = [];
    
    nav_marketplace_labels.push('Your Local Marketplace');
    nav_marketplace_links.push('http://yourlocalmarket.watertowndailytimes.com/');
    nav_marketplace_targets.push(1);
    
    
    // -- events
    
    nav_events_labels = [];
    nav_events_links = [];
    nav_events_targets = [];
    
    nav_events_labels.push('Today\'s Events');
    nav_events_links.push('/section/events');
    nav_events_targets.push(0);
    
    nav_events_labels.push('Search & Browse');
    nav_events_links.push('/section/events');
    nav_events_targets.push(0);
    
    
    // -- multimedia
    
    nav_multimedia_labels = [];
    nav_multimedia_links = [];
    nav_multimedia_targets = [];
    
    nav_multimedia_labels.push('Photos');
    nav_multimedia_links.push('/section/multimedia');
    nav_multimedia_targets.push(0);
    
    nav_multimedia_labels.push('Slideshows');
    nav_multimedia_links.push('/section/multimedia');
    nav_multimedia_targets.push(0);
    
    nav_multimedia_labels.push('Order Photo Prints');
    nav_multimedia_links.push('http://www.timelessexpressions.com/?pid=1044612215');
    nav_multimedia_targets.push(1);
    
    /*
    nav_multimedia_labels.push('Order Prints');
    nav_multimedia_links.push('http://...');
    nav_multimedia_targets.push(1);
    
    nav_multimedia_labels.push('Photographers Spotlight');
    nav_multimedia_links.push('/section/photographers');
    nav_multimedia_targets.push(0);
    */
    
    
    // -- archive
    
    nav_archive_labels = [];
    nav_archive_links = [];
    nav_archive_targets = [];
    
    nav_archive_labels.push('7-day Search');
    nav_archive_links.push('/section/wdt_archive');
    nav_archive_targets.push(0);
    
    nav_archive_labels.push('1988-Present');
    nav_archive_links.push('/section/wdt_archive');
    nav_archive_targets.push(0);
    
    nav_archive_labels.push('Historical Archive (1870-1922)');
    nav_archive_links.push('http://nl.newsbank.com/nl-search/we/Archives?p_product=HA-WA&amp;p_theme=histpaper&amp;p_action=keyword');
    nav_archive_targets.push(0);
    
    
    // -- help
    
    nav_help_labels = [];
    nav_help_links = [];
    nav_help_targets = [];
    
    nav_help_labels.push('Contact Us');
    nav_help_links.push('/section/wdt_help01');
    nav_help_targets.push('0');
    
    nav_help_labels.push('Help Center');
    nav_help_links.push('/section/wdt_help');
    nav_help_targets.push('0');
    
    nav_help_labels.push('Submit News & Photos');
    nav_help_links.push('/section/wdt_help0101');
    nav_help_targets.push('0');
    
    
    // -- e-edition
    
    nav_epub_labels = [];
    nav_epub_links = [];
    nav_epub_targets = [];
    
    nav_epub_labels.push('E-Edition');
    nav_epub_links.push('/epub');
    nav_epub_targets.push('1');
    
    nav_epub_labels.push('Demo');
    nav_epub_links.push('/epubdemo');
    nav_epub_targets.push('1');
    
    nav_epub_labels.push('Marketplace');
    nav_epub_links.push('/epubads');
    nav_epub_targets.push('1');
    
    
    // -- registration
    
    nav_registration_labels = [];
    nav_registration_links = [];
    nav_registration_targets = [];
    
    nav_registration_labels.push('Home Delivery');
    nav_registration_links.push('https://cmo.watertowndailytimes.com/');
    nav_registration_targets.push('1');
    
    nav_registration_labels.push('E-Edition');
    nav_registration_links.push('/epub');
    nav_registration_targets.push('1');
    
    nav_registration_labels.push('Demo');
    nav_registration_links.push('/epubdemo');
    nav_registration_targets.push('1');
    
    nav_registration_labels.push('Marketplace');
    nav_registration_links.push('/epubads');
    nav_registration_targets.push('1');
    
    nav_registration_labels.push('iOS App');
    nav_registration_links.push('https://itunes.apple.com/us/app/watertown-times/id584409188?mt=8&amp;uo=4');
    nav_registration_targets.push(1);
    
    nav_registration_labels.push('Android App');
    nav_registration_links.push('https://play.google.com/store/apps/details?id=com.watertowndailytimesny.android');
    nav_registration_targets.push(1);
    
    
    // -- jobs
    
    nav_jobs_labels = [];
    nav_jobs_links = [];
    nav_jobs_targets = [];
    
    nav_jobs_labels.push('NNY Ads Home');
    nav_jobs_links.push('http://www.nnyads.com/');
    nav_jobs_targets.push(0);
    
    nav_jobs_labels.push('NNY Jobs');
    nav_jobs_links.push('http://jobs.nnyads.com/');
    nav_jobs_targets.push(1);
    
    nav_jobs_labels.push('NNY Real Estate');
    nav_jobs_links.push('/section/jobs01');
    nav_jobs_targets.push(0);
    
    nav_jobs_labels.push('Your Local Marketplace');
    nav_jobs_links.push('http://yourlocalmarket.watertowndailytimes.com/');
    nav_jobs_targets.push(1);
    
    
    // -- auto
    
    nav_auto_labels = [];
    nav_auto_links = [];
    nav_auto_targets = [];
    
    nav_auto_labels.push('NNY Ads Home');
    nav_auto_links.push('http://www.nnyads.com/');
    nav_auto_targets.push(0);
    
    nav_auto_labels.push('NNY Jobs');
    nav_auto_links.push('http://jobs.nnyads.com/');
    nav_auto_targets.push(1);
    
    nav_auto_labels.push('NNY Real Estate');
    nav_auto_links.push('/section/auto01');
    nav_auto_targets.push(0);
    
    nav_auto_labels.push('Your Local Marketplace');
    nav_auto_links.push('http://yourlocalmarket.watertowndailytimes.com/');
    nav_auto_targets.push(1);
    
    
    // -- homes
    
    nav_homes_labels = [];
    nav_homes_links = [];
    nav_homes_targets = [];
    
    nav_homes_labels.push('NNY Ads Home');
    nav_homes_links.push('http://www.nnyads.com/');
    nav_homes_targets.push(0);
    
    nav_homes_labels.push('NNY Jobs');
    nav_homes_links.push('http://jobs.nnyads.com/');
    nav_homes_targets.push(1);
    
    nav_homes_labels.push('NNY Real Estate');
    nav_homes_links.push('/section/homes01');
    nav_homes_targets.push(0);
    
    nav_homes_labels.push('Your Local Marketplace');
    nav_homes_links.push('http://yourlocalmarket.watertowndailytimes.com/');
    nav_homes_targets.push(1);
    
    
    // -- apps
    
    nav_apps_labels = [];
    nav_apps_links = [];
    nav_apps_targets = [];
    
    nav_apps_labels.push('Apps Home');
    nav_apps_links.push('/section/apps');
    nav_apps_targets.push(0);
    
    nav_apps_labels.push('e-Edition');
    nav_apps_links.push('/epub');
    nav_apps_targets.push(1);
    
    nav_apps_labels.push('iOS App');
    nav_apps_links.push('https://itunes.apple.com/us/app/watertown-times/id584409188?mt=8&amp;uo=4');
    nav_apps_targets.push(1);
    
    nav_apps_labels.push('Android App');
    nav_apps_links.push('https://play.google.com/store/apps/details?id=com.watertowndailytimesny.android');
    nav_apps_targets.push(1);
    
    
    // -- newsletters
    
    nav_newsletters_labels = [];
    nav_newsletters_links = [];
    nav_newsletters_targets = [];
    
    nav_newsletters_labels.push('Newsletters Registration');
    nav_newsletters_links.push('/section/wdt_help06');
    nav_newsletters_targets.push(0);
    
    }
    
function nav_arrays_ogd()
    {
    
    // -- main
    
    nav_main_labels = [];
    nav_main_links = [];
    nav_main_targets = [];
    nav_main_section = [];
    
    nav_main_labels.push('Local');
    nav_main_links.push('/section/ogd01');
    nav_main_targets.push(0);
    nav_main_section.push('ogd01');
    
    nav_main_labels.push('National');
    nav_main_links.push('http://watertowndailytimes.com/section/national');
    nav_main_targets.push(1);
    nav_main_section.push('national');
    
    nav_main_labels.push('Sports');
    nav_main_links.push('/section/ogd02');
    nav_main_targets.push(0);
    nav_main_section.push('ogd02');
    
    nav_main_labels.push('Obituaries');
    nav_main_links.push('/section/ogd03');
    nav_main_targets.push(0);
    nav_main_section.push('ogd03');
    
    nav_main_labels.push('Opinion');
    nav_main_links.push('/section/ogd06');
    nav_main_targets.push(0);
    nav_main_section.push('ogd06');
    
    nav_main_labels.push('Calendar');
    nav_main_links.push('/section/events?site=wdt&tpl=eventsearch&w=4&r=20&rl=Ogdensburg&wd_site=OGD');
    nav_main_targets.push(0);
    nav_main_section.push('events');
    
    nav_main_labels.push('Archive');
    nav_main_links.push('http://nl.newsbank.com/nl-search/we/Archives/?p_action=keyword&amp;s_search_type=keyword&amp;p_product=NewsLibrary&amp;p_theme=newslibrary2&amp;d_sources=location&amp;d_place=OBJB&amp;p_nbid=&amp;');
    nav_main_targets.push(1);
    nav_main_section.push('archive');
    
    nav_main_labels.push('Contact');
    nav_main_links.push('/section/ogd_help01');
    nav_main_targets.push(0);
    nav_main_section.push('help');
    
    nav_main_labels.push('Newsletters');
    nav_main_links.push('/section/wdt_help06');
    nav_main_targets.push(0);
    nav_main_section.push('newsletters');
    
    nav_main_labels.push('Classifieds');
    nav_main_links.push('http://www.nnyads.com/');
    nav_main_targets.push(0);
    nav_main_section.push('classifieds');
    
    nav_main_labels.push('Jobs');
    nav_main_links.push('http://jobs.thejobnetwork.com/nphomepage.aspx?AffiliateId=1506');
    nav_main_targets.push(1);
    nav_main_section.push('jobs');
    
    nav_main_labels.push('Auto');
    nav_main_links.push('http://www.nnyads.com/apps/pbcs.dll/cce?Module=1&amp;Category=classifieds&amp;Class=112&amp;range=1');
    nav_main_targets.push(0);
    nav_main_section.push('auto');
    
    nav_main_labels.push('Homes');
    nav_main_links.push('http://www.nnyads.com/apps/pbcs.dll/cce?Module=1&amp;Category=classifieds&amp;Class=102&amp;range=1');
    nav_main_targets.push(0);
    nav_main_section.push('homes');
    
    
    // -- ogd01
    
    nav_ogd01_labels = [];
    nav_ogd01_links = [];
    nav_ogd01_targets = [];
    
    nav_ogd01_labels.push('Local News');
    nav_ogd01_links.push('/section/ogd01');
    nav_ogd01_targets.push(0);
    
    nav_ogd01_labels.push('Latest News');
    nav_ogd01_links.push('/section/ogd04');
    nav_ogd01_targets.push(0);
    
    //nav_ogd01_labels.push('Submit News Tip');
    //nav_ogd01_links.push('/section/ogd_newstip');
    //nav_ogd01_targets.push(0);
    
    //nav_ogd01_labels.push('News Feeds');
    //nav_ogd01_links.push('/section/feeds?wd_site=OGD');
    //nav_ogd01_targets.push(0);
    
    
    // -- national
    
    nav_national_labels = [];
    nav_national_links = [];
    nav_national_targets = [];
    
    nav_national_labels.push('U.S.');
    nav_national_links.push('http://watertowndailytimes.com/section/national01');
    nav_national_targets.push(1);
    
    nav_national_labels.push('New York');
    nav_national_links.push('http://watertowndailytimes.com/section/national02');
    nav_national_targets.push(1);
    
    nav_national_labels.push('Washington');
    nav_national_links.push('http://watertowndailytimes.com/section/national03');
    nav_national_targets.push(1);
    
    nav_national_labels.push('World');
    nav_national_links.push('http://watertowndailytimes.com/section/national04');
    nav_national_targets.push(1);
    
    nav_national_labels.push('Sports');
    nav_national_links.push('http://watertowndailytimes.com/section/national05');
    nav_national_targets.push(1);
    
    nav_national_labels.push('Entertainment');
    nav_national_links.push('http://watertowndailytimes.com/section/national06');
    nav_national_targets.push(1);
    
    nav_national_labels.push('Financial');
    nav_national_links.push('http://watertowndailytimes.com/section/national07');
    nav_national_targets.push(1);
    
    
    // -- ogd02
    
    nav_ogd02_labels = [];
    nav_ogd02_links = [];
    nav_ogd02_targets = [];
    
    nav_ogd02_labels.push('Local Sports');
    nav_ogd02_links.push('/section/ogd02');
    nav_ogd02_targets.push(0);
    
    nav_ogd02_labels.push('Stats & Schedules');
    nav_ogd02_links.push('/section/hssportsresults?wd_site=OGD');
    nav_ogd02_targets.push(0);
    
    
    // -- ogd03
    
    nav_ogd03_labels = [];
    nav_ogd03_links = [];
    nav_ogd03_targets = [];
    
    nav_ogd03_labels.push('Obituaries');
    nav_ogd03_links.push('/section/ogd03');
    nav_ogd03_targets.push(0);
    
    
    // -- ogd06
    
    nav_ogd06_labels = [];
    nav_ogd06_links = [];
    nav_ogd06_targets = [];
    
    nav_ogd06_labels.push('Editorials');
    nav_ogd06_links.push('/section/ogd06');
    nav_ogd06_targets.push(0);
    
    nav_ogd06_labels.push('Letters');
    nav_ogd06_links.push('/section/ogd06');
    nav_ogd06_targets.push(0);
    
    nav_ogd06_labels.push('The Lyons Den');
    nav_ogd06_links.push('/section/blogs14');
    nav_ogd06_targets.push(0);
    
    nav_ogd06_labels.push('Blogs');
    nav_ogd06_links.push('/section/blogs');
    nav_ogd06_targets.push(0);
    
    
    // -- classifieds
    
    nav_classifieds_labels = [];
    nav_classifieds_links = [];
    nav_classifieds_targets = [];
    
    nav_classifieds_labels.push('NNY Ads Home');
    nav_classifieds_links.push('http://www.nnyads.com/');
    nav_classifieds_targets.push(0);
    
    nav_classifieds_labels.push('NNY Jobs');
    nav_classifieds_links.push('http://jobs.nnyads.com/');
    nav_classifieds_targets.push(1);
    
    nav_classifieds_labels.push('NNY Real Estate');
    nav_classifieds_links.push('/section/classifieds01');
    nav_classifieds_targets.push(0);
    
    nav_classifieds_labels.push('Your Local Marketplace');
    nav_classifieds_links.push('http://yourlocalmarket.watertowndailytimes.com/');
    nav_classifieds_targets.push(1);
    
    
    // -- events
    
    nav_events_labels = [];
    nav_events_links = [];
    nav_events_targets = [];
    
    nav_events_labels.push('Today\'s Events');
    nav_events_links.push('/section/events?site=wdt&tpl=eventsearch&w=4&r=20&rl=Ogdensburg&wd_site=OGD');
    nav_events_targets.push(0);
    
    nav_events_labels.push('Search & Browse');
    nav_events_links.push('/section/events?site=wdt&tpl=eventsearch&w=4&r=20&rl=Ogdensburg&wd_site=OGD');
    nav_events_targets.push(0);
    
    
    // -- archive
    
    nav_archive_labels = [];
    nav_archive_links = [];
    nav_archive_targets = [];
    
    nav_archive_labels.push('Archive Search');
    nav_archive_links.push('http://nl.newsbank.com/nl-search/we/Archives/?p_action=keyword&amp;s_search_type=keyword&amp;p_product=NewsLibrary&amp;p_theme=newslibrary2&amp;d_sources=location&amp;d_place=OBJB&amp;p_nbid=&amp;');
    nav_archive_targets.push(1);
    
    
    // -- help
    
    nav_help_labels = [];
    nav_help_links = [];
    nav_help_targets = [];
    
    nav_help_labels.push('Contact Us');
    nav_help_links.push('/section/ogd_help01');
    nav_help_targets.push(0);
    
    
    // -- jobs
    
    nav_jobs_labels = [];
    nav_jobs_links = [];
    nav_jobs_targets = [];
    
    nav_jobs_labels.push('NNY Ads Home');
    nav_jobs_links.push('http://www.nnyads.com/');
    nav_jobs_targets.push(0);
    
    nav_jobs_labels.push('NNY Jobs');
    nav_jobs_links.push('http://jobs.nnyads.com/');
    nav_jobs_targets.push(1);
    
    nav_jobs_labels.push('NNY Real Estate');
    nav_jobs_links.push('/section/jobs01');
    nav_jobs_targets.push(0);
    
    nav_jobs_labels.push('Your Local Marketplace');
    nav_jobs_links.push('http://yourlocalmarket.watertowndailytimes.com/');
    nav_jobs_targets.push(1);
    
    
    // -- auto
    
    nav_auto_labels = [];
    nav_auto_links = [];
    nav_auto_targets = [];
    
    nav_auto_labels.push('NNY Ads Home');
    nav_auto_links.push('http://www.nnyads.com/');
    nav_auto_targets.push(0);
    
    nav_auto_labels.push('NNY Jobs');
    nav_auto_links.push('http://jobs.nnyads.com/');
    nav_auto_targets.push(1);
    
    nav_auto_labels.push('NNY Real Estate');
    nav_auto_links.push('/section/auto01');
    nav_auto_targets.push(0);
    
    nav_auto_labels.push('Your Local Marketplace');
    nav_auto_links.push('http://yourlocalmarket.watertowndailytimes.com/');
    nav_auto_targets.push(1);
    
    
    // -- homes
    
    nav_homes_labels = [];
    nav_homes_links = [];
    nav_homes_targets = [];
    
    nav_homes_labels.push('NNY Ads Home');
    nav_homes_links.push('http://www.nnyads.com/');
    nav_homes_targets.push(0);
    
    nav_homes_labels.push('NNY Jobs');
    nav_homes_links.push('http://jobs.nnyads.com/');
    nav_homes_targets.push(1);
    
    nav_homes_labels.push('NNY Real Estate');
    nav_homes_links.push('/section/homes01');
    nav_homes_targets.push(0);
    
    nav_homes_labels.push('Your Local Marketplace');
    nav_homes_links.push('http://yourlocalmarket.watertowndailytimes.com/');
    nav_homes_targets.push(1);
    
    
    // -- newsletters
    
    nav_newsletters_labels = [];
    nav_newsletters_links = [];
    nav_newsletters_targets = [];
    
    nav_newsletters_labels.push('Newsletters Registration');
    nav_newsletters_links.push('/section/wdt_help06');
    nav_newsletters_targets.push(0);
    
    }

function nav_arrays_dco()
    {
    
    // -- main
    
    nav_main_labels = [];
    nav_main_links = [];
    nav_main_targets = [];
    nav_main_section = [];
    
    nav_main_labels.push('Local');
    nav_main_links.push('/section/dco01');
    nav_main_targets.push(0);
    nav_main_section.push('dco01');
    
    nav_main_labels.push('National');
    nav_main_links.push('http://watertowndailytimes.com/section/national');
    nav_main_targets.push(1);
    nav_main_section.push('national');
    
    nav_main_labels.push('Sports');
    nav_main_links.push('/section/dco02');
    nav_main_targets.push(0);
    nav_main_section.push('dco02');
    
    nav_main_labels.push('Obituaries');
    nav_main_links.push('/section/dco03');
    nav_main_targets.push(0);
    nav_main_section.push('dco03');
    
    nav_main_labels.push('Opinion');
    nav_main_links.push('/section/dco06');
    nav_main_targets.push(0);
    nav_main_section.push('dco06');
    
    nav_main_labels.push('Calendar');
    nav_main_links.push('/section/events?site=wdt&tpl=eventsearch&w=4&r=25&rl=Potsdam&wd_site=DCO');
    nav_main_targets.push(0);
    nav_main_section.push('events');
    
    nav_main_labels.push('Archive');
    nav_main_links.push('http://nl.newsbank.com/nl-search/we/Archives/?p_action=keyword&amp;s_search_type=keyword&amp;p_product=NewsLibrary&amp;p_theme=newslibrary2&amp;d_sources=location&amp;d_place=DOMB&amp;p_nbid=&amp;');
    nav_main_targets.push(1);
    nav_main_section.push('archive');
    
    nav_main_labels.push('Contact');
    nav_main_links.push('/section/dco_help01');
    nav_main_targets.push(0);
    nav_main_section.push('help');
    
    nav_main_labels.push('Newsletters');
    nav_main_links.push('/section/wdt_help06');
    nav_main_targets.push(0);
    nav_main_section.push('newsletters');
    
    nav_main_labels.push('Classifieds');
    nav_main_links.push('http://www.nnyads.com/');
    nav_main_targets.push(0);
    nav_main_section.push('classifieds');
    
    nav_main_labels.push('Jobs');
    nav_main_links.push('http://jobs.thejobnetwork.com/nphomepage.aspx?AffiliateId=1506');
    nav_main_targets.push(1);
    nav_main_section.push('jobs');
    
    nav_main_labels.push('Auto');
    nav_main_links.push('http://www.nnyads.com/apps/pbcs.dll/cce?Module=1&amp;Category=classifieds&amp;Class=112&amp;range=1');
    nav_main_targets.push(0);
    nav_main_section.push('auto');
    
    nav_main_labels.push('Homes');
    nav_main_links.push('http://www.nnyads.com/apps/pbcs.dll/cce?Module=1&amp;Category=classifieds&amp;Class=102&amp;range=1');
    nav_main_targets.push(0);
    nav_main_section.push('homes');
    
    
    // -- dco01
    
    nav_dco01_labels = [];
    nav_dco01_links = [];
    nav_dco01_targets = [];
    
    nav_dco01_labels.push('Local News');
    nav_dco01_links.push('/section/dco01');
    nav_dco01_targets.push(0);
    
    nav_dco01_labels.push('Latest News');
    nav_dco01_links.push('/section/dco04');
    nav_dco01_targets.push(0);
    
    //nav_dco01_labels.push('Submit News Tip');
    //nav_dco01_links.push('/section/dco_newstip');
    //nav_dco01_targets.push(0);
    
    //nav_dco01_labels.push('News Feeds');
    //nav_dco01_links.push('/section/feeds?wd_site=DCO');
    //nav_dco01_targets.push(0);
    
    
    // -- national
    
    nav_national_labels = [];
    nav_national_links = [];
    nav_national_targets = [];
    
    nav_national_labels.push('U.S.');
    nav_national_links.push('http://watertowndailytimes.com/section/national01');
    nav_national_targets.push(1);
    
    nav_national_labels.push('New York');
    nav_national_links.push('http://watertowndailytimes.com/section/national02');
    nav_national_targets.push(1);
    
    nav_national_labels.push('Washington');
    nav_national_links.push('http://watertowndailytimes.com/section/national03');
    nav_national_targets.push(1);
    
    nav_national_labels.push('World');
    nav_national_links.push('http://watertowndailytimes.com/section/national04');
    nav_national_targets.push(1);
    
    nav_national_labels.push('Sports');
    nav_national_links.push('http://watertowndailytimes.com/section/national05');
    nav_national_targets.push(1);
    
    nav_national_labels.push('Entertainment');
    nav_national_links.push('http://watertowndailytimes.com/section/national06');
    nav_national_targets.push(1);
    
    nav_national_labels.push('Financial');
    nav_national_links.push('http://watertowndailytimes.com/section/national07');
    nav_national_targets.push(1);
    
    
    // -- dco02
    
    nav_dco02_labels = [];
    nav_dco02_links = [];
    nav_dco02_targets = [];
    
    nav_dco02_labels.push('Local Sports');
    nav_dco02_links.push('/section/dco02');
    nav_dco02_targets.push(0);
    
    nav_dco02_labels.push('Stats & Schedules');
    nav_dco02_links.push('/section/hssportsresults?wd_site=DCO');
    nav_dco02_targets.push(0);
    
    
    // -- dco03
    
    nav_dco03_labels = [];
    nav_dco03_links = [];
    nav_dco03_targets = [];
    
    nav_dco03_labels.push('Obituaries');
    nav_dco03_links.push('/section/dco03');
    nav_dco03_targets.push(0);
    
    
    // -- dco06
    
    nav_dco06_labels = [];
    nav_dco06_links = [];
    nav_dco06_targets = [];
    
    nav_dco06_labels.push('Editorials');
    nav_dco06_links.push('/section/dco06');
    nav_dco06_targets.push(0);
    
    nav_dco06_labels.push('Letters');
    nav_dco06_links.push('/section/dco06');
    nav_dco06_targets.push(0);
    
    nav_dco06_labels.push('Blogs');
    nav_dco06_links.push('/section/blogs');
    nav_dco06_targets.push(0);
    
    
    // -- classifieds
    
    nav_classifieds_labels = [];
    nav_classifieds_links = [];
    nav_classifieds_targets = [];
    
    nav_classifieds_labels.push('NNY Ads Home');
    nav_classifieds_links.push('http://www.nnyads.com/');
    nav_classifieds_targets.push(0);
    
    nav_classifieds_labels.push('NNY Jobs');
    nav_classifieds_links.push('http://jobs.nnyads.com/');
    nav_classifieds_targets.push(1);
    
    nav_classifieds_labels.push('NNY Real Estate');
    nav_classifieds_links.push('/section/classifieds01');
    nav_classifieds_targets.push(0);
    
    nav_classifieds_labels.push('Your Local Marketplace');
    nav_classifieds_links.push('http://yourlocalmarket.watertowndailytimes.com/');
    nav_classifieds_targets.push(1);
    
    
    // -- events
    
    nav_events_labels = [];
    nav_events_links = [];
    nav_events_targets = [];
    
    nav_events_labels.push('Today\'s Events');
    nav_events_links.push('/section/events?site=wdt&tpl=eventsearch&w=4&r=25&rl=Potsdam&wd_site=DCO');
    nav_events_targets.push(0);
    
    nav_events_labels.push('Search & Browse');
    nav_events_links.push('/section/events?site=wdt&tpl=eventsearch&w=4&r=25&rl=Potsdam&wd_site=DCO');
    nav_events_targets.push(0);
    
    
    // -- archive
    
    nav_archive_labels = [];
    nav_archive_links = [];
    nav_archive_targets = [];
    
    nav_archive_labels.push('Archive Search');
    nav_archive_links.push('http://nl.newsbank.com/nl-search/we/Archives/?p_action=keyword&amp;s_search_type=keyword&amp;p_product=NewsLibrary&amp;p_theme=newslibrary2&amp;d_sources=location&amp;d_place=DOMB&amp;p_nbid=&amp;');
    nav_archive_targets.push(1);
    
    
    // -- help
    
    nav_help_labels = [];
    nav_help_links = [];
    nav_help_targets = [];
    
    nav_help_labels.push('Contact Us');
    nav_help_links.push('/section/dco_help01');
    nav_help_targets.push(0);
    
    
    // -- jobs
    
    nav_jobs_labels = [];
    nav_jobs_links = [];
    nav_jobs_targets = [];
    
    nav_jobs_labels.push('NNY Ads Home');
    nav_jobs_links.push('http://www.nnyads.com/');
    nav_jobs_targets.push(0);
    
    nav_jobs_labels.push('NNY Jobs');
    nav_jobs_links.push('http://jobs.nnyads.com/');
    nav_jobs_targets.push(1);
    
    nav_jobs_labels.push('NNY Real Estate');
    nav_jobs_links.push('/section/jobs01');
    nav_jobs_targets.push(0);
    
    nav_jobs_labels.push('Your Local Marketplace');
    nav_jobs_links.push('http://yourlocalmarket.watertowndailytimes.com/');
    nav_jobs_targets.push(1);
    
    
    // -- auto
    
    nav_auto_labels = [];
    nav_auto_links = [];
    nav_auto_targets = [];
    
    nav_auto_labels.push('NNY Ads Home');
    nav_auto_links.push('http://www.nnyads.com/');
    nav_auto_targets.push(0);
    
    nav_auto_labels.push('NNY Jobs');
    nav_auto_links.push('http://jobs.nnyads.com/');
    nav_auto_targets.push(1);
    
    nav_auto_labels.push('NNY Real Estate');
    nav_auto_links.push('/section/auto01');
    nav_auto_targets.push(0);
    
    nav_auto_labels.push('Your Local Marketplace');
    nav_auto_links.push('http://yourlocalmarket.watertowndailytimes.com/');
    nav_auto_targets.push(1);
    
    
    // -- homes
    
    nav_homes_labels = [];
    nav_homes_links = [];
    nav_homes_targets = [];
    
    nav_homes_labels.push('NNY Ads Home');
    nav_homes_links.push('http://www.nnyads.com/');
    nav_homes_targets.push(0);
    
    nav_homes_labels.push('NNY Jobs');
    nav_homes_links.push('http://jobs.nnyads.com/');
    nav_homes_targets.push(1);
    
    nav_homes_labels.push('NNY Real Estate');
    nav_homes_links.push('/section/homes01');
    nav_homes_targets.push(0);
    
    nav_homes_labels.push('Your Local Marketplace');
    nav_homes_links.push('http://yourlocalmarket.watertowndailytimes.com/');
    nav_homes_targets.push(1);
    
    
    // -- newsletters
    
    nav_newsletters_labels = [];
    nav_newsletters_links = [];
    nav_newsletters_targets = [];
    
    nav_newsletters_labels.push('Newsletters Registration');
    nav_newsletters_links.push('/section/wdt_help06');
    nav_newsletters_targets.push(0);
    
    }
    
function nav_arrays_nnyads()
    {
    
    // -- main
    
    nav_main_labels = [];
    nav_main_links = [];
    nav_main_targets = [];
    nav_main_section = [];
    
    nav_main_labels.push('Classified Ads');
    nav_main_links.push('/section/classifieds');
    nav_main_targets.push(0);
    nav_main_section.push('classifieds');
    
    
    // -- classifieds
    
    nav_classifieds_labels = [];
    nav_classifieds_links = [];
    nav_classifieds_targets = [];
    
    nav_classifieds_labels.push('Search & Browse');
    nav_classifieds_links.push('http://www.nnyads.com/');
    nav_classifieds_targets.push(0);
    
    nav_classifieds_labels.push('NNY Jobs');
    nav_classifieds_links.push('http://jobs.nnyads.com/');
    nav_classifieds_targets.push(1);
    
    nav_classifieds_labels.push('NNY Real Estate');
    nav_classifieds_links.push('/section/classifieds01');
    nav_classifieds_targets.push(0);
    
    }

function nav_setup(active)
    {
    var mainnav = document.getElementById('nav1');
    var len = mainnav.childNodes.length;
    while (mainnav.hasChildNodes())
        {
        mainnav.removeChild(mainnav.firstChild);
        }
        
    if (nav_site.toLowerCase() == 'ogd')
        {
        nav_arrays_ogd();
        if ( !( document.getElementById( 'nav_' + active + '_labels' ) ) )
            {
            active = 'ogd01';
            }
        }
    else if (nav_site.toLowerCase() == 'dco')
        {
        nav_arrays_dco();
        if ( !( document.getElementById( 'nav_' + active + '_labels' ) ) )
            {
            active = 'dco01';
            }
        }
    else if (nav_site.toLowerCase() == 'nnyads')
        {
        nav_arrays_nnyads();
        if ( !( document.getElementById( 'nav_' + active + '_labels' ) ) )
            {
            active = 'classifieds';
            }
        }
    else
        {
        nav_arrays();
        if ( !( document.getElementById( 'nav_' + active + '_labels' ) ) )
            {
            //active = 'news';
            }
        }
    
    var home1 = document.createElement('li');
    home1.style.cursor = 'pointer';
    home1.setAttribute('onmouseover', 'navover(this); this.getElementsByTagName("img")[0].src="http://www.watertowndailytimes.com/images/homeicon_on.png"; clearTimeout(nav_timeout);');
    home1.setAttribute('onmouseout', 'this.className=""; this.getElementsByTagName("img")[0].src="http://www.watertowndailytimes.com/images/homeicon_off.png";');
        
    var home2 = document.createElement('a');
    home2.setAttribute('href', 'http://www.watertowndailytimes.com/');
    
    var home3 = document.createElement('img');
    home3.setAttribute('src', 'http://www.watertowndailytimes.com/images/homeicon_off.png');
    home3.setAttribute('alt', 'Home');
    home3.style.width = '18px';
    home3.style.height = '14px';
    home3.style.paddingBottom = '3px';
    
    document.getElementById('nav1').appendChild(home1);
    home1.appendChild(home2);
    home2.appendChild(home3);
    
    for (var i = 0; i < nav_main_labels.length; i++)
        {
        var new1 = document.createElement('li');
        new1.style.cursor = 'pointer';
        new1.setAttribute('onmouseover', 'set_subnav("' + nav_main_section[i] + '"); navover(this);');
        new1.setAttribute('onmouseout', 'navout();');
        new1.setAttribute('id', 'mainnav_' + nav_main_labels[i].toLowerCase());
        if (active == nav_main_section[i])
            {
            new1.setAttribute('class', 'selected');
            }
        if (nav_main_labels[i] == 'Classifieds' || nav_main_labels[i] == 'Jobs' || nav_main_labels[i] == 'Auto' || nav_main_labels[i] == 'Homes')
            {
            new1.style.backgroundColor = '#977';
            }
        new2 = document.createElement('a');
        new2.setAttribute('href', nav_main_links[i]);
        if (nav_main_targets[i] == 1)
            {
            new2.setAttribute('target', '_blank');
            }
        new3 = document.createTextNode(nav_main_labels[i]);
        document.getElementById('nav1').appendChild(new1);
        new1.appendChild(new2);
        new2.appendChild(new3);
        }
    set_subnav(active);
    }
function set_subnav(active)
    {
    var subnav = document.getElementById('nav2');
    var len = subnav.childNodes.length;
    while (subnav.hasChildNodes())
        {
        subnav.removeChild(subnav.firstChild);
        }
    
    var subnav_labels = window['nav_' + active + '_labels'];
    var subnav_links = window['nav_' + active + '_links'];
    var subnav_targets = window['nav_' + active + '_targets'];
    for (var i = 0; i < subnav_labels.length; i++)
        {
        var new1 = document.createElement('li');
        new1.style.cursor = 'pointer';
        new2 = document.createElement('a');
        new2.setAttribute('href', subnav_links[i]);
        if (subnav_targets[i] == 1)
            {
            new2.setAttribute('target', '_blank');
            }
        new3 = document.createTextNode(subnav_labels[i]);
        document.getElementById('nav2').appendChild(new1);
        new1.appendChild(new2);
        new2.appendChild(new3);
        }
    }
function navover(el)
    {
    if (typeof nav_timeout != 'undefined')
        {
        clearTimeout(nav_timeout);
        }
    if (el)
        {
        
        if (nav_site.toLowerCase() == 'ogd')
            {
            nav_arrays_ogd();
            }
        else if (nav_site.toLowerCase() == 'dco')
            {
            nav_arrays_dco();
            }
        else if (nav_site.toLowerCase() == 'nnyads')
            {
            nav_arrays_nnyads();
            }
        else
            {
            nav_arrays();
            }
        
        for (var i = 0; i < nav_main_labels.length; i++)
            {
            document.getElementById('mainnav_' + nav_main_labels[i].toLowerCase()).className = '';
            }
        el.className = 'selected';
        }
    }
function navout()
    {
    nav_timeout = setTimeout("nav_setup('" + currentnav + "')", 700);
    }