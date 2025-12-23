/**
 * Portfolio Website - Main JavaScript
 * Author: Juliana Guimarães
 * Description: Main functionality and interactions
 */

// Global Variables
let currentTheme = 'dark';
let particlesInstance = null;
let typedInstance = null;
let isLoading = true;

// DOM Elements
const DOMElements = {
  // Loading
  loadingScreen: null,
  
  // Navigation
  navbar: null,
  navLinks: null,
  
  // Theme
  themeToggle: null,
  themeIcon: null,
  
  // Hero
  typingText: null,
  cursor: null,
  
  // Sections
  sections: null,
  
  // Skills
  skillBars: null,
  statNumbers: null,
  
  // Projects
  projectItems: null,
  filterButtons: null,
  
  // Contact
  contactForm: null,
  
  // Back to top
  backToTop: null,
  
  // Particles
  particlesContainer: null
};

// Initialize DOM Elements
function initializeDOMElements() {
  DOMElements.loadingScreen = document.getElementById('loading-screen');
  DOMElements.navbar = document.getElementById('navbar');
  DOMElements.navLinks = document.querySelectorAll('.nav-link');
  DOMElements.themeToggle = document.getElementById('theme-toggle');
  DOMElements.themeIcon = DOMElements.themeToggle?.querySelector('i');
  DOMElements.typingText = document.querySelector('.typing-text');
  DOMElements.cursor = document.querySelector('.cursor');
  DOMElements.sections = document.querySelectorAll('section');
  DOMElements.skillBars = document.querySelectorAll('.skill-progress');
  DOMElements.statNumbers = document.querySelectorAll('.stat-number');
  DOMElements.projectItems = document.querySelectorAll('.project-item');
  DOMElements.filterButtons = document.querySelectorAll('.filter-btn');
  DOMElements.contactForm = document.getElementById('contact-form');
  DOMElements.backToTop = document.getElementById('back-to-top');
  DOMElements.particlesContainer = document.getElementById('particles-js');
}

// Loading Screen Management
function hideLoadingScreen() {
  if (DOMElements.loadingScreen) {
    setTimeout(() => {
      DOMElements.loadingScreen.classList.add('hidden');
      isLoading = false;
      initializeAnimations();
    }, 3000);
  }
}

// Theme Management
function initializeTheme() {
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) {
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
  }
  updateNavbarTheme();
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('portfolio-theme', currentTheme);
  updateThemeIcon();
  updateNavbarTheme();
  
  // Reinitialize particles with new theme
  if (particlesInstance) {
    particlesJS.domEmpty();
    initializeParticles();
  }
}

function updateThemeIcon() {
  if (DOMElements.themeIcon) {
    DOMElements.themeIcon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

function updateNavbarTheme() {
  if (DOMElements.navbar) {
    if (currentTheme === 'light') {
      DOMElements.navbar.classList.remove('navbar-dark');
      DOMElements.navbar.classList.add('navbar-light');
    } else {
      DOMElements.navbar.classList.remove('navbar-light');
      DOMElements.navbar.classList.add('navbar-dark');
    }
  }
}

// Particles.js Configuration
function initializeParticles() {
  if (typeof particlesJS !== 'undefined' && DOMElements.particlesContainer) {
    const isDarkTheme = currentTheme === 'dark';
    
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: isDarkTheme ? '#00d4ff' : '#0066cc'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          }
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: isDarkTheme ? '#00d4ff' : '#0066cc',
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'repulse'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });
    
    particlesInstance = true;
  }
}

// Typed.js Configuration
function initializeTyped() {
  if (typeof Typed !== 'undefined' && DOMElements.typingText) {
    const professions = [
      'Desenvolvedora Full Stack',
      'Cyber Security Enthusiast',
      'IA Enthusiast',
      'Game Dev',
      'Tech Innovator',
      'Code Artist'
    ];
    
    typedInstance = new Typed('.typing-text', {
      strings: professions,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      autoInsertCss: true,
      onComplete: function(self) {
        // Animation completed
        console.log('Typed animation completed');
      }
    });
  }
}

// Navigation Scroll Effect
function initializeNavigationScroll() {
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Navbar background effect
    if (DOMElements.navbar) {
      if (scrollTop > 100) {
        DOMElements.navbar.classList.add('scrolled');
      } else {
        DOMElements.navbar.classList.remove('scrolled');
      }
    }
    
    // Back to top button
    if (DOMElements.backToTop) {
      if (scrollTop > 300) {
        DOMElements.backToTop.classList.add('show');
      } else {
        DOMElements.backToTop.classList.remove('show');
      }
    }
    
    // Active navigation link
    updateActiveNavigationLink();
    
    lastScrollTop = scrollTop;
  });
}

