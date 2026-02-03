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
