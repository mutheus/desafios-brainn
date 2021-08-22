function $ (elem) {
  return document.querySelector(`[data-js="${elem}"]`);
}

function $$ (elem) {
  return document.createElement(`${elem}`);
}

const formElem = $('car-form');
const tableBody = $('tbody');

formElem.addEventListener('submit', (e) => {
  e.preventDefault();
  const imageInput = $('image');
  const brandInput = $('brand');
  const modelInput = $('model');
  const yearInput = $('year');
  const plateInput = $('plate');
  const colorInput = $('color');
  
  const tr = $$('tr');
  
  const tdImage = $$('td');
  const imgElem = $$('img');
  imgElem.setAttribute('src', imageInput.value);
  tdImage.appendChild(imgElem);
  
  const tdBrand = $$('td');
  const brandPara = $$('p');
  brandPara.textContent = brandInput.value;
  tdBrand.appendChild(brandPara);
  
  const tdModel = $$('td');
  const modelPara = $$('p');
  modelPara.textContent = modelInput.value;
  tdModel.appendChild(modelPara);
  
  const tdYear = $$('td');
  const yearPara = $$('p');
  yearPara.textContent = yearInput.value;
  tdYear.appendChild(yearPara);
  
  const tdPlate = $$('td');
  const platePara = $$('p');
  platePara.textContent = plateInput.value;
  tdPlate.appendChild(platePara);
  
  const tdColor = $$('td');
  const colorDiv = $$('div');
  colorDiv.classList.add('container__item');
  colorDiv.style.backgroundColor = colorInput.value;
  tdColor.appendChild(colorDiv);
  
  tr.appendChild(tdImage);
  tr.appendChild(tdBrand);
  tr.appendChild(tdModel);
  tr.appendChild(tdYear);
  tr.appendChild(tdPlate);
  tr.appendChild(tdColor);
  
  tableBody.appendChild(tr);
  e.target.reset();
  imageInput.focus();
});