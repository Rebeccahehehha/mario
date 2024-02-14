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
      '*': () => [
        sprite('surprise'),
        'mushroom-surprise',
        area(),
        body({ isStatic: true })
      ],
      '{': () => [sprite('unboxed')],
      '(': () => [sprite('pipe-bottom-left'), scale(0.5)],
      ')': () => [sprite('pipe-bottom-right'), scale(0.5)],
      '-': () => [sprite('pipe-top-left'), scale(0.5)],
      '+': () => [sprite('pipe-top-right'), scale(0.5)],
      '^': () => [
        sprite('evil-shroom'),
        'dangerous',
        area(),
        body(),
        move(LEFT, 35)
      ]
    }
  };

  const gameLevel = addLevel(map, levelCfg);
  const scoreLabel = add([
    text('score'),
    pos(30, 6),
    {
      value: 'score'
    }
  ]);
  // add([text('level' + 'test', pos(4, 6))]);

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
        player.currentJumpForce = player.jumpForce;
        this.scale = vec2(1);
        timer = 0;
        isBig = false;
      },
      biggify(time) {
        player.currentJumpForce = player.bigJumpForce;
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
  player.bigJumpForce = 1000;
  player.currentJumpForce = player.jumpForce;

  player.onCollide('coin-surprise', (obj) => {
    const gridSize = 20; // The height of a grid cell
    const coinPos = vec2(obj.pos.x, obj.pos.y - gridSize); // Position the coin above the box
    destroy(obj); // Remove the surprise box
    // gameLevel.spawn('$', coinPos); // Spawn a coin at the calculated position
    add([sprite('coin'), pos(coinPos), area(), 'coin']);
    add([sprite('unboxed'), pos(obj.pos.x, obj.pos.y), area()]);
  });
  player.onCollide('mushroom-surprise', (obj) => {
    const gridSize = 20; // The height of a grid cell
    const coinPos = vec2(obj.pos.x, obj.pos.y - gridSize); // Position the coin above the box
    destroy(obj); // Remove the surprise box
    // gameLevel.spawn('$', coinPos); // Spawn a coin at the calculated position
    add([
      sprite('mushroom'),
      pos(coinPos),
      area(),
      // move(RIGHT, 100),
      body(),
      'mushroom'
    ]);
    add([sprite('unboxed'), pos(obj.pos.x, obj.pos.y), area()]);
  });

  player.onCollide('mushroom', (m) => {
    destroy(m);
    player.biggify(6);
  });

  player.onCollide('coin', (c) => {
    destroy(c);
    scoreLabel.value++;
    scoreLabel.text = scoreLabel.value;
  });

  player.onCollide('dangerous', () => {
    go('game', { score: scoreLabel.value });
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
      player.jump(player.currentJumpForce);
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
