import React, {useState} from 'react'
import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native'

const Item = ({item, style}) => {  
    const [expanded, setExpanded] = useState(false)
    return(
    <TouchableOpacity style={[styles.listItem, style]}
    onPressOut = {() => setExpanded(!expanded)}>
        <Text style={styles.listText1}>{item.title}</Text>
        <Text style={styles.listText2}>Calories: {item.calories}</Text>
        {expanded && <Text>Macros</Text>}
    </TouchableOpacity>
    )
}

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

const List = ({data}) => {
    const [isOdd, setOdd] = useState(true)
    return(
        <FlatList
            contentContainerStyle = {{flexGrow: 1}}
            data = {data}
            renderItem ={({item}) => <Item item={item} style={[isOdd ? {} : {backgroundColor: 'grey'} & setOdd(!isOdd)]}></Item>}
            keyExtractor = {item => item.link}
            //ItemSeparatorComponent={renderSeparator}
        >
        </FlatList>
    )
}
export default List;

const styles = StyleSheet.create({
    listItem: {
        justifyContent: 'space-between',
        backgroundColor: '#b4d4fa',
        shadowColor: 'grey',
        shadowOpacity: 0.4,
        shadowOffset: 1,
        shadowRadius: 0.5,
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
        borderWidth: 1,
        borderRadius: 15
    },
    listText1: {
        fontSize: 15,
        alignSelf: 'flex-start',
        fontWeight: 'bold'
    },
    listText2:{
        fontSize: 15,
        alignSelf: 'flex-end'
    }
})