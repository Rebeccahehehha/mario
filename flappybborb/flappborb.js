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

  function porduceTubes() {
    const offset = rand(-50, 50);

    add([
      sprite('Tube', { flipY: true }),
      scale(0.5),
      pos(width() - 100, height() / 2 + offset - tubeGap / 2),
      anchor('botleft'),
      'Tube',
      area()
    ]);
    add([
      sprite('Tube'),
      scale(0.5),
      pos(width() - 100, height() / 2 + offset + tubeGap / 2),
      'Tube',
      area()
    ]);
  }

  loop(1.5, () => {
    porduceTubes();
  });
  onUpdate('Tube', (Tube) => {
    Tube.move(-500, 0);
  });
});
scene('Gameover', () => {
  // Add text with size, position, and origin set
  const gameOverText = add([
    text('Gameover:D', 24),
    pos(width() / 2, height() / 2),
    color(0xff0000) // Set the text color to red (RGB: 1, 0, 0)
  ]);

  // Handle the space key press to transition to the 'game' scene
  onKeyPress('space', () => {
    go('game');
  });
});

go('game');
