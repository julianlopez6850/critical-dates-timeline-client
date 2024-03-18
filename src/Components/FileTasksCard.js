import { useContext, useEffect, useState } from 'react';

import {
    Box,
    Divider,
    HStack,
    Text,
    VStack,
    useDisclosure
} from '@chakra-ui/react';

import { profileContext } from '../Helpers/profileContext';
import FileModal from '../Components/FileModal';

function FileTasksCardMilestones(props) {
    if(props.condition)
        return (
            <HStack
                w='full'
                justifyContent='left'
                color={props.color}
            >
                <Text
                    w={props.headerW}
                    whiteSpace='pre-wrap'
                    textAlign='left'
                >
                    {props.header}
                </Text>
                <Text>
                    {props.progress}
                </Text>
            </HStack>
        )
    else
        return;
}

function FileTasksCard(props) {
    const { profile, setProfile} = useContext(profileContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const [styles, setStyles] = useState({
        cardW:'720px', fontSize:'16px', paddingInline:'40px',
        spacing:'20px', rolesW:'40%', milestonesW:'60%', milestoneHeaderW:'130px',
    });

    useEffect(() => {
        const windowListener = () => {
            if(window.innerWidth >= 900) {
                setStyles({
                    cardW:'720px', fontSize:'16px', paddingInline:'40px',
                    spacing:'20px', rolesW:'40%', milestonesW:'60%', milestoneHeaderW:'130px',
                });
            } else if(window.innerWidth >= 650) {
                setStyles({
                    cardW:'600px', fontSize:'13px', paddingInline:'40px',
                    spacing:'20px', rolesW:'40%', milestonesW:'60%', milestoneHeaderW:'105px'
                });
            } else if(window.innerWidth >= 530) {
                setStyles({
                    cardW:'480px', fontSize:'10px', paddingInline:'20px',
                    spacing:'20px', rolesW:'40%', milestonesW:'60%', milestoneHeaderW:'85px'
                });
            } else if(window.innerWidth >= 400) {
                setStyles({
                    cardW:'360px', fontSize:'7.5px', paddingInline:'20px',
                    spacing:'15px', rolesW:'35%', milestonesW:'65%', milestoneHeaderW:'60px'
                });
            } else {
                setStyles({
                    cardW:'260px', fontSize:'6px', paddingInline:'10px',
                    spacing:'10px', rolesW:'30%', milestonesW:'70%', milestoneHeaderW:'50px'
                });
            };
        };
        windowListener();
        window.addEventListener('resize', windowListener);
        return () => window.removeEventListener('resize', windowListener);
    }, []);

    const roles = {
        isSellerDocs: 'Seller Docs',
        isBuyerDocs: 'Buyer Docs',
        isLoanDocs: 'Loan Docs',
        isEscrowAgent: 'Escrow Agent',
        isTitleAgent: 'Title Agent',
        isClosingAgent: 'Closing Agent',
        needEstoppel: 'Order Estoppel',
        needSurvey: 'Order Survey'
    }

    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const closingDateString = months[parseInt(props.closing.date.slice(5,7)) - 1] + ' ' +
        props.closing.date.slice(8,10) + ', ' + parseInt(props.closing.date.slice(0,4));

    return (
        <>
            <Box
                h='fit-content'
                w={styles.cardW}
                border='1px solid white'
                borderRadius='10px'
                color='white'
                backgroundColor='gray.700'
                align='center'
                paddingBlock='8px'
                paddingInline={styles.paddingInline}
                fontSize={styles.fontSize}
                onClick={() => {
                    onOpen();
                }}
            >
                <Text
                    textAlign='left'
                    fontWeight='bold'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                >
                    {
                        `${props.closing.fileNumber.slice(0,2)}-${props.closing.fileNumber.slice(2,5)}` +
                        `${props.closing.fileNumber.slice(5) && `(${props.closing.fileNumber.slice(5)})`} || ` +
                        props.closing.File.fileRef
                    }
                </Text>
                <Text
                    textAlign='left'
                    fontWeight='bold'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                >
                    {
                        `${props.closing.File.address}
                        ${props.closing.File.county ? ` // ${props.closing.File.county}` : ''}
                        ${props.closing.File.folioNo ? ` // ${props.closing.File.folioNo}` : ''}`
                    }
                </Text>
                <Divider/>
                <HStack h='100%' alignItems='stretch' spacing={styles.spacing} mt='8px'>
                    <VStack w={styles.rolesW} h='full' textAlign='left'>
                        <Text fontWeight='bold' textDecor='underline'>Roles / Tasks</Text>
                        <Text w='full' whiteSpace='pre-wrap'>
                            {Object.entries(JSON.parse(props.closing.File.roles)).map(role => {
                                if(role[1])
                                    return <b key={`${roles[role[0]]}`}>{`${roles[role[0]]}\n`}</b>
                                return;
                            })}
                            {Object.entries(JSON.parse(props.closing.File.roles)).every(value => !value[1]) ? 
                                'NONE // SHADOW FILE' : ''
                            }
                        </Text>
                    </VStack>
                    <Divider orientation='vertical' h='auto' color='white'/>
                    <VStack w={styles.milestonesW} h='full' spacing='0'>
                        <Text fontWeight='bold' textDecor='underline'>Milestones</Text>
                        {/* Escrow Received? */}
                        <FileTasksCardMilestones
                            condition={JSON.parse(props.closing.File.roles).isEscrowAgent}
                            color={JSON.parse(props.closing.File.milestones).isEscrowReceived ?
                                'green' :
                                'red'
                            }
                            headerW={styles.milestoneHeaderW}
                            header={`Escrow:`}
                            progress={`${JSON.parse(props.closing.File.milestones).isEscrowReceived ?
                                'Received in Full' :
                                'Pending'}\n`
                            }
                        />
                        {/* Title Work Ordered / Received? */}
                        <FileTasksCardMilestones
                            condition={JSON.parse(props.closing.File.roles).isTitleAgent}
                            color={JSON.parse(props.closing.File.milestones).isTitleOrdered ?  (
                                JSON.parse(props.closing.File.milestones).isTitleReceived ?
                                    'green' :
                                    'yellow'
                                ) : 'red'
                            }
                            headerW={styles.milestoneHeaderW}
                            header={`Title Work:`}
                            progress={`${JSON.parse(props.closing.File.milestones).isTitleOrdered ? (
                                JSON.parse(props.closing.File.milestones).isTitleReceived ?
                                    'Received' :
                                    'Ordered, Pending'
                                ) : 'Not Ordered'}\n`
                            }
                        />
                        {/* Lien Search Ordered / Received? */}
                        <FileTasksCardMilestones
                            condition={JSON.parse(props.closing.File.roles).isTitleAgent}
                            color={JSON.parse(props.closing.File.milestones).isLienOrdered ? (
                                JSON.parse(props.closing.File.milestones).isLienReceived ?
                                    'green' :
                                    'yellow'
                                ) : 'red'
                            }
                            headerW={styles.milestoneHeaderW}
                            header={`Lien Search:`}
                            progress={`${JSON.parse(props.closing.File.milestones).isLienOrdered ? (
                                JSON.parse(props.closing.File.milestones).isLienReceived ?
                                    'Received' :
                                    'Ordered, Pending'
                                ) : 'Not Ordered'}\n`
                            }
                        />
                        {/* Seller Docs Drafted / Approved? */}
                        <FileTasksCardMilestones
                            condition={JSON.parse(props.closing.File.roles).isSellerDocs}
                            color={JSON.parse(props.closing.File.milestones).isSellerDocsDrafted ? (
                                JSON.parse(props.closing.File.milestones).isSellerDocsApproved ?
                                    'green' :
                                    'yellow'
                                ) : 'red'
                            }
                            headerW={styles.milestoneHeaderW}
                            header={`Seller Docs:`}
                            progress={`${JSON.parse(props.closing.File.milestones).isSellerDocsDrafted ? (
                                JSON.parse(props.closing.File.milestones).isSellerDocsApproved ?
                                    'Approved' :
                                    'Drafted, Pending Approval'
                                ) : 'Not Drafted'}\n`
                            }
                        />
                        {/* Buyer Docs Drafted / Approved? */}
                        <FileTasksCardMilestones
                            condition={JSON.parse(props.closing.File.roles).isBuyerDocs}
                            color={JSON.parse(props.closing.File.milestones).isBuyerDocsDrafted ? (
                                JSON.parse(props.closing.File.milestones).isBuyerDocsApproved ?
                                    'green' :
                                    'yellow'
                                ) : 'red'
                            }
                            headerW={styles.milestoneHeaderW}
                            header={`Buyer Docs:`}
                            progress={`${JSON.parse(props.closing.File.milestones).isBuyerDocsDrafted ? (
                                JSON.parse(props.closing.File.milestones).isBuyerDocsApproved ?
                                    'Approved' :
                                    'Drafted, Pending Approval'
                                ) : 'Not Drafted'}\n`
                            }
                        />
                        {/* Loan Docs Drafted / Approved? */}
                        <FileTasksCardMilestones
                            condition={JSON.parse(props.closing.File.roles).isLoanDocs}
                            color={JSON.parse(props.closing.File.milestones).isLoanDocsDrafted ? (
                                JSON.parse(props.closing.File.milestones).isLoanDocsApproved ?
                                    'green' :
                                    'yellow'
                                ) : 'red'
                            }
                            headerW={styles.milestoneHeaderW}
                            header={`Loan Docs:`}
                            progress={`${JSON.parse(props.closing.File.milestones).isLoanDocsDrafted ? (
                                JSON.parse(props.closing.File.milestones).isLoanDocsApproved ?
                                    'Approved' :
                                    'Drafted, Pending Approval'
                                ) : 'Not Drafted'}\n`
                            }
                        />
                        {/* Estoppel Ordered / Received? */}
                        <FileTasksCardMilestones
                            condition={JSON.parse(props.closing.File.roles).needEstoppel}
                            color={JSON.parse(props.closing.File.milestones).isEstoppelOrdered ? (
                                JSON.parse(props.closing.File.milestones).isEstoppelReceived ?
                                    'green' :
                                    'yellow'
                                ) : 'red'
                            }
                            headerW={styles.milestoneHeaderW}
                            header={`Estoppel:`}
                            progress={`${JSON.parse(props.closing.File.milestones).isEstoppelOrdered ? (
                                JSON.parse(props.closing.File.milestones).isEstoppelReceived ?
                                    'Received' :
                                    'Ordered, Pending'
                                ) : 'Not Ordered'}\n`
                            }
                        />
                        {/* Survey Ordered / Received? */}
                        <FileTasksCardMilestones
                            condition={JSON.parse(props.closing.File.roles).needSurvey}
                            color={JSON.parse(props.closing.File.milestones).isSurveyOrdered ? (
                                JSON.parse(props.closing.File.milestones).isSurveyReceived ?
                                    'green' :
                                    'yellow'
                                ) : 'red'
                            }
                            headerW={styles.milestoneHeaderW}
                            header={`Survey:`}
                            progress={`${JSON.parse(props.closing.File.milestones).isSurveyOrdered ? (
                                JSON.parse(props.closing.File.milestones).isSurveyReceived ?
                                    'Received' :
                                    'Ordered, Pending'
                                ) : 'Not Ordered'}\n`
                            }
                        />
                        {/* Closing Occured? */}
                        <FileTasksCardMilestones
                            condition={true}
                            color={props.closing.isClosed ? 'green' : 'red'}
                            headerW={styles.milestoneHeaderW}
                            header={<b>{`Closing:`}</b>}
                            progress={<b>{`${props.closing.isClosed ? `CLOSED ${closingDateString}` : `Scheduled for ${closingDateString}`}\n`}</b>}
                        />
                        {/* Documents Recorded? */}
                        <FileTasksCardMilestones
                            condition={JSON.parse(props.closing.File.roles).isClosingAgent}
                            color={JSON.parse(props.closing.File.milestones).areDocsRecorded ? 'green' : 'red'}
                            headerW={styles.milestoneHeaderW}
                            header={<b>{`Docs Recorded?`}</b>}
                            progress={<b>{`${JSON.parse(props.closing.File.milestones).areDocsRecorded ? 'Yes' : 'No'}\n`}</b>}
                        />
                        {/* Fees Received? */}
                        <FileTasksCardMilestones
                            condition={true}
                            color={JSON.parse(props.closing.File.milestones).areFeesReceived ? 'green' : 'red'}
                            headerW={styles.milestoneHeaderW}
                            header={<b>{`Fees Received?`}</b>}
                            progress={<b>{`${JSON.parse(props.closing.File.milestones).areFeesReceived ? 'Yes' : 'No'}\n`}</b>}
                        />
                    </VStack>
                </HStack>
            </Box>
            <FileModal
                new={false}
                onClose={() => {
                    setProfile(profile => { return {...profile, openModal: '' }});
                    return onClose();
                }}
                isOpen={isOpen}
                fileNo={props.closing.fileNumber}
            />
        </>
    );
}

export default FileTasksCard;