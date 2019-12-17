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
    this.arrowsSize = { x: 10, y: 10};
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

    var textSize = 2.5 * this.game.units.y;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = textSize + "px Arial";

    ctx.globalAlpha = 0.4;

    ctx.drawImage(
      //draws the icon
      this.arrows[0],
      (this.game.gameWidth / 6 - this.arrowsSize.x / 2) * this.game.units.x,
      (this.game.gameHeight / 2 - this.arrowsSize.y / 2) * this.game.units.y,
      this.arrowsSize.x * this.game.units.x,
      this.arrowsSize.y * this.game.units.y
    );
    ctx.fillText(
      "Next Level",
      60 * this.game.units.x,
      this.game.gameHeight * this.game.units.y / 4
    );
    ctx.drawImage(
      //draws the icon
      this.arrows[1],
      (this.game.gameWidth / 2 - this.arrowsSize.x / 2) * this.game.units.x,
      (this.game.gameHeight / 4 - this.arrowsSize.y / 2) * this.game.units.y,
      this.arrowsSize.x * this.game.units.x,
      this.arrowsSize.y * this.game.units.y
    );
    ctx.fillText(
      "Save Stats",
      (8.3 * this.game.gameWidth * this.game.units.x) / 10,
      (4.5 * this.game.gameHeight * this.game.units.y) / 10
    );
    ctx.drawImage(
      //draws the icon
      this.arrows[2],
      (5 * this.game.gameWidth / 6 - this.arrowsSize.x / 2) * this.game.units.x,
      (this.game.gameHeight / 2 - this.arrowsSize.y / 2) * this.game.units.y,
      this.arrowsSize.x * this.game.units.x,
      this.arrowsSize.y * this.game.units.y
    );
    ctx.fillText(
      "Credits",
      (1.7 * this.game.gameWidth / 10) * this.game.units.x,
      (4.5 * this.game.gameHeight / 10) * this.game.units.y
    );

    ctx.drawImage(
      //draws the icon
      this.keysIcons[0],
      (this.game.gameWidth / 3 - this.arrowsSize.x / 2) * this.game.units.x,
      (3 * this.game.gameHeight / 4 - this.arrowsSize.y / 2) * this.game.units.y,
      this.arrowsSize.x * this.game.units.x,
      this.arrowsSize.y * this.game.units.y
    );
    ctx.fillText(
      "Shoot",
      (3.3 * this.game.gameWidth / 10) * this.game.units.x,
      (6.7 * this.game.gameHeight / 10) * this.game.units.y
    );
    ctx.drawImage(
      //draws the icon
      this.keysIcons[1],
      (2 * this.game.gameWidth / 3 - this.arrowsSize.x / 2) * this.game.units.x,
      (3 * this.game.gameHeight / 4 - this.arrowsSize.y / 2) * this.game.units.y,
      this.arrowsSize.x * this.game.units.x,
      this.arrowsSize.y * this.game.units.y
    );
    ctx.fillText(
      "Move",
      (6.7 * this.game.gameWidth / 10) * this.game.units.x,
      (6.7 * this.game.gameHeight / 10) * this.game.units.y
    );

    textSize = (this.game.gameHeight / 10) * this.game.units.y;
    ctx.font = textSize + "px Arial";
    ctx.fillText("Menu", (this.game.gameWidth / 4) * this.game.units.x, (this.game.gameHeight / 4) * this.game.units.y);

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
    ctx.font = (this.game.gameHeight / 10) * this.game.units.y + "px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.globalAlpha = 0.4;
    ctx.fillText("You lost", this.game.gameWidth * this.game.units.x / 2, this.game.gameHeight * this.game.units.y / 2);
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
    ctx.font = (this.game.gameHeight / 10) * this.game.units.y + "px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.globalAlpha = 0.4;
    ctx.fillText("You Won", (this.game.gameWidth / 2) * this.game.units.x, (this.game.gameHeight / 2) * this.game.units.y);
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
    ctx.fillRect(0, 0, this.game.gameWidth * this.game.units.x, this.game.gameHeight * this.game.units.y);

    ctx.drawImage(
      //draws the parchment icon
      this.image,
      this.position.x * this.game.units.x,
      this.position.y * this.game.units.y,
      this.size.x * this.game.units.x,
      this.size.y * this.game.units.y
    );

    var textSize = (this.size.y / 10) * this.game.units.y;
    ctx.font = textSize + "px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(
      "Paused",
      (this.position.x + (5.5 * this.size.x) / 10) * this.game.units.x,
      (this.position.y + this.size.y / 4) * this.game.units.y
    );

    ctx.drawImage(
      //draws time icon
      this.timeImg,
      (this.position.x + this.size.x / 5) * this.game.units.x,
      (this.position.y + (83 * this.size.y) / 100) * this.game.units.y,
      (this.size.x / 15) * this.game.units.x,
      (this.size.y / 15) * this.game.units.y
    );
    textSize = (this.size.y / 30) * this.game.units.y;
    ctx.font = textSize + "px Arial";
    ctx.fillText(
      Math.floor(this.game.inGameTime),
      (this.position.x + this.size.x / 3) * this.game.units.x,
      (this.position.y + (88 * this.size.y) / 100) * this.game.units.y
    );

    for (var i = 0; i < this.statsImg.length; i++) {
      ctx.drawImage(
        //draws the icon
        this.statsImg[i],
        (this.position.x + this.size.x / 2) * this.game.units.x,
        (this.position.y + (30 * this.size.y) / 100 + (i * this.size.y) / 15) * this.game.units.y,
        (this.size.x / 20) * this.game.units.x,
        (this.size.y / 20) * this.game.units.y
      );
      ctx.fillText(
        this.statsValue[i],
        (this.position.x + (65 * this.size.x) / 100) * this.game.units.x,
        (this.position.y + (33 * this.size.y) / 100 + (i * this.size.y) / 15) * this.game.units.y
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
    var textSize = 2*this.game.gameWidth*this.game.units.y/100;
    ctx.font = textSize + "px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("This game is inspired by and a copy of Binding of Isaac", this.game.gameWidth/2 * this.game.units.x, 3*this.game.gameHeight/16 * this.game.units.y);
    ctx.fillText("I do not claim any intellectual property regarding the images and ideas involved in this game", this.game.gameWidth/2 * this.game.units.x, 4*this.game.gameHeight/16 * this.game.units.y);

    ctx.fillText("This game was created for a software tool class at Baruch College", this.game.gameWidth/2 * this.game.units.x, 6*this.game.gameHeight/16 * this.game.units.y);
    ctx.fillText("The objective of the project is to efficiently and dynamically collect data from a web browser,", this.game.gameWidth/2 * this.game.units.x, 7*this.game.gameHeight/16 * this.game.units.y);
    ctx.fillText("recognize information that is relevant to the deign of the game,", this.game.gameWidth/2 * this.game.units.x, 8*this.game.gameHeight/16 * this.game.units.y);
    ctx.fillText("analyze collected intel using r to draw conclusions about user's experience,", this.game.gameWidth/2 * this.game.units.x, 9*this.game.gameHeight/16 * this.game.units.y);
    ctx.fillText("and finally use the results of the analysis to further develop the game.", this.game.gameWidth/2 * this.game.units.x, 10*this.game.gameHeight/16 * this.game.units.y);

    ctx.fillText("All the code and content of this page is available at https://github.com/rjulien1994/BindingOfCasper", this.game.gameWidth/2 * this.game.units.x, 12*this.game.gameHeight/16 * this.game.units.y);
    ctx.fillText("If you have any questions about or interest in the project don't hesitate to contact me", this.game.gameWidth/2 * this.game.units.x, 13*this.game.gameHeight/16 * this.game.units.y);
    ctx.fillText("email: julien.rappe@hotmail.com", this.game.gameWidth/2 * this.game.units.x, 14*this.game.gameHeight/16 * this.game.units.y);
    
    
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

    if (this.game.monsters.length === 0 & this.game.level < Levels.length) {
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
