import React from 'react';

import { StyleSheet, Text, View, Button, TouchableNativeFeedback, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';





import { useState, useEffect } from 'react';

import colorSet from './colors';

import Icon from 'react-native-vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from 'react-native/Libraries/NewAppScreen';


export default function BillInfo({ navigation, id, month, year, amount, consumer, status}) {

    const user = useSelector(state => state.userReducer)

    const [resComp, setResComp] = useState(0);
    const [unResComp, setUnResComp] = useState(0);
   
    const [billStatus, setBillStatus] = useState('Unpaid')

    const langState = useSelector(state => state.languageReducer)
    const [langIsEnglish, setLangIsEnglish] = useState(langState.isEnglish)

    useEffect(() => {
        changeLanguage();
        if(status == '1')
            setBillStatus('Paid')
    }, [langState.isEnglish]);

    const changeLanguage = () => {
        setLangIsEnglish(!langState.isEnglish)
    }

    return (
        <View style={styles.container}>

            <View style={styles.textContainer}>
                <Text style={styles.title}>{langIsEnglish ? `Bill #${id}` : `بل #${id}`}</Text>

                   
                {user.userType == 'guest' ?   <Text style={styles.subtitleText}>{langIsEnglish ? 'Sign Up / Login to use this feature' : 'اس فیچر کو استعمال کرنے کے لیے سائن اپ / لاگ ان کریں'}</Text> :  <View style={{width: '100%'}}>
                    <Text style={styles.subtitle} >{langIsEnglish ? 'Month and Year' : 'مہینہ اور سال'}</Text>
                    <Text style={styles.subtitleText}>{month}/{year}</Text>
            
                    <Text style={styles.subtitle} >{langIsEnglish ? 'Amount to be paid' : 'ادا کی جانے والی رقم'}</Text>
                    <Text style={styles.subtitleText}>{amount} Rs</Text>
             
                    <Text style={styles.subtitle} >{langIsEnglish ? 'Consumer ID' : 'صارفین کی شناخت'}</Text>
                    <Text style={styles.subtitleText}>{consumer}</Text>
                    
                    <Text style={styles.subtitle} >{langIsEnglish ? 'Bill Status' : 'بل کی حیثیت'}</Text>
                    <Text style={styles.subtitleText}>{billStatus}</Text>

                    <Text style={styles.subtitle} >{langIsEnglish ? 'Due Date' : 'واجب الادا تاریخ'}</Text>
                    <Text style={styles.subtitleText}>25 - {month} - {year}</Text>
                </View>}

               

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
        width: '100%'
    },
    subtitle:{
        fontWeight: 'bold',
        width: '100%',
        // backgroundColor: '#000'
    },
    subtitleText:{
        paddingBottom: 5,
        marginBottom: 8,
        borderBottomColor: colorSet.lightGray,
        borderBottomWidth: 1,
    }

});
