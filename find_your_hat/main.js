const prompt = require("prompt-sync")({ sigint: true });
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
function random(x, y, collision = []) {
  let random_arr = {
    x: Math.floor(Math.random() * x),
    y: Math.floor(Math.random() * y),
  };
  if (collision.length != 0) {
    if (random_arr.x == collision[0] && random_arr.y == collision[1]) {
      this.random(x, y, collision);
    }
  }
  return random_arr;
}
class Field {
  constructor(field) {
    if (!Array.isArray(field)) {
      throw new Error("Field must be an array.");
    }
    this.field = field;
    this.height = field.length;
    this.width = field[0].length;
    this.hat_pos = random(this.height, this.width);
    this.current_location = random(this.height, this.width, this.hat_pos);
  }
  print() {
    for (let row of this.field) {
      console.log(row.join(""));
    }
  }
  move(current_location) {
    rl.question("Your move (w-up, s-down, a-left, d-right):", (movement) => {
      if (movement == "w") {
        current_location[0] -= 1;
      } else if (movement == "s") {
        current_location[0] += 1;
      } else if (movement == "d") {
        current_location[1] += 1;
      } else if (movement == "a") {
        current_location[1] -= 1;
      } else {
        console.log("Invalid move!");
        this.move(current_location);
      }
      if (this.win_yet(current_location) == true) {
        console.log("Congrats!");
        console.log("\nGoodbye!"); // Custom exit message
        process.exit(0);
        rl.close();
      } else if (this.lose_yet(current_location) == true) {
        console.log("Try again");
        console.log("Game Restart!");
        this.run();
      } else {
        this.field[current_location[0]][current_location[1]] = pathCharacter;
        this.print();
        console.log(current_location);
        this.move(current_location);
      }
    });

    // Optional: Handle user exit (Ctrl + C)
    rl.on("close", () => {
      console.log("Goodbye");
      process.exit();
    });
  }

  win_yet(location) {
    let hat = Object.values(this.hat_pos);
    for (let i = 0; i < location.length; i++) {
      if (location[i] !== hat[i]) {
        return false; // If any element doesn't match, return false
      }
    }
    return true;
  }
  lose_yet(location) {
    let arr = this.field;
    if (arr[location[0]][location[1]] == hole) {
      return true;
    } else {
      return false;
    }
  }
  run() {
    this.field = Field.generateField(this.height, this.width);
    this.hat_pos = random(this.height, this.width);
    this.field[this.hat_pos.x][this.hat_pos.y] = hat;
    this.current_location = random(this.height, this.width, this.hat_pos);
    this.field[this.current_location.x][this.current_location.y] =
      pathCharacter;
    this.print();
    let current_location = Object.values(this.current_location);
    current_location = this.move(current_location);
  }

  static generateField(height, width, percentage = 0.2) {
    let array = new Array(height);
    for (let i = 0; i < height; i++) {
      array[i] = new Array(width).fill(fieldCharacter);
    }

    const num_holes = Math.floor(height * width * percentage);
    for (let num = 1; num <= num_holes; num++) {
      let random_row = Math.floor(Math.random() * height);
      let random_col = Math.floor(Math.random() * width);
      if (array[random_row][random_col] !== hole) {
        array[random_row][random_col] = hole;
      } else {
        num -= 1;
      }
    }

    return array;
  }
}

function define_game() {
  console.log("WELCOME TO OUR 2D LEGENDARY GAME");
  console.log("Hope you enjoy the game!");
  rl.question("Height of game is ", function (height) {
    rl.question("width of game is ", function (width) {
      rl.question("How hard it is level from 1 to 5: ", function (hole) {
        const myField = Field.generateField(height, width, hole/10);
        const fieldgame = new Field(myField);
        fieldgame.run();
      });
    });
  });
}
define_game();
