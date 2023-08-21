import { useEffect, useState } from 'react';

import {
    Text,
    Tooltip
} from '@chakra-ui/react';

import { DateField } from '@mui/x-date-pickers';
import trySetDate from '../Helpers/trySetDate';

const DateInput = (props) => {

    const [inputError, setInputError] = useState(undefined);

    return (
        <Tooltip
            label={inputError ? <Text>{inputError.toUpperCase()}<br/> DEFAULTING TO NO BOUND</Text> : undefined}
        >
            <DateField
                minDate={'2000-01-01'}
                maxDate={'2049-12-31'}
                defaultValue={props.value}
                onChange={() =>
                    setTimeout(() =>
                        trySetDate(document.getElementById(props.elementID).value, props.setDate, false, false)
                )}
                id={props.elementID}
                sx={{
                    width: props.width || '125px',
                    '& .MuiInputBase-root': {
                        color:'white',
                        height: props.height || '30px',
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
                        textAlign:'center',
                        fontSize: props.fontSize
                    },
                }}
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