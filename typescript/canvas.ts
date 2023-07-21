//---------------------------------------------------------------------
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const player = new Player();
let floors: Floor[] = [];

function generateFloor() {
  const minGap = 100;
  const maxGap = 300;
  const minWidth = 50;
  const maxWidth = 200;

  const lastFloor = floors[floors.length - 1];
  const y = lastFloor ? lastFloor.y - 100 : 350;

  const gap = Math.floor(Math.random() * (maxGap - minGap + 1)) + minGap;
  const width =
    Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
  const x = Math.floor(Math.random() * (500 - width));

  floors.push(new Floor(x, y, width));
}

function removeFloors() {
  floors = floors.filter((floor) => floor.y + floor.height > 0);
}

function update() {
  player.update();

  for (const floor of floors) {
    if (
      player.x < floor.x + floor.width &&
      player.x + player.width > floor.x &&
      player.y + player.height > floor.y
    ) {
      player.y = floor.y - player.height;
      player.velocityY = 0;
      player.isJumping = false;
      break;
    }
  }

  removeFloors();

  if (floors.length === 0 || floors[floors.length - 1].y > 100) {
    generateFloor();
  }
}


function onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowLeft") {
      player.x -= 5;
    } else if (event.key === "ArrowRight") {
      player.x += 5;
    }
  }
  
  function onKeyUp(event: KeyboardEvent) {
    // Add any additional handling if needed
  }
  
  function onKeyPress(event: KeyboardEvent) {
    if (event.key === " ") {
      player.jump();
    }
  }
  
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
  document.addEventListener("keypress", onKeyPress);
//---------------------------------------------------------------------
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw(ctx);
  for (const floor of floors) {
    floor.draw(ctx);
  }
  requestAnimationFrame(draw);
}

canvas.addEventListener("click", () => {
  player.jump();
});

generateFloor();

setInterval(update, 1000 / 60);
draw();