function updateActiveNavigationLink() {
  const scrollPosition = window.pageYOffset + 100;
  
  DOMElements.sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      DOMElements.navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
  DOMElements.navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const navbarToggler = document.querySelector('.navbar-toggler');
          navbarToggler.click();
        }
      }
    });
  });
}

// Back to Top Button
function initializeBackToTop() {
  if (DOMElements.backToTop) {
    DOMElements.backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Skills Animation
function initializeSkillsAnimation() {
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillBars = entry.target.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
          const width = bar.getAttribute('data-width');
          setTimeout(() => {
            bar.style.width = width;
          }, index * 200);
        });
        
        // Animate stat numbers
        animateStatNumbers();
        
        skillsObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  const skillsSection = document.querySelector('#skills');
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }
}

function animateStatNumbers() {
  DOMElements.statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        stat.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        stat.textContent = target;
      }
    };
    
    updateCounter();
  });
}

// Projects Filter
function initializeProjectsFilter() {
  DOMElements.filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      // Update active button
      DOMElements.filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter projects
      filterProjects(filter);
    });
  });
}

function filterProjects(filter) {
  DOMElements.projectItems.forEach(item => {
    const category = item.getAttribute('data-category');
    
    if (filter === 'all' || category === filter) {
      item.style.display = 'block';
      item.classList.add('fade-in-up');
    } else {
      item.style.display = 'none';
    }
  });
}

// Contact Form Handling
function initializeContactForm() {
  if (DOMElements.contactForm) {
    DOMElements.contactForm.addEventListener('submit', handleContactSubmit);
  }
}

async function handleContactSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const submitButton = form.querySelector('button[type="submit"]');
  const buttonText = submitButton.querySelector('.btn-text');
  const buttonLoading = submitButton.querySelector('.btn-loading');
  
  // Validate form
  if (!validateContactForm(form)) {
    return;
  }
  
  // Show loading state
  submitButton.disabled = true;
  buttonText.classList.add('d-none');
  buttonLoading.classList.remove('d-none');
  
  try {
    // Envio real usando Formspree via AJAX (sem abrir nova tela)
    const response = await fetch("https://formspree.io/f/xeopbyje", {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      showNotification('Mensagem enviada com sucesso! Obrigado pelo contato.', 'success');
      form.reset();
    } else {
      throw new Error('Erro no envio');
    }
    
  } catch (error) {
    showNotification('Erro ao enviar mensagem. Por favor, tente novamente.', 'error');
  } finally {
    // Reset button state
    submitButton.disabled = false;
    buttonText.classList.remove('d-none');
    buttonLoading.classList.add('d-none');
  }
}

function validateContactForm(form) {
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('is-invalid');
      isValid = false;
    } else {
      field.classList.remove('is-invalid');
      
      // Email validation
      if (field.type === 'email' && !isValidEmail(field.value)) {
        field.classList.add('is-invalid');
        isValid = false;
      }
    }
  });
  
  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function simulateFormSubmission() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

// Notification System
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  // Create notification
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 9999;
    max-width: 400px;
    animation: slideInRight 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.remove();
  }, 5000);
  
  // Close button
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.remove();
  });
}

// Scroll Reveal Animation
function initializeScrollReveal() {
  const revealElements = document.querySelectorAll('[data-aos]');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

// Form Input Enhancements
function initializeFormEnhancements() {
  const formInputs = document.querySelectorAll('.form-control');
  
  formInputs.forEach(input => {
    // Remove validation error on input
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) {
        input.classList.remove('is-invalid');
      }
    });
    
    // Add focus effect
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
    });
  });
}

// Initialize AOS (Animate On Scroll)
function initializeAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-quart',
      once: true,
      offset: 100,
      delay: 100
    });
  }
}

// Performance Optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Initialize All Functions
function initializeAll() {
  initializeDOMElements();
  initializeTheme();
  hideLoadingScreen();
  initializeNavigationScroll();
  initializeSmoothScrolling();
  initializeBackToTop();
  initializeSkillsAnimation();
  initializeProjectsFilter();
  initializeContactForm();
  initializeScrollReveal();
  initializeFormEnhancements();
  initializeAOS();
  
  // Event Listeners
  if (DOMElements.themeToggle) {
    DOMElements.themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Initialize external libraries after a delay
  setTimeout(() => {
    initializeParticles();
    initializeTyped();
  }, 1000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAll);

// Handle window resize
const handleResize = debounce(() => {
  // Recalculate positions if needed
  if (particlesInstance) {
    // Particles.js automatically handles resize
  }
}, 250);

window.addEventListener('resize', handleResize);

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when page is not visible
    if (typedInstance) {
      typedInstance.stop();
    }
  } else {
    // Resume animations when page becomes visible
    if (typedInstance) {
      typedInstance.start();
    }
  }
});

// Export for global access
window.Portfolio = {
  initializeAll,
  showNotification,
  toggleTheme
};