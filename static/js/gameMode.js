class menu {
  constructor(game) {
    this.game = game;
    this.doors = [
      new levelDoor(game),
      new goldenDoor(game),
      new satanDoor(game)
    ];
    this.arrows = [
      document.getElementById("leftArrow"),
      document.getElementById("topArrow"),
      document.getElementById("rightArrow")
    ];
    this.arrowsSize = { x: game.gameWidth / 10, y: game.gameWidth / 10 };
    this.keysIcons = [
      document.getElementById("shootKeys"),
      document.getElementById("moveKeys")
    ];
  }
  update(dt) {
    this.doors.forEach(door => {
      door.update(dt);
    });
  }
  draw(ctx) {
    this.doors.forEach(door => {
      door.draw(ctx);
    });

    var textSize = this.game.gameHeight / 30;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = textSize + "px Arial";

    ctx.globalAlpha = 0.4;

    ctx.drawImage(
      //draws the icon
      this.arrows[0],
      this.game.gameWidth / 6 - this.arrowsSize.x / 2,
      this.game.gameHeight / 2 - this.arrowsSize.y / 2,
      this.arrowsSize.x,
      this.arrowsSize.y
    );
    ctx.fillText(
      "Next Level",
      (6 * this.game.gameWidth) / 10,
      this.game.gameHeight / 4
    );
    ctx.drawImage(
      //draws the icon
      this.arrows[1],
      this.game.gameWidth / 2 - this.arrowsSize.x / 2,
      this.game.gameHeight / 4 - this.arrowsSize.y / 2,
      this.arrowsSize.x,
      this.arrowsSize.y
    );
    ctx.fillText(
      "Start Over",
      (8.3 * this.game.gameWidth) / 10,
      (4.5 * this.game.gameHeight) / 10
    );
    ctx.drawImage(
      //draws the icon
      this.arrows[2],
      (5 * this.game.gameWidth) / 6 - this.arrowsSize.x / 2,
      this.game.gameHeight / 2 - this.arrowsSize.y / 2,
      this.arrowsSize.x,
      this.arrowsSize.y
    );
    ctx.fillText(
      "Credits",
      (1.7 * this.game.gameWidth) / 10,
      (4.5 * this.game.gameHeight) / 10
    );

    ctx.drawImage(
      //draws the icon
      this.keysIcons[0],
      this.game.gameWidth / 3 - this.arrowsSize.x / 2,
      (3 * this.game.gameHeight) / 4 - this.arrowsSize.y / 2,
      this.arrowsSize.x,
      this.arrowsSize.y
    );
    ctx.fillText(
      "Shoot",
      (3.3 * this.game.gameWidth) / 10,
      (6.7 * this.game.gameHeight) / 10
    );
    ctx.drawImage(
      //draws the icon
      this.keysIcons[1],
      (2 * this.game.gameWidth) / 3 - this.arrowsSize.x / 2,
      (3 * this.game.gameHeight) / 4 - this.arrowsSize.y / 2,
      this.arrowsSize.x,
      this.arrowsSize.y
    );
    ctx.fillText(
      "Move",
      (6.7 * this.game.gameWidth) / 10,
      (6.7 * this.game.gameHeight) / 10
    );

    textSize = this.game.gameHeight / 10;
    ctx.font = textSize + "px Arial";
    ctx.fillText("Menu", this.game.gameWidth / 4, this.game.gameHeight / 4);

    ctx.globalAlpha = 1;
  }
}

class gameOver {
  constructor(game) {
    this.game = game;
    this.doors = [new satanDoor(game)];
  }
  update(dt) {
    this.doors.forEach(door => {
      door.update(dt);
    });
  }
  draw(ctx) {
    ctx.font = this.game.gameHeight / 10 + "px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.globalAlpha = 0.4;
    ctx.fillText("You lost", this.game.gameWidth / 2, this.game.gameHeight / 2);
    ctx.globalAlpha = 1;
    this.doors.forEach(door => {
      door.draw(ctx);
    });
  }
}

