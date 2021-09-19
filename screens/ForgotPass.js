import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableNativeFeedback, Pressable, TouchableHighlight } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { userData } from '../src/actions';
import * as Animatable from 'react-native-animatable';

import { LinearGradient } from 'expo-linear-gradient';
import colorSet from '../src/comp/colors';

import Icon from 'react-native-vector-icons/Ionicons'
import { useWindowDimensions } from 'react-native';

export default function ForgotPass({ navigation }) {

  const window = useWindowDimensions();

  const id = useSelector(state => state.userReducer)
  const langState = useSelector(state => state.languageReducer)
  const dispatch = useDispatch();

  const [loginStatus, setLoginStatus] = useState('')
  const [email, setEmail] = useState('');
  const [CNIC, setCNIC] = useState('');

  const [langIsEnglish, setLangIsEnglish] = useState(true)

  const validateFields = async () => {
    if (CNIC === '' || email === '') {
      Alert.alert('Invalid Details', 'Please fill the text fields and then press the Submit Button ')
      return
    }

    const data = await fetch(`http://${ip}:5000/forget-pass/${email}&${CNIC}`)
    const res = await data.json();
    if (res.length == 0) {
      Alert.alert(`Error!`, `Could not find account associated with email: ${email}`)
    } else {
      Alert.alert('Request Submitted', `If your  email is registered, you will receive a new password shortly at ${email}`)
      navigation.goBack();
    }
  }


  return (
    <View style={styles.container}>

      <LinearGradient
        colors={[colorSet.primary, colorSet.secondary]}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: window.height,
        }}
      />

      <Animatable.Text animation="fadeInDownBig" duration={1500} style={styles.title}>Enter Account Details</Animatable.Text>
      <Animatable.View animation="fadeInUpBig" duration={1500} style={styles.loginContainer} >


        <View style={{ flexDirection: 'row', borderBottomColor: "#000000", borderBottomWidth: 1 }}>
          <TextInput style={styles.userInput} keyboardType='email-address' placeholder="Email" onChangeText={(text) => setEmail(text)} />
          <Icon.Button name="mail" size={20} color='#444444' backgroundColor='transparent' ></Icon.Button>
        </View>

        <View style={{ flexDirection: 'row', borderBottomColor: "#000000", borderBottomWidth: 1 }}>
          <TextInput style={styles.userInput} placeholder="CNIC Number" keyboardType='number-pad' onChangeText={(text) => setCNIC(text)} />
          <Icon.Button name="card" size={20} color='#444444' backgroundColor='transaprent' ></Icon.Button>
        </View>



        <View style={styles.users}>

          <View style={{ borderRadius: 20, overflow: 'hidden' }}>
            <TouchableNativeFeedback onPress={validateFields}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Receive Password</Text>
                <Icon.Button name="arrow-forward" size={15} color='#FFFFFF' backgroundColor='transparent'  ></Icon.Button>
              </View>

            </TouchableNativeFeedback>
          </View>

        </View>
      </Animatable.View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#4A8BEB',
    justifyContent: 'flex-end',
  },
  title: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 5,
    marginLeft: 35
  },

  userInput: {
    // borderBottomWidth: 2,
    borderBottomColor: 'blue',
    // paddingVertical: 5,
    width: '70%',
    // marginBottom: 20
  },

  users: {
    flexDirection: 'row',
    width: '80%',
    marginVertical: 20,
    justifyContent: 'space-between'
  },

  login: {
    flexDirection: 'row',
    width: '50%',
    marginVertical: 20,
    justifyContent: 'space-evenly'
  },
  loginContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40
  },
  btn: {
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: "#4A8BEB",
    padding: 10,
    borderRadius: 20
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  }
});
