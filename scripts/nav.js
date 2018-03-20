const more = document.getElementById('nav-more');
const links = more.querySelectorAll('a');
const popup = more.querySelector('ul');
let timer;
let showing = false;

function showMore () {
	clearTimeout(timer);
	if (showing) { return; }
	showing = true;
	popup.style.display = 'block';
}

function hideMore () {
	timer = setTimeout(function () {
		if (!showing) { return; }
		showing = false;
		popup.style.display = '';
	}, 100)

}

more.addEventListener('focus', showMore);
more.addEventListener('blur', hideMore);
for (let i = 0; i < links.length; i++) {
	link = links[i];
	link.addEventListener('focus', showMore);
	link.addEventListener('blur', hideMore);
}

/*window.onload = pre_loader;

			 function pre_loader() {
					 var nodes = document.querySelectorAll(".nav-bar__list");
					 for (var i = 0; i < nodes.length; i++) {
							 var n = nodes[i];
							 n.style.display = n.style.display = 'block';
							 n.style.display = n.style.opacity = '1';
					 }
			 }*/


more.addEventListener('click', function() {
	if (popup.style.display === 'none') {
			popup.style.display = 'block';
	} else {
			popup.style.display = 'none';
	}
}, false );

/*var menuItems = document.querySelectorAll('li.more');
Array.prototype.forEach.call(menuItems, function(el, i){
	el.querySelector('a').addEventListener("click",  function(event){
		if (this.parentNode.className == "more") {
			this.parentNode.className = "more open";
			this.setAttribute('aria-expanded', "true");
		} else {
			this.parentNode.className = "more";
			this.setAttribute('aria-expanded', "false");
		}
		event.preventDefault();
		return false;
	});
});*/



/*function showHideFunction() {
    var x = document.getElementById('dropdown');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}*/
