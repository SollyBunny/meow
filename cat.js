{

let x = NaN;
let y = NaN;
let cats = [];

window.addEventListener("mousemove", event => {
	x = event.clientX;
	y = event.clientY;
}, { passive: true });

function catUpdate(src, cat) {
	if (cat.hovered) {
		if (cat.anim === src.tiltl || cat.anim === src.tiltr) {
			cat.animstate = 0;
		} else {
			cat.animstate = 0;
			cat.anim = Math.random() > 0.5 ? src.tiltl : src.tiltr;
		}
		cat.idle = 4;
	} else {
		const rect = cat.getBoundingClientRect();
		const dx = rect.x + src.tilew / 2 - x;
		const dy = rect.y + src.tileh - y;
		const dis = (
			dx ** 2 +
			dy ** 2
		) ** 0.5;
		if (dis > 100) cat.style.transition = `left ${dis / 150}s linear, top ${dis / 150}s linear`;
		else           cat.style.transition = `left ${dis / 100}s linear, top ${dis / 100}s linear`;
		if (dis > 15) {
			let dir = Math.atan2(dy, dx) / (Math.PI * 2) * 8 - 2;
			if (dir < 0) dir += 8;
			dir = Math.round(dir) % 8;
			cat.anim = (dir > 100 ? src.run : src.walk)[dir];
			cat.idle = 0;
			let newx = x + Math.round(Math.random() * 50 - 25);
			let newy = y + Math.round(Math.random() * 50 - 10);
			if (newx < src.tileh * 1.5) newx = src.tileh * 1.5;
			else if (newx > window.innerWidth - src.tileh * 1.5) newx = window.innerWidth - src.tileh * 1.5;
			if (newy < src.tilew * 1.5) newy = src.tilew * 1.5;
			else if (newy > window.innerHeight - src.tilew * 1.5) newy = window.innerHeight - src.tilew * 1.5;
			cat.style.left = `${newx}px`;
			cat.style.top = `${newy}px`;
		}
		cat.animstate += 1;
		cat.idle += 1;
		if      (cat.idle > 25) cat.anim = src.idle4;
		else if (cat.idle > 20) cat.anim = src.idle3;
		else if (cat.idle > 15) cat.anim = src.idle2;
		else if (cat.idle > 10) cat.anim = src.idle1;
		else if (cat.idle > 2)  cat.anim = src.idle;
	}
	cat.animstate %= cat.anim[1];
	cat.style.backgroundPosition = `${cat.animstate * -src.tilew}px ${cat.anim[0] * -src.tileh}px`;
}

function catHover(event) {
	event.target.hovered = true;
}
function catUnhover(event) {
	event.target.hovered = false;
}

function catAdd(src) {
	src.walk = [
		src.walkn,
		src.walkne,
		src.walke,
		src.walkse,
		src.walks,
		src.walksw,
		src.walkw,
		src.walknw
	];
	src.run = [
		src.runn,
		src.runne,
		src.rune,
		src.runse,
		src.runs,
		src.runsw,
		src.runw,
		src.runnw
	];

	const cat = document.createElement("meow");
	cat.onmouseenter = catHover;
	cat.onmouseleave = catUnhover;
	cat.anim = src.idle;
	cat.animstate = 0;
	cat.idle = 0;
	cat.state = cat.anim[0];

	cat.style.marginLeft = `-${src.tilew / 2}px`;
	cat.style.marginTop = `-${src.tileh}px`;
	cat.style.position = "fixed";
	cat.style.width = `${src.tilew}px`;
	cat.style.height = `${src.tileh}px`;
	cat.style.cursor = "pointer";
	cat.style.backgroundImage = `url(${src.path})`
	cat.style.backgroundSize = `${src.w}px ${src.h}px`;
	cat.style.imageRendering = "pixelated";

	const els = document.getElementsByTagName("meowbed");
	if (els.length > 0) {
		const el = els[Math.floor(Math.random() * els.length)];
		const rect = el.getBoundingClientRect();
		cat.style.left = `${rect.x + rect.width / 2}px`;
		cat.style.top = `${rect.y + rect.height}px`;
	}

	cat.src = src;
	document.body.appendChild(cat);
	cats.push(cat);
	catUpdate(src, cat);
	setInterval(catUpdate.bind(undefined, src, cat), 1000);
}

window.meow = catAdd.bind(undefined, {
	path: "cat.png",
	w: 64 * 3,
	h: 64 * 23,
	tilew: 64,
	tileh: 64,
	idle: [0, 1],
	idle1: [1, 3],
	idle2: [2, 3],
	idle3: [3, 3],
	idle4: [4, 3],
	tiltl: [5, 3],
	tiltr: [6, 3],
	walkn: [7, 2],
	runn: [8, 2],
	walkne: [9, 2],
	runne: [10, 2],
	walke: [11, 2],
	rune: [12, 2],
	walkse: [13, 2],
	runse: [14, 2],
	walks: [15, 2],
	runs: [16, 2],
	walksw: [17, 2],
	runsw: [18, 2],
	walkw: [19, 2],
	runw: [20, 2],
	walknw: [21, 2],
	runnw: [22, 2],
});

}

window.onload = () => {
	meow();
};