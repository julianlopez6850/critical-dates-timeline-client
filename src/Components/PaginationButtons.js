import {
    HStack,
    Button,
} from '@chakra-ui/react';

import PageLimitPopover from './PageLimitPopover';

const PaginationButtons = (props) => {
    return (
        <HStack spacing='0' w='fit-content' alignSelf='end'>
            <Button
                minW='unset'
                h={props.paginationH}
                fontSize={props.paginationFontSize}
                paddingInline={props.paginationPadding}
                bgColor='transparent'
                _hover={{bgColor:props.profile.darkMode ? 'whiteAlpha.300' : 'blackAlpha.300'}}
                isDisabled={props.pageNum === 1}
                onClick={() => {
                    props.setLoading(true);
                    props.setPageNum(1);
                    window.scroll(0,0);
                }}
            >
                {`<<`}
            </Button>
            <Button
                _before={{
                    display:'block',
                    fontSize:props.paginationFontSize,
                    height:0,
                    visibility:'hidden',
                    content:`"<<"`
                }}
                minW='unset'
                h={props.paginationH}
                display='inline-block'
                fontSize={props.paginationFontSize}
                paddingInline={props.paginationPadding}
                bgColor='transparent'
                _hover={{bgColor:props.profile.darkMode ? 'whiteAlpha.300' : 'blackAlpha.300'}}
                isDisabled={props.pageNum === 1}
                onClick={() => {
                    props.setLoading(true);
                    props.setPageNum(page => 
                        Math.max(page - 1, 1)
                    );
                    window.scroll(0,0);
                }}
            >
                {`<`}
            </Button>
            <PageLimitPopover
                height={props.paginationH}
                fontSize={props.paginationFontSize}
                profile={props.profile}
                bounds={props.bounds}
                total={props.total}
                setPageNum={props.setPageNum}
                limit={props.limit}
                setLimit={props.setLimit}
                direction={props.popoverDir}
            />
            <Button
                _before={{
                    display:'block',
                    fontSize:props.paginationFontSize,
                    height:0,
                    visibility:'hidden',
                    content:`">>"`
                }}
                minW='unset'
                h={props.paginationH}
                display='inline-block'
                fontSize={props.paginationFontSize}
                paddingInline={props.paginationPadding}
                bgColor='transparent'
                _hover={{bgColor:props.profile.darkMode ? 'whiteAlpha.300' : 'blackAlpha.300'}}
                isDisabled={props.bounds[1] === props.total}
                onClick={() => {
                    props.setLoading(true);
                    props.setPageNum(page => {
                        if(props.bounds[1] < props.total) return page + 1;
                        return page;
                    });
                    window.scroll(0,0);
                }}
            >
                {`>`}
            </Button>
            {
            <Button
                minW='unset'
                h={props.paginationH}
                fontSize={props.paginationFontSize}
                paddingInline={props.paginationPadding}
                bgColor='transparent'
                _hover={{bgColor:props.profile.darkMode ? 'whiteAlpha.300' : 'blackAlpha.300'}}
                isDisabled={props.bounds[1] === props.total}
                onClick={() => {
                    props.setLoading(true);
                    props.setPageNum(Math.ceil(props.total / props.limit));
                    window.scroll(0,0);
                }}
            >
                {`>>`}
            </Button> }
        </HStack>
    )
}

export default PaginationButtons;