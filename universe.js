ether = new p5();



class Mass {
  constructor(name, x, y, radius, mass, isGridDot = false) {
      this.name = name
      this.mass = mass
      this.radius = radius
      this.pos = createVector(x, y)
      this.vel = createVector(0, 0)
      this.accel = createVector(0, 0)
      this.isGridDot = isGridDot
  }

  draw() {
    let scaledXpos = this.pos.x * scale + dim / 2
    let scaledYpos = this.pos.y * scale + dim / 2
    let scaledRadius = this.radius * scale * 1000

    if (this.isGridDot) {
      point(scaledXpos, scaledYpos)
      stroke(0)
    } else {
      circle(scaledXpos,
             scaledYpos,
             scaledRadius);
    }
  }

  updateForce() {
    this.accel.x = 0;
    this.accel.y = 0;

    var i;
    for (i = 0; i < universe.length; i++) {
      let obj = universe[i]
      if (this == obj) { continue }

      let m1 = this.mass
      let m2 = obj.mass
      let r = this.distance(obj)
      let force = G*m1*m2 / Math.pow(r, 2)
      let r_hat = this.unitDistance(obj)
      let force_x = force * -r_hat[0]
      let force_y = force * -r_hat[1]
      this.accel.x += force_x / this.mass
      this.accel.y += force_y / this.mass
    }

    this.vel.x += this.accel.x * delta_t
    this.vel.y += this.accel.y * delta_t
  }

  updatePosition() {
    this.pos.x += this.isGridDot ? this.vel.x * delta_t * 10000 : this.vel.x * delta_t // + 0.5 * this.accel.x * Math.pow(delta_t, 2)
    this.pos.y += this.isGridDot ? this.vel.y * delta_t * 10000 : this.vel.y * delta_t // + 0.5 * this.accel.y * Math.pow(delta_t, 2)
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
let fr = 60;
const scale = 1 / Math.pow(10, 9);  // in meters
let delta_t = 86140;
const G = 6.67408 * Math.pow(10, -11);
const dim = 1500;
let universe = [
  Sun = new Mass("Sun", 0, 0, 695.51 * Math.pow(10, 5), 1.989 * Math.pow(10, 30)),
  Mercury = new Mass("Mercury", 0, -57.91 * Math.pow(10, 9), 2.4397 * Math.pow(10, 6), 3.285 * Math.pow(10, 23)),
  Venus = new Mass("Venus", 0, -108.2 * Math.pow(10, 9), 6.0518 * Math.pow(10, 6), 4.867 * Math.pow(10, 24)),
  Earth = new Mass("Earth", 0, -152 * Math.pow(10, 9), 6.371 * Math.pow(10, 6), 5.972 * Math.pow(10, 24)),
  // Moon = new Mass("Moon", 0, -152.3844 * Math.pow(10, 9), 1.7371 * Math.pow(10, 6), 7.34767309 * Math.pow(10, 22)),
  Mars = new Mass("Mars", 0, -227.9 * Math.pow(10, 9), 3.3895 * Math.pow(10, 6), 6.39 * Math.pow(10, 23)),
  Jupiter = new Mass("Jupiter", 0, -778.5 * Math.pow(10, 9), 69.911 * Math.pow(10, 6), 1.898 * Math.pow(10, 27))
];
Mercury.vel.x = 47400;
Venus.vel.x = 35000;
Earth.vel.x = 30000;
// Moon.vel.x = 31000;
Mars.vel.x = 24000;
Jupiter.vel.x = 13100;



function setup() {
  frameRate(fr);
  createCanvas(dim, dim);
}



function draw() {
  background(230);
  noStroke();

  let grid = createGrid()
  // Update forces
  for (var key in grid) { grid[key].updateForce() }
  // Update positions
  for (var key in grid) { grid[key].updatePosition() }
  // Draw grid
  for (var key in grid) { grid[key].draw() }

  let c = color('yellow');
  fill(c);
  Sun.draw();

  c = color("grey");
  fill(c);
  Mercury.draw();

  c = color("brown");
  fill(c);
  Venus.draw();

  c = color('blue');
  fill(c);
  Earth.draw();

  // c = color('grey');
  // fill(c);
  // Moon.draw();

  c = color('red');
  fill(c);
  Mars.draw();

  c = color('orange');
  fill(c);
  Jupiter.draw();

  print(`Days: ${t / 86140}`);
  t += delta_t;

  // Update forces
  for (var key in universe) { universe[key].updateForce(); }
  // Update positions
  for (var key in universe) { universe[key].updatePosition(); }
}


function createGrid() {
  let grid = []

  for (var i = -dim/2; i < dim/2; i+=150) {
    for (var j = -dim/2; j < dim/2; j+=5) {
      p1 = new Mass(
        name = `p1_${i}_${j}`,
        x = i * Math.pow(10, 9),
        y = j * Math.pow(10, 9),
        radius = 1,
        mass = 1.989 * Math.pow(10, 30),
        isGridDot = true
      )
      p2 = new Mass(
        name = `p2_${j}_${i}`,
        x = j * Math.pow(10, 9),
        y = i * Math.pow(10, 9),
        radius = 1,
        mass = 1.989 * Math.pow(10, 30),
        isGridDot = true
      )
      grid.push(p1)
      grid.push(p2)
    }
  }

  return grid
}
