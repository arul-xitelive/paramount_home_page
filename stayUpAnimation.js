const tl = gsap.timeline();

tl.from(".home-wrapper .animation-title ", 0.7, {
  y: 100,
  ease: "power1.out",
  delay: 1.4,
//   skewY: 7,
  // stagger: {
  //   amount: 0.3
  // }
  stagger:0.5
})

