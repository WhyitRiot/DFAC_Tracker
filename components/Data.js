import * as SQLite from 'expo-sqlite/legacy'

const db = SQLite.openDatabase('recipes.db')

const getRecipes = (setRecipeData) => {
    if (db){
        db.transaction(
            tx => {
                tx.executeSql(
                    'select recipes.title, recipes.color, recipes.link, macros.calories from recipes inner join caloriedata on recipes.link = caloriedata.link inner join macros on caloriedata.macroLink = macros.macroLink',
                    [],
                    (_, {rows: {_array}}) =>{
                        setRecipeData(_array)
                    }
                )
            },
            (t, error) => {console.log("db error load recipes"); console.log(error)},
            (_t, _success) => {console.log("loaded recipes")}
        );
    }
}

const getRecipesWithTerm = (term, setRecipeData) => {
    if (db) {
        db.transaction(
            tx => {
                tx.executeSql(
                    'select recipes.title, recipes.color, recipes.link, macros.calories from recipes inner join caloriedata on recipes.link = caloriedata.link inner join macros on caloriedata.macroLink = macros.macroLink where recipes.title like ?',
                    [`%${term}%`],
                    (_, {rows: {_array}}) =>{
                        setRecipeData(_array)
                    }
                )
            },
            (t, error) => {console.log("db error load recipes"); console.log(error)},
            (_t, _success) => {console.log("loaded recipes like", term)}
        )
    }
}

const getMacros = (link, setMacroData) => {
    if (db){
        db.transaction(
            tx => {
                tx.executeSql(    
                    'select macros.calories, macros.carbs, macros.sugars, macros.protein, macros.fat, macros.satfat, macros.sodium, macros.calcium, macros.fiber, caloriedata.portion from macros inner join caloriedata on macros.macroLink = caloriedata.macroLink where link = ?',
                    [link],
                    (_, {rows: {_array}}) => {
                        setMacroData(_array)
                    }
                )
            }
        )
    }
}

const getMacroSingle = (link, setMacroData) => {
    if (db){
        db.transaction(
            tx => {
                tx.executeSql(    
                    'select macros.calories, macros.carbs, macros.sugars, macros.protein, macros.fat, macros.satfat, macros.sodium, macros.calcium, macros.fiber, caloriedata.portion from macros inner join caloriedata on macros.macroLink = caloriedata.macroLink where link = ?',
                    [link],
                    (_, {rows: {_array}}) => {
                        setMacroData(_array)
                    }
                )
            }
        )
    }
}

export const Data = {
    getRecipes,
    getRecipesWithTerm,
    getMacros,
    getMacroSingle
}