import { Stack } from 'expo-router'
import { DataContextProvider } from '../context/DataContext'
import { StatusBar } from 'expo-status-bar';

export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: 'index',
};
export default function Layout() {
    return(
        <DataContextProvider>
            <StatusBar style="light" />
            <Stack initialRouteName='index'>
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: false,
                    }}
                    />
                <Stack.Screen
                    name="macros"
                    options={{
                        presentation: 'modal',
                    }} />
            </Stack>
        </DataContextProvider>
    )
}