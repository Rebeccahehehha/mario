kaboom({
  global: true,
  fullscreen: true,
  scale: 1,
  debug: true,
  clearColor: [0, 0, 0, 1],
});
loadRoot("https://i.imgur.com/");
loadSprite("coin", "wbKxhcd.png");
loadSprite("evil-shroom", "KPO3fR9.png");
loadSprite("brick", "pogC9x5.png");
loadSprite("block", "bdrLpi6.png");
loadSprite("mario", "Wb1qfhk.png");
loadSprite("mushroom", "0wMd92p.png");
loadSprite("surprise", "gesQ1KP.png");
loadSprite("unboxed", "bdrLpi6.png");
loadSprite("pipe-top-left", "ReTPiWY.png");
loadSprite("pipe-top-righ", "hj2GK4n.png");
loadSprite("pipe-bottom-left", "c1cYSbt.png");
loadSprite("pipe-bottom-righ", "nqQ79eI.png");

scene("game", () => {
  layers(["bg", "obj", "ui"], "obj");

  const map = [
    "                                     ",
    "                                     ",
    "                                     ",
    "                                     ",
    "                                     ",
    "                                     ",
    "                                     ",
    "                                     ",
    "                                     ",
    "==============================  =====",
  ];

  const levelCfg = {
    width: 20,
    hight: 20,
    "=": [sprite("block", solid())],
  };

  const gameLevel = addlevel(map, levelCfg);
});

start("game");
