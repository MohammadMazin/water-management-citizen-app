import React from 'react';

import { StyleSheet, Text, View, Image, Switch, StatusBar, Button, TouchableNativeFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { isEnglish } from '../actions';
import { DrawerActions } from '@react-navigation/native';

import colorSet from './colors';
import Icon from 'react-native-vector-icons/Ionicons'

export default function ChangeLanguage({ navigation }) {

  const user = useSelector(state => state.userReducer)
  const langState = useSelector(state => state.languageReducer)
  const dispatch = useDispatch();

  const [langIsEnglish, setLangIsEnglish] = useState(langState.isEnglish)

  const changeLanguage = () => {
    dispatch(isEnglish(langIsEnglish),)
    setLangIsEnglish(!langState.isEnglish)

  }


  return (
    <View style={styles.container}>

      <StatusBar translucent={true} />



      <View style={styles.userInfo}>
        <Image source={require('./../../assets/user.png')} style={{ height: 100, width: 100 }} />
        <View style={{ paddingVertical: 5, justifyContent: 'center', alignItems: 'center', }}>
          <Text style={{ color: '#ffffff' }}>ID: {user.id}</Text>
          <Text style={{ color: '#ffffff' }}>{user.name}</Text>
          <Text style={{ color: '#ffffff' }}>{user.userType}</Text>
        </View>
      </View>

      <View style={styles.sidebarOptions}>

        <View style={styles.drawerNav}>

          <TouchableNativeFeedback onPress={() => navigation.closeDrawer()}>
            <View style={styles.drawerOptions}>
              <Icon.Button name="person" size={20} color={colorSet.primary} backgroundColor='transparent' width='100%' paddingLeft={25} ></Icon.Button>
              <Text>Profile</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback>
            <View style={styles.drawerOptions}>
              <Icon.Button name="key" size={20} color={colorSet.primary} backgroundColor='transparent' width='100%' paddingLeft={25} ></Icon.Button>
              <Text>Change password</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback>
            <View style={styles.drawerOptions}>
              <Icon.Button name="create" size={20} color={colorSet.primary} backgroundColor='transparent' width='100%' paddingLeft={25} ></Icon.Button>
              <Text>Give us a Review</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback>
            <View style={styles.drawerOptions}>
              <Icon.Button name="call" size={20} color={colorSet.primary} backgroundColor='transparent' width='100%' paddingLeft={25} ></Icon.Button>
              <Text>Contact Us</Text>
            </View>
          </TouchableNativeFeedback>

        </View>

        <Text style={{ borderBottomWidth: 1, borderBottomColor: '#6E6D6C', width: '90%', paddingLeft: 20, fontSize: 15, color: '#6E6D6C' }}>Preferences</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', backgroundColor: '#F0EDE4', paddingVertical: 5, paddingBottom: '85  %' }}>

          <Text>English | Urdu</Text>
          <Switch
            onValueChange={changeLanguage}
            value={langIsEnglish}
            trackColor={{ false: colorSet.primary, true: '#ffffff' }}
          />
        </View>
        <TouchableNativeFeedback onPress={()=>navigation.navigate('Login')} >
          <View style={styles.drawerOptions}>
            <Icon.Button name="log-out" size={20} color={colorSet.primary} backgroundColor='transparent' width='100%' paddingLeft={25} ></Icon.Button>
            <Text>Logout</Text>
          </View>
        </TouchableNativeFeedback>
      </View>


      {/* <Button title="change Language" onPress={changeLanguage} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sidebarOptions: {
    width: '100%',
    backgroundColor: '#F0EDE4',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  drawerNav: {
    width: '100%'
  },
  drawerOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingVertical:8
  },
  userInfo: {
    backgroundColor: colorSet.secondary,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20
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
  }
});
