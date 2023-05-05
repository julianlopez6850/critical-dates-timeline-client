import { Button } from "@chakra-ui/react";

const NavbarButton = (props) => {

    return (
        <Button
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
}

export default NavbarButton;