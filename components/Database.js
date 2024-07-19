import * as FileSystem from 'expo-file-system'
import {Asset} from "expo-asset"
import * as Updates from 'expo-updates'

const loadDatabase = async () =>{
    // Open database async
    // Create SQLite directory if it doesn't exist
    try{
        console.log('started load')
        if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/')).exists) {
            await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite/');
            }
    }
    catch(e){
    }
    console.log('directory exists')
    //fileInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/recipes.db')
    //console.log(fileInfo['size'])
    // Copy database from assets folder if it doesn't already exist
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/recipes.db')).exists || ((await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/recipes.db'))['size'] <= 0)){
        if (await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/recipes.db')['size'] <= 0){
            await FileSystem.deleteAsync(FileSystem.documentDirectory + 'SQLite/recipes.db')
        }
        console.log('creating file')
        const asset = await Asset.fromModule(require("../assets/recipes.db")).downloadAsync();
        await FileSystem.copyAsync({
            from: asset.localUri, 
            to: FileSystem.documentDirectory + 'SQLite/recipes.db'});
        console.log(FileSystem.documentDirectory)
        Updates.reloadAsync()
    }
}

export const Database = {
    loadDatabase
}