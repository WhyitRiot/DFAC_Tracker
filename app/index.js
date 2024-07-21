import React from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar.js'
import List from '../components/List.js'
import useDatabase from '../hooks/useDatabase.js';

const index = () => {
  const isDBLoadingComplete = useDatabase();
  SplashScreen.preventAutoHideAsync();
  
  if (isDBLoadingComplete){
    SplashScreen.hideAsync();
    console.log('done')
  }

  return (
    <SafeAreaView style={styles.container}>
          <View style={styles.searchBar}>
            <SearchBar />
          </View>
          <View style={styles.flatList}>
            <List />
          </View>
    </SafeAreaView>
  )
}
export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchBar:{
    marginTop:15
  },
  flatList:{
    borderTopWidth: 0.5,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flex: 1.5,
    paddingLeft: 15,
    paddingRight: 15,
  }
});
