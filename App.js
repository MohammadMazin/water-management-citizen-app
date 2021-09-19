import React from 'react';
import { StyleSheet, Text, View, TextInput,Button,Switch } from 'react-native';

import { createDrawerNavigator, DrawerItem,DrawerItemList ,DrawerContentScrollView,   } from '@react-navigation/drawer';


import Navigation from './src/comp/Navigation';

import { createStore } from 'redux';
import allReducers from './src/reducers/'
import {Provider} from 'react-redux'

let store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const Drawer = createDrawerNavigator();

export default function App() {

  const state = store.getState()


  return (
    <Provider store={store}> 
      <Navigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  userInput:{
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
    paddingVertical: 5,
    width: '80%',
    marginBottom: 20
  },

  users:{
    flexDirection: 'row',
    width: '80%',
    marginVertical: 20,
    justifyContent: 'space-between'
  },
});
