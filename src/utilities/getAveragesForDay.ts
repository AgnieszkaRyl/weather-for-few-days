
const KELVIN_CONST = 273;
export const getAveragesForDay = (dayData): {} => {
    let day = [];
    let night = [];
    dayData[0].forEach((elem) => {
        const date = new Date(elem.dt_txt);
        if (date.getHours() >= 7 && date.getHours() <= 19) {
            day.push(elem);
        } else {
            night.push(elem);
        }
    })

    let dayAverageTemp = 0;
    let dayAverageHumidity = 0;
    let dayAveragePressure = 0;
    let elementsDay = 0;
    day.forEach((elem) => {
        dayAverageTemp += elem.main.temp;
        dayAverageHumidity += elem.main.humidity;
        dayAveragePressure += elem.main.pressure;
        elementsDay++;
    })
    dayAverageTemp = dayAverageTemp / elementsDay - KELVIN_CONST;
    dayAverageHumidity = dayAverageHumidity / elementsDay;
    dayAveragePressure = dayAveragePressure / elementsDay;

    let nightAverageTemp = 0;
    let nightAverageHumidity = 0;
    let nightAveragePressure = 0;
    let nightElements = 0;
    night.forEach((elem) => {
        nightAverageTemp += elem.main.temp;
        nightAverageHumidity += elem.main.humidity;
        nightAveragePressure += elem.main.pressure;
        nightElements++;
    })
    nightAverageTemp = nightAverageTemp / nightElements - KELVIN_CONST;
    nightAverageHumidity = nightAverageHumidity / nightElements;
    nightAveragePressure = nightAveragePressure / nightElements;

    return {
        dayAverageTemp,
        dayAverageHumidity,
        dayAveragePressure,
        nightAverageTemp,
        nightAverageHumidity,
        nightAveragePressure
    };
}