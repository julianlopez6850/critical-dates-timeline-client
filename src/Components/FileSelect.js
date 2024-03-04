import { useState, useContext } from 'react';
import Select from 'react-select';
import { profileContext } from '../Helpers/profileContext';
import { axiosInstance } from '../Helpers/axiosInstance';

const FileSelect = (props) => {
    const {setProfile} = useContext(profileContext);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const validateUser = () => {
        if(process.env.REACT_APP_ENV === 'staging')
            return;
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
            filterOption={(option, input) => {
                input = input.toLowerCase();
                return option.label.toLowerCase().includes(input) || option.data.address.toLowerCase().includes(input);
            }}
            onChange={(e) => {
                props.onChange(e)
                if(!props.isSearchable && e) {
                    props.openFile();
                }
            }}
            onKeyDown={(e) => {
                if(e.key === 'Enter' && !isMenuOpen && props.isSearchable && document.getElementById('file-select-input').value === '') {
                    e.preventDefault();
                    props.openFile();
                }
            }}
            placeholder={props.placeholder}
            inputId='file-select-input'
            styles={{
                container: (baseStyles) => ({
                    ...baseStyles,
                    width: props.fileSelectWidth,
                    minWidth: props.fileSelectWidth,
                    minHeight:'unset',
                    height: props.buttonSize + ' !important',
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
                    alignContent:'center',
                    transition:'0s'
                }),
                option: (baseStyles, state) => ({
                    ...baseStyles,
                    display: 'flex',
                    justifyContent: 'left',
                    color: state.data.status === 'Cancelled' ? '#DD0000' : state.data.status === 'Closed' ? '#00BB00' : 'white',
                    backgroundColor: state.isFocused ? 'gray' : 'var(--navbar-seperator)',
                    borderTop:'1px solid gray',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                    minW:'160px'
                }),
                placeholder: (baseStyles) => ({
                    ...baseStyles,
                    fontSize:props.fileSelectFontSize,
                    textAlign:'center'
                }),
                valueContainer: (baseStyles) => ({
                    ...baseStyles,
                    minHeight: 'inherit',
                    height: 'inherit',
                    alignContent: 'center',
                    width:props.isSearchable ? '' : '0px',
                    height:props.isSearchable ? '' : '0px',
                    padding:props.isSearchable ? '' : '0px',
                    marginLeft:props.isSearchable ? '5px' : '0px',
                }),
                singleValue: (baseStyles) => ({
                    ...baseStyles,
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
                    fontSize:props.fileSelectFontSize,
                    minWidth:'160px'
                }),
                menuList: (baseStyles) => ({
                    ...baseStyles,
                    borderBottom:'1px solid gray',
                    padding:'0px',
                }),
                indicatorSeparator: () => ({
                }),
                indicatorsContainer: (baseStyles) => ({
                    ...baseStyles,
                    minHeight:'inherit',
                    height:'inherit',
                    width:props.indicatorSize,
                    alignSelf:'center',
                    alignItems:'center',
                    justifyContent:'center',
                    border:'none',
                    transition:'0s',
                    margin:'0px',
                }),
                dropdownIndicator: (baseStyles, state) => ({
                    ...baseStyles,
                    color: state.isFocused ? 'hsl(0, 0%, 80%)' : 'hsl(0, 0%, 80%)',
                    height:'inherit',
                    width:'inherit',
                    alignItems:'center',
                    justifyContent:'center',
                    border:'none',
                    padding:'0px',
                    transition:'0s',
                    ":hover":{}
                }),
            }}
        />
    )
}

export default FileSelect;