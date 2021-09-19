import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableNativeFeedback, ImageBackground, Alert } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { userData } from '../src/actions';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { useWindowDimensions } from 'react-native';

import ip from '../ip';

import Icon from 'react-native-vector-icons/Ionicons'
import colorSet from '../src/comp/colors';
import * as Location from 'expo-location';

import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { color } from 'react-native-reanimated';

export default function Login({ navigation }) {

  const window = useWindowDimensions()

  const id = useSelector(state => state.userReducer)
  const langState = useSelector(state => state.languageReducer)
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fieldsInvalid, setFieldsInvalid] = useState('')
  const [loginStatus, setLoginStatus] = useState('')


  const [pIcon, setPIcon] = useState('eye')
  const [passHidden, setPassHidden] = useState(true)

  const [langIsEnglish, setLangIsEnglish] = useState(true)

  const [segmentIndex, setSegmentIndex] = useState(0)

  const user = {
    id: '0',
    name: 'guest',
    email: '',
    address: '',
    phone: '',
    password: '',
    provinceId: '',
    cityId: '',
    userType: ''
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();
  },[])

  const setUserStatus = (event) => {
    setSegmentIndex(event.nativeEvent.selectedSegmentIndex);
  }

  const guestLogin = () => {
    dispatch(userData('1', 'guest', '', '', '', '', '', '', 'citizen'))
    navigation.push('Home')
 
  }

  const loginTest = async () => {

    try {
      if (segmentIndex === 0) {
        const data = await fetch(`http://${ip}:5000/citizen/${username}&${password}`)
        const res = await data.json();
        if (res.length == 0) {
          Alert.alert('Error','Login Failed! Enter Correct Credentials')
        } else {
          setLoginStatus('Login Successful')
          dispatch(userData(res[0].citizen_id, res[0].citizen_name, res[0].cnic, res[0].email, res[0].address, res[0].phone, res[0].password, res[0].provinceId, res[0].cityId, 'citizen', '' ))
          navigation.push('Home')
        }
      }
      else if (segmentIndex === 1) {
        const data = await fetch(`http://${ip}:5000/worker/${username}&${password}`)
        const res = await data.json();
        if (res.length == 0) {
          console.log('Login Failed! Enter Correct Credentials')
        } else {
          setLoginStatus('Login Successful')
          dispatch(userData(res[0].worker_id, res[0].worker_name, res[0].cnic, res[0].email, res[0].address, res[0].phone, res[0].password, res[0].provinceId, res[0].cityId,  'worker', res[0].stationId))
          navigation.push('Worker')
        }
      }
      else if (segmentIndex === 2) {
        const data = await fetch(`http://${ip}:5000/technician/${username}&${password}`)
        const res = await data.json();
        if (res.length == 0) {
          console.log('Login Failed! Enter Correct Credentials')
        } else {
          setLoginStatus('Login Successful')
          dispatch(userData(res[0].technician_id, res[0].technician_name, res[0].cnic, res[0].email, res[0].address, res[0].phone, res[0].password, res[0].provinceId, res[0].cityId, 'technician', ''))
          navigation.push('Technician')
        }
      }

    } catch (err) {
      console.log(err)
    }
  }

  const login = () => {
    setLoginStatus('')

    if (username === '' || password === '') {
      setLoginStatus('Enter Correct Login Details')
      return
    }

    loginTest();
  }

  const loginFromDB = async () => {

    try {
      const data = await fetch(`http://192.168.1.24:5000/${username}&${password}`)

      const res = await data.json();

      if (res.length == 0)
        setLoginStatus('Login Failed! Enter Correct Credentials')
      else {
        dispatch(userData(username, password),)
        setLoginStatus('Login Successful')
        navigation.navigate('Home')

      }

      console.log(res)

    } catch (err) {
      console.log(err)
    }
  }

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
      {/* <ImageBackground source={require('./../assets/bg.jpg')} style={{width: window.width, height:window.height, paddingTop: 50}}> */}



      <Animatable.Text animation="fadeInDownBig" duration={1500} style={styles.title}>Welcome To The Water Management Portal</Animatable.Text>
      <Animatable.View animation="fadeInUpBig" duration={1500} style={styles.loginContainer} >


        {/* {langIsEnglish ?  : <Text>واٹر مینجمنٹ پورٹل میں خوش آمدید</Text>} */}

        <View style={{ flexDirection: 'row', borderBottomColor: colorSet.lightGray, borderBottomWidth: 1 }}>
          <TextInput style={styles.userInput} placeholder="Username" onChangeText={(text) => setUsername(text)} />
          <Icon.Button name="person" size={20} color='#444444 ' backgroundColor='transparent'></Icon.Button>
        </View>

        <View style={{ flexDirection: 'row', borderBottomColor: colorSet.lightGray, borderBottomWidth: 2 }}>
          <TextInput style={styles.userInput} placeholder="Password" secureTextEntry={passHidden} onChangeText={(text) => setPassword(text)} />
          <Icon.Button name={pIcon} size={20} color='#444444' backgroundColor='transparent' onPress={switchPassView}></Icon.Button>
        </View>

        <Text style={{ color: colorSet.compUrgent, marginVertical: 3 }}>{loginStatus}</Text>

        <View style={styles.login}>

          <SegmentedControl
            values={['Citizen', 'Worker', 'Technician']}
            selectedIndex={segmentIndex}
            onChange={setUserStatus}
            tintColor={colorSet.primary}
            backgroundColor={colorSet.secondary}
            style={{ width: '90%', backgroundColor: '#000', height: 35, marginBottom: 10 }}
          />
          
          <LinearGradient
            colors={[colorSet.primary, colorSet.secondary2]}
            style={{
              width: '100%',
              borderRadius: 20
            }}
          >
            <View style={styles.loginBtn}>
              <TouchableNativeFeedback style={styles.loginBtn} onPress={login}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Login</Text>
                </View>
              </TouchableNativeFeedback>
            </View>

          </LinearGradient>

          <View style={styles.loginBtn}>
            <TouchableNativeFeedback style={styles.loginBtn} onPress={guestLogin}>
              <View style={styles.btn2}>
                <Text style={styles.btnText2}>Login As Guest Citizen</Text>
              </View>
            </TouchableNativeFeedback>
          </View>

          {/* <Button title="Login As Guest" onPress={() => navigation.push('Home')}/> */}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
          <TouchableNativeFeedback style={styles.loginBtn} onPress={() => navigation.push('SignUp')}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2}>Sign Up</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback style={styles.loginBtn} onPress={() => navigation.push('ForgotPassword')}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2}>Forgot Password?</Text>
            </View>
          </TouchableNativeFeedback>

        </View>

      </Animatable.View>
      <StatusBar style="hidden" />
      {/* </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    // backgroundColor: colorSet.primary,
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
    alignItems: 'center',
    width: '80%',
    marginVertical: 20,

  },
  loginBtn: {
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 5,
    width: '100%'
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
    alignItems: "center",
    // backgroundColor: colorSet.primary,
    padding: 10,
    borderRadius: 20
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold'
  },
  btn2: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 20,
    borderColor: colorSet.primary,
    borderWidth: 4
  },
  btnText2: {
    color: colorSet.primary,
    fontWeight: 'bold'
  }
});
