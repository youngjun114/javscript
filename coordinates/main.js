const vertical = document.querySelector('.vertical');
const horizontal = document.querySelector('.horizontal');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');

// when mouse moves, move elements along with the mouse cursor
document.addEventListener('mousemove', (event) => {
  const x = event.clientX;
  const y = event.clientY;

  // pass x, y coordinates to elements
  vertical.style.left = `${x}px`;
  horizontal.style.top = `${y}px`;
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
  tag.style.left = `${x}px`;
  tag.style.top = `${y}px`;

  tag.innerHTML = `${x}, ${y}`;
});
