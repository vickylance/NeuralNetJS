const canvas: HTMLCanvasElement = document.getElementById("tetris") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
ctx.scale(20, 20);

const matrix = [
  [0,0,0],
  [1,1,1],
  [0,1,0]
];

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value !== 0) {
        ctx.fillStyle = 'red';
        ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    })
  });
}

let player = {
  matrix: matrix,
  pos: {x: 5, y: 5}
}

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;
function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;
  
  dropCounter += deltaTime;
  if(dropCounter > dropInterval) {
    player.pos.y++;
    dropCounter = 0;
  }
  
  // clear the screen
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // draw the game
  draw();
  // run at monitor refresh speed
  requestAnimationFrame(update)
}

function draw() {
  drawMatrix(player.matrix, player.pos);
}

// controls
document.addEventListener('keydown', event => {
  console.log(event);
  if(event.keyCode === 37 || event.keyCode === 65) {
    // left key is pressed or A is pressed
    player.pos.x--;
  } else if(event.keyCode === 39 || event.keyCode === 68) {
    // right key or D is pressed
    player.pos.x++;
  } else if(event.keyCode === 40 || event.keyCode === 83) {
    // down key or S is pressed
    dropInterval = 10;
  }
})

// stat the game
update();
