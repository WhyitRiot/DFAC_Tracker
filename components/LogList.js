import React, {useState, useEffect, useContext, Component} from 'react'
import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { DataContext } from '../context/DataContext'
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router'

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


const LogList = ({logData, refreshLog}) => {
    const navigation = useNavigation();
        const Item = ({item, style}) => {  
            formatter = new Intl.NumberFormat("en-US", {maximumFractionDigits: 2})
            if (!item.calories){
                item.calories = 'varies'
            }
            const color = setColor(item)
            const renderMacros = () => {
                navigation.navigate("logmacros", {item: item, servingCount: item.servings, refreshLog: refreshLog})
            }
            return(
            <>
            <TouchableOpacity style={[styles.listItem, style]}
            onPress = {() => renderMacros()}
            activeOpacity={0.7}>
                <View style={{backgroundColor: color, paddingLeft: 10, paddingRight: 10,
                borderRadius: 15}}>
                </View>
                <View style={styles.listItemContentContainer}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <View style={styles.itemTextContainer}>
                        <View style={styles.caloriesContainer}>
                            <Text style={styles.servingsTitle}>Servings: </Text>
                            <Text style={styles.servingsText}>{item['servings']}</Text>
                        </View>
                        <View style={styles.servingsContainer}>
                            <Text style={styles.caloriesTitle}>Calories: </Text>
                            <Text style={styles.caloriesText}>{String(formatter.format(item['calories'] * item['servings'])).padStart(3, ' ')}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            </>
            )
        }   
    return(
        <>{logData[0] ?      
        <FlatList
        data = {logData}
        renderItem ={({item}) => <Item item={item} style={{}}></Item>}
        keyExtractor = {item => item.id}
        >
        </FlatList>

        : <Text style={{fontSize: 25, alignSelf: 'center'}}>Nothing logged!</Text>}</>
    )
}
export default LogList;

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
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
    listItemContentContainer:{
        justifyContent: 'space-between', 
        paddingLeft: 10, 
        flexGrow: 1,
        flexShrink: 2
    },
    itemTextContainer:{
        alignSelf: 'flex-end',
        width: 100
    },
    titleText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        paddingRight: 5
    },
    caloriesContainer:{
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    servingsContainer:{
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    caloriesTitle:{
        fontSize: 12,
        alignSelf: 'flex-start'
    },
    servingsTitle:{
        fontSize: 12,
        fontWeight: 'bold',
        paddingRight: 10
    },
    caloriesText:{
        fontSize: 12,
        alignSelf: 'flex-end'
    },
    servingsText:{
        fontSize: 12,
        fontWeight: 'bold',
        alignSelf: 'flex-end'
    }
})