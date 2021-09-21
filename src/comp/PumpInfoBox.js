import React from 'react';

import { StyleSheet, Text, View, Button, TouchableNativeFeedback, Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import SegmentedControl from '@react-native-segmented-control/segmented-control';

import colorSet from './colors';

import Icon from 'react-native-vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from 'react-native/Libraries/NewAppScreen';


export default function PumpInfoBox({ long, lat, start, stop, address, status, id, workerId }) {

    const user = useSelector(state => state.userReducer)

    const navigation = useNavigation();

    const [resComp, setResComp] = useState(0);
    const [unResComp, setUnResComp] = useState(0);

    const [pumpStatus, setPumpStatus] = useState('Loading...')


    const langState = useSelector(state => state.languageReducer)
    const [langIsEnglish, setLangIsEnglish] = useState(langState.isEnglish)

    useEffect(() => {
        changeLanguage();
        setStatus()
    }, [langState.isEnglish]);

    const changeLanguage = () => {
        setLangIsEnglish(!langState.isEnglish)
    }

    const setStatus = () => {
        if (status == '0')
            setPumpStatus('Off')
        else if (status == '1')
            setPumpStatus('On')
        else if (status == '2')
            setPumpStatus('Under Maintainance')

    }


    return (
        <View style={styles.container}>

            <View style={styles.textContainer}>

                <View style={styles.topRow}>
                    <Text style={styles.title}>{langIsEnglish ? `Pump ID: ${id}` : `${id} پمپ آئی ڈی`}</Text>
                    {/* <Button title="on/off" /> */}
                </View>


                {user.userType != 'guest' ?
                    <View style={{ width: '100%' }}>
                        <Text style={styles.subtitle} >{langIsEnglish ? 'Start Time' : 'شروع وقت'}</Text>
                        <Text style={styles.subtitleText}>{start}</Text>

                        <Text style={styles.subtitle} >{langIsEnglish ? 'Stop Time' : 'اختتامی وقت'}</Text>
                        <Text style={styles.subtitleText}>{stop}</Text>

                        <Text style={styles.subtitle} >{langIsEnglish ? 'Location' : 'جگہ'}</Text>
                        <Text style={styles.subtitleText}>{address}</Text>

                        <Text style={styles.subtitle} >{langIsEnglish ? 'Pump Status' : 'پمپ کی حالت'}</Text>
                        <Text style={styles.subtitleText}>{pumpStatus}</Text>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            {user.id == workerId && user.userType == 'worker' ? <Button title="View More Info" onPress={() => navigation.push('PumpInfo', { id: id })}/> : null}
                            {/* {user.id == workerId && user.userType == 'worker' ? <Button title="View More Info" onPress={() => console.log(id)}/> : null} */}
                            <Button title="View Location On Map" onPress={() => Linking.openURL(`geo:0,0?q=${lat},${long}(Yeet)`)} />
                        </View>

                    </View> :
                    <Text style={styles.subtitleText}>{langIsEnglish ? 'Sign Up / Login to use this feature' : 'اس فیچر کو استعمال کرنے کے لیے سائن اپ / لاگ ان کریں'}</Text>

                }



            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        marginVertical: 10
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    textContainer: {
        elevation: 5,
        borderRadius: 10,
        padding: 10,
        borderColor: colorSet.primary,
        borderWidth: 3,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'flex-start'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 5,
        borderBottomColor: colorSet.secondaryGrad,
        borderBottomWidth: 1,

    },
    subtitle: {
        fontWeight: 'bold',
        width: '100%',
        // backgroundColor: '#000'
    },
    subtitleText: {
        paddingBottom: 5,
        marginBottom: 8,
        borderBottomColor: colorSet.lightGray,
        borderBottomWidth: 1,
    }

});
