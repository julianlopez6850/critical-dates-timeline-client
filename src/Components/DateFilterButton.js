import React, { forwardRef, useContext } from 'react';
import { profileContext } from '../Helpers/profileContext';

import { Button } from '@chakra-ui/react';

const DateFilterButton = forwardRef((props, ref) => {

    const { profile } = useContext(profileContext);

    return (
        <Button
            ref={ref}
            display='inline-block'
            _before={{
                display:'block',
                height:0,
                fontWeight:'bold',
                visibility:'hidden',
                content:`"${props.text}"`
            }}
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
            fontWeight={(props.active) ? 'bold' : 'normal'}
            _hover={(props.active) ? { cursor:'default' } :
                {
                    fontWeight:'bold',
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