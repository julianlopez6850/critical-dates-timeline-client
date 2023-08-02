const leadingZero = (num) => {
    num = parseInt(num);
    if(num < 0 && num > -10)
        return '-0' + Math.abs(num);
    else if(num < 10)
        return '0' + num;
    return num;
}

export default leadingZero;