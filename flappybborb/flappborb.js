kaboom();
loadRoot('./Images/');
loadSprite('Background', 'PixelBackground.png');
loadSprite('Poptartcat', 'Poptartcat.png');
loadSprite('Tube', 'Tube.png');

add([sprite('Background')]);
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

const tubeGap = 800;
add([
  sprite('Tube'),
  scale(0.5),
  pos(width() - 100, height() / 2 + tubeGap / 2)
]);
add([
  sprite('Tube', { flipY: true }),
  scale(0.5),
  pos(width() - 100, height() / 2 - tubeGap / 2),
  origin('botleft')
]);
