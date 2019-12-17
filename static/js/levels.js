function setLevel(game, lvl) {
  var monsters = [];
  Levels[lvl].forEach(ennemy => {
    if(ennemy.id == 1) {monsters.push(new littleShit(game, { x: ennemy.x, y: ennemy.y }))}
    else if(ennemy.id == 2) {monsters.push(new fly(game, { x: ennemy.x, y: ennemy.y }))}
    else if(ennemy.id == 3) {monsters.push(new evilGhost(game, { x: ennemy.x, y: ennemy.y }))}
  });

  return monsters;
}

const Levels = [
  [], //level 0
  [
    { id: 1, x: 25, y: 20 }, //level 1
    { id: 1, x: 75, y: 20 }
  ],
  [
    { id: 2, x: 25, y: 25 },  //level2
    { id: 2, x: 75, y: 25 }
  ],
  [
    { id: 3, x: 25, y: 25 },  //level3
    { id: 3, x: 75, y: 25 }
  ],
  [
    { id: 1, x: 75, y: 20 },  //level4
    { id: 2, x: 35, y: 25 },
    { id: 3, x: 75, y: 30 }
  ],
  [
    { id: 2, x: 20, y: 50 },  //leve5
    { id: 1, x: 35, y: 25 },
    { id: 2, x: 50, y: 15 }, 
    { id: 1, x: 65, y: 25 },
    { id: 2, x: 80, y: 50 }
  ],
  [
    { id: 3, x: 10, y: 10 },  //leve6
    { id: 3, x: 90, y: 10 },
    { id: 3, x: 10, y: 75 }, 
    { id: 3, x: 90, y: 75 },
    { id: 2, x: 10, y: 55 },
    { id: 2, x: 90, y: 55 }
  ],
  [
    { id: 1, x: 20, y: 20 },
    { id: 1, x: 40, y: 20 },
    { id: 1, x: 60, y: 20 }, //level 7
    { id: 1, x: 80, y: 20 },
    { id: 1, x: 20, y: 40 },
    { id: 1, x: 40, y: 40 },
    { id: 1, x: 60, y: 40 }, 
    { id: 1, x: 80, y: 40 }
  ]
];
