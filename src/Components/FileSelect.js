import { useContext } from 'react';
import Select from "react-select";
import { profileContext } from '../Helpers/profileContext';
import { axiosInstance } from '../Helpers/axiosInstance';

export const FileSelect = (props) => {
    const {profile, setProfile} = useContext(profileContext);

    const validateUser = () => {
        axiosInstance.get(`http://localhost:5000/auth/profile`).then((response) => {
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
            onMenuOpen={()=>{validateUser()}}
            className='select'
            options={props.options}
            value={props.value}
            onChange={props.onChange}
            placeholder='Select File...'
            styles={{
                container: (baseStyles) => ({
                    ...baseStyles,
                    width:'200px',
                    minWidth:'200px'
                }),
                control: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: 'black',
                    border: '2px solid var(--navbar-seperator)',
                    '&:hover': {
                        borderColor: 'gray',
                        cursor: 'pointer',
                    },
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
                    overflow:'hidden'
                }),
                menu: (baseStyles) => ({
                    ...baseStyles,
                    color: 'black',
                    backgroundColor: 'var(--navbar-seperator)',
                    borderBottom:'1px solid',
                    paddingBlock:'4px',
                }),
                menuList: (baseStyles) => ({
                    ...baseStyles,
                    borderBottom:'1px solid gray',
                    padding:'0px',
                }),
                indicatorSeparator: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: state.isFocused ? 'gray' : 'white',
                }),
            }}
        />
    )
  }