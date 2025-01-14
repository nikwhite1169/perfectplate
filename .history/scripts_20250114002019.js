
document.addEventListener('DOMContentLoaded', () => {
  // Attach toggle functionality to all password visibility buttons
  document.querySelectorAll('.toggle-password').forEach((toggle) => {
    toggle.addEventListener('click', function () {
      const passwordInput = this.previousElementSibling;
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text'; // Show password
        this.textContent = '🙈'; // Change icon to 'hide'
      } else {
        passwordInput.type = 'password'; // Hide password
        this.textContent = '👁'; // Change icon to 'show'
      }
    });

    // Prevent the toggle button from being tabbable
    toggle.setAttribute('tabindex', '-1');
  });
});
