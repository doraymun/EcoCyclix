import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import ecoIcon from "@/assets/images/icon.png";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Snackbar } from 'react-native-paper'
import * as network from 'expo-network'

const SignIn = () => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: ""
    };
    const onDismissSnackBar = () => {
        setVisible(false)
    }
    const [isSignedInFlag, setSignedInFlag] = useState(false);
    const onSignInPress = async () => {
        let ipAddress = '192.168.1.9' // await network.getIpAddressAsync()
        let apiEndpoint = ('http://' + ipAddress + ':5000/account/login')

        requestOptions.body = JSON.stringify(form)

        fetch(apiEndpoint, requestOptions)
        .then(response => response.json())
        .then(json => {
            let data:{code:number, body: string} = json

            if (data.code == 200) {
                AsyncStorage.getItem('ecocyclix-appdata', (error, result) => {
                    let appData: {
                        isAlreadyInit:boolean,
                        user:{
                            id:number,
                            firstName:string,
                            middleName:string,
                            lastName:string,
                            email:string
                        }
                    } = {
                        isAlreadyInit: true,
                        user: JSON.parse(data.body)
                    }

                    AsyncStorage.setItem('ecocyclix-appdata', JSON.stringify(appData), () => {
                        router.replace("/(root)/(tabs)/home")
                    })
                })
            } else {
                setMessage("Invalid email or password.")
                setVisible(true)
            } 

        })
        .catch(err => {
            console.error(err)
        })
    };

    // AsyncStorage.getItem('ecocyclix-appdata', (error, result) => {
    //     if (result != null || result != undefined) {
    //         let appData:{
    //             isAlreadyInit:boolean,
    //             user:{
    //                 id:number,
    //                 firstName:string,
    //                 middleName:string,
    //                 lastName:string,
    //                 email:string
    //             }} = JSON.parse(result)

    //         if (appData.isAlreadyInit && appData.user != null && appData.user.email != "") {
    //             setSignedInFlag(true)
    //         }
    //     }
    // })

        return (
            //visSignedInFlag ? router.replace("/(root)/(tabs)/home") :
            (<View className="flex-1">
                <ScrollView className = "flex-1 bg-[#FDF7F8]">
                    <View className = "flex-1 bg-[#FDF7F8]">
                        <LinearGradient
                            colors={['#74A94D', '#FDF7F8']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            className="w-full h-[250px] relative"
                        >
                        <Image
                            source={ecoIcon}
                            className="w-24 h-24 absolute left-1/2 -translate-x-12 top-[80px]"
                            resizeMode="contain"
                        />
                            <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                                Welcome User!
                            </Text>
                        </LinearGradient>
    
                        <View className = "p-5">
                            <InputField
                                label="Email"
                                placeholder="Enter your email"
                                icon={icons.email}
                                value={form.email}
                                onChangeText={(value) => setForm({ ...form, email: value })}
                            />
                            <InputField
                                label="Password"
                                placeholder="Enter your password"
                                icon={icons.lock}
                                secureTextEntry={true}
                                value={form.password}
                                onChangeText={(value) => setForm({ ...form, password: value })}
                            />
    
                            <CustomButton title="Sign In" onPress={onSignInPress} className="mt-6" />
                        
    
                            <OAuth/>
    
                            <Link href="/(auth)/sign-up" className="text-lg text-center text-general-200 mt-10">
                                <Text>Don't have an account? </Text>
                                <Text className="text-success-600">Sign Up</Text>
                            </Link>
    
                        </View>
                    </View>
                </ScrollView>
                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    action={{
                    label: 'OK',
                    onPress: () => {
                        // Do something
                    },
                    }}>
                    {message}
                </Snackbar>
            </View>));
};

export default SignIn;