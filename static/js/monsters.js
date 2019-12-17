class littleShit {
  constructor(game, position) {
    this.image = document.getElementById("littlePoop");
    this.game = game;
    this.setSize();
    this.position = { x: position.x, y: position.y };
    this.speed = { x: 0, y: 0 };

    this.moveTimer = game.inGameTime + 1;
    this.lives = 13;
    this.hit = false;
  }

  update(dt) {
    this.updateSpeed(dt);
    //this.hit = Collision(this, this.game.player);
    this.game.player.tears.forEach(tear => {
      if (Collision(tear, this)) {
        this.speed.x += 8* Math.sign(tear.speed.x);
        this.speed.y += 8* Math.sign(tear.speed.y);
        tear.end = true;
        this.lives -= this.game.player.attack;
        this.game.levelstats.tearsHit += 1;
        if(this.lives <= 0) {this.hit = true};
      }
    });
  }

  draw(context) {
    var mvt = Math.sin(this.game.inGameTime * 2 * Math.PI) * this.size.y * 0.1;
    context.drawImage(
      this.image,
      this.position.x * this.game.units.x,
      (this.position.y - mvt) * this.game.units.y,
      this.size.x * this.game.units.x,
      (this.size.y + mvt) * this.game.units.y
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

  setSize() {
    this.size = {
      x: (game.gameHeight * 6) / 100,
      y: (game.gameHeight * 6) / 100
    };
    this.maxSpeed = (40 * game.gameWidth) / 100;
    this.acceleration = (15 * game.gameWidth) / 100;
  }
}

class fly {
  constructor(game, position) {
    this.image = document.getElementById("fly");
    this.game = game;

    this.size = {
      x: (game.gameWidth * 4) / 100,
      y: (game.gameHeight * 3) / 100
    };

    this.maxSpeed = (10 * game.gameWidth) / 100;
    this.position = { x: position.x, y: position.y };
    this.speed = { x: 0, y: 0 };
    this.direction = { x: 0, y: 0 };

    this.lives = 10;
    this.hitTimer = 0;
    this.hitDirection = {x: 0, y: 0};
    this.hit = false;
  }

  update(dt) {
    this.direction.x = this.game.player.position.x - this.position.x;
    this.direction.y = this.game.player.position.y - this.position.y;

    let magnitude = Math.pow(Math.pow(this.direction.x,2) +  Math.pow(this.direction.y,2),0.5);
    
    this.speed.x = this.direction.x*this.maxSpeed/magnitude;
    this.speed.y = this.direction.y*this.maxSpeed/magnitude;

    this.game.player.tears.forEach(tear => {
      if (Collision(tear, this)) {
        this.hitTimer = this.game.inGameTime;
        this.hitDirection = {x: 4*Math.sign(tear.speed.x), y: 4*Math.sign(tear.speed.y)};
        tear.end = true;
        this.lives -= this.game.player.attack;
        this.game.levelstats.tearsHit += 1;
        if(this.lives <= 0) {this.hit = true};
      }
    });
    if(this.hitTimer + 0.25 > this.game.inGameTime) {
      this.speed.x += this.hitDirection.x;
      this.speed.y += this.hitDirection.y;
    }
    this.position.x += this.speed.x * dt/1000;
    this.position.y += this.speed.y * dt/1000;
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.position.x * this.game.units.x,
      this.position.y * this.game.units.y,
      this.size.x * this.game.units.x,
      this.size.y * this.game.units.y
    );
  }

}

class evilGhost {
  constructor(game, position) {
    this.game = game; //import the game into the player

    this.image = document.getElementById("ghostMonster"); //loads ouline

    this.size = {
      x: (this.game.gameWidth * 3) / 100,
      y: (this.game.gameHeight * 9) / 100
    }; //sets size
    this.position = {x: position.x, y: position.y}; //sets position
    this.speed = { x: 0, y: 0 }; //sets speed var
    this.eyeSize = { x: this.size.x / 8, y: this.size.y / 8 }; //sets size of eyes
    this.eyePosition = {
      x: this.position.x + (this.size.x * 3) / 8,
      y: this.position.y + this.size.y * 0.4
    };
    //creates a vector where the class tears will appear
    this.blink = false; //create variable for blinking action
    this.direction = { x: 0, y: 0 };

    this.maxSpeed = 20;
    this.lives = 19;
    this.hitTimer = 0;
    this.hitDirection = {x:0, y:0};
    this.hit = false;
    this.timer = this.game.inGameTime;
    this.delay = 0;
    this.rand = Math.floor(Math.random()*4);
  }

  update(dt) {
    let options = [{ x: this.maxSpeed, y: 0},{ x: -this.maxSpeed, y: 0},{ x: 0, y: this.maxSpeed},{ x: 0, y: -this.maxSpeed} ];

    if(this.timer + this.delay < this.game.inGameTime) {
      this.delay = Math.random() * 5;
      this.timer = this.game.inGameTime;
      this.rand = Math.floor(Math.random()*4);
    }

    this.speed = options[this.rand];

    if(this.hitTimer + 0.25 > this.game.inGameTime) {
      this.speed.x += this.hitDirection.x;
      this.speed.y += this.hitDirection.y;
    }

    this.gameLimits(); //prevents player from reaching outter bonds

    this.position.x += (this.speed.x * dt) / 1000;
    this.position.y += (this.speed.y * dt) / 1000; //changes position of player

    //this.tears.forEach(tear => tear.update(dt));
    //this.tears = this.tears.filter(tear => !tear.end); //if player shot, update tears

    this.direction.x = Math.sign(this.speed.x);
    this.direction.y = Math.sign(this.speed.y); //if player not looking eyes follow speed

    this.game.player.tears.forEach(tear => {
      if (Collision(tear, this)) {
        this.hitTimer = this.game.inGameTime;
        this.hitDirection = {x: 4*Math.sign(tear.speed.x), y: 4*Math.sign(tear.speed.y)};
        tear.end = true;
        this.lives -= this.game.player.attack;
        this.game.levelstats.tearsHit += 1;
        if(this.lives <= 0) {this.hit = true};
      }
    });
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.position.x * this.game.units.x,
      this.position.y * this.game.units.y,
      this.size.x * this.game.units.x,
      this.size.y * this.game.units.y
    ); //draws outline of guost
    this.drawEyes(context);
    this.drawMouth(context);
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
      (this.eyePosition.x) * this.game.units.x,
      (this.eyePosition.y) * this.game.units.y,
      (this.eyeSize.x) * this.game.units.x,
      (this.eyeSize.y) * this.game.units.y,
      0,
      0,
      2 * Math.PI
    );
    context.ellipse(
      (this.eyePosition.x + this.eyeSize.x * 2) * this.game.units.x,
      (this.eyePosition.y) * this.game.units.y,
      (this.eyeSize.x) * this.game.units.x,
      (this.eyeSize.y) * this.game.units.y,
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
        pupilPosition.x * this.game.units.x,
        pupilPosition.y * this.game.units.y,
        pupilSize.x * this.game.units.x,
        pupilSize.y * this.game.units.y,
        0,
        0,
        2 * Math.PI
      );
      context.ellipse(
        (pupilPosition.x + this.eyeSize.x * 2) * this.game.units.x,
        pupilPosition.y * this.game.units.y,
        pupilSize.x * this.game.units.x,
        pupilSize.y * this.game.units.y,
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
      y: this.position.y + this.size.y * 0.6
    };
    var mouthSize = { x: (this.size.x / 2) * 0.5, y: (this.size.y / 2) * 0.3 };

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
      mouthPosition.x * this.game.units.x,
      mouthPosition.y * this.game.units.y,
      mouthSize.x * this.game.units.x,
      mouthSize.y * this.game.units.y,
      0,
      Math.PI,
      2 * Math.PI,
      true
    );

    context.ellipse(
      mouthPosition.x * this.game.units.x,
      mouthPosition.y * this.game.units.y,
      mouthSize.x * this.game.units.x,
      mouthSize.y * 0.5 * this.game.units.y,
      0,
      2 * Math.PI,
      Math.PI
    );
    context.stroke();
    context.fill();
  }

  changeDirection() {
    let rand = Math.floor(Math.random()*4);
    let options = [{ x: this.maxSpeed, y: 0},{ x: -this.maxSpeed, y: 0},{ x: 0, y: this.maxSpeed},{ x: 0, y: -this.maxSpeed} ];
    this.speed = options[rand];
  }

  gameLimits() {
    if (this.position.x < this.game.Limits.left) {
      this.position.x = this.game.Limits.left;
      this.rand = Math.floor(Math.random()*4);
    }
    if (this.position.x + this.size.x > this.game.Limits.right) {
      this.position.x = this.game.Limits.right - this.size.x;
      this.rand = Math.floor(Math.random()*4);
    }
    if (this.position.y < this.game.Limits.top) {
      this.position.y = this.game.Limits.top;
      this.rand = Math.floor(Math.random()*4);
    }
    if (this.position.y + this.size.y > this.game.Limits.bottom) {
      this.position.y = this.game.Limits.bottom - this.size.y;
      this.rand = Math.floor(Math.random()*4);
    }
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
}
