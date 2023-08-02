const trySetDate = async (date, setDate, isYearFirst) => {
    var M = '1', D = '1', Y='1';
    M = date.slice(0,2);
    D = date.slice(3,5);
    Y = date.slice(6) >= 2000 && date.slice(6) < 2050 ? 
        date.slice(6) : 'YYYY';
    // If the input date is valid, set it. Otherwise, set date as undefined.
    if([M, D, Y].every(isNum => /^\d+$/.test(isNum))) {
        if(isYearFirst)
            return setDate(`${Y}-${M}-${D}`);
        return setDate(`${M}-${D}-${Y}`);
    } else
        return setDate(undefined);
}

export default trySetDate;