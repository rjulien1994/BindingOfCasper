var canvas = document.getElementById("gameScreen");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var game = new Game(canvas.width, canvas.height);

var lastTime = 0;
var deltaTime = 1;

const form = document.createElement('form');
form.method = 'POST';
form.action = window.location.href;

function updateLevel(statistics) {
  let lvl = statistics.level;
  for (let parameter in statistics) {
    var hiddenField = document.createElement('input');
    hiddenField.type = 'hidden';
    hiddenField.name = parameter + lvl;
    hiddenField.value = statistics[parameter];
    form.appendChild(hiddenField);
  }
}

function postData(playerPars) {
  for (let parameter in playerPars) {
    var hiddenField = document.createElement('input');
    hiddenField.type = 'hidden';
    hiddenField.name = parameter;
    hiddenField.value = playerPars[parameter];
    form.appendChild(hiddenField);
  }
  document.body.appendChild(form);
  form.submit();
}

function gameLoop(timeStamp) {
  if (lastTime === 0) {
    deltaTime = 1;
  } else {
    deltaTime = timeStamp - lastTime;
  }
  lastTime = timeStamp;

  game.update(deltaTime);
  game.draw(context);

  requestAnimationFrame(gameLoop);
}

if (user.admin === 'True'){
  let param = ["attack", "speed", "fireRate", "range", "shotSpeed"];
  document.getElementById('adminBoard').style.display = "block";

  for (let i = 0; i < 5; i++) {
    let parId = param[i]+'Edit';
    let title = document.createElement('h4');
    title.innerHTML = param[i];
    title.style.position = 'absolute';
    title.style.left = (1+i*1.25)*(window.innerWidth/8) + 'px';
    title.style.top = window.innerHeight/20 +'px';
    title.style.color = 'white';
    document.getElementById("adminBoard").appendChild(title);

    if(param[i] === "speed") {param[i] = 'maxSpeed'}
    document.getElementById(parId).value = game.player[param[i]];
    document.getElementById(parId).style.position = 'absolute';
    document.getElementById(parId).style.left = (1+i*1.25)*(window.innerWidth/8) + 'px';
    document.getElementById(parId).style.top = window.innerHeight/10 +'px';
    document.getElementById(parId).style.width = window.innerWidth/8 + 'px';
  }
}

requestAnimationFrame(gameLoop);
