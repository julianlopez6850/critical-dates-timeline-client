import { useContext, useEffect, useState } from 'react';
import { axiosInstance } from '../Helpers/axiosInstance';

import {
    VStack,
    useToast
} from '@chakra-ui/react';

import { profileContext } from '../Helpers/profileContext';
import FileTasksCard from '../Components/FileTasksCard';
import LoginMessage from '../Components/LoginMessage';

function Tasks() {
    const { profile, setProfile} = useContext(profileContext);
    const toast = useToast();
    
    const [loading, setLoading] = useState(true);    
    const [closings, setClosings] = useState([]);

    useEffect(() => {
        
        // STAGING ENVIRONMENT - Save Profile Settings
        if(process.env.REACT_APP_ENV === 'staging') {
            const settings = {
                "Mon":{"active":true,"time":"08:00"},
                "Tue":{"active":true,"time":"08:00"},
                "Wed":{"active":true,"time":"08:00"},
                "Thu":{"active":true,"time":"08:00"},
                "Fri":{"active":true,"time":"08:00"},
                "Sat":{"active":false,"time":"08:00"},
                "Sun":{"active":false,"time":"08:00"},
            };
            var storedSettings = JSON.parse(localStorage.getItem('settings')) || {};
            var darkMode = Object.keys(storedSettings).length > 0 ? storedSettings.darkMode : false;
            setProfile(profile => {
                return {...profile, loggedIn: true, user: 'guest', darkMode: darkMode, notificationSettings: settings }
            });
            setLoading(false);
        } else {
            // PRODUCTION ENVIRONMENT - Save Profile Settings
            axiosInstance.get(`${process.env.REACT_APP_API_URL}/auth/profile`).then((response) => {
                const settings = response.data.settings;
                const darkMode = settings.darkMode;
                delete settings.darkMode;
                setProfile(profile => {
                    return {...profile, loggedIn: true, user: response.data.username, darkMode: darkMode, notificationSettings: settings }
                });
            }).catch((error) => {
                setProfile(profile => {
                    return {...profile, loggedIn: false, user: '' }
                });
                setLoading(false);
                if (error.response)
                    console.warn('You are not logged in. Please log in to view this content.');
                else
                    console.warn('ERROR: Server is currently unavailable. Please try again later.');
            });
        }
        
        setClosings([]);
        if(!profile.loggedIn)
            return;

        // STAGING ENVIRONMENT - Retrieving stored closings from localStrorage
        if(process.env.REACT_APP_ENV === 'staging') {
            var storedClosings = JSON.parse(localStorage.getItem('dates'));
            storedClosings = Object.values(Object.fromEntries(Object.entries(storedClosings).filter(([key]) => key.includes('Closing'))));
            
            return Object.entries(storedClosings).forEach(closing => {
                closing = closing[1];

                var storedFile = JSON.parse(localStorage.getItem('files'));
                storedFile = Object.values(Object.fromEntries(Object.entries(storedFile).filter(([key]) => key.includes(closing.fileNumber))))[0];

                setClosings((closings) => [...closings, {
                    ...closing,
                    File: {
                        address: storedFile.address,
                        seller: storedFile.seller,
                        buyer: storedFile.buyer,
                        county: storedFile.county,
                        fileRef: storedFile.fileRef,
                        folioNo: storedFile.folio,
                        isPurchase: storedFile.isPurchase,
                        milestones: storedFile.milestones,
                        roles: storedFile.roles,
                        status: storedFile.status,
                        whoRepresenting: storedFile.whoRepresenting
                    },
                    calculatedDate: JSON.stringify(closing.calculatedDate)
                }])
            });
        } else {
            // PRODUCTION ENVIRONMENT - Retrieving stored closings from database.
            axiosInstance.get(`${process.env.REACT_APP_API_URL}/dates?type=Closing&include=folioNo,county,roles,milestones`).then((response) => {
                setClosings(response.data.dates);
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
    }, [profile.loggedIn, profile.actions, profile.externalActions]);

    return (
        <VStack w='full' h='max-content' alignItems='center'>
            {profile.loggedIn ? (
                <VStack
                    w='100%' 
                    spacing='8px'
                >
                    {closings.length > 0 && closings.map((closing) => {
                        if(closing.File.status !== 'Open')
                            return;
                        
                        return <FileTasksCard
                            key={closing.fileNumber + 'TasksCard'}
                            closing={closing}
                        />
                    })}
                </VStack>
            ) : !loading && <LoginMessage/>}
        </VStack>
    );
}

export default Tasks;
