const nameInput = document.getElementById('nameInput');
const numInput = document.getElementById('numInput');
const cvcInput = document.getElementById('cvcInput');
const expMonth = document.getElementById('expMonth');
const expYear = document.getElementById('expYear');
const enterBtn = document.getElementById('enterBtn');
const resetBtn = document.getElementById('resetBtn');
const cardRadios = document.querySelectorAll('input[name="cardType"]');
const testCount = document.getElementById('testCount');

let count = 1;
testCount.textContent = `Training data entered: ${count}/10`;

const expected = {
  nameInput: 'Mrs ABC Miller',
  numInput: '4422891459068728',
  cvcInput: '646',
  expMonth: '09',
  expYear: '30'
};

function check() {
  const cardType = Array.from(cardRadios).find(r => r.checked)?.value;
  const valid = cardType === 'Qubes' &&
                nameInput.value === expected.nameInput &&
                numInput.value === expected.numInput &&
                cvcInput.value === expected.cvcInput &&
                expMonth.value === expected.expMonth &&
                expYear.value === expected.expYear;
  enterBtn.disabled = !valid;
}

function clearForm() {
  nameInput.value = numInput.value = cvcInput.value = expMonth.value = expYear.value = '';
  cardRadios.forEach(r => r.checked = false);
  document.querySelectorAll('input[type="text"], select').forEach(el => el.classList.remove('bad'));
  check();
}

Object.entries(expected).forEach(([id, value]) => {
  const input = document.getElementById(id);
  input.addEventListener('paste', e => e.preventDefault());
  input.addEventListener('blur', () => {
    input.classList.toggle('bad', input.value !== value);
  });
  input.addEventListener('input', check);
});

cardRadios.forEach(r => r.addEventListener('change', check));

enterBtn.addEventListener('click', () => {
  count++;
  testCount.textContent = `Training data entered: ${count}/10`;
  clearForm();
});

resetBtn.addEventListener('click', clearForm);
