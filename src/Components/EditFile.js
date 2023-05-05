import React, { useState, useEffect, useContext } from 'react';

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
    Toast,
    Menu,
    Box,
  } from '@chakra-ui/react'

export const EditFile = (props) => {

    const [file, setFile] = useState({
        fileNo: '',
        displayFileNo: '',
        fileTitle: '',
        representing: true,
        isPurchase: true,
        buyer: '',
        seller: '',
        property: {
            address: '',
            folioNo: '',
        },
        purchasePrice: '',
        tasks: {
            isSellerDocs: false,
            isBuyerDocs: false,
            isEscrowAgent: false,
            isTitleAgent: false,
            isClosingAgent: false,
        },
        dates: {
            depositInit: '',
            depositSecond: '',
            depositThird: '',
            inspection: '',
            closing: '',
        },
        states: {
            isEscrowReceived: false,
            isTitleOrdered: false,
            isLienRequested: false,
            isClosed: false,
        },
    })
    
    const [fileNo, setFileNo] = useState('');
    const [displayedFileNo, setDisplayedFileNo] = useState('');
    const [fileRef, setFileRef] = useState('');
    const [representing, setRepresenting] = useState(true); // true = Seller, false = Buyer
    const [isPurchase, setIsPurchase] = useState(true); // true = Purchase, false = REFI
    const [buyer, setBuyer] = useState(''); // buyer name
    const [seller, setSeller] = useState(''); // seller name
    const [propertyAddress, setPropertyAddress] = useState(''); // property address
    const [folioNo, setFolioNo] = useState('');
    const [notes, setNotes] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');

    const [isSellerDocs, setIsSellerDocs] = useState(false);
    const [isBuyerDocs, setIsBuyerDocs] = useState(false);
    const [isEscrowAgent, setIsEscrowAgent] = useState(false);
    const [isTitleAgent, setIsTitleAgent] = useState(false);
    const [isClosingAgent, setIsClosingAgent] = useState(false);

    const [effective, setEffective] = useState('');
    const [depositInit, setDepositInit] = useState('');
    const [depositSecond, setDepositSecond] = useState('');
    const [depositThird, setDepositThird] = useState('');
    const [inspection, setInspection] = useState('');
    const [closing, setClosing] = useState('');
    const [isEscrowReceived, setIsEscrowReceived] = useState('');
    const [isLienRequested, setIsLienRequested] = useState('');
    const [isTitleOrdered, setIsTitleOrdered] = useState('');
    const [isClosed, setIsClosed] = useState('');

    useEffect(() => {
        if(props.isOpen && props.fileNo) {
            axios.get(`http://localhost:5000/files?fileNumber=${props.fileNo}`).then((response) => {
                setFileNo(response.data.fileNumber)
                setFileRef(response.data.fileRef)
                setPropertyAddress(response.data.address)
                setFolioNo(response.data.folioNo)
                setSeller(response.data.seller)
                setBuyer(response.data.buyer)
                setEffective(response.data.effective)
                setDepositInit(response.data.depositInitial || '')
                setDepositSecond(response.data.depositSecond || '')
                setDepositThird(response.data.depositThird || '')
                setInspection(response.data.inspection || '')
                setClosing(response.data.closing)
                setNotes(response.data.notes)
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
        
        
    }
    
    return (
        <Modal
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
                                    <Switch colorScheme='gray' defaultChecked={representing} onChange={() => setRepresenting(!representing)} size='sm' />
                                    <Text width='full' fontWeight='bold'>
                                        {representing ? 'Seller' : 'Buyer'}
                                    </Text>
                                </HStack>
                            }
                        </HStack>

                        <HStack w='full' justify='space-between'>
                            <HStack>
                                <Text minW='fit-content' fontWeight='bold'>
                                    Seller Docs?
                                </Text>
                                <Switch colorScheme='gray' defaultChecked={isSellerDocs} onChange={() => setIsSellerDocs(!isSellerDocs)} size='sm' />
                            </HStack>
                            <HStack>
                                <Text minW='fit-content' fontWeight='bold'>
                                    Buyer Docs?
                                </Text>
                                <Switch colorScheme='gray' defaultChecked={isBuyerDocs} onChange={() => setIsBuyerDocs(!isBuyerDocs)} size='sm' />
                            </HStack>
                            <HStack>
                                <Text minW='fit-content' fontWeight='bold'>
                                    Closing Agent?
                                </Text>
                                <Switch colorScheme='gray' defaultChecked={isClosingAgent} onChange={() => setIsClosingAgent(!isClosingAgent)} size='sm' />
                            </HStack>
                            <HStack>
                                <Text minW='fit-content' fontWeight='bold'>
                                    Escrow Agent?
                                </Text>
                                <Switch colorScheme='gray' defaultChecked={isEscrowAgent} onChange={() => setIsEscrowAgent(!isEscrowAgent)} size='sm' />
                            </HStack>
                            <HStack>
                                <Text minW='fit-content' fontWeight='bold'>
                                    Title Agent?
                                </Text>
                                <Switch colorScheme='gray' defaultChecked={isTitleAgent} onChange={() => setIsTitleAgent(!isTitleAgent)} size='sm' />
                            </HStack>
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
                                onChange={(e) => {representing ? setBuyer(e.target.value) : setSeller   (e.target.value)}}
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
                                    {['Effective', 'Deposit 1', 'Deposit 2', 'Deposit 3', 'Inspection', 'Closing'].map((item, index) => {
                                        return (
                                            <HStack w='240px' spacing='0' key={index}>
                                                <Text w='70px'>
                                                    {item}
                                                </Text>
                                                <Input w='170px' h='30px' borderRadius='10px' type='date' 
                                                    value={item === 'Effective' ? effective :
                                                        item === 'Deposit 1' ? depositInit :
                                                        item === 'Deposit 2' ? depositSecond :
                                                        item === 'Deposit 3' ? depositThird :
                                                        item === 'Inspection' ? inspection :
                                                        item === 'Closing' ? closing : ''
                                                    }
                                                    onChange={(e)=>{switch(item) {
                                                        case 'Effective':
                                                            setEffective(e.target.value)
                                                        case 'Deposit 1':
                                                            setDepositInit(e.target.value)
                                                        case 'Deposit 2':
                                                            setDepositSecond(e.target.value)
                                                        case 'Deposit 3':
                                                            setDepositThird(e.target.value)
                                                        case 'Inspection':
                                                            setInspection(e.target.value)
                                                        case 'Closing':
                                                            setClosing(e.target.value)
                                                    }}}
                                                />
                                            </HStack>
                                        )
                                    })}
                            </VStack>

                            <Divider orientation='vertical' h='237px' />

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
                        
                        <HStack w='full' justifyContent='right' onClick={()=>{trySaveFile()}}>
                            <Button w='100px' colorScheme='blue' >
                                SAVE
                            </Button>
                        </HStack>
                    </VStack>
                </ModalBody>

                <ModalFooter width='full' display='flex' justifyContent='space-between'>
                    <Text color='gray.300'>
                        {displayedFileNo}{fileRef ? ' ' + fileRef : ''}
                    </Text>
                    <Text color='gray.300'>
                        {process.env.REACT_APP_VERSION}
                    </Text>
                </ModalFooter>
            </ModalContent>

            <Toast>

            </Toast>
        </Modal>
    )
}