import { get, post, del } from './http';

import './style.css';

const url = 'http://localhost:3333/cars';
const formElem = $('car-form');
const tableBody = $('tbody');

function $ (elem) {
  return document.querySelector(`[data-js="${elem}"]`);
}

function $$ (elem) {
  return document.createElement(`${elem}`);
}

const getElemForm = (event) => (elemName) => {
  return event.target.elements[elemName];
}

const elementTypes = {
  image: createImage,
  text: createText,
  color: createColor
}

function createImage(value) {
  const tdImage = $$('td');
  const imgElem = $$('img');
  imgElem.src = value.src;
  imgElem.alt = value.alt;
  tdImage.appendChild(imgElem);
  
  return tdImage;
}

function createText(value) {
  const tdPara = $$('td');
  const paraElem = $$('p');
  paraElem.textContent= value;
  tdPara.appendChild(paraElem);
  
  return tdPara;
}

function createColor(value) {
  const tdColor = $$('td');
  const colorDiv = $$('div');
  colorDiv.classList.add('container__item');
  colorDiv.style.backgroundColor = value;
  tdColor.appendChild(colorDiv);
  
  return tdColor;
}

formElem.addEventListener('submit', async (e) => {
  e.preventDefault();
  const getElem = getElemForm(e);
  
  const data = {
    image: getElem('image').value,
    brandModel: getElem('brand-model').value,
    year: getElem('year').value,
    plate: getElem('plate').value,
    color: getElem('color').value
  };
  
  const result = await post(url, data);
  
  if (result.error) {
    console.log('failed to post', result.message);
    return;
  }
  
  const noContent = $('no-content');
  
  if (noContent) {
    tableBody.removeChild(noContent);
  }
  
  createTableRow(data);
  
  e.target.reset();
  image.focus();
});

function createTableRow(data) {
  const elements = [
    {type: 'image', value: { src: data.image, alt: data.brandModel }},
    {type: 'text', value: data.brandModel},
    {type: 'text', value: data.year},
    {type: 'text', value: data.plate},
    {type: 'color', value: data.color},
  ];
  
  const tr = $$('tr');
  tr.dataset.plate = data.plate;
  
  elements.forEach((elem) => {
    const td = elementTypes[elem.type](elem.value);
    tr.appendChild(td);
  });
  
  const btnTd = $$('td');
  const button = $$('button');
  button.textContent = '×';
  button.classList.add('delete');
  button.dataset.plate = data.plate;
  btnTd.appendChild(button);
  
  button.addEventListener('click', handleDelete);
  
  tr.appendChild(btnTd);
  tableBody.appendChild(tr);
}

async function handleDelete(e) {
  const btn = e.target;
  const plate = btn.dataset.plate;
  
  const result = await del(url, { plate });
  
  if (result.error) {
    console.log('failed to delete', result.message);
    return;
  }
  
  const tr = document.querySelector(`tr[data-plate="${plate}"]`);
  tableBody.removeChild(tr);
  button.removeEventListener('click', handleDelete);
  
  const allTrs = $('tr');
  
  if (!allTrs) {
    createNoCarRow();
  }
}

function createNoCarRow() {
  const tr = $$('tr');
  const td = $$('td');
  const thsLength = document.querySelectorAll('table th').length;
  td.setAttribute('colspan', thsLength);
  const div = $$('div');
  div.textContent = 'Nenhum carro encontrado';
  div.classList.add('empty-table');
  td.appendChild(div);
  
  tr.dataset.js = 'no-content';
  tr.appendChild(td);
  tableBody.appendChild(tr);
}

async function getCars() {
  const result = await get(url);
  
  if (result.error) {
    console.log('failed to get cars', result.message);
    return;
  }
  
  if (result.length === 0) {
    createNoCarRow();
    return;
  }
  
  result.forEach(createTableRow);
}

getCars();
