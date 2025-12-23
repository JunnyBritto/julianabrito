/**
 * Portfolio Website - Animations JavaScript
 * Author: Juliana Guimarães
 * Description: Advanced animations and effects
 */

// Animation Controller
class AnimationController {
  constructor() {
    this.animations = new Map();
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.setupHoverEffects();
    this.setupParallaxEffects();
    this.setupCounterAnimations();
    this.setupProgressBars();
  }

  // Intersection Observer for scroll animations
  setupIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll(
      '.fade-in, .slide-in-left, .slide-in-right, .slide-in-up, .scale-in, .bounce-in, .flip-in-x, .flip-in-y'
    );
    
    animatedElements.forEach(el => {
      this.observer.observe(el);
    });
  }

  // Animate element based on its classes
  animateElement(element) {
    const classes = element.classList;
    
    if (classes.contains('fade-in')) {
      this.fadeIn(element);
    } else if (classes.contains('slide-in-left')) {
      this.slideInLeft(element);
    } else if (classes.contains('slide-in-right')) {
      this.slideInRight(element);
    } else if (classes.contains('slide-in-up')) {
      this.slideInUp(element);
    } else if (classes.contains('scale-in')) {
      this.scaleIn(element);
    } else if (classes.contains('bounce-in')) {
      this.bounceIn(element);
    } else if (classes.contains('flip-in-x')) {
      this.flipInX(element);
    } else if (classes.contains('flip-in-y')) {
      this.flipInY(element);
    }
  }

  // Fade In Animation
  fadeIn(element, duration = 800) {
    if (this.isReducedMotion) {
      element.style.opacity = '1';
      return;
    }
    
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease-out`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
    });
  }

  // Slide In Animations
  slideInLeft(element, duration = 800) {
    if (this.isReducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
      return;
    }
    
    element.style.opacity = '0';
    element.style.transform = 'translateX(-100px)';
    element.style.transition = `all ${duration}ms ease-out`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    });
  }

  slideInRight(element, duration = 800) {
    if (this.isReducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
      return;
    }
    
    element.style.opacity = '0';
    element.style.transform = 'translateX(100px)';
    element.style.transition = `all ${duration}ms ease-out`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    });
  }

  slideInUp(element, duration = 800) {
    if (this.isReducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      return;
    }
    
    element.style.opacity = '0';
    element.style.transform = 'translateY(100px)';
    element.style.transition = `all ${duration}ms ease-out`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  }

  // Scale In Animation
  scaleIn(element, duration = 600) {
    if (this.isReducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
      return;
    }
    
    element.style.opacity = '0';
    element.style.transform = 'scale(0.3)';
    element.style.transition = `all ${duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
    });
  }

  // Bounce In Animation
  bounceIn(element, duration = 800) {
    if (this.isReducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
      return;
    }
    
    element.style.opacity = '0';
    element.style.transform = 'scale(0.3)';
    element.style.transition = `all ${duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
    });
  }

  // Flip Animations
  flipInX(element, duration = 800) {
    if (this.isReducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'perspective(400px) rotateX(0deg)';
      return;
    }
    
    element.style.opacity = '0';
    element.style.transform = 'perspective(400px) rotateX(90deg)';
    element.style.transition = `all ${duration}ms ease-out`;
    element.style.transformStyle = 'preserve-3d';
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'perspective(400px) rotateX(0deg)';
    });
  }

  flipInY(element, duration = 800) {
    if (this.isReducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'perspective(400px) rotateY(0deg)';
      return;
    }
    
    element.style.opacity = '0';
    element.style.transform = 'perspective(400px) rotateY(90deg)';
    element.style.transition = `all ${duration}ms ease-out`;
    element.style.transformStyle = 'preserve-3d';
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'perspective(400px) rotateY(0deg)';
    });
  }

  // Scroll Animations
  setupScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    scrollElements.forEach(element => {
      this.observer.observe(element);
    });
    
    // Parallax effect for background elements
    window.addEventListener('scroll', throttle(() => {
      this.handleParallaxScroll();
    }, 16));
  }

  // Parallax Effects
  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-parallax') || 0.5;
      element.style.transform = 'translateZ(0)';
      element.style.willChange = 'transform';
    });
  }

  handleParallaxScroll() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-parallax') || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }

  // Hover Effects
  setupHoverEffects() {
    const hoverElements = document.querySelectorAll('[data-hover]');
    
    hoverElements.forEach(element => {
      const effect = element.getAttribute('data-hover');
      
      element.addEventListener('mouseenter', () => {
        this.applyHoverEffect(element, effect);
      });
      
      element.addEventListener('mouseleave', () => {
        this.removeHoverEffect(element, effect);
      });
    });
  }

  applyHoverEffect(element, effect) {
    switch (effect) {
      case 'lift':
        element.style.transform = 'translateY(-10px)';
        element.style.transition = 'transform 0.3s ease';
        break;
      case 'scale':
        element.style.transform = 'scale(1.05)';
        element.style.transition = 'transform 0.3s ease';
        break;
      case 'rotate':
        element.style.transform = 'rotate(5deg)';
        element.style.transition = 'transform 0.3s ease';
        break;
      case 'glow':
        element.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.5)';
        element.style.transition = 'box-shadow 0.3s ease';
        break;
      case 'pulse':
        element.style.animation = 'pulse 1s infinite';
        break;
    }
  }

  removeHoverEffect(element, effect) {
    switch (effect) {
      case 'lift':
      case 'scale':
      case 'rotate':
        element.style.transform = '';
        break;
      case 'glow':
        element.style.boxShadow = '';
        break;
      case 'pulse':
        element.style.animation = '';
        break;
    }
  }

  // Counter Animation
  setupCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
      this.observer.observe(counter);
      
      counter.addEventListener('intersect', () => {
        this.animateCounter(counter);
      });
    });
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target')) || 0;
    const duration = parseInt(element.getAttribute('data-duration')) || 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };
    
    updateCounter();
  }

  // Progress Bars Animation
  setupProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
      this.observer.observe(bar);
      
      bar.addEventListener('intersect', () => {
        this.animateProgressBar(bar);
      });
    });
  }

  animateProgressBar(element) {
    const width = element.getAttribute('data-width') || '0%';
    const duration = parseInt(element.getAttribute('data-duration')) || 1000;
    
    element.style.width = '0%';
    element.style.transition = `width ${duration}ms ease-out`;
    
    requestAnimationFrame(() => {
      element.style.width = width;
    });
  }

  // Text Animation
  animateText(element, type = 'typewriter', duration = 2000) {
    if (this.isReducedMotion) {
      element.style.opacity = '1';
      return;
    }
    
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    if (type === 'typewriter') {
      this.typewriterAnimation(element, text, duration);
    } else if (type === 'fade-in') {
      this.fadeInText(element, text, duration);
    }
  }

  typewriterAnimation(element, text, duration) {
    const chars = text.split('');
    const delay = duration / chars.length;
    let index = 0;
    
    const addChar = () => {
      if (index < chars.length) {
        element.textContent += chars[index];
        index++;
        setTimeout(addChar, delay);
      }
    };
    
    addChar();
  }

  fadeInText(element, text, duration) {
    const words = text.split(' ');
    element.innerHTML = words.map(word => 
      `<span style="opacity: 0; transition: opacity ${duration}ms ease-out;">${word}</span>`
    ).join(' ');
    
    const spans = element.querySelectorAll('span');
    spans.forEach((span, index) => {
      setTimeout(() => {
        span.style.opacity = '1';
      }, index * 100);
    });
  }

  // Stagger Animation
  staggerAnimation(container, childSelector = '.stagger-item', delay = 100) {
    const children = container.querySelectorAll(childSelector);
    
    children.forEach((child, index) => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(20px)';
      child.style.transition = `all 0.6s ease-out ${index * delay}ms`;
      
      this.observer.observe(child);
      
      child.addEventListener('intersect', () => {
        child.style.opacity = '1';
        child.style.transform = 'translateY(0)';
      });
    });
  }

  // Particle System
  createParticle(x, y, color = '#00d4ff') {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 4px;
      height: 4px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      animation: particle 1s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 1000);
  }

  // Ripple Effect
  createRipple(e, element) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Glitch Effect
  glitchEffect(element, intensity = 5) {
    if (this.isReducedMotion) return;
    
    const originalText = element.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    
    let iterations = 0;
    const maxIterations = originalText.length;
    
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
      
      if (iterations >= maxIterations) {
        clearInterval(interval);
        element.textContent = originalText;
      }
      
      iterations += 1 / 3;
    }, 50);
  }

  // Magnetic Cursor Effect
  setupMagneticCursor() {
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    magneticElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        element.style.transition = 'transform 0.1s ease-out';
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
      });
    });
  }

  // Cleanup method
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    
    window.removeEventListener('scroll', this.handleParallaxScroll);
  }
}

// Utility Functions
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

// CSS Animations (injected via JavaScript)
function injectCSSAnimations() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
    
    @keyframes particle {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 1;
      }
      100% {
        transform: translateY(-100px) translateX(100px);
        opacity: 0;
      }
    }
    
    .ripple-effect {
      animation: ripple 0.6s linear;
    }
    
    .aos-animate {
      opacity: 1 !important;
      transform: none !important;
    }
  `;
  
  document.head.appendChild(style);
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  injectCSSAnimations();
  
  // Initialize animation controller
  window.animationController = new AnimationController();
  
  // Add some interactive effects
  document.addEventListener('click', (e) => {
    // Create particles on click
    if (window.animationController) {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          window.animationController.createParticle(
            e.clientX + (Math.random() - 0.5) * 50,
            e.clientY + (Math.random() - 0.5) * 50
          );
        }, i * 50);
      }
    }
  });
});

// Export for global access
window.Animations = {
  AnimationController,
  throttle,
  debounce
};