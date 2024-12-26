import { TouchableHighlight, Text, View, StyleSheet } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';

// next button
export const NextButton = (props: any) => {
    return (
        <View style={style.rightButton}>
            <TouchableHighlight
                underlayColor={'#FFFFFF'}
                onPress={props.onPress}
                style={style.next}>
                <View style={style.nextContainer}>
                    <Text style={style.text}> {props.text} </Text>
                    <AntDesign name="arrowright" size={24} color="#FF8D83" />
                </View>
            </TouchableHighlight>
        </View>
    )
}

// button
export const Button = (props: any) => {
    return (
        <TouchableHighlight
            underlayColor={'#0066FF'}
            onPress={props.onPress}
            style={style.button}>
            <Text style={style.label}> {props.label} </Text>
        </TouchableHighlight>
    )
}


const style = StyleSheet.create({
    // style NextButton
    rightButton: {
        marginRight: 20,
        alignSelf: 'flex-end',
    },

    next: {
        borderColor: '#FF8D83',
        borderWidth: 2.5,
        borderRadius: 80,
        width: 115,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    nextContainer: {
        flexDirection: 'row',
    },

    text: {
        fontSize: 19,
        color: '#FF8D83',
    },

    // style Button biasa
    button: {
        alignItems: 'center',
        backgroundColor: '#0066FF',
        padding: 20,
        width: '100%',
        borderRadius: 15,
        marginTop: 30,
    },

    label: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'semibold',
    }
})