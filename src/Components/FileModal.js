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

    // Dialog Box Open/Close - Confirm Cancel Changes
    const {
        isOpen: isOpenCancelChanges,
        onOpen: onOpenCancelChanges,
        onClose: onCloseCancelChanges
    } = useDisclosure();
    // Dialog Box Open/Close - Confirm Receive External Update to Currently Opened File Modal
    const {
        isOpen: isOpenReceiveUpdate,
        onOpen: onOpenReceiveUpdate,
        onClose: onCloseReceiveUpdate
    } = useDisclosure();
    // File Modal Open/Close - Update (Reopen) File Modal Upon Confirming to Receive External Changes
    const {
        isOpen: isOpenReopenedModal,
        onOpen: onOpenReopenedModal,
        onClose: onCloseReopenedModal
    } = useDisclosure();

    useEffect(() => {
        const windowListener = () => {
            if(window.innerWidth >= 1150) {
                setStyles({
                    modalSize:'5xl', modalInlinePadding:'24px', bodyFontSize: '14px',
                    bodyInputHeight: '30px', inputPadding:'16px', spacing:'8px',
                    partiesStacksDir:'row', propertyStacksDir:'row', secondStacksDir: 'row',
                    headerFontSize:'16px', headerInputHeight: '32px', headerStackDir:'row',
                    fileNoW:'75px', fileRefW:'620px', beginningMinW:'57px', secondMinW:'43px',
                    sec3height:'240px', dateTypeW:'68px', dateW:'150px', datesSpacing:'6px',
                    clipboardIconSize:'20px', calculatorIconSize:'26px', lockIconSize:'16px',
                    fileTypeTabsW:'80px', fileRepTabsW:'50px', tabsPadding:'5px',
                    saveButtonW:'100px', otherFooterButtonsW:'120px', footerButtonH:'40px', footerFontSize:'16px', footerTooltipSize:'700px'
                });
            } else if(window.innerWidth >= 900) {
                setStyles({
                    modalSize:'3xl', modalInlinePadding:'24px', bodyFontSize: '12px',
                    bodyInputHeight: '26px', inputPadding:'12px', spacing:'8px',
                    partiesStacksDir:'row', propertyStacksDir:'row', secondStacksDir: 'row', 
                    headerFontSize:'14px', headerInputHeight: '28px', headerStackDir:'row', 
                    fileNoW:'65px', fileRefW:'500px', beginningMinW:'49px', secondMinW:'38px',
                    sec3height:'210px', dateTypeW:'60px', dateW:'135px', datesSpacing:'6px',
                    clipboardIconSize:'18px', calculatorIconSize:'24px', lockIconSize:'14px',
                    fileTypeTabsW:'60px', fileRepTabsW:'44px', tabsPadding:'3px',
                    saveButtonW:'80px', otherFooterButtonsW:'110px', footerButtonH:'36px', footerFontSize:'14px', footerTooltipSize:'500px'
                });
            } else if(window.innerWidth >= 650) {
                setStyles({
                    modalSize:'xl', modalInlinePadding:'16px', bodyFontSize: '12px',
                    bodyInputHeight: '22px', inputPadding:'10px', spacing:'8px',
                    partiesStacksDir:'column', propertyStacksDir:'row', secondStacksDir: 'row', 
                    headerFontSize:'14px', headerInputHeight: '24px', headerStackDir:'row', 
                    fileNoW:'65px', fileRefW:'340px', beginningMinW:'49px', secondMinW:'30px',
                    sec3height:'188px', dateTypeW:'60px', dateW:'135px', datesSpacing:'6px',
                    clipboardIconSize:'16px', calculatorIconSize:'22px', lockIconSize:'14px',
                    fileTypeTabsW:'60px', fileRepTabsW:'44px', tabsPadding:'3px',
                    saveButtonW:'60px', otherFooterButtonsW:'90px', footerButtonH:'32px', footerFontSize:'12px', footerTooltipSize:'350px'
                });
            } else if(window.innerWidth >= 530) {
                setStyles({
                    modalSize:'sm', modalInlinePadding:'12px', bodyFontSize: '10px',
                    bodyInputHeight: '18px', inputPadding:'8px', spacing:'6px',
                    partiesStacksDir:'column', propertyStacksDir:'row', secondStacksDir: 'column',
                    headerFontSize:'12px', headerInputHeight: '20px', headerStackDir:'column',
                    fileNoW:'60px', fileRefW:'full', beginningMinW:'41px', secondMinW:'22px',
                    sec3height:'159px', dateTypeW:'60px', dateW:'120px', datesSpacing:'6px',
                    clipboardIconSize:'16px', calculatorIconSize:'18px', lockIconSize:'12px',
                    fileTypeTabsW:'60px', fileRepTabsW:'44px', tabsPadding:'3px',
                    saveButtonW:'40px', otherFooterButtonsW:'80px', footerButtonH:'28px', footerFontSize:'10px', footerTooltipSize:'200px'
                });
            } else {
                setStyles({
                    modalSize:'xs', modalInlinePadding:'12px', bodyFontSize: '10px',
                    bodyInputHeight: '18px', inputPadding:'8px', spacing:'4px',
                    partiesStacksDir:'column', propertyStacksDir:'row', secondStacksDir: 'column',
                    headerFontSize:'12px', headerInputHeight: '20px', headerStackDir:'column',
                    fileNoW:'60px', fileRefW:'full', beginningMinW:'41px', secondMinW:'22px',
                    sec3height:'', dateTypeW:'60px', dateW:'120px', datesSpacing:'6px',
                    clipboardIconSize:'16px', calculatorIconSize:'18px', lockIconSize:'12px',
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
    const [storedFile, setStoredFile] = useState({});
    const [externalChanges, setExternalChanges] = useState(props.externalChanges || false);
    
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
    const [county, setCounty] = useState('');
    const [folioNo, setFolioNo] = useState('');
    const [notes, setNotes] = useState('');

    const [isSellerDocs, setIsSellerDocs] = useState(false);
    const [isBuyerDocs, setIsBuyerDocs] = useState(false);
    const [isLoanDocs, setIsLoanDocs] = useState(false);
    const [isEscrowAgent, setIsEscrowAgent] = useState(false);
    const [isTitleAgent, setIsTitleAgent] = useState(false);
    const [isClosingAgent, setIsClosingAgent] = useState(false);
    const [needEstoppel, setNeedEstoppel] = useState(false);
    const [needSurvey, setNeedSurvey] = useState(false);

    const[roles, setRoles] = useState({
        isSellerDocs: false,
        isBuyerDocs: false,
        isLoanDocs: false,
        isEscrowAgent: false,
        isTitleAgent: false,
        isClosingAgent: false,
        needEstoppel: false,
        needSurvey: false,
    });

    const rolesButtons = [
        { label: 'Seller Docs', value: isSellerDocs, set: setIsSellerDocs },
        { label: 'Buyer Docs', value: isBuyerDocs, set: setIsBuyerDocs },
        { label: 'Loan Docs', value: isLoanDocs, set: setIsLoanDocs },
        { label: 'Escrow Agent', value: isEscrowAgent, set: setIsEscrowAgent },
        { label: 'Title Agent', value: isTitleAgent, set: setIsTitleAgent },
        { label: 'Closing Agent', value: isClosingAgent, set: setIsClosingAgent },
        { label: 'Estoppel Required', value: needEstoppel, set: setNeedEstoppel },
        { label: 'Survey Required', value: needSurvey, set: setNeedSurvey },
    ];

    const [effective, setEffective] = useState('');
    const [depositInit, setDepositInit] = useState('');
    const [depositSecond, setDepositSecond] = useState('');
    const [inspection, setInspection] = useState('');
    const [loanApproval, setLoanApproval] = useState('');
    const [closing, setClosing] = useState('');

    const [isEscrowReceived, setIsEscrowReceived] = useState(false);
    const [isTitleOrdered, setIsTitleOrdered] = useState(false);
    const [isTitleReceived, setIsTitleReceived] = useState(false);
    const [isLienOrdered, setIsLienOrdered] = useState(false);
    const [isLienReceived, setIsLienReceived] = useState(false);
    const [isSellerDocsDrafted, setIsSellerDocsDrafted] = useState(false);
    const [isSellerDocsApproved, setIsSellerDocsApproved] = useState(false);
    const [isBuyerDocsDrafted, setIsBuyerDocsDrafted] = useState(false);
    const [isBuyerDocsApproved, setIsBuyerDocsApproved] = useState(false);
    const [isLoanDocsDrafted, setIsLoanDocsDrafted] = useState(false);
    const [isLoanDocsApproved, setIsLoanDocsApproved] = useState(false);
    const [isEstoppelOrdered, setIsEstoppelOrdered] = useState(false);
    const [isEstoppelReceived, setIsEstoppelReceived] = useState(false);
    const [isSurveyOrdered, setisSurveyOrdered] = useState(false);
    const [isSurveyReceived, setisSurveyReceived] = useState(false);
    const [areDocsRecorded, setAreDocsRecorded] = useState(false);
    const [areFeesReceived, setAreFeesReceived] = useState(false);
    
    const [milestones, setMilestones] = useState({
        isEscrowReceived: false,
        isTitleOrdered: false,
        isTitleReceived: false,
        isLienOrdered: false,
        isLienReceived: false,
        isSellerDocsDrafted: false,
        isSellerDocsApproved: false,
        isBuyerDocsDrafted: false,
        isBuyerDocsApproved: false,
        isLoanDocsDrafted: false,
        isLoanDocsApproved: false,
        isEstoppelOrdered: false,
        isEstoppelReceived: false,
        isSurveyOrdered: false,
        isSurveyReceived: false,
        areDocsRecorded: false,
        areFeesReceived: false,
    });

    const milestonesChecks = [
        { label: 'Escrow Fully Received?', role: isEscrowAgent, reqMilestone: undefined, value: isEscrowReceived, set: setIsEscrowReceived },
        { label: 'Title Work Ordered?', role: isTitleAgent, reqMilestone: undefined, value: isTitleOrdered, set: setIsTitleOrdered },
        { label: 'Title Work Received?', role: isTitleAgent, reqMilestone: isTitleOrdered, value: isTitleReceived, set: setIsTitleReceived },
        { label: 'Lien Search Ordered?', role: isTitleAgent, reqMilestone: undefined, value: isLienOrdered, set: setIsLienOrdered },
        { label: 'Lien Search Received?', role: isTitleAgent, reqMilestone: isLienOrdered, value: isLienReceived, set: setIsLienReceived },
        { label: 'Seller Docs Drafted?', role: isSellerDocs, reqMilestone: undefined, value: isSellerDocsDrafted, set: setIsSellerDocsDrafted },
        { label: 'Seller Docs Approved?', role: isSellerDocs, reqMilestone: isSellerDocsDrafted, value: isSellerDocsApproved, set: setIsSellerDocsApproved },
        { label: 'Buyer Docs Drafted?', role: isBuyerDocs, reqMilestone: undefined, value: isBuyerDocsDrafted, set: setIsBuyerDocsDrafted },
        { label: 'Buyer Docs Approved?', role: isBuyerDocs, reqMilestone: isBuyerDocsDrafted, value: isBuyerDocsApproved, set: setIsBuyerDocsApproved },
        { label: 'Loan Docs Drafted?', role: isLoanDocs, reqMilestone: undefined, value: isLoanDocsDrafted, set: setIsLoanDocsDrafted },
        { label: 'Loan Docs Approved?', role: isLoanDocs, reqMilestone: isLoanDocsDrafted, value: isLoanDocsApproved, set: setIsLoanDocsApproved },
        { label: 'Estoppel Ordered?', role: needEstoppel, reqMilestone: undefined, value: isEstoppelOrdered, set: setIsEstoppelOrdered },
        { label: 'Estoppel Received?', role: needEstoppel, reqMilestone: isEstoppelOrdered, value: isEstoppelReceived, set: setIsEstoppelReceived },
        { label: 'Survey Ordered?', role: needSurvey, reqMilestone: undefined, value: isSurveyOrdered, set: setisSurveyOrdered },
        { label: 'Survey Received?', role: needSurvey, reqMilestone: isSurveyOrdered, value: isSurveyReceived, set: setisSurveyReceived },
        { label: 'Documents Recorded?', role: isClosingAgent, reqMilestone: undefined, value: areDocsRecorded, set: setAreDocsRecorded },
        { label: 'Our Fees Received?', role: true, reqMilestone: undefined, value: areFeesReceived, set: setAreFeesReceived },
    ];

    const [status, setStatus] = useState('Open');
    const [isClosedEffective, setIsClosedEffective] = useState(props.new ? false : true);
    const [isClosedDepositInit, setIsClosedDepositInit] = useState(props.new ? false : true);
    const [isClosedDepositSecond, setIsClosedDepositSecond] = useState(props.new ? false : true);
    const [isClosedInspection, setIsClosedInspection] = useState(props.new ? false : true);
    const [isClosedLoanApproval, setIsClosedLoanApproval] = useState(props.new ? false : true);
    const [isClosedClosing, setIsClosedClosing] = useState(props.new ? false : true);

    const [isCalculatedDepositInit, setIsCalculatedDepositInit] = useState({});
    const [isCalculatedDepositSecond, setIsCalculatedDepositSecond] = useState({});
    const [isCalculatedInspection, setIsCalculatedInspection] = useState({});
    const [isCalculatedLoanApproval, setIsCalculatedLoanApproval] = useState({});
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
            label: 'Inspection', 
            value: inspection, 
            setValue: setInspection, 
            isClosed: isClosedInspection, 
            setIsClosed: setIsClosedInspection,
            isCalculated: isCalculatedInspection,
            setIsCalculated: setIsCalculatedInspection
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
    const [isPropertyError, setIsPropertyError] = useState('Property Address or County & Folio No. must be entered.');
    const [isEffectiveError, setIsEffectiveError] = useState('File Effective Date must be entered.');
    const [isClosingError, setIsClosingError] = useState('File Closing Date must be entered.');
    const [isError, setIsError] = useState();

    useEffect(() => {
        if(!props.isOpen || props.new || !props.fileNo)
            return;
        
        setProfile(profile => { return {...profile, openModal: props.fileNo }});

        // STAGING ENVIRONMENT - Get the stored file and date info from localStorage.
        if(process.env.REACT_APP_ENV === 'staging') {
            resetAllValues();

            // Get the stored file information for the chosen file; Set each state hook accordingly.
            var storedFiles = JSON.parse(localStorage.getItem('files'));
            var file = storedFiles[props.fileNo];
            setStoredFile(file);

            setOldFileNo(file.fileNumber);
            setFileNo(file.fileNumber);
            setFileRef(file.fileRef);
            setPropertyAddress(file.address);
            setCounty(file.county);
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
            setIsLoanDocs(responseRoles.isLoanDocs);
            setIsEscrowAgent(responseRoles.isEscrowAgent);
            setIsTitleAgent(responseRoles.isTitleAgent);
            setIsClosingAgent(responseRoles.isClosingAgent);
            setNeedEstoppel(responseRoles.needEstoppel);
            setNeedSurvey(responseRoles.needSurvey);

            const responseMilestones = JSON.parse(file.milestones);
            setIsEscrowReceived(responseMilestones.isEscrowReceived);
            setIsTitleOrdered(responseMilestones.isTitleOrdered);
            setIsTitleReceived(responseMilestones.isTitleReceived);
            setIsLienOrdered(responseMilestones.isLienOrdered);
            setIsLienReceived(responseMilestones.isLienReceived);
            setIsSellerDocsDrafted(responseMilestones.isSellerDocsDrafted);
            setIsSellerDocsApproved(responseMilestones.isSellerDocsApproved);
            setIsBuyerDocsDrafted(responseMilestones.isBuyerDocsDrafted);
            setIsBuyerDocsApproved(responseMilestones.isBuyerDocsApproved);
            setIsLoanDocsDrafted(responseMilestones.isLoanDocsDrafted);
            setIsLoanDocsApproved(responseMilestones.isLoanDocsApproved);
            setIsEstoppelOrdered(responseMilestones.isEstoppelOrdered);
            setIsEstoppelReceived(responseMilestones.isEstoppelReceived);
            setisSurveyOrdered(responseMilestones.isSurveyOrdered);
            setisSurveyReceived(responseMilestones.isSurveyReceived);
            setAreDocsRecorded(responseMilestones.areDocsRecorded);
            setAreFeesReceived(responseMilestones.areFeesReceived);

            // Get the stored dates for the chosen file; Set each state hook accordingly.
            var storedDates = JSON.parse(localStorage.getItem('dates'));
            file.Dates = [];

            Object.entries(storedDates).forEach(date => {
                date = date[1];
                if(date.fileNumber === props.fileNo)
                    file.Dates.push(date);
            });
            
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
                    case 'Inspection':
                        setInspection(date.date);
                        setIsClosedInspection(date.isClosed);
                        setIsCalculatedInspection(date.calculatedDate);
                        break;
                    case 'Loan Approval':
                        setLoanApproval(date.date);
                        setIsClosedLoanApproval(date.isClosed);
                        setIsCalculatedLoanApproval(date.calculatedDate);
                        break;
                    case 'Closing':
                        setClosing(date.date);
                        setIsClosedClosing(date.isClosed);
                        setIsCalculatedClosing(date.calculatedDate);
                        break;
                }
            }
            return;
        }

        // PRODUCTION ENVIRONMENT - Get the stored file and date info from database.
        axiosInstance.get(`${process.env.REACT_APP_API_URL}/auth/profile`).then((response) => {
            setProfile(profile => {
                return {...profile, loggedIn: true, user: response.data.username }
            });

            axiosInstance.get(`${process.env.REACT_APP_API_URL}/files?fileNumber=${props.fileNo}`).then((response) => {
                resetAllValues();
                const file = response.data.file;
                setStoredFile(file);
                setOldFileNo(file.fileNumber);
                setFileNo(file.fileNumber);
                setFileRef(file.fileRef);
                setPropertyAddress(file.address);
                setCounty(file.county);
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
                setIsLoanDocs(responseRoles.isLoanDocs);
                setIsEscrowAgent(responseRoles.isEscrowAgent);
                setIsTitleAgent(responseRoles.isTitleAgent);
                setIsClosingAgent(responseRoles.isClosingAgent);
                setNeedEstoppel(responseRoles.needEstoppel);
                setNeedSurvey(responseRoles.needSurvey);

                const responseMilestones = JSON.parse(file.milestones);
                setIsEscrowReceived(responseMilestones.isEscrowReceived);
                setIsTitleOrdered(responseMilestones.isTitleOrdered);
                setIsTitleReceived(responseMilestones.isTitleReceived);
                setIsLienOrdered(responseMilestones.isLienOrdered);
                setIsLienReceived(responseMilestones.isLienReceived);
                setIsSellerDocsDrafted(responseMilestones.isSellerDocsDrafted);
                setIsSellerDocsApproved(responseMilestones.isSellerDocsApproved);
                setIsBuyerDocsDrafted(responseMilestones.isBuyerDocsDrafted);
                setIsBuyerDocsApproved(responseMilestones.isBuyerDocsApproved);
                setIsLoanDocsDrafted(responseMilestones.isLoanDocsDrafted);
                setIsLoanDocsApproved(responseMilestones.isLoanDocsApproved);
                setIsEstoppelOrdered(responseMilestones.isEstoppelOrdered);
                setIsEstoppelReceived(responseMilestones.isEstoppelReceived);
                setisSurveyOrdered(responseMilestones.isSurveyOrdered);
                setisSurveyReceived(responseMilestones.isSurveyReceived);
                setAreDocsRecorded(responseMilestones.areDocsRecorded);
                setAreFeesReceived(responseMilestones.areFeesReceived);

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
                        case 'Inspection':
                            setInspection(date.date);
                            setIsClosedInspection(date.isClosed);
                            setIsCalculatedInspection(date.calculatedDate);
                            break;
                        case 'Loan Approval':
                            setLoanApproval(date.date);
                            setIsClosedLoanApproval(date.isClosed);
                            setIsCalculatedLoanApproval(date.calculatedDate);
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

    // Check if File Modal remains unchanged (return true if unchanged, false if changed).
    const checkFileUnchanged = () => {
        const file = storedFile;
        const storedRoles = JSON.parse(file.roles);
        const storedMilestones = JSON.parse(file.milestones);
        const storedDates = file.Dates;

        const checkDateEquivalence = (date, isClosedDate, isCalculatedDate, type, prefix) => {
            const storedDate = storedDates.filter(storedDate => {
                return storedDate.type === type && (prefix ? (storedDate.prefix === prefix) : true);
            });
            if(date === '' && storedDate.length === 0)
                return true;
            else if(storedDate.length > 0 && date === storedDate[0].date &&
                isClosedDate === storedDate[0].isClosed &&
                (type === 'Effective' ? true : (
                    isCalculatedDate.isCalculated === storedDate[0].calculatedDate.isCalculated && 
                    isCalculatedDate.numDays === storedDate[0].calculatedDate.numDays && 
                    isCalculatedDate.direction === storedDate[0].calculatedDate.direction && 
                    isCalculatedDate.from === storedDate[0].calculatedDate.from && 
                    isCalculatedDate.otherDate === storedDate[0].calculatedDate.otherDate
                ))
            )
                return true;
            return false;
        }

        return fileNo === file.fileNumber &&
            fileRef === file.fileRef &&
            propertyAddress === file.address &&
            county === file.county &&
            folioNo === file.folioNo &&
            seller === file.seller &&
            buyer === file.buyer &&
            isPurchase == file.isPurchase &&
            whoRepresenting == file.whoRepresenting &&
            notes === file.notes &&
            status === file.status &&
            isSellerDocs === storedRoles.isSellerDocs &&
            isBuyerDocs === storedRoles.isBuyerDocs &&
            isLoanDocs === storedRoles.isLoanDocs &&
            isEscrowAgent === storedRoles.isEscrowAgent &&
            isTitleAgent === storedRoles.isTitleAgent &&
            isClosingAgent === storedRoles.isClosingAgent &&
            needEstoppel === storedRoles.needEstoppel &&
            needSurvey === storedRoles.needSurvey &&
            isEscrowReceived === storedMilestones.isEscrowReceived &&
            isTitleOrdered === storedMilestones.isTitleOrdered &&
            isTitleReceived === storedMilestones.isTitleReceived &&
            isLienOrdered === storedMilestones.isLienOrdered &&
            isLienReceived === storedMilestones.isLienReceived &&
            isSellerDocsDrafted === storedMilestones.isSellerDocsDrafted &&
            isSellerDocsApproved === storedMilestones.isSellerDocsApproved &&
            isBuyerDocsDrafted === storedMilestones.isBuyerDocsDrafted &&
            isBuyerDocsApproved === storedMilestones.isBuyerDocsApproved &&
            isLoanDocsDrafted === storedMilestones.isLoanDocsDrafted &&
            isLoanDocsApproved === storedMilestones.isLoanDocsApproved &&
            isEstoppelOrdered === storedMilestones.isEstoppelOrdered &&
            isEstoppelReceived === storedMilestones.isEstoppelReceived &&
            isSurveyOrdered === storedMilestones.isSurveyOrdered &&
            isSurveyReceived === storedMilestones.isSurveyReceived &&
            areDocsRecorded === storedMilestones.areDocsRecorded &&
            areFeesReceived === storedMilestones.areFeesReceived &&
            checkDateEquivalence(effective, isClosedEffective, undefined, 'Effective', undefined) &&
            checkDateEquivalence(depositInit, isClosedDepositInit, isCalculatedDepositInit, 'Escrow', 'First ') &&
            checkDateEquivalence(depositSecond, isClosedDepositSecond, isCalculatedDepositSecond, 'Escrow', 'Second ') &&
            checkDateEquivalence(loanApproval, isClosedLoanApproval, isCalculatedLoanApproval, 'Loan Approval', undefined) &&
            checkDateEquivalence(inspection, isClosedInspection, isCalculatedInspection, 'Inspection', undefined) &&
            checkDateEquivalence(closing, isClosedClosing, isCalculatedClosing, 'Closing', undefined);
    }

    useEffect(() => {
        setRoles({
            isSellerDocs: isSellerDocs,
            isBuyerDocs: isBuyerDocs,
            isLoanDocs: isLoanDocs,
            isEscrowAgent: isEscrowAgent,
            isTitleAgent: isTitleAgent,
            isClosingAgent: isClosingAgent,
            needEstoppel: needEstoppel,
            needSurvey: needSurvey,
        });
    }, [isSellerDocs, isBuyerDocs, isLoanDocs, isEscrowAgent, isTitleAgent, isClosingAgent, needEstoppel, needSurvey]);

    useEffect(() => {
        setMilestones({
            isEscrowReceived: isEscrowReceived,
            isTitleOrdered: isTitleOrdered,
            isTitleReceived: isTitleReceived,
            isLienOrdered: isLienOrdered,
            isLienReceived: isLienReceived,
            isSellerDocsDrafted: isSellerDocsDrafted,
            isSellerDocsApproved: isSellerDocsApproved,
            isBuyerDocsDrafted: isBuyerDocsDrafted,
            isBuyerDocsApproved: isBuyerDocsApproved,
            isLoanDocsDrafted: isLoanDocsDrafted,
            isLoanDocsApproved: isLoanDocsApproved,
            isEstoppelOrdered: isEstoppelOrdered,
            isEstoppelReceived: isEstoppelReceived,
            isSurveyOrdered: isSurveyOrdered,
            isSurveyReceived: isSurveyReceived,
            areDocsRecorded: areDocsRecorded,
            areFeesReceived: areFeesReceived,
        });
    }, [
        isEscrowReceived, isTitleOrdered, isTitleReceived, isLienOrdered, isLienReceived,
        isSellerDocsDrafted, isSellerDocsApproved, isBuyerDocsDrafted, isBuyerDocsApproved,
        isLoanDocsDrafted, isLoanDocsApproved, isEstoppelOrdered, isEstoppelReceived,
        isSurveyOrdered, isSurveyReceived, areDocsRecorded, areFeesReceived,
    ]);

    useEffect(() => {
        if(fileNo.length > 5)
            setDisplayedFileNo(`${fileNo.slice(0,2)} - ${fileNo.slice(2, 5)} (${fileNo.slice(5)})`);
        else if(fileNo.length > 2)
            setDisplayedFileNo(`${fileNo.slice(0,2)} - ${fileNo.slice(2, fileNo.length)}`);
        else
            setDisplayedFileNo(fileNo);

        const isNum = /^\d+$/.test(fileNo.slice(0,5));
        const isAlpha = /^[A-Z]+$/.test(fileNo.slice(5)) || fileNo.slice(5).length === 0;

        const exFileNo = `${(new Date().getFullYear()).toString().slice(-2)}001`
        if(fileNo === '')
            setIsFileNoError('File Number must be entered.');
        else if(fileNo.length < 5 || !isNum || !isAlpha)
            setIsFileNoError(`File Number must begin with a 5-digit NUMBER (ex. ${exFileNo}), 
            and optionally end with a 1-2 letter tag (${exFileNo}AB)`);
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
        if(!propertyAddress && (!county || !folioNo))
            setIsPropertyError('Property Address or County & Folio No. must be entered.');
        else
            setIsPropertyError(false);
    }, [propertyAddress, county, folioNo])

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
        setCounty('');
        setFolioNo('');
        setNotes('');
        setIsSellerDocs(false);
        setIsBuyerDocs(false);
        setIsLoanDocs(false);
        setIsEscrowAgent(false);
        setIsTitleAgent(false);
        setIsClosingAgent(false);
        setNeedEstoppel(false);
        setNeedSurvey(false);
        setEffective('00-00-0000');
        setDepositInit('00-00-0000');
        setDepositSecond('00-00-0000');
        setInspection('00-00-0000');
        setLoanApproval('00-00-0000');
        setClosing('00-00-0000');
        setIsClosedEffective(props.new ? false : true);
        setIsClosedDepositInit(props.new ? false : true);
        setIsClosedDepositSecond(props.new ? false : true);
        setIsClosedInspection(props.new ? false : true);
        setIsClosedLoanApproval(props.new ? false : true);
        setIsClosedClosing(props.new ? false : true);
        setIsCalculatedDepositInit({});
        setIsCalculatedDepositSecond({});
        setIsCalculatedInspection({});
        setIsCalculatedLoanApproval({});
        setIsCalculatedClosing({});
        setIsEscrowReceived(false);
        setIsTitleOrdered(false);
        setIsTitleReceived(false);
        setIsLienOrdered(false);
        setIsLienReceived(false);
        setIsSellerDocsDrafted(false);
        setIsSellerDocsApproved(false);
        setIsBuyerDocsDrafted(false);
        setIsBuyerDocsApproved(false);
        setIsLoanDocsDrafted(false);
        setIsLoanDocsApproved(false);
        setIsEstoppelOrdered(false);
        setIsEstoppelReceived(false);
        setisSurveyOrdered(false);
        setisSurveyReceived(false);
        setAreDocsRecorded(false);
        setAreFeesReceived(false);
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
        if(inspection === '00-00-0000')
            setInspection('');
    }, [inspection])
    useEffect(() => {
        if(loanApproval === '00-00-0000')
            setLoanApproval('');
    }, [loanApproval])
    useEffect(() => {
        if(closing === '00-00-0000')
            setClosing('');
    }, [closing])

    useEffect(() => {
        if(!props.isOpen)
            return;
        // Currently opened file has been deleted by another user. Close the file and inform the user.
        if(profile.updatesReceived && profile.updatesReceived.some(date => date.fileNumber === props.fileNo && date.change === 'File-deleted')) {
            console.warn("The file you currently have opened was deleted by another user. Closing...");
            toast({
                title: 'File deleted.',
                description: `The file you had open, ( File ${oldFileNo}) was deleted by another user.`,
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
            props.onClose();
            return setProfile(profile => {
                return {...profile, actions: profile.actions + 1 }
            });
        }
        // Currently opened file has been updated by another user. Open dialog box to inform user and ask user how to proceed.
        if(profile.updatesReceived && profile.updatesReceived.some(date => date.fileNumber === props.fileNo) && !isOpenReopenedModal) {
            console.info("The file you currently have opened has been updated by another user.");
            onOpenReceiveUpdate();
        }
        // Other file(s) has/have been updated by another user. They will be updated when user exits the file modal.
        console.info("Other files have been updated by another user.");
        setExternalChanges(true);
    }, [profile.externalActions]);

    return (
        <Modal
            isOpen={props.isOpen}
            onClose={() => {
                if(!props.new) {
                    if(!checkFileUnchanged())
                        onOpenCancelChanges();
                    else {
                        if(externalChanges) {
                            setExternalChanges(false);
                            setProfile(profile => {
                                return {...profile, actions: profile.actions + 1 }
                            });
                        }
                        props.onClose();
                    }
                }
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
                                        county={county}
                                        setCounty={setCounty}
                                        folioNo={folioNo}
                                        setFolioNo={setFolioNo}
                                        isPropertyError={isPropertyError}
                                        {...styles}
                                    />

                                    <Divider marginBlock='8px !important'/>

                                    <Stack
                                        direction={styles.partiesStacksDir}
                                        w='full' h='100%'
                                        m='0px !important'
                                        spacing='0px'
                                    >
                                        <Stack
                                            direction={styles.secondStacksDir} h='auto'
                                        >
                                            <FileDates
                                                dates={dates}
                                                isEffectiveError={isEffectiveError}
                                                isClosingError={isClosingError}
                                                status={status}
                                                {...styles}
                                            />

                                            <Divider
                                                orientation={styles.secondStacksDir === 'row' ? 'vertical' : 'horizontal'}
                                                h='auto'
                                                margin={styles.secondStacksDir === 'row' ? '0px !important' : '8px !important'}
                                            />

                                            <FileMilestones
                                                stackDir={styles.secondStacksDir}
                                                milestonesChecks={milestonesChecks}
                                                fontSize={styles.bodyFontSize}
                                            />
                                        </Stack>

                                        <Divider
                                            orientation={styles.partiesStacksDir === 'row' ? 'vertical' : 'horizontal'}
                                            h='auto'
                                            marginBlock={styles.partiesStacksDir === 'row' ? '0px !important' : '8px !important'}
                                            marginInline={styles.partiesStacksDir === 'row' ? '8px !important' : '0px !important'}
                                        />

                                        <FileNotes
                                            notes={notes}
                                            setNotes={setNotes}
                                            minHeight={styles.partiesStacksDir === 'row' ? '0px' : styles.sec3height}
                                            height='auto'
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
                                            county={county}
                                            folioNo={folioNo}
                                            buyer={buyer}
                                            seller={seller}
                                            effective={effective}
                                            depositInit={depositInit}
                                            depositSecond={depositSecond}
                                            inspection={inspection}
                                            loanApproval={loanApproval}
                                            closing={closing}
                                            isClosedEffective={isClosedEffective}
                                            isClosedDepositInit={isClosedDepositInit}
                                            isClosedDepositSecond={isClosedDepositSecond}
                                            isClosedInspection={isClosedInspection}
                                            isClosedLoanApproval={isClosedLoanApproval}
                                            isClosedClosing={isClosedClosing}
                                            isCalculatedDepositInit={isCalculatedDepositInit}
                                            isCalculatedDepositSecond={isCalculatedDepositSecond}
                                            isCalculatedInspection={isCalculatedInspection}
                                            isCalculatedLoanApproval={isCalculatedLoanApproval}
                                            isCalculatedClosing={isCalculatedClosing}
                                            status={status}
                                            roles={roles}
                                            milestones={milestones}
                                            notes={notes}
                                            isError={isError}
                                            toast={toast}
                                            onClose={props.onClose}
                                            resetAllValues={resetAllValues}
                                            checkFileUnchanged={checkFileUnchanged}
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
                body={`Are you sure you want to close the File ${props.new ? 'Creator' : 'Editor'}?\nThe unsaved changes you have made will be lost.`}
                action={() => {
                    props.onClose();                
                    if(externalChanges) {
                        setExternalChanges(false);
                        setProfile(profile => {
                            return {...profile, actions: profile.actions + 1 }
                        });
                    }
                }}
                cancelButton={'Cancel'}
                confirmButton={'Close'}
            />
            <FileDialogBox
                isOpen={isOpenReceiveUpdate}
                onOpen={onOpenReceiveUpdate}
                onClose={onCloseReceiveUpdate}
                buttonHeight={props.buttonH}
                fontSize={props.fontSize}
                header={`Changes have been made to this file by another user.`}
                body={`Would you like to cancel your editing and receive these changes, or forgo the changes to keep your own?`}
                action={() => {
                    onOpenReopenedModal();
                }}
                cancelButton={'Continue Editing'}
                confirmButton={'Receive Changes'}
            />
            <FileModal
                new={props.new}
                onClose={() => {
                    setProfile(profile => {
                        return {...profile, openModal: '' }
                    });
                    props.onClose();
                    return onCloseReopenedModal();
                }}
                isOpen={isOpenReopenedModal}
                externalChanges={true}
                fileNo={
                    (profile.updatesReceived.length > 0 && profile.updatesReceived.filter(date => date.fileNumber === props.fileNo)[0]) ?
                        profile.updatesReceived.filter(date => date.fileNumber === props.fileNo)[0].newFileNumber :
                        props.fileNo
                }
            />
        </Modal>
    )
}

export default FileModal;