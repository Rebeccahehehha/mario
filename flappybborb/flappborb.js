kaboom();
loadRoot('./Images/');
loadSprite('Background', 'PixelBackground.png');
loadSprite('Poptartcat', 'Poptartcat.png');
loadSprite('Tube', 'Tube.png');

scene('game', () => {
  add([sprite('Background', { width: width(), height: height() })]);
  setGravity(2000);
  const player = add([
    sprite('Poptartcat'),
    scale(0.5),
    body(),
    area(),
    pos(80, 40)
  ]);
  player.currentJumpForce = 600;
  onKeyPress('space', () => {
    // isJumping = true;
    player.jump(player.currentJumpForce);
  });
  player.onCollide('Tube', () => {
    go('Gameover');
  });
  player.onUpdate(() => {
    if (player.pos.y > height() || player.pos.y < 0) {
      go('Gameover');
    }
  });

  const tubeGap = 200;
  const offset = rand(-50, 50);
  add([
    sprite('Tube'),
    scale(0.5),
    pos(width() - 100, height() / 2 + offset + tubeGap / 2),
    'Tube',
    area()
  ]);
  add([
    sprite('Tube', { flipY: true }),
    scale(0.5),
    pos(width() - 100, height() / 2 + offset - tubeGap / 2),
    anchor('botleft'),
    'Tube',
    area()
  ]);
  onUpdate('Tube', (Tube) => {
    Tube.move(-500, 0);
  });
});
scene('Gameover', () => {
  add([text('Gameover:D')]);
  onKeyPress('space', () => {
    go('game');
  });
});

go('game');
