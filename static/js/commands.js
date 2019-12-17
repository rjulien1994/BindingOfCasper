class keyboardHandler {
  constructor(player, game) {
    this.player = player;
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37://left arrow
          player.move({ x: -1, y: 0 });
          break;
        case 39://right arrow
          player.move({ x: 1, y: 0 });
          break;
        case 38://top arrow
          player.move({ x: 0, y: -1 });
          break;
        case 40://bottom arrow
          player.move({ x: 0, y: 1 });
          break;
        case 32://space
          if (!player.blink) {
            player.blinkTrigger();
          }
          break;

        case 90://z
          player.look({ x: 0, y: -1 });
          break;
        case 81://q
          player.look({ x: -1, y: 0 });
          break;
        case 87: //w
          player.look({ x: 0, y: -1 });
          break;
        case 83://s
          player.look({ x: 0, y: 1 });
          break;
        case 65://a
          player.look({ x: -1, y: 0 });
          break;
        case 68://d
          player.look({ x: 1, y: 0 });
          break;

        case 27://esc
          game.togglePause();
          break;

        default:
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
          if (player.speed.x < 0) player.stop({ x: true, y: false });
          break;
        case 39:
          if (player.speed.x > 0) player.stop({ x: true, y: false });
          break;
        case 38:
          if (player.speed.y < 0) player.stop({ x: false, y: true });
          break;
        case 40:
          if (player.speed.y > 0) player.stop({ x: false, y: true });
          break;

        case 90:
          if (player.direction.y === -1) {
            player.stopLooking();
          }
          break;
        case 81:
          if (player.direction.x === -1) {
            player.stopLooking();
          }
          break;

        case 87:
          if (player.direction.y === -1) {
            player.stopLooking();
          }
          break;
        case 83:
          if (player.direction.y === 1) {
            player.stopLooking();
          }
          break;
        case 65:
          if (player.direction.x === -1) {
            player.stopLooking();
          }
          break;
        case 68:
          if (player.direction.x === 1) {
            player.stopLooking();
          }
          break;

        case 32:
          player.blinkTrigger();
          break;

        default:
          break;
      }
    });
  }
}

class touchScreenHandler {
  constructor(player, game) {
    this.game = game;

    document.addEventListener("touchstart", function(ev) {
      game.touchScreen = true;
      document.getElementById("touchCommand").style.display = "block";
      for(let i = 0; i < game.touchCommandKeys.length; i++) {
        game.touchCommandKeys[i].element.style.display = "block";
      }
    }, false);


    document.getElementById("shootUp").addEventListener("touchstart", function(ev) {
      player.look({ x: 0, y: -1 });
      ev.preventDefault();
    },false);

    document.getElementById("shootDown").addEventListener("touchstart", function(ev) {
      player.look({ x: 0, y: 1 });
      ev.preventDefault();
    },false);

    document.getElementById("shootLeft").addEventListener("touchstart", function(ev) {
      player.look({ x: -1, y: 0 });
      ev.preventDefault();
    },false);

    document.getElementById("shootRight").addEventListener("touchstart", function(ev) {
      player.look({ x: 1, y: 0 });
      ev.preventDefault();
    },false);


    document.getElementById("moveTop").addEventListener("touchstart", function(ev) {
      player.move({ x: 0, y: -1 });
      ev.preventDefault();
    },false);

    document.getElementById("moveDown").addEventListener("touchstart", function(ev) {
      player.move({ x: 0, y: 1 });
      ev.preventDefault();
    },false);

    document.getElementById("moveLeft").addEventListener("touchstart", function(ev) {
      player.move({ x: -1, y: 0 });
      ev.preventDefault();
    },false);

    document.getElementById("moveRight").addEventListener("touchstart", function(ev) {
      player.move({ x: 1, y: 0 });
      ev.preventDefault();
    },false);


    document.getElementById("shootUp").addEventListener("touchend", function(ev) {
      if (player.direction.y === -1) player.stopLooking();
    },false);

    document.getElementById("shootDown").addEventListener("touchend", function(ev) {
      if (player.direction.y === 1) player.stopLooking();
    },false);

    document.getElementById("shootLeft").addEventListener("touchend", function(ev) {
      if (player.direction.x === -1) player.stopLooking();
    },false);

    document.getElementById("shootRight").addEventListener("touchend", function(ev) {
      if (player.direction.x === 1) player.stopLooking();
    },false);


    document.getElementById("moveTop").addEventListener("touchend", function(ev) {
      if (player.speed.y < 0) player.stop({ x: false, y: true });
    },false);

    document.getElementById("moveDown").addEventListener("touchend", function(ev) {
      if (player.speed.y > 0) player.stop({ x: false, y: true });
    },false);

    document.getElementById("moveLeft").addEventListener("touchend", function(ev) {
      if (player.speed.x < 0) player.stop({ x: true, y: false });
    },false);

    document.getElementById("moveRight").addEventListener("touchend", function(ev) {
      if (player.speed.x > 0) player.stop({ x: true, y: false });
    },false);
  }
}
