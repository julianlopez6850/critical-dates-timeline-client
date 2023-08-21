const trySetDate = async (date, setDate, isYearFirst, returnYearFirst = true) => {
    var M = '1', D = '1', Y='1';
    // Get Day, Month, and Year values depending on how the date is formatted.
    if(isYearFirst) {
        M = date.slice(5,7);
        D = date.slice(8,10);
        Y = date.slice(0,4) >= 2000 && date.slice(0,4) < 2050 ? 
            date.slice(0,4) : 'YYYY';
    } else {
        M = date.slice(0,2);
        D = date.slice(3,5);
        Y = date.slice(6) >= 2000 && date.slice(6) < 2050 ? 
            date.slice(6) : 'YYYY';
    }
    // If the input date is valid, set it. Otherwise, set date as undefined.
    if([M, D, Y].every(isNum => /^\d+$/.test(isNum))) {
        // If returnYearFirst, return as 'YYYY-MM-DD'. Otherwise, return as 'MM-DD-YYYY'
        if(returnYearFirst)
            return setDate(`${Y}-${M}-${D}`);
        return setDate(`${M}-${D}-${Y}`);
    } else
        return setDate(undefined);
}

export default trySetDate;