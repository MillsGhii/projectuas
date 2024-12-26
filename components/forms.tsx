import { StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native";
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Feather } from '@expo/vector-icons';

// form  biasa
export const Form = (props: any) => {
    return (
        <View style={style.form}>
            <Text style={style.label}>{props.label}</Text>
            <View>
                <AntDesign name={props.icon} size={18} color="#1C1C1C" style={style.icon} />
                <TextInput
                    style={[style.formInput, props.styles]}
                    placeholder={props.ph}
                    value={props.value}
                    secureTextEntry={props.secure}
                    onChangeText={props.change}
                    inputMode={props.mode}
                    placeholderTextColor="rgba(28, 28, 28, 0.5)"
                />
            </View>
        </View>
    );
}

// form password
export const FormPass = (props: any) => {
    // variabel toggle
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    // function toggle icon visibility
    const setVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={style.form}>
            <Text style={style.label}>{props.label}</Text>
            <View>
                <AntDesign name={props.icon} size={18} color="#1C1C1C" style={style.icon} />
                <TextInput
                    style={[style.formInput, props.styles]}
                    placeholder={props.ph}
                    value={props.value}
                    secureTextEntry={!isPasswordVisible}
                    onChangeText={props.change}
                    placeholderTextColor="rgba(28, 28, 28, 0.5)"
                />
            </View>
            {/* icon mata untuk pass visible */}
            <TouchableOpacity onPress={setVisibility} style={style.eyeIcon}>
                <Feather
                    name={isPasswordVisible ? 'eye-off' : 'eye'}
                    size={24}
                    color="#989CA8"
                />
            </TouchableOpacity>
        </View>

    );
}

const style = StyleSheet.create({
    form: {
        marginTop: 30,
    },

    icon: {
        position: 'absolute',
        top: 5,
        borderRightWidth: 2,
        borderColor: "rgba(28, 28, 28, 0.5)",
        paddingRight: 5,
        opacity: 0.5,
    },

    formInput: {
        borderBottomColor: '#887E7E',
        borderBottomWidth: 1,
        opacity: 0.4,
        width: '100%',
        marginTop: 8,
        paddingLeft: 30,
    },

    label: {
        color: '#1C1C1C',
        fontSize: 17,
    },

    eyeIcon: {
        position: 'absolute',
        right: 15,
        top: 18,
        opacity: 0.5,
    },
});
