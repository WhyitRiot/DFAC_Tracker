import React from 'react'
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import { Entypo } from '@expo/vector-icons'

const ServingCounter = ({setServing, currentServing}) => {

    return(
        <View style={styles.container}>
            <TouchableOpacity 
                style={{justifyContent: 'center', alignContent:'center', paddingHorizontal: 5, borderRadius: 10}}
                onPress={() => {
                        setServing(prev => Math.round(prev + 1))
                }}
                >
                <Entypo name="plus" size={24} color="black" />
            </TouchableOpacity>
                <TextInput
                onEndEditing={(newText) => {
                    const text = newText.nativeEvent.text
                    if (text !== '' && !(isNaN(text))){
                        setServing(parseFloat(text))
                    }
                }}
                keyboardType='numeric'
                placeholder={currentServing ? currentServing.toString() : '1'}
                maxLength={4}
                textAlign={'center'}
                style={{
                    width: 40,
                    fontSize:24,
                    flexShrink: 1,
                    borderLeftWidth: 0.5,
                    borderRightWidth: 0.5
                    }}
                />
            <TouchableOpacity 
                style={{justifyContent: 'center', alignContent:'center', paddingHorizontal: 5, borderRadius: 10}}
                onPress={() => {
                    setServing(prev => Math.round(prev - 1) <= 0 ? 1 : Math.round(prev - 1))
                }}
                >
                <Entypo name="minus" size={24} color = "black" />
            </TouchableOpacity>
        </View>
    )
}
export default ServingCounter;

const styles = StyleSheet.create({
    container: {
        flexDirection:'row', 
        alignSelf:'center', 
        borderWidth: 0.5, 
        borderRadius: 10,
    }
  });