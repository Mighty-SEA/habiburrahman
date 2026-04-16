// Scroll Animation using Intersection Observer
const observerOptions = {
  root: null,
  rootMargin: '-100px 0px -100px 0px', // Trigger saat card 100px masuk viewport
  threshold: 0.3 // Trigger saat 30% card terlihat
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.classList.remove('hidden');
    } else {
      entry.target.classList.remove('visible');
      entry.target.classList.add('hidden');
    }
  });
}, observerOptions);

// Initialize scroll animation
function initScrollAnimation() {
  const animatedElements = document.querySelectorAll('.scroll-animate');
  animatedElements.forEach(el => observer.observe(el));
}

// Run immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimation);
} else {
  initScrollAnimation();
}
