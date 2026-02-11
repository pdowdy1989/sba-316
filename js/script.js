// ==========================================
// P.E.D AERIAL - COMPLETE SITE JAVASCRIPT
// Optimized for Customer Experience + School Project
// ALL DOM REQUIREMENTS IMPLEMENTED
// ==========================================

// DOM Ready - Initialize everything
document.addEventListener('DOMContentLoaded', function() {
  console.log('P.E.D Aerial - Site Loading...');
  
  // Initialize core features
  initializeNavigation();
  initializeBackToTop();
  initializeVideoHandler();
  setActiveNavLink();
  
  // Initialize page-specific features
  if (document.getElementById('pricing-calculator')) {
    initializePricingCalculator();
  }
  
  if (document.getElementById('contact-form')) {
    initializeContactForm();
  }
  
  if (document.getElementById('booking-form')) {
    initializeBookingModal();
  }
  
  console.log('P.E.D Aerial - All Features Loaded ✓');
});

// ==========================================
// NAVIGATION
// ==========================================
function initializeNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    // REQUIREMENT: Event listener
    hamburger.addEventListener('click', function() {
      // REQUIREMENT: classList manipulation
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
  // REQUIREMENT: querySelectorAll - get collection of elements
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      // REQUIREMENT: querySelector
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // BOM: history API
        history.pushState(null, null, targetId);
      }
    });
  });
}

function setActiveNavLink() {
  // BOM: location
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // REQUIREMENT: querySelectorAll
  const navLinks = document.querySelectorAll('.nav-links a');
  
  // REQUIREMENT: Iterate over collection
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

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
function initializeBackToTop() {
  // REQUIREMENT: querySelector
  let backButton = document.querySelector('.back-to-top');
  
  // REQUIREMENT: createElement if doesn't exist
  if (!backButton) {
    backButton = document.createElement('a');
    backButton.className = 'back-to-top';
    backButton.href = '#top';
    backButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backButton.setAttribute('aria-label', 'Back to top');
    // REQUIREMENT: appendChild
    document.body.appendChild(backButton);
  }
  
  // Show/hide based on scroll
  // BOM: window event
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backButton.classList.add('visible');
    } else {
      backButton.classList.remove('visible');
    }
  });
  
  backButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==========================================
// VIDEO HANDLER
// ==========================================
function initializeVideoHandler() {
  // REQUIREMENT: querySelector
  const video = document.querySelector('.hero-video');
  if (!video) return;

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isMobile || prefersReducedMotion) {
    video.pause();
    video.removeAttribute('autoplay');
    // REQUIREMENT: style property
    video.style.display = 'none';
  } else {
    video.muted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => console.log('Hero video playing'))
        .catch(error => console.warn('Hero video blocked:', error));
    }
  }
}

// ==========================================
// PRICING CALCULATOR
// ==========================================
function initializePricingCalculator() {
  console.log('Initializing pricing calculator...');
  
  // REQUIREMENT: getElementById - cache elements
  const serviceSelect = document.getElementById('service-type');
  const sizeSelect = document.getElementById('property-size');
  const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
  const bookBtn = document.getElementById('book-inspection');
  const saveBtn = document.getElementById('save-quote');
  
  if (!serviceSelect || !sizeSelect) {
    console.warn('Pricing calculator elements not found');
    return;
  }
  
  // REQUIREMENT: Multiple event listeners
  serviceSelect.addEventListener('change', calculatePrice);
  sizeSelect.addEventListener('change', calculatePrice);
  
  // REQUIREMENT: Iterate over collection and add event listeners
  addonCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', calculatePrice);
  });
  
  if (bookBtn) {
    bookBtn.addEventListener('click', openBookingModal);
  }
  
  if (saveBtn) {
    saveBtn.addEventListener('click', saveQuote);
  }
}

