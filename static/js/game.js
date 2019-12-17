const gameStates = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  WINNER: 4,
  CREDIT: 5
}; //we set the different possible game states

class Game {
  constructor(canvaWidth, canvaHeight) {
    this.bkImage = document.getElementById("background"); //loads the background
    this.gameWidth = 100; //takes dimension of game
    this.gameHeight = 75;
    this.setGameUnits(canvaWidth, canvaHeight);
    this.Limits = {
      //sets the limit according to thikness of walls
      top: 9,
      bottom: (this.gameHeight - 9),
      left: 7,
      right: (this.gameWidth - 7)
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
    this.touchCommandKeys = [
      {element: document.getElementById("moveLeft"), x: 6/10, y: 8/10}, 
      {element: document.getElementById("moveRight"), x: 8/10, y: 8/10}, 
      {element: document.getElementById("moveTop"), x: 7/10, y: 7.25/10}, 
      {element: document.getElementById("moveDown"), x: 7/10, y: 8.75/10},
      {element: document.getElementById("shootLeft"), x: 1/10, y: 8/10}, 
      {element: document.getElementById("shootRight"), x: 3/10, y: 8/10}, 
      {element: document.getElementById("shootUp"), x: 2/10, y: 7.25/10}, 
      {element: document.getElementById("shootDown"), x: 2/10, y: 8.75/10}
    ];
    this.touchScreen = false;  
    new keyboardHandler(this.player, this); //open event listen for keyboard input
    new touchScreenHandler(this.player, this);
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
    this.updateGameFrame();
    this.inGameTime += dt / 1000; //counts the time is start function launched
    this.player.update(dt); //for interactive menu always update player
    this.Modes[this.gameState].update(dt);
  }

  draw(ctx) {
    ctx.drawImage(this.bkImage, 0, 0, this.gameWidth*this.units.x, this.gameHeight*this.units.y); //always draw background

    if (this.gameState !== gameStates.GAMEOVER) {
      this.monsters.forEach(monster => monster.draw(ctx));
    }

    this.Modes[this.gameState].draw(ctx);

    if (this.gameState !== gameStates.PAUSED) {
      this.player.draw(ctx);
    }
  }

  updateGameFrame() {
    let factor = Math.min(window.innerWidth/ this.gameWidth, window.innerHeight/ this.gameHeight);

    if(canvas.height != factor*this.gameHeight || canvas.width != factor*this.gameWidth) {

      canvas.height = factor*this.gameHeight;
      canvas.width = factor*this.gameWidth;

      this.setGameUnits(canvas.width, canvas.height);

      document.body.style.overflow = 'hidden';  //removes white space
      let topMargin = (window.innerHeight - canvas.height)/2;
      let leftMargin = (window.innerWidth - canvas.width)/2;
      document.body.style.margin = topMargin + 'px 0px 0px ' + leftMargin + 'px';
    }
    if(this.touchScreen) {
      let imgSize = window.innerWidth/10;
      let windowSize = {x: window.innerWidth, y: window.innerHeight}

      for(let i = 0; i < this.touchCommandKeys.length; i++) {
        this.touchCommandKeys[i].element.style.height = imgSize + 'px';
        this.touchCommandKeys[i].element.style.position = 'absolute';
        this.touchCommandKeys[i].element.style.left = windowSize.x*this.touchCommandKeys[i].x +'px';
        this.touchCommandKeys[i].element.style.top = windowSize.y*this.touchCommandKeys[i].y +'px';
      }

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
      this.Limits.right - 2 - this.player.size.x;
  }

  loadStats(win) {
    this.levelstats.time = this.inGameTime - this.levelstats.time;
    this.levelstats.success = win;
    updateLevel(this.levelstats);
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
  }

  setGameUnits(xSize, ySize) {
    this.units = {x: xSize/this.gameWidth , y: ySize/this.gameHeight };  //we make our default game frame 100 by 75
  }
}
