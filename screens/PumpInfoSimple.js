import React from 'react'

import { StyleSheet, Text, View, Button, Alert, TextInput, ScrollView, Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import PumpInfoBox from '../src/comp/PumpInfoBox';

import { useState, useEffect } from 'react';

import Icon from 'react-native-vector-icons/Ionicons'

import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';
import { useWindowDimensions } from 'react-native';

import colorSet from '../src/comp/colors';
import { color } from 'react-native-reanimated';


export default function PumpInfoSimple({ navigation, route }) {

    const window = useWindowDimensions()
    const user = useSelector(state => state.userReducer)
    const langState = useSelector(state => state.languageReducer)

    const [location, setLocation] = useState();
    const [showPumpDetail, setShowPumpDetail] = useState(false);
    const [pumpDetail, setPumpDetail] = useState()
    const [pumpLocations, setPumpLocations] = useState();
    const [pumpID, setPumpID] = useState('')
    const [hasLoaded, setHasLoaded] = useState(false)

    const [langIsEnglish, setLangIsEnglish] = useState(false)


    useEffect(() => {
        changeLanguage();
        getCurrentLocation();
        populatePumps();

    }, [langState.isEnglish])

    const changeLanguage = () => {
        setLangIsEnglish(!langState.isEnglish)
    }

    const getCurrentLocation = async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getLastKnownPositionAsync({})
        setLocation(location);
        // console.log(location)
        // setHasLoaded(true)


        // let location = await Location.getCurrentPositionAsync({});
        // console.log(location)  
        // setLocation(location);
        //   setHasLoaded(true)
    }


    const populatePumps = async () => {
        const data = await fetch(`http://${ip}:5000/pumps`)
        const res = await data.json();

        if (res.length == 0) {
            Alert.alert('Error', 'Could not retrive pump location')
            navigation.goBack();
        }
        else {
            setPumpLocations(res)
            setHasLoaded(true)
        }
    }

    const search = async () => {

        if (pumpID == '') {
            Alert.alert('Error', 'Please Enter A Valid Pump ID')
            return
        }

        const data = await fetch(`http://${ip}:5000/pump-info/${pumpID}`)
        const res = await data.json();


        if (res.length == 0) {
            Alert.alert('Error', `Could not find any Pump with ID: ${id}`)
            showPumpDetail(false)
            return;
        }
        else {
            setPumpDetail(res[0])
            setShowPumpDetail(true)
        }
    }


    if (!hasLoaded) {
        return (
            <Text>Loading...</Text>
        )
    }
    return (
        <ScrollView>
            <View style={styles.container}>


                <View style={styles.mapContainer}>
                    <LinearGradient
                        colors={[colorSet.primary, '#1D3DCC']}
                        start={{ x: 0.1, y: 0.1 }}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            height: window.height / 1.2,
                        }}
                    />

                    <View style={styles.id}><Text style={{ fontSize: 18, textAlign:'center', fontWeight: 'bold', color: '#FFFFFF', margin: 10 }}>Find The Pump ID Of Your Closest Station</Text></View>
                    <MapView
                        style={{ width: window.width/1.1, height: window.height / 3 }}
                        showsCompass={true}
                        toolbarEnabled={true}
                        showsUserLocation={true}
                        initialRegion={{
                            latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.005,
                            longitudeDelta: 0.02,
                        }}
                    >

                        {pumpLocations.map((loc) => {

                            return (
                                <Marker
                                    coordinate={{ latitude: loc.latitude, longitude: loc.longitude, }}
                                    title={loc.station_name}
                                    description={`${loc.pump_id}`}
                                />
                            )
                        })
                        }
                    </MapView>

                </View>
                <View style={styles.textField}>
                    <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: 'transparent' }}>
                        {langIsEnglish ? 'Pump ID' : 'پمپ آئی ڈی'}</Text>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                        <TextInput style={{ width: '70%' }} keyboardType='decimal-pad' onChangeText={(text) => setPumpID(text)} />
                        <Icon.Button style={styles.sign} name="search" size={25} color='#000000' backgroundColor='transparent' onPress={search} width='100%' ></Icon.Button>
                    </View>
                </View>




                {showPumpDetail ? <PumpInfoBox id={pumpDetail.pump_id} long={pumpDetail.longitude} lat={pumpDetail.latitude} start={pumpDetail.start_time} stop={pumpDetail.stop_time} address={pumpDetail.location} status={pumpDetail.status} /> : <Text>{langIsEnglish ? 'Enter Pump ID to see details' : 'تفصیلات دیکھنے کے لیے پمپ آئی ڈی درج کریں'} </Text>}

            </View>
           
        </ScrollView>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#862810',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        // marginVertical: 10,
        position: 'relative',

    },
    mapContainer: {
        width: '100%',
        backgroundColor: colorSet.primary,
        paddingBottom: 75,
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
        paddingVertical: 25
    },
    statusNormal: {
        backgroundColor: colorSet.green,
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
