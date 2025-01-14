document.querySelectorAll('.toggle-password').forEach((toggle) => {
  toggle.addEventListener('click', function () {
    const input = this.previousElementSibling; // Correctly target the associated input
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
    this.textContent = type === 'password' ? '👁' : '🙈'; // Toggle icon
  });
});

function validateForm() {
  const formState = {
    email: validateEmail(),
    password: validatePassword(),
    confirmPassword: validateConfirmPassword(),
    cardNumber: validateCardNumber(),
    expiryDate: validateExpiryDate(),
    cvc: validateCVC()
  };

  const allFieldsValid = Object.values(formState).every(Boolean);
  const submitButton = document.getElementById('submitButton');
  submitButton.disabled = !allFieldsValid;
  submitButton.classList.toggle('disabled', !allFieldsValid);
}

function validateEmail() {
  const email = document.getElementById('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email.value);
  toggleError(email, isValid, 'Please enter a valid email address.');
  return isValid;
}

function validatePassword() {
  const password = document.getElementById('password');
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  const isValid = passwordRegex.test(password.value);
  toggleError(password, isValid, 'Invalid password.');
  return isValid;
}

function validateConfirmPassword() {
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirm-password');
  const isValid = confirmPassword.value === password.value;
  toggleError(confirmPassword, isValid, 'Passwords do not match.');
  return isValid;
}

function validateCardNumber() {
  const cardNumber = document.getElementById('card-number');
  const isValid = /^\d{16}$/.test(cardNumber.value);
  toggleError(cardNumber, isValid, 'Invalid card number.');
  return isValid;
}

function validateExpiryDate() {
  const expiryDate = document.getElementById('expiry-date');
  const isValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate.value);
  toggleError(expiryDate, isValid, 'Invalid expiry date.');
  return isValid;
}

function validateCVC() {
  const cvc = document.getElementById('cvc');
  const isValid = /^\d{3,4}$/.test(cvc.value);
  toggleError(cvc, isValid, 'Invalid CVC.');
  return isValid;
}

function toggleError(field, isValid, message) {
  const errorElement = field.nextElementSibling;
  errorElement.textContent = isValid ? '' : message;
}

document.querySelectorAll('input').forEach((input) => {
  input.addEventListener('input', validateForm);
});
