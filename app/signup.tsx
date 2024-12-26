import { router, Link } from "expo-router";
import { Button, Form, FormPass, } from '@/components';
import { Text, View, StyleSheet, Image, ScrollView,ToastAndroid, TouchableOpacity } from "react-native";
import React from "react";
import Fontisto from '@expo/vector-icons/Fontisto';
import CApi from '../lib/CApi';
import { useSelector, useDispatch } from 'react-redux';
import { setData, resetData } from '../store/reducer/loginReducer';

export default function Signup() {
    // variabel input form
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPass, setConfirmPass] = React.useState('');

    
    const createRoute = () => {
        router.push('/signin')
    }

    const registerForm = useSelector((state) => state.login.loginInput);
    const dispatch = useDispatch();

    const onChangeValue = (payload: any) => {
        dispatch(setData({ ...registerForm, ...payload }));
    };

    const onSaveData = async () => {
        try {
            if (registerForm.password !== registerForm.confirm_password) {
                ToastAndroid.show("Passwords do not match!", ToastAndroid.SHORT);
                return;
            }

            const { data } = await CApi.post('/register', registerForm, {
                headers: { 'Content-Type': 'text/plain' }
            });

            ToastAndroid.show("Register Success", ToastAndroid.SHORT);

            dispatch(resetData());
            router.push('/signin')
        } catch (error: any) {
            const msg = error?.response?.data?.message || error?.message || 'Something went wrong';
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
                    <Text style={style.signTitle}>Sign Up</Text>
                    <View style={style.underLine} />

                    <Form
                        label='Email'
                        ph='demo@email.com'
                        icon='mail'
                        change={(val: any) => onChangeValue({ email: val })}
                        value={registerForm.email}
                        mode='email'
                    />
                    <Form
                        label='Name'
                        ph='Enter Your Name'
                        icon='user'
                        change={(val: any) => onChangeValue({ name: val })}
                        value={registerForm.name}
                    />
                    <FormPass
                        label='Password'
                        ph='Enter Your Password'
                        icon='lock'
                        change={(val: any) => onChangeValue({ password: val })}
                        value={registerForm.password}
                    />
                    <FormPass
                        label='Confirm Password'
                        ph='Enter Your Password'
                        icon='lock'
                        change={(val: any) => onChangeValue({ confirm_password: val })}
                        value={registerForm.confirm_password}
                    />
                    <Button
                        label='Create an Account'
                        onPress={onSaveData}
                    />
                    <View style={style.signup}>
                        <Text style={style.signupText}>Already have an account !</Text>
                        <Link href={'/signin'} style={style.text}>Login</Link>
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
        height: 250,
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


