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
    circle((this.pos.x * scale) + (dim / 2),
           (this.pos.y * scale) + (dim / 2),
           (this.radius * scale) * 300000);
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
      deltaV_x += force_x * delta_t / this.mass
      deltaV_y += force_y * delta_t / this.mass
    }

    print(this.vel.x);
    print(this.vel.y);
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
    return [this.pos.x - other.pos.x / this.distance(other),
            this.pos.y - other.pos.y / this.distance(other)];
  }
}



let t = 0;
let fr = 30;
const scale = 1 / Math.pow(10, 9);  // in meters
let delta_t = 1 / fr;
const G = 6.674 * Math.pow(10, -11);
const dim = 1000;
let universe = [
  HelloWorld = new Mass("Earth", 0, -152 * Math.pow(10, 9), 3958.8, 5.972 * Math.pow(10, 24)),
  BrendanWorld = new Mass("Sun", 0, 0, 432170, 1.989 * Math.pow(10, 30))
];
HelloWorld.vel.x = 30000 * 86400;



function setup() {
  frameRate(fr);
  createCanvas(dim, dim);
}



function draw() {
  background(230);
  HelloWorld.draw();
  // DavidWorld.draw();
  BrendanWorld.draw();

  print("\nTime: " + t);
  t += delta_t;

  // Update forces
  for (var key in universe) { universe[key].updateForce(); }
  // Update positions
  for (var key in universe) { universe[key].updatePosition(); }
}
