import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../Helpers/axiosInstance'

import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    useToast,
    VStack,
    Text,
} from '@chakra-ui/react'

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [error, setError] = useState(0)
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const toast = useToast();
 
    // If a user is already authenticated, navigate to the main page.
    useEffect(() => {
        axiosInstance.get(`${process.env.REACT_APP_API_URL}/auth/profile`).then(() => {
            setTimeout(() => navigate('/'), 100);
        }).catch(function (error) {
            if (!error.response)
                console.warn('ERROR: Server is currently unavailable. Please try again later.');
        });
    }, [])

    // Call the login API endpoint with the user-given credentials to attempt to authenticate the user.
    const tryLogin = () => {
        axiosInstance.post(`${process.env.REACT_APP_API_URL}/auth/login`, { username: username, password: password}).then(() => {
            console.info(`You are now logged in as ${username.toUpperCase()}`);
            setTimeout(() => navigate('/'), 1500);
            if(!toast.isActive(''))
                toast({
                    position: 'top',
                    id: '',
                    title: 'SUCCESS',
                    description: `You are now logged in as ${username}.`,
                    status: 'success',
                    duration: 2000,
                    isClosable: false
                })
        }).catch(async function (error) {
            if (error.response)
                setErrorMessage(error.response.data.error);
            else if (error.request)
                setErrorMessage('There was an error processing the request... Try again later');
            else
                setErrorMessage(error.message);
            setError(error => error + 1)
        });
    }

    // Handle sending error toast notifications to the user whenever an error occurs.
    useEffect(() => {
        if(!errorMessage)
            return

        toast.closeAll();
        setTimeout(() => {
            toast({
                position: 'top',
                title: 'ERROR',
                description: errorMessage,
                status: 'error',
                duration: 5000,
                isClosable: false
            });
        }, 250);
    }, [error])

    // Handle ENTER key press to call the tryLogin() method.
    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                tryLogin();
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => document.removeEventListener('keydown', keyDownHandler);
    }, [ username, password ]);

    return (
        <VStack h='400px' justify='center'>
            <Text fontSize='20' fontWeight='bold'>
                LOGIN
            </Text>
            <VStack justifyContent='center' alignItems='center'>
                <FormControl style={{width:'300px'}}>

                    <FormLabel>Username</FormLabel>
                    <Input
                        border='2px solid'
                        borderColor='gray.500'
                        _hover={{}}
                        type='text'
                        isRequired={true}
                        placeholder='Username'
                        onChange={(e) => {setUsername(e.target.value)}}
                        autoFocus
                    />
                    
                    <FormHelperText><br/></FormHelperText>

                    <FormLabel>Password</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            border='2px solid'
                            borderColor='gray.500'
                            _hover={{}}
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            isRequired={true}
                            onChange={(e) => {setPassword(e.target.value)}}
                            placeholder='Password'
                        />
                        <InputRightElement width='4.5rem'>
                            <Button 
                                h='1.75rem'
                                size='sm'
                                bgColor='blue.500'
                                color='white'
                                _hover={{
                                    bg:'blue.600',
                                    color:'white'
                                }}
                                _active={{
                                    bg:'blue.600',
                                    color:'gray.200'
                                }}
                                onClick={() => {setShow(!show)}}
                            >
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>

                    <Button
                        mt={50}
                        type='submit'
                        bgColor='blue.500'
                        color='white'
                        _hover={{
                            bg: 'blue.600',
                            color: 'white'
                        }}
                        _active={{
                            bg: 'blue.600',
                            color: 'gray.200'
                        }}
                        onClick={() => {tryLogin()}}
                    >
                        LOGIN
                    </Button>
                </FormControl>
            </VStack>
        </VStack>
    );
}

export default Login;