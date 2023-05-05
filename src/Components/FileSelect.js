import Select from "react-select";

export const FileSelect = (props) => {
  
    return (
      <Select
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