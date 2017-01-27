var repeat = false,
	installed = false,
	control = null,
	v = null;

var mo = new MutationObserver(function(m) {
	v = document.querySelectorAll('video')[0];
	if (installed) {
		mo.disconnect();
	} else {
		control = document.querySelectorAll('.ytp-chrome-controls')[0];
		if (control)
			addToYoutube();
		else {
			control = document.querySelectorAll('.controls-wrapper .sidedock')[0];
			if (control) addToVimeo();
		}
	}
});
mo.observe(document.body, {"childList": true});

function addToYoutube(){
	var btn = document.createElement('button');
	btn.className = 'repeat-btn';
	btn.addEventListener('click', toggleYoutubeHandler);
	control.appendChild(btn);
	installed = true;
}

function toggleYoutubeHandler(){
	repeat = !repeat;
	this.classList.toggle('on');
	if (repeat)
		v.addEventListener('ended', playAgainY);
	else
		v.removeEventListener('ended', playAgainY);
}

function playAgainY(){
	v.play();
}

function addToVimeo(){
	var div = document.createElement('div');
	div.className = 'box';
	var btn = document.createElement('button');
	btn.className = 'repeat-btn rounded-box';
	btn.addEventListener('click', toggleVimeoHandler);
	div.appendChild(btn);
	control.appendChild(div);
	installed = true;
}

function toggleVimeoHandler(){
	repeat = !repeat;
	this.classList.toggle('on');
	if (repeat)
		v.addEventListener('timeupdate', playAgainV);
	else
		v.removeEventListener('timeupdate', playAgainV);
}

function playAgainV(){
	var delta = 0.5;
	if (this.currentTime >= this.duration - delta) {
		this.currentTime = 0;
	}
}