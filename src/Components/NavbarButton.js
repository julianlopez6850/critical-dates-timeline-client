import { forwardRef } from 'react';

import {
    Button,
    Icon
} from '@chakra-ui/react';

const NavbarButton = forwardRef((props, ref) => {

    return (
        <Button
            ref={ref}
            border='2px solid'
            borderColor={props.borderColor || 'var(--navbar-seperator)'}
            bgColor='black'
            color={props.color || 'var(--background-light)'}
            transition='0s'
            _hover={''}
            _active={''}
            onClick = {props.onClick}
            minWidth='unset'
            minHeight='unset'
            padding='unset'
            boxSize={props.size}
        >
            <Icon boxSize={props.iconSize}>
                {props.icon}
            </Icon>
        </Button>
    )
})

export default NavbarButton;