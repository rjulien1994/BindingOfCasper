function Collision(object1, object2) {
  // [top, bottom, left, right]
  var object1Limit = [
    object1.position.y,
    object1.position.y + object1.size.y,
    object1.position.x,
    object1.position.x + object1.size.x
  ];

  var object2Limit = [
    object2.position.y,
    object2.position.y + object2.size.y,
    object2.position.x,
    object2.position.x + object2.size.x
  ];
  var output = false;

  if (
    object1Limit[0] <= object2Limit[1] &&
    object1Limit[1] >= object2Limit[0] &&
    object1Limit[2] <= object2Limit[3] &&
    object1Limit[3] >= object2Limit[2]
  ) {
    output = true;
  }

  return output;
}
