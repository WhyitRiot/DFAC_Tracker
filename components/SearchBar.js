import React, {useState, useEffect} from "react";
import { StyleSheet, Text, TextInput, View, Keyboard, Button, Pressable } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context";

const SearchBar = () => {

    const [showCancel, setCancel] = useState(false)
    const [showClear, setClear] = useState(false)
    const clearInput = () => {
        this.TextInput.clear()
        if (showClear){
            setClear(!showClear)
        }
        Keyboard.dismiss()
    }
    return(
        <View style={styles.container}>
            <TextInput
                ref={input => {this.TextInput = input}}
                style={styles.input}
                placeholder="Search"
                onTouchStart={() => setCancel(!showCancel)}
                onChangeText={() => {
                    if(!showClear){
                        setClear(!showClear)
                    }
                }}
                onBlur={() => {
                    setCancel(!showCancel)
                    if (showClear){
                    setClear(!showClear)
                    }
                    }
                }
            >
            </TextInput>
            {showClear &&
            <Pressable
                style = {styles.clearButton}
                onTouchStart={() => {
                    this.TextInput.clear()
                    setClear(!showClear)
                }}>
                <Entypo name="circle-with-cross" size={14} color="black" />
            </Pressable>}
            {showCancel && 
            <Pressable
                style = {styles.cancelButton}
                onTouchStart={() => clearInput()}>
                <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>}
        </View>

    )
}
export default SearchBar;

const styles = StyleSheet.create({
    container: {
        margin: 15,
        padding: 5,
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexDirection: "row",
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: '#ffff'
    },
    input:{
        flex: 1,
        justifyContent:'flex-end',
        flexDirection: 'row',
        textAlign:'left'
    },
    cancelText:{
        fontSize: 14,
        color: "#6495ed"
    },
    clearButton:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 10,
        paddingLeft: 10
    },
    cancelButton:{
        alignItems: 'center',
        justifyContent: 'center'
    }
});