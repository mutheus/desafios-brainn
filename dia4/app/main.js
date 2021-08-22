const formElem = $('car-form');
const tableBody = $('tbody');

renderCars();

async function getCars() {
  try {
    const data = await fetch('http://localhost:3333/cars');
    return await data.json();
  } catch(error) {
    console.log(error)
  }
}

async function postCar(car) {
  try {
    const data = await fetch('http://localhost:3333/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(car)
    });
    return await data.json();
  } catch(error) {
    console.log(error.message)
  }
}

async function deleteCar(plate) {
  try {
    const data = await fetch('http://localhost:3333/cars', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(plate)
    });
    return await data.json();
  } catch(error) {
    console.log(error.message)
  }
}

async function renderCars() {
  const cars = await getCars();
  tableBody.innerHTML = '';
  
  if (cars.length === 0) {
    const tr = $$('tr');
    const td = $$('td');
    td.setAttribute('colspan', 5);
    const div = $$('div');
    div.textContent = 'Nenhum carro encontrado';
    div.classList.add('empty-table');
    td.appendChild(div);
    tr.appendChild(td);
    tableBody.appendChild(tr);
    
    return;
  }
  
  cars.forEach((car) => {
    const tr = $$('tr');
    
    if (car.image) {
      const imgElem = createImage(car.image);
      tr.appendChild(imgElem);
    }
    
    if (car.brandModel) {
      const brandModelElem = createText(car.brandModel);
      tr.appendChild(brandModelElem);
    }
    
    if (car.year) {
      const yearElem = createText(car.year);
      tr.appendChild(yearElem);
    }
    
    if (car.plate) {
      const plateElem = createText(car.plate);
      tr.appendChild(plateElem);
    }
    
    if (car.color) {
      const colorElem = createColor(car.color);
      tr.appendChild(colorElem);
      const tdDel = $$('td');
      const delElem = $$('button');
      delElem.setAttribute('data-js', 'delete');
      delElem.classList.add('delete');
      delElem.textContent = '×';
      tdDel.appendChild(delElem);
      tr.appendChild(tdDel);
    }
    
    tableBody.appendChild(tr);
  });
}

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
  colorDiv.classList.add('container-color');
  colorDiv.style.backgroundColor = value;
  tdColor.appendChild(colorDiv);
  
  return tdColor;
}

formElem.addEventListener('submit', (e) => {
  e.preventDefault();
  const getElem = getElemForm(e);
  const data = {
    image: getElem('image').value,
    brandModel: getElem('brand-model').value,
    year: getElem('year').value,
    plate: getElem('plate').value,
    color: getElem('color').value
  };
  
  postCar(data);
  renderCars();
  
  e.target.reset();
  image.focus();
});