// ==========================================
// REQUIREMENT: Parent-child-sibling navigation
// REQUIREMENT: getAttribute (data attributes)
// ==========================================
function calculatePrice() {
  const serviceSelect = document.getElementById('service-type');
  const sizeSelect = document.getElementById('property-size');
  
  // Parent-child navigation: options[selectedIndex]
  const selectedService = serviceSelect.options[serviceSelect.selectedIndex];
  const selectedSize = sizeSelect.options[sizeSelect.selectedIndex];
  
  if (!selectedService.value || !selectedSize.value) {
    return;
  }
  
  // REQUIREMENT: getAttribute - get data attributes
  const basePrice = parseFloat(selectedService.getAttribute('data-base-price'));
  const sizeMultiplier = parseFloat(selectedSize.getAttribute('data-multiplier'));
  
  let subtotal = basePrice * sizeMultiplier;
  
  // Calculate addons
  const addonCheckboxes = document.querySelectorAll('.addon-checkbox:checked');
  const addons = [];
  
  addonCheckboxes.forEach(checkbox => {
    const price = parseFloat(checkbox.getAttribute('data-price'));
    const name = checkbox.getAttribute('data-name');
    subtotal += price;
    addons.push({ name, price });
  });
  
  // Calculate tax
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  
  // Update breakdown display
  updateQuoteBreakdown(selectedService.text, basePrice, selectedSize.text, sizeMultiplier, addons);
  
  // REQUIREMENT: textContent - modify text
  document.getElementById('subtotal-price').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('tax-price').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
  
  // Enable buttons
  const bookBtn = document.getElementById('book-inspection');
  const saveBtn = document.getElementById('save-quote');
  if (bookBtn) bookBtn.disabled = false;
  if (saveBtn) saveBtn.disabled = false;
  
  // Store in memory for booking modal
  window.currentQuote = {
    service: selectedService.text,
    size: selectedSize.text,
    addons: addons,
    subtotal: subtotal,
    tax: tax,
    total: total
  };
}

// ==========================================
// REQUIREMENT: createElement, appendChild
// REQUIREMENT: DocumentFragment
// ==========================================
function updateQuoteBreakdown(serviceName, basePrice, sizeName, multiplier, addons) {
  // REQUIREMENT: getElementById
  const breakdown = document.getElementById('quote-breakdown');
  
  // REQUIREMENT: innerHTML - clear content
  breakdown.innerHTML = '';
  
  // REQUIREMENT: DocumentFragment for efficient DOM updates
  const fragment = document.createDocumentFragment();
  
  // Create base service item
  const baseItem = createBreakdownItem('Base Service: ' + serviceName, basePrice);
  fragment.appendChild(baseItem);
  
  // Size modifier
  if (multiplier !== 1.0) {
    const sizeItem = createBreakdownItem(
      'Property Size: ' + sizeName, 
      `×${multiplier}`
    );
    fragment.appendChild(sizeItem);
  }
  
  // REQUIREMENT: Iterate over collection
  addons.forEach(addon => {
    const addonItem = createBreakdownItem(addon.name, addon.price);
    fragment.appendChild(addonItem);
  });
  
  // REQUIREMENT: appendChild - add fragment to DOM
  breakdown.appendChild(fragment);
}

// ==========================================
// REQUIREMENT: createElement helper
// ==========================================
function createBreakdownItem(name, price) {
  // REQUIREMENT: createElement
  const div = document.createElement('div');
  div.classList.add('breakdown-item');
  
  const nameSpan = document.createElement('span');
  nameSpan.classList.add('breakdown-item-name');
  // REQUIREMENT: textContent
  nameSpan.textContent = name;
  
  const priceSpan = document.createElement('span');
  priceSpan.classList.add('breakdown-item-price');
  
  if (typeof price === 'number') {
    priceSpan.textContent = `$${price.toFixed(2)}`;
  } else {
    priceSpan.textContent = price;
  }
  
  div.appendChild(nameSpan);
  div.appendChild(priceSpan);
  
  return div;
}

function saveQuote() {
  if (!window.currentQuote) {
    alert('Please configure your service first');
    return;
  }
  
  const quote = {
    ...window.currentQuote,
    date: new Date().toISOString(),
    id: 'QT-' + Date.now()
  };
  
  // BOM: localStorage
  const quotes = JSON.parse(localStorage.getItem('pedQuotes') || '[]');
  quotes.push(quote);
  localStorage.setItem('pedQuotes', JSON.stringify(quotes));
  
  alert(`Quote saved! Reference: ${quote.id}\n\nYou can access saved quotes in your browser anytime.`);
}

