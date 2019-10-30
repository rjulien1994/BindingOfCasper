class levelDoor {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("deathDoor");
    this.size = {
      x: (this.game.gameWidth * 10) / 100,
      y: this.game.Limits.top + (1.5 * this.game.gameHeight) / 100
    }; //sets size
    this.position = {
      //sets position
      x: (50 * this.game.gameWidth) / 100 - this.size.x / 2,
      y: -game.gameHeight / 100
    };
  }

  update(dt) {
    if (Collision(this, this.game.player)) {
      this.game.loadLevel();
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size.x,
      1.3 * this.size.y
    );
  }
}

class goldenDoor {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("goldDoor");
    this.size = {
      x: this.game.Limits.left + this.game.gameWidth / 100,
      y: (this.game.gameHeight * 18) / 100
    }; //sets size
    this.position = {
      //sets position
      x: 0,
      y: (50 * this.game.gameHeight) / 100 - this.size.y / 2
    };
  }

  update(dt) {
    if (Collision(this, this.game.player)) {
      this.game.loadCredits();
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y
    );
  }
}

class satanDoor {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("satanDoor");
    this.size = {
      x: this.game.gameWidth - this.game.Limits.right + game.gameWidth / 100,
      y: (this.game.gameHeight * 18) / 100
    }; //sets size
    this.position = {
      //sets position
      x: game.gameWidth - this.size.x,
      y: (50 * this.game.gameHeight) / 100 - this.size.y / 2
    };
  }

  update(dt) {
    if (Collision(this, this.game.player)) {
      if(this.game.level !== 0) {
        document.getElementById("levelStats").submit();
      }
      this.game.resetGame();
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y
    );
  }
}
