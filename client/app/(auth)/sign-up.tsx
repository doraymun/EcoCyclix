import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter, router } from "expo-router";
import { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import ecoIcon from "@/assets/images/icon.png";
import { Ionicons } from '@expo/vector-icons';
import * as network from 'expo-network'

const SignUp = () => {
    const [form, setForm] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [showModal, setShowModal] = useState(false)
    const router = useRouter();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: ""
    };
    const successMessage: string = "Sign-Up successful."
    const onSignUpPress = () => {
        let ipAddress = '192.168.1.9' // network.getIpAddressAsync()
        let apiEndpoint = ('http://' + ipAddress + ':5000/account/register')
        requestOptions.body = JSON.stringify(form)

        fetch(apiEndpoint, requestOptions).then(response => {
            setShowModal(true)
            
            setTimeout(function() {
                setShowModal(false)
                router.replace("/(auth)/sign-in")
            }, 2000)
        }).catch(err => {
            console.error(err)
        })
    };

    const goToLogin = () => {
      router.replace('/(auth)/sign-in')
    };

    return (
        <ScrollView className="flex-1 bg-[#FDF7F8]">
            <View className="flex-1 bg-[#FDF7F8]">
                {/* Linear Gradient Header */}
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
                        Create Your Account
                    </Text>
                </LinearGradient>
                    {/* Back Button */}
                    <TouchableOpacity
                        onPress={() => router.push("/(auth)/welcome")}
                        className="absolute top-10 right-2 p-5"
                    >
                        <Ionicons name="arrow-back" size={24} color="#191919" />
                    </TouchableOpacity>               
                {/* Form Fields */}
                <View className="p-5">
                    <InputField
                        label="First Name"
                        placeholder="Enter your first Name"
                        icon={icons.person}
                        value={form.firstName}
                        onChangeText={(value) => setForm({ ...form, firstName: value })}
                    />
                    <InputField
                        label="Middle Name"
                        placeholder="Enter your middle name"
                        icon={icons.person}
                        value={form.middleName}
                        onChangeText={(value) => setForm({ ...form, middleName: value })}
                    />
                    <InputField
                        label="Last Name"
                        placeholder="Enter your last name"
                        icon={icons.person}
                        value={form.lastName}
                        onChangeText={(value) => setForm({ ...form, lastName: value })}
                    />
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

                    <CustomButton title="Sign Up" onPress={onSignUpPress} className="mt-6" />

                    <OAuth />

                    {/* Link to Sign In */}
                    <Link onPress={() => goToLogin()} href="/(auth)/sign-in" className="text-lg text-center text-general-200 mt-10">
                        <Text>Already have an account? </Text>
                        <Text className="text-success-600">Log In</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignUp;
