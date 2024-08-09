import * as SQLite from 'expo-sqlite/legacy'

const db = SQLite.openDatabase('recipes.db')
const logDb = SQLite.openDatabase('log.db')

const initLog = () => {
    if (logDb){
        logDb.transaction(
            tx => {
                tx.executeSql(
                    'create table if not exists log(date int, title text, color text, link int, servings double, id integer primary key autoincrement)',
                )
                tx.executeSql(
                    'create table if not exists logMacros(id integer primary key AUTOINCREMENT, calories double, carbs double, sugars double, protein double, fat double, satfat double, sodium double, calcium double, fiber double)'
                )
            }
        )
    }
}

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
                    'select recipes.title, recipes.color, recipes.link, macros.calories from recipes inner join caloriedata on recipes.link = caloriedata.link inner join macros on caloriedata.macroLink = macros.macroLink where recipes.title like ? order by case when title like ? then 0 else 1 end, recipes.title;',
                    [`%${term}%`, `${term}%`],
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

const getRecipeSingle = (link, setRecipe) => {
    if (db){
        db.transaction(
            tx => {
                tx.executeSql(
                    'select * from recipes where link = ?',
                    [link],
                    (_, {rows: {_array}}) => {
                        setRecipe(_array)
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

const getCalorieDataSingle = (link, setCalorieData) => {
    if (db){
        db.transaction(
            tx => {
                tx.executeSql(
                    'select * from caloriedata where link = ?',
                    [link],
                    (_, {rows: {_array}}) => {
                        setCalorieData(_array)
                    }
                )
            }
        )
    }
}

const getIngredientDataSingle = (link, setIngredientData) => {
    if (db){
        db.transaction(
            tx => {
                tx.executeSql(
                    'select * from ingredients where link = ?',
                    [link],
                    (_, {rows: {_array}}) => {
                        setIngredientData(_array)
                    }
                )
            }
        )
    }
}

const logRecipeData = (time, recipe, servings, macros) => {
    if (logDb){
        logDb.transaction(
            tx => {
                tx.executeSql(
                    'insert into log values (?, ?, ?, ?, ?, ?)', 
                    [time, recipe['title'], recipe['color'], recipe['link'], servings, null],
                    (resultSet) => console.log('log complete', resultSet),
                    (error) => console.log('log error', error)
                )
                tx.executeSql(
                    'insert into logMacros values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [null, macros['calories'], macros['carbs'], macros['sugars'], macros['protein'], macros['fat'], macros['satfat'], macros['sodium'], macros['calcium'], macros['fiber']]
                )
            }
        )
    }
}

const getLogData = (setLogData, today, tomorrow)  => {
    if (logDb){
        logDb.transaction(
            tx => {
                tx.executeSql(
                    'select log.date, log.title, log.color, log.link, log.servings, log.id, logMacros.calories, logMacros.carbs, logMacros.sugars, logMacros.protein, logMacros.fat, logMacros.satfat, logMacros.sodium, logMacros.calcium, logMacros.fiber from log left join logMacros on log.id = logMacros.id where log.date >= ? AND log.date < ?',
                    [today, tomorrow],
                    (_, {rows: {_array}}) => {
                        setLogData(_array)
                    }
                )
            }
        )
    }
}

const removeLogData = (id) => {
    if (logDb){
        logDb.transaction(
            tx => {
                tx.executeSql(
                    'delete from log where id = ?',
                    [id]
                )
                tx.executeSql(
                    'delete from logMacros where id = ?',
                    [id]
                )
            }
        )
    }
}

export const Data = {
    initLog,
    getRecipes,
    getRecipesWithTerm,
    getMacros,
    getMacroSingle,
    getCalorieDataSingle,
    getIngredientDataSingle,
    getRecipeSingle,
    logRecipeData,
    getLogData,
    removeLogData
}