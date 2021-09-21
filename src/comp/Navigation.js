import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Switch } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerItem, DrawerItemList, DrawerContentScrollView, } from '@react-navigation/drawer';

import Login from '../../screens/Login';
import SignUp from '../../screens/SignUp';
import ForgotPass from '../../screens/ForgotPass';
import Home from '../../screens/Home';
import Worker from '../../screens/Worker';
import Technician from '../../screens/Technician';
import NewComp from '../../screens/NewComp';
import PrevComp from '../../screens/PrevComp';
import ComplaintInfo from '../../screens/ComplaintInfo';
import ComplaintQuickView from '../../screens/ComplaintQuickView';
import ScheduledJobs from '../../screens/ScheduledJobs';
import Report from '../../screens/Report';
import AllBills from '../../screens/AllBills';
import PumpQuickView from '../../screens/PumpQuickView';
import PumpInfo from '../../screens/PumpInfo';
import PumpInfoBox from './PumpInfoBox';
import PumpInfoSimple from '../../screens/PumpInfoSimple';
import Attendance from '../../screens/Attendance';


import { createStore } from 'redux';
import allReducers from '../reducers';

import ChangeLanguage from './ChangeLanguage';

import Icon from 'react-native-vector-icons/Ionicons'
import colorSet from '../comp/colors'


let store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())



const Stack = createNativeStackNavigator();

const HomeStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>

      <Stack.Screen name="Login" component={Login} options={{
        headerShown: false,

      }} />


      {/* ------------------------------------- */}

      <Stack.Screen name="SignUp" component={SignUp} options={{

        headerTitle: '',
        headerTintColor: '#FFFFFF',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: colorSet.primary,
        }
      }} />


      {/* ------------------------------------- */}

      <Stack.Screen name="ForgotPassword" component={ForgotPass} options={{

        headerTitle: '',
        headerTintColor: '#FFFFFF',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: colorSet.primary,
        }
      }} />


      {/* ------------------------------------- */}


      <Stack.Screen name="Home" component={Home}
        options={{
          headerStyle: {
            backgroundColor: colorSet.primary,

          },
          headerLeft: () => {
            return <Icon.Button name="ios-menu" size={25} backgroundColor='#0099387' onPress={() => navigation.openDrawer()}></Icon.Button>
          },
          headerTintColor: '#fff',
        }} />

      {/* ------------------------------------- */}

      <Stack.Screen name="Worker" component={Worker}
        options={{
          headerStyle: {
            backgroundColor: colorSet.primary,

          },
          headerLeft: () => {
            return <Icon.Button name="ios-menu" size={25} backgroundColor='#0099387' onPress={() => navigation.openDrawer()}></Icon.Button>
          },
          headerTintColor: '#fff',
        }} />

      {/* ------------------------------------- */}

      <Stack.Screen name="Technician" component={Technician}
        options={{
          headerStyle: {
            backgroundColor: colorSet.primary,

          },
          headerLeft: () => {
            return <Icon.Button name="ios-menu" size={25} backgroundColor='#0099387' onPress={() => navigation.openDrawer()}></Icon.Button>
          },
          headerTintColor: '#fff',
        }} />

      {/* ------------------------------------- */}

      <Stack.Screen name="Attendance" component={Attendance}
        options={{
          headerShown: false,
        }} />

      {/* ------------------------------------- */}

      <Stack.Screen name="ComplaintQuickView" component={ComplaintQuickView} options={{
        title: 'List Of Complaints',

        headerStyle: {
          backgroundColor: colorSet.primary,
        },
        headerLeft: () => {
          return <Icon.Button name="arrow-back" size={25} backgroundColor='#0099387' onPress={() => navigation.goBack()}></Icon.Button>
        },
        headerTintColor: '#fff',

      }} />

      {/* ------------------------------------- */}

      <Stack.Screen name="AllBills" component={AllBills} options={{
        title: 'Billing Info',

        headerStyle: {
          backgroundColor: colorSet.primary,
        },
        headerLeft: () => {
          return <Icon.Button name="arrow-back" size={25} backgroundColor='#0099387' onPress={() => navigation.goBack()}></Icon.Button>
        },
        headerTintColor: '#fff',

      }} />

      {/* ------------------------------------- */}

      <Stack.Screen name="PumpInfo" component={PumpInfo} options={{
        title: 'Pump Access',

        headerStyle: {
          backgroundColor: colorSet.primary,
        },
        headerLeft: () => {
          return <Icon.Button name="arrow-back" size={25} backgroundColor='#0099387' onPress={() => navigation.goBack()}></Icon.Button>
        },
        headerTintColor: '#fff',

      }} />

      {/* ------------------------------------- */}

      <Stack.Screen name="PumpInfoBox" component={PumpInfoBox} options={{
        title: 'Pump Access',

        headerStyle: {
          backgroundColor: colorSet.primary,
        },
        headerLeft: () => {
          return <Icon.Button name="arrow-back" size={25} backgroundColor='#0099387' onPress={() => navigation.goBack()}></Icon.Button>
        },
        headerTintColor: '#fff',

      }} />

      {/* ------------------------------------- */}

      <Stack.Screen name="PumpQuickView" component={PumpQuickView} options={{
        title: 'List Of Pumps',

        headerStyle: {
          backgroundColor: colorSet.primary,
        },
        headerLeft: () => {
          return <Icon.Button name="arrow-back" size={25} backgroundColor='#0099387' onPress={() => navigation.goBack()}></Icon.Button>
        },
        headerTintColor: '#fff',

      }} />

      {/* ------------------------------------- */}

      <Stack.Screen name="PumpInfoSimple" component={PumpInfoSimple} options={{
        title: 'Pump Info',

        headerStyle: {
          backgroundColor: colorSet.primary,
        },
        headerLeft: () => {
          return <Icon.Button name="arrow-back" size={25} backgroundColor='#0099387' onPress={() => navigation.goBack()}></Icon.Button>
        },
        headerTintColor: '#fff',

      }} />

      {/* ------------------------------------- */}

      {/* ------------------------------------- */}

      <Stack.Screen name="NewComp" component={NewComp} options={{
        title: 'New Complaint',
        headerStyle: {
          backgroundColor: colorSet.primary,
        },
        headerLeft: () => {
          return <Icon.Button name="arrow-back" size={25} backgroundColor='#0099387' onPress={() => navigation.goBack()}></Icon.Button>
        },
        headerTintColor: '#fff',

      }} />

      {/* ------------------------------------- */}

      <Stack.Screen name="PrevComp" component={PrevComp} options={{
        title: 'Previous Complaints',
        headerStyle: {
          backgroundColor: colorSet.primary,

        },
        headerLeft: () => {
          return <Icon.Button name="arrow-back" size={25} backgroundColor='#0099387' onPress={() => navigation.goBack()}></Icon.Button>
        },
        headerTintColor: '#fff',
        headerTitle: 'Previous Complaints'
      }} />

      {/* ------------------------------------- */}

      <Stack.Screen name="Jobs" component={ScheduledJobs} options={{
        title: 'Scheduled Jobs',
        headerStyle: {
          backgroundColor: colorSet.primary,

        },
        headerLeft: () => {
          return <Icon.Button name="arrow-back" size={25} backgroundColor='#0099387' onPress={() => navigation.goBack()}></Icon.Button>
        },
        headerTintColor: '#fff',
        headerTitle: 'Previous Complaints'
      }} />

      {/* ------------------------------------- */}

      <Stack.Screen name="ComplaintInfo" component={ComplaintInfo} options={{
        title: 'Complaint Info',

        headerStyle: {
          backgroundColor: colorSet.primary,
          headerTitle: 'Complaint Info'

        },
        headerLeft: () => {
          return <Icon.Button name="arrow-back" size={25} backgroundColor='#0099387' onPress={() => navigation.goBack()}></Icon.Button>
        },
        headerTintColor: '#fff',

      }} />

      {/* ------------------------------------- */}

      <Stack.Screen name="Report" component={Report} options={{
        title: 'Complaint Completion Report',
        headerStyle: {
          backgroundColor: colorSet.primary,
          headerTitle: 'Report'

        },
        headerLeft: () => {
          return <Icon.Button name="arrow-back" size={25} backgroundColor='#0099387' onPress={() => navigation.goBack()}></Icon.Button>
        },
        headerTintColor: '#fff',

      }} />


      {/* ------------------------------------- */}

      <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />




    </Stack.Navigator>



  )
}


const Drawer = createDrawerNavigator();

export default function Navigation() {

  return (

    <NavigationContainer>
      <Drawer.Navigator drawerStyle={{
        backgroundColor: colorSet.secondary,

      }} initialRouteName="HomeDrawer" drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <ChangeLanguage {...props} />
            {/* <DrawerItemList {...props} /> */}
          </DrawerContentScrollView>
        )
      }}>
        <Drawer.Screen name="HomeDrawer" component={HomeStackScreen} />
        <Drawer.Screen name="Logout" component={ChangeLanguage} />
      </Drawer.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

  users: {
    flexDirection: 'row',
    width: '80%',
    marginVertical: 20,
    justifyContent: 'space-between'
  },
});
