kaboom();
loadRoot('./Images/');
loadSprite('Background', 'PixelBackground.png');
loadSprite('Poptartcat', 'Poptartcat.png');
loadSprite('Tube', 'Tube.png');

scene('game', () => {
  let score = 0;
  add([sprite('Background', { width: width(), height: height() })]);
  setGravity(2000);
  const player = add([
    sprite('Poptartcat'),
    scale(0.5),
    body(),
    area(),
    pos(80, 40)
  ]);

  const textScore = add([text(score, 24), pos(12, 12)]);
  player.currentJumpForce = 600;
  onKeyPress('space', () => {
    // isJumping = true;
    player.jump(player.currentJumpForce);
  });
  player.onCollide('Tube', () => {
    go('Gameover', score);
  });
  player.onUpdate(() => {
    if (player.pos.y > height() || player.pos.y < 0) {
      go('Gameover', score);
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
      area(),
      { passed: false }
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

    if (Tube.passed === false && Tube.pos.x < player.pos.x) {
      Tube.passed = true;
      score += 1;
      textScore.text = score.toString();
    }
  });
});
scene('Gameover', (score) => {
  const gameOverText = add([
    text('Gameover:D', 24),
    pos(width() / 2, height() / 2),
    color(0xff0000)
  ]);

  const scoreText = add([
    text('Score: ' + score.toString(), 24),
    pos(width() / 2, height() / 2 + 40)
  ]);

  onKeyPress('space', () => {
    go('game');
  });
});

go('game');
