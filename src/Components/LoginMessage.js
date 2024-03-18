import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Text
} from '@chakra-ui/react'

import DateFilterButton from '../Components/DateFilterButton';

function LoginMessage() {
    const navigate = useNavigate();

    const [fontSize, setFontSize] = useState('24px');

    useEffect(() => {
        const windowListener = () => {
            if(window.innerWidth >= 1200) {
                setFontSize('24px');
            } else if(window.innerWidth >= 950) {
                setFontSize('21px');
            } else if(window.innerWidth >= 650) {
                setFontSize('18px');
            } else if(window.innerWidth >= 420) {
                setFontSize('15px');
            } else {
                setFontSize('12px');
            };
        };
        windowListener();
        window.addEventListener('resize', windowListener);
        return () => window.removeEventListener('resize', windowListener);
    }, []);

    return (
        <>
            <Text>
                {`Welcome Guest! Please Login to View This Page.`}
            </Text>
            <DateFilterButton
                text={'Login'}
                onClick={() => {navigate('/login')}}
                active={false}
                fontSize={fontSize}
            />
        </>
    )
}

export default LoginMessage;