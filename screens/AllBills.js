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
import ip from '../ip';
import { setStatusBarBackgroundColor } from 'expo-status-bar';


export default function AllBills({ navigation }) {

  const [resComp, setResComp] = useState(0);
  const [unResComp, setUnResComp] = useState(0);

  const langState = useSelector(state => state.languageReducer)
  const user = useSelector(state => state.userReducer)
  const [langIsEnglish, setLangIsEnglish] = useState(langState.isEnglish)

  const [bills, setBills] = useState()
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    changeLanguage();
   
    getBills();

  }, [langState.isEnglish]);

  const changeLanguage = () => {
    setLangIsEnglish(!langState.isEnglish)
  }

  const getBills = async () => {
    console.log(user.id)
    const data = await fetch(`http://${ip}:5000/station-info/bill/${user.id}`)
    const res = await data.json();
    setBills(res)
    setHasLoaded(true)
}

  if(!hasLoaded){
    return(
        <Text>Loading</Text>
    )
  }

  return (
    <ScrollView>


      <View style={styles.container}>


        {bills.map((bill) => {
          return (
            <BillInfo id={bill.bill_id} month={bill.month} year={bill.year} amount={bill.amount} consumer={bill.worker_id} status={bill.status} />
          )
        })
        }
{/* 
        <BillInfo />
        <BillInfo />
        <BillInfo />
        <BillInfo /> */}




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