class winner {
  constructor(game) {
    this.game = game;
    this.doors = [new satanDoor(game)];
  }
  update(dt) {
    this.doors.forEach(door => {
      door.update(dt);
    });
  }
  draw(ctx) {
    ctx.font = this.game.gameHeight / 10 + "px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.globalAlpha = 0.4;
    ctx.fillText("You Won", this.game.gameWidth / 2, this.game.gameHeight / 2);
    ctx.globalAlpha = 1;
    this.doors.forEach(door => {
      door.draw(ctx);
    });
  }
}

class pause {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("pauseBK");

    this.statsImg = [
      document.getElementById("attackIcon"),
      document.getElementById("speedIcon"),
      document.getElementById("shotSpeedIcon"),
      document.getElementById("fireRateIcon"),
      document.getElementById("rangeIcon")
    ];
    this.statsValue = [
      game.player.attack,
      game.player.maxSpeed,
      game.player.shotSpeed,
      game.player.fireRate,
      game.player.range
    ];

    this.timeImg = document.getElementById("timeIcon");
    this.attackImg = document.getElementById("attackIcon");
    this.speedImg = document.getElementById("speedIcon");
    this.shotSpeedImg = document.getElementById("shotSpeedIcon");
    this.fireRateImg = document.getElementById("fireRateIcon");
    this.rangeImg = document.getElementById("rangeIcon");

    this.size = {
      x: (2.5 * game.gameHeight) / 4,
      y: (2.5 * game.gameHeight) / 4
    };
    this.position = {
      x: game.gameWidth / 2 - this.size.x / 2,
      y: game.gameHeight / 2 - this.size.y / 2
    };
  }
  draw(ctx) {
    this.game.player.draw(ctx);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, this.game.gameWidth, this.game.gameHeight);

    ctx.drawImage(
      //draws the parchment icon
      this.image,
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y
    );

    var textSize = this.size.y / 10;
    ctx.font = textSize + "px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(
      "Paused",
      this.position.x + (5.5 * this.size.x) / 10,
      this.position.y + this.size.y / 4
    );

    ctx.drawImage(
      //draws time icon
      this.timeImg,
      this.position.x + this.size.x / 5,
      this.position.y + (83 * this.size.y) / 100,
      this.size.x / 15,
      this.size.y / 15
    );
    textSize = this.size.y / 30;
    ctx.font = textSize + "px Arial";
    ctx.fillText(
      Math.floor(this.game.inGameTime),
      this.position.x + this.size.x / 3,
      this.position.y + (88 * this.size.y) / 100
    );

    for (var i = 0; i < this.statsImg.length; i++) {
      ctx.drawImage(
        //draws the icon
        this.statsImg[i],
        this.position.x + this.size.x / 2,
        this.position.y + (30 * this.size.y) / 100 + (i * this.size.y) / 15,
        this.size.x / 20,
        this.size.y / 20
      );
      ctx.fillText(
        this.statsValue[i],
        this.position.x + (65 * this.size.x) / 100,
        this.position.y + (33 * this.size.y) / 100 + (i * this.size.y) / 15
      );
    }
  }
}

class Credits {
  constructor(game) {
    this.game = game;
    this.doors = [new satanDoor(game)];
  }
  update(dt) {
    this.doors.forEach(door => {
      door.update(dt);
    });
  }
  draw(ctx) {
    ctx.font = "18px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Here will be the description of the game", 500, 200);
    this.doors.forEach(door => {
      door.draw(ctx);
    });
  }
}

class running {
  constructor(game) {
    this.game = game;
    this.doors = [new levelDoor(game)];
    this.endRound = true;
  }
  update(dt) {
    this.game.monsters.forEach(monster => monster.update(dt)); //update every monster
    this.game.monsters = this.game.monsters.filter(monster => !monster.hit); //removes monsters that are hit

    if (this.game.monsters.length === 0 & this.game.level < 3) {
      //checks if any monsters left
      if (this.endRound) {
        this.game.loadStats(true);
        this.endRound = false;
      }
      this.doors.forEach(door => {
        door.update(dt);
      });
      return;
    } else if (this.game.player.hit) {
      //check if player is hit
      this.game.loadStats(false);
      this.game.setGameState("GAMEOVER");
    }
    this.endRound = true;
  }
  draw(ctx) {
    if (this.game.monsters.length === 0) {
      this.doors.forEach(door => {
        door.draw(ctx);
      });
    }
  }
}
