class littleShit {
  constructor(game, position) {
    this.image = document.getElementById("littlePoop");
    this.game = game;
    this.screenSize = { x: game.gameWidth, y: game.gameHeight };
    this.size = {
      x: (game.gameHeight * 6) / 100,
      y: (game.gameHeight * 6) / 100
    };
    this.position = { x: position.x, y: position.y };
    this.speed = { x: 0, y: 0 };
    this.maxSpeed = (40 * game.gameWidth) / 100;
    this.acceleration = (15 * game.gameWidth) / 100;

    this.moveTimer = game.inGameTime + 1;
    this.hit = false;
  }
  update(dt) {
    this.updateSpeed(dt);
    //this.hit = Collision(this, this.game.player);
    this.game.player.tears.forEach(tear => {
      if (Collision(tear, this)) {
        tear.end = true;
        this.hit = true;
        this.game.levelstats.tearsHit += 1;
      }
    });
  }

  draw(context) {
    var mvt = Math.sin(this.game.inGameTime * 2 * Math.PI) * this.size.y * 0.1;
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y - mvt,
      this.size.x,
      this.size.y + mvt
    );
  }

  updateSpeed(dt) {
    if (
      (this.speed.x + this.speed.y === 0) &
      (this.game.inGameTime > this.moveTimer)
    ) {
      this.moveTimer = this.game.inGameTime + 1 + Math.random() * 4;
      var randNum = Math.floor(Math.random() * 4);
      var acc = this.maxSpeed - (Math.random() * this.maxSpeed) / 2;
      if (randNum === 0) {
        this.speed.y = acc;
      }
      if (randNum === 1) {
        this.speed.y = -acc;
      }
      if (randNum === 2) {
        this.speed.x = acc;
      }
      if (randNum === 3) {
        this.speed.x = -acc;
      }
    } else {
      this.speed.x -=
        (Math.sign(this.speed.x) * (this.acceleration * dt)) / 1000;
      this.speed.y -=
        (Math.sign(this.speed.y) * (this.acceleration * dt)) / 1000;
    }
    if (Math.abs(this.speed.x) + Math.abs(this.speed.y) < 2) {
      this.speed.x = 0;
      this.speed.y = 0;
    }

    this.position.x += (this.speed.x * dt) / 1000;
    this.position.y += (this.speed.y * dt) / 1000;

    this.limits();
  }

  checkHit(tear) {
    this.hit = Collision(this, tear);
  }

  limits() {
    if (this.position.x < this.game.Limits.left) {
      this.position.x = this.game.Limits.left;
      this.speed.x = -this.speed.x;
    }
    if (this.position.x + this.size.x > this.game.Limits.right) {
      this.position.x = this.game.Limits.right - this.size.x;
      this.speed.x = -this.speed.x;
    }
    if (this.position.y < this.game.Limits.top) {
      this.position.y = this.game.Limits.top;
      this.speed.y = -this.speed.y;
    }
    if (this.position.y + this.size.y > this.game.Limits.bottom) {
      this.position.y = this.game.Limits.bottom - this.size.y;
      this.speed.y = -this.speed.y;
    }
  }
}
