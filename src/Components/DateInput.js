import { useState } from 'react';

import { DateField } from '@mui/x-date-pickers';
import { Text, Tooltip } from '@chakra-ui/react';

const DateInput = (props) => {

    const [inputError, setInputError] = useState(undefined);

    const trySetDate = async (setDate) => {
        var M = '1', D = '1', Y='1';
        setTimeout(()=>{
            M = document.getElementById(props.elementID).value.slice(0,2);
            D = document.getElementById(props.elementID).value.slice(3,5);
            Y = document.getElementById(props.elementID).value.slice(6) >= 2000 && document.getElementById(props.elementID).value.slice(6) < 2050 ? 
                document.getElementById(props.elementID).value.slice(6) : 'YYYY';
            // If the input date is valid, set it. Otherwise, set date as undefined.
            if([M, D, Y].every(isNum => /^\d+$/.test(isNum)))
                setDate(`${M}-${D}-${Y}`);
            else
                setDate(undefined);
        });
    }

    return (
        <Tooltip
            label={inputError ? <Text>{inputError.toUpperCase()}<br/> DEFAULTING TO NO BOUND</Text> : undefined}
        >
            <DateField
                aria-placeholder='MM-DD-YYYY'
                minDate={'2000-01-01'}
                maxDate={'2049-12-31'}
                id={props.elementID}
                sx={{
                    width:'125px',
                    '& .MuiInputBase-root': {
                        color:'white',
                        height:'30px',
                        '& .MuiOutlinedInput-notchedOutline': {
                            color:'white',
                            borderColor:'#c0c0c0',

                        }
                    },
                    ':hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            color:'white',
                            borderColor:'white',
                        }
                    },
                    ':active': {
                        '& .MuiInputBase-root': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            color:'white',
                            borderColor:'white',
                        }}
                    },
                    '& .MuiInputBase-input': {
                        padding:'0px',
                        textAlign:'center'
                    },
                }}
                onKeyDown={() => {trySetDate(props.setDate)}}
                onError={(err) => {
                    if(err === null)
                        return setInputError(undefined);
                    if(err === 'invalidDate')
                        return setInputError('Incomplete Date Entered.');
                    if(err === 'maxDate')
                        return setInputError('Date cannot be after 2049.');
                    if(err === 'minDate')
                        return setInputError('Date cannot be before 2000.');
                    return setInputError(`ERROR: ${err}`);
                }}
            />
        </Tooltip>
    )
}

export default DateInput;