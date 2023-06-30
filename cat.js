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
		const dir = Math.atan2(dy, dx);
		cat.style.transition = `left ${dis / 100}s linear, top ${dis / 100}s linear`;
		if (dis > 15) {
			cat.style.left = `${x + Math.round(Math.random() * 50 - 25)}px`;
			cat.style.top = `${y + Math.round(Math.random() * 50 - 10)}px`;
			if (rect.y > y) {
				cat.anim = dis > 100 ? src.runn : src.walkn;
			} else {
				cat.anim = dis > 100 ? src.runs : src.walks;
			}
			cat.idle = 0;
		}
		cat.animstate += 1;
		cat.idle += 1;
		if (cat.idle > 20) {
			cat.anim = src.idle3;
		} else if (cat.idle > 15) {
			cat.anim = src.idle2;
		} else if (cat.idle > 10) {
			cat.anim = src.idle1;
		} else if (cat.idle > 2) {
			cat.anim = src.idle;
		}
	}
	cat.animstate %= cat.anim.length;
	cat.animframe = cat.anim[cat.animstate];
	cat.style.backgroundPosition = `${cat.animframe[0] * -src.tilew}px ${cat.animframe[1] * -src.tileh}px`;
}

function catHover(event) {
	event.target.hovered = true;
}
function catUnhover(event) {
	event.target.hovered = false;
}

function catAdd(src) {
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
	cat.src = src;
	document.body.appendChild(cat);
	cats.push(cat);
	catUpdate(src, cat);
	setInterval(catUpdate.bind(undefined, src, cat), 1000);
}

window.meow = catAdd.bind(undefined, {
	path: "cat.png",
	w: 64 * 9,
	h: 64 * 9,
	tilew: 64,
	tileh: 64,
	idle: [
		[3, 7]
	],
	idle1: [
		[8, 0],
		[8, 1],
		[8, 2],
	],
	idle2: [
		[7, 1],
		[7, 2],
		[7, 3],
	],
	idle3: [
		[6, 6],
		[0, 7],
		[1, 7],
	],
	tiltl: [
		[5, 7],
		[3, 7],
		[3, 7],
	],
	tiltr: [
		[7, 0],
		[3, 7],
		[3, 7],
	],
	walks: [
		[0, 0],
		[1, 0],
	],
	runs: [
		[2, 0],
		[2, 1],
	],
	walkn: [
		[0, 6],
		[2, 6]
	],
	runn: [
		[6, 0],
		[6, 1],
	]
});

}

meow();