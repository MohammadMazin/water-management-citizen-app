import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableNativeFeedback, ScrollView } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { userData } from '../src/actions';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { useWindowDimensions } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
import colorSet from '../src/comp/colors';

import { Picker } from '@react-native-picker/picker';

export default function SignUp({ navigation }) {

  const window = useWindowDimensions();

  const id = useSelector(state => state.userReducer)
  const langState = useSelector(state => state.languageReducer)
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passAgain, setPassAgain] = useState('');
  const [Email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [CNIC, setCNIC] = useState('');

  const [pIcon, setPIcon] = useState('eye')
  const [passHidden, setPassHidden] = useState(true)

  const [langIsEnglish, setLangIsEnglish] = useState(true)

  const [selectedCity, setSelectedCity] = useState();

  const switchPassView = () => {

    if (passHidden) {
      setPIcon('eye-off')
      setPassHidden(false)
    }
    else {
      setPIcon('eye')
      setPassHidden(true)
    }
    console.log(passHidden)

  }


  const validateFields = async () => {

    if (username === '' || password === '' || passAgain === '' || Email === '' || number === '' || address === '' || CNIC === '') {
      Alert.alert('Error! Empty Fields', 'You have left some fields empty. Please recheck and submit again.')
      return
    }

    if (password != passAgain) {
      Alert.alert('Error! Passwords don\'t match', 'Please enter the same password in both fields and submit again')
      return
    }

    //SignUp
    fetch(`http://${ip}:5000/sign-up`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        citizen_name: username,
        cnic: CNIC,
        email: Email,
        address: address,
        phone: number,
        password: password,
        province_id: null,
        city_id: null

      })
    });


  }



  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
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




        <Animatable.Text animation="fadeInDownBig" duration={1500} style={styles.title}>Enter Your Details</Animatable.Text>
        <Animatable.View animation="fadeInUpBig" duration={1500} style={styles.loginContainer} >

          <View style={{ flexDirection: 'row', borderBottomColor: "#000000", borderBottomWidth: 1 }}>
            <TextInput style={styles.userInput} placeholder="Username" onChangeText={(text) => setUsername(text)} />
            <Icon.Button name="person" size={20} color='#000000' backgroundColor='transparent'></Icon.Button>
          </View>

          <View style={{ flexDirection: 'row', borderBottomColor: "#000000", borderBottomWidth: 1 }}>
            <TextInput style={styles.userInput} placeholder="Password" secureTextEntry={passHidden} onChangeText={(text) => setPassword(text)} />
            <Icon.Button name={pIcon} size={20} color='#000000' backgroundColor='transparent' onPress={switchPassView}></Icon.Button>
          </View>

          <View style={{ flexDirection: 'row', borderBottomColor: "#000000", borderBottomWidth: 1 }}>
            <TextInput style={styles.userInput} placeholder="Password" secureTextEntry={passHidden} onChangeText={(text) => setPassAgain(text)} />
            <Icon.Button name={pIcon} size={20} color='#FFFFFF' backgroundColor='transparent' ></Icon.Button>
          </View>

          <View style={{ flexDirection: 'row', borderBottomColor: "#000000", borderBottomWidth: 1 }}>
            <TextInput style={styles.userInput} placeholder="Email" keyboardType='email-address' onChangeText={(text) => setEmail(text)} />
            <Icon.Button name="mail" size={20} color='#000000' backgroundColor='transparent' ></Icon.Button>
          </View>

          <View style={{ flexDirection: 'row', borderBottomColor: "#000000", borderBottomWidth: 1 }}>
            <TextInput style={styles.userInput} placeholder="Phone Number" keyboardType='number-pad' onChangeText={(text) => setNumber(text)} />
            <Icon.Button name="call" size={20} color='#000000' backgroundColor='transparent' ></Icon.Button>
          </View>

          <View style={{ flexDirection: 'row', borderBottomColor: "#000000", borderBottomWidth: 1 }}>
            <TextInput style={styles.userInput} placeholder="Address" textAlignVertical='top' multiline={true} numberOfLines={3} onChangeText={(text) => setAddress(text)} />
            <Icon.Button name="home" size={20} color='#000000' backgroundColor='transparent' ></Icon.Button>
          </View>

          <View style={{ width: '80%', marginVertical: 10, borderBottomColor: '#000', borderBottomWidth: 1 }}>
            <Text>Select Province</Text>
            <Picker
              dropdownIconColor='#000'
              selectedValue={selectedCity}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCity(itemValue)
              }>
              <Picker.Item label="Province 1" value="1" />
              <Picker.Item label="Province 2" value="2" />
              <Picker.Item label="Province 3" value="3" />
            </Picker>
          </View>

          <View style={{ width: '80%', marginVertical: 10, borderBottomColor: '#000', borderBottomWidth: 1 }}>
            <Text>Select City</Text>
            <Picker
              dropdownIconColor='#000'
              selectedValue={selectedCity}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCity(itemValue)
              }>
              <Picker.Item label="Islamabad" value="1" />
              <Picker.Item label="Karachi" value="2" />
              <Picker.Item label="Gilgit Boi" value="3" />
            </Picker>
          </View>

          <View style={{ flexDirection: 'row', borderBottomColor: "#000000", borderBottomWidth: 1 }}>
            <TextInput style={styles.userInput} placeholder="CNIC Number" keyboardType='number-pad' onChangeText={(text) => setCNIC(text)} />
            <Icon.Button name="card" size={20} color='#000000' backgroundColor='#FFFFFF' ></Icon.Button>
          </View>



          <View style={styles.users}>

            <View style={{ borderRadius: 20, overflow: 'hidden' }}>
              <TouchableNativeFeedback onPress={validateFields}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Sign Up</Text>
                  <Icon.Button name="arrow-forward" size={15} color='#FFFFFF' backgroundColor='transparent'  ></Icon.Button>
                </View>

              </TouchableNativeFeedback>
            </View>

          </View>
        </Animatable.View>
        <StatusBar style="auto" />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
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
    marginVertical: 10
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
