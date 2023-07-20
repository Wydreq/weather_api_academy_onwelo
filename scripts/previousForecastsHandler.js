
//previous forecasts selectors
const previousTemperature = document.getElementById('temperaturePv');
const previousMeasureDate = document.getElementById('measurementDatePv');
const previousPressure = document.getElementById('pressurePv');
const previousCity = document.getElementById('weatherCityPv');

const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
const clearStorageBtn = document.getElementById('clearStorage');

let counter = JSON.parse(localStorage.getItem('allForecasts')).length-1;

window.onload = () => {
    let fetchedData = JSON.parse(localStorage.getItem('allForecasts'));
    previousCity.textContent = fetchedData[counter].stacja;
    previousTemperature.textContent = `${fetchedData[counter].temperatura}℃`;
    previousMeasureDate.textContent = `Measurement date: ${fetchedData[counter].data_pomiaru}`;
    previousPressure.textContent = `Pressure: ${fetchedData[counter].cisnienie}`
    if(fetchedData[counter].suma_opadu >=1) {
        document.getElementById('weatherImagePv').src = './assets/rainy.png';
    }
    else {
        document.getElementById('weatherImagePv').src = './assets/sunny.png';
    }

    if(fetchedData == null) {
        leftArrow.classList.add('hidden');
        rightArrow.classList.add('hidden');
    }
    if(fetchedData.length > 1) {
        leftArrow.classList.remove('hidden');
    }

}

const reloadData = () => {
    const fetchedData = JSON.parse(localStorage.getItem('allForecasts'));
    previousCity.textContent = fetchedData[counter].stacja;
    previousTemperature.textContent = `${fetchedData[counter].temperatura}℃`;
    previousMeasureDate.textContent = `Measurement date: ${fetchedData[counter].data_pomiaru}`;
    previousPressure.textContent = `Pressure: ${fetchedData[counter].cisnienie}`
    if(fetchedData[counter].suma_opadu >=1) {
        document.getElementById('weatherImagePv').src = './assets/rainy.png';
    }
    else {
        document.getElementById('weatherImagePv').src = './assets/sunny.png';
    }
    console.log(counter);
}

const decreaseCounter = () => {
    if(counter >= 1) {
        counter--;
        reloadData();
    }
    if(counter <= JSON.parse(localStorage.getItem('allForecasts')).length-2) {
        rightArrow.classList.remove('hidden');
    }
    if(counter === 0 ) {
        leftArrow.classList.add('hidden');
    }

}

const increaseCounter = () => {
    if(counter <= JSON.parse(localStorage.getItem('allForecasts')).length-2) {
        counter++;
        reloadData();
    }
    if(counter === JSON.parse(localStorage.getItem('allForecasts')).length-1) {
        rightArrow.classList.add('hidden');
    }
    if(counter > 0) {
        leftArrow.classList.remove('hidden');
    }
}

const clearStorageHandler = () => {
    localStorage.removeItem('allForecasts');
    location.reload();
}

leftArrow.addEventListener('click', decreaseCounter);
rightArrow.addEventListener('click', increaseCounter);
clearStorageBtn.addEventListener('click', clearStorageHandler);