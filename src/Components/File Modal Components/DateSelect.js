import Select from 'react-select';

const DateSelect = (props) => {
    return (
        <Select
            className='select'
            options={props.options}
            value={props.value}
            onChange={props.onChange}
            placeholder='Select...'
            isSearchable={false}
            styles={{
                container: (baseStyles) => ({
                    ...baseStyles,
                    width: props.width || 'fit-content',
                }),
                control: (baseStyles) => ({
                    ...baseStyles,
                    minHeight: props.height || '30px',
                    height: props.height || '30px',
                    backgroundColor: 'transparent',
                    border: '1px solid #c0c0c0',
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
                    backgroundColor: state.isFocused ?  '#2a4365' :  '#3a5375',
                    borderTop: '1px solid #c0c0c055',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                    
                }),
                singleValue: (baseStyles) => ({
                    ...baseStyles,
                    width: 'fit-content',
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
                    overflow: 'hidden',
                }),
                menu: (baseStyles) => ({
                    ...baseStyles,
                    color: 'black',
                    backgroundColor: '#3a5375',
                    borderBottom: '1px solid',
                    paddingBlock: '4px',
                }),
                menuList: (baseStyles) => ({
                    ...baseStyles,
                    height:'100px',
                    borderBottom: '1px solid #c0c0c055',
                    padding: '0px',
                }),
                indicatorSeparator: () => ({}),
                indicatorsContainer: (baseStyles) => ({
                    ...baseStyles,
                    height: '100%',
                }),
                dropdownIndicator: (baseStyles) => ({
                    ...baseStyles,
                    color:'hsl(0, 0%, 80%) !important',
                    height: '100%',
                    padding:'0px',
                    alignItems:'center',
                    '&:hover': {}
                }),
                placeholder: (baseStyles) => ({
                    ...baseStyles,
                    width: 'fit-content',
                })
            }}
        />
    )
}

export default DateSelect;