const container = document.getElementById('container');
const resizeButton = document.getElementById('resize-button');
let currentSize = 16;

function createGrid(size) {
  clearGrid();

  const squareSize = 960 / size;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.classList.add('grid-square');
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    square.dataset.darkness = '0';
    square.addEventListener('mouseenter', handleHover);
    container.appendChild(square);
  }
}

function handleHover(e) {
  const square = e.target;
  let darkness = parseInt(square.dataset.darkness, 10);
  if (darkness < 10) {
    darkness += 1;
    square.dataset.darkness = darkness;
    square.style.backgroundColor = getRandomRGB(darkness);
  }
}

function getRandomRGB(darknessLevel) {
  const factor = 1 - (darknessLevel * 0.1);
  const r = Math.floor(Math.random() * 256 * factor);
  const g = Math.floor(Math.random() * 256 * factor);
  const b = Math.floor(Math.random() * 256 * factor);
  return `rgb(${r}, ${g}, ${b})`;
}

function clearGrid() {
  container.innerHTML = '';
}

function promptForSize() {
  const input = prompt('Enter grid size (1-100):', currentSize);
  const size = parseInt(input, 10);

  if (!size || size < 1 || size > 100) {
    alert('Please enter a number between 1 and 100.');
    return;
  }

  currentSize = size;
  createGrid(currentSize);
}

resizeButton.addEventListener('click', promptForSize);

// Load initial grid
createGrid(currentSize);