// ==========================================
// BOOKING MODAL
// ==========================================
function openBookingModal() {
  if (!window.currentQuote) {
    alert('Please configure your service first');
    return;
  }
  
  const modal = document.getElementById('booking-modal');
  if (!modal) return;
  
  // Update modal total
  document.getElementById('modal-total').textContent = `$${window.currentQuote.total.toFixed(2)}`;
  
  // Show modal
  modal.classList.add('active');
  
  // Close on outside click
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
  
  // Close button
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      modal.classList.remove('active');
    });
  }
}

function initializeBookingModal() {
  const bookingForm = document.getElementById('booking-form');
  if (!bookingForm) return;
  
  bookingForm.addEventListener('submit', handleBookingSubmit);
}

// ==========================================
// REQUIREMENT: Form validation (DOM-based)
// ==========================================
function handleBookingSubmit(e) {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('book-name').value.trim();
  const email = document.getElementById('book-email').value.trim();
  const phone = document.getElementById('book-phone').value.trim();
  const address = document.getElementById('book-address').value.trim();
  
  // DOM-based validation
  if (!name || !email || !phone || !address) {
    alert('Please fill in all required fields');
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const emailInput = document.getElementById('book-email');
    // REQUIREMENT: style property modification
    emailInput.style.borderColor = 'var(--error)';
    alert('Please enter a valid email address');
    setTimeout(() => {
      emailInput.style.borderColor = '';
    }, 3000);
    return;
  }
  
  // Create booking
  const booking = {
    ...window.currentQuote,
    customer: { name, email, phone, address },
    date: document.getElementById('book-date').value,
    notes: document.getElementById('book-notes').value,
    bookingId: 'BK-' + Date.now(),
    timestamp: new Date().toISOString()
  };
  
  // Save to localStorage
  const bookings = JSON.parse(localStorage.getItem('pedBookings') || '[]');
  bookings.push(booking);
  localStorage.setItem('pedBookings', JSON.stringify(bookings));
  
  // Hide modal
  document.getElementById('booking-modal').classList.remove('active');
  
  // Show success message
  alert(`Booking confirmed!\n\nBooking ID: ${booking.bookingId}\nTotal: $${booking.total.toFixed(2)}\n\nWe'll contact you at ${email} within 24 hours to confirm your inspection date.`);
  
  // Reset form
  document.getElementById('booking-form').reset();
}

// ==========================================
// CONTACT FORM
// ==========================================
function initializeContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;
  
  // REQUIREMENT: HTML validation attributes
  const requiredFields = contactForm.querySelectorAll('[required]');
  
  // REQUIREMENT: DOM-based validation
  requiredFields.forEach(field => {
    field.addEventListener('blur', function() {
      if (!this.value.trim()) {
        this.style.borderColor = 'var(--error)';
      } else {
        this.style.borderColor = '';
      }
    });
  });
  
  contactForm.addEventListener('submit', handleContactSubmit);
}

function handleContactSubmit(e) {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('contact-name').value.trim(),
    email: document.getElementById('contact-email').value.trim(),
    phone: document.getElementById('contact-phone').value.trim(),
    subject: document.getElementById('contact-subject').value,
    message: document.getElementById('contact-message').value.trim(),
    timestamp: new Date().toISOString(),
    id: 'MSG-' + Date.now()
  };
  
  // Save to localStorage
  const messages = JSON.parse(localStorage.getItem('pedMessages') || '[]');
  messages.push(formData);
  localStorage.setItem('pedMessages', JSON.stringify(messages));
  
  // Show success modal
  const successModal = document.getElementById('contact-success-modal');
  if (successModal) {
    successModal.classList.add('active');
  }
  
  // Reset form
  document.getElementById('contact-form').reset();
}

// ==========================================
// BOM: Window resize handler
// ==========================================
window.addEventListener('resize', function() {
  console.log('Window resized:', window.innerWidth, 'x', window.innerHeight);
});

// ==========================================
// BOM: Before unload warning
// ==========================================
window.addEventListener('beforeunload', function(e) {
  const totalEl = document.getElementById('total-price');
  const hasUnsavedQuote = totalEl && totalEl.textContent !== '$0.00' && totalEl.textContent !== '';
  
  if (hasUnsavedQuote) {
    e.preventDefault();
    e.returnValue = 'You have an unsaved quote. Are you sure you want to leave?';
    return e.returnValue;
  }
});

console.log('All scripts loaded successfully!');
console.log('✓ All DOM requirements implemented');
console.log('✓ Form validation (HTML + DOM)');
console.log('✓ BOM properties used (localStorage, window, location)');