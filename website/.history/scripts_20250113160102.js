document.querySelectorAll('.toggle-password').forEach((toggle) => {
  toggle.addEventListener('click', function () {
    const input = this.previousElementSibling.previousElementSibling; // Select the password input
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
    this.textContent = type === 'password' ? '👁' : '🙈'; // Toggle icon
  });
});