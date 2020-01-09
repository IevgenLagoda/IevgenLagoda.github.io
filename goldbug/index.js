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
    this.blockSize = 50;
    this.paddingX = paddingX;
    this.paddingY = paddingY;
    this.map_ = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 1],
      [1, 2, 0, 1, 0, 2, 1],
      [1, 1, 1, 1, 1, 2, 1],
      [1, 2, 0, 1, 0, 2, 1],
      [1, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
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
    let fill = "water";
    switch (type) {
      case 0:
        fill = "water";
        break;
      case 1:
        fill = "grass";
        break;
      case 2:
        fill = "wall";
        break;
      case 3:
        fill = "key";
        break;
      case 4:
        fill = "door";
        break;
    }
    const img = document.getElementById(fill);
    let startX = this.paddingX + y * this.blockSize;
    let startY = this.paddingY + x * this.blockSize;
    ctx.drawImage(img, startX, startY, this.blockSize, this.blockSize);
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
  initCanvas_() {}
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
