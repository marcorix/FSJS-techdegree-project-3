// PAGE ONLOAD
const nameInput = document.getElementById('name');
const otherJobInput = document.getElementById('other-job-role');
const colorSelect = document.getElementById('color');
const paymentSelect = document.getElementById('payment');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');

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
title.addEventListener('change', (e) => {
  if (e.target.value === 'other') {
    otherJobInput.style.display = 'inline-block';
  }
});

// T-SHIRT INFO
const designSelect = document.getElementById('design');

designSelect.addEventListener('change', (e) => {
  colorSelect.disabled = false;

  //   loop trhouth the options of the Color select element
  for (let i = 0; i < colorSelect.options.length; i++) {
    const element = colorSelect.options[i];
    const theme = element.getAttribute('data-theme');

    // Show only the deisgn selected
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

let totalCost = 0;

registerFieldset.addEventListener('change', (e) => {
  const singleCost = parseInt(e.target.getAttribute('data-cost'));

  if (e.target.checked) {
    totalCost += singleCost;
  } else {
    totalCost -= singleCost;
  }

  activitiesTotalCost.textContent = `Total: $${totalCost}`;
});

// PAYMENT INFO
const creditcardDiv = document.getElementById('credit-card');
// Show the chosen payment method
paymentSelect.addEventListener('change', (e) => {
  if (e.target.value === 'paypal') {
    paypalDiv.style.display = 'block';
    creditcardDiv.style.display = 'none';
    bitcoinDiv.style.display = 'none';
  } else if (e.target.value === 'bitcoin') {
    paypalDiv.style.display = 'none';
    creditcardDiv.style.display = 'none';
    bitcoinDiv.style.display = 'block';
  } else if (e.target.value === 'credit-card') {
    paypalDiv.style.display = 'none';
    creditcardDiv.style.display = 'block';
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
  const nameOk = /[a-z]/i.test(nameInput.value);

  if (!nameOk) {
    notValid(nameInput);
  } else {
    valid(nameInput);
  }
  return nameOk;
}

function isValidEmail() {
  const emailOk = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value);
  if (!emailOk) {
    notValid(emailInput);
  } else {
    valid(emailInput);
  }

  return emailOk;
}

function isActivitySelected() {
  let activitySelected = false;

  if (totalCost === 0) {
    notValid(registerFieldset.firstElementChild);
  } else {
    valid(registerFieldset.firstElementChild);
    activitySelected = true;
  }
  return activitySelected;
}

function isValidPayment() {
  let ccDataOk = true;

  if (paymentSelect.options[1].selected) {
    let ccNumOk = /^\d{13,16}$/.test(ccNumInput.value);
    let zipOk = /^\d{5}$/.test(zipInput.value);
    let cvvOk = /^\d{3}$/.test(cvvInput.value);

    if (!ccNumOk) {
      console.log('Please insert the right credit card digits');
      ccDataOk = false;
    } else if (!zipOk) {
      console.log('Please insert the zip number');
      ccDataOk = false;
    } else if (!cvvOk) {
      console.log('Please insert the CVV number');
      ccDataOk = false;
    }
  }
  return ccDataOk;
}

form.addEventListener('submit', (e) => {
  if (
    !isValidName() ||
    !isValidEmail() ||
    !isActivitySelected() ||
    !isValidPayment()
  ) {
    e.preventDefault();
  }
});

// ACCESSIBILITY

const inputCheckboxes = document.querySelectorAll('input[type="checkbox"]');
for (let i = 0; i < inputCheckboxes.length; i++) {
  const element = inputCheckboxes[i];
  element.addEventListener('focus', () => {
    element.parentElement.classList.add('focus');
  });
  element.addEventListener('blur', () => {
    element.parentElement.classList.remove('focus');
  });
}

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
