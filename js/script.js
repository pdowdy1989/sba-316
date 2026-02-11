// ================================
// P.E.D Aerial Inspection
// Complete JavaScript with All Upgrades
// ================================

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('P.E.D Aerial - Loading Enhanced Features');
  
  initializeAccessibility();
  initializeNavigation();
  initializeFormHandlers();
  initializeServiceCards();
  initializeBackToTop();
  initializeSearch();
  setActiveNavLink();
  loadUserPreferences();
});

// ================================
// ACCESSIBILITY FEATURES
// ================================
function initializeAccessibility() {
  // Add skip link if not present
  if (!document.querySelector('.skip-link')) {
    const skipLink = document.createElement('a');
    skipLink.className = 'skip-link';
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
  
  // Add ARIA labels to navigation
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach((link, index) => {
    if (!link.getAttribute('aria-label')) {
      const text = link.textContent;
      link.setAttribute('aria-label', `Navigate to ${text} page`);
    }
  });
  
  // Add focus styles for keyboard navigation
  document.addEventListener('keyup', function(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
  });
}

// ================================
// NAVIGATION ENHANCEMENTS
// ================================
function initializeNavigation() {
  // Hamburger menu for mobile
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.setAttribute('aria-expanded', 
        this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
      );
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without jumping
        history.pushState(null, null, targetId);
      }
    });
  });
}

// ================================
// SEARCH FUNCTIONALITY
// ================================
function initializeSearch() {
  const searchBox = document.querySelector('.search-box');
  if (!searchBox) return;
  
  const searchInput = searchBox.querySelector('input');
  const searchButton = searchBox.querySelector('button');
  
  // Search button click
  searchButton.addEventListener('click', function() {
    performSearch(searchInput.value);
  });
  
  // Enter key in search
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch(this.value);
    }
  });
  
  function performSearch(query) {
    if (!query.trim()) {
      alert('Please enter a search term');
      searchInput.focus();
      return;
    }
    
    console.log(`Searching for: ${query}`);
    
    // Simple search implementation
    const searchableContent = document.querySelectorAll('.searchable');
    let found = false;
    
    searchableContent.forEach(element => {
      if (element.textContent.toLowerCase().includes(query.toLowerCase())) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.style.backgroundColor = '#fff3e0';
        setTimeout(() => {
          element.style.backgroundColor = '';
        }, 2000);
        found = true;
      }
    });
    
    if (!found) {
      alert(`No results found for "${query}". Try different keywords.`);
    }
    
    // Clear search
    searchInput.value = '';
  }
}

// ================================
// FORM HANDLING
// ================================
function initializeFormHandlers() {
  const inspectionForm = document.getElementById('inspection-form');
  if (!inspectionForm) return;
  
  // Add form validation
  const requiredFields = inspectionForm.querySelectorAll('[required]');
  requiredFields.forEach(field => {
    field.addEventListener('blur', validateField);
    field.addEventListener('input', clearFieldError);
  });
  
  // Form submission
  inspectionForm.addEventListener('submit', handleFormSubmit);
}

function validateField() {
  const field = this;
  const value = field.value.trim();
  const fieldType = field.type;
  
  // Clear any existing error
  clearFieldError.call(field);
  
  let isValid = true;
  let errorMessage = '';
  
  // Required validation
  if (field.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = 'This field is required';
  }
  
  // Email validation
  if (fieldType === 'email' && value && !isValidEmail(value)) {
    isValid = false;
    errorMessage = 'Please enter a valid email address';
  }
  
  // Phone validation
  if (fieldType === 'tel' && value && !isValidPhone(value)) {
    isValid = false;
    errorMessage = 'Please enter a valid phone number';
  }
  
  // Show error if invalid
  if (!isValid) {
    showFieldError(field, errorMessage);
  }
  
  return isValid;
}

function clearFieldError() {
  const field = this;
  field.style.borderColor = '';
  field.style.boxShadow = '';
  
  const errorDiv = field.parentNode.querySelector('.field-error');
  if (errorDiv) {
    errorDiv.remove();
  }
}

function showFieldError(field, message) {
  field.style.borderColor = 'var(--error)';
  field.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
  field.parentNode.appendChild(errorDiv);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const digitsOnly = phone.replace(/\D/g, '');
  return phoneRegex.test(digitsOnly);
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitButton = form.querySelector('#submit-btn');
  
  // Validate all fields
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');
  
  requiredFields.forEach(field => {
    if (!validateField.call(field)) {
      isValid = false;
    }
  });
  
  // Check agreement checkbox
  const agreement = form.querySelector('#agree');
  if (agreement && !agreement.checked) {
    showFormError('Please agree to the terms to continue');
    isValid = false;
  }
  
  if (!isValid) {
    return;
  }
  
  // Disable button and show loading
  submitButton.disabled = true;
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  
  // Simulate API call
  setTimeout(() => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Store submission
    const submissions = JSON.parse(localStorage.getItem('pedSubmissions') || '[]');
    submissions.push({
      ...data,
      timestamp: new Date().toISOString(),
      id: 'REQ-' + Date.now()
    });
    localStorage.setItem('pedSubmissions', JSON.stringify(submissions));
    
    // Show success message
    showConfirmation(form, data);
    
    // Reset button
    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }, 2000);
    
  }, 1500);
}

function showFormError(message) {
  // Remove existing error
  const existingError = document.querySelector('.form-error-message');
  if (existingError) existingError.remove();
  
  // Create error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-error-message';
  errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
  
  // Insert at top of form
  const form = document.getElementById('inspection-form');
  form.insertBefore(errorDiv, form.firstChild);
  
  // Auto remove after 5 seconds
  setTimeout(() => errorDiv.remove(), 5000);
}

