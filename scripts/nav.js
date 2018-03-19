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