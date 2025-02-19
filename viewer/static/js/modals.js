// viewer/static/js/modals.js

document.addEventListener("DOMContentLoaded", function() {
  const loginLink = document.getElementById("login-link");
  const loginModal = document.getElementById("login-modal");
  const closeButton = document.getElementById("close");

  if (loginLink && loginModal && closeButton) {
    // Open the modal when the login link is clicked.
    loginLink.addEventListener("click", function(event) {
      event.preventDefault();
      loginModal.style.display = "block";
    });

    // Close the modal when the close button is clicked.
    closeButton.addEventListener("click", function() {
      loginModal.style.display = "none";
    });

    // Close the modal when clicking outside of the modal content.
    window.addEventListener("click", function(event) {
      if (event.target === loginModal) {
        loginModal.style.display = "none";
      }
    });
  }
});
