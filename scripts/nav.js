const more = document.getElementById('nav-more');
const links = more.querySelectorAll('a');
const popup = more.querySelector('ul');
let timer;
let showing = true;

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





/*function showHideFunction() {
    var x = document.getElementById('dropdown');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}*/
