const formElem = $('car-form');
const tableBody = $('tbody');

const getElemForm = (event) => (elemName) => {
  return event.target.elements[elemName];
}

const elementTypes = {
  image: createImage,
  text: createText,
  color: createColor
}

function $ (elem) {
  return document.querySelector(`[data-js="${elem}"]`);
}

function $$ (elem) {
  return document.createElement(`${elem}`);
}

function createImage(value) {
  const tdImage = $$('td');
  const imgElem = $$('img');
  imgElem.src = value;
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

formElem.addEventListener('submit', (e) => {
  e.preventDefault();
  const getElem = getElemForm(e);
  
  const elements = [
    {type: 'image', value: getElem('image').value},
    {type: 'text', value: getElem('brand').value},
    {type: 'text', value: getElem('model').value},
    {type: 'text', value: getElem('year').value},
    {type: 'text', value: getElem('plate').value},
    {type: 'color', value: getElem('color').value}
  ];
  
  const tr = $$('tr');
  
  elements.forEach((element) => {
    const td = elementTypes[element.type](element.value);
    tr.appendChild(td);
  });
  
  tableBody.appendChild(tr);
  
  e.target.reset();
  image.focus();
});