
let socket;
let cnv;
let r, g, b;

function centerCanvas() {
    const x = (windowWidth - width) / 2;
    const y = (windowHeight - height) /2;;
    cnv.position(x, y);
}

function setup() {
    cnv = createCanvas(700, 600);
    cnv.style('border','2px solid black');
    cnv.style('border-radius', '10px');
    centerCanvas();
    background(255);
    r = random(255);
    g = random(255);
    b = random(255);

    socket = io.connect('http://localhost:3000');
    socket.on('mouse', newDrawing);
}

function newDrawing(data) {
    strokeWeight(2);
    stroke(r, g, b);
    fill(r, g, b, 127);
        
    ellipse(data.x, data.y, 30, 30);
}
  
function mouseDragged() {
    console.log('Sending: ' + mouseX + ', ' + mouseY);

    let data = {
        x: mouseX,
        y: mouseY
    }

    socket.emit('mouse', data);

    strokeWeight(2);
    stroke(r, g, b);
    fill(r, g, b, 127);

    ellipse(mouseX, mouseY, 30, 30);
}
/* 
function draw() {
    //if(mouseIsPressed) {
      //  fill('red');
    //} else {
      //  fill(255);
    //}
    //ellipse(mouseX, mouseY, 30, 30);

    if(mouseIsPressed) {
        strokeWeight(2);
        stroke(r, g, b);
        fill(r, g, b, 127);
    } else {
        return;
    }
    ellipse(mouseX, mouseY, 30, 30);
  } */

function windowResized() {
    centerCanvas();
}

function mousePressed() {
    let d = dist(mouseX, mouseY, mouseX, mouseY);
    if(d < 100) {
        r = random(255);
        g = random(255);
        b = random(255);
    }
}