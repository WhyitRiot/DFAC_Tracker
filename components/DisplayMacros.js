import React, {useEffect, useContext, useState} from 'react'
import {Text, TextInput, View, ScrollView, ActivityIndicator, TouchableOpacity, Alert, Dimensions} from 'react-native'
import { DataContext } from '../context/DataContext'
import { useNavigation } from 'expo-router'
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather, Octicons, AntDesign } from '@expo/vector-icons';

const macros = ({item, servingCounter}) =>{
    const [isLoading, setIsLoading] = useState(true)
    const [servingCount, setServingCount] = useState(1)
    const navigation = useNavigation();
    const {macros, recipe, caloriedata, ingredients, findMacroSingle, resetMacros, logRecipe} = useContext(DataContext)

    useEffect(()=>{
        if (macros[0]){
            setIsLoading(false)
        }
    },[macros])

    const parseMacro = (value) => {
        formatter = new Intl.NumberFormat("en-US", {maximumFractionDigits: 3})
        console.log('This is the value', value)
        if (value){
            value = value * servingCount
            if (value > 1){
                return `${formatter.format(value)}` + ' g'
            }
            if (value < 1){
                return `${formatter.format(value / 0.001)}` + ' mg' 
            }
        }
        else{
            return "varies"
        }
    }

    function handleLog(recipe, macros) {
        logRecipe(recipe[0], servingCount, macros[0])
        Alert.alert('Recipe Logged', 'Logged ' +`${servingCount}` + ' servings')
    }

    const LogButton = ({style}) => {
        return(
            <TouchableOpacity style={style} onPress={() => handleLog(recipe, macros)}>
                <View style={{flexDirection:'row', alignSelf:'center', justifyContent:'space-evenly'}}>
                    <Text style={{color:'#6495ed', fontSize: 20, paddingRight: 5}}>Log Recipe</Text>
                </View>
            </TouchableOpacity>
        )
    }
    
    const NutritionHeader = () => (
        <View style={{flexDirection:'row', paddingLeft: 10, paddingRight: 10, alignContent: 'center', justifyContent: 'space-between'}}>
            <View>
                <Text style={{color:"#000", fontSize: 24, fontWeight: 'bold'}}>Nutritional Data</Text>
            </View>
            <LogButton style={{alignSelf: 'center'}}/>
        </View>
    );
      

    return(
                <TableView appearance="light" style={{}}>
                    <Section headerComponent={<NutritionHeader />}>
                        <Cell cellStyle='RightDetail' title="Calories:" detail={macros[0].calories ? macros[0].calories * servingCount : "varies"} rightDetailColor="#000"/>
                        <Cell cellStyle='RightDetail' title="Protein:" detail={parseMacro(macros[0].protein)} rightDetailColor="#000"/>
                        <Cell cellStyle='RightDetail' title="Fat:" detail={parseMacro(macros[0].fat)} rightDetailColor="#000"/>
                        <Cell cellStyle='RightDetail' title="Carbohydrates:" detail={parseMacro(macros[0].carbs)} rightDetailColor="#000"/>
                    </Section>
                    <Section header="Additional Nutrition" headerTextStyle={{fontSize: 18}} headerTextColor="#000">
                        <Cell cellStyle='RightDetail' title="Sugars:" detail={parseMacro(macros[0].sugars)} rightDetailColor="#000" />
                        <Cell cellStyle='RightDetail' title="Saturated Fat:" detail={parseMacro(macros[0].satfat)} rightDetailColor="#000" />
                        <Cell cellStyle='RightDetail' title="Fiber:" detail={parseMacro(macros[0].fiber)} rightDetailColor="#000" />
                        <Cell cellStyle='RightDetail' title="Sodium:" detail={parseMacro(macros[0].sodium)} rightDetailColor='#000'/>
                        <Cell cellStyle='RightDetail' title="Calcium:" detail={parseMacro(macros[0].calcium)} rightDetailColor='#000'/>
                    </Section>
                </TableView> 
    )
}
export default macros;