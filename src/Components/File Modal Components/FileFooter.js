import {
    Text,
    Tooltip,
} from '@chakra-ui/react'

const FileFooter = (props) => {
    return (
        <Tooltip
            maxW='848px'
            placement='bottom-start'
            label={(props.displayedFileNo && props.fileRef) && `${props.displayedFileNo} || ${props.fileRef}`}
            textAlign='justify'
        >
            <Text color='gray.300' maxW='100%' h='24px' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'>
                {props.displayedFileNo || '## - ###'} || {props.fileRef || '{File Reference}'}
            </Text>
        </Tooltip>
    )
}

export default FileFooter;