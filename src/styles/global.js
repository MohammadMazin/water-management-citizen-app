import { StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";

const window = useWindowDimensions()

 export default globalStyle = StyleSheet.create({
    
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: window.height
 
  });
  