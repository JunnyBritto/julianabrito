/**
 * Portfolio Website - Interactions JavaScript
 * Author: João Silva
 * Description: User interactions and event handlers
 */

// Interaction Manager
class InteractionManager {
  constructor() {
    this.mousePosition = { x: 0, y: 0 };
    this.isTouchDevice = 'ontouchstart' in window;
    this.cursor = null;
    this.init();
  }

  init() {
    this.setupMouseTracking();
    this.setupCustomCursor();
    this.setupKeyboardNavigation();
    this.setupTouchGestures();
    this.setupScrollEffects();
    this.setupFormInteractions();
    this.setupMediaQueries();
    this.setupAccessibility();
  }

  // Mouse Tracking
  setupMouseTracking() {
    if (this.isTouchDevice) return;
    
    document.addEventListener('mousemove', (e) => {
      this.mousePosition.x = e.clientX;
      this.mousePosition.y = e.clientY;
      this.updateCursorPosition();
    });
  }

  // Custom Cursor
  setupCustomCursor() {
    if (this.isTouchDevice) return;
    
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    this.cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: rgba(0, 212, 255, 0.8);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.1s ease;
      mix-blend-mode: difference;
    `;
    
    document.body.appendChild(this.cursor);
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Add cursor effects
    this.setupCursorEffects();
  }

  updateCursorPosition() {
    if (this.cursor) {
      this.cursor.style.left = this.mousePosition.x - 10 + 'px';
      this.cursor.style.top = this.mousePosition.y - 10 + 'px';
    }
  }

  setupCursorEffects() {
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, .social-link, .project-link, .filter-btn'
    );
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        if (this.cursor) {
          this.cursor.style.transform = 'scale(1.5)';
          this.cursor.style.background = 'rgba(255, 0, 110, 0.8)';
        }
      });
      
      element.addEventListener('mouseleave', () => {
        if (this.cursor) {
          this.cursor.style.transform = 'scale(1)';
          this.cursor.style.background = 'rgba(0, 212, 255, 0.8)';
        }
      });
    });
  }

  // Keyboard Navigation
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Navigation shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            this.scrollToSection('home');
            break;
          case '2':
            e.preventDefault();
            this.scrollToSection('about');
            break;
          case '3':
            e.preventDefault();
            this.scrollToSection('skills');
            break;
          case '4':
            e.preventDefault();
            this.scrollToSection('projects');
            break;
          case '5':
            e.preventDefault();
            this.scrollToSection('contact');
            break;
        }
      }
      
      // Escape key to close modals/overlays
      if (e.key === 'Escape') {
        this.closeModals();
      }
      
      // Arrow keys for navigation
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        this.navigateWithArrows(e.key);
      }
    });
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }

  navigateWithArrows(key) {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const currentSection = this.getCurrentSection();
    const currentIndex = sections.indexOf(currentSection);
    
    let newIndex;
    if (key === 'ArrowUp') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    } else {
      newIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : sections.length - 1;
    }
    
    this.scrollToSection(sections[newIndex]);
  }

  getCurrentSection() {
    const scrollPosition = window.pageYOffset + 100;
    const sections = document.querySelectorAll('section');
    
    for (let section of sections) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        return section.getAttribute('id');
      }
    }
    
    return 'home';
  }

  // Touch Gestures
  setupTouchGestures() {
    if (!this.isTouchDevice) return;
    
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      
      this.handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY);
    });
  }

  handleSwipe(startX, startY, endX, endY) {
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const minSwipeDistance = 50;
    
    // Horizontal swipes
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          // Swipe right - previous section
          this.navigateWithArrows('ArrowUp');
        } else {
          // Swipe left - next section
          this.navigateWithArrows('ArrowDown');
        }
      }
    }
    
    // Vertical swipes (for mobile menu, etc.)
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      if (Math.abs(deltaY) > minSwipeDistance) {
        // Handle vertical swipes if needed
      }
    }
  }

  // Scroll Effects
  setupScrollEffects() {
    let lastScrollTop = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Scroll direction
      if (scrollTop > lastScrollTop) {
        // Scrolling down
        document.body.classList.add('scrolling-down');
        document.body.classList.remove('scrolling-up');
      } else {
        // Scrolling up
        document.body.classList.add('scrolling-up');
        document.body.classList.remove('scrolling-down');
      }
      
      lastScrollTop = scrollTop;
      
      // Clear existing timeout
      clearTimeout(scrollTimeout);
      
      // Add scrolling class
      document.body.classList.add('is-scrolling');
      
      // Remove scrolling class after scroll ends
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 150);
    });
  }

  // Form Interactions
  setupFormInteractions() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Float label effect
      const label = input.closest('.form-group')?.querySelector('label');
      
      if (label) {
        input.addEventListener('focus', () => {
          label.classList.add('active');
        });
        
        input.addEventListener('blur', () => {
          if (!input.value) {
            label.classList.remove('active');
          }
        });
        
        // Check initial state
        if (input.value) {
          label.classList.add('active');
        }
      }
      
      // Auto-resize textarea
      if (input.tagName === 'TEXTAREA') {
        input.addEventListener('input', () => {
          input.style.height = 'auto';
          input.style.height = input.scrollHeight + 'px';
        });
      }
    });
  }

  // Media Queries
  setupMediaQueries() {
    // Dark mode preference
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeQuery.addListener((e) => {
      if (e.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    });
    
    // Reduced motion
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionQuery.addListener((e) => {
      if (e.matches) {
        document.body.classList.add('reduced-motion');
      } else {
        document.body.classList.remove('reduced-motion');
      }
    });
    
    // High contrast
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    highContrastQuery.addListener((e) => {
      if (e.matches) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
    });
  }

  // Accessibility
  setupAccessibility() {
    // Focus management
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });
    
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
    
    // Screen reader announcements
    this.createAriaLiveRegion();
    
    // Skip to main content link
    this.createSkipLink();
  }

  createAriaLiveRegion() {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `;
    
    document.body.appendChild(liveRegion);
    this.ariaLiveRegion = liveRegion;
  }

  createSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: #fff;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 10000;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  announceToScreenReader(message) {
    if (this.ariaLiveRegion) {
      this.ariaLiveRegion.textContent = message;
    }
  }

  // Utility Methods
  closeModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      modal.classList.remove('show');
    });
  }

  // Cleanup
  destroy() {
    if (this.cursor) {
      this.cursor.remove();
      document.body.style.cursor = '';
    }
    
    document.removeEventListener('mousemove', this.updateCursorPosition);
    document.removeEventListener('keydown', this.handleKeyboardNavigation);
    document.removeEventListener('touchstart', this.handleTouchStart);
    document.removeEventListener('touchend', this.handleTouchEnd);
    window.removeEventListener('scroll', this.handleScroll);
  }
}

// Advanced Interactions
class AdvancedInteractions {
  constructor() {
    this.init();
  }

  init() {
    this.setupParticleCursor();
    this.setupMorphingShapes();
    this.setupTextScramble();
    this.setupImageHoverEffects();
    this.setup3DTilt();
    this.setupMagneticButtons();
  }

  // Particle Cursor
  setupParticleCursor() {
    if ('ontouchstart' in window) return;
    
    const particles = [];
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle-cursor';
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(0, 212, 255, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: all 0.3s ease;
      `;
      document.body.appendChild(particle);
      particles.push({
        element: particle,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0
      });
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    const animateParticles = () => {
      particles.forEach((particle, index) => {
        const targetX = mouseX;
        const targetY = mouseY;
        
        particle.vx += (targetX - particle.x) * 0.1;
        particle.vy += (targetY - particle.y) * 0.1;
        
        particle.vx *= 0.9;
        particle.vy *= 0.9;
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        particle.element.style.left = particle.x + 'px';
        particle.element.style.top = particle.y + 'px';
        
        const delay = index * 50;
        setTimeout(() => {
          particle.element.style.opacity = '1';
        }, delay);
      });
      
      requestAnimationFrame(animateParticles);
    };
    
    animateParticles();
  }

  // Morphing Shapes
  setupMorphingShapes() {
    const shapes = document.querySelectorAll('.morph-shape');
    
    shapes.forEach(shape => {
      const morphTimeline = () => {
        shape.style.borderRadius = this.getRandomBorderRadius();
      };
      
      setInterval(morphTimeline, 3000);
    });
  }

  getRandomBorderRadius() {
    const corners = ['50%', '30%', '70%', '40%', '60%'];
    return `${corners[Math.floor(Math.random() * corners.length)]} ${corners[Math.floor(Math.random() * corners.length)]} ${corners[Math.floor(Math.random() * corners.length)]} ${corners[Math.floor(Math.random() * corners.length)]}`;
  }

  // Text Scramble Effect
  setupTextScramble() {
    const elements = document.querySelectorAll('[data-scramble]');
    
    elements.forEach(element => {
      const originalText = element.textContent;
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      
      element.addEventListener('mouseenter', () => {
        let iterations = 0;
        const interval = setInterval(() => {
          element.textContent = originalText
            .split('')
            .map((char, index) => {
              if (index < iterations) {
                return originalText[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
          
          if (iterations >= originalText.length) {
            clearInterval(interval);
          }
          
          iterations += 1 / 3;
        }, 30);
      });
    });
  }

  // Image Hover Effects
  setupImageHoverEffects() {
    const images = document.querySelectorAll('.project-image, .about-image');
    
    images.forEach(image => {
      image.addEventListener('mousemove', (e) => {
        const rect = image.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        image.style.transform = `
          perspective(1000px) 
          rotateX(${(y - 50) * 0.1}deg) 
          rotateY(${(x - 50) * 0.1}deg) 
          scale(1.05)
        `;
      });
      
      image.addEventListener('mouseleave', () => {
        image.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }

  // 3D Tilt Effect
  setup3DTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
      const tiltEffect = (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        element.style.transform = `
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          scale(1.05)
        `;
      };
      
      element.addEventListener('mousemove', tiltEffect);
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }

  // Magnetic Buttons
  setupMagneticButtons() {
    const magneticButtons = document.querySelectorAll('[data-magnetic]');
    
    magneticButtons.forEach(button => {
      const magneticEffect = (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
      };
      
      button.addEventListener('mousemove', magneticEffect);
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
      });
    });
  }
}

// Initialize interactions
document.addEventListener('DOMContentLoaded', () => {
  window.interactionManager = new InteractionManager();
  window.advancedInteractions = new AdvancedInteractions();
  
  // Add some global interaction utilities
  window.Interactions = {
    InteractionManager,
    AdvancedInteractions,
    scrollToSection: (sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  };
});