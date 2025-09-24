export function renderGame(game, context, deltaTime) {
  if (game.timer > game.interval) {
    context.clearRect(0, 0, game.width, game.height);
    game.gameObjects = [
      game.player,
      ...game.eggs,
      ...game.obstacles,
      ...game.enemies,
      ...game.hatchlings,
      ...game.particles,
    ];
    game.gameObjects.sort((a, b) => {
      return a.collisionY - b.collisionY;
    });
    game.gameObjects.forEach((object) => {
      object.draw(context);
      object.update(deltaTime);
    });
    game.timer = 0;
  }
  game.timer += deltaTime;

  // Yumurta ekleme
  if (
    game.eggTimer > game.eggInterval &&
    game.eggs.length < game.maxEggs &&
    !game.gameOver
  ) {
    game.addEgg();
    game.eggTimer = 0;
    console.log(game.eggs);
  } else {
    game.eggTimer += deltaTime;
  }

  // Skor
  context.save();
  context.textAlign = "left";
  context.fillText("Skor: " + game.score, 25, 50);
  if (game.debug) {
    context.fillText("Yakalanan Yavrular: " + game.lostHatchlings, 25, 100);
  }
  context.restore();

  // Oyun Sonu
  if (game.score >= game.winningScore) {
    game.gameOver = true;
    context.save();
    context.fillStyle = "rgba(0,0,0,0.5)";
    context.fillRect(0, 0, game.width, game.height);
    context.fillStyle = "white";
    context.textAlign = "center";
    context.shadowOffsetX = 4;
    context.shadowOffsetY = 4;
    context.shadowColor = "black";
    context.shadowBlur = 10;
    let message1;
    let message2;
    if (game.lostHatchlings <= 5) {
      message1 = "Harika!";
      message2 = "Hiç yavru kaybetmedin!";
    } else {
      message1 = "Oyun Bitti!";
      message2 = "Kaybettiğin yavrular: " + game.lostHatchlings;
    }
    context.font = "130px Bangers";
    context.fillText(message1, game.width * 0.5, game.height * 0.5 - 40);
    context.font = "40px Bangers";
    context.fillText(message2, game.width * 0.5, game.height * 0.5 + 30);
    context.fillText(
      "Final Skorun: " + game.score + ". Yeniden oynamak için R tuşuna basın.",
      game.width * 0.5,
      game.height * 0.5 + 80
    );
    context.restore();
  }
}
