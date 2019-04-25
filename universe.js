ether = new p5();

class Mass {
  constructor(name, x, y, radius, mass) {
      this.name = name;
      this.mass = mass;
      this.radius = radius;
      this.origin = createVector(x, y);
      this.pos = createVector(x, y);
      this.vel = createVector(0, 0);
      this.accel = createVector(0, 0);
  }

  draw() {
    circle(this.pos.x, this.pos.y, this.radius);
  }

  updateForces() {
    let deltaV_x = 0;
    let deltaV_y = 0;

    var i;
    for (i = 0; i < universe.length; i++) {
      let obj = universe[i];
      if (this == obj) { continue; }
      
      let m1 = this.mass;
      let m2 = obj.mass;
      let r = this.direction(obj);
      let force_x = G*m1*m2 / Math.pow(r[0], 2);
      let force_y = G*m1*m2 / Math.pow(r[1], 2);
      deltaV_x += force_x * t / this.mass
      deltaV_y += force_y * t / this.mass
    }
    this.vel.x += deltaV_x;
    this.vel.y += deltaV_y;
  }

  updatePosition() {
    this.pos.x = this.origin.x + this.vel.x*t + 0.5 * this.accel.x * Math.pow(t, 2);
    this.pos.y = this.origin.y + this.vel.y*t + 0.5 * this.accel.y * Math.pow(t, 2);
  }

  distance(other) {
    return dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
  }

  direction(other) {
    return [this.pos.x - other.pos.x, this.pos.y - other.pos.y];
  }
}



let t = 0;
let fr = 30;
const G = 6.674 * Math.pow(10, -11);

var HelloWorld = new Mass("HelloWorld", 100, 100, 10, 100);
HelloWorld.vel.x = 20;
var DavidWorld = new Mass("DavidWorld", 200, 200, 20, 400);

let universe = [HelloWorld, DavidWorld];

function setup() {
  frameRate(fr);
  createCanvas(1000, 1000);
  // noLoop();
}

function draw() {
  background(230);
  HelloWorld.draw();
  DavidWorld.draw();

  t += 1 / fr;

  // Update forces
  for (var key in universe) { universe[key].updateForces(); }
  // Update positions
  for (var key in universe) { universe[key].updatePosition(); }
}

function mousePressed() {
  // t += 1 / frameCount;
  // HelloWorld.update();
  // loop();

  print(HelloWorld.distance(DavidWorld));
}
