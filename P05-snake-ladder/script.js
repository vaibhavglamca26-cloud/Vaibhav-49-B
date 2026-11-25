const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };

const boardEl = document.getElementById('board');
const diceEl = document.getElementById('dice');
const turnEl = document.getElementById('turn');
const msgEl = document.getElementById('msg');
const rollBtn = document.getElementById('roll');

let positions, current, tokens;

// convert square number (1-100) into x, y pixel position (zig-zag board)
function coords(n) {
  const row = Math.floor((n - 1) / 10);
  const col = row % 2 === 0 ? (n - 1) % 10 : 9 - ((n - 1) % 10);
  return { x: col * 50, y: (9 - row) * 50 };
}

function buildBoard() {
  boardEl.innerHTML = '';
  for (let r = 9; r >= 0; r--) {
    for (let c = 0; c < 10; c++) {
      const n = r % 2 === 0 ? r * 10 + c + 1 : r * 10 + (10 - c);
      const cell = document.createElement('div');
      cell.className = 'cell ' + (n % 2 ? 'odd' : 'even');
      cell.innerHTML = n;
      if (snakes[n]) { cell.classList.add('snake'); cell.innerHTML += `<small>S to ${snakes[n]}</small>`; }
      if (ladders[n]) { cell.classList.add('ladder'); cell.innerHTML += `<small>L to ${ladders[n]}</small>`; }
      boardEl.appendChild(cell);
    }
  }
  tokens = [1, 2].map(i => {
    const t = document.createElement('div');
    t.className = 'token p' + i;
    boardEl.appendChild(t);
    return t;
  });
}

function place(i) {
  const n = positions[i] || 1;
  const { x, y } = coords(n);
  tokens[i].style.left = x + 4 + i * 20 + 'px';
  tokens[i].style.top = y + 28 + 'px';
}

function newGame() {
  positions = [0, 0];
  current = 0;
  buildBoard();
  place(0); place(1);
  diceEl.textContent = '-';
  msgEl.textContent = '';
  turnEl.textContent = "Player 1's turn";
  rollBtn.disabled = false;
}

rollBtn.addEventListener('click', () => {
  const roll = Math.floor(Math.random() * 6) + 1;
  diceEl.textContent = roll;
  let msg = '';
  let next = positions[current] + roll;
  if (next > 100) {
    msg = 'Need exact roll to reach 100.';
    next = positions[current];
  } else {
    if (snakes[next]) { msg = `Snake! Down to ${snakes[next]}`; next = snakes[next]; }
    else if (ladders[next]) { msg = `Ladder! Up to ${ladders[next]}`; next = ladders[next]; }
  }
  positions[current] = next;
  place(current);
  msgEl.textContent = msg;
  if (next === 100) {
    turnEl.textContent = `Player ${current + 1} wins!`;
    rollBtn.disabled = true;
    return;
  }
  current = 1 - current;
  turnEl.textContent = `Player ${current + 1}'s turn`;
});
document.getElementById('reset').addEventListener('click', newGame);
newGame();
