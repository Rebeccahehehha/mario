kaboom({
  global: true,
  fullscreen: true,
  scale: 1,
  debug: true,
  clearColor: [0, 0, 0, 1]
});

loadRoot('./sprites/');

loadSprite('coin', 'coin.png');
loadSprite('evil-shroom', 'evil-shroom.png');
loadSprite('brick', 'brick.png');
loadSprite('block', 'block.png');
loadSprite('mario', 'mario.png');
loadSprite('mushroom', 'mushroom.png');
loadSprite('surprise', 'surprise.png');
loadSprite('unboxed', 'unboxed.png');
loadSprite('pipe-top-left', 'pipe-top-left.png');
loadSprite('pipe-top-right', 'pipe-top-right.png');
loadSprite('pipe-bottom-left', 'pipe-bottom-left.png');
loadSprite('pipe-bottom-right', 'pipe-bottom-right.png');

scene('game', () => {
  add([
    rect(width(), height()), //
    color(0, 0, 255), //
    z(-1)
  ]);

  const map = [
    '                                     ',
    '                                     ',
    '                                     ',
    '                                     ',
    '                                     ',
    '                                     ',
    '                                     ',
    '                                     ',
    '                                     ',
    '==============================  ====='
  ];

  const levelCfg = {
    width: 20,
    height: 20,
    tileWidth: 20,
    tileHeight: 20,
    tiles: {
      '=': () => [sprite('brick')]
    }
  };

  const gameLevel = addLevel(map, levelCfg);
});

go('game');
