const files =
	'<script src="//localhost:35755/livereload.js"></script>';

if (location.hostname === 'localhost') {
	document.write(files);
}

const SCROLL_AMT = 160;
let topShowing = true;
document.querySelector('main').addEventListener('scroll', function (e) {
	const pos = e.target.scrollTop;
	console.log('pos', pos);
	if (pos >= SCROLL_AMT && topShowing) {
		topShowing = false;
		document.body.classList.add('hide-top');
	} else if (pos < SCROLL_AMT && !topShowing) {
		topShowing = true;
		document.body.classList.remove('hide-top');
	}
});