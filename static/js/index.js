var canvas = document.getElementById("gameScreen");
var context = canvas.getContext("2d");

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

var game = new Game(GAME_WIDTH, GAME_HEIGHT);

var lastTime = 0;
var deltaTime = 1;

function gameLoop(timeStamp) {
  if (lastTime === 0) {
    deltaTime = 1;
  } else {
    deltaTime = timeStamp - lastTime;
  }
  lastTime = timeStamp;

  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(deltaTime);
  game.draw(context);

  requestAnimationFrame(gameLoop);
}

function startGame() {
  game.player.ID = document.getElementById('createPlayerID').value;
  if(game.player.ID === "") {
    window.alert("Please enter UserName to continue");
    return;
  }
  else {

  game.player.won = pastWinners.includes(game.player.ID)
  document.getElementById("playerID").value = game.player.ID;
  document.getElementById("preGame").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  requestAnimationFrame(gameLoop);
  }
}

function changePlayerStats() {
  document.getElementById("attack").value = document.getElementById("changeAttack").value;
  document.getElementById("maxSpeed").value = document.getElementById("changeMaxSpeed").value;
  document.getElementById("fireRate").value = document.getElementById("changeFireRate").value;
  document.getElementById("range").value = document.getElementById("changeRange").value;
  document.getElementById("shotSpeed").value = document.getElementById("changeShotSpeed").value;
  game.resetGame();
}

if(document.getElementById("playerID").value !== "")
{
  document.getElementById("createPlayerID").value = document.getElementById("playerID").value;
  startGame();
}