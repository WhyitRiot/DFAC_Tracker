import React, {useEffect, useContext, useState} from 'react'
import {Text, View, ScrollView, ActivityIndicator, TouchableOpacity, Alert, Dimensions, DeviceEventEmitter} from 'react-native'
import {useRoute} from '@react-navigation/native'
import { DataContext } from '../context/DataContext'
import { useNavigation } from 'expo-router'
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather, Octicons, AntDesign } from '@expo/vector-icons';

const logmacros = () =>{
    const [colorCode, setColorCode] = useState('#fff')
    const [colorCodeText, setColorCodeText] = useState(['EAT IN MODERATION', 'This food is not served often.'])
    const [colorCodeIcon, setColorCodeIcon] = useState(<AntDesign name="questioncircleo" size={24} color="black" />)
    const [isLoading, setIsLoading] = useState(true)
    const route = useRoute();
    const navigation = useNavigation();
    const {macros, recipe, findMacroSingle, resetMacros, delLoggedRecipe} = useContext(DataContext)
    const { item, servingCount, refreshLog } = route.params;

    useEffect(()=>{
        findMacroSingle(item.link)
        navigation.setOptions({title: item.title})
    },[item.link])

    useEffect(() => {
        setColorCode(setColor(item));
        setColorCodeText(setText(item))
        setColorCodeIcon(setIcon(item))
        setIsLoading(false)
    }, [item.color]);

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

    const setText = (item) =>{
        var text = ['EAT IN MODERATION', 'This food is not served often']
        if (!(item.color)){
            return text
        }
        if (item.color === 'green'){
            text = ['EAT OFTEN', 'This is a high-performance food']
        }
        else if (item.color === 'yellow'){
            text = ['EAT OCCASIONALLY', 'This is a moderate-performance food']
        }
        else{
            text = ['EAT RARELY', 'This is a low-performance food']
        }
        return text;
    }

    const setIcon = (item) =>{
        var greenIcon = <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={24} color="black" />
        var yellowIcon = <Feather name="alert-triangle" size={24} color="black" />
        var redIcon = <Octicons name="stop" size={24} color="black" />
        var noIcon = <AntDesign name="questioncircleo" size={24} color="black" />

        if(!item.color){
            return noIcon
        }
        if(item.color === 'green'){
            return greenIcon
        }
        if(item.color === 'yellow'){
            return yellowIcon
        }
        if(item.color === 'red'){
            return redIcon
        }
    }

    const parseMacro = (value, type) => {
        formatter = new Intl.NumberFormat("en-US", {maximumFractionDigits: 3})
        if (value){
            value = value * servingCount
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

    function handleLog(id) {
        const now = new Date();
        const today = (new Date(now.getFullYear(), now.getMonth(), now.getDate())).getTime()
        const tomorrow = (new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)).getTime()
        delLoggedRecipe(id)
        DeviceEventEmitter.emit("event.refreshLog")
        Alert.alert('Recipe Removed', 'Removed ' +`${item.title}` + ' servings')
        navigation.goBack()
    }

    const LogButton = ({style}) => {
        return(
            <View style={style}>
                <TouchableOpacity onPress={() => handleLog(item.id)}>
                    <View style={{flexDirection:'row', alignSelf:'center', justifyContent:'space-evenly', padding: 2}}>
                        <Text style={{color:'red', fontSize: 22}}>Remove</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    
    const NutritionHeader = () => (
        <View style={{flexDirection:'row', paddingLeft: 10, paddingRight: 10, alignContent: 'center', justifyContent: 'space-between'}}>
            <View style={{alignSelf: 'center'}}>
                <Text style={{color:"#000", fontSize: 24, fontWeight: 'bold'}}>Nutritional Data</Text>
            </View>
            <View style={{flexDirection: 'column', alignContent: 'center', justifyContent: 'center'}}>
                <LogButton style={{alignSelf: 'center', paddingTop: 5}}/>
            </View>
        </View>
    );
      

    return(
            <>{ (macros[0] && !isLoading) ?
            <ScrollView keyboardDismissMode='on-drag'>
                <View style={{paddingLeft: 5, paddingRight: 5, elevation: 1}}>
                    <View style={{backgroundColor: colorCode, marginTop: 15, borderWidth: 1, borderRadius: 10, padding: 5, paddingTop: 5, paddingBottom: 5, justifyContent: 'space-between'}}>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                            {colorCodeIcon}
                            <Text style={{fontWeight: 'bold', fontSize: 20, paddingBottom: 5}}>
                                {colorCodeText[0].toUpperCase()}
                            </Text>
                        </View>
                        <Text style={{fontWeight: 'bold', alignSelf:'flex-end'}}>
                            {colorCodeText[1].toUpperCase()}
                        </Text>
                    </View>
                </View>
                <TableView appearance="light" style={{paddingTop: 10}}>
                    <Section headerComponent={<NutritionHeader />}>
                    </Section>
                    <Section header={
                        <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', width:Dimensions.get('window').width - 30}}>
                            <Text style={{ fontSize: 18, fontWeight: 'normal', flexWrap: 'wrap', flexShrink: 0.5}}>
                                Serving Size: <Text style={{ fontWeight: 'bold' }}>{macros[0].portion}</Text>
                            </Text>
                        </View>} headerTextColor="#000" headerTextStyle={{fontSize: 18, fontWeight: 'bold'}}>
                        <Cell cellStyle='RightDetail' title="Calories:" detail={parseMacro(macros[0].calories, 1)} rightDetailColor="#000"/>
                        <Cell cellStyle='RightDetail' title="Protein:" detail={parseMacro(macros[0].protein, 0)} rightDetailColor="#000"/>
                        <Cell cellStyle='RightDetail' title="Fat:" detail={parseMacro(macros[0].fat, 0)} rightDetailColor="#000"/>
                        <Cell cellStyle='RightDetail' title="Carbohydrates:" detail={parseMacro(macros[0].carbs, 0)} rightDetailColor="#000"/>
                    </Section>
                    <Section header="Additional Nutrition" headerTextStyle={{fontSize: 18}} headerTextColor="#000">
                        <Cell cellStyle='RightDetail' title="Sugars:" detail={parseMacro(macros[0].sugars, 0)} rightDetailColor="#000" />
                        <Cell cellStyle='RightDetail' title="Saturated Fat:" detail={parseMacro(macros[0].satfat, 0)} rightDetailColor="#000" />
                        <Cell cellStyle='RightDetail' title="Fiber:" detail={parseMacro(macros[0].fiber, 0)} rightDetailColor="#000" />
                        <Cell cellStyle='RightDetail' title="Sodium:" detail={parseMacro(macros[0].sodium, 0)} rightDetailColor='#000'/>
                        <Cell cellStyle='RightDetail' title="Calcium:" detail={parseMacro(macros[0].calcium, 0)} rightDetailColor='#000'/>
                    </Section>
                </TableView> 
            </ScrollView>
            : <ActivityIndicator style={{alignSelf:'center'}}/>}</>
    )
}
export default logmacros;