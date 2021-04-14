// PAGE ONLOAD
const nameInput = document.getElementById('name');
const otherJobInput = document.getElementById('other-job-role');
const colorSelect = document.getElementById('color');
const paymentSelect = document.getElementById('payment');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');

// Set the default options
window.addEventListener('load', () => {
  nameInput.focus();
  otherJobInput.style.display = 'none';
  colorSelect.disabled = true;
  paymentSelect.options[1].selected = true;
  paypalDiv.style.display = 'none';
  bitcoinDiv.style.display = 'none';
});

// BASIC INFO
const jobRoleSelect = document.getElementById('title');

// Show the other job role input only when selected
jobRoleSelect.addEventListener('change', (e) => {
  if (e.target.value === 'other') {
    otherJobInput.style.display = 'inline-block';
  } else {
    otherJobInput.style.display = 'none';
  }
});

// T-SHIRT INFO
const designSelect = document.getElementById('design');

designSelect.addEventListener('change', (e) => {
  colorSelect.disabled = false;

  //   loop through the options of the Color select element
  for (let i = 0; i < colorSelect.options.length; i++) {
    const element = colorSelect.options[i];
    const theme = element.getAttribute('data-theme');

    // Show only the design selected
    if (designSelect.value !== theme) {
      element.hidden = true;
      element.selected = false;
    } else {
      element.hidden = false;
      element.selected = true;
    }
  }
});

// REGISTER FOR ACTIVITIES
const registerFieldset = document.getElementById('activities');
const activitiesTotalCost = document.getElementById('activities-cost');

// Collect all the activities checkboxes
const inputCheckboxes = document.querySelectorAll('input[type="checkbox"]');

// Create a variable fot the total cost
let totalCost = 0;

registerFieldset.addEventListener('change', (e) => {
  // Get the day and time of the activity selected
  const dayAndTimeSelected = e.target.getAttribute('data-day-and-time');

  // Loop over  all the activities and check and then disable those with same day and time
  for (let i = 0; i < inputCheckboxes.length; i++) {
    const element = inputCheckboxes[i];

    // Get the day and time of each activity
    const dayAndTime = inputCheckboxes[i].getAttribute('data-day-and-time');

    // Exclude the activity selected
    if (e.target.getAttribute('name') != element.getAttribute('name')) {
      // Check for matches
      if (dayAndTime == dayAndTimeSelected) {
        // disable/enable depends on checked/unchecked activity
        if (e.target.checked) {
          element.disabled = true;
          element.parentElement.classList.add('disabled');
        } else {
          element.disabled = false;
          element.parentElement.classList.remove('disabled');
        }
      }
    }
  }
  // Get the cost of the selected activity
  const singleCost = parseInt(e.target.getAttribute('data-cost'));

  // Add or remove costs from the total cost
  if (e.target.checked) {
    totalCost += singleCost;
  } else {
    totalCost -= singleCost;
  }

  activitiesTotalCost.textContent = `Total: $${totalCost}`;
});

// PAYMENT INFO
const creditCardDiv = document.getElementById('credit-card');

// Show the chosen payment method
paymentSelect.addEventListener('change', (e) => {
  if (e.target.value === 'paypal') {
    paypalDiv.style.display = 'block';
    creditCardDiv.style.display = 'none';
    bitcoinDiv.style.display = 'none';
  } else if (e.target.value === 'bitcoin') {
    paypalDiv.style.display = 'none';
    creditCardDiv.style.display = 'none';
    bitcoinDiv.style.display = 'block';
  } else if (e.target.value === 'credit-card') {
    paypalDiv.style.display = 'none';
    creditCardDiv.style.display = 'block';
    bitcoinDiv.style.display = 'none';
  }
});

// FORM VALIDATION

const form = document.querySelector('form');
const emailInput = document.getElementById('email');
const ccNumInput = document.getElementById('cc-num');
const zipInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');

function isValidName() {
  // Create a Regex test
  const nameOk = /[a-z]/i.test(nameInput.value);

  // Check if the Regex and call the relative function
  if (!nameOk) {
    notValid(nameInput);
  } else {
    valid(nameInput);
  }
  // return true or false
  return nameOk;
}

function isValidEmail() {
  // Create a Regex test
  const emailOk = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value);

  // Get the hint span
  const errorSpan = document.getElementById('email-hint');

  if (emailInput.value === '') {
    // Change the text of the span if the email input is empty
    emailInput.parentElement.lastElementChild.textContent =
      'Please insert an Email address';
    emailInput.parentElement.lastElementChild.style.display = 'block';
  } else {
    // Check the Regex and call the relative function
    if (!emailOk) {
      // Change the text of the hint span
      emailInput.parentElement.lastElementChild.textContent =
        'Email address must be formatted correctly';
      notValid(emailInput);
    } else {
      valid(emailInput);
    }
  }

  // return true or false
  return emailOk;
}

function isActivitySelected() {
  let activitySelected = false;

  // If the total cost is 0 means no activity has been checked
  if (totalCost === 0) {
    notValid(registerFieldset.firstElementChild);
  } else {
    valid(registerFieldset.firstElementChild);
    activitySelected = true;
  }
  // return true or false
  return activitySelected;
}

function isValidPayment() {
  let ccDataOk = true;

  if (paymentSelect.options[1].selected) {
    // Create a Regex test
    let ccNumOk = /^\d{13,16}$/.test(ccNumInput.value);
    let zipOk = /^\d{5}$/.test(zipInput.value);
    let cvvOk = /^\d{3}$/.test(cvvInput.value);

    // Check if the Regex and call the relative function
    if (!ccNumOk) {
      notValid(ccNumInput);
      ccDataOk = false;
    } else {
      valid(ccNumInput);
    }

    if (!zipOk) {
      notValid(zipInput);
      ccDataOk = false;
    } else {
      valid(zipInput);
    }

    if (!cvvOk) {
      notValid(cvvInput);
      ccDataOk = false;
    } else {
      valid(cvvInput);
    }
  }
  // return true or false
  return ccDataOk;
}

form.addEventListener('submit', (e) => {
  // Call all the validation form functions
  isValidName();
  isValidEmail();
  isActivitySelected();
  isValidPayment();

  // Prevent Submit if some of them (even one) are not valid
  if (
    !isValidName() ||
    !isValidEmail() ||
    !isActivitySelected() ||
    !isValidPayment()
  ) {
    e.preventDefault();
  }
});

// ACCESSIBILITy

// Create a listener for focus and blur for every checkbox
for (let i = 0; i < inputCheckboxes.length; i++) {
  const element = inputCheckboxes[i];
  element.addEventListener('focus', () => {
    element.parentElement.classList.add('focus');
  });
  element.addEventListener('blur', () => {
    element.parentElement.classList.remove('focus');
  });
}

// Highlights the form field with errors or valid styles
function valid(element) {
  element.parentElement.classList.add('valid');
  element.parentElement.classList.remove('not-valid');
  element.parentElement.lastElementChild.style.display = 'none';
}
function notValid(element) {
  element.parentElement.classList.add('not-valid');
  element.parentElement.classList.remove('valid');
  element.parentElement.lastElementChild.style.display = 'block';
}

// Real-time error message
emailInput.addEventListener('keyup', () => {
  isValidEmail();
});
