const gameStates = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  WINNER: 4,
  CREDIT: 5
}; //we set the different possible game states

class Game {
  constructor(gameWidth, gameHeight) {
    this.bkImage = document.getElementById("background"); //loads the background
    this.gameWidth = gameWidth; //takes dimension of game
    this.gameHeight = gameHeight;
    this.Limits = {
      //sets the limit according to thikness of walls
      top: (12 * this.gameHeight) / 100,
      bottom: (88 * this.gameHeight) / 100,
      left: (7 * this.gameWidth) / 100,
      right: (93 * this.gameWidth) / 100
    };

    this.levelstats = {
      level: 0,
      time: 0,
      tearsShot: 0,
      tearsHit: 0,
      distanceTravelled: 0,
      success: false
    };

    this.player = new player(this); //initializes the player class
    new keyboardHandler(this.player, this); //open event listen for keyboard input
    this.Modes = [
      new pause(this),
      new running(this),
      new menu(this),
      new gameOver(this),
      new winner(this),
      new Credits(this)
    ];

    this.resetGame(); //sets game to level 0 also menu
  }

  update(dt) {
    if (this.gameState === gameStates.PAUSED) {
      return;
    } //If game paused no updates
    this.inGameTime += dt / 1000; //counts the time is start function launched
    this.player.update(dt); //for interactive menu always update player
    this.Modes[this.gameState].update(dt);
  }

  draw(ctx) {
    ctx.drawImage(this.bkImage, 0, 0, this.gameWidth, this.gameHeight); //always draw background

    if (this.gameState !== gameStates.GAMEOVER) {
      this.monsters.forEach(monster => monster.draw(ctx));
    }

    this.Modes[this.gameState].draw(ctx);

    if (this.gameState !== gameStates.PAUSED) {
      this.player.draw(ctx);
    }
  }

  loadLevel() {
    if (this.level === 0) {
      this.inGameTime = 0;
      this.player.shotTime = 0;
      this.setGameState("RUNNING");
    }
    this.level += 1;
    this.player.position.y = this.Limits.bottom - this.player.size.y;
    this.player.tears = [];
    if (this.level === Levels.length) {
      this.setGameState("WINNER");
      this.player.won = true;
    } else {
      this.monsters = setLevel(this, this.level);
    }

    this.levelstats.level = this.level;
    this.levelstats.time = this.inGameTime;
    this.levelstats.distanceTravelled = 0;
    this.levelstats.tearsShot = 0;
    this.levelstats.tearsHit = 0;
  }

  loadCredits() {
    this.setGameState("CREDIT");
    this.player.position.x =
      this.Limits.right - (2 * this.gameWidth) / 100 - this.player.size.x;
  }

  loadStats(win) {
    this.levelstats.time = this.inGameTime - this.levelstats.time;
    this.levelstats.success = win;
    document.getElementById('level' + this.level).value = this.levelstats.level;
    document.getElementById('time' + this.level).value = this.levelstats.time;
    document.getElementById('tearsShot' + this.level).value = this.levelstats.tearsShot;
    document.getElementById('tearsHit' + this.level).value = this.levelstats.tearsHit;
    document.getElementById('distanceTravelled' + this.level).value = this.levelstats.distanceTravelled;
    document.getElementById('success' + this.level).value = this.levelstats.success;

  }

  togglePause() {
    if (this.gameState === gameStates.RUNNING) {
      this.setGameState("PAUSED");
    } else if (this.gameState === gameStates.PAUSED) {
      this.setGameState("RUNNING");
    }
  }

  setGameState(mode) {
    this.gameState = gameStates[mode];
  }

  resetGame() {
    this.inGameTime = 0;
    this.level = 0;
    this.monsters = setLevel(this, this.level);
    this.setGameState("MENU");
    this.player.resetPlayer();

    for(var i = 1; i < Levels.length; i++) {
      document.getElementById('level' + i).value = 0;
      document.getElementById('time' + i).value = 0;
      document.getElementById('tearsShot' + i).value = 0;
      document.getElementById('tearsHit' + i).value = 0;
      document.getElementById('distanceTravelled' + i).value = 0;
      document.getElementById('success' + i).value = 0;
    }
  }
}
