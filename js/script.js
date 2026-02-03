// ===== DOM CACHING =====

// Cache elements using getElementById
const requestButton = document.getElementById('request-btn');
const inspectionForm = document.getElementById('inspection-form');
const confirmationSection = document.getElementById('confirmation');

// Cache elements using querySelector / querySelectorAll
const serviceItems = document.querySelectorAll('.service-item');
const navLinks = document.querySelectorAll('.nav-link');
// ===== EVENT LISTENERS =====

// Click event for "Request an Inspection" button
requestButton.addEventListener('click', function () {
  // Scroll to the request form
  document.getElementById('request').scrollIntoView({ behavior: 'smooth' });
});

// Submit event for inspection form
inspectionForm.addEventListener('submit', function (event) {
  event.preventDefault(); // stop page refresh
  // ===== JS FORM VALIDATION =====

  const nameInput = document.getElementById('name').value.trim();
  const propertyTypeInput = document.getElementById('property-type').value;

  // Name validation
  if (nameInput.length < 2) {
    alert('Please enter a valid name.');
    return;
  }

  // Property type validation
  if (propertyTypeInput === '') {
    alert('Please select a property type.');
    return;
  }

  // Show confirmation section
  confirmationSection.hidden = false;

  // Hide form after submission
  inspectionForm.style.display = 'none';

  // Get user's name
  const userName = document.getElementById('name').value;

  // Update confirmation text
  document.getElementById('confirmation-message').textContent =
  `Thank you, ${userName}. Your inspection request has been received.`;

  // Add visual emphasis
  confirmationSection.style.border = '2px solid green';
  confirmationSection.style.padding = '10px';

  // Disable submit button
  document.getElementById('submit-btn').setAttribute('disabled', 'true');

});

// ===== SERVICES INTERACTION =====

// Loop through each service item
serviceItems.forEach(function (item) {
  item.addEventListener('click', function () {

    // Remove highlight from all services
    serviceItems.forEach(function (service) {
      service.style.backgroundColor = '';
    });

    // Highlight the clicked service
    this.style.backgroundColor = '#e0ffe0';

    // Example of parent navigation
    const servicesSection = this.parentNode;
    servicesSection.style.border = '1px solid #ccc';
  });
});

// Create a new log entry
const logEntry = document.createElement('p');

// Get selected property type
const propertyType = document.getElementById('property-type').value;

// Set log text
logEntry.textContent = `Inspection requested for ${propertyType} property.`;

// Append to submission log
document.getElementById('submission-log').appendChild(logEntry);

// ===== BOM FEATURES =====

// Alert user
alert('Your inspection request has been submitted successfully!');

// Save name to localStorage
localStorage.setItem('lastUser', userName);
