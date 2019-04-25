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

  updateForce() {
    print(this.name);
    let deltaV_x = 0;
    let deltaV_y = 0;

    var i;
    for (i = 0; i < universe.length; i++) {
      let obj = universe[i];
      if (this == obj) { continue; }

      let m1 = this.mass;
      let m2 = obj.mass;
      let r = this.distance(obj);
      let r_hat = this.unitDistance(obj);
      let force = G*m1*m2 / Math.pow(r, 2);
      let force_x = force * -r_hat[0];
      let force_y = force * -r_hat[1];
      print(force_y);
      deltaV_x += force_x * delta_t / this.mass
      deltaV_y += force_y * delta_t / this.mass
    }

    this.vel.x += deltaV_x;
    this.vel.y += deltaV_y;
  }

  updatePosition() {
    this.pos.x += this.vel.x*delta_t + 0.5 * this.accel.x * Math.pow(delta_t, 2);
    this.pos.y += this.vel.y*delta_t + 0.5 * this.accel.y * Math.pow(delta_t, 2);
  }

  distance(other) {
    return dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
  }

  unitDistance(other) {
    return [(this.pos.x - other.pos.x) / this.distance(other),
            (this.pos.y - other.pos.y) / this.distance(other)];
  }
}



let t = 0;
let fr = 30;
let delta_t = 1 / fr;
const G = 6.674 * Math.pow(10, -11);

var HelloWorld = new Mass("HelloWorld", 100, 100, 10, Math.pow(10, 12));
HelloWorld.vel.x = 80;
var DavidWorld = new Mass("DavidWorld", 200, 200, 20, Math.pow(10, 15.2));
DavidWorld.vel.x = 60;
var BrendanWorld = new Mass("BrendanWorld", 500, 500, 100, Math.pow(10, 16));

let universe = [HelloWorld, DavidWorld, BrendanWorld];

function setup() {
  frameRate(fr);
  createCanvas(1000, 1000);
  // noLoop();
}

function draw() {
  background(230);
  HelloWorld.draw();
  DavidWorld.draw();
  BrendanWorld.draw();

  print("\nTime: " + t);
  t += delta_t;

  // Update forces
  for (var key in universe) { universe[key].updateForce(); }
  // Update positions
  for (var key in universe) { universe[key].updatePosition(); }
}

function mousePressed() {
  // t += 1 / frameCount;
  // HelloWorld.update();
  // loop();

  print(HelloWorld.distance(DavidWorld));
}
