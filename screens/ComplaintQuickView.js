import React from 'react';

import { StyleSheet, Text, View, Button, TouchableNativeFeedback, ScrollView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';


import { useState, useEffect } from 'react';

import Icon from 'react-native-vector-icons/Ionicons'

import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';
import { useWindowDimensions } from 'react-native';
import colorSet from '../src/comp/colors';

import Complaint from './Complaint';
import SegmentedControl from '@react-native-segmented-control/segmented-control';



export default function ComplaintQuickView({ navigation }) {

  const window = useWindowDimensions();

  const langState = useSelector(state => state.languageReducer)
  const user = useSelector(state => state.userReducer)
  const [langIsEnglish, setLangIsEnglish] = useState(langState.isEnglish)
  const [hasLoaded, setHasLoaded] = useState(false)

  const [location, setLocation] = useState(null);

  const [compList, setCompList] = useState();

  const [segmentIndex, setSegmentIndex] = useState(0)

  useEffect(() => {
    changeLanguage();
    console.log(user.userType)
    getComplaints(user.userType);

  }, [langState.isEnglish, segmentIndex]);

  const changeLanguage = () => {
    setLangIsEnglish(!langState.isEnglish)
  }

  const getComplaints = async (userType) => {

    const data = await fetch(`http://${ip}:5000/complaint-fetch/${userType}/${user.id}&${segmentIndex}`)
    const res = await data.json();
    if (res.length == 0) {
      Alert.alert('Error!', 'No complaints to show')
      setCompList([])
      setHasLoaded(true)
    } else {
      setCompList(res)
      setHasLoaded(true)
      console.log(res)
    }
  }


  const setComplaintStatus = (event) => {
    setSegmentIndex(event.nativeEvent.selectedSegmentIndex);
  }



  if (!hasLoaded) {
    return (
      <Text>Loading...</Text>
    )
  }
  return (
    <View style={styles.container}>

      <ScrollView style={{ width: '100%', padding: 20 }}>
        <View style={styles.container}>

          <SegmentedControl
            values={['In Progress', 'Resolved']}
            selectedIndex={segmentIndex}
            onChange={setComplaintStatus}
            tintColor={colorSet.primary}
            backgroundColor={colorSet.secondary}
            style={{ width: '90%', backgroundColor: '#000', height: 35, marginBottom: 10 }}
          />


          {compList.map((comp) => {

            return (
              <TouchableNativeFeedback onPress={() => navigation.push('ComplaintInfo', { id: comp.compaint_id })}>
                <View>
                  <Complaint date={comp.compaint_date} userId={comp.citizen_id} description={comp.compaint_description} type={comp.complaint_type} address={comp.compaint_location} isUrgent={comp.compaint_priority} />
                </View>
              </TouchableNativeFeedback>
            )
          })
          }




          {/* <TouchableNativeFeedback onPress={()=>navigation.push('ComplaintInfo', {id: 2})}>
      <View>
        <Complaint isUrgent = {false}/>  
      </View>
    </TouchableNativeFeedback>


    <Complaint isUrgent = {true}/> */}

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
    backgroundColor: '#4A8BEB',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    marginVertical: 15
  },
  sign: {
    marginLeft: 30,
    textAlign: 'center'
  },
  signText: {
    fontSize: 18,
    color: '#FFFFFF'
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
  }
});
