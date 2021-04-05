const nameInput = document.getElementById('name');
const otherJobInput = document.getElementById('other-job-role');
const jobRoleSelect = document.getElementById('title');
const colorSelect = document.getElementById('color');
const designSelect = document.getElementById('design');

window.addEventListener('load', () => {
  nameInput.focus();
  otherJobInput.style.display = 'none';
  colorSelect.disabled = true;
});

title.addEventListener('change', (e) => {
  if (e.target.value === 'other') {
    otherJobInput.style.display = 'inline-block';
  }
});

// T-shirt design handler.
designSelect.addEventListener('change', (e) => {
  colorSelect.disabled = false;
  const design = e.target.value;

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
