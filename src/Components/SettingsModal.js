import { useContext, useEffect, useState } from 'react';
import { profileContext } from '../Helpers/profileContext';
import { axiosInstance } from '../Helpers/axiosInstance';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    HStack,
    VStack,
    Divider,
    Text,
    ModalHeader,
    Checkbox,
    Stack,
    Input,
    Switch,
} from '@chakra-ui/react'

const SettingsModal = (props) => {

    const [styles, setStyles] = useState({});

    useEffect(() => {
        const windowListener = () => {
            if(window.innerWidth >= 530) {
                setStyles({
                    headerFontSize:'20px', bodyFontSize:'14px', inputH:'21px', paddingInline:'8px'
                });
            } else {
                setStyles({
                    headerFontSize:'18px', bodyFontSize:'12px', inputH:'18px', paddingInline:'4px'
                })
            };
        };
        windowListener();
        window.addEventListener('resize', windowListener);
        return () => window.removeEventListener('resize', windowListener);
    }, []);
    
    const { profile, setProfile } = useContext(profileContext);
    
    const [notificationDatesTimes, setNotificationDatesTimes] = useState({
        Mon: {active: true, time: '08:00'},
        Tue: {active: true, time: '08:00'},
        Wed: {active: true, time: '08:00'},
        Thu: {active: true, time: '08:00'},
        Fri: {active: true, time: '08:00'},
        Sat: {active: true, time: '08:00'},
        Sun: {active: true, time: '08:00'}
    })

    const dayLabels = [
        {full: 'Monday', short: 'Mon'},
        {full: 'Tuesday', short: 'Tue'},
        {full: 'Wednesday', short: 'Wed'},
        {full: 'Thursday', short: 'Thu'},
        {full: 'Friday', short: 'Fri'},
        {full: 'Saturday', short: 'Sat'},
        {full: 'Sunday', short: 'Sun'}
    ]

    const allChecked = Object.values(notificationDatesTimes).every(value => value.active === true)
    const partialChecked = Object.values(notificationDatesTimes).some(value => value.active === true) && !allChecked

    const [allAtValue, setAllAtValue] = useState('08:00');
    const allAtMatch = Object.values(notificationDatesTimes).every(value => value.time === allAtValue)

    const updateTheme = (e) => {
        e.preventDefault();
        setProfile(profile => {
            return { ...profile, darkMode: !profile.darkMode }
        });
    }

    useEffect(() => {
        axiosInstance.put(`${process.env.REACT_APP_API_URL}/auth/settings`, { username: profile.user, settings: {...notificationDatesTimes, darkMode: profile.darkMode}}).then((response) => {
            console.log('Your settings have been updated successfully.');
        }).catch(() => {
            console.warn('ERROR: A problem occurred while trying to update your settings. Please try again later.');
        })
    }, [profile.darkMode])
    
    const updateNotificationSettings = () => {
        if(!profile.loggedIn)
            return;
        axiosInstance.put(`${process.env.REACT_APP_API_URL}/auth/settings`, { username: profile.user, settings: {...notificationDatesTimes, darkMode: profile.darkMode}}).then((response) => {
            const notificationSettings = response.data.settings;
            delete notificationSettings.darkMode;
            setProfile(profile => {
                return {...profile, notificationSettings: notificationSettings};
            });
            console.log('Your settings have been updated successfully.');
        }).catch(() => {
            console.warn('ERROR: A problem occurred while trying to update your settings. Please try again later.');
        })
    }

    useEffect(() => {
        if(Object.values(notificationDatesTimes).every(value => value.time === notificationDatesTimes.Mon.time))
            setAllAtValue(notificationDatesTimes.Mon.time);
        if(props.isOpen)
            updateNotificationSettings();
    }, [notificationDatesTimes])

    useEffect(() => {
        if(profile.loggedIn)
            setNotificationDatesTimes(profile.notificationSettings);
    }, [profile.loggedIn])

    return (
        <Modal
            isOpen={props.isOpen}
            onClose={props.onClose}
            size='md'
            closeOnOverlayClick={false}
            scrollBehavior='outside'
            allowPinchZoom={true}
        >
            <ModalOverlay/>
            <ModalContent
                color='white'
                bgColor='gray.800'
                h='fit-content'
                w='fit-content'
            >
                <ModalCloseButton/>
                <ModalHeader fontSize={styles.headerFontSize}>
                    SETTINGS
                </ModalHeader>
                <ModalBody paddingBlock='0px' fontSize={styles.bodyFontSize}>
                    <VStack align='left' spacing='0'>
                        <Text fontWeight='bold'>
                            Display
                        </Text>
                        <Divider/>
                        <HStack justifyContent='space-between'>
                            <Text>
                                Dark Mode
                            </Text>
                            <Switch
                                isChecked={profile.darkMode}
                                onChange={(e) => {updateTheme(e)}}
                            />
                        </HStack>
                    </VStack>
                    <VStack align='left' spacing='0' mt='10px'>
                        <Text fontWeight='bold'>
                            Notifications
                        </Text>
                        <Divider/>
                        <HStack h='fit-content' spacing='0'>
                            <VStack h='full' alignItems='normal' mt='8px'>
                                <Checkbox
                                    isChecked={allChecked}
                                    isIndeterminate={partialChecked}
                                    onChange={(e) => Object.keys(notificationDatesTimes).forEach(key => 
                                        setNotificationDatesTimes(days => {
                                            return {...days, [key]: {...notificationDatesTimes[key], active: e.target.checked } }
                                        })
                                    )}
                                >
                                    <Text fontSize={styles.bodyFontSize}>
                                        All Days
                                    </Text>
                                </Checkbox>
                                <Divider/>
                                <Stack pl='20px' mt='8px'>
                                    {dayLabels.map((item, index) => {
                                        return <Checkbox
                                            key={index}
                                            isChecked={notificationDatesTimes[item.short].active}
                                            onChange={(e) => setNotificationDatesTimes(days => {
                                                return {...days, [item.short]: {...notificationDatesTimes[item.short], active:e.target.checked } }
                                            })}
                                        >
                                            <Text fontSize={styles.bodyFontSize}>{item.full}</Text>
                                        </Checkbox>
                                    })}
                                </Stack>
                            </VStack>
                            <VStack h='full' w='fit-content' mt='8px !important' alignItems='normal'>
                                <HStack>
                                    <Checkbox whiteSpace='nowrap'
                                        isChecked={allAtMatch}
                                        onChange={(e) => !allAtMatch ? Object.keys(notificationDatesTimes).forEach(key => 
                                            setNotificationDatesTimes(days => {
                                                return {...days, [key]: {...notificationDatesTimes[key], time: allAtValue } }
                                            })
                                        ) : ''}
                                    >
                                        <Text fontSize={styles.bodyFontSize}>All at</Text>
                                    </Checkbox>
                                    <Input
                                        type='time' w='fit-content' h={styles.inputH}
                                        paddingInline={styles.paddingInline}
                                        fontSize='inherit'
                                        value={allAtValue}
                                        onChange={(e) => {setAllAtValue(e.target.value)}}
                                    />
                                </HStack>
                                <Divider/>
                                {dayLabels.map((item, index) => {
                                    return <HStack key={index} mt='32px' justifyContent='right'>
                                        <Text>
                                            at
                                        </Text>
                                        <Input
                                            type='time' w='fit-content' h={styles.inputH}
                                            paddingInline={styles.paddingInline}
                                            fontSize='inherit'
                                            value={notificationDatesTimes[item.short].time}
                                            onChange={(e)=>{
                                                setNotificationDatesTimes(days => {
                                                    return {...days, [item.short]: {...notificationDatesTimes[item.short], time: e.target.value}}
                                                })
                                            }}
                                            isDisabled={!notificationDatesTimes[item.short]}
                                        />
                                    </HStack>
                                })}
                            </VStack>
                        </HStack>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Text color='gray.400'>
                        v{process.env.REACT_APP_VERSION}
                    </Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default SettingsModal;