import React, { forwardRef, useContext } from 'react';
import { profileContext } from '../Helpers/profileContext';

import { Button } from '@chakra-ui/react';

const DateFilterButton = forwardRef((props, ref) => {

    const { profile } = useContext(profileContext);

    return (
        <Button ref={ref}
            fontSize={props.fontSize || 16}
            variant='link'
            color={(profile.darkMode) ? 
                (props.active) ? 'white' : 'gray.400' :
                (props.active) ? 'black' : 'gray.500'
            }
            borderBottom={(profile.darkMode) ? 
                (props.active) ? '2px solid white' : '2px solid transparent' :
                (props.active) ? '2px solid black' : '2px solid transparent'
            }
            borderRadius='0'
            textShadow={(props.active) ? '0px 0px 1px' : ''}
            _hover={(props.active) ? { cursor:'default' } : 
                {
                    textShadow:'0px 0px 1px',
                    cursor:'pointer'
                }
            }
            _active={{}}
            paddingInline={props.padding}
            onClick={props.onClick}
        >
            {props.text}
        </Button>
    )
});

export default DateFilterButton;