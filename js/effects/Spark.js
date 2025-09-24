import { Particle } from "./Particles.js";

export class Spark extends Particle {
  update() {
    this.angle += this.va * 0.5;
    this.collisionX += Math.cos(this.angle) * this.speedX;
    this.collisionY -= Math.sin(this.angle) * this.speedY;
    if (this.radius > 0.1) this.radius -= 0.05;
    if (this.radius < 0.2) {
      this.markedForDeletion = true;
      this.game.removeGameObjects();
    }
  }
}
