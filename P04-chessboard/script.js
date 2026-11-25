// Everything (HTML elements and CSS) is created from JavaScript
document.body.style.fontFamily = 'Arial, sans-serif';
document.body.style.background = '#f0f0f0';

const title = document.createElement('h2');
title.textContent = 'Chessboard';
title.style.textAlign = 'center';
document.body.appendChild(title);

const board = document.createElement('div');
Object.assign(board.style, {
  display: 'grid',
  gridTemplateColumns: 'repeat(8, 60px)',
  gridTemplateRows: 'repeat(8, 60px)',
  width: '480px',
  margin: '20px auto',
  border: '5px solid #333'
});
document.body.appendChild(board);

const pieces = {
  0: ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
  1: Array(8).fill('♟'),
  6: Array(8).fill('♙'),
  7: ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
};

for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    const cell = document.createElement('div');
    Object.assign(cell.style, {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '40px',
      background: (row + col) % 2 === 0 ? '#f0d9b5' : '#b58863'
    });
    if (pieces[row]) cell.textContent = pieces[row][col];
    board.appendChild(cell);
  }
}
