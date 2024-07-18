import React, {useEffect, useContext} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Text, View, FlatList} from 'react-native'
import {useRoute} from '@react-navigation/native'
import { DataContext } from '../context/DataContext'
import { useNavigation } from 'expo-router'

const Macros = () =>{
    const route = useRoute();
    const navigation = useNavigation();
    const {macros, findMacroSingle} = useContext(DataContext)
    const { item } = route.params;
    useEffect(()=>{
        findMacroSingle(item.link)
        navigation.setOptions({title: item.title})
    },[item.link])

    const renderItem = ({item}) =>{
        return(
        <Text>{item.title}</Text>
        )
    }
    return(
        <SafeAreaView>
            {/*<FlatList
            data={macros[0]}
            numColumns={2}
            horizontal={false}
            renderItem={({item}) => <renderItem item={item}/>}
            keyExtractor={(item, index) => item.key}>
            </FlatList> */}

            <Text>Calories: {macros[0]?.calories}</Text>
            <Text>Serving: {macros[0]?.portion}</Text>
            <Text>Protein: {macros[0]?.protein}</Text>
            <Text>Carbs: {macros[0]?.carbs}</Text>
            <Text>Fat: {macros[0]?.fat}</Text>
        </SafeAreaView>
    )
}
export default Macros;