import React, {useState, useEffect, useContext} from 'react'
import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { DataContext } from '../context/DataContext'
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router'

const renderSeparator = () => {
    return(
        <View style={{
            backgroundColor:'grey',
            height: 0.5,
        }}>
        </View>
    )
}

const DATA = [
    {
        title: '100% Whole Wheat Sandwich Bread',
        calories: '262',
        link: '5885'
    },
    {
        title: 'Gross DFAC Food',
        calories: '100',
        link: '1860'
    }
]

const setColor = (item) =>{
    var color = ''
    if (!(item.color)){
        color = "#555656"
    }
    else if (item.color === 'yellow'){
        color = "#F9DD4E"
    }
    else if(item.color === 'green'){
        color = "#60B158"
    }
    else{
        color = "#DB3830"
    }
    return color
}

const List = () => {
    const navigation = useNavigation();
    const { macros, recipes} = useContext(DataContext)
    useEffect(()=>{
    },[])
        const Item = ({item, style}) => {  
            const color = setColor(item)
            const renderMacros = () => {
                navigation.navigate("macros", {item: item})
            }
            return(
            <TouchableOpacity style={[styles.listItem, style]}
            onPress = {() => renderMacros()}
            activeOpacity={0.7}>
                <View style={{backgroundColor: color, paddingLeft: 10, paddingRight: 10,
                borderRadius: 15}}>
                </View>
                <View style={{justifyContent: 'space-between', paddingLeft: 5}}>
                    <Text style={styles.listText1}>{item.title}</Text>
                    <Text style={styles.listText2}>Calories: {item.calories}</Text>
                </View>
            </TouchableOpacity>
            )
        }   
    return(
        <FlatList
            data = {recipes}
            renderItem ={({item}) => <Item item={item} style={{}}></Item>}
            keyExtractor = {item => item.link}
            //ItemSeparatorComponent={renderSeparator}
        >
        </FlatList>
    )
}
export default List;

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        shadowColor: 'grey',
        shadowOpacity: 0.4,
        shadowOffset: 1,
        shadowRadius: 0.5,
        marginTop: 5,
        marginBottom: 5,
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 5,
        paddingTop: 5,
        paddingBottom: 5,
        height: 80,
        elevation: 1
    },
    listText1: {
        fontSize: 15,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        paddingRight: 5
    },
    listText2:{
        fontSize: 15,
        alignSelf: 'flex-end',
        paddingRight: 10
    }
})