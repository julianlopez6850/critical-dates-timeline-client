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
    useToast,
    Spinner,
    Text,
    ModalHeader,
    Checkbox,
    Stack,
    Input,
    Switch,
    Tabs,
    Tab,
    TabList,
} from '@chakra-ui/react'

import NavbarButton from './NavbarButton';

const SettingsModal = (props) => {
    
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
            return { ...profile, lightTheme: !profile.lightTheme }
        });
    }
    
    const updateSettings = () => {
        if(!profile.loggedIn)
            return;
        axiosInstance.put(`${process.env.REACT_APP_API_URL}/auth/settings`, { username: profile.user, settings: notificationDatesTimes}).then((response) => {
            setProfile(profile => {
                return {...profile, settings: response.data.settings};
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
            updateSettings();
    }, [notificationDatesTimes])

    useEffect(() => {
        if(profile.loggedIn)
            setNotificationDatesTimes(profile.settings);
    }, [profile.loggedIn])

    return (
        <Modal
            closeOnOverlayClick={false}x    
            onClose={() => { props.onClose() }}
            isOpen={props.isOpen}
            motionPreset='slideInBottom'
            size='md'
        >
            <ModalOverlay />
            <ModalContent
                color='white'
                bgColor='gray.800'
                h='540px'
            >
                <ModalCloseButton />
                <ModalHeader>
                    SETTINGS
                </ModalHeader>
                <ModalBody>
                    <Text fontWeight='bold'>
                        Display
                    </Text>
                    <Divider/>
                    <VStack align='left'>
                        <HStack justifyContent='space-between'>
                            <Text>
                                Dark Mode
                            </Text>
                            <Switch
                                isChecked={!profile.lightTheme}
                                onChange={(e) => {updateTheme(e)}}
                            />
                        </HStack>
                        <HStack align='left' justifyContent='space-between'>
                            <Text alignSelf='center'>
                                Table Design
                            </Text>
                            {/* TODO: Add different table designs. */}
                            <Tabs>
                                <TabList>
                                    <Tab isDisabled={true}>
                                        Retro
                                    </Tab>
                                    <Tab isDisabled={true}>
                                        Classic
                                    </Tab>
                                    <Tab isDisabled={true}>
                                        Modern
                                    </Tab>
                                </TabList>
                            </Tabs>
                        </HStack>
                    </VStack>
                    <Text mt='20px' fontWeight='bold'>
                        Notifications
                    </Text>
                    <Divider/>
                    <HStack h='250px'>
                        <VStack h='full' alignItems='normal'>
                            <Checkbox
                                isChecked={allChecked}
                                isIndeterminate={partialChecked}
                                onChange={(e) => Object.keys(notificationDatesTimes).forEach(key => 
                                    setNotificationDatesTimes(days => {
                                        return {...days, [key]: {...notificationDatesTimes[key], active: e.target.checked } }
                                    })
                                )}
                            >
                                All Days
                            </Checkbox>
                            <Divider/>
                            <Stack pl={6} mt={1}>
                                {dayLabels.map((item, index) => {
                                    return <Checkbox
                                        key={index}
                                        isChecked={notificationDatesTimes[item.short].active}
                                        onChange={(e) => setNotificationDatesTimes(days => {
                                            return {...days, [item.short]: {...notificationDatesTimes[item.short], active:e.target.checked } }
                                        })}
                                    >
                                        {item.full}
                                    </Checkbox>
                                })}
                            </Stack>
                        </VStack>
                        <VStack h='full' alignItems='normal' w='150px'>
                            <HStack>
                                <Checkbox whiteSpace='nowrap'
                                    isChecked={allAtMatch}
                                    onChange={(e) => !allAtMatch ? Object.keys(notificationDatesTimes).forEach(key => 
                                        setNotificationDatesTimes(days => {
                                            return {...days, [key]: {...notificationDatesTimes[key], time: allAtValue } }
                                        })
                                    ) : ''}
                                >
                                    All at
                                </Checkbox>
                                <Input type='time' size='xs' value={allAtValue} onChange={(e) => {setAllAtValue(e.target.value)}} w='82px'/>
                            </HStack>
                            <Divider/>
                            {dayLabels.map((item, index) => {
                                return <HStack key={index} mt='32px' justifyContent='right'>
                                    <Text>
                                        at
                                    </Text>
                                    <Input type='time' size='xs' w='82px'
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