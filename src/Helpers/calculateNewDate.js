import leadingZero from '../Helpers/leadingZero';

// This function adds or subtracts days from a given Date, and returns the closest weekday.
const calculateNewDate = (fromDate, direction, numDays, setDate) => {
    if(fromDate === undefined)
        return setDate(undefined);

    var date = new Date(fromDate);
    date = new Date(date.getTime() + direction * numDays * 24 * 60 * 60 * 1000);
    const timezoneOffset = date.getTimezoneOffset() * 60 * 1000;
    date = new Date(date.getTime() + timezoneOffset);

    const fallsOnSun = (date.getDay() === 0);
    const fallsOnSat = (date.getDay() === 6);
    const fallsOnWeekend = (fallsOnSat || fallsOnSun);
    const before = (direction === -1);
    const after = (direction === 1);

    // Logic for handling weekends.
    if(fallsOnWeekend && before) {
        if(fallsOnSun)
            date = new Date(date.getTime() - 24 * 60 * 60 * 1000);
        date = new Date(date.getTime() - 24 * 60 * 60 * 1000);
    } else if(fallsOnWeekend && after) {
        if(fallsOnSat && (numDays <= 5)) {
            date = new Date(date.getTime() + 2 * 24 * 60 * 60 * 1000);
        } else if(fallsOnSat) {
            date = new Date(date.getTime() - 24 * 60 * 60 * 1000);
        } else {
            date = new Date(date.getTime() + 24 * 60 * 60 * 1000);
        }
    }
    // If the resulting date originally falls on a Sunday when the timezone change takes effect, correct the one-hour inaccuracy
    // (this only occures twice a year: the second Sunday of March and the first Sunday of November).
    if(date.getHours() === 23)
        date = new Date(date.getTime() + 60 * 60 * 1000)
    else if(date.getHours() === 1)
        date = new Date(date.getTime() - 60 * 60 * 1000)

    setDate(`${date.getYear() + 1900}-${leadingZero(date.getMonth() + 1)}-${leadingZero(date.getDate())}`);
}

export default calculateNewDate;