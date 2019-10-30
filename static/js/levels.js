function setLevel(game, lvl) {
  var monsters = [];
  Levels[lvl].forEach(ennemy => {
    monsters.push(new littleShit(game, { x: ennemy.x, y: ennemy.y }));
  });

  return monsters;
}

const Levels = [
  [], //level 0

  [
    { id: 1, x: 200, y: 200 }, //level 1
    { id: 1, x: 400, y: 200 }
  ],

  [
    { id: 1, x: 200, y: 200 }, //level 2
    { id: 1, x: 400, y: 200 },
    { id: 1, x: 600, y: 200 }
  ]
];
