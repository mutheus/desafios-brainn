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

const selectElem = document.querySelector('[data-js="select"]');
const containerElem = document.querySelector('[data-js="container"]');

selectElem.addEventListener('change', (e) => {
  const selectedOptions = Array.from(e.target.selectedOptions);
  
  const elements = selectedOptions.map((item) => {
    return `
      <div class="container__item" style="background-color: ${item.value}">
        ${item.value}
      </div>
    `;
  }).join('');
  containerElem.innerHTML = elements;
});