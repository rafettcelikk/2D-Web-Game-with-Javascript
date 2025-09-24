import { renderGame } from "./renderer.js";
import { checkCollision } from "./collision.js";
import { addEgg, addEnemy, removeGameObjects } from "./objectManager.js";
import { restartGame, init } from "./gameState.js";
import { Player } from "../entities/Player.js";

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.topMargin = 260;
    this.debug = true;
    this.player = new Player(this);
    this.fps = 70;
    this.timer = 0;
    this.interval = 1000 / this.fps;
    this.eggTimer = 0;
    this.eggInterval = 500;
    this.numberOfObstacles = 10;
    this.maxEggs = 5;
    this.obstacles = [];
    this.eggs = [];
    this.enemies = [];
    this.hatchlings = [];
    this.particles = [];
    this.gameObjects = [];
    this.score = 0;
    this.winningScore = 30;
    this.gameOver = false;
    this.lostHatchlings = 0;
    this.mouse = {
      x: this.width * 0.5,
      y: this.height * 0.5,
      pressed: false,
    };

    canvas.addEventListener("mousedown", (e) => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
      this.mouse.pressed = true;
    });
    canvas.addEventListener("mouseup", (e) => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
      this.mouse.pressed = false;
    });
    canvas.addEventListener("mousemove", (e) => {
      if (this.mouse.pressed) {
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
      }
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "d") this.debug = !this.debug;
      else if (e.key === "r") this.restart();
    });
  }
  render(context, deltaTime) {
    renderGame(this, context, deltaTime);
  }
  checkCollision(a, b) {
    return checkCollision(a, b);
  }
  addEgg() {
    addEgg(this);
  }
  addEnemy() {
    addEnemy(this);
  }
  removeGameObjects() {
    removeGameObjects(this);
  }
  restart() {
    restartGame(this);
  }
  init() {
    init(this);
  }
}
