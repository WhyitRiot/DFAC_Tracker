import React, {useState, useEffect, useContext} from "react";
import { StyleSheet, Text, TextInput, View, Keyboard, Button, Pressable } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons"

import { DataContext } from "../context/DataContext";

const SearchBar = () => {
    const { findRecipes } = useContext(DataContext)
    const [showCancel, setCancel] = useState(false)
    const [showClear, setClear] = useState(false)
    const clearInput = () => {
        this.TextInput.clear()
        if (showClear){
            setClear(!showClear)
        }
        findRecipes('')
        Keyboard.dismiss()
    }
    return(
        <View style={styles.container}>
            <TextInput
                ref={input => {this.TextInput = input}}
                style={styles.input}
                placeholder="Search"
                onTouchStart={() => setCancel(!showCancel)}
                onChangeText={newText => {
                    if(!showClear){
                        setClear(!showClear)
                    }
                    findRecipes(newText)
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
                    findRecipes('')
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
        borderWidth: 1.5,
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
        alignSelf: 'center',
        justifyContent: 'center',
        paddingRight: 10,
        paddingLeft: 10
    },
    cancelButton:{
        alignSelf: 'center',
        justifyContent: 'center'
    }
});