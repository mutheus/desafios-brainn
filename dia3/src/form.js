const inputName = document.querySelector('[data-js="name"]');

const dontChange = ['da', 'das', 'de', 'do', 'dos'];

inputName.addEventListener('input', (e) => {
  const words = e.target.value.split(' ');
  
  e.target.value = words.map((word) => {
    return dontChange.includes(word.toLowerCase()) ? word.toLowerCase() : capitalize(word);
  }).join(' ');
});

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const formElem = document.querySelector('[data-js="form"]');
const selectElem = document.createElement('select');
const containerElem = document.querySelector('[data-js="container"]');
const colors = ['#ffab91', '#ffcc80', '#e8ed9b', '#82deeb', '#d094da'];

selectElem.setAttribute('multiple', '');

colors.forEach((color) => {
  const optionElem = document.createElement('option');
  optionElem.setAttribute('value', color);
  optionElem.textContent = color;
  selectElem.appendChild(optionElem);
});

selectElem.addEventListener('change', (e) => {
  containerElem.innerHTML = '';
  
  Array.from(e.target.selectedOptions).forEach((option) => {
    const div = createDiv(option.value);
    containerElem.appendChild(div);
  });
});

function createDiv(value) {
  const divElem = document.createElement('div');
  divElem.classList.add('container__item');
  divElem.style.backgroundColor = value;
  divElem.textContent = value;
  
  return divElem;
}

formElem.appendChild(selectElem);
