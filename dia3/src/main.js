import './form';

const inputName = document.querySelector('[data-js="name"]');

inputName.addEventListener('input', (e) => {
  const capitalize = e.target.value.split(' ').map((word) => {
    if (word.length <= 3) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
  
  inputName.value = capitalize;
});
