
let x = NaN;
let y = NaN;
window.addEventListener("mousemove", event => {
    x = event.clientX;
    y = event.clientY;
}, { passive: true });

let cats = [];

function catMove(src, cat, img) {
    return;
    let dx = cat.xReal - cat.x;
    if (Math.abs(dx) > cat.speed) dx = cat.speed * Math.sign(dx);
    let dy = cat.yReal - cat.y;
    if (Math.abs(dy) > cat.speed) dy = cat.speed * Math.sign(dy);
    cat.xReal -= dx;
    cat.yReal -= dy;
    cat.style.left = `${cat.xReal}px`;
    cat.style.top = `${cat.yReal}px`;
}

function catUpdate(src, cat, img) {
    if (cat.matches(":hover")) {
        if (cat.anim === src.tiltl || cat.anim === src.tiltr) {
            cat.animstate = 0;
        } else {
            cat.animstate = 0;
            cat.anim = Math.random() > 0.5 ? src.tiltl : src.tiltr;
        }
        cat.idle = 4;
    } else {
        const rect = cat.getBoundingClientRect();
        const dis = (
            (rect.x + src.width / 2 - x) ** 2 +
            (rect.y + src.height - y) ** 2
        ) ** 0.5;
        cat.style.transition = `left ${100/dis}s ease-out, top ${100/dis}s ease-out`;
        if (dis > 15) {
            cat.style.left = `${x}px`;
            cat.style.top = `${y}px`;
            if (rect.y > y) {
                cat.anim = dis > 10 ? src.runn : src.walkn;
            } else {
                cat.anim = dis > 10 ? src.runs : src.walks;
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
        } else if (cat.idle > 5) {
            cat.anim = src.idle;
        }
    }
    cat.animstate %= cat.anim.length;
    cat.animframe = cat.anim[cat.animstate];
    img.style.marginLeft = `-${cat.animframe[0] * src.width}px`;
    img.style.marginTop = `-${cat.animframe[1] * src.height}px`;
}

function catAdd(src) {
    const cat = document.createElement("div");
    cat.anim = src.idle;
    cat.animstate = 0;
    cat.idle = 0;
    cat.state = cat.anim[0];
    cat.style.marginLeft = `-${src.width / 2}px`;
    cat.style.marginTop = `-${src.height}px`;
    cat.style.position = "absolute";
    cat.style.width = `${src.width}px`;
    cat.style.height = `${src.height}px`;
    cat.style.overflow = "hidden";
    cat.style.cursor = "pointer";
    const img = document.createElement("img");
    img.src = src.path;
    cat.src = src;
    cat.img = img;
    cat.appendChild(img);
    document.body.appendChild(cat);
    cats.push(cat);
    catUpdate(src, cat, img);
    setInterval(catUpdate.bind(undefined, src, cat, img), 1000);
    setInterval(catMove.bind(undefined, src, cat, img), 10);
}

catAdd({
    path: "cat.png",
    width: 32,
    height: 32,
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
})