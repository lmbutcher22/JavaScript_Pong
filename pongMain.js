//This is my main javascript code.
let testXValues = () => {
  console.log(ball.x + ' ' + paddleLeft.x + ' ' + paddleRight.x)
}
let spood = 0;
//(pracWidth/2)-30, (pracHeight/2)-30
let resetGame = () => {
  if (Math.random() < 0.3 ) {
    if(Math.random() < 0.9) {
  spood += 1;
} else {
  spood -= 1
}
}
  ball.x = (pracWidth/2)-30;
  ball.y = (pracHeight/2)-30;
  if (Math.random() < 0.5) {
    ball.speedX = 2.0 + spood
  } else {
    ball.speedX = -2.0 - spood
  }
  if (Math.random() < 0.5) {
    ball.speedY = 2.0 + spood
  } else {
    ball.speedY = -2.0 - spood
  }
  console.log(ball.speedX + ' ' + ball.speedY)
}
const usefularray = [['q',81], ['a',65], ['p',80], ['l',76]]
console.log('It has begun');
//1abc9c
let myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 600;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        //This is my detection algoithm. It works by asigning a true or false value to a numbered key base pair in the object "map".
        //After assigning these values it tests to see if the keys are either both up, both down, alternating, or singular and reacts accordingly.
        //Additionaly I used other requirements to test if the paddles were going to go off the screen.
        //After determining what is going on it changes the y values of the paddles, afterword refreshing the canvas.
        var map = {};
onkeydown = onkeyup = function(e){
    e = e || event;
    map[e.keyCode] = e.type == 'keydown';
    if (map[49]){
      testXValues()
    }
    if (map[81] && map[80]) {//both up
      if ((paddleLeft.y > 3 && paddleLeft.y < 300) && (paddleRight.y > 2 && paddleLeft.y < 300)){
      paddleLeft.y -= 3
      paddleRight.y -= 3
    }
    } else if (map[65] && map[76]) {//both down
      if ((paddleLeft.y > 2 && (paddleLeft.y + 50) < 300) && (paddleRight.y > 2 && (paddleLeft.y + 50) < 300)){
      paddleLeft.y += 3
      paddleRight.y += 3
    }
    } else if (map[65] && map[80]) {//left down, right up
      if ((paddleLeft.y > 2 && (paddleLeft.y + 50) < 300) && (paddleRight.y > 2 && paddleLeft.y < 300)){
      paddleLeft.y += 3
      paddleRight.y -= 3
    }
    } else if (map[81] && map[76]) {//left up right down
      if ((paddleLeft.y > 2 && paddleLeft.y < 300) && ((paddleRight.y + 50) > 2 && paddleLeft.y < 300)){
      paddleLeft.y -= 3
      paddleRight.y += 3
    }
    } else if (map[81]) {//left up
      if (paddleLeft.y > 2 && paddleLeft.y < 300) {
      paddleLeft.y -= 3
    }
    } else if (map[80]) {//right up
      if (paddleRight.y > 2 && paddleRight.y < 300) {
      paddleRight.y -= 3
    }
    } else if(map[65]) {//left down
      if (paddleLeft.y > 2 && paddleLeft.y < 300) {
      paddleLeft.y += 3
    }
    } else if (map[76]) {
      if (paddleRight.y > 2 && paddleRight.y < 300) {
      paddleRight.y += 3
    }
    }
}
},
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
}
function updateGameArea() {
    myGameArea.clear();
    ball.newPos();
    ball.updateBall();
    paddleLeft.update();
    paddleRight.update();
}
const pracWidth = 600;
const pracHeight = 300;
let leftScore;
let rightScore;
let ball;
let paddleLeft;
let paddleRight;
function startGame() {
  myGameArea.start();
  leftScore = 0;
  rightScore = 0;
  ball = new component(20, 20, "red", (pracWidth/2)-30, (pracHeight/2)-30);
  paddleLeft = new component(20, 50, "white", 10, (pracHeight/2)-25);
  paddleRight = new component(20, 50, "white", pracWidth-30, (pracHeight/2)-25);
  /*while (leftScore < 5 && rightScore < 5) {

  }*/
  if (Math.random() < 0.5) {
    ball.speedX = 2.0
  } else {
    ball.speedX = -2.0
  }
  if (Math.random() < 0.5) {
    ball.speedY = 2.0
  } else {
    ball.speedY = -2.0
  }
  console.log('this is a test');
}

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.bounce = 0.6;
  ctx = myGameArea.context;
  ctx.fillStyle = color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.bounceBall = () => {
    //This is my collision fuction and works by testing if the ball's x and y values are within the scope of a paddle and bounces it by inverting the x and/or y speed.
    let bottomSide = pracHeight - this.height;
    let topSide = 0;
    let leftSide = 0;
    let rightSide = pracWidth - this.width;
    let leftX = 10;
    let rightX = pracWidth-30;
    if ((this.x - 20) === leftX && (this.y) >= (paddleLeft.y - 25) && (this.y - 20) <= (paddleLeft.y + 25)) {
      console.log('left')
      console.log(`this.x is ${this.x} leftX is ${leftX} paddleLeft.y is ${paddleLeft.y}`)
      this.speedX = 2.0 + spood
      if (this.speedY < 0) {
        this.speedY = -2.0 - spood
      } else {
        this.speedY = 2.0 + spood
      }
    }
    if (this.x === rightX && this.y >= (paddleRight.y - 25) && this.y <= (paddleRight.y + 25)) {
      console.log('right');
      console.log(`this.x is ${this.x} rightX is ${rightX} this.y is ${this.y} paddleRight.y is ${paddleRight.y}`)
      this.speedX = -2.0 - spood
      if (this.speedY < 0) {
        this.speedY = -2.0 - spood
      } else {
        this.speedY = 2.0 + spood
      }
    } else {
      if (this.y >= bottomSide) {//bouncing off the bottom
        this.speedY = -2.0 - spood;
      };
      if (this.y <= topSide) {//bouncing off top
        this.speedY = 2.0 + spood;
      };
      if (this.x <= leftSide) {//bouncing off left side
resetGame();
      };
      if (this.x >= rightSide) {//bouncing off left side
resetGame();

      };
    }
  };
  this.updateBall = () => {
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.bounceBall();
  };
};
