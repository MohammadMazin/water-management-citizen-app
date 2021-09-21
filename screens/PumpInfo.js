import React from 'react'

import { StyleSheet, Text, View, Button, Alert, TouchableNativeFeedback, ScrollView, Linking } from 'react-native';
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


export default function PumpInfo({ navigation, route }) {

  const window = useWindowDimensions()
  const user = useSelector(state => state.userReducer)
  const { id } = route.params

  const [pumpDetail, setPumpDetail] = useState([{pump_id:0}])
  const [sensorDetail, setSensorDetail] = useState([])
  const [delagted, setDelegated] = useState()

  const [isWorking, setisWorking] = useState()
  const [hasLoaded, setHasLoaded] = useState(false)
  const [hasLoadedSensor, setHasLoadedSensor] = useState(false)
  const [worker, setWorker] = useState()

  useEffect(() => {
    fetchComplaintInfo();
    console.log(id)
    

  }, [])

  const fetchComplaintInfo = async () => {
    const data = await fetch(`http://${ip}:5000/station-info/${user.id}&${id}`)
    const res = await data.json();
    if (res.length == 0) {
      Alert.alert('Error!', 'Failed to retrieve Station Info. Check your internet connectiom')
    } else {
      console.log(res)
      setPumpDetail(res[0])
      // getSensorInfo(res[0].pump_id)


      if (res[0].status == '0')
        setisWorking(false);
      else
        setisWorking(true);
      setHasLoaded(true)
    }
  }

  const pumpSwitch = () => {
    setisWorking(!isWorking)
  }

  const getSensorInfo = async (pumpID) => {
    const data = await fetch(`http://${ip}:5000/station-info/pump/${pumpID}`)
    console.log('here')
    const res = await data.json();
    if (res.length == 0) {
      Alert.alert('Error!', 'Failed to retrieve Sensor Info. Check your internet connection')
    } else {
      console.log(res)
      setSensorDetail(res)
      setHasLoadedSensor(true)
    }

  }


  if (!hasLoaded) {
    return (
      <Text>Loading..</Text>
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


          <View style={styles.id}><Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FFFFFF' }}>Pump ID: {pumpDetail.pump_id}</Text></View>

          <TouchableNativeFeedback onLongPress={() => Linking.openURL(`geo:0,0?q=${pumpDetail.latitude},${pumpDetail.longitude}(Yeet)`)}>
            <View style={{ borderRadius: 20, overflow: 'hidden' }}>
              <MapView style={{ width: window.width / 1.5, height: window.height / 4, }} showsCompass={true}
                toolbarEnabled={true}
                showsUserLocation={true}
                initialRegion={{
                  latitude: pumpDetail.latitude, longitude: pumpDetail.longitude, latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }} >
                <Marker
                  coordinate={{ latitude: pumpDetail.latitude, longitude: pumpDetail.longitude, }}

                />
              </MapView>
            </View>
          </TouchableNativeFeedback>

          {user.userType == 'worker' || user.userType == 'technician' ? <TouchableNativeFeedback style={styles.loginBtn} onPress={pumpSwitch}>
            <View style={styles.btn2}>
              <Text style={styles.btnText2} onPress={pumpSwitch}>{isWorking ? 'Turn Pump On' : 'Turn Pump Off'}</Text>
            </View>
          </TouchableNativeFeedback> : <View style={{ marginVertical: 20 }}></View>}


        </View>

        <View style={styles.dateStatusContainer}>
          <View><Text style={{ fontSize: 30, color: colorSet.white }}>{ }</Text></View>
          <View><Text style={!isWorking ? styles.statusNormal : styles.statusUrgent}>{!isWorking ? 'On' : 'Off'}</Text></View>
        </View>


        <View style={styles.textContainer}>
          <View style={styles.textField}>
            <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
              Assigned Worker ID</Text>
            <Text>{pumpDetail.worker_id}</Text>
          </View>

          <View style={styles.textField}>
            <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
              Assigned Worker Name</Text>
            <Text>{pumpDetail.worker_name}</Text>
          </View>

          <View style={styles.textField}>
            <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
              Pump Start Time</Text>
            <Text>{pumpDetail.start_time}</Text>
          </View>

          <View style={styles.textField}>
            <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
              Pump Stop Time</Text>
            <Text>{pumpDetail.stop_time}</Text>
          </View>

          <View style={styles.textField}>
            <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
              Pump Horsepower</Text>
            <Text>{pumpDetail.pump_horsepower}</Text>
          </View>

          <View style={styles.textField}>
            <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
              Pump Warranty</Text>
            <Text>{pumpDetail.pump_warranty}</Text>
          </View>

          <View style={styles.textField}>
            <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
              Address </Text>
            <Text>{pumpDetail.location}</Text>
          </View>

          <View style={styles.textField}>
            <Text style={{ fontSize: 10, position: 'absolute', top: -10, left: 15, backgroundColor: '#FFFFFF' }}>
              Sensors </Text>

            {hasLoadedSensor ? <View>
              {sensorDetail.map((sensor) => {

                return (
                  <View style={{ flexDirection: 'row', flex: 'space-around' }}>
                    <Text>{sensor.sensor_id}</Text>
                    <Text>{sensor.sensor_name}</Text>
                  </View>
                )
              })
              }

            </View> : null}


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
    backgroundColor: colorSet.green,
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
