import React from 'react'

import { StyleSheet, Text, View, Button, TouchableNativeFeedback, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';


import { useState, useEffect } from 'react';

import Icon from 'react-native-vector-icons/Ionicons'

import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';
import { useWindowDimensions } from 'react-native';

import colorSet from '../src/comp/colors';

export default function Complaint({ navigation, isUrgent,date,description, address }) {


    const [isUrgentComp, setIsUrgentComp] = useState(false)

    useEffect(() => {
        if(isUrgent == '1')
            setIsUrgentComp(true)

    }, [])


    return (
            <View style={StyleSheet.container} >
                <View style={styles.compBox}>
                    
                    
                 {isUrgentComp ?  <LinearGradient
                    colors={['#F21212', '#B00D09']}
                    style={{
                       flex: 1
                    }}
                     >

                    <View style={{flex:1}}>
                    </View>
                     </LinearGradient>
                      : 
                     <LinearGradient
                    colors={['#F2C312', '#F29812']}
                    style={{
                       flex: 1
                    }}
                     >

                    <View style={{flex:1}}>
                    </View>
                     </LinearGradient>

                }
                    

                    <View style={styles.compInfo}>
                        <View style={styles.date}><Text style={{ fontSize: 20, fontWeight: 'bold' }}>{date}</Text></View>
                        {/* <View style={styles.time}><Text style={{ fontSize: 15 }} >12:34</Text></View> */}
                        <View style={styles.description} ><Text numberOfLines={2}>{description}</Text></View>

                    </View>
                </View>

                <LinearGradient
                    colors={['#4A8BEB', '#3382F0']}
                    style={{
                        width: '100%'
                    }}
                >
                    <Text style={styles.address} numberOfLines={1}>{address}</Text>
                </LinearGradient>
                <Text style={{color: '#FFFFFF'}}>...</Text>
            </View>
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
        borderRadius: 20,
        overflow: 'hidden'
    },
    compBox: {
        flexDirection: 'row',
        flex: 0,
        minWidth: '100%',
        maxWidth: '100%',
        elevation: 15,
        height: 130,
        backgroundColor: '#FFFFFF',
    },
    compInfo: {
        flex: 9,
        paddingLeft: 10,
        alignSelf: 'flex-start',
        // backgroundColor: '#FFFFFF'
    },
    compStatusNormal: {
        width: '10%',
        backgroundColor: colorSet.compNormal,
        flex: 1
    },
    compStatusUrgent: {
        width: '10%',
        backgroundColor: colorSet.compUrgent,
        flex: 1
    },
    address: {
        alignSelf: 'flex-start',
        maxWidth: '100%',
        color: '#FFFFFF',
        paddingVertical: 5,
        paddingLeft: 15,
        paddingRight: 15,
        width: '100%',
        elevation: 15,
        marginVertical: 5
    },
    date: {
        marginTop: 10,
        alignSelf: 'flex-start',
        backgroundColor: '#E7F0F0',
        borderRadius: 20,
        padding: 5,
        paddingHorizontal: 10
    },
    description: {
        borderTopColor: '#4A8BEB',
        borderTopWidth: 1,
        alignSelf: 'flex-start',
        marginVertical: 10
    },
    time: {
        alignSelf: 'flex-start',
    }
});
