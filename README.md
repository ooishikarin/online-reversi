// Firebaseの初期化
const firebaseConfig = {
  apiKey: "AIzaSyCvXvcb4GkGKv-9CPu_8ANZjijuJAgOV0k",
  authDomain: "reversi-online-f5791.firebaseapp.com",
  projectId: "reversi-online-f5791",
  storageBucket: "reversi-online-f5791.firebasestorage.app",
  messagingSenderId: "623914396117",
  appId: "1:623914396117:web:56b0f8d7d449325dc3b55c"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let board = Array(8).fill(null).map(() => Array(8).fill(null));
let currentPlayer = 'black';
const roomRef = ref(db, 'rooms/room1');

function initializeBoard() {
  board[3][3] = 'white';
  board[3][4] = 'black';
  board[4][3] = 'black';
  board[4][4] = 'white';
  syncBoard();
  renderBoard();
}

function renderBoard() {
  const boardEl = document.getElementById("board");
  boardEl.innerHTML = "";
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      if (board[y][x]) {
        const stone = document.createElement("div");
        stone.className = "stone " + board[y][x];
        cell.appendChild(stone);
      }
      cell.addEventListener("click", () => handleMove(x, y));
      boardEl.appendChild(cell);
    }
  }
}

function handleMove(x, y) {
  if (board[y][x]) return;
  board[y][x] = currentPlayer;
  currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
  syncBoard();
  renderBoard();
}

function syncBoard() {
  set(roomRef, {
    board,
    currentPlayer
  });
}

onValue(roomRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    board = data.board;
    currentPlayer = data.currentPlayer;
    renderBoard();
  }
});

window.onload = () => {
  initializeBoard();
};
