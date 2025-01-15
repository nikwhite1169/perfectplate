// Handle Account Form Submission
document.getElementById('account-form').addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Your changes have been saved.');
});

// Handle Cancel Subscription
document.getElementById('cancel-subscription').addEventListener('click', () => {
  if (confirm('Are you sure you want to cancel your subscription?')) {
    alert('Your subscription has been canceled.');
  }
});

document.getElementById('login-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Simple validation (replace with real authentication logic)
  if (email === "test@perfectplate.com" && password === "password123") {
    alert("Login successful!");
    window.location.href = "account.html"; // Redirect to account management page
  } else {
    alert("Invalid email or password. Please try again.");
  }
});

// Handle Reset Password Form Submission
document.getElementById('reset-password-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('reset-email').value;

  // Simulate sending a reset link
  alert(`A password reset link has been sent to ${email}.`);
});

// Password Toggle Visibility
document.querySelectorAll('.toggle-password').forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const passwordInput = toggle.previousElementSibling; // Get the associated input
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text'; // Switch to text
      toggle.textContent = '🙈'; // Change icon
    } else {
      passwordInput.type = 'password'; // Switch back to password
      toggle.textContent = '👁'; // Change icon
    }
  });

  // Prevent tabbing to the toggle icon
  toggle.setAttribute('tabindex', '-1');
});

// Validate Password Complexity
function validatePassword() {
  const password = document.getElementById('password').value;
  const passwordError = document.getElementById('password-error');
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  if (!passwordRegex.test(password)) {
    passwordError.textContent = 'Password must be at least 8 characters, include uppercase, lowercase, a number, and a symbol.';
    return false;
  }
  passwordError.textContent = ''; // Clear the error
  return true;
}

// Validate Password Match
function validateConfirmPassword() {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const confirmPasswordError = document.getElementById('confirm-password-error');

  if (password !== confirmPassword) {
    confirmPasswordError.textContent = 'Passwords do not match.';
    return false;
  }
  confirmPasswordError.textContent = ''; // Clear the error
  return true;
}

// Form Submission for Account Page
document.getElementById('account-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();

  if (isPasswordValid && isConfirmPasswordValid) {
    alert('Changes saved successfully!');
  } else {
    alert('Please fix the errors before saving changes.');
  }
});

// Attach validation events
document.getElementById('password').addEventListener('input', validatePassword);
document.getElementById('confirm-password').addEventListener('input', validateConfirmPassword);


/* document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM loaded, attaching toggle functionality...");

  // Select all toggle-password buttons
  const toggles = document.querySelectorAll('.toggle-password');
  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      // Find the associated password input field
      const passwordInput = toggle.previousElementSibling;

      if (!passwordInput) {
        console.error("No password input found for this toggle:", toggle);
        return;
      }

      // Toggle visibility
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggle.textContent = '🙈'; // Update to 'hide' icon
        console.log("Password shown for:", passwordInput);
      } else {
        passwordInput.type = 'password';
        toggle.textContent = '👁'; // Update to 'show' icon
        console.log("Password hidden for:", passwordInput);
      }
    });

    // Prevent tabbing to the icon
    toggle.setAttribute('tabindex', '-1');
    console.log("Tab index set to -1 for:", toggle);
  });

  console.log("All toggle functionality attached.");
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

// DEBUG: Add logs to trace execution of toggle-password functionality
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded and parsed");

  // Attach toggle functionality to password visibility buttons
  document.querySelectorAll('.toggle-password').forEach((toggle) => {
    console.log("Attaching event listener to:", toggle);

    toggle.addEventListener('click', function () {
      const passwordInput = this.previousElementSibling;

      if (passwordInput) {
        console.log("Password input found:", passwordInput);

        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          this.textContent = '🙈'; // Change to hide icon
          console.log("Password field type set to text, icon updated to 🙈");
        } else {
          passwordInput.type = 'password';
          this.textContent = '👁'; // Change to show icon
          console.log("Password field type set to password, icon updated to 👁");
        }
      } else {
        console.error("Password input not found for:", this);
      }
    });
  });
});
 */