import './form';

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
