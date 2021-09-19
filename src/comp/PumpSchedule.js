import React from 'react';

import { StyleSheet, Text, View, Button, TouchableNativeFeedback, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';


import { useState, useEffect } from 'react';

import colorSet from './colors';

import Icon from 'react-native-vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from 'react-native/Libraries/NewAppScreen';


export default function PumpSchedule({ navigation }) {

    const user = useSelector(state => state.userReducer)

    const [resComp, setResComp] = useState(0);
    const [unResComp, setUnResComp] = useState(0);

    const langState = useSelector(state => state.languageReducer)
    const [langIsEnglish, setLangIsEnglish] = useState(langState.isEnglish)

    useEffect(() => {
        changeLanguage();
    }, [langState.isEnglish]);

    const changeLanguage = () => {
        setLangIsEnglish(!langState.isEnglish)
    }

    return (
        <View style={styles.container}>

            <View style={styles.textContainer}>
                <View style={{ width: '100%' }}>
                    <Text style={styles.title}>{langIsEnglish ? 'Pump Schedule' : 'پمپ شیڈول'}</Text>
                </View>

                {user.userType == 'guest' ? <Text style={styles.subtitleText}>{langIsEnglish ? 'Sign Up / Login to use this feature' : 'اس فیچر کو استعمال کرنے کے لیے سائن اپ / لاگ ان کریں'}</Text>  : 
                
                <View style={{width: '100%'}}>
                    <Text style={styles.subtitle} >{langIsEnglish ? 'Pump ID' : 'پمپ آئی ڈی'}</Text>
                    <Text style={styles.subtitleText}>231</Text>

                    <Text style={styles.subtitle} >{langIsEnglish ? 'Address' : 'پتہ'}</Text>
                    <Text style={styles.subtitleText}>Sharararar, Street 23, Multan Baltistan ki paanchwi gali</Text>

                    <Text style={styles.subtitle} >{langIsEnglish ? 'Pump Timings' : 'پمپ کے اوقات'}</Text>
                    <Text style={styles.subtitleText}>12am - 5am</Text>
                </View>
                }


            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        marginVertical: 10
    },
    textContainer: {
        elevation: 5,
        borderRadius: 10,
        padding: 10,
        borderColor: colorSet.primary,
        borderWidth: 3,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        width: '100%'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 5,
        borderBottomColor: colorSet.secondaryGrad,
        borderBottomWidth: 1,
        width: '100%'
    },
    subtitle: {
        fontWeight: 'bold'
    },
    subtitleText: {
        paddingBottom: 5,
        marginBottom: 8,
        borderBottomColor: colorSet.lightGray,
        borderBottomWidth: 1,
    }

});
