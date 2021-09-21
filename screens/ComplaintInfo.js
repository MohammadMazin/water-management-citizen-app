import React from 'react'

import { StyleSheet, Text, View, Button, Alert, TouchableNativeFeedback, ScrollView, Linking, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';


import { useState, useEffect } from 'react';

import Icon from 'react-native-vector-icons/Ionicons'

import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';
import { useWindowDimensions } from 'react-native';

import colorSet from '../src/comp/colors';
import { color } from 'react-native-reanimated';


export default function ComplaintInfo({ navigation, route }) {

    const window = useWindowDimensions()
    const user = useSelector(state => state.userReducer)


    const {id} = route.params

    const [compDetail, setCompDetail] = useState()
    const [compType, setCompType] = useState('')
    const [delagted, setDelegated] = useState()

    const[isUrgent, setIsUrgent] = useState()
;
    const [hasLoaded, setHasLoaded] = useState(false)
    const [worker, setWorker] = useState()

    useEffect(() => {
        console.log(user.id)
        fetchComplaintInfo(user.userType);
        console.log(id)
    }, [])

    const fetchComplaintInfo = async (userType) => {
        const data = await fetch(`http://${ip}:5000/complaint-fetch-details/${userType}/${id}`)
        const res = await data.json();
        if (res.length == 0) {
            Alert.alert('Error!', 'Failed to retrieve complaints. Check your internet connection')
        } else {
            setCompDetail(res[0])
            console.log(res)

            if(res[0].compaint_priority == '0')
                setIsUrgent(false);
            else
                setIsUrgent(true);
            setHasLoaded(true)

            if(res[0].complaint_type == '0')
                setCompType('Water Issue')
            else if(res[0].complaint_type == '1')
                setCompType('Other')
            else if(res[0].complaint_type == '2')
                setCompType('Theft')
            else if(res[0].complaint_type == '3')
                setCompType('Pump Issue')
        }

    }

    if(!hasLoaded){
        return(
          <Text>Loading...</Text>
        )
      }
    return (
        <ScrollView>
            <View style={StyleSheet.container}>


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


                    <View style={styles.id}><Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FFFFFF' }}>Complaint ID: {id}</Text></View>

                    {/* <TouchableNativeFeedback onLongPress={() => Linking.openURL('geo:0,0?q=33.70828258136273,73.05061721351053(Yeet)')}>
                        <View style={{ borderRadius: 20, overflow: 'hidden' }}>
                            <MapView style={{ width: window.width / 1.5, height: window.height / 4, }} />
                        </View>
                    </TouchableNativeFeedback> */}

                    { user.id != compDetail.citizen_id && (user.userType == 'worker' || user.userType == 'technician'  ) ? <TouchableNativeFeedback style={styles.loginBtn}  onPress={() => navigation.push('Report', { id: compDetail.compaint_id })}>
                        <View style={styles.btn2}>
                            <Text style={styles.btnText2}>Submit Report</Text>
                        </View>
                    </TouchableNativeFeedback> : <View style={{ marginVertical: 20 }}></View>}


                </View>

                <View style={styles.dateStatusContainer}>
                    <View><Text style={{ fontSize: 30, color: colorSet.white }}>{compDetail.compaint_date}</Text></View>
                    <View><Text style={!isUrgent ? styles.statusNormal : styles.statusUrgent }>{!isUrgent ? 'Normal' : 'Urgent'}</Text></View>
                </View>


                <View style={styles.textContainer}>
                    <View style={styles.textField}>
                        <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
                            ID</Text>
                        <Text>{compDetail.citizen_id}</Text>
                    </View>
                    <View style={styles.textField}>
                        <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
                            Name</Text>
                        <Text>{compDetail.name}</Text>
                    </View>
                    <View style={styles.textField}>
                        <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
                            Mobile Number</Text>
                        <Text>{compDetail.phone}</Text>
                    </View>
                    <View style={styles.textField}>
                        <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
                            Complaint Type</Text>
                        <Text>{compType}</Text>
                    </View>
                    <View style={styles.textField}>
                        <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
                            Description</Text>
                        <Text>{compDetail.compaint_description}</Text>
                    </View>
                    <View style={styles.textField}>
                        <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
                            Location</Text>
                        <Text>{compDetail.compaint_location}</Text>
                    </View>
                    {/* <View style={styles.textField}>
                        <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
                            Priority</Text>
                        <Text>Lowest of the low</Text>
                    </View> */}
                    <View style={styles.textField}>
                        <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
                            Image </Text>
                        <Image source={{uri: `http://${ip}:5000/${compDetail.image}`}} style={{width: '95%', height:300, backgroundColor: '#000'}}/>
                    </View>
                    <View style={styles.textField}>
                        <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
                            Worker </Text>
                        <Text>{compDetail.worker_id}</Text>
                    </View>
                    <View style={styles.textField}>
                        <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
                            Delegated To</Text>
                        <Text>{compDetail.delegate_to}</Text>
                    </View>
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
        marginVertical: 10,
        position: 'relative',

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
