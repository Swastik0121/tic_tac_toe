let gameOver = false;
let currentPlayer = 'X';
let arr = Array(9).fill(null);
// console.log(array)

function showMessage(text) {
  const messageElement = document.getElementById('message');
  const restartBtn = document.getElementById('restart-btn');
  messageElement.innerText = text;
  messageElement.style.display = 'block';
  restartBtn.style.display = 'block';
}

function checkWinner() {
  if (
    (arr[0] !== null && arr[0] == arr[1] && arr[1] == arr[2]) ||
    (arr[3] !== null && arr[3] == arr[4] && arr[4] == arr[5]) ||
    (arr[6] !== null && arr[6] == arr[7] && arr[7] == arr[8]) ||
    (arr[0] !== null && arr[0] == arr[3] && arr[3] == arr[6]) ||
    (arr[1] !== null && arr[1] == arr[4] && arr[4] == arr[7]) ||
    (arr[2] !== null && arr[2] == arr[5] && arr[5] == arr[8]) ||
    (arr[0] !== null && arr[0] == arr[4] && arr[4] == arr[8]) ||
    (arr[6] !== null && arr[6] == arr[4] && arr[4] == arr[2])
  ) {
    showMessage(`The Winner is ${currentPlayer} !!`);
    gameOver = true;
    return;
  }
  if (!arr.some((e) => e === null)) {
    showMessage('It is a Draw !!');
    gameOver = true;
    return;
  }
}

function handleClick(ele) {
  if (gameOver) return;
  const id = Number(ele.id);
  if (arr[id] !== null) return;
  arr[id] = currentPlayer;
  ele.innerText = currentPlayer;
  checkWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function restartGame() {
  // Confirmation from user
  if (!confirm('Are you sure you want to restart the game?')) {
    return;
  }

  // Select the game grid element
  const grid = document.querySelector('.grid');

  // Adding the fade-out class
  grid.classList.add('fade-out');

  grid.addEventListener('animationend', function handler() {
    grid.removeEventListener('animationend', handler);

    arr.fill(null);
    currentPlayer = 'X';
    gameOver = false;

    document.getElementById('message').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'none';

    document.querySelectorAll('.col').forEach((cell) => (cell.innerText = ''));

    grid.classList.remove('fade-out');
    grid.classList.remove('fade-in');

    grid.addEventListener('animationend', function handler2() {
      grid.removeEventListener('animationend', handler2);
      grid.classList.remove('fade-in');
    });
  });
}
