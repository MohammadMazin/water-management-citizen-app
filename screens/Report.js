import React from 'react'

import { StyleSheet, Text, View, Pressable, TextInput, Alert, TouchableNativeFeedback, ScrollView, Modal, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePickerModal from "react-native-modal-datetime-picker";


import { useState, useEffect } from 'react';

import Icon from 'react-native-vector-icons/Ionicons'

import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';
import { useWindowDimensions } from 'react-native';

import colorSet from '../src/comp/colors';


export default function Report({ navigation, isUrgent, route }) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [fulfilledTime, setFulfilledTime] = useState('')
    const [remarks, setRemarks] = useState('123')
    const [userLocation, setLocation] = useState();

    const [hasLoaded, setHasLoaded] = useState(true)

    const [dV, setdV] = useState(false)
    const [time, setTime] = useState('')

    const window = useWindowDimensions()
    const [modalVisible, setModalVisible] = useState(false)

    const { id } = route.params

    useEffect(() => {

        // getCurrentLocation()
    }, [])

    const getCurrentLocation = async  () => {

        // (async () => {
        //     // let { status } = await Location.requestForegroundPermissionsAsync();
        //     // if (status !== 'granted') {
        //     //     setErrorMsg('Permission to access location was denied');
        //     //     return;
        //     // }

        //     let location = await Location.getCurrentPositionAsync({accuracy: 6});
        //     setLocation(location);
        //     console.log(location)
        //     setHasLoaded(true)
        // })();

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setHasLoaded(true)

    }

    const timeOn = () => {
        setdV(true)
    }

    const timeOff = (time) => {
        const myArr = JSON.stringify(time).split("T");
        const myArr2 = myArr[1].split(".");
        setTime(myArr2[0])
        setFulfilledTime(myArr2[0])
        setdV(false)
    }

   

    const submit = async () => {

        if (title == '' || description == '' || time == '' || remarks == '') {
            Alert.alert('Failed To Submit!', 'Some Fields are still empty. Please enter the complete info and then submit your report.')
            return
        }

        // //Submit Report
        fetch(`http://${ip}:5000/report-submit`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                complaint_report_description: title,
                complaint_report_detail: description,
                complaint_assigned_time: '',
                complaint_fullfiled_time: time,
                remarks: remarks,
                complaint_id: id
            })
        });

        fetch(`http://${ip}:5000/report-submit/update-complaint`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        });

        // console.log('longitude: ', userLocation.coords.longitude, '    Latitude: ', userLocation.coords.latitude)
        setModalVisible(!modalVisible)
    }

    if (!hasLoaded) {
        return (
            <Text>Loading...</Text>
        )
    }

    return (
        <ScrollView>
            <View style={[styles.container, modalVisible ? { backgroundColor: 'rgba(0,0,0,0.5)' } : '']}>

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
                                <Text style={styles.modalText}>Report Submitted</Text>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => navigation.goBack()}
                                >
                                    <Text style={styles.textStyle}>Go Back</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>

                </Modal>



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


                    <View style={styles.id}><Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FFFFFF' }}>Complaint #{id}</Text></View>


                </View>


                <View style={styles.dateStatusContainer}>
                    <View><Text style={{ fontSize: 30, color: colorSet.white }}>23-Aug-2021</Text></View>
                    <View><Text style={styles.statusNormal}>Normal</Text></View>
                </View>

                <DateTimePickerModal
                    isVisible={dV}
                    mode="time"
                    onConfirm={timeOff}
                    onCancel={timeOff}
                    timeZoneOffsetInMinutes={0}
                />


                <View style={styles.textContainer}>

                    <View style={styles.textField}>
                        <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
                            Complaint ID</Text>
                        <Text>3123</Text>
                    </View>

                    <View style={styles.textField}>
                        <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
                            Title</Text>
                        <TextInput onChangeText={(text) => setTitle(text)} />
                    </View>

                    <View style={styles.textField}>
                        <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
                            Description</Text>
                        <TextInput multiline={true} numberOfLines={5} textAlignVertical='top' onChangeText={(text) => setDescription(text)} />
                    </View>

                    <View style={styles.textField}>
                        <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
                            Complaint Fulfilled Time</Text>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <Text style={{ textAlignVertical: 'center' }} >{time}</Text>
                            <Icon.Button style={styles.sign} name="time" size={25} color='#000000' backgroundColor='transparent' onPress={timeOn} width='100%' ></Icon.Button>
                        </View>
                    </View>

                    <View style={styles.textField}>
                        <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
                            Remarks</Text>
                        <TextInput multiline={true} numberOfLines={3} textAlignVertical='top' onChangeText={(text) => setRemarks(text)} />
                    </View>

                    <TouchableNativeFeedback style={styles.loginBtn} onPress={submit}>
                        <View style={styles.btn2}>
                            <Text style={styles.btnText2}>Submit Report</Text>
                        </View>
                    </TouchableNativeFeedback>

                </View>


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
        backgroundColor: colorSet.primary,
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
