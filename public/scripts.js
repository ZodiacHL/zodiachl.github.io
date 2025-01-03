// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Portfolio Item Sections
document.addEventListener("DOMContentLoaded", function () {
  // Get all toggle buttons and content elements
  const toggles = document.querySelectorAll(".portfolio-item");
  const contents = document.querySelectorAll(".content-items");

  toggles.forEach((toggle, index) => {
    toggle.onclick = function () {
      const targetContent = contents[index];

      // If the content is already open, hide it first
      if (targetContent.classList.contains("open")) {
        targetContent.classList.remove("open");
      } else {
        // Hide all other open contents
        contents.forEach(content => {
          if (content.classList.contains("open")) {
            // Close the currently open content with a slide-up effect
            content.classList.remove("open");
          }
        });

        // After all other contents have closed, show the clicked content
        setTimeout(function () {
          targetContent.classList.add("open");
        }, 300); // Delay showing the new content until the hide animation finishes
      }
    };
  });
});

// Handle form submission via JSON
const form = document.getElementById('submit');
form.addEventListener('click', function(e) {
  e.preventDefault();  // Prevent form from submitting the traditional way

  // Gather form data
  const formData = {
    name: document.querySelector('input[name="name"]').value,
    email: document.querySelector('input[name="email"]').value,
    message: document.querySelector('textarea[name="message"]').value,
  };

  console.log(formData);

  // Send the form data as JSON to the backend
  fetch('/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',  // Set the Content-Type header to application/json
    },
    body: JSON.stringify(formData),  // Convert form data to JSON
  })
  .then(response => response.text())
  .then(data => {
    alert(data);  // Display the response message
    document.getElementById("contact-form").reset();  // Reset the form after successful submission
  })
  .catch(error => {
    alert('Error: ' + error);  // Show an error if the request fails
  });
});
