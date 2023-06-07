import React, { forwardRef, useContext } from "react";
import { Button, } from "@chakra-ui/react";
import { themeContext } from "../Helpers/themeContext";

const DateFilterButton = forwardRef(function DateTypeButton(props, ref) {

    const { theme, setTheme } = useContext(themeContext);

    return (
        <Button ref={ref}
            variant='link'
            color={(theme) ? 
                (props.active) ? 'black' : 'gray.500' :
                (props.active) ? 'white' : 'gray.400'
            }
            borderBottom={(theme) ? 
                (props.active) ? '2px solid black' : '2px solid transparent' :
                (props.active) ? '2px solid white' : '2px solid transparent'
            }
            borderRadius='0'
            textShadow={(props.active) ? '0px 0px 1px' : ''}
            _hover={(props.active) ? {
                cursor:'default'} : theme ?
                {
                    textShadow:'0px 0px 1px',
                    cursor:'pointer'
                } : 
                {
                    textShadow:'0px 0px 1px',
                    cursor:'pointer'
                }
            }
            _active={{}}
            p='0px 10px 0px 10px'
            onClick={props.onClick}
        >
            {props.text}
        </Button>
    )
});

export default DateFilterButton;