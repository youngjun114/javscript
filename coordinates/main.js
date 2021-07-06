const vertical = document.querySelector('.vertical');
const horizontal = document.querySelector('.horizontal');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');
const targetRect = target.getBoundingClientRect();
const targetHalfWidth = targetRect.width / 2;
const targetHalfHeight = targetRect.height / 2;
const tagRect = tag.getBoundingClientRect();

// when mouse moves, move elements along with the mouse cursor
document.addEventListener('mousemove', (event) => {
  const x = event.clientX;
  const y = event.clientY;

  // pass x, y coordinates to elements
  // used translate for better performance
  // translate only require composition phase
  vertical.style.transform = `translateX(${x}px)`;
  horizontal.style.transform = `translateY(${y}px)`;
  target.style.transform = `translate(${x - targetHalfWidth}px, ${
    y - targetHalfHeight
  }px)`;
  tag.style.transform = `translate(${x}px, ${y}px)`;

  tag.innerHTML = `${x}, ${y}`;
});
