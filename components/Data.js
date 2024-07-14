import React, {useState, useEffect} from 'react'
import {Text, View} from 'react-native'
import * as SQLite from 'expo-sqlite/legacy'
import * as FileSystem from 'expo-file-system'
import {Asset} from "expo-asset"

const Data = ({onDataLoaded, onMacrosLoaded}) => {
    const [database, setDb] = useState(null)
    const [recipes, setRecipes] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    useEffect(()=>{
        async function loadDB(){
            if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/')).exists) {
                await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite/');
              }
              console.log((await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/recipes.db')).exists)
            if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/recipes.db')).exists){
                const asset = await Asset.fromModule(require("../assets/recipes.db")).downloadAsync();
                await FileSystem.copyAsync({
                  from: asset.localUri, 
                  to: FileSystem.documentDirectory + 'SQLite/recipes.db'});
                console.log("Made it")
                console.log(FileSystem.documentDirectory)
                db = SQLite.openDatabase('recipes.db');
                setDb(db)
                console.log(db)
            }
            else{
                console.log(FileSystem.documentDirectory + 'SQLite/')
                db = SQLite.openDatabase('recipes.db')
                setDb(db)
            }

        }
        if (!database){
            console.log("No database")
            loadDB()
        }
        if (!isLoaded && database){
            console.log("It exists")
            const readOnly = true;
            database.transaction(tx => {
                tx.executeSql('select recipes.title, macros.calories, recipes.link from recipes inner join macros on caloriedata.macroLink = macros.macroLink inner join caloriedata on recipes.link = caloriedata.link', [],
                    (_, resultSet) => {
                        const fetchedRecipes = resultSet.rows._array
                        console.log(fetchedRecipes[0])
                        setRecipes(fetchedRecipes)
                        setLoaded(true)
                        onDataLoaded(fetchedRecipes)
                        console.log('What')
                    },
                    (_, error) => console.error("Error fetching data:", error)
                )
            })
            console.log(isLoaded)
            console.log(recipes.length)
        }
    }, [database, isLoaded, onDataLoaded])

    return null
}
export default Data;