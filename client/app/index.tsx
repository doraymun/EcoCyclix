import { Redirect, router } from "expo-router";
import React, { useState } from  'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = () => {
    const [initFlag, setInitFlag] = useState(false)

    AsyncStorage.getItem('ecocyclix-appdata', (error, result) => {
        if (result == null || result == undefined) {
            setInitFlag(false)
        } else {
            setInitFlag(true)
        }

        return (
            initFlag ? router.replace("/(auth)/sign-in")
                     : router.replace("/(auth)/welcome")
        )
    })

    // return <Redirect href="/(auth)/welcome" />;
};

export default Home;