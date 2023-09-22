const canvas = document.getElementById('cvs');
const ctx = canvas.getContext('2d');

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let particles = [];

let mae = -0.01;

function createParticle(x, y, vx, vy, age, color){
    return {x: x, y: y,vx: vx,vy: vy,age: age,color: color};
}

function createGroup(number, age, color) {
    let group = [];
    for(let i=0;i<=number;i++){
        group.push(createParticle(Math.random() * canvasWidth, Math.random() * canvasHeight, 0, 0, age, color));
    }
    particles.push(group);
    return group;
}

function rule(group1, group2, g){
    for (let i = 0; i < group1.length; i++) {
        fx = 0;
        fy = 0;
        for (let j = 0; j < group2.length; j++) {
          a = group1[i];
          b = group2[j];
          dx = a.x - b.x;
          dy = a.y - b.y;
          d = Math.sqrt(dx * dx + dy * dy);
          if (d > 0 && d < 80) {
            F = (g * 1) / d;
            fx += F * dx;
            fy += F * dy;
          }
        }
        a.vx = (a.vx + fx) * 0.5;
        a.vy = (a.vy + fy) * 0.5;
        a.x += a.vx;
        a.y += a.vy;
        if (a.x <= 0 || a.x >= canvasWidth-5) { a.vx *= -1; }
        if (a.y <= 0 || a.y >= canvasHeight-5) { a.vy *= -1; }
      }
}


let purple = createGroup(400, 0, 'purple');
let yellow = createGroup(100, 0, 'yellow');
let blue = createGroup(400, 0, 'lightblue');
let green = createGroup(60, 0, 'green');

function draw(){
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    rule(purple, purple, mae);
    rule(green, green, 0.2);
    rule(green, blue, -0.2);
    rule(yellow, purple, -0.19);
    rule(yellow,   green, -0.02);
    rule(yellow, yellow, 0.5)
    rule(green, yellow, -0.1);
    rule(blue, purple, -0.7);
    rule(blue, green, -0.1);



    particles.forEach(
        (y) => {
            y.forEach(
                (x) => {
                    ctx.fillStyle = x.color;
                    ctx.beginPath();
                    ctx.arc(x.x, x.y, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            )
        }
    );
    requestAnimationFrame(draw);
}

function getRandomNumber(min, max) {
    // Gere um número aleatório entre 0 (inclusive) e 1 (exclusivo)
    const randomDecimal = Math.random();

    // Dimensione o número aleatório para o intervalo [min, max]
    const randomNumber = min + randomDecimal * (max - min);

    return randomNumber;
}

setInterval(()=>mae = getRandomNumber(-0.2, 0.01), getRandomNumber(5000, 10000));

draw();