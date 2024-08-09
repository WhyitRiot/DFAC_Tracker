import React, {useState, useEffect} from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import LogList from './LogList'


const parseMacro = (value, type) => {
    formatter = new Intl.NumberFormat("en-US", {maximumFractionDigits: 3})
    if (value){
        if (type === 0){
            if (value > 1){
                return `${formatter.format(value)}` + ' g'
            }
            if (value < 1){
                return `${formatter.format(value / 0.001)}` + ' mg' 
            }
        }
        if (type === 1){
            return `${formatter.format(value)}`
        }
    }
    else{
        return "varies"
    }
}

const LogItem = ({logData, style}) => {
    const [macroSum, setMacroSum] = useState([])

    useEffect(()=>{
        sumMacros(logData)
    },[])

    function sumMacros(data){
        formatter = new Intl.NumberFormat("en-US", {maximumFractionDigits: 3})
        var calsum = 0.0
        var carbsum = 0.0
        var sugarssum = 0.0
        var proteinsum = 0.0
        var fatsum = 0.0
        var satfatsum = 0.0
        var sodiumsum = 0.0
        var calciumsum = 0.0
        var fibersum = 0.0
        for (x in data){
            calsum += data[x]['calories'] * data[x]['servings']
            carbsum += data[x]['carbs'] * data[x]['servings']
            sugarssum += data[x]['sugars'] * data[x]['servings']
            proteinsum += data[x]['protein'] * data[x]['servings']
            fatsum += data[x]['fat'] * data[x]['servings']
            satfatsum += data[x]['satfat'] * data[x]['servings']
            sodiumsum += data[x]['sodium'] * data[x]['servings']
            calciumsum += data[x]['calcium'] * data[x]['servings']
            fibersum += data[x]['fiber'] * data[x]['servings']
        }
        var sums = {
            calories: calsum,
            carbs: carbsum,
            sugars: sugarssum,
            protein: proteinsum,
            fat: fatsum,
            satfat: satfatsum,
            sodium: sodiumsum,
            calcium: calciumsum,
            fiber: fibersum
        }
        setMacroSum(sums)
    }
    return(
        <View style={style}>
            <View style={styles.log}>
                <LogList logData={logData} />
            </View>
            { (logData[0]) &&           
                <ScrollView style={styles.table}>
                    <TableView appearance='light'>
                        <Section header={"Nutrition Report: "}>
                            <Cell cellStyle='RightDetail' title="Calories:" detail={parseMacro(macroSum['calories'], 1)} rightDetailColor="#000"/>
                            <Cell cellStyle='RightDetail' title="Protein:" detail={parseMacro(macroSum['protein'], 0)} rightDetailColor="#000"/>
                            <Cell cellStyle='RightDetail' title="Fat:" detail={parseMacro(macroSum['fat'], 0)} rightDetailColor="#000"/>
                            <Cell cellStyle='RightDetail' title="Carbohydrates:" detail={parseMacro(macroSum['carbs'], 0)} rightDetailColor="#000"/>
                        </Section>
                        <Section header="Additional Nutrition" headerTextStyle={{fontSize: 18}} headerTextColor="#000">
                            <Cell cellStyle='RightDetail' title="Sugars:" detail={parseMacro(macroSum['sugars'], 0)} rightDetailColor="#000" />
                            <Cell cellStyle='RightDetail' title="Saturated Fat:" detail={parseMacro(macroSum['satfat'], 0)} rightDetailColor="#000" />
                            <Cell cellStyle='RightDetail' title="Fiber:" detail={parseMacro(macroSum['fiber'], 0)} rightDetailColor="#000" />
                            <Cell cellStyle='RightDetail' title="Sodium:" detail={parseMacro(macroSum['sodium'], 0)} rightDetailColor='#000'/>
                            <Cell cellStyle='RightDetail' title="Calcium:" detail={parseMacro(macroSum['calcium'], 0)} rightDetailColor='#000'/>
                        </Section>
                    </TableView>
                </ScrollView>
            }
        </View>
    )
}
export default LogItem;

const styles = StyleSheet.create({
    table:{
        borderTopWidth: 0.5,
        flex: 4,
    },
    log: {
        justifyContent: 'center',
        alignSelf: 'stretch',
        flex: 2,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
    },
})