function showConfirmation(form, data) {
  form.style.display = 'none';
  
  const confirmationSection = document.getElementById('confirmation');
  const confirmationMessage = document.getElementById('confirmation-message');
  
  if (confirmationSection && confirmationMessage) {
    confirmationSection.hidden = false;
    confirmationSection.classList.add('fade-in');
    
    // Personalize message
    const name = data['first-name'] || data.name || 'there';
    confirmationMessage.innerHTML = `
      <strong>Thanks, ${name}!</strong><br><br>
      Your quote request has been sent successfully.<br>
      <strong>Request ID:</strong> REQ-${Date.now()}<br><br>
      I'll contact you within 24 hours at <strong>${data.email || 'your email'}</strong>.
    `;
    
    // Scroll to confirmation
    confirmationSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// ================================
// SERVICE CARDS INTERACTION
// ================================
function initializeServiceCards() {
  const serviceItems = document.querySelectorAll('.service-item');
  
  serviceItems.forEach(item => {
    // Click handler
    item.addEventListener('click', function() {
      // Store selected service
      const serviceName = this.querySelector('h3')?.textContent || 'Service';
      localStorage.setItem('selectedService', serviceName);
      
      // Visual feedback
      highlightServiceCard(this);
      
      // If on services page, offer to go to quote
      if (window.location.pathname.includes('services.html')) {
        setTimeout(() => {
          if (confirm(`Great choice! Would you like to get a quote for ${serviceName}?`)) {
            window.location.href = 'request.html';
          }
        }, 300);
      }
    });
    
    // Keyboard navigation
    item.setAttribute('tabindex', '0');
    item.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        this.click();
      }
    });
  });
}

function highlightServiceCard(card) {
  const allCards = document.querySelectorAll('.service-item');
  
  allCards.forEach(c => {
    c.classList.remove('selected');
    c.style.transform = '';
    c.style.boxShadow = '';
  });
  
  card.classList.add('selected');
  card.style.transform = 'translateY(-8px)';
  card.style.boxShadow = '0 15px 30px rgba(255, 107, 53, 0.15)';
}

// ================================
// BACK TO TOP BUTTON
// ================================
function initializeBackToTop() {
  // Create button if not exists
  if (!document.querySelector('.back-to-top')) {
    const backButton = document.createElement('a');
    backButton.className = 'back-to-top';
    backButton.href = '#top';
    backButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backButton);
  }
  
  const backButton = document.querySelector('.back-to-top');
  
  // Show/hide based on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backButton.classList.add('visible');
    } else {
      backButton.classList.remove('visible');
    }
  });
  
  // Smooth scroll to top
  backButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ================================
// ACTIVE NAV LINK
// ================================
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    link.classList.remove('active');
    
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === 'index.html' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ================================
// USER PREFERENCES
// ================================
function loadUserPreferences() {
  // Welcome back message
  const savedName = localStorage.getItem('pedUserName');
  if (savedName) {
    console.log(`Welcome back, ${savedName}!`);
    
    // Update any personalized elements
    const welcomeElements = document.querySelectorAll('.user-welcome');
    welcomeElements.forEach(el => {
      el.textContent = `Welcome back, ${savedName}!`;
    });
  }
  
  // Load selected service
  const selectedService = localStorage.getItem('selectedService');
  if (selectedService && document.querySelector('#service-type')) {
    const serviceSelect = document.querySelector('#service-type');
    Array.from(serviceSelect.options).forEach(option => {
      if (option.text.includes(selectedService)) {
        option.selected = true;
      }
    });
  }
}

// ================================
// OFFLINE DETECTION
// ================================
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

function updateOnlineStatus() {
  const isOnline = navigator.onLine;
  console.log(`Network: ${isOnline ? 'Online' : 'Offline'}`);
  
  if (!isOnline) {
    showOfflineWarning();
  } else {
    hideOfflineWarning();
  }
}

function showOfflineWarning() {
  let warning = document.getElementById('offline-warning');
  
  if (!warning) {
    warning = document.createElement('div');
    warning.id = 'offline-warning';
    warning.style.cssText = `
      background: var(--error);
      color: white;
      padding: 0.75rem;
      text-align: center;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999;
      animation: slideDown 0.3s ease;
    `;
    warning.innerHTML = '<i class="fas fa-wifi-slash"></i> You are offline. Some features may not work.';
    document.body.prepend(warning);
  }
}

function hideOfflineWarning() {
  const warning = document.getElementById('offline-warning');
  if (warning) {
    warning.remove();
  }
}

// Initialize network status
updateOnlineStatus();

// ================================
// PERFORMANCE OPTIMIZATIONS
// ================================
// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Debounce utility for search/resize
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

// Throttle utility for scroll events
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

// ================================
// ERROR HANDLING
// ================================
window.addEventListener('error', function(e) {
  console.error('P.E.D Site Error:', e.error);
  
  // Could send to error tracking service
  // Example: sendErrorToAnalytics(e.error);
});

// Global error handler for async operations
window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled Promise Rejection:', e.reason);
});

console.log('P.E.D Aerial - All features initialized successfully');

document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.hero-video');
  if (!video) return;

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isMobile || prefersReducedMotion) {
    video.pause();
    video.removeAttribute('autoplay');
    video.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.hero-video');
  if (!video) return;

  video.muted = true; // REQUIRED
  video.playsInline = true;

  const playPromise = video.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log('Hero video playing');
      })
      .catch(error => {
        console.warn('Hero video blocked:', error);
      });
  }
});

.hero-overlay {
  pointer-events: none;
}
