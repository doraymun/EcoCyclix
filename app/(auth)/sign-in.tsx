import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Text, View, Image } from "react-native";
import ecoIcon from "@/assets/images/icon.png";

const SignIn = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const onSignInPress = async () => {};

    return (
        <View className = "flex-1 bg-[#FDF7F8]">
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

                    <CustomButton title="Sign In" onPress={onSignInPress} className="mt-6" targetRoute="/home"/>
                  

                    <OAuth/>

                    <Link href="/(auth)/sign-up" className="text-lg text-center text-general-200 mt-10">
                        <Text>Don't have an account? </Text>
                        <Text className="text-success-600">Sign Up</Text>
                    </Link>

                </View>

            </View>
        </View>
    );
};

export default SignIn;