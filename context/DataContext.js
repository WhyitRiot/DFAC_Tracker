import React, {useEffect, createContext, useState} from 'react'
import {Data} from '../components/Data.js'

export const DataContext = createContext({});

export const DataContextProvider = props => {
    const{
        recipes: initial,
        children
    } = props;
    const [recipes, setRecipes] = useState(initial)
    const [macros, setMacros] = useState([])

    useEffect(()=> {
        refreshRecipes()
    }, [])

    useEffect(()=>{
    
    }, [macros])

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
        return Data.getMacroSingle(link, setMacros)
    }
    const resetMacros = () => {
        setMacros([])
    }

    return <DataContext.Provider value={{ macros, recipes, findRecipes, findMacros, findMacroSingle, resetMacros}}>{children}</DataContext.Provider>
}