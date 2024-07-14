import React, {useState, useEffect} from 'react'
import {Text, View} from 'react-native'
import * as SQLite from 'expo-sqlite/legacy'
import * as FileSystem from 'expo-file-system'
import {Asset} from "expo-asset"

const Data = ({onDataLoaded, onMacrosLoaded, term}) => {
    const [database, setDb] = useState(null)
    const [recipes, setRecipes] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    const [currentTerm, setNewTerm] = useState(term)
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
                console.log(term)
                if (term === ''){
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
                }
                else{
                    tx.executeSql('select recipes.title, macros.calories, recipes.link from recipes inner join macros on caloriedata.macroLink = macros.macroLink inner join caloriedata on recipes.link = caloriedata.link where recipes.title like ?', [`%${term}%`],
                        (_, resultSet) => {
                            const fetchedRecipes = resultSet.rows._array
                            console.log(fetchedRecipes[0])
                            setRecipes(fetchedRecipes)
                            setLoaded(true)
                            onDataLoaded(fetchedRecipes)
                            console.log('Term')
                        },
                        (_, error) => console.error("Error fetching data:", error)
                    )
                }
            })
            console.log(isLoaded)
            console.log(recipes.length)
        }
        if (currentTerm != term){
            database.transaction(tx => {
                tx.executeSql('select recipes.title, macros.calories, recipes.link from recipes inner join macros on caloriedata.macroLink = macros.macroLink inner join caloriedata on recipes.link = caloriedata.link where recipes.title like ?', [`%${term}%`],
                    (_, resultSet) => {
                        const fetchedRecipes = resultSet.rows._array
                        console.log(fetchedRecipes[0])
                        setRecipes(fetchedRecipes)
                        setLoaded(true)
                        onDataLoaded(fetchedRecipes)
                        setNewTerm(term)
                        console.log('Term')
                    },
                    (_, error) => console.error("Error fetching data:", error)
                )
            })
        }
    }, [database, isLoaded, onDataLoaded, term])

    return null
}
export default Data;