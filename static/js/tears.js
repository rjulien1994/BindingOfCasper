class Tear {
  constructor(player, game) {
    this.game = game;
    this.player = player;
    this.attack = player.attack;
    this.setSize();

    this.position = {
      x: player.eyePosition.x + player.eyeSize.x - this.radius,
      y: player.eyePosition.y - this.radius
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
    ctx.arc((this.position.x + this.radius) * this.game.units.x, (this.position.y + this.radius) * this.game.units.y, this.radius * this.game.units.y, 0, 2 * Math.PI);
    ctx.fill();
  }

  setSize() {
    this.radius = this.attack*0.1*this.game.gameWidth/100;
    this.size = { x: 2*this.radius, y: 2*this.radius };
    this.speed = {
      x: this.player.direction.x * this.player.shotSpeed * this.game.gameWidth / 100 + this.player.speed.x,
      y: this.player.direction.y * this.player.shotSpeed * this.game.gameWidth / 100 + this.player.speed.y
    };
    this.range = this.player.range * this.game.gameWidth / 100;
  }
}
