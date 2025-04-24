document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  let duration = 2;

  function extractNumber(text) {
    let match = text.match(/([\d.]+)([KkMm]?)(\+?)\s*(.*)/); // Extract number, suffix, "+", and extra text
    if (!match) return { value: 0, suffix: "", plus: "", extra: "" };

    let num = parseFloat(match[1]);
    let suffix = match[2].toUpperCase(); // Standardize suffix to uppercase
    let plus = match[3] === "+" ? "+" : ""; // Keep "+" if it exists
    let extraText = match[4]; // Preserve extra text

    // Convert suffixes to actual numbers
    if (suffix === "K") num *= 1000;
    else if (suffix === "M") num *= 1000000;

    return { value: num, suffix, plus, extra: extraText };
  }

  // Function to format numbers correctly
  function formatNumber(value, originalSuffix, plus, extraText) {
    let formattedValue = Math.round(value);
    let suffix = originalSuffix;

    // Convert to K/M format without decimal points
    if (value >= 1000000) {
      formattedValue = Math.round(value / 1000000);
      suffix = "M";
    } else if (value >= 1000) {
      formattedValue = Math.round(value / 1000);
      suffix = "K";
    }

    return formattedValue + suffix + plus + (extraText ? " " + extraText : "");
  }

  // Function to animate extracted numbers
  function animateCount(
    element,
    start,
    end,
    duration,
    suffix,
    plus,
    extraText
  ) {
    let obj = { value: start };
    gsap.to(obj, {
      value: end,
      duration: duration,
      onUpdate: function () {
        element.innerText = formatNumber(obj.value, suffix, plus, extraText);
      },
      ease: "power1.out",
    });
  }

  // Function to apply animation to elements dynamically
  function animateElementsById(id) {
    let element = document.getElementById(id);
    if (!element) return;

    let { value, suffix, plus, extra } = extractNumber(element.innerText);

    gsap.from(element, {
      // opacity: 0,
      // y: 100,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: `#${id}`,
        start: "top 80%",
        toggleActions: "play none none reverse",
        onEnter: function () {
          animateCount(element, 0, value, 2, suffix, plus, extra);
        },
      },
    });
  }
  animateElementsById("capability-heading-10");
  animateElementsById("capability-heading-8");
  animateElementsById("community-heading-4");
  animateElementsById("community-heading-6");
  animateElementsById("community-heading-8");
  animateElementsById("heading-5-number");
  // prepareAnimatedText(".animate-letters");
  prepareScrubLetters(".scrub-letters");
  prepareLettersSlideUp(".letters-slide-up");
  prepareLettersSlideUp(".animate-letters");
  prepareSlideUpText(".slide-up-text");
  prepareWordsSlideFromRight(".animate-words-right");

  document.querySelectorAll(".container-wrapper").forEach((container) => {
    const elements = container.querySelectorAll(".animation-containers span");

    gsap.from(elements, {
      scrollTrigger: {
        trigger: container,
        start: "top 90%", // when the container top hits 90% of viewport
        end: "bottom 60%", // optional for reverse
        toggleActions: "play none none reverse ",
        // markers: true, // enable to debug
      },
      y: 100,
      skewY: 7,
      opacity: 0,
      ease: "power4.out",
      duration: 4,
    });
  });
  

  const sourceText = document.getElementById("inital-heading").textContent;
  gsap.to("#typing-subheading", {
    duration: 1.5,
    text: {
      value: sourceText,
      delimiter: "",
    },
    ease: "power1.inOut",
  });
  gsap.to(".big-text span", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.1,
  });
  

  //  multi word

  function prepareAnimatedText(selector) {
    document.querySelectorAll(selector).forEach((el) => {
      // Save original HTML structure
      let html = el.innerHTML;

      // Wrap all visible words (preserving tags!) in spans
      html = html.replace(/(\S+)(\s+)?/g, (match, word, space) => {
        return `<span class="word">${word}</span>${space || ""}`;
      });

      el.innerHTML = html;

      // Now wrap each letter
      el.querySelectorAll(".word").forEach((wordEl) => {
        const letters = wordEl.textContent.split("");
        wordEl.innerHTML = "";
        letters.forEach((letter) => {
          const span = document.createElement("span");
          span.className = "letter";
          span.textContent = letter;
          wordEl.appendChild(span);
        });
      });

      // Animate
      gsap.to(el.querySelectorAll(".letter"), {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: {
          each: 0.004,
          from: "random",
        },
        ease: "power2.out",
      });
    });
  }
  function wrapWordsInElement(el, wordClass = "fade-word") {
    const walker = document.createTreeWalker(
      el,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    const textNodes = [];

    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.nodeValue.trim().length) {
        textNodes.push(node);
      }
    }

    textNodes.forEach((textNode) => {
      const words = textNode.nodeValue.split(/(\s+)/); // keep spaces
      const fragment = document.createDocumentFragment();

      words.forEach((word) => {
        if (word.trim().length > 0) {
          const span = document.createElement("span");
          span.className = wordClass;
          span.textContent = word;
          fragment.appendChild(span);
        } else {
          fragment.appendChild(document.createTextNode(word));
        }
      });

      textNode.parentNode.replaceChild(fragment, textNode);
    });
  }

  function animateWords(targetClass, options = {}) {
    const wordClass = options.wordClass || "fade-word";

    document.querySelectorAll(`.${targetClass}`).forEach((el) => {
      wrapWordsInElement(el, wordClass);

      const wordSpans = el.querySelectorAll(`.${wordClass}`);

      gsap.to(wordSpans, {
        opacity: 1,
        ease: options.ease || "power2.out",
        stagger: options.stagger || 0.05,
        scrollTrigger: {
          trigger: el,
          start: options.start || "top 10%",
          end: options.end || "bottom 100%",
          scrub: options.scrub ?? 1,
          markers: options.markers || false,
        },
      });
    });
  }

  animateWords("animate-paragraph", {
    wordClass: "fade-word",
    start: "top 80%",
    stagger: 0.1,
    ease: "power3.out",
    scrub: 1,
    // markers: true // disable in production
  });

  animateWords("animate-sub-paragraph", {
    wordClass: "fade-word",
    stagger: 0.1,
    ease: "power3.out",
    scrub: 1,
    start: "top 90%",
    end: "bottom 50%",
    // markers: true // just for debug
  });

  // multi word end

  function prepareSlideUpText(selector) {
    document.querySelectorAll(selector).forEach((el) => {
      // Wrap the element inside a reveal container
      const wrapper = document.createElement("div");
      wrapper.classList.add("reveal-wrapper");

      el.parentNode.insertBefore(wrapper, el);
      wrapper.appendChild(el);

      // Add slide-up class to target animation
      el.classList.add("slide-up");

      // Animate it
      gsap.to(el, {
        scrollTrigger: {
          trigger: wrapper,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 0,
        duration: 1,
        ease: "power3.out",
      });
    });
  }

  
  function prepareScrubLetters(selector) {
    document.querySelectorAll(selector).forEach((el) => {
      const text = el.textContent.trim().replace(/\s+/g, " ");
      el.innerHTML = ""; // Clear original content

      text.split(" ").forEach((word) => {
        const wordSpan = document.createElement("span");
        wordSpan.style.display = "inline-block";
        wordSpan.style.whiteSpace = "nowrap";

        word.split("").forEach((char) => {
          const span = document.createElement("span");
          span.className = "letters";
          span.textContent = char;
          wordSpan.appendChild(span);
        });

        // Add a space after the word
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        wordSpan.appendChild(space);

        el.appendChild(wordSpan);
      });

      const letters = el.querySelectorAll(".letters");

      gsap.fromTo(
        letters,
        { opacity: 0, y: 10 },
        {
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
          opacity: 1,
          y: 0,
          stagger: 0.04,
          ease: "power2.out",
          duration: 3,
        }
      );
    });
  }

  function prepareLettersSlideUp(selector) {
    document.querySelectorAll(selector).forEach((el) => {
      const text = el.textContent.trim().replace(/\s+/g, " ");
      el.innerHTML = ""; // Clear original content

      text.split(" ").forEach((word) => {
        const wordSpan = document.createElement("span");
        wordSpan.style.display = "inline-block";
        wordSpan.style.whiteSpace = "nowrap";

        word.split("").forEach((char) => {
          const span = document.createElement("span");
          span.className = "letters";
          span.textContent = char;
          wordSpan.appendChild(span);
        });

        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        wordSpan.appendChild(space);

        el.appendChild(wordSpan);
      });

      const letters = el.querySelectorAll(".letters");

      gsap.fromTo(
        letters,
        { opacity: 0, y: -10 }, // Start from above
        {
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          y: 0, // Settle to normal position
          stagger: 0.04,
          ease: "power2.out",
          duration: 1,
        }
      );
    });
  }
  function prepareWordsSlideFromRight(selector) {
    document.querySelectorAll(selector).forEach((el) => {
      const words = el.textContent.trim().split(/\s+/);
      el.textContent = ""; // Clear original

      words.forEach((word) => {
        const wrapper = document.createElement("span");
        wrapper.className = "word-wrapper";

        const span = document.createElement("span");
        span.className = "word-slide";
        span.textContent = word;

        wrapper.appendChild(span);
        el.appendChild(wrapper);
      });

      // Animate each word
      gsap.to(el.querySelectorAll(".word-slide"), {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      });
    });
  }
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#mission",
      start: "top 80%",
      end: "bottom 20%", // optional control
      toggleActions: "play reverse play reverse",
      // play on enter ↓, reverse on leave ↑
    },
  });

  const durationVal = 0.8; // faster animation

  tl.from("#mission-heading-3", {
    opacity: 0,
    y: 50,
    duration: durationVal,
    ease: "power2.out",
  })
    .from(
      "#mission-paragraph-2",
      {
        opacity: 0,
        y: 50,
        duration: durationVal,
        ease: "power2.out",
      },
      "-=0.3"
    ) // overlap little with previous

    .from("#mission-heading-4", {
      opacity: 0,
      y: 50,
      duration: durationVal,
      ease: "power2.out",
    })
    .from(
      "#mission-paragraph-3",
      {
        opacity: 0,
        y: 50,
        duration: durationVal,
        ease: "power2.out",
      },
      "-=0.3"
    )

    .from("#mission-heading-5", {
      opacity: 0,
      y: 50,
      duration: durationVal,
      ease: "power2.out",
    })
    .from(
      "#mission-paragraph-4",
      {
        opacity: 0,
        y: 50,
        duration: durationVal,
        ease: "power2.out",
      },
      "-=0.3"
    );

  const tls = gsap.timeline({
    scrollTrigger: {
      trigger: ".vision-card-row",
      start: "top 80%",
      end: "bottom 20%", // optional control
      toggleActions: "play reverse play reverse",
      // play on enter ↓, reverse on leave ↑
    },
  });

  const durationVisionVal = 0.8; // faster animation

  tls
    .from("#vision-paragraph-2", {
      opacity: 0,
      y: 50,
      duration: durationVal,
      ease: "power2.out",
    })
    .from(
      "#vision-heading-3",
      {
        opacity: 0,
        y: 50,
        duration: durationVisionVal,
        ease: "power2.out",
      },
      "-=0.3"
    ) // overlap little with previous

    .from("#vision-paragraph-3", {
      opacity: 0,
      y: 50,
      duration: durationVisionVal,
      ease: "power2.out",
    })
    .from(
      "#vision-heading-5",
      {
        opacity: 0,
        y: 50,
        duration: durationVisionVal,
        ease: "power2.out",
      },
      "-=0.3"
    )

    .from("#vision-heading-4", {
      opacity: 0,
      y: 50,
      duration: durationVisionVal,
      ease: "power2.out",
    })
    .from(
      "#vision-paragraph-4",
      {
        opacity: 0,
        y: 50,
        duration: durationVisionVal,
        ease: "power2.out",
      },
      "-=0.3"
    );

  
});

