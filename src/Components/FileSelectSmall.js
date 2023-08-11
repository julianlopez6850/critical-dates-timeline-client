import { useState, useContext } from 'react';
import Select from 'react-select';
import { profileContext } from '../Helpers/profileContext';
import { axiosInstance } from '../Helpers/axiosInstance';

const FileSelect = (props) => {
    const {setProfile} = useContext(profileContext);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const validateUser = () => {
        axiosInstance.get(`${process.env.REACT_APP_API_URL}/auth/profile`).then((response) => {
            setProfile(profile => {
                return {...profile, loggedIn: true, user: response.data.username }
            })
        }).catch(function (error) {
            setProfile(profile => {
                return {...profile, loggedIn: false, user: '' }
            })
            if (error.response)
                console.warn('You are not logged in. Please log in to view this content.');
            else
                console.warn('ERROR: Server is currently unavailable. Please try again later.');
        });
    }

    return (
        <Select
            onMenuOpen={() => { validateUser(); setIsMenuOpen(true) }}
            onMenuClose={() => { setIsMenuOpen(false) }}
            className='select'
            options={props.options}
            value={props.value}
            onChange={props.onChange}
            onKeyDown={(e) => {
                if(e.key === 'Enter' && !isMenuOpen && document.getElementById('file-select-input').value === '') {
                    console.log()
                    e.preventDefault();
                    props.openFile();
                }
            }}
            placeholder=''
            inputId='file-select-input'
            styles={{
                container: (baseStyles) => ({
                    ...baseStyles,
                    width: props.width,
                    minWidth: props.width,
                    minHeight:'unset',
                    height: props.height + ' !important',
                    transition:'0s'
                }),
                control: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: 'black',
                    border: '2px solid var(--navbar-seperator)',
                    '&:hover': {
                        borderColor: 'gray',
                        cursor: 'pointer',
                    },
                    minHeight: 'inherit',
                    height: 'inherit',
                    alignContent: 'center',
                    transition:'0s'
                }),
                option: (baseStyles, state) => ({
                    ...baseStyles,
                    display: 'flex',
                    justifyContent: 'left',
                    color: 'white',
                    backgroundColor: state.isFocused ? 'gray' : 'var(--navbar-seperator)',
                    borderTop:'1px solid gray',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                }),
                placeholder: (baseStyles) => ({
                    ...baseStyles,
                    fontSize:props.fontSize
                }),
                valueContainer: (baseStyles) => ({
                    ...baseStyles,
                    minHeight: 'inherit',
                    height: 'inherit',
                    alignContent: 'center',
                }),
                singleValue: (baseStyles) => ({
                    ...baseStyles,
                    display: 'flex',
                    justifyContent: 'left',
                    color: 'white',
                }),
                input: (baseStyles) => ({
                    ...baseStyles,
                    color: 'white',
                    '&:hover': {
                        cursor: 'text',
                    },
                    overflow:'hidden',
                    minHeight:'inherit',
                    height:'inherit',
                }),
                menu: (baseStyles) => ({
                    ...baseStyles,
                    color: 'black',
                    backgroundColor: 'var(--navbar-seperator)',
                    borderBottom:'1px solid',
                    paddingBlock:'4px',
                    fontSize:props.fontSize,
                }),
                menuList: (baseStyles) => ({
                    ...baseStyles,
                    borderBottom:'1px solid gray',
                    padding:'0px',
                }),
                indicatorSeparator: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: state.isFocused ? 'hsl(0, 0%, 80%)' : 'hsl(0, 0%, 80%)',
                    transition:'0s'
                }),
                indicatorsContainer: (baseStyles) => ({
                    ...baseStyles,
                    minHeight:'inherit',
                    height:'inherit',
                    transition:'0s',
                    margin:'2px'
                }),
                dropdownIndicator: (baseStyles, state) => ({
                    ...baseStyles,
                    color: state.isFocused ? 'hsl(0, 0%, 80%)' : 'hsl(0, 0%, 80%)',
                    minHeight:'inherit',
                    height:'inherit',
                    transition:'0s',
                    margin:'2px',
                    ":hover":{}
                }),
            }}
        />
    )
}

export default FileSelect;