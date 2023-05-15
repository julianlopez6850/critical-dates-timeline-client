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
    Menu,
    Box,
  } from '@chakra-ui/react'
import { LockIcon, UnlockIcon } from '@chakra-ui/icons';

export const EditFile = (props) => {
    
    const [oldFileNo, setOldFileNo] = useState('');
    const [fileNo, setFileNo] = useState('');
    const [displayedFileNo, setDisplayedFileNo] = useState('');
    const [fileRef, setFileRef] = useState('');
    const [representing, setRepresenting] = useState(''); // true = Seller, false = Buyer
    const [isPurchase, setIsPurchase] = useState(''); // true = Purchase, false = REFI
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

    const rolesButtons = [
        { label: 'Seller Docs?', value: isSellerDocs, set: setIsSellerDocs },
        { label: 'Buyer Docs?', value: isBuyerDocs, set: setIsBuyerDocs },
        { label: 'Escrow Agent?', value: isEscrowAgent, set: setIsEscrowAgent },
        { label: 'Title Agent?', value: isTitleAgent, set: setIsTitleAgent },
        { label: 'Closing Agent?', value: isClosingAgent, set: setIsClosingAgent },
    ]

    const [effective, setEffective] = useState('');
    const [depositInit, setDepositInit] = useState('');
    const [depositSecond, setDepositSecond] = useState('');
    const [depositThird, setDepositThird] = useState('');
    const [inspection, setInspection] = useState('');
    const [closing, setClosing] = useState('');

    const [isClosedEffective, setIsClosedEffective] = useState(false);
    const [isClosedDepositInit, setIsClosedDepositInit] = useState(false);
    const [isClosedDepositSecond, setIsClosedDepositSecond] = useState(false);
    const [isClosedDepositThird, setIsClosedDepositThird] = useState(false);
    const [isClosedInspection, setIsClosedInspection] = useState(false);
    const [isClosedClosing, setIsClosedClosing] = useState(false);

    const [isEscrowReceived, setIsEscrowReceived] = useState('');
    const [isLienRequested, setIsLienRequested] = useState('');
    const [isTitleOrdered, setIsTitleOrdered] = useState('');
    const [isSellerDocsComplete, setIsSellerDocsComplete] = useState('');
    const [isClosed, setIsClosed] = useState('');

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

    useEffect(() => {
        if(props.isOpen && props.fileNo) {
            axios.get(`http://localhost:5000/files?fileNumber=${props.fileNo}`).then((response) => {
                setOldFileNo(response.data.fileNumber);
                setFileNo(response.data.fileNumber);
                setFileRef(response.data.fileRef);
                setPropertyAddress(response.data.address);
                setFolioNo(response.data.folioNo);
                setSeller(response.data.seller);
                setBuyer(response.data.buyer);
                setEffective(response.data.effective);
                setDepositInit(response.data.depositInitial || '');
                setDepositSecond(response.data.depositSecond || '');
                setDepositThird(response.data.depositThird || '');
                setInspection(response.data.inspection || '');
                setClosing(response.data.closing);
                setNotes(response.data.notes);
                setIsPurchase(response.data.isPurchase);
                setRepresenting(response.data.representing);
                setIsClosed(response.data.isClosed);

                for(const date of response.data.dates) {
                    switch(date.type) {
                        case 'Effective':
                            setIsClosedEffective(date.isClosed);
                            break;
                        case 'Escrow':
                            switch(date.prefix) {
                                case 'First ':
                                    setIsClosedDepositInit(date.isClosed)
                                    break;
                                case 'Second ':
                                    setIsClosedDepositSecond(date.isClosed)
                                    break;
                                case 'Third ':
                                    setIsClosedDepositThird(date.isClosed)
                                    break;
                                default:
                            }
                        case 'Inspection':
                            setIsClosedInspection(date.isClosed);
                            break;
                        case 'Closing':
                            setIsClosedClosing(date.isClosed);
                            break;
                    }
                }
            }).catch((error) => {
                console.log('Error retrieving file info: ' + error.message);
            });
        }
    }, [props.isOpen])

    useEffect(() => {
        if(fileNo.length > 2) {
            setDisplayedFileNo(`${fileNo.slice(0,2)} - ${fileNo.slice(2, fileNo.length)}`);
        } else {
            setDisplayedFileNo(fileNo)
        }
    }, [fileNo])

    const trySaveFile = () => {
        
        const file = {
            oldFileNumber: oldFileNo,
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
            isClosedEffective: isClosedEffective,
            isClosedDepositInitial: isClosedDepositInit,
            isClosedDepositSecond: isClosedDepositSecond,
            isClosedDepositThird: isClosedDepositThird,
            isClosedInspection: isClosedInspection,
            isClosedClosing: isClosedClosing,
            notes: notes,
            isClosed: isClosed,
            representing: representing,
            isPurchase: isPurchase,
        }

        axios.put(`http://localhost:5000/files`, file).then((response) => {
            console.log(response)
            props.onClose();
        })
    }
    
    return (
        <Modal
            isCentered
            onClose={() => { props.onClose() }}
            isOpen={props.isOpen}
            motionPreset='slideInBottom'
            size='4xl'
            closeOnOverlayClick={false}
        >
            <ModalOverlay />
            <ModalContent
                color='white'
                bgColor='gray.800'
            >
                <ModalCloseButton />

                <ModalBody >
                    <HStack w='800px'>
                        <Text w='65px'>File No.</Text>
                        <Input
                            w='90px'
                            size='sm'
                            borderRadius='5px'
                            value={fileNo}
                            onChange={(e)=>{setFileNo(e.target.value)}}
                        />

                        <Text>Ref:</Text>
                        <Input
                            w='80%'
                            size='sm'
                            borderRadius='5px'
                            fontSize='16px'
                            marginTop='10px'
                            value={fileRef}
                            onChange={(e)=>{setFileRef(e.target.value)}}
                        />
                    </HStack>

                    <VStack spacing='0.5' fontSize='14px'>
                        <HStack width='full' justify='space-between' mt='10px'>
                            <HStack>
                                <Text minW='fit-content' fontWeight='bold'>
                                    This is a ...
                                </Text>
                                <Switch colorScheme='gray' defaultChecked={isPurchase} onChange={() => setIsPurchase(!isPurchase)} size='sm' />
                                <Text width='full' fontWeight='bold'>
                                    {isPurchase ? 'Purchase' : 'REFI'}
                                </Text>
                            </HStack>
                            {isPurchase &&
                                <HStack>
                                    <Text minW='fit-content' fontWeight='bold'>
                                        We represent the ...
                                    </Text>
                                    <Switch
                                        colorScheme='gray'
                                        defaultChecked={representing}
                                        onChange={() => {
                                            setRepresenting(!representing)
                                        }}
                                        size='sm'
                                    />
                                    <Text width='full' fontWeight='bold'>
                                        {representing ? 'Seller' : 'Buyer'}
                                    </Text>
                                </HStack>
                            }
                        </HStack>

                        <HStack w='full' justify='space-between'>
                            {
                                rolesButtons.map((item, index) => {
                                    return <HStack key={index}>
                                        <Text minW='fit-content' fontWeight='bold'>
                                            {item.label}
                                        </Text>
                                        <Switch
                                            colorScheme='gray'
                                            defaultChecked={item.value}
                                            onChange={(e) =>{
                                                item.set((value) => !value)
                                            }}
                                            size='sm'
                                        />
                                    </HStack>
                                })
                            }
                        </HStack>

                        <Divider marginBlock='0.2rem !important' />

                        <HStack w='full'>
                            <Text minW='35px'>
                                {representing ? ' Seller' : ' Buyer'}
                            </Text>
                            <Input
                                size='sm' borderRadius='10px'
                                value={representing ? seller : buyer}
                                onChange={(e) => {representing ? setSeller(e.target.value) : setBuyer(e.target.value)}}
                            />
                            
                            <Text minW='35px'>
                                {representing ? 'Buyer' : 'Seller'}
                            </Text>
                            <Input
                                size='sm' borderRadius='10px'
                                value={representing ? buyer : seller}
                                onChange={(e) => {representing ? setBuyer(e.target.value) : setSeller(e.target.value)}}
                            />
                        </HStack>

                        <HStack w='full'>
                            <Text>
                                Property:
                            </Text>
                            <Input
                                size='sm' borderRadius='10px'
                                value={propertyAddress}
                                onChange={(e) => {setPropertyAddress(e.target.value)}}
                            />

                            <Text>
                                Folio:
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
                                            <HStack w='265px' spacing='0' key={index}
                                                color={(isClosed || item.isClosed) ? 'red' : ''}
                                                borderColor={(isClosed || item.isClosed) ? 'red' : ''}
                                            >
                                                <Text w='70px'>
                                                    {item.label}
                                                </Text>
                                                <Input w='170px' h='30px' borderRadius='10px' type='date' 
                                                    value={item.value}
                                                    onChange={(e)=>{item.setValue(e.target.value)}}
                                                    transition='0s'
                                                    isDisabled={isClosed}
                                                    _hover={{}}
                                                />
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
                                                    <Text w='25px' display='flex' textAlign='center' justifyContent='center'>
                                                        { (isClosed || item.isClosed) && <LockIcon/> || <UnlockIcon/> }
                                                    </Text>
                                                </Button>
                                            </HStack>
                                        )
                                    })}
                            </VStack>

                            <Divider orientation='vertical' h='237px' margin='0px !important' />

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
                        
                        <HStack w='full' justifyContent='space-between'>
                            <HStack>
                                <Text w='120px'>
                                    STATUS: {isClosed ? 'CLOSED' : 'OPEN'}
                                </Text>
                                {isClosed && <Button w='120px' colorScheme='green' onClick={()=>{setIsClosed(false)}}>
                                        RE-OPEN FILE
                                    </Button> ||
                                    <Button w='120px' colorScheme='red' onClick={()=>{setIsClosed(true)}}>
                                        CLOSE FILE
                                    </Button>
                                }
                            </HStack>
                            <Button w='120px' colorScheme='blue' onClick={()=>{trySaveFile()}}>
                                SAVE & CLOSE
                            </Button>
                        </HStack>
                    </VStack>
                </ModalBody>

                <ModalFooter width='full' display='flex' justifyContent='space-between'>
                    <Text color='gray.300'>
                        {displayedFileNo} || {fileRef ? ' ' + fileRef : ''}
                    </Text>
                    <Text color='gray.300'>
                        {process.env.REACT_APP_VERSION}
                    </Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}