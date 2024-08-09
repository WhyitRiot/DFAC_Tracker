import { Stack } from 'expo-router'
import {Platform} from 'react-native'
import { DataContextProvider } from '../context/DataContext'

export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: '(tabs)',
};
export default function Layout() {
    return(
        <DataContextProvider>
            <Stack>
                <Stack.Screen 
                    name='(tabs)'
                    options={!(Platform.OS === 'ios') ? {
                        headerShown: false,
                        statusBarStyle: 'dark',
                        statusBarColor: '#fff',
                    } : {
                        headerShown: false
                    }}/>
                <Stack.Screen 
                    name='macros'
                    options={!(Platform.OS === 'ios') ? {
                        presentation: 'modal',
                        statusBarStyle: 'dark',
                        statusBarColor: '#fff'
                    } : {
                        presentation: 'modal'
                    }}
                    />
                <Stack.Screen
                    name="logmacros"
                    options={!(Platform.OS === 'ios') ? {
                        presentation: 'modal',
                        statusBarStyle: 'dark',
                        statusBarColor: '#fff'
                    } : {
                        presentation: 'modal'
                    }}
                />
            </Stack>
        </DataContextProvider>
    )
}