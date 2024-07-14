import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from './components/SearchBar.js'
import Data from './components/Data.js'
import List from './components/List.js'

export default function App() {
  const [recipes, setRecipes] = useState([])
  const [macros, setMacros] = useState([])
  const [database, setDb] = useState(null)
  const [searchTerm, setTerm] = useState('')

  const onDataLoaded = (data, db) => {
    setRecipes(data)
  }
  const onMacrosLoaded = (data) => {
    setMacros(data)
  }
  const onTermChange = (term) => {
    setTerm(term)
  }
  return (
    <SafeAreaView style={styles.container}>
      <Data onDataLoaded={onDataLoaded} onMacrosLoaded={onMacrosLoaded} term={searchTerm}/>
      <View style={styles.searchBar}>
        <SearchBar onTermChange={onTermChange}/>
      </View>
      <View style={styles.flatList}>
        <List data={recipes}/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchBar:{
    marginTop:15
  },
  flatList:{
    paddingLeft: 15,
    paddingRight: 15,
  }
});
