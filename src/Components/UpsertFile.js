import React, { useState, useEffect, useContext } from 'react'
import { profileContext } from '../Helpers/profileContext'
import { axiosInstance } from '../Helpers/axiosInstance'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    HStack,
    VStack,
    Divider,
    useToast,
    Spinner,
    Text,
} from '@chakra-ui/react'

import FileNoAndRefInput from './File Modal Components/FileNoAndRefInput'
import FileTaskInfo from './File Modal Components/FileTaskInfo'
import FileBuyerAndSeller from './File Modal Components/FileBuyerAndSeller'
import FilePropertyInfo from './File Modal Components/FilePropertyInfo'
import FileDates from './File Modal Components/FileDates'
import FileMilestones from './File Modal Components/FileMilestones'
import FileNotes from './File Modal Components/FileNotes'
import FileStatus from './File Modal Components/FileStatus'
import FileClearAndSave from './File Modal Components/FileClearAndSave'
import FileFooter from './File Modal Components/FileFooter'

const AddFile = (props) => {

    const { profile, setProfile } = useContext(profileContext);
    
    const toast = useToast();
    
    const [oldFileNo, setOldFileNo] = useState('');
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
    const [loanApproval, setLoanApproval] = useState('');
    const [inspection, setInspection] = useState('');
    const [closing, setClosing] = useState('');

    const [isEscrowReceived, setIsEscrowReceived] = useState(false);
    const [isLienRequested, setIsLienRequested] = useState(false);
    const [isTitleOrdered, setIsTitleOrdered] = useState(false);
    const [isLienReceived, setIsLienReceived] = useState(false);
    const [isTitleReceived, setIsTitleReceived] = useState(false);
    const [isSellerDocsDrafted, setIsSellerDocsDrafted] = useState(false);
    const [isSellerDocsApproved, setIsSellerDocsApproved] = useState(false);
    const [isBuyerDocsDrafted, setIsBuyerDocsDrafted] = useState(false);
    const [isBuyerDocsApproved, setIsBuyerDocsApproved] = useState(false);
    
    const [milestones, setMilestones] = useState({
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

    const milestonesChecks = [
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

    const [isClosed, setIsClosed] = useState(false);
    const [isClosedEffective, setIsClosedEffective] = useState(false);
    const [isClosedDepositInit, setIsClosedDepositInit] = useState(false);
    const [isClosedDepositSecond, setIsClosedDepositSecond] = useState(false);
    const [isClosedLoanApproval, setIsClosedLoanApproval] = useState(false);
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
            label: 'Loan ✓', 
            value: loanApproval, 
            setValue: setLoanApproval, 
            isClosed: isClosedLoanApproval, 
            setIsClosed: setIsClosedLoanApproval
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
    const [isError, setIsError] = useState();

    useEffect(() => {
        if(!props.isOpen) {
            resetAllValues();
            return;
        }

        axiosInstance.get(`http://localhost:5000/auth/profile`).then((response) => {
            setProfile(profile => {
                return {...profile, loggedIn: true, user: response.data.username }
            })

            if(!props.new && props.fileNo) {
                axiosInstance.get(`http://localhost:5000/files?fileNumber=${props.fileNo}`).then((response) => {
                    const file = response.data.file;
                    setOldFileNo(file.fileNumber);
                    setFileNo(file.fileNumber);
                    setFileRef(file.fileRef);
                    setPropertyAddress(file.address);
                    setFolioNo(file.folioNo);
                    setSeller(file.seller);
                    setBuyer(file.buyer);
                    setIsPurchase(file.isPurchase);
                    setWhoRepresenting(file.whoRepresenting);
                    setNotes(file.notes);
                    setIsClosed(file.isClosed);
    
                    const responseRoles = JSON.parse(file.roles);
                    setIsSellerDocs(responseRoles.isSellerDocs);
                    setIsBuyerDocs(responseRoles.isBuyerDocs);
                    setIsEscrowAgent(responseRoles.isEscrowAgent);
                    setIsTitleAgent(responseRoles.isTitleAgent);
                    setIsClosingAgent(responseRoles.isClosingAgent);
    
                    const responseMilestones = JSON.parse(file.milestones);
                    setIsEscrowReceived(responseMilestones.isEscrowReceived);
                    setIsLienRequested(responseMilestones.isLienRequested);
                    setIsTitleOrdered(responseMilestones.isTitleOrdered);
                    setIsLienReceived(responseMilestones.isLienReceived);
                    setIsTitleReceived(responseMilestones.isTitleReceived);
                    setIsSellerDocsDrafted(responseMilestones.isSellerDocsDrafted);
                    setIsSellerDocsApproved(responseMilestones.isSellerDocsApproved);
                    setIsBuyerDocsDrafted(responseMilestones.isBuyerDocsDrafted);
                    setIsBuyerDocsApproved(responseMilestones.isBuyerDocsApproved);
    
                    for(const date of file.Dates) {
                        switch(date.type) {
                            case 'Effective':
                                setEffective(date.date);
                                setIsClosedEffective(date.isClosed);
                                break;
                            case 'Escrow':
                                switch(date.prefix) {
                                    case 'First ':
                                        setDepositInit(date.date);
                                        setIsClosedDepositInit(date.isClosed)
                                        break;
                                    case 'Second ':
                                        setDepositSecond(date.date);
                                        setIsClosedDepositSecond(date.isClosed)
                                        break;
                                    default:
                                }
                            case 'Loan ✓':
                                setLoanApproval(date.date);
                                setIsClosedLoanApproval(date.isClosed);
                                break;
                            case 'Inspection':
                                setInspection(date.date);
                                setIsClosedInspection(date.isClosed);
                                break;
                            case 'Closing':
                                setClosing(date.date);
                                setIsClosedClosing(date.isClosed);
                                break;
                        }
                    }
                }).catch(() => {
                    console.warn('ERROR: A problem occurred while trying to retrieve file info. Please try again later.');
                    toast({
                        title: 'Error.',
                        description: 'An error occurred while trying to retrieve file info. Try again later',
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                    })
                });
            }            
        }).catch(function (error) {
            setProfile(profile => {
                return {...profile, loggedIn: false, user: '' }
            })
            if (error.response)
                console.warn('You are not logged in. Please log in to view this content.');
            else
                console.warn('ERROR: Server is currently unavailable. Please try again later.');
        });

    }, [props.isOpen])

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
        setMilestones({
                isEscrowReceived: isEscrowReceived,
                isLienRequested: isLienRequested,
                isTitleOrdered: isTitleOrdered,
                isLienReceived: isLienReceived,
                isTitleReceived: isTitleReceived,
                isSellerDocsDrafted: isSellerDocsDrafted,
                isBuyerDocsDrafted: isBuyerDocsDrafted,
                isSellerDocsApproved: isSellerDocsApproved,
                isBuyerDocsApproved: isBuyerDocsApproved,
            })
    }, [isEscrowReceived, isLienRequested, isTitleOrdered, isLienReceived, isTitleReceived, 
        isSellerDocsDrafted, isBuyerDocsDrafted, isSellerDocsApproved, isBuyerDocsApproved,]);

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

    useEffect(() => {
        setIsError(isFileNoError || isFileRefError || isBuyerError || isSellerError || isPropertyError || isClosingError || false)
    }, [isFileNoError, isFileRefError, isBuyerError, isSellerError, isPropertyError, isEffectiveError, isClosingError])

    const resetAllValues = () => {
        setFileNo('');
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
        setEffective('00-00-0000');
        setDepositInit('00-00-0000');
        setDepositSecond('00-00-0000');
        setLoanApproval('00-00-0000');
        setInspection('00-00-0000');
        setClosing('00-00-0000');
        setIsClosedEffective(false);
        setIsClosedDepositInit(false);
        setIsClosedDepositSecond(false);
        setIsClosedLoanApproval(false);
        setIsClosedInspection(false);
        setIsClosedClosing(false);
        setIsEscrowReceived(false);
        setIsLienRequested(false);
        setIsTitleOrdered(false);
        setIsLienReceived(false);
        setIsTitleReceived(false);
        setIsSellerDocsDrafted(false);
        setIsSellerDocsApproved(false);
        setIsBuyerDocsDrafted(false);
        setIsBuyerDocsApproved(false);
        setIsClosed(false);
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
        if(loanApproval === '00-00-0000') {
            setLoanApproval('')
        }
    }, [loanApproval])
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
                h='540px'
            >
                <ModalCloseButton />

                {!profile.loggedIn ? 
                    <ModalBody display='flex' justifyContent='center' alignItems='center'>
                        <Text>
                            You must be logged in to view, edit, or create Files.
                        </Text>
                    </ModalBody> : 
                    (!props.new && fileNo === '') ? 
                        <ModalBody display='flex' justifyContent='center' alignItems='center'>
                            <Spinner/>
                        </ModalBody> : 
                        <>
                            <ModalBody>
                                <FileNoAndRefInput
                                    fileNo={fileNo}
                                    setFileNo={setFileNo}
                                    isFileNoError={isFileNoError}
                                    fileRef={fileRef}
                                    setFileRef={setFileRef}
                                    isFileRefError={isFileRefError}
                                />

                                <VStack spacing='0.5' fontSize='14px'>
                                    <FileTaskInfo
                                        isPurchase={isPurchase}
                                        setIsPurchase={setIsPurchase}
                                        whoRepresenting={whoRepresenting}
                                        setWhoRepresenting={setWhoRepresenting}
                                        rolesButtons={rolesButtons}
                                    />

                                    <Divider marginBlock='0.5rem !important' />

                                    <FileBuyerAndSeller
                                        isPurchase={isPurchase}
                                        whoRepresenting={whoRepresenting}
                                        buyer={buyer}
                                        setBuyer={setBuyer}
                                        isBuyerError={isBuyerError}
                                        seller={seller}
                                        setSeller={setSeller}
                                        isSellerError={isSellerError}
                                    />
                                    
                                    <FilePropertyInfo
                                        propertyAddress={propertyAddress}
                                        setPropertyAddress={setPropertyAddress}
                                        isPropertyError={isPropertyError}
                                        folioNo={folioNo}
                                        setFolioNo={setFolioNo}
                                    />

                                    <Divider mt='0.5rem !important' mb='0rem !important' />

                                    <HStack w='100%' h='100%' m='0'>
                                        <FileDates
                                            dates={dates}
                                            isEffectiveError={isEffectiveError}
                                            isClosingError={isClosingError}
                                            isClosed={isClosed}
                                        />

                                        <Divider orientation='vertical' h='237px' margin='0px !important'/>

                                        <FileMilestones
                                            milestonesChecks={milestonesChecks}
                                        />

                                        <Divider orientation='vertical' h='237px' margin='0px !important'/>

                                        <FileNotes
                                            notes={notes}
                                            setNotes={setNotes}
                                        />
                                    </HStack>
                                    
                                    <Divider marginBlock='0.5rem !important' />
                                </VStack>
                            </ModalBody>

                            <ModalFooter justifyContent='space-between' alignItems='start' m='0'paddingTop='0'>
                                <VStack w='100%' h='100%' align='left'>
                                    <HStack w='100%' justifyContent='space-between'>
                                        <FileStatus
                                            isClosed={isClosed}
                                            setIsClosed={setIsClosed}
                                        />
                                        <FileClearAndSave
                                            new={props.new}
                                            oldFileNo={oldFileNo}
                                            fileNo={fileNo}
                                            fileRef={fileRef}
                                            isPurchase={isPurchase}
                                            whoRepresenting={whoRepresenting}
                                            propertyAddress={propertyAddress}
                                            folioNo={folioNo}
                                            buyer={buyer}
                                            seller={seller}
                                            effective={effective}
                                            depositInit={depositInit}
                                            depositSecond={depositSecond}
                                            loanApproval={loanApproval}
                                            inspection={inspection}
                                            closing={closing}
                                            isClosedEffective={isClosedEffective}
                                            isClosedDepositInit={isClosedDepositInit}
                                            isClosedDepositSecond={isClosedDepositSecond}
                                            isClosedLoanApproval={isClosedLoanApproval}
                                            isClosedInspection={isClosedInspection}
                                            isClosedClosing={isClosedClosing}
                                            isClosed={isClosed}
                                            roles={roles}
                                            milestones={milestones}
                                            notes={notes}
                                            isError={isError}
                                            toast={toast}
                                            onClose={props.onClose}
                                            resetAllValues={resetAllValues}
                                        />
                                    </HStack>
                                    <FileFooter
                                        displayedFileNo={displayedFileNo}
                                        fileRef={fileRef}
                                    />
                                </VStack>
                            </ModalFooter>
                        </>
                }
            </ModalContent>
        </Modal>
    )
}

export default AddFile;