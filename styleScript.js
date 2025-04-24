window.addEventListener('load', adjustMilestoneHeight);
window.addEventListener('resize', adjustMilestoneHeight);

function adjustMilestoneHeight() {
  const milestone = document.querySelector('.milestone');
  const news = document.querySelector('.news');
  const discover = document.querySelector('.discover');
  const heightInPixels = window.innerHeight * 1.7;

  if (heightInPixels > 1000) {
    milestone.style.minHeight = 'calc(80vh + 112px)';
    news.style.minHeight = `calc(69vh - 112px)`;
    discover.style.minHeight = `calc(73vh - 112px)`;
  } else {
    milestone.style.minHeight = 'calc(180vh + 112px)';
    news.style.minHeight = `calc(100vh - 112px)`;
    discover.style.minHeight = `calc(100vh - 112px)`;

  }
}