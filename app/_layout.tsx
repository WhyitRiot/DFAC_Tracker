import { Stack } from 'expo-router'
import {Platform} from 'react-native'
import { DataContextProvider } from '../context/DataContext'

export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: 'index',
};
export default function Layout() {
    return(
        <DataContextProvider>
            <Stack initialRouteName='index'>
                <Stack.Screen
                    name="index"
                    options={!(Platform.OS === "ios") ? {
                        headerShown: false,
                        statusBarStyle: 'dark',
                        statusBarTranslucent: true,
                        statusBarColor: '#F2F2F2'
                    }: {
                        headerShown: false,
                    }}
                    />
                <Stack.Screen
                    name="macros"
                    options={!(Platform.OS === "ios") ? {
                        presentation: 'modal',
                        statusBarStyle: 'dark',
                        statusBarColor: '#fff'
                    }: {
                        presentation: 'modal'
                    }}
                    />
            </Stack>
        </DataContextProvider>
    )
}