import { Tabs } from 'expo-router'
import {Platform} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Foundation from '@expo/vector-icons/Foundation';
import Entypo from '@expo/vector-icons/Entypo';
import { DataContextProvider } from '../../context/DataContext'

export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: 'index',
};
export default function TabLayout() {
    return(
        <DataContextProvider>
            <StatusBar style='dark'/>
            <Tabs screenOptions={{tabBarActiveTintColor: 'blue', unmountOnBlur: true}} initialRouteName='log'>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Search', 
                        headerShown: false,
                        tabBarIcon: ({ color }) => <Foundation size={28} name="magnifying-glass" color={color} />
                        
                    }}
                    />
                <Tabs.Screen
                    name="log"
                    options={{
                        title: 'Log',
                        headerShown: false,
                        tabBarIcon: ({ color }) => <Entypo size={28} name="list" color={color} />
                    }}
                    />
            </Tabs>
        </DataContextProvider>
    )
}