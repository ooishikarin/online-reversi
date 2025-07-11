const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const board = document.getElementById('board');
const turnDisplay = document.getElementById('turn');
let turn = 'black';
const cells = [];

function initBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 64; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleClick);
        board.appendChild(cell);
        cells.push(cell);
    }
    cells[27].classList.add('white');
    cells[28].classList.add('black');
    cells[35].classList.add('black');
    cells[36].classList.add('white');
}

function handleClick(e) {
    const cell = e.target;
    if (cell.classList.contains('black') || cell.classList.contains('white')) return;
    cell.classList.add(turn);
    turn = turn === 'black' ? 'white' : 'black';
    turnDisplay.textContent = '現在のターン: ' + (turn === 'black' ? '●' : '○');
    // TODO: Firebase送信処理追加
}

initBoard();
