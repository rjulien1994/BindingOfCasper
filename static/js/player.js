class player {
  constructor(game) {
    this.game = game; //import the game into the player
    //First we initialize the charactert
    this.ID = document.getElementById("playerID").value;

    this.image = document.getElementById("ghost"); //loads ouline
    this.crownImg = document.getElementById("crown");
    this.haloImg = document.getElementById("Halo");
    this.won = false;
    this.resetPlayer();
  }

  update(dt) {
    this.position.x += (this.speed.x * dt) / 1000;
    this.position.y += (this.speed.y * dt) / 1000; //changes position of player

    this.game.levelstats.distanceTravelled +=
      ((Math.abs(this.speed.x) + Math.abs(this.speed.y)) * dt / 1000) * 1/this.game.gameWidth;

    this.tears.forEach(tear => tear.update(dt));
    this.tears = this.tears.filter(tear => !tear.end); //if player shot, update tears

    if (!this.looking) {
      this.direction.x = Math.sign(this.speed.x);
      this.direction.y = Math.sign(this.speed.y); //if player not looking eyes follow speed
    } else {
      this.shoot(); //if the player is looking we shoot
    }

    this.gameLimits(); //prevents player from reaching outter bonds

    if (this.game.gameState === 1) {
      //We only check for damage if in game mode
      this.game.monsters.forEach(monster => {
        this.hit = this.hit || Collision(monster, this);
      });
    }
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y
    ); //draws outline of guost
    context.font = "18px Arial";
    context.fillStyle = "Black";
    context.textAlign = "center";
    context.fillText(this.ID, this.position.x + this.size.x/2, this.position.y - this.size.y/8);
    if (this.won) {
      this.drawCrown(context);
    }
    this.drawEyes(context);
    this.drawMouth(context);
    if (this.hit) {
      this.drawHalo(context);
    }

    this.tears.forEach(object => object.draw(context));
  }

  drawHalo(context) {
    context.drawImage(
      this.haloImg,
      this.position.x + this.size.x / 10,
      this.position.y - this.size.y / 10,
      this.size.x,
      this.size.y / 5
    );
  }

  drawEyes(context) {
    this.eyePosition = {
      x: this.position.x + (this.size.x * 3) / 8,
      y: this.position.y + this.size.y * 0.4
    };
    this.eyeSize = { x: this.size.x / 8, y: this.size.y / 8 };

    if (this.direction.x !== 0) {
      this.eyePosition.x +=
        ((Math.sign(this.direction.x) * this.size.x) / 2) * 0.55;
      this.eyeSize.x *= 0.75;
    }

    if (this.direction.y !== 0) {
      this.eyePosition.y +=
        ((Math.sign(this.direction.y) * this.size.y) / 2) * 0.2;
      this.eyeSize.y *= 0.75;
    }

    if (this.blink) {
      this.eyeSize.y /= 10;
    }

    context.fillStyle = "#000000";
    context.beginPath();
    context.ellipse(
      this.eyePosition.x,
      this.eyePosition.y,
      this.eyeSize.x,
      this.eyeSize.y,
      0,
      0,
      2 * Math.PI
    );
    context.ellipse(
      this.eyePosition.x + this.eyeSize.x * 2,
      this.eyePosition.y,
      this.eyeSize.x,
      this.eyeSize.y,
      0,
      0,
      2 * Math.PI
    );
    context.fill();

    if (!this.blink) {
      var pupilSize = { x: this.eyeSize.x / 2, y: this.eyeSize.y / 2 };
      var pupilPosition = { x: this.eyePosition.x, y: this.eyePosition.y };

      context.fillStyle = "#d6d6d4";
      context.beginPath();
      context.ellipse(
        pupilPosition.x,
        pupilPosition.y,
        pupilSize.x,
        pupilSize.y,
        0,
        0,
        2 * Math.PI
      );
      context.ellipse(
        pupilPosition.x + this.eyeSize.x * 2,
        pupilPosition.y,
        pupilSize.x,
        pupilSize.y,
        0,
        0,
        2 * Math.PI
      );
      context.fill();
    }
  }
  drawMouth(context) {
    var mouthPosition = {
      x: this.position.x + this.size.x / 2,
      y: this.position.y + this.size.y * 0.7
    };
    var mouthSize = { x: (this.size.x / 2) * 0.5, y: (this.size.y / 2) * 0.2 };

    if (this.direction.x !== 0) {
      mouthPosition.x += Math.sign(this.direction.x) * (this.size.x / 2) * 0.4;
      mouthSize.x *= 0.8;
    }
    if (this.direction.y !== 0) {
      mouthPosition.y += Math.sign(this.direction.y) * (this.size.y / 2) * 0.2;
      mouthSize.y *= 1.2;
    }

    context.fillStyle = "#d6d6d4";
    context.beginPath();
    context.ellipse(
      mouthPosition.x,
      mouthPosition.y,
      mouthSize.x,
      mouthSize.y,
      0,
      Math.PI,
      2 * Math.PI
    );

    context.ellipse(
      mouthPosition.x,
      mouthPosition.y,
      mouthSize.x,
      mouthSize.y * 0.5,
      0,
      2 * Math.PI,
      Math.PI,
      true
    );
    context.stroke();
    context.fill();
  }
  drawCrown(context) {
    context.drawImage(
      this.crownImg,
      this.position.x - (0.2 * this.game.gameWidth) / 100,
      this.position.y - (6 * this.game.gameHeight) / 100,
      this.size.x * 1.2,
      this.size.y * 0.65
    );
  }

  gameLimits() {
    if (this.position.x < this.game.Limits.left) {
      this.position.x = this.game.Limits.left;
    }
    if (this.position.x + this.size.x > this.game.Limits.right) {
      this.position.x = this.game.Limits.right - this.size.x;
    }
    if (this.position.y < this.game.Limits.top) {
      this.position.y = this.game.Limits.top;
    }
    if (this.position.y + this.size.y > this.game.Limits.bottom) {
      this.position.y = this.game.Limits.bottom - this.size.y;
    }
  }

  move(direction) {
    if (direction.y !== 0) {
      this.speed.y = this.maxSpeed * this.game.gameWidth * direction.y / 100;
    }
    if (direction.x !== 0) {
      this.speed.x = this.maxSpeed * this.game.gameWidth * direction.x / 100;
    }
  }
  stop(direction) {
    if (direction.y) {
      this.speed.y = 0;
    }
    if (direction.x) {
      this.speed.x = 0;
    }
  }

  look(direction) {
    this.direction = { x: direction.x, y: direction.y };
    this.looking = true;
  }
  stopLooking() {
    this.direction = { x: 0, y: 0 };
    this.looking = false;
    this.blink = false;
  }

  blinkTrigger() {
    this.blink = !this.blink;
  }

  shoot() {
    if (this.shotTime + 1 / this.fireRate < this.game.inGameTime) {
      this.game.levelstats.tearsShot += 1;
      this.tears.push(new Tear(this, this.game));
      this.shotTime = this.game.inGameTime;
      this.blink = true;
    } else if (this.shotTime + 1 / this.fireRate / 2 < this.game.inGameTime) {
      this.blink = false;
    }
  }

  resetPlayer() {
    this.size = {
      x: (this.game.gameWidth * 5) / 100,
      y: (this.game.gameHeight * 15) / 100
    }; //sets size
    this.position = {
      x: this.game.gameWidth / 2 - this.size.x / 2,
      y: this.game.gameHeight / 2 - this.size.y / 2
    }; //sets position
    this.speed = { x: 0, y: 0 }; //sets speed var
    this.eyeSize = { x: this.size.x / 8, y: this.size.y / 8 }; //sets size of eyes
    this.eyePosition = {
      //sets eyes position
      x: this.position.x + (this.size.x * 3) / 8,
      y: this.position.y + this.size.y * 0.4
    };
    //creates a vector where the class tears will appear
    this.blink = false; //create variable for blinking action
    this.direction = { x: 0, y: 0 };
    this.tears = [];
    this.looking = false;

    //Now we set the game stats of the character
    this.attack = document.getElementById("attack").value;  //all stats given in % of screenWidth
    this.maxSpeed = document.getElementById("maxSpeed").value;
    this.fireRate = document.getElementById("fireRate").value;
    this.range = document.getElementById("range").value;
    this.shotSpeed = document.getElementById("shotSpeed").value;

    this.shotTime = 0;
    this.hit = false;
  }
}
