import { forwardRef } from 'react';

import { Button } from '@chakra-ui/react';

const NavbarButton = forwardRef((props, ref) => {

    return (
        <Button
            ref={ref}
            border='2px solid'
            borderColor={'var(--navbar-seperator)'}
            bgColor='black'
            color='var(--background-light)'
            transition='0s'
            _hover={''}
            _active={''}
            onClick = {props.onClick}
        >
            {props.icon}
            {props.text}
        </Button>
    )
})

export default NavbarButton;