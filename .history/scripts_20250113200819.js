document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.toggle-password').forEach((toggle) => {
    toggle.addEventListener('click', function () {
      const input = this.closest('.password-wrapper').querySelector('input'); // Correctly target the associated input
      const type = input.type === 'password' ? 'text' : 'password';
      input.type = type;
      this.textContent = type === 'password' ? '👁' : '🙈'; // Update icon
    });

    toggle.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.click();
      }
    });
  });
});

function showError(field, message) {
  const fieldElement = document.getElementById(field);
  const errorElement = document.getElementById(`${field}-error`);

  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.color = "red";
  }

  // Apply border styling
  fieldElement.classList.remove("valid-field");
  fieldElement.classList.add("invalid-field");
}

function showSuccess(field) {
  const fieldElement = document.getElementById(field);
  const errorElement = document.getElementById(`${field}-error`);

  if (errorElement) {
    errorElement.textContent = "";
  }

  // Apply border styling
  fieldElement.classList.remove("invalid-field");
  fieldElement.classList.add("valid-field");
}

function validateEmail() {
  const email = document.getElementById('email').value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email)) {
    formState.email = true;
    showSuccess('email');
  } else {
    formState.email = false;
    showError('email', 'Please enter a valid email address.');
  }
  updateButtonState();
}

function validatePassword() {
  const password = document.getElementById('password').value;
  const passwordHint = document.querySelector('.hint');
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  if (passwordRegex.test(password)) {
    formState.password = true;
    passwordHint.style.color = 'black';
    showSuccess('password');
  } else {
    formState.password = false;
    passwordHint.style.color = 'red';
    showError('password', 'Password must be at least 8 characters and include uppercase, lowercase, a number, and a symbol.');
  }
  updateButtonState();
}

function validateVerifyPassword() {
  const password = document.getElementById('password').value;
  const verifyPassword = document.getElementById('confirm-password').value;
  if (password === verifyPassword) {
    formState.verifyPassword = true;
    showSuccess('confirm-password');
  } else {
    formState.verifyPassword = false;
    showError('confirm-password', 'Passwords do not match.');
  }
  updateButtonState();
}

function validateCardNumber() {
  const cardNumber = document.getElementById('card-number').value;
  const cardNumberRegex = /^\d{16}$/;
  if (cardNumberRegex.test(cardNumber)) {
    formState.cardNumber = true;
    showSuccess('card-number');
  } else {
    formState.cardNumber = false;
    showError('card-number', 'Please enter a valid 16-digit card number.');
  }
  updateButtonState();
}

function validateExpiryDate() {
  const expiryDate = document.getElementById('expiry-date').value;
  const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const currentDate = new Date();
  const [month, year] = expiryDate.split('/');
  const expiry = new Date(`20${year}`, month - 1);
  if (expiryDateRegex.test(expiryDate) && expiry > currentDate) {
    formState.expiryDate = true;
    showSuccess('expiry-date');
  } else {
    formState.expiryDate = false;
    showError('expiry-date', 'Please enter a valid expiry date in MM/YY format.');
  }
  updateButtonState();
}

function validateCVC() {
  const cvc = document.getElementById('cvc').value;
  const cvcRegex = /^\d{3,4}$/;
  if (cvcRegex.test(cvc)) {
    formState.cvc = true;
    showSuccess('cvc');
  } else {
    formState.cvc = false;
    showError('cvc', 'Please enter a valid 3 or 4-digit CVC.');
  }
  updateButtonState();
}

function updateButtonState() {
  const allFieldsValid = Object.values(formState).every(Boolean);
  const submitButton = document.getElementById('submitButton');
  if (allFieldsValid) {
    submitButton.disabled = false;
    submitButton.classList.remove('disabled');
  } else {
    submitButton.disabled = true;
    submitButton.classList.add('disabled');
  }
}
