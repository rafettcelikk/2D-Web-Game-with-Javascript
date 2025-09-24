import { Obstacle } from "../entities/Obstacle.js";

export function restartGame(game) {
  game.player.restart();
  game.obstacles = [];
  game.eggs = [];
  game.enemies = [];
  game.hatchlings = [];
  game.particles = [];
  game.mouse = {
    x: game.width * 0.5,
    y: game.height * 0.5,
    pressed: false,
  };
  game.score = 0;
  game.lostHatchlings = 0;
  game.gameOver = false;
  game.init();
}
export function init(game) {
  for (let i = 0; i < 5; i++) {
    game.addEnemy();
  }
  let attempts = 0;
  while (game.obstacles.length < game.numberOfObstacles && attempts < 500) {
    let testObstacle = new Obstacle(game);
    let overlap = false;
    game.obstacles.forEach((obstacle) => {
      const dx = testObstacle.collisionX - obstacle.collisionX;
      const dy = testObstacle.collisionY - obstacle.collisionY;
      const distance = Math.hypot(dy, dx);
      const distanceBuffer = 150;
      const sumOfRadii =
        testObstacle.collisionRadius +
        obstacle.collisionRadius +
        distanceBuffer;
      if (distance < sumOfRadii) {
        overlap = true;
      }
    });
    const margin = testObstacle.collisionRadius * 3;
    if (
      !overlap &&
      testObstacle.spriteX > 0 &&
      testObstacle.spriteX < game.width - testObstacle.width &&
      testObstacle.collisionY > game.topMargin + margin &&
      testObstacle.collisionY < game.height - margin
    ) {
      game.obstacles.push(testObstacle);
    }
    attempts++;
  }
}
