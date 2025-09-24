import { Egg } from "../entities/Egg.js";
import { Enemy } from "../entities/Enemy.js";

export function addEgg(game) {
  game.eggs.push(new Egg(game));
}
export function addEnemy(game) {
  game.enemies.push(new Enemy(game));
}
export function removeGameObjects(game) {
  game.eggs = game.eggs.filter((object) => !object.markedForDeletion);
  game.hatchlings = game.hatchlings.filter(
    (object) => !object.markedForDeletion
  );
  game.particles = game.particles.filter((object) => !object.markedForDeletion);
}
