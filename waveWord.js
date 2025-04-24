function prepareScrubLetters(selector) {
  document.querySelectorAll(selector).forEach(el => {
    const text = el.textContent.trim().replace(/\s+/g, ' ');
    el.innerHTML = ''; // Clear original content

    text.split(' ').forEach(word => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap';

      word.split('').forEach(char => {
        const span = document.createElement('span');
        span.className = 'letters';
        span.textContent = char;
        wordSpan.appendChild(span);
      });

      const space = document.createElement('span');
      space.innerHTML = '&nbsp;';
      wordSpan.appendChild(space);

      el.appendChild(wordSpan);
    });

    setTimeout(() => {
      const letters = el.querySelectorAll('.letters');
      gsap.fromTo(letters,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          ease: 'power2.out',
          duration: 0.6
        });

      // Animate sibling `.line` element if it exists
      const line = el.closest('.quote-box')?.querySelector('.line');
      if (line) {
        
        gsap.fromTo(line,
          { opacity: 0, width: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out'
          });
      }
    }, 3000); // delay in milliseconds
  });
}


document.addEventListener('DOMContentLoaded', () => {
  prepareScrubLetters('.text-to-animate');
  prepareScrubLetters('.another-animated-text');
  prepareScrubLetters('.footer-quote');
});
