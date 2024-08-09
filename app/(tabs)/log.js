import React, {useContext, useState, useEffect, useRef} from 'react'
import {Text, View, StyleSheet, ScrollView, DeviceEventEmitter, TouchableOpacity, Dimensions} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { DataContext } from '../../context/DataContext';
import { useNavigation } from 'expo-router'
import {Animated} from 'react-native-reanimated'
import AntDesign from '@expo/vector-icons/AntDesign';
import LogList from '../../components/LogList'
import LogItem from '../../components/LogItem'

const log = () => {
    const today = (new Date(now.getFullYear(), now.getMonth(), now.getDate())).getTime()
    const tomorrow = (new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)).getTime()
    const [currDate, setCurrDate] = useState([today, tomorrow])
    const { logData, logDataYest, logDataTom, refreshLog } = useContext(DataContext)
    const isFocused = useNavigation().isFocused()
    const scrollX = useRef(new Animated.Value(0)).current
    DeviceEventEmitter.addListener("event.refreshLog", () => refreshLog(currDate[0], currDate[1]));

    useEffect(()=>{
        DeviceEventEmitter.removeAllListeners("event.refreshLog")
    },[])

    useEffect(()=>{
        refreshLog(currDate[0], currDate[1])
    },[isFocused])

    useEffect(()=>{
        refreshLog(currDate[0], currDate[1])
    },[currDate])

    useEffect(()=>{
        console.log(scrollX)
    },[scrollX])


    const increaseDate = () => {
        var newDateLower = currDate[0] + 86400000
        var newDateUpper = currDate[1] + 86400000
        setCurrDate([newDateLower, newDateUpper])
    }

    const decreaseDate = () => {
        var newDateLower = currDate[0] - 86400000
        var newDateUpper = currDate[1] - 86400000
        setCurrDate([newDateLower, newDateUpper])
    }

    const changeDate = () => {
        if (currDate[0] === today){
            return "Today"
        }
        if (currDate[0] === today - 86400000){
            return "Yesterday"
        }
        if (currDate[0] === today + 86400000){
            return "Tomorrow"
        }
        return (new Date(currDate[0]).toLocaleDateString("en-US"))
    }

    const handleScroll = (event) =>{
        console.log(event.nativeEvent.contentOffset.x)
    }

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar style='dark'/>
            <View style={styles.titleContainer}>
                <TouchableOpacity style={styles.leftArrow}
                    onPress={() => decreaseDate()}>
                        <AntDesign name="arrowleft" size={30} color="black" />
                </TouchableOpacity>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{changeDate()}</Text>
                </View>
                <TouchableOpacity style={styles.rightArrow}
                    onPress={() => increaseDate()}>
                        <AntDesign name="arrowright" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={
                Animated.event(
                    [
                        { nativeEvent: 
                            { contentOffset: 
                                { x: scrollX } 
                                } 
                        }
                    ], {useNativeDriver: true},
                {listener: (event) => handleScroll(event)})}
            scrollEventThrottle={16}
            style={{flex: 1}}
            >
                <LogItem logData={logDataYest} style={{width: Dimensions.get('window').width}} />
                <LogItem logData={logData} style={{width: Dimensions.get('window').width}}/>
                <LogItem logData={logDataTom} style={{width: Dimensions.get('window').width}} />
            </ScrollView>
            
        </SafeAreaView>        
    )
}
export default log

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    titleContainer:{
        paddingVertical: 10,
        flexDirection:'row',
        alignSelf: 'stretch',
        alignContent: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.5
    },
    title: {
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: 200
    },
    titleText:{
        alignSelf: 'center',
        fontSize: 25,
        fontWeight: 'bold'
    },
    leftArrow:{    
        alignSelf: 'flex-end'
    },
    rightArrow:{
        alignSelf: 'flex-end'
    },
    log: {
        justifyContent: 'center',
        alignSelf: 'stretch',
        flex: 2,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
    },
    table:{
        borderTopWidth: 0.5,
        flex: 4,
    }
})