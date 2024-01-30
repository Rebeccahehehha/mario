kaboom({
  global: true,
  fullscreen: true,
  scale: 1,
  debug: true,
  clearColor: [0, 0, 0, 1]
});

loadRoot('./sprites/');
setGravity(2000);

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
    '    %     =*===                      ',
    '                           -+       ',
    '                 ^    ^    ()       ',
    '==============================  ====='
  ];

  const levelCfg = {
    width: 20,
    height: 20,
    tileWidth: 20,
    tileHeight: 20,
    tiles: {
      '=': () => [sprite('brick'), area(), body({ isStatic: true })],
      $: () => [sprite('coin')],
      '%': () => [
        sprite('surprise'),
        'coin-surprise',
        area(),
        body({ isStatic: true })
      ],
      '*': () => [sprite('surprise'), 'mushroom-surprise'],
      '{': () => [sprite('unboxed')],
      '(': () => [sprite('pipe-bottom-left'), scale(0.5)],
      ')': () => [sprite('pipe-bottom-right'), scale(0.5)],
      '-': () => [sprite('pipe-top-left'), scale(0.5)],
      '+': () => [sprite('pipe-top-right'), scale(0.5)],
      '^': () => [sprite('evil-shroom')]
    }
  };

  const gameLevel = addLevel(map, levelCfg);
  const scoreLable = add([
    text('score'),
    pos(30, 6),
    {
      value: 'score'
    }
  ]);
  add([text('level' + 'test', pos(4, 6))]);

  function big() {
    let timer = 0;
    let isBig = false;
    return {
      update() {
        if (isBig) {
          timer -= dt();
          if (timer <= 0) {
            this.smallify();
          }
        }
      },
      isBig() {
        return isBig;
      },
      smallify() {
        this.scale = vec2(1);
        timer = 0;
        isBig = false;
      },
      biggify(time) {
        this.scale = vec2(2);
        timer = time;
        isBig = true;
      }
    };
  }

  const player = add([sprite('mario'), pos(30, 0), body(), area(), big()]);
  // Set the player's move speed and jump force
  player.moveSpeed = 200;
  player.jumpForce = 600;

  player.onCollide('coin-surprise', (obj) => {
    const gridSize = 16; // replace with your grid size
    gameLevel.spawn('$', pos(obj.pos.x, obj.pos.y - gridSize));
    destroy(obj);
    gameLevel.spawn('}', pos(obj.pos.x, obj.pos.y));
  });
  // Define left and right movement
  onKeyDown('left', () => {
    player.move(-player.moveSpeed, 0);
  });

  onKeyDown('right', () => {
    player.move(player.moveSpeed, 0);
  });

  // Define jumping
  onKeyPress('space', () => {
    if (player.isGrounded()) {
      player.jump(player.jumpForce);
    }
  });
  // check if player falls off the map
  loop(1 / 60, () => {
    // runs 60 times per second
    if (player.pos.y >= height()) {
      // end the game or switch to a different scene
      go('game'); // assuming 'gameover' is a scene you've defined
    }
  });
});

go('game');
