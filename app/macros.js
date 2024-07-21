import React, {useEffect, useContext, useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Text, View, ScrollView, ActivityIndicator} from 'react-native'
import {useRoute} from '@react-navigation/native'
import { DataContext } from '../context/DataContext'
import { useNavigation } from 'expo-router'
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const macros = () =>{
    const [colorCode, setColorCode] = useState('#fff')
    const [colorCodeText, setColorCodeText] = useState(['EAT IN MODERATION', 'This food is not served often.'])
    const [colorCodeIcon, setColorCodeIcon] = useState(<AntDesign name="questioncircleo" size={24} color="black" />)
    const [isLoading, setIsLoading] = useState(true)
    const route = useRoute();
    const navigation = useNavigation();
    const {macros, findMacroSingle} = useContext(DataContext)
    const { item } = route.params;

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

    useEffect(()=>{
        navigation.addListener('beforeRemove', (e)=>{
            if (e.data.action.type === 'POP'){
                setIsLoading(true)
                findMacroSingle('')
            }
        })
    },[])

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

    return(
        <SafeAreaView>
            { (macros[0] && !isLoading) ?
            <ScrollView>
                <View style={{paddingLeft: 5, paddingRight: 5, elevation: 1}}>
                    <View style={{backgroundColor: colorCode, borderWidth: 1, borderRadius: 10, padding: 5, paddingTop: 5, paddingBottom: 5, justifyContent: 'space-between'}}>
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
                    <Section header="Nutritional Data" headerTextColor="#000" headerTextStyle={{fontSize: 24, fontWeight: 'bold'}}>
                    </Section>
                    <Section header={<Text style={{ fontSize: 18, fontWeight: 'normal' }}>Serving Size: <Text style={{ fontWeight: 'bold' }}>{macros[0].portion}</Text></Text>} headerTextColor="#000" headerTextStyle={{fontSize: 18, fontWeight: 'bold'}}>
                        <Cell cellStyle='RightDetail' title="Calories:" detail={macros[0].calories} rightDetailColor="#000"/>
                        <Cell cellStyle='RightDetail' title="Protein:" detail={macros[0].protein} rightDetailColor="#000"/>
                        <Cell cellStyle='RightDetail' title="Fat:" detail={macros[0].fat} rightDetailColor="#000"/>
                        <Cell cellStyle='RightDetail' title="Carbohydrates:" detail={macros[0].carbs} rightDetailColor="#000"/>
                    </Section>
                    <Section header="Additional Nutrition" headerTextStyle={{fontSize: 18}} headerTextColor="#000">
                        <Cell cellStyle='RightDetail' title="Sugars:" detail={macros[0].sugars} rightDetailColor="#000" />
                        <Cell cellStyle='RightDetail' title="Saturated Fat:" detail={macros[0].satfat} rightDetailColor="#000" />
                        <Cell cellStyle='RightDetail' title="Fiber:" detail={macros[0].fiber} rightDetailColor="#000" />
                        <Cell cellStyle='RightDetail' title="Sodium:" detail={macros[0].sodium} rightDetailColor='#000'/>
                        <Cell cellStyle='RightDetail' title="Calcium:" detail={macros[0].calcium} rightDetailColor='#000'/>
                    </Section>
                </TableView> 
            </ScrollView>
            : <ActivityIndicator style={{alignSelf:'center'}}/>}
        </SafeAreaView>
    )
}
export default macros;