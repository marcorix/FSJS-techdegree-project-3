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
