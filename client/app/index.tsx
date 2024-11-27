import { Redirect, router } from "expo-router";
import React, { useState, useEffect } from  'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = () => {
    const [initFlag, setInitFlag] = useState(false)

    useEffect(() => {
        AsyncStorage.getItem('ecocyclix-appdata', (error, result) => {
            if (result == null || result == undefined) {
                router.replace("/(auth)/welcome")
            } else {
                router.replace("/(auth)/sign-in")
            }
        })
    })
};

export default Home;