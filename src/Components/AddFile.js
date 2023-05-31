import React, { useState, useEffect } from 'react';

import axios from 'axios';

import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    HStack,
    VStack,
    Text,
    Switch,
    Divider,
    Tabs,
    TabList,
    Tab,
    Tooltip,
    Input,
    FormLabel,
    StackDivider,
    Textarea,
    useToast,
    Menu,
    Box,
    NumberInput,
    NumberInputField,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    Checkbox,
  } from '@chakra-ui/react'
import { ChevronDownIcon, LockIcon, UnlockIcon, } from '@chakra-ui/icons';

const AddFile = (props) => {
    
    const toast = useToast();
    
    const [fileNo, setFileNo] = useState('');
    const [displayedFileNo, setDisplayedFileNo] = useState('');
    const [fileRef, setFileRef] = useState('');
    const [whoRepresenting, setWhoRepresenting] = useState(false); // true = Seller, false = Buyer
    const [isPurchase, setIsPurchase] = useState(true); // true = Purchase, false = REFI
    const [buyer, setBuyer] = useState(''); // buyer name
    const [seller, setSeller] = useState(''); // seller name
    const [propertyAddress, setPropertyAddress] = useState(''); // property address
    const [folioNo, setFolioNo] = useState('');
    const [notes, setNotes] = useState('');

    const [isSellerDocs, setIsSellerDocs] = useState(false);
    const [isBuyerDocs, setIsBuyerDocs] = useState(false);
    const [isEscrowAgent, setIsEscrowAgent] = useState(false);
    const [isTitleAgent, setIsTitleAgent] = useState(false);
    const [isClosingAgent, setIsClosingAgent] = useState(false);

    const[roles, setRoles] = useState({
        isSellerDocs: false,
        isBuyerDocs: false,
        isEscrowAgent: false,
        isTitleAgent: false,
        isClosingAgent: false,
    })

    const rolesButtons = [
        { label: 'Seller Docs', value: isSellerDocs, set: setIsSellerDocs },
        { label: 'Buyer Docs', value: isBuyerDocs, set: setIsBuyerDocs },
        { label: 'Escrow Agent', value: isEscrowAgent, set: setIsEscrowAgent },
        { label: 'Title Agent', value: isTitleAgent, set: setIsTitleAgent },
        { label: 'Closing Agent', value: isClosingAgent, set: setIsClosingAgent },
    ]

    const [effective, setEffective] = useState('');
    const [depositInit, setDepositInit] = useState('');
    const [depositSecond, setDepositSecond] = useState('');
    const [depositThird, setDepositThird] = useState('');
    const [inspection, setInspection] = useState('');
    const [closing, setClosing] = useState('');

    const [isEscrowReceived, setIsEscrowReceived] = useState('');
    const [isLienRequested, setIsLienRequested] = useState('');
    const [isTitleOrdered, setIsTitleOrdered] = useState('');
    const [isLienReceived, setIsLienReceived] = useState('');
    const [isTitleReceived, setIsTitleReceived] = useState('');
    const [isSellerDocsDrafted, setIsSellerDocsDrafted] = useState('');
    const [isSellerDocsApproved, setIsSellerDocsApproved] = useState('');
    const [isBuyerDocsDrafted, setIsBuyerDocsDrafted] = useState('');
    const [isBuyerDocsApproved, setIsBuyerDocsApproved] = useState('');
    
    const [taskCompleteness, setTaskCompleteness] = useState({
        isEscrowReceived: false,
        isLienRequested: false,
        isTitleOrdered: false,
        isLienReceived: false,
        isTitleReceived: false,
        isSellerDocsDrafted: false,
        isBuyerDocsDrafted: false,
        isSellerDocsApproved: false,
        isBuyerDocsApproved: false,
    })

    const taskCompletenessChecks = [
        { label: 'Escrow Fully Received?', role: true, value: isEscrowReceived, set: setIsEscrowReceived },
        { label: 'Lien Search Requested?', role: isTitleAgent, value: isLienRequested, set: setIsLienRequested },
        { label: 'Title Work Ordered?', role: isTitleAgent, value: isTitleOrdered, set: setIsTitleOrdered },
        { label: 'Lien Search Received?', role: isTitleAgent, value: isLienReceived, set: setIsLienReceived },
        { label: 'Title Work Received?', role: isTitleAgent, value: isTitleReceived, set: setIsTitleReceived },
        { label: 'Seller Docs Drafted?', role: isSellerDocs, value: isSellerDocsDrafted, set: setIsSellerDocsDrafted },
        { label: 'Buyer Docs Drafted?', role: isBuyerDocs, value: isBuyerDocsDrafted, set: setIsBuyerDocsDrafted },
        { label: 'Seller Docs Approved?', role: isSellerDocs, value: isSellerDocsApproved, set: setIsSellerDocsApproved },
        { label: 'Buyer Docs Approved?', role: isBuyerDocs, value: isBuyerDocsApproved, set: setIsBuyerDocsApproved },
    ]

    const [isClosed, setIsClosed] = useState('');
    const [isClosedEffective, setIsClosedEffective] = useState(false);
    const [isClosedDepositInit, setIsClosedDepositInit] = useState(false);
    const [isClosedDepositSecond, setIsClosedDepositSecond] = useState(false);
    const [isClosedDepositThird, setIsClosedDepositThird] = useState(false);
    const [isClosedInspection, setIsClosedInspection] = useState(false);
    const [isClosedClosing, setIsClosedClosing] = useState(false);

    const dates = [
        {
            label: 'Effective', 
            value: effective, 
            setValue: setEffective, 
            isClosed: isClosedEffective, 
            setIsClosed: setIsClosedEffective
        },
        {
            label: 'Deposit 1', 
            value: depositInit, 
            setValue: setDepositInit, 
            isClosed: isClosedDepositInit, 
            setIsClosed: setIsClosedDepositInit
        },
        {
            label: 'Deposit 2', 
            value: depositSecond, 
            setValue: setDepositSecond, 
            isClosed: isClosedDepositSecond, 
            setIsClosed: setIsClosedDepositSecond
        },
        {
            label: 'Deposit 3', 
            value: depositThird, 
            setValue: setDepositThird, 
            isClosed: isClosedDepositThird, 
            setIsClosed: setIsClosedDepositThird
        },
        {
            label: 'Inspection', 
            value: inspection, 
            setValue: setInspection, 
            isClosed: isClosedInspection, 
            setIsClosed: setIsClosedInspection
        },
        {
            label: 'Closing', 
            value: closing, 
            setValue: setClosing, 
            isClosed: isClosedClosing, 
            setIsClosed: setIsClosedClosing
        }
    ]

    const [isFileNoError, setIsFileNoError] = useState('File Number must be entered.')
    const [isFileRefError, setIsFileRefError] = useState('File Reference must be entered.')
    const [isBuyerError, setIsBuyerError] = useState('Buyer/Borrower must be entered.')
    const [isSellerError, setIsSellerError] = useState('Seller/Lender must be entered.')
    const [isPropertyError, setIsPropertyError] = useState('Property Address must be entered.')
    const [isEffectiveError, setIsEffectiveError] = useState('File Effective Date must be entered.')
    const [isClosingError, setIsClosingError] = useState('File Closing Date must be entered.')

    useEffect(() => {
        if(fileNo.length > 2) {
            setDisplayedFileNo(`${fileNo.slice(0,2)} - ${fileNo.slice(2, fileNo.length)}`);
        } else {
            setDisplayedFileNo(fileNo)
        }
    }, [fileNo])

    useEffect(() => {
        setRoles(
            {
                isSellerDocs: isSellerDocs,
                isBuyerDocs: isBuyerDocs,
                isEscrowAgent: isEscrowAgent,
                isTitleAgent: isTitleAgent,
                isClosingAgent: isClosingAgent,
            })
    }, [isSellerDocs, isBuyerDocs, isEscrowAgent, isTitleAgent, isClosingAgent]);

    useEffect(() => {
        const isNum = /^\d+$/.test(fileNo);
        if(fileNo === '')
            setIsFileNoError('File Number must be entered.')
        else if(!isNum)
            setIsFileNoError('File Number must contain only digits.')
        else if(fileNo.length < 5)
            setIsFileNoError(`File Number must be 5 digits. ex. ${(new Date().getFullYear()).toString().slice(-2)}001`)
        else
            setIsFileNoError(false)
    }, [fileNo])

    useEffect(() => {
        if(fileRef === '')
            setIsFileRefError('File Reference must be entered')
        else
            setIsFileRefError(false);
    }, [fileRef])

    useEffect(() => {
        if(!effective)
            setIsEffectiveError('File Effective Date must be entered.');
        else
            setIsEffectiveError(false);
    }, [effective])

    useEffect(() => {
        if(!closing)
            setIsClosingError('File Closing Date must be entered.');
        else
            setIsClosingError(false);
    }, [closing])

    useEffect(() => {
        if(!buyer)
            setIsBuyerError('Buyer/Borrower must be entered.');
        else
            setIsBuyerError(false);
    }, [buyer])

    useEffect(() => {
        if(!seller)
            setIsSellerError('Seller/Lender must be entered.');
        else
            setIsSellerError(false);
    }, [seller])

    useEffect(() => {
        if(!propertyAddress)
            setIsPropertyError('Property Address must be entered.');
        else
            setIsPropertyError(false);
    }, [propertyAddress])

    const resetAllValues = () => {
        setFileNo('');
        setDisplayedFileNo('');
        setFileRef('');
        setWhoRepresenting(false);
        setIsPurchase(true);
        setBuyer('')
        setSeller('')
        setPropertyAddress('')
        setFolioNo('');
        setNotes('');
        setIsSellerDocs(false);
        setIsBuyerDocs(false);
        setIsEscrowAgent(false);
        setIsTitleAgent(false);
        setIsClosingAgent(false);
        setRoles({
            isSellerDocs: false,
            isBuyerDocs: false,
            isEscrowAgent: false,
            isTitleAgent: false,
            isClosingAgent: false,
        });
        setEffective('00-00-0000');
        setDepositInit('00-00-0000');
        setDepositSecond('00-00-0000');
        setDepositThird('00-00-0000');
        setInspection('00-00-0000');
        setClosing('00-00-0000');
        setIsEscrowReceived('');
        setIsLienRequested('');
        setIsTitleOrdered('');
        setIsLienReceived('');
        setIsTitleReceived('');
        setIsSellerDocsDrafted('');
        setIsSellerDocsApproved('');
        setIsBuyerDocsDrafted('');
        setIsBuyerDocsApproved('');
        setIsClosed('');
    }

    useEffect(() => {
        if(effective === '00-00-0000') {
            setEffective('')
        }
    }, [effective])
    useEffect(() => {
        if(depositInit === '00-00-0000') {
            setDepositInit('')
        }
    }, [depositInit])
    useEffect(() => {
        if(depositSecond === '00-00-0000') {
            setDepositSecond('')
        }
    }, [depositSecond])
    useEffect(() => {
        if(depositThird === '00-00-0000') {
            setDepositThird('')
        }
    }, [depositThird])
    useEffect(() => {
        if(inspection === '00-00-0000') {
            setInspection('')
        }
    }, [inspection])
    useEffect(() => {
        if(closing === '00-00-0000') {
            setClosing('')
        }
    }, [closing])

    const forceResetDate = (value, setValue) => {
        if(value === '') {
            setValue('00-00-0000')
        }
    }

    const trySaveFile = () => {
        var error = isFileNoError || isFileRefError || isBuyerError || isSellerError || isPropertyError || isEffectiveError || isClosingError
        if(error) {
            console.log('ERROR: Invalid or Missing Input.')
            toast({
                title: 'Error.',
                description: error,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
            return;
        }

        const file = {
            fileNumber: fileNo,
            fileRef: fileRef,
            address: propertyAddress,
            folioNo: folioNo,
            buyer: buyer,
            seller: seller,
            effective: effective,
            depositInitial: depositInit || null,
            depositSecond: depositSecond || null,
            depositThird: depositThird || null,
            inspection: inspection || null,
            closing: closing,
            notes: notes,
            isClosed: isClosed,
            representing: whoRepresenting,
            isPurchase: isPurchase,
            roles: JSON.stringify(roles),
        }

        axios.post(`http://localhost:5000/files`, file).then((response) => {
            props.onClose();
            resetAllValues();
        }).catch((err) => {
            if(err.response && err.response.data.message === "This file already exists.") {
                console.log('ERROR. This file number already exists.')
                toast({
                    title: 'Error.',
                    description: `${err.response.data.message}`,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            } else {
                console.log('ERROR. We encountered a problem while trying to save this file. Please try again later.')
                toast({
                    title: 'Error.',
                    description: `${'An error occurred while trying to save this file. Please try again later.'}`,
                    status: 'error',
                    duration: 2500,
                    isClosable: true,
                })
            }
        })
    }

    return (
        <Modal
            closeOnOverlayClick={false}
            isCentered
            onClose={() => { props.onClose() }}
            isOpen={props.isOpen}
            motionPreset='slideInBottom'
            size='4xl'
        >
            <ModalOverlay />
            <ModalContent
                color='white'
                bgColor='gray.800'
            >
                <ModalCloseButton />

                <ModalBody >
                    <HStack w='800px'>
                        <Text w='55px' minW='55px'>File No.</Text>
                        <Tooltip label={isFileNoError || ''}>
                            <Input
                                w='75px'
                                minW='75px'
                                size='sm'
                                borderRadius='5px'
                                fontSize='16px'
                                textAlign='center'
                                value={fileNo}
                                maxLength='5'
                                onChange={(e)=>{setFileNo(e.target.value)}}
                                isInvalid={isFileNoError}
                            />
                        </Tooltip>

                        <Text>Ref:</Text>
                        <Tooltip label={isFileRefError || ''}>
                            <Input
                                w='full'
                                size='sm'
                                borderRadius='5px'
                                fontSize='16px'
                                value={fileRef}
                                onChange={(e)=>{setFileRef(e.target.value)}}
                                isInvalid={isFileRefError}
                            />
                        </Tooltip>
                    </HStack>

                    <VStack spacing='0.5' fontSize='14px'>
                        <HStack width='full' justify='space-between' mt='10px'>
                            <HStack>
                                <Text minW='fit-content' fontWeight='bold'>
                                    File Type:
                                </Text>
                                <Tabs h='25px' variant='enclosed' colorScheme='white' defaultIndex={isPurchase ? 0 : 1}>
                                    <TabList h='25px' border='none'>
                                        <Tab paddingInline='5px' w='80px' border='none' color='whiteAlpha.700' _selected={{borderBottom:'1px', fontWeight:'bold', color:'white'}} onClick={() => {setIsPurchase(true)}}>Purchase</Tab>
                                        <Tab paddingInline='5px' w='80px' border='none' color='whiteAlpha.700' _selected={{borderBottom:'1px', fontWeight:'bold', color:'white'}} onClick={() => {setIsPurchase(false)}}>Refinance</Tab>
                                    </TabList>
                                </Tabs>
                            </HStack>
                            {isPurchase &&
                                <HStack>
                                    <Text minW='fit-content' fontWeight='bold'>
                                        Representing:
                                    </Text>
                                    <Tabs h='25px' variant='enclosed' colorScheme='white' defaultIndex={whoRepresenting ? 1 : 0}>
                                        <TabList h='25px' border='none'>
                                            <Tab paddingInline='5px' w='50px' border='none' color='whiteAlpha.700' _selected={{borderBottom:'1px', fontWeight:'bold', color:'white'}} onClick={() => {setWhoRepresenting(false)}}>Buyer</Tab>
                                            <Tab paddingInline='5px' w='50px' border='none' color='whiteAlpha.700' _selected={{borderBottom:'1px', fontWeight:'bold', color:'white'}} onClick={() => {setWhoRepresenting(true)}}>Seller</Tab>
                                        </TabList>
                                    </Tabs>
                                </HStack>
                            }
                            <HStack>
                                    <Text minW='fit-content' fontWeight='bold'>
                                        Responsibilities:
                                    </Text>
                                    <Popover h='30px'>
                                        <PopoverTrigger>
                                            <Button h='30px' paddingInline='10px' backgroundColor='transparent' _hover={{backgroundColor:'whiteAlpha.100'}} _active={{backgroundColor:'whiteAlpha.200'}} border='1px solid white' fontWeight='normal' color='whiteAlpha.700'>
                                                Select... <ChevronDownIcon/>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent color='white' h='175px' w='175px' backgroundColor='#101622'>
                                            <PopoverArrow/>
                                            <PopoverHeader fontSize='16px'>File Responsibilities:</PopoverHeader>
                                            <PopoverBody>
                                                {
                                                    rolesButtons.map((item, index) => {
                                                        return <Checkbox key={index} onChange={(e)=>{item.set(e.target.checked)}} defaultChecked={item.value} isChecked={item.value}>
                                                            {item.label}
                                                        </Checkbox>
                                                    })
                                                }
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                            </HStack>
                        </HStack>

                        <Divider marginBlock='0.5rem !important' />

                        <HStack w='full'>
                            <Text minW='57px'>
                                {isPurchase ? (whoRepresenting ? ' Seller' : ' Buyer') : 'Borrower'}
                            </Text>
                            <Tooltip label={whoRepresenting ? isSellerError || '' : isBuyerError || ''}>
                                <Input
                                    size='sm' borderRadius='10px'
                                    value={whoRepresenting ? seller : buyer}
                                    onChange={(e) => {whoRepresenting ? setSeller(e.target.value) : setBuyer(e.target.value)}}
                                    isInvalid={whoRepresenting ? isSellerError : isBuyerError}
                                />
                            </Tooltip>
                            
                            <Text minW='43px'>
                                {isPurchase ? (whoRepresenting ? 'Buyer' : 'Seller') : 'Lender'}
                            </Text>
                            <Tooltip label={whoRepresenting ? isBuyerError || '' : isSellerError || ''}>
                                <Input
                                    size='sm' borderRadius='10px'
                                    value={whoRepresenting ? buyer : seller}
                                    onChange={(e) => {whoRepresenting ? setBuyer(e.target.value) : setSeller   (e.target.value)}}
                                    isInvalid={whoRepresenting ? isBuyerError : isSellerError}
                                />
                            </Tooltip>
                        </HStack>

                        <HStack w='full' mt='5px !important'>
                            <Text minW='57px'>
                                Property
                            </Text>
                            <Tooltip label={isPropertyError || ''}>
                                <Input
                                    size='sm' borderRadius='10px'
                                    value={propertyAddress}
                                    onChange={(e) => {setPropertyAddress(e.target.value)}}
                                    isInvalid={isPropertyError}
                                />
                            </Tooltip>

                            <Text>
                                Folio
                            </Text>
                            <Input
                                w='300px' size='sm' borderRadius='10px'
                                value={folioNo}
                                onChange={(e) => {setFolioNo(e.target.value)}}
                            />
                        </HStack>

                        <Divider mt='0.5rem !important' mb='0rem !important' />

                        <HStack w='100%' h='100%' m='0'>
                            <VStack w='300px' spacing='1.5'>
                                <Text>
                                    Critical Dates:
                                </Text>
                                {dates.map((item, index) => {
                                    return (
                                        <HStack w='250px' spacing='0' key={index}
                                            color={(isClosed || item.isClosed) ? 'red' : ''}
                                            borderColor={(isClosed || item.isClosed) ? 'red' : ''}
                                        >
                                            <Text w='68px'>
                                                {item.label}
                                            </Text>
                                            <Tooltip label={item.label === 'Effective' ? isEffectiveError || '' : item.label === 'Closing' ? isClosingError || '' : ''}>
                                                <Input w='150px' h='30px' paddingInline='8px' borderRadius='10px' type='date' 
                                                    value={item.value}
                                                    onChange={(e)=>{item.setValue(e.target.value)}}
                                                    transition='0s'
                                                    isDisabled={isClosed}
                                                    _hover={{}}
                                                    onBlur={(e)=>{forceResetDate(e.target.value, item.setValue)}}
                                                    isInvalid={item.label === 'Effective' && isEffectiveError || item.label === 'Closing' && isClosingError}
                                                />
                                            </Tooltip>
                                            <Button p='0px !important' size='sm' bgColor='transparent'
                                                _hover={{bgColor:'transparent'}}
                                                onClick={(e)=>{
                                                    e.stopPropagation();
                                                    if(!isClosed)
                                                        item.setIsClosed((isClosed) => !isClosed);
                                                }}
                                                isDisabled={isClosed}
                                                transition='0s'
                                            >
                                                <Text display='flex'>
                                                    { (isClosed || item.isClosed) && <LockIcon/> || <UnlockIcon/> }
                                                </Text>
                                            </Button>
                                        </HStack>
                                    )
                                })}
                            </VStack>

                            <Divider orientation='vertical' h='237px' margin='0px !important'/>

                            <VStack w='200px' h='237px'>
                                <Text>
                                    Milestones:
                                </Text>
                                <VStack spacing='0'>
                                    {taskCompletenessChecks.map((item, index) => {
                                        if(item.role)
                                            return (
                                                <HStack w='170px' spacing='0' key={index}>
                                                    <Checkbox spacing='2' size='sm' onChange={(e)=>{item.set(e.target.checked)}} defaultChecked={item.value} isChecked={item.value}>
                                                        {item.label}
                                                    </Checkbox>
                                                </HStack>
                                            )
                                    })}
                                </VStack>
                            </VStack>

                            <Divider orientation='vertical' h='237px' margin='0px !important'/>

                            <VStack w='100%' h='237px'>
                                <Text>
                                    Notes:
                                </Text>
                                <Textarea h='100%' fontSize='12px'
                                    value={notes}
                                    onChange={(e) => {setNotes(e.target.value)}}
                                />
                            </VStack>
                        </HStack>
                        
                        <Divider marginBlock='0.5rem !important' />
                    </VStack>
                </ModalBody>
                <ModalFooter justifyContent='space-between' alignItems='start' m='0'paddingTop='0'>
                    <VStack w='100%' h='100%' align='left'>
                        <HStack w='100%' justifyContent='space-between'>
                            <HStack>
                                {isClosed && <Button w='120px' colorScheme='green' onClick={()=>{setIsClosed(false)}}>
                                        RE-OPEN FILE
                                    </Button> ||
                                    <Button w='120px' colorScheme='red' onClick={()=>{setIsClosed(true)}}>
                                        CLOSE FILE
                                    </Button>
                                }
                                <Text color={isClosed ? 'red' : ''}>
                                    STATUS: {isClosed ? 'CLOSED/CANCELLED' : 'OPEN'}
                                </Text>
                            </HStack>
                            <HStack h='40px'>
                                <Button w='120px' colorScheme='red' onClick={()=>{resetAllValues()}}>
                                    CLEAR FIELDS
                                </Button>
                                <Button w='100px' colorScheme='blue' onClick={()=>{trySaveFile()}}>
                                    SAVE
                                </Button>
                            </HStack>
                        </HStack>
                        <Tooltip
                            maxW='848px'
                            placement='bottom-start'
                            label={(displayedFileNo && fileRef) && `${displayedFileNo} || ${fileRef}`}
                            textAlign='justify'
                        >
                            <Text color='gray.300' maxW='100%' h='24px' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'>
                                {displayedFileNo || '## - ###'} || {fileRef || '{File Reference}'}
                            </Text>
                        </Tooltip>
                    </VStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddFile;