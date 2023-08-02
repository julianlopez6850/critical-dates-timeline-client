import leadingZero from '../Helpers/leadingZero';

const calculateNewDate = (fromDate, direction, numDays, setDate) => {
    if(fromDate === undefined)
        return setDate(undefined);

    var date = new Date(fromDate);
    const timezoneOffset = date.getTimezoneOffset() * 60 * 1000;
    var date = new Date(date.getTime() + timezoneOffset + (direction * numDays * 24 * 60 * 60 * 1000));

    const fallsOnSun = (date.getDay() === 0);
    const fallsOnSat = (date.getDay() === 6);
    const fallsOnWeekend = (fallsOnSat || fallsOnSun);
    const before = (direction === -1);
    const after = (direction === 1);

    // Logic for handling weekends.
    if(fallsOnWeekend && before) {
        if(fallsOnSun)
            date = new Date(date.getTime() + timezoneOffset + (-1 * 24 * 60 * 60 * 1000));
        date = new Date(date.getTime() + timezoneOffset + (-1 * 24 * 60 * 60 * 1000));
    } else if(fallsOnWeekend && after) {
        if(fallsOnSat && (numDays <= 5)) {
            date = new Date(date.getTime() + timezoneOffset + (2 * 24 * 60 * 60 * 1000));
        } else if(fallsOnSat) {
            date = new Date(date.getTime() + timezoneOffset + (-1 * 24 * 60 * 60 * 1000));
        } else {
            date = new Date(date.getTime() + timezoneOffset + (1 * 24 * 60 * 60 * 1000));
        }
    }

    setDate(`${date.getYear() + 1900}-${leadingZero(date.getMonth() + 1)}-${leadingZero(date.getDate())}`);
}

export default calculateNewDate;