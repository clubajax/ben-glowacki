var formalerts = [];
var userregeditformsubmit = 0;


function isel(id)
    {
    if (document.getElementById(id))
        {
        return true;
        }
    return false;
    }

function isnull(thevar)
    {
    if (typeof thevar === 'undefined')
        {
        return true;
        }
    else if (!thevar)
        {
        return true;
        }
    else
        {
        return false;
        }
    }


function isset(thevar)
    {
    return (typeof thevar !== 'undefined');
    }


function geturlvar(urlvarname)
    {
    var urlhalves = String(document.location).split("?");
    
    var urlvarvalue = "";
    
    if (urlhalves[1])
        {
        var urlvars = urlhalves[1].split("&");
        
        for (i = 0; i <= urlvars.length; i++)
            {
            if (urlvars[i])
                {
                var urlvarpair = urlvars[i].split("=");
                
                if (urlvarpair[0] && (urlvarpair[0] == urlvarname))
                    {
                    urlvarvalue = urlvarpair[1];
                    }
                }
            }
        }
    return urlvarvalue;
    }


function aplinktargets(classname)
    {
    var linkitems = document.getElementsByClassName(classname)[0].getElementsByTagName('a');
    for (i = 0; i < linkitems.length; i++)
        {
        linkitems[i].target = "_blank";
        }
    
    var moreitems = document.getElementsByClassName(classname)[0].getElementsByClassName('morelink');
    for (i = 0; i < moreitems.length; i++)
        {
        moreitems[i].getElementsByTagName('a')[0].target = "_self";
        }
    }


function togvis(block_id, block_type)
    {
    block_vis = document.getElementById(block_id).style.display;
    if (block_vis == 'none')
        {
        document.getElementById(block_id).style.display = block_type;
        }
    else
        {
        document.getElementById(block_id).style.display = 'none';
        }
    }


function nl_togthumb(block_id, type)
    {
    if (type == 'show')
        {
        nl_timeout_id = setTimeout(function() {togvis(block_id,'block')}, 500);
        }
    else if (type == 'hide')
        {
        clearTimeout(nl_timeout_id);
        nl_showthumb_delay = togvis(block_id,'none');
        }
    }


function set_commenttext(el,aid)
    {
    var com_div = 'commentsbody' + aid;
    if (document.getElementById(com_div).style.display == 'none')
        {
        el.innerHTML = 'SHOW COMMENTS';
        }
    else
        {
        el.innerHTML = 'HIDE COMMENTS';
        }
    suspend_reload = 1;
    }


function comments_setiframe(artno, pub, link, pubdate, category, headline)
    {
    var div_id = 'commentsbody' + artno;
    var div_el = document.getElementById(div_id);
    
    if (div_el.innerHTML == '')
        {
        div_el.innerHTML = '<iframe id="commentsframe' + artno + '" name="commentsframe' + artno + '" src="http://webapps.wdt.net/usercomments/index.php?pub=' + pub + '&aid=' + artno + '&linkback=' + link + '&pubdate=' + pubdate + '&acat=' + category + '&head=' + headline + '" width="100%" height="700" scrolling="auto" frameborder="0" style="border: 0;"><\/iframe>';
        /*alert(div_el.innerHTML);/**/
        }
    }


function switchtab(tabnum, tabtotal, prefix)
    {
    var tabid = '';
    var panelid = '';
    for (i = 1; i <= tabtotal; i++)
        {
        tabid = prefix + '_tab' + i;
        panelid = prefix + '_panel' + i;
        document.getElementById(tabid).setAttribute('class', 'blocktab');
        document.getElementById(panelid).setAttribute('class', 'blockpanel');
        }
    tabid = prefix + '_tab' + tabnum;
    panelid = prefix + '_panel' + tabnum;
    document.getElementById(tabid).setAttribute('class', 'blocktab_active');
    document.getElementById(panelid).setAttribute('class', 'blockpanel_active');
    }





function checknlbox(idstr)
    {
    var el, el2;
    var idarr = idstr.split(',');
    for (var i = 0; i < idarr.length; i++)
        {
        el = document.getElementById(idarr[i]);
        el2 = document.getElementById(idarr[i] + '-dummy');
        if (el.checked === false)
            {
            el.style.display = 'none';
            el2.style.display = 'inline';
            el.value = 0;
            el.checked = true;
            }
        }
    }

function geturlnvp(varname)
    {
    var nvp;
    var query = window.location.search.substring(1);
    var nvps = query.split('&');
    for (var i = 0; i < nvps.length; i++)
        {
        nvp = nvps[i].split('=');
        if (nvp[0] == varname)
            {
            return nvp[1];
            }
        }
    return false;
    }

function checkage(fieldid)
    {
    if (document.getElementById(fieldid).checked === false)
        {
        formalerts.push('Federal law (COPPA) prohibits user registration by children below the age of 13.');
        }
    }

function checkfieldfilled(theform,fields)
    {
    var elobj, el;
    var fieldarr = fields.split(';');
    for (var i = 0; i < fieldarr.length; i++)
        {
        elobj = fieldarr[i].split(',');
        el = document.getElementById(elobj[0]);
        
        switch (elobj[1])
            {
            case 'select':
                if (el.options[el.selectedIndex].value == '')
                    {
                    formalerts.push('You did not complete one or more required fields.');
                    return;
                    }
                break;
            case 'text':
            default:
                if (el.value == '')
                    {
                    formalerts.push('You did not complete one or more required fields.');
                    return;
                    }
                break;
            }
        }
    }

