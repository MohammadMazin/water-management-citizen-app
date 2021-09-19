import React from 'react';

import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';


import { useState, useEffect } from 'react';

import Icon from 'react-native-vector-icons/Ionicons'

import { LinearGradient } from 'expo-linear-gradient';
import colorSet from '../src/comp/colors';

import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';
import { useWindowDimensions } from 'react-native';

import { Camera } from 'expo-camera';




export default function Attendance({ navigation }) {

    const window = useWindowDimensions();

    let camera;

    const user = useSelector(state => state.userReducer)

    const langState = useSelector(state => state.languageReducer)
    const [langIsEnglish, setLangIsEnglish] = useState(langState.isEnglish)

    const [photoTaken, setPhotoTaken] = useState(false)
    const [picDetail, setPicDetail] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);

    const [location, setLocation] = useState(null);

    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        changeLanguage();
        camLoad();
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, [langState.isEnglish]);

    const changeLanguage = () => {
        setLangIsEnglish(!langState.isEnglish)
    }

    const camLoad = () => {
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    }

    const snap = async () => {
        const photo = await camera.takePictureAsync({base64 : true});
        setPicDetail(photo)
        setPhotoTaken(true)
    };

    const markAttendance = async () => {


        let currentDate = new Date();
        let cDay = currentDate.getDate().toString()
        let cMonth = (currentDate.getMonth() + 1).toString()
        let cYear = currentDate.getFullYear().toString()
        let date = cYear + '/' + cMonth + '/' + cDay

        const fData = new FormData();
        fData.append('date', date)
        fData.append('image', {
          name: Date.now() + "_attendance_" + user.id.toString() + '.jpg',
          uri: picDetail.uri,
          type: 'image/jpg'
        })
        fData.append('worker_id', user.id.toString())
   
    
        await fetch(`http://${ip}:5000/attendance`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
          },
          body: fData
        });

        Alert.alert('Success!', 'Your attendance has been marked')
        navigation.goBack();

    }

    if (photoTaken) {
        return (
            <View style={styles.container}>
                {photoTaken && <Image source={{ uri: picDetail.uri }} style={{ height: window.height, width: window.width, position: 'absolute' }} />}
                <View style={{ height: window.height, width: window.width, justifyContent: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', paddingVertical: 20, justifyContent: 'space-around' }}>
                        <Icon.Button style={styles.sign} name="close" size={80} color='#FFFFFF' backgroundColor='transparent ' width='100%' onPress={() => setPhotoTaken(false)} ></Icon.Button>
                        <Icon.Button style={styles.sign} name="checkmark" size={80} color='#FFFFFF' backgroundColor='transparent ' width='100%' onPress={markAttendance} ></Icon.Button>
                    </View>
                </View>
            </View>)
    }

    return (
        <View style={styles.container}>
            <Camera style={{ width: window.width, height: window.height, position: 'absolute' }}
                type={Camera.Constants.Type.front}
                onCameraReady={() => console.log('isReady')}
                ref={(r) => {
                    camera = r
                }}>
                {/* <Button title="take pic" onPress={snap} /> */}
                <View style={{ height: window.height, width: window.width, justifyContent: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', padding: 20, justifyContent: 'center' }}>
                        <Icon.Button style={styles.sign} name="aperture" size={80} color='#FFFFFF' backgroundColor='transparent ' width='100%' onPress={snap} ></Icon.Button>
                    </View>
                </View>

            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    }

});
