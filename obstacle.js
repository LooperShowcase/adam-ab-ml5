class Obstacle {
  constructor() {
    this.size = 150;
    this.x = width;
    this.y = height - this.size;
    this.option = random(1);
  }

  show() {
    if (this.option > 0.5) {
      image(obs, this.x, this.y, this.size, this.size);
    } else {
      image(obs2, this.x, this.y, this.size, this.size);
    }
  }
  move() {
    this.x -= 13;
  }
}
