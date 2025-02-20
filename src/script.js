let isPhoneRequired = false;

const phoneLabelSpan = document.querySelector('.phone-label-span');
const phoneField = document.getElementById('phone');

document.querySelector('#phone-checkbox').addEventListener('change', function () {
  if (this.checked) {
    phoneLabelSpan.style.display = 'inline';
    phoneField.required = true; // Set to true when checkbox is checked
  } else {
    phoneLabelSpan.style.display = 'none';
    phoneField.required = false; // Set to false when checkbox is unchecked
  }
});

document.querySelector('button[type="submit"]').addEventListener('click', function (event) {
  event.preventDefault();

  const firstNameField = document.getElementById('firstName');
  const lastNameField = document.getElementById('lastName');
  const emailField = document.getElementById('email');
  const textareaField = document.getElementById('open-text-area');
  const productField = document.getElementById('product');
  const helpRadio = document.querySelector('input[value="ajuda"]');
  const emailCheckbox = document.getElementById('email-checkbox');
  const phoneCheckbox = document.getElementById('phone-checkbox');
  const fileField = document.querySelector('input[type="file"]');
  const successMessage = document.querySelector('.success');

  // Validation
  if (!firstNameField.value || !lastNameField.value || !emailField.value || !textareaField.value) {
    return showAndHideErrorMessage();
  }

  if (isPhoneRequired && !phoneField.value) {
    return showAndHideErrorMessage();
  }

  if (!emailField.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    return showAndHideErrorMessage();
  }

  // Reset form fields after successful validation
  firstNameField.value = '';
  lastNameField.value = '';
  emailField.value = '';
  textareaField.value = '';
  phoneField.value = '';
  productField.selectedIndex = 0;
  helpRadio.checked = true;
  emailCheckbox.checked = false;
  phoneCheckbox.checked = false;
  fileField.value = '';
  phoneLabelSpan.style.display = 'none';
  successMessage.style.display = 'block';

  // Reset isPhoneRequired flag after successful form submission
  isPhoneRequired = false;
  scroll(0, 0);
  hideMessageAfterTimeout(successMessage);
}, false);

function showAndHideErrorMessage() {
  const errorMessage = document.querySelector('.error');
  errorMessage.style.display = 'block';
  scroll(0, 0);
  hideMessageAfterTimeout(errorMessage);
  return;
}

function hideMessageAfterTimeout(element) {
  setTimeout(function () {
    element.style.display = 'none';
  }, 3000);
}
