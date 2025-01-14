document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.toggle-password').forEach((toggle) => {
    toggle.addEventListener('click', function () {
      const input = this.closest('.password-wrapper').querySelector('input');
      const type = input.type === 'password' ? 'text' : 'password';
      input.type = type;
      this.textContent = type === 'password' ? '👁' : '🙈';
    });

    toggle.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.click();
      }
    });
  });
});

function (field, message) {
  const fieldEshowErrorlement = document.getElementById(field);
  const errorElement = document.getElementById(`${field}-error`);

  // Display error message if an element is available
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.color = "red";
  }

  // Remove valid styling and apply invalid styling
  fieldElement.classList.remove("valid-field");
  fieldElement.classList.add("invalid-field");
}

function showSuccess(field) {
  const fieldElement = document.getElementById(field);
  const errorElement = document.getElementById(`${field}-error`);

  if (errorElement) {
    errorElement.textContent = "";
  }

  // Remove invalid styling and apply valid styling
  fieldElement.classList.remove("invalid-field");
  fieldElement.classList.add("valid-field");
}

function validatePassword() {
  const password = document.getElementById('password').value;
  const passwordHint = document.querySelector('.hint');
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  if (passwordRegex.test(password)) {
    formState.password = true;
    passwordHint.style.color = 'black';
  } else {
    formState.password = false;
    passwordHint.style.color = 'red';
  }
  updateButtonState();
}
