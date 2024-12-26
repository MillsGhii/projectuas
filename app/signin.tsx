import { router, Link } from "expo-router";
import { Button, Form, FormPass, } from '@/components';
import { Text, View, StyleSheet, Image, ScrollView, ToastAndroid, TouchableOpacity } from "react-native";
import React from "react";
import Fontisto from '@expo/vector-icons/Fontisto';
import CApi from "@/lib/CApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signin() {
    // variabel form input
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    // variabel tombol remember me
    const [toggleCheck, setToggleCheck] = React.useState(false);
    // function tombol remember me
    const toggleRemember = () => {
        setToggleCheck(!toggleCheck);
    };

    // function route tombol login
    const loginRoute = () => {
        router.push('/signup')
    }

    const handleLogin = async () => {
        if (!email || !password) {
            ToastAndroid.show('Email and Password can’t be empty', ToastAndroid.SHORT);
            return;
        }

        try {
            const request = {
                email: email,
                password: password,
            };

            const { data } = await CApi.post('/login', request, {
                headers: { 'Content-Type': 'text/plain' }
            });

            console.log('Login berhasil:', data);
            await AsyncStorage.setItem('userToken', data.token);
            await AsyncStorage.setItem('userEmail', data.data.email);
            await AsyncStorage.setItem('userName', data.data.name);

            router.push('/dashboard');
        } catch (err) {
            console.log('Login gagal:', err);
            const msg = err?.response?.data?.message || 'Terjadi kesalahan';
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        }
    };

    return (
        <ScrollView style={style.screen}>
            <View style={style.screen}>
                <Image
                    style={style.vector}
                    source={require('./assets/images/Vector.png')}
                />
                <View style={style.container}>
                    <Text style={style.signTitle}>Sign in</Text>
                    <View style={style.underLine} />
                    <Form
                        label='Email'
                        ph='demo@email.com'
                        icon='mail'
                        value={email}
                        change={setEmail}
                        mode='email'
                    />
                    <FormPass
                        label='Password'
                        ph='Enter Your Password'
                        icon='lock'
                        value={password}
                        change={setPassword}
                    />
                    <View style={style.option}>
                        <TouchableOpacity onPress={toggleRemember}>
                            <Fontisto
                                name={toggleCheck ? 'checkbox-active' : 'checkbox-passive'}
                                size={18}
                                color="#1C1C1C" />
                        </TouchableOpacity>
                        <Text style={style.remember}>Remember Me</Text>
                        <Text style={style.text}>Forgot Password?</Text>
                    </View>
                    <Button
                        label='Login'
                        onPress={handleLogin}
                    />
                    <View style={style.signup}>
                        <Text style={style.signupText}>Don't have an Account ?</Text>
                        <Link href={'/signup'} style={style.text}>Sign Up</Link>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    vector: {
        width: '100%',
        height: 372,
        objectFit: 'fill',
    },

    container: {
        padding: 30,
        top: -40,
    },

    signTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#1C1C1C',
        marginBottom: 10,
    },

    underLine: {
        width: '25%',
        borderTopWidth: 2,
        borderColor: '#FF8D83',
    },

    option: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },

    remember: {
        fontSize: 14,
        color: '#1C1C1C',
        flex: 1,
        marginLeft: 5,
    },

    text: {
        fontSize: 14,
        color: '#FF8D83',
        fontWeight: 'semibold',
    },

    signup: {
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: -30
    },

    signupText: {
        fontSize: 15,
        color: '#1C1C1C',
        marginRight: 8,
    },

})


