import React, {useEffect, useState} from 'react'
import {Database} from '../components/Database'

export default function useDatabase(){
    const [isDBLoadingComplete, setDBLoadingComplete] = useState(false)
    useEffect(()=>{
        async function loadDataAsync(){
            try{
                await Database.loadDatabase()
                setDBLoadingComplete(true);
            }catch(e){
                console.log(e)
            }
        }
        loadDataAsync()
    }, [])
    return isDBLoadingComplete
}