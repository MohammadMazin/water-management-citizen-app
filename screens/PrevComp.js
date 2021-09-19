import React from 'react';

import { StyleSheet, Text, View, TextInput,Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

export default function PrevComp({navigation}) {


  return (
    <View style={styles.container}>   
      <Text>Prev Comp</Text>
    </View>
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

  btdn:{
    marginVertical: 10,
    width: '80%'
  }
});
