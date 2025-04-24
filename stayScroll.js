// fixed-lines.js
function initializeFixedLines() {
    gsap.registerPlugin(ScrollTrigger);
  
    // Select elements
    const fixedLines = document.querySelector(".fixed-hr-lines");
    const contentBox = document.querySelector(".content-box");
    const movingContent = document.querySelector(".moving-content");
    const panels = gsap.utils.toArray(".panel");
  
    // Calculate total scroll distance needed
    const totalScrollDistance = (panels.length - 1) * contentBox.offsetHeight;
  
    // Set up the animation
    gsap.to(movingContent, {
      y: () => -totalScrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: ".fixed-hr-lines",
        start: "top top",
        end: () => `+=${totalScrollDistance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });
  
    // Add active class to current panel
    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: () => `top+=${i * contentBox.offsetHeight} top`,
        end: () => `top+=${(i + 1) * contentBox.offsetHeight} top`,
        onToggle: (self) => self.isActive && setActivePanel(i),
      });
    });
  
    function setActivePanel(index) {
      panels.forEach((panel, i) => {
        panel.classList.toggle("active", i === index);
      });
    }
  }
  
  // Initialize when DOM is ready
  document.addEventListener("DOMContentLoaded", initializeFixedLines);