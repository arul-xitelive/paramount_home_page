// timeline.js
function generateLeftPositions(count, start = 10, end = 90) {
  if (count === 1) return [50];
  const step = (end - start) / (count - 1);
  return Array.from({ length: count }, (_, i) => 
    Number((start + i * step).toFixed(2))
  );
}

function initializeTimeline() {
  gsap.registerPlugin(ScrollTrigger);

  // DOM elements
  const container = document.querySelector(".scroll-container");
  const timelineContainer = document.querySelector(".timeline-container");
  const timelineItems = document.querySelectorAll(".timeline-item");

  // Position items evenly
  const percentagePositions = generateLeftPositions(timelineItems.length);
  timelineItems.forEach((item, index) => {
    item.style.left = `${percentagePositions[index]}%`;
  });

  // Calculate scroll distance
  const scrollDistance = window.innerWidth - window.innerWidth / 6;

  // Initialize first item as active
  setActiveItem(timelineItems[0]);

  // Horizontal scroll animation
  const timelineScroll = gsap.to(timelineContainer, {
    x: () => -scrollDistance,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: () => `+=${scrollDistance}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: updateActiveItemOnScroll,
    },
  });

  // Add click handlers
  timelineItems.forEach(item => {
    item.addEventListener("click", handleTimelineItemClick);
  });

  function updateActiveItemOnScroll() {
    const scrollX = Math.abs(timelineContainer.getBoundingClientRect().x);
    const viewportCenter = scrollX + window.innerWidth / 2;
    
    let closestItem = null;
    let smallestDistance = Infinity;

    timelineItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2 + scrollX;
      const distance = Math.abs(viewportCenter - itemCenter);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestItem = item;
      }
    });

    if (closestItem) {
      setActiveItem(closestItem);
    }
  }

  function handleTimelineItemClick() {
    const rect = this.getBoundingClientRect();
    const targetX = rect.left + window.scrollX - window.innerWidth / 2 + rect.width / 2;

    gsap.to(timelineContainer, {
      x: -targetX,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => setActiveItem(this),
    });
  }

  function setActiveItem(element) {
    timelineItems.forEach(el => el.classList.remove("active"));
    element.classList.add("active");
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initializeTimeline);