function pwcompare(pwid1,pwid2)
    {
    var pw1 = document.getElementById(pwid1).value;
    var pw2 = document.getElementById(pwid2).value;
    if (pw1 != pw2)
        {
        formalerts.push('The password and password confirmation do not match.');
        }
    }

function uregeditform_validate()
    {
    if (userregeditformsubmit == 1)
        {
        if (formalerts.length > 0)
            {
            var alertstr = 'The following problems were detected:' + "\n\n" + formalerts.join("\n\n");
            alert(alertstr);
            formalerts = [];
            return false;
            }
        else
            {
            return true;
            }
        }
    }


// InitCookieSearchParams(document.login); // doesn't seem to work

function eatcookie()
    {
    var r = Math.floor(Math.random() * 99999);
    document.cookie     = "http://www.watertowndailytimes.com/article/20131031/NEWS03/usernamepassword=;Path=/";
    document.cookie     = "http://www.watertowndailytimes.com/article/20131031/NEWS03/UserRegID=;Path=/";
    document.location   = "/section/wdt_help06?r=" + r + "&RegLogout=1";
    //document.location   = "/section/wdt_help06?RegLogout=1";
    //document.location   = "/section/wdt_help06";
    }


function build_tooltip(parent_el, tooltip_id, tooltip_text)
    {
    var parent_el_w = parent_el.offsetWidth + 10;
    var ttbox = document.createElement('div');
    ttbox.style.position = 'absolute';
    ttbox.style.top = '0';
    ttbox.style.left = parent_el_w + 'px';
    ttbox.style.width = '150px';
    ttbox.style.backgroundColor = '#FFF';
    ttbox.style.borderRadius = '5px';
    ttbox.style.border = '1px solid #369';
    ttbox.style.padding = '6px';
    ttbox.style.color = '#369';
    ttbox.style.zIndex = '100';
    ttbox.style.lineHeight = '165%';
    ttbox.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.5)';
    ttbox.setAttribute('id',tooltip_id);
    var tttext = document.createTextNode(tooltip_text);
    ttbox.appendChild(tttext);
    parent_el.appendChild(ttbox);
    }


function kill_tooltip(tooltip_id)
    {
    var el = document.getElementById(tooltip_id);
    el.parentNode.removeChild(el);
    }


function smssubmit(user_id)
    {
    userregeditformsubmit = 1;
    
    if (formalerts.length == 0)
        {
        // set vars
    
        var frm = 'form-edituserprofile';
    
        var mobile_areacode = document.getElementById(frm).sms_mobile_areacode.value;
        var mobile_exchange = document.getElementById(frm).sms_mobile_exchange.value;
        var mobile_linenumber = document.getElementById(frm).sms_mobile_linenumber.value;
        var mobile = encodeURIComponent(mobile_areacode + mobile_exchange + mobile_linenumber);
        var carrier = encodeURIComponent(document.getElementById(frm).sms_carrier.value);
    
        var breaking = (document.getElementById(frm).sms_breaking.checked) ? 1 : 0;
        var weather = (document.getElementById(frm).sms_weather.checked) ? 1 : 0;
        var school = (document.getElementById(frm).sms_school.checked) ? 1 : 0;
        document.getElementById(frm).sms_breaking.name = '';
        document.getElementById(frm).sms_weather.name = '';
        document.getElementById(frm).sms_school.name = '';
        
        var schoolstxt = '';
        if (school == 1)
            {
            var el = document.getElementById(frm).sms_schoolscb;
            for (var i = 0; i < el.length; i++)
                {
                if (el[i].checked)
                    {
                    if (schoolstxt != '')
                        {
                        schoolstxt += ',';
                        }
                    schoolstxt += "'" + el[i].value + "'";
                    }
                el[i].name = '';
                }
            schoolstxt = encodeURIComponent(schoolstxt);
            }
    
        /* 
        if mobile & carrier & (breaking == 1 | weather == 1 | schoolstxt != '') set hidden form field 'sms' value to 1 else 0
        */

        if ( (user_id > 0) && (mobile.length >= '10') && (carrier != '') )
            {
            var newscript = document.createElement('script');
            newscript.type = 'text/javascript';
            newscript.src = 'http://webapps.wdt.net/sms/smssubmit.php?form_id=form-edituserprofile&amp;user_id=' + user_id + '&mobile=' + mobile + '&carrier=' + carrier + '&breaking=' + breaking + '&weather=' + weather + '&schoolstxt=' + schoolstxt;

            document.body.appendChild(newscript);
            }
        else if (user_id > 0)
            {
            var newscript = document.createElement('script');
            newscript.type = 'text/javascript';
            newscript.src = 'http://webapps.wdt.net/sms/smssubmit.php?form_id=form-edituserprofile&amp;user_id=' + user_id + '&mobile=&carrier=&breaking=0&weather=0&schoolstxt=';

            document.body.appendChild(newscript);
            }
        
        if ( (mobile != '') && (carrier != '') && ( (breaking == 1) || (weather == 1) || (schoolstxt != '') ) )
            {
            var newfield = document.createElement('input');
            newfield.type = 'hidden';
            newfield.name = 'sms';
            newfield.value = '1';
            document.getElementById(frm).appendChild(newfield);
            }
        }
    
    userregeditformsubmit = 0;
    }












