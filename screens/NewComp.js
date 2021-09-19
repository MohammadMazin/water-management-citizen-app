import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableNativeFeedback, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-native';
import { Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import colorSet from '../src/comp/colors';
import ip from '../ip';
import Icon from 'react-native-vector-icons/Ionicons'

import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';
import { useWindowDimensions } from 'react-native';
import { Camera } from 'expo-camera';

import { setImage } from '../src/actions';


export default function NewComp({ navigation }) {

  const user = useSelector(state => state.userReducer)
  const camImage = useSelector(state => state.imageReducer)
  const dispatch = useDispatch();

  const window = useWindowDimensions()

  const [modalVisible, setModalVisible] = useState(false)
  const [cameraModalVisible, setCameraModalVisible] = useState(false)

  const langState = useSelector(state => state.languageReducer)
  const [langIsEnglish, setLangIsEnglish] = useState(langState.isEnglish)

  const [hasLoaded, setHasLoaded] = useState(false)
  const [location, setLocation] = useState(null);


  const [viewPumpMap, setViewPumpMap] = useState()

  const [title, setTitle] = useState('')
  const [dV, setdV] = useState(false)
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')

  const [selectedCompType, setSelectedCompType] = useState('0');
  const [selectedCompPriority, setSelectedCompPriority] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedProvince, setSelectedProvince] = useState('0');
  const [pumpID, setPumpID] = useState('');
  const [picBase64, setPicBase64] = useState('');
  const [pumpLocations, setPumpLocations] = useState();
  const [cities, setCities] = useState([])
  const [provinces, setProvinces] = useState([])

  let camera;
  const [photoTaken, setPhotoTaken] = useState(false)
  const [picDetail, setPicDetail] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);


  const dateSwitch = () => {
    setdV(!dV)
  }

  const dateSelect = (selectedDate) => {
    const myArr = JSON.stringify(selectedDate).split("T");
    const myArr2 = myArr[0].split('"');
    setDate(myArr2[1])
    setdV(false)
  }


  useEffect(() => {

    changeLanguage();
    getCurrentLocation();
    setViewPumpMapFunc()
    camLoad();
    populatePumps();
    getCityProvince();

    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

  }, [langState.isEnglish, selectedCompType]);

  const changeLanguage = () => {
    setLangIsEnglish(!langState.isEnglish)
  }

  const setViewPumpMapFunc = () => {
    if (selectedCompType == '3')
      setViewPumpMap(true)
    else
      setViewPumpMap(false)
  }

  const populatePumps = async () => {
    const data = await fetch(`http://${ip}:5000/pumps`)
    const res = await data.json();

    if (res.length == 0)
      Alert.alert('Error', 'Could not retrive pump location')
    else
      setPumpLocations(res)
  }

  const getCurrentLocation = async () => {
    // (async () => {
    //   let { status } = await Location.requestForegroundPermissionsAsync();
    //   if (status !== 'granted') {
    //     setErrorMsg('Permission to access location was denied');
    //     return;
    //   }

    //   let location = await Location.getCurrentPositionAsync({});
    //   setLocation(location);
    //   setHasLoaded(true)
    // })();
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setHasLoaded(true)
  }

  const getCityProvince = async () => {
    const data = await fetch(`http://${ip}:5000/cities`)
    const res = await data.json();

    if (res.length == 0)
      Alert.alert('Error', 'Could not retrive cities')
    else
      setCities(res)

    const data2 = await fetch(`http://${ip}:5000/provinces`)
    const res2 = await data2.json();

    if (res2.length == 0)
      Alert.alert('Error', 'Could not retrive Provinces')
    else
      setProvinces(res2)
  }

  const camLoad = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }

  const snap = async () => {
    const photo = await camera.takePictureAsync({ base64: true });
    setPicDetail(photo)
    setPhotoTaken(true)
    // setPicBase64(photo.base64)
    setCameraModalVisible(!cameraModalVisible)
  };


  const submitForm = async () => {


    if (title == '' || date == '' || description == '' || address == '' || picDetail == '' || date == '' || (selectedCompType == '3' && pumpID == ''
    )) {

      Alert.alert('Complaint Submission Failed', 'Please enter data in all the fields!')
      return
    }

    let userLevel = '0';
    if (user.userType == 'guest')
      userLevel = '0'
    else if (user.userType == 'citizen')
      userLevel = '1'
    else if (user.userType == 'worker')
      userLevel = '2'
    else if (user.userType == 'technician')
      userLevel = '3'

    console.log(selectedCompType)

    const fData = new FormData();
    fData.append('compaint_date', date)
    fData.append('compaint_description', description)
    fData.append('compaint_location', address)
    fData.append('compaint_priority', selectedCompPriority)
    fData.append('compaint_status', '0')
    fData.append('image', {
      name: Date.now() + "_" + user.id.toString() + '.jpg',
      uri: picDetail.uri,
      type: 'image/jpg'
    })
    fData.append('complaint_type', selectedCompType)
    fData.append('complaint_by', userLevel)
    fData.append('citizen_id', user.id.toString())



    await fetch(`http://${ip}:5000/complaint-submit`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      body: fData
    });

    setModalVisible(true)
  }

  const openCam = async () => {
    setCameraModalVisible(true)
  }


  return (
    <ScrollView>

      <DateTimePickerModal
        isVisible={dV}
        mode="date"
        onConfirm={dateSelect}
        onCancel={dateSwitch}
      />





      <View style={[styles.container, modalVisible || cameraModalVisible ? { backgroundColor: 'rgba(0,0,0,0.5)' } : '']}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>

            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image source={require('./../assets/formSubmit.png')} style={{ height: 100, width: 100, position: 'absolute', top: -50, paddingBottom: 75 }} />
                <Text style={styles.modalText}>{langIsEnglish ? 'Complaint Submitted' : 'شکایت جمع کرائی گئی'}</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() =>

                    navigation.goBack()}
                >
                  <Text style={styles.textStyle}>Go Back To Home Screen</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={cameraModalVisible}
          onRequestClose={() => {
            setCameraModalVisible(!cameraModalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <Camera style={{ width: window.width, height: window.height }}
              type={Camera.Constants.Type.back}
              onCameraReady={() => console.log('isReady')}
              ref={(r) => {
                camera = r
              }}>
              <View style={{ height: window.height, width: window.width, justifyContent: 'flex-end' }}>
                <View style={{ flexDirection: 'row', padding: 20, justifyContent: 'center' }}>
                  <Icon.Button style={styles.sign} name="aperture" size={80} color='#FFFFFF' backgroundColor='transparent ' width='100%' onPress={snap} ></Icon.Button>
                </View>
              </View>
            </Camera>
          </View>
        </Modal>


        <LinearGradient
          colors={[colorSet.primary, '#1D3DCC']}
          start={{ x: 0.1, y: 0.1 }}
        >
          <View style={styles.mapContainer}>
          </View>
        </LinearGradient>



        <View style={styles.textContainer}>

          <View style={styles.textField}>
            <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
              {langIsEnglish ? 'Complaint Type' : 'شکایت کی قسم'}</Text>
            <Picker
              dropdownIconColor='#000'
              selectedValue={selectedCompType}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCompType(itemValue)
              }>

              <Picker.Item label="Water Issue" value="0" />
              <Picker.Item label="Other" value="1" />
              {user.userType != 'citizen' && user.userType != 'guest' ? <Picker.Item label="Theft" value="2" /> : null}
              {user.userType != 'citizen' && user.userType != 'guest' ? <Picker.Item label="Pump Issue" value="3" /> : null}

            </Picker>
          </View>

          <View style={styles.textField}>
            <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
              {langIsEnglish ? 'Complaint Title' : 'شکایت کا عنوان'}</Text>
            <TextInput onChangeText={(text) => setTitle(text)} />
          </View>

          <View style={styles.textField}>
            <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
              {langIsEnglish ? 'Date' : 'تاریخ'}</Text>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              <Text style={{ textAlignVertical: 'center' }} >{date}</Text>
              <Icon.Button style={styles.sign} name="calendar" size={25} color='#000000' backgroundColor='transparent' onPress={dateSwitch} width='100%' ></Icon.Button>
            </View>
          </View>

          <View style={styles.textField}>
            <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
              {langIsEnglish ? 'Complaint Description' : 'شکایت کی تفصیل'}</Text>
            <TextInput multiline={true} numberOfLines={5} textAlignVertical='top' onChangeText={(text) => setDescription(text)} />
          </View>

          <View style={styles.textField}>
            <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
              {langIsEnglish ? 'Complaint Location' : 'پتہ'}</Text>
            <TextInput onChangeText={(text) => setAddress(text)} />
          </View>

          <View style={styles.textField}>
            <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
              {langIsEnglish ? 'Complaint Priority' : 'شکایت ترجیح'}</Text>
            <Picker
              dropdownIconColor='#000'
              selectedValue={selectedCompPriority}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCompPriority(itemValue)
              }>

              <Picker.Item label="Normal" value="0" />
              <Picker.Item label="Urgent" value="1" />
            </Picker>
          </View>

          {/* <View style={styles.textField}>
            <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
              {langIsEnglish ? 'Province' : 'شہر'}</Text>

            <Picker
              dropdownIconColor='#000'
              selectedValue={selectedProvince}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedProvince(itemValue)
              }>
              {provinces.map((province) => {

                return (
                  <Picker.Item label={province.province_name} value={province.province_id} />
                )
              })
              }

            </Picker>
          </View>

          <View style={styles.textField}>
            <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
              {langIsEnglish ? 'City' : 'شہر'}</Text>

            <Picker
              dropdownIconColor='#000'
              selectedValue={selectedCity}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCity(itemValue)
              }>
              {cities.map((city) => {

                return (
                  <Picker.Item label={city.city_name} value={city.city_id} />
                )
              })
              }

            </Picker>
          </View> */}



          {hasLoaded && viewPumpMap ?


            <View>
              <View style={styles.textField}>
                <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
                  {langIsEnglish ? 'Pump ID' : 'پمپ آئی ڈی'}</Text>
                <TextInput textAlignVertical='top' onChangeText={(text) => setPumpID(text)} />
              </View>
              <MapView
                style={{ width: window.width, height: window.height / 4 }}
                showsCompass={true}
                toolbarEnabled={true}
                showsUserLocation={true}
                initialRegion={{
                  latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}>

                {pumpLocations.map((loc) => {

                  return (
                    <Marker
                      coordinate={{ latitude: loc.latitude, longitude: loc.longitude, }}
                      title={loc.station_name}
                      description={loc.location}
                    />
                  )
                })
                }


              </MapView>

            </View>

            : null
          }

          <View style={styles.textField}>
            <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
              {langIsEnglish ? 'Image' : 'تصویر'}</Text>
            {photoTaken && <Image source={{ uri: picDetail.uri }} style={{ height: 300, width: 300, backgroundColor: '#000' }} />}

          </View>

          <TouchableNativeFeedback style={styles.selectLocationBtn} onPress={openCam}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>{langIsEnglish ? 'Take Image' : 'تصویر لیں'}</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback style={styles.loginBtn} onPress={submitForm}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2}>{langIsEnglish ? 'Submit Report' : 'رپورٹ جمع کروائیں'}</Text>
            </View>
          </TouchableNativeFeedback>

        </View>


        {/* <Button title="Submit"  onPress={submitForm}/> */}


      </View>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    width: '100%',
    height: '50%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  userInput: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
    paddingVertical: 5,
    width: '90%',
    marginBottom: 20
  },

  btdn: {
    marginVertical: 10,
    width: '80%'
  },
  inputs: {
    marginLeft: 20,
    marginTop: 50
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: "center",
    marginTop: 22
  },
  modalContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {

    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    width: '100%',
    height: '50%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginTop: 55,
    marginBottom: 15,
    textAlign: "center"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  mapContainer: {
    width: '100%',
    // backgroundColor: colorSet.primary,
    paddingBottom: 150,
    paddingTop: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',

  },
  loginBtn: {
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 5,
    width: '100%'
  },
  selectLocationBtn: {
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 5,
    width: '80%'
  },
  btn: {
    alignItems: "center",
    backgroundColor: colorSet.primary,
    marginVertical: 20,
    padding: 10,
    borderRadius: 20,
    borderColor: colorSet.primary,
    borderWidth: 4
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  btn2: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginVertical: 20,
    padding: 10,
    borderRadius: 20,
    borderColor: colorSet.primary,
    borderWidth: 4
  },
  btnText2: {
    color: colorSet.primary,
    fontWeight: 'bold'
  },
  id: {
    marginVertical: 10
  },
  dateStatusContainer: {
    backgroundColor: '#000000',
    marginTop: -150,
    alignSelf: 'flex-start',
    paddingLeft: 20,
    paddingRight: 90,
    paddingBottom: 10,
    borderTopRightRadius: 40

  },
  textContainer: {
    backgroundColor: colorSet.white,
    width: '100%',
    borderTopRightRadius: 50,
    paddingVertical: 25,
    marginTop: -50
  },
  statusNormal: {
    backgroundColor: colorSet.compNormal,
    fontSize: 20,
    color: colorSet.white,
    paddingHorizontal: 10,
    borderRadius: 20,
    maxWidth: 95
  },
  statusUrgent: {
    backgroundColor: colorSet.compUrgent,
    fontSize: 20,
    color: colorSet.white,
    paddingHorizontal: 10,
    borderRadius: 20,
    maxWidth: 90,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textField: {
    backgroundColor: '#FFFFFF',
    borderColor: '#F0F1F7',
    borderWidth: 3,
    maxWidth: '90%',
    marginLeft: '5%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 5

  }

});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   userInput:{
//     borderBottomWidth: 2,
//     borderBottomColor: 'blue',
//     paddingVertical: 5,
//     width: '80%',
//     marginBottom: 20
//   },

//   btdn:{
//     marginVertical: 10,
//     width: '80%'
//   }
// });
