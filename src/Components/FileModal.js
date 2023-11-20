import React, { useState, useEffect, useContext } from 'react';
import { profileContext } from '../Helpers/profileContext';
import { axiosInstance } from '../Helpers/axiosInstance';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Stack,
    HStack,
    VStack,
    Divider,
    useToast,
    Spinner,
    Text,
    useDisclosure,
} from '@chakra-ui/react';

import FileNoAndRefInput from './File Modal Components/FileNoAndRefInput';
import FileTaskInfo from './File Modal Components/FileTaskInfo';
import FileBuyerAndSeller from './File Modal Components/FileBuyerAndSeller';
import FilePropertyInfo from './File Modal Components/FilePropertyInfo';
import FileDates from './File Modal Components/FileDates';
import FileMilestones from './File Modal Components/FileMilestones';
import FileNotes from './File Modal Components/FileNotes';
import FileStatus from './File Modal Components/FileStatus';
import FileClearAndSave from './File Modal Components/FileClearAndSave';
import FileFooter from './File Modal Components/FileFooter';
import FileDialogBox from './File Modal Components/FileDialogBox';

const FileModal = (props) => {

    const [styles, setStyles] = useState({});

    const {
        isOpen: isOpenCancelChanges, 
        onOpen: onOpenCancelChanges,
        onClose: onCloseCancelChanges
    } = useDisclosure();

    useEffect(() => {
        const windowListener = () => {
            if(window.innerWidth >= 1150) {
                setStyles({
                    modalSize:'5xl', modalInlinePadding:'24px', bodyFontSize: '14px', spacing:'8px',
                    bodyInputHeight: '30px', inputPadding:'16px', firstStacksDir:'row', secondStacksDir: 'row',
                    headerFontSize:'16px', headerInputHeight: '32px', headerStackDir:'row',
                    fileNoW:'75px', fileRefW:'620px', beginningMinW:'57px',
                    sec3height:'237px', dateTypeW:'68px', dateW:'150px', datesSpacing:'6px', calculatorIconSize:'26px', lockIconSize:'16px',
                    fileTypeTabsW:'80px', fileRepTabsW:'50px', tabsPadding:'5px',
                    saveButtonW:'100px', otherFooterButtonsW:'120px', footerButtonH:'40px', footerFontSize:'16px', footerTooltipSize:'700px'
                });
            } else if(window.innerWidth >= 900) {
                setStyles({
                    modalSize:'3xl', modalInlinePadding:'24px', bodyFontSize: '12px', spacing:'8px',
                    bodyInputHeight: '26px', inputPadding:'12px', firstStacksDir:'row', secondStacksDir: 'row', 
                    headerFontSize:'14px', headerInputHeight: '28px', headerStackDir:'row', 
                    fileNoW:'60px', fileRefW:'400px', beginningMinW:'49px',
                    sec3height:'210px', dateTypeW:'60px', dateW:'135px', datesSpacing:'6px', calculatorIconSize:'24px', lockIconSize:'14px',
                    fileTypeTabsW:'60px', fileRepTabsW:'44px', tabsPadding:'3px',
                    saveButtonW:'80px', otherFooterButtonsW:'110px', footerButtonH:'36px', footerFontSize:'14px', footerTooltipSize:'500px'
                });
            } else if(window.innerWidth >= 650) {
                setStyles({
                    modalSize:'xl', modalInlinePadding:'16px', bodyFontSize: '12px', spacing:'8px',
                    bodyInputHeight: '22px', inputPadding:'10px', firstStacksDir:'column', secondStacksDir: 'row', 
                    headerFontSize:'14px', headerInputHeight: '24px', headerStackDir:'row', 
                    fileNoW:'50px', fileRefW:'340px', beginningMinW:'49px',
                    sec3height:'186px', dateTypeW:'60px', dateW:'135px', datesSpacing:'6px', calculatorIconSize:'22px', lockIconSize:'14px',
                    fileTypeTabsW:'60px', fileRepTabsW:'44px', tabsPadding:'3px',
                    saveButtonW:'60px', otherFooterButtonsW:'90px', footerButtonH:'32px', footerFontSize:'12px', footerTooltipSize:'350px'
                });
            } else if(window.innerWidth >= 530) {
                setStyles({
                    modalSize:'sm', modalInlinePadding:'12px', bodyFontSize: '10px', spacing:'4px',
                    bodyInputHeight: '18px', inputPadding:'8px', firstStacksDir:'column', secondStacksDir: 'column',
                    headerFontSize:'12px', headerInputHeight: '20px', headerStackDir:'row',
                    fileNoW:'40px', fileRefW:'220px', beginningMinW:'41px',
                    sec3height:'159px', dateTypeW:'60px', dateW:'120px', datesSpacing:'6px', calculatorIconSize:'18px', lockIconSize:'12px',
                    fileTypeTabsW:'60px', fileRepTabsW:'44px', tabsPadding:'3px',
                    saveButtonW:'40px', otherFooterButtonsW:'80px', footerButtonH:'28px', footerFontSize:'10px', footerTooltipSize:'200px'
                });
            } else {
                setStyles({
                    modalSize:'xs', modalInlinePadding:'12px', bodyFontSize: '10px', spacing:'4px',
                    bodyInputHeight: '18px', inputPadding:'8px', firstStacksDir:'column', secondStacksDir: 'column',
                    headerFontSize:'12px', headerInputHeight: '20px', headerStackDir:'column',
                    fileNoW:'40px', fileRefW:'full', beginningMinW:'41px',
                    sec3height:'', dateTypeW:'60px', dateW:'120px', datesSpacing:'6px', calculatorIconSize:'18px', lockIconSize:'12px',
                    fileTypeTabsW:'60px', fileRepTabsW:'44px', tabsPadding:'3px',
                    saveButtonW:'30px', otherFooterButtonsW:'60px', footerButtonH:'24px', footerFontSize:'8px', footerTooltipSize:'160px'
                });
            };
        };
        windowListener();
        window.addEventListener('resize', windowListener);
        return () => window.removeEventListener('resize', windowListener);
    }, []);

    const { profile, setProfile } = useContext(profileContext);
    
    const toast = useToast();
    
    const [oldFileNo, setOldFileNo] = useState('');
    const [fileNo, setFileNo] = useState('');
    const [displayedFileNo, setDisplayedFileNo] = useState('');
    const [fileRef, setFileRef] = useState('');
    const [whoRepresenting, setWhoRepresenting] = useState('Buyer');
    const [isPurchase, setIsPurchase] = useState(true);
    const [buyer, setBuyer] = useState('');
    const [seller, setSeller] = useState('');
    const [propertyAddress, setPropertyAddress] = useState('');
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
    });

    const rolesButtons = [
        { label: 'Seller Docs', value: isSellerDocs, set: setIsSellerDocs },
        { label: 'Buyer Docs', value: isBuyerDocs, set: setIsBuyerDocs },
        { label: 'Escrow Agent', value: isEscrowAgent, set: setIsEscrowAgent },
        { label: 'Title Agent', value: isTitleAgent, set: setIsTitleAgent },
        { label: 'Closing Agent', value: isClosingAgent, set: setIsClosingAgent },
    ];

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
    });

    const milestonesChecks = [
        { label: 'Lien Search Requested?', role: isTitleAgent, value: isLienRequested, set: setIsLienRequested },
        { label: 'Title Work Ordered?', role: isTitleAgent, value: isTitleOrdered, set: setIsTitleOrdered },
        { label: 'Lien Search Received?', role: isTitleAgent, value: isLienReceived, set: setIsLienReceived },
        { label: 'Title Work Received?', role: isTitleAgent, value: isTitleReceived, set: setIsTitleReceived },
        { label: 'Seller Docs Drafted?', role: isSellerDocs, value: isSellerDocsDrafted, set: setIsSellerDocsDrafted },
        { label: 'Buyer Docs Drafted?', role: isBuyerDocs, value: isBuyerDocsDrafted, set: setIsBuyerDocsDrafted },
        { label: 'Seller Docs Approved?', role: isSellerDocs, value: isSellerDocsApproved, set: setIsSellerDocsApproved },
        { label: 'Buyer Docs Approved?', role: isBuyerDocs, value: isBuyerDocsApproved, set: setIsBuyerDocsApproved },
    ];

    const [status, setStatus] = useState('Open');
    const [isClosedEffective, setIsClosedEffective] = useState(props.new ? false : true);
    const [isClosedDepositInit, setIsClosedDepositInit] = useState(props.new ? false : true);
    const [isClosedDepositSecond, setIsClosedDepositSecond] = useState(props.new ? false : true);
    const [isClosedLoanApproval, setIsClosedLoanApproval] = useState(props.new ? false : true);
    const [isClosedInspection, setIsClosedInspection] = useState(props.new ? false : true);
    const [isClosedClosing, setIsClosedClosing] = useState(props.new ? false : true);

    const [isCalculatedDepositInit, setIsCalculatedDepositInit] = useState({});
    const [isCalculatedDepositSecond, setIsCalculatedDepositSecond] = useState({});
    const [isCalculatedLoanApproval, setIsCalculatedLoanApproval] = useState({});
    const [isCalculatedInspection, setIsCalculatedInspection] = useState({});
    const [isCalculatedClosing, setIsCalculatedClosing] = useState({});

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
            setIsClosed: setIsClosedDepositInit,
            isCalculated: isCalculatedDepositInit,
            setIsCalculated: setIsCalculatedDepositInit
        },
        {
            label: 'Deposit 2', 
            value: depositSecond, 
            setValue: setDepositSecond, 
            isClosed: isClosedDepositSecond, 
            setIsClosed: setIsClosedDepositSecond,
            isCalculated: isCalculatedDepositSecond,
            setIsCalculated: setIsCalculatedDepositSecond
        },
        {
            label: 'Loan ✓', 
            value: loanApproval, 
            setValue: setLoanApproval, 
            isClosed: isClosedLoanApproval, 
            setIsClosed: setIsClosedLoanApproval,
            isCalculated: isCalculatedLoanApproval,
            setIsCalculated: setIsCalculatedLoanApproval
        },
        {
            label: 'Inspection', 
            value: inspection, 
            setValue: setInspection, 
            isClosed: isClosedInspection, 
            setIsClosed: setIsClosedInspection,
            isCalculated: isCalculatedInspection,
            setIsCalculated: setIsCalculatedInspection
        },
        {
            label: 'Closing', 
            value: closing, 
            setValue: setClosing, 
            isClosed: isClosedClosing, 
            setIsClosed: setIsClosedClosing,
            isCalculated: isCalculatedClosing,
            setIsCalculated: setIsCalculatedClosing
        }
    ];

    const [isFileNoError, setIsFileNoError] = useState('File Number must be entered.');
    const [isFileRefError, setIsFileRefError] = useState('File Reference must be entered.');
    const [isBuyerError, setIsBuyerError] = useState('Buyer/Borrower must be entered.');
    const [isSellerError, setIsSellerError] = useState('Seller/Lender must be entered.');
    const [isPropertyError, setIsPropertyError] = useState('Property Address must be entered.');
    const [isEffectiveError, setIsEffectiveError] = useState('File Effective Date must be entered.');
    const [isClosingError, setIsClosingError] = useState('File Closing Date must be entered.');
    const [isError, setIsError] = useState();

    useEffect(() => {
        if(!props.isOpen)
            return;

        axiosInstance.get(`${process.env.REACT_APP_API_URL}/auth/profile`).then((response) => {
            setProfile(profile => {
                return {...profile, loggedIn: true, user: response.data.username }
            });

            if(!props.new && props.fileNo) {
                axiosInstance.get(`${process.env.REACT_APP_API_URL}/files?fileNumber=${props.fileNo}`).then((response) => {
                    resetAllValues();
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
                    setStatus(file.status);
    
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
                                        setIsClosedDepositInit(date.isClosed);
                                        setIsCalculatedDepositInit(date.calculatedDate);
                                        break;
                                    case 'Second ':
                                        setDepositSecond(date.date);
                                        setIsClosedDepositSecond(date.isClosed);
                                        setIsCalculatedDepositSecond(date.calculatedDate);
                                        break;
                                }
                                break;
                            case 'Loan ✓':
                                setLoanApproval(date.date);
                                setIsClosedLoanApproval(date.isClosed);
                                setIsCalculatedLoanApproval(date.calculatedDate);
                                break;
                            case 'Inspection':
                                setInspection(date.date);
                                setIsClosedInspection(date.isClosed);
                                setIsCalculatedInspection(date.calculatedDate);
                                break;
                            case 'Closing':
                                setClosing(date.date);
                                setIsClosedClosing(date.isClosed);
                                setIsCalculatedClosing(date.calculatedDate);
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
                    });
                });
            }            
        }).catch(function (error) {
            setProfile(profile => {
                return {...profile, loggedIn: false, user: '' }
            });
            if (error.response)
                console.warn('You are not logged in. Please log in to view this content.');
            else
                console.warn('ERROR: Server is currently unavailable. Please try again later.');
        });
    }, [props.isOpen])

    useEffect(() => {
        setRoles({
            isSellerDocs: isSellerDocs,
            isBuyerDocs: isBuyerDocs,
            isEscrowAgent: isEscrowAgent,
            isTitleAgent: isTitleAgent,
            isClosingAgent: isClosingAgent,
        });
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
        });
    }, [isEscrowReceived, isLienRequested, isTitleOrdered, isLienReceived, isTitleReceived, 
        isSellerDocsDrafted, isBuyerDocsDrafted, isSellerDocsApproved, isBuyerDocsApproved,]);

    useEffect(() => {
        if(fileNo.length > 2)
            setDisplayedFileNo(`${fileNo.slice(0,2)} - ${fileNo.slice(2, fileNo.length)}`);
        else
            setDisplayedFileNo(fileNo);

        const isNum = /^\d+$/.test(fileNo);
        if(fileNo === '')
            setIsFileNoError('File Number must be entered.');
        else if(!isNum)
            setIsFileNoError('File Number must contain only digits.');
        else if(fileNo.length < 5)
            setIsFileNoError(`File Number must be 5 digits. ex. ${(new Date().getFullYear()).toString().slice(-2)}001`);
        else
            setIsFileNoError(false);
    }, [fileNo])

    useEffect(() => {
        if(fileRef === '')
            setIsFileRefError('File Reference must be entered');
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
        setIsError(isFileNoError || isFileRefError || isBuyerError || isSellerError || isPropertyError || isClosingError || false);
    }, [isFileNoError, isFileRefError, isBuyerError, isSellerError, isPropertyError, isEffectiveError, isClosingError])

    const resetAllValues = () => {
        setFileNo('');
        setFileRef('');
        setWhoRepresenting('Buyer');
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
        setIsClosedEffective(props.new ? false : true);
        setIsClosedDepositInit(props.new ? false : true);
        setIsClosedDepositSecond(props.new ? false : true);
        setIsClosedLoanApproval(props.new ? false : true);
        setIsClosedInspection(props.new ? false : true);
        setIsClosedClosing(props.new ? false : true);
        setIsCalculatedDepositInit({});
        setIsCalculatedDepositSecond({});
        setIsCalculatedLoanApproval({});
        setIsCalculatedInspection({});
        setIsCalculatedClosing({});
        setIsEscrowReceived(false);
        setIsLienRequested(false);
        setIsTitleOrdered(false);
        setIsLienReceived(false);
        setIsTitleReceived(false);
        setIsSellerDocsDrafted(false);
        setIsSellerDocsApproved(false);
        setIsBuyerDocsDrafted(false);
        setIsBuyerDocsApproved(false);
        setStatus('Open');
    }

    useEffect(() => {
        if(effective === '00-00-0000')
            setEffective('');
    }, [effective])
    useEffect(() => {
        if(depositInit === '00-00-0000')
            setDepositInit('');
    }, [depositInit])
    useEffect(() => {
        if(depositSecond === '00-00-0000')
            setDepositSecond('');
    }, [depositSecond])
    useEffect(() => {
        if(loanApproval === '00-00-0000')
            setLoanApproval('');
    }, [loanApproval])
    useEffect(() => {
        if(inspection === '00-00-0000')
            setInspection('');
    }, [inspection])
    useEffect(() => {
        if(closing === '00-00-0000')
            setClosing('');
    }, [closing])

    return (
        <Modal
            isOpen={props.isOpen}
            onClose={() => {
                if(!props.new)
                    onOpenCancelChanges();
                else
                    props.onClose();
            }}
            size={styles.modalSize}
            closeOnOverlayClick={false}
            scrollBehavior='outside'
            allowPinchZoom={true}
        >
            <ModalOverlay/>
            <ModalContent
                color='white'
                bgColor='gray.800'
            >
                <ModalCloseButton top='0px' right='0px'/>

                {!profile.loggedIn ? 
                    <ModalBody display='flex' justifyContent='center' alignItems='center'>
                        <Text>
                            You must be logged in to view, edit, or create Files.
                        </Text>
                    </ModalBody> : 
                    (!props.new && oldFileNo === '') ? 
                        <ModalBody display='flex' justifyContent='center' alignItems='center'>
                            <Spinner/>
                        </ModalBody> : 
                        <>
                            <ModalBody paddingInline={styles.modalInlinePadding} paddingBottom='0px'>
                                <FileNoAndRefInput
                                    fileNo={fileNo}
                                    setFileNo={setFileNo}
                                    isFileNoError={isFileNoError}
                                    fileRef={fileRef}
                                    setFileRef={setFileRef}
                                    isFileRefError={isFileRefError}
                                    {...styles}
                                />

                                <VStack w='full' spacing='0px' fontSize={styles.bodyFontSize}>
                                    <FileTaskInfo
                                        isPurchase={isPurchase}
                                        setIsPurchase={setIsPurchase}
                                        whoRepresenting={whoRepresenting}
                                        setWhoRepresenting={setWhoRepresenting}
                                        rolesButtons={rolesButtons}
                                        {...styles}
                                    />

                                    <Divider marginBlock='8px !important'/>

                                    <FileBuyerAndSeller
                                        isPurchase={isPurchase}
                                        whoRepresenting={whoRepresenting}
                                        buyer={buyer}
                                        setBuyer={setBuyer}
                                        isBuyerError={isBuyerError}
                                        seller={seller}
                                        setSeller={setSeller}
                                        isSellerError={isSellerError}
                                        {...styles}
                                    />
                                    
                                    <FilePropertyInfo
                                        propertyAddress={propertyAddress}
                                        setPropertyAddress={setPropertyAddress}
                                        isPropertyError={isPropertyError}
                                        folioNo={folioNo}
                                        setFolioNo={setFolioNo}
                                        {...styles}
                                    />

                                    <Divider marginBlock='8px !important'/>

                                    <Stack
                                        direction={styles.firstStacksDir}
                                        w='full' h={styles.firstStacksDir === 'row' ? styles.sec3height : ''}
                                        m='0px !important'
                                        spacing='0px'
                                    >
                                        <Stack
                                            direction={styles.secondStacksDir}
                                            h={styles.secondStacksDir === 'row' ? styles.sec3height : ''}
                                        >
                                            <HStack
                                                w={styles.firstStacksDir === 'column' ? '50%' : ''}
                                                h={styles.sec3height}
                                            >
                                                <FileDates
                                                    dates={dates}
                                                    isEffectiveError={isEffectiveError}
                                                    isClosingError={isClosingError}
                                                    status={status}
                                                    {...styles}
                                                />
                                            </HStack>

                                            <Divider
                                                orientation={styles.secondStacksDir === 'row' ? 'vertical' : 'horizontal'}
                                                h={styles.secondStacksDir === 'row' ? parseInt(styles.sec3height.slice(0,-2) - 8 + 'px') : 'full'}
                                                margin={styles.secondStacksDir === 'row' ? '0px !important' : '8px !important'}
                                                alignSelf='end'
                                            />

                                            <FileMilestones
                                                milestonesChecks={milestonesChecks}
                                                fontSize={styles.bodyFontSize}
                                            />
                                        </Stack>

                                        <Divider
                                            orientation={styles.firstStacksDir === 'row' ? 'vertical' : 'horizontal'}
                                            h={styles.firstStacksDir === 'row' ? parseInt(styles.sec3height.slice(0,-2) - 8 + 'px') : 'full'}
                                            marginBlock={styles.firstStacksDir === 'row' ? '0px !important' : '8px !important'}
                                            marginInline={styles.firstStacksDir === 'row' ? '8px !important' : '0px !important'}
                                            alignSelf='end'
                                        />

                                        <FileNotes
                                            notes={notes}
                                            setNotes={setNotes}
                                            height={styles.sec3height}
                                        />
                                    </Stack>
                                    
                                    <Divider marginBlock='8px !important'/>
                                </VStack>
                            </ModalBody>

                            <ModalFooter justifyContent='space-between' alignItems='start' m='0px' paddingTop='0px'>
                                <VStack w='full' h='full' align='left'>
                                    <HStack w='full' h={styles.footerButtonH} justifyContent='space-between'>
                                        <FileStatus
                                            status={status}
                                            setStatus={setStatus}
                                            fontSize={styles.footerFontSize}
                                            statusButtonW={styles.otherFooterButtonsW}
                                            statusButtonH={styles.footerButtonH}
                                            {...styles}
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
                                            isCalculatedDepositInit={isCalculatedDepositInit}
                                            isCalculatedDepositSecond={isCalculatedDepositSecond}
                                            isCalculatedLoanApproval={isCalculatedLoanApproval}
                                            isCalculatedInspection={isCalculatedInspection}
                                            isCalculatedClosing={isCalculatedClosing}
                                            status={status}
                                            roles={roles}
                                            milestones={milestones}
                                            notes={notes}
                                            isError={isError}
                                            toast={toast}
                                            onClose={props.onClose}
                                            resetAllValues={resetAllValues}
                                            fontSize={styles.footerFontSize}
                                            saveButtonW={styles.saveButtonW}
                                            otherButtonsW={styles.otherFooterButtonsW}
                                            buttonH={styles.footerButtonH}
                                        />
                                    </HStack>
                                    <FileFooter
                                        displayedFileNo={displayedFileNo}
                                        fileRef={fileRef}
                                        fontSize={styles.headerFontSize}
                                        tooltipSize={styles.footerTooltipSize}
                                    />
                                </VStack>
                            </ModalFooter>
                        </>
                }
            </ModalContent>

            <FileDialogBox
                isOpen={isOpenCancelChanges}
                onOpen={onOpenCancelChanges}
                onClose={onCloseCancelChanges}
                buttonHeight={props.buttonH}
                fontSize={props.fontSize}
                header={`Close File ${props.new ? 'Creator' : 'Editor'}?`}
                body={`Are you sure you want to close the File ${props.new ? 'Creator' : 'Editor'}?\nAny unsaved changes will be lost.`}
                action={props.onClose}
                confirmButton={'Close'}
            />
        </Modal>
    )
}

export default FileModal;