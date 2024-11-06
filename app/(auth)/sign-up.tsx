import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import ecoIcon from "@/assets/images/icon.png";
import { Ionicons } from '@expo/vector-icons';

const SignUp = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const router = useRouter();

    const onSignUpPress = async () => {
       
    };

    return (
        <View className="flex-1 bg-[#FDF7F8]">
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
                        label="Name"
                        placeholder="Enter your name"
                        icon={icons.person}
                        value={form.name}
                        onChangeText={(value) => setForm({ ...form, name: value })}
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
                    <Link href="/(auth)/sign-in" className="text-lg text-center text-general-200 mt-10">
                        <Text>Already have an account? </Text>
                        <Text className="text-success-600">Log In</Text>
                    </Link>
                </View>
            </View>
        </View>
    );
};

export default SignUp;
