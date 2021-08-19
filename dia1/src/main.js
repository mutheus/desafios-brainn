import './style.css';

document.querySelector('[data-js="app"]');
app.innerHTML = `
  <h1>B. Academy</h1>
  <p>Boas vindas à semana de pré-work para o Bootcamp em React.js 😁</p>
`;

app.insertAdjacentHTML('beforebegin', '<button data-js="btn">Click me</button>');

const btn = document.querySelector('[data-js="btn"]');

btn.addEventListener('click', () => app.style.display === 'none' ? app.style.display = 'block' : app.style.display = 'none');
