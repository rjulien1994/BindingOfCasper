class levelDoor {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("deathDoor");
    this.size = {
      x: 10,
      y: this.game.Limits.top + 1.5
    }; //sets size
    this.position = {
      //sets position
      x: 50 - this.size.x / 2,
      y: -0.75
    };
  }

  update(dt) {
    if (Collision(this, this.game.player)) {
      if(user.admin === 'True' && this.game.level === 0) {
        document.getElementById('adminBoard').style.display = "none";
        this.game.player.attack = document.getElementById("attackEdit").value;
        this.game.player.maxSpeed = document.getElementById("speedEdit").value;
        this.game.player.fireRate = document.getElementById("fireRateEdit").value;
        this.game.player.range = document.getElementById("rangeEdit").value;
        this.game.player.shotSpeed = document.getElementById("shotSpeedEdit").value;
      }
      this.game.loadLevel();
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x * this.game.units.x,
      this.position.y * this.game.units.y,
      this.size.x * this.game.units.x,
      1.3 * this.size.y  * this.game.units.y
    );
  }
}

class goldenDoor {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("goldDoor");
    this.size = {
      x: this.game.Limits.left + 1,
      y: 13.5
    }; //sets size
    this.position = {
      //sets position
      x: 0,
      y: this.game.gameHeight/2 - this.size.y / 2
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
      this.position.x * this.game.units.x,
      this.position.y * this.game.units.y,
      this.size.x * this.game.units.x,
      this.size.y * this.game.units.y
    );
  }
}

class satanDoor {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("satanDoor");
    this.size = {
      x: this.game.gameWidth - this.game.Limits.right + 1,
      y: 13.5
    }; //sets size
    this.position = {
      //sets position
      x: game.gameWidth - this.size.x,
      y: this.game.gameHeight/2 - this.size.y / 2
    };
  }

  update(dt) {
    if (Collision(this, this.game.player)) {
      if (this.game.level != 0) {
        let parameters = {
          attack: this.game.player.attack, 
          speed: this.game.player.maxSpeed,
          fireRate: this.game.player.fireRate,
          range: this.game.player.range,
          shotSpeed: this.game.player.shotSpeed,
          phone: this.game.touchScreen
        };
       postData(parameters); 
      }
      this.game.resetGame();
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x  * this.game.units.x,
      this.position.y * this.game.units.y,
      this.size.x * this.game.units.x,
      this.size.y * this.game.units.y
    );
  }
}
