import React from 'react';

import { StyleSheet, Text, View, ScrollView, TouchableNativeFeedback, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';


import { useState, useEffect } from 'react';

import colorSet from '../src/comp/colors';

import Icon from 'react-native-vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient';

import ImportantComplaint from '../src/comp/ImportantComplaint';
import PumpSchedule from '../src/comp/PumpSchedule';
import BillInfo from '../src/comp/BillInfo';


export default function Home({ navigation }) {

  const user = useSelector(state => state.userReducer)

  const [resComp, setResComp] = useState(0);
  const [unResComp, setUnResComp] = useState(0);

  const langState = useSelector(state => state.languageReducer)
  const [langIsEnglish, setLangIsEnglish] = useState(langState.isEnglish)

  // console.log(navigation)

  useEffect(() => {
    changeLanguage();
    getCompCount();
  }, [langState.isEnglish]);

  const changeLanguage = () => {
    setLangIsEnglish(!langState.isEnglish)
  }

  const getCompCount =  async () => {
        const data = await fetch(`http://${ip}:5000/complaint-unresolved-count/${user.id}`)
        const res = await data.json();
        if (res.length == 0) {
          console.log('Error')
          return
        } else {
          setUnResComp(res[0].count)
        }

        const data2 = await fetch(`http://${ip}:5000/complaint-resolved-count/${user.id}`)
        const res2 = await data2.json();
        if (res2.length == 0) {
          console.log('Login Failed! Enter Correct Credentials')
          return
        } else {
          setResComp(res2[0].count)
        }
  }

  return (
    <ScrollView>
      <View style={styles.container}>

        {/* <ImportantComplaint /> */}


        <View style={styles.compInfo}>

          <View style={styles.compContainUnRes}>
            <Text style={styles.compNum}>{unResComp}</Text>
            {langIsEnglish ? <Text>Unresolved complaints</Text> : <Text>غیر حل شدہ شکایات</Text>}
          </View>

          <View style={styles.compContainRes}>
            <Text style={styles.compNum}>{resComp}</Text>
            {langIsEnglish ? <Text>Resolved Complaints</Text> : <Text>حل شدہ شکایات</Text>}
          </View>

        </View>

        <View style={styles.userOptions}>
          <TouchableNativeFeedback onPress={() => navigation.push('NewComp')}>
            <View style={styles.option}>
              <LinearGradient colors={[colorSet.secondaryGrad, colorSet.primary]} style={{ width: '100%', height: 150 }}>
                <Icon.Button style={styles.sign} name="add" size={50} color='#FFFFFF' backgroundColor='transparent' width='70%' ></Icon.Button>
                {langIsEnglish ? <Text style={styles.signText}>New Complaint</Text> : <Text style={styles.signText}>نئی شکایت</Text>}
              </LinearGradient>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => navigation.push('ComplaintQuickView')}>
            <View style={styles.option}>
              <LinearGradient colors={[colorSet.primary, colorSet.secondary]} style={{ width: '100%', height: 150 }}>
                <Icon.Button style={styles.sign} name="document" size={50} color='#FFFFFF' backgroundColor='transparent' width='100%' ></Icon.Button>
                {langIsEnglish ? <Text style={styles.signText}>Previous complaints</Text> : <Text style={styles.signText}>پچھلی شکایات </Text>}
              </LinearGradient>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => navigation.push('PumpInfoSimple')}>
            <View style={styles.option}>
              <LinearGradient colors={[colorSet.primary, colorSet.secondary]} style={{ width: '100%', height: 150 }}>
                <Icon.Button style={styles.sign} name="document" size={50} color='#FFFFFF' backgroundColor='transparent' width='100%' ></Icon.Button>
                {langIsEnglish ? <Text style={styles.signText}>Pump Info</Text> : <Text style={styles.signText}>پمپ معلومات </Text>}
              </LinearGradient>
            </View>
          </TouchableNativeFeedback>

          
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorSet.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },

  userInput: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
    paddingVertical: 5,
    width: '80%',
    marginBottom: 20
  },

  btdn: {
    marginVertical: 10,
    width: '80%'
  },
  option: {
    backgroundColor: '#000000',
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    marginVertical: 15,
    maxWidth: '28%',
    overflow: 'hidden'

  },
  sign: {
    marginLeft: 30,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  signText: {
    fontSize: 16,
    color: '#FFFFFF',
    padding: 10
  },
  compInfo: {
    flexDirection: 'row',
    marginBottom: 40
  },
  compNum: {
    fontSize: 50,
    fontWeight: 'bold'
  },
  compContainRes: {
    flex: 1,
    backgroundColor: '#87EE78',
    padding: 10
  },
  compContainUnRes: {
    flex: 1,
    backgroundColor: colorSet.compNormal,
    padding: 10
  },
  userOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: '#000',
    width: '100%'
  }
});
