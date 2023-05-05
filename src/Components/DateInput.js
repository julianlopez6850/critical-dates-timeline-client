import { DateField } from '@mui/x-date-pickers';
import { useState } from 'react';

const DateInput = (props) => {

    const [err, setErr] = useState('');

    const trySetDate = (date, setDate) => {
        if(date) {
            const M = date.$M + 1;
            const D = date.$D;
            setDate(`${date.$y}-${M < 10 && '0' + M || M}-${D < 10 && '0' + D || D}`);
        }
    }

    return (
        <DateField 
            aria-placeholder='Mm-dd-yyyy'
            minDate={'2000-01-01'}
            maxDate={'2049-12-31'} 
            sx={{
                width:'120px',
                '& .MuiInputBase-root': {
                    color:'white',
                    height:'30px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        color:'white',
                        borderColor:'#c0c0c0',

                    }
                },
                ":hover": {
                    '& .MuiOutlinedInput-notchedOutline': {
                        color:'white',
                        borderColor:'white',
                    }
                },
                ":active": {
                    '& .MuiInputBase-root': {
                    '& .MuiOutlinedInput-notchedOutline': {
                        color:'white',
                        borderColor:'white',
                    }}
                }
            }}
            onChange={(value) => {trySetDate(value, props.setDate)}}
            onError={()=>{setErr(err)}}
        />
    )
}

export default DateInput;