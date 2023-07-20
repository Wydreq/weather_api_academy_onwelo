
const btn = document.getElementById('searchButton');
btn.addEventListener('click', buttonHandler);

//selectors to current weather forecast
const weatherTitle = document.getElementById('weatherTitle');
const currentTemperature = document.getElementById('temperature');
const currentMeasurementDate = document.getElementById('measurementDate');
const currentPressure = document.getElementById('pressure');
function buttonHandler() {
    const select = document.getElementById('citySelect');
    const value = select.options[select.selectedIndex].value;
    if(value.length > 0) {
        document.getElementById('errorMessage').className = 'hiddenError';
        getApiWeather(value);
    }
    else {
        document.getElementById('errorMessage').className = 'showedError';
        return;
    }
}

const getApiWeather = async (value) => {
    try
    {
        btn.textContent = 'Searching...'
        const response = await fetch(`https://danepubliczne.imgw.pl/api/data/synop/station/${value}`);
        const data = await response.json();
        console.log(data);

        if(data.status === false) {
            btn.textContent = 'Search';
            throw new Error(data.message);
        } else {
            if(data.suma_opadu >=1) {
                document.getElementById('weatherImage').src = './assets/rainy.png';
            }
            else {
                document.getElementById('weatherImage').src = './assets/sunny.png';
            }
            weatherTitle.textContent = `${data.stacja}`;
            currentTemperature.textContent = `${data.temperatura}℃`;
            currentMeasurementDate.textContent = `Measurement date: ${data.data_pomiaru}`;
            currentPressure.textContent = `Pressure: ${data.cisnienie}`;
            let existingForecasts = JSON.parse(localStorage.getItem('allForecasts'));
            if(existingForecasts == null) {
                existingForecasts = [];
            }
            existingForecasts.push(data);
            localStorage.setItem('allForecasts', JSON.stringify(existingForecasts));
        }
        btn.textContent = 'Search';
        return data;
    } catch (err) {
        btn.textContent = 'Search';
        throw new Error(err.message);
    }
}