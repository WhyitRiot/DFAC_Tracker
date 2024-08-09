import React, {useEffect, createContext, useState} from 'react'
import {Data} from '../components/Data.js'

export const DataContext = createContext({});

export const DataContextProvider = props => {
    const{
        recipes: initial,
        children
    } = props;
    const [recipes, setRecipes] = useState(initial)
    const [recipe, setRecipe] = useState([])
    const [macros, setMacros] = useState([])
    const [caloriedata, setCalorieData] = useState([])
    const [ingredients, setIngredientData] = useState([])
    const [logData, setLogData] = useState([])
    const [logDataYest, setLogDataYest] = useState([])
    const [logDataTom, setLogDataTom] = useState([])

    useEffect(()=> {
        now = new Date()
        refreshRecipes()
        initLogDb()
        refreshLog(
            (new Date(now.getFullYear(), now.getMonth(), now.getDate())).getTime(),
            (new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)).getTime())
    }, [])

    useEffect(()=>{
    
    }, [macros])

    useEffect(() => {
    
    }, [logData])

    const initLogDb = () => {
        return Data.initLog()
    }

    const refreshRecipes = () => {
        return Data.getRecipes(setRecipes)
    }

    const findRecipes = term => {
        return Data.getRecipesWithTerm(term, setRecipes)
    }

    const findMacros = link => {
        return Data.getMacros(link, setMacros)
    }

    const findMacroSingle = link => {
        Data.getCalorieDataSingle(link, setCalorieData)
        Data.getIngredientDataSingle(link, setIngredientData)
        findRecipeSingle(link)
        return Data.getMacroSingle(link, setMacros)
    }

    const findRecipeSingle = link => {
        return Data.getRecipeSingle(link, setRecipe)
    }

    const resetMacros = () => {
        setMacros([])
        resetCalories()
        resetIngredients()
    }
    const resetCalories = () => {
        setCalorieData([])
    }
    const resetIngredients = () => {
        setIngredientData([])
    }
    const logRecipe = (time, recipe, servings, macros) => {
        Data.logRecipeData(time, recipe, servings, macros)
    }
    const delLoggedRecipe = (id) => {
        Data.removeLogData(id)
    }
    const refreshLog = (today, tomorrow) => {
        Data.getLogData(setLogData, today, tomorrow)
        Data.getLogData(setLogDataYest, today - 86400000, tomorrow - 86400000)
        Data.getLogData(setLogDataTom, today + 86400000, tomorrow + 86400000)
    }

    return <DataContext.Provider value={{ macros, recipes, recipe, caloriedata, ingredients, logData, logDataYest, logDataTom, findRecipes, findMacros, findMacroSingle, resetMacros, logRecipe, refreshLog, delLoggedRecipe}}>{children}</DataContext.Provider>
}