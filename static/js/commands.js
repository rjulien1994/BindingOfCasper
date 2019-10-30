class keyboardHandler {
  constructor(player, game) {
    this.player = player;
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          player.move({ x: -1, y: 0 });
          break;
        case 39:
          player.move({ x: 1, y: 0 });
          break;
        case 38:
          player.move({ x: 0, y: -1 });
          break;
        case 40:
          player.move({ x: 0, y: 1 });
          break;
        case 32:
          if (!player.blink) {
            player.blinkTrigger();
          }
          break;

        case 87:
          player.look({ x: 0, y: -1 });
          break;
        case 83:
          player.look({ x: 0, y: 1 });
          break;
        case 65:
          player.look({ x: -1, y: 0 });
          break;
        case 68:
          player.look({ x: 1, y: 0 });
          break;

        case 77:
          game.resetGame();
          break;

        case 13:
          game.start();
          break;

        case 27:
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
