import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
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
                    options={{
                        headerShown: false,
                        statusBarStyle: 'dark',
                        statusBarTranslucent: true,
                        statusBarColor: '#F2F2F2'
                    }}
                    />
                <Stack.Screen
                    name="macros"
                    options={{
                        presentation: 'modal',
                        statusBarStyle: 'dark',
                        statusBarColor: '#fff'
                    }}
                    />
            </Stack>
        </DataContextProvider>
    )
}