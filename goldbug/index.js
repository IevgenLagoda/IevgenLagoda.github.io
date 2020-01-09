const ctx = document.getElementById("canvas").getContext("2d");

class Player {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
  moveLeft() {}

  moveRight() {}

  moveUp() {}

  moveDown() {}
}

class GameMap {
  constructor(paddingX, paddingY) {
    this.blockSize = 40;
    this.paddingX = paddingX;
    this.paddingY = paddingY;
    this.map_ = [
      [1, 2, 2],
      [1, 0, 3],
      [1, 3, 4]
    ];
    this.size = {
      x: this.map_.lengt,
      y: this.map_[0].lengt
    };
  }

  /**
   * Draw a block of map.
   * Types:
   * 0 - water
   * 1 - greass
   * 2 - wall
   * 3 - key
   * 4 - door
   * @param {Number} x
   * @param {Number} y
   * @param {Number} type
   */
  drawBlock(x, y, type) {
    let color = "blue";
    switch (type) {
      case 0:
        color = "blue";
        break;
      case 1:
        color = "green";
        break;
      case 2:
        color = "grey";
        break;
      case 3:
        color = "gold";
        break;
      case 4:
        color = "red";
        break;
    }
    ctx.fillStyle = color;
    let startX = this.paddingX + y * this.blockSize;
    let startY = this.paddingY + x * this.blockSize;

    ctx.fillRect(startX, startY, this.blockSize, this.blockSize);
  }

  draw() {
    for (let y = 0; y < this.map_.length; y++) {
      for (let x = 0; x < this.map_[y].length; x++) {
        this.drawBlock(y, x, this.map_[y][x]);
      }
    }
  }
}

class Game {
  initCanvas_() {
    ctx.width = "640";
    ctx.height = "480";
  }
  constructor() {
    // Global
    this.gold = 0;
    this.padding = 10;

    // Board
    this.initCanvas_();
    this.gameMap = new GameMap(this.padding, this.padding);
    this.gameMap.draw();

    // Player
    this.player = new Player();
    document.addEventListener("keyup", function(e) {
      switch (e.key) {
        case "arrowLeft":
          player.moveLeft();
          break;
        case "arrowRight":
          player.moveRight();
          break;
        case "arrowUp":
          player.moveUp();
          break;
        case "arrowdown":
          player.moveDown();
          break;
      }
    });
  }
}

const game = new Game();
