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

  draw(displayText = false) {
    let scaledXpos = this.pos.x * scale + dim / 2;
    let scaledYpos = this.pos.y * scale + dim / 2;
    let scaledRadius = this.radius * scale * 1000;

    circle(scaledXpos,
           scaledYpos,
           scaledRadius);

    if (displayText) {
      textSize(8);
      text(this.name,
        scaledXpos - this.name.length * 2,
        scaledYpos + scaledRadius + 5);
    }
  }

  updateForce() {
    this.accel.x = 0;
    this.accel.y = 0;

    var i;
    for (i = 0; i < universe.length; i++) {
      let obj = universe[i];
      if (this == obj) { continue; }

      let m1 = this.mass;
      let m2 = obj.mass;
      let r = this.distance(obj);
      let force = G*m1*m2 / Math.pow(r, 2);
      let r_hat = this.unitDistance(obj);
      let force_x = force * -r_hat[0];
      let force_y = force * -r_hat[1];
      this.accel.x += force_x / this.mass
      this.accel.y += force_y / this.mass
    }

    // print(`${this.name} x: ${this.vel.x}`);
    // print(`${this.name} y: ${this.vel.x}`);
    this.vel.x += this.accel.x * delta_t;
    this.vel.y += this.accel.y * delta_t;
  }

  updatePosition() {
    this.pos.x += this.vel.x*delta_t; // + 0.5 * this.accel.x * Math.pow(delta_t, 2);
    this.pos.y += this.vel.y*delta_t; // + 0.5 * this.accel.y * Math.pow(delta_t, 2);
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
const scale = 1 / Math.pow(10, 9);  // in meters
let delta_t = 86140;
const G = 6.67408 * Math.pow(10, -11);
const dim = 1000;
let universe = [
  Sun = new Mass("Sun", 0, 0, 695.51 * Math.pow(10, 5), 1.989 * Math.pow(10, 30)),
  Mercury = new Mass("Mercury", 0, 57.91 * Math.pow(10, 9), 2.4397 * Math.pow(10, 6), 3.285 * Math.pow(10, 23)),
  Earth = new Mass("Earth", 0, -152 * Math.pow(10, 9), 6.371 * Math.pow(10, 6), 5.972 * Math.pow(10, 24)),
  Mars = new Mass("Mars", 0, -227.9 * Math.pow(10, 9), 3.3895 * Math.pow(10, 6), 6.39 * Math.pow(10, 23))
];
Earth.vel.x = 30000;
Mercury.vel.x = 47400;
Mars.vel.x = 24000;



function setup() {
  frameRate(fr);
  createCanvas(dim, dim);
}



function draw() {
  background(230);
  noStroke();

  let c = color('yellow');
  fill(c);
  Sun.draw();

  c = color("brown");
  fill(c);
  Mercury.draw();

  c = color('blue');
  fill(c);
  Earth.draw(displayText = true);

  c = color('red');
  fill(c);
  Mars.draw();

  print(`Days: ${t / 86140}`);
  t += delta_t;

  // Update forces
  for (var key in universe) { universe[key].updateForce(); }
  // Update positions
  for (var key in universe) { universe[key].updatePosition(); }
}
