kaboom();

loadSprite('bean', 'Bean.png');

// add([sprite('bean'), pos(80, 40)]);
// add([sprite('bean'), pos(80, 40), scale(3), rotate(30), color(0, 0, 0)]);

scene('game', () => {
  const bean = add([sprite('bean'), pos(80, 40), area(), body()]);

  onKeyPress('space', () => {
    bean.jump();
  });
  add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    body({ isStatic: true }),
    color(127, 200, 255)
  ]);
  setGravity(1600);

  onKeyPress('space', () => {
    if (bean.isGrounded()) {
      bean.jump();
    }
  });

  bean.onCollide('tree', () => {
    addKaboom(bean.pos);
    shake();
  });

  function spawnTree() {
    add([
      rect(48, 64),
      area(),
      outline(4),
      pos(width(), height() - 48),
      anchor('botleft'),
      color(255, 180, 255),
      move(LEFT, 240),
      'tree' // add a tag here
    ]);
    wait(rand(0.5, 1.5), () => {
      spawnTree();
    });
  }

  spawnTree();
});

go('game');
