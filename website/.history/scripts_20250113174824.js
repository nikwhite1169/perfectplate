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
  function updateButtonState() {
    const allFieldsValid = Object.values(formState).every(Boolean);
    const submitButton = document.getElementById('submitButton');
    if (allFieldsValid) {
      submitButton.classList.remove('disabled');
    } else {
      submitButton.classList.add('disabled');
    }
  }
      }