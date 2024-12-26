import { router } from "expo-router";
import { NextButton } from '@/components';
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";

export default function Index() {

  // variabel function link signin
  const signin = () => {
    router.push('/signin')
  }

  return (
  <ScrollView style={style.screen}>
    <View style={style.screen}>
      <Image
        style={style.vector}
        source={require('./assets/images/Vector.png')}
      />
      <View style={style.container}>
        <Text style={style.welcomeTitle}>Welcome</Text>
        <Text style={style.welcomeMsg}>Welcome to MILLS Mobile Application</Text>
      </View>
      <NextButton
        text="Next"
        onPress={signin}
      />
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
    height: 550,
  },

  container: {
    padding: 30,
    top: -40,
  },

  welcomeTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1C1C1C',
    marginBottom: 20,
  },

  welcomeMsg: {
    fontSize: 15,
    color: '#1C1C1C',
    opacity: 0.5,

  },


})


