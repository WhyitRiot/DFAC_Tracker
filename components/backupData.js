import React, {useState, useEffect} from 'react'
import {Text, View} from 'react-native'
import * as SQLite from 'expo-sqlite/legacy'
import * as FileSystem from 'expo-file-system'
import {Asset} from "expo-asset"

async function openDatabase() {
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }
    const asset = await Asset.fromModule(require("../assets/recipes.db")).downloadAsync();
    await FileSystem.copyAsync(asset.localUri, FileSystem.documentDirectory + 'SQLite/');
    return SQLite.openDatabase('recipes.db');
  }

function getResult(db){
    db.transaction(tx => {
        const result = tx.executeSql('select recipes.title, macros.calories from recipes inner join macros on caloriedata.macroLink = macros.macroLink inner join caloriedata on recipes.link = caloriedata.link', [])
        console.log(result)
    }, true)
}

async function queryDatabase(db){
    const readOnly = true
    await db.transactionAsync(async tx => {
        const result = await tx.executeSqlAsync('select * from recipes', [])
        console.log(result)
    }, readOnly)
}

const Data = () => {
    const [isLoaded, setLoaded] = useState(false)
    const [dataBase, setDatabase] = useState(null)
    useEffect(() => {
        async function fetchData() {
            const db = await openDatabase()
            setDatabase(db)
        }
        fetchData()
        console.log(dataBase)
        if (dataBase){
            setLoaded(true)
            getResult(dataBase)
        }
    }, [])


    if (!isLoaded){
        return(
            <Text>Hello</Text>
        )
    }
    else{
        return(
            <Text>EYYYYYY WE GOTEM</Text>
        )
    }

}
export default Data;