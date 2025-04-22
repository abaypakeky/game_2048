const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const size = 4;
let board = [];

function init() {
  board = Array(size).fill().map(() => Array(size).fill(0));
  addTile();
  addTile();
  draw();
}

function addTile() {
  let options = [];
  for (let i = 0; i < size; i++)
    for (let j = 0; j < size; j++)
      if (board[i][j] === 0) options.push({ x: i, y: j });
  if (options.length > 0) {
    let spot = options[Math.floor(Math.random() * options.length)];
    board[spot.x][spot.y] = Math.random() < 0.9 ? 2 : 4;
  }
}

function draw() {
  ctx.clearRect(0, 0, 400, 400);
  for (let i = 0; i < size; i++)
    for (let j = 0; j < size; j++) {
      ctx.fillStyle = board[i][j] === 0 ? "#ccc" : "#ffcc00";
      ctx.fillRect(j * 100, i * 100, 100, 100);
      ctx.fillStyle = "#000";
      if (board[i][j] !== 0) {
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText(board[i][j], j * 100 + 50, i * 100 + 60);
      }
    }
}

window.addEventListener("keydown", (e) => {
  let flipped = false;
  let rotated = false;
  let played = true;

  switch (e.key) {
    case "ArrowUp":
      board = rotateLeft(board);
      break;
    case "ArrowRight":
      board = flip(board);
      break;
    case "ArrowDown":
      board = rotateRight(board);
      break;
    case "ArrowLeft":
      break;
    default:
      played = false;
  }

  if (played) {
    board = operate(board);
    if (e.key === "ArrowUp") board = rotateRight(board);
    else if (e.key === "ArrowDown") board = rotateLeft(board);
    else if (e.key === "ArrowRight") board = flip(board);
    addTile();
    draw();
  }
});

function operate(rows) {
  for (let i = 0; i < size; i++) {
    let arr = rows[i].filter(val => val);
    for (let j = 0; j < arr.length - 1; j++)
      if (arr[j] === arr[j + 1]) {
        arr[j] *= 2;
        arr[j + 1] = 0;
      }
    arr = arr.filter(val => val);
    while (arr.length < size) arr.push(0);
    rows[i] = arr;
  }
  return rows;
}

function rotateLeft(matrix) {
  return matrix[0].map((_, i) => matrix.map(row => row[i])).reverse();
}

function rotateRight(matrix) {
  return matrix[0].map((_, i) => matrix.map(row => row[i]).reverse());
}

function flip(matrix) {
  return matrix.map(row => row.reverse());
}

init();
