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

designSelect.addEventListener('change', (e) => {
  colorSelect.disabled = false;
  for (let i = 1; i < colorSelect.options.length; i++) {
    const design = e.target.value;
    const theme = colorSelect.options[i].getAttribute('data-theme');
    console.log(theme);
  }
});
