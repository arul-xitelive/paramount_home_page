const moon = document.getElementById('moon');

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;
const speed = 0.1; // smaller = slower follow effect

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateMoon() {
  currentX += (mouseX - currentX) * speed;
  currentY += (mouseY - currentY) * speed;

  moon.style.left = currentX + 'px';
  moon.style.top = currentY + 'px';

  requestAnimationFrame(animateMoon);
}

animateMoon();
