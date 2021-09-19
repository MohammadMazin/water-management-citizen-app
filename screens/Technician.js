import React from 'react';

import { StyleSheet, Text, View, Button, TouchableNativeFeedback, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';


import { useState, useEffect } from 'react';

import Icon from 'react-native-vector-icons/Ionicons'

import { LinearGradient } from 'expo-linear-gradient';
import colorSet from '../src/comp/colors';

import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';
import { useWindowDimensions } from 'react-native';

import Complaint from './Complaint';
import PumpSchedule from '../src/comp/PumpSchedule';
import BillInfo from '../src/comp/BillInfo';
import ImportantComplaint from '../src/comp/ImportantComplaint';

import { Camera } from 'expo-camera';

export default function Technician({ navigation }) {

  const window = useWindowDimensions();

  const langState = useSelector(state => state.languageReducer)
  const [langIsEnglish, setLangIsEnglish] = useState(langState.isEnglish)
  const [hasLoaded, setHasLoaded] = useState(false)

  const [location, setLocation] = useState(null);

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    changeLanguage();
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, [langState.isEnglish]);

  const changeLanguage = () => {
    setLangIsEnglish(!langState.isEnglish)
  }

  // if(!hasLoaded){
  //   return(
  //     <Text>Loading...</Text>
  //   )
  // }
  return (
    <View style={styles.container}>

      <ScrollView style={{ width: '100%', }}>
        <View style={styles.container}>

          {/* <Button title="Mark Attendance" onPress={() => navigation.push('Attendance')} />
            <ImportantComplaint /> */}


          <View style={styles.userOptions}>
            <TouchableNativeFeedback onPress={() => navigation.push('NewComp')}>
              <View style={styles.option}>
                <LinearGradient colors={[colorSet.secondaryGrad, colorSet.primary]} style={{ width: '100%' }}>
                  <Icon.Button style={styles.sign} name="add" size={50} color='#FFFFFF' backgroundColor='transparent' width='70%' ></Icon.Button>
                  {langIsEnglish ? <Text style={styles.signText}>New Complaint</Text> : <Text style={styles.signText}>نئی شکایت</Text>}
                </LinearGradient>
              </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback onPress={() => navigation.push('ComplaintQuickView')}>
              <View style={styles.option}>
                <LinearGradient colors={[colorSet.secondaryGrad, colorSet.primary]} style={{ width: '100%' }}>
                  <Icon.Button style={styles.sign} name="document" size={50} color='#FFFFFF' backgroundColor='transparent' width={100} ></Icon.Button>
                  {langIsEnglish ? <Text style={styles.signText}>Previous complaints</Text> : <Text style={styles.signText}>پچھلی شکایات </Text>}
                </LinearGradient>
              </View>
            </TouchableNativeFeedback>

          </View>

          <View style={styles.userOptions}>

            
          <TouchableNativeFeedback onPress={() => navigation.push('Jobs')}>
              <View style={styles.option}>
                <LinearGradient colors={[colorSet.primary, colorSet.secondary]} style={{ width: '100%', }}>
                  <Icon.Button style={styles.sign} name="briefcase" size={50} color='#FFFFFF' backgroundColor='transparent' width='100%' ></Icon.Button>
                  {langIsEnglish ? <Text style={styles.signText}>Scheduled Jobs</Text> : <Text style={styles.signText}>مقررہ ملازمتیں </Text>}
                </LinearGradient>
              </View>
            </TouchableNativeFeedback>
            

          <TouchableNativeFeedback onPress={() => navigation.push('PumpInfoSimple')}>
            <View style={styles.option}>
              <LinearGradient colors={[colorSet.primary, colorSet.secondary]} style={{ width: '100%'}}>
                <Icon.Button style={styles.sign} name="document" size={50} color='#FFFFFF' backgroundColor='transparent' width='100%' ></Icon.Button>
                {langIsEnglish ? <Text style={styles.signText}>Pump Info</Text> : <Text style={styles.signText}>پمپ معلومات </Text>}
              </LinearGradient>
            </View>
          </TouchableNativeFeedback>

          </View>


          {/* <PumpSchedule />
          <BillInfo /> */}

        </View>
      </ScrollView>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',

  },
  userOptions: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: '#000',
    width: '100%'
  },
  btdn: {
    marginVertical: 10,
    width: '80%'
  },
  option: {
    backgroundColor: '#4A8BEB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    width: '45%',
    minWidth: '35%',
    overflow: 'hidden'
  },
  sign: {
    marginLeft: 30,
    textAlign: 'center'
  },
  signText: {
    fontSize: 18,
    color: '#FFFFFF',
    padding: 10
  },
  compInfo: {
    flexDirection: 'row'
  },
  compNum: {
    fontSize: 50,
    fontWeight: 'bold'
  },
  compContainRes: {
    margin: 20,
    elevation: 20,
    borderRadius: 15,
    borderColor: '#6EE06E',
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    padding: 10
  },
  compContainUnRes: {
    margin: 20,
    elevation: 5,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderColor: '#F2AF11',
    borderWidth: 3,
    padding: 10
  },

});
