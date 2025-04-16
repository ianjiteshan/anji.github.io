// Example JavaScript: smooth scroll to project section
document.querySelector('.cta-btn').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
  });
  