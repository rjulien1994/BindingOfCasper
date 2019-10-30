class Tear {
  constructor(player, game) {
    this.radius = player.attack*0.1*game.gameWidth/100;
    this.size = { x: 2*this.radius, y: 2*this.radius };
    this.position = {
      x: player.eyePosition.x + player.eyeSize.x - this.radius,
      y: player.eyePosition.y - this.radius
    };
    this.range = player.range * game.gameWidth / 100;
    this.speed = {
      x: player.direction.x * player.shotSpeed * game.gameWidth / 100 + player.speed.x,
      y: player.direction.y * player.shotSpeed * game.gameWidth / 100 + player.speed.y
    };
    this.distance = 0;
    this.end = false;
  }

  update(dt) {
    this.position.x += (this.speed.x * dt) / 1000;
    this.position.y += (this.speed.y * dt) / 1000;
    this.distance += ((this.speed.x + this.speed.y) * dt) / 1000;
    if (this.distance > this.range) {
      this.end = true;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "#27c2e8";
    ctx.beginPath();
    ctx.arc(this.position.x + this.radius, this.position.y + this.radius, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}
