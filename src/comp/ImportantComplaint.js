import React from 'react';

import { StyleSheet, Text, View, Button, TouchableNativeFeedback, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import colorSet from './colors';
import Complaint from '../../screens/Complaint';


export default function ImportantComplaint({ navigation }) {

    const [resComp, setResComp] = useState(0);
    const [unResComp, setUnResComp] = useState(0);
   

    const langState = useSelector(state => state.languageReducer)
    const [langIsEnglish, setLangIsEnglish] = useState(langState.isEnglish)

    const user = useSelector(state => state.userReducer)

    useEffect(() => {
        changeLanguage();
    }, [langState.isEnglish]);

    const changeLanguage = () => {
        setLangIsEnglish(!langState.isEnglish)
    }

    return (
        <View style={styles.container}>

            <View style={styles.textContainer}>
                <Text style={styles.title}>{langIsEnglish ? 'Important Complaints From Your Area' : 'آپ کے علاقے سے اہم شکایات'}</Text>
                {user.userType == 'guest' ? <Text>{langIsEnglish ? 'Sign Up / Login to use this feature' : 'اس فیچر کو استعمال کرنے کے لیے سائن اپ / لاگ ان کریں'}</Text> : <Complaint />}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        // marginVertical: 10
    },
    textContainer: {
        elevation: 5,
        padding: 10,
        width: '100%',
        backgroundColor: colorSet.lightGray,
        alignItems: 'flex-start',
        paddingBottom: 25
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
        fontWeight: 'bold'
    },
    subtitleText:{
        paddingBottom: 5,
        marginBottom: 8,
        borderBottomColor: colorSet.lightGray,
        borderBottomWidth: 1,
    }

});
