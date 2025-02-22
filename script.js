// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    window.scrollTo({
      top: targetSection.offsetTop - 60,
      behavior: 'smooth'
    });

    // Update active nav link
    document.querySelector('nav a[aria-current="page"]')?.removeAttribute('aria-current');
    this.setAttribute('aria-current', 'page');
  });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.removeAttribute('aria-current');
    if (link.getAttribute('href').substring(1) === current) {
      link.setAttribute('aria-current', 'page');
    }
  });
});

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

themeToggle?.addEventListener('click', () => {
  const currentTheme = root.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', newTheme);
});

// Enhanced multilingual name animation with typing effect
const nameElement = document.querySelector('.hero h1');
const names = {
  english: 'Neha Dayananda',
  hindi: 'नेहा दयानंद',
  kannada: 'ನೇಹಾ ದಯಾನಂದ'
};

const languages = ['english', 'hindi', 'kannada'];
let currentIndex = 0;

function eraseText() {
  return new Promise(resolve => {
    nameElement.style.animation = 'none';
    nameElement.style.width = '0';
    nameElement.style.opacity = '0';
    setTimeout(resolve, 1000);
  });
}

function writeText(text) {
  return new Promise(resolve => {
    nameElement.textContent = text;
    nameElement.style.opacity = '1';
    nameElement.style.animation = 'typing 2s steps(30, end) forwards, blink-caret 0.75s step-end infinite';
    setTimeout(resolve, 3000);
  });
}

async function animateNameCycle() {
  if (!nameElement) return;
  
  while (true) {
    for (let lang of languages) {
      await eraseText();
      await writeText(names[lang]);
    }
  }
}

// Start the name animation cycle
if (nameElement) {
  nameElement.style.opacity = '0';
  nameElement.style.width = '0';
  animateNameCycle();